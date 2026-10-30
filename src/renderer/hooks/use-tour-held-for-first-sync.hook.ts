import { useEffect, useState, useSyncExternalStore } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { getFirstRunStatus, subscribeToFirstRun } from '@renderer/services/first-run-store';
import { askSendReceiveAvailable } from '@renderer/services/send-receive-availability.util';
import { isPlatformError } from 'platform-bible-utils';

/**
 * Whether the onboarding tour should wait for the user's first Send/Receive: `true` while the first
 * sync is pending (`platform.firstSyncState` is `'pending'`) and Send/Receive is not known to be
 * unavailable. The setting is subscribed to, so the hold lifts the moment the backend records the
 * first sync.
 *
 * Holds conservatively. While the setting is loading or cannot be read, or while availability is
 * unanswered, a user who may be pending stays held; only a definite "not available" releases a
 * pending user. The availability command can reject before the backend registers it, so it is asked
 * again once the first-run status reaches `app`, and a rejection from then on counts as "not
 * available" rather than holding the tour forever. Reaching `app` is a proxy for the backend being
 * up, not proof: the first-run store seeds `app` from its local cache before the backend answers
 * anything when the cache says setup is complete and no first sync is pending. The store keeps that
 * cache in step with `platform.firstSyncState`, so a pending user is normally seeded to the loading
 * gate instead; only a cache that disagrees with the setting lets a cold-start rejection release
 * the hold.
 */
export function useTourHeldForFirstSync(): boolean {
  const [firstSyncState, , , isSettingLoading] = useSetting('platform.firstSyncState', 'unknown');
  // A setting that cannot be read may be hiding a pending first sync, so it counts as pending.
  const isPending = firstSyncState === 'pending' || isPlatformError(firstSyncState);
  const isFirstRunResolvedToApp =
    useSyncExternalStore(subscribeToFirstRun, getFirstRunStatus).kind === 'app';
  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!isPending) return undefined;
    let isCurrent = true;
    (async () => {
      const available = await askSendReceiveAvailable();
      if (!isCurrent) return;
      setIsSendReceiveAvailable(available ?? (isFirstRunResolvedToApp ? false : undefined));
    })();
    return () => {
      isCurrent = false;
    };
  }, [isPending, isFirstRunResolvedToApp]);

  return (isSettingLoading || isPending) && isSendReceiveAvailable !== false;
}

export default useTourHeldForFirstSync;
