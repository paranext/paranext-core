import * as networkService from '@shared/services/network.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import { dataProviderService } from '@shared/services/data-provider.service';
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
          // Inject the network timeout into every JS process once the settings service is available
          // We can't pull from within the network service as it would create a dependency loop
          dataProvider.subscribe('platform.requestTimeout', (newTimeout: number) =>
            networkService.setRequestTimeout(newTimeout),
          );
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

export const settingsService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default settingsService;
