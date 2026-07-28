import { ReactNode } from 'react';

interface WizardStepFormProps {
  heading: ReactNode;
  children: ReactNode;
  error?: string;
  /** Back button node, rendered on the left. Omit when no back navigation is available. */
  backButton?: ReactNode;
  /** Secondary action (e.g. "Skip automatic sync"), rendered to the left of the primary button. */
  secondaryButton?: ReactNode;
  primaryButton: ReactNode;
}

/**
 * Shared presentational form layout for wizard steps (PT-4260). Renders a heading, body content,
 * optional error, and a standardised button row: Back on the left; secondary + primary together on
 * the right.
 *
 * The children wrapper is intentionally unstyled — each step controls its own text colors rather
 * than inheriting from this component (e.g. form field labels need the default foreground color
 * while body-only steps may want muted foreground).
 */
export function WizardStepForm({
  heading,
  children,
  error,
  backButton,
  secondaryButton,
  primaryButton,
}: WizardStepFormProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <h2 className="tw:text-base tw:font-semibold">{heading}</h2>
      <div>{children}</div>
      {error && <p className="tw:text-sm tw:text-destructive">{error}</p>}
      <div className="tw:flex tw:justify-between tw:gap-2">
        <div>{backButton}</div>
        <div className="tw:flex tw:gap-2">
          {secondaryButton}
          {primaryButton}
        </div>
      </div>
    </div>
  );
}

export default WizardStepForm;
