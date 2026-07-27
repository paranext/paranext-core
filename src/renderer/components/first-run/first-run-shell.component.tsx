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
import { SyncProgressPlaceholderStep } from './steps/sync-progress.placeholder.component';

/** Runtime order of the wizard steps. */
export const STEP_ORDER: FirstRunStep[] = [
  'language',
  'internetSettings',
  'identify',
  'syncConsent',
  'syncProgress',
];

/** Step components for the wizard; placeholder entries are replaced when their sibling tickets land. */
export const DEFAULT_STEP_COMPONENTS: Record<FirstRunStep, ComponentType<FirstRunStepProps>> = {
  language: LanguageStep,
  internetSettings: InternetSettingsStep,
  identify: IdentifyStep,
  syncConsent: SyncConsentStep,
  syncProgress: SyncProgressPlaceholderStep,
};

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_stepIndicator%',
  '%firstRun_button_next%',
  '%firstRun_button_back%',
  '%firstRun_button_skip%',
  '%firstRun_button_finish%',
  // Referenced via {%product_name%} in the title; formatReplacementString expands it.
  '%product_name%',
];

/**
 * Owns the wizard chrome (title, step indicator) and the shared footer (Back / Next), plus step
 * navigation. Steps that need a custom footer (e.g. sync-consent) set `stepManagesOwnFooter` to
 * suppress the shared one. Runs ordinary forward/back navigation seeded from `entryStep` (the
 * startup reducer already chose where to start). Derives the Next busy state from the async action
 * and surfaces a thrown action as an inline error.
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

  // Reset per-step chrome as part of the navigation itself (same commit as setStep), so the
  // incoming step's own setCanProceed/setCanSkip on mount is applied AFTER this and is not overridden.
  const goToStep = useCallback((next: FirstRunStep) => {
    setError('');
    setIsBusy(false);
    setCanProceed(true);
    setCanSkip(false);
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
    () => (canSkip ? () => runAction(() => completeFirstRun({ syncSkipped: true })) : undefined),
    [canSkip, runAction],
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
          <Button variant="ghost" onClick={onSkip} disabled={isBusy}>
            {strings['%firstRun_button_skip%']}
          </Button>
        )}
        {canProceed !== undefined && (
          <Button onClick={onNext} disabled={!canProceed || isBusy}>
            {isBusy && <Spinner />}
            {nextLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default FirstRunShell;
