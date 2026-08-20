import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { usePrimaryInterfaceLanguage } from '@renderer/hooks/use-primary-interface-language.hook';
import { completeFirstRun } from '@renderer/services/first-run-store';
import { FirstRunStep, NumberedStep } from '@renderer/services/first-run.model';
import { Button, Spinner, WizardStepper } from 'platform-bible-react';
import {
  formatReplacementString,
  getErrorMessage,
  LocalizeKey,
  NumberFormat,
} from 'platform-bible-utils';
import { ComponentType, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FirstRunStepProps } from './first-run-step-props.model';
import { LanguageStep } from './steps/language.component';
import { InternetSettingsStep } from './steps/internet-settings-step.component';
import { IdentifyStep } from './steps/identify-step.component';
import { SyncConsentStep } from './steps/sync-consent-step.component';
import { SyncProgressStep } from './steps/sync-progress.component';

/**
 * Steps shown in the stepper, in order. Typed `NumberedStep[]` so the type stays load-bearing:
 * adding an interstitial here is a compile error. Length drives the "of N" count.
 */
export const NUMBERED_STEPS: NumberedStep[] = [
  'language',
  'internetSettings',
  'identify',
  'syncConsent',
];

/**
 * Runtime order of all wizard steps. Numbered steps first, then the `syncProgress` interstitial
 * last — so an interstitial is any step at or beyond `NUMBERED_STEPS.length` in this array.
 */
export const STEP_ORDER: FirstRunStep[] = [...NUMBERED_STEPS, 'syncProgress'];

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
  '%firstRun_button_finish%',
  '%firstRun_button_dontSyncYet%',
  // Referenced via {%product_name%} in the title; formatReplacementString expands it.
  '%product_name%',
];

/**
 * Owns the wizard chrome (title, step indicator) and the shared footer (Back / Next), plus step
 * navigation. A step that offers an early exit calls `setCanSkip(true)` to surface the shell's
 * decline button ("Don't sync yet" — see the render site). Runs ordinary forward/back navigation
 * seeded from `entryStep` (the startup reducer already chose where to start). Derives the Next busy
 * state from the async action and surfaces a thrown action as an inline error.
 */
