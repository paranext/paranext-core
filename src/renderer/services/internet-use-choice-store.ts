import { sendCommand } from '@shared/services/command.service';
import {
  dataProviderService,
  getDataProviderObjectId,
} from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { settingsService } from '@shared/services/settings.service';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';

/**
 * Whether the user has picked an internet-use option in the first-run wizard, and had it saved,
 * since the app started.
 *
 * The wizard's Internet & connectivity step asks for an explicit choice rather than accepting the
 * stored value, because nobody may have chosen it: ParatextData saves "Disable access to some Bible
 * translation services" on first startup when no setting exists, and an upgrade from Paratext 9
 * carries over whatever that app had, often its own unchosen default. That option turns off sync
 * and the Digital Bible Library, so accepting it silently would turn them off for a user who never
 * asked for that.
 *
 * Kept outside the step so the choice survives the wizard shell unmounting the step on Back and
 * Next. It lasts for the renderer's lifetime: the identify step's restart clears it, but the wizard
 * resumes after that restart past the internet step, so the user is asked again only if startup
 * sends the whole wizard back to its first step.
 */
let hasSavedChoice = false;

// Guards askForInternetUseChoiceIfNeeded so it runs at most once per startup, even if first-run
// resolution is re-entered.
let hasStartedAskingForChoice = false;

const INTERNET_SETTINGS_DATA_PROVIDER = 'paratextRegistration.internetSettingsDataProvider';

/**
 * How long Power-mode startup waits for the C# internet settings provider before giving up on
 * asking this launch. Matches the extension host's wait for the same provider (analytics.service).
 */
const INTERNET_SETTINGS_PROVIDER_TIMEOUT_MS = 30_000;

/** Whether an internet-use choice has been saved this session. See the module comment. */
export function hasSavedInternetUseChoice(): boolean {
  return hasSavedChoice;
}

function persistInternetUseChoiceAsked(): void {
  settingsService.set('platform.internetUseChoiceAsked', true).catch((e) => {
    logger.warn(`Could not save platform.internetUseChoiceAsked: ${getErrorMessage(e)}`);
  });
}

/**
 * Records that the user's internet-use choice was saved: for this session (see the module comment)
 * and durably, so a later switch to Power mode does not ask again (see
 * {@link askForInternetUseChoiceIfNeeded}).
 */
export function markInternetUseChoiceSaved(): void {
  hasSavedChoice = true;
  persistInternetUseChoiceAsked();
}

/**
 * Asks a Power-mode user for an internet-use choice, once, by opening the Internet & connectivity
 * settings. Power mode never shows the first-run wizard, so without this its users keep whatever
 * value ParatextData saved or Paratext 9 carried over (see the module comment), and sync and the
 * Digital Bible Library stay off without their having chosen it.
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
 * Forgets the recorded choice and lets {@link askForInternetUseChoiceIfNeeded} run again.
 *
 * WARNING: Test-only (tests and stories). @internal
 */
export function resetInternetUseChoiceForTesting(): void {
  hasSavedChoice = false;
  hasStartedAskingForChoice = false;
}
