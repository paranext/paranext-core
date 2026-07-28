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
 * and then advances via `onNext`. Sync runs to completion with a local button spinner; PT-4179 will
 * add a dedicated progress interstitial when it lands.
 *
 * "Skip automatic sync" calls `onSkip`, which writes `platform-bible.firstRunSyncSkipped = true`
 * via `completeFirstRun({ syncSkipped: true })` so the main-process startup sync gate skips
 * auto-sync permanently.
 *
 * `onSync` is injectable for Storybook and unit-test isolation.
 *
 * The shell suppresses its own footer (Back / Skip / Next) for this step via a `step !==
 * 'syncConsent'` guard — the step manages its own navigation entirely via WizardStepForm.
 * `setCanProceed(false)` is kept as a defensive fallback in case that guard is ever removed before
 * PT-4179's generic prop-based opt-out lands.
 */
export function SyncConsentStep({
  onNext,
  onBack,
  onSkip,
  setCanProceed,
  onSync = defaultSyncFn,
}: FirstRunStepProps & { onSync?: () => Promise<void> }) {
  // Defensive: disable the shell's generic Next in case the step !== 'syncConsent' footer guard
  // in the shell is removed before PT-4179 ships a generic prop-based opt-out.
  useEffect(() => setCanProceed?.(false), [setCanProceed]);

  const [strings] = useLocalizedStrings(KEYS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

  const handleSync = async () => {
    setError('');
    setIsSyncing(true);
    try {
      await onSync();
      // Reset spinner before navigating away so the state update runs while still mounted.
      setIsSyncing(false);
      onNext();
    } catch (e) {
      setError(getErrorMessage(e));
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
          <Button variant="outline" onClick={onSkip}>
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
      <p className="tw:text-sm tw:text-muted-foreground">
        {strings['%firstRun_step_syncConsent_body%']}
      </p>
    </WizardStepForm>
  );
}

export default SyncConsentStep;
