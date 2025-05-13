import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { dataProviderService } from '@shared/services/data-provider.service';
import {
  IDatabaseService,
  databaseServiceObjectToProxy,
  databaseServiceProviderName,
} from '@shared/services/database.service-model';

let dataProvider: IDatabaseService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(databaseServiceProviderName);
          if (!provider) throw new Error('Database service undefined');
          dataProvider = provider;
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
  return dataProvider;
}, databaseServiceObjectToProxy);

export default databaseService;
