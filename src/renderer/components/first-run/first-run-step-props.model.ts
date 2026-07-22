/**
 * Props every first-run wizard step receives from the shell. The shell owns the footer buttons and
 * step navigation; a step renders only its body and, if it needs to gate progress, calls
 * `setCanProceed(false)`. Sibling step components implement real steps by swapping entries in the
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
  /** Report whether the shell's Next button should be enabled. Next defaults to enabled. */
  setCanProceed?: (canProceed: boolean) => void;
}
