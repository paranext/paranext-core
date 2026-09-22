import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { getErrorMessage, isString } from 'platform-bible-utils';
import type { SyncActivitySnapshot, SyncOutcome } from 'paratext-bible-send-receive';
import { seedWithRetry } from './seed-with-retry.util';
import {
  setSyncActivity,
  setSyncActivityUnknown,
  getSyncActivityState,
} from './sync-activity-store';

// Payload types (`SyncActivitySnapshot`) come from the `paratext-bible-send-receive` seam
// declarations in `src/@types/paratext-bible-send-receive/index.d.ts`.

/**
 * Backend-authoritative network event (declared in the seam's `NetworkEvents`): the dotnet run
 * bracket emits a full snapshot on every transition, for EVERY sync path — including callers that
 * reach the dotnet commands directly and raise no extension-side claim, which is the whole reason
 * this signal exists alongside the claim.
 */
const SYNC_ACTIVITY_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncActivityChanged';

/**
 * Command served by the same dotnet backend, returning the current snapshot so this service can
 * seed the store instead of waiting for the next transition. Core's own backend registers it
 * unconditionally, so it is answered on plain Platform.Bible too (always an idle snapshot there).
 */
const GET_SYNC_ACTIVITY_COMMAND = 'paratextBibleSendReceive.getSyncActivity';

/**
 * How often to re-ask the backend whether the run it last reported is still going, while the store
 * says one is.
 *
 * This exists because the forward is fire-and-forget on the dotnet side (a faulted send is logged,
 * not retried), so a single lost closing snapshot would otherwise strand the indicator at `syncing`
 * — spinner and live Cancel over a sync nothing can still see — for the life of the renderer. The
 * claim cannot correct it: that direction is deliberately unwired (see `useSyncStatus`).
 *
 * Deliberately a RE-QUERY OF THE AUTHORITY rather than a local timeout that decides on its own that
 * the sync must be over: a second, timer-driven opinion about whether a sync is running is exactly
 * the drift that lets this disagree with the backend. Nothing here forms an opinion — it asks, and
 * the backend's answer wins. Spare on purpose, since a sync runs for minutes and the read is an
 * in-memory one: this bounds how long a lost snapshot can strand the UI, it does not drive the UI.
 */
const SYNC_ACTIVITY_WATCHDOG_INTERVAL_MS = 30_000;

/**
 * Every outcome this build can read. A `Record` rather than a list so that adding a member to
 * `SyncOutcome` fails to compile until it is listed here, instead of that value arriving and being
 * dropped as unrecognized.
 */
const KNOWN_SYNC_OUTCOMES: Record<SyncOutcome, true> = { succeeded: true, failed: true };

function isKnownSyncOutcome(outcome: unknown): outcome is SyncOutcome {
  return isString(outcome) && Object.keys(KNOWN_SYNC_OUTCOMES).includes(outcome);
}

/**
 * Reads an untrusted `{ isSyncing, projectIds, outcome }` payload, returning the snapshot to apply,
 * or `undefined` when the payload is unusable.
 *
 * Applied to the EVENT as well as the seed. The seam types both, but both are wire data crossing a
 * process boundary from C#, and the failure modes are not symmetrical with a rejected read: a
 * malformed payload coerced by truthiness (`isSyncing: 'yes'`) would assert a sync that is not
 * running, and a `null` payload would throw inside the event emitter's dispatch loop, costing every
 * later subscriber the delivery.
 *
 * `projectIds` is accepted when ABSENT — the seam declares it required, but a Studio build
 * predating that field answers without it, and "the projects are unknown" is a usable snapshot
 * while "malformed" is not.
 *
 * `outcome` is read field by field rather than all-or-nothing. Absent or `null` means "cannot say"
 * and is left off. A value this build does not recognize is logged and left off too, while the rest
 * of the snapshot still applies: rejecting the whole payload over it would discard a well-formed
 * `isSyncing` along with it, blinding the indicator to a running sync over a field that only
 * describes how the last one went. It is checked for membership rather than for being a string,
 * because reading an unrecognized value as either verdict is exactly the guess this field must
 * never make.
 */
