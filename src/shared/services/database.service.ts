import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { networkObjectService } from '@shared/services/network-object.service';
import {
  IDatabaseService,
  databaseServiceObjectToProxy,
  databaseServiceNetworkObjectName,
} from '@shared/services/database.service-model';

let networkObject: IDatabaseService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localDatabaseService = await networkObjectService.get<IDatabaseService>(
            databaseServiceNetworkObjectName,
          );
          if (!localDatabaseService)
            throw new Error(
              `${databaseServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localDatabaseService;
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

export const databaseService = createSyncProxyForAsyncObject<IDatabaseService>(async () => {
  await initialize();
  return networkObject;
}, databaseServiceObjectToProxy);

export default databaseService;
