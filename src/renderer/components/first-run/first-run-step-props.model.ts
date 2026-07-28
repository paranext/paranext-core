import { ComponentType } from 'react';

/**
 * Props every first-run wizard step receives from the shell. By default, the shell owns the footer
 * buttons and step navigation; a step renders only its body and, if it needs to gate progress,
 * calls `setCanProceed(false)`. Steps that declare {@link FirstRunStepComponent.managesOwnFooter}
 * receive navigation callbacks directly via these props and suppress the shell's shared footer.
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
   * Skip the rest of setup and finish (persists `platform.suppressStartupSync = true`). Provided
   * only to steps that declare {@link FirstRunStepComponent.managesSkip}. The callback may be async;
   * steps should `await` it to track in-flight state and prevent double-invocation.
   */
  onSkip?: () => void | Promise<void>;
  /** Report whether the shell's Next button should be enabled. Next defaults to enabled. */
  setCanProceed?: (canProceed: boolean) => void;
}

/**
 * A first-run wizard step component. Extends `ComponentType<FirstRunStepProps>` with optional
 * static capability flags:
 *
 * - `managesOwnFooter`: when `true`, the step renders its own footer buttons (e.g. `WizardStepForm`)
 *   and the shell suppresses its shared footer row for that step.
 * - `managesSkip`: when `true`, the shell passes `onSkip` to the step. Decoupled from
 *   `managesOwnFooter` so future steps that own their footer for layout reasons don't inadvertently
 *   receive a skip callback that permanently sets `suppressStartupSync`.
 */
export type FirstRunStepComponent = ComponentType<FirstRunStepProps> & {
  managesOwnFooter?: boolean;
  managesSkip?: boolean;
};
