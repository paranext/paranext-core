import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setAutoSyncBlocking,
  getAutoSyncBlocking,
  subscribeToAutoSyncBlocking,
  resetAutoSyncBlocking,
} from './auto-sync-blocking-store';

/** Must match SHOW_GRACE_MS in auto-sync-blocking-store.ts */
const SHOW_GRACE_MS = 200;
/** Must match SAFETY_TIMEOUT_MS in auto-sync-blocking-store.ts */
const SAFETY_TIMEOUT_MS = 10 * 60 * 1000;

describe('auto-sync-blocking-store', () => {
  // The store's show-grace and safety timers mean nearly every test needs timer control
  beforeEach(() => {
    vi.useFakeTimers();
    resetAutoSyncBlocking();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getAutoSyncBlocking', () => {
    it('returns false initially', () => {
      expect(getAutoSyncBlocking()).toBe(false);
    });
  });

  describe('show grace', () => {
    it('is not visible immediately when blocking starts', () => {
      setAutoSyncBlocking(true);
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('becomes visible once the 200 ms grace elapses', () => {
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
    });

    it('never becomes visible when blocking clears within the grace (sync finished fast)', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(150); // still inside the grace window
      setAutoSyncBlocking(false);
      vi.advanceTimersByTime(SHOW_GRACE_MS); // well past when the grace would have fired
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).not.toHaveBeenCalled(); // nothing ever showed, so nothing ever notified
    });

    it('does not notify listeners during the grace period', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS - 1);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('ref counting', () => {
    it('stays visible when a second raise arrives before the first clears', () => {
      setAutoSyncBlocking(true); // blocker A raises
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      setAutoSyncBlocking(true); // blocker B raises
      setAutoSyncBlocking(false); // blocker A clears
      expect(getAutoSyncBlocking()).toBe(true); // blocker B still in flight
      setAutoSyncBlocking(false); // blocker B clears
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('clamps at zero — extra false calls do not underflow', () => {
      setAutoSyncBlocking(false); // extra call while already at zero — should be ignored
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true); // count went 0→1, not -1→0
      setAutoSyncBlocking(false);
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('does not notify listeners when visibility is unchanged (nested raises)', () => {
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true); // second raise — count 1→2, visibility still true
      expect(listener).not.toHaveBeenCalled();
    });

    it('does not notify listeners when value is unchanged (already false)', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(false); // already at zero — no change
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('subscribeToAutoSyncBlocking', () => {
    it('notifies listeners when visibility flips to false', () => {
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(false);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('returns an unsubscriber that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToAutoSyncBlocking(listener);
      unsubscribe();
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToAutoSyncBlocking(listener1);
      subscribeToAutoSyncBlocking(listener2);
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('safety timer', () => {
    it('auto-clears after 10 minutes if the blocker never clears', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // shown, then auto-cleared
    });

    it('arms a leash per raise — a later blocker outlives an earlier raise expiring', () => {
      setAutoSyncBlocking(true); // blocker A raises — A's leash armed
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2);
      setAutoSyncBlocking(true); // blocker B raises — B gets its own 10 min leash
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // 10 min from A (A's leash fires), 5 min from B
      expect(getAutoSyncBlocking()).toBe(true); // B's own leash is still alive
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // 10 min from B — B's leash fires
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('releases every expired block — a later single raise shows again', () => {
      setAutoSyncBlocking(true);
      setAutoSyncBlocking(true); // count is 2
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS); // both leashes expire
      expect(getAutoSyncBlocking()).toBe(false);
      setAutoSyncBlocking(true); // count 0→1, not 2→3
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      setAutoSyncBlocking(false); // a single clear hides again
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('releases only its own block when a stale leash expires — the newer blocker keeps blocking until it clears', () => {
      setAutoSyncBlocking(true); // blocker A raises at t=0 and is abandoned
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2);
      setAutoSyncBlocking(true); // blocker B raises at t=5min
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // t=10min — A's leash expires
      expect(getAutoSyncBlocking()).toBe(true); // B still in flight — stays blocked
      setAutoSyncBlocking(false); // B clears — the count stayed correct, so one clear fully unblocks
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('pairs a clear with the oldest leash — the newest blocker keeps its own full leash', () => {
      setAutoSyncBlocking(true); // blocker A raises at t=0
      vi.advanceTimersByTime(60_000);
      setAutoSyncBlocking(true); // blocker B raises at t=1min and is abandoned
      setAutoSyncBlocking(false); // A clears — cancels the oldest leash (A's)
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS - 60_000); // t=10min — A's cancelled leash is silent
      expect(getAutoSyncBlocking()).toBe(true); // B is still inside its own leash
      vi.advanceTimersByTime(60_000); // t=11min — B's own leash expires
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('cancels the safety timer when blocking clears normally', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true);
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      setAutoSyncBlocking(false); // normal completion
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // shown, then cleared — no extra firing
    });
  });

  describe('resetAutoSyncBlocking', () => {
    it('clears state and pending timers', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      setAutoSyncBlocking(true);
      resetAutoSyncBlocking();
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS); // neither grace nor safety should fire
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
