/**
 * Service that handles WebView-related operations
 *
 * Don't expose this whole service on papi, just specific operations. The remaining exports are only
 * for services in the renderer to call.
 */
import cloneDeep from 'lodash/cloneDeep';
import {
  AsyncVariable,
  Unsubscriber,
  deserialize,
  serialize,
  isString,
  newGuid,
  indexOf,
  substring,
  startsWith,
  split,
} from 'platform-bible-utils';
import { newNonce } from '@shared/utils/util';
import { createNetworkEventEmitter } from '@shared/services/network.service';
import {
  GetWebViewOptions,
  SavedWebViewDefinition,
  WebViewContentType,
  WebViewDefinition,
  WebViewDefinitionReact,
  WebViewDefinitionUpdateInfo,
  WebViewId,
  WebViewType,
  WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS,
  SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS,
  SavedWebViewDefinitionOmittedKeys,
} from '@shared/models/web-view.model';
import {
  AddWebViewEvent,
  Layout,
  OnLayoutChangeRCDock,
  PapiDockLayout,
  SavedTabInfo,
  TabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import webViewProviderService from '@shared/services/web-view-provider.service';
import { LayoutBase } from 'rc-dock';
import logger from '@shared/services/logger.service';
import LogError from '@shared/log-error.model';
import memoizeOne from 'memoize-one';
import {
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import networkObjectService from '@shared/services/network-object.service';
import {
  getFullWebViewStateById,
  setFullWebViewStateById,
} from '@renderer/services/web-view-state.service';
import { registerCommand } from '@shared/services/command.service';
import { CommandNames } from 'papi-shared-types';
import {
  type SettingsTabData,
  TAB_TYPE_PROJECT_SETTINGS_TAB,
  TAB_TYPE_USER_SETTINGS_TAB,
} from '@renderer/components/settings-tabs/settings-tab.component';

/** Emitter for when a webview is added */
const onDidAddWebViewEmitter = createNetworkEventEmitter<AddWebViewEvent>(
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
);

/** Event that emits with webView info when a webView is added */
export const onDidAddWebView = onDidAddWebViewEmitter.event;

// #region Security

/**
 * The iframe [sandbox attribute]
 * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) that determines if
 * scripts are allowed to run on an iframe
 */
export const IFRAME_SANDBOX_ALLOW_SCRIPTS = 'allow-scripts';

/**
 * The iframe [sandbox attribute]
 * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) that determines if an
 * iframe is allowed to interact with its parent as a same-origin website. The iframe must still be
 * on the same origin as its parent in order to interact same-origin.
 */
export const IFRAME_SANDBOX_ALLOW_SAME_ORIGIN = 'allow-same-origin';

/**
 * The iframe [sandbox attribute]
 * (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox) that determines if an
 * iframe is allowed to open separate windows with window.open and anchor tags with
 * `target="_blank"`. Note that we have a `setWindowOpenHandler` in `main.ts` that causes these to
 * be opened in the default browser
 */
export const IFRAME_SANDBOX_ALLOW_POPUPS = 'allow-popups';

/**
 * The only `sandbox` attribute values we allow iframes with `src` to have including URL WebView
 * iframes. These are separate than iframes with `srcdoc` for a few reasons:
 *
 * - These iframes cannot be on the same origin as the parent window even if `allow-same-origin` is
 *   present (unless they are literally on the same origin) because we do not allow `frame-src
 *   blob:`
 * - `src` iframes do not inherit the CSP of their parent window.
 * - We are not able to modify the `srcdoc` before inserting it to ensure it has a CSP that we control
 *   to attempt to prevent arbitrary code execution on same origin. We are trusting the browser's
 *   ability to create a strong and safe boundary between parent and child iframe in different
 *   origin.
 *
 *   TODO: consider using `csp` attribute on iframe to mitigate this issue
 * - Extension developers do not know what code they are executing if they use some random URL in
 *   `src` WebViews.
 *
 * The `sandbox` attribute controls what privileges iframe scripts and other things have:
 *
 * - `allow-same-origin` so the iframe can access the storage APIs (localstorage, cookies, etc) and
 *   other same-origin connections for its own origin. `blob:` iframes are considered part of the
 *   parent origin, but we block them with the CSP in `index.ejs`. For more information, see
 *   https://web.dev/articles/sandboxed-iframes
 * - `allow-scripts` so the iframe can actually do things. Defaults to not present since src iframes
 *   can get scripts from anywhere. Extension developers should only enable this if needed as this
 *   increases the possibility of a security threat occurring. Defaults to false
 * - `allow-popups` so the iframe can open separate windows with window.open and anchor tags with
 *   `target="_blank"`. Note that we have a `setWindowOpenHandler` in `main.ts` that causes these to
 *   be opened in the default browser
 *
 * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
 *
 * Note: Mozilla's iframe page warns that listing both 'allow-same-origin' and 'allow-scripts'
 * allows the child scripts to remove this sandbox attribute from the iframe. This should only be
 * possible on iframes that are on the same origin as the parent including those that use `srcdoc`
 * to define their HTML code. We monkey-patch `document.createElement` to prevent child iframes from
 * creating new iframes and also use a `MutationObserver` in `web-view.service.ts` to remove any
 * iframes that do not comply with these sandbox requirements. This successfully prevents iframes
 * with too many privileges from executing as of July 2023. However, this means the sandboxing could
 * do nothing for a determined hacker if they ever find a way around all this. We must distrust the
 * whole renderer due to this issue. We will probably want to stay vigilant on security in this
 * area.
 */
const ALLOWED_IFRAME_SRC_SANDBOX_VALUES = [
  IFRAME_SANDBOX_ALLOW_SAME_ORIGIN,
  IFRAME_SANDBOX_ALLOW_SCRIPTS,
  IFRAME_SANDBOX_ALLOW_POPUPS,
];

/**
 * The minimal `src` WebView iframe sandboxing. This is applied to WebView iframes that use `src` in
 * `web-view.component.tsx`. See {@link ALLOWED_IFRAME_SRC_SANDBOX_VALUES} for more information on
 * our sandboxing methods and why we chose these values.
 *
 * Note: 'allow-same-origin' and 'allow-scripts' are not included here because they are added
 * conditionally depending on the WebViewDefinition in `web-view.component.tsx`
 */
export const WEBVIEW_IFRAME_SRC_SANDBOX = ALLOWED_IFRAME_SRC_SANDBOX_VALUES.filter(
  (value) =>
    value !== IFRAME_SANDBOX_ALLOW_SCRIPTS &&
    value !== IFRAME_SANDBOX_ALLOW_SAME_ORIGIN &&
    value !== IFRAME_SANDBOX_ALLOW_POPUPS,
).join(' ');

/**
 * The only `sandbox` attribute values we allow iframes with `srcdoc` to have including HTML and
 * React WebView iframes. These are separate than iframes with `src` for a few reasons:
 *
 * - These iframes will be on the same origin as the parent window if `allow-same-origin` is present.
 *   This is very serious and demands significant security risk consideration.
 * - `srcdoc` iframes inherit the CSP of their parent window (in our case, `index.ejs`)
 * - We are modifying the `srcdoc` before inserting it to ensure it has a CSP that we control to
 *   attempt to prevent unintended code execution on same origin
 * - Extension developers should know exactly what code they're running in `srcdoc` WebViews, whereas
 *   they could include some random URL in `src` WebViews
 *
 *   TODO: consider requiring `srcdoc` WebView content to come directly from `papi-extension://`
 *   instead of assuming extension developers will bundle their WebView code? This would mean the
 *   only code that runs on same origin is code that extension developers definitely included in
 *   their extension bundle https://github.com/paranext/paranext-core/issues/604
 *
 * The `sandbox` attribute controls what privileges iframe scripts and other things have:
 *
 * - `allow-same-origin` so the iframe can get papi and communicate and such
 * - `allow-scripts` so the iframe can actually do things
 * - `allow-popups` so the iframe can open separate windows with window.open and anchor tags with
 *   `target="_blank"`. Note that we have a `setWindowOpenHandler` in `main.ts` that causes these to
 *   be opened in the default browser
 *
 * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
 *
 * Note: Mozilla's iframe page warns that listing both 'allow-same-origin' and 'allow-scripts'
 * allows the child scripts to remove this sandbox attribute from the iframe. This should only be
 * possible on iframes that are on the same origin as the parent including those that use `srcdoc`
 * to define their HTML code. We monkey-patch `document.createElement` to prevent child iframes from
 * creating new iframes and also use a `MutationObserver` in `web-view.service.ts` to remove any
 * iframes that do not comply with these sandbox requirements. This successfully prevents iframes
 * with too many privileges from executing as of July 2023. However, this means the sandboxing could
 * do nothing for a determined hacker if they ever find a way around all this. We must distrust the
 * whole renderer due to this issue. We will probably want to stay vigilant on security in this
 * area.
 */
export const ALLOWED_IFRAME_SRCDOC_SANDBOX_VALUES = [...ALLOWED_IFRAME_SRC_SANDBOX_VALUES];

/**
 * The minimal `srcdoc` WebView iframe sandboxing. This is applied to WebView iframes that use
 * `srcDoc` in `web-view.component.tsx`. See {@link ALLOWED_IFRAME_SRCDOC_SANDBOX_VALUES} for more
 * information on our sandboxing methods and why we chose these values.
 *
 * Note: 'allow-same-origin' and 'allow-scripts' are not included here because they are added
 * conditionally depending on the WebViewDefinition in `web-view.component.tsx`
 */
export const WEBVIEW_IFRAME_SRCDOC_SANDBOX = ALLOWED_IFRAME_SRCDOC_SANDBOX_VALUES.filter(
  (value) =>
    value !== IFRAME_SANDBOX_ALLOW_SCRIPTS &&
    value !== IFRAME_SANDBOX_ALLOW_SAME_ORIGIN &&
    value !== IFRAME_SANDBOX_ALLOW_POPUPS,
).join(' ');

/**
 * Get Regex to test stack traces against for creating script and iframe tags on the renderer
 * document. Only renderer code is allowed to create script and iframe tags. script and iframe tags
 * coming from any other source throw an error.
 *
 * Note that sourceURLs can't have spaces in them, so we explicitly test for a space before the
 * source so bad actors can't put these special words into their sourceURL
 */
/* In development, safe errors look like this:
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at __webpack_require__.l (http://localhost/renderer.dev.js...)
  ...
*/
/* In development, bad errors look more like this:
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at evil.web-view.htmlfile://app.asar
*/
/* In production, safe errors look like this:
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
	at i.l (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
  ...
*/
/* In production, bad errors look more like this:
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/stuffnthings)
	at evil.web-view.htmlfile://app.asar
*/
const getRendererScriptRegex = memoizeOne(() =>
  globalThis.isPackaged
    ? /^.+\s+.+ \S*document\.createElement \(file:\/\/\S*app.asar\/dist\/renderer\/renderer\.js\S*\)\s+.+ \(file:\/\/\S*app.asar\/dist\/renderer\/renderer\.js\S*\)/
    : /^.+\s+.+ \S*document\.createElement \(https?:\/\/\S*\/renderer\.dev\.js\S*\)\s+.+ \(https?:\/\/\S*\/renderer\.dev\.js\S*\)/,
);
/**
 * The HTML tags that are not allowed at all in the main renderer window. Our MutationObserver
 * deletes these immediately if it sees them.
 *
 * WARNING: These are all untested. The MutationObserver was not fast enough to remove script tags
 * before they executed code, so there is some chance these could do bad things too.
 *
 * TODO: Test these sometime
 */
// Maybe we don't actually need this... Maybe we should evaluate if we want this.
// Would lag things up if we changed our MutationObserver to use getElementsByTagName
const FORBIDDEN_HTML_TAGS = ['object', 'embed', 'frame', 'frameset'];
/**
 * The HTML tags that are only allowed in the main renderer window if created by the renderer. Our
 * monkey-patch on `document.createElement` protects these.
 *
 * Technically, all elements should really be created only by the renderer, but we must choose the
 * security-related ones to guard closely since this is an inefficient check.
 *
 * Note: this only applies to tags added to the document after initial load, so the document
 * metadata tags are not normally hit.
 *
 * WARNING: A stack trace has to be created each time any of these are created, so it is not very
 * efficient when one of these tags is created. Please avoid using these tags where possible.
 */
const RESTRICTED_HTML_TAGS = [
  // All the [Document metadata](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#document_metadata)
  // tags except `style` because honestly there are just too many of them. They flood the logs and
  // took 100ms on reload. If it becomes an issue, we can worry about it then. Maybe we can try
  // checking for style when the first WebView is loaded in or something
  'base',
  'head',
  'link',
  'meta',
  // See comment above for why not style
  // 'style',
  'title',
  // The [Sectioning root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#sectioning_root)
  'body',
  // Tags that have [href](https://www.w3schools.com/tags/att_href.asp) for navigating
  'a',
  'area',
  // Can navigate
  'form',
  // Don't want to let extensions block the UI
  'dialog',
  // Very dangerous tags that we need to be careful to restrict - we do not want extension code to
  // run in renderer context
  'script',
  'iframe',
  // Weird tag to preview a site that we probably don't need
  'portal',
];

/**
 * Checks a node and its children recursively to determine if they are forbidden and removes them
 * from the dom if so.
 *
 * @param node The node to check recursively
 * @param parent Node from which to remove this node if it is forbidden
 */
function removeNodeIfForbidden(node: Node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return;

  // This is an element node.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const element = node as Element;

  /** Remove the element */
  const removeElement = (info: string) => {
    logger.warn(
      `${info} rejected! An extension may have been trying to execute code with higher privileges!`,
    );
    element.remove();
  };

  function validateElementThenChildren(currentElement: Element) {
    const currentTag = currentElement.tagName.toLowerCase();

    // If the element is forbidden, remove this whole tree
    if (currentTag === 'iframe') {
      const sandbox = currentElement.attributes.getNamedItem('sandbox');
      if (!sandbox) {
        removeElement('iframe with no sandbox');
        return;
      }
      if (!isString(sandbox.value)) {
        removeElement(`iframe with a non-string sandbox value ${sandbox.value}`);
        return;
      }
      const sandboxValues = split(sandbox.value, ' ');
      const src = currentElement.attributes.getNamedItem('src');
      // If the iframe has `src`, only allow `src` sandbox values because browsers that do not
      // support `srcdoc` fall back to `src` so we should be more strict
      const allowedSandboxValues = src
        ? ALLOWED_IFRAME_SRC_SANDBOX_VALUES
        : ALLOWED_IFRAME_SRCDOC_SANDBOX_VALUES;
      if (
        sandboxValues.some(
          (sandboxValue) => sandboxValue !== '' && !allowedSandboxValues.includes(sandboxValue),
        )
      ) {
        removeElement(
          `iframe with \`${
            src ? 'src' : 'srcdoc'
          }\` attribute and disallowed sandbox attribute value '${sandbox.value}'`,
        );
        return;
      }
    }
    if (FORBIDDEN_HTML_TAGS.includes(currentTag)) {
      removeElement(currentTag);
      return;
    }

    // Check the element's children to see if they are forbidden
    for (let i = 0; i < currentElement.children?.length; i++) {
      validateElementThenChildren(currentElement.children[i]);
    }
  }

  // Validate the new element and all children recursively. If anything is forbidden, the top
  // element will be removed
  validateElementThenChildren(element);
}

/**
 * Reads through the list of document changes detected by our MutationObserver and deletes forbidden
 * elements including iframes with improper sandboxing
 */
function removeForbiddenElements(mutationList: MutationRecord[]) {
  // If this becomes too slow, it may be necessary to use getElementsByTagName instead of looping
  // through the mutations. Thanks for the idea to https://stackoverflow.com/a/39332340
  mutationList.forEach((m) => {
    // If `src` or `srcdoc` attributes changed, validate the element
    if (m.type === 'attributes') {
      if (!m.target.parentNode) {
        logger.warn(
          `MutationObserver couldn't find parent for node that changed attributes! This doesn't make sense. Investigate`,
          m.target,
        );
      }
      removeNodeIfForbidden(m.target);
      return;
    }
    // If for some reason this mutation is not added or removed nodes, forget it
    if (m.type !== 'childList') return;
    // Check if each added node is a forbidden element
    m.addedNodes.forEach((node) => removeNodeIfForbidden(node));
  });
}

// #endregion

// #region Dock layouts

/** `localstorage` key for saving and loading the dock layout */
const DOCK_LAYOUT_KEY = 'dock-saved-layout';

/** Create a new dock layout promise variable */
function createDockLayoutAsyncVar(): AsyncVariable<PapiDockLayout> {
  return new AsyncVariable<PapiDockLayout>('web-view.service-host.platformDockLayout');
}

/**
 * WARNING: DO NOT USE THIS VARIABLE DIRECTLY. USE `getDockLayout()`
 *
 * Asynchronously accessed variable that will hold the rc-dock dock layout along with a couple other
 * props. This is populated by `platform-dock-layout.component.tsx` registering its dock layout with
 * this service, allowing this service to manage layouts and such.
 *
 * Do not save this variable out anywhere because it can change, invalidating the old one (see
 * `registerDockLayout`)
 */
let papiDockLayoutVar = createDockLayoutAsyncVar();

/**
 * WARNING: DO NOT USE THIS VARIABLE DIRECTLY. USE `getDockLayoutSync()`
 *
 * Synchronously accessed variable that will hold the rc-dock dock layout along with a couple other
 * props. This is populated by `platform-dock-layout.component.tsx` registering its dock layout with
 * this service, allowing this service to manage layouts and such.
 *
 * Do not save this variable out anywhere because it can change, invalidating the old one (see
 * `registerDockLayout`)
 */
let papiDockLayoutVarSync: PapiDockLayout | undefined;

/**
 * Get the papi dock layout promise. It will resolve to the papi dock layout when it is registered.
 *
 * Do not save the returned variable out anywhere because it can change, invalidating the old one
 * (see `registerDockLayout`)
 *
 * @returns Promise that resolves to the papi dock layout
 */
function getDockLayout(): Promise<PapiDockLayout> {
  return papiDockLayoutVar.promise;
}

/**
 * Get the papi dock layout synchronously _assuming_ it has been registered. This should be safe to
 * assume if you are accessing this from inside a tab's code
 *
 * Do not save the returned variable out anywhere because it can change, invalidating the old one
 * (see `registerDockLayout`)
 *
 * @returns The papi dock layout
 * @throws If the papi dock layout has not been registered
 */
function getDockLayoutSync(): PapiDockLayout {
  if (!papiDockLayoutVarSync)
    throw new Error(
      'WebView Service error: Dock layout was requested synchronously, but the dock layout has not been registered!',
    );
  return papiDockLayoutVarSync;
}

/**
 * Set the papi dock layout (async and sync). Resolves `getDockLayout()` calls.
 *
 * This should very likely only be used in `registerDockLayout`.
 *
 * @param dockLayout The papi dock layout to set or undefined to reset the dock layout
 */
function setDockLayout(dockLayout: PapiDockLayout | undefined): void {
  if (dockLayout === undefined) {
    // Create a new async var to empty out the dock layout only if the dock layout was previously
    // set. That way, async callers to the dock layout who are awaiting a resolved value don't get
    // lost or rejected needlessly
    // TODO: Would creating a new async var create any problems...? I guess only if someone saves
    // dockLayoutVar somewhere else
    if (papiDockLayoutVar.hasSettled) papiDockLayoutVar = createDockLayoutAsyncVar();
    papiDockLayoutVarSync = undefined;
  } else {
    // Set the dock layout as the promise var. Throws if already resolved
    papiDockLayoutVar.resolveToValue(dockLayout, true);
    if (papiDockLayoutVarSync)
      throw new Error(
        'WebView Service error: papiDockLayoutVarSync is already set when trying to set it!',
      );
    papiDockLayoutVarSync = dockLayout;
  }
}

/**
 * When rc-dock detects a changed layout, save it. This function is given to the registered
 * papiDockLayout to run when the dock layout changes.
 *
 * @param newLayout The changed layout to save.
 */
// TODO: We could filter whether we need to save based on the `direction` argument. - IJH 2023-05-1
const onLayoutChange: OnLayoutChangeRCDock = async (newLayout) => {
  return saveLayout(newLayout);
};

/**
 * Loads layout information into the dock layout.
 *
 * @param layout If this parameter is provided, loads that layout information. If not provided, gets
 *   the persisted layout information and loads it into the dock layout.
 */
async function loadLayout(layout?: LayoutBase): Promise<void> {
  const dockLayoutVar = await getDockLayout();
  const layoutToLoad = layout || getStorageValue(DOCK_LAYOUT_KEY, dockLayoutVar.testLayout);

  dockLayoutVar.dockLayout.loadLayout(layoutToLoad);
  if (layout) {
    // A layout was provided, meaning this is a layout change. Since `dockLayout.loadLayout` doesn't
    // run `onLayoutChange`, we run it manually
    await onLayoutChange(layoutToLoad);
  }
}

/**
 * Safely load a value from local storage.
 *
 * @param key Of the value.
 * @param defaultValue To return if the key is not found.
 * @returns The value of the key fetched from local storage, or the default value if not found.
 */
function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  const initial = saved ? deserialize(saved) : undefined;
  return initial || defaultValue;
}

/**
 * Persists the current dock layout information.
 *
 * @param layout Layout to persist
 */
async function saveLayout(layout: LayoutBase): Promise<void> {
  const currentLayout = layout;
  localStorage.setItem(DOCK_LAYOUT_KEY, serialize(currentLayout));
}

/**
 * Register a dock layout React element to be used by this service to perform layout-related
 * operations
 *
 * @param dockLayout Dock layout element to register along with other important properties
 * @returns Function used to unregister this dock layout
 */
export function registerDockLayout(dockLayout: PapiDockLayout): Unsubscriber {
  // Save the current async var so we know if it changed before we unsubscribed
  const currentPapiDockLayoutVar = papiDockLayoutVar;

  setDockLayout(dockLayout);

  // TODO: Strange pattern that we are setting a ref to a service function. Investigate changing
  // this pattern in some way. Maybe just export `onLayoutChange`?
  dockLayout.onLayoutChangeRef.current = onLayoutChange;

  // Will we ever need to await this? For now, seems like it unnecessarily complicates registering
  // because making this function async would probably be annoying in React
  loadLayout();

  // Return an unsubscriber to unregister this dock layout. The primary situation in which I see
  // this happening is when you change something on the renderer that causes a live hot reload
  return () => {
    // Somehow this is not the registered dock layout anymore
    if (papiDockLayoutVar !== currentPapiDockLayoutVar)
      throw new Error('Tried to unregister an old dock layout');

    setDockLayout(undefined);

    return true;
  };
}

// #endregion

// #region Tabs

/**
 * Add or update a tab in the layout
 *
 * @param savedTabInfo Info for tab to add or update
 * @param layout Information about where to put a new tab
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 */
export const addTab = async <TData = unknown>(
  savedTabInfo: SavedTabInfo & { data?: TData },
  layout: Layout,
): Promise<Layout | undefined> => {
  return (await getDockLayout()).addTabToDock(savedTabInfo, layout);
};

/**
 * Remove a tab in the layout
 *
 * @param tabId ID of the tab to remove
 * @returns True if successfully found the tab to remove
 */
export const removeTab = async (tabId: string): Promise<boolean> => {
  return (await getDockLayout()).removeTabFromDock(tabId);
};

/**
 * Basic `saveTabInfo` that simply strips the properties added by {@link TabInfo} off of the object
 * and returns it as a {@link SavedTabInfo}. Runs as the {@link TabSaver} by default if the tab type
 * does not have a specific `TabSaver`
 */
export function saveTabInfoBase(tabInfo: TabInfo): SavedTabInfo {
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tabTitle, tabTooltip, tabIconUrl, content, minWidth, minHeight, ...savedTabInfo } =
    tabInfo;
  return savedTabInfo;
}

