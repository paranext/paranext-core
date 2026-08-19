import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { isDemoMode } from '@renderer/services/first-run-store';
import { sendCommand } from '@shared/services/command.service';
import { Button, Spinner } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useLayoutEffect, useState } from 'react';
import { WizardStepForm } from '../wizard-step-form.component';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_step_syncConsent_heading%',
  '%firstRun_step_syncConsent_body%',
  '%firstRun_button_sync%',
];

// Demo/UX mode: resolve immediately without touching the real S/R backend so the wizard
// is fully click-through-able end-to-end (see first-run-store.ts isDemoMode).
const defaultSyncFn = (): Promise<void> =>
  isDemoMode()
    ? Promise.resolve()
    : sendCommand('paratextBibleSendReceive.syncProjects', undefined);

/**
 * Sync consent wizard step. Presents "Sync" as the primary action; skip is surfaced by the shell
 * footer (signalled via `setCanSkip(true)`). Advancing via "Sync" runs
 * `paratextBibleSendReceive.syncProjects` then calls `onNext`.
 *
 * `setCanProceed(undefined)` hides the shell's generic Next/Finish button — this step owns its
 * primary action (Sync). `setCanSkip(true)` tells the shell to show its "Don't sync yet" button,
 * which calls `completeFirstRun()` — a wizard-scoped deferral that leaves startup auto-sync on for
 * later launches. The shell's `isBusy` guard disables it while any async action is in flight.
 *
 * `onSync` is injectable for Storybook and unit-test isolation.
 */
function SyncConsentStep({
  onNext,
  setCanProceed,
  setCanSkip,
  onSync = defaultSyncFn,
}: FirstRunStepProps & { onSync?: () => Promise<void> }) {
  const [strings] = useLocalizedStrings(KEYS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

  // Tell the shell to show its "Don't sync yet" button. useEffect (async) is fine — a brief delay
  // appears is harmless.
  useEffect(() => {
    setCanSkip?.(true);
  }, [setCanSkip]);
  // Hide the shell's generic Next/Finish button — this step owns its primary action (Sync).
  // The shell footer still renders "Don't sync yet" (and Back if applicable) — the shell's isBusy
  // guard is responsible for disabling it while an async action is in flight.
  useLayoutEffect(() => {
    setCanProceed?.(undefined);
  }, [setCanProceed]);

  const handleSync = async () => {
    setError('');
    setCanSkip?.(false); // hide the decline button while the sync is in flight
    setIsSyncing(true);
    try {
      await onSync();
      onNext();
    } catch (e) {
      setError(getErrorMessage(e));
      setCanSkip?.(true); // restore it so the user can still decline after a failed sync
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <WizardStepForm
      heading={strings['%firstRun_step_syncConsent_heading%']}
      error={error}
      primaryButton={
        <Button onClick={handleSync} disabled={isSyncing}>
          {isSyncing && <Spinner />}
          {strings['%firstRun_button_sync%']}
        </Button>
      }
    >
      <p className="tw:text-sm tw:text-muted-foreground">
        {strings['%firstRun_step_syncConsent_body%']}
      </p>
    </WizardStepForm>
  );
}

export { SyncConsentStep };
export default SyncConsentStep;
