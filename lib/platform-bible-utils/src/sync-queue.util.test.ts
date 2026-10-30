// The wire may send null, which the guard must handle, so these cases need a real null
/* eslint-disable no-null/no-null */
import { describe, expect, test } from 'vitest';
import { IDLE_SYNC_QUEUE, isSyncQueueSnapshot, toSyncQueue } from './sync-queue.util';

describe('isSyncQueueSnapshot', () => {
  test.each([
    ['an empty object', {}, true],
    ['waiting ids', { waitingProjectIds: ['a'] }, true],
    ['an empty list', { waitingProjectIds: [] }, true],
    ['waitingProjectIds undefined', { waitingProjectIds: undefined }, true],
    ['waitingProjectIds null', { waitingProjectIds: null }, true],
    ['extra fields', { waitingProjectIds: ['a'], other: 1 }, true],
    ['waitingProjectIds a string', { waitingProjectIds: 'a' }, false],
    ['waitingProjectIds with a number', { waitingProjectIds: [1] }, false],
    ['waitingProjectIds with a null entry', { waitingProjectIds: [null] }, false],
    ['a null payload', null, false],
    ['undefined', undefined, false],
    ['a string', 'text', false],
  ])('judges %s', (_name, value, expected) => {
    expect(isSyncQueueSnapshot(value)).toBe(expected);
  });
});

describe('toSyncQueue', () => {
  test('is the shared idle constant while no value is known', () => {
    expect(toSyncQueue(undefined)).toBe(IDLE_SYNC_QUEUE);
  });

  test('keeps the waiting ids', () => {
    expect(toSyncQueue({ waitingProjectIds: ['a', 'b'] })).toEqual({
      waitingProjectIds: ['a', 'b'],
    });
  });

  test('reads an absent or null list as empty', () => {
    expect(toSyncQueue({})).toEqual({ waitingProjectIds: [] });
    expect(toSyncQueue({ waitingProjectIds: null })).toEqual({ waitingProjectIds: [] });
  });
});

describe('IDLE_SYNC_QUEUE', () => {
  test('has nothing waiting', () => {
    expect(IDLE_SYNC_QUEUE).toEqual({ waitingProjectIds: [] });
  });
});
