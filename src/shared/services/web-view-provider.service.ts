/**
 * Handles registering web view providers and serving web views around the papi. Exposed on the
 * papi.
 */

import {
  IDisposableWebViewProvider,
  IWebViewProvider,
  IRegisteredWebViewProvider,
} from '@shared/models/web-view-provider.model';
import networkObjectService, { overrideDispose } from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import logger from '@shared/services/logger.service';
import { isSerializable } from 'platform-bible-utils';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
import { DisposableNetworkObject } from '@shared/models/network-object.model';
import webViewService from '@shared/services/web-view.service';
import {
  getWebViewControllerObjectId,
  getWebViewMessageRequestType,
  WEB_VIEW_CONTROLLER_OBJECT_TYPE,
  WebViewMessageRequestHandler,
} from '@shared/services/web-view.service-model';
import { WebViewId } from '@shared/models/web-view.model';

/** Suffix on network objects that indicates that the network object is a web view provider */
const WEB_VIEW_PROVIDER_LABEL = 'webViewProvider';

/** Gets the id for the web view provider network object with the given name */
const getWebViewProviderObjectId = (webViewType: string) =>
  `${webViewType}-${WEB_VIEW_PROVIDER_LABEL}`;

/** Network object type for web view providers */
const WEB_VIEW_PROVIDER_OBJECT_TYPE = 'webViewProvider';

/**
 * Map of web view controllers by web view id. Used to dispose of web view controllers when their
 * web view closes
 */
const webViewControllersById = new Map<
  string,
  DisposableNetworkObject<WebViewControllers[WebViewControllerTypes]>
>();

// Dispose of web view controllers when their associated web view is closed
webViewService.onDidCloseWebView(async ({ webView }) => {
  const webViewController = webViewControllersById.get(webView.id);
  if (!webViewController) return;

  try {
    if (!(await webViewController.dispose())) throw new Error('dispose returned false!');
  } catch (e) {
    logger.warn(
      `Web View Provider service failed to dispose of web view controller for id ${webView.id} (type ${webView.webViewType}) when the web view was closed! ${e}`,
    );
  }
});

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Sets up the service. Only runs once and always returns the same promise after that */
const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    // TODO: Might be best to make a singleton or something
    await networkService.initialize();

    isInitialized = true;
  })();

  return initializePromise;
};

/**
 * Indicate if we are aware of an existing web view provider with the given type. If a web view
 * provider with the given type is somewhere else on the network, this function won't tell you about
 * it unless something else in the existing process is subscribed to it.
 *
 * @param webViewType Type of webView to check for
 */
function hasKnownWebViewProvider(webViewType: string): boolean {
  return networkObjectService.hasKnown(getWebViewProviderObjectId(webViewType));
}

/**
 * Register a web view provider to serve webViews for a specified type of webViews
 *
 * @param webViewType Type of web view to provide
 * @param webViewProvider Object to register as a webView provider including control over disposing
 *   of it.
 *
 *   WARNING: setting a webView provider mutates the provided object.
 * @returns `webViewProvider` modified to be a network object and able to be disposed with `dispose`
 */
async function register(
  webViewType: string,
  webViewProvider: IWebViewProvider,
): Promise<IDisposableWebViewProvider> {
  await initialize();

  if (hasKnownWebViewProvider(webViewType))
    throw new Error(`WebView provider for WebView type ${webViewType} is already registered`);

  // Validate that the WebView provider has what it needs
  if (!webViewProvider.getWebView || typeof webViewProvider.getWebView !== 'function')
    throw new Error(`WebView provider does not have a getWebView function`);

  // Layer over the web view provider's getWebView method to make sure web view state is
  // serializable
  /** Saved bound version of the web view provider's getWebView so we can call it from here */
  const wvpGetWebView = webViewProvider.getWebView.bind(webViewProvider);
  webViewProvider.getWebView = async (...args) => {
    const webViewDefinition = await wvpGetWebView(...args);

    // If the web view provider provided a state, make sure it is serializable
    if (webViewDefinition?.state && !isSerializable(webViewDefinition.state))
      throw new Error(
        `web-view-provider.service error: WebView Provider with type ${webViewType} responded to getWebView with a state that is not serializable`,
      );

    return webViewDefinition;
  };

  // We are good to go! Create the WebView provider

  // Get the object id for this web view provider name
  const webViewProviderObjectId = getWebViewProviderObjectId(webViewType);

  // Set up the WebView provider to be a network object so other processes can use it
  const disposableWebViewProvider: IDisposableWebViewProvider = await networkObjectService.set(
    webViewProviderObjectId,
    webViewProvider,
    WEB_VIEW_PROVIDER_OBJECT_TYPE,
    { webViewType },
  );

  return disposableWebViewProvider;
}

/**
 * Get a web view provider that has previously been set up
 *
 * @param webViewType Type of webview provider to get
 * @returns Web view provider with the given name if one exists, undefined otherwise
 */
async function get(webViewType: string): Promise<IRegisteredWebViewProvider | undefined> {
  await initialize();

  // Get the object id for this web view provider name
  const webViewProviderObjectId = getWebViewProviderObjectId(webViewType);

  await networkObjectStatusService.waitForNetworkObject(
    { id: webViewProviderObjectId },
    // Wait up to 20 seconds for the web view provider to appear
    20000,
  );

  const webViewProvider =
    await networkObjectService.get<IRegisteredWebViewProvider>(webViewProviderObjectId);

  if (!webViewProvider) {
    logger.info(`No WebView provider found for WebView type ${webViewType}`);
    return undefined;
  }

  return webViewProvider;
}

