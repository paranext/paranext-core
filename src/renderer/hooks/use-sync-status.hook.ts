import {
  SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS,
  UNSETTLED_RECHECK_INTERVAL_MS,
} from '@renderer/hooks/use-send-receive-availability.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent, usePromise } from 'platform-bible-react';
import type {
  ResultStatus,
  SyncActivitySnapshot,
  SyncProgressEvent,
  SyncState,
} from 'paratext-bible-send-receive';
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
 * How long to wait between re-seed attempts while the snapshot read is still unanswerable.
 *
 * A read is not cheap to fail: an unregistered command rejects only after `requestWithRetry` has
 * retried it `MAX_REQUEST_ATTEMPTS` times at `REQUEST_ATTEMPT_WAIT_TIME_MS` apart (~9s), so each
 * attempt already spans most of the activation race on its own. This spaces the attempts that
 * follow that.
 *
 * Taken from `useSendReceiveAvailability` rather than restated as a literal, for the same reason as
 * {@link SYNC_SEED_RETRY_WINDOW_MS}: both hooks pace the same race, and a literal here would let the
 * two drift apart while every comment still claimed they matched.
 */
export const SYNC_SEED_RETRY_INTERVAL_MS = UNSETTLED_RECHECK_INTERVAL_MS;

/**
 * How long to keep re-seeding before giving up.
 *
 * Taken from `useSendReceiveAvailability` rather than re-declared, because the two bound the same
 * thing — how long send/receive may take to register its commands on a contended cold start — and
 * that hook gates whether this one is even mounted. Tuning one without the other would leave a
 * window where this control is mounted but has stopped seeding, or has given up while availability
 * is still checking.
 */
export const SYNC_SEED_RETRY_WINDOW_MS = SEND_RECEIVE_AVAILABILITY_RECHECK_WINDOW_MS;

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
 * Maps a snapshot to the status to show. Unlike an event — where `isSyncing: false` always means a
 * sync just finished — a snapshot's `isSyncing: false` only means one is not running, which is also
 * true before anything has synced. `lastResults` is what separates the two, and what its
 * per-project `resultStatus` values say is what separates a success from a failure. Claiming
 * success requires evidence of success; a `lastResults` whose contents cannot be read is reported
 * as `unknown` rather than as either verdict.
 */
