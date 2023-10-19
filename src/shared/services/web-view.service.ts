/**
 * Service that handles WebView-related operations
 * Likely shouldn't need/want to expose this whole service on papi,
 * but most things are exposed via papiWebViewService
 */
import cloneDeep from 'lodash/cloneDeep';
import { isRenderer } from '@shared/utils/internal-util';
import {
  SerializedRequestType,
  Unsubscriber,
  aggregateUnsubscriberAsyncs,
  serializeRequestType,
} from '@shared/utils/papi-util';
import { getErrorMessage, newGuid, newNonce, wait } from '@shared/utils/util';
import { MutableRefObject } from 'react';
import { createNetworkEventEmitter } from '@shared/services/network.service';
import {
  AddWebViewEvent,
  Layout,
  SavedTabInfo,
  TabInfo,
  WebViewDefinitionReact,
  WebViewContentType,
  WebViewProps,
  WebViewType,
  WebViewId,
  GetWebViewOptions,
  WebViewDefinition,
  SavedWebViewDefinition,
} from '@shared/data/web-view.model';
import * as networkService from '@shared/services/network.service';
import webViewProviderService from '@shared/services/web-view-provider.service';
import { DockLayout, DropDirection, LayoutBase } from 'rc-dock';
import AsyncVariable from '@shared/utils/async-variable';
import logger from '@shared/services/logger.service';
import LogError from '@shared/log-error.model';
import memoizeOne from 'memoize-one';

/** rc-dock's onLayoutChange prop made asynchronous - resolves */
export type OnLayoutChangeRCDock = (
  newLayout: LayoutBase,
  currentTabId?: string,
  direction?: DropDirection,
) => Promise<void>;

/** Properties related to the dock layout provided by `platform-dock-layout.component.tsx` */
type PapiDockLayout = {
  /** The rc-dock dock layout React element ref. Used to perform operations on the layout */
  dockLayout: DockLayout;
  /**
   * A ref to a function that runs when the layout changes. We set this ref to our
   * {@link onLayoutChange} function
   */
  onLayoutChangeRef: MutableRefObject<OnLayoutChangeRCDock | undefined>;
  /**
   * Add or update a tab in the layout
   * @param savedTabInfo info for tab to add or update
   * @param layout information about where to put a new tab
   *
   * @returns If tab added, final layout used to display the new tab. If existing tab updated,
   *   `undefined`
   */
  addTabToDock: (savedTabInfo: SavedTabInfo, layout: Layout) => Layout | undefined;
  /**
   * Add or update a webview in the layout
   * @param webView web view to add or update
   * @param layout information about where to put a new webview
   *
   * @returns If WebView added, final layout used to display the new webView. If existing webView
   *   updated, `undefined`
   */
  addWebViewToDock: (webView: WebViewProps, layout: Layout) => Layout | undefined;
  /**
   * Remove a tab in the layout
   * @param tabId id of the tab to remove
   */
  removeTabFromDock: (tabId: string) => boolean;
  /**
   * The layout to use as the default layout if the dockLayout doesn't have a layout loaded.
   *
   * TODO: This should be removed and the `testLayout` imported directly in this file once this
   * service is refactored to split the code between processes. The only reason this is passed from
   * `platform-dock-layout.component.tsx` is that we cannot import `testLayout` here since this
   * service is currently all shared code. Refactor should happen in #203
   */
  testLayout: LayoutBase;
};

/**
 * The only `sandbox` attribute values we allow iframes to have including WebView iframes and any
 * others. The `sandbox` attribute controls what privileges iframe scripts and other things have.
 *
 * `allow-same-origin` so the iframe can get papi and communicate and such
 *
 * `allow-scripts` so the iframe can actually do things
 *
 * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
 *
 * Note: Mozilla's iframe page warns that listing both 'allow-same-origin' and 'allow-scripts'
 * allows the child scripts to remove this sandbox attribute from the iframe. We use a
 * `MutationObserver` in `web-view.service.ts` to remove any iframes that do not comply with these
 * sandbox requirements. This successfully prevents iframes with too many privileges from executing
 * as of July 2023. However, this means the sandboxing could do nothing for a determined hacker if
 * they ever find a way around all this. We must distrust the whole renderer due to this issue. We
 * will probably want to stay vigilant on security in this area.
 */