export function FirstRunShell({
  entryStep,
  stepComponents = DEFAULT_STEP_COMPONENTS,
  allowContinueWithoutRegistration,
}: {
  entryStep: FirstRunStep;
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
  allowContinueWithoutRegistration?: boolean;
}) {
  const [step, setStep] = useState<FirstRunStep>(entryStep);
  const [canProceed, setCanProceed] = useState<boolean | undefined>(true);
  const [canSkip, setCanSkip] = useState(false);
  const [managesOwnFooter, setManagesOwnFooter] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');
  const [strings] = useLocalizedStrings(KEYS);
  const locale = usePrimaryInterfaceLanguage();
  const numberFormat = useMemo(() => new NumberFormat(locale), [locale]);
  // NUMBERED_STEPS.length is a module constant (always 4), so memoize its formatted form separately
  // to avoid reformatting a fixed denominator on every step-navigation render.
  const formattedStepCount = useMemo(
    () => numberFormat.format(NUMBERED_STEPS.length),
    [numberFormat],
  );

  const index = STEP_ORDER.indexOf(step);
  // Numbered steps occupy the front of STEP_ORDER; anything at/after NUMBERED_STEPS.length is an
  // interstitial. For a numbered step its STEP_ORDER index is also its index within NUMBERED_STEPS.
  const isInterstitial = index >= NUMBERED_STEPS.length;
  const numberedIndex = isInterstitial ? -1 : index;
  const isLastStep = index === STEP_ORDER.length - 1;
  // Back floor is the resume entry step, not index 0: the startup reducer resumes a post-relaunch
  // user at `syncConsent`, and the already-completed language/internetSettings/identify steps
  // behind it must not be reachable (the Identify step saves registration + calls platform.restart,
  // so backing into it risks re-triggering the relaunch/resume loop).
  const entryIndex = STEP_ORDER.indexOf(entryStep);

  // Mirror of isBusy for the synchronous re-entrancy guard: React batches state, so two calls in the
  // same tick both read the same stale `isBusy` from the render closure. The ref is updated
  // synchronously here, so a second call sees the in-flight write. Guarding inside runAction covers
  // every async entry point (both the final-step completeFirstRun path and onSkip) in one place.
  const isBusyRef = useRef(false);
  const runAction = useCallback(async (action: () => void | Promise<void>) => {
    if (isBusyRef.current) return;
    setError('');
    isBusyRef.current = true;
    setIsBusy(true);
    try {
      await action();
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      isBusyRef.current = false;
      setIsBusy(false);
    }
  }, []);

  // Reset per-step chrome as part of the navigation itself (same commit as setStep). Always start
  // disabled so the incoming step's mount effect decides the initial proceed state — steps that
  // want to start enabled call setCanProceed(true) in their own mount effect, steps that need to
  // gate (e.g. syncProgress) call setCanProceed(false). This is fully step-agnostic.
  const goToStep = useCallback((next: FirstRunStep) => {
    setError('');
    isBusyRef.current = false;
    setIsBusy(false);
    setCanProceed(false);
    setCanSkip(false);
    setManagesOwnFooter(false);
    setStep(next);
  }, []);

  // Finishing the wizard is identical from the last step's Next/Finish and from the decline button.
  const completeWizard = useCallback(() => runAction(completeFirstRun), [runAction]);

  const onNext = useCallback(() => {
    // Guard against re-entrant calls (e.g. step calls onNext programmatically while busy). Read the
    // ref, not `isBusy` — two synchronous calls in one tick share a stale render-closure `isBusy`.
    if (isBusyRef.current) return;
    const next = STEP_ORDER[index + 1];
    // Synchronous step advance: no async work, so skip runAction to avoid a spurious isBusy flash.
    // Only the final step calls completeFirstRun(), which is async and needs the busy state.
    if (next) goToStep(next);
    else completeWizard();
  }, [index, completeWizard, goToStep]);

  const onBack = useMemo(
    () =>
      !isInterstitial && index > entryIndex ? () => goToStep(STEP_ORDER[index - 1]) : undefined,
    [isInterstitial, index, entryIndex, goToStep],
  );

  // No useMemo: `completeWizard` is already stable, so both branches are referentially stable.
  const onSkip = canSkip ? completeWizard : undefined;

  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const finishButtonRef = useRef<HTMLButtonElement>(null);
  // Focus the Finish button the moment it becomes enabled on the last step. Without this, keyboard
  // and screen-reader users on an interstitial (no Back, no other controls) have no signal that
  // the only actionable control just became available.
  const prevCanProceedRef = useRef(canProceed);
  useEffect(() => {
    const wasDisabled = !prevCanProceedRef.current;
    prevCanProceedRef.current = canProceed;
    if (isLastStep && canProceed && wasDisabled) finishButtonRef.current?.focus();
  }, [canProceed, isLastStep]);

  const StepComponent = stepComponents[step];
  const indicator = !isInterstitial
    ? formatReplacementString(strings['%firstRun_stepIndicator%'], {
        stepNumber: numberFormat.format(numberedIndex + 1),
        stepCount: formattedStepCount,
      })
    : '';
  const nextLabel = isLastStep
    ? strings['%firstRun_button_finish%']
    : strings['%firstRun_button_next%'];

  return (
    <div className="tw:flex tw:min-h-full tw:items-center tw:justify-center tw:py-8">
      <div className="tw:mx-auto tw:flex tw:w-full tw:max-w-md tw:flex-col tw:gap-6 tw:p-8">
        <div className="tw:flex tw:flex-col tw:gap-1">
          <h1 className="tw:text-lg tw:font-medium">
            {formatReplacementString(strings['%firstRun_title%'], strings)}
          </h1>
          {/* Visible "Step X of N" count that doubles as the aria-live announcement. Kept always
              mounted so screen readers don't lose the live region when navigating to/from
              syncProgress; content is empty ('') on the interstitial. */}
          <p className="tw:text-xs tw:text-muted-foreground" aria-live="polite">
            {indicator}
          </p>
          {!isInterstitial && (
            <WizardStepper
              currentStep={numberedIndex + 1}
              totalSteps={NUMBERED_STEPS.length}
              locale={locale}
            />
          )}
        </div>

        <StepComponent
          onNext={onNext}
          onBack={onBack}
          onSkip={onSkip}
          setCanProceed={setCanProceed}
          setCanSkip={setCanSkip}
          setManagesOwnFooter={setManagesOwnFooter}
          allowContinueWithoutRegistration={allowContinueWithoutRegistration}
        />

        {error && (
          <p className="tw:text-sm tw:text-destructive" aria-live="assertive" role="alert">
            {error}
          </p>
        )}

        {/* Steps that render their own footer (via WizardStepForm) set managesOwnFooter so the shell
            does not stack a second Back/decline/Next row beneath the step's own. Both are still
            handed to the step through onBack/onSkip; the step places them in its own row. */}
        {!managesOwnFooter && (
          <div className="tw:flex tw:items-center tw:justify-between">
            <div>
              {onBack && (
                <Button variant="outline" onClick={onBack} disabled={isBusy}>
                  {strings['%firstRun_button_back%']}
                </Button>
              )}
            </div>
            <div className="tw:flex tw:gap-2">
              {onSkip && (
                // Label is sync-specific; if a future step also calls setCanSkip(true) for a
                // different reason, the shell will need to accept a label callback from it.
                <Button variant="ghost" onClick={onSkip} disabled={isBusy}>
                  {strings['%firstRun_button_dontSyncYet%']}
                </Button>
              )}
              {canProceed !== undefined && (
                <Button ref={finishButtonRef} onClick={onNext} disabled={!canProceed || isBusy}>
                  {/* Spinner only while an async action (completeFirstRun) is in flight. A last step
                      that gates on its own async precondition shows its own status in the step body
                      (e.g. SyncProgressStep's progressbar), so the button does not double up. */}
                  {isBusy && <Spinner />}
                  {nextLabel}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FirstRunShell;