// #endregion

// #region Web view definitions

/**
 * Updates the WebView with the specified ID with the specified properties
 *
 * @param webViewId The ID of the WebView to update
 * @param webViewDefinitionUpdateInfo Properties to update on the WebView. Any unspecified
 *   properties will stay the same
 * @returns True if successfully found the WebView to update and actually updated any properties;
 *   false otherwise
 * @throws If the papi dock layout has not been registered
 */
export function updateWebViewDefinitionSync(
  webViewId: string,
  webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
): boolean {
  return getDockLayoutSync().updateWebViewDefinition(webViewId, webViewDefinitionUpdateInfo);
}

/**
 * Merges web view definition updates into a web view definition. Does not modify the original web
 * view definition but returns a new object.
 *
 * Please note that this method returns `undefined` if and only if no properties updated (properties
 * are compared by simple reference equality ===).
 *
 * @param webViewDefinition Web view definition to merge into
 * @param updateInfo Updates to merge into the web view definition
 * @returns New copy of web view definition with updates applied OR `undefined` IF NO PROPERTIES
 *   WERE UPDATED
 */
export function mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent<
  T extends SavedWebViewDefinition,
>(webViewDefinition: T, updateInfo: WebViewDefinitionUpdateInfo): T | undefined {
  let didUpdateAnyProperties = false;
  const updatedWebViewDefinition = { ...webViewDefinition };
  // For each updatable property that is specified, overwrite the webViewDefinition's property
  // If update properties aren't specified, keep the original values
  WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS.forEach((key) => {
    if (key in updateInfo && updatedWebViewDefinition[key] !== updateInfo[key]) {
      // Everything worked until I added multiple different types for the properties of
      // WebViewDefinitionUpdateInfo. Now I guess TypeScript isn't smart enough to realize that the
      // property is going to be the same between these two objects since they both have all the
      // possible properties of the key with the same types and are using the same key. Too bad :/
      // @ts-ignore ts(2322)
      updatedWebViewDefinition[key] = updateInfo[key];
      didUpdateAnyProperties = true;
    }
  });
  return didUpdateAnyProperties ? updatedWebViewDefinition : undefined;
}

