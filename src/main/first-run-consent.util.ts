import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Whether the Simple-mode first-run wizard has run far enough for the user to have been asked about
 * automatic sync. Gates the automatic Simple-mode syncs (startup, shutdown, window close), so a
 * fresh user never syncs before consenting — the wizard's Identify step restarts the app, so
 * without this gate a project editor auto-opened behind the wizard overlay would be synced at that
 * restart.
 *
 * Anything but a literal `true` reads as not complete, an unreadable flag included: fail CLOSED,
 * because syncing without consent cannot be undone while a missed automatic sync is picked up at
 * the next session boundary.
 *
 * Simple mode ONLY, deliberately: `platform.firstRunComplete` is only ever written by the
 * Simple-mode wizard (`markFirstRunComplete` in `src/renderer/services/first-run-store.ts`), so in
 * Power mode it stays false forever — gating Power mode on it would permanently disable that mode's
 * scheduled session sync, and the setting is `isHidden`, so there is no UI to turn it back on.
 */
export async function isFirstRunComplete(): Promise<boolean> {
  try {
    return (await settingsService.get('platform.firstRunComplete')) === true;
  } catch (e) {
    // Says out loud that the gate stayed closed because the flag could not be read, rather than
    // because the user has not finished the wizard. Generic wording: every call site adds its own
    // skip line, which states only that consent is unconfirmed since it cannot tell the two apart.
    logger.warn(
      `Could not read platform.firstRunComplete; skipping the automatic sync: ${getErrorMessage(e)}`,
    );
    return false;
  }
}
