// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCallback, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import papi from '@papi/frontend';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { LegacyCommentThreadSelector } from 'legacy-comment-manager';
import type { LegacyCommentThread } from 'platform-bible-utils';
import { saveDrafts } from './comment-draft-store';
import type { StoredFilterSelection } from './comment-filter-store';
import { makeEditorState } from './comment-draft.fixtures';
import {
  CommentFilters,
  CommentPreset,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  LegacyCommentFilters,
  LegacyScopeFilter,
  ScopeFilter,
} from './comment-list-filters.model';

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  /** Every set of props the stubbed CommentListPanel has been rendered with, in order */
  const panelPropsLog: {
    isLoading: boolean;
    threads: { id: string }[];
    filters: CommentFilters;
    scopeFilter: ScopeFilter;
    // The panel's own change handlers, so a test can make the filter change the user makes
    onFiltersChange: (filters: CommentFilters) => void;
    onScopeFilterChange: (scopeFilter: ScopeFilter) => void;
    drafts?: Readonly<Record<string, { editorState?: string }>>;
    onDraftChange?: (threadId: string, draft: { editorState?: string } | undefined) => void;
    currentUserNameUnavailable?: boolean;
    onRetryFetchCurrentUserName?: () => void;
  }[] = [];
  /**
   * A settable stand-in for the comments PDP's server-side filtering: `useProjectData(...)
   * .CommentThreads` (mocked below) filters `current` by the handful of selector fields these tests
   * actually drive (`isResolved`), rather than always returning an empty list, so a test can
   * exercise a filter change actually changing which threads render. The loading/error paths of
   * that same query are exercised at the `useCommentDrafts` hook level instead (see
   * use-comment-drafts.hook.test.ts) -- this fixture only needs to drive real filtering, which is
   * what the remaining draft-persistence test here (an end-to-end wiring check) actually needs.
   */
  const commentThreadsFixture: {
    current: LegacyCommentThread[];
  } = {
    current: [],
  };
  // Stable across renders: the message-listener effect lists these among its deps, and fresh
  // functions every render would re-subscribe it mid-test for reasons the tests are not about
  const bcvSyncScroll = {
    recordSelfInitiatedNavigation: vi.fn(),
    cancelPendingSyncScroll: vi.fn(),
  };
  /**
   * Every selector object the web view has passed to `CommentThreads`, in render order. A stable
   * reference between two entries means the real PDP hook would see an unchanged selector and skip
   * re-subscribing; a new reference means it would tear down and re-establish the subscription.
   */
  const commentThreadSelectorLog: LegacyCommentThreadSelector[] = [];
  return {
    panelPropsLog,
    bcvSyncScroll,
    commentThreadSelectorLog,
    commentThreadsFixture,
  };
});

vi.mock('@papi/frontend', () => ({
  default: {
    themes: { subscribeCurrentTheme: vi.fn(async () => vi.fn()) },
    commands: { sendCommand: vi.fn(async () => ({ name: 'Tester' })) },
    window: { setFocus: vi.fn() },
  },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: vi.fn(() => [{}]),
  useProjectData: vi.fn(() => ({
    CommentThreads: (selector: LegacyCommentThreadSelector) => {
      mocks.commentThreadSelectorLog.push(selector);
      // A minimal stand-in for the comments PDP's server-side filtering: only `isResolved` is
      // simulated, since that is the only axis the draft-persistence test below drives.
      const filtered = mocks.commentThreadsFixture.current.filter((thread) => {
        if (selector.isResolved === undefined) return true;
        return (thread.status === 'Resolved') === selector.isResolved;
      });
      return [filtered, vi.fn(), false];
    },
  })),
  useProjectDataProvider: vi.fn(() => ({})),
  useWebViewController: vi.fn(() => undefined),
}));

// Only what the web view module reads at load or render time; the pieces these tests exercise
// (message handling, filter state) live in the web view itself and its local utils, which are real
vi.mock('platform-bible-react', () => ({
  COMMENT_LIST_ELEMENT_ID: 'comment-list',
  COMMENT_LIST_STRING_KEYS: [],
  CONFLICT_NOTE_STRING_KEYS: [],
  getCommentThreadElementId: (threadId: string) => `comment-thread-${threadId}`,
  Sonner: () => undefined,
  sonner: { error: vi.fn(), warning: vi.fn(), info: vi.fn() },
  usePromise: vi.fn((_factory: unknown, defaultValue: unknown) => [defaultValue, false]),
  useTabIconSelection: vi.fn(() => undefined),
  useViewVisibility: vi.fn(() => true),
}));

vi.mock('./use-bcv-sync-scroll.hook', () => ({
  useBcvSyncScroll: () => mocks.bcvSyncScroll,
}));

