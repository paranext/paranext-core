/**
 * WebView service shard — the WebView service implementation for THIS window. Registered under a
 * window-scoped network object id (e.g. "WebViewService-1") so several windows can coexist; the
 * main process's `web-view.service-router.ts` publishes the generic name and forwards each call to
 * the window that should handle it.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 *
 * Don't expose this whole service on papi, just specific operations. The remaining exports are only
 * for services in the renderer to call.
 */
import defaultLayoutSupplement from '@renderer/components/docking/default-layout-supplement.json';
import { DefaultLayoutSupplementEntry } from '@renderer/components/docking/default-layout-supplement.model';
import {
  filterEnabledSupplementEntries,
  mergeDefaultLayoutSupplement,
} from '@renderer/components/docking/default-layout-supplement.util';
import {
  type SettingsTabData,
  TAB_TYPE_SETTINGS_TAB,
} from '@renderer/components/settings-tabs/settings-tab.component';
import { localThemeService } from '@renderer/services/theme.service';
import {
  deleteFullWebViewStateById,
  getFullWebViewStateById,
  setFullWebViewStateById,
} from '@renderer/services/web-view-state.service';
import FONT_STYLES_RAW from '@renderer/styles/fonts.css?raw';
import SCROLLBAR_STYLES_RAW from '@renderer/styles/scrollbar.css?raw';
import { LogError } from '@shared/log-error.model';
import {
  Layout,
  LayoutInfo,
  OnLayoutChange,
  PapiDockLayout,
  SavedTabInfo,
  TAB_TYPE_WEBVIEW,
  TabInfo,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import {
  OpenWebViewOptions,
  ReloadWebViewOptions,
  SAVED_WEBVIEW_DEFINITION_OMITTED_KEYS,
  SavedWebViewDefinition,
  SavedWebViewDefinitionOmittedKeys,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  WEB_VIEW_CONTENT_TYPE,
  WEBVIEW_DEFINITION_UPDATABLE_PROPERTY_KEYS,
  WebViewDefinition,
  WebViewDefinitionReact,
  WebViewDefinitionUpdateInfo,
  WebViewId,
  WebViewType,
} from '@shared/models/web-view.model';
import { sendCommand } from '@shared/services/command.service';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { startWorkspaceUpdate } from '@renderer/services/workspace-updating-store';
import {
  getLastOpenedProject,
  setLastOpenedProject,
} from '@renderer/services/last-opened-project-cache';
import { networkObjectService } from '@shared/services/network-object.service';
import {
  getServiceShardAttributes,
  WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE,
} from '@shared/models/service-shard.model';
import {
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
  request as sendNetworkRequest,
} from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import { webViewProviderService } from '@shared/services/web-view-provider.service';
import type { SettingNames } from 'papi-shared-types';
import { LayoutBase } from 'rc-dock';
import {
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
  getWebViewController,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  OpenWebViewEvent,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { markStartupOnce } from '@shared/utils/startup-timing.util';
import { newNonce } from '@shared/utils/util';
import cloneDeep from 'lodash/cloneDeep';
import memoizeOne from 'memoize-one';
import {
  AsyncVariable,
  deserialize,
  getErrorMessage,
  getStylesheetForTheme,
  indexOf,
  isPlatformError,
  isSerializable,
  isString,
  newGuid,
  split,
  startsWith,
  substring,
  THEME_STYLE_ELEMENT_ID,
  Unsubscriber,
  UnsubscriberAsync,
  wait,
} from 'platform-bible-utils';
import withWindowScopedWebViewIds, {
  stripWindowScopeFromWebViewId,
  withWindowScopedWebViewIdInTab,
} from '@renderer/components/docking/window-scoped-web-view-ids.util';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  buildSimpleLayoutForProject,
  SIMPLE_LAYOUT_EDITOR_TAB_ID,
  SIMPLE_LAYOUT_TAB_IDS,
  VISIBLE_SIMPLE_LAYOUT_TAB_IDS,
} from '@renderer/components/docking/simple-layout.builder';
import { trackSimpleLayoutTabsResolved as trackSimpleLayoutTabsResolvedImpl } from '@renderer/services/simple-layout-tabs-resolved.tracker';
import {
  GET_WINDOW_LAYOUT_REQUEST_TYPE,
  SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
  WindowLayoutGetResponse,
  WINDOW_EMPTIED_REQUEST_TYPE,
  WindowEmptiedReason,
  WindowEmptiedResponse,
} from '@shared/data/window-layout-persistence.model';
import {
  reconcileSavedLayout,
  savedLayoutHasAnyTabs,
} from '@shared/utils/saved-layout-reconciliation.util';
import {
  buildLegacyColorVarsLogMessage,
  transformLegacyColorVars,
} from './web-views/web-view-legacy-color-vars.util';

// These web view lifecycle emitters are created at module load as buffered emitters so they're
// usable immediately. Sync paths like `onLayoutChange` and `updateWebViewDefinitionSync` can run
// before the websocket finishes connecting; buffered emits are queued and flushed once each event
// registers (and the four register concurrently in the background rather than sequentially).

/**
 * @deprecated 13 November 2024. Changed to {@link onDidOpenWebViewBufferedEmitter}. This remains for
 *   now to support anyone listening to this event over websocket
 */
const onDidAddWebViewBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  {
    notification: {
      summary: 'Emitted when a WebView is created.',
      deprecated: true,
      params: [
        {
          name: 'webView',
          required: true,
          summary: 'The created WebView.',
          schema: { type: 'object' },
        },
      ],
    },
  },
);

/** Buffered emitter for when a webview is created */
const onDidOpenWebViewBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  {
    notification: {
      summary: 'Emitted when a WebView is created.',
      params: [
        {
          name: 'webView',
          required: true,
          summary: 'The created WebView.',
          schema: { type: 'object' },
        },
      ],
    },
  },
);

/** Buffered emitter for when a webview is updated. Only the latest update per webview matters. */
const onDidUpdateWebViewBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
  {
    notification: {
      summary: 'Emitted when a WebView is updated.',
      params: [
        {
          name: 'webView',
          required: true,
          summary: 'The updated WebView.',
          schema: { type: 'object' },
        },
      ],
    },
  },
  { bufferStrategy: { latestByKey: (event) => event.webView.id } },
);

/** Buffered emitter for when a webview is removed */
const onDidCloseWebViewBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  {
    notification: {
      summary: 'Emitted when a WebView is closed.',
      params: [
        {
          name: 'webView',
          required: true,
          summary: 'The closed WebView.',
          schema: { type: 'object' },
        },
      ],
    },
  },
);

/**
 * Emits an event for when a web view is created
 *
 * Actually emits two updates to support backwards compatibility with deprecated
 * {@link onDidAddWebViewBufferedEmitter}, but this will likely be removed at some point
 */
function emitOnDidOpenWebView(event: OpenWebViewEvent) {
  onDidAddWebViewBufferedEmitter.emit(event);
  onDidOpenWebViewBufferedEmitter.emit(event);
}

/** Event that emits with webView info when a webView is created */
export const onDidOpenWebView = getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);

/** Event that emits with webView info when a webView is updated */
export const onDidUpdateWebView = getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);

/** Event that emits with webView info when a webView is removed */
export const onDidCloseWebView = getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

/**
 * Alias for `window.open` because `window.open` is deleted to prevent web views from accessing it.
 * Do not give web views access to this function
 */
export const openWindow = window.open.bind(window);

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
 * Get Regex to test stack traces against for rendering Usersnap feedback forms on the renderer
 * document. Only Usersnap is allowed to create form and anchor tags. forms and anchor tags coming
 * from any other source throw an error.
 *
 * Note that sourceURLs can't have spaces in them, so we explicitly test for a space before the
 * source so bad actors can't put these special words into their sourceURL
 */
