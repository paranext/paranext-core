import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { completeFirstRun } from '@renderer/services/first-run-store';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { Button, Spinner } from 'platform-bible-react';
import { formatReplacementString, getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { ComponentType, useCallback, useMemo, useState } from 'react';
import { FirstRunStepProps } from './first-run-step-props.model';
import { LanguageStep } from './steps/language.component';
import { InternetSettingsStep } from './steps/internet-settings-step.component';
import { IdentifyStep } from './steps/identify-step.component';
import { SyncConsentStep } from './steps/sync-consent-step.component';
import { SyncProgressStep } from './steps/sync-progress.component';

/** Runtime order of the wizard steps. */
export const STEP_ORDER: FirstRunStep[] = [
  'language',
  'internetSettings',
  'identify',
  'syncConsent',
  'syncProgress',
];

/** Steps that are interstitials — shown after numbered steps, excluded from the stepper count. */
export const INTERSTITIAL_STEPS = new Set<FirstRunStep>(['syncProgress']);

/** Steps shown in the stepper (excludes interstitials). Length drives the "of N" count. */
export const NUMBERED_STEPS = STEP_ORDER.filter((s) => !INTERSTITIAL_STEPS.has(s));

/** Step components for the wizard; placeholder entries are replaced when their sibling tickets land. */
export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: LanguageStep,
  internetSettings: InternetSettingsStep,
  identify: IdentifyStep,
  syncConsent: SyncConsentStep,
  syncProgress: SyncProgressStep,
};

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_stepIndicator%',
  '%firstRun_button_next%',
  '%firstRun_button_back%',
  '%firstRun_button_skipSync%',
  '%firstRun_button_finish%',
  // Referenced via {%product_name%} in the title; formatReplacementString expands it.
  '%product_name%',
];

/**
 * Owns the wizard chrome (title, step indicator) and the shared footer (Back / Next), plus step
 * navigation. Steps that need a skip action call `setCanSkip(true)` to surface the shell's Skip
 * button. Runs ordinary forward/back navigation seeded from `entryStep` (the startup reducer
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
  const [canProceed, setCanProceed] = useState<boolean | undefined>(true);
  const [canSkip, setCanSkip] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [strings] = useLocalizedStrings(KEYS);

  const index = STEP_ORDER.indexOf(step);
  const isInterstitial = INTERSTITIAL_STEPS.has(step);
  const numberedIndex = NUMBERED_STEPS.indexOf(step); // −1 for interstitials
  const isLastStep = index === STEP_ORDER.length - 1;
  // Back floor is the resume entry step, not index 0: the startup reducer resumes a post-relaunch
  // user at `syncConsent`, and the already-completed language/internetSettings/identify steps
  // behind it must not be reachable (the real Identify step saves registration + calls
  // platform.restart, so backing into it risks re-triggering the relaunch/resume loop).
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

  // Reset per-step chrome as part of the navigation itself (same commit as setStep). Always start
  // disabled so the incoming step's mount effect decides the initial proceed state — steps that
  // want to start enabled call setCanProceed(true) in their own mount effect, steps that need to
  // gate (e.g. syncProgress) call setCanProceed(false). This is fully step-agnostic.
  const goToStep = useCallback((next: FirstRunStep) => {
    setError('');
    setIsBusy(false);
    setCanProceed(false);
    setCanSkip(false);
    setStep(next);
  }, []);

  const onNext = useCallback(() => {
    const next = STEP_ORDER[index + 1];
    // Synchronous step advance: no async work, so skip runAction to avoid a spurious isBusy flash.
    // Only the final step calls completeFirstRun(), which is async and needs the busy state.
    if (next) goToStep(next);
    else runAction(() => completeFirstRun());
  }, [index, runAction, goToStep]);

  const onBack = useMemo(
    () =>
      !isInterstitial && index > entryIndex ? () => goToStep(STEP_ORDER[index - 1]) : undefined,
    [isInterstitial, index, entryIndex, goToStep],
  );

  const onSkip = useMemo(
    () => (canSkip ? () => runAction(() => completeFirstRun({ skippedStep: step })) : undefined),
    [canSkip, step, runAction],
  );

  const StepComponent = stepComponents[step];
  const nextLabel = isLastStep
    ? strings['%firstRun_button_finish%']
    : strings['%firstRun_button_next%'];

  return (
    <div className="tw:mx-auto tw:flex tw:w-full tw:max-w-md tw:flex-col tw:gap-6 tw:p-8">
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h1 className="tw:text-lg tw:font-medium">
          {formatReplacementString(strings['%firstRun_title%'], strings)}
        </h1>
        {/* aria-live so screen readers announce numbered-step changes. Hidden for interstitials
            (syncProgress): the step's own heading and role="status" provide the screen-reader context. */}
        {!isInterstitial && (
          <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
            {formatReplacementString(strings['%firstRun_stepIndicator%'], {
              stepNumber: numberedIndex + 1,
              stepCount: NUMBERED_STEPS.length,
            })}
          </p>
        )}
      </div>

      <StepComponent
        onNext={onNext}
        onBack={onBack}
        onSkip={onSkip}
        setCanProceed={setCanProceed}
        setCanSkip={setCanSkip}
      />

      {error && <p className="tw:text-sm tw:text-destructive">{error}</p>}

      <div className="tw:flex tw:justify-end tw:gap-2">
        {onBack && (
          <Button variant="outline" onClick={onBack} disabled={isBusy}>
            {strings['%firstRun_button_back%']}
          </Button>
        )}
        {onSkip && (
          // Label is sync-specific; if a future step also calls setCanSkip(true) for a different
          // reason, the shell will need to accept a skip-label callback from that step.
          <Button variant="ghost" onClick={onSkip} disabled={isBusy}>
            {strings['%firstRun_button_skipSync%']}
          </Button>
        )}
        {canProceed !== undefined && (
          <Button onClick={onNext} disabled={!canProceed || isBusy}>
            {/* Spinner while completeFirstRun() is in flight, or while the last step is waiting for
                an async precondition (e.g. sync completing). If a future last step gates on user
                input rather than async work, this assumption should be revisited. */}
            {(isBusy || (isLastStep && !canProceed)) && <Spinner />}
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default FirstRunShell;