function deriveStatusFromSnapshot(state: SyncState): SyncStatus {
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
function isValidSyncState(state: unknown): state is SyncState {
  if (!hasIsSyncingFlag(state)) return false;
  // Checked even though this hook never reads it: the predicate narrows to the WHOLE `SyncState`,
  // so leaving it unvalidated would hand the next reader of that field an `undefined` the type says
  // cannot happen.
  if (!('lastRequestedProjectIds' in state) || !Array.isArray(state.lastRequestedProjectIds))
    return false;
  if (state.lastRequestedProjectIds.some((id: unknown) => typeof id !== 'string')) return false;
  return isValidProjectIdsField('syncingProjectIds' in state ? state.syncingProjectIds : undefined);
}

/** Narrows a `getSyncActivity` response. See {@link hasIsSyncingFlag}. */
function isValidSyncActivity(snapshot: unknown): snapshot is SyncActivitySnapshot {
  if (!hasIsSyncingFlag(snapshot)) return false;
  return isValidProjectIdsField('projectIds' in snapshot ? snapshot.projectIds : undefined);
}

/** What one {@link seedWithRetry} loop reads, and what it does with the answer. */
type SeedWithRetryOptions<T> = {
  /** Reads a snapshot, resolving `undefined` when it could not be read. Must not throw. */
  read: () => Promise<T | undefined>;
  /** Applies a snapshot that answered. Runs at most once per loop. */
  apply: (snapshot: T) => void;
  /**
   * Runs instead of {@link SeedWithRetryOptions.apply} when the retry window closed with no answer.
   * Omit when there is nothing to say — leaving the initial state standing IS the honest answer.
   */
  onExhausted?: () => void;
  /**
   * Whether a live event has already been applied to this input's state. Checked before and after
   * each read: once true the snapshot is stale by definition and there is nothing left to retry
   * for. Read through a callback rather than passed by value so each attempt sees the current
   * answer.
   */
  hasEventApplied: () => boolean;
  /**
   * The run counter for this loop's input, bumped here on start and on cleanup so a read resolving
   * after teardown is recognised and dropped rather than setting state on an unmounted hook.
   *
   * Owned by the input rather than by this loop: the claim's counter is shared with the follow-up
   * read `handleSyncStateChanged` issues, so a teardown cancels that read too. What must not be
   * shared is one input's counter with the OTHER input's loop — see this function's own doc.
   */
  runRef: { current: number };
  /** Names this input in the two "unexpected failure" logs, e.g. `sync status`, `sync activity`. */
  logLabel: string;
};

/**
 * Runs one seed-with-retry loop, started by an effect and stopped by the cleanup it returns. Both
 * inputs this hook unions need the same loop — mount, read a snapshot, retry on a spare schedule
 * while the command may still be unregistered, stop the moment a live event has made the snapshot
 * stale — so it lives here once, parameterized by what to read and what to do with the answer.
 *
 * Nothing is shared BETWEEN the two loops. This function holds no state of its own: every piece of
 * mutable state a loop touches ({@link SeedWithRetryOptions.runRef},
 * {@link SeedWithRetryOptions.hasEventApplied}, and whatever
 * {@link SeedWithRetryOptions.apply}/{@link SeedWithRetryOptions.onExhausted} write) is supplied by
 * the caller, so one loop giving up, retrying, or being torn down cannot reach the other's state.
 * That independence is required (see the two effects below); sharing the plumbing must not cost
 * it.
 */
function seedWithRetry<T>({
  read,
  apply,
  onExhausted,
  hasEventApplied,
  runRef,
  logLabel,
}: SeedWithRetryOptions<T>): () => void {
  runRef.current += 1;
  const run = runRef.current;
  let retryTimeout: ReturnType<typeof setTimeout> | undefined;

  const seed = async (deadline: number) => {
    // Checked before the read as well as after it: a retry scheduled before an event arrived would
    // otherwise spend a whole RPC round trip on an answer that is already known to be discarded.
    if (hasEventApplied()) return;
    const snapshot = await read();
    if (run !== runRef.current) return;
    // An event beat the snapshot here. It describes a later moment, so the snapshot is discarded
    // rather than merged — applying only part of it would pair this sync's status with values from
    // before the transition. No point retrying either: the live stream has taken over.
    if (hasEventApplied()) return;

    if (!snapshot) {
      if (performance.now() >= deadline) {
        onExhausted?.();
        return;
      }
      retryTimeout = setTimeout(() => {
        seed(deadline).catch((e: unknown) => {
          logger.warn(`Unexpected failure re-seeding ${logLabel}: ${getErrorMessage(e)}`);
        });
      }, SYNC_SEED_RETRY_INTERVAL_MS);
      return;
    }

    apply(snapshot);
  };

  // Monotonic, not wall-clock: this runs during startup, when the wall clock can be stepped. A step
  // backwards would stretch the retry window and a step forwards would close it before the
  // activation race it exists to cover has played out.
  seed(performance.now() + SYNC_SEED_RETRY_WINDOW_MS).catch((e: unknown) => {
    // `read` swallows its own failures, so reaching here means a bug in the code above rather than
    // an unavailable command — worth a log that says so.
    logger.warn(`Unexpected failure seeding ${logLabel}: ${getErrorMessage(e)}`);
  });

  return () => {
    runRef.current += 1;
    if (retryTimeout) clearTimeout(retryTimeout);
  };
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
 * (`syncOnProjectSwitch`). That gap is what {@link SyncActivitySnapshot} closes: it is derived from
 * the C# sync run marker rather than the extension's claim map, so it sees every path including
 * these two. This hook unions the two signals (see the `status` derivation below) rather than
 * relying on the claim alone. See ADR-0024 in `.context/standards/Architecture-Decisions.md` for
 * the fuller history of that gap.
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
   * The backend's view of whether a sync is running, from `onSyncActivityChanged` /
   * `getSyncActivity`. Independent of the claim because it covers paths the claim cannot see (see
   * {@link SyncActivitySnapshot}); `undefined` until a snapshot answers, or permanently when the
   * command is unavailable (public Platform.Bible, or a Studio build predating this signal).
   */
  const [activitySyncing, setActivitySyncing] = useState<boolean | undefined>(undefined);
  /**
   * Projects the activity signal reports syncing right now. Kept in its OWN state, written only by
   * the activity seed/event handlers below, rather than sharing {@link syncingProjectIds} — the
   * claim handler deliberately clears that state and re-reads it on every `isSyncing: true` event
   * (see {@link handleSyncStateChanged}), and a second writer landing inside that clear-then-read
   * window would race it. {@link effectiveProjectIds} is the one place the two are combined.
   */
  const [activityProjectIds, setActivityProjectIds] = useState<readonly string[]>(NO_PROJECT_IDS);
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
   * its own again.
   */
  const [isClaimVerdictStale, setIsClaimVerdictStale] = useState(false);
  /**
   * Bumped to restart both seed loops. Extensions reloading can add send/receive mid-session, and a
   * seed that spent its whole retry budget before that has no other way back — nothing fires
   * between syncs, so a status pinned at `unknown` would stay there until the renderer reloaded.
   */
  const [seedGeneration, setSeedGeneration] = useState(0);

  /**
   * Whether a state read triggered by an `onSyncStateChanged` event has been APPLIED. Once one has,
   * the mount snapshot is stale by definition and must not overwrite it — and the seed has nothing
   * left to retry for.
   *
   * Set where state is actually applied, not on the handler's entry: an event whose own follow-up
   * read fails has applied nothing, and killing the seed there would strand the status on the
   * `unknown` that failure produces while the seed still had budget left to get a real answer.
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
   * Whether an `onSyncActivityChanged` event has been applied. Independent of
   * {@link hasAppliedEventRef}: a claim event must not stop the activity seed from retrying, and an
   * activity event must not stop the claim seed from retrying — each input seeds and retries on its
   * own schedule.
   */
  const hasAppliedActivityEventRef = useRef(false);
  /** Same purpose as {@link runRef}, but for the activity seed's own effect. */
  const activityRunRef = useRef(0);

  /**
   * Replaces the id set only when it differs BY VALUE, so a read that returns the same projects in
   * a fresh array (or a different claim order) doesn't re-fire the metadata lookup keyed on it
   * below.
   */
  const applySyncingProjectIds = useCallback((nextIds: readonly string[]) => {
    setSyncingProjectIds((prevIds) => (isSameProjectIdSet(prevIds, nextIds) ? prevIds : nextIds));
  }, []);

  /** Same reasoning as {@link applySyncingProjectIds}, for {@link activityProjectIds}. */
  const applyActivityProjectIds = useCallback((nextIds: readonly string[]) => {
    setActivityProjectIds((prevIds) => (isSameProjectIdSet(prevIds, nextIds) ? prevIds : nextIds));
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

  const readSyncActivity = useCallback(async (): Promise<SyncActivitySnapshot | undefined> => {
    try {
      const activity = await sendCommand('paratextBibleSendReceive.getSyncActivity');
      if (!isValidSyncActivity(activity)) {
        logger.warn(
          'Send/receive returned a sync activity snapshot in an unexpected shape; ignoring it',
        );
        return undefined;
      }
      return activity;
    } catch (e) {
      // Unavailable on a cold start (not registered yet), or permanently on public Platform.Bible /
      // a Studio build predating this command. Either way the caller keeps whatever state it
      // already has.
      logger.warn(`Could not read send/receive sync activity: ${getErrorMessage(e)}`);
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
   * Seeds {@link activitySyncing}/{@link activityProjectIds} from a snapshot on mount, mirroring the
   * claim seed effect above (same helper, same retry constants, same reasoning: a consumer can
   * mount mid-sync or during the cold-start activation race, and this command can be temporarily or
   * permanently unavailable). Kept as its own effect with its own refs, its own state setters and
   * its own retry budget rather than folded into the claim seed: the two inputs must retry and
   * clear independently, on separate state, so neither can stop or race the other — a claim event
   * or a claim seed that gives up must not end the activity seed's retries, and vice versa.
   * {@link seedWithRetry} shares only the plumbing — it holds no state of its own.
   *
   * `onExhausted` puts {@link activitySyncing} back to `undefined` — "could not tell", which the
   * derived status treats as "no input from this signal" rather than as a claim in either
   * direction. On the very first mount that is already its value, but {@link seedGeneration} can
   * restart this loop after an extension reload, and by then the value is whatever the last
   * snapshot or event left behind. Send/receive going away in a reload while it last reported
   * `isSyncing: true` would otherwise pin the union at `syncing` — a spinner and a live Cancel over
   * a sync nothing can still see — for the life of the renderer.
   *
   * Unlike the claim's `SyncProgressEvent`, a `SyncActivitySnapshot` already carries `isSyncing`
   * AND `projectIds` together, so there is no follow-up read to sequence here — the snapshot (from
   * the seed or from an event) is applied directly.
   */
  useEffect(
    () =>
      seedWithRetry({
        read: readSyncActivity,
        apply: (activity) => {
          setActivitySyncing(activity.isSyncing);
          applyActivityProjectIds(activity.projectIds ?? NO_PROJECT_IDS);
        },
        onExhausted: () => {
          setActivitySyncing(undefined);
          applyActivityProjectIds(NO_PROJECT_IDS);
        },
        hasEventApplied: () => hasAppliedActivityEventRef.current,
        runRef: activityRunRef,
        logLabel: 'sync activity',
      }),
    // `seedGeneration` is a dependency so that bumping it restarts this loop; see its declaration.
    [readSyncActivity, applyActivityProjectIds, seedGeneration],
  );

  const handleSyncStateChanged = useCallback(
    ({ isSyncing }: SyncProgressEvent) => {
      eventSequenceRef.current += 1;
      const sequence = eventSequenceRef.current;
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
      if (isSyncing) {
        setClaimStatus('syncing');
        // State from this event has been applied, so the mount snapshot is stale from here on.
        hasAppliedEventRef.current = true;
      }

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
            // Nothing is applied from a snapshot here, so this path does not itself end the seed —
            // but in the ordinary ordering the seed is already finished, because the `isSyncing:
            // true` event that opened this sync set `hasAppliedEventRef` above. The seed still has
            // budget to turn this `unknown` into a real answer only when no `true` event preceded
            // this one: the hook mounted mid-sync, or the sync started before it was listening.
            if (!isSyncing) setClaimStatus('unknown');
            return undefined;
          }
          setClaimStatus(deriveStatusFromSnapshot(state));
          applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
          hasAppliedEventRef.current = true;
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
    [readSyncState, applySyncingProjectIds],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  useEvent(onSyncStateChanged, handleSyncStateChanged);

  /**
   * Unlike {@link handleSyncStateChanged}, the activity snapshot already carries `projectIds`
   * alongside `isSyncing`, so it is applied directly with no follow-up read to sequence.
   */
  const handleSyncActivityChanged = useCallback(
    (activity: SyncActivitySnapshot) => {
      hasAppliedActivityEventRef.current = true;
      setActivitySyncing(activity.isSyncing);
      applyActivityProjectIds(activity.projectIds ?? NO_PROJECT_IDS);
    },
    [applyActivityProjectIds],
  );

  // No explicit payload type argument on either subscription: the seam declares both events in
  // `NetworkEvents`, so the bare call infers the payload from the event name — and passing one binds
  // the deprecated `(eventType: string)` overload instead.
  const onSyncActivityChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncActivityChanged'),
    [],
  );
  useEvent(onSyncActivityChanged, handleSyncActivityChanged);

  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  const handleExtensionsReloaded = useCallback(() => {
    // Send/receive may have just arrived, or restarted — either way both event streams start over,
    // so an event applied before the reload no longer stands as a reason to skip re-seeding.
    hasAppliedEventRef.current = false;
    hasAppliedActivityEventRef.current = false;
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
