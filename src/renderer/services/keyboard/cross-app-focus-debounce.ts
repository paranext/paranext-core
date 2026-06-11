// === NEW IN PT10 === (keyboard-switching CAP-011)
// Reason: PT9's FB-27866 cross-app keyboard debounce (ParatextBase/ProjectComments/
// CommentEditorForm.cs:92-99, 979-986 — EXT-150 / BHV-350: skip ActivateKeyboard iff the resolved
// keyboard equals BOTH the static LastActiveKeyboard AND the per-surface memo) is redesigned as an
// explicit PT10 UX requirement (FN-015; data-contracts §4.6 item 4): when the user returns to PT10
// from another OS app, the platform must NOT stomp a user-initiated OS keyboard change made while
// PT10 was blurred. Decision-only module — CAP-014 FocusKeyboardRouter owns the `papi.window`
// AppFocus / `CurrentOsKeyboard` subscriptions and forwards observations in; no timestamps are
// exposed publicly (backend-alignment Utility Mapping Summary).
// Maps to: CAP-011

import { KeyboardId } from '@shared/services/keyboard.service-model';

/**
 * FB-27866 cross-app return guard (CAP-011; FN-015 / data-contracts §4.6 item 4).
 *
 * Tracks the keyboard PT10 last activated and observes app-level focus transitions (`isAppFocused:
 * false → true` = cross-app return) to decide whether the next focus-driven keyboard activation
 * should be GATED — i.e. skipped so that an OS keyboard the user chose while PT10 was blurred is
 * preserved.
 *
 * Pure synchronous decision unit: zero subscriptions, zero timers, zero PAPI dependencies. CAP-014
 * `FocusKeyboardRouter` wires the actual `papi.window` AppFocus / `CurrentOsKeyboard` subscriptions
 * and forwards observations into this module.
 */
export class CrossAppFocusDebounce {
  /**
   * Records a keyboard activation PT10 itself performed (the comparison baseline — "what the
   * platform last set" per data-contracts §4.6 item 4). CAP-014 calls this after every successful
   * focus-driven or imperative activation; VAL-B-04 no-op activations are never recorded.
   */
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- RED stub (CAP-011); implementation will use instance baseline/gate state
  recordActivation(keyboardId: KeyboardId): void {
    throw new Error(`Not implemented (CAP-011 RED stub): recordActivation(${keyboardId})`);
  }

  /**
   * Observes an `AppFocus` subject emission forwarded by CAP-014, with the current OS keyboard id
   * sampled at that moment. `currentOsKeyboardId === undefined` means the OS keyboard query failed
   * or timed out during the transition window.
   */
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- RED stub (CAP-011); implementation will use instance baseline/gate state
  observeAppFocus(isAppFocused: boolean, currentOsKeyboardId?: KeyboardId): void {
    throw new Error(
      `Not implemented (CAP-011 RED stub): observeAppFocus(${isAppFocused}, ${currentOsKeyboardId})`,
    );
  }

  /**
   * Decides whether the next focus-driven keyboard activation should be gated (skipped). CAP-014
   * consults this exactly ONCE per activation attempt; a `true` answer is consumed by the query —
   * the gate protects only the next activate after a cross-app return.
   *
   * @returns `true` when the activation must be skipped to preserve a user-initiated OS keyboard
   *   change made while PT10 was blurred; `false` when activation should proceed normally.
   */
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this -- RED stub (CAP-011); implementation will use instance baseline/gate state
  shouldGateNextActivation(): boolean {
    throw new Error('Not implemented (CAP-011 RED stub)');
  }
}
