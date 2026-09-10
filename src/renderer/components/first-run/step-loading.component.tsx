import { cn, Spinner } from 'platform-bible-react';

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
    <div className="tw:flex tw:flex-col tw:items-center tw:py-8 tw:text-center">
      <Spinner />
      {/* The live region is kept always mounted (empty until there's a message) so it exists BEFORE
          its text appears — otherwise screen readers don't announce a message that pops in later.
          The top margin is applied only when populated so the spinner-only state stays tight. */}
      <p
        className={cn('tw:text-sm tw:text-muted-foreground', message && 'tw:mt-4')}
        aria-live="polite"
      >
        {message ?? ''}
      </p>
    </div>
  );
}

export default StepLoading;
