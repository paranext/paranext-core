import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS,
  UNSETTLED_RECHECK_INTERVAL_MS,
} from '@renderer/hooks/use-send-receive-availability.hook';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent, usePromise } from 'platform-bible-react';
import type { ResultStatus, SyncProgressEvent, SyncState } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * What the sync indicator is reporting.
 *
 * - `idle` — no sync has run this session and none is running
 * - `syncing` — a sync is running now
 * - `synced` — a sync finished this session and every project in it succeeded
 * - `failed` — a sync finished this session and at least one project did not succeed. Covers a user
 *   cancelling a sync, which send/receive reports as a non-success result rather than as a distinct
 *   outcome
 * - `unknown` — the status could not be read. Distinct from `idle` because "nothing has synced" is a
 *   positive claim, and a consumer must not make it on the strength of a failed read
 */
export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'failed' | 'unknown';

/** A project taking part in the sync that is running right now. */
export type SyncingProject = {
  /** The project's id. Unique, and stable across reads — use it to key a rendered list. */
  projectId: string;
  /**
   * Display name, falling back to {@link SyncingProject.projectId} when metadata can't be fetched
   * for it. Not unique: two projects can share a name, so this must not be used as a list key.
   */
  name: string;
};

export type SyncStatusInfo = {
  status: SyncStatus;
  /**
   * The projects syncing right now, sorted by name so the order is stable across reads. Empty
   * whenever nothing is syncing — and also while a sync IS running if the projects aren't knowable
   * (see {@link useSyncStatus}), so callers must fall back to a status that names no projects rather
   * than reading empty as "nothing is syncing". Use {@link SyncStatusInfo.status} for that.
   */
  syncingProjects: readonly SyncingProject[];
};

/**
 * Stable identity so `usePromise`'s default doesn't change between renders. Frozen because it is
 * handed to callers, who would otherwise be able to corrupt the shared singleton for the process
 * lifetime by sorting or pushing to it — and only in the empty case, which no test with projects
 * would reproduce.
 */
const NO_SYNCING_PROJECTS: readonly SyncingProject[] = Object.freeze([]);
/** Same reasoning as {@link NO_SYNCING_PROJECTS}, for the ids held in state. */
const NO_PROJECT_IDS: readonly string[] = Object.freeze([]);

/**
 * How long to keep re-seeding while the snapshot read is still unanswerable, and how long to wait
 * between attempts.
 *
 * A read is not cheap to fail: an unregistered command rejects only after `requestWithRetry` has
 * retried it `MAX_REQUEST_ATTEMPTS` times at `REQUEST_ATTEMPT_WAIT_TIME_MS` apart (~9s), so each
 * attempt already spans most of the activation race on its own. The interval here spaces the
 * attempts that follow that.
 *
 * Both values are aliases of `use-send-receive-availability.hook.ts`'s rather than literals of
 * their own, because both hooks are waiting out the same thing — how long send/receive may take to
 * register its commands on a contended cold start. Restating them would let the two drift apart
 * while every comment still claimed they matched.
 */
export const SYNC_STATE_SEED_RETRY_INTERVAL_MS = UNSETTLED_RECHECK_INTERVAL_MS;
/** See {@link SYNC_STATE_SEED_RETRY_INTERVAL_MS}. */
export const SYNC_STATE_SEED_RETRY_WINDOW_MS = SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS;

/**
 * Whether two id sets are equal by value. The contract states `getSyncState` builds a fresh array
 * on every call and that claim order carries no meaning, so an identity check reports a change on
 * every read — which would re-run the whole metadata lookup, and re-render, for a set that never
 * changed.
 */
function isSameProjectIdSet(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  // Normalized before comparing: project ids are case-insensitive, so an id that comes back in a
  // different case names the same project and must not read as a set change.
  const sortedA = a.map(normalizeProjectId).sort();
  const sortedB = b.map(normalizeProjectId).sort();
  return sortedA.every((id, index) => id === sortedB[index]);
}

