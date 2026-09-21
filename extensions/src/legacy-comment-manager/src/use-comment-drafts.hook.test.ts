// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { newPlatformError, type LegacyCommentThread } from 'platform-bible-utils';
import type { CommentDraft } from 'platform-bible-react';
import { loadDrafts, saveDrafts } from './comment-draft-store';
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
  const { result, rerender, unmount } = renderHook((props) => useCommentDrafts(props), {
    initialProps: { ...defaultProps, ...initialOverrides },
  });
  return {
    result,
    unmount,
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

  it('does not overwrite a stored value the mount-time load could not parse', () => {
    // `loadDrafts` returns `{}` for four distinct reasons -- genuinely empty, unparseable JSON, a
    // rejected shape, or a storage throw -- and a write of a value only just read can never add
    // information, so the save effect must never fire on the mount-time load alone. `saveDrafts`
    // removes the key entirely when handed an empty map, so a save effect that fires unconditionally
    // on mount would turn this degraded read into a silent deletion. Seed storage with something
    // `loadDrafts` cannot parse, mount (and unmount, to force the debounced write to run rather than
    // wait out its 500ms timer -- see the "flushes a pending debounced save on unmount" test below
    // for why that flushes deterministically), and confirm the original stored value is untouched.
    const storageKey = 'legacyCommentManager.drafts.project-1';
    localStorage.setItem(storageKey, 'not json');

    const { unmount } = renderCommentDrafts();
    unmount();

    expect(localStorage.getItem(storageKey)).toBe('not json');
  });

  it('flushes a pending debounced save on unmount so it is not lost', () => {
    // Writes are debounced 500ms; closing the panel mid-burst must not lose the last keystrokes.
    // Unmounting well before the debounce would fire on its own means only the cleanup's
    // `debouncedSaveDrafts.flush()` call can be responsible for this write reaching storage.
    const { result, unmount } = renderCommentDrafts();

    const lastKeystroke = makeEditorState('typed just before closing');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: lastKeystroke });
    });

    unmount();

    expect(loadDrafts('project-1')).toEqual({ [threadA.id]: { editorState: lastKeystroke } });
  });

  it('flushes a pending debounced save on pagehide, WITHOUT unmounting', () => {
    // This is the real regression: `web-view.component.tsx` renders this web view's content via
    // `srcDoc`, and both `openCommentListPanel`'s `reloadWebView` (on every project switch) and a
    // window/app close replace or destroy the iframe's document without ever unmounting this
    // React tree -- so a cleanup-on-unmount-only flush (the previous test) never runs on either
    // real path. `pagehide` fires on the iframe's own window in both cases; asserting the flush
    // WITHOUT calling `unmount()` is what actually exercises that path, since RTL's `unmount()`
    // runs React's cleanup unconditionally and would pass even if no `pagehide` listener existed
    // at all.
    const { result } = renderCommentDrafts();

    const lastKeystroke = makeEditorState('typed just before the iframe document is replaced');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: lastKeystroke });
    });

    act(() => {
      window.dispatchEvent(new Event('pagehide'));
    });

    expect(loadDrafts('project-1')).toEqual({ [threadA.id]: { editorState: lastKeystroke } });
  });

  it('flushes a pending debounced save on beforeunload, WITHOUT unmounting', () => {
    // The real-window-close pairing for `pagehide`, matching
    // platform-scripture-editor.web-view.tsx's teardown flush.
    const { result } = renderCommentDrafts();

    const lastKeystroke = makeEditorState('typed just before the window closes');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: lastKeystroke });
    });

    act(() => {
      window.dispatchEvent(new Event('beforeunload'));
    });

    expect(loadDrafts('project-1')).toEqual({ [threadA.id]: { editorState: lastKeystroke } });
  });

  it('keeps a draft when the PRESET widens back to default before the query has caught up', () => {
    // `isShowingAllCommentThreads` is computed synchronously from the current render's filter
    // state, but `isLoadingCommentThreads` is raised by a passive effect (see
    // create-use-data-hook.util.ts) that has not run yet on the very render the preset widens back
    // to default. On that render `commentThreads` is still the array the NARROW preset produced --
    // the same object reference, not a fresh one -- because the query has not resolved yet. A guard
    // that trusts `isShowingAllCommentThreads`/`isLoadingCommentThreads` alone reads that frame as
    // safe to prune, which would delete threadA's draft even though the data backing it is stale.
    const { result, rerenderWith } = renderCommentDrafts();

    const halfAThought = makeEditorState('half a thought');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: halfAThought });
    });

    // A "Resolved"-style preset narrows the query to threadB and settles there.
    const narrowedThreads = [threadB];
    rerenderWith({ commentThreads: narrowedThreads, isShowingAllCommentThreads: false });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    // The user flips the preset back to "All". `isShowingAllCommentThreads` flips true THIS render,
    // but the query result the runtime hands back is the very same stale, narrow array -- the
    // subscription has not delivered new data yet, so `isLoadingCommentThreads` is still `false`
    // too. This is the exact intermediate frame the runtime produces on a real widening action.
    rerenderWith({ commentThreads: narrowedThreads, isShowingAllCommentThreads: true });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    // Once the query genuinely catches up with fresh data for the widened selection, pruning must
    // resume normally: nothing here should still trigger deletion because both threads are present.
    rerenderWith({ commentThreads: [threadA, threadB], isShowingAllCommentThreads: true });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });
  });

  it('keeps a draft when the SCOPE widens back to default before the query has caught up', () => {
    // The scope-axis twin of the test above: with `preset: 'all'`, widening `scopeFilter` from
    // 'current-chapter' back to 'all-books' hits the identical race, because
    // `isShowingAllCommentThreads` folds both the preset and scope axes into one boolean (see
    // `isShowingAllThreads`). The hook cannot tell which axis moved -- only that the guard's inputs
    // said "safe" one render before the data agreed.
    const { result, rerenderWith } = renderCommentDrafts();

    const halfAThought = makeEditorState('half a thought');
    act(() => {
      result.current.handleDraftChange(threadA.id, { editorState: halfAThought });
    });

    // Scoping down to the current chapter narrows the query to threadB and settles there.
    const narrowedThreads = [threadB];
    rerenderWith({ commentThreads: narrowedThreads, isShowingAllCommentThreads: false });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    // Scope widens back to "All books" this render, but the query hasn't delivered fresh data yet.
    rerenderWith({ commentThreads: narrowedThreads, isShowingAllCommentThreads: true });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });

    rerenderWith({ commentThreads: [threadA, threadB], isShowingAllCommentThreads: true });
    expect(result.current.drafts[threadA.id]).toEqual({ editorState: halfAThought });
  });

  it('drops a commentEdits entry whose comment was deleted, even though its thread survives', () => {
    // threadA's only comment id is `${threadA.id}/tester/2024-01-01` (see makeCommentThread).
    // Seed a commentEdits entry for a comment id that is NOT in that list -- e.g. a reply that was
    // since deleted -- alongside one that still exists.
    const stillHereCommentId = `${threadA.id}/tester/2024-01-01`;
    const survivingEdit = makeEditorState('still editing this one');
    saveDrafts('project-1', {
      [threadA.id]: {
        commentEdits: {
          [stillHereCommentId]: survivingEdit,
          'deleted-reply-id': makeEditorState('edit to a reply that is now gone'),
        },
      },
    });

    const { result } = renderCommentDrafts();

    expect(result.current.drafts[threadA.id]).toEqual({
      commentEdits: { [stillHereCommentId]: survivingEdit },
    });
  });

  it('keeps a draft written by a second view on the same project after this one persists its own', () => {
    // The Finding 10 scenario end-to-end: the Column 3 panel and the editor-anchored list can both
    // be open on the same project, each running its OWN useCommentDrafts instance with its own
    // in-memory `drafts` map. View A mounts first (empty storage), then view B writes and flushes a
    // draft for a DIFFERENT thread. View A -- which never loaded view B's write into its own stale
    // in-memory map -- then writes and flushes its own draft. A whole-map save from view A would
    // silently erase view B's draft, since view A's in-memory map never contained it.
    const viewA = renderCommentDrafts();
    const viewB = renderCommentDrafts();

    act(() => {
      viewB.result.current.handleDraftChange(threadB.id, {
        editorState: makeEditorState("view B's draft"),
      });
    });
    viewB.unmount(); // flushes view B's debounced write

    act(() => {
      viewA.result.current.handleDraftChange(threadA.id, {
        editorState: makeEditorState("view A's draft"),
      });
    });
    viewA.unmount(); // flushes view A's debounced write

    expect(loadDrafts('project-1')).toEqual({
      [threadA.id]: { editorState: makeEditorState("view A's draft") },
      [threadB.id]: { editorState: makeEditorState("view B's draft") },
    });
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