/* In development, safe errors look like this:
Error
	at document.createElement (http://localhost/renderer.dev.js...)
	at Kl (https://resources.usersnap.com/widget-assets/js/chunks/6057/cf91460f62d8c495661e.js...)
  ...
*/
/* In production, safe errors look like this:
Error
	at Qt.document.createElement (file:///C:/Users/app.asar/dist/renderer/renderer.js...)
	at Kl (https://resources.usersnap.com/widget-assets/js/chunks/6057/cf91460f62d8c495661e.js...)
  ...
*/
const getRendererUsersnapRegex = memoizeOne(() =>
  globalThis.isPackaged
    ? /^.+\s+.+ \S*document\.createElement \(file:\/\/\S*app.asar\/dist\/renderer\/renderer\.js\S*\)\s+.+ \(https?:\/\/resources\.usersnap\.com\/widget-assets\/js\/chunks\/\d+\/\w+\.js\S*\)/
    : /^.+\s+.+ \S*document\.createElement \(https?:\/\/\S*\/renderer\.dev\.js\S*\)\s+.+ \(https?:\/\/resources\.usersnap\.com\/widget-assets\/js\/chunks\/\d+\/\w+\.js\S*\)/,
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

// #endregion Security

// #region Dock layouts

/**
 * Legacy `localStorage` key the dock layout was saved under before per-window persistence moved
 * layouts into the main process's window-layouts structure. Only read (never written) anymore, and
 * only when the main process says this window should fall back to it — see `getLegacySavedLayout`.
 */
const DOCK_LAYOUT_KEY = 'dock-saved-layout';

/**
 * A per-window prefixed copy of {@link DOCK_LAYOUT_KEY} (`{windowId}_dock-saved-layout` — the prefix
 * scheme of `localStorage.service.ts`). Builds that scoped `localStorage` per window before layouts
 * moved into the main process's structure wrote the dock layout ONLY under such keys; the capture
 * group is the window id of the window that wrote the copy.
 */
const PREFIXED_DOCK_LAYOUT_KEY_PATTERN = new RegExp(`^(\\d+)_${DOCK_LAYOUT_KEY}$`);

/**
 * Layout a window with no saved entry starts from: nothing docked. Deliberately neither the dev
 * `testLayout` nor `simpleLayout` — a window opened mid-session starts empty.
 */
const EMPTY_DOCK_LAYOUT: LayoutInfo = { dockbox: { mode: 'horizontal', children: [] } };

/**
 * This window's id as a number, for addressing the main process's window layout persistence
 *
 * @throws If the window id is not set
 */
function getWindowIdOrThrow(): number {
  const windowId = Number.parseInt(globalThis.windowId ?? '', 10);
  if (Number.isNaN(windowId))
    throw new Error('windowId is not set. Check that the URL includes the windowId parameter.');
  return windowId;
}

/**
 * Cached value of the `platform.interfaceMode` setting.
 *
 * `saveLayout` runs on every layout change (tab focus, panel resize, drag, …). Reading the mode
 * with `await settingsService.get` there would add an async settings round-trip to each of those
 * high-frequency events and open a narrow race: a power-mode save dispatched just before a switch
 * to simple mode could resolve with the new `'simple'` value and silently drop the user's power
 * layout. We instead cache the mode here, seed it on the first `loadLayout`, and keep it current
 * via the `platform.interfaceMode` subscription in `registerDockLayout`, so the common path is
 * synchronous and race-free. `undefined` only before the first seed (very early startup), in which
 * case `saveLayout` falls back to a direct read.
 */
let currentInterfaceMode: 'simple' | 'power' | undefined;

/**
 * Bumped once per interface-mode switch (in either direction), so an in-flight switch can tell it
 * has been superseded by a newer one and bail out before mutating the dock or persisted storage.
 *
 * Rapid Power<->Simple toggling (e.g. the user changing their mind mid-switch, which can already
 * take multiple seconds) previously let two switches run concurrently: two overlay tokens
 * outstanding, two `SIMPLE_LAYOUT_TAB_IDS` trackers each satisfied by the other's events, and —
 * worse — a stale switch's `loadLayout` call could still fire `onLayoutChange` -> `saveLayout`
 * after `currentInterfaceMode` had already moved on, persisting the wrong layout into the wrong
 * slot. This is a plain counter, not a queue: a new switch always starts immediately (the user can
 * always abort/redirect an in-flight switch), and a superseded switch's tail self-cancels rather
 * than blocking behind it or racing it. See {@link startNewSwitchGeneration}.
 */
let switchGeneration = 0;

/**
 * Starts a new switch generation and returns it. Called once per user-initiated mode change (from
 * the `platform.interfaceMode` subscription below), and — via {@link handleSwitchToSimpleMode}'s
 * default parameter — once per standalone call for callers (tests) that invoke it directly outside
 * that subscription flow.
 */
function startNewSwitchGeneration(): number {
  switchGeneration += 1;
  return switchGeneration;
}

/** Create a new dock layout promise variable */
function createDockLayoutAsyncVar(): AsyncVariable<PapiDockLayout> {
  return new AsyncVariable<PapiDockLayout>('web-view.service-shard.platformDockLayout');
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
 * WARNING: Do not save the returned variable out anywhere because it can change, invalidating the
 * old one (see `registerDockLayout`). This includes using the same variable after `await`.
 * Preferably, just use this method directly every time you need to run something on the dock
 * layout.
 *
 * As such:
 *
 * ```typescript
 * await getDockLayout().doSomething();
 *
 * await someAsyncFunction();
 *
 * await getDockLayout().doSomethingElse();
 * ```
 *
 * @returns Promise that resolves to the papi dock layout
 */
export function getDockLayout(): Promise<PapiDockLayout> {
  return papiDockLayoutVar.promise;
}

/**
 * Get the papi dock layout synchronously _assuming_ it has been registered. This should be safe to
 * assume if you are accessing this from inside a tab's code
 *
 * WARNING: Do not save the returned variable out anywhere because it can change, invalidating the
 * old one (see `registerDockLayout`). This includes using the same variable after `await`.
 * Preferably, just use this method directly every time you need to run something on the dock
 * layout.
 *
 * As such:
 *
 * ```typescript
 * getDockLayoutSync().doSomething();
 *
 * await someAsyncFunction();
 *
 * getDockLayoutSync().doSomethingElse();
 * ```
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
 * When the dock layout changes, save it and do other processing as needed. This function is given
 * to the registered papiDockLayout to run when the dock layout changes.
 *
 * @param newLayout The changed layout to save.
 * @param _currentTabId The tab being changed
 * @param changeInfo Optional metadata about the change. Currently used only to detect a closed web
 *   view so the close event can be emitted with its definition.
 */
// TODO: We could short-circuit saveLayout when no meaningful change happened. - IJH 2023-05-1
const onLayoutChange: OnLayoutChange = async (newLayout, _currentTabId, changeInfo) => {
  if (changeInfo?.didCloseWebView && changeInfo.webViewDefinition) {
    // Buffered emit — usable even if a restored tab is closed before the websocket connects.
    onDidCloseWebViewBufferedEmitter.emit({
      webView: convertWebViewDefinitionToSaved(changeInfo.webViewDefinition),
    });
  }

  return saveLayout(newLayout);
};

/**
 * Collects the ids of all web view tabs present in layout information (docked, floated, and
 * maximized boxes) without loading it. Layout info tabs are `SavedTabInfo`-shaped, so a web view
 * tab is one whose `tabType` is {@link TAB_TYPE_WEBVIEW}; a web view tab's id is its `WebViewId`.
 *
 * Reads the layout data instead of querying the dock layout because rc-dock applies `loadLayout`
 * via React state, so the dock layout still reports the pre-load tabs immediately after a load.
 */
function collectWebViewIdsFromLayoutInfo(layout: LayoutInfo): Set<WebViewId> {
  const webViewIds = new Set<WebViewId>();

  const visit = (node: unknown): void => {
    if (!node || typeof node !== 'object') return;
    if ('tabs' in node && Array.isArray(node.tabs)) {
      node.tabs.forEach((tab: unknown) => {
        if (
          tab &&
          typeof tab === 'object' &&
          'tabType' in tab &&
          tab.tabType === TAB_TYPE_WEBVIEW &&
          'id' in tab &&
          typeof tab.id === 'string'
        )
          webViewIds.add(tab.id);
      });
    }
    if ('children' in node && Array.isArray(node.children)) node.children.forEach(visit);
  };

  visit(layout.dockbox);
  visit(layout.floatbox);
  visit(layout.maxbox);
  visit(layout.windowbox);

  return webViewIds;
}

/**
 * Emits {@link onDidCloseWebView} for every web view that was open before a whole-layout load and is
 * not present in the loaded layout. `PapiDockLayout.loadLayout` replaces all tabs at once without
 * running rc-dock's per-tab remove callback (the only other place the close event is emitted — see
 * `onLayoutChange`), so without this, web views discarded by a layout load (e.g. switching
 * `platform.interfaceMode`) would close silently and close subscribers — the window service's
 * last-selected tracker, web view nonce cleanup — would keep references to web views that no longer
 * exist.
 */
function emitCloseEventsForWebViewsRemovedByLayoutLoad(
  webViewsBeforeLoad: WebViewDefinition[],
  loadedLayout: LayoutInfo,
): void {
  const webViewIdsAfterLoad = collectWebViewIdsFromLayoutInfo(loadedLayout);
  webViewsBeforeLoad.forEach((webViewDefinition) => {
    if (!webViewIdsAfterLoad.has(webViewDefinition.id))
      onDidCloseWebViewBufferedEmitter.emit({
        webView: convertWebViewDefinitionToSaved(webViewDefinition),
      });
  });
}

/**
 * Returns the entries from {@link defaultLayoutSupplement} that should be applied to the layout,
 * filtering out any entries whose {@link DefaultLayoutSupplementEntry.flagSetting} is not `true`.
 */
async function getEnabledSupplementEntries(): Promise<DefaultLayoutSupplementEntry[]> {
  return filterEnabledSupplementEntries(
    defaultLayoutSupplement.tabs,
    // `flagSetting` is a product-supplied dynamic string; cast to the known-keys union that
    // `settingsService.get` expects. `filterEnabledSupplementEntries` checks it as `unknown` and
    // catches a rejected read, so an unknown key is safe.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (flagSetting) => settingsService.get(flagSetting as SettingNames),
    (entry, error) =>
      // A not-yet-contributed or disabled-extension setting throws ("No setting exists for key ...").
      // We skip just that entry rather than letting one bad flag take down layout loading.
      logger.warn(
        `getEnabledSupplementEntries: could not read flag setting '${
          entry.flagSetting
        }'; skipping supplement tab '${entry.tab.id}'. ${getErrorMessage(error)}`,
      ),
  );
}

/**
 * Which layout load is the current one. Bumped by every {@link loadLayout} call so a load can tell
 * that another one started after it and everything it has read is stale.
 *
 * Only the no-argument path can go stale, but it goes stale badly: it reads the interface mode,
 * then asks the main process for this window's saved layout (a round trip that retries, so
 * seconds), and ends by replacing the dock's ENTIRE contents. An interface-mode switch during that
 * stretch otherwise finishes first and is then overwritten by the earlier load's answer — the
 * layout for the mode the user just left, wiping everything they have done since. A load that finds
 * itself superseded therefore drops its answers instead of applying them.
 */
let layoutLoadGeneration = 0;

/**
 * The layout load currently in flight, if any.
 *
 * A load replaces the dock's ENTIRE contents with what it read before it started, so a web view
 * that arrives while one is in flight is wiped by it — and silently: the close events a load emits
 * are diffed against that same pre-arrival reading, so nothing disposes the controller, the nonce
 * and the state the arriving web view already registered. A load's own checkpoints catch this only
 * when it began against an EMPTY dock; a reload of a window that already has content in it cannot
 * tell what arrived during it from what it is replacing. Anything docking into this window waits
 * here instead.
 */
let layoutLoadInFlight: Promise<void> | undefined;

/**
 * How long {@link waitForLayoutLoadToSettle} waits for a load in flight. A load is a settings read
 * and one request to the main process, so this is generous for what it exists for — and a load
 * still retrying that request outruns it, which is the better trade in both directions: waiting
 * longer stalls a move the user is watching, and refusing to dock loses the web view outright
 * rather than possibly.
 */
const LAYOUT_LOAD_SETTLE_WAIT_MS = 2_000;

/**
 * Register the load about to run as the one anything docking into this window waits for, and answer
 * how to end that registration. See {@link layoutLoadInFlight}.
 */
function beginTrackedLayoutLoad(): () => void {
  let endLoad: () => void = () => {};
  const load = new Promise<void>((resolve) => {
    endLoad = resolve;
  });
  layoutLoadInFlight = load;
  return () => {
    // Not when a newer load has taken over: that one is what a waiter has to wait for now
    if (layoutLoadInFlight === load) layoutLoadInFlight = undefined;
    endLoad();
  };
}

/**
 * Wait, bounded, for the layout loads in flight to finish — see {@link layoutLoadInFlight}. Loads
 * rather than load: one superseded while this waits hands the dock to a newer one, and it is
 * whichever load actually reaches the dock that this exists to stay out of the way of.
 */
async function waitForLayoutLoadToSettle(): Promise<void> {
  let loadInFlight = layoutLoadInFlight;
  if (!loadInFlight) return;
  logger.debug('Waiting for the layout load in flight before docking into this window');
  const giveUp = wait(LAYOUT_LOAD_SETTLE_WAIT_MS).then(() => 'timed-out' as const);
  while (loadInFlight) {
    // Sequential by nature: each load in flight has to settle before the next can be waited on
    // eslint-disable-next-line no-await-in-loop
    const outcome = await Promise.race([loadInFlight.then(() => undefined), giveUp]);
    if (outcome === 'timed-out') {
      logger.warn(
        `A layout load did not settle within ${LAYOUT_LOAD_SETTLE_WAIT_MS} ms; docking into this window anyway`,
      );
      return;
    }
    loadInFlight = layoutLoadInFlight;
  }
}

/**
 * The {@link layoutLoadGeneration} of the load whose layout the dock actually holds. Set at each
 * point {@link loadLayout} hands a layout to the dock, so while it trails `layoutLoadGeneration` a
 * load is still on its way and the dock holds something OTHER than the layout this window should be
 * showing. {@link saveLayout} holds its pushes until the two agree, because pushing what the dock
 * holds in that stretch overwrites the user's real saved entry in the main process's structure.
 *
 * A load takes a while — it reads the interface mode, asks the main process for this window's saved
 * layout (a round trip that retries, so seconds), and reads the supplement flags — and every
 * ordinary layout change runs through `onLayoutChange` into `saveLayout` meanwhile: a web view
 * writing state, focus moving into a tab, a tab being activated. Two loads leave the dock holding
 * the wrong thing:
 *
 * - An INTERFACE-MODE SWITCH flips {@link currentInterfaceMode} the instant the setting changes (so a
 *   `saveLayout` racing the switch cannot push under the mode the user just left) while the dock
 *   still holds the OLD mode's layout. Going to simple that is harmless, since simple mode never
 *   pushes. Going to POWER, a push would persist the static simple layout as this window's power
 *   layout — permanently, since every later power-mode load restores that entry (headless columns
 *   and all, so two of its tab groups would render with no tab bar in power mode) and the legacy
 *   fallback is never consulted again.
 * - The INITIAL LOAD in `registerDockLayout` starts with the dock on rc-dock's empty default rather
 *   than anything of this window's. A push there would replace the saved entry with an empty layout
 *   — and an entry that HAS a layout is not eligible for the legacy fallback either (see
 *   `TrackedWindow.usesLegacyLayout` in `window-layout-persistence.service.ts`), so the window
 *   would start empty from then on.
 *
 * Comparing generations rather than counting loads in flight is what keeps the hold matched to
 * reality in both directions. A load that is superseded — or that throws — never marks itself
 * landed, so it cannot lift the hold on a dock it never wrote; and it cannot extend the hold
 * either, since the load that DOES reach the dock sets the marker to the current generation and
 * pushes resume immediately, however long the abandoned one takes to settle.
 *
 * That holds only because EVERY site that writes the dock checks `isSuperseded()` first, so this
 * can only ever move to the generation whose layout is actually in the dock — never backwards to a
 * load a newer one already replaced. A write site without that check would regress the marker below
 * `layoutLoadGeneration` and hold every push from then on, with nothing scheduled to reconcile the
 * dock. Keep the checkpoint if you add another write site.
 */
let layoutLoadGenerationInDock = 0;

/**
 * Loads layout information into the dock layout.
 *
 * Accepts either the shared model's opaque `LayoutInfo` or rc-dock's `LayoutBase`. The two are
 * structurally compatible at runtime; `LayoutInfo` is opaque in the shared model to keep callers
 * outside the docking module unaware of rc-dock's type. Callers inside the renderer that already
 * speak rc-dock (e.g. `buildSimpleLayoutForProject`) can pass `LayoutBase` directly without a
 * cast.
 *
 * @param layout If this parameter is provided, loads that layout information. If not provided, gets
 *   the persisted layout information and loads it into the dock layout.
 * @param options.persist Only meaningful when `layout` is provided (the no-arg branch never
 *   persists a _loaded_ layout back out — it only reacts to subsequent interactive changes via
 *   `onLayoutChange`). Defaults to `true`. Pass `false` when the caller knows — independent of
 *   whatever `currentInterfaceMode` reads at this moment — that this layout must never be persisted
 *   as this window's saved layout (e.g. the Simple-mode project-bound switch in
 *   `runProjectBoundSimpleSwitch`). This is a deliberate, explicit alternative to routing through
 *   `onLayoutChange` -> `saveLayout`'s implicit `currentInterfaceMode` read, which is the read that
 *   a superseded, still-in-flight switch could otherwise race (see `switchGeneration`'s doc comment
 *   for the incident this defends against).
 */
async function loadLayout(
  layout?: LayoutInfo | LayoutBase,
  options?: { persist?: boolean },
): Promise<void> {
  layoutLoadGeneration += 1;
  const thisGeneration = layoutLoadGeneration;
  /** Whether a load started after this one, making everything this one has read stale */
  const isSuperseded = () => thisGeneration !== layoutLoadGeneration;
  const dockLayoutVar = await getDockLayout();
  // Capture the web views open before the load so close events can be emitted for the ones the
  // new layout drops (see `emitCloseEventsForWebViewsRemovedByLayoutLoad`)
  const webViewsBeforeLoad = dockLayoutVar.getAllWebViewDefinitions();
  // Anything docking into this window waits for a load that has content to lose — see
  // `layoutLoadInFlight`. A load that began against an EMPTY dock needs no waiter: its own
  // checkpoints below drop it rather than wipe what arrived, and a routed open or move into a
  // brand-new window would otherwise wait on that window's own startup load every time.
  const endTrackedLoad = webViewsBeforeLoad.length > 0 ? beginTrackedLayoutLoad() : undefined;
  try {
    if (layout) {
      // NOTE: this branch intentionally does NOT apply the default-layout supplement — a caller
      // passing an explicit layout owns its full contents. A caller that wants supplement tabs
      // merged in must do it itself before calling `loadLayout` (see `runProjectBoundSimpleSwitch`
      // for an example, via `getEnabledSupplementEntries` + `mergeDefaultLayoutSupplement`).
      // Cross the rc-dock / shared-model boundary with one cast at this edge so callers don't have
      // to. Matches the convention in `platform-dock-layout.component.tsx`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const layoutAsInfo = layout as unknown as LayoutInfo;
      // Bumping the generation above is what lets this call cancel an in-flight no-argument load that
      // would otherwise land on top of it — when THIS is the newer load, the checkpoint below passes
      // and the older one drops its answer instead.
      if (isSuperseded()) {
        // The reverse ordering: a newer load reached the dock while this one was still awaiting it.
        // Writing now would replace the dock with content the user has already moved past AND regress
        // `layoutLoadGenerationInDock` below `layoutLoadGeneration`, which holds every subsequent
        // push with nothing scheduled to reconcile the dock. The caller owning this layout does not
        // make it current; only being the newest load does.
        logger.debug('Dropping an explicit layout load that a newer one superseded');
        return;
      }
      dockLayoutVar.loadLayout(layoutAsInfo);
      layoutLoadGenerationInDock = thisGeneration;
      emitCloseEventsForWebViewsRemovedByLayoutLoad(webViewsBeforeLoad, layoutAsInfo);
      // `loadLayout` doesn't run `onLayoutChange` on a programmatic load, so persist manually —
      // unless the caller explicitly opted out (see the `options.persist` doc above).
      if (options?.persist !== false) await saveLayout(layoutAsInfo);
      return;
    }

    // Pick the layout by interface mode (runs at startup and on every `platform.interfaceMode` change;
    // see the subscription in `registerDockLayout`):
    // - Power mode: this window's saved layout from the main process's window-layouts structure (see
    //   `getPersistedLayout` for the legacy and empty fallbacks).
    // - Simple mode: always the static `simpleLayout`. `saveLayout` no-ops in simple mode, so changes
    //   there are ephemeral and never clobber the saved power layout.
    const interfaceMode = await settingsService.get('platform.interfaceMode');
    if (isSuperseded()) {
      // A newer load owns the cache and the dock now. Seeding the cache with this reading would tell
      // `saveLayout` the wrong mode, which either drops the user's power-mode layout changes on the
      // floor or lets simple-mode changes clobber their saved power layout.
      logger.debug('Dropping a layout load that a newer one superseded while it read the mode');
      return;
    }
    // Seed/refresh the cache before loading so any `onLayoutChange` that the load triggers (and every
    // subsequent `saveLayout`) sees the current mode without another settings round-trip.
    currentInterfaceMode = interfaceMode;
    // Simple mode never calls `getPersistedLayout` — the static `simpleLayout` never signals pending
    // content, so this always keeps the default-layout supplement.
    const persistedResult =
      interfaceMode === 'simple'
        ? { layout: dockLayoutVar.simpleLayout, isPendingContent: false }
        : await getPersistedLayout(dockLayoutVar.testLayout, isSuperseded);
    if (persistedResult === undefined) {
      // The only reason `getPersistedLayout` withholds a layout: a newer load started while it was
      // waiting on the main process. Withholding rather than answering "empty" is what keeps this
      // from being a dock wipe if the checkpoint below is ever moved.
      logger.debug(
        'Dropping a layout load that a newer one superseded while it read the saved layout',
      );
      return;
    }
    const { layout: persistedLayout, isPendingContent } = persistedResult;
    /**
     * Whether web views arrived in the dock while this load was reading what to restore. Only a
     * load that began against an empty dock can answer yes, and for it the answer means everything
     * it read is stale: it asked what an empty window should start with, and a web view adopted or
     * opened during the read (a routed move lands in a fresh window while its saved-layout request
     * is still retrying) is in the dock but not in the answer. Applying the answer anyway would
     * wipe that web view — with no close event, since
     * {@link emitCloseEventsForWebViewsRemovedByLayoutLoad} only covers web views that were open
     * when the load began.
     */
    const didDockGainWebViewsDuringLoad = () =>
      webViewsBeforeLoad.length === 0 && dockLayoutVar.getAllWebViewDefinitions().length > 0;
    // Every layout gets its web view ids scoped to this window, including one restored from
    // persistence: a saved entry's ids carry the window id of the session that saved them (window
    // ids are not stable across restarts), and the legacy pre-multi-window layout carries unscoped
    // ids. Re-scoping replaces the suffix rather than stacking another one, so it is safe on both.
    const layoutToLoad = withWindowScopedWebViewIds(persistedLayout);
    if (isPendingContent) {
      if (didDockGainWebViewsDuringLoad()) {
        logger.debug(
          'Dropping a layout load that began against an empty dock: web views arrived while it read the saved layout',
        );
        return;
      }
      // A window created to receive one specific web view, routed separately, starts with nothing
      // else — skip the default-layout supplement entirely, without even fetching its flags.
      dockLayoutVar.loadLayout(layoutToLoad);
      emitCloseEventsForWebViewsRemovedByLayoutLoad(webViewsBeforeLoad, layoutToLoad);
      return;
    }
    // Supplement tabs join the layout below, after the scoping pass above has already run over it, so
    // scope each supplement tab itself — its id comes from a build-baked file and would otherwise be
    // the same in every window. Scoping here rather than re-scoping the merged layout also keeps the
    // merge's dedup working: it matches by exact id, so an unscoped supplement id would never match
    // the scoped copy already in a restored layout and the tab would be appended again on every load.
    const enabledEntries = (await getEnabledSupplementEntries()).map((entry) => ({
      ...entry,
      tab: withWindowScopedWebViewIdInTab(entry.tab),
    }));
    if (isSuperseded()) {
      // Point of no return: everything below replaces the dock's whole contents, and the saved-layout
      // request above can take seconds. The newer load has already loaded, or is about to load, the
      // layout that belongs there.
      logger.debug('Dropping a layout load that a newer one superseded before it reached the dock');
      return;
    }
    // Same checkpoint for content that arrived instead of a newer load — see the guard's declaration
    if (didDockGainWebViewsDuringLoad()) {
      logger.debug(
        'Dropping a layout load that began against an empty dock: web views arrived while it read the saved layout',
      );
      return;
    }
    if (enabledEntries.length === 0) {
      // Nothing to merge (the common/vanilla case) — load the base layout directly and skip the clone.
      dockLayoutVar.loadLayout(layoutToLoad);
      layoutLoadGenerationInDock = thisGeneration;
      emitCloseEventsForWebViewsRemovedByLayoutLoad(webViewsBeforeLoad, layoutToLoad);
      reportIfLoadedLayoutIsEmpty(layoutToLoad);
      return;
    }
    // KNOWN POWER-MODE LIMITATION (safe today — simple mode is the default and is immune): power mode
    // persists the merged layout, so a supplement tab saved while its flag was on lingers after a
    // flag-off run — provider-less, though closable, since the merge drops an entry's Simple-mode
    // `isClosable: false` pin outside simple mode. (Changing a tab's id across versions likewise
    // leaves a duplicate, since we dedup by exact id.) Fix when power mode lands: drop persisted
    // supplement tabs whose provider is no longer registered.
    // LayoutInfo is intentionally opaque in the shared model; cross to the concrete rc-dock shape here,
    // mirroring platform-dock-layout.component.tsx
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const layoutToLoadAsBase = layoutToLoad as unknown as LayoutBase;
    const supplementedLayout = mergeDefaultLayoutSupplement(
      layoutToLoadAsBase,
      enabledEntries,
      // The mode this layout belongs to. Each entry describes a tab's place in simple mode's fixed
      // columns, and this merge also runs against power mode's persisted layout, so the merge needs to
      // be told which one it is looking at rather than assuming the entries' home mode.
      interfaceMode,
      (entry, message) =>
        logger.warn(`mergeDefaultLayoutSupplement: supplement tab '${entry.tab.id}': ${message}`),
    );
    // convert back to the opaque LayoutInfo the dock layout API expects
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const supplementedLayoutInfo = supplementedLayout as unknown as LayoutInfo;
    dockLayoutVar.loadLayout(supplementedLayoutInfo);
    layoutLoadGenerationInDock = thisGeneration;
    // Emit close events for pre-existing web views the (supplemented) layout dropped
    emitCloseEventsForWebViewsRemovedByLayoutLoad(webViewsBeforeLoad, supplementedLayoutInfo);
    reportIfLoadedLayoutIsEmpty(supplementedLayoutInfo);
  } finally {
    endTrackedLoad?.();
  }
}

/**
 * The pre-multi-window saved layout, read from raw `localStorage` (not `localWindowStorage`, whose
 * migration path would clone the legacy layout into every window). Builds that scoped
 * `localStorage` per window wrote the dock layout only under prefixed keys
 * ({@link PREFIXED_DOCK_LAYOUT_KEY_PATTERN}), leaving the unprefixed key stale — so when any
 * prefixed copy exists, the one with the lowest window id (the earliest-created, main window of the
 * session that wrote them) is the newest saved layout and wins; the unprefixed
 * {@link DOCK_LAYOUT_KEY} is the fallback. Falls back to `defaultLayout` when there is no legacy
 * layout at all (a fresh profile).
 *
 * @param defaultLayout Layout to fall back to when no legacy layout is stored
 */
function getLegacySavedLayout(defaultLayout: LayoutInfo): LayoutInfo {
  let lowestPrefixedWindowId: number | undefined;
  for (let keyIndex = 0; keyIndex < localStorage.length; keyIndex += 1) {
    const match = localStorage.key(keyIndex)?.match(PREFIXED_DOCK_LAYOUT_KEY_PATTERN);
    if (match) {
      const prefixWindowId = Number(match[1]);
      if (lowestPrefixedWindowId === undefined || prefixWindowId < lowestPrefixedWindowId)
        lowestPrefixedWindowId = prefixWindowId;
    }
  }
  const saved =
    lowestPrefixedWindowId !== undefined
      ? localStorage.getItem(`${lowestPrefixedWindowId}_${DOCK_LAYOUT_KEY}`)
      : localStorage.getItem(DOCK_LAYOUT_KEY);
  const savedLayout: LayoutInfo | undefined = saved ? deserialize(saved) : undefined;
  return savedLayout || defaultLayout;
}

/**
 * How many times {@link getPersistedLayout} asks the main process for this window's saved layout
 * before giving up. The main process registers the handler before it creates any window, so a
 * failure can only be transient transport trouble, not a missing handler — worth a few retries.
 */
const GET_PERSISTED_LAYOUT_ATTEMPTS = 3;

/** How long {@link getPersistedLayout} waits between attempts */
const GET_PERSISTED_LAYOUT_RETRY_DELAY_MS = 2_000;

/**
 * Whether this window is running on a fallback layout because every `windowLayout:get` attempt
 * failed. While set, {@link saveLayout} holds its pushes: what the dock holds is NOT the user's
 * saved layout, and pushing it would overwrite the real saved entry in the main process's
 * structure. Cleared when a later {@link getPersistedLayout} gets an answer (e.g. the reload on an
 * interface-mode change).
 */
let isRunningOnFallbackLayout = false;

/** Whether the held-pushes situation has been logged — once per session, not per layout change */
let hasLoggedHeldLayoutPushes = false;

/**
 * The layout this window should restore, per the main process's window-layouts structure: this
 * window's saved entry, an empty layout for a window with no entry, or — for the one window a
 * legacy startup restores — the pre-multi-window layout from `localStorage`. Only that explicit
 * `legacy` answer may trigger the legacy read: when the request itself fails (after retries), the
 * window starts EMPTY instead — falling back to the shared legacy layout would clone it into
 * whichever window hit the failure — and pushes are held so the fallback cannot replace the user's
 * real saved entry (see {@link isRunningOnFallbackLayout}).
 *
 * Answers `undefined` — and only — when the load this read belongs to was superseded while it
 * waited. That is deliberately not a layout: an "empty layout" answer would be indistinguishable
 * from a genuine `empty`, leaving nothing but the caller's own staleness checkpoint between a
 * superseded load and a dock wiped clean.
 *
 * @param defaultLayout Layout to fall back to when the legacy path has nothing
 * @param isSuperseded Whether the load this read belongs to has since been replaced by a newer one
 * @returns The layout to load along with whether this window is waiting for routed content (in
 *   which case the caller skips the default-layout supplement — a window created for one specific
 *   web view starts with nothing else), or `undefined` if this load was superseded
 */
async function getPersistedLayout(
  defaultLayout: LayoutInfo,
  isSuperseded: () => boolean,
): Promise<{ layout: LayoutInfo; isPendingContent: boolean } | undefined> {
  let response: WindowLayoutGetResponse | undefined;
  for (let attempt = 1; attempt <= GET_PERSISTED_LAYOUT_ATTEMPTS; attempt += 1) {
    try {
      // Sequential retries: each attempt must settle before the next may start
      // eslint-disable-next-line no-await-in-loop
      response = await sendNetworkRequest<[number], WindowLayoutGetResponse>(
        GET_WINDOW_LAYOUT_REQUEST_TYPE,
        getWindowIdOrThrow(),
      );
      break;
    } catch (e) {
      logger.warn(
        `Could not get this window's saved layout from main (attempt ${attempt} of ${GET_PERSISTED_LAYOUT_ATTEMPTS}): ${getErrorMessage(e)}`,
      );
      if (attempt < GET_PERSISTED_LAYOUT_ATTEMPTS)
        // Sequential retries (see above)
        // eslint-disable-next-line no-await-in-loop
        await wait(GET_PERSISTED_LAYOUT_RETRY_DELAY_MS);
    }
  }
  // The retries above take seconds, which is long enough for a whole interface-mode round trip to
  // start and finish inside them. Only the current load may say what this window is running on: a
  // superseded load's answer is discarded either way, and letting its failure latch the flag would
  // hold every layout push for the rest of the session on behalf of a load that no longer counts.
  if (isSuperseded()) return undefined;
  if (!response) {
    isRunningOnFallbackLayout = true;
    logger.warn(
      `Could not get this window's saved layout after ${GET_PERSISTED_LAYOUT_ATTEMPTS} attempts; starting empty and holding layout pushes until a load succeeds`,
    );
    return { layout: EMPTY_DOCK_LAYOUT, isPendingContent: false };
  }
  isRunningOnFallbackLayout = false;
  if (response.kind === 'entry') return { layout: response.layout, isPendingContent: false };
  if (response.kind === 'empty') return { layout: EMPTY_DOCK_LAYOUT, isPendingContent: false };
  if (response.kind === 'pending-content')
    return { layout: EMPTY_DOCK_LAYOUT, isPendingContent: true };
  return { layout: getLegacySavedLayout(defaultLayout), isPendingContent: false };
}

/**
 * Report a freshly loaded layout that left this window's dock with no tab in it — unless this
 * window is running on a fallback layout, which is deliberately NOT the user's layout (see
 * {@link isRunningOnFallbackLayout}) and whose emptiness therefore says nothing about what the user
 * has. Docking Home into one would put a tab in a dock whose changes are held from persistence
 * anyway, and present a window the app could not load as a window the user emptied.
 *
 * @param layout The layout that was just loaded into the dock
 */
function reportIfLoadedLayoutIsEmpty(layout: LayoutInfo): void {
  if (isRunningOnFallbackLayout || savedLayoutHasAnyTabs(layout)) return;
  reportDockEmptied('born-empty');
}

/**
 * Pushes the current dock layout to the main process, which persists it in this window's entry of
 * the window-layouts structure — but only when the user is in power mode. Simple mode always
 * reloads the static `simpleLayout` (see `loadLayout`), so we deliberately skip pushing in simple
 * mode to avoid clobbering the user's saved power-mode layout.
 *
 * Reads the mode from the `currentInterfaceMode` cache (kept current by `loadLayout` and the
 * `platform.interfaceMode` subscription) so this stays synchronous on the hot path and avoids the
 * power-save-dropped-on-switch race. Falls back to a direct settings read only before the cache has
 * been seeded (very early startup).
 *
 * Also holds its push while a load is still on its way to the dock (`layoutLoadGenerationInDock !==
 * layoutLoadGeneration`; see that field's doc comment) — the dock in that stretch holds the layout
 * of the mode the user just left, or rc-dock's empty default at startup, and persisting that would
 * overwrite the real saved entry. Nothing is lost by holding: the load on its way replaces the
 * dock's whole contents anyway.
 *
 * As a second, content-based check, also refuses to persist a layout that still contains one of
 * Simple mode's fixed tab ids (`SIMPLE_LAYOUT_TAB_IDS`) while not in Simple mode. This is a strict
 * subset of what the structural `layoutLoadGenerationInDock` check above catches; it is retained as
 * a redundant safeguard and is slated for removal once the structural check's coverage is verified.
 * See `adr-layout-persistence-guard-retirement` in `.context/standards/Architecture-Decisions.md`
 * for the full reasoning.
 *
 * @param layout Layout to persist
 */
async function saveLayout(layout: LayoutInfo): Promise<void> {
  const interfaceMode =
    currentInterfaceMode ?? (await settingsService.get('platform.interfaceMode'));
  if (interfaceMode === 'simple') return;
  if (layoutLoadGenerationInDock !== layoutLoadGeneration) return;
  // TODO: retire this content-based guard in favor of the structural `layoutLoadGenerationInDock`
  // check above once its coverage is verified — see the doc comment above, and
  // `adr-layout-persistence-guard-retirement`, for context.
  const containedWebViewIds = collectWebViewIdsFromLayoutInfo(layout);
  // `SIMPLE_LAYOUT_TAB_IDS` is always unscoped (derived from the static `simpleLayout` at module
  // load, before any window id is involved), but a contaminating tab's live id may carry this
  // window's scope suffix (e.g. it arrived via `loadLayout`'s no-arg branch, which scopes every id
  // it loads) — strip it from each contained id before comparing, or a scoped contaminant would
  // silently slip past this guard.
  const normalizedContainedWebViewIds = new Set(
    [...containedWebViewIds].map(stripWindowScopeFromWebViewId),
  );
  if (SIMPLE_LAYOUT_TAB_IDS.some((id) => normalizedContainedWebViewIds.has(id))) {
    logger.warn(
      `Refused to persist a ${interfaceMode}-mode layout that still contains a Simple-mode tab id; leaving the previously-saved layout untouched.`,
    );
    return;
  }
  if (isRunningOnFallbackLayout) {
    // The dock holds a fallback, not the user's saved layout (see getPersistedLayout); pushing it
    // would replace the real saved entry in the main process's structure
    if (!hasLoggedHeldLayoutPushes) {
      hasLoggedHeldLayoutPushes = true;
      logger.warn(
        'Not pushing dock layout changes: this window is running on a fallback layout because its saved layout could not be loaded',
      );
    }
    return;
  }
  try {
    // Reconcile before pushing so phantom content (duplicate or orphaned tabs, empty panels) never
    // enters the persisted structure
    await sendNetworkRequest(
      SAVE_WINDOW_LAYOUT_REQUEST_TYPE,
      getWindowIdOrThrow(),
      reconcileSavedLayout(layout),
    );
  } catch (e) {
    logger.warn(`Could not push the dock layout to main for persistence: ${getErrorMessage(e)}`);
  }
}

/**
 * Register a dock layout React element to be used by this service to perform layout-related
 * operations
 *
 * @param dockLayout Dock layout element to register along with other important properties
 * @returns Function used to unregister this dock layout
 */
/**
 * Every webview id that has ever been the Simple-mode Scripture Editor tab's real id during this
 * renderer session, always stored **unscoped** (see {@link stripWindowScopeFromWebViewId}) — the
 * fixed id from `simpleLayout` and every id `trackSimpleEditorReplaceTab` adds are compared against
 * this set, and a live id may or may not carry this window's scope suffix depending on which
 * `loadLayout` branch loaded it (the no-arg branch scopes every id it loads; the fast path
 * (`buildSimpleLayoutForProject`) does not, and a `newGuid()`-minted replace-tab id never does
 * either). Normalizing everything to unscoped on the way in is what lets every lookup below use a
 * plain, scope-agnostic `.has()`. Seeded with the tab's fixed id from `simpleLayout`
 * (`SIMPLE_LAYOUT_EDITOR_TAB_ID`) — reused every time a fresh Simple layout loads, whether via the
 * Power → Simple fast path or the no-arg Simple-mode load (`simpleLayout` itself) — and grown by
 * `trackSimpleEditorReplaceTab` whenever an in-Simple project switch replaces the tab's content
 * with a freshly-generated webview id instead. Ids are never removed: they're random GUIDs, so
 * unbounded growth over a session is negligible and safer than guessing when it would be safe to
 * prune.
 */
const simpleEditorTabIds = new Set<string>([SIMPLE_LAYOUT_EDITOR_TAB_ID]);

/**
 * Keeps `simpleEditorTabIds` current across an in-Simple project switch, which does NOT reuse the
 * Simple layout's fixed Scripture Editor tab id. `resolveOpenEditorDispatch`
 * (`platform-scripture-editor.utils.ts`) dispatches that switch as `{ kind: 'replace-tab',
 * targetTabId }` against whichever id is _currently_ the Simple editor's — window-scoped or not,
 * depending on how the current layout was loaded (see {@link simpleEditorTabIds}) —
 * `addWebViewToDock`'s `replace-tab` case (`platform-dock-layout-storage.util.ts`) then swaps that
 * tab's whole `SavedTabInfo` — including its `id` — for the new webview's. So the position that
 * used to answer to a tracked id now answers to a freshly-generated one, and a filter keyed on a
 * fixed id (or even a fixed id list) alone stops matching after the very first in-Simple switch,
 * permanently. Called from `openOrReloadWebView` right after the dock placement lands, so the
 * retirement of the old id and the tracking of the new one happen atomically with the switch itself
 * — no window where an event for the new id could arrive before it's tracked.
 *
 * Deliberately does nothing when `targetTabId` isn't already tracked (e.g. a Power-mode replace-tab
 * on some other editor tab): only replacements that land on a tab this set already recognizes as
 * the Simple editor extend the tracking, so a Power tab can never join `simpleEditorTabIds` by
 * accident.
 */
function trackSimpleEditorReplaceTab(layout: Layout, newTabId: WebViewId): void {
  if (layout.type !== 'replace-tab') return;
  if (!simpleEditorTabIds.has(stripWindowScopeFromWebViewId(layout.targetTabId))) return;
  simpleEditorTabIds.add(stripWindowScopeFromWebViewId(newTabId));
}

/**
 * Keeps `last-opened-project-cache` current with the Simple-mode Scripture Editor tab's real
 * project, whenever it resolves — whether that's from a Power → Simple switch completing, or the
 * user picking a different project while already in Simple mode. Filtered to `simpleEditorTabIds`
 * (kept current by `trackSimpleEditorReplaceTab` — see its doc for why a fixed id alone isn't
 * enough), none of which a Power-mode editor tab can ever carry, so this needs no `isPowerMode`
 * check to stay accurate.
 *
 * Excludes published resources from the cache: `platform.isPublished` is stable, cheap metadata, so
 * checking it here keeps a resource from ever becoming a Power → Simple switch's fast-path target.
 */
function cacheLastOpenedSimpleProject(webView: SavedWebViewDefinition): void {
  if (webView.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) return;
  if (!simpleEditorTabIds.has(stripWindowScopeFromWebViewId(webView.id))) return;
  const { projectId } = webView;
  if (!projectId) return;
  projectLookupService
    .getMetadataForProject(projectId)
    .then((metadata) => {
      if (metadata.isPublished) return undefined;
      return setLastOpenedProject({ id: projectId });
    })
    .catch((err) => {
      logger.warn(
        `Could not resolve metadata for project ${projectId} before caching it as the last-opened Simple-mode project: ${getErrorMessage(err)}`,
      );
    });
}

export function registerDockLayout(dockLayout: PapiDockLayout): Unsubscriber {
  // Save the current async var so we know if it changed before we unsubscribed
  const currentPapiDockLayoutVar = papiDockLayoutVar;

  setDockLayout(dockLayout);

  // TODO: Strange pattern that we are setting a ref to a service function. Investigate changing
  // this pattern in some way. Maybe just export `onLayoutChange`?
  dockLayout.onLayoutChangeRef.current = onLayoutChange;

  // Fire-and-forget so `registerDockLayout` can stay sync. Guard the rejection, though: `loadLayout`
  // awaits settings reads (supplement flags), and an unhandled rejection here would leave the dock
  // unloaded (blank window).
  loadLayout().catch((err) => logger.warn(`Initial loadLayout failed: ${getErrorMessage(err)}`));

  const unsubscribeOnDidOpenWebViewForCache = onDidOpenWebView((event) =>
    cacheLastOpenedSimpleProject(event.webView),
  );
  const unsubscribeOnDidUpdateWebViewForCache = onDidUpdateWebView((event) =>
    cacheLastOpenedSimpleProject(event.webView),
  );

  // Reload the layout whenever `platform.interfaceMode` changes so the user-facing mode switcher
  // (see `UserProfilePopover`) can swap layouts live without a restart. Use
  // `retrieveDataImmediately: false` so we don't double-load on startup — `loadLayout` above
  // already handles the initial load.
  //
  // The subscribe call is async, but we don't want to make `registerDockLayout` itself async.
  // To keep cleanup safe even when the dock layout is unregistered before subscribe resolves, we
  // track the request with `unsubscribeRequested` and tear down inside the subscribe IIFE as
  // soon as we have the unsubscriber.
  let unsubscribeInterfaceMode: UnsubscriberAsync | undefined;
  let unsubscribeRequested = false;
  const subscribeToInterfaceMode = async () => {
    try {
      const unsub = await settingsService.subscribe(
        'platform.interfaceMode',
        async (newMode) => {
          if (isPlatformError(newMode)) {
            logger.warn(
              `Dock layout failed to read updated platform.interfaceMode setting: ${newMode}`,
            );
            return;
          }
          // All settings share one data provider data type, so the settings service notifies every
          // settings subscriber on any setting write, not just when `platform.interfaceMode`
          // changes. Only reload when the mode actually changed; otherwise an unrelated settings
          // write needlessly reloads the entire dock layout. `currentInterfaceMode` was seeded by
          // the `loadLayout()` call in `registerDockLayout`, so it reflects the real mode by the
          // time this fires.
          if (newMode === currentInterfaceMode) return;
          // Update the cache synchronously with the notification so any `saveLayout` racing the
          // switch reads the new mode immediately (before `loadLayout`'s own read resolves).
          currentInterfaceMode = newMode;
          // `loadLayout` holds layout pushes until its load reaches the dock — until then the dock
          // holds the old mode's layout, and persisting that under the new mode is what would
          // destroy the saved power layout on a simple->power switch. See
          // `layoutLoadGenerationInDock`. Both branches below route through `loadLayout` (directly
          // or via `runProjectBoundSimpleSwitch`), so that protection applies regardless of which
          // one runs; `startNewSwitchGeneration` is a separate, higher-level guard against
          // overlapping mode switches (see its doc comment).
          const generation = startNewSwitchGeneration();
          if (newMode === 'simple') await handleSwitchToSimpleMode(generation);
          else await loadLayoutWithWarning(generation);
        },
        { retrieveDataImmediately: false },
      );
      if (unsubscribeRequested) {
        // The dock layout was unregistered before we got the unsubscriber back — tear down now.
        try {
          await unsub();
        } catch (err) {
          logger.warn(
            `Dock layout failed to unsubscribe from platform.interfaceMode: ${getErrorMessage(err)}`,
          );
        }
      } else {
        unsubscribeInterfaceMode = unsub;
      }
    } catch (err) {
      logger.warn(
        `Dock layout failed to subscribe to platform.interfaceMode: ${getErrorMessage(err)}`,
      );
    }
  };
  subscribeToInterfaceMode();

  // Return an unsubscriber to unregister this dock layout. The primary situation in which I see
  // this happening is when you change something on the renderer that causes a live hot reload
  return () => {
    // Somehow this is not the registered dock layout anymore
    if (papiDockLayoutVar !== currentPapiDockLayoutVar)
      throw new Error('Tried to unregister an old dock layout');

    unsubscribeOnDidOpenWebViewForCache();
    unsubscribeOnDidUpdateWebViewForCache();

    unsubscribeRequested = true;
    if (unsubscribeInterfaceMode) {
      const unsub = unsubscribeInterfaceMode;
      unsubscribeInterfaceMode = undefined;
      const runUnsubscribe = async () => {
        try {
          await unsub();
        } catch (err) {
          logger.warn(
            `Dock layout failed to unsubscribe from platform.interfaceMode: ${getErrorMessage(err)}`,
          );
        }
      };
      runUnsubscribe();
    }

    setDockLayout(undefined);

    return true;
  };
}

/**
 * Bound on the whole {@link getMostRecentUsableProjectId} walk (recents fetch plus every candidate's
 * `isPublished` check) while resolving the Simple-mode cold-start path (no cached last-opened
 * project). Without this, a slow or not-yet-registered PDP factory can leave
 * `projectLookupService.getMetadataForProject` waiting up to 20s for a factory plus a further
 * startup-grace retry loop (see `project-lookup.service-model.ts`), stalling the whole switch for
 * tens of seconds - defeating the point of this being the "fast" switch path.
 */
export const COLD_START_LOOKUP_TIMEOUT_MS = 3000;

/**
 * Bound on {@link waitForNextPaint}. A double `requestAnimationFrame` normally resolves in well
 * under this (roughly one or two display frames), so this timeout never fires in the visible case -
 * it exists only for the hidden/occluded-window case (see {@link waitForNextPaint}'s doc comment),
 * where rAF never calls back at all.
 */
export const PAINT_WAIT_TIMEOUT_MS = 500;

/**
 * Sentinel distinguishing "timed out" from a lookup that legitimately resolved to `undefined` (e.g.
 * no recent project on a fresh profile) - the two need different log treatment, since the latter is
 * an expected, non-warning-worthy outcome.
 */
const LOOKUP_TIMED_OUT = Symbol('lookup-timed-out');

/**
 * Races an async lookup against a bound. `getMostRecentUsableProjectId` already catches its own
 * errors internally and never rejects, so a plain `Promise.race` (rather than `waitForDuration`
 * from `platform-bible-utils`, which collapses a timeout and a resolved `undefined` to the same
 * result) is enough to distinguish the two outcomes for logging.
 */
async function withTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number,
): Promise<T | typeof LOOKUP_TIMED_OUT> {
  const timedOut: Promise<typeof LOOKUP_TIMED_OUT> = wait(timeoutMs).then(() => LOOKUP_TIMED_OUT);
  return Promise.race([fn(), timedOut]);
}

/**
 * Drives the power → simple transition from the renderer. The bare `simpleLayout` declares multiple
 * tabs with empty state (no `projectId`); restoring it would mount those empty webviews, fire
 * `onDidOpenWebView` for each, trigger the default-project picker, and then reload all those
 * webviews with the project — paying a full webview teardown + remount cycle twice. Power mode
 * avoids this because its persisted layout already has every tab's state populated.
 *
 * To match the power-mode shape, we resolve the most-recent project here, bake its `projectId` into
 * a cloned simple layout via {@link buildSimpleLayoutForProject}, and pass that to `loadLayout`.
 * Each web-view provider's `getWebView` then receives `savedWebView.projectId` directly from the
 * layout — same code path power mode uses on restore — and renders project content immediately,
 * with no empty-placeholder → reload round-trip.
 *
 * Fast path: `getLastOpenedProject` returns the cached id synchronously (kept current by the
 * Scripture Editor tab event subscription further down this file).
 *
 * Slow path: cold start (no cache yet) — fall back to {@link getMostRecentUsableProjectId}, which
 * walks the recents list trying each candidate until one isn't a published resource, bounded
 * overall by {@link COLD_START_LOOKUP_TIMEOUT_MS}.
 *
 * Fallback: if neither cache nor recents can produce a usable project, load the bare `simpleLayout`
 * and let the picker do the slow legacy path.
 *
 * @param generation This switch's generation (see {@link switchGeneration}). Defaults to starting a
 *   fresh one, for callers (tests) invoking this directly rather than through the
 *   `platform.interfaceMode` subscription, which starts one itself before calling this.
 */
export async function handleSwitchToSimpleMode(
  generation: number = startNewSwitchGeneration(),
): Promise<void> {
  // Declared here, assigned inside `try` below (not called here directly) - so a throw from
  // `startWorkspaceUpdate()` itself, or from the paint wait right after it, still reaches `catch`/
  // `finally` instead of escaping as an unhandled rejection in the `platform.interfaceMode`
  // subscription callback that calls this function, and `finally` can tell (via `?.`) whether the
  // overlay actually needs releasing.
  let releaseWorkspaceUpdate: (() => void) | undefined;
  // Set right before returning from a successful `runProjectBoundSimpleSwitch` call, so `finally`
  // below knows whether (and for which project) to finalize the switch's side effects. Left
  // `undefined` for every path that didn't actually load a project-bound layout.
  let switchedProjectId: string | undefined;
  try {
    // Raised here, before any lookup - not just before the layout swap inside
    // `runProjectBoundSimpleSwitch` - so the still-visible Power layout is blocked from interaction
    // for the whole switch, including the cold-start path's recents lookup, which otherwise gives no
    // feedback that a switch is even happening. A live per-webview "editing disabled" signal on the
    // active Power editor would be more targeted, but has no reactive channel today
    // (`setFullWebViewStateById` only seeds state before a webview mounts, not for an already-mounted
    // one) - raising the overlay this early is the practical stand-in.
    releaseWorkspaceUpdate = startWorkspaceUpdate();
    // Force React to commit + browser to paint the overlay BEFORE any lookup, otherwise the show can
    // batch with later state changes and the overlay never actually appears on screen. Bounded: see
    // waitForNextPaint's doc comment for the hidden/occluded-window case this guards against.
    await withTimeout(waitForNextPaint, PAINT_WAIT_TIMEOUT_MS);

    const cached = getLastOpenedProject();
    if (cached) {
      await runProjectBoundSimpleSwitch(cached.id, generation);
      switchedProjectId = cached.id;
      return;
    }

    const resolvedId = await withTimeout(
      getMostRecentUsableProjectId,
      COLD_START_LOOKUP_TIMEOUT_MS,
    );
    if (resolvedId === LOOKUP_TIMED_OUT) {
      logger.warn(
        `Timed out after ${COLD_START_LOOKUP_TIMEOUT_MS}ms resolving a usable most-recent project while switching to Simple mode; loading the bare layout instead.`,
      );
    }
    if (!resolvedId || resolvedId === LOOKUP_TIMED_OUT) {
      await loadLayoutWithWarning(generation);
      return;
    }
    // Populate the cache so the next switch can take the fast path.
    setLastOpenedProject({ id: resolvedId });
    await runProjectBoundSimpleSwitch(resolvedId, generation);
    switchedProjectId = resolvedId;
  } catch (err) {
    // `runProjectBoundSimpleSwitch` logs its own warning and deliberately rethrows on failure (see
    // its own catch/comment), so this catch is the normal recovery point when the project-bound load
    // fails, and also the backstop for anything else upstream that throws unexpectedly. Either way, a
    // settings-subscription callback must never produce an unhandled rejection, and the dock must
    // never be left stuck on the pre-switch layout while `platform.interfaceMode` already reads
    // `'simple'`.
    logger.warn(
      `Switching to Simple mode failed unexpectedly (${getErrorMessage(err)}); falling back to the bare layout.`,
    );
    await loadLayoutWithWarning(generation);
  } finally {
    // Let the resolved tabs paint behind the overlay before we hide it, so the user sees a clean
    // handoff (overlay → tabs) instead of a flash of an unresolved layout. Bounded: without this,
    // a hidden/occluded window would leave the overlay stuck up until the workspace-updating
    // store's own 30s leash (see waitForNextPaint's doc comment).
    await withTimeout(waitForNextPaint, PAINT_WAIT_TIMEOUT_MS);
    // Optional: `startWorkspaceUpdate()` above may never have run (or may have thrown before
    // assigning) if something upstream failed first - nothing to release in that case.
    releaseWorkspaceUpdate?.();
    // Fire non-blocking, after the overlay has already released above, and only if this switch
    // actually loaded a project-bound layout and is still current (not superseded by a newer
    // switch while the above was in flight). This has to live in `finally` rather than after the
    // whole try/catch/finally: the fast path above returns early from inside `try`, and `finally`
    // is the only place that still runs on every path, early return included.
    if (switchedProjectId && generation === switchGeneration) {
      finalizeProjectSwitch(switchedProjectId);
    }
  }
}

/**
 * Wrapper around `loadLayout()` that catches any failure and logs a single consistent warning. Used
 * by the mode-change subscription and the fast-switch fallback — both paths want
 * "load-and-keep-going" semantics rather than propagating the error.
 *
 * @param generation This switch's generation (see {@link switchGeneration}). Skips the load entirely
 *   if a newer switch has since started — a superseded switch must never overwrite the dock with
 *   its now-stale target layout.
 */
async function loadLayoutWithWarning(generation: number): Promise<void> {
  if (generation !== switchGeneration) return;
  try {
    await loadLayout();
  } catch (err) {
    logger.warn(
      `Dock layout failed to reload after interface mode change: ${getErrorMessage(err)}`,
    );
  }
}

async function runProjectBoundSimpleSwitch(projectId: string, generation: number): Promise<void> {
  if (generation !== switchGeneration) return; // superseded before this switch even started

  // The tracker is acquired *inside* `try` (not before it) so a throw from it still reaches
  // `catch`/`finally` below. `finally` only disposes it if it was actually acquired.
  let tabsResolved: ReturnType<typeof trackSimpleLayoutTabsResolvedImpl> | undefined;
  try {
    const projectBoundLayout = buildSimpleLayoutForProject(projectId);
    // `loadLayout`'s explicit-layout branch deliberately does not apply the default-layout
    // supplement (a caller passing an explicit layout owns its full contents) - so this caller
    // must merge it in itself, mirroring what `loadLayout`'s own no-arg branch does. Without this,
    // an enabled supplement tab (e.g. Scripture Text Grid) shows on a cold Simple start but
    // disappears after every Power -> Simple switch.
    const enabledEntries = await getEnabledSupplementEntries();
    const layoutToLoad =
      enabledEntries.length === 0
        ? projectBoundLayout
        : mergeDefaultLayoutSupplement(
            projectBoundLayout,
            enabledEntries,
            'simple',
            (entry, message) =>
              logger.warn(
                `mergeDefaultLayoutSupplement: supplement tab '${entry.tab.id}': ${message}`,
              ),
          );
    // Re-check right before the mutating load: a newer switch (the user changing their mind) may
    // have started and become current during the awaits above. A superseded switch must never
    // reach `loadLayout` — that's what would let it persist stale data into the wrong slot (see
    // `switchGeneration`'s doc comment). Nothing to dispose yet on this branch — the tracker below
    // hasn't armed.
    if (generation !== switchGeneration) return;
    // Start tracking webview-resolved events BEFORE `loadLayout` fires the async
    // `retrieveWebViewContent` calls — otherwise the events for fast-resolving tabs can fire before
    // we subscribe and we'd miss them. Especially important on subsequent simple-mode switches,
    // where the previous switch's resolved titles are still in the dock layout and the new update
    // events for them are what tell us the project content has actually landed. Armed here — right
    // before `loadLayout`, after the settings read above — rather than at the top of this function:
    // arming earlier would start the tracker's own timeout clock ticking against the awaited
    // supplement-settings round trip, not against the tabs it's actually meant to time.
    // Only the tabs that are actually on-screen should gate the overlay: Column 3 of `simpleLayout`
    // stacks other tabs behind the one active tab, and the others are mounted-but-hidden (rc-dock
    // `display: none`) - waiting on them too would block the overlay on content the user can't even
    // see yet. `VISIBLE_SIMPLE_LAYOUT_TAB_IDS` is the narrower subset; see its doc comment in
    // simple-layout.builder.ts for what it does and does not account for.
    tabsResolved = trackSimpleLayoutTabsResolvedImpl({
      tabIds: VISIBLE_SIMPLE_LAYOUT_TAB_IDS,
      onDidOpenWebView,
      onDidUpdateWebView,
    });
    // `persist: false` is defense-in-depth alongside the generation check above: even if this
    // switch is (impossibly, as far as this function knows) still current, a Simple-mode layout
    // must never be written to the Power-mode storage key regardless of what `currentInterfaceMode`
    // reads by the time `loadLayout` would otherwise call `saveLayout`.
    await loadLayout(layoutToLoad, { persist: false });
    // Wait for every visible simple-layout tab's webview to fire its open/update event, which is
    // when `loadWebViewTab` replaces the `%tab_title_unknown%` placeholder with the real title.
    const { timedOut } = await tabsResolved.promise;
    if (timedOut) {
      logger.warn(
        `Simple-mode layout tabs for project ${projectId} timed out before all resolved; the overlay was released anyway so the switch doesn't hang indefinitely.`,
      );
    }
  } catch (err) {
    logger.warn(
      `Dock layout failed to load project-bound Simple-mode layout for project ${projectId}: ${getErrorMessage(err)}`,
    );
    // Rethrow so the caller (`handleSwitchToSimpleMode`) can fall back to the bare layout instead
    // of silently leaving the dock on whatever it showed when this failed.
    throw err;
  } finally {
    // `dispose` is idempotent (a no-op once the tracker has already finished) - safe to call
    // unconditionally here even on the happy path, where `await tabsResolved.promise` above means
    // the tracker already disposed itself. One unconditional cleanup site is easier to trust than
    // reasoning about which of several paths already handled it. The overlay itself is the
    // caller's (`handleSwitchToSimpleMode`'s) responsibility now, since it spans the whole switch,
    // not just this layout swap.
    tabsResolved?.dispose();
  }
}

/**
 * Resolves after the next browser paint. Double `requestAnimationFrame` so we wait one frame for
 * React to commit + browser to paint, and a second frame to ensure that paint has been flushed
 * before the caller proceeds. Falls back to immediate resolution in environments that don't provide
 * `requestAnimationFrame` (some test runners).
 *
 * Hidden/occluded-window case: Electron/Chromium's `backgroundThrottling` (on by default) stops rAF
 * callbacks from ever firing while the window is minimized or occluded - it doesn't remove
 * `requestAnimationFrame` or make it throw, the callback just never runs. So this alone would hang
 * forever if the switch happens while the window isn't visible. Every call site races this against
 * {@link PAINT_WAIT_TIMEOUT_MS} and proceeds either way - deliberately not logged as a warning on
 * timeout, since a hidden window during a mode switch is a normal condition, not a fault.
 */
function waitForNextPaint(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof requestAnimationFrame !== 'function') {
      resolve();
      return;
    }
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
}

