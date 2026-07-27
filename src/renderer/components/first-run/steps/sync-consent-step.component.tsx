import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { Button, Spinner } from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';
import { WizardStepForm } from '../wizard-step-form.component';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_step_syncConsent_heading%',
  '%firstRun_step_syncConsent_body%',
  '%firstRun_button_back%',
  '%firstRun_button_skipSync%',
  '%firstRun_button_sync%',
];

const defaultSyncFn = (): Promise<void> =>
  sendCommand('paratextBibleSendReceive.syncProjects', undefined);

/**
 * Sync consent wizard step. Presents "Sync" and "Skip automatic sync" options.
 *
 * "Sync" fires `paratextBibleSendReceive.syncProjects` (all projects — all-or-nothing per PT-4261)
 * and then advances via `onNext`. The sync progress interstitial (PT-4179) shows while sync runs.
 *
 * "Skip automatic sync" calls `onSkip`, which marks `platform.suppressStartupSync = true` so the
 * main-process startup sync gate skips auto-sync permanently. The app then opens in simple mode
 * with no synced projects; since the simple layout expects at least one project in the editor, the
 * empty-state UI (e.g. a prompt to open or download a project) must handle this gracefully — that
 * shell concern is tracked separately.
 *
 * `onSync` is injectable for Storybook and unit-test isolation. Production callers omit it and the
 * component defaults to the live `syncProjects` command.
 */
export function SyncConsentStep({
  onNext,
  onBack,
  onSkip,
  onSync = defaultSyncFn,
}: FirstRunStepProps & { onSync?: () => Promise<void> }) {
  const [strings] = useLocalizedStrings(KEYS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

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
      backButton={
        onBack && (
          <Button variant="outline" onClick={onBack} disabled={isSyncing}>
            {strings['%firstRun_button_back%']}
          </Button>
        )
      }
      secondaryButton={
        !isSyncing && onSkip ? (
          <Button variant="ghost" onClick={onSkip}>
            {strings['%firstRun_button_skipSync%']}
          </Button>
        ) : undefined
      }
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

export default SyncConsentStep;
