/**
 * Handles registering web view providers and serving web views around the papi. Exposed on the
 * papi.
 */

import {
  IDisposableWebViewProvider,
  IWebViewProvider,
  IRegisteredWebViewProvider,
} from '@shared/models/web-view-provider.model';
import networkObjectService from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import logger from '@shared/services/logger.service';
import { isSerializable } from 'platform-bible-utils';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
import { DisposableNetworkObject, NetworkObject } from '@shared/models/network-object.model';
import webViewService from './web-view.service';

/** Suffix on network objects that indicates that the network object is a web view provider */
const WEB_VIEW_PROVIDER_LABEL = 'webViewProvider';

/** Gets the id for the web view provider network object with the given name */
const getWebViewProviderObjectId = (webViewType: string) =>
  `${webViewType}-${WEB_VIEW_PROVIDER_LABEL}`;

/** Network object type for web view providers */
const WEB_VIEW_PROVIDER_OBJECT_TYPE = 'webViewProvider';

/** Suffix on network objects that indicates that the network object is a web view controller */
const WEB_VIEW_CONTROLLER_LABEL = 'webViewController';

/** Gets the id for the web view controller network object with the given name */
const getWebViewControllerObjectId = (webViewId: string) =>
  `${WEB_VIEW_CONTROLLER_LABEL}${webViewId}`;

/** Network object type for web view controllers */
const WEB_VIEW_CONTROLLER_OBJECT_TYPE = 'webViewController';

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
    webViewControllersById.delete(webView.id);
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
function hasKnownWebViewController(webViewId: string): boolean {
  return (
    networkObjectService.hasKnown(getWebViewControllerObjectId(webViewId)) ||
    webViewControllersById.has(webViewId)
  );
}

/**
 * Register a web view controller to represent a web view. It is expected that a web view provider
 * calls this to register a web view controller for a web view that is being created.
 *
 * A Web View Controller is a network object that represents a web view and whose methods facilitate
 * communication between its associated web view and extensions that want to interact with it.
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
  webViewId: string,
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

  if (webViewControllersById.has(webViewId))
    logger.warn(
      `Web view provider service is setting web view controller with id ${webViewId} (type ${webViewType}) in the map over an existing web view. This is not expected.`,
    );
  webViewControllersById.set(webViewId, disposableWebViewController);

  return disposableWebViewController;
}

/**
 * Get an existing web view controller for an open web view.
 *
 * A Web View Controller is a network object that represents a web view and whose methods facilitate
 * communication between its associated web view and extensions that want to interact with it.
 *
 * @param webViewType Type of webview controller you expect to get. If the web view controller's
 *   `webViewType` does not match this, an error will be thrown
 * @param webViewId Id of web view for which to get the corresponding web view controller if one
 *   exists
 * @returns Web view controller with the given name if one exists, undefined otherwise
 */
async function getWebViewController<WebViewType extends WebViewControllerTypes>(
  webViewType: WebViewType,
  webViewId: string,
): Promise<NetworkObject<WebViewControllers[WebViewType]> | undefined> {
  await initialize();

  // Get the object id for this web view Controller name
  const webViewControllerObjectId = getWebViewControllerObjectId(webViewType);

  const webViewControllerDetails = await networkObjectStatusService.waitForNetworkObject(
    { id: webViewControllerObjectId },
    // Wait up to 20 seconds for the web view Controller to appear
    20000,
  );

  if (
    !webViewControllerDetails.attributes ||
    webViewControllerDetails.attributes.webViewType !== webViewType
  )
    throw new Error(
      `Found web view controller with network object id ${webViewControllerObjectId} for web view id ${webViewId}, but its type was not what was expected! Expected: ${webViewType}; received ${webViewControllerDetails.attributes?.webViewType}`,
    );

  const webViewController =
    await networkObjectService.get<WebViewControllers[WebViewType]>(webViewControllerObjectId);

  if (!webViewController) {
    logger.info(`No WebView Controller found for WebView id ${webViewId} (type ${webViewType})`);
    return undefined;
  }

  return webViewController;
}

// Declare interfaces for the objects we're exporting so that JSDoc comments propagate
export interface WebViewProviderService {
  initialize: typeof initialize;
  hasKnown: typeof hasKnownWebViewProvider;
  register: typeof register;
  get: typeof get;
  registerWebViewController: typeof registerWebViewController;
  getWebViewController: typeof getWebViewController;
}

export interface PapiWebViewProviderService {
  register: typeof register;
  registerWebViewController: typeof registerWebViewController;
  getWebViewController: typeof getWebViewController;
}

const webViewProviderService: WebViewProviderService = {
  initialize,
  hasKnown: hasKnownWebViewProvider,
  register,
  get,
  registerWebViewController,
  getWebViewController,
};

/**
 * JSDOC SOURCE papiWebViewProviderService
 *
 * Interface for registering webView providers
 */
export const papiWebViewProviderService: PapiWebViewProviderService = {
  register,
  registerWebViewController,
  getWebViewController,
};

export default webViewProviderService;
