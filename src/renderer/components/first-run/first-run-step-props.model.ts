/**
 * Props every first-run wizard step receives from the shell. The shell owns the footer buttons and
 * step navigation; a step renders only its body. Navigation always resets `canProceed` to `false`
 * — a step that wants Next/Finish enabled immediately calls `setCanProceed(true)` in a mount
 * effect; a step that gates on async work calls `setCanProceed(true)` only when the precondition
 * is met. A step that wants to offer a Skip path calls `setCanSkip(true)` to surface the shell's
 * Skip button. Sibling step components implement real steps by swapping entries in the shell's
 * `stepComponents` map.
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
   * Skip the rest of setup and finish. Present only when `setCanSkip(true)` has been called by the
   * current step.
   */
  onSkip?: () => void;
  /**
   * Report whether the shell's Next button should be enabled. If not called, the shell's prior
   * state persists — which is disabled for any step reached via navigation (the shell resets to
   * disabled on every step change), and enabled only for the initial entry step. Pass `undefined`
   * to suppress the Next button entirely for steps that own their own primary action.
   */
  setCanProceed?: (canProceed: boolean | undefined) => void;
  /**
   * Declare whether the shell's Skip button should be shown. Skip is hidden by default; call
   * `setCanSkip(true)` on mount to show it (e.g. on the Sync consent step). The shell resets this
   * to `false` on every step transition.
   */
  setCanSkip?: (canSkip: boolean) => void;
}
