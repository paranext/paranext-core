import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
  getWebViewController,
} from '@shared/services/web-view.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

const onDidOpenWebView = getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);

const onDidUpdateWebView = getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);

const onDidCloseWebView = getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

let networkObject: WebViewServiceType;
const initialize = createCachedInitializer(async () => {
  await networkObjectStatusService.waitForNetworkObject(
    { id: NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE },
    // Wait 30 seconds for the web view service to appear
    30000,
  );

  const localWebViewService = await networkObjectService.get<WebViewServiceType>(
    NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  );
  if (!localWebViewService)
    throw new Error(`${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE} is not available as a network object`);
  networkObject = localWebViewService;
});

export const webViewService = createSyncProxyForAsyncObject<WebViewServiceType>(
  async () => {
    await initialize();
    return networkObject;
  },
  {
    onDidAddWebView: onDidOpenWebView,
    onDidOpenWebView,
    onDidUpdateWebView,
    onDidCloseWebView,
    getWebViewController,
  },
);

export default webViewService;
