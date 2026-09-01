import {
  SYNC_SEED_RETRY_INTERVAL_MS,
  SYNC_SEED_RETRY_WINDOW_MS,
  seedWithRetry,
} from '@renderer/services/seed-with-retry.util';
import {
  getSyncActivityState,
  subscribeToSyncActivity,
} from '@renderer/services/sync-activity-store';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent, usePromise } from 'platform-bible-react';
import type { ResultStatus, SyncProgressEvent } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';

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
 * Re-exported so consumers and tests that pace against this hook's seeding keep one import site.
 * Defined in `seed-with-retry.util` alongside the loop that reads them.
 */
export { SYNC_SEED_RETRY_INTERVAL_MS, SYNC_SEED_RETRY_WINDOW_MS };

/**
 * Whether two id sets are equal by value. The contract states `getSyncState` builds a fresh array
 * on every call and that claim order carries no meaning, so an identity check reports a change on
 * every read — which would re-run the whole metadata lookup, and re-render, for a set that never
 * changed.
 *
 * Compared by NORMALIZED id, because a project id's casing is not stable across the sources this
 * hook reads: the same project can be reported as `PROJ1` by one signal and `proj1` by the other,
 * or by the same signal across builds. Comparing raw ids would report a change for a set that only
 * flipped case, re-running the metadata lookup and re-rendering for nothing.
 */
function isSameProjectIdSet(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = a.map(normalizeProjectId).sort();
  const sortedB = b.map(normalizeProjectId).sort();
  return sortedA.every((id, index) => id === sortedB[index]);
}

/** Result statuses that mean the project synced successfully. */
const SUCCEEDED_RESULT_STATUSES: ReadonlySet<string> = new Set<ResultStatus>([
  'succeeded',
  'initialSend',
  'initialReceive',
]);

/** Result statuses that mean the project did NOT sync successfully. */
const FAILED_RESULT_STATUSES: ReadonlySet<string> = new Set<ResultStatus>([
  'failed',
  'notUpgraded',
  'projectVersionUpgraded',
]);

/**
 * Whether a value is a per-project result carrying a `resultStatus` this build recognizes. An
 * unrecognized value is not treated as a success by omission: send/receive may add statuses, and
 * `resultStatus` is untrusted wire data, so a status this build cannot classify is an absence of
 * evidence rather than evidence of success.
 */
function hasKnownResultStatus(result: unknown): result is { resultStatus: ResultStatus } {
  if (typeof result !== 'object' || !result || !('resultStatus' in result)) return false;
  const { resultStatus } = result;
  if (typeof resultStatus !== 'string') return false;
  return SUCCEEDED_RESULT_STATUSES.has(resultStatus) || FAILED_RESULT_STATUSES.has(resultStatus);
}

/**
 * What a completed sync's per-project results say happened, or `undefined` when they do not say.
 *
 * Every rejection here is a case where `every`-style reasoning would otherwise manufacture a
 * verdict out of nothing: an empty map satisfies `every` vacuously, a non-object carries no results
 * to read, and a status outside the known set is one this build cannot classify. Claiming success
 * needs evidence of success and claiming failure needs evidence of failure, so absent either the
 * caller is told it could not tell rather than being handed a guess.
 *
 * The two verdicts need different amounts of evidence, because they are different claims.
 * {@link SyncStatus.failed} is "at least one project did not succeed", so one recognized failure
 * settles it however unreadable its siblings are — blanking that out to `unknown` would trade a
 * true statement for "status unavailable" and hide the View-details path the user needs. `synced`
 * is a claim about every project, so it needs every result readable.
 *
 * A cancelled sync lands on `failed`: send/receive reports the projects it did not finish with a
 * non-success `resultStatus` rather than reporting the cancellation itself.
 */
function deriveOutcomeFromResults(resultsInfo: unknown): 'synced' | 'failed' | undefined {
  if (typeof resultsInfo !== 'object' || !resultsInfo) return undefined;
  const results: unknown[] = Object.values(resultsInfo);
  if (results.length === 0) return undefined;
  const knownResults = results.filter(hasKnownResultStatus);
  if (knownResults.some((result) => FAILED_RESULT_STATUSES.has(result.resultStatus)))
    return 'failed';
  if (knownResults.length !== results.length) return undefined;
  return 'synced';
}