/**
 * Resolves the most-recently-opened project id that's usable as a Simple-mode switch target, trying
 * each entry in `recentlyOpenedProjects` (most-recent first, already capped at
 * `MAX_RECENT_PROJECTS` by the provider) in order until one isn't a published resource, or the list
 * is exhausted. Mirrors `tryOpenFromRecentlyOpened`'s same try-next-candidate pattern in
 * `platform-scripture-editor.utils.ts` (the default project picker's own recents fallback) - but
 * scoped to what this fast-path switch needs: a project id, not an opened editor. A published
 * resource is never a valid target here, matching `cacheLastOpenedSimpleProject`'s exclusion on the
 * live event-driven cache-write path - this is a different mechanism (a one-shot recents read, not
 * a webview event), so it needs its own check to stay consistent with that one.
 *
 * The whole walk (recents fetch + every candidate's metadata lookup) shares one bound from the
 * caller ({@link COLD_START_LOOKUP_TIMEOUT_MS}, via `withTimeout`), not a bound per candidate -
 * otherwise a full walk of a slow list could take several times the intended "fast path" budget.
 */
async function getMostRecentUsableProjectId(): Promise<string | undefined> {
  try {
    const recentsProvider = await dataProviderService.get(
      'platformScripture.recentlyOpenedProjects',
    );
    if (!recentsProvider) return undefined;
    const recents = await recentsProvider.getRecentProjects(undefined);
    if (!Array.isArray(recents)) return undefined;
    // `reduce` with a Promise accumulator (rather than a `for` loop) tries each candidate
    // sequentially: each callback awaits the previous result before deciding whether to check the
    // next candidate, so this doesn't check every candidate in parallel - it stops at the first
    // usable one. Mirrors `tryOpenFromRecentlyOpened`'s identical accumulator in
    // `platform-scripture-editor.utils.ts`.
    return await recents.reduce(async (prev: Promise<string | undefined>, candidateId: string) => {
      const usableId = await prev;
      if (usableId !== undefined) return usableId;
      const isPublished = await resolveProjectIsPublished(candidateId);
      return isPublished ? undefined : candidateId;
    }, Promise.resolve<string | undefined>(undefined));
  } catch (err) {
    // Distinct from a timeout (logged separately by the caller, which races this whole function
    // against COLD_START_LOOKUP_TIMEOUT_MS via withTimeout): this is a genuine failure of the
    // recents provider itself (e.g. unreachable PDP), not this function running out of time. Without
    // this, a real failure and an empty-recents-list cold start (also `undefined`, not an error)
    // would be indistinguishable in the logs.
    logger.warn(
      `Could not resolve a usable recent project while switching to Simple mode: ${getErrorMessage(err)}`,
    );
    return undefined;
  }
}

