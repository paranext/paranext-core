// === NEW IN PT10 === (keyboard-switching CAP-012)
// Reason: PT9 fell back to the system default SILENTLY when a configured keyboard was missing
// (ParatextBase/Keyboarding/KeyboardHelper.cs:220-232 — VAL-B-04). PT10 adds a user-visible,
// once-per-session-per-missing-id notification (FN-010 / VAL-B-05 / INV-C09; data-contracts §5.3;
// phase-2-decisions R-4 id-only suppression key) routed through `papi.notifications.send` with
// `notificationId: 'keyboardSwitching:missingKeyboard:{kid}'`.
// Maps to: CAP-012

import type { KeyboardId } from '@shared/services/keyboard.service-model';

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
   * Surface the missing-keyboard notification for `missingKeyboardId`, at most once per id per
   * session. Fire-and-forget: never throws; send failures are logged.
   *
   * @param missingKeyboardId The configured keyboard id that is no longer installed. The
   *   suppression key is this id ALONE (INV-C09 / R-4 — surface type and project do not widen it).
   * @param projectShortName Short name of the project whose configuration referenced the missing
   *   keyboard. Currently NOT interpolated into the message (bare-localize-key send per CAP-010
   *   decision I-2 / BA-RF-007); accepted so the future interpolation path needs no caller change.
   */
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- RED stub (CAP-012); implementation will use instance suppression state
  notify(missingKeyboardId: KeyboardId, projectShortName?: string): void {
    throw new Error(
      `Not implemented (CAP-012 RED stub): notify(${missingKeyboardId}, ${projectShortName})`,
    );
  }
}
