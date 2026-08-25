import { getNetworkEvent } from '@shared/services/network.service';
import { useEvent } from 'platform-bible-react';
import type { SyncActivitySnapshot } from 'paratext-bible-send-receive';
import { useCallback, useMemo, useState } from 'react';

/**
 * Whether the backend currently reports a Send/Receive run in progress.
 *
 * Deliberately the cheapest possible read of that signal: it subscribes to
 * `paratextBibleSendReceive.onSyncActivityChanged` and nothing else — no pull command, no seed
 * retries, no availability probing. In a build with no Send/Receive backend the event simply never
 * fires and this stays `false`, at the cost of one subscription.
 *
 * That cheapness is the point. {@link useSyncStatus} answers the same question far better (it seeds
 * on mount, unions the extension's claim with the backend signal, and tracks outcomes), but it is
 * expensive enough that the toolbar only mounts its consumer once Send/Receive looks present. This
 * hook exists for the decision _upstream_ of that: whether to mount the indicator at all. Without
 * it, a settled "Send/Receive is not available" answer hides the indicator even while the backend
 * is genuinely mid-sync — which is exactly when the user most needs to see one.
 *
 * Returns `false` until an event says otherwise, so it can only ever cause the indicator to be
 * shown, never to be hidden.
 */
export function useBackendSyncActivity(): boolean {
  const [isBackendSyncing, setIsBackendSyncing] = useState(false);

  const handleSyncActivityChanged = useCallback((activity: SyncActivitySnapshot) => {
    // Defensive: the payload crosses a process boundary from C#, and a malformed one must not be
    // coerced into `true` by truthiness.
    setIsBackendSyncing(activity?.isSyncing === true);
  }, []);

  const onSyncActivityChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncActivityChanged'),
    [],
  );
  useEvent(onSyncActivityChanged, handleSyncActivityChanged);

  return isBackendSyncing;
}
