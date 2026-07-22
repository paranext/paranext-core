import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  raiseAutoSyncBlock,
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
      raiseAutoSyncBlock();
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('becomes visible once the 200 ms grace elapses', () => {
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
    });

    it('never becomes visible when blocking clears within the grace (sync finished fast)', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      const clear = raiseAutoSyncBlock();
      vi.advanceTimersByTime(150); // still inside the grace window
      clear();
      vi.advanceTimersByTime(SHOW_GRACE_MS); // well past when the grace would have fired
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).not.toHaveBeenCalled(); // nothing ever showed, so nothing ever notified
    });

    it('does not notify listeners during the grace period', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS - 1);
      expect(listener).not.toHaveBeenCalled();
      vi.advanceTimersByTime(1);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });

  describe('overlapping blockers', () => {
    it('stays visible when a second raise arrives before the first clears', () => {
      const clearA = raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const clearB = raiseAutoSyncBlock();
      clearA();
      expect(getAutoSyncBlocking()).toBe(true); // blocker B still in flight
      clearB();
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('clear is idempotent — clearing twice cannot release another blocker', () => {
      const clearA = raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      raiseAutoSyncBlock(); // blocker B, still in flight
      clearA();
      clearA(); // duplicate — must be a no-op, not release B
      expect(getAutoSyncBlocking()).toBe(true);
    });

    it('does not notify listeners when visibility is unchanged (nested raises)', () => {
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      raiseAutoSyncBlock(); // second raise — set grows 1→2, visibility still true
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('subscribeToAutoSyncBlocking', () => {
    it('notifies listeners when visibility flips to false', () => {
      const clear = raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      clear();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('returns an unsubscriber that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToAutoSyncBlocking(listener);
      unsubscribe();
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToAutoSyncBlocking(listener1);
      subscribeToAutoSyncBlocking(listener2);
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('safety leash', () => {
    it('auto-clears after 10 minutes if the blocker never clears', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // shown, then auto-cleared
    });

    it('arms a leash per raise — a later blocker outlives an earlier raise expiring', () => {
      raiseAutoSyncBlock(); // blocker A raises — A's leash armed
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2);
      raiseAutoSyncBlock(); // blocker B raises — B gets its own 10 min leash
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // 10 min from A (its leash fires), 5 min from B
      expect(getAutoSyncBlocking()).toBe(true); // B's own leash is still alive
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // 10 min from B — B's leash fires
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('releases every expired block — a later single raise shows again', () => {
      raiseAutoSyncBlock();
      raiseAutoSyncBlock(); // two blockers in flight
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS); // both leashes expire
      expect(getAutoSyncBlocking()).toBe(false);
      const clear = raiseAutoSyncBlock(); // a fresh raise blocks again
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      expect(getAutoSyncBlocking()).toBe(true);
      clear(); // its own clear hides again
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('releases only its own block when a stale leash expires — the newer blocker keeps blocking until it clears', () => {
      raiseAutoSyncBlock(); // blocker A raises at t=0 and is abandoned
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2);
      const clearB = raiseAutoSyncBlock(); // blocker B raises at t=5min
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS / 2); // t=10min — A's leash expires
      expect(getAutoSyncBlocking()).toBe(true); // B still in flight — stays blocked
      clearB();
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('a late clear after the leash already fired is a no-op — it cannot release another blocker (review finding 1)', () => {
      const clearA = raiseAutoSyncBlock(); // blocker A raises at t=0
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS - 10_000);
      raiseAutoSyncBlock(); // blocker B raises just before A's leash fires
      vi.advanceTimersByTime(10_000); // t=10min — A's leash fires, releasing A
      expect(getAutoSyncBlocking()).toBe(true); // B still in flight
      clearA(); // A's real clear arrives late — must be a no-op, never release B
      expect(getAutoSyncBlocking()).toBe(true);
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS); // B's own leash fires
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('an abandoned blocker is released by its own leash despite other blockers clearing (review finding 2)', () => {
      raiseAutoSyncBlock(); // blocker X raises at t=0 and is abandoned
      // Ordinary syncs keep raising and clearing by their own tokens — they must never cancel X's
      // leash, so X is released at t=10min and blocking does not persist indefinitely.
      for (let i = 0; i < 24; i += 1) {
        const clear = raiseAutoSyncBlock();
        vi.advanceTimersByTime(30_000);
        clear();
        vi.advanceTimersByTime(4.5 * 60 * 1000);
      }
      // Two hours in, between syncs: X's own leash fired at t=10min, so nothing is blocking.
      expect(getAutoSyncBlocking()).toBe(false);
    });

    it('cancels the safety leash when blocking clears normally', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      const clear = raiseAutoSyncBlock();
      vi.advanceTimersByTime(SHOW_GRACE_MS);
      clear(); // normal completion
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS);
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // shown, then cleared — no extra firing
    });
  });

  describe('resetAutoSyncBlocking', () => {
    it('clears state and pending timers', () => {
      const listener = vi.fn();
      subscribeToAutoSyncBlocking(listener);
      raiseAutoSyncBlock();
      resetAutoSyncBlocking();
      vi.advanceTimersByTime(SAFETY_TIMEOUT_MS); // neither grace nor safety should fire
      expect(getAutoSyncBlocking()).toBe(false);
      expect(listener).not.toHaveBeenCalled();
    });
  });
});
