import { Alert, AlertDescription, AlertTitle } from 'platform-bible-react';
import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface WizardStepFormProps {
  /** Step heading rendered as an `<h2>`. */
  heading: ReactNode;
  /** Step body content. Intentionally unstyled — each step owns its own text colors. */
  children: ReactNode;
  /** Inline error message. When set, announced via `role="alert"`. */
  error?: string;
  /** Optional description shown below the error title inside the error alert. */
  errorDescription?: string;
  /** Primary action button, rendered on the right. */
  primaryButton: ReactNode;
}

/**
 * Shared presentational form layout for wizard steps (PT-4260). Renders a heading, body content,
 * optional error alert, and a standardised button row with the primary button on the right.
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
  primaryButton,
}: WizardStepFormProps) {
  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <h2 className="tw:text-base tw:font-semibold">{heading}</h2>
      <div>{children}</div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="tw:h-4 tw:w-4" />
          <AlertTitle>{error}</AlertTitle>
          {errorDescription && <AlertDescription>{errorDescription}</AlertDescription>}
        </Alert>
      )}
      <div className="tw:flex tw:justify-end tw:gap-2">{primaryButton}</div>
    </div>
  );
}

export default WizardStepForm;
