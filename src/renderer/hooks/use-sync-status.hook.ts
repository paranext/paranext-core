import {
  SYNC_SEED_RETRY_INTERVAL_MS,
  SYNC_SEED_RETRY_WINDOW_MS,
  seedWithRetry,
} from '@renderer/services/seed-with-retry.util';
import {
  getSyncActivityState,
  subscribeToSyncActivity,
} from '@renderer/services/sync-activity-store';
import {
  type UnsyncedChangeSets,
  useUnsyncedChanges,
} from '@renderer/hooks/use-unsynced-changes.hook';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { compareProjectShortNames, getErrorMessage } from 'platform-bible-utils';
import { useEvent, usePromise } from 'platform-bible-react';
import type {
  ResultStatus,
  SyncOutcome,
  SyncProgressDetail,
  SyncProgressEvent,
} from 'paratext-bible-send-receive';
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
 * - `unsynced` — no sync is running, the last sync (if any) did not fail, and at least one project
 *   has local changes not yet sent or server changes not yet received. Reported only on a
 *   successful read of those changes: sets that could not be read never yield it
 */
export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'failed' | 'unknown' | 'unsynced';

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

/**
 * Which way a project, or the unsynced projects taken together, are out of step with the server.
 *
 * - `send` — local changes not yet sent
 * - `receive` — server changes not yet received
 * - `both` — changes waiting in both directions
 */
export type UnsyncedDirection = 'send' | 'receive' | 'both';

/** A project out of step with the server, and in which direction. */
export type UnsyncedProject = SyncingProject & {
  /** Which way this project is out of step with the server. */
  direction: UnsyncedDirection;
};

