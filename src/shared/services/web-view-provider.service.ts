/**
 * Handles registering web view providers and serving web views around the papi.
 * Exposed on the papi.
 */

import {
  DisposableWebViewProvider,
  IWebViewProvider,
  WebViewProvider,
} from '@shared/models/web-view-provider.model';
import networkObjectService from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import logger from '@shared/services/logger.service';

/** Suffix on network objects that indicates that the network object is a data provider */
const WEB_VIEW_PROVIDER_LABEL = 'webView';

/** Gets the id for the web view network object with the given name */
const getWebViewProviderObjectId = (webViewType: string) =>
  `${webViewType}-${WEB_VIEW_PROVIDER_LABEL}`;

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
 * Indicate if we are aware of an existing web view provider with the given name. If a web view
 * provider with the given name is somewhere else on the network, this function won't tell you about
 * it unless something else in the existing process is subscribed to it.
 */
function hasKnown(webViewType: string): boolean {
  return networkObjectService.hasKnown(getWebViewProviderObjectId(webViewType));
}

async function register(
  webViewType: string,
  webViewProvider: IWebViewProvider,
): Promise<DisposableWebViewProvider> {
  await initialize();

  if (hasKnown(webViewType))
    throw new Error(`WebView provider for WebView type ${webViewType} is already registered`);

  // Validate that the WebView provider has what it needs
  if (!webViewProvider.deserialize || typeof webViewProvider.deserialize !== 'function')
    throw new Error(`WebView provider does not have a deserialize function`);

  // We are good to go! Create the WebView provider

  // Get the object id for this web view provider name
  const webViewProviderObjectId = getWebViewProviderObjectId(webViewType);

  // Set up the WebView provider to be a network object so other processes can use it
  const disposableWebViewProvider = (await networkObjectService.set(
    webViewProviderObjectId,
    webViewProvider,
  )) as DisposableWebViewProvider;

  return disposableWebViewProvider;
}

async function get(webViewType: string): Promise<WebViewProvider | undefined> {
  await initialize();

  // Get the object id for this web view provider name
  const webViewProviderObjectId = getWebViewProviderObjectId(webViewType);

  const webViewProvider = await networkObjectService.get<WebViewProvider>(webViewProviderObjectId);

  if (!webViewProvider) {
    logger.info(`No WebView provider found for WebView type ${webViewType}`);
    return undefined;
  }

  return webViewProvider;
}

const webViewProviderService = {
  initialize,
  hasKnown,
  register,
  get,
};

export default webViewProviderService;
