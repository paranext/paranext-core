/**
 * Service that handles WebView-related operations
 * Likely shouldn't need/want to expose this whole service on papi,
 * but most things are exposed via papiWebViewService
 */
import cloneDeep from 'lodash/cloneDeep';
import { isRenderer } from '@shared/utils/internal-util';
import {
  Unsubscriber,
  aggregateUnsubscriberAsyncs,
  getModuleSimilarApiMessage,
  serializeRequestType,
} from '@shared/utils/papi-util';
import { getErrorMessage, newGuid, newNonce, wait } from '@shared/utils/util';
// We need the papi here to pass it into WebViews. Don't use it anywhere else in this file
// eslint-disable-next-line import/no-cycle
import papi from '@shared/services/papi.service';
import React, { MutableRefObject } from 'react';
import { createRoot } from 'react-dom/client';
import { createNetworkEventEmitter } from '@shared/services/network.service';
import {
  AddWebViewEvent,
  Layout,
  PanelDirection,
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

/** rc-dock's onLayoutChange prop made asynchronous - resolves */
export type OnLayoutChangeRCDock = (
  newLayout: LayoutBase,
  currentTabId?: string,
  direction?: DropDirection,
) => Promise<void>;

export type PapiDockLayout = {
  dockLayout: DockLayout;
  onLayoutChangeRef: MutableRefObject<OnLayoutChangeRCDock | undefined>;
  addWebViewToDock: (webView: WebViewProps, layout: Layout) => void;
  /**
   * The layout to use as the default layout if the dockLayout doesn't have a layout loaded.
   *
   * TODO: This should be removed and the `testLayout` imported directly in this file once this
   * service is refactored to split the code between processes. The only reason this is passed from
   * `paranext-dock-layout.component.tsx` is that we cannot import `testLayout` here since this
   * service is currently all shared code. Refactor should happen in #203
   */
  testLayout: LayoutBase;
};

/** Prefix on requests that indicates that the request is related to webView operations */
const CATEGORY_WEB_VIEW = 'webView';
const DEFAULT_FLOAT_SIZE = { width: 300, height: 150 };
const DEFAULT_PANEL_DIRECTION: PanelDirection = 'right';
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
 * populated by `paranext-dock-layout.component.tsx` registering its dock layout with this service,
 * allowing this service to manage layouts and such.
 *
 * WARNING: YOU CANNOT USE THIS VARIABLE IN ANYTHING BUT THE RENDERER. Also please do not save this
 * variable out anywhere because it can change, invalidating the old one (see `registerDockLayout`)
 */
let papiDockLayoutVar = createDockLayoutAsyncVar();

// #region Renderer-only stuff

/**
 * Provide a require implementation so we can provide some needed packages for extensions or
 * for packages that extensions import
 */
const webViewRequire = (module: string) => {
  if (module === 'papi') return papi;
  if (module === 'react') return React;
  if (module === 'react-dom/client') return { createRoot };
  // Tell the extension dev if there is an api similar to what they want to import
  const message = `Requiring other than papi, react, and react-dom/client > createRoot is not allowed in WebViews! ${getModuleSimilarApiMessage(
    module,
  )}`;
  throw new Error(message);
};

// TODO: Hacking in React, createRoot, and papi onto window for now so webViews can access it. Make this TypeScript-y
// getPapi must be a function because this service cannot immediately access papi since it is a
// circular dependency
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).getPapi = () => papi;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).React = React;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).createRoot = createRoot;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).webViewRequire = webViewRequire;

// #endregion

// #region functions related to the dock layout

function layoutDefaults(layout: Layout): Layout {
  const layoutDefaulted = cloneDeep(layout);
  switch (layoutDefaulted.type) {
    case 'float':
      if (!layoutDefaulted.floatSize) layoutDefaulted.floatSize = DEFAULT_FLOAT_SIZE;
      break;
    case 'panel':
      if (!layoutDefaulted.direction) layoutDefaulted.direction = DEFAULT_PANEL_DIRECTION;
      break;
    case 'tab':
    default:
    // do nothing
  }
  return layoutDefaulted;
}

export function saveTabInfoBase(tabInfo: TabInfo): SavedTabInfo {
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tabTitle: title, content, minWidth, minHeight, ...savedTabInfo } = tabInfo;
  return savedTabInfo;
}

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

function createDockLayoutAsyncVar(): AsyncVariable<PapiDockLayout> {
  return new AsyncVariable<PapiDockLayout>(
    'web-view.service.paranextDockLayout',
    // Use default timeout on renderer, but never timeout anywhere else because we will not be
    // resolving this. One of the serious pains of not having #203
    isRenderer() ? undefined : -1,
  );
}

