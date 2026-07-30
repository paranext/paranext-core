import { Fragment, useMemo } from 'react';
import { Check } from 'lucide-react';
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
   * `'en'`; an empty string also falls back to `'en'` (`Intl.NumberFormat('')` throws a
   * `RangeError` in V8).
   */
  locale?: string;
}

/** Progress state of a single step circle; also exposed as a `data-state` attribute for consumers. */
type StepState = 'active' | 'complete' | 'upcoming';

/**
 * Displays a row of numbered step circles showing progress through a multi-step wizard. Purely
 * presentational — owns no navigation state. All circles are `aria-hidden`; the consuming shell is
 * responsible for a `sr-only` `aria-live` sibling that announces the current step to screen
 * readers.
 */
export function WizardStepper({ currentStep, totalSteps, locale }: WizardStepperProps) {
  const safeLocale = locale || 'en';
  const format = useMemo(() => {
    const numberFormat = new NumberFormat(safeLocale);
    return (n: number) => numberFormat.format(n);
  }, [safeLocale]);
  // Clamp to [1, totalSteps] so out-of-range values produce a defined active step rather than
  // rendering all circles in the same "not yet reached" style.
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const stepNumbers = Array.from({ length: totalSteps }, (_, i) => i + 1);
  return (
    <div className="tw:flex tw:items-center" aria-hidden="true">
      {stepNumbers.map((stepNum) => {
        let state: StepState = 'upcoming';
        if (stepNum === clampedStep) state = 'active';
        else if (stepNum < clampedStep) state = 'complete';
        return (
          <Fragment key={stepNum}>
            {stepNum > 1 && <div className="tw:h-px tw:flex-1 tw:bg-border" />}
            <div
              data-state={state}
              className={cn(
                'tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium',
                state === 'active' && 'tw:bg-primary tw:text-primary-foreground',
                state === 'complete' && 'tw:bg-muted tw:text-muted-foreground',
                state === 'upcoming' && 'tw:border tw:border-input tw:text-muted-foreground',
              )}
            >
              {/* Completed steps show a check mark so "done" is distinguishable from "not yet
                  reached" by shape, not color alone. The whole stepper is aria-hidden; the shell's
                  sr-only live region carries progress for assistive tech. */}
              {state === 'complete' ? <Check className="tw:h-4 tw:w-4" /> : format(stepNum)}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default WizardStepper;