/** How far along the running sync is, when the backend is reporting that. */
export type SyncProgress = {
  /**
   * What to show. For DETERMINATE progress this is the bare current item — usually a project name —
   * which the consumer is expected to present alongside {@link SyncProgress.fraction}. For
   * INDETERMINATE progress it is a complete, already-localized sentence (e.g. ParatextData's
   * "Connection to server lost. Retrying…") and must be shown verbatim.
   */
  text: string;
  /**
   * 0–1 completion fraction, or `undefined` for indeterminate progress. A consumer must not render
   * `0` as "0%" when it means "no idea": absent and zero are different claims.
   */
  fraction?: number;
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
  /**
   * The projects out of step with the server — local changes not yet sent, server changes not yet
   * received, or both — each with its {@link UnsyncedProject.direction}, sorted the same way as
   * {@link SyncStatusInfo.syncingProjects}. Empty both when nothing is out of step and while that is
   * not known, so — as with `syncingProjects` — use {@link SyncStatusInfo.status} to tell the two
   * apart. Filled whatever the status — not only under `unsynced` — because it is read
   * independently of the sync signals, so a `failed` status can still name the projects left
   * unsent.
   *
   * Right after a sync, a project that sync reports as having synced successfully is not counted
   * until the backend has rechecked it (`isRechecking` false; at most `SYNC_SETTLE_TIMEOUT_MS`):
   * until then the lists can still describe the moment before the sync. A sync only the activity
   * signal saw reports no per-project results, so it holds every project it announced, whatever the
   * outcome. Only a sync this hook watched end starts a hold — never a mount.
   */
  unsyncedProjects: readonly UnsyncedProject[];
  /**
   * The direction of {@link SyncStatusInfo.unsyncedProjects} taken together: `both` when any project
   * is out of step both ways or when some projects only need sending and others only receiving,
   * otherwise the one direction they share. `undefined` when nothing is out of step and while that
   * is not known. Like `unsyncedProjects`, set whatever the status.
   */
  unsyncedDirection?: UnsyncedDirection;
  /**
   * Progress within the running sync, or `undefined` when there is none to report — nothing is
   * syncing, or the backend has not sent a progress tick yet.
   *
   * Absent is the common case and not an error: `onSyncProgress` is emitted by the Send/Receive
   * implementation, so a build without one reports a sync with no detail. A consumer must therefore
   * render the sync perfectly well without this.
   */
  syncProgress?: SyncProgress;
  /**
   * Whether the reported verdict came from the backend's sync-activity signal rather than from
   * Send/Receive's own results. There is no per-project detail behind such a verdict, and the sync
   * details view describes a different sync, so a caller offering a way into that detail has
   * nothing to offer for this one. `false` whenever there is no verdict to speak of (`idle`,
   * `syncing`, `unknown`, `unsynced`).
   */
  isVerdictFromBackendOnly: boolean;
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
/** Same reasoning as {@link NO_SYNCING_PROJECTS}, for the unsynced list. */
const NO_UNSYNCED_PROJECTS: readonly UnsyncedProject[] = Object.freeze([]);

/**
 * The direction of the unsynced sets taken together. Both lists being non-empty always means
 * `both`: either some project is in both, or one project needs sending and another receiving.
 */
function deriveUnsyncedDirection(
  sets: UnsyncedChangeSets | undefined,
): UnsyncedDirection | undefined {
  const hasSend = (sets?.toSend.length ?? 0) > 0;
  const hasReceive = (sets?.toReceive.length ?? 0) > 0;
  if (hasSend && hasReceive) return 'both';
  if (hasSend) return 'send';
  if (hasReceive) return 'receive';
  return undefined;
}

/**
 * Attaches each named project's direction from the sets. A project in neither set is dropped: the
 * names resolve asynchronously, so for the length of a lookup the named list can still hold a
 * project the sets have since released, and naming it would claim changes that are no longer
 * waiting.
 */
function withDirections(
  projects: readonly SyncingProject[],
  sets: UnsyncedChangeSets | undefined,
): readonly UnsyncedProject[] {
  if (!sets || projects.length === 0) return NO_UNSYNCED_PROJECTS;
  // Both sides normalized, so the match holds whatever casing either source reports.
  const toSend = new Set(sets.toSend.map(normalizeProjectId));
  const toReceive = new Set(sets.toReceive.map(normalizeProjectId));
  const result: UnsyncedProject[] = [];
  projects.forEach((project) => {
    const id = normalizeProjectId(project.projectId);
    const isSend = toSend.has(id);
    const isReceive = toReceive.has(id);
    if (isSend && isReceive) result.push({ ...project, direction: 'both' });
    else if (isSend) result.push({ ...project, direction: 'send' });
    else if (isReceive) result.push({ ...project, direction: 'receive' });
  });
  return result.length > 0 ? result : NO_UNSYNCED_PROJECTS;
}

/**
 * How long the projects a sync just exchanged stay out of the unsynced count while the backend
 * rechecks them, at most. The backend clears its `isRechecking` flag long before this in practice;
 * the cap keeps a flag that is never cleared (a lost event, a backend that stalls) from hiding
 * unsynced changes indefinitely.
 */
export const SYNC_SETTLE_TIMEOUT_MS = 60_000;

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
 * What a completed run's backend outcome means for this status. A map rather than a chain of
 * comparisons so that a new `SyncOutcome` fails to compile until it is given a status here, instead
 * of silently degrading to `unknown`.
 */
const STATUS_BY_OUTCOME: Record<SyncOutcome, SyncStatus> = {
  succeeded: 'synced',
  failed: 'failed',
};

/**
 * The normalized ids of the projects a completed sync reports as having synced successfully. Empty
 * when `resultsInfo` is not an object or holds no results: absent evidence of success names no
 * project.
 */
export function succeededProjectIds(resultsInfo: unknown): readonly string[] {
  if (typeof resultsInfo !== 'object' || !resultsInfo) return NO_PROJECT_IDS;
  const ids = Object.entries(resultsInfo)
    .filter(([, result]) => {
      if (typeof result !== 'object' || !result || !('resultStatus' in result)) return false;
      return (
        typeof result.resultStatus === 'string' &&
        SUCCEEDED_RESULT_STATUSES.has(result.resultStatus)
      );
    })
    .map(([projectId]) => normalizeProjectId(projectId));
  return ids.length > 0 ? Object.freeze(ids) : NO_PROJECT_IDS;
}

/** A frozen copy of the sets without the given projects in either list. */
export function withoutProjects(
  sets: UnsyncedChangeSets,
  projectIds: readonly string[],
): UnsyncedChangeSets {
  const excluded = new Set(projectIds.map(normalizeProjectId));
  const keep = (ids: readonly string[]) =>
    Object.freeze(ids.filter((id) => !excluded.has(normalizeProjectId(id))));
  return Object.freeze({
    toSend: keep(sets.toSend),
    toReceive: keep(sets.toReceive),
    isRechecking: sets.isRechecking,
  });
}

/**
 * `ids` with every normalized id from `added` it does not already hold appended — or `ids` itself,
 * the same array, when there is nothing new. Returning the same array is what lets a caller tell by
 * identity that nothing changed, which a state update made during render depends on to settle.
 */
function withProjectIdsAdded(ids: readonly string[], added: readonly string[]): readonly string[] {
  const held = new Set(ids);
  const fresh = [...new Set(added.map(normalizeProjectId))].filter((id) => !held.has(id));
  return fresh.length > 0 ? Object.freeze([...ids, ...fresh]) : ids;
}

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
  lastResults?: { resultsInfo?: unknown; sendReceiveDate?: unknown };
};

