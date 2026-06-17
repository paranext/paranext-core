import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  IScrollGroupService,
} from '@shared/services/scroll-group.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { networkObjectService } from '@shared/services/network-object.service';

const onDidUpdateScrRef = getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF);

let networkObject: IScrollGroupService;
const initialize = createCachedInitializer(async () => {
  await networkObjectStatusService.waitForNetworkObject(
    { id: NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE },
    // Wait 30 seconds for the scroll group service to appear
    30000,
  );

  const localWebViewService = await networkObjectService.get<IScrollGroupService>(
    NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  );
  if (!localWebViewService)
    throw new Error(
      `${NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE} is not available as a network object`,
    );
  networkObject = localWebViewService;
});

/**
 * JSDOC SOURCE scrollGroupService
 *
 * Provides functions related to scroll groups and Scripture references at those scroll groups
 */
export const scrollGroupService = createSyncProxyForAsyncObject<IScrollGroupService>(
  async () => {
    await initialize();
    return networkObject;
  },
  {
    onDidUpdateScrRef,
  },
);

export default scrollGroupService;
