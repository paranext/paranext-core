import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getSyncActivityState,
  hasObservedSyncRun,
  resetSyncActivity,
  setSyncActivity,
  setSyncActivityUnknown,
  subscribeToSyncActivity,
} from './sync-activity-store';

describe('sync-activity-store', () => {
  beforeEach(() => {
    resetSyncActivity();
  });

  it('starts out unable to tell, rather than idle', () => {
    // "Nothing is syncing" is a positive claim. Before anything has answered, the store has not
    // earned it.
    expect(getSyncActivityState().isSyncing).toBeUndefined();
    expect(getSyncActivityState().projectIds).toEqual([]);
    expect(hasObservedSyncRun()).toBe(false);
  });

  it('applies a snapshot wholesale', () => {
    setSyncActivity({ isSyncing: true, projectIds: ['PROJ1', 'PROJ2'] });

    expect(getSyncActivityState()).toMatchObject({
      isSyncing: true,
      projectIds: ['PROJ1', 'PROJ2'],
    });
  });

  it('drops project ids when not syncing', () => {
    setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    setSyncActivity({ isSyncing: false, projectIds: ['PROJ1'] });

    // The contract says the set is always empty when not syncing; not relying on the producer to
    // honour it keeps a stale set from being named as syncing.
    expect(getSyncActivityState().projectIds).toEqual([]);
  });

  it('canonicalizes project id casing at ingestion', () => {
    setSyncActivity({ isSyncing: true, projectIds: ['proj1'] });

    expect(getSyncActivityState().projectIds).toEqual(['PROJ1']);
  });

  describe('snapshot identity', () => {
    it('keeps one object identity when a snapshot repeats', () => {
      // `useSyncExternalStore` throws on a snapshot that changes identity every read, so an equal
      // snapshot must leave the existing object in place.
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

      expect(getSyncActivityState()).toBe(first);
    });

    it('keeps one object identity when only the id casing changes', () => {
      // A project id's casing is not stable across the sources that report it, so a set that only
      // flipped case must not read as a change and re-run every consumer's metadata lookup.
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: true, projectIds: ['proj1'] });

      expect(getSyncActivityState()).toBe(first);
    });

    it('replaces the object when the snapshot actually changes', () => {
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1', 'PROJ2'] });

      expect(getSyncActivityState()).not.toBe(first);
    });
  });

  describe('hasObservedSyncRun', () => {
    it('latches on the first observed run and never clears', () => {
      setSyncActivity({ isSyncing: true, projectIds: [] });
      expect(hasObservedSyncRun()).toBe(true);

      setSyncActivity({ isSyncing: false, projectIds: [] });
      expect(hasObservedSyncRun()).toBe(true);

      setSyncActivityUnknown();
      expect(hasObservedSyncRun()).toBe(true);
    });

    it('stays false through a session that only ever reports idle', () => {
      // Plain Platform.Bible emits one idle baseline per backend start; the sync indicator must not
      // appear on the strength of that.
      setSyncActivity({ isSyncing: false, projectIds: [] });
      setSyncActivityUnknown();

      expect(hasObservedSyncRun()).toBe(false);
    });
  });

  describe('setSyncActivityUnknown', () => {
    it('reports that nothing is known, not that nothing is syncing', () => {
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

      setSyncActivityUnknown();

      expect(getSyncActivityState().isSyncing).toBeUndefined();
      expect(getSyncActivityState().projectIds).toEqual([]);
    });
  });

  describe('outcome', () => {
    it('carries the outcome of a completed run', () => {
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });

      expect(getSyncActivityState().outcome).toBe('failed');
    });

    it('drops an outcome reported alongside a running sync', () => {
      // An outcome describes the last COMPLETED run. Keeping one beside `isSyncing: true` would let a
      // consumer attach the previous run's verdict to the run still in progress.
      setSyncActivity({ isSyncing: true, projectIds: [], outcome: 'succeeded' });

      expect(getSyncActivityState().outcome).toBeUndefined();
    });

    it('clears the outcome when the backend can no longer be asked', () => {
      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'succeeded' });

      setSyncActivityUnknown();

      expect(getSyncActivityState().outcome).toBeUndefined();
    });

    it('treats a change of outcome alone as a change', () => {
      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'succeeded' });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });

      expect(getSyncActivityState()).not.toBe(first);
    });

    it('keeps one object identity when a snapshot with an outcome repeats', () => {
      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'succeeded' });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: false, projectIds: [], outcome: 'succeeded' });

      expect(getSyncActivityState()).toBe(first);
    });

    it('carries the time the outcome describes', () => {
      setSyncActivity({
        isSyncing: false,
        projectIds: [],
        outcome: 'succeeded',
        completedAt: '2026-09-18T10:00:00Z',
      });

      expect(getSyncActivityState().completedAt).toBe('2026-09-18T10:00:00Z');
    });

    it('drops an outcome time with no outcome to date', () => {
      // On its own it dates nothing, and a consumer ordering verdicts by it would be ordering one
      // this store does not have.
      setSyncActivity({ isSyncing: false, projectIds: [], completedAt: '2026-09-18T10:00:00Z' });

      expect(getSyncActivityState().completedAt).toBeUndefined();
    });

    it('drops the outcome time while a run is in progress, as it drops the outcome', () => {
      setSyncActivity({
        isSyncing: true,
        projectIds: [],
        outcome: 'succeeded',
        completedAt: '2026-09-18T10:00:00Z',
      });

      expect(getSyncActivityState().completedAt).toBeUndefined();
    });

    it('clears the outcome time when the backend can no longer be asked', () => {
      setSyncActivity({
        isSyncing: false,
        projectIds: [],
        outcome: 'succeeded',
        completedAt: '2026-09-18T10:00:00Z',
      });

      setSyncActivityUnknown();

      expect(getSyncActivityState().completedAt).toBeUndefined();
    });

    it('keeps one object identity when a running sync repeats with an outcome it drops', () => {
      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      const first = getSyncActivityState();

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'], outcome: 'failed' });

      expect(getSyncActivityState()).toBe(first);
    });
  });

  describe('subscribers', () => {
    it('notifies on a real change and not on a no-op', () => {
      const listener = vi.fn();
      subscribeToSyncActivity(listener);

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      expect(listener).toHaveBeenCalledTimes(1);

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('stops notifying once unsubscribed', () => {
      const listener = vi.fn();
      const unsubscribe = subscribeToSyncActivity(listener);
      unsubscribe();

      setSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
