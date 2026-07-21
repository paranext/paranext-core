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
import { ComponentType, useEffect, useRef, useSyncExternalStore } from 'react';
import { VisuallyHidden } from 'radix-ui';
import { FirstRunStep } from '@renderer/services/first-run.model';
import { FirstRunShell } from './first-run-shell.component';
import { FirstRunStepProps } from './first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_title%',
  '%firstRun_description%',
  '%firstRun_loading%',
  '%firstRun_loading_detail%',
  '%firstRun_error_title%',
  '%firstRun_error_body%',
  '%firstRun_button_retry%',
  '%firstRun_button_continueWithoutSetup%',
  // Referenced via {%product_name%} in the title/description/error body; formatReplacementString
  // expands it so the app name lives in one place (and swaps cleanly for P10 Studio).
  '%product_name%',
];

// Full-viewport, above the menubar, opaque, square corners. `tw:block` overrides DialogContent's
// default `tw:grid`; the rest override its centered rounded card so the gate covers the whole app.
const FULL_SCREEN_CONTENT =
  'tw:fixed tw:inset-0 tw:top-0 tw:start-0 tw:block tw:h-screen tw:w-screen tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:rtl:translate-x-0 tw:translate-y-0 tw:gap-0 tw:overflow-auto tw:rounded-none tw:bg-background tw:p-0 tw:ring-0';

/**
 * Inner gate component. Only mounts when the wizard is active, so the localization subscription
 * only runs while the gate is actually showing (not for the app's lifetime after onboarding).
 */
export function FirstRunGate({
  status,
  stepComponents,
}: {
  status: Exclude<FirstRunStatus, { kind: 'app' }>;
  /** Optional step-body overrides forwarded to the shell (e.g. PT-4219 demo screens). */
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
}) {
  const [strings] = useLocalizedStrings(KEYS);

  // The gate opens in `loading` (no focusable element), so Radix parks focus on the DialogContent
  // container and does NOT re-run mount-autofocus when status flips loading→error in the same open
  // Dialog. Move focus to Retry ourselves when the error state mounts so keyboard/screen-reader
  // users land on the primary action rather than having to hunt for it.
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const retryButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (status.kind === 'error') retryButtonRef.current?.focus();
  }, [status.kind]);

  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
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
          <div
            role="status"
            className="tw:flex tw:h-full tw:flex-col tw:items-center tw:justify-center tw:gap-3"
          >
            <Spinner />
            <p className="tw:text-sm tw:font-medium">{strings['%firstRun_loading%']}</p>
            <p className="tw:text-xs tw:text-muted-foreground">
              {strings['%firstRun_loading_detail%']}
            </p>
          </div>
        )}

        {status.kind === 'error' && (
          <div
            role="alert"
            className="tw:mx-auto tw:flex tw:max-w-md tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center"
          >
            <h1 className="tw:text-lg tw:font-medium">{strings['%firstRun_error_title%']}</h1>
            <p className="tw:text-sm tw:text-muted-foreground">
              {formatReplacementString(strings['%firstRun_error_body%'], strings)}
            </p>
            <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-2">
              <Button ref={retryButtonRef} onClick={() => retryFirstRunResolution()}>
                {strings['%firstRun_button_retry%']}
              </Button>
              {/* Escape hatch: enter the app without registration so a down backend can't fully lock
                  the user out. Persists no completion, so the wizard returns next launch. */}
              <Button variant="ghost" onClick={() => continueWithoutRegistration()}>
                {strings['%firstRun_button_continueWithoutSetup%']}
              </Button>
            </div>
          </div>
        )}

        {status.kind === 'wizard' && (
          <FirstRunShell entryStep={status.step} stepComponents={stepComponents} />
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
  /** Optional step-body overrides forwarded to the shell (e.g. PT-4219 demo screens). */
  stepComponents?: Record<FirstRunStep, ComponentType<FirstRunStepProps>>;
} = {}) {
  // useSyncExternalStore re-reads on subscribe, so a status change emitted between the initial
  // render and the subscription cannot be missed (unlike a manual useState + useEffect).
  const status = useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus);

  if (status.kind === 'app') return undefined;

  return <FirstRunGate status={status} stepComponents={stepComponents} />;
}

export default FirstRunOverlay;
