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
  '%firstRun_button_dontSyncYet%',
  '%firstRun_button_back%',
  '%firstRun_step_syncProgress_heading%',
];

// Demo/UX mode: resolve immediately without touching the real S/R backend so the wizard
// is fully click-through-able end-to-end (see first-run-store.ts isDemoMode).
const defaultSyncFn = (): Promise<void> =>
  isDemoMode()
    ? Promise.resolve()
    : sendCommand('paratextBibleSendReceive.syncProjects', undefined);

/**
 * Sync consent wizard step. Renders its own footer: Back on the left, and "Don't sync yet" beside
 * the primary "Sync" on the right, so declining reads as a peer choice rather than an afterthought.
 * "Sync" runs `paratextBibleSendReceive.syncProjects` then calls `onNext`. "Don't sync yet" calls
 * the shell-supplied `onSkip`, which withholds automatic sync for the rest of the session and
 * finishes the wizard.
 *
 * On mount the step calls `setCanSkip(true)` so the shell supplies `onSkip`,
 * `setCanProceed(undefined)` to hide the shell's generic Next/Finish, and
 * `setManagesOwnFooter(true)` so the shell does not stack its own footer beneath this one. "Don't
 * sync yet" is withdrawn while a sync is in flight, and the footer is disabled while the shell is
 * busy finishing the wizard.
 *
 * `onSync` is injectable for Storybook and unit-test isolation.
 */
function SyncConsentStep({
  onNext,
  onBack,
  onSkip,
  setCanProceed,
  setCanSkip,
  setManagesOwnFooter,
  isBusy = false,
  onSync = defaultSyncFn,
}: FirstRunStepProps & { onSync?: () => Promise<void> }) {
  const [strings] = useLocalizedStrings(KEYS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState('');

  // useEffect (async) is fine here — a brief delay before "Don't sync yet" appears is harmless.
  useEffect(() => {
    setCanSkip?.(true);
  }, [setCanSkip]);
  // Before the first paint, so the shell's own footer never flashes beneath this one.
  useLayoutEffect(() => {
    setCanProceed?.(undefined);
    setManagesOwnFooter?.(true);
  }, [setCanProceed, setManagesOwnFooter]);

  const handleSync = async () => {
    setError('');
    setCanSkip?.(false); // withdraw the decline while the sync is in flight
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
      backButton={
        onBack && (
          <Button variant="outline" onClick={onBack} disabled={isBusy}>
            {strings['%firstRun_button_back%']}
          </Button>
        )
      }
      primaryButton={
        <div className="tw:flex tw:gap-2">
          {onSkip && !isSyncing && (
            <Button variant="outline" onClick={onSkip} disabled={isBusy}>
              {strings['%firstRun_button_dontSyncYet%']}
            </Button>
          )}
          <Button onClick={handleSync} disabled={isSyncing || isBusy}>
            {isSyncing && <Spinner />}
            {strings['%firstRun_button_sync%']}
          </Button>
        </div>
      }
    >
      <p className="tw:text-sm tw:text-muted-foreground">
        {strings['%firstRun_step_syncConsent_body%']}
      </p>
      {/* Otherwise the in-flight sync is visible only as the button's spinner. */}
      <p className="tw:sr-only" aria-live="polite">
        {isSyncing ? strings['%firstRun_step_syncProgress_heading%'] : ''}
      </p>
    </WizardStepForm>
  );
}

export { SyncConsentStep };
export default SyncConsentStep;