/**
 * When rc-dock detects a changed layout, save it.
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

export function registerDockLayout(dockLayout: PapiDockLayout): Unsubscriber {
  // Save the current async var so we know if it changed before we unsubscribed
  const currentPapiDockLayoutVar = papiDockLayoutVar;

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
    if (papiDockLayoutVar !== currentPapiDockLayoutVar) return false;

    // Create a new async var to empty out the dock layout
    // TODO: Would this create any problems...? I guess only if we save dockLayoutVar somewhere else
    papiDockLayoutVar = createDockLayoutAsyncVar();

    return true;
  };
}

// #endregion

function getWebViewOptionsDefaults(options: GetWebViewOptions): GetWebViewOptions {
  const optionsDefaulted = cloneDeep(options);
  if ('existingId' in optionsDefaulted && !('createNewIfNotFound' in optionsDefaulted))
    optionsDefaulted.createNewIfNotFound = true;

  return optionsDefaulted;
}

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

  // Get the webview definition from the webview provider
  const webViewProvider = await webViewProviderService.get(webViewType);

  if (!webViewProvider)
    throw new Error(`Cannot find Web View Provider for webview type ${webViewType}`);

  // Find existing webView if one exists
  /** Either the existing webview with the specified id or a placeholder webview if one was not found */
  let existingSavedWebView: SavedWebViewDefinition | undefined;
  /** Whether we found an existing web view to ask the provider for */
  let didFindExistingWebView = false;
  // Look for existing webview
  if (optionsDefaulted.existingId) {
    const existingWebView = (await papiDockLayoutVar.promise).dockLayout.find(
      optionsDefaulted.existingId === '?'
        ? // If they provided '?', that means look for any webview with a matching webViewType
          (item) => {
            // This is not a webview
            if (!('data' in item)) return false;

            // Find any webview with the specified webViewType
            return (item.data as WebViewDefinition).webViewType === webViewType;
          }
        : // If they provided any other string, look for a webview with that id
          optionsDefaulted.existingId,
    ) as TabInfo | undefined;
    if (existingWebView) {
      // We found the webview! Save it to send to the web view provider
      existingSavedWebView = convertWebViewDefinitionToSaved(
        existingWebView.data as WebViewDefinition,
      );
      didFindExistingWebView = true;
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

  /**
   * The web view we are getting is new. Either the webview provider gave us a new webview instead
   * of the existing one or there wasn't an existing one in the first place
   */
  // See if the provider gave us a new web view
  // Meaning we got a web view from the provider (which is already the case since we are here)
  // And we didn't find an existing one so the one we got must be new
  // or the web view id we asked the provider for is not the one it gave us and it already exists
  const webViewIsNew =
    !didFindExistingWebView ||
    (existingSavedWebView.id !== webView.id &&
      (await papiDockLayoutVar.promise).dockLayout.find(webView.id));

  // WebView.contentType is assumed to be React by default. Extensions can specify otherwise
  const contentType = webView.contentType ? webView.contentType : WebViewContentType.React;

  /** String that sets up 'import' statements in the webview to pull in libraries and clear out internet access and such */
  const imports = `
  var papi = window.parent.getPapi();
  var React = window.parent.React;
  var createRoot = window.parent.createRoot;
  var require = window.parent.webViewRequire;
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
  const updatedLayout = layoutDefaults(layout);

  (await papiDockLayoutVar.promise).addWebViewToDock(updatedWebView, updatedLayout);

  // Inform web view consumers we added a new web view
  if (webViewIsNew)
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

/** Sets up the WebViewService. Runs only once */
export const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // Set up subscriptions that the service needs to work

    // Register built-in requests
    if (isRenderer()) {
      // TODO: make a registerRequestHandlers function that we use here and in NetworkService.initialize?
      const unsubPromises = Object.entries(rendererRequestHandlers).map(([requestType, handler]) =>
        networkService.registerRequestHandler(requestType, handler),
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

// Pulled out registering web view providers because it feels better to have these services split
// up internally but combined externally.
// TODO: once we fix the dependency loop mentioned below on `papiWebViewService`, we can remove this
// line since we don't need to export the registration twice.
export const registerWebViewProvider = webViewProviderService.register;

/** All the exports in this service that are to be exposed on the PAPI */
// TODO: This doesn't actually work - causes a dependency loop if used in papi.service.ts. We may
// fix this when we split papi into frontend and backend in #172
export const papiWebViewService = {
  onDidAddWebView,
  getWebView,
  initialize,
  registerWebViewProvider,
};

export type PapiWebViewService = typeof papiWebViewService;
