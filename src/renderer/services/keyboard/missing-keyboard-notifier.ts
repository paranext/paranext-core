// === NEW IN PT10 === (keyboard-switching CAP-012)
// Reason: PT9 fell back to the system default SILENTLY when a configured keyboard was missing
// (ParatextBase/Keyboarding/KeyboardHelper.cs:220-232 — VAL-B-04). PT10 adds a user-visible,
// once-per-session-per-missing-id notification (FN-010 / VAL-B-05 / INV-C09; data-contracts §5.3;
// phase-2-decisions R-4 id-only suppression key) routed through `papi.notifications.send` with
// `notificationId: 'keyboardSwitching:missingKeyboard:{kid}'`.
// Maps to: CAP-012

import type { KeyboardId } from '@shared/services/keyboard.service-model';
import { notificationService } from '@shared/services/notification.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Once-per-session dedup gate for the missing-keyboard notification (VAL-B-05 / INV-C09).
 *
 * Instantiated by the keyboard service host (CAP-015) at startup — instance lifetime IS the app
 * session, so the in-memory suppression state naturally "resets on app restart" (data-contracts
 * §5.3 FN-010 properties). Called by the focus router (CAP-014) whenever a configured keyboard is
 * missing from the OS-enumerated list at activation time; the silent fallback to the system default
 * is the CALLER's job and continues on every focus event — only the notification is throttled
 * here.
 */
export class MissingKeyboardNotifier {
  /**
   * Suppression cache (VAL-B-05 / INV-C09): keyboard ids already notified this session. Keyed by
   * the missing keyboard id ALONE (phase-2-decisions R-4) — surface type and project never widen
   * it. Instance state, so a fresh notifier (new app session) starts with an empty cache.
   */
  private readonly notifiedKeyboardIds = new Set<KeyboardId>();

  /**
   * Surface the missing-keyboard notification for `missingKeyboardId`, at most once per id per
   * session. Fire-and-forget: never throws; send failures are logged.
   *
   * @param missingKeyboardId The configured keyboard id that is no longer installed. The
   *   suppression key is this id ALONE (INV-C09 / R-4 — surface type and project do not widen it).
   * @param projectShortName Short name of the project whose configuration referenced the missing
   *   keyboard. Currently NOT interpolated into the message (bare-localize-key send per CAP-010
   *   decision I-2 / BA-RF-007); accepted so the future interpolation path needs no caller change.
   */
  notify(missingKeyboardId: KeyboardId, projectShortName?: string): void {
    if (this.notifiedKeyboardIds.has(missingKeyboardId)) return;
    // Add BEFORE the async send settles so re-entrant detections during an in-flight send stay
    // suppressed. A FAILED send also stays suppressed — deliberately unpinned (plan D6), minimal.
    this.notifiedKeyboardIds.add(missingKeyboardId);

    notificationService
      .send({
        // Bare localize key — the platform localizes at render time; projectShortName is NOT
        // interpolated (CAP-010 decision I-2 / BA-RF-007; English default is parameter-free)
        message: '%keyboardSwitching_missingKeyboardFallback%',
        severity: 'warning',
        // Defense-in-depth dedup: if a duplicate ever slips through, the platform REPLACES the
        // live toast for the same id instead of stacking (backend-alignment §Events scheme)
        notificationId: `keyboardSwitching:missingKeyboard:${missingKeyboardId}`,
      })
      .catch((error) => {
        // Fire-and-forget must not leak a rejection, but errors are not invisible
        // (data-contracts §3.4) — projectShortName is surfaced here as log context only
        logger.error(
          `MissingKeyboardNotifier failed to send the missing-keyboard notification for keyboard '${missingKeyboardId}' (project '${projectShortName ?? '<unknown>'}'): ${getErrorMessage(error)}`,
        );
      });
  }
}
