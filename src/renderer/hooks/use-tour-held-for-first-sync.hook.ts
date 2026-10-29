import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { getFirstRunStatus, subscribeToFirstRun } from '@renderer/services/first-run-store';
import { sendCommand } from '@shared/services/command.service';

/**
 * Whether the onboarding tour should wait for the user's first Send/Receive: `true` while the first
 * sync is pending (`platform.firstSyncState` is `'pending'`) and Send/Receive is not known to be
 * unavailable. The setting is subscribed to, so the hold lifts the moment the backend records the
 * first sync.
 *
 * Holds conservatively. While the setting is loading, or while availability is unanswered, a user
 * who may be pending stays held; only a definite "not available" releases a pending user. The
 * availability command can reject before the backend registers it, so it is asked again once the
 * first-run status reaches `app` — by then the backend is up, and a rejection from that second ask
 * counts as "not available" rather than holding the tour forever.
 */
export function useTourHeldForFirstSync(): boolean {
  const [firstSyncState, , , isSettingLoading] = useSetting('platform.firstSyncState', 'unknown');
  const isPending = firstSyncState === 'pending';
  const isBackendUp = useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus).kind === 'app';
  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!isPending) return undefined;
    let isCurrent = true;
    sendCommand('paratextBibleSendReceive.isAvailable')
      .then((available) => {
        if (isCurrent) setIsSendReceiveAvailable(available === true);
        return undefined;
      })
      .catch(() => {
        if (isCurrent) setIsSendReceiveAvailable(isBackendUp ? false : undefined);
      });
    return () => {
      isCurrent = false;
    };
  }, [isPending, isBackendUp]);

  return (isSettingLoading || isPending) && isSendReceiveAvailable !== false;
}

export default useTourHeldForFirstSync;