/**
 * Every `ResultStatus` this hook knows how to read. Validated as membership rather than as a bare
 * string because the green check rests on the complement: `FAILED_RESULT_STATUSES` names the three
 * non-success values, so a value outside the union would fall through as a success. This contract
 * is still moving, and a seventh status arriving should report `unknown` (honest) rather than a
 * possibly-false `synced`.
 */
const KNOWN_RESULT_STATUSES: ReadonlySet<string> = new Set<ResultStatus>([
  'succeeded',
  'initialSend',
  'initialReceive',
  'failed',
  'notUpgraded',
  'projectVersionUpgraded',
]);

/** Result statuses that mean the project did NOT sync successfully. */
const FAILED_RESULT_STATUSES: ReadonlySet<ResultStatus> = new Set<ResultStatus>([
  'failed',
  'notUpgraded',
  'projectVersionUpgraded',
]);

/**
 * Whether a completed sync's results describe a success for every project it covered. A cancelled
 * sync lands here too: send/receive reports the projects it did not finish with a non-success
 * `resultStatus` rather than reporting the cancellation itself.
 */
function didLastSyncSucceed(state: SyncState): boolean {
  const resultsInfo = state.lastResults?.resultsInfo;
  if (!resultsInfo) return false;
  const results = Object.values(resultsInfo);
  // A sync that produced no result entries is evidence of nothing, and `every` on an empty
  // collection is vacuously true — which would put a green check on a sync that finished nothing.
  // Reachable for a sync aborted or cancelled before its first project reported.
  if (results.length === 0) return false;
  return results.every((result) => !FAILED_RESULT_STATUSES.has(result.resultStatus));
}

/**
 * Maps a snapshot to the status to show. Unlike an event — where `isSyncing: false` always means a
 * sync just finished — a snapshot's `isSyncing: false` only means one is not running, which is also
 * true before anything has synced. `lastResults` is what separates the two, and what its
 * per-project `resultStatus` values say is what separates a success from a failure. Claiming
 * success requires evidence of success; anything less reports `failed` or `idle`.
 */
function deriveStatusFromSnapshot(state: SyncState): SyncStatus {
  if (state.isSyncing) return 'syncing';
  if (!state.lastResults) return 'idle';
  return didLastSyncSucceed(state) ? 'synced' : 'failed';
}

/**
 * Narrows a `getSyncState` response to the parts this hook reads. Typed by the seam declaration in
 * `src/@types/paratext-bible-send-receive`, but it is untrusted wire data from another process, so
 * the shape is checked rather than assumed — the same treatment
 * `src/renderer/services/auto-sync-blocking-service.ts` gives the sibling `getAutoSyncBlocking`
 * payload.
 */
function isValidSyncState(state: unknown): state is SyncState {
  if (typeof state !== 'object' || !state) return false;
  if (!('isSyncing' in state) || typeof state.isSyncing !== 'boolean') return false;
  // Checked even though this hook never reads it: the predicate narrows to the WHOLE `SyncState`,
  // so leaving it unvalidated would hand the next reader of that field an `undefined` the type says
  // cannot happen.
  if (!('lastRequestedProjectIds' in state) || !Array.isArray(state.lastRequestedProjectIds))
    return false;
  if (state.lastRequestedProjectIds.some((id: unknown) => typeof id !== 'string')) return false;
  // Absent is valid: a Send/Receive build predating `syncingProjectIds` answers without it.
  if ('syncingProjectIds' in state && state.syncingProjectIds !== undefined) {
    const { syncingProjectIds } = state;
    if (!Array.isArray(syncingProjectIds)) return false;
    if (syncingProjectIds.some((id: unknown) => typeof id !== 'string')) return false;
  }
  // Absent is valid — it just means nothing has synced yet. Present-but-malformed is not: the green
  // check rests entirely on every entry's `resultStatus`, and `didLastSyncSucceed` reads anything
  // that is not one of the three failure values as a success, so an entry whose status is missing or
  // outside the union would report success on data we cannot read. Failing the whole snapshot here
  // reports `unknown` instead, which is what a snapshot we cannot read is.
  if ('lastResults' in state && state.lastResults !== undefined) {
    const { lastResults } = state;
    if (typeof lastResults !== 'object' || !lastResults) return false;
    if (!('resultsInfo' in lastResults)) return false;
    const { resultsInfo } = lastResults;
    if (typeof resultsInfo !== 'object' || !resultsInfo) return false;
    const isValidResult = (result: unknown) =>
      typeof result === 'object' &&
      !!result &&
      'resultStatus' in result &&
      typeof result.resultStatus === 'string' &&
      KNOWN_RESULT_STATUSES.has(result.resultStatus);
    if (!Object.values(resultsInfo).every(isValidResult)) return false;
  }
  return true;
}

