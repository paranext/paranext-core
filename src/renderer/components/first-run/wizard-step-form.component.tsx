import { Alert, AlertDescription, AlertTitle } from 'platform-bible-react';
import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';
import { WizardStepHeading } from './wizard-step-heading.component';

interface WizardStepFormProps {
  /** Step heading rendered as an `<h2>`. */
  heading: ReactNode;
  /** Step body content. Intentionally unstyled — each step owns its own text colors. */
  children: ReactNode;
  /** Inline error message. When set, announced via `role="alert"`. */
  error?: string;
  /** Optional description shown below the error title inside the error alert. */
  errorDescription?: string;
  /**
   * Optional Back button rendered on the left of the button row. When omitted, the right side is
   * flush-right. Steps that call `setManagesOwnFooter(true)` use this to place the shell-supplied
   * `onBack` within their own footer rather than the shell's.
   */
  backButton?: ReactNode;
  /** Primary action button, rendered on the right. */
  primaryButton: ReactNode;
}

/**
 * Shared presentational form layout for wizard steps (PT-4260). Renders a heading, body content,
 * optional error alert, and a standardised button row with an optional Back button on the left and
 * the primary action on the right.
 *
 * The children wrapper is intentionally unstyled — each step controls its own text colors rather
 * than inheriting from this component (e.g. form field labels need the default foreground color
 * while body-only steps may want muted foreground).
 */
export function WizardStepForm({
  heading,
  children,
  error,
  errorDescription,
  backButton,
  primaryButton,
}: WizardStepFormProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <WizardStepHeading>{heading}</WizardStepHeading>
      <div>{children}</div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="tw:h-4 tw:w-4" />
          <AlertTitle>{error}</AlertTitle>
          {errorDescription && <AlertDescription>{errorDescription}</AlertDescription>}
        </Alert>
      )}
      {/* justify-between keeps Back flush-left and primary flush-right; empty div ensures the
          primary stays right even when backButton is absent. */}
      <div className="tw:flex tw:justify-between tw:gap-2">
        <div>{backButton}</div>
        <div>{primaryButton}</div>
      </div>
    </div>
  );
}

export default WizardStepForm;
