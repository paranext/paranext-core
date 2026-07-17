import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { completeFirstRun } from '@renderer/services/first-run-store';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { Button, Spinner } from 'platform-bible-react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FirstRunStepProps } from './first-run.model';
import { LanguagePlaceholderStep } from './steps/language.placeholder.component';
import { IdentifyPlaceholderStep } from './steps/identify.placeholder.component';
import { SyncConsentPlaceholderStep } from './steps/sync-consent.placeholder.component';
import { SyncProgressPlaceholderStep } from './steps/sync-progress.placeholder.component';

/** Runtime order of the wizard steps. */
export const STEP_ORDER: FirstRunStep[] = ['language', 'identify', 'syncConsent', 'syncProgress'];

/** Default step bodies. Sibling tickets replace individual entries with their real step. */
export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: LanguagePlaceholderStep,
  identify: IdentifyPlaceholderStep,
  syncConsent: SyncConsentPlaceholderStep,
  syncProgress: SyncProgressPlaceholderStep,
};

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_stepIndicator%',
  '%firstRun_button_next%',
  '%firstRun_button_back%',
  '%firstRun_button_skip%',
  '%firstRun_button_finish%',
];

/**
 * Owns the wizard chrome (title, step indicator) and the footer (Back / Skip / Next), plus step
 * navigation. Runs ordinary forward/back navigation seeded from `entryStep` (the startup reducer
 * already chose where to start). Derives the Next busy state from the async action and surfaces a
 * thrown action as an inline error.
 */
export function FirstRunShell({
  entryStep,
  stepComponents = DEFAULT_STEP_COMPONENTS,
}: {
  entryStep: FirstRunStep;
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
}) {
  const [step, setStep] = useState<FirstRunStep>(entryStep);
  const [canProceed, setCanProceed] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [strings] = useLocalizedStrings(KEYS);

  const index = STEP_ORDER.indexOf(step);
  const isLastStep = index === STEP_ORDER.length - 1;

  // Reset per-step chrome whenever the step actually changes (skip initial mount so child steps
  // can call setCanProceed(false) in their own effects without being overridden by this reset).
  const prevStepRef = useRef<FirstRunStep | undefined>(undefined);
  useEffect(() => {
    if (prevStepRef.current === undefined) {
      prevStepRef.current = step;
      return;
    }
    if (prevStepRef.current !== step) {
      prevStepRef.current = step;
      setCanProceed(true);
      setError('');
      setIsBusy(false);
    }
  }, [step]);

  const runAction = useCallback(async (action: () => void | Promise<void>) => {
    setError('');
    setIsBusy(true);
    try {
      await action();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setIsBusy(false);
    }
  }, []);

  const onNext = useCallback(() => {
    const next = STEP_ORDER[index + 1];
    // Sync step advance: no async work, so skip runAction to avoid a spurious isBusy flash.
    // Only the final step calls completeFirstRun(), which is async and needs the busy state.
    if (next) setStep(next);
    else runAction(() => completeFirstRun());
  }, [index, runAction]);

  const onBack = useMemo(
    () => (index > 0 ? () => setStep(STEP_ORDER[index - 1]) : undefined),
    [index],
  );

  const onSkip = useMemo(
    () =>
      step === 'syncConsent'
        ? () => runAction(() => completeFirstRun({ syncSkipped: true }))
        : undefined,
    [step, runAction],
  );

  const StepComponent = stepComponents[step];
  const indicator = formatReplacementString(strings['%firstRun_stepIndicator%'], {
    stepNumber: index + 1,
    stepCount: STEP_ORDER.length,
  });
  const nextLabel = isLastStep
    ? strings['%firstRun_button_finish%']
    : strings['%firstRun_button_next%'];

  return (
    <div className="tw:mx-auto tw:flex tw:w-full tw:max-w-md tw:flex-col tw:gap-6 tw:p-8">
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h1 className="tw:text-lg tw:font-medium">{strings['%firstRun_title%']}</h1>
        <p className="tw:text-xs tw:text-muted-foreground">{indicator}</p>
      </div>

      <StepComponent
        onNext={onNext}
        onBack={onBack}
        onSkip={onSkip}
        setCanProceed={setCanProceed}
      />

      {error && <p className="tw:text-sm tw:text-destructive">{error}</p>}

      <div className="tw:flex tw:justify-end tw:gap-2">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={isBusy}>
            {strings['%firstRun_button_back%']}
          </Button>
        )}
        {onSkip && (
          <Button variant="ghost" onClick={onSkip} disabled={isBusy}>
            {strings['%firstRun_button_skip%']}
          </Button>
        )}
        <Button onClick={onNext} disabled={!canProceed || isBusy}>
          {isBusy && <Spinner />}
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

export default FirstRunShell;
