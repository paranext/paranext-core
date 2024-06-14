import { PlatformEvent, createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_ADD_WEB_VIEW,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { AddWebViewEvent } from '@shared/models/docking-framework.model';
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
            { id: NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE },
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

const webViewService = createSyncProxyForAsyncObject<WebViewServiceType>(
  async () => {
    await initialize();
    return networkObject;
  },
  {
    onDidAddWebView,
  },
);

export default webViewService;