// The panel is presentation; recording the props it is handed is how these tests observe which
// filters the web view actually has applied
vi.mock('./comment-list.component', () => ({
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS: [],
  CommentListPanel: ({
    isLoading,
    threads,
    filters,
    scopeFilter,
    onFiltersChange,
    onScopeFilterChange,
    drafts,
    onDraftChange,
    currentUserNameUnavailable,
    onRetryFetchCurrentUserName,
  }: {
    isLoading: boolean;
    threads: { id: string }[];
    filters: CommentFilters;
    scopeFilter: ScopeFilter;
    onFiltersChange: (filters: CommentFilters) => void;
    onScopeFilterChange: (scopeFilter: ScopeFilter) => void;
    drafts?: Readonly<Record<string, { editorState?: string }>>;
    onDraftChange?: (threadId: string, draft: { editorState?: string } | undefined) => void;
    currentUserNameUnavailable?: boolean;
    onRetryFetchCurrentUserName?: () => void;
  }) => {
    mocks.panelPropsLog.push({
      isLoading,
      threads,
      filters,
      scopeFilter,
      onFiltersChange,
      onScopeFilterChange,
      drafts,
      onDraftChange,
      currentUserNameUnavailable,
      onRetryFetchCurrentUserName,
    });
    // A minimal stand-in for the real toolbar's reply-box editor: one text input per currently
    // rendered thread, wired straight to `drafts`/`onDraftChange`, so a test can exercise "the web
    // view keeps a draft across a filter-driven remount" without depending on the real Lexical
    // editor. Only rendered for `threads` -- a thread absent from the current (filtered) list has
    // no input, matching the real CommentThread unmounting.
    return (
      <>
        {threads.map((thread) => (
          <input
            key={thread.id}
            aria-label={`draft-${thread.id}`}
            value={drafts?.[thread.id]?.editorState ?? ''}
            onChange={(event) =>
              onDraftChange?.(
                thread.id,
                event.target.value ? { editorState: event.target.value } : undefined,
              )
            }
          />
        ))}
      </>
    );
  },
}));

// vi.mock declarations above are hoisted, so this import must come after to ensure the mocks are
// applied to the module under test. Importing registers `globalThis.webViewComponent`.
// eslint-disable-next-line import/first
import './comment-list.web-view';

/**
 * A working stand-in for the `useWebViewState` prop: a real keyed React state hook over a plain
 * map, seeded so the view mounts with an editor wired.
 */
function makeUseWebViewState(seed: Record<string, unknown>): UseWebViewStateHook {
  const store = new Map<string, unknown>(Object.entries(seed));
  return function useWebViewStateFake<T>(
    stateKey: string,
    defaultStateValue: T,
  ): [T, (stateValue: T) => void, () => void] {
    const [value, setValue] = useState<T>(() =>
      // The store holds whatever a previous setter put there under this key; only the seed and the
      // setter below ever write it, both with the key's own T
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      store.has(stateKey) ? (store.get(stateKey) as T) : defaultStateValue,
    );
    const set = useCallback(
      (stateValue: T) => {
        store.set(stateKey, stateValue);
        setValue(stateValue);
      },
      [stateKey],
    );
    const reset = useCallback(() => {
      store.delete(stateKey);
    }, [stateKey]);
    return [value, set, reset];
  };
}

const useWebViewScrollGroupScrRefFake: UseWebViewScrollGroupScrRefHook = () => [
  { book: 'MRK', chapterNum: 1, verseNum: 1 },
  vi.fn(),
  0,
  vi.fn(),
  undefined,
];

/**
 * A working stand-in for the `useWebViewScrollGroupScrRef` prop: a real `useState`-backed hook
 * whose value a test can push from outside via {@link ControllableScrRef.setScrRef}, so a test can
 * simulate the window's scroll group moving.
 */
type ControllableScrRef = {
  hook: UseWebViewScrollGroupScrRefHook;
  setScrRef: (nextScrRef: SerializedVerseRef) => void;
};

function makeControllableScrRef(initialScrRef: SerializedVerseRef): ControllableScrRef {
  // Captured by the hook on every render so `setScrRef` below always drives the fiber's own
  // setState rather than a stale one from an earlier render.
  let latestSetScrRef: ((nextScrRef: SerializedVerseRef) => void) | undefined;
  // Named with the `use` prefix (rather than the returned `hook` property name) so
  // eslint-plugin-react-hooks recognizes the `useState` call below as a hook call.
  const useControllableScrRef: UseWebViewScrollGroupScrRefHook = () => {
    const [scrRef, setScrRef] = useState(initialScrRef);
    latestSetScrRef = setScrRef;
    return [scrRef, vi.fn(), 0, vi.fn(), undefined];
  };
  return {
    hook: useControllableScrRef,
    setScrRef: (nextScrRef) => {
      if (!latestSetScrRef)
        throw new Error('useWebViewScrollGroupScrRef has not rendered yet; render first');
      latestSetScrRef(nextScrRef);
    },
  };
}

function renderCommentListWebView(
  useWebViewScrollGroupScrRef: UseWebViewScrollGroupScrRefHook = useWebViewScrollGroupScrRefFake,
  projectId = 'project-1',
  stateSeed: Record<string, unknown> = {},
) {
  const CommentListWebView = globalThis.webViewComponent;
  render(
    <CommentListWebView
      webViewType="legacyCommentManager.commentList"
      id="comment-list-1"
      projectId={projectId}
      useWebViewState={makeUseWebViewState({ editorWebViewId: 'editor-1', ...stateSeed })}
      useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRef}
      updateWebViewDefinition={vi.fn()}
    />,
  );
}

