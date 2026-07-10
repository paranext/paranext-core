import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { LegacyComment } from 'platform-bible-utils';
import { useConflictResolution } from './use-conflict-resolution.hook';
import { ConflictResolutionCallbacks } from './comment-list.types';

// --- Helpers ---

/** Minimal, fully-typed verseText conflict root comment (only the fields the hook reads matter). */
function makeVerseTextConflictComment(overrides: Partial<LegacyComment> = {}): LegacyComment {
  return {
    id: 'c1',
    thread: 't1',
    type: 'Conflict',
    conflictType: 'verseText',
    contents: '',
    date: '2024-08-23T14:29:35.4874426-05:00',
    deleted: false,
    hideInTextWindow: false,
    isRead: true,
    language: 'en',
    startPosition: 0,
    user: 'TJ Couch',
    verseRef: 'GEN 1:1',
    ...overrides,
  };
}

function makeConflictResolution(
  overrides: Partial<ConflictResolutionCallbacks> = {},
): ConflictResolutionCallbacks {
  return {
    resolve: vi.fn().mockResolvedValue(true),
    getOptions: vi.fn().mockResolvedValue('none'),
    unresolve: vi.fn().mockResolvedValue(true),
    getUndoAvailability: vi.fn().mockResolvedValue(false),
    ...overrides,
  };
}

// --- Tests ---

test('exposes canUnresolve and runs unresolve for a resolved, selected verseText conflict', async () => {
  const unresolve = vi.fn().mockResolvedValue(true);
  const getUndoAvailability = vi.fn().mockResolvedValue(true);
  const conflictResolution = makeConflictResolution({ unresolve, getUndoAvailability });

  const { result } = renderHook(() =>
    useConflictResolution({
      threadId: 't1',
      threadStatus: 'Resolved',
      isSelected: true,
      activeComments: [makeVerseTextConflictComment()],
      conflictResolution,
    }),
  );

  expect(getUndoAvailability).toHaveBeenCalledWith('t1');
  await waitFor(() => expect(result.current.canUnresolve).toBe(true));

  expect(result.current.isUnresolving).toBe(false);
  await act(async () => {
    await result.current.unresolve();
  });
  expect(unresolve).toHaveBeenCalledWith('t1');
  expect(result.current.isUnresolving).toBe(false);
});

test('does not offer undo for an unresolved verseText conflict', async () => {
  const getUndoAvailability = vi.fn().mockResolvedValue(true);
  const conflictResolution = makeConflictResolution({ getUndoAvailability });

  const { result } = renderHook(() =>
    useConflictResolution({
      threadId: 't1',
      threadStatus: 'Todo',
      isSelected: true,
      activeComments: [makeVerseTextConflictComment()],
      conflictResolution,
    }),
  );

  // Give any (unexpected) async fetch a turn to resolve before asserting the negative.
  await act(async () => {
    await Promise.resolve();
  });
  expect(getUndoAvailability).not.toHaveBeenCalled();
  expect(result.current.canUnresolve).toBe(false);
});

test('does not offer undo for a resolved, selected, non-verseText conflict', async () => {
  const getUndoAvailability = vi.fn().mockResolvedValue(true);
  const conflictResolution = makeConflictResolution({ getUndoAvailability });

  const { result } = renderHook(() =>
    useConflictResolution({
      threadId: 't1',
      threadStatus: 'Resolved',
      isSelected: true,
      activeComments: [makeVerseTextConflictComment({ conflictType: 'invalidVerses' })],
      conflictResolution,
    }),
  );

  await act(async () => {
    await Promise.resolve();
  });
  expect(getUndoAvailability).not.toHaveBeenCalled();
  expect(result.current.canUnresolve).toBe(false);
});

test('does not offer undo for a resolved but collapsed (unselected) verseText conflict', async () => {
  const getUndoAvailability = vi.fn().mockResolvedValue(true);
  const conflictResolution = makeConflictResolution({ getUndoAvailability });

  const { result } = renderHook(() =>
    useConflictResolution({
      threadId: 't1',
      threadStatus: 'Resolved',
      isSelected: false,
      activeComments: [makeVerseTextConflictComment()],
      conflictResolution,
    }),
  );

  await act(async () => {
    await Promise.resolve();
  });
  expect(getUndoAvailability).not.toHaveBeenCalled();
  expect(result.current.canUnresolve).toBe(false);
});

test('sets isUnresolving while the unresolve call is in flight, and clears it after', async () => {
  let resolveUnresolve: (value: boolean) => void = () => {};
  const unresolve = vi.fn(
    () =>
      new Promise<boolean>((resolve) => {
        resolveUnresolve = resolve;
      }),
  );
  const conflictResolution = makeConflictResolution({
    unresolve,
    getUndoAvailability: vi.fn().mockResolvedValue(true),
  });

  const { result } = renderHook(() =>
    useConflictResolution({
      threadId: 't1',
      threadStatus: 'Resolved',
      isSelected: true,
      activeComments: [makeVerseTextConflictComment()],
      conflictResolution,
    }),
  );

  await waitFor(() => expect(result.current.canUnresolve).toBe(true));

  let unresolvePromise: Promise<void>;
  act(() => {
    unresolvePromise = result.current.unresolve();
  });
  await waitFor(() => expect(result.current.isUnresolving).toBe(true));

  await act(async () => {
    resolveUnresolve(true);
    await unresolvePromise;
  });
  expect(result.current.isUnresolving).toBe(false);
});
