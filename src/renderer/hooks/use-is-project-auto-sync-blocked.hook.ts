import {
  isProjectBlocked,
  subscribeToAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { useCallback, useSyncExternalStore } from 'react';

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
  // `subscribeToAutoSyncBlocking` already matches the `useSyncExternalStore` subscribe signature and
  // is a stable module-level reference, so it can be passed directly (no wrapper needed).
  return useSyncExternalStore(subscribeToAutoSyncBlocking, getSnapshot);
}

export default useIsProjectAutoSyncBlocked;