/** The real `localStorage` key `comment-filter-store.ts` persists a project's selection under. */
function storageKeyFor(projectId: string): string {
  return `legacyCommentManager.filters.${projectId}`;
}

/**
 * Seeds this machine's storage with a project's filter selection before rendering, so a test can
 * control what a project mounts already showing.
 */
function seedStoredSelection(projectId: string, selection: StoredFilterSelection) {
  localStorage.setItem(storageKeyFor(projectId), JSON.stringify(selection));
}

/**
 * Reads a project's raw stored selection straight from `localStorage`, bypassing the web view and
 * `comment-filter-store.ts`'s own narrowing -- what a test asserts against to confirm exactly what
 * was (or wasn't) persisted, and to catch a value this build wouldn't otherwise round-trip through
 * `loadFilterSelection`.
 */
function readStoredSelection(projectId: string): unknown {
  const raw = localStorage.getItem(storageKeyFor(projectId));
  return raw ? JSON.parse(raw) : undefined;
}

function dispatchSetFilters(message: {
  filters?: Partial<CommentFilters> | LegacyCommentFilters;
  scopeFilter?: ScopeFilter | LegacyScopeFilter;
}) {
  window.dispatchEvent(new MessageEvent('message', { data: { method: 'setFilters', ...message } }));
}

function latestPanelProps() {
  return mocks.panelPropsLog[mocks.panelPropsLog.length - 1];
}

/** Minimal, valid `LegacyCommentThread` fixture builder — only the fields these tests read vary. */
function makeCommentThread(id: string, status: 'Todo' | 'Resolved'): LegacyCommentThread {
  return {
    id,
    status,
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

/** An open (not resolved) thread — matches the default "All comments" preset but not "Resolved". */
const threadA = makeCommentThread('thread-a', 'Todo');
/** A resolved thread — matches the "Resolved" preset but not the default "All comments" preset. */
const threadB = makeCommentThread('thread-b', 'Resolved');
/**
 * A third thread, in scope but never drafted — used only by the scope-exclusion test below, so that
 * test fails for its own reason (a never-drafted, in-scope thread leaking through) rather than only
 * incidentally passing against a no-op unsaved filter that a broken scope-only query would already
 * make pass.
 */
const threadC = makeCommentThread('thread-c', 'Todo');

/** Maps a preset's user-facing toolbar label to its underlying value — the three this file drives. */
const PRESET_LABEL_TO_VALUE: Partial<Record<string, CommentPreset>> = {
  'All comments': 'all',
  Resolved: 'resolved',
  'Unsaved comments': 'unsaved',
};

/**
 * Selects a comment-filter preset by the label the real toolbar dropdown shows, driving the panel's
 * own `onFiltersChange` handler exactly as the existing filter tests above do — the panel itself is
 * mocked, so there is no real dropdown to click.
 */
function selectPreset(label: string) {
  const preset = PRESET_LABEL_TO_VALUE[label];
  if (!preset) throw new Error(`Unknown preset label in this test file's mock: ${label}`);
  act(() => {
    latestPanelProps().onFiltersChange({ preset });
  });
}

/** Types into the mocked panel's stand-in draft input for the given thread (see the panel mock). */
function typeDraftInto(threadId: string, text: string) {
  act(() => {
    fireEvent.change(screen.getByLabelText(`draft-${threadId}`), { target: { value: text } });
  });
}

/** Reads the current value of the mocked panel's stand-in draft input for the given thread. */
async function draftTextIn(threadId: string): Promise<string> {
  return waitFor(() => {
    const input = screen.getByLabelText(`draft-${threadId}`);
    if (!(input instanceof HTMLInputElement)) throw new Error('Expected an <input> element');
    return input.value;
  });
}

/**
 * A stored selection that differs from the default view, reused wherever a test needs "the stored
 * selection" to be something visibly distinct from the default — so restoring it, or overriding it,
 * is a real observation rather than a coincidence.
 */
const UNREAD_CURRENT_BOOK_SELECTION: StoredFilterSelection = {
  preset: 'unread',
  scopeFilter: 'current-book',
};

beforeEach(() => {
  mocks.commentThreadsFixture.current = [];
  // Both drafts (comment-draft-store.ts) and the filter selection (comment-filter-store.ts) persist
  // to real localStorage; jsdom's storage is shared across every test in this file, so a value
  // written by one test must not leak into the next.
  localStorage.clear();
});

describe('setFilters messages replayed in a burst', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('applies a message equal to the pre-burst state instead of skipping it', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    // Buffered messages replay back-to-back, with no render between them: an S/R conflict link
    // narrowing the view, then a plain reopen resetting it. The reset resolves to exactly the
    // state the view had before the burst, so comparing it against a snapshot from before the
    // burst — instead of against what the first message just applied — skips it and leaves the
    // narrowed filters applied for good.
    act(() => {
      dispatchSetFilters({ filters: { preset: 'resolved' }, scopeFilter: 'current-chapter' });
      dispatchSetFilters({});
    });

    await waitFor(() => {
      expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
      expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER);
    });
  });

  it('applies a message equal to the state a panel change just left behind', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    // The user narrows the list from the panel, and a message arrives before React has re-rendered
    // — a reopen that resets the view to exactly what it held before that change. Comparing it
    // against a snapshot taken before the panel change makes it look like a no-op, so the user's
    // narrowed filters stay applied and the programmatic open shows the wrong view for good.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
      dispatchSetFilters({});
    });

    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('applies a message equal to the scope a panel change just left behind', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      latestPanelProps().onScopeFilterChange('current-chapter');
      dispatchSetFilters({});
    });

    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER));
  });

  it('still skips a genuinely identical repeat, minting no new filters object', async () => {
    renderCommentListWebView();
    act(() => {
      dispatchSetFilters({ filters: { preset: 'resolved' } });
    });
    await waitFor(() =>
      expect(latestPanelProps().filters).toEqual({
        preset: 'resolved',
      }),
    );
    const appliedFilters = latestPanelProps().filters;

    act(() => {
      dispatchSetFilters({ filters: { preset: 'resolved' } });
    });

    // The same object, not merely an equal one: an accepted repeat would mint a new-but-equal
    // filters object, churning the CommentThreads subscription the equal-values skip protects
    expect(latestPanelProps().filters).toBe(appliedFilters);
  });
});

