import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
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

const defaultSyncFn = (): Promise<void> =>
  sendCommand('paratextBibleSendReceive.syncProjects', undefined);

/**
 * Sync consent wizard step. Presents "Sync" as the primary action; skip is surfaced by the shell
 * footer (signalled via `setCanSkip(true)`). Advancing via "Sync" runs
 * `paratextBibleSendReceive.syncProjects` then calls `onNext`.
 *
 * `setCanProceed(undefined)` hides the shell's generic Next button — this step owns its primary
 * action (Sync). `setCanSkip(true)` tells the shell to show a Skip button in its footer, which
 * calls `completeFirstRun({ skippedStep: 'syncConsent' })`.
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

  // Tell the shell to show a Skip button. useEffect (async) is fine — a brief delay before Skip
  // appears is harmless.
  useEffect(() => {
    setCanSkip?.(true);
  }, [setCanSkip]);
  // Hide the shell's generic Next button before the first paint so it never flashes visible.
  useLayoutEffect(() => {
    setCanProceed?.(undefined);
  }, [setCanProceed]);

  const handleSync = async () => {
    setError('');
    setCanSkip?.(false); // prevent Skip while sync is in-flight
    setIsSyncing(true);
    try {
      await onSync();
      onNext();
    } catch (e) {
      setError(getErrorMessage(e));
      setCanSkip?.(true); // re-enable Skip so the user can still bail after a failed sync
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