// TODO: csp?
// TODO: credentialless?
// TODO: referrerpolicy?
export const ALLOWED_IFRAME_SANDBOX_VALUES = ['allow-same-origin', 'allow-scripts'];
/**
 * The most lenient iframe sandboxing we allow. See {@link ALLOWED_IFRAME_SANDBOX_VALUES} for more
 * information on our sandboxing methods and why we chose these values.
 */
export const DEFAULT_IFRAME_SANDBOX = ALLOWED_IFRAME_SANDBOX_VALUES.join(' ');
/**
 * Get Regex to test stack traces against for creating script tags on the renderer document. Only
 * renderer code is allowed to create script tags. script tags coming from any other source
 * throw an error.
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
const FORBIDDEN_HTML_TAGS = ['object', 'base', 'embed', 'frame', 'frameset'];

/** Prefix on requests that indicates that the request is related to webView operations */
const CATEGORY_WEB_VIEW = 'webView';

/** Name for request to get a web view */
const GET_WEB_VIEW_REQUEST = 'getWebView';

/** localstorage key for saving and loading the dock layout */
const DOCK_LAYOUT_KEY = 'dock-saved-layout';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Emitter for when a webview is added */
const onDidAddWebViewEmitter = createNetworkEventEmitter<AddWebViewEvent>(
  serializeRequestType(CATEGORY_WEB_VIEW, 'onDidAddWebView'),
);
/** Event that emits with webView info when a webView is added */
export const onDidAddWebView = onDidAddWebViewEmitter.event;

/**
 * Variable that will hold the rc-dock dock layout along with a couple other props. This is
 * populated by `platform-dock-layout.component.tsx` registering its dock layout with this service,
 * allowing this service to manage layouts and such.
 *
 * WARNING: YOU CAN ONLY USE THIS VARIABLE IN THE RENDERER. Also please do not save this
 * variable out anywhere because it can change, invalidating the old one (see `registerDockLayout`)
 */
let papiDockLayoutVar = createDockLayoutAsyncVar();

// #region functions related to the dock layout

/**
 * Basic `saveTabInfo` that simply strips the properties added by {@link TabInfo} off of the object
 * and returns it as a {@link SavedTabInfo}. Runs as the {@link TabSaver} by default if the tab type
 * does not have a specific `TabSaver`
 */
export function saveTabInfoBase(tabInfo: TabInfo): SavedTabInfo {
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tabTitle, content, minWidth, minHeight, ...savedTabInfo } = tabInfo;
  return savedTabInfo;
}

/**
 * Converts web view definition used in an actual docking tab into saveable web view information by
 * stripping out the members we don't want to save
 * @param webViewDefinition web view to save
 * @returns saveable web view information based on `webViewDefinition`
 */
export function convertWebViewDefinitionToSaved(
  webViewDefinition: WebViewDefinition,
): SavedWebViewDefinition {
  const webViewDefinitionCloned: Omit<WebViewDefinition, 'content'> &
    Partial<Pick<WebViewDefinition, 'content'>> &
    Partial<Pick<WebViewDefinitionReact, 'styles'>> = { ...webViewDefinition };
  // We don't want to keep the webView content so the web view provider can provide it again when
  // deserializing
  delete webViewDefinitionCloned.content;
  delete webViewDefinitionCloned.styles;
  return webViewDefinitionCloned;
}

/** Create a new dock layout promise variable */
function createDockLayoutAsyncVar(): AsyncVariable<PapiDockLayout> {
  return new AsyncVariable<PapiDockLayout>(
    'web-view.service.platformDockLayout',
    // Use default timeout on renderer, but never timeout anywhere else because we will not be
    // resolving this. One of the serious pains of not having #203
    isRenderer() ? undefined : -1,
  );
}

/**
 * When rc-dock detects a changed layout, save it. This function is given to the registered
 * papiDockLayout to run when the dock layout changes.
 *
 * TODO: We could filter whether we need to save based on the `direction` argument. - IJH 2023-05-1
 * @param newLayout the changed layout to save.
 */
const onLayoutChange: OnLayoutChangeRCDock = async (newLayout) => {
  return saveLayout(newLayout);
};

/**
 * Safely load a value from local storage.
 * @param key of the value.
 * @param defaultValue to return if the key is not found.
 * @returns the value of the key fetched from local storage, or the default value if not found.
 */
