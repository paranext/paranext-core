import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { isDemoMode } from '@renderer/services/first-run-store';
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

// Demo/UX mode: resolve immediately without touching the real S/R backend so the wizard
// is fully click-through-able end-to-end (see first-run-store.ts isDemoMode).
const defaultSyncFn = (): Promise<void> =>
  isDemoMode()
    ? Promise.resolve()
    : sendCommand('paratextBibleSendReceive.syncProjects', undefined);

/**
 * Sync consent wizard step. Presents "Sync" and "Skip automatic sync" options.
 *
 * "Sync" fires `paratextBibleSendReceive.syncProjects` (all projects — all-or-nothing per PT-4261)
 * and then advances via `onNext`. Sync runs to completion with a local button spinner; PT-4179 will
 * add a dedicated progress interstitial when it lands.
 *
 * "Skip automatic sync" calls `onSkip`, which marks `platform.suppressStartupSync = true` so the
 * main-process startup sync gate skips auto-sync permanently.
 *
 * `onSync` is injectable for Storybook and unit-test isolation.
 *
 * Known limitation: until PT-4257 implements `managesOwnFooter` support, the shell's generic footer
 * (Back/Skip/Next) is still rendered alongside this step's own WizardStepForm buttons.
 * `setCanProceed(false)` disables the shell's Next to prevent bypassing the sync decision.
 */
export function SyncConsentStep({
  onNext,
  onBack,
  onSkip,
  setCanProceed,
  onSync = defaultSyncFn,
}: FirstRunStepProps & { onSync?: () => Promise<void> }) {
  // Disable the shell's generic Next — this step manages its own navigation.
  useEffect(() => setCanProceed?.(false), [setCanProceed]);

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