describe('setFilters message — legacy shapes and unrecognized values', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('maps a legacy four-axis setFilters message onto its matching preset', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      dispatchSetFilters({ filters: { resolved: 'unresolved', assignment: 'assigned-to-me' } });
    });

    await waitFor(() =>
      expect(latestPanelProps().filters).toEqual({ preset: 'unresolved-assigned-to-me' }),
    );
  });

  it('falls back to the all preset for a legacy combination with no counterpart', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      // 'team' assignment was dropped entirely by the new preset model -- no combination naming it
      // has a counterpart.
      dispatchSetFilters({ filters: { assignment: 'team' } });
    });

    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it("maps the legacy 'unfiltered' scope onto 'all-books' through the real message boundary", async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      dispatchSetFilters({ scopeFilter: 'unfiltered' });
    });

    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe('all-books'));
  });

  it('resolves an unrecognized preset to the default instead of reaching the exhaustiveness guard', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    // Without applyFilterOverrides' isCommentPreset narrowing, this message would flow straight into
    // buildCommentThreadSelector's `filters.preset` switch during render and throw
    // `Unhandled comment preset: assigned-to-team` -- reproduced by temporarily removing that
    // narrowing (see the PR description / task notes for the actual failure this pins).
    act(() => {
      dispatchSetFilters({
        // Simulating a malformed value crossing the message bus, which real senders aren't
        // restricted to the current union.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        filters: { preset: 'assigned-to-team' as CommentPreset },
      });
    });

    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('resolves an unrecognized scope to the default instead of reaching scopeFieldsUsed', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    // Without resolveScopeFilter's isScopeFilter narrowing, this message would flow straight into
    // `scopeFieldsUsed[scopeFilter].book` during render and throw a TypeError reading `.book` off
    // `undefined`.
    act(() => {
      dispatchSetFilters({
        // Simulating a malformed value crossing the message bus, which real senders aren't
        // restricted to the current union.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        scopeFilter: 'not-a-real-scope' as ScopeFilter,
      });
    });

    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe('all-books'));
  });
});

describe('initialFilters/initialScopeFilter web view state seed — legacy shapes', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('maps a legacy four-axis initialFilters seed onto its matching preset on mount', async () => {
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      initialFilters: { read: 'unread', assignment: 'assigned-to-me' },
    });

    await waitFor(() =>
      expect(latestPanelProps().filters).toEqual({ preset: 'unread-assigned-to-me' }),
    );
  });

  it("maps a legacy 'unfiltered' initialScopeFilter seed onto 'all-books' on mount", async () => {
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      initialScopeFilter: 'unfiltered',
    });

    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe('all-books'));
  });
});

function latestCommentThreadSelector() {
  return mocks.commentThreadSelectorLog[mocks.commentThreadSelectorLog.length - 1];
}

