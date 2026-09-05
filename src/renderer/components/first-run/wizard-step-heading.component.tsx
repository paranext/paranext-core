import { ReactNode } from 'react';

/**
 * The `<h2>` that titles a first-run wizard step, sitting under the shell's `<h1>`.
 *
 * Extracted so the treatment has one definition: {@link WizardStepForm} renders it for the steps
 * that use that layout, and steps that own their own layout (because they rely on the shell's
 * footer rather than a primary button) render it directly.
 *
 * All five wizard steps render their heading through this component.
 */
export function WizardStepHeading({ children }: { children: ReactNode }) {
  return <h2 className="tw:text-base tw:font-semibold">{children}</h2>;
}

export default WizardStepHeading;