function getStorageValue<T>(key: string, defaultValue: T): T {
  const saved = localStorage.getItem(key);
  const initial = saved ? JSON.parse(saved) : undefined;
  return initial || defaultValue;
}

/**
 * Persists the current dock layout information.
 * @param layout layout to persist
 */
async function saveLayout(layout: LayoutBase): Promise<void> {
  const currentLayout = layout;
  localStorage.setItem(DOCK_LAYOUT_KEY, JSON.stringify(currentLayout));
}

/**
 * Loads layout information into the dock layout.
 * @param layout If this parameter is provided, loads that layout information. If not provided, gets
 * the persisted layout information and loads it into the dock layout.
 *
 * WARNING: YOU CAN ONLY USE THIS FUNCTION IN THE RENDERER
 */
async function loadLayout(layout?: LayoutBase): Promise<void> {
  const dockLayoutVar = await papiDockLayoutVar.promise;
  const layoutToLoad = layout || getStorageValue(DOCK_LAYOUT_KEY, dockLayoutVar.testLayout);

  dockLayoutVar.dockLayout.loadLayout(layoutToLoad);
  if (layout) {
    // A layout was provided, meaning this is a layout change. Since `dockLayout.loadLayout` doesn't
    // run `onLayoutChange`, we run it manually
    await onLayoutChange(layoutToLoad);
  }
}

/**
 * Register a dock layout React element to be used by this service to perform layout-related
 * operations
 * @param dockLayout dock layout element to register along with other important properties
 * @returns function used to unregister this dock layout
 *
 * WARNING: YOU CAN ONLY USE THIS FUNCTION IN THE RENDERER
 *
 * Not exposed on the papi
 */
export function registerDockLayout(dockLayout: PapiDockLayout): Unsubscriber {
  // Save the current async var so we know if it changed before we unsubscribed
  const currentPapiDockLayoutVar = papiDockLayoutVar;

  // Set the dock layout as the promise var. Throws if already resolved
  papiDockLayoutVar.resolveToValue(dockLayout, true);

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

    // Create a new async var to empty out the dock layout
    // TODO: Would this create any problems...? I guess only if we save dockLayoutVar somewhere else
    papiDockLayoutVar = createDockLayoutAsyncVar();

    return true;
  };
}

// #endregion

/** Set up defaults for options for getting a web view */
function getWebViewOptionsDefaults(options: GetWebViewOptions): GetWebViewOptions {
  const optionsDefaulted = cloneDeep(options);
  if ('existingId' in optionsDefaulted && !('createNewIfNotFound' in optionsDefaulted))
    optionsDefaulted.createNewIfNotFound = true;

  return optionsDefaulted;
}

/**
 * Remove a tab in the layout
 * @param tabId id of the tab to remove
 *
 * @returns true if successfully found the tab to remove
 *
 * WARNING: YOU CAN ONLY USE THIS FUNCTION IN THE RENDERER
 *
 * Not exposed on the papi
 */
export const removeTab = async (tabId: string): Promise<boolean> => {
  return (await papiDockLayoutVar.promise).removeTabFromDock(tabId);
};

/**
 * Add or update a tab in the layout
 * @param savedTabInfo info for tab to add or update
 * @param layout information about where to put a new tab
 *
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 *
 * WARNING: YOU CAN ONLY USE THIS FUNCTION IN THE RENDERER
 *
 * Not exposed on the papi
 */
export const addTab = async <TData = unknown>(
  savedTabInfo: SavedTabInfo & { data?: TData },
  layout: Layout,
): Promise<Layout | undefined> => {
  return (await papiDockLayoutVar.promise).addTabToDock(savedTabInfo, layout);
};

