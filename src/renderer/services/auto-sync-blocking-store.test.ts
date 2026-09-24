import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setBlockedProjects,
  getBlockedProjectIds,
  isProjectBlocked,
  subscribeToAutoSyncBlocking,
  resetAutoSyncBlocking,
} from './auto-sync-blocking-store';

/** Must match SHOW_GRACE_MS in auto-sync-blocking-store.ts */
const SHOW_GRACE_MS = 200;

describe('auto-sync-blocking-store', () => {
  // The store's show-grace timer means nearly every test needs timer control.
  beforeEach(() => {
    vi.useFakeTimers();
    resetAutoSyncBlocking();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('reports nothing blocked', () => {
      expect(getBlockedProjectIds().size).toBe(0);
      expect(isProjectBlocked('P1')).toBe(false);
    });

    it('treats an undefined project id as never blocked', () => {
      expect(isProjectBlocked(undefined)).toBe(false);
    });
  });

  describe('show grace', () => {
    it('is not visible immediately when blocking starts', () => {
      setBlockedProjects(['P1']);
      expect(getBlockedProjectIds().size).toBe(0);
      expect(isProjectBlocked('P1')).toBe(false);
    });

    it('becomes visible once the 200 ms grace elapses', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('P1')).toBe(true);
      expect([...getBlockedProjectIds()]).toEqual(['P1']);
    });

    it('never becomes visible when blocking clears within the grace (sync finished fast)', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(150); // still inside the grace window
      setBlockedProjects([]);
      vi.advanceTimersByTime(SHOW_GRACE_MS); // well past when the grace would have fired
      expect(isProjectBlocked('P1')).toBe(false);
      expect(listener).not.toHaveBeenCalled(); // nothing ever showed, so nothing ever notified
    });

    it('does not notify listeners during the grace period', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS - 1);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('shows whatever is blocked when the grace fires, even if the set grew during the grace', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(100); // inside the grace
      setBlockedProjects(['P1', 'P2']); // a second project joins the in-flight batch
      expect(getBlockedProjectIds().size).toBe(0); // still inside the grace
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect([...getBlockedProjectIds()].sort()).toEqual(['P1', 'P2']);
    });

    it('does not re-arm a fresh grace when a project joins an already-visible batch', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('P1')).toBe(true);
      setBlockedProjects(['P1', 'P2']); // already visible → reflected immediately, no new grace
      expect(isProjectBlocked('P2')).toBe(true);
    });
  });

  describe('case canonicalization (ingestion)', () => {
    it('canonicalizes ingested project ids to upper case', () => {
      // The backend gate matches ids OrdinalIgnoreCase and the canonical project id is upper; the
      // store canonicalizes at ingestion so a mixed/lower-case snapshot still matches a canonical
      // (upper) query — no casing skew can leave a project silently unblocked in the UI.
      setBlockedProjects(['proj_a', 'Proj_B']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect([...getBlockedProjectIds()].sort()).toEqual(['PROJ_A', 'PROJ_B']);
      expect(isProjectBlocked('PROJ_A')).toBe(true);
      expect(isProjectBlocked('PROJ_B')).toBe(true);
    });

    it('isProjectBlocked matches a non-canonical (mixed/lower-case) query', () => {
      // The reader canonicalizes its own argument too, so a caller passing a non-canonical id can't
      // miss a real block (mirrors the driver's isEditorBlocked).
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('p1')).toBe(true);
      expect(isProjectBlocked('P1')).toBe(true);
    });
  });

  describe('snapshot replace semantics', () => {
    it('replaces the blocked set wholesale', () => {
      setBlockedProjects(['P1', 'P2']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect([...getBlockedProjectIds()].sort()).toEqual(['P1', 'P2']);

      setBlockedProjects(['P2', 'P3']); // wholesale replace, not a merge
      expect(isProjectBlocked('P1')).toBe(false);
      expect(isProjectBlocked('P2')).toBe(true);
      expect(isProjectBlocked('P3')).toBe(true);
    });

    it('clears blocking when replaced with an empty set', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('P1')).toBe(true);
      setBlockedProjects([]);
      expect(getBlockedProjectIds().size).toBe(0);
    });

    it('notifies once when the visible set content changes', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['P1', 'P2']); // content changed → one notify
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not notify when the replacement set has identical content', () => {
      setBlockedProjects(['P1', 'P2']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['P2', 'P1']); // same content, different order/array → no change
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('no timer-driven expiry', () => {
    it('leaves no pending timer once blocking is visible', () => {
      setBlockedProjects(['P1']);
      expect(vi.getTimerCount()).toBe(1); // the grace timer
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(vi.getTimerCount()).toBe(0); // grace fired; NO safety leash left running
    });

    it('never auto-clears a long-running block (no safety timeout)', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('P1')).toBe(true);
      // Well beyond any plausible sync duration — the block persists until the backend clears it.
      vi.advanceTimersByTime(60 * 60 * 1000);
      expect(isProjectBlocked('P1')).toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    });

    it('leaves no pending timer after blocking clears inside the grace', () => {
      setBlockedProjects(['P1']);
      setBlockedProjects([]); // cleared inside the grace
      expect(vi.getTimerCount()).toBe(0); // grace timer cancelled, nothing else armed
    });
  });

  describe('subscribeToAutoSyncBlocking', () => {
    it('notifies listeners when visibility flips to false', () => {
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects([]);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('returns an unsubscriber that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToAutoSyncBlocking(listener);
      unsubscribe();
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToAutoSyncBlocking(listener1);
      subscribeToAutoSyncBlocking(listener2);
      setBlockedProjects(['P1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetAutoSyncBlocking', () => {
    it('clears state and the pending grace timer', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['P1']);
      resetAutoSyncBlocking();
      vi.advanceTimersByTime(SHOW_GRACE_MS); // the grace should not fire
      expect(getBlockedProjectIds().size).toBe(0);
      expect(vi.getTimerCount()).toBe(0);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