/**
 * The parts of a `getSyncState` response this hook actually reads, and the shape
 * {@link isValidSyncState} actually checks.
 *
 * Deliberately NOT the seam's `SyncState`. Narrowing to the full declared type would promise that
 * `lastResults` conforms to `ResultsData`, which nothing here verifies — and verifying it is the
 * wrong fix: a snapshot whose `resultsInfo` cannot be read still carries perfectly good `isSyncing`
 * and `syncingProjectIds`, and rejecting the whole payload over an unreadable historical outcome
 * would discard the live fields with it (`adr-toolbar-sync-status-is-local` follow-up 5).
 * {@link deriveOutcomeFromResults} therefore takes `resultsInfo` as `unknown` and answers `unknown`
 * for anything it cannot read, which is the honest verdict.
 */
type ReadableSyncState = {
  isSyncing: boolean;
  lastRequestedProjectIds: string[];
  syncingProjectIds?: string[];
  lastResults?: { resultsInfo?: unknown };
};

/**
 * Maps a snapshot to the status to show. Unlike an event — where `isSyncing: false` always means a
 * sync just finished — a snapshot's `isSyncing: false` only means one is not running, which is also
 * true before anything has synced. `lastResults` is what separates the two, and what its
 * per-project `resultStatus` values say is what separates a success from a failure. Claiming
 * success requires evidence of success; a `lastResults` whose contents cannot be read is reported
 * as `unknown` rather than as either verdict.
 */
function deriveStatusFromSnapshot(state: ReadableSyncState): SyncStatus {
  if (state.isSyncing) return 'syncing';
  if (!state.lastResults) return 'idle';
  return deriveOutcomeFromResults(state.lastResults.resultsInfo) ?? 'unknown';
}

/**
 * Whether a snapshot read off the wire carries the `isSyncing` flag both signals share. Both
 * `getSyncState` and `getSyncActivity` are typed by the seam declaration in
 * `src/@types/paratext-bible-send-receive`, but they are untrusted wire data from another process,
 * so the shape is checked rather than assumed — the same treatment
 * `src/renderer/services/auto-sync-blocking-service.ts` gives the sibling `getAutoSyncBlocking`
 * payload.
 */
function hasIsSyncingFlag(snapshot: unknown): snapshot is { isSyncing: boolean } {
  if (typeof snapshot !== 'object' || !snapshot) return false;
  return 'isSyncing' in snapshot && typeof snapshot.isSyncing === 'boolean';
}

/**
 * Whether a snapshot's optional project-id field is usable. Absent is valid: a Send/Receive build
 * predating the field answers without it, and the callers below substitute an empty set.
 *
 * `null` counts as absent, because several JSON serializers render an omitted optional that way. It
 * would otherwise reject the whole payload and discard a perfectly good `isSyncing` alongside it,
 * which — since every retry gets the same `null` — pins the status at `unknown` for a build that
 * was reporting whether a sync is running correctly the whole time.
 */
function isValidProjectIdsField(projectIds: unknown): boolean {
  // Loose on purpose, so a `null` is caught alongside an absent field without naming `null` here.
  // eslint-disable-next-line eqeqeq
  if (projectIds == undefined) return true;
  if (!Array.isArray(projectIds)) return false;
  return projectIds.every((id: unknown) => typeof id === 'string');
}

