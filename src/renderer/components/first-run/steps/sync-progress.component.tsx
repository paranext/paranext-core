import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEvent, Spinner } from 'platform-bible-react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { getNetworkEvent } from '@shared/services/network.service';
import type { SyncProgressDetail, SyncProgressEvent } from 'paratext-bible-send-receive';
import { LocalizeKey } from 'platform-bible-utils';
import { FirstRunStepProps } from '../first-run-step-props.model';

const KEYS: LocalizeKey[] = [
  '%firstRun_step_syncProgress_heading%',
  '%firstRun_step_syncProgress_body%',
  '%firstRun_step_syncProgress_complete_heading%',
  '%firstRun_step_syncProgress_complete_body%',
];

/**
 * Sync progress wizard step (PT-4179). Subscribes to S/R live-progress events and enables the
 * Finish button only after observing a full sync cycle (isSyncing: true → isSyncing: false).
 *
 * Assumption: sync is already in flight when this step mounts. The Sync consent step (PT-4178) is
 * responsible for calling `paratextBibleSendReceive.syncProjects` before it calls `onNext()` to
 * advance here. If that call is absent or sync finishes before this step mounts, the Finish button
 * stays disabled permanently — the event stream is fire-and-forget with no sync-state query API.
 * This is a known limitation; PT-4180 may surface a query API once the per-project contract is
 * confirmed.
 *
 * PT-4219 (demo mode) replaces this component entirely via the shell's stepComponents injection.
 */
export function SyncProgressStep({ setCanProceed }: FirstRunStepProps) {
  const [strings] = useLocalizedStrings(KEYS);
  const [progressText, setProgressText] = useState('');
  const [progressValue, setProgressValue] = useState<number | undefined>(undefined);
  const [syncComplete, setSyncComplete] = useState(false);
  // Ref (not state) so the handler callback stays stable without re-creating on every state change.
  const hasSyncStartedRef = useRef(false);

  // Gate the shell's Finish button: disabled while syncing, enabled on completion.
  useEffect(() => {
    setCanProceed?.(syncComplete);
  }, [syncComplete, setCanProceed]);

  const onSyncStateChangedEvent = useMemo(
    () => getNetworkEvent<SyncProgressEvent>('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  const onSyncProgressEvent = useMemo(
    () => getNetworkEvent<SyncProgressDetail>('paratextBibleSendReceive.onSyncProgress'),
    [],
  );

  const handleSyncStateChanged = useCallback(({ isSyncing }: SyncProgressEvent) => {
    if (isSyncing) {
      hasSyncStartedRef.current = true;
    } else if (hasSyncStartedRef.current) {
      // Only mark complete on isSyncing: false AFTER seeing isSyncing: true. Prevents a stale
      // isSyncing: false event (emitted before this step mounted) from prematurely enabling Finish.
      setSyncComplete(true);
    }
  }, []);

  const handleSyncProgress = useCallback(
    ({ progressText: text, progressValue: value }: SyncProgressDetail) => {
      setProgressText(text);
      setProgressValue(value ?? undefined);
    },
    [],
  );

  useEvent(onSyncStateChangedEvent, handleSyncStateChanged);
  useEvent(onSyncProgressEvent, handleSyncProgress);

  if (syncComplete) {
    return (
      <div className="tw:flex tw:flex-col tw:gap-2">
        <h2 className="tw:text-base tw:font-medium">
          {strings['%firstRun_step_syncProgress_complete_heading%']}
        </h2>
        <p className="tw:text-sm tw:text-muted-foreground">
          {strings['%firstRun_step_syncProgress_complete_body%']}
        </p>
      </div>
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <h2 className="tw:text-base tw:font-medium">
        {strings['%firstRun_step_syncProgress_heading%']}
      </h2>
      <p className="tw:text-sm tw:text-muted-foreground">
        {strings['%firstRun_step_syncProgress_body%']}
      </p>
      {progressText && (
        <div className="tw:mt-2 tw:flex tw:flex-col tw:gap-1">
          {progressValue !== undefined ? (
            // Determinate: progressText is the current item name (e.g. "GreekNT")
            <div
              role="progressbar"
              aria-label={strings['%firstRun_step_syncProgress_heading%']}
              aria-valuenow={Math.round(progressValue * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-secondary"
            >
              <div
                className="tw:h-full tw:bg-primary tw:transition-all"
                style={{ width: `${Math.round(progressValue * 100)}%` }}
              />
            </div>
          ) : (
            // Indeterminate: progressText is a complete localized message, show as-is with a spinner
            <Spinner />
          )}
          <p className="tw:text-xs tw:text-muted-foreground">{progressText}</p>
        </div>
      )}
      {!progressText && <Spinner />}
    </div>
  );
}

export default SyncProgressStep;
