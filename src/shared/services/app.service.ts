import { appServiceNetworkObjectName, IAppService } from '@shared/services/app.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { createCachedInitializer, createSyncProxyForAsyncObject } from 'platform-bible-utils';

let networkObject: IAppService;
const initialize = createCachedInitializer(async () => {
  const localAppService = await networkObjectService.get<IAppService>(appServiceNetworkObjectName);
  if (!localAppService)
    throw new Error(`${appServiceNetworkObjectName} is not available as a network object`);
  networkObject = localAppService;
});

/**
 * JSDOC SOURCE appService
 *
 * Provides information about this app like name and version.
 */
export const appService = createSyncProxyForAsyncObject<IAppService>(async () => {
  await initialize();
  return networkObject;
});
