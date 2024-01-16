import { PlatformEvent } from 'platform-bible-utils';
import { GetWebViewOptions, WebViewType } from '@shared/models/web-view.model';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { AddWebViewEvent, Layout } from '@shared/models/docking-framework.model';
import networkObjectService from '@shared/services/network-object.service';
import networkObjectStatusService from './network-object-status.service';

const onDidAddWebView: PlatformEvent<AddWebViewEvent> = getNetworkEvent<AddWebViewEvent>(
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
);

let networkObject: WebViewServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          await networkObjectStatusService.waitForNetworkObject(
            NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
            // Wait 30 seconds for the web view service to appear
            30000,
          );

          const localWebViewService = await networkObjectService.get<WebViewServiceType>(
            NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
          );
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
  getWebView: async (webViewType: WebViewType, layout?: Layout, options?: GetWebViewOptions) => {
    await initialize();
    return networkObject.getWebView(webViewType, layout, options);
  },
  onDidAddWebView,
};

export default webViewService;
