import { PapiEvent } from '@shared/models/papi-event.model';
import { GetWebViewOptions, WebViewType } from '@shared/models/web-view.model';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { AddWebViewEvent, Layout } from '@shared/models/docking-framework.model';
import networkObjectService from '@shared/services/network-object.service';
import { wait } from '@shared/utils/util';
import logger from '@shared/services/logger.service';

const onDidAddWebView: PapiEvent<AddWebViewEvent> = getNetworkEvent<AddWebViewEvent>(
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
);

let networkObject: WebViewServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          // Normally automatic retrying within the network object service is sufficient
          // However, in this case we know webViewService is being requested before it is registered
          // Give it some extra time to be registered by the renderer
          let localWebViewService: WebViewServiceType | undefined;
          const maxAttempts: number = 3;
          for (let attemptsRemaining = maxAttempts; attemptsRemaining > 0; attemptsRemaining--) {
            // eslint-disable-next-line no-await-in-loop
            localWebViewService = await networkObjectService.get<WebViewServiceType>(
              NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
            );
            if (localWebViewService) break;

            // eslint-disable-next-line no-await-in-loop
            await wait(1000);

            logger.debug(`Retrying to get the web view service`);
          }

          if (!localWebViewService)
            throw new Error(
              `${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE} is not available as a network object`,
            );
          networkObject = localWebViewService;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

const webViewService: WebViewServiceType = {
  getWebView: async (
    webViewType: WebViewType,
    layout: Layout | undefined,
    options: GetWebViewOptions,
  ) => {
    await initialize();
    return networkObject.getWebView(webViewType, layout, options);
  },
  onDidAddWebView,
};

export default webViewService;
