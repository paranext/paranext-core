import { getNetworkEvent } from '@shared/services/network.service';
import { setAutoSyncBlocking } from './auto-sync-blocking-store';

// String value must match the event emitted by the Send/Receive extension. The extension emits it
// only around scheduled (unattended) syncs — the surface that blocks the workspace. Manual syncs
// (driven from the Send/Receive dialog, which has its own progress and Cancel) never raise it.
// `true` raises a block, `false` clears one; the store ref-counts so nested raises don't clear
// early.
const AUTO_SYNC_BLOCKING_CHANGED_EVENT = 'paratextBibleSendReceive.onAutoSyncBlockingChanged';

/**
 * Subscribes to the auto-sync blocking network event and drives the auto-sync-blocking store. Call
 * once at app startup. Returns a cleanup function.
 */
export function initAutoSyncBlockingService(): () => void {
  return getNetworkEvent<{ isBlocking: boolean }>(AUTO_SYNC_BLOCKING_CHANGED_EVENT)(
    ({ isBlocking }) => setAutoSyncBlocking(isBlocking),
  );
}