/**
 * Current Send/Receive status for an ambient indicator, seeded so it is correct from the moment it
 * mounts.
 *
 * The seed is the point. `paratextBibleSendReceive.onSyncStateChanged` fires on transitions only,
 * so a consumer that mounts during a sync — a scheduled sync, or a renderer reload mid-sync — would
 * otherwise show `idle` until that sync ENDS. This reads `paratextBibleSendReceive.getSyncState` on
 * mount to cover exactly that gap. An event that lands while the seed is still in flight wins: it
 * describes a later moment than the snapshot does.
 *
 * The seed RETRIES, because the case it exists for is the case where one attempt cannot succeed.
 * Consumers mount this while send/receive may still be activating, and an unregistered command
 * rejects rather than answering; a single attempt would give up permanently during exactly the cold
 * start it was written to fix. Attempts continue until one answers or
 * {@link SYNC_STATE_SEED_RETRY_WINDOW_MS} passes, matching how `useSendReceiveAvailability` handles
 * the same activation race.
 *
 * What the seed CANNOT cover: a sync that never reached the Send/Receive extension's wrappers is
 * absent from `getSyncState` and fires no event, so this reports `idle` throughout it. In Simple
 * mode that currently includes the startup sync itself (`main/startup-tasks.ts` calls the dotnet
 * `syncProjects` command directly), so "correct from startup" holds for manual and scheduled syncs
 * but not yet for that one. See {@link SyncState} for the full list, and
 * `adr-toolbar-sync-status-is-local` in `.context/standards/Architecture-Decisions.md` for why
 * closing that gap is a change to sync behavior rather than to this hook.
 *
 * Projects are resolved from project metadata rather than the event, which carries no ids. They are
 * absent (empty, with `status` still `syncing`) in three cases callers must handle: a Send/Receive
 * build predating `syncingProjectIds`; a `getSyncState` call that fails; and briefly after each
 * sync-state event, while the read that names the new set is in flight. A project whose metadata
 * can't be fetched falls back to its id, so a partial failure loses precision but never a project.
 */