/**
 * Clones and converts web view definition used in an actual docking tab into saveable web view
 * information by stripping out the members we don't want to save. Does not modify the original web
 * view definition.
 *
 * @param webViewDefinition Web view to save
 * @returns Saveable web view information based on `webViewDefinition`
 */
export function convertWebViewDefinitionToSaved(
  webViewDefinition: WebViewDefinition,
): SavedWebViewDefinition {
  const webViewDefinitionCloned: Omit<WebViewDefinition, 'content'> &
    Partial<Pick<WebViewDefinition, Exclude<SavedWebViewDefinitionOmittedKeys, 'styles'>>> &
    Partial<Pick<WebViewDefinitionReact, 'styles'>> = { ...webViewDefinition };

  SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS.forEach((key) => {
    delete webViewDefinitionCloned[key];
  });
  return webViewDefinitionCloned;
}

/** Explanation in web-view.service-model.ts */
async function getSavedWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  const webViewDefinition = (await getDockLayout()).getWebViewDefinition(webViewId);
  if (webViewDefinition === undefined) return undefined;

  return convertWebViewDefinitionToSaved(webViewDefinition);
}

/**
 * Gets the saved properties on the WebView definition with the specified ID
 *
 * @param webViewId The ID of the WebView whose saved properties to get
 * @returns Saved properties of the WebView definition with the specified ID or undefined if not
 *   found
 * @throws If the papi dock layout has not been registered
 */
