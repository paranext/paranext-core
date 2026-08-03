import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { getErrorMessage, isString } from 'platform-bible-utils';
import { setBlockedProjects } from './auto-sync-blocking-store';

// Payload types (`SyncWriteLockSnapshot`) come from the `paratext-bible-send-receive` seam
// declarations in `src/@types/paratext-bible-send-receive/index.d.ts`.

// Backend-authoritative network event (declared in the seam's `NetworkEvents`): the C# write gate
// emits a full snapshot on every arm/disarm, for ALL sync types (manual + scheduled + session).
// This is the single signal source for blocking — the store never combines it with any other
// opinion. The gate only ever arms in Paratext 10 Studio builds (the patch arms it); in plain
// Platform.Bible the only emission is a single not-blocking baseline snapshot each time the
// backend (re)starts.
const SYNC_WRITE_LOCK_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncWriteLockChanged';

/**
 * Command served by the C# backend (the emitter of {@link SYNC_WRITE_LOCK_CHANGED_EVENT}) returning
 * the current snapshot, so this service can seed the store on init instead of assuming unblocked.
 * Declared in the seam's `CommandHandlers`, so it is sent through the typed `sendCommand`. Core's
 * own backend registers it, so it is answered on plain Platform.Bible too (always not-blocking
 * there). The realistic failure is a cold-start race: the backend has not registered the command
 * within main's retry budget (~9s), the request rejects, and the assume-unblocked default stands —
 * with no re-query until PT-4265 lands.
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
  const warnedMalformedSources = new Set<string>();

  /**
   * Extracts the project ids to block from an untrusted snapshot payload. A well-formed
   * not-blocking snapshot yields `[]`; a malformed/missing-field payload also yields `[]`
   * (fail-safe assume-unblocked) and warns once per `source` per service lifetime, consistent with
   * the assume-unblocked init philosophy — a broken signal must never leave the workspace blocked.
   */
  const readBlockedProjectIds = (payload: unknown, source: string): string[] => {
    if (
      typeof payload === 'object' &&
      payload &&
      'isBlocking' in payload &&
      'projectIds' in payload
    ) {
      const { isBlocking, projectIds } = payload;
      if (
        typeof isBlocking === 'boolean' &&
        Array.isArray(projectIds) &&
        projectIds.every(isString)
      )
        return isBlocking ? projectIds : [];
    }
    if (!warnedMalformedSources.has(source)) {
      warnedMalformedSources.add(source);
      logger.warn(
        `auto-sync blocking service received a malformed snapshot from ${source}; assuming not blocking`,
      );
    }
    return [];
  };

  const unsubscribe = getNetworkEvent(SYNC_WRITE_LOCK_CHANGED_EVENT)((event) => {
    hasReceivedEvent = true;
    // `event` is typed by the seam declaration, but it is untrusted wire data — keep the runtime
    // validation.
    setBlockedProjects(readBlockedProjectIds(event, `the ${SYNC_WRITE_LOCK_CHANGED_EVENT} event`));
  });

  // LIMITATION: this init consult is the only backend re-seed — there is no re-query on websocket
  // reconnect, C# data-provider restart, or editor mount. So if a disarm is ever lost (a faulted
  // fire-and-forget SendEventAsync, an off-contract raise reorder, or a provider that restarts
  // disarmed without re-emitting), the visible blocked set stays stale until the next real
  // transition or a full renderer reload. Closing that gap needs an editor-mount re-query, tracked
  // on PT-4265; until that lands, this one-shot seed is the only recovery.
  (async () => {
    try {
      // Plain `sendCommand` — with main's retry-on-timeout — is deliberate now that the command is
      // declared in the seam; the `requestNoRetry` this call once used was only a workaround for
      // the missing declaration.
      const snapshot = await sendCommand(GET_AUTO_SYNC_BLOCKING_COMMAND);
      // Only seed if nothing live has spoken: an event that arrived while the request was in flight
      // (either direction) supersedes this snapshot and must win, so we never clobber it here.
      if (!hasReceivedEvent && !isDisposed) {
        // `snapshot` is typed by the seam declaration, but it is untrusted wire data — keep the
        // runtime validation.
        const blockedProjectIds = readBlockedProjectIds(
          snapshot,
          `the ${GET_AUTO_SYNC_BLOCKING_COMMAND} init query`,
        );
        if (blockedProjectIds.length > 0) setBlockedProjects(blockedProjectIds);
      }
    } catch (e) {
      // The seam is in-repo-only (core's own backend registers the command and ships with this
      // service), so any rejection here is anomalous — realistically the cold-start race: the
      // backend had not registered the command within main's retry budget. Keep the
      // assume-unblocked default, but warn: with no re-query until PT-4265, a lost seed is worth
      // noticing.
      logger.warn(
        `auto-sync blocking service could not read the initial blocking state: ${getErrorMessage(e)}`,
      );
    }
  })();

  return () => {
    isDisposed = true;
    unsubscribe();
  };
}
