/**
 * Props every first-run wizard step receives from the shell. The shell owns the footer (Back / Skip
 * / Next), derives the Next busy spinner from the `onNext` promise, and surfaces a rejected
 * `onNext` as an inline error. A step renders only its body and, if it needs to gate progress,
 * calls `setCanProceed(false)`. Sibling tickets (PT-4176/77/78/79) implement real steps against
 * this contract by swapping entries in the shell's `stepComponents` map.
 */
export interface FirstRunStepProps {
  /** Advance to the next step (or finish, on the last step). May do async work; the shell awaits it. */
  onNext: () => void | Promise<void>;
  /** Return to the previous step. Absent on the first step (Language). */
  onBack?: () => void;
  /** Skip the rest of setup and finish. Present only on Sync consent. */
  onSkip?: () => void;
  /** Report whether the shell's Next button should be enabled. Next defaults to enabled. */
  setCanProceed?: (canProceed: boolean) => void;
}
