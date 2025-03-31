import { appServiceNetworkObjectName, IAppService } from '@shared/services/app.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';

let networkObject: IAppService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localAppService = await networkObjectService.get<IAppService>(
            appServiceNetworkObjectName,
          );
          if (!localAppService)
            throw new Error(`${appServiceNetworkObjectName} is not available as a network object`);
          networkObject = localAppService;
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

/**
 * JSDOC SOURCE appService
 *
 * Provides information about this app like name and version.
 */
export const appService = createSyncProxyForAsyncObject<IAppService>(async () => {
  await initialize();
  return networkObject;
});
