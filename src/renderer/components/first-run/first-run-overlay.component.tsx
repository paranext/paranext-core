import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  continueWithoutRegistration,
  FirstRunStatus,
  getFirstRunStatus,
  retryFirstRunResolution,
  subscribeToFirstRun,
} from '@renderer/services/first-run-store';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Spinner,
  Z_INDEX_FIRST_RUN,
} from 'platform-bible-react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import {
  ComponentType,
  forwardRef,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { VisuallyHidden } from 'radix-ui';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { REGISTRATION_RESOLVE_TIMEOUT_MS } from '@renderer/services/resolve-registration-validity';
import { FirstRunShell } from './first-run-shell.component';
import { FirstRunStepProps } from './first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_description%',
  '%firstRun_loading%',
  '%firstRun_loading_detail%',
  '%firstRun_loading_slow%',
  '%firstRun_error_title%',
  '%firstRun_error_body_providerStartingUp%',
  '%firstRun_button_retry%',
  '%firstRun_button_continueWithoutFinishingSetup%',
  // Referenced via {%product_name%} in the title/description/error body; formatReplacementString
  // expands it so the app name lives in one place (and swaps cleanly for P10 Studio).
  '%product_name%',
];

// Full-viewport, above the menubar, opaque, square corners. `tw:block` overrides DialogContent's
// default `tw:grid`; the rest override its centered rounded card so the gate covers the whole app.
const FULL_SCREEN_CONTENT =
  'tw:fixed tw:inset-0 tw:top-0 tw:start-0 tw:block tw:h-screen tw:w-screen tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:rtl:translate-x-0 tw:translate-y-0 tw:gap-0 tw:overflow-auto tw:rounded-none tw:bg-background tw:p-0 tw:ring-0';

/**
 * How long the gate can sit in `loading` before it reveals a "continue without setup" escape
 * beneath the spinner. Registration probing retries a slow/starting provider for tens of seconds
 * (see resolveRegistrationValidity), so without this the user has no way out until it finally
 * fails. One full probe attempt: long enough not to tempt a bail during the usual fast resolve,
 * short enough that a genuinely-stuck startup isn't a dead end. Derived from the probe timeout so
 * retuning that bound keeps the two in sync automatically.
 */
const REGISTRATION_SLOW_REVEAL_MS = REGISTRATION_RESOLVE_TIMEOUT_MS;

/**
 * The "continue without finishing setup" escape hatch, shared by the loading watchdog and the error
 * screen so the label, the `continueWithoutRegistration` handler, and any focus wiring live in one
 * place and can't drift apart. `variant` differs by context: a prominent `outline` when it is the
 * only action on the slow-loading screen, quiet `ghost` beside the error screen's filled Retry.
 * Forwards its ref so a caller can move focus to it on reveal.
 */
const ContinueWithoutSetupButton = forwardRef<
  HTMLButtonElement,
  { label: string; variant: 'ghost' | 'outline' }
>(function ContinueWithoutSetupButton({ label, variant }, ref) {
  return (
    <Button ref={ref} variant={variant} onClick={() => continueWithoutRegistration()}>
      {label}
    </Button>
  );
});

/**
 * Inner gate component. Only mounts when the wizard is active, so the localization subscription
 * only runs while the gate is actually showing (not for the app's lifetime after onboarding).
 */