/**
 * Creates a new web view or gets an existing one depending on if you request an existing one and
 * if the web view provider decides to give that existing one to you (it is up to the provider).
 *
 * @param webViewType type of WebView to create
 * @param layout information about where you want the web view to go. Defaults to adding as a tab
 * @param options options that affect what this function does. For example, you can provide an
 * existing web view id to request an existing web view with that id.
 *
 * @returns promise that resolves to the id of the webview we got.
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

  // Create the webview
  if (!isRenderer()) {
    // HACK: Quick fix for https://github.com/paranext/paranext-core/issues/52
    // Try to run getWebView several times until the renderer is up
    // Once we implement a way to track dependencies across processes, this can go away
    // Note that requests are retried, so there is another loop
    // within this loop deeper down.
    for (let attemptsRemaining = 5; attemptsRemaining > 0; attemptsRemaining--) {
      try {
        // eslint-disable-next-line no-await-in-loop
        return await networkService.request<
          [WebViewType, Layout, GetWebViewOptions],
          WebViewId | undefined
        >(
          serializeRequestType(CATEGORY_WEB_VIEW, GET_WEB_VIEW_REQUEST),
          webViewType,
          layout,
          optionsDefaulted,
        );
      } catch (error) {
        // If we are out of tries or the error returned is not that the renderer is down, stop
        // trying to resend and just throw
        if (
          attemptsRemaining === 1 ||
          getErrorMessage(error) !==
            `No handler was found to process the request of type ${serializeRequestType(
              CATEGORY_WEB_VIEW,
              GET_WEB_VIEW_REQUEST,
            )}`
        )
          throw error;
        // eslint-disable-next-line no-await-in-loop
        await wait(1000);
      }
    }
    throw new Error(`getWebView failed, but you should have seen a different error than this!`);
  }

  // Conditional import when inside the renderer
  const { getFullWebViewStateById, setFullWebViewStateById } = await import(
    '@renderer/services/web-view-state.service'
  );

  // Get the webview definition from the webview provider
  const webViewProvider = await webViewProviderService.get(webViewType);

  if (!webViewProvider) {
    logger.error(`Cannot find Web View Provider for webview type ${webViewType}`);
    return undefined;
  }

  // Find existing webView if one exists
  /** Either the existing webview with the specified id or a placeholder webview if one was not found */
  let existingSavedWebView: SavedWebViewDefinition | undefined;
  // Look for existing webview
  if (optionsDefaulted.existingId) {
    // Expect this to be a tab.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const existingWebView = (await papiDockLayoutVar.promise).dockLayout.find(
      optionsDefaulted.existingId === '?'
        ? // If they provided '?', that means look for any webview with a matching webViewType
          (item) => {
            // This is not a webview
            if (!('data' in item)) return false;

            // Find any webview with the specified webViewType. Type assert the unknown `data`.
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            return (item.data as WebViewDefinition).webViewType === webViewType;
          }
        : // If they provided any other string, look for a webview with that id
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

  // We didn't find an existing web view with the id
  if (!existingSavedWebView) {
    // If we are not looking to create a new webview, then don't.
    if ('existingId' in optionsDefaulted && !optionsDefaulted.createNewIfNotFound) return undefined;
    // If we want to create a new webview, set a placeholder with a new id
    existingSavedWebView = { webViewType, id: newGuid() };
  }

  // Create the new webview or load if it already existed
  const webView = await webViewProvider.getWebView(existingSavedWebView, optionsDefaulted);

  // The web view provider didn't want to create this web view
  if (!webView) return undefined;

  // The web view provider might have updated the web view state, so save it
  if (webView.state) setFullWebViewStateById(webView.id, webView.state);

  // WebView.contentType is assumed to be React by default. Extensions can specify otherwise
  const contentType = webView.contentType ? webView.contentType : WebViewContentType.React;

  // `webViewRequire`, `getWebViewStateById`, and `setWebViewStateById` below are defined in `src\renderer\global-this.model.ts`
  // `useWebViewState` below is defined in `src\shared\global-this.model.ts`
  // We have to bind `useWebViewState` to the current `window` context because calls within PAPI don't have access to a webview's `window` context
  /** String that sets up 'import' statements in the webview to pull in libraries and clear out internet access and such */
  const imports = `
  var papi = window.parent.papi;
  var React = window.parent.React;
  var ReactJsxRuntime = window.parent.ReactJsxRuntime;
  var ReactDom = window.parent.ReactDom;
  var ReactDOMClient = window.parent.ReactDOMClient;
  var createRoot = window.parent.createRoot;
  var SillsdevScripture = window.parent.SillsdevScripture;
  var require = window.parent.webViewRequire;
  var getWebViewStateById = window.parent.getWebViewStateById;
  var setWebViewStateById = window.parent.setWebViewStateById;
  window.getWebViewState = (stateKey) => { return getWebViewStateById('${webView.id}', stateKey) };
  window.setWebViewState = (stateKey, stateValue) => { setWebViewStateById('${webView.id}', stateKey, stateValue) };
  window.useWebViewState = window.parent.useWebViewState.bind(window);
  window.fetch = papi.fetch;
  delete window.parent;
  delete window.top;
  delete window.frameElement;
  delete window.XMLHttpRequest;
  delete window.WebSocket;
  `;

  /** Nonce used to allow scripts and styles to run */
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
                root.render(React.createElement(globalThis.webViewComponent, null));
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
   * Content security policy header for the webview - controls what resources scripts and other things can access.
   *
   * DO NOT CHANGE THIS WITHOUT A SERIOUS REASON
   *
   * Please uncomment the image creation arbitrary code execution in `evil.js`'s WebView when you
   * make changes so we can double check it is still successfully blocked.
   */
  // default-src 'none' so things can't happen unless we allow them
  // script-src allows them to use script tags and in-line attribute scripts
  //    'self' so scripts can be loaded from us
  //    papi-extension: so scripts can be loaded from installed extensions
  //    ${specificSrcPolicy} so we can load the specific styles needed from the iframe
  //    TODO: change to script-src-elem so in-line attribute scripts like event handlers don't run? If this is actually more secure
  // style-src allows them to use style/link tags and style attributes on tags
  //    'self' so styles can be loaded from us
  //    papi-extension: so scripts can be loaded from installed extensions
  //    'unsafe-inline' because that's how bundled libraries' styles are loaded in
  //      TODO: PLEASE FIX THIS?
  // connect-src 'self' so the iframe can only communicate over the internet with us and not outside the iframe
  //    Note: they can still use things that are imported to their script via the imports string above.
  //    Objects passed through from the parent window still have full internet access. We must be very careful
  //    to control their access to the parent windows's stuff like papi
  // img-src load images
  //   'self' so images can be loaded from us
  //   papi-extension: so images can be loaded from installed extensions
  // media-src load audio, video, etc
  //   'self' so media can be loaded from us
  //   papi-extension: so media can be loaded from installed extensions
  // font-src load fonts
  //   'self' so fonts can be loaded from us
  //   papi-extension: so fonts can be loaded from installed extensions
  // form-action 'self' lets the form submit to us
  //    TODO: not sure if this is needed. If we can attach handlers to forms, we can probably remove this
  // navigate-to 'none' prevents them from redirecting this iframe somewhere else
  //    WARNING: This is experimental and does not work as of July 2023! It is here for future
  //    compatibility in case they add support for it
  // object-src 'none' to prevent insecure object and embed until we have a reason to use them
  const contentSecurityPolicy = `<meta http-equiv="Content-Security-Policy"
    content="
      default-src 'none';
      script-src 'self' papi-extension: ${specificSrcPolicy};
      style-src 'self' papi-extension: 'unsafe-inline';
      connect-src 'self';
      img-src 'self' papi-extension:;
      media-src 'self' papi-extension:;
      font-src 'self' papi-extension:;
      form-action 'self';
      navigate-to 'none';
      object-src 'none';
    ">`;

  // Add a script at the start of the head to give access to papi
  const headStart = webViewContent.indexOf('<head');
  const headEnd = webViewContent.indexOf('>', headStart);

  // Inject the import scripts into the html
  webViewContent = `${webViewContent.substring(0, headEnd + 1)}
    ${contentSecurityPolicy}
    <script nonce="${srcNonce}">
    ${imports}
    </script>${webViewContent.substring(headEnd + 1)}`;

  const updatedWebView: WebViewProps = {
    ...webView,
    contentType,
    content: webViewContent,
  };

  const updatedLayout = (await papiDockLayoutVar.promise).addWebViewToDock(updatedWebView, layout);

  // If we received a layout (meaning it created a new webview instead of updating an existing one),
  // inform web view consumers that we added a new web view
  if (updatedLayout)
    onDidAddWebViewEmitter.emit({
      webView: convertWebViewDefinitionToSaved(updatedWebView),
      layout: updatedLayout,
    });

  return webView.id;
};

