// The wire may send null, which the guard must handle, so these cases need a real null
/* eslint-disable no-null/no-null */
import { describe, expect, test } from 'vitest';
import {
  IDLE_SYNC_ACTIVITY,
  isSyncActivitySnapshot,
  shouldRecheckSyncActivity,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  toSyncActivity,
} from './sync-activity.util';

describe('isSyncActivitySnapshot', () => {
  test.each([
    ['syncing with ids', { isSyncing: true, projectIds: ['A', 'B'] }, true],
    ['idle with an empty list', { isSyncing: false, projectIds: [] }, true],
    ['projectIds absent', { isSyncing: true }, true],
    ['projectIds undefined', { isSyncing: true, projectIds: undefined }, true],
    // A real null: the wire writes `null` for a list it cannot name
    ['projectIds null', { isSyncing: true, projectIds: null }, true],
    ['extra fields', { isSyncing: false, projectIds: [], outcome: 'failed' }, true],
    ['isSyncing a string', { isSyncing: 'yes' }, false],
    ['isSyncing missing', {}, false],
    ['projectIds a string', { isSyncing: true, projectIds: 'A' }, false],
    ['projectIds with a number', { isSyncing: true, projectIds: [1] }, false],
    ['projectIds with a null entry', { isSyncing: true, projectIds: [null] }, false],
    ['a null payload', null, false],
    ['undefined', undefined, false],
    ['a string', 'text', false],
    ['a number', 3, false],
  ])('judges %s', (_name, value, expected) => {
    expect(isSyncActivitySnapshot(value)).toBe(expected);
  });
});

describe('toSyncActivity', () => {
  test('is the shared idle constant while no value is known', () => {
    expect(toSyncActivity(undefined)).toBe(IDLE_SYNC_ACTIVITY);
  });

  test('reports a running sync with its project ids', () => {
    expect(toSyncActivity({ isSyncing: true, projectIds: ['A'] })).toEqual({
      isSyncing: true,
      projectIds: ['A'],
    });
  });

  test('reads an absent or null list of a running sync as empty', () => {
    expect(toSyncActivity({ isSyncing: true })).toEqual({ isSyncing: true, projectIds: [] });
    expect(toSyncActivity({ isSyncing: true, projectIds: null })).toEqual({
      isSyncing: true,
      projectIds: [],
    });
  });

  test('blanks the ids of an idle snapshot that carries some', () => {
    expect(toSyncActivity({ isSyncing: false, projectIds: ['A'] })).toEqual({
      isSyncing: false,
      projectIds: [],
    });
  });
});

describe('IDLE_SYNC_ACTIVITY', () => {
  test('is idle with no projects', () => {
    expect(IDLE_SYNC_ACTIVITY).toEqual({ isSyncing: false, projectIds: [] });
  });
});

describe('shouldRecheckSyncActivity', () => {
  test('rechecks only while a known snapshot says a sync runs', () => {
    expect(shouldRecheckSyncActivity({ isSyncing: true })).toBe(true);
    expect(shouldRecheckSyncActivity({ isSyncing: false })).toBe(false);
    expect(shouldRecheckSyncActivity(undefined)).toBe(false);
  });
});

describe('SYNC_ACTIVITY_RECHECK_INTERVAL_MS', () => {
  test('is thirty seconds', () => {
    expect(SYNC_ACTIVITY_RECHECK_INTERVAL_MS).toBe(30_000);
  });
});