describe('current-* scope scrRef wiring', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('re-queries at the new position when scoped to current-verse', async () => {
    const scrRefControls = makeControllableScrRef({ book: 'MRK', chapterNum: 1, verseNum: 1 });
    renderCommentListWebView(scrRefControls.hook);
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      latestPanelProps().onScopeFilterChange('current-verse');
    });
    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe('current-verse'));
    const selectorBeforeMove = latestCommentThreadSelector();
    expect(selectorBeforeMove.scriptureRanges?.[0]?.start).toEqual({
      book: 'MRK',
      chapterNum: 1,
      verseNum: 1,
    });

    act(() => {
      scrRefControls.setScrRef({ book: 'MRK', chapterNum: 1, verseNum: 5 });
    });

    const selectorAfterMove = latestCommentThreadSelector();
    // A different object, not merely a differently-valued one: current-verse resolves against the
    // live reference, so a verse move must tear down and re-establish the PDP subscription rather
    // than reuse the pre-move selector.
    expect(selectorAfterMove).not.toBe(selectorBeforeMove);
    expect(selectorAfterMove.scriptureRanges?.[0]?.start).toEqual({
      book: 'MRK',
      chapterNum: 1,
      verseNum: 5,
    });
  });

  it('does not resubscribe on a verse move when scoped to all-books', async () => {
    const scrRefControls = makeControllableScrRef({ book: 'MRK', chapterNum: 1, verseNum: 1 });
    renderCommentListWebView(scrRefControls.hook);
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    // The default scope is all-books; confirm the query has no scripture range before moving on,
    // so the "no resubscribe" assertion below isn't vacuously true for some other reason.
    const selectorBeforeMove = latestCommentThreadSelector();
    expect(selectorBeforeMove.scriptureRanges).toBeUndefined();

    act(() => {
      scrRefControls.setScrRef({ book: 'MRK', chapterNum: 1, verseNum: 5 });
    });

    // Same object, not merely an equal one: all-books ignores scrRef entirely, so a verse move
    // must not mint a new-but-equal selector that would needlessly tear down and re-establish the
    // PDP subscription.
    expect(latestCommentThreadSelector()).toBe(selectorBeforeMove);
  });
});