/** Commands that this process will handle if it is the renderer. Registered automatically at initialization */
const rendererRequestHandlers = {
  [serializeRequestType(CATEGORY_WEB_VIEW, GET_WEB_VIEW_REQUEST)]: getWebView,
};

/**
 * Reads through the list of document changes detected by our MutationObserver and deletes forbidden
 * elements including iframes with improper sandboxing
 */
function removeForbiddenElements(mutationList: MutationRecord[]) {
  // If this becomes too slow, it may be necessary to use getElementsByTagName instead of looping
  // through the mutations. Thanks for the idea to https://stackoverflow.com/a/39332340
  mutationList.forEach((m) => {
    // If for some reason this mutation is not added or removed nodes, forget it
    if (m.type !== 'childList') return;

    // Check if each added node is a forbidden element
    m.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return;

      // This is an element node.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const element = node as Element;
      const tag = element.tagName.toLowerCase();

      /** Remove the element */
      const removeElement = () => {
        logger.warn(
          `${tag} rejected! An extension may have been trying to execute code with higher privileges!`,
        );
        m.target.removeChild(element);
      };
      if (tag === 'iframe') {
        const sandbox = element.attributes.getNamedItem('sandbox');
        const sandboxValues = sandbox?.value?.split(' ');
        if (
          !sandbox ||
          !sandboxValues ||
          sandboxValues.some(
            (sandboxValue) => !ALLOWED_IFRAME_SANDBOX_VALUES.includes(sandboxValue),
          )
        )
          removeElement();
      } else if (FORBIDDEN_HTML_TAGS.includes(tag)) removeElement();
    });
  });
}

