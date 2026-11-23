import { sendCommand } from '@shared/services/command.service';
import {
  dataProviderService,
  getDataProviderObjectId,
} from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { settingsService } from '@shared/services/settings.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';

/*
 * Records whether the user has been asked how Paratext accesses the internet, so the question is
 * asked once. Nobody may have chosen the saved value: ParatextData saves `VpnRequired` ("Block
 * internet when in sensitive locations") when no setting exists, which the C# startup migration
 * (`InternetSettingsDataProvider.MigrateVpnRequiredToDisabled`) replaces with `Disabled`, and an
 * upgrade from Paratext 9 carries over whatever that app had, often its own unchosen default.
 * `Disabled` turns off sync and the Digital Bible Library, so accepting it silently would turn them
 * off for a user who never asked for that. The first-run wizard asks every user; Power mode, which
 * never shows the wizard, asks through {@link askForInternetUseChoiceIfNeeded}.
 */

// Guards askForInternetUseChoiceIfNeeded so it runs at most once per startup, even if first-run
// resolution is re-entered.
let hasStartedAskingForChoice = false;

const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

/**
 * How long Power-mode startup waits for the C# internet settings provider before giving up on
 * asking this launch. Matches the extension host's wait for the same provider (analytics.service).
 */
const INTERNET_SETTINGS_PROVIDER_TIMEOUT_MS = 30_000;

function persistInternetUseChoiceAsked(): void {
  settingsService.set('platform.internetUseChoiceAsked', true).catch((e) => {
    logger.warn(`Could not save platform.internetUseChoiceAsked: ${getErrorMessage(e)}`);
  });
}

/**
 * Records durably that the user's internet-use choice was saved in the first-run wizard, so a later
 * switch to Power mode does not ask again (see {@link askForInternetUseChoiceIfNeeded}).
 */
export function markInternetUseChoiceSaved(): void {
  persistInternetUseChoiceAsked();
}

/**
 * Asks a Power-mode user for an internet-use choice, once, by opening the Internet & connectivity
 * settings. Power mode never shows the first-run wizard, so without this its users keep whatever
 * value ParatextData saved or Paratext 9 carried over (see the comment at the top), and sync and
 * the Digital Bible Library stay off without their having chosen it.
 *
 * Asks only when the saved value is one that turns those services off — the same values
 * `InternetServicesGate` blocks on. Either way it records that the question is settled, so it never
 * asks again; a choice saved in the wizard records the same. If the provider cannot be read or the
 * settings cannot be opened, nothing is recorded and the next launch tries again.
 */
export async function askForInternetUseChoiceIfNeeded(): Promise<void> {
  if (hasStartedAskingForChoice) return;
  hasStartedAskingForChoice = true;
  try {
    const wasAsked = await settingsService.get('platform.internetUseChoiceAsked');
    if (!isPlatformError(wasAsked) && wasAsked === true) return;

    await networkObjectStatusService.waitForNetworkObject(
      { id: getDataProviderObjectId(INTERNET_SETTINGS_DATA_PROVIDER) },
      INTERNET_SETTINGS_PROVIDER_TIMEOUT_MS,
    );
    const provider = await dataProviderService.get(INTERNET_SETTINGS_DATA_PROVIDER);
    if (!provider) {
      logger.warn('Internet settings provider is unavailable; not asking for an internet choice.');
      return;
    }
    const { permittedInternetUse } = await provider.getInternetSettings(undefined);
    if (permittedInternetUse === 'VpnRequired' || permittedInternetUse === 'Disabled')
      await sendCommand('paratextRegistration.showInternetSettings');
    persistInternetUseChoiceAsked();
  } catch (e) {
    logger.warn(`Could not ask for an internet-use choice: ${getErrorMessage(e)}`);
  }
}

/**
 * Lets {@link askForInternetUseChoiceIfNeeded} run again.
 *
 * WARNING: Test-only (tests and stories). @internal
 */
export function resetInternetUseChoiceForTesting(): void {
  hasStartedAskingForChoice = false;
}
