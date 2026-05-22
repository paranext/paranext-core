import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  setWorkspaceUpdating,
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

  describe('setWorkspaceUpdating', () => {
    it('sets state to true', () => {
      setWorkspaceUpdating(true);
      expect(getWorkspaceUpdating()).toBe(true);
    });

    it('sets state back to false', () => {
      setWorkspaceUpdating(true);
      setWorkspaceUpdating(false);
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('stays true when a second switch starts before the first finishes', () => {
      setWorkspaceUpdating(true); // switch A starts
      setWorkspaceUpdating(true); // switch B starts
      setWorkspaceUpdating(false); // switch A finishes
      expect(getWorkspaceUpdating()).toBe(true); // switch B still in flight
      setWorkspaceUpdating(false); // switch B finishes
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('clamps at zero — extra false calls do not underflow', () => {
      setWorkspaceUpdating(true);
      setWorkspaceUpdating(false);
      setWorkspaceUpdating(false); // extra call — should be ignored
      expect(getWorkspaceUpdating()).toBe(false);
    });

    it('notifies listeners when state changes to true', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(true);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('notifies listeners when state changes to false', () => {
      setWorkspaceUpdating(true);
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(false);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('does not notify listeners when visible state is unchanged (concurrent switches)', () => {
      setWorkspaceUpdating(true);
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(true); // second switch — count 1→2, boolean still true
      expect(listener).not.toHaveBeenCalled();
    });

    it('does not notify listeners when value is unchanged (already false)', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(false); // already false — no change
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('subscribeToWorkspaceUpdating', () => {
    it('returns an unsubscriber that stops notifications', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToWorkspaceUpdating(listener);
      unsubscribe();
      setWorkspaceUpdating(true);
      expect(listener).not.toHaveBeenCalled();
    });

    it('notifies multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();
      subscribeToWorkspaceUpdating(listener1);
      subscribeToWorkspaceUpdating(listener2);
      setWorkspaceUpdating(true);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);
    });
  });

  describe('safety timer', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('auto-clears after 30 s if the switch never resolves', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(true);
      expect(getWorkspaceUpdating()).toBe(true);
      vi.advanceTimersByTime(30_000);
      expect(getWorkspaceUpdating()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // true, then auto-clear
    });

    it('cancels the safety timer when the switch completes normally', () => {
      const listener = vi.fn();
      subscribeToWorkspaceUpdating(listener);
      setWorkspaceUpdating(true);
      setWorkspaceUpdating(false); // normal completion
      vi.advanceTimersByTime(30_000);
      expect(getWorkspaceUpdating()).toBe(false);
      expect(listener).toHaveBeenCalledTimes(2); // true, then false — no extra firing
    });

    it('resets the safety timer when a new switch starts while one is in flight', () => {
      setWorkspaceUpdating(true);
      vi.advanceTimersByTime(20_000);
      setWorkspaceUpdating(true); // second switch — timer resets to 30 s from now
      vi.advanceTimersByTime(10_000); // 30 s from first start, but only 10 s from second
      expect(getWorkspaceUpdating()).toBe(true); // second switch reset the timer — still alive
      vi.advanceTimersByTime(20_000); // 30 s from second switch — safety fires
      expect(getWorkspaceUpdating()).toBe(false);
    });
  });
});
