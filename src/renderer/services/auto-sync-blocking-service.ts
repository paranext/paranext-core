import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent, requestNoRetry } from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';
import { getErrorMessage, isString } from 'platform-bible-utils';
import { setBlockedProjects } from './auto-sync-blocking-store';

/**
 * Backend-authoritative snapshot of which projects an automatic Send/Receive is blocking edits on.
 * Carried identically by both the change event and the init-consult command (see the C#
 * `SendReceiveBlockState`). `isBlocking` false always pairs with an empty `projectIds`.
 */
type SyncWriteLockSnapshot = { isBlocking: boolean; projectIds: string[] };

// Backend-authoritative network event: the C# write gate emits a full snapshot on every arm/disarm,
// for ALL sync types (manual + scheduled + session). This is the single signal source for blocking
// — the store never combines it with any other opinion. Only fires in Paratext 10 Studio builds
// where the patch arms the gate; plain Platform.Bible never emits it.
const SYNC_WRITE_LOCK_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncWriteLockChanged';

/**
 * Command served by the C# backend (the emitter of {@link SYNC_WRITE_LOCK_CHANGED_EVENT}) returning
 * the current {@link SyncWriteLockSnapshot}, so this service can seed the store on init instead of
 * assuming unblocked. Requested untyped (the same pattern as `paratextBibleSendReceive.cancelSync`
 * in shutdown-tasks) because the copied `paratext-bible-send-receive.d.ts` command contract does
 * not declare it. Served on Paratext 10 Studio (returns not-blocking on plain Platform.Bible);
 * older cores lack it entirely and the request rejects, leaving the assume-unblocked default.
 */
const GET_AUTO_SYNC_BLOCKING_COMMAND = 'paratextBibleSendReceive.getAutoSyncBlocking';

/**
 * Subscribes to the backend write-gate change event and drives the auto-sync-blocking store. Call
 * once at app startup. Returns a cleanup function.
 *
 * On init it also queries the backend's current snapshot (best effort — see
 * {@link GET_AUTO_SYNC_BLOCKING_COMMAND}) and seeds the store from it, so a renderer reload during
 * an in-flight sync does not come up unblocked while the backend is still syncing (the change event
 * was emitted before this subscription existed). Any live event wins over the (possibly stale)
 * snapshot. Malformed payloads and a rejected consult both fail safe to assume-unblocked, so a
 * broken or absent signal can never leave editors stuck read-only.
 */
export function initAutoSyncBlockingService(): () => void {
  let hasReceivedEvent = false;
  let isDisposed = false;
  let hasWarnedMalformed = false;

  /**
   * Extracts the project ids to block from an untrusted snapshot payload. A well-formed
   * not-blocking snapshot yields `[]`; a malformed/missing-field payload also yields `[]`
   * (fail-safe assume-unblocked) and warns once per service lifetime, consistent with the
   * assume-unblocked init philosophy — a broken signal must never leave the workspace blocked.
   */
  const readBlockedProjectIds = (payload: unknown): string[] => {
    if (
      typeof payload === 'object' &&
      payload &&
      'isBlocking' in payload &&
      'projectIds' in payload
    ) {
      const { isBlocking, projectIds } = payload;
      if (typeof isBlocking === 'boolean' && Array.isArray(projectIds)) {
        const stringIds = projectIds.filter(isString);
        if (stringIds.length === projectIds.length) return isBlocking ? stringIds : [];
      }
    }
    if (!hasWarnedMalformed) {
      hasWarnedMalformed = true;
      logger.warn(
        `auto-sync blocking service received a malformed ${SYNC_WRITE_LOCK_CHANGED_EVENT} snapshot; assuming not blocking`,
      );
    }
    return [];
  };

  const unsubscribe = getNetworkEvent<SyncWriteLockSnapshot>(SYNC_WRITE_LOCK_CHANGED_EVENT)((
    event,
  ) => {
    hasReceivedEvent = true;
    setBlockedProjects(readBlockedProjectIds(event));
  });

  // LIMITATION: this init consult is the only backend re-seed — there is no re-query on websocket
  // reconnect, C# data-provider restart, or editor mount. So if a disarm is ever lost (a faulted
  // fire-and-forget SendEventAsync, an off-contract raise reorder, or a provider that restarts
  // disarmed without re-emitting), the visible blocked set stays stale until the next real
  // transition or a full renderer reload. Closing that gap needs an editor-mount re-query, tracked
  // on PT-4214; until that lands, this one-shot seed is the only recovery.
  (async () => {
    try {
      const snapshot = await requestNoRetry<[], unknown>(
        serializeRequestType(CATEGORY_COMMAND, GET_AUTO_SYNC_BLOCKING_COMMAND),
      );
      // Only seed if nothing live has spoken: an event that arrived while the request was in flight
      // (either direction) supersedes this snapshot and must win, so we never clobber it here.
      if (!hasReceivedEvent && !isDisposed) {
        const blockedProjectIds = readBlockedProjectIds(snapshot);
        if (blockedProjectIds.length > 0) setBlockedProjects(blockedProjectIds);
      }
    } catch (e) {
      // Command not served (older core) or the extension is absent — keep the assume-unblocked
      // default. Debug, not warn: this is the expected path on plain Platform.Bible and older cores.
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