/**
 * A wire timestamp as milliseconds, or `undefined` when it is not a time that can be ordered.
 *
 * Both signals date the verdict they carry — the claim's `lastResults.sendReceiveDate` and the
 * activity snapshot's `completedAt` — and comparing the two is the only way to tell which verdict
 * describes the sync that just finished. An unreadable value answers `undefined` rather than `NaN`,
 * which compares false against everything and would quietly settle every comparison one way.
 */
function readTimestamp(value: unknown): number | undefined {
  if (typeof value !== 'string') return undefined;
  const time = Date.parse(value);
  return Number.isNaN(time) ? undefined : time;
}

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
 *
 * Projects out of step with the server come from a third input, `useUnsyncedChanges`, which reports
 * local changes not yet sent and server changes not yet received rather than reading either sync
 * signal. It contributes the `unsynced` status, {@link SyncStatusInfo.unsyncedProjects} (named and
 * sorted exactly as the syncing projects are, each with its direction) and
 * {@link SyncStatusInfo.unsyncedDirection}; how it ranks against the sync signals is set out at the
 * `status` derivation below.
 *
 * Projects a sync just exchanged are held out of the unsynced count until the backend has rechecked
 * them; see {@link SyncStatusInfo.unsyncedProjects}.
 */
export function useSyncStatus(): SyncStatusInfo {
  // Starts `unknown`, not `idle`: until the seed answers, nothing here knows whether a sync is
  // running, and `idle` is the positive claim "nothing has synced" that the read has not earned.
  // The button label is the same for both, so this changes only what the popover says while the
  // seed is still in flight — from "No sync is running" to "The sync status isn't available right
  // now," which is what is true during a cold start with a scheduled sync already under way.
  const [claimStatus, setClaimStatus] = useState<SyncStatus>('unknown');
  /**
   * When the sync {@link claimStatus}'s verdict describes finished, in milliseconds, or `undefined`
   * when there is no dated verdict to compare — the claim has reached none, or the snapshot
   * carrying it did not date it. Ordered against the activity signal's own outcome time to tell
   * which of the two verdicts describes the sync that just finished.
   */
  const [claimVerdictAt, setClaimVerdictAt] = useState<number | undefined>(undefined);
  const [syncingProjectIds, setSyncingProjectIds] = useState<readonly string[]>(NO_PROJECT_IDS);
  /**
   * The backend's view of whether a sync is running, for which projects, and how the last one
   * ended, read from the shared sync-activity store (`initSyncActivityService` owns the one
   * subscription and the seed).
   *
   * Independent of the claim because it covers paths the claim cannot see (see
   * `SyncActivitySnapshot`). `isSyncing` is `undefined` when no snapshot has answered — a cold
   * start still in flight, or permanently on a build predating this signal — which the derivation
   * below treats as "no input from this signal" rather than as a claim in either direction.
   * `outcome` is likewise `undefined` whenever the backend cannot say, and is never read as a
   * verdict.
   *
   * Read through the store rather than subscribed here so both this hook and the toolbar's mount
   * gate see one validated snapshot, and so the seed survives this hook unmounting (a Simple/Power
   * toggle) instead of restarting.
   */
  const {
    isSyncing: activitySyncing,
    projectIds: activityProjectIds,
    outcome: activityOutcome,
    completedAt: activityCompletedAt,
  } = useSyncExternalStore(subscribeToSyncActivity, getSyncActivityState);
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
   * presenting it as this one's outcome would put a green check on a sync the claim knows nothing
   * about — and, if that sync failed, on one that failed. The activity signal's own `outcome` is
   * what fills the gap when it has one. Cleared as soon as the claim reports anything of its own
   * again — from an event, or from the seed's own read, which is the only one of the two that ever
   * happens on a Simple-mode launch.
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
   * The projects a sync this hook watched end just exchanged successfully, held out of the unsynced
   * count until the backend has rechecked them (see the `isHolding` derivation below). Set only
   * when a sync ends — from the claim's end-of-sync read, or from an activity-only sync ending —
   * and never on mount or from the seed, so a hold always starts from a sync this hook saw.
   */
  const [settlingProjectIds, setSettlingProjectIds] = useState<readonly string[]>(NO_PROJECT_IDS);

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

  /**
   * Applies everything a `getSyncState` snapshot says: the claim's status, the projects it names,
   * when the verdict it carries was reached, and that the claim has now reported something of its
   * own.
   *
   * That last part is why every path applying a snapshot goes through here. The stale flag is
   * otherwise only ever cleared by an EVENT, and the paths that set it are precisely the ones the
   * claim raises no event for — so a Simple-mode launch would set it once, find nothing to clear
   * it, and report `unknown` for the rest of the session.
   */
  const applyClaimSnapshot = useCallback(
    (state: ReadableSyncState) => {
      setClaimStatus(deriveStatusFromSnapshot(state));
      applySyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_IDS);
      setClaimVerdictAt(readTimestamp(state.lastResults?.sendReceiveDate));
      setIsClaimVerdictStale(false);
    },
    [applySyncingProjectIds],
  );

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
        apply: applyClaimSnapshot,
        // Out of budget with no answer. Set explicitly rather than relying on the initial
        // `unknown` still standing: an event may have moved the claim on and then been superseded,
        // and "we could not find out" is the only claim this path has earned.
        onExhausted: () => setClaimStatus('unknown'),
        hasEventApplied: () => hasAppliedEventRef.current,
        runRef,
        logLabel: 'sync status',
      }),
    // `seedGeneration` is a dependency so that bumping it restarts this loop; see its declaration.
    [readSyncState, applyClaimSnapshot, seedGeneration],
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
        apply: applyClaimSnapshot,
        // Nothing to say: the `unknown` this loop was started to improve on is already showing, and
        // it remains the honest answer.
        hasEventApplied: () => sequence !== eventSequenceRef.current,
        runRef: eventReadRunRef,
        logLabel: 'sync status after an unreadable event',
      });
    },
    [readSyncState, applyClaimSnapshot],
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
          applyClaimSnapshot(state);
          // A sync ending that succeeded for some projects starts a hold on exactly those; any other
          // event (a start, a still-running claim, a later sync) replaces the previous hold, so a
          // hold never outlives the sync it describes.
          setSettlingProjectIds(
            !isSyncing && !state.isSyncing
              ? succeededProjectIds(state.lastResults?.resultsInfo)
              : NO_PROJECT_IDS,
          );
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
    [readSyncState, applySyncingProjectIds, applyClaimSnapshot, startEventReadRetry],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  useEvent(onSyncStateChanged, handleSyncStateChanged);

  /**
   * Progress within the running sync, from `onSyncProgress`.
   *
   * Held separately from every other input and never unioned with them: it is DETAIL about a sync
   * something else has already established is running, not evidence that one is. Treating a
   * progress tick as a third authority on "is a sync running" would let a late or duplicated tick
   * assert a sync after it ended — the reverse of the direction this hook is careful about
   * everywhere else.
   */
  const [syncProgress, setSyncProgress] = useState<SyncProgress | undefined>(undefined);

  const handleSyncProgress = useCallback((detail: SyncProgressDetail) => {
    // Untrusted wire data, like every other payload here. Text is the only required half; a
    // malformed `progressValue` degrades to indeterminate rather than discarding the message.
    if (typeof detail?.progressText !== 'string' || detail.progressText === '') return;
    const fraction = detail.progressValue;
    setSyncProgress({
      text: detail.progressText,
      // `null` means indeterminate on the wire, and a value outside 0–1 is not a fraction. Both
      // become `undefined`, which consumers render as "no percent" rather than as 0%.
      fraction:
        typeof fraction === 'number' && Number.isFinite(fraction) && fraction >= 0 && fraction <= 1
          ? fraction
          : undefined,
    });
  }, []);

  const onSyncProgress = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onSyncProgress'),
    [],
  );
  useEvent(onSyncProgress, handleSyncProgress);

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
   * The run the activity signal is reporting — or the last one it reported — whether the claim saw
   * that same run, and, while it runs, every project it has announced. The claim seeing it has to
   * be recorded while the run is still going, because afterwards `claimStatus` no longer separates
   * the two cases. Once it ends, `didClaimSee` still describes that run, which is what tells a
   * verdict about THIS sync apart from one an unrelated earlier sync left behind.
   *
   * Tracked DURING RENDER rather than in an effect, which would settle the flag one commit late —
   * and that commit renders, and announces, the claim's earlier verdict as this run's. The toolbar
   * reads the settling status to decide whether a non-success outcome is the cancel the user asked
   * for, so the late commit also reports a cancelled sync as a failure. Setting state during render
   * re-renders before anything is shown, which keeps the run ending and its verdict in one commit.
   *
   * The announced projects are what a run the claim never saw holds out of the unsynced count when
   * it ends (see {@link SyncStatusInfo.unsyncedProjects}): there is no claim result to name the
   * projects it exchanged.
   */
  const [activityRun, setActivityRun] = useState<{
    isSyncing: boolean;
    didClaimSee: boolean;
    projectIds: readonly string[];
  }>({ isSyncing: false, didClaimSee: false, projectIds: NO_PROJECT_IDS });
  if (activitySyncing) {
    // A run that has just opened starts this over, so the claim is only ever recorded as having
    // seen THIS run — and its projects only ever gathered from it — rather than inheriting either
    // from the one before it.
    const didClaimSee =
      (activityRun.isSyncing && activityRun.didClaimSee) || claimStatus === 'syncing';
    const announcedIds = activityRun.isSyncing ? activityRun.projectIds : NO_PROJECT_IDS;
    const projectIds = withProjectIdsAdded(announcedIds, activityProjectIds);
    if (
      !activityRun.isSyncing ||
      didClaimSee !== activityRun.didClaimSee ||
      projectIds !== announcedIds
    )
      setActivityRun({ isSyncing: true, didClaimSee, projectIds });
  } else if (activityRun.isSyncing) {
    // `undefined` (the signal cannot tell) lands here too, and deliberately: a run it reported and
    // can no longer account for has an unknowable outcome, which is what `unknown` says. Only the
    // never-was-syncing case falls through, because there is no run to have lost track of.
    setActivityRun({
      isSyncing: false,
      didClaimSee: activityRun.didClaimSee,
      projectIds: NO_PROJECT_IDS,
    });
    if (!activityRun.didClaimSee) {
      setIsClaimVerdictStale(true);
      // No claim result says which projects this run exchanged, so the projects it announced stand
      // in: they are held out of the unsynced count until the backend has rechecked them.
      setSettlingProjectIds(activityRun.projectIds);
    }
  }

  const unsyncedSets = useUnsyncedChanges();
  /**
   * Right after a sync, the unsynced lists can still describe the moment before it: a project the
   * sync just sent would be counted as unsynced until the backend rechecks it, and the indicator
   * would show "Unsynced changes" between the sync's end and its "Synced". So while the backend
   * reports `isRechecking`, a project that sync reported as having synced successfully is left out
   * of the lists (at most {@link SYNC_SETTLE_TIMEOUT_MS}); every other project is reported at once.
   * Only a sync this hook watched end starts a hold — never a mount.
   */
  const isHolding = settlingProjectIds.length > 0 && unsyncedSets?.isRechecking === true;
  const effectiveSets = useMemo(
    () =>
      unsyncedSets && isHolding ? withoutProjects(unsyncedSets, settlingProjectIds) : unsyncedSets,
    [unsyncedSets, isHolding, settlingProjectIds],
  );
  // The hold ends when the backend finishes rechecking...
  useEffect(() => {
    if (settlingProjectIds.length > 0 && unsyncedSets?.isRechecking !== true)
      setSettlingProjectIds(NO_PROJECT_IDS);
  }, [settlingProjectIds, unsyncedSets?.isRechecking]);
  // ...or after the cap, if it never says so.
  useEffect(() => {
    if (settlingProjectIds.length === 0) return undefined;
    const timer = setTimeout(() => setSettlingProjectIds(NO_PROJECT_IDS), SYNC_SETTLE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [settlingProjectIds]);
  const unsyncedDirection = deriveUnsyncedDirection(effectiveSets);
  const hasUnsynced = unsyncedDirection !== undefined;
  /**
   * Every project in either set, once. Derived from the lists' identity, which the unsynced-changes
   * hook keeps while a list is unchanged, so the name lookup keyed on this does not re-run.
   */
  const effectiveToSend = effectiveSets?.toSend;
  const effectiveToReceive = effectiveSets?.toReceive;
  const unsyncedProjectIds = useMemo(
    () =>
      effectiveToSend && effectiveToReceive
        ? Object.freeze([...new Set([...effectiveToSend, ...effectiveToReceive])])
        : NO_PROJECT_IDS,
    [effectiveToSend, effectiveToReceive],
  );

  /**
   * The single derived status. The OR is deliberate and monotone: either input claiming a sync is
   * enough — including when the claim's own read has failed (`claimStatus === 'unknown'`), since
   * `unknown` means "the claim could not tell", not "nothing is syncing", and the activity signal
   * CAN tell. So the union can be late to CLEAR but can never report idle (or unknown) while a sync
   * is running. Erring toward "still syncing" is the safe direction for an ambient indicator — and
   * showing idle mid-sync is precisely the bug this hook exists to fix. Do not add a third
   * authority here; add an input.
   *
   * Which verdict a finished sync ends with depends on what can be established about the two. When
   * this hook watched a run end that the claim never saw — the Simple-mode startup sync, the
   * picker's per-project sync — the claim's verdict belongs to a different sync, so the backend's
   * `outcome` answers, or `unknown` when there is none. When the claim has reached no verdict at
   * all (`idle`/`unknown`), the outcome is the only one on offer. When both carry a verdict, the
   * one describing the run that finished LATER wins, which is what their timestamps settle; where a
   * build dates neither, the claim's richer per-project verdict stands. Reporting `unknown` rather
   * than guessing is the point of that state: a sync happened and how it went is not knowable,
   * which beats decorating it with an unrelated sync's green check.
   *
   * The reverse direction is deliberately NOT wired: the activity signal reporting `isSyncing:
   * false` does not clear a claim that says `syncing`. The two disagree that way for an ordinary
   * reason — a claim event can arrive before the backend's run marker is set — so treating the
   * disagreement as a stuck claim would flicker every normal sync through a wrong state at its
   * start. A genuinely stranded claim would need a signal that distinguishes the two, which neither
   * input carries today.
   *
   * Changes waiting in either direction are a separate input, read independently of either sync
   * signal, and they rank below a running sync and below a failed one. A running sync is in the
   * middle of exchanging them, so `syncing` is the true and current answer. A failed sync already
   * implies work was left unexchanged and is the more actionable of the two facts — it leads the
   * user to the details that say why — so `failed` keeps the indicator, whichever signal reported
   * it. Over every other state the sets win: a sync finishing says nothing about edits made since,
   * on either side, and neither a claim that could not be read nor a stale verdict unmakes a fact
   * read from the repository or the server. Sets that are not known (`undefined`) are no input at
   * all, never a claim that something is waiting.
   *
   * Projects a sync just exchanged are held out of these sets until rechecked; see
   * {@link SyncStatusInfo.unsyncedProjects}.
   */
  const { status, isVerdictFromBackendOnly } = ((): {
    status: SyncStatus;
    isVerdictFromBackendOnly: boolean;
  } => {
    /** A verdict Send/Receive reached itself — or none at all — so its detail view fits. */
    const claimVerdict = (value: SyncStatus) => ({
      status: value,
      isVerdictFromBackendOnly: false,
    });
    /** A verdict from the backend signal, which carries no per-project detail behind it. */
    const backendVerdict = (value: SyncStatus) => ({
      status: value,
      isVerdictFromBackendOnly: true,
    });
    if (activitySyncing) return claimVerdict('syncing');
    // A claim that is itself reporting a sync is describing the current one, not an earlier one.
    if (claimStatus === 'syncing') return claimVerdict('syncing');
    /** How the finished sync went, before any changes waiting since are weighed against it. */
    const settleFinishedVerdict = () => {
      const outcomeStatus = activityOutcome ? STATUS_BY_OUTCOME[activityOutcome] : undefined;
      // A run ended here that the claim never saw, so whatever verdict it holds is not this run's.
      if (isClaimVerdictStale)
        return outcomeStatus ? backendVerdict(outcomeStatus) : claimVerdict('unknown');
      if (!outcomeStatus) return claimVerdict(claimStatus);
      // The claim reached no verdict of its own, so the backend's outcome is the only one on offer.
      if (claimStatus === 'idle' || claimStatus === 'unknown') return backendVerdict(outcomeStatus);
      // The claim saw the run this outcome describes, so both verdicts are about the SAME sync and
      // its per-project results are the richer account. Ordering them by time here would compare
      // two clocks for one run — and the run bracket closes last, so the coarse verdict would
      // usually win, taking the way into the detail behind it along with it.
      if (activityRun.didClaimSee) return claimVerdict(claimStatus);
      // Two verdicts from two signals, each about a run the other never saw. The one describing the
      // run that finished later is this sync's.
      const outcomeAt = readTimestamp(activityCompletedAt);
      if (outcomeAt !== undefined && claimVerdictAt !== undefined)
        return outcomeAt > claimVerdictAt
          ? backendVerdict(outcomeStatus)
          : claimVerdict(claimStatus);
      // Nothing dates them, so nothing orders them, and the claim's per-project verdict is the
      // richer of the two. A build that does not report an outcome time lands here.
      return claimVerdict(claimStatus);
    };
    const verdict = settleFinishedVerdict();
    // Changes waiting in either direction outrank every finished verdict but a failure, whichever
    // signal reached it. `unsynced` is no verdict about a sync, so it withholds no detail.
    return hasUnsynced && verdict.status !== 'failed' ? claimVerdict('unsynced') : verdict;
  })();

  // Progress describes a RUNNING sync, so it is dropped the moment one is not. Without this the last
  // tick of the previous sync would sit in the popover — a stale project name and percent under a
  // "The last sync finished" message, and the first thing shown for the NEXT sync before its own
  // first tick arrives.
  useEffect(() => {
    if (status !== 'syncing') setSyncProgress(undefined);
  }, [status]);

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

  const syncingProjects = useProjectNames(effectiveProjectIds);
  const namedUnsyncedProjects = useProjectNames(unsyncedProjectIds);
  const unsyncedProjects = useMemo(
    () => withDirections(namedUnsyncedProjects, effectiveSets),
    [namedUnsyncedProjects, effectiveSets],
  );

  return useMemo(
    () => ({
      status,
      syncingProjects,
      unsyncedProjects,
      unsyncedDirection,
      syncProgress,
      isVerdictFromBackendOnly,
    }),
    [
      status,
      syncingProjects,
      unsyncedProjects,
      unsyncedDirection,
      syncProgress,
      isVerdictFromBackendOnly,
    ],
  );
}

/**
 * Resolves project ids to the named, sorted list {@link SyncStatusInfo} hands its consumers. Shared
 * by every list it reports, so the same project is labelled — and ordered — the same way in each.
 *
 * Keyed on the identity of `projectIds`, so callers must keep it stable while the set is unchanged
 * (see {@link isSameProjectIdSet}); a fresh array per render would re-run the lookup on every one.
 */
function useProjectNames(projectIds: readonly string[]): readonly SyncingProject[] {
  const [projects] = usePromise(
    useCallback(async () => {
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
        logger.warn(`Could not resolve names of sync status projects: ${getErrorMessage(e)}`);
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
          // Input order carries no meaning — no input guarantees one, and the same set can arrive
          // in a different order between reads — so sorting is what keeps an open popover from
          // reshuffling under the user. Ties break on id, because two projects sharing a display name (or both falling back to their
          // id) would otherwise be left in exactly the meaningless order the sort exists to remove.
          .sort(
            (a, b) =>
              compareProjectShortNames(a.name, b.name) || a.projectId.localeCompare(b.projectId),
          )
      );
    }, [projectIds]),
    NO_SYNCING_PROJECTS,
  );
  return projects;
}

export default useSyncStatus;
