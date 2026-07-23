import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { completeFirstRun } from '@renderer/services/first-run-store';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { Button, Spinner } from 'platform-bible-react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { ComponentType, useCallback, useMemo, useState } from 'react';
import { FirstRunStepProps } from './first-run-step-props.model';
import { LanguagePlaceholderStep } from './steps/language.placeholder.component';
import { IdentifyPlaceholderStep } from './steps/identify.placeholder.component';
import { SyncConsentStep } from './steps/sync-consent-step.component';
import { SyncProgressPlaceholderStep } from './steps/sync-progress.placeholder.component';

/** Runtime order of the wizard steps. */
export const STEP_ORDER: FirstRunStep[] = ['language', 'identify', 'syncConsent', 'syncProgress'];

/** Default step bodies. Sibling tickets replace individual entries with their real step. */
export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: LanguagePlaceholderStep,
  identify: IdentifyPlaceholderStep,
  syncConsent: SyncConsentStep,
  syncProgress: SyncProgressPlaceholderStep,
};

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_stepIndicator%',
  '%firstRun_button_next%',
  '%firstRun_button_back%',
  '%firstRun_button_skip%',
  '%firstRun_button_skipForNow%',
  '%firstRun_button_finish%',
  // Referenced via {%product_name%} in the title; formatReplacementString expands it.
  '%product_name%',
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
  // Back floor is the resume entry step, not index 0: the startup reducer resumes a post-relaunch
  // user at `syncConsent`, and the already-completed identify/language steps behind it must not be
  // reachable (PT-4177's real Identify saves registration + calls platform.restart, so backing into
  // it risks re-triggering the relaunch/resume loop).
  const entryIndex = STEP_ORDER.indexOf(entryStep);

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

  // Reset per-step chrome as part of the navigation itself (same commit as setStep), so the
  // incoming step's own setCanProceed(false) on mount is applied AFTER this and is not overridden.
  const goToStep = useCallback((next: FirstRunStep) => {
    setError('');
    setIsBusy(false);
    setCanProceed(true);
    setStep(next);
  }, []);

  const onNext = useCallback(() => {
    const next = STEP_ORDER[index + 1];
    // Sync step advance: no async work, so skip runAction to avoid a spurious isBusy flash.
    // Only the final step calls completeFirstRun(), which is async and needs the busy state.
    if (next) goToStep(next);
    else runAction(() => completeFirstRun());
  }, [index, runAction, goToStep]);

  const onBack = useMemo(
    () => (index > entryIndex ? () => goToStep(STEP_ORDER[index - 1]) : undefined),
    [index, entryIndex, goToStep],
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
        <h1 className="tw:text-lg tw:font-medium">
          {formatReplacementString(strings['%firstRun_title%'], strings)}
        </h1>
        {/* aria-live so screen readers announce the step change on Next/Back — focus stays on the
            persistent Next button, so without this the navigation is silent. */}
        <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
          {indicator}
        </p>
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
            {strings['%firstRun_button_skipForNow%']}
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
