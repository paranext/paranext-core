import { ReactNode } from 'react';

/**
 * The `<h2>` that titles a first-run wizard step, sitting under the shell's `<h1>`.
 *
 * Extracted so the treatment has one definition: {@link WizardStepForm} renders it for the steps
 * that use that layout, and steps that own their own layout (because they rely on the shell's
 * footer rather than a primary button) render it directly.
 *
 * Note: `SyncProgressStep` still hand-rolls an `<h2>` at `tw:font-medium` — in two places, one per
 * render branch — so the wizard still shows two heading weights. `LanguageStep` was converted here;
 * SyncProgressStep was left alone because its two headings sit inside progress/complete branches
 * that deserve their own visual pass rather than a drive-by weight change.
 *
 * Tracked as PT-4402, which carries the weight options and the remaining call site.
 */
export function WizardStepHeading({ children }: { children: ReactNode }) {
  return <h2 className="tw:text-base tw:font-semibold">{children}</h2>;
}

export default WizardStepHeading;
