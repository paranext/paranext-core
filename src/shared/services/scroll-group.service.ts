import { getNetworkEvent } from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  IScrollGroupService,
} from '@shared/services/scroll-group.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { networkObjectService } from '@shared/services/network-object.service';

const onDidUpdateScrRef = getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_SCR_REF);
const onDidChangeReferenceHistory = getNetworkEvent(EVENT_NAME_ON_DID_CHANGE_REFERENCE_HISTORY);

let networkObject: IScrollGroupService | undefined;

/**
 * Cached resolution of the scroll group network object, re-armed when that object goes away.
 *
 * Exactly one renderer publishes the object (see `scroll-group.service-host.ts`), and when that
 * window closes another window takes the name over. Without re-arming, every consumer here — the
 * extension host's `papi.scrollGroups`, the main process, and every surviving renderer — would keep
 * the proxy from the closed window, which by then has been revoked, and every call would throw for
 * the rest of the session.
 *
 * A closing window drops its RPC connection without disposing anything, so the disposal this relies
 * on is the one the process owning the connections announces for the objects that window was
 * hosting, once its registrations are gone. That reaches every process, which is what keeps this
 * re-arm alive in the main and extension host processes as well as the renderers.
 */
let initialize = createCachedInitializer(initializeScrollGroupService);

async function initializeScrollGroupService(): Promise<void> {
  await networkObjectStatusService.waitForNetworkObject(
    { id: NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE },
    // Wait 30 seconds for the scroll group service to appear
    30000,
  );

  const scrollGroupNetworkObject = await networkObjectService.get<IScrollGroupService>(
    NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  );
  if (!scrollGroupNetworkObject)
    throw new Error(
      `${NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE} is not available as a network object`,
    );
  networkObject = scrollGroupNetworkObject;
  scrollGroupNetworkObject.onDidDispose(() => {
    networkObject = undefined;
    initialize = createCachedInitializer(initializeScrollGroupService);
  });
}

/**
 * JSDOC SOURCE scrollGroupService
 *
 * Provides functions related to scroll groups and Scripture references at those scroll groups
 */
export const scrollGroupService = createSyncProxyForAsyncObject<IScrollGroupService>(
  async () => {
    await initialize();
    if (!networkObject)
      throw new Error(
        `${NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE} is not available as a network object`,
      );
    return networkObject;
  },
  {
    onDidUpdateScrRef,
    onDidChangeReferenceHistory,
  },
);

export default scrollGroupService;