export function getSavedWebViewDefinitionSync(
  webViewId: string,
): SavedWebViewDefinition | undefined {
  const webViewDefinition = getDockLayoutSync().getWebViewDefinition(webViewId);
  if (webViewDefinition === undefined) return undefined;

  return convertWebViewDefinitionToSaved(webViewDefinition);
}

// #endregion

// #region Web view options

/** Set up defaults for options for getting a web view */
function getWebViewOptionsDefaults(options: GetWebViewOptions): GetWebViewOptions {
  const optionsDefaulted = cloneDeep(options);
  if ('existingId' in optionsDefaulted && !('createNewIfNotFound' in optionsDefaulted))
    optionsDefaulted.createNewIfNotFound = true;

  return optionsDefaulted;
}

// #endregion

// #region Set up global variables to use in `getWebView`'s `imports` below

globalThis.getSavedWebViewDefinitionById = getSavedWebViewDefinitionSync;
globalThis.updateWebViewDefinitionById = updateWebViewDefinitionSync;

// #endregion

// #region getWebView

/**
 * Creates a new web view or gets an existing one depending on if you request an existing one and if
 * the web view provider decides to give that existing one to you (it is up to the provider).
 *
 * @param webViewType Type of WebView to create
 * @param layout Information about where you want the web view to go. Defaults to adding as a tab
 * @param options Options that affect what this function does. For example, you can provide an
 *   existing web view ID to request an existing web view with that ID.
 * @returns Promise that resolves to the ID of the webview we got or undefined if the provider did
 *   not create a WebView for this request.
 * @throws If something went wrong like the provider for the webViewType was not found
 */
