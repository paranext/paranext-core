// The wire may send null, which the guard must handle, so these cases need a real null
/* eslint-disable no-null/no-null */
import { describe, expect, test } from 'vitest';
import { FAILED_PRECONDITION, INTERNAL, newPlatformError, UNAVAILABLE } from './platform-error';
import {
  IDLE_SYNC_QUEUE,
  isSyncBusyError,
  isSyncQueueSnapshot,
  isSyncRequestRemovedError,
  SYNC_BUSY_MARKER,
  SYNC_REQUEST_REMOVED_MARKER,
  toSyncQueue,
  withoutSyncBusyMarker,
} from './sync-queue.util';

describe('isSyncQueueSnapshot', () => {
  test.each([
    ['an empty object', {}, true],
    ['waiting ids', { waitingProjectIds: ['a'] }, true],
    ['an empty list', { waitingProjectIds: [] }, true],
    ['waitingProjectIds undefined', { waitingProjectIds: undefined }, true],
    ['waitingProjectIds null', { waitingProjectIds: null }, true],
    ['extra fields', { waitingProjectIds: ['a'], other: 1 }, true],
    ['running ids', { runningProjectIds: ['a'] }, true],
    ['runningProjectIds undefined', { runningProjectIds: undefined }, true],
    ['runningProjectIds null', { runningProjectIds: null }, true],
    ['both lists', { waitingProjectIds: ['a'], runningProjectIds: ['b'] }, true],
    ['runningProjectIds a string', { runningProjectIds: 'a' }, false],
    ['runningProjectIds with a number', { runningProjectIds: [1] }, false],
    ['valid waiting but bad running', { waitingProjectIds: ['a'], runningProjectIds: [1] }, false],
    ['bad waiting but valid running', { waitingProjectIds: 'a', runningProjectIds: ['b'] }, false],
    ['waitingProjectIds a string', { waitingProjectIds: 'a' }, false],
    ['waitingProjectIds with a number', { waitingProjectIds: [1] }, false],
    ['waitingProjectIds with a null entry', { waitingProjectIds: [null] }, false],
    ['sending ids', { sendingProjectIds: ['a'] }, true],
    ['sendingProjectIds undefined', { sendingProjectIds: undefined }, true],
    ['sendingProjectIds null', { sendingProjectIds: null }, true],
    [
      'all three lists',
      { waitingProjectIds: ['a'], sendingProjectIds: ['b'], runningProjectIds: ['c'] },
      true,
    ],
    ['sendingProjectIds a string', { sendingProjectIds: 'a' }, false],
    ['sendingProjectIds with a number', { sendingProjectIds: [1] }, false],
    [
      'valid waiting and running but bad sending',
      { waitingProjectIds: ['a'], sendingProjectIds: [1], runningProjectIds: ['c'] },
      false,
    ],
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
      sendingProjectIds: [],
      runningProjectIds: [],
    });
  });

  test('reads an absent or null list as empty', () => {
    const empty = { waitingProjectIds: [], sendingProjectIds: [], runningProjectIds: [] };
    expect(toSyncQueue({})).toEqual(empty);
    expect(toSyncQueue({ waitingProjectIds: null })).toEqual(empty);
    expect(toSyncQueue({ sendingProjectIds: null })).toEqual(empty);
  });

  test('keeps the running ids', () => {
    expect(toSyncQueue({ runningProjectIds: ['r'] })).toEqual({
      waitingProjectIds: [],
      sendingProjectIds: [],
      runningProjectIds: ['r'],
    });
  });

  test('keeps the sending ids apart from the waiting and running ones', () => {
    expect(
      toSyncQueue({ waitingProjectIds: ['w'], sendingProjectIds: ['s'], runningProjectIds: ['r'] }),
    ).toEqual({ waitingProjectIds: ['w'], sendingProjectIds: ['s'], runningProjectIds: ['r'] });
  });

  test('reads a snapshot from an older extension without running ids as none running', () => {
    expect(toSyncQueue({ waitingProjectIds: ['a'] }).runningProjectIds).toEqual([]);
    expect(toSyncQueue({ runningProjectIds: null }).runningProjectIds).toEqual([]);
  });
});

