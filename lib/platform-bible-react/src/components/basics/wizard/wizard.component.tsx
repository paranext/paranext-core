import { Button } from '@/components/shadcn-ui/button';
import { Spinner } from '@/components/basics/spinner.component';
import { WizardStepper } from '@/components/basics/wizard-stepper/wizard-stepper.component';
import { resolveLocalizedString } from '@/utils/localization.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { formatReplacementString, NumberFormat } from 'platform-bible-utils';
import { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const WIZARD_STRING_KEYS = Object.freeze([
  '%wizard_button_back%',
  '%wizard_button_next%',
  '%wizard_button_finish%',
  '%wizard_stepIndicator%',
  '%general_cancel%',
] as const);

/** @experimental This export is unstable and may change shape or disappear without notice */
export type WizardLocalizedStrings = {
  [key in (typeof WIZARD_STRING_KEYS)[number]]?: string;
};

/**
 * One step of a {@link Wizard}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export interface WizardStep {
  /** Stable identifier for the step, used as its React key and in `data-step-id`. */
  id: string;
  /** Step heading, rendered as an `<h2>` at the top of the step. */
  title: ReactNode;
  /**
   * Step body. Every step's content stays mounted for the life of the wizard (see {@link Wizard}),
   * so form state inside a step survives navigating away and back.
   */
  content: ReactNode;
  /**
   * Whether the user may move on from this step (Next, or Finish on the last step). Use it to gate
   * on validation the step's content owns. Defaults to `true`.
   */
  canAdvance?: boolean;
}

/** @experimental This export is unstable and may change shape or disappear without notice */
export interface WizardProps {
  /** The steps, in order. Must contain at least one step. */
  steps: WizardStep[];
  /** Optional wizard title, rendered as an `<h1>` above the step indicator. */
  title?: ReactNode;
  /** 0-based index of the step to open on. Read on mount only. Defaults to `0`. */
  initialStepIndex?: number;
  /** Called with the new 0-based step index whenever the user moves to another step. */
  onStepChange?: (stepIndex: number) => void;
  /** Called when the user presses Finish on the last step. */
  onFinish: () => void;
  /** When provided, a Cancel button is shown in the footer and calls this when pressed. */
  onCancel?: () => void;
  /**
   * While `true`, every footer button is disabled and Finish shows a spinner. Set it while the work
   * started by `onFinish` is in flight.
   */
  isBusy?: boolean;
  /**
   * BCP 47 locale tag for the numerals in the stepper and the "Step X of N" text. Defaults to
   * `'en'`.
   */
  locale?: string;
  /**
   * Localized strings for the buttons and the step indicator; resolve them from
   * {@link WIZARD_STRING_KEYS}. Unresolved entries fall back to English.
   */
  localizedStrings?: WizardLocalizedStrings;
  /** Additional class names for the wizard's root element. */
  className?: string;
}

