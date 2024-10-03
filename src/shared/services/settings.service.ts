import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import dataProviderService from './data-provider.service';
import {
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
          if (!provider) throw new Error('Settings service undefined');
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

const settingsService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default settingsService;