export const getWebView = async (
  webViewType: WebViewType,
  layout: Layout = { type: 'tab' },
  options: GetWebViewOptions = {},
): Promise<WebViewId | undefined> => {
  const optionsDefaulted = getWebViewOptionsDefaults(options);
  // ENHANCEMENT: If they aren't looking for an existingId, we could get the webview without
  // searching for an existing webview and send it to the renderer, skipping the part where we send
  // to the renderer, then search for an existing webview, then get the webview

  // Get the webview definition from the webview provider
  const webViewProvider = await webViewProviderService.get(webViewType);

  if (!webViewProvider)
    throw new Error(`getWebView: Cannot find Web View Provider for webview type ${webViewType}`);

  // Find existing webView if one exists
  /** Either the existing webview with the specified ID or a placeholder webview if one was not found */
  let existingSavedWebView: SavedWebViewDefinition | undefined;
  // Look for existing webview
  if (optionsDefaulted.existingId) {
    // Expect this to be a tab.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const existingWebView = (await getDockLayout()).dockLayout.find(
      optionsDefaulted.existingId === '?'
        ? // If they provided '?', that means look for any webview with a matching webViewType
          (item) => {
            // This is not a webview
            if (!('data' in item)) return false;

            // Find any webview with the specified webViewType. Type assert the unknown `data`.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            return (item.data as WebViewDefinition).webViewType === webViewType;
          }
        : // If they provided any other string, look for a webview with that ID
          optionsDefaulted.existingId,
    ) as TabInfo | undefined;
    if (existingWebView) {
      // We found the webview! Save it to send to the web view provider
      existingSavedWebView = convertWebViewDefinitionToSaved(
        // Type assert the unknown `data`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        existingWebView.data as WebViewDefinition,
      );
      // Load the web view state since the web view provider doesn't have access to the data store
      existingSavedWebView.state = getFullWebViewStateById(existingWebView.id);
    }
  }

  // We didn't find an existing web view with the ID
  if (!existingSavedWebView) {
    // If we are not looking to create a new webview, then don't.
    if ('existingId' in optionsDefaulted && !optionsDefaulted.createNewIfNotFound) return undefined;
    // If we want to create a new webview, set a placeholder with a new ID
    existingSavedWebView = { webViewType, id: newGuid() };
  }

  // Create the new webview or load if it already existed
  const webView = await webViewProvider.getWebView(existingSavedWebView, optionsDefaulted);

  // The web view provider didn't want to create this web view
  if (!webView) return undefined;

  // Set up WebViewDefinition default values
  /** WebView.contentType is assumed to be React by default. Extensions can specify otherwise */
  const contentType = webView.contentType ? webView.contentType : WebViewContentType.React;
  /** Default allowScripts to false for WebViewContentType.URL and true otherwise */
  let { allowScripts } = webView;
  if (contentType !== WebViewContentType.URL) allowScripts = webView.allowScripts ?? true;
  /** Default allowSameOrigin to true */
  const allowSameOrigin = webView.allowSameOrigin ?? true;
  /**
   * Only allow connecting to `papi-extension:` and `https:` urls. For HTML and React WebViews, this
   * controls the `frame-src` directive and therefore which urls can be iframe `src`es in the
   * WebView. For URL WebViews, this controls what urls the WebView can be.
   */
  let { allowedFrameSources } = webView;
  if (contentType !== WebViewContentType.URL && allowedFrameSources)
    allowedFrameSources = allowedFrameSources.filter(
      (hostValue) => startsWith(hostValue, 'https:') || startsWith(hostValue, 'papi-extension:'),
    );

  // Validate the WebViewDefinition to make sure it is acceptable
  // If this is a URL WebView, it must match at least one of its `allowedFrameSources` Regex strings
  // if any are supplied
  if (
    contentType === WebViewContentType.URL &&
    allowedFrameSources &&
    !allowedFrameSources.some((regexString) => new RegExp(regexString).test(webView.content))
  )
    throw new Error(
      `getWebView: URL WebView content ${webView.content} did not match any of its allowedFrameSources!`,
    );

  if (webView.state)
    // The web view provider might have updated the web view state, so save it
    setFullWebViewStateById(webView.id, webView.state);

  // `webViewRequire`, `getWebViewStateById`, `setWebViewStateById` and `resetWebViewStateById` below are defined in `src\renderer\global-this.model.ts`
  // `useWebViewState` below is defined in `src\shared\global-this.model.ts`
  // We have to bind `useWebViewState` to the current `window` context because calls within PAPI don't have access to a webview's `window` context
  /**
   * String that sets up 'import' statements in the webview to pull in libraries and clear out
   * internet access and such
   *
   * WARNING: `window.top` is not deletable as a security feature (websites need to know if they are
   * running embedded in an iframe), so the child iframes are NOT isolated from their parents. We
   * perform a number of tasks to mitigate this issue, but it would be very nice to find a way to
   * properly delete `window.top`
   */
  const imports = `
  window.papi = window.parent.papi;
  window.React = window.parent.React;
  window.ReactJsxRuntime = window.parent.ReactJsxRuntime;
  window.ReactDom = window.parent.ReactDom;
  window.ReactDOMClient = window.parent.ReactDOMClient;
  window.createRoot = window.parent.createRoot;
  window.SillsdevScripture = window.parent.SillsdevScripture;
  var require = window.parent.webViewRequire;
  var getWebViewStateById = window.parent.getWebViewStateById;
  var setWebViewStateById = window.parent.setWebViewStateById;
  var resetWebViewStateById = window.parent.resetWebViewStateById;
  window.getWebViewState = (stateKey, defaultValue) => { return getWebViewStateById('${webView.id}', stateKey, defaultValue) };
  window.setWebViewState = (stateKey, stateValue) => { setWebViewStateById('${webView.id}', stateKey, stateValue) };
  window.resetWebViewState = (stateKey) => { resetWebViewStateById('${webView.id}', stateKey) };
  window.useWebViewState = window.parent.useWebViewState.bind(window);
  var getSavedWebViewDefinitionById = window.parent.getSavedWebViewDefinitionById;
  window.getSavedWebViewDefinition = () => { return getSavedWebViewDefinitionById('${webView.id}')}
  var updateWebViewDefinitionById = window.parent.updateWebViewDefinitionById;
  window.updateWebViewDefinition = (webViewDefinitionUpdateInfo) => { return updateWebViewDefinitionById('${webView.id}', webViewDefinitionUpdateInfo)}
  window.fetch = papi.fetch;
  window.WebSocket = papi.WebSocket;
  window.XMLHttpRequest = papi.XMLHttpRequest;
  delete window.parent;
  delete window.top;
  delete window.frameElement;
  `;

  /** Nonce used to allow scripts and styles to run */
  // TODO: Generating nonces every time causes webviews to rerender every time `getWebView` is used
  // on an existing webview such as when the extension host is restarted. Should we save webview
  // nonces so the `content` can be the same and not have to rerender?
  // Or this could solve the problem as well https://github.com/paranext/paranext-core/issues/282
  const srcNonce = newNonce();

  // Build the contents of the iframe
  let webViewContent: string;
  /** CSP for allowing only certain scripts and styles */
  let specificSrcPolicy: string;
  switch (contentType) {
    case WebViewContentType.HTML:
      // Add wrapping to turn a plain string into an iframe
      webViewContent = webView.content.includes('<html')
        ? webView.content
        : `<html><head></head><body>${webView.content}</body></html>`;
      // TODO: Please combine our CSP with HTML-provided CSP so we can add the import nonce and they can add nonces and stuff instead of allowing 'unsafe-inline'
      specificSrcPolicy = "'unsafe-inline'";
      break;
    case WebViewContentType.URL:
      webViewContent = webView.content;
      // CSP does not apply to these webViews. If we ever add a `csp` attribute to WebView iframes,
      // we might need to add this URL's schema to the CSP
      specificSrcPolicy = '';
      break;
    default: {
      // Defaults to React webview definition.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const reactWebView = webView as WebViewDefinitionReact;

      // Add the component as a script
      // WARNING: DO NOT add anything between the closing of the script tag and the insertion of
      // reactWebView.contents. Doing so would mess up debugging web views
      webViewContent = `
        <html>
          <head>
            ${
              reactWebView.styles
                ? `<style nonce="${srcNonce}">
              ${reactWebView.styles}
            </style>`
                : ''
            }
          </head>
          <body>
            <div id="root">
            </div>
            <script nonce="${srcNonce}">${reactWebView.content}

              function initializeReact() {
                const container = document.getElementById('root');
                const root = createRoot(container);

                function renderRoot() {
                  // Set up WebViewProps to pass into the WebView component
                  const savedWebViewDefinition = window.getSavedWebViewDefinition();

                  const webViewProps = {
                    ...savedWebViewDefinition,
                    useWebViewState: window.useWebViewState,
                    updateWebViewDefinition: updateWebViewDefinitionAndRender,
                  };

                  root.render(React.createElement(globalThis.webViewComponent, webViewProps));
                }

                function updateWebViewDefinitionAndRender(...params) {
                  const didSuccessfullyUpdate = window.updateWebViewDefinition(...params);

                  if (didSuccessfullyUpdate)
                    renderRoot();

                  return didSuccessfullyUpdate;
                }

                renderRoot();

                window.addEventListener('unload', () => {root.unmount()});
              }

              if (document.readyState === 'loading')
                document.addEventListener('DOMContentLoaded', initializeReact);
              else initializeReact();
            </script>
          </body>
        </html>`;
      specificSrcPolicy = `'nonce-${srcNonce}'`;
      break;
    }
  }

  /**
   * Content security policy header for the webview - controls what resources scripts and other
   * things can access.
   *
   * Design decisions and guiding principles at
   * https://github.com/paranext/paranext/wiki/Content-Security-Policy-Design
   *
   * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
   *
   * Please uncomment the image creation arbitrary code execution in `evil.js`'s WebView when you
   * make changes so we can double check it is still successfully blocked.
   */
  // default-src 'none' so things can't happen unless we allow them
  // script-src-elem allows script tags but not in-line attribute scripts. Using this instead of
  //   just `script-src` for lower chance of arbitrary code execution (and because index.ejs CSP has
  //   it)
  //   'self' so scripts can be loaded from us
  //   'wasm-unsafe-eval' because webview iframes want to use wasm
  //   papi-extension: so scripts can be loaded from installed extensions
  //     TODO: this probably doesn't work right now because it is purposely not included in the CSP
  //     in index.ejs. Test this once we fix webview code to be retrieved from the backend paranext-core#89
  //   ${specificSrcPolicy} so we can load the specific scripts needed from the iframe
  // style-src allows them to use style/link tags and style attributes on tags
  //   'self' so styles can be loaded from us
  //   papi-extension: so scripts can be loaded from installed extensions
  //   'unsafe-inline' because that's how bundled libraries' styles are loaded in :( like MUI
  // frame-src determines what iframes can be loaded
  //   This is derived from the WebViewDefinition's `allowedFrameSources`. WebViews must specify
  //   the host values they want to be listed here. Since this CSP inherits from the `index.ejs`
  //   CSP, these values must be within 'self', papi-extension:, and https:
  //   See `index.ejs` for more info on why these sources are allowed
  // object-src 'none' to prevent insecure object and embed until we have a reason to use them
  // worker-src determines from where they can run web workers
  //   'none' - we can consider changing if someone gives us a reason to run workers in the renderer
  // manifest-src determines what manifest can be loaded for this iframe
  //   for now, inherit 'none' from default-src - not sure why they would need a manifest
  // connect-src only communicate over the network through JS APIs as we allow
  //   'self' so the iframe can only communicate over the internet with us and not outside the
  //   iframe
  //   Note: because webview iframes are on same origin as parent window, they can still use things
  //   that are imported to their script via the imports string above and can call the parent
  //   window's objects directly. Objects passed through from the parent window still have full
  //   internet access. We must essentially assume they can find a way to access the internet
  //   through the same connect-src as index.ejs. However, it is probably best for them to use only
  //   things we give them from parent, so might as well keep it restricted here.
  // img-src load images
  //   'self' so images can be loaded from us
  //   papi-extension: so images can be loaded from installed extensions
  //   https: so they can load images over secure connections
  //   data: so they can load data urls
  // media-src load audio, video, etc
  //   'self' so media can be loaded from us
  //   papi-extension: so media can be loaded from installed extensions
  //   https: so media can be loaded over secure connections
  //   data: so they can load data urls
  // font-src load fonts
  //   'self' so fonts can be loaded from us
  //   papi-extension: so fonts can be loaded from installed extensions
  //   https: so fonts can be loaded over secure connections
  //   data: so they can load data urls
  // form-action 'self' lets the form submit to us
  //    TODO: not sure if this is needed. If we can attach handlers to forms, we can probably remove
  //    this
  // navigate-to 'none' prevents them from redirecting this iframe somewhere else
  //   WARNING: This is experimental and does not work as of July 2023! It is here for future
  //   compatibility in case they add support for it
  const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy"
    content="
      default-src 'none';
      script-src-elem 'self' 'wasm-unsafe-eval' papi-extension: ${specificSrcPolicy};
      style-src 'self' papi-extension: 'unsafe-inline';
      frame-src ${allowedFrameSources ? allowedFrameSources.join(' ') : ''};
      object-src 'none';
      worker-src 'none';
      connect-src 'self';
      img-src 'self' papi-extension: https: data:;
      media-src 'self' papi-extension: https: data:;
      font-src 'self' papi-extension: https: data:;
      form-action 'self';
      navigate-to 'none';
    ">`;

  // Add a script at the start of the head to give access to papi
  const headStart = indexOf(webViewContent, '<head');
  const headEnd = indexOf(webViewContent, '>', headStart);

  // Inject the CSP and import scripts into the html if it is not a URL iframe
  if (contentType !== WebViewContentType.URL)
    webViewContent = `${substring(webViewContent, 0, headEnd + 1)}
    ${contentSecurityPolicy}
    <script nonce="${srcNonce}">
    ${imports}
    </script>${substring(webViewContent, headEnd + 1)}`;

  const updatedWebView: WebViewTabProps = {
    ...webView,
    contentType,
    content: webViewContent,
    allowScripts,
    allowSameOrigin,
    allowedFrameSources,
  };

  const updatedLayout = (await getDockLayout()).addWebViewToDock(updatedWebView, layout);

  // If we received a layout (meaning it created a new webview instead of updating an existing one),
  // inform web view consumers that we added a new web view
  if (updatedLayout)
    onDidAddWebViewEmitter.emit({
      webView: convertWebViewDefinitionToSaved(updatedWebView),
      layout: updatedLayout,
    });

  return webView.id;
};