/**
 * A multi-step wizard: an optional title, a "Step X of N" indicator, a {@link WizardStepper}, the
 * current step's heading and content, and a footer with Back, Cancel and Next / Finish.
 *
 * The wizard keeps a constant height (and width) across steps, so the footer buttons never move
 * under the user's pointer and the surrounding layout does not jump. It does this by rendering
 * every step into the same CSS grid cell: the cell sizes itself to the largest step, and the steps
 * that are not current are `visibility: hidden`, `inert` and `aria-hidden`, so they take up space
 * but cannot be seen, focused, clicked or read by assistive technology. This needs no measuring, so
 * it also holds when a step's content changes size after mount (e.g. a font loads or the locale
 * changes). The cost is that every step's content is mounted from the start.
 *
 * Navigation is local: Next moves forward when the current step's `canAdvance` is not `false`, Back
 * moves to the previous step, and Finish (Next on the last step) calls `onFinish`.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function Wizard({
  steps,
  title,
  initialStepIndex = 0,
  onStepChange,
  onFinish,
  onCancel,
  isBusy = false,
  locale,
  localizedStrings = {},
  className,
}: WizardProps) {
  const stepCount = steps.length;
  const clampIndex = useCallback(
    (index: number) => Math.min(Math.max(index, 0), Math.max(stepCount - 1, 0)),
    [stepCount],
  );
  const [requestedIndex, setRequestedIndex] = useState(() => clampIndex(initialStepIndex));
  // Clamped on every render so a consumer that removes steps never leaves the wizard past the end.
  const currentIndex = clampIndex(requestedIndex);
  const [advancedPast, setAdvancedPast] = useState<ReadonlySet<string>>(() => new Set());

  const safeLocale = locale || 'en';
  const numberFormat = useMemo(() => new NumberFormat(safeLocale), [safeLocale]);

  const idPrefix = useId();
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  // Back is hidden on the first step, so pressing it to reach that step would drop focus onto the
  // document body. Set when that happens; the effect below moves focus to Next instead.
  const focusNextAfterRenderRef = useRef(false);
  useEffect(() => {
    if (!focusNextAfterRenderRef.current) return;
    focusNextAfterRenderRef.current = false;
    nextButtonRef.current?.focus();
  }, [currentIndex]);

  const goToStep = useCallback(
    (index: number) => {
      setRequestedIndex(index);
      onStepChange?.(index);
    },
    [onStepChange],
  );

  const currentStep = steps.at(currentIndex);
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === stepCount - 1;
  const canAdvance = currentStep?.canAdvance ?? true;

  const handleBack = useCallback(() => {
    if (isFirstStep) return;
    if (currentIndex - 1 === 0) focusNextAfterRenderRef.current = true;
    goToStep(currentIndex - 1);
  }, [currentIndex, goToStep, isFirstStep]);

  const handleNext = useCallback(() => {
    if (!currentStep || !canAdvance || isBusy) return;
    if (isLastStep) {
      onFinish();
      return;
    }
    setAdvancedPast((previous) =>
      previous.has(currentStep.id) ? previous : new Set(previous).add(currentStep.id),
    );
    goToStep(currentIndex + 1);
  }, [canAdvance, currentIndex, currentStep, goToStep, isBusy, isLastStep, onFinish]);

  // Completion follows what the user confirmed, not position: after stepping back, later steps
  // they already passed keep their check marks.
  const completedSteps = useMemo(
    () => steps.flatMap((step, index) => (advancedPast.has(step.id) ? [index + 1] : [])),
    [advancedPast, steps],
  );

  if (!currentStep) return undefined;

  const backLabel = resolveLocalizedString(localizedStrings['%wizard_button_back%'], 'Back');
  const nextLabel = isLastStep
    ? resolveLocalizedString(localizedStrings['%wizard_button_finish%'], 'Finish')
    : resolveLocalizedString(localizedStrings['%wizard_button_next%'], 'Next');
  const cancelLabel = resolveLocalizedString(localizedStrings['%general_cancel%'], 'Cancel');
  const indicator = formatReplacementString(
    resolveLocalizedString(
      localizedStrings['%wizard_stepIndicator%'],
      'Step {stepNumber} of {stepCount}',
    ),
    {
      stepNumber: numberFormat.format(currentIndex + 1),
      stepCount: numberFormat.format(stepCount),
    },
  );

  return (
    <div className={cn('tw:flex tw:flex-col tw:gap-6', className)}>
      <div className="tw:flex tw:flex-col tw:gap-1">
        {title && <h1 className="tw:text-lg tw:font-medium">{title}</h1>}
        {/* Visible step count that doubles as the screen-reader announcement of a step change; the
            stepper below is visual only. */}
        <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
          {indicator}
        </p>
        <WizardStepper
          currentStep={currentIndex + 1}
          totalSteps={stepCount}
          locale={safeLocale}
          completedSteps={completedSteps}
        />
      </div>

      {/* Every step shares grid cell 1/1, so the panel is as tall and wide as the largest step and
          does not resize on navigation. Only the current step is visible and reachable. */}
      <div className="tw:grid" data-wizard-panels="">
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const headingId = `${idPrefix}-step-${index}-heading`;
          return (
            <section
              key={step.id}
              data-step-id={step.id}
              data-state={isCurrent ? 'active' : 'inactive'}
              aria-labelledby={headingId}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className={cn(
                'tw:col-start-1 tw:row-start-1 tw:flex tw:min-w-0 tw:flex-col tw:gap-3',
                !isCurrent && 'tw:invisible',
              )}
            >
              <h2 id={headingId} className="tw:text-base tw:font-semibold">
                {step.title}
              </h2>
              <div>{step.content}</div>
            </section>
          );
        })}
      </div>

      <div className="tw:flex tw:items-center tw:justify-between tw:gap-2">
        {/* Back stays in the layout on the first step (hidden, not removed) so the footer keeps the
            same arrangement on every step. */}
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isBusy || isFirstStep}
          aria-hidden={isFirstStep}
          className={cn(isFirstStep && 'tw:invisible')}
        >
          {backLabel}
        </Button>
        <div className="tw:flex tw:gap-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} disabled={isBusy}>
              {cancelLabel}
            </Button>
          )}
          <Button ref={nextButtonRef} onClick={handleNext} disabled={!canAdvance || isBusy}>
            {isLastStep && isBusy && <Spinner className="tw:h-4 tw:w-4" />}
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Wizard;
