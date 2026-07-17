import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  startWorkspaceUpdate,
  getWorkspaceUpdating,
  subscribeToWorkspaceUpdating,
  resetWorkspaceUpdating,
} from './workspace-updating-store';

describe('workspace-updating-store', () => {
  beforeEach(() => {
    resetWorkspaceUpdating();
  });

  describe('getWorkspaceUpdating', () => {
    it('returns false initially', () => {
      expect(getWorkspaceUpdating()).toBe(false);
    });
  });

  describe('startWorkspaceUpdate', () => {
    it('sets state to true', () => {
      startWorkspaceUpdate();
      expect(getWorkspaceUpdating()).toBe(true);
    });

    it('sets state back to false when the switch is released', () => {
      const release = startWorkspaceUpdate();
      release();
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('stays true when a second switch starts before the first finishes', () => {
      const releaseA = startWorkspaceUpdate();
      const releaseB = startWorkspaceUpdate();
      releaseA();
      expect(getWorkspaceUpdating()).toBe(true); // switch B still in flight
      releaseB();
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('release is idempotent — releasing twice cannot release another switch', () => {
      const releaseA = startWorkspaceUpdate();
      startWorkspaceUpdate(); // switch B, still in flight
      releaseA();
      releaseA(); // duplicate — must be a no-op, not release B
      expect(getWorkspaceUpdating()).toBe(true);
    });

    it('notifies listeners when state changes to true', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      startWorkspaceUpdate();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('notifies listeners when state changes to false', () => {
      const release = startWorkspaceUpdate();
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      release();
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not notify listeners when visible state is unchanged (concurrent switches)', () => {
      startWorkspaceUpdate();
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      startWorkspaceUpdate(); // second switch — set grows 1→2, boolean still true
      expect(listener).not.toHaveBeenCalled();
    });

    it('calls onReleased exactly once when released by the release function', () => {
      const onReleased = vi.fn();
      const release = startWorkspaceUpdate(onReleased);
      expect(onReleased).not.toHaveBeenCalled();
      release();
      release(); // duplicate release must not re-fire it
      expect(onReleased).toHaveBeenCalledTimes(1);
    });
  });

  describe('subscribeToWorkspaceUpdating', () => {
    it('returns an unsubscriber that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToWorkspaceUpdating(listener);
      unsubscribe();
      startWorkspaceUpdate();
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToWorkspaceUpdating(listener1);
      subscribeToWorkspaceUpdating(listener2);
      startWorkspaceUpdate();
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('safety leash', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('auto-clears after 30 s if the switch never resolves', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      startWorkspaceUpdate();
      expect(getWorkspaceUpdating()).toBe(true);
      vi.advanceTimersByTime(30_000);
      expect(getWorkspaceUpdating()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // true, then auto-clear
    });

    it('cancels the safety leash when the switch completes normally', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      const release = startWorkspaceUpdate();
      release(); // normal completion
      vi.advanceTimersByTime(30_000);
      expect(getWorkspaceUpdating()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // true, then false — no extra firing
    });

    it('arms a leash per switch — a later switch outlives an earlier start expiring', () => {
      startWorkspaceUpdate();
      vi.advanceTimersByTime(20_000);
      startWorkspaceUpdate(); // second switch — gets its own 30 s leash
      vi.advanceTimersByTime(10_000); // 30 s from first start (its leash fires), 10 s from second
      expect(getWorkspaceUpdating()).toBe(true); // second switch's own leash is still alive
      vi.advanceTimersByTime(20_000); // 30 s from second switch — its leash fires
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('releases only its own switch when a stale leash expires — the newer switch stays visible until it finishes', () => {
      startWorkspaceUpdate(); // switch A starts at t=0 and is abandoned
      vi.advanceTimersByTime(15_000);
      const releaseB = startWorkspaceUpdate(); // switch B starts at t=15s
      vi.advanceTimersByTime(15_000); // t=30s — A's leash expires
      expect(getWorkspaceUpdating()).toBe(true); // B still in flight — stays visible
      releaseB();
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('a late release after the leash already fired is a no-op — it cannot release another switch (review finding 1)', () => {
      const releaseA = startWorkspaceUpdate(); // switch A starts at t=0
      vi.advanceTimersByTime(29_000);
      startWorkspaceUpdate(); // switch B starts at t=29s
      vi.advanceTimersByTime(1_000); // t=30s — A's leash fires, releasing A
      expect(getWorkspaceUpdating()).toBe(true); // B still in flight
      vi.advanceTimersByTime(500);
      releaseA(); // A's real finish arrives late — must be a no-op, never release B
      expect(getWorkspaceUpdating()).toBe(true);
      vi.advanceTimersByTime(28_500); // t=59s — B's own leash fires
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('an abandoned switch is released by its own leash despite other switches finishing (review finding 2)', () => {
      startWorkspaceUpdate(); // switch X starts at t=0 and is abandoned
      vi.advanceTimersByTime(5_000);
      const releaseA = startWorkspaceUpdate(); // switch A starts at t=5s
      releaseA(); // and finishes immediately — must not cancel X's leash
      vi.advanceTimersByTime(25_000); // t=30s — X's own leash fires
      expect(getWorkspaceUpdating()).toBe(false); // not stuck: X was released by its own leash
    });

    it('calls onReleased when released by the leash', () => {
      const onReleased = vi.fn();
      const release = startWorkspaceUpdate(onReleased);
      vi.advanceTimersByTime(30_000);
      expect(onReleased).toHaveBeenCalledTimes(1);
      release(); // late release after the leash — no second call
      expect(onReleased).toHaveBeenCalledTimes(1);
    });
  });
});
