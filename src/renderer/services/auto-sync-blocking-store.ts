/**
 * Store tracking which projects an automatic (scheduled or session) Send/Receive is currently
 * blocking edits on.
 *
 * BACKEND-AUTHORITATIVE SNAPSHOT model (PT-4214 Stage U): the backend write gate is the single
 * source of truth. It emits a full snapshot of the blocked project ids on every arm/disarm, and the
 * producer applies it wholesale via {@link setBlockedProjects} — an empty set means nothing is
 * blocked. There is no local ref-counting and no timer-driven opinion about blocking: resilience
 * against a lost event is re-query of the backend authority (the service's init consult), not a
 * local safety leash. The renderer's old per-blocker `SAFETY_TIMEOUT_MS` leash is deleted, not
 * retained — a second, timer-driven opinion about blocking is precisely the drift the design's
 * findings 7/8/16 indict.
 *
 * Visibility keeps a 200 ms show-grace matching PT9's automatic-sync surface: on the first project
 * becoming blocked (empty → non-empty) a grace timer is armed, and consumers only ever see a
 * non-empty visible set if blocking is still in flight when it fires. A sync that finishes within
 * the grace never shows anything. Set changes while already visible (e.g. a project joins or leaves
 * an in-flight batch) are reflected immediately, with no fresh grace.
 */

/**
 * How long blocking must persist before it becomes visible; a sync finishing inside this window
 * shows nothing (PT9 parity).
 */
const SHOW_GRACE_MS = 200;

const EMPTY_SET: ReadonlySet<string> = new Set();

/** The latest backend snapshot: which projects are blocked right now (raw, pre-grace). */
let rawBlockedProjectIds: ReadonlySet<string> = EMPTY_SET;
/**
 * The grace-debounced set consumers see. Empty until the show-grace elapses on the first block;
 * every public accessor reads this, so all consumers observe the same debounced view.
 */
let visibleBlockedProjectIds: ReadonlySet<string> = EMPTY_SET;
let graceTimer: ReturnType<typeof setTimeout> | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/** Content equality for two id sets (the store always replaces sets wholesale, never mutates). */
function areSetsEqual(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  return [...a].every((id) => b.has(id));
}

/** Publishes a new visible set, notifying listeners only when its contents actually change. */
function setVisible(next: ReadonlySet<string>): void {
  if (areSetsEqual(visibleBlockedProjectIds, next)) return;
  visibleBlockedProjectIds = next;
  notifyListeners();
}

/**
 * Replaces the set of projects an automatic Send/Receive is blocking edits on. This is the sole
 * producer API: the backend emits a full snapshot on every gate arm/disarm and the service forwards
 * it here verbatim (an empty array clears blocking entirely).
 */
export function setBlockedProjects(projectIds: ReadonlyArray<string>): void {
  const next: ReadonlySet<string> = new Set(projectIds);
  rawBlockedProjectIds = next;

  if (next.size === 0) {
    // Fully cleared: cancel a pending grace (cleared inside the window → nothing ever showed) and
    // drop the visible set immediately.
    clearTimeout(graceTimer);
    graceTimer = undefined;
    setVisible(EMPTY_SET);
    return;
  }

  if (visibleBlockedProjectIds.size > 0) {
    // Already past the grace and visible: reflect set changes immediately (a project joined or left
    // an in-flight batch) with no fresh grace.
    setVisible(next);
    return;
  }

  // Empty → non-empty. Arm the show-grace if one is not already pending; visibility only turns on
  // if blocking survives the grace.
  if (graceTimer === undefined) {
    graceTimer = setTimeout(() => {
      graceTimer = undefined;
      // Re-read the raw set on fire: if the sync cleared during the grace it is empty and nothing
      // shows; otherwise publish whatever is blocked now (it may have grown since the grace armed).
      if (rawBlockedProjectIds.size > 0) setVisible(rawBlockedProjectIds);
    }, SHOW_GRACE_MS);
  }
}

/** The (visible, grace-debounced) set of projects currently blocked by an automatic Send/Receive. */
export function getBlockedProjectIds(): ReadonlySet<string> {
  return visibleBlockedProjectIds;
}

/**
 * True when a specific project is (visibly) blocked. An undefined project id is never blocked.
 *
 * No consumer in this diff — the project-settings UI (a stacked follow-up PR) is about to consume
 * it to disable per-project actions while that project's automatic sync is blocking edits.
 */
export function isProjectBlocked(projectId: string | undefined): boolean {
  if (projectId === undefined) return false;
  return visibleBlockedProjectIds.has(projectId);
}

/** Subscribe to state changes. Returns an unsubscribe function. */
export function subscribeToAutoSyncBlocking(listener: () => void): () => void {
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
export function resetAutoSyncBlocking(): void {
  rawBlockedProjectIds = EMPTY_SET;
  visibleBlockedProjectIds = EMPTY_SET;
  clearTimeout(graceTimer);
  graceTimer = undefined;
  listeners.clear();
}
