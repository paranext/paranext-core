import { Spinner } from 'platform-bible-react';

interface StepLoadingProps {
  /**
   * Optional status line shown under the spinner. Announced politely to screen readers so they hear
   * why the spinner is lingering.
   */
  message?: string;
}

/**
 * Centered spinner with an optional status message — the shared loading panel for first-run steps
 * (e.g. the identify step's restart and the internet-settings step's startup wait).
 */
export function StepLoading({ message }: StepLoadingProps) {
  return (
    <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:py-8 tw:text-center">
      <Spinner />
      {message && (
        <p className="tw:text-sm tw:text-muted-foreground" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}

export default StepLoading;
