import dataProviderService from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  MenuStoreServiceType,
  menuStoreServiceObjectToProxy,
  menuStoreServiceProviderName,
} from '@shared/services/menu-data.service-model';

let dataProvider: MenuStoreServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(menuStoreServiceProviderName);
          if (!provider) throw new Error('Menu data service undefined');
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

/**
 * JSDOC SOURCE menuStoreService
 *
 * Service that allows to get and store menu data
 */
const menuDataService = createSyncProxyForAsyncObject<MenuStoreServiceType>(async () => {
  await initialize();
  return dataProvider;
}, menuStoreServiceObjectToProxy);

export default menuDataService;
