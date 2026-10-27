/**
 * Store holding the backend's view of whether a Send/Receive run is in progress, for which
 * projects, and how the last one ended.
 *
 * Backend-authoritative snapshot model, the same shape as {@link ./auto-sync-blocking-store}: the
 * dotnet run bracket is the single source of truth, emits a full snapshot — `isSyncing`,
 * `projectIds`, `outcome` and `completedAt` — on every transition, and the producer applies it via
 * {@link setSyncActivity}. There is deliberately no local ref-counting and no timer-driven opinion
 * about whether a sync is running.
 *
 * One store rather than a subscription per consumer, because two consumers need the same answer at
 * different altitudes: the toolbar needs it to decide whether to MOUNT the sync indicator at all,
 * and `useSyncStatus` needs it as one of the two inputs it unions into a status. A subscription
 * each meant two deliveries of every snapshot, two validators, and a re-render of the whole toolbar
 * on every sync tick even in Power mode, where no consumer reads the answer.
 *
 * `isSyncing` is deliberately THREE-valued. `undefined` means "the backend could not be asked" —
 * the seed exhausted its retry budget with no answer — which the status union treats as "no input
 * from this signal" rather than as a claim in either direction. Collapsing it to `false` would let
 * a failed read assert that nothing is syncing.
 */

import { deepEqual, normalizeProjectId } from 'platform-bible-utils';
import type { SyncOutcome } from 'paratext-bible-send-receive';

const NO_PROJECT_IDS: readonly string[] = Object.freeze([]);

/** The snapshot consumers read. Replaced wholesale; never mutated in place. */
export type SyncActivityStoreState = {
  /**
   * Whether the backend reports a sync run in progress. `undefined` means the backend could not be
   * asked — NOT that nothing is syncing.
   */
  readonly isSyncing: boolean | undefined;
  /**
   * The projects the current run covers, once known. Empty while {@link isSyncing} is true and the
   * scheduled path has not yet resolved its merge set, and empty when not syncing.
   */
  readonly projectIds: readonly string[];
  /**
   * How the most recently completed run turned out, when the backend says. `undefined` means
   * "cannot say" — nothing has answered, the build does not report it, no run has completed, or a
   * run is in progress — and is NEVER a verdict in either direction.
   *
   * Always `undefined` while {@link isSyncing} is true: an outcome describes a COMPLETED run, so one
   * beside a running sync could only be the previous run's.
   */
  readonly outcome: SyncOutcome | undefined;
  /**
   * When the run {@link outcome} describes finished, as the ISO 8601 string the backend sent.
   * Present exactly when {@link outcome} is.
   *
   * What it is for: a consumer reading both sync signals holds two verdicts, and this is what tells
   * an outcome for the run that just finished apart from one left over from an earlier sync.
   */
  readonly completedAt: string | undefined;
  /**
   * Whether a sync run has been observed at any point in this renderer's life. STICKY — it never
   * goes back to false.
   *
   * This is what decides whether the sync indicator is mounted, and it is separate from
   * {@link isSyncing} on purpose. A gate driven by the live flag unmounts the indicator in the same
   * commit the sync finishes, which discards the terminal state before it can be rendered or
   * announced and tears down the status hook's seed loops. Once a sync has been seen, the surface
   * that reports on it stays.
   */
  readonly hasObservedSyncRun: boolean;
};

const INITIAL_STATE: SyncActivityStoreState = Object.freeze({
  isSyncing: undefined,
  projectIds: NO_PROJECT_IDS,
  outcome: undefined,
  completedAt: undefined,
  hasObservedSyncRun: false,
});

let state: SyncActivityStoreState = INITIAL_STATE;

const listeners = new Set<() => void>();

/**
 * Publishes a new state, notifying listeners only when it actually differs.
 *
 * The identity check matters beyond saving renders: consumers read this object through
 * `useSyncExternalStore`, which throws on an ever-changing snapshot, so a no-op producer call must
 * leave the existing object in place rather than replace it with an equal one.
 */
function setState(next: SyncActivityStoreState): void {
  if (deepEqual(state, next)) return;
  state = Object.freeze(next);
  listeners.forEach((listener) => listener());
}

/**
 * Replaces the backend sync-activity snapshot. The sole producer API for a snapshot that ANSWERED —
 * from the seed or from a live event — so callers must have validated it first.
 *
 * `hasObservedSyncRun` latches here rather than in the gate that reads it, so every consumer sees
 * one consistent answer.
 */
export function setSyncActivity(snapshot: {
  isSyncing: boolean;
  projectIds?: readonly string[];
  outcome?: SyncOutcome;
  completedAt?: string;
}): void {
  // Canonicalize to upper once at ingestion, as `auto-sync-blocking-store` does and for the same
  // reason: a project id's casing is not stable across the sources that report it, the backend
  // matches ids OrdinalIgnoreCase, and the canonical project id is upper
  // (`ProjectMetadata.Id = id.ToUpperInvariant()`). Consumers compare and look up by value, so a set
  // that only flipped case would otherwise read as a change and re-run every consumer's metadata
  // lookup for nothing.
  const projectIds = snapshot.isSyncing
    ? (snapshot.projectIds?.map(normalizeProjectId) ?? NO_PROJECT_IDS)
    : NO_PROJECT_IDS;
  setState({
    isSyncing: snapshot.isSyncing,
    projectIds,
    // Dropped while syncing, as the ids are dropped when not: the contract already says an outcome
    // is absent during a run, so this keeps a producer that breaks that from handing consumers the
    // previous run's verdict as the running one's.
    outcome: snapshot.isSyncing ? undefined : snapshot.outcome,
    // Travels with the outcome, which it exists to date: a time with no verdict against it says
    // nothing, and would order a verdict this store does not have.
    completedAt: snapshot.isSyncing || !snapshot.outcome ? undefined : snapshot.completedAt,
    hasObservedSyncRun: state.hasObservedSyncRun || snapshot.isSyncing,
  });
}

/**
 * Records that the backend could not be asked — the seed's retry window closed with no answer, or
 * send/receive went away in a reload while it last reported a run in progress.
 *
 * Distinct from `setSyncActivity({ isSyncing: false })`: that asserts nothing is syncing, this
 * asserts nothing is known. Without it, a signal that disappears mid-run would pin the union at
 * `syncing` — a spinner and a live Cancel over a sync nothing can still see — for the life of the
 * renderer. "Nothing is known" covers how the last run went, too, so the outcome is cleared.
 *
 * `hasObservedSyncRun` is deliberately NOT cleared: a sync that was observed and can no longer be
 * accounted for is exactly the case whose outcome the indicator still has to report.
 */
export function setSyncActivityUnknown(): void {
  setState({
    isSyncing: undefined,
    projectIds: NO_PROJECT_IDS,
    outcome: undefined,
    completedAt: undefined,
    hasObservedSyncRun: state.hasObservedSyncRun,
  });
}

/** The current snapshot. Stable by identity until it actually changes. */
export function getSyncActivityState(): SyncActivityStoreState {
  return state;
}

/**
 * Whether a sync run has been observed at any point this session (sticky). See
 * {@link SyncActivityStoreState.hasObservedSyncRun} for why the sync indicator's gate reads this
 * rather than the live flag.
 */
export function hasObservedSyncRun(): boolean {
  return state.hasObservedSyncRun;
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToSyncActivity(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Resets the store to its initial state.
 *
 * WARNING: Test-only. @internal
 */
export function resetSyncActivity(): void {
  state = INITIAL_STATE;
  listeners.clear();
}