/**
 * Resolves whether a candidate project from {@link getMostRecentUsableProjectId} is a published
 * (read-only) resource. Defaults to `false` on a lookup failure, matching `platform.isPublished`'s
 * own "absent means not a resource" default (see `project-metadata.model.ts`) - the safer
 * assumption is to proceed with the candidate rather than silently skip it over a transient lookup
 * error.
 */
async function resolveProjectIsPublished(projectId: string): Promise<boolean> {
  try {
    const metadata = await projectLookupService.getMetadataForProject(projectId);
    return metadata.isPublished === true;
  } catch (err) {
    logger.warn(
      `Could not resolve whether project ${projectId} is a published resource while switching to Simple mode, assuming it is not: ${getErrorMessage(err)}`,
    );
    return false;
  }
}

/**
 * Finalizes a project-bound Simple-mode switch by replaying the side effects
 * `platformScriptureEditor.openScriptureEditor` normally performs on project open/switch (S/R sync,
 * admin's shared layout auto-apply, recording recently-opened) — which the switch above bypasses by
 * baking `projectId` directly into the layout instead of going through that command's driver logic.
 * Calling `openScriptureEditor` itself here would not work: with `projectId` already baked in, its
 * dispatch resolves to `focus-existing` and returns before any of those side effects run (see
 * `resolveOpenEditorDispatch` in platform-scripture-editor.utils.ts), so this instead calls a
 * purpose-built command that runs them directly.
 *
 * Deliberately fire-and-forget and called only after the switch's overlay has already released: the
 * whole reason this switch bakes the layout directly is performance, so blocking the visible switch
 * on this command's network round trip would erode that win. This timing choice is specific to this
 * already-fast, already-rendered switch — a future cold-start caller of this same machinery should
 * re-evaluate rather than assume the same non-blocking-after-release shape fits, since cold start
 * has no already-rendered UI whose perceived latency this is protecting.
 */