// #endregion

// #region Initialization

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Sets up the WebViewService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Set up subscriptions that the service needs to work

    // We do not want iframes to be able to create their own iframes and scripts in the main window
    // context so they cannot execute arbitrary scripts without sandboxing. This prevents them from
    // showing modals, navigating to different pages, etc.
    // These methods work as of July 2023

    // Create a MutationObserver that watches the document for added iframes that do not have
    // permission to be running and removes them before they execute any code.
    const observer = new MutationObserver(removeForbiddenElements);
    // We want the observer to watch for all elements added or removed in this document
    // This does not pay attention to elements in iframes. They already have sandboxing, so there
    // is no need
    // We also want to watch the 'src' and 'srcdoc' attributes on iframes to catch forbidden
    // iframes
    // We don't need to watch the sandbox attribute to make sure it doesn't change because sandbox
    // doesn't update unless an iframe is removed and added
    // https://stackoverflow.com/a/16135502/8535752
    observer.observe(document, {
      subtree: true,
      childList: true,
      attributeFilter: ['src', 'srcdoc'],
    });

    // #region delete some things on `window` for a quick prevention for same-origin child iframes
    // like HTML and React WebViews from doing things we don't want them to do
    // We can change these to monkey patches with validation that they are coming from the
    // renderer if we need them in the renderer or we can save out variables and use those

    // Following are a number of deletions that correspond to various iframe sandbox values
    // as noted in comments. HTML and React WebView iframes have access to these through
    // `window.top` because they are on the same origin, so we must prevent access in addition to
    // sandboxing

    // Remove the ability to do presentations
    // Corresponds to iframe sandbox `allow-presentation`
    // `window.navigator` does not have a setter but is configurable, so we redefine the property
    Object.defineProperty(window, 'navigator', {
      writable: false,
      value: new Proxy(globalThis.navigator, {
        get(obj, prop) {
          if (prop === 'presentation') return undefined;
          // Get the property on the object - doesn't matter what it is
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return obj[prop as keyof typeof obj];
        },
      }),
    });

    // Remove the ability to show modals
    // Corresponds to iframe sandbox `allow-modals`
    // @ts-expect-error we want to remove the ability to show modals
    delete globalThis.alert;
    // @ts-expect-error we want to remove the ability to show modals
    delete globalThis.confirm;
    // @ts-expect-error we want to remove the ability to show modals
    delete globalThis.print;
    // @ts-expect-error we want to remove the ability to show modals
    delete globalThis.prompt;

    // TODO: Remove the ability to change the screen orientation? https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
    // Corresponds to iframe sandbox `allow-orientation-lock`

    // TODO: Remove the ability to lock the pointer? https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
    // Corresponds to iframe sandbox `allow-pointer-lock`

    // Remove the ability to create popups
    // Corresponds to iframe sandbox `allow-popups`
    // @ts-expect-error we want to remove the ability to create popups
    delete globalThis.open;
    // @ts-expect-error we want to remove the ability to create popups
    delete globalThis.showModalDialog;

    // #endregion

    // #region monkey patches on `window` to prevent same-origin child iframes like HTML and React
    // WebViews from doing things we don't want them to do
    // WARNING: calling these requires us to generate a call stack, so all of these things should
    // be used as sparingly as possible since they are now less performant than usual

    // Monkey-patch document.createElement so new script tags cannot be added by anything but our
    // code (since we load renderer files in chunks)
    const createElementOriginal = document.createElement.bind(document);
    // If we name this function, we will need to change the regex testing the stack traces, and we
    // may also have trouble with minifying production code. Leaving this function unnamed keeps
    // things simpler
    // eslint-disable-next-line func-names
    document.createElement = function (...args: Parameters<Document['createElement']>) {
      const [tagNameCaps] = args;

      const tagName = tagNameCaps.toLowerCase();
      if (FORBIDDEN_HTML_TAGS.includes(tagName) || RESTRICTED_HTML_TAGS.includes(tagName)) {
        const stackTrace = Error().stack ?? '';
        const isInRenderer = getRendererScriptRegex().test(stackTrace);
        if (isInRenderer) {
          logger.debug(
            `Allowed ${tagName} on renderer document. If this isn't recognized, this is a very serious security violation.\nStack: ${stackTrace}`,
          );
        } else {
          const message = `Rejected creating new ${tagName} tag on renderer document! Not allowed.\nStack: ${stackTrace}`;
          // LogError puts an error in the console and throws an error. We don't want to scare
          // anyone with the script and iframe tags evil adds to test this feature, so let's not
          // log an error in development. But no exceptions when packaged
          if (globalThis.isPackaged || !stackTrace.includes('at evil.web-view.html'))
            throw new LogError(message);
          throw new Error(message);
        }
      }
      return createElementOriginal(...args);
    };

    // #endregion

    isInitialized = true;
  })();

  return initializePromise;
};