describe('stored comment filter selection', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('restores the stored selection on mount and writes back on change', async () => {
    // The stored selection is the source of truth: a panel reopened on a project comes back to the
    // filters it was left on, rather than to the default view.
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));
    expect(latestPanelProps().scopeFilter).toBe('current-book');

    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    // Both axes, not just the changed one: a write that dropped the scope would silently reset it
    // to the default the next time this project's panel loads.
    await waitFor(() => {
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'resolved',
        scopeFilter: 'current-book',
      });
    });
  });

  it('resolves an unrecognized stored preset to the default instead of throwing', async () => {
    // Simulates a blank value a hand-edited or partially-written entry could hand back; this build
    // has no way to recognize it as a preset.
    seedStoredSelection('project-1', {
      // @ts-expect-error ts(2322) - simulating a stored value this build's CommentPreset union does
      // not recognize, exactly what a corrupted stored entry looks like.
      preset: '',
      scopeFilter: 'all-books',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('resolves a stored preset from a newer build to the default instead of throwing', async () => {
    seedStoredSelection('project-1', {
      // @ts-expect-error ts(2322) - simulating a value written by a build that recognizes a preset
      // this build's CommentPreset union does not.
      preset: 'preset-from-a-newer-build',
      scopeFilter: 'all-books',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('resolves an unrecognized stored scope to the default instead of throwing', async () => {
    seedStoredSelection('project-1', {
      preset: 'all',
      // @ts-expect-error ts(2322) - simulating a value written by a build that recognizes a scope
      // this build's ScopeFilter union does not.
      scopeFilter: 'scope-from-a-newer-build',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER));
  });

  it('opens on the default view rather than throwing when storage is unavailable', async () => {
    // localStorage throws outright in a sandboxed context; the panel must still render on the
    // default view instead of crashing.
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied');
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER);

    // Storage is available again for the rest of this test -- restored explicitly (this file has no
    // blanket afterEach for it) rather than left mocked for every read for the remainder of the
    // test, including the one the positive control below needs to observe its own write.
    getItemSpy.mockRestore();

    // Positive control: a panel-driven change DOES persist once storage is available again, so a
    // test asserting an absence of persistence elsewhere in this file is a real observation.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });
    await waitFor(() => {
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'resolved',
        scopeFilter: DEFAULT_SCOPE_FILTER,
      });
    });
  });

  it('shows a setFilters message override without writing it back to storage', async () => {
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));

    // Positive control: a panel-driven change DOES persist, so the unchanged value asserted below
    // (after the setFilters message) is a real observation, not persistence simply never firing in
    // this test.
    act(() => {
      latestPanelProps().onScopeFilterChange('current-chapter');
    });
    await waitFor(() =>
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'unread',
        scopeFilter: 'current-chapter',
      }),
    );

    act(() => {
      dispatchSetFilters({ filters: { preset: 'conflict' }, scopeFilter: 'current-verse' });
    });

    // The message changes what this open shows...
    await waitFor(() => {
      expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
      expect(latestPanelProps().scopeFilter).toBe('current-verse');
    });
    // ...but never reaches storage: the stored selection still holds only the panel-driven change
    // from above, not the message's override.
    expect(readStoredSelection('project-1')).toEqual({
      preset: 'unread',
      scopeFilter: 'current-chapter',
    });
  });

  it('keeps two projects on independent stored selections', async () => {
    seedStoredSelection('project-a', UNREAD_CURRENT_BOOK_SELECTION);
    seedStoredSelection('project-b', { preset: 'resolved', scopeFilter: 'current-chapter' });

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-a');
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));
    expect(latestPanelProps().scopeFilter).toBe('current-book');
    cleanup();

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-b');
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'resolved' }));
    expect(latestPanelProps().scopeFilter).toBe('current-chapter');
  });

  it("does not leak a write into another project's storage key", async () => {
    // Unlike the "independent stored selections" test above (which reads back through the
    // component, and so could not tell "wrote under the right key" apart from "read the right
    // key"), this asserts directly against localStorage: a write for one project must never land
    // under a different project's key.
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-a');
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    await waitFor(() =>
      expect(readStoredSelection('project-a')).toEqual({
        preset: 'resolved',
        scopeFilter: DEFAULT_SCOPE_FILTER,
      }),
    );
    expect(readStoredSelection('project-b')).toBeUndefined();
  });

  it('applies a mount-time override over the stored selection, without persisting the override', async () => {
    // Deliberately different from the override below, so a passing test can only be explained by
    // the override actually winning, not by coincidence.
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      initialFilters: { preset: 'conflict' },
      initialScopeFilter: 'current-verse',
    });

    // Wins immediately -- no waiting on a stored-selection read, and never shows the stored preset
    // first (an S/R conflict link opening a fresh view must show its requested preset right away).
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
    expect(latestPanelProps().scopeFilter).toBe('current-verse');

    // The override never persisted: storage still holds exactly the pre-mount stored selection.
    expect(readStoredSelection('project-1')).toEqual(UNREAD_CURRENT_BOOK_SELECTION);

    // Positive control: a panel-driven change DOES persist, so the value asserted below is a real
    // observation, not persistence simply never firing in this test.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    // Finding 17: BEFORE this fix, this assertion read `scopeFilter: 'current-verse'` -- the
    // override's scope, carried forward from `currentViewRef` and persisted even though the user
    // never touched scope at all. That was the bug (a programmatic override leaking into the user's
    // standing preference), not a real invariant: the correct persisted scope is the user's actual
    // last choice, 'current-book' (from UNREAD_CURRENT_BOOK_SELECTION above), which
    // `lastUserChosenViewRef` now recovers even while the override is still on screen.
    await waitFor(() => {
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'resolved',
        scopeFilter: 'current-book',
      });
    });
  });

  it("does not let a setFilters message override's scope leak into the next user-driven persist", async () => {
    // Finding 17's literal scenario: the S/R conflict link's setFilters message resets the ENTIRE
    // view (per its documented contract), including an axis the user never touched.
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));

    act(() => {
      dispatchSetFilters({ filters: { preset: 'conflict' }, scopeFilter: 'current-chapter' });
    });
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'conflict' }));
    expect(latestPanelProps().scopeFilter).toBe('current-chapter');

    // The user picks ANY preset from the dropdown afterward -- they never touched scope themselves.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    // The persisted scope must be the user's real last choice ('current-book'), never the
    // programmatic override's scope ('current-chapter') that merely happened to be on screen when
    // they changed the preset.
    await waitFor(() => {
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'resolved',
        scopeFilter: 'current-book',
      });
    });
  });

  it("does not let a setFilters message override's preset leak into the next user-driven persist", async () => {
    // The mirror image, driven through handleScopeFilterChange instead.
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));

    act(() => {
      dispatchSetFilters({ filters: { preset: 'conflict' }, scopeFilter: 'current-chapter' });
    });
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'conflict' }));

    // The user changes ONLY scope from the panel -- they never touched the preset themselves.
    act(() => {
      latestPanelProps().onScopeFilterChange('current-verse');
    });

    // The persisted preset must be the user's real last choice ('unread'), never the override's
    // 'conflict'.
    await waitFor(() => {
      expect(readStoredSelection('project-1')).toEqual({
        preset: 'unread',
        scopeFilter: 'current-verse',
      });
    });
  });
});

describe('comment draft persistence', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
    mocks.commentThreadsFixture.current = [threadA, threadB];
  });

  afterEach(() => {
    cleanup();
  });

  // The guard logic itself (pruning survives a narrowed filter, a still-loading query, or a failed
  // query, while a genuinely empty project still prunes) is unit-tested directly against
  // useCommentDrafts in use-comment-drafts.hook.test.ts. What that suite CANNOT exercise is whether
  // this web view actually wires the hook's `drafts`/`handleDraftChange` through to the panel it
  // renders -- that end-to-end wiring is this test's whole job.
  it('keeps a draft when a filter change unmounts its thread', async () => {
    // The whole point of hoisting draft state to the web view: switching filters must not discard
    // typed work just because the thread it belongs to briefly stops matching the active filter.
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    typeDraftInto(threadA.id, 'half a thought');
    selectPreset('Resolved'); // threadA (Todo) no longer matches; its input unmounts
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'resolved' }));
    selectPreset('All comments'); // and threadA comes back
    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));

    expect(await draftTextIn(threadA.id)).toBe('half a thought');
  });
});

