import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent, requestNoRetry } from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage } from 'platform-bible-utils';
import { setAutoSyncBlocking } from './auto-sync-blocking-store';

// String value must match the event emitted by the Send/Receive extension. The extension emits it
// only around scheduled (unattended) syncs — the surface that blocks the workspace. Manual syncs
// (driven from the Send/Receive dialog, which has its own progress and Cancel) never raise it.
// `true` raises a block, `false` clears one; the store ref-counts so nested raises don't clear
// early.
const AUTO_SYNC_BLOCKING_CHANGED_EVENT = 'paratextBibleSendReceive.onAutoSyncBlockingChanged';

/**
 * Command on the Send/Receive extension (the emitter of {@link AUTO_SYNC_BLOCKING_CHANGED_EVENT})
 * that reports whether a scheduled sync is currently blocking, so this service can seed the store
 * on init instead of assuming unblocked. Requested untyped (the same pattern as
 * `paratextBibleSendReceive.cancelSync` in shutdown-tasks) because the copied
 * `paratext-bible-send-receive.d.ts` command contract does not declare it; registering the command
 * on the extension side (and declaring it in the contract) is tracked in PT-4214. Until then the
 * request rejects and init keeps the assume-unblocked default — exactly the pre-seeding behavior.
 */
const GET_AUTO_SYNC_BLOCKING_COMMAND = 'paratextBibleSendReceive.getAutoSyncBlocking';

/**
 * Subscribes to the auto-sync blocking network event and drives the auto-sync-blocking store. Call
 * once at app startup. Returns a cleanup function.
 *
 * On init it also queries the emitter's current blocking state (best effort — see
 * {@link GET_AUTO_SYNC_BLOCKING_COMMAND}) and seeds the store from it, so a renderer reload during
 * an in-flight scheduled sync does not come up unblocked while the backend is still syncing (the
 * raise event was emitted before this subscription existed). Any live event wins over the (possibly
 * stale) snapshot, and the store's per-blocker safety leash bounds a seeded block whose clearing
 * event never arrives.
 */
export function initAutoSyncBlockingService(): () => void {
  let hasReceivedEvent = false;
  let isDisposed = false;

  const unsubscribe = getNetworkEvent<{ isBlocking: boolean }>(AUTO_SYNC_BLOCKING_CHANGED_EVENT)(({
    isBlocking,
  }) => {
    hasReceivedEvent = true;
    setAutoSyncBlocking(isBlocking);
  });

  (async () => {
    try {
      const isBlocking = await requestNoRetry<[], unknown>(
        serializeRequestType(CATEGORY_COMMAND, GET_AUTO_SYNC_BLOCKING_COMMAND),
      );
      // Only seed if nothing live has spoken: an event that arrived while the request was in
      // flight (either direction) supersedes this snapshot, and seeding after it could double
      // count the same sync's raise.
      if (isBlocking === true && !hasReceivedEvent && !isDisposed) setAutoSyncBlocking(true);
    } catch (e) {
      // Extension absent or command not registered (see GET_AUTO_SYNC_BLOCKING_COMMAND) — keep the
      // assume-unblocked default. Debug, not warn: this is the expected path on plain
      // Platform.Bible and, until PT-4214 lands, on Paratext 10 Studio too.
      logger.debug(
        `auto-sync blocking service could not read the initial blocking state: ${getErrorMessage(e)}`,
      );
    }
  })();

  return () => {
    isDisposed = true;
    unsubscribe();
  };
}