function readSyncActivitySnapshot(payload: unknown): SyncActivitySnapshot | undefined {
  if (typeof payload !== 'object' || !payload) return undefined;
  if (!('isSyncing' in payload) || typeof payload.isSyncing !== 'boolean') return undefined;
  const snapshot: SyncActivitySnapshot = { isSyncing: payload.isSyncing };

  const projectIds = 'projectIds' in payload ? payload.projectIds : undefined;
  if (projectIds !== undefined) {
    if (!Array.isArray(projectIds) || !projectIds.every(isString)) return undefined;
    snapshot.projectIds = projectIds;
  }

  const outcome = 'outcome' in payload ? payload.outcome : undefined;
  // Loose on purpose, so a `null` is caught alongside an absent field without naming `null` here.
  // eslint-disable-next-line eqeqeq
  if (outcome == undefined) return snapshot;
  if (!isKnownSyncOutcome(outcome)) {
    logger.warn(
      `Ignoring an unrecognized send/receive sync outcome ${JSON.stringify(outcome)}; reading it as unknown`,
    );
    return snapshot;
  }
  snapshot.outcome = outcome;

  // Carried only when it is a time that can actually be compared. A consumer orders this outcome
  // against the claim's own verdict by it, so an unparsable value is worse than none: it would order
  // the two by a number that means nothing.
  const completedAt = 'completedAt' in payload ? payload.completedAt : undefined;
  // Loose for the same reason as the outcome above: a `null` is absent, not malformed.
  // eslint-disable-next-line eqeqeq
  if (completedAt == undefined) return snapshot;
  if (isString(completedAt) && !Number.isNaN(Date.parse(completedAt))) {
    snapshot.completedAt = completedAt;
  } else {
    logger.warn(
      `Ignoring an unreadable send/receive sync outcome time ${JSON.stringify(completedAt)}`,
    );
  }
  return snapshot;
}

/**
 * Subscribes to the backend sync-activity event and drives the sync-activity store. Call once at
 * app startup. Returns a cleanup function.
 *
 * On init it seeds from `getSyncActivity`, retrying while the command may still be unregistered, so
 * a renderer that starts (or reloads) during a sync reports that sync immediately rather than
 * waiting for its closing transition. A live event always wins over the seed: it describes a later
 * moment. If the retry window closes with no answer the store is told the answer is UNKNOWN rather
 * than idle — a failed read is not evidence that nothing is syncing.
 */
export function initSyncActivityService(): () => void {
  let hasReceivedEvent = false;
  let isDisposed = false;
  const runRef = { current: 0 };
  let watchdogTimeout: ReturnType<typeof setTimeout> | undefined;

  const readSyncActivity = async (): Promise<SyncActivitySnapshot | undefined> => {
    try {
      const snapshot = readSyncActivitySnapshot(await sendCommand(GET_SYNC_ACTIVITY_COMMAND));
      if (!snapshot) {
        logger.warn(
          'Send/receive returned a sync activity snapshot in an unexpected shape; ignoring it',
        );
        return undefined;
      }
      return snapshot;
    } catch (e) {
      // Unavailable on a cold start (not registered yet), or permanently on a build predating this
      // signal. Either way the caller keeps whatever state it already has.
      logger.warn(`Could not read send/receive sync activity: ${getErrorMessage(e)}`);
      return undefined;
    }
  };

  const unsubscribe = getNetworkEvent(SYNC_ACTIVITY_CHANGED_EVENT)((payload) => {
    // Validate BEFORE recording that an event has been applied. Recording it first would disarm the
    // seed — the one path that could still produce a good snapshot — on the strength of a payload
    // that turned out to be unusable. A payload whose only fault is an unrecognized outcome is still
    // usable, so it does count.
    const snapshot = readSyncActivitySnapshot(payload);
    if (!snapshot) {
      logger.warn(`Ignoring a malformed ${SYNC_ACTIVITY_CHANGED_EVENT} payload`);
      return;
    }
    hasReceivedEvent = true;
    setSyncActivity(snapshot);
  });

  const stopSeed = seedWithRetry({
    read: readSyncActivity,
    apply: (snapshot) => {
      if (!isDisposed) setSyncActivity(snapshot);
    },
    onExhausted: () => {
      if (!isDisposed) setSyncActivityUnknown();
    },
    hasEventApplied: () => hasReceivedEvent,
    runRef,
    logLabel: 'sync activity',
  });

  /**
   * Re-asks the backend while it last said a run was in progress. See
   * {@link SYNC_ACTIVITY_WATCHDOG_INTERVAL_MS}. A read that fails changes nothing — the existing
   * state stands and the next tick asks again.
   */
  const scheduleWatchdog = () => {
    watchdogTimeout = setTimeout(() => {
      if (isDisposed) return;
      if (!getSyncActivityState().isSyncing) {
        scheduleWatchdog();
        return;
      }
      (async () => {
        try {
          const snapshot = await readSyncActivity();
          if (!isDisposed && snapshot) setSyncActivity(snapshot);
        } catch (e) {
          // `readSyncActivity` swallows its own failures, so this is a bug rather than an
          // unavailable command.
          logger.warn(`Unexpected failure re-reading sync activity: ${getErrorMessage(e)}`);
        } finally {
          if (!isDisposed) scheduleWatchdog();
        }
      })();
    }, SYNC_ACTIVITY_WATCHDOG_INTERVAL_MS);
  };
  scheduleWatchdog();

  return () => {
    isDisposed = true;
    if (watchdogTimeout) clearTimeout(watchdogTimeout);
    stopSeed();
    unsubscribe();
  };
}