describe('unsaved preset filtering', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
    mocks.commentThreadsFixture.current = [threadA, threadB];
  });

  afterEach(() => {
    cleanup();
  });

  it('shows only drafted threads under the unsaved preset', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    typeDraftInto(threadA.id, 'half a thought'); // threadA gets a draft; threadB stays undrafted
    selectPreset('Unsaved comments');

    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unsaved' }));
    expect(latestPanelProps().threads.map((thread) => thread.id)).toEqual([threadA.id]);
  });

  it('counts an unsaved edit to an existing comment, not just an unsent reply', async () => {
    // Both an unsent reply (`editorState`) and an in-progress edit to an existing comment
    // (`commentEdits`) are "written but not committed" under this preset's definition. Seeded
    // directly via the draft store, not through the mocked panel's compose-box stand-in (which only
    // round-trips `editorState`), since the edit path runs through a different component and lands
    // in `commentEdits` — testing only the compose box would leave that path free to regress
    // unnoticed.
    saveDrafts('project-1', {
      [threadB.id]: {
        commentEdits: { [`${threadB.id}-comment`]: makeEditorState('edited comment') },
      },
    });

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    selectPreset('Unsaved comments');

    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unsaved' }));
    expect(latestPanelProps().threads.map((thread) => thread.id)).toEqual([threadB.id]);
  });

  it('keeps a drafted thread mounted under the unsaved preset after its draft is emptied', async () => {
    // Regression coverage: filtering by the LIVE drafts map (`thread.id in drafts`) drops a
    // thread from the list the instant its draft is cleared -- e.g. select-all + delete while
    // typing, or a successful submit that clears the editor -- unmounting the CommentThread (and
    // the Lexical editor holding the caret) out from under the user. The thread must stay visible
    // for the rest of this preset session so the user can keep typing.
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    typeDraftInto(threadA.id, 'half a thought');
    selectPreset('Unsaved comments');
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unsaved' }));
    expect(latestPanelProps().threads.map((thread) => thread.id)).toEqual([threadA.id]);

    // Clear the draft entirely -- the thread's `drafts` entry is removed, exactly like select-all
    // + delete or a submit that clears the compose box.
    typeDraftInto(threadA.id, '');

    // The thread (and its input -- the stand-in for the mounted CommentThread/editor) must still
    // be there: the user must be able to keep typing without the preset kicking them out.
    expect(latestPanelProps().threads.map((thread) => thread.id)).toEqual([threadA.id]);
    expect(screen.getByLabelText(`draft-${threadA.id}`)).toBeInTheDocument();

    // And typing into it must still work -- proof the editor genuinely never unmounted, not just
    // that the thread id is still counted somewhere.
    typeDraftInto(threadA.id, 'typing again after clearing');
    expect(await draftTextIn(threadA.id)).toBe('typing again after clearing');
  });

  it('still excludes a drafted thread the scope excludes', async () => {
    // Deliberately unlike Paratext 9, where a drafted thread survives every filter: PT10 filters in
    // the query, so a thread the scope excludes never arrives in the query result, and the
    // client-side unsaved filter -- which only ever narrows what the query already returned -- has
    // no way to add it back. Pinned here so this divergence is not "fixed" back to PT9's behavior by
    // someone who knows PT9 but not this design decision.
    //
    // The query mock here only simulates `isResolved` (see `commentThreadsFixture`'s doc), not scope,
    // so a real scope exclusion is stood in for by leaving threadB out of the query result entirely
    // while still giving it a draft -- exactly what a scope-excluded, drafted thread looks like from
    // this web view's perspective. The scope is mounted as `current-book` (not the default
    // `all-books`) so this is genuinely a narrowed-scope scenario -- at the default scope the query
    // result IS the complete thread list, and useCommentDrafts' pruning would (correctly, for that
    // case) delete threadB's "stale" draft before this test ever gets to exercise the unsaved filter.
    //
    // threadC is in scope (it's part of the query result) but never drafted. Without it, this
    // assertion would also pass against a no-op unsaved filter, since the mocked query already
    // excludes threadB regardless of drafts -- threadC is what makes the assertion fail for the
    // reason this test claims to check (the unsaved filter narrowing an in-scope result), not just
    // because the query happens to already be narrow.
    mocks.commentThreadsFixture.current = [threadA, threadC]; // threadB excluded, as if by scope
    saveDrafts('project-1', {
      [threadA.id]: { editorState: makeEditorState('half a thought') },
      [threadB.id]: { editorState: makeEditorState('also unsaved, but out of scope') },
    });

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      initialScopeFilter: 'current-book',
    });
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    selectPreset('Unsaved comments');

    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unsaved' }));
    expect(latestPanelProps().threads.map((thread) => thread.id)).toEqual([threadA.id]);
  });
});

