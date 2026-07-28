import { Fragment, useMemo } from 'react';
import { NumberFormat } from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';

/** Props for the {@link WizardStepper} component. */
export interface WizardStepperProps {
  /** 1-based index of the currently active step. */
  currentStep: number;
  /** Total number of numbered steps. */
  totalSteps: number;
  /**
   * BCP 47 locale tag for numeral formatting in the circle labels. E.g. `'ar'` → ١٢٣٤. Defaults to
   * `'en'`. Ignored when {@link WizardStepperProps.formatLabel} is provided.
   */
  locale?: string;
  /**
   * Optional numeral formatter for step-circle labels. When supplied, the component skips its
   * internal {@link NumberFormat} allocation and calls this function instead — useful when the
   * caller already holds a formatter for the same locale. Takes precedence over `locale`.
   */
  formatLabel?: (n: number) => string;
}

/**
 * Displays a row of numbered step circles showing progress through a multi-step wizard. Purely
 * presentational — owns no navigation state. All circles are `aria-hidden`; the consuming shell is
 * responsible for a `sr-only` `aria-live` sibling that announces the current step to screen
 * readers.
 */
export function WizardStepper({
  currentStep,
  totalSteps,
  locale = 'en',
  formatLabel,
}: WizardStepperProps) {
  const safeLocale = locale || 'en';
  // When formatLabel is provided, skip the internal NumberFormat allocation entirely.
  const format = useMemo<(n: number) => string>(
    () => {
      if (formatLabel !== undefined) return formatLabel;
      const fmt = new NumberFormat(safeLocale);
      return (n: number) => fmt.format(n);
    },
    [formatLabel, safeLocale],
  );
  // Clamp to [1, totalSteps] so out-of-range values produce a defined active step rather than
  // rendering all circles in the same "not yet reached" style.
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const stepNums = useMemo(() => Array.from({ length: totalSteps }, (_, i) => i + 1), [totalSteps]);
  return (
    <div className="tw:flex tw:items-center" aria-hidden="true">
      {stepNums.map((stepNum) => {
        const isPast = stepNum < clampedStep;
        const isActive = stepNum === clampedStep;
        return (
          <Fragment key={stepNum}>
            {stepNum > 1 && <div className="tw:h-px tw:flex-1 tw:bg-border" />}
            <div
              className={cn(
                'tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium',
                isActive && 'tw:bg-primary tw:text-primary-foreground',
                isPast && 'tw:bg-muted tw:text-muted-foreground',
                !isActive &&
                  !isPast &&
                  'tw:border tw:border-muted-foreground tw:text-muted-foreground',
              )}
            >
              {format(stepNum)}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default WizardStepper;