function finalizeProjectSwitch(projectId: string): void {
  sendCommand('platformScriptureEditor.finalizeProjectSwitch', projectId).catch((err: unknown) => {
    logger.warn(
      `Failed to finalize project switch for project ${projectId} after Simple-mode switch: ${getErrorMessage(err)}`,
    );
  });
}

// #endregion Dock layouts

// #region Tabs

/**
 * Add or update a tab in the layout
 *
 * @param savedTabInfo Info for tab to add or update
 * @param layout Information about where to put a new tab
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs. Defaults to `true`
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 */
export const addTab = async <TData = unknown>(
  savedTabInfo: SavedTabInfo & { data?: TData },
  layout: Layout,
  shouldBringToFront = true,
): Promise<Layout | undefined> => {
  return (await getDockLayout()).addTabToDock(savedTabInfo, layout, shouldBringToFront);
};

/**
 * Closes a tab in the layout
 *
 * @param tabId ID of the tab to close
 * @returns True if successfully found the tab to close
 */
export const closeTab = async (tabId: string): Promise<boolean> => {
  return (await getDockLayout()).removeTabFromDock(tabId);
};

/**
 * Floats a tab in the layout
 *
 * @param tabId ID of the tab to float
 */
export const floatTab = async (tabId: string): Promise<void> => {
  return (await getDockLayout()).floatTabById(tabId);
};

/**
 * Basic `saveTabInfo` that simply strips the properties added by {@link TabInfo} off of the object
 * and returns it as a {@link SavedTabInfo}. Runs as the {@link TabSaver} by default if the tab type
 * does not have a specific `TabSaver`
 */
export function saveTabInfoBase(tabInfo: TabInfo): SavedTabInfo {
  const {
    // We don't need to use the other properties, but we need to remove them
    /* eslint-disable @typescript-eslint/no-unused-vars */
    tabTitle,
    tabTooltip,
    tabIconUrl,
    content,
    minWidth,
    minHeight,
    flashTriggerTime,
    lastFocusedElement,
    // `isClosable` is a live TabInfo-only affordance (whether the tab shows a close button). It is
    // not part of SavedTabInfo, so strip it here rather than let the rest-spread leak it into the
    // persisted layout, where a stale value could later be resurrected by a tab loader.
    isClosable,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...savedTabInfo
  } = tabInfo;
  return savedTabInfo;
}

/**
 * Updates the tab with the specified id with the specified properties. No need to have all the tab
 * info; just specify the properties you want to update.
 *
 * WARNING: This does not work well with `tab.data` `WebViewDefinition` information. Use
 * `updateWebViewDefinitionSync` for that instead
 *
 * @param tabId ID of the tab to update
 * @param partialTabInfo Partial tab info to update. Any unspecified properties will stay the same
 * @param shouldBringToFront If true, the tab will flash, will be brought to the front, and will be
 *   unobscured by other tabs. Defaults to `false`
 * @returns Updated tab info or `undefined` if the tab was not found
 * @throws If the papi dock layout has not been registered or if the item found in the dock layout
 *   with the specified ID is not a tab
 */
export function updateTabPartialSync(
  tabId: string,
  partialTabInfo: Partial<TabInfo>,
  shouldBringToFront = false,
): TabInfo | undefined {
  return getDockLayoutSync().updateTabPartial(tabId, partialTabInfo, shouldBringToFront);
}

// #endregion Tabs

// #region WebView definitions

/**
 * Updates the WebView with the specified ID with the specified properties and sends an update event
 *
 * @param webViewId The ID of the WebView to update
 * @param webViewDefinitionUpdateInfo Properties to update on the WebView. Any unspecified
 *   properties will stay the same. Note: `state` will be treated like any other property, meaning
 *   it will be overwritten completely if specified here and the object is referentially different
 *   from the current state object. It is not compared deeply (because we are working across
 *   contexts, where `deepEqual` doesn't always work well) or merged (so we can remove properties
 *   from `state`). See {@link setWebViewStateSync} and {@link resetWebViewStateSync} for methods to
 *   partially update `state`
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs. Defaults to `false`
 * @returns True if successfully found the WebView to update and actually updated any properties;
 *   false otherwise
 * @throws If the papi dock layout has not been registered
 */