describe('legacy per-web-view scopeFilter migration', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('migrates the pre-localStorage scopeFilter web-view state when this project has nothing stored yet', async () => {
    // Simulates a user upgrading mid-session: the merge base persisted scope under this exact
    // per-web-view-state key, and this project's new localStorage-backed store has never seen it.
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      scopeFilter: 'current-chapter',
    });

    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().scopeFilter).toBe('current-chapter');
    expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
  });

  it('does not let the legacy scopeFilter web-view state override a real stored selection', async () => {
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      scopeFilter: 'current-verse',
    });

    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    // The real stored selection wins -- 'current-book', not the legacy key's 'current-verse'.
    expect(latestPanelProps().scopeFilter).toBe('current-book');
    expect(latestPanelProps().filters).toEqual({ preset: 'unread' });
  });

  it('falls back to the default scope when neither a stored selection nor a legacy value exists', async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER);
  });
});

describe('initial selection when projectId resolves after mount', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
  });

  afterEach(() => {
    cleanup();
  });

  it('re-reads the stored selection once projectId resolves on the same mounted instance', async () => {
    // A panel can render before its project is known (see useCommentDrafts' projectId doc). Without
    // the projectId-resolves correction, the selection latched on that first, necessarily-default
    // render would stick forever even once the project -- and its real stored selection -- becomes
    // known on this SAME mounted instance.
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    const CommentListWebView = globalThis.webViewComponent;
    // MUST be stable across renders (see UseWebViewStateHook's own doc), matching the real contract.
    const useWebViewState = makeUseWebViewState({ editorWebViewId: 'editor-1' });

    const { rerender } = render(
      <CommentListWebView
        webViewType="legacyCommentManager.commentList"
        id="comment-list-1"
        projectId={undefined}
        useWebViewState={useWebViewState}
        useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
        updateWebViewDefinition={vi.fn()}
      />,
    );

    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER);

    rerender(
      <CommentListWebView
        webViewType="legacyCommentManager.commentList"
        id="comment-list-1"
        projectId="project-1"
        useWebViewState={useWebViewState}
        useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
        updateWebViewDefinition={vi.fn()}
      />,
    );

    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));
    expect(latestPanelProps().scopeFilter).toBe('current-book');
  });

  it('does not clobber a change that reached the panel before projectId resolved', async () => {
    seedStoredSelection('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    const CommentListWebView = globalThis.webViewComponent;
    const useWebViewState = makeUseWebViewState({ editorWebViewId: 'editor-1' });

    const { rerender } = render(
      <CommentListWebView
        webViewType="legacyCommentManager.commentList"
        id="comment-list-1"
        projectId={undefined}
        useWebViewState={useWebViewState}
        useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
        updateWebViewDefinition={vi.fn()}
      />,
    );
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    // A setFilters message reaches this view before projectId is known.
    act(() => {
      dispatchSetFilters({ filters: { preset: 'resolved' }, scopeFilter: 'current-verse' });
    });
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'resolved' }));

    rerender(
      <CommentListWebView
        webViewType="legacyCommentManager.commentList"
        id="comment-list-1"
        projectId="project-1"
        useWebViewState={useWebViewState}
        useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
        updateWebViewDefinition={vi.fn()}
      />,
    );

    // The late correction must never override a real change that already reached the panel: the
    // view still shows the message's filters, not the project's stored selection.
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'resolved' });
    expect(latestPanelProps().scopeFilter).toBe('current-verse');
  });
});

describe('current-user registration-data fetch failure recovery', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
    mocks.commentThreadSelectorLog.length = 0;
    vi.mocked(papi.commands.sendCommand).mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('recovers from a failed fetch into an explanatory state instead of loading forever', async () => {
    vi.mocked(papi.commands.sendCommand).mockRejectedValue(new Error('network down'));

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'unresolved-assigned-to-me' });
    });

    // Before the fix: isAwaitingCurrentUserName (and so isLoading) stayed true forever once the
    // fetch failed, with no way for the panel to recover except picking a different preset.
    await waitFor(() => {
      expect(latestPanelProps().currentUserNameUnavailable).toBe(true);
      expect(latestPanelProps().isLoading).toBe(false);
    });
  });

  it('does not treat a preset that does not need the current user as unavailable', async () => {
    vi.mocked(papi.commands.sendCommand).mockRejectedValue(new Error('network down'));

    renderCommentListWebView();

    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    // The default preset ('all') never needed the current user in the first place.
    await waitFor(() => expect(latestPanelProps().currentUserNameUnavailable).toBe(false));
  });

  it('recovers once a retry succeeds', async () => {
    vi.mocked(papi.commands.sendCommand).mockRejectedValueOnce(new Error('network down'));
    vi.mocked(papi.commands.sendCommand).mockResolvedValueOnce({ name: 'Tester' });

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'unresolved-assigned-to-me' });
    });
    await waitFor(() => expect(latestPanelProps().currentUserNameUnavailable).toBe(true));

    await act(async () => {
      await latestPanelProps().onRetryFetchCurrentUserName?.();
    });

    await waitFor(() => {
      expect(latestPanelProps().currentUserNameUnavailable).toBe(false);
      expect(latestPanelProps().isLoading).toBe(false);
    });
  });
});
