/**
 * Store tracking which projects an automatic (scheduled or session) Send/Receive is currently
 * blocking edits on.
 *
 * Backend-authoritative snapshot model: the backend write gate is the single source of truth. It
 * emits a full snapshot of the blocked project ids on every arm/disarm, and the producer applies it
 * wholesale via {@link setBlockedProjects} — an empty set means nothing is blocked. There is
 * deliberately no local ref-counting and no timer that decides blocking on its own (a second,
 * timer-driven opinion is exactly the kind of drift that lets the UI disagree with the backend):
 * resilience against a lost event is re-query of the backend authority (the service's init
 * consult), not a local safety leash. Only the backend starts or ends a block; the two graces below
 * only shift when consumers see that, by a bounded amount.
 *
 * Visibility keeps a 200 ms show-grace matching PT9's automatic-sync surface: on the first project
 * becoming blocked (empty → non-empty) a grace timer is armed, and consumers only ever see a
 * non-empty visible set if blocking is still in flight when it fires. A sync that finishes within
 * the grace never shows anything. A project joining a visible set shows immediately, with no fresh
 * grace.
 *
 * A visible project stays visible for {@link HIDE_GRACE_MS} after the backend stops blocking it.
 */

import { deepEqual } from 'platform-bible-utils';

/**
 * How long blocking must persist before it becomes visible; a sync finishing inside this window
 * shows nothing (PT9 parity).
 */
const SHOW_GRACE_MS = 200;

/**
 * How long a project stays visibly blocked after the backend stops blocking it. A Send/Receive
 * sends its project update before it clears the write gate, but the merged chapter's delivery and
 * the clear then race to the web views. An editor that became editable first could take a keystroke
 * and push its pre-merge text over the merge, so editing stays off long enough for the delivery to
 * land.
 *
 * This narrows that race and does not close it: a delivery later than this can still lose to a
 * keystroke. Not measured against real deliveries, because the gate only arms in Paratext 10
 * builds. Editing staying off a moment longer costs little at the end of a sync that took seconds.
 */
const HIDE_GRACE_MS = 1000;

const EMPTY_SET: ReadonlySet<string> = new Set();

/** The latest backend snapshot: which projects are blocked right now (raw, pre-grace). */
let rawBlockedProjectIds: ReadonlySet<string> = EMPTY_SET;
/**
 * The grace-debounced set consumers see. Empty until the show-grace elapses on the first block;
 * every public accessor reads this, so all consumers observe the same debounced view.
 */
let visibleBlockedProjectIds: ReadonlySet<string> = EMPTY_SET;
let graceTimer: ReturnType<typeof setTimeout> | undefined;
let hideGraceTimer: ReturnType<typeof setTimeout> | undefined;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/** Publishes a new visible set, notifying listeners only when its contents actually change. */
function setVisible(next: ReadonlySet<string>): void {
  if (deepEqual(visibleBlockedProjectIds, next)) return;
  visibleBlockedProjectIds = next;
  notifyListeners();
}

/**
 * Replaces the set of projects an automatic Send/Receive is blocking edits on. This is the sole
 * producer API: the backend emits a full snapshot on every gate arm/disarm and the service forwards
 * it here verbatim (an empty array clears blocking entirely).
 */
export function setBlockedProjects(projectIds: ReadonlyArray<string>): void {
  // Canonicalize to upper once at ingestion: the backend gate matches ids OrdinalIgnoreCase and the
  // canonical project id is upper (ProjectMetadata.Id = id.ToUpperInvariant()), but every consumer
  // here (setVisible's equality, isProjectBlocked's Set.has, the driver's isEditorBlocked) is
  // case-sensitive. Upper-casing at the single ingestion point keeps the whole store canonical.
  const next: ReadonlySet<string> = new Set(projectIds.map((id) => id.toUpperCase()));

  if (visibleBlockedProjectIds.size > 0) {
    // Already past the show-grace and visible. A joining project shows at once. A leaving project
    // stays visible through the hide-grace. Any later snapshot restarts it, so every leaver gets at
    // least the full hide-grace, and a snapshot that leaves nothing out cancels it.
    rawBlockedProjectIds = next;
    clearTimeout(hideGraceTimer);
    hideGraceTimer = undefined;
    const isProjectLeaving = [...visibleBlockedProjectIds].some((id) => !next.has(id));
    if (!isProjectLeaving) {
      setVisible(next);
      return;
    }
    setVisible(new Set([...visibleBlockedProjectIds, ...next]));
    hideGraceTimer = setTimeout(() => {
      hideGraceTimer = undefined;
      setVisible(rawBlockedProjectIds);
    }, HIDE_GRACE_MS);
    return;
  }

  if (next.size === 0) {
    // Cleared inside the show-grace: cancel it, so nothing ever showed.
    clearTimeout(graceTimer);
    graceTimer = undefined;
    return;
  }

  // Empty → non-empty. Record the latest raw snapshot for the grace-timer callback to read, then arm
  // the show-grace if one is not already pending; visibility only turns on if blocking survives the
  // grace. Keeping this above the pending-grace check means a second empty → non-empty snapshot
  // arriving while a grace is still pending still refreshes what that pending timer will read.
  rawBlockedProjectIds = next;
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
 * Currently unused within core; the project-settings UI (a follow-up) consumes it to disable
 * per-project actions while that project's automatic sync is blocking edits.
 */
export function isProjectBlocked(projectId: string | undefined): boolean {
  if (projectId === undefined) return false;
  // Upper-case to match the store's canonical form (setBlockedProjects canonicalizes to upper at
  // ingestion), so a caller passing a non-canonical id can't miss a real block — mirrors the
  // driver's isEditorBlocked.
  return visibleBlockedProjectIds.has(projectId.toUpperCase());
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
  clearTimeout(hideGraceTimer);
  hideGraceTimer = undefined;
  listeners.clear();
}
