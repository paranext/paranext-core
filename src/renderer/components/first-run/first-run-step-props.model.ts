/**
 * Props every first-run wizard step receives from the shell. The shell owns the footer buttons and
 * step navigation; a step renders only its body. Navigation always resets `canProceed` to `false`
 * — a step that wants Next/Finish enabled immediately calls `setCanProceed(true)` in a mount
 * effect; a step that gates on async work calls `setCanProceed(true)` only when the precondition
 * is met. Sibling tickets (PT-4176/77/78/79) implement real steps by swapping entries in the
 * shell's `stepComponents` map.
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
  /** Skip the rest of setup and finish. Present only on Sync consent. */
  onSkip?: () => void;
  /**
   * Report whether the shell's Next button should be enabled. If not called, the shell's prior
   * state persists — which is disabled for any step reached via navigation (the shell resets to
   * disabled on every step change), and enabled only for the initial entry step.
   */
  setCanProceed?: (canProceed: boolean) => void;
}
