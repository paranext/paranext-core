/**
 * Props every first-run wizard step receives from the shell. By default, the shell owns the footer
 * buttons and step navigation; a step renders only its body and, if it needs to gate progress,
 * calls `setCanProceed(false)`. A step that wants to offer a Skip path calls `setCanSkip(true)` to
 * surface the shell's Skip button. Sibling step components implement real steps by swapping entries
 * in the shell's `stepComponents` map.
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
   * Report whether the shell's Next button should be enabled. Next defaults to enabled. Pass
   * `false` to disable Next temporarily (e.g. while validating), or `undefined` to suppress it
   * entirely for steps that own their own primary action.
   */
  setCanProceed?: (canProceed: boolean | undefined) => void;
  /**
   * Declare whether the shell's Skip button should be shown. Skip is hidden by default; call
   * `setCanSkip(true)` on mount to show it (e.g. on the Sync consent step). The shell resets this
   * to `false` on every step transition.
   */
  setCanSkip?: (canSkip: boolean) => void;
}