// #endregion

const papiWebViewService: WebViewServiceType = {
  onDidAddWebView,
  getWebView,
  getSavedWebViewDefinition,
};

async function openProjectSettingsTab(webViewId: string): Promise<Layout | undefined> {
  const settingsTabId = newGuid();
  const projectIdFromWebView = (await getSavedWebViewDefinition(webViewId))?.projectId;

  if (!projectIdFromWebView) return undefined;

  return addTab<SettingsTabData>(
    {
      id: settingsTabId,
      tabType: TAB_TYPE_PROJECT_SETTINGS_TAB,
      data: {
        projectId: projectIdFromWebView,
      },
    },
    {
      type: 'float',
      position: 'center',
      floatSize: { height: 400, width: 500 },
    },
  );
}

async function openUserSettingsTab(): Promise<Layout | undefined> {
  const settingsTabId = newGuid();

  return addTab<SettingsTabData>(
    {
      id: settingsTabId,
      tabType: TAB_TYPE_USER_SETTINGS_TAB,
      data: {},
    },
    {
      type: 'float',
      position: 'center',
      floatSize: { height: 400, width: 500 },
    },
  );
}

/** Register the network object that backs the PAPI webview service */
// To use this service, you should use `web-view.service.ts`
export async function startWebViewService(): Promise<void> {
  await initialize();
  await networkObjectService.set<WebViewServiceType>(
    NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
    papiWebViewService,
  );

  // This map should allow any functions because commands can be any function type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commandHandlers: { [commandName: string]: (...args: any[]) => any } = {
    'platform.openProjectSettings': openProjectSettingsTab,
    'platform.openUserSettings': openUserSettingsTab,
  };

  Object.entries(commandHandlers).forEach(([commandName, handler]) => {
    // Re-assert type after passing through `forEach`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    registerCommand(commandName as CommandNames, handler);
  });
}
