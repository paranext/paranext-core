import * as networkService from '@shared/services/network.service';
import {
  createSyncProxyForAsyncObject,
  isPlatformError,
  PlatformError,
} from 'platform-bible-utils';
import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import {
  ISettingsService,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from '@shared/services/settings.service-model';

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
          dataProvider.subscribe(
            'platform.requestTimeout',
            (newTimeout: number | PlatformError) => {
              if (isPlatformError(newTimeout)) {
                logger.warn(
                  `Settings service error while retrieving value for setting platform.requestTimeout: ${newTimeout}`,
                );
                return;
              }
              // The request timeout is in seconds. Keep it between 0 (disabled) and 1 day
              if (typeof newTimeout !== 'number' || newTimeout < 0 || newTimeout > 60 * 60 * 24) {
                logger.warn(
                  `Attempt to set an invalid value for platform.requestTimeout: ${newTimeout}.`,
                );
                return;
              }
              networkService.setRequestTimeout(newTimeout);
            },
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
