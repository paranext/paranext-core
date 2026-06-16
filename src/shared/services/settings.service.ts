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
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: ISettingsService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(settingsServiceDataProviderName);
  if (!provider) throw new Error('Settings service undefined');
  dataProvider = provider;
  // Inject the network timeout into every JS process once the settings service is available.
  // We can't pull from within the network service as it would create a dependency loop.
  // Fire-and-forget: subscribing is a side effect, not part of providing the service, so a failure
  // here is logged rather than failing (and retrying) the whole settings-service initialization.
  dataProvider
    .subscribe('platform.requestTimeout', (newTimeout: number | PlatformError) => {
      if (isPlatformError(newTimeout)) {
        logger.warn(
          `Settings service error while retrieving value for setting platform.requestTimeout: ${newTimeout}`,
        );
        return;
      }
      // The request timeout is in seconds. Keep it between 0 (disabled) and 1 day
      if (typeof newTimeout !== 'number' || newTimeout < 0 || newTimeout > 60 * 60 * 24) {
        logger.warn(`Attempt to set an invalid value for platform.requestTimeout: ${newTimeout}.`);
        return;
      }
      networkService.setRequestTimeout(newTimeout);
    })
    .catch((error) => logger.warn(`Failed to subscribe to platform.requestTimeout: ${error}`));
});

export const settingsService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default settingsService;
