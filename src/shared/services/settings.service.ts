import dataProviderService from './data-provider.service';
import {
  createSyncProxyForAsyncObject,
  ISettingsService,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from './settings.service-model';

let dataProvider: ISettingsService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const provider = await dataProviderService.get(settingsServiceDataProviderName);
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

const menuDataService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default menuDataService;
