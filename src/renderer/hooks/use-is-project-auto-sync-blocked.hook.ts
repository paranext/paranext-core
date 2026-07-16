import {
  isProjectBlocked,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { useCallback, useSyncExternalStore } from 'react';

/** Subscribe function for {@link useSyncExternalStore} — module-level so its identity is stable. */
function subscribe(onStoreChange: () => void): () => void {
  return subscribeToAutoSyncBlocking(onStoreChange);
}

/**
 * Returns whether the given project's edits are currently blocked by an automatic (scheduled or
 * session) Send/Receive (PT-4214 Stage U), updating reactively as the auto-sync-blocking store's
 * visible set changes. An `undefined` project id is never blocked.
 *
 * Uses `useSyncExternalStore`, which re-reads the current value when it subscribes — a
 * block/unblock emitted between the initial render and the subscription cannot be missed. The
 * snapshot is a primitive boolean (compared by value), so it never triggers the infinite-loop
 * guard.
 */
export function useIsProjectAutoSyncBlocked(projectId: string | undefined): boolean {
  const getSnapshot = useCallback(() => isProjectBlocked(projectId), [projectId]);
  return useSyncExternalStore(subscribe, getSnapshot);
}

export default useIsProjectAutoSyncBlocked;
