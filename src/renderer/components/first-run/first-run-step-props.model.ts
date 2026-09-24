/**
 * Props every first-run wizard step receives from the shell. The shell owns the footer buttons and
 * step navigation; a step renders only its body. Navigation always resets `canProceed` to `false` —
 * a step that wants Next/Finish enabled immediately calls `setCanProceed(true)` in a mount effect;
 * a step that gates on async work calls `setCanProceed(true)` only when the precondition is met. A
 * step that offers "Don't sync yet" calls `setCanDeclineSync(true)` to receive `onDeclineSync`.
 * Sibling step components implement real steps by swapping entries in the shell's `stepComponents`
 * map.
 */
export interface FirstRunStepProps {
  /**
   * Advance to the next step (or finish, on the last step). Not gated by `canProceed` —
   * `setCanProceed(false)` only disables the shell's footer Next button. A step that calls
   * `onNext()` itself is responsible for only doing so when it is valid to advance.
   */
  onNext: () => void;
  /** Return to the previous step. Absent on the first step (Language). */
  onBack?: () => void;
  /**
   * "Don't sync yet": withhold automatic sync for the rest of the app session, then finish the
   * wizard. Present when the current step has called `setCanDeclineSync(true)`.
   */
  onDeclineSync?: () => void;
  /**
   * Report whether the shell's Next button should be enabled. If not called, the shell's prior
   * state persists — which is disabled for any step reached via navigation (the shell resets to
   * disabled on every step change), and enabled only for the initial entry step. Pass `undefined`
   * to suppress the Next button entirely for steps that own their own primary action.
   */
  setCanProceed?: (canProceed: boolean | undefined) => void;
  /**
   * Offer (`true`) or withdraw (`false`) the "Don't sync yet" decline, supplied as `onDeclineSync`.
   * Call with `true` on mount to offer it; call with `false` if declining is no longer valid (e.g.
   * after a sync starts). Only a step that asks about sync should call this: `onDeclineSync` defers
   * automatic sync for the session.
   */
  setCanDeclineSync?: (canDeclineSync: boolean) => void;
  /**
   * Call with `true` on mount when this step renders its own complete footer row (Back / secondary
   * / primary, e.g. via `WizardStepForm`) rather than using the shell's footer. The shell then
   * renders no footer of its own, so the two do not stack. `onBack`/`onDeclineSync` are still
   * supplied — the step decides where to place them in its own row. Steps that use the shell's
   * Next/Finish button leave this unset. When set, `canProceed` is ignored (it only gates the
   * shell's own Next button).
   */
  setManagesOwnFooter?: (managesOwnFooter: boolean) => void;
  /**
   * Whether the shell is running an async action, such as finishing the wizard. A step that renders
   * its own footer disables the shell-supplied actions (`onBack`, `onDeclineSync`) while this is
   * `true`, as the shell's own footer does.
   */
  isBusy?: boolean;
  /**
   * Re-register mode: set only when the wizard was raised by the background registration re-check
   * for an already-onboarded user (not fresh onboarding). Steps use it to surface re-register-only
   * affordances — the Identify step shows a "Continue without registration" escape hatch and a
   * "Don't show this on startup again" suppression checkbox. Unset/false in normal first-run.
   */
  allowContinueWithoutRegistration?: boolean;
}