describe('SYNC_REQUEST_REMOVED_MARKER', () => {
  test("is the token the Send/Receive extension ends a removed request's message with", () => {
    expect(SYNC_REQUEST_REMOVED_MARKER).toBe(' (SR_REMOVED)');
  });
});

describe('IDLE_SYNC_QUEUE', () => {
  test('has nothing waiting, sending or running', () => {
    expect(IDLE_SYNC_QUEUE).toEqual({
      waitingProjectIds: [],
      sendingProjectIds: [],
      runningProjectIds: [],
    });
  });
});

describe('SYNC_BUSY_MARKER', () => {
  test('is the token a busy refusal ends its message with', () => {
    expect(SYNC_BUSY_MARKER).toBe('(SYNC_BUSY)');
  });
});

describe('isSyncBusyError', () => {
  test.each([
    ['a message ending with the marker', new Error('Sync is busy (SYNC_BUSY)'), true],
    ['trailing whitespace after the marker', new Error('Sync is busy (SYNC_BUSY)  \n'), true],
    [
      'the marker behind a JSON-RPC prefix',
      new Error('JSON-RPC Request error (-32000): Sync is busy (SYNC_BUSY)'),
      true,
    ],
    [
      'a FAILED_PRECONDITION platform error with the marker',
      newPlatformError('Sync is busy (SYNC_BUSY)', FAILED_PRECONDITION),
      true,
    ],
    [
      'an UNAVAILABLE platform error with the marker',
      newPlatformError('Sync is busy (SYNC_BUSY)', UNAVAILABLE),
      true,
    ],
    [
      'a FAILED_PRECONDITION platform error without the marker',
      newPlatformError('Project is locked', FAILED_PRECONDITION),
      false,
    ],
    [
      'an UNAVAILABLE platform error without the marker',
      newPlatformError('Not available', UNAVAILABLE),
      false,
    ],
    [
      'an INTERNAL error that says it is not responding',
      newPlatformError('Sync is not responding', INTERNAL),
      false,
    ],
    ['the marker mid-message', new Error('(SYNC_BUSY) and then more'), false],
    ['a plain string', 'Sync is busy (SYNC_BUSY)', false],
    ['undefined', undefined, false],
  ])('judges %s', (_name, error, expected) => {
    expect(isSyncBusyError(error)).toBe(expected);
  });
});

describe('withoutSyncBusyMarker', () => {
  test.each([
    ['strips the marker and the space before it', 'x (SYNC_BUSY)', 'x'],
    ['strips the marker with no space before it', 'x(SYNC_BUSY)', 'x'],
    ['leaves a message without the marker', 'x', 'x'],
    ['leaves the marker mid-string', 'x (SYNC_BUSY) y', 'x (SYNC_BUSY) y'],
    ['strips only one trailing marker', 'x (SYNC_BUSY) (SYNC_BUSY)', 'x (SYNC_BUSY)'],
    ['is a no-op on the empty string', '', ''],
  ])('%s', (_name, message, expected) => {
    expect(withoutSyncBusyMarker(message)).toBe(expected);
  });

  test('is idempotent once the marker is gone', () => {
    const once = withoutSyncBusyMarker('x (SYNC_BUSY)');
    expect(withoutSyncBusyMarker(once)).toBe(once);
  });
});

describe('isSyncRequestRemovedError', () => {
  test.each([
    [
      'an error ending with the marker',
      new Error(`Removed from the sync queue${SYNC_REQUEST_REMOVED_MARKER}`),
      true,
    ],
    [
      'the marker behind a JSON-RPC prefix',
      new Error(`JSON-RPC Request error (-32000): Removed${SYNC_REQUEST_REMOVED_MARKER}`),
      true,
    ],
    [
      'an error rebuilt from the removed error message',
      new Error(new Error(`Removed${SYNC_REQUEST_REMOVED_MARKER}`).message),
      true,
    ],
    ['a plain string with the marker', `Removed${SYNC_REQUEST_REMOVED_MARKER}`, true],
    ['an unrelated error', new Error('Project is locked by another user'), false],
    ['another marker', new Error('write refused (SR_EDIT_BLOCKED)'), false],
    ['undefined', undefined, false],
  ])('judges %s', (_name, error, expected) => {
    expect(isSyncRequestRemovedError(error)).toBe(expected);
  });
});
