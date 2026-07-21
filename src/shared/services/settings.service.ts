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
import { setLoggerDisplayName, setLoggerPrivacyMode } from '@shared/utils/logger.utils';
import { sendCommand } from '@shared/services/command.service';

let dataProvider: ISettingsService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(settingsServiceDataProviderName);
  if (!provider) throw new Error('Settings service undefined');
  dataProvider = provider;
  // Inject the network timeout into every JS process once the settings service is available.
  // We can't pull from within the network service as it would create a dependency loop.
  // Fire-and-forget: subscribing is a side effect, not part of providing the service, so a failure
  // here is logged rather than rejecting the whole settings-service initialization (which
  // createCachedInitializer would then retry).
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
  // Keep the logger's privacy-mode flag in sync with the setting in every process. The hook is
  // installed by setUpLogger() before any logs are written, so toggling this only changes future
  // log output — older log files are not retroactively rewritten.
  dataProvider
    .subscribe('platform.privacyMode', (newValue: boolean | PlatformError) => {
      if (isPlatformError(newValue)) {
        logger.warn(
          `Settings service error while retrieving value for setting platform.privacyMode: ${newValue}`,
        );
        return;
      }
      if (typeof newValue !== 'boolean') {
        logger.warn(`Attempt to set an invalid value for platform.privacyMode: ${newValue}.`);
        return;
      }
      setLoggerPrivacyMode(newValue);
    })
    .catch((error) => logger.warn(`Failed to subscribe to platform.privacyMode: ${error}`));
  // Fetch the Paratext registration display name and feed it (plus its URL-encoded variants) into
  // the logger anonymizer. The .NET process logs REST URLs containing `?username=<First>+<Last>`
  // and similar; without this they'd leak even with privacy mode on.
  //
  // The C# request handler isn't guaranteed to be registered when this initializer runs (the
  // dotnet child process boots in parallel with the JS host), so a one-shot fetch race-loses and
  // the name never makes it into the anonymizer. We retry on a short interval, stopping as soon
  // as we get a populated name. The interval is also our refresh mechanism if the user updates
  // their registration mid-session — the app restarts after a registration change anyway, so a
  // few extra polls before stopping is harmless.
  let displayNameAttempts = 0;
  const DISPLAY_NAME_MAX_ATTEMPTS = 30;
  const DISPLAY_NAME_RETRY_MS = 2000;
  const tryFetchDisplayName = (): void => {
    displayNameAttempts += 1;
    sendCommand('paratextRegistration.getParatextRegistrationData')
      .then((registrationData) => {
        if (registrationData?.name) {
          setLoggerDisplayName(registrationData.name);
          return true;
        }
        return false;
      })
      .catch(() => false)
      .then((gotName) => {
        if (!gotName && displayNameAttempts < DISPLAY_NAME_MAX_ATTEMPTS) {
          setTimeout(tryFetchDisplayName, DISPLAY_NAME_RETRY_MS);
        }
        return undefined;
      })
      .catch(() => {
        // Final swallow: scheduling the next retry must never reject the chain.
      });
  };
  tryFetchDisplayName();
});

export const settingsService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);

export default settingsService;
