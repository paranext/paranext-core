import { Fragment } from 'react';
import { cn } from '@/utils/shadcn-ui/utils';

export interface WizardStepperProps {
  /** 1-based index of the currently active step. */
  currentStep: number;
  /** Total number of numbered steps. */
  totalSteps: number;
  /**
   * BCP 47 locale tag for numeral formatting in the circle labels.
   * E.g. `'ar'` → ١٢٣٤. Defaults to `'en'`.
   */
  locale?: string;
}

/**
 * Displays a row of numbered step circles showing progress through a multi-step wizard.
 * Purely presentational — owns no navigation state. All circles are `aria-hidden`; the
 * consuming shell is responsible for a `sr-only` `aria-live` sibling that announces the
 * current step to screen readers.
 */
export function WizardStepper({ currentStep, totalSteps, locale = 'en' }: WizardStepperProps) {
  const fmt = new Intl.NumberFormat(locale);
  return (
    <div className="tw:flex tw:items-center" aria-hidden="true">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isPast = stepNum < currentStep;
        const isActive = stepNum === currentStep;
        return (
          <Fragment key={stepNum}>
            {i > 0 && <div className="tw:h-px tw:flex-1 tw:bg-border" />}
            <div
              className={cn(
                'tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium',
                isActive && 'tw:bg-primary tw:text-primary-foreground',
                isPast && 'tw:bg-muted tw:text-muted-foreground',
                !isActive && !isPast && 'tw:border tw:border-muted-foreground tw:text-muted-foreground',
              )}
            >
              {fmt.format(stepNum)}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default WizardStepper;
