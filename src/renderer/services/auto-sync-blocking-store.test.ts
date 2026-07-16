import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setBlockedProjects,
  getAutoSyncBlocking,
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
      expect(getAutoSyncBlocking()).toBe(false);
      expect(getBlockedProjectIds().size).toBe(0);
      expect(isProjectBlocked('p1')).toBe(false);
    });

    it('treats an undefined project id as never blocked', () => {
      expect(isProjectBlocked(undefined)).toBe(false);
    });
  });

  describe('show grace', () => {
    it('is not visible immediately when blocking starts', () => {
      setBlockedProjects(['p1']);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(getBlockedProjectIds().size).toBe(0);
      expect(isProjectBlocked('p1')).toBe(false);
    });

    it('becomes visible once the 200 ms grace elapses', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      expect(isProjectBlocked('p1')).toBe(true);
      expect([...getBlockedProjectIds()]).toEqual(['p1']);
    });

    it('never becomes visible when blocking clears within the grace (sync finished fast)', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(150); // still inside the grace window
      setBlockedProjects([]);
      vi.advanceTimersByTime(SHOW_GRACE_MS); // well past when the grace would have fired
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).not.toHaveBeenCalled(); // nothing ever showed, so nothing ever notified
    });

    it('does not notify listeners during the grace period', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS - 1);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('shows whatever is blocked when the grace fires, even if the set grew during the grace', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(100); // inside the grace
      setBlockedProjects(['p1', 'p2']); // a second project joins the in-flight batch
      expect(getAutoSyncBlocking()).toBe(false); // still inside the grace
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect([...getBlockedProjectIds()].sort()).toEqual(['p1', 'p2']);
    });

    it('does not re-arm a fresh grace when a project joins an already-visible batch', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(isProjectBlocked('p1')).toBe(true);
      setBlockedProjects(['p1', 'p2']); // already visible → reflected immediately, no new grace
      expect(isProjectBlocked('p2')).toBe(true);
    });
  });

  describe('snapshot replace semantics', () => {
    it('replaces the blocked set wholesale', () => {
      setBlockedProjects(['p1', 'p2']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect([...getBlockedProjectIds()].sort()).toEqual(['p1', 'p2']);

      setBlockedProjects(['p2', 'p3']); // wholesale replace, not a merge
      expect(isProjectBlocked('p1')).toBe(false);
      expect(isProjectBlocked('p2')).toBe(true);
      expect(isProjectBlocked('p3')).toBe(true);
    });

    it('clears blocking when replaced with an empty set', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      setBlockedProjects([]);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(getBlockedProjectIds().size).toBe(0);
    });

    it('notifies once when the visible set content changes', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['p1', 'p2']); // content changed → one notify
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not notify when the replacement set has identical content', () => {
      setBlockedProjects(['p1', 'p2']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['p2', 'p1']); // same content, different order/array → no change
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('no timer-driven expiry (safety leash deleted, PT-4214 Stage U)', () => {
    it('leaves no pending timer once blocking is visible', () => {
      setBlockedProjects(['p1']);
      expect(vi.getTimerCount()).toBe(1); // the grace timer
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(vi.getTimerCount()).toBe(0); // grace fired; NO safety leash left running
    });

    it('never auto-clears a long-running block (no safety timeout)', () => {
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      // Far beyond the old 10-minute leash — the block persists until the backend clears it.
      vi.advanceTimersByTime(60 * 60 * 1000);
      expect(getAutoSyncBlocking()).toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    });

    it('leaves no pending timer after blocking clears inside the grace', () => {
      setBlockedProjects(['p1']);
      setBlockedProjects([]); // cleared inside the grace
      expect(vi.getTimerCount()).toBe(0); // grace timer cancelled, nothing else armed
    });
  });

  describe('subscribeToAutoSyncBlocking', () => {
    it('notifies listeners when visibility flips to false', () => {
      setBlockedProjects(['p1']);
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
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToAutoSyncBlocking(listener1);
      subscribeToAutoSyncBlocking(listener2);
      setBlockedProjects(['p1']);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('resetAutoSyncBlocking', () => {
    it('clears state and the pending grace timer', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setBlockedProjects(['p1']);
      resetAutoSyncBlocking();
      vi.advanceTimersByTime(SHOW_GRACE_MS); // the grace should not fire
      expect(getAutoSyncBlocking()).toBe(false);
      expect(vi.getTimerCount()).toBe(0);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