/** Sets up the WebViewService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Set up subscriptions that the service needs to work

    // Do some setup only in the renderer
    if (isRenderer()) {
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
      // We don't need to watch attributes to make sure the sandbox attribute doesn't change because
      // sandbox doesn't update unless an iframe is removed and added
      // https://stackoverflow.com/a/16135502/8535752
      observer.observe(document, { subtree: true, childList: true });

      // Monkey-patch document.createElement so new script tags cannot be added by anything but our
      // code (since we load renderer files in chunks)
      const createElementOriginal = document.createElement.bind(document);
      // If we name this function, we will need to change the regex testing the stack traces, and we
      // may also have trouble with minifying production code. Leaving this function unnamed keeps
      // things simpler
      // eslint-disable-next-line func-names
      document.createElement = function (...args: Parameters<Document['createElement']>) {
        const [tagName] = args;
        if (tagName.toLowerCase() === 'script') {
          const stackTrace = Error().stack ?? '';
          const isInRenderer = getRendererScriptRegex().test(stackTrace);
          if (isInRenderer) {
            logger.debug(
              // TODO: Should we only print this stacktrace in development, not when
              // `globalThis.isPackaged === true`? Awaiting decision from
              // https://github.com/paranext/paranext-core/issues/337
              `Allowed script on renderer document. If this isn't recognized, this is a very serious error.\nStack: ${stackTrace}`,
            );
          } else {
            const message = `Cannot create new script tags on renderer document! Try creating one in an iframe.\nStack: ${stackTrace}`;
            // LogError puts an error in the console and throws an error. We don't want to scare
            // anyone with the script tag evil adds to test this feature, so let's not log an error
            // in development. But no exceptions when packaged
            if (globalThis.isPackaged || !stackTrace.includes('at evil.web-view.html'))
              throw new LogError(message);
            throw new Error(message);
          }
        }
        return createElementOriginal(...args);
      };

      // Register built-in requests
      // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
      const unsubPromises = Object.entries(rendererRequestHandlers).map(([requestType, handler]) =>
        // Fix type after passing through the `map` function.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        networkService.registerRequestHandler(requestType as SerializedRequestType, handler),
      );

      // Wait to successfully register all requests
      const unsubscribeRequests = aggregateUnsubscriberAsyncs(await Promise.all(unsubPromises));

      // On closing, try to remove request listeners
      // TODO: should do this on the server when the connection closes or when the server exits as well
      window.addEventListener('beforeunload', async () => {
        await unsubscribeRequests();
      });
    }

    isInitialized = true;
  })();

  return initializePromise;
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface PapiWebViewService {
  onDidAddWebView: typeof onDidAddWebView;
  getWebView: typeof getWebView;
  initialize: typeof initialize;
}

/** JSDOC SOURCE papiWebViewService
 * Service exposing various functions related to using webViews
 */
export const papiWebViewService: PapiWebViewService = {
  onDidAddWebView,
  getWebView,
  initialize,
};
