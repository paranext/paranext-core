import { getNetworkEvent } from '@shared/services/network.service';
import { raiseAutoSyncBlock } from './auto-sync-blocking-store';

// String value must match the event emitted by the Send/Receive extension. The extension emits it
// only around scheduled (unattended) syncs — the surface that blocks the workspace. Manual syncs
// (driven from the Send/Receive dialog, which has its own progress and Cancel) never raise it.
// `true` raises a block, `false` clears one.
const AUTO_SYNC_BLOCKING_CHANGED_EVENT = 'paratextBibleSendReceive.onAutoSyncBlockingChanged';

/**
 * Subscribes to the auto-sync blocking network event and drives the auto-sync-blocking store. Call
 * once at app startup. Returns a cleanup function.
 *
 * The event payload is an anonymous boolean, so this service pairs each `false` with the oldest
 * raise that has not yet consumed a clear. A raise whose own safety leash already fired absorbs its
 * late clear as a no-op (the store's release tokens are idempotent), so a late clear can never
 * release a newer, still-live blocker. What anonymous pairing cannot fix: a raise whose clear never
 * arrives keeps consuming later raises' clears, shifting the unmatched block onto ever-newer raises
 * — each still bounded by its own leash, but blocking can persist while syncs keep coming. The real
 * fix is identity on the wire; PT-4214 replaces this event with a backend-authoritative per-project
 * snapshot, which removes the pairing problem entirely.
 *
 * Known limitation (deliberate): this service only learns about blocking from live events, so a
 * renderer reload during an in-flight scheduled sync comes up unblocked while the backend is still
 * syncing (the raise event was emitted before this subscription existed). Seeding the initial state
 * requires a backend query that does not exist yet; PT-4214 adds a C#-served
 * `paratextBibleSendReceive.getAutoSyncBlocking` snapshot command and an init consult of it.
 */
export function initAutoSyncBlockingService(): () => void {
  // Clear functions for raises, oldest first, in raise order. A leash-released raise stays here as
  // a tombstone until its (late) clear consumes it, keeping later clears paired with later raises.
  const pendingClears: (() => void)[] = [];

  const unsubscribe = getNetworkEvent<{ isBlocking: boolean }>(AUTO_SYNC_BLOCKING_CHANGED_EVENT)(({
    isBlocking,
  }) => {
    if (isBlocking) pendingClears.push(raiseAutoSyncBlock());
    // A clear with no outstanding raise (emitted before this subscription existed) is ignored.
    else pendingClears.shift()?.();
  });

  return unsubscribe;
}
