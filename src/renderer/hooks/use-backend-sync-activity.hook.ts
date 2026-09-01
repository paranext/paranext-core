import {
  hasObservedSyncRun,
  subscribeToSyncActivity,
} from '@renderer/services/sync-activity-store';
import { useSyncExternalStore } from 'react';

/**
 * Whether the backend has reported a Send/Receive run at any point in this renderer's life.
 *
 * This answers the question _upstream_ of the sync status itself: whether to mount the sync
 * indicator at all. Without it, a settled "Send/Receive is not available" answer hides the
 * indicator even while the backend is genuinely mid-sync — which is exactly when the user most
 * needs to see one. {@link useSyncStatus} answers what the status IS; this only decides whether
 * anything is there to show it.
 *
 * STICKY, and that is the point. The live flag would unmount the indicator in the same commit the
 * sync finishes: the terminal state would never be rendered or announced, and the status hook's
 * seed loops would be torn down mid-flight. Once a sync has been seen, the surface that reports on
 * it stays for the session. So this can only ever cause the indicator to be SHOWN, never to be
 * hidden.
 *
 * The signal is seeded, not merely subscribed — see `initSyncActivityService`, which reads
 * `getSyncActivity` on startup so a sync already running when the renderer comes up is reported
 * immediately rather than at its closing transition. Reading a shared store rather than holding its
 * own subscription keeps one validator and one delivery of each snapshot for both consumers, and
 * keeps a sync tick from re-rendering the whole toolbar in Power mode, where nothing reads it.
 */
export function useBackendSyncActivity(): boolean {
  // `subscribeToSyncActivity` already matches the `useSyncExternalStore` subscribe signature and is
  // a stable module-level reference, so it can be passed directly (no wrapper needed). The snapshot
  // is a primitive boolean (compared by value), so it never triggers the infinite-loop guard.
  return useSyncExternalStore(subscribeToSyncActivity, hasObservedSyncRun);
}

export default useBackendSyncActivity;
