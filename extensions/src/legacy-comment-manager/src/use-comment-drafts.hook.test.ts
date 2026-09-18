// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { newPlatformError, type LegacyCommentThread } from 'platform-bible-utils';
import type { CommentDraft } from 'platform-bible-react';
import { saveDrafts } from './comment-draft-store';
import { makeEditorState } from './comment-draft.fixtures';
import { useCommentDrafts } from './use-comment-drafts.hook';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/** Minimal, valid `LegacyCommentThread` fixture — only `id` is read by this hook. */
function makeCommentThread(id: string): LegacyCommentThread {
  return {
    id,
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-01T00:00:00.0000000-00:00',
    verseRef: 'MRK 1:1',
    isSpellingNote: false,
    isBTNote: false,
    isConsultantNote: false,
    isRead: false,
    comments: [
      {
        contents: `<p>${id} root comment</p>`,
        date: '2024-01-01T00:00:00.0000000-00:00',
        deleted: false,
        hideInTextWindow: false,
        id: `${id}/tester/2024-01-01`,
        isRead: false,
        language: 'en',
        startPosition: 0,
        thread: id,
        user: 'Tester',
        verseRef: 'MRK 1:1',
      },
    ],
  };
}

const threadA = makeCommentThread('thread-a');
const threadB = makeCommentThread('thread-b');

type CommentDraftsProps = Parameters<typeof useCommentDrafts>[0];

/** Renders the hook with sensible defaults; rerender with partial overrides per step. */
function renderCommentDrafts(initialOverrides: Partial<CommentDraftsProps> = {}) {
  const defaultProps: CommentDraftsProps = {
    projectId: 'project-1',
    commentThreads: [threadA, threadB],
    isLoadingCommentThreads: false,
    isShowingAllCommentThreads: true,
  };
  const { result, rerender } = renderHook((props) => useCommentDrafts(props), {
    initialProps: { ...defaultProps, ...initialOverrides },
  });
  return {
    result,
    rerenderWith: (overrides: Partial<CommentDraftsProps>) =>
      rerender({ ...defaultProps, ...overrides }),
  };
}

beforeEach(() => {
  // Drafts persist to real localStorage (comment-draft-store.ts); jsdom's storage is shared across
  // every test in this file, so a draft written by one test must not leak into the next.
  localStorage.clear();
});

describe('useCommentDrafts', () => {
  it('keeps a draft when the query narrows to exclude its thread, and back', () => {
    // The hook-level equivalent of "a filter change unmounts the thread's CommentThread component":
    // the web view's query narrows (a "Resolved" preset would drop threadA, a Todo thread, from the
    // result and flip isShowingAllCommentThreads false) and later widens back. The whole point of
    // hoisting draft state into this hook is that neither transition may lose it.
    const { result, rerenderWith } = renderCommentDrafts();

    const halfAThought = makeEditorState('half a thought');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: halfAThought });
    });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    rerenderWith({ commentThreads: [threadB], isShowingAllCommentThreads: false });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    rerenderWith({ commentThreads: [threadA, threadB], isShowingAllCommentThreads: true });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });
  });

  it('does not prune drafts while the comment-thread query is still loading', () => {
    // The single most destructive thing pruning could do: mistake "the query hasn't returned yet"
    // for "this project has no threads" and wipe out every draft on mount. Seed a draft for a
    // thread that is real but not yet reflected in the (empty, still-loading) query result.
    const seededDraft: Record<string, CommentDraft> = {
      [threadA.id]: { editorState: makeEditorState('saved draft') },
    };
    saveDrafts('project-1', seededDraft);

    const { result } = renderCommentDrafts({ commentThreads: [], isLoadingCommentThreads: true });

    expect(result.current.drafts).toEqual(seededDraft);
  });

  it('keeps a draft when the thread-query subscription delivers an error', () => {
    // An error travels through the SAME channel as data and clears the loading flag exactly like
    // real data would, so "the query failed" and "this project has no threads" both flatten to an
    // empty, not-loading list unless the guard checks the raw query result (a PlatformError) rather
    // than an already-normalized thread array.
    const seededDraft: Record<string, CommentDraft> = {
      [threadA.id]: { editorState: makeEditorState('saved draft') },
    };
    saveDrafts('project-1', seededDraft);

    const { result } = renderCommentDrafts({
      commentThreads: newPlatformError('Simulated CommentThreads failure'),
      isLoadingCommentThreads: false,
    });

    expect(result.current.drafts).toEqual(seededDraft);
  });

  it('prunes drafts when the project genuinely has no threads', () => {
    // The companion to the error test above: a healthy query that resolves to an empty list is NOT
    // an error, and must still prune -- otherwise "don't prune on error" could be satisfied by the
    // over-broad "never prune an empty list," which would silently resurrect every deleted thread's
    // draft forever.
    saveDrafts('project-1', { [threadA.id]: { editorState: makeEditorState('stale draft') } });

    const { result } = renderCommentDrafts({ commentThreads: [] });

    expect(result.current.drafts).toEqual({});
  });
});
