/**
 * Handles registering web view providers and serving web views around the papi.
 * Exposed on the papi.
 */

import { WebViewContents } from '@shared/data/web-view.model';
import networkObjectService from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';

/** Suffix on network objects that indicates that the network object is a data provider */
const WEB_VIEW_PROVIDER_LABEL = 'webView';

/** Gets the id for the web view network object with the given name */
const getWebViewProviderObjectId = (providerName: string) =>
  `${providerName}-${WEB_VIEW_PROVIDER_LABEL}`;

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
function hasKnown(providerName: string): boolean {
  return networkObjectService.hasKnown(getWebViewProviderObjectId(providerName));
}

export type WebViewProvider = {
  deserialize(serializedWebView: Omit<WebViewContents, 'content'>): Promise<WebViewContents>;
};

async function register(providerName: string, webViewProvider: WebViewProvider) {
  await initialize();
}

const webViewProviderService = {
  initialize,
  hasKnown,
};

export default webViewProviderService;