/** Narrows a `getSyncState` response to the parts this hook reads. See {@link hasIsSyncingFlag}. */
function isValidSyncState(state: unknown): state is ReadableSyncState {
  if (!hasIsSyncingFlag(state)) return false;
  // Checked even though this hook never reads it: the predicate narrows to a type that DECLARES it,
  // so leaving it unvalidated would hand the next reader of that field an `undefined` the type says
  // cannot happen.
  if (!('lastRequestedProjectIds' in state) || !Array.isArray(state.lastRequestedProjectIds))
    return false;
  if (state.lastRequestedProjectIds.some((id: unknown) => typeof id !== 'string')) return false;
  return isValidProjectIdsField('syncingProjectIds' in state ? state.syncingProjectIds : undefined);
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
 * {@link SYNC_SEED_RETRY_WINDOW_MS} passes, matching how `useSendReceiveAvailability` handles the
 * same activation race.
 *
 * What the claim alone CANNOT cover: a sync that never reached the Send/Receive extension's
 * wrappers is absent from `getSyncState` and fires no event, so the claim reports `idle` throughout
 * it. Two core paths land here — the Simple-mode startup sync (`main/startup-tasks.ts` calls the
 * dotnet `syncProjects` command directly) and the picker's per-project sync
 * (`syncOnProjectSwitch`). That gap is what `SyncActivitySnapshot` closes: it is derived from the
 * C# sync run marker rather than the extension's claim map, so it sees every path including these
 * two. This hook unions the two signals (see the `status` derivation below) rather than relying on
 * the claim alone. See `adr-toolbar-sync-status-is-local` in
 * `.context/standards/Architecture-Decisions.md` for the fuller history of that gap.
 *
 * Projects are resolved from project metadata rather than the event, which carries no ids. They are
 * absent (empty, with `status` still `syncing`) in several cases callers must handle: a
 * Send/Receive build predating `syncingProjectIds`; a `getSyncState` call that fails; briefly after
 * each sync-state event, while the read that names the new set is in flight; and while the activity
 * signal is the only one reporting a sync and its backend has not yet resolved a merge set for it.
 * A project whose metadata can't be fetched falls back to its id, so a partial failure loses
 * precision but never a project.
 */
export function useSyncStatus(): SyncStatusInfo {
  // Starts `unknown`, not `idle`: until the seed answers, nothing here knows whether a sync is
  // running, and `idle` is the positive claim "nothing has synced" that the read has not earned.
  // The button label is the same for both, so this changes only what the popover says while the
  // seed is still in flight — from "No sync is running" to "The sync status isn't available right
  // now," which is what is true during a cold start with a scheduled sync already under way.
  const [claimStatus, setClaimStatus] = useState<SyncStatus>('unknown');
  const [syncingProjectIds, setSyncingProjectIds] = useState<readonly string[]>(NO_PROJECT_IDS);
  /**
   * The backend's view of whether a sync is running, and for which projects, read from the shared
   * sync-activity store (`initSyncActivityService` owns the one subscription and the seed).
   *
   * Independent of the claim because it covers paths the claim cannot see (see
   * `SyncActivitySnapshot`). `isSyncing` is `undefined` when no snapshot has answered — a cold
   * start still in flight, or permanently on a build predating this signal — which the derivation
   * below treats as "no input from this signal" rather than as a claim in either direction.
   *
   * Read through the store rather than subscribed here so both this hook and the toolbar's mount
   * gate see one validated snapshot, and so the seed survives this hook unmounting (a Simple/Power
   * toggle) instead of restarting.
   */
  const { isSyncing: activitySyncing, projectIds: activityProjectIds } = useSyncExternalStore(
    subscribeToSyncActivity,
    getSyncActivityState,
  );
  /**
   * Whether the claim's follow-up read of {@link syncingProjectIds} is in flight. Held in state
   * rather than a ref because {@link effectiveProjectIds} is derived during render and has to see
   * it: an empty claim set means "the claim reports no projects" only once the read has answered,
   * and while it is in flight the emptiness is the deliberate pre-read clear in
   * {@link handleSyncStateChanged} instead. Distinguishing the two is what keeps a stale activity
   * set from filling that gap with projects the claim has just stopped reporting.
   */
  const [isClaimRereadInFlight, setIsClaimRereadInFlight] = useState(false);
  /**
   * Whether {@link claimStatus}'s settled verdict describes a sync OLDER than the last one the
   * activity signal reported. Set when a sync only the activity signal could see ends: the claim
   * never saw that sync, so its `synced`/`failed` belongs to some earlier, unrelated sync and
   * presenting it as this one's outcome would put a green check on a sync whose result is unknown —
   * and, if that sync failed, on one that failed. Cleared as soon as the claim reports anything of
   * its own again — from an event, or from the seed's own read, which is the only one of the two
   * that ever happens on a Simple-mode launch.
   */
  const [isClaimVerdictStale, setIsClaimVerdictStale] = useState(false);
  /**
   * Bumped to restart the claim's seed loop. Extensions reloading can add send/receive mid-session,
   * and a seed that spent its whole retry budget before that has no other way back — nothing fires
   * between syncs, so a status pinned at `unknown` would stay there until the renderer reloaded.
   * The activity signal restarts independently, in `initSyncActivityService`.
   */
  const [seedGeneration, setSeedGeneration] = useState(0);

  /**
   * Whether an `onSyncStateChanged` event has been seen. Once one has, the mount snapshot is stale
   * by definition and must not overwrite it — and the seed has nothing left to retry for.
   *
   * Set UNCONDITIONALLY on the handler's entry, including for an event whose own follow-up read
   * then fails. Setting it only where state is successfully applied leaves the seed live across an
   * event it has already been superseded by: a cold start whose `getSyncState` is still in flight
   * when the sync ends resolves that read afterwards with `isSyncing: true`, and with nothing
   * recording that a later event contradicted it, the seed applies it and pins the indicator at
   * "Syncing" — with a live Cancel over a finished sync — until the renderer reloads. An honest
   * `unknown` for the rest of the seed's budget is the lesser cost, and the next event corrects
   * it.
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
   * Run counter for the retry loop the EVENT path starts when its own follow-up read fails.
   * Separate from {@link runRef} so starting it cannot cancel a read the mount seed still has in
   * flight, and vice versa.
   */
  const eventReadRunRef = useRef(0);
  /** Stops the event path's retry loop, if one is running. Replaced each time a new one starts. */
  const stopEventReadRetryRef = useRef<(() => void) | undefined>(undefined);

  /**
   * Replaces the id set only when it differs BY VALUE, so a read that returns the same projects in
   * a fresh array (or a different claim order) doesn't re-fire the metadata lookup keyed on it
   * below.
   */
  const applySyncingProjectIds = useCallback((nextIds: readonly string[]) => {
    setSyncingProjectIds((prevIds) => (isSameProjectIdSet(prevIds, nextIds) ? prevIds : nextIds));
  }, []);

  const readSyncState = useCallback(async (): Promise<ReadableSyncState | undefined> => {
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
  useEffect(
    () =>
      seedWithRetry({
        read: readSyncState,
        apply: (state) => {
          setClaimStatus(deriveStatusFromSnapshot(state));
          applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
          // The claim has now reported something of its own, so whatever verdict it carries
          // describes what it just read rather than a sync it never saw. Without this the flag is
          // only ever cleared by an EVENT, and the paths that set it are precisely the ones the
          // claim raises no event for — so a Simple-mode launch would set it once, find nothing to
          // clear it, and report `unknown` for the rest of the session.
          setIsClaimVerdictStale(false);
        },
        // Out of budget with no answer. Set explicitly rather than relying on the initial
        // `unknown` still standing: an event may have moved the claim on and then been superseded,
        // and "we could not find out" is the only claim this path has earned.
        onExhausted: () => setClaimStatus('unknown'),
        hasEventApplied: () => hasAppliedEventRef.current,
        runRef,
        logLabel: 'sync status',
      }),
    // `seedGeneration` is a dependency so that bumping it restarts this loop; see its declaration.
    [readSyncState, applySyncingProjectIds, seedGeneration],
  );

  /**
   * Retries `getSyncState` after an event's own follow-up read came back unreadable, so the honest
   * `unknown` that failure produced is not the session's final answer.
   *
   * Superseded by any LATER event: that event describes a newer moment and owns the state from then
   * on, which is what `hasEventApplied` checks here. Only one loop runs at a time — a new one stops
   * the previous — because they would otherwise race to apply snapshots read at different moments.
   */
  const startEventReadRetry = useCallback(
    (sequence: number) => {
      stopEventReadRetryRef.current?.();
      stopEventReadRetryRef.current = seedWithRetry({
        read: readSyncState,
        apply: (state) => {
          setClaimStatus(deriveStatusFromSnapshot(state));
          applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
          // The claim has reported something of its own again; see `isClaimVerdictStale`.
          setIsClaimVerdictStale(false);
        },
        // Nothing to say: the `unknown` this loop was started to improve on is already showing, and
        // it remains the honest answer.
        hasEventApplied: () => sequence !== eventSequenceRef.current,
        runRef: eventReadRunRef,
        logLabel: 'sync status after an unreadable event',
      });
    },
    [readSyncState, applySyncingProjectIds],
  );

  // Stops the event path's retry loop when this hook goes away, so a read resolving afterwards
  // cannot set state on a torn-down consumer.
  useEffect(
    () => () => {
      stopEventReadRetryRef.current?.();
      stopEventReadRetryRef.current = undefined;
    },
    [],
  );

  const handleSyncStateChanged = useCallback(
    ({ isSyncing }: SyncProgressEvent) => {
      eventSequenceRef.current += 1;
      const sequence = eventSequenceRef.current;
      // Before anything can fail below: this event supersedes the mount snapshot whatever happens to
      // the follow-up read (see {@link hasAppliedEventRef}).
      hasAppliedEventRef.current = true;
      // The claim is reporting on the sync happening now, so whatever verdict it reaches describes
      // it rather than an earlier one.
      setIsClaimVerdictStale(false);

      // Drop the previous project set before reading the new one. A claim releasing while another
      // still holds reports `isSyncing: true` — the syncing set can SHRINK without ever passing
      // through "not syncing" — so this branch is reached when a project has just STOPPED syncing.
      // Carrying its id across the read would name it, or count it, as still syncing. Naming
      // nothing is true of every case, so that is what the gap shows.
      applySyncingProjectIds(NO_PROJECT_IDS);
      // Mark the clear above as "mid-reread" rather than "the claim names nothing", so the activity
      // fallback in `effectiveProjectIds` does not step in and name a set the claim has moved past.
      setIsClaimRereadInFlight(true);

      // A sync STARTING is knowable from the event alone, so show it without waiting for a read.
      // A sync ENDING is not: whether it succeeded, failed, or was cancelled lives in `lastResults`,
      // which only the snapshot carries. Claiming `synced` here would put a green check on a failed
      // or cancelled sync, so the status stays as it is until the read below says what happened.
      if (isSyncing) setClaimStatus('syncing');

      const run = runRef.current;
      readSyncState()
        .then((state) => {
          // Ignore a read that a LATER EVENT has already superseded, and leave the flag alone: that
          // event set it again and owns clearing it, so clearing here would open the fallback window
          // the flag exists to close. Commands and events share one ordered connection, so today a
          // read can only carry a since-finished sync's ids if it was sent before the event ending
          // that sync — and would therefore have been applied first anyway. The guard costs nothing
          // and keeps this correct without depending on that.
          if (sequence !== eventSequenceRef.current) return undefined;
          // A read superseded by a seed restart or a teardown has no such owner, so it clears the
          // flag before bailing out — leaving it set would suppress the activity fallback for the
          // rest of the session.
          setIsClaimRereadInFlight(false);
          if (run !== runRef.current) return undefined;
          if (!state) {
            // The event said a sync ended but the outcome is unreadable. `unknown` is the honest
            // answer; `synced` would be a success claim with nothing behind it.
            //
            // Only the ENDED case retries. A sync STARTING is fully answered by the event itself —
            // `syncing` is already showing, and the read would only have added project names — so
            // there is nothing there worth spending the request on. A sync that ENDED is the case
            // whose outcome lives solely in the snapshot, so a failed read there is the difference
            // between a verdict and `unknown`.
            //
            // The retry has to come from this path rather than the mount seed, which the handler
            // retires on entry. That retirement is what stops a seed read issued BEFORE the sync
            // ended from resurrecting it; this is what stops the retirement from costing the session
            // a real answer. Without both, the choice is between a permanent "Syncing" over a
            // finished sync and a permanent "status unavailable" after a readable one.
            if (!isSyncing) {
              setClaimStatus('unknown');
              startEventReadRetry(sequence);
            }
            return undefined;
          }
          setClaimStatus(deriveStatusFromSnapshot(state));
          applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
          return undefined;
        })
        .catch((e: unknown) => {
          logger.warn(`Unexpected failure reading syncing projects: ${getErrorMessage(e)}`);
          // `readSyncState` swallows its own failures, so this is a bug rather than an unavailable
          // command — but the read is over either way, and leaving the flag set would suppress the
          // activity fallback for the rest of the session.
          if (run === runRef.current && sequence === eventSequenceRef.current)
            setIsClaimRereadInFlight(false);
        });
    },
    [readSyncState, applySyncingProjectIds, startEventReadRetry],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  useEvent(onSyncStateChanged, handleSyncStateChanged);

  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  const handleExtensionsReloaded = useCallback(() => {
    // Send/receive may have just arrived, or restarted — either way the claim's event stream starts
    // over, so an event applied before the reload no longer stands as a reason to skip re-seeding.
    // The activity signal re-seeds independently, in its own service.
    hasAppliedEventRef.current = false;
    setSeedGeneration((generation) => generation + 1);
  }, []);
  useEvent(onDidReloadExtensions, handleExtensionsReloaded);

  /**
   * Tracks whether the claim also saw the sync the activity signal is reporting, so that when that
   * sync ends {@link isClaimVerdictStale} can say whether the claim's verdict describes it or some
   * earlier sync. The claim seeing it is recorded while the sync is still running, because once it
   * has ended `claimStatus` no longer distinguishes the two cases.
   */
  const isActivitySyncingRef = useRef(false);
  const didClaimSeeActivitySyncRef = useRef(false);
  useEffect(() => {
    if (activitySyncing) {
      isActivitySyncingRef.current = true;
      if (claimStatus === 'syncing') didClaimSeeActivitySyncRef.current = true;
      return;
    }
    // `undefined` (the signal cannot tell) lands here too. It is not read as a sync ENDING — no
    // status is settled from it — but a `true → undefined` transition, reachable when a
    // `seedGeneration` restart exhausts its retries with send/receive gone, does fall through to
    // mark the claim's verdict stale. That is deliberate: a sync the activity signal reported and
    // can no longer account for has an unknowable outcome, and `unknown` is the honest answer. Only
    // the never-was-syncing case returns early, because there is no sync to have lost track of.
    if (!isActivitySyncingRef.current) return;
    isActivitySyncingRef.current = false;
    if (!didClaimSeeActivitySyncRef.current) setIsClaimVerdictStale(true);
    didClaimSeeActivitySyncRef.current = false;
  }, [activitySyncing, claimStatus]);

  /**
   * The single derived status. The OR is deliberate and monotone: either input claiming a sync is
   * enough — including when the claim's own read has failed (`claimStatus === 'unknown'`), since
   * `unknown` means "the claim could not tell", not "nothing is syncing", and the activity signal
   * CAN tell. So the union can be late to CLEAR but can never report idle (or unknown) while a sync
   * is running. Erring toward "still syncing" is the safe direction for an ambient indicator — and
   * showing idle mid-sync is precisely the bug this hook exists to fix. Do not add a third
   * authority here; add an input.
   *
   * What the activity signal cannot supply is an OUTCOME: it reports that a sync is running, never
   * how one finished. So for a sync only it could see — the Simple-mode startup sync, the picker's
   * per-project sync — there is no verdict to be had, and the claim's own last verdict describes a
   * different sync entirely. Reporting `unknown` there is the whole point of that state: it says a
   * sync happened and how it went is not knowable, instead of decorating it with an unrelated
   * sync's green check.
   *
   * The reverse direction is deliberately NOT wired: the activity signal reporting `isSyncing:
   * false` does not clear a claim that says `syncing`. The two disagree that way for an ordinary
   * reason — a claim event can arrive before the backend's run marker is set — so treating the
   * disagreement as a stuck claim would flicker every normal sync through a wrong state at its
   * start. A genuinely stranded claim would need a signal that distinguishes the two, which neither
   * input carries today.
   */
  const status: SyncStatus = (() => {
    if (activitySyncing) return 'syncing';
    // A claim that is itself reporting a sync is describing the current one, not an earlier one.
    if (isClaimVerdictStale && claimStatus !== 'syncing') return 'unknown';
    return claimStatus;
  })();

  /**
   * Which projects to name. The claim is the detail source when it has an answer; the activity
   * signal fills in only when the claim has none — e.g. the Simple-mode startup sync, which the
   * claim never sees at all. See {@link activityProjectIds} for why these are never combined by
   * writing into one shared state instead of being derived here.
   *
   * "The claim has none" excludes the window where its follow-up read is still in flight (see
   * {@link isClaimRereadInFlight}): the claim set is empty there because it was deliberately
   * cleared, not because the claim answered with nothing, and letting the activity signal fill that
   * gap would briefly name projects the claim has just stopped reporting. Naming nothing for the
   * length of the read is true of every case.
   */
  const effectiveProjectIds =
    syncingProjectIds.length > 0 || isClaimRereadInFlight ? syncingProjectIds : activityProjectIds;

  const [syncingProjects] = usePromise(
    useCallback(async () => {
      const projectIds = effectiveProjectIds;
      if (projectIds.length === 0) return NO_SYNCING_PROJECTS;

      // One filtered lookup rather than a call per id: `getMetadataForProject` fans out across every
      // PDP factory each time, and gathering the results with `Promise.all` would let one project
      // whose factory hasn't registered withhold the names of all the others until it times out.
      let metadataById = new Map<string, { name?: string }>();
      try {
        const metadata = await projectLookupService.getMetadataForAllProjects({
          includeProjectIds: [...projectIds],
        });
        // Keyed on the NORMALIZED id, and looked up the same way below. `getMetadataForAllProjects`
        // filters `includeProjectIds` case-insensitively, and the metadata it returns carries the
        // casing of whichever factory reported the project first — which need not match the casing
        // send/receive reports. Keying on the raw id would let the filter return the project while
        // the lookup missed it, labelling it with its bare id instead of its name.
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
    }, [effectiveProjectIds]),
    NO_SYNCING_PROJECTS,
  );

  return useMemo(() => ({ status, syncingProjects }), [status, syncingProjects]);
}

export default useSyncStatus;