export function updateWebViewDefinitionSync(
  webViewId: WebViewId,
  webViewDefinitionUpdateInfo: WebViewDefinitionUpdateInfo,
  shouldBringToFront = false,
): boolean {
  const didUpdateWebView = getDockLayoutSync().updateWebViewDefinition(
    webViewId,
    webViewDefinitionUpdateInfo,
    shouldBringToFront,
  );
  if (didUpdateWebView) {
    const webView = getSavedWebViewDefinitionSync(webViewId);
    if (!webView) {
      logger.warn(
        `Did not find a web view for id ${webViewId} immediately after updating that web view. Investigate`,
      );
    } else {
      // Update the state in the web view state store if it was part of the update info
      if ('state' in webViewDefinitionUpdateInfo) {
        const newState = webView.state;
        if (newState !== undefined) setFullWebViewStateById(webViewId, newState);
        else deleteFullWebViewStateById(webViewId);
      }

      // Emit the update event (buffered — usable before the websocket connects).
      onDidUpdateWebViewBufferedEmitter.emit({
        webView,
      });
    }
  }
  return didUpdateWebView;
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
    if (!(key in updateInfo)) return;

    // Make sure `state` isn't set to an invalid value since we access properties in it in our own
    // code. Trying to avoid letting WebViews break themselves with our code
    if (
      key === 'state' &&
      updateInfo[key] !== undefined &&
      (typeof updateInfo[key] !== 'object' || Array.isArray(updateInfo[key]))
    )
      return;

    // Handle updates to value types and arrays (and set optional objects to undefined)
    if (updatedWebViewDefinition[key] !== updateInfo[key]) {
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

/** See {@link WebViewServiceShard.getOpenWebViewDefinition} */
async function getOpenWebViewDefinition(
  webViewId: WebViewId,
): Promise<SavedWebViewDefinition | undefined> {
  const webViewDefinition = (await getDockLayout()).getWebViewDefinition(webViewId);
  if (webViewDefinition === undefined) return undefined;

  const savedWebViewDefinition = convertWebViewDefinitionToSaved(webViewDefinition);

  // Load the WebView state so the WebViewState service doesn't delete this entry. We should
  // remove this if/when we feel good about removing the WebViewState service
  getFullWebViewStateById(savedWebViewDefinition.id);

  return savedWebViewDefinition;
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
  webViewId: WebViewId,
): SavedWebViewDefinition | undefined {
  const webViewDefinition = getDockLayoutSync().getWebViewDefinition(webViewId);
  if (webViewDefinition === undefined) return undefined;

  const savedWebViewDefinition = convertWebViewDefinitionToSaved(webViewDefinition);

  // Load the WebView state so the WebViewState service doesn't delete this entry. We should
  // remove this if/when we feel good about removing the WebViewState service
  getFullWebViewStateById(savedWebViewDefinition.id);

  return savedWebViewDefinition;
}

/** See {@link WebViewServiceShard.getAllOpenWebViewDefinitions} */
async function getAllOpenWebViewDefinitions(): Promise<SavedWebViewDefinition[]> {
  // Wait for the dock layout to be registered, then delegate to the sync implementation so the
  // strip-and-keep-alive logic lives in one place
  await getDockLayout();
  return getAllOpenWebViewDefinitionsSync();
}

/**
 * Synchronous version of {@link getAllOpenWebViewDefinitions} for renderer-internal callers (e.g.
 * navigation target resolution) that need the current list of open web view definitions without an
 * async round trip through the dock layout's async variable. Mirrors the sync/async pairing already
 * established by {@link getSavedWebViewDefinitionSync} / `getOpenWebViewDefinition`.
 *
 * @throws If the papi dock layout has not been registered
 */
export function getAllOpenWebViewDefinitionsSync(): SavedWebViewDefinition[] {
  return getDockLayoutSync()
    .getAllWebViewDefinitions()
    .map((webViewData) => {
      // Strip runtime-only properties (content, styles, security flags); providers re-supply these
      // when the view is loaded.
      const savedWebViewDefinition = convertWebViewDefinitionToSaved(webViewData);
      // Load the WebView state so the WebViewState service doesn't delete this entry. We should
      // remove this if/when we feel good about removing the WebViewState service
      getFullWebViewStateById(savedWebViewDefinition.id);
      return savedWebViewDefinition;
    });
}

// #endregion WebView definitions

// #region WebViewState

/**
 * Get the full WebView state object associated with the given ID.
 *
 * @param webViewId ID of the WebView
 * @returns The full WebView state object associated with the given ID or `{}` if none exists
 * @throws If the papi dock layout has not been registered
 */
function getFullWebViewStateSync(webViewId: WebViewId): Record<string, unknown> {
  return getDockLayoutSync().getWebViewDefinition(webViewId)?.state ?? {};
}

/**
 * Get the WebView state associated with the given ID
 *
 * @param webViewId ID of the WebView
 * @param stateKey Key used to retrieve the state value
 * @param defaultValue Default value to return if the state for the given key does not exist
 * @returns The state for the given key of the given WebView if that state exists. Otherwise default
 *   value is returned.
 * @throws If webViewId or stateKey are not provided
 * @throws If the papi dock layout has not been registered
 */
function getWebViewStateSync<T>(webViewId: WebViewId, stateKey: string, defaultValue: T): T {
  if (!webViewId || !stateKey)
    throw new Error('webViewId and stateKey must be provided to get WebView state');

  const webViewState = getFullWebViewStateSync(webViewId);

  // We don't have any way to know what type this is, so just type assert for convenience
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return stateKey in webViewState ? (webViewState[stateKey] as T) : defaultValue;
}

/**
 * Set the WebView state object associated with the given ID
 *
 * @param webViewId ID of the WebView
 * @param stateKey Key for the associated state
 * @param stateValue Value of the state for the given key of the given WebView - must work with
 *   serialize/deserialize
 * @throws If webViewId or stateKey are not provided
 * @throws If stateValue cannot round trip with serialize and deserialize
 * @throws If the papi dock layout has not been registered
 */
function setWebViewStateSync<T>(webViewId: string, stateKey: string, stateValue: T): void {
  if (!webViewId || !stateKey)
    throw new Error('webViewId and stateKey must be provided to set WebView state');
  if (!isSerializable(stateValue))
    throw new Error(`"${stateKey}" value cannot round trip with serialize and deserialize.`);

  const webViewState = getFullWebViewStateSync(webViewId);

  updateWebViewDefinitionSync(webViewId, {
    state: {
      ...webViewState,
      [stateKey]: stateValue,
    },
  });
}

/**
 * Remove the WebView state object associated with the given ID
 *
 * @param webViewId ID of the WebView
 * @param stateKey Key for the associated state
 * @throws If webViewId or stateKey are not provided
 * @throws If the papi dock layout has not been registered
 */
function resetWebViewStateSync(webViewId: string, stateKey: string): void {
  if (!webViewId || !stateKey)
    throw new Error('webViewId and stateKey must be provided to remove WebView state');

  const webViewState = { ...getFullWebViewStateSync(webViewId) };

  delete webViewState[stateKey];

  updateWebViewDefinitionSync(webViewId, {
    state: webViewState,
  });
}

// #endregion WebViewState

// #region WebView options

/** Set up defaults for options for getting a web view */
function getWebViewOptionsDefaults<T extends OpenWebViewOptions | ReloadWebViewOptions>(
  options: T,
): T {
  const optionsDefaulted = cloneDeep(options);

  if (!('bringToFront' in optionsDefaulted)) optionsDefaulted.bringToFront = true;

  if ('existingId' in optionsDefaulted && !('createNewIfNotFound' in optionsDefaulted)) {
    optionsDefaulted.createNewIfNotFound = true;
  }

  return optionsDefaulted;
}

// #endregion WebView options

// #region webViewNonce

/**
 * Map of web view id to `webViewNonce` for that web view. `webViewNonce`s are used to perform
 * privileged interactions with the web view such as `papi.webViewProviders.postMessageToWebView`.
 * The web view service generates this nonce and sends it _only_ to the web view provider that
 * creates the web view. It is generally recommended that this web view provider not share this
 * nonce with anyone else but only use it within itself and in the web view controller created for
 * this web view if applicable (See `papi.webViewProviders.registerWebViewController`)
 */
const webViewNoncesById = new Map<WebViewId, string>();

/**
 * Get an existing `webViewNonce` or generate one if one did not already exist.
 *
 * WARNING: DO NOT SHARE THIS VALUE. `webViewNonce`s are PRIVILEGED INFORMATION and are not to be
 * shared except with the web view provider that creates a web view. See {@link webViewNoncesById}
 * for more info.
 */
function getWebViewNonce(id: WebViewId) {
  const existingNonce = webViewNoncesById.get(id);

  if (existingNonce) return existingNonce;

  const nonce = newNonce();
  webViewNoncesById.set(id, nonce);

  return nonce;
}

/**
 * Determine whether a nonce is valid for a specific web view
 *
 * Reads {@link webViewNoncesById} directly rather than going through {@link getWebViewNonce} —
 * validation must not mint a nonce as a side effect. A closed web view has no entry (see
 * {@link deleteWebViewNonce}), and minting one here for a stray/late check on a closed id would
 * leave an unbounded-lifetime entry that nothing ever deletes.
 *
 * @param id Id of the web view whose nonce to check against
 * @param webViewNonce Nonce to test against the real web view nonce. See {@link webViewNoncesById}
 *   for more info.
 * @returns `true` if the provided `webViewNonce` is correct and valid; `false` otherwise
 */
export function isWebViewNonceCorrect(id: WebViewId, webViewNonce: string) {
  return webViewNonce === webViewNoncesById.get(id);
}

/**
 * Delete a web view nonce. Should be done when the web view is closed.
 *
 * @returns `true` if successfully deleted a nonce for this id; `false` if there was not a nonce for
 *   this id
 */
function deleteWebViewNonce(id: WebViewId) {
  return webViewNoncesById.delete(id);
}

// #endregion webViewNonce

// #region Set up global variables to use in `openWebView`'s `imports` below

globalThis.getSavedWebViewDefinitionById = getSavedWebViewDefinitionSync;
globalThis.updateWebViewDefinitionById = updateWebViewDefinitionSync;
globalThis.getWebViewStateById = getWebViewStateSync;
globalThis.setWebViewStateById = setWebViewStateSync;
globalThis.resetWebViewStateById = resetWebViewStateSync;

// #endregion Set up global variables to use in `openWebView`'s `imports` below

// #region openWebView and reloadWebView

/**
 * Transforms legacy `hsl(var(--TOKEN))` patterns in WebView content and optional styles, and logs a
 * debug message if any replacements are made.
 *
 * @deprecated 28 April 2026 — backwards compatibility shim for extensions that haven't yet updated
 *   to the new oklch color variable format introduced with the Tailwind 4 / shadcn upgrade.
 */
function applyAndLogLegacyColorVarTransforms(
  webView: { id: string; webViewType: string },
  content: string,
  styles: string | undefined,
  tokenNames: ReadonlySet<string>,
): { content: string; styles: string | undefined } {
  const start = performance.now();
  const stylesResult = styles ? transformLegacyColorVars(styles, tokenNames) : undefined;
  const contentResult = transformLegacyColorVars(content, tokenNames);
  const totalMs = performance.now() - start;
  const logMessage = buildLegacyColorVarsLogMessage(
    webView.id,
    webView.webViewType,
    stylesResult,
    contentResult,
    totalMs,
  );
  if (logMessage) logger.debug(logMessage);
  return { content: contentResult.text, styles: stylesResult?.text };
}

/**
 * Whether anything has been docked in this window since it last told the main process its dock was
 * empty ({@link reportDockEmptied} resets it immediately before reporting).
 *
 * The main process asks this before acting on an emptiness report, because the report describes a
 * moment that has already passed by the time it is answered: a routed open or a move's adopt can
 * land here while the report is in flight, and closing the window then takes content the user is
 * looking at with it.
 *
 * A flag rather than a live reading of the dock, because there is no moment at which the dock can
 * be read for this. The report is sent from the layout-change handler, where
 * `dockLayoutRef.current` still holds the layout the dock is changing FROM — so a reading taken
 * then describes the state before the removal that emptied it, and would answer "content is here"
 * for every emptied window in the app. Known blind spot, unchanged from before this flag existed: a
 * dialog or another float arriving in the gap is not a dock add and does not set it.
 *
 * A retry of the same report does not reset it again: content that arrives while a report is still
 * being retried has still arrived.
 */
let didContentArriveSinceEmptyReport = false;

/**
 * Whether the main process has answered one of this window's emptiness reports with `closing`.
 *
 * Work aimed at a window in that state is refused rather than done: an open or an adopt that lands
 * here after the close is decided is destroyed with the window moments later, and for an adopt that
 * means a web view the user moved is simply gone — its source tab closed before the target was
 * asked. Refusing sends it back up the router's recovery ladder, which reopens it somewhere that
 * will still be there.
 *
 * Never cleared, mirroring the main process's own record of decided closes: nothing un-decides a
 * close, the window goes away instead. This covers only the closes this window was told about — the
 * user clicking the window's close button, and a quit, are decided in the main process and never
 * announced to the renderer, so the router's own reads of that record are what cover those.
 */
let isWindowToldToClose = false;

/**
 * Refuse work aimed at a window whose close has been decided — see {@link isWindowToldToClose}.
 *
 * Throws rather than answering `undefined`, which is the established "the web view provider chose
 * not to create it" answer: a router reading that would clean up as though the open had been
 * considered and turned down, instead of taking the web view somewhere it can live.
 *
 * @param operation What was being asked of this window, for the error message
 */
function throwIfWindowIsClosing(operation: string): void {
  if (!isWindowToldToClose) return;
  throw new Error(
    `web-view.service-shard: window ${globalThis.windowId} cannot ${operation}: the main process has told this window that it is closing.`,
  );
}

/**
 * Creates a new WebView or reloads an existing one based on the saved WebView definition.
 *
 * @param savedWebViewDefinition Saved WebView definition to pass to
 *   {@link IWebViewProvider.getWebView} to open or reload the WebView with
 *   `savedWebViewDefinition.id`
 * @param layout Information about where you want the new web view to go. Defaults to adding as a
 *   tab. Does nothing on an existing WebView
 * @param optionsDefaulted Options that affect what this method does. **YOU MUST RUN
 *   {@link getWebViewOptionsDefaults} ON THIS OBJECT BEFORE PASSING IT IN!**
 * @returns Promise that resolves to the ID of the webview we got or undefined if the provider did
 *   not create a WebView for this request.
 *
 *   Exported for the test file's reuse — see `web-view.service-host.test.ts`'s
 *   `trackSimpleEditorReplaceTab` coverage, which drives this function directly rather than through
 *   `openWebView`'s `waitForInitialize()`/`initialize()` gate (the latter mutates real globals —
 *   `window.navigator`, `window.alert`, etc. — which is unsafe to invoke repeatedly across tests).
 */
export async function openOrReloadWebView(
  savedWebViewDefinition: SavedWebViewDefinition,
  layout: Layout = { type: 'tab' },
  optionsDefaulted: OpenWebViewOptions = {},
): Promise<WebViewId | undefined> {
  const { webViewType } = savedWebViewDefinition;

  // Get the WebView definition from the webview provider
  const webViewProvider = await webViewProviderService.getWebViewProvider(webViewType);
  if (!webViewProvider)
    throw new Error(`getWebView: Cannot find Web View Provider for webview type ${webViewType}`);

  // Create the new WebView or load if it already existed
  const webView = await webViewProvider.getWebView(
    savedWebViewDefinition,
    optionsDefaulted,
    getWebViewNonce(savedWebViewDefinition.id),
  );

  // The web view provider didn't want to create this web view
  if (!webView) {
    deleteWebViewNonce(savedWebViewDefinition.id);
    return undefined;
  }

  // Fires once per renderer session, at the first web view whose content comes back from
  // `getWebView` (the Home view during startup), not on every subsequent open/reload.
  markStartupOnce('first-webview-content');

  // Set up WebViewDefinition default values
  /** WebView.contentType is assumed to be React by default. Extensions can specify otherwise */
  const contentType = webView.contentType ? webView.contentType : WEB_VIEW_CONTENT_TYPE.REACT;
  /** Default allowScripts to false for WEB_VIEW_CONTENT_TYPE.URL and true otherwise */
  let { allowScripts } = webView;
  if (contentType !== WEB_VIEW_CONTENT_TYPE.URL) allowScripts = webView.allowScripts ?? true;
  /** Default allowSameOrigin to true */
  const allowSameOrigin = webView.allowSameOrigin ?? true;
  /**
   * Only allow connecting to `papi-extension:` and `https:` urls. For HTML and React WebViews, this
   * controls the `frame-src` directive and therefore which urls can be iframe `src`es in the
   * WebView. For URL WebViews, this controls what urls the WebView can be.
   */
  let { allowedFrameSources } = webView;
  if (contentType !== WEB_VIEW_CONTENT_TYPE.URL && allowedFrameSources)
    allowedFrameSources = allowedFrameSources.filter(
      (hostValue) =>
        startsWith(hostValue, 'https:') ||
        startsWith(hostValue, 'papi-extension:') ||
        startsWith(hostValue, 'http://localhost:'),
    );

  // Validate the WebViewDefinition to make sure it is acceptable
  // If this is a URL WebView, it must match at least one of its `allowedFrameSources` Regex strings
  // if any are supplied
  if (
    contentType === WEB_VIEW_CONTENT_TYPE.URL &&
    allowedFrameSources &&
    !allowedFrameSources.some((regexString) => new RegExp(regexString).test(webView.content))
  )
    throw new Error(
      `getWebView: URL WebView content ${webView.content} did not match any of its allowedFrameSources!`,
    );

  if (webView.state)
    // The web view provider might have updated the web view state, so save it
    setFullWebViewStateById(webView.id, webView.state);

  // Get theme styles
  const theme = localThemeService.getCurrentThemeSync();

  // `webViewRequire`, `getWebViewStateById`, `setWebViewStateById` and `resetWebViewStateById` below are defined in `src\renderer\global-this-web-view.model.ts`
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
  // Set up WebView imports
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
  window.webViewId = '${webView.id}';
  window.getWebViewState = (stateKey, defaultValue) => { return getWebViewStateById('${webView.id}', stateKey, defaultValue) };
  window.setWebViewState = (stateKey, stateValue) => { setWebViewStateById('${webView.id}', stateKey, stateValue) };
  window.resetWebViewState = (stateKey) => { resetWebViewStateById('${webView.id}', stateKey) };
  window.useWebViewState = window.parent.useWebViewState.bind(window);
  window.useWebViewScrollGroupScrRef = window.parent.useWebViewScrollGroupScrRef.bind(window);
  var getSavedWebViewDefinitionById = window.parent.getSavedWebViewDefinitionById;
  window.getSavedWebViewDefinition = () => { return getSavedWebViewDefinitionById('${webView.id}')};
  var updateWebViewDefinitionById = window.parent.updateWebViewDefinitionById;
  window.updateWebViewDefinition = (webViewDefinitionUpdateInfo, shouldBringToFront = false) => { return updateWebViewDefinitionById('${webView.id}', webViewDefinitionUpdateInfo, shouldBringToFront)};
  window.fetch = papi.fetch;
  window.WebSocket = papi.WebSocket;
  window.XMLHttpRequest = papi.XMLHttpRequest;
  delete window.parent;
  delete window.top;
  delete window.frameElement;

  // IIFE so we don't pollute the WebView's scope
  (() => {
    const { applyThemeStylesheet, getErrorMessage, isPlatformError } = require('platform-bible-utils');
    const applyThemeStylesheetWebView = applyThemeStylesheet.bind(window);

    // Set up theme and subscribe to theme changes
    function setUpThemeStylesheet() {
      window.document.body.classList.add('${theme.id}');
      let currentThemeElement = document.getElementById('${THEME_STYLE_ELEMENT_ID}');

      (async () => {
        try {
          const unsubTheme = await window.papi.themes.subscribeCurrentTheme(undefined, (newTheme) => {
            if (isPlatformError(newTheme)) {
              window.papi.logger.warn(\`Error while getting new current theme in WebView import script for WebView ${webView.id}: \${getErrorMessage(newTheme)}\`);
              return;
            }
            currentThemeElement = applyThemeStylesheetWebView(newTheme, currentThemeElement);
          });
          window.addEventListener('unload', () => {
            unsubTheme();
          });
        } catch (e) {
          window.papi.logger.warn(\`Error while subscribing to current theme in WebView import script for WebView ${webView.id}: \${getErrorMessage(e)}\`);
        }
      })();
    }

    if (document.readyState === 'loading')
      document.addEventListener('DOMContentLoaded', setUpThemeStylesheet);
    else setUpThemeStylesheet();
  })();
  `;

  /** Nonce used to allow scripts and styles to run */
  // TODO: Generating nonces every time causes webviews to rerender every time `getWebView` is used
  // on an existing webview such as when the extension host is restarted. Should we save webview
  // nonces so the `content` can be the same and not have to rerender?
  // Or this could solve the problem as well https://github.com/paranext/paranext-core/issues/282
  const srcNonce = newNonce();

  // Deprecated 28 April 2026 - token names for backwards-compatible hsl(var(--TOKEN)) transform.
  const legacyTokenNames = new Set(Object.keys(theme.cssVariables));

  // Build the contents of the iframe
  let webViewContent: string;
  /** CSP for allowing only certain scripts and styles */
  let specificSrcPolicy: string;
  switch (contentType) {
    case WEB_VIEW_CONTENT_TYPE.HTML: {
      const { content: htmlContent } = applyAndLogLegacyColorVarTransforms(
        webView,
        webView.content,
        undefined,
        legacyTokenNames,
      );

      // Add wrapping to turn a plain string into an iframe
      webViewContent = htmlContent.includes('<html')
        ? htmlContent
        : `<html><head></head><body>${htmlContent}</body></html>`;
      // TODO: Please combine our CSP with HTML-provided CSP so we can add the import nonce and they can add nonces and stuff instead of allowing 'unsafe-inline'
      specificSrcPolicy = "'unsafe-inline'";
      break;
    }
    case WEB_VIEW_CONTENT_TYPE.URL:
      webViewContent = webView.content;
      // CSP does not apply to these webViews. If we ever add a `csp` attribute to WebView iframes,
      // we might need to add this URL's schema to the CSP
      specificSrcPolicy = '';
      break;
    default: {
      // Defaults to React webview definition.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const reactWebView = webView as WebViewDefinitionReact;

      const { content: legacyTransformedContent, styles: legacyTransformedStyles } =
        applyAndLogLegacyColorVarTransforms(
          webView,
          reactWebView.content,
          reactWebView.styles,
          legacyTokenNames,
        );

      // Add the component as a script
      // WARNING: DO NOT add anything between the closing of the script tag and the insertion of
      // reactWebView.contents. Doing so would mess up debugging web views
      webViewContent = `
        <html>
          <head>
            ${
              legacyTransformedStyles
                ? `<style nonce="${srcNonce}">
              /* extension styles */
              ${legacyTransformedStyles}
            </style>`
                : ''
            }
          </head>
          <body>
            <div id="root">
            </div>
            <script nonce="${srcNonce}">${legacyTransformedContent}

              function initializeReact() {
                const container = document.getElementById('root');
                const root = createRoot(container);

                function renderRoot(savedDefinition) {
                  // Set up WebViewProps to pass into the WebView component
                  const savedWebViewDefinition = savedDefinition ?? window.getSavedWebViewDefinition();

                  if (!savedWebViewDefinition)
                    throw new Error(
                      'renderRoot error! getSavedWebViewDefinition returned undefined for web view ${webView.id}! This is unexpected and will cause issues. Please investigate.'
                    );

                  const webViewProps = {
                    ...savedWebViewDefinition,
                    useWebViewState: window.useWebViewState,
                    useWebViewScrollGroupScrRef: window.useWebViewScrollGroupScrRef,
                    updateWebViewDefinition: window.updateWebViewDefinition,
                  };

                  root.render(React.createElement(globalThis.webViewComponent, webViewProps));
                }

                const unsubscribeUpdateWebView = window.papi.webViews.onDidUpdateWebView(
                  ({ webView }) => {
                    if (webView.id === '${webView.id}')
                      renderRoot(webView);
                  },
                );

                const unsubscriber = () => {
                  try {
                    unsubscribeUpdateWebView();
                    window.removeEventListener('pagehide', unsubscriber);
                  } catch (e) {
                    console.log('Error unsubscribing from WebView updates', e);
                  }
                };

                renderRoot();

                // Store cleanup functions globally so they can be called from parent window
                globalThis.webViewCleanup = {
                  unmountRoot: root.unmount.bind(root),
                };

                window.addEventListener('pagehide', unsubscriber);
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
  //   Note: `papi-er:` is intentionally NOT in connect-src even though it appears in img-src and
  //   media-src below. Enhanced Resources image bytes are renderable (the <img> tag works) but
  //   not fetchable from WebView JS - this prevents WebView code from reading raw image bytes
  //   via fetch() / XHR. The scheme is served via protocol.handle in
  //   enhanced-resource-protocol.service.ts (same mechanism as papi-extension:); the
  //   renderable-not-fetchable posture is enforced here by omitting it from connect-src.
  // img-src load images
  //   'self' so images can be loaded from us
  //   papi-extension: so images can be loaded from installed extensions
  //   papi-er: so images can be loaded from the enhanced resources protocol (e.g. Marble images).
  //     Renderable only - see connect-src note above for why this is NOT in connect-src.
  //   https: so they can load images over secure connections
  //   data: so they can load data urls
  // media-src load audio, video, etc
  //   'self' so media can be loaded from us
  //   papi-extension: so media can be loaded from installed extensions
  //   papi-er: so media can be loaded from the enhanced resources protocol.
  //     Renderable only - see connect-src note above for why this is NOT in connect-src.
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
  const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy"
    content="
      default-src 'none';
      script-src-elem 'self' 'wasm-unsafe-eval' papi-extension: ${specificSrcPolicy};
      style-src 'self' papi-extension: 'unsafe-inline';
      frame-src ${allowedFrameSources ? allowedFrameSources.join(' ') : ''};
      object-src 'none';
      worker-src 'none';
      connect-src 'self';
      img-src 'self' papi-extension: papi-er: https: data:;
      media-src 'self' papi-extension: papi-er: https: data:;
      font-src 'self' papi-extension: https: data:;
      form-action 'self';
    ">`;

  // Add some elements at the start of the head to give access to papi, CSP, styles, etc.
  const headStart = indexOf(webViewContent, '<head');
  const headEnd = indexOf(webViewContent, '>', headStart);

  // Inject the CSP, styles, and import scripts into the html if it is not a URL iframe
  if (contentType !== WEB_VIEW_CONTENT_TYPE.URL) {
    const themeStylesheet = `<style nonce="${srcNonce}" id="${THEME_STYLE_ELEMENT_ID}" data-theme-id="${theme.id}">${getStylesheetForTheme(theme)}</style>`;

    webViewContent = `${substring(webViewContent, 0, headEnd + 1)}
    ${contentSecurityPolicy}
    <script nonce="${srcNonce}">
    ${imports}
    </script>
    <style nonce="${srcNonce}">
      ${FONT_STYLES_RAW}
    </style>
    <style nonce="${srcNonce}">
      ${SCROLLBAR_STYLES_RAW}
    </style>
    ${themeStylesheet}${substring(webViewContent, headEnd + 1)}`;
  }

  const finalWebView: WebViewTabProps = {
    ...webView,
    contentType,
    content: webViewContent,
    allowScripts,
    allowSameOrigin,
    allowedFrameSources,
  };

  let finalLayout: Layout | undefined;
  const dockLayoutVar = await getDockLayout();
  try {
    finalLayout = dockLayoutVar.addWebViewToDock(
      finalWebView,
      layout,
      optionsDefaulted.bringToFront,
    );
  } catch (e) {
    // A throw can leave this web view's own tab in the dock: a definition its tab loader refuses
    // surfaces as an error tab under a fresh id, and the add throws with the named web view's
    // live tab still docked — reloading an open web view with a bad definition lands here.
    // Emitting the close event and evicting state then would gut a view the user still sees, so
    // that failure is logged and rethrown with the dock and the state untouched.
    if (dockLayoutVar.getWebViewDefinition(webView.id) !== undefined) {
      logger.error(
        `Could not update webview ${webView.id} (type ${webView.webViewType}) in the dock; its existing tab is unchanged. ${getErrorMessage(e)}`,
      );
      throw e;
    }
    // The provider has already run: a controller may be registered in the extension host, a
    // nonce minted, and state persisted — and no close event will ever fire for a tab that
    // never joined the dock. Emit the close event ourselves (controller disposal and nonce
    // cleanup both subscribe to it) and evict the state, so a failed add leaves nothing
    // behind. A tab still in the dock was caught above, so from here the tab never existed.
    onDidCloseWebViewBufferedEmitter.emit({
      webView: convertWebViewDefinitionToSaved(finalWebView),
    });
    deleteFullWebViewStateById(webView.id);
    throw e;
  }
  // See `trackSimpleEditorReplaceTab`'s doc: keeps the last-opened-project cache's id tracking
  // current the instant a `replace-tab` placement lands, regardless of webview type — the function
  // itself no-ops unless `layout.targetTabId` is already a tracked Simple editor id. Below the add
  // rather than beside it: a placement that never joined the dock is not one to track.
  trackSimpleEditorReplaceTab(layout, finalWebView.id);

  // The dock took it: whatever this window may have just told the main process about being empty is
  // now out of date — see `didContentArriveSinceEmptyReport`
  didContentArriveSinceEmptyReport = true;

  // If we received a layout (meaning it created a new webview instead of updating an existing one),
  // inform web view consumers that we added a new web view
  if (finalLayout)
    emitOnDidOpenWebView({
      webView: convertWebViewDefinitionToSaved(finalWebView),
      layout: finalLayout,
    });
  else {
    onDidUpdateWebViewBufferedEmitter.emit({
      webView: convertWebViewDefinitionToSaved(finalWebView),
    });
  }

  return webView.id;
}

/** See {@link WebViewServiceShard.openWebView} */
export const openWebView = async (
  webViewType: WebViewType,
  layout: Layout = { type: 'tab' },
  options: OpenWebViewOptions = {},
): Promise<WebViewId | undefined> => {
  // Ahead of everything, including the provider: a window on its way out must not run a web view
  // provider's side effects for a tab that is about to be destroyed with it
  throwIfWindowIsClosing(`open web view ${webViewType}`);
  await waitForInitialize();
  // A layout load in flight is about to replace this dock wholesale with what it read before this
  // open, so docking now loses the web view — silently, since the close events that load emits are
  // diffed against the same reading. Ahead of the existing-web-view search below as well as the
  // dock add: that search reads a dock the load is about to replace.
  await waitForLayoutLoadToSettle();

  const optionsDefaulted = getWebViewOptionsDefaults(options);

  // `existingProjectId` only qualifies a '?' search; a concrete existingId already names one
  // exact web view, and no existingId at all names no search for it to limit, so combining it
  // with either is contradictory.
  if (optionsDefaulted.existingProjectId !== undefined && optionsDefaulted.existingId !== '?')
    throw new Error(
      optionsDefaulted.existingId === undefined
        ? "openWebView: existingProjectId requires existingId: '?'; it was not given at all."
        : `openWebView: existingProjectId only qualifies an existingId of '?'; existingId ${JSON.stringify(optionsDefaulted.existingId)} already names an exact web view.`,
    );

  // Find existing webView if one exists and handle it if it does
  if (optionsDefaulted.existingId) {
    const dockLayout = await getDockLayout();
    const existingWebView =
      optionsDefaulted.existingId === '?'
        ? // If they provided '?', that means look for any webview with a matching webViewType,
          // optionally limited to a project
          dockLayout.findFirstWebViewDefinitionByType(
            webViewType,
            optionsDefaulted.existingProjectId,
          )
        : // If they provided any other string, look for a webview with that ID
          dockLayout.getWebViewDefinition(optionsDefaulted.existingId);

    // If we found an existing WebView, handle it and return it
    if (existingWebView) {
      // We found an existing web view, so bring it to front
      if (optionsDefaulted.bringToFront) updateWebViewDefinitionSync(existingWebView.id, {}, true);

      // We found an existing WebView, so no need to do anything else
      return existingWebView.id;
    }

    // We didn't find an existing WebView with the ID. If shouldn't create a new one, return undefined
    if (!optionsDefaulted.createNewIfNotFound) return undefined;
  }

  // We didn't find an existing web view with the ID, so we need to create a new one.

  // We want to create a new webview, so create a placeholder with a new ID to pass to the WebViewProvider
  const newWebViewDefinition = {
    webViewType,
    id: newGuid(),
  };

  return openOrReloadWebView(newWebViewDefinition, layout, {
    ...optionsDefaulted,
    // Always bring new WebViews to the front
    bringToFront: true,
  });
};

/**
 * Put Home in this window's dock, deciding nothing with the main process. A dock with no tab in it
 * gives the user no way to open anything, so this is what fills one whenever closing the window is
 * not the answer.
 */
async function dockHomeInThisWindow(): Promise<void> {
  try {
    await openWebView('platformGetResources.home', { type: 'tab' });
  } catch (e) {
    throw new Error(`web-view.service-shard error: Opening Home web view failed! ${e}`, {
      cause: e,
    });
  }
}

/**
 * Dock Home here, absorbing a failure rather than letting it out.
 *
 * Every caller is reached from the dock layout's change handler, which does not await what it
 * starts — so a throw from here would surface as an unhandled rejection with nothing to attribute
 * it to, in place of the "this window has nothing in it" problem it actually is.
 */
async function dockHomeInThisWindowLoggingFailure(): Promise<void> {
  try {
    await dockHomeInThisWindow();
  } catch (e) {
    logger.warn(
      `Could not dock Home in window ${globalThis.windowId} after its dock emptied: ${getErrorMessage(e)}`,
    );
  }
}

/**
 * How many times {@link reportDockEmptied} tells the main process this window's dock is empty before
 * giving up. The main process registers the handler before it creates any window, so a failure can
 * only be transient transport trouble — worth a few retries, the same as the saved layout this
 * window asked for at startup.
 */
const REPORT_DOCK_EMPTIED_ATTEMPTS = 3;

/** How long {@link reportDockEmptied} waits between attempts */
const REPORT_DOCK_EMPTIED_RETRY_DELAY_MS = 2_000;

/**
 * Tell the main process this window's dock is empty and act on its decision: dock Home here, or
 * nothing — the window is about to close. Only the main process knows how many windows exist, so
 * the close-or-home decision lives there; see the window-emptiness handler.
 *
 * Everything this window shows from here on hangs off that one answer, so it is asked for several
 * times before this side decides alone. A report that goes entirely unanswered ends in Home docked
 * locally: an empty dock leaves the user with nothing to open anything from, and closing the window
 * is the one answer only the main process may give.
 */
async function reportDockEmptied(reason: WindowEmptiedReason): Promise<void> {
  // Immediately before the report goes out, so that from here on the flag answers exactly the
  // question the main process asks with it: has anything reached this dock since it said it was
  // empty — see `didContentArriveSinceEmptyReport`
  didContentArriveSinceEmptyReport = false;
  let response: WindowEmptiedResponse | undefined;
  for (let attempt = 1; attempt <= REPORT_DOCK_EMPTIED_ATTEMPTS; attempt += 1) {
    try {
      const windowId = getWindowIdOrThrow();
      logger.debug(
        `Window ${windowId} reporting its dock emptied to main (reason: ${reason}, attempt ${attempt} of ${REPORT_DOCK_EMPTIED_ATTEMPTS})`,
      );
      // Sequential attempts: each one must settle before the next may start
      // eslint-disable-next-line no-await-in-loop
      response = await sendNetworkRequest<[number, WindowEmptiedReason], WindowEmptiedResponse>(
        WINDOW_EMPTIED_REQUEST_TYPE,
        windowId,
        reason,
      );
      logger.debug(
        `Window ${windowId}'s reported emptiness was answered with action: ${response.action}`,
      );
      break;
    } catch (e) {
      logger.warn(
        `Reporting an empty dock failed (attempt ${attempt} of ${REPORT_DOCK_EMPTIED_ATTEMPTS}): ${getErrorMessage(e)}`,
      );
      if (attempt < REPORT_DOCK_EMPTIED_ATTEMPTS)
        // Sequential attempts (see above)
        // eslint-disable-next-line no-await-in-loop
        await wait(REPORT_DOCK_EMPTIED_RETRY_DELAY_MS);
    }
  }

  if (response) {
    // Latched here, at the one moment this window is told its close has been decided — see
    // `isWindowToldToClose`
    if (response.action === 'closing') isWindowToldToClose = true;
    if (response.action !== 'open-home') return;
  }
  if (!response)
    logger.warn(
      `An empty dock went unanswered after ${REPORT_DOCK_EMPTIED_ATTEMPTS} attempts; docking Home here rather than leaving the window blank`,
    );
  try {
    await dockHomeInThisWindow();
  } catch (e) {
    // Reporting emptiness runs fire-and-forget from a freshly loaded layout, so a failure here has
    // nobody to hand itself to
    logger.warn(`Could not dock Home in the emptied window: ${getErrorMessage(e)}`);
  }
}

/**
 * Act on this window's dock having just lost its last docked tab.
 *
 * Only a window with no tab left ANYWHERE is empty, and that is what gets reported (see
 * {@link reportDockEmptied}) — the main process then decides whether it closes or docks Home. A tab
 * that is floating, maximized, or in its own window has not gone away, and neither has the window
 * holding it: reporting there would close a window with live content in it (an open dialog is a
 * float too). The dock behind those tabs would sit empty, so Home fills it right here instead.
 *
 * Uses the same definition of empty as the born-empty check on a freshly loaded layout, so a window
 * that would be closed for landing empty is exactly one that would be closed for being emptied.
 *
 * @param layout The layout the dock is changing to
 */
export async function handleDockEmptiedByRemoval(layout: LayoutInfo): Promise<void> {
  // A fallback dock is deliberately NOT the user's layout (see isRunningOnFallbackLayout), so its
  // emptiness says nothing about what the user has — the same guard the born-empty report applies.
  // Reporting would let main close this window and rewrite the persisted structure without it,
  // deleting the saved entry the held pushes exist to protect.
  //
  // Not reporting is not the same as doing nothing, though: this dock is empty and its user has no
  // way left to open anything. Home fills it here, where it costs nothing — this window's layout
  // pushes are held from persistence for as long as it runs on a fallback. The consequence, and it
  // is deliberate: in a multi-window session this window stays alive as a Home-only window that the
  // main process will never close, because the only way to be closed is to report, and reporting is
  // what would destroy the saved entry.
  if (isRunningOnFallbackLayout) {
    logger.debug(
      `Window ${globalThis.windowId}'s dock was emptied while running on a fallback layout; docking Home locally rather than reporting`,
    );
    await dockHomeInThisWindowLoggingFailure();
    return;
  }
  if (!savedLayoutHasAnyTabs(layout)) {
    logger.debug(
      `Window ${globalThis.windowId}'s dock has no tabs left anywhere; reporting the emptiness to main`,
    );
    await reportDockEmptied('emptied-by-removal');
    return;
  }
  logger.debug(
    `Window ${globalThis.windowId}'s dock lost its last docked tab, but tabs remain elsewhere (float/maximized/window); docking Home locally instead of reporting`,
  );
  await dockHomeInThisWindowLoggingFailure();
}

/** See {@link WebViewServiceShard.reloadWebView} */
export async function reloadWebView(
  // Keeping this parameter for the likelihood that we will add options per WebViewType sometime
  _webViewType: WebViewType,
  webViewId: WebViewId,
  options: ReloadWebViewOptions = {},
): Promise<WebViewId | undefined> {
  await waitForInitialize();

  const existingSavedWebView = await getOpenWebViewDefinition(webViewId);
  // If the web view is not found, return undefined
  if (!existingSavedWebView) return undefined;

  // If the web view is found, open it again with the same ID
  return openOrReloadWebView(existingSavedWebView, undefined, getWebViewOptionsDefaults(options));
}

/** See {@link WebViewServiceShard.dockContainsTab} */
async function dockContainsTab(tabOrTabGroupId: string): Promise<boolean> {
  return (await getDockLayout()).containsTab(tabOrTabGroupId);
}

/** See {@link WebViewServiceShard.hasContentArrivedSinceEmptyReport} */
async function hasContentArrivedSinceEmptyReport(): Promise<boolean> {
  return didContentArriveSinceEmptyReport;
}

// #endregion openWebView and reloadWebView

// #region Initialization

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/**
 * Async Variable that resolves when this service is finished initializing. If the service has not
 * yet initialized, await this variable.
 */
let initializeAsyncVariable: AsyncVariable<void> | undefined;

/**
 * Wait for the web view service to finish initializing
 *
 * @returns Promise that resolves when this service is finished initializing
 */
export function waitForInitialize(): Promise<void> {
  if (isInitialized) return Promise.resolve();

  if (!initializeAsyncVariable) {
    initializeAsyncVariable = new AsyncVariable<void>('web-view.service-shard.initialize');
  }

  return initializeAsyncVariable.promise;
}

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
        if (
          getRendererScriptRegex().test(stackTrace) ||
          getRendererUsersnapRegex().test(stackTrace)
        ) {
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

    onDidCloseWebView(({ webView: { id, webViewType } }) => {
      if (!deleteWebViewNonce(id))
        logger.warn(
          `Tried to delete webViewNonce for web view with id ${id} (type ${webViewType}), but a nonce was not found. May not be an issue, but worth investigating`,
        );
    });

    isInitialized = true;

    // Resolve the AsyncVariable to let any waiting code know initialization is complete
    if (initializeAsyncVariable && !initializeAsyncVariable.hasSettled) {
      initializeAsyncVariable.resolveToValue();
    }
  })();

  return initializePromise;
};

// #endregion Initialization

const papiWebViewService: WebViewServiceType = {
  onDidAddWebView: onDidOpenWebView,
  onDidOpenWebView,
  onDidUpdateWebView,
  onDidCloseWebView,
  getWebView: openWebView,
  openWebView,
  reloadWebView,
  getSavedWebViewDefinition: getOpenWebViewDefinition,
  getOpenWebViewDefinition,
  getAllOpenWebViewDefinitions,
  getWebViewController,
};

/**
 * Open a Settings tab in this window. See {@link WebViewServiceShard.openSettingsTab} for why the
 * project arrives as an argument rather than being looked up here.
 */
async function openSettingsTab(projectIdToLimitSettings?: string): Promise<Layout | undefined> {
  // Routed here by the main process, the same as an open or an adopt, so it needs the same refusal:
  // a tab put in a window whose close is decided is destroyed with it moments later
  throwIfWindowIsClosing('open a settings tab');
  const settingsTabId = newGuid();

  const layout = await addTab<SettingsTabData>(
    {
      id: settingsTabId,
      tabType: TAB_TYPE_SETTINGS_TAB,
      data: {
        projectIdToLimitSettings,
      },
    },
    {
      type: 'float',
      position: 'center',
      floatSize: { height: 600, width: 1000 },
    },
  );
  // The other way content reaches this window — see `didContentArriveSinceEmptyReport`
  didContentArriveSinceEmptyReport = true;
  return layout;
}

/** See {@link WebViewServiceShard.captureAndCloseWebView} */
async function captureAndCloseWebView(
  webViewId: WebViewId,
): Promise<SavedWebViewDefinition | undefined> {
  const dockLayout = await getDockLayout();
  const webViewDefinition = dockLayout.getWebViewDefinition(webViewId);
  if (!webViewDefinition) return undefined;

  const captured = convertWebViewDefinitionToSaved(webViewDefinition);
  // The live state lives in this window's storage, not on the dock's definition — carry it.
  // Deliberately NOT deleted here: if the move fails and the web view comes back to this
  // window, its state being still here is what that recovery needs
  const liveState = getFullWebViewStateById(captured.id);
  if (Object.keys(liveState).length > 0) captured.state = liveState;
  // A window re-scopes web view ids to itself when it reloads a layout. Hand the target the
  // minted id — the spelling a fresh open would use — so the id does not carry this window's
  // scope into a window it does not belong to
  captured.id = stripWindowScopeFromWebViewId(captured.id);

  dockLayout.removeTabFromDock(webViewDefinition.id);
  return captured;
}

/** See {@link WebViewServiceShard.adoptWebView} */
async function adoptWebView(
  savedWebViewDefinition: SavedWebViewDefinition,
): Promise<WebViewId | undefined> {
  // Ahead of everything, including the state seeding below: a move that lands in a window on its
  // way out loses the web view outright, since its source tab closed before this window was asked
  throwIfWindowIsClosing(`adopt web view ${savedWebViewDefinition.id}`);
  await waitForInitialize();
  await waitForLayoutLoadToSettle();
  // Seeded before the provider runs: the moved view's state must be in this window's storage
  // for the view to read, including when the provider does not echo state back. A provider
  // that returns state still wins — the open persists the provider's state after this
  if (savedWebViewDefinition.state && Object.keys(savedWebViewDefinition.state).length > 0)
    setFullWebViewStateById(savedWebViewDefinition.id, savedWebViewDefinition.state);
  return openOrReloadWebView(
    savedWebViewDefinition,
    { type: 'tab' },
    getWebViewOptionsDefaults({}),
  );
}

/** Whether a value that arrived over the wire is a Scripture reference and not a scroll group id */
function isSerializedVerseRef(scrRef: unknown): boolean {
  return (
    typeof scrRef === 'object' &&
    !!scrRef &&
    'book' in scrRef &&
    typeof scrRef.book === 'string' &&
    'chapterNum' in scrRef &&
    typeof scrRef.chapterNum === 'number' &&
    'verseNum' in scrRef &&
    typeof scrRef.verseNum === 'number'
  );
}

/**
 * Point a web view that carries its own independent reference at a new one. Only this window can:
 * the definition lives in its dock layout.
 *
 * The argument is checked rather than trusted because this is a registered network object method:
 * it is reachable from any process, and what it writes is typed `ScrollGroupId |
 * SerializedVerseRef` — so a numeric argument would not set a reference at all, it would attach a
 * detached web view to a scroll group. That is a change to the definition beyond anything this
 * method exists to make.
 *
 * A failure is warned about and reported rather than thrown — a reference the user asked to move to
 * that one tab could not take is not worth failing the whole navigation command over.
 */
async function setDetachedScrRef(
  webViewId: WebViewId,
  scrRef: SerializedVerseRef,
): Promise<boolean> {
  if (!isSerializedVerseRef(scrRef)) {
    logger.warn(
      `Refused to set the detached ref on ${webViewId}: expected a Scripture reference, got ${typeof scrRef}`,
    );
    return false;
  }

  try {
    return updateWebViewDefinitionSync(webViewId, { scrollGroupScrRef: scrRef });
  } catch (e) {
    logger.warn(
      `Navigation command could not update detached ref on ${webViewId}: ${getErrorMessage(e)}`,
    );
    return false;
  }
}

/**
 * What this window serves under its scoped WebView service name: everything public, plus what only
 * this window can do to its own dock layout. Declared as the shard type so a member added there
 * cannot silently become a name this window does not answer for.
 */
const webViewServiceShard: WebViewServiceShard = {
  ...papiWebViewService,
  dockContainsTab,
  hasContentArrivedSinceEmptyReport,
  openSettingsTab,
  setDetachedScrRef,
  captureAndCloseWebView,
  adoptWebView,
};

/** Register the network object that backs the PAPI webview service */
// To use this service, you should use `web-view.service.ts`
export async function startWebViewServiceShard(): Promise<void> {
  await initialize();
  if (!globalThis.windowId) throw new Error('Cannot start WebViewService: windowId is not set');

  // Register this window's shard under a window-scoped name (e.g. "WebViewService-1") so multiple
  // renderers can coexist. The main process's WebView service router registers the generic name and
  // forwards to the shard that should handle each call. The object type and window id are how the
  // router finds this shard; the name it is registered under is nobody else's business.
  await networkObjectService.set<WebViewServiceShard>(
    `${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE}-${globalThis.windowId}`,
    webViewServiceShard,
    WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE,
    getServiceShardAttributes(globalThis.windowId),
    // Experimental at the object level, which fans out over every method: this is a window-scoped
    // name that only the main process's router is meant to call, and both the name and the split
    // between what a shard answers and what its router answers are still moving.
    { 'x-experimental': true },
  );
}