/**
 * Indicate if we are aware of an existing web view provider with the given type. If a web view
 * provider with the given type is somewhere else on the network, this function won't tell you about
 * it unless something else in the existing process is subscribed to it.
 *
 * @param webViewType Type of webView to check for
 */
function hasKnownWebViewController(webViewId: WebViewId): boolean {
  return (
    networkObjectService.hasKnown(getWebViewControllerObjectId(webViewId)) ||
    webViewControllersById.has(webViewId)
  );
}

/**
 * Register a web view controller to represent a web view. It is expected that a web view provider
 * calls this to register a web view controller for a web view that is being created. If a web view
 * provider extends {@link WebViewFactory}, it will call this function automatically.
 *
 * A Web View Controller is a network object that represents a web view and whose methods facilitate
 * communication between its associated web view and extensions that want to interact with it.
 *
 * You can get web view controllers with {@link webViewService.getWebViewController}.
 *
 * @param webViewType Type of web view for which you are providing this web view controller
 * @param webViewId Id of web view for which to register the web view controller
 * @param webViewController Object to register as a web view controller including control over
 *   disposing of it. Note: the web view controller will be disposed automatically when the web view
 *   is closed
 *
 *   WARNING: setting a web view controller mutates the provided object.
 * @returns `webViewController` modified to be a network object
 */
async function registerWebViewController<WebViewType extends WebViewControllerTypes>(
  webViewType: WebViewType,
  webViewId: WebViewId,
  webViewController: WebViewControllers[WebViewType],
): Promise<DisposableNetworkObject<WebViewControllers[WebViewType]>> {
  await initialize();

  if (hasKnownWebViewController(webViewId))
    throw new Error(
      `WebView controller for WebView Id ${webViewId} (type ${webViewType}) is already registered`,
    );

  // Get the object id for this web view controller name
  const webViewControllerObjectId = getWebViewControllerObjectId(webViewId);

  // Set up the WebView Controller to be a network object so other processes can use it
  const disposableWebViewController: DisposableNetworkObject<WebViewControllers[WebViewType]> =
    await networkObjectService.set(
      webViewControllerObjectId,
      webViewController,
      WEB_VIEW_CONTROLLER_OBJECT_TYPE,
      { webViewType, webViewId },
    );

  overrideDispose(disposableWebViewController, async () => {
    return webViewControllersById.delete(webViewId);
  });

  if (webViewControllersById.has(webViewId))
    logger.warn(
      `Web view provider service is setting web view controller with id ${webViewId} (type ${webViewType}) in the map over an existing web view. This is not expected.`,
    );
  webViewControllersById.set(webViewId, disposableWebViewController);

  return disposableWebViewController;
}

/**
 * Sends a message to the specified web view. Expected to be used only by the
 * {@link IWebViewProvider} that created the web view or the {@link WebViewControllers} that
 * represents the web view created by the Web View Provider.
 *
 * [`postMessage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) is used to
 * deliver the message to the web view iframe. The web view can use
 * [`window.addEventListener("message",
 * ...)`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#the_dispatched_event)
 * in order to receive these messages.
 *
 * @param webViewId Id of the web view to which to send a message.
 * @param webViewNonce Pass in the nonce the wb view provider received from
 *   {@link IWebViewProvider.getWebView}'s `options`
 * @param message Data to send to the web view. Can only send serializable information
 * @param targetOrigin Expected origin of the web view. Does not send the message if the web view's
 *   origin does not match. See [`postMessage`'s
 *   `targetOrigin`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#targetorigin)
 *   for more information. Defaults to same origin only (works automatically with React and HTML web
 *   views)
 */
async function postMessageToWebView(
  webViewId: WebViewId,
  webViewNonce: string,
  message: unknown,
  targetOrigin?: string,
): Promise<void> {
  // TODO: check webViewNonce
  return networkService.request<
    Parameters<WebViewMessageRequestHandler>,
    ReturnType<WebViewMessageRequestHandler>
  >(getWebViewMessageRequestType(webViewId), webViewNonce, message, targetOrigin);
}

// Declare interfaces for the objects we're exporting so that JSDoc comments propagate
export interface WebViewProviderService {
  initialize: typeof initialize;
  hasKnown: typeof hasKnownWebViewProvider;
  register: typeof register;
  get: typeof get;
  registerWebViewController: typeof registerWebViewController;
  postMessageToWebView: typeof postMessageToWebView;
}

export interface PapiWebViewProviderService {
  register: typeof register;
  registerWebViewController: typeof registerWebViewController;
  postMessageToWebView: typeof postMessageToWebView;
}

const webViewProviderService: WebViewProviderService = {
  initialize,
  hasKnown: hasKnownWebViewProvider,
  register,
  get,
  registerWebViewController,
  postMessageToWebView,
};

/**
 * JSDOC SOURCE papiWebViewProviderService
 *
 * Interface for registering webView providers
 */
export const papiWebViewProviderService: PapiWebViewProviderService = {
  register,
  registerWebViewController,
  postMessageToWebView,
};

export default webViewProviderService;