export function useSyncStatus(): SyncStatusInfo {
  // Starts `unknown`, not `idle`: until the seed answers, nothing here knows whether a sync is
  // running, and `idle` is the positive claim "nothing has synced" that the read has not earned.
  // The button label is the same for both, so this changes only what the popover says while the
  // seed is still in flight — from "No sync is running" to "The sync status isn't available right
  // now," which is what is true during a cold start with a scheduled sync already under way.
  const [status, setStatus] = useState<SyncStatus>('unknown');
  const [syncingProjectIds, setSyncingProjectIds] = useState<readonly string[]>(NO_PROJECT_IDS);

  /**
   * Whether an `onSyncStateChanged` event has been applied. Once one has, the mount snapshot is
   * stale by definition and must not overwrite it — and the seed has nothing left to retry for.
   */
  const hasAppliedEventRef = useRef(false);
  /**
   * Identifies the current run. Bumped on teardown so an in-flight read that resolves afterwards is
   * recognised and dropped rather than setting state on an unmounted hook.
   */
  const runRef = useRef(0);
  /**
   * Advances on every `onSyncStateChanged`. A follow-up read is applied only if no later event has
   * arrived since it was issued, so the ids can never describe an earlier moment than the status.
   */
  const eventSequenceRef = useRef(0);

  /**
   * Replaces the id set only when it differs BY VALUE, so a read that returns the same projects in
   * a fresh array (or a different claim order) doesn't re-fire the metadata lookup keyed on it
   * below.
   */
  const applySyncingProjectIds = useCallback((nextIds: readonly string[]) => {
    setSyncingProjectIds((prevIds) => (isSameProjectIdSet(prevIds, nextIds) ? prevIds : nextIds));
  }, []);

  const readSyncState = useCallback(async (): Promise<SyncState | undefined> => {
    try {
      const state = await sendCommand('paratextBibleSendReceive.getSyncState');
      if (!isValidSyncState(state)) {
        logger.warn('Send/receive returned a sync state in an unexpected shape; ignoring it');
        return undefined;
      }
      return state;
    } catch (e) {
      // Send/Receive may not have registered its commands yet (cold start), or may be absent from
      // this build. Either way the caller keeps whatever state it already has.
      logger.warn(`Could not read send/receive sync state: ${getErrorMessage(e)}`);
      return undefined;
    }
  }, []);

  // Seed from a snapshot on mount so a sync already in progress is reflected immediately.
  useEffect(() => {
    runRef.current += 1;
    const run = runRef.current;
    let retryTimeout: ReturnType<typeof setTimeout> | undefined;

    const seed = async (deadline: number) => {
      // Checked before the read as well as after it: a retry scheduled before an event arrived would
      // otherwise spend a whole RPC round trip on an answer that is already known to be discarded.
      if (hasAppliedEventRef.current) return;
      const state = await readSyncState();
      if (run !== runRef.current) return;
      // An event beat the snapshot here. It describes a later moment, so the snapshot is discarded
      // rather than merged — applying only its ids would pair this sync's status with the ids from
      // before the transition. No point retrying either: the live stream has taken over.
      if (hasAppliedEventRef.current) return;

      if (!state) {
        if (performance.now() >= deadline) {
          // Out of budget with no answer. Set explicitly rather than relying on the initial
          // `unknown` still standing: an event may have moved the status on and then been
          // superseded, and "we could not find out" is the only claim this path has earned.
          setStatus('unknown');
          return;
        }
        retryTimeout = setTimeout(() => {
          seed(deadline).catch((e: unknown) => {
            logger.warn(`Unexpected failure re-seeding sync status: ${getErrorMessage(e)}`);
          });
        }, SYNC_STATE_SEED_RETRY_INTERVAL_MS);
        return;
      }

      setStatus(deriveStatusFromSnapshot(state));
      applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
    };

    // Monotonic, not wall-clock: this runs during startup, when the wall clock can be stepped. A
    // step forward past the deadline would make the first failed read look out of budget and skip
    // the entire retry apparatus in the one case it exists for. Same reasoning as
    // `use-send-receive-availability.hook.ts`, which paces the same race.
    seed(performance.now() + SYNC_STATE_SEED_RETRY_WINDOW_MS).catch((e: unknown) => {
      // readSyncState swallows its own failures, so reaching here means a bug in the code above
      // rather than an unavailable command — worth a log that says so.
      logger.warn(`Unexpected failure seeding sync status: ${getErrorMessage(e)}`);
    });

    return () => {
      runRef.current += 1;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [readSyncState, applySyncingProjectIds]);

  const handleSyncStateChanged = useCallback(
    ({ isSyncing }: SyncProgressEvent) => {
      hasAppliedEventRef.current = true;
      eventSequenceRef.current += 1;
      const sequence = eventSequenceRef.current;

      // Drop the previous project set before reading the new one. A claim releasing while another
      // still holds reports `isSyncing: true` — the syncing set can SHRINK without ever passing
      // through "not syncing" — so this branch is reached when a project has just STOPPED syncing.
      // Carrying its id across the read would name it, or count it, as still syncing. Naming
      // nothing is true of every case, so that is what the gap shows.
      applySyncingProjectIds(NO_PROJECT_IDS);

      // A sync STARTING is knowable from the event alone, so show it without waiting for a read.
      // A sync ENDING is not: whether it succeeded, failed, or was cancelled lives in `lastResults`,
      // which only the snapshot carries. Claiming `synced` here would put a green check on a failed
      // or cancelled sync, so the status stays as it is until the read below says what happened.
      if (isSyncing) setStatus('syncing');

      const run = runRef.current;
      readSyncState()
        .then((state) => {
          // Ignore a read that a later event has already superseded. Commands and events share one
          // ordered connection, so today a read can only carry a since-finished sync's ids if it was
          // sent before the event ending that sync — and would therefore have been applied first
          // anyway. The guard costs nothing and keeps this correct without depending on that.
          if (run !== runRef.current || sequence !== eventSequenceRef.current) return undefined;
          if (!state) {
            // The event said a sync ended but the outcome is unreadable. `unknown` is the honest
            // answer; `synced` would be a success claim with nothing behind it.
            if (!isSyncing) setStatus('unknown');
            return undefined;
          }
          setStatus(deriveStatusFromSnapshot(state));
          applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
          return undefined;
        })
        .catch((e: unknown) => {
          logger.warn(`Unexpected failure reading syncing projects: ${getErrorMessage(e)}`);
        });
    },
    [readSyncState, applySyncingProjectIds],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent<SyncProgressEvent>('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  useEvent(onSyncStateChanged, handleSyncStateChanged);

  const [syncingProjects] = usePromise(
    useCallback(async () => {
      const projectIds = syncingProjectIds;
      if (projectIds.length === 0) return NO_SYNCING_PROJECTS;

      // One filtered lookup rather than a call per id: `getMetadataForProject` fans out across every
      // PDP factory each time, and gathering the results with `Promise.all` would let one project
      // whose factory hasn't registered withhold the names of all the others until it times out.
      let metadataById = new Map<string, { name?: string }>();
      try {
        const metadata = await projectLookupService.getMetadataForAllProjects({
          includeProjectIds: [...projectIds],
        });
        // Keyed on the normalized id, and read the same way below. Project ids are
        // case-insensitive, and `ProjectMetadata.id` keeps the casing of whichever factory reported
        // the project first (see `project-lookup.service-model.ts`) while the ids in a sync state
        // come from C#, which canonicalizes to upper case. Matching raw would miss silently and
        // fall back to showing the id instead of the name.
        metadataById = new Map(metadata.map((m) => [normalizeProjectId(m.id), m]));
      } catch (e) {
        // Every project falls back to its id below, so the popover still names the right number of
        // projects — it just names them less precisely.
        logger.warn(`Could not resolve names of syncing projects: ${getErrorMessage(e)}`);
      }

      return (
        projectIds
          .map((projectId) => ({
            projectId,
            // Short name ("HNF") over full name — this labels a compact toolbar control, and it is
            // the name Paratext users identify a project by. `??` rather than `||` so a
            // present-but-empty name passes through: `use-project-picker-data.hook.ts` documents an
            // empty name as a real, deliberately-supported Paratext case, and this must label the
            // same project the same way the picker does.
            name: metadataById.get(normalizeProjectId(projectId))?.name ?? projectId,
          }))
          // The contract says claim order carries no meaning and can differ between reads of the
          // same set, so sorting is what keeps an open popover from reshuffling under the user. Ties
          // break on id, because two projects sharing a display name (or both falling back to their
          // id) would otherwise be left in exactly the meaningless order the sort exists to remove.
          .sort((a, b) => a.name.localeCompare(b.name) || a.projectId.localeCompare(b.projectId))
      );
    }, [syncingProjectIds]),
    NO_SYNCING_PROJECTS,
  );

  return useMemo(() => ({ status, syncingProjects }), [status, syncingProjects]);
}

export default useSyncStatus;
