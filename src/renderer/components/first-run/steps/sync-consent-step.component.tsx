import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { Button, Spinner } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useState } from 'react';
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

  // Tell the shell to show a Skip button and hide its generic Next button.
  useEffect(() => {
    setCanSkip?.(true);
  }, [setCanSkip]);
  useEffect(() => {
    setCanProceed?.(undefined);
  }, [setCanProceed]);

  const handleSync = async () => {
    setError('');
    setIsSyncing(true);
    try {
      await onSync();
      onNext();
    } catch (e) {
      setError(getErrorMessage(e));
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
      <p>{strings['%firstRun_step_syncConsent_body%']}</p>
    </WizardStepForm>
  );
}

export { SyncConsentStep };
export default SyncConsentStep;