export function FirstRunGate({
  status,
  stepComponents,
  slowRevealMs = REGISTRATION_SLOW_REVEAL_MS,
}: {
  status: Exclude<FirstRunStatus, { kind: 'app' }>;
  /** Optional step-body overrides forwarded to the shell (e.g. demo/testing screens). */
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
  /** Delay before the loading state reveals the escape hatch. Overridable for tests/stories. */
  slowRevealMs?: number;
}) {
  const [strings] = useLocalizedStrings(KEYS);

  // Reveal the escape hatch once loading has run long enough (see REGISTRATION_SLOW_REVEAL_MS).
  // Re-armed per loading entry and torn down on unmount / when loading ends, so it never fires late
  // against a stale state.
  const [loadingIsSlow, setLoadingIsSlow] = useState(false);
  useEffect(() => {
    if (status.kind !== 'loading') {
      setLoadingIsSlow(false);
      return undefined;
    }
    const timer = setTimeout(() => setLoadingIsSlow(true), slowRevealMs);
    return () => clearTimeout(timer);
  }, [status.kind, slowRevealMs]);

  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  // Same null-init requirement for the loading watchdog's escape-hatch focus target.
  // eslint-disable-next-line no-null/no-null
  const slowContinueButtonRef = useRef<HTMLButtonElement>(null);

  // The gate opens in `loading` (no focusable element), so Radix parks focus on the DialogContent
  // container and does NOT re-run mount-autofocus when status flips loading→error in the same open
  // Dialog. Move focus to Retry ourselves when the error state mounts so keyboard/screen-reader
  // users land on the primary action rather than having to hunt for it — unless the user has already
  // tabbed to a control in the gate (e.g. they were reaching for the escape hatch when the flip
  // landed), in which case yanking focus away would be hostile. Focus is trapped inside this modal,
  // so any focused button is one of the gate's own controls.
  useEffect(() => {
    if (status.kind !== 'error') return;
    const active = document.activeElement;
    const alreadyOnGateControl = active instanceof HTMLElement && active.tagName === 'BUTTON';
    if (!alreadyOnGateControl) retryButtonRef.current?.focus();
  }, [status.kind]);

  // Mirror the error screen's focus treatment for the loading watchdog: when the escape hatch
  // reveals, move focus to it so keyboard and screen-reader users are taken to the newly-actionable
  // control instead of having to guess it appeared. Its aria-live container also announces it once.
  useEffect(() => {
    if (loadingIsSlow) slowContinueButtonRef.current?.focus();
  }, [loadingIsSlow]);

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
        data-testid="first-run-dialog"
        showCloseButton={false}
        className={FULL_SCREEN_CONTENT}
        style={{ zIndex: Z_INDEX_FIRST_RUN }}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <VisuallyHidden.Root asChild>
          <DialogTitle>{formatReplacementString(strings['%firstRun_title%'], strings)}</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <DialogDescription>
            {formatReplacementString(strings['%firstRun_description%'], strings)}
          </DialogDescription>
        </VisuallyHidden.Root>

        {status.kind === 'loading' && (
          // `relative` + a centered spinner group and a bottom-anchored escape region: revealing the
          // escape hatch changes nothing in the centered flow, so the spinner never jumps upward
          // when it appears. `p-8` matches the error screen so neither the copy nor the escape block
          // presses against the edges in a narrow window (longer in es/fr).
          <div className="tw:relative tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:p-8">
            <div role="status" className="tw:flex tw:flex-col tw:items-center tw:gap-3">
              <Spinner />
              <p className="tw:text-sm tw:font-medium">{strings['%firstRun_loading%']}</p>
              <p className="tw:text-xs tw:text-muted-foreground">
                {strings['%firstRun_loading_detail%']}
              </p>
            </div>
            {/* Escape hatch once probing runs long (see REGISTRATION_SLOW_REVEAL_MS).
                continueWithoutRegistration supersedes the in-flight resolution so its late result
                can't reopen the gate. Anchored to the bottom (out of the centered flow) so its
                reveal doesn't shove the spinner, and wrapped in its own aria-live="polite" region —
                separate from the spinner's role="status" — so a screen reader announces the escape
                once when it appears without re-reading the spinner copy above. */}
            <div
              aria-live="polite"
              className="tw:absolute tw:inset-x-0 tw:bottom-8 tw:flex tw:flex-col tw:items-center tw:gap-2 tw:px-8 tw:text-center"
            >
              {loadingIsSlow && (
                <>
                  <p className="tw:max-w-md tw:text-xs tw:text-muted-foreground">
                    {strings['%firstRun_loading_slow%']}
                  </p>
                  <ContinueWithoutSetupButton
                    ref={slowContinueButtonRef}
                    variant="outline"
                    label={strings['%firstRun_button_continueWithoutFinishingSetup%']}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {status.kind === 'error' && (
          <div
            role="alert"
            className="tw:mx-auto tw:flex tw:max-w-md tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center"
          >
            <h1 className="tw:text-lg tw:font-medium">{strings['%firstRun_error_title%']}</h1>
            <p className="tw:text-sm tw:text-muted-foreground">
              {formatReplacementString(
                strings['%firstRun_error_body_providerStartingUp%'],
                strings,
              )}
            </p>
            <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-2">
              <Button ref={retryButtonRef} onClick={() => retryFirstRunResolution()}>
                {strings['%firstRun_button_retry%']}
              </Button>
              {/* Escape hatch: enter the app without registration so a down backend can't fully lock
                  the user out. Persists no completion, so the wizard returns next launch. `ghost`
                  here (not the loading screen's `outline`) since it's the lesser option beside the
                  filled Retry. */}
              <ContinueWithoutSetupButton
                variant="ghost"
                label={strings['%firstRun_button_continueWithoutFinishingSetup%']}
              />
            </div>
          </div>
        )}

        {status.kind === 'wizard' && (
          <FirstRunShell
            entryStep={status.step}
            stepComponents={stepComponents}
            allowContinueWithoutRegistration={status.allowContinueWithoutRegistration}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Non-dismissable, app-gating overlay for the first-run wizard. Renders nothing once first run is
 * complete. Delegates to {@link FirstRunGate} so the localization subscription only runs while
 * gating is active.
 */
export function FirstRunOverlay({
  stepComponents,
}: {
  /** Optional step-body overrides forwarded to the shell (e.g. demo/testing screens). */
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
} = {}) {
  // useSyncExternalStore re-reads on subscribe, so a status change emitted between the initial
  // render and the subscription cannot be missed (unlike a manual useState + useEffect).
  const status = useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus);

  if (status.kind === 'app') return undefined;

  return <FirstRunGate status={status} stepComponents={stepComponents} />;
}

export default FirstRunOverlay;
