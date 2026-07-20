import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
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
import { LocalizeKey } from 'platform-bible-utils';
import { ComponentType, useCallback, useEffect, useState } from 'react';
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
          <DialogTitle>{strings['%firstRun_title%']}</DialogTitle>
        </VisuallyHidden.Root>
        <VisuallyHidden.Root asChild>
          <DialogDescription>{strings['%firstRun_description%']}</DialogDescription>
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
              {strings['%firstRun_error_body%']}
            </p>
            <Button onClick={() => retryFirstRunResolution()}>
              {strings['%firstRun_button_retry%']}
            </Button>
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
  const [status, setStatus] = useState(getFirstRunStatus);
  const syncState = useCallback(() => setStatus(getFirstRunStatus()), []);

  useEffect(() => {
    syncState();
    return subscribeToFirstRun(syncState);
  }, [syncState]);

  if (status.kind === 'app') return undefined;

  return <FirstRunGate status={status} stepComponents={stepComponents} />;
}

export default FirstRunOverlay;
