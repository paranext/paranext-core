// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useCallback, useEffect, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { CommentFilterSelection, LegacyCommentThreadSelector } from 'legacy-comment-manager';
import {
  newPlatformError,
  type LegacyCommentThread,
  type PlatformError,
} from 'platform-bible-utils';
import {
  CommentFilters,
  CommentPreset,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  ScopeFilter,
} from './comment-list-filters.model';
import { saveDrafts } from './comment-draft-store';

/**
 * What the mocked `UserCommentFilters` read can resolve to: a real selection, or a `PlatformError`
 * — exercising the web view's `isPlatformError` fallback branch, which a mock that only ever stores
 * real selections could never drive.
 */
type StoredSelectionOrError = CommentFilterSelection | PlatformError;

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
  }[] = [];
  /**
   * A settable stand-in for the comments PDP's server-side filtering: `useProjectData(...)
   * .CommentThreads` (mocked below) filters `current` by the handful of selector fields these tests
   * actually drive (`isResolved`), rather than always returning an empty list, so a test can
   * exercise a filter change actually changing which threads render. `isLoading` lets a test hold
   * the query in its loading state independently of the fixture's contents. `error`, when set, wins
   * over both -- the mock returns it in place of a thread list, exercising the same
   * arrives-through-the-data-channel error path the real PDP subscription uses (loading also reads
   * `false` in that case, matching the real hook: an error clears the loading flag same as data
   * would).
   */
  const commentThreadsFixture: {
    current: LegacyCommentThread[];
    isLoading: boolean;
    error: PlatformError | undefined;
  } = {
    current: [],
    isLoading: false,
    error: undefined,
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
  /**
   * This user's stored comment-filter selection per project id, as the C# provider would return it.
   * A test seeds an entry before rendering to control what a project mounts already showing; a
   * project id with no entry never resolves, so the web view's `UserCommentFilters` hook reports
   * `isLoading: true` forever — matching what mounting against a project the provider hasn't
   * answered for yet looks like.
   */
  const storedUserCommentFilters = new Map<string, StoredSelectionOrError>();
  /** Every value the web view wrote back to `UserCommentFilters`, per project id, in write order. */
  const userCommentFiltersWriteLog = new Map<string, CommentFilterSelection[]>();
  /**
   * Per-project-id subscribers registered by the mocked `UserCommentFilters` hook below. Lets
   * `resolveUserCommentFilters` deliver a value to an already-mounted component after the fact,
   * exercising the genuinely-pending-then-resolves path a synchronous Map read cannot.
   */
  const userCommentFiltersSubscribers = new Map<
    string,
    Set<(value: StoredSelectionOrError) => void>
  >();
  return {
    panelPropsLog,
    bcvSyncScroll,
    commentThreadSelectorLog,
    commentThreadsFixture,
    storedUserCommentFilters,
    userCommentFiltersWriteLog,
    userCommentFiltersSubscribers,
  };
});

/**
 * Mocked `UserCommentFilters` project-data hook: mirrors the real hook's `[data, setData,
 * isLoading]` shape. A real `useState`/`useEffect` pair (not a plain synchronous read against the
 * `storedUserCommentFilters` Map) so a test can resolve a pending read after mount, via
 * `resolveUserCommentFilters`, and have this already-mounted instance observe it — the async-
 * arrival path a mock that only ever reads a pre-populated Map synchronously cannot exercise. Named
 * with the `use` prefix so eslint-plugin-react-hooks recognizes the hook calls inside it.
 */
function useMockedUserCommentFilters(
  projectId: string,
  defaultValue: CommentFilterSelection,
): [StoredSelectionOrError, (value: CommentFilterSelection) => Promise<boolean>, boolean] {
  const [selection, setSelection] = useState<StoredSelectionOrError | undefined>(() =>
    mocks.storedUserCommentFilters.get(projectId),
  );
  useEffect(() => {
    const subscribers =
      mocks.userCommentFiltersSubscribers.get(projectId) ??
      new Set<(value: StoredSelectionOrError) => void>();
    subscribers.add(setSelection);
    mocks.userCommentFiltersSubscribers.set(projectId, subscribers);
    return () => {
      subscribers.delete(setSelection);
    };
    // A mounted instance's project id is fixed for its lifetime in these tests.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setUserCommentFilters = (value: CommentFilterSelection) => {
    const writes = mocks.userCommentFiltersWriteLog.get(projectId) ?? [];
    writes.push(value);
    mocks.userCommentFiltersWriteLog.set(projectId, writes);
    return Promise.resolve(true);
  };
  if (!selection) return [defaultValue, setUserCommentFilters, true];
  return [selection, setUserCommentFilters, false];
}

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
  useProjectData: vi.fn((_projectInterface: string, contextProjectId: string) => ({
    CommentThreads: (selector: LegacyCommentThreadSelector) => {
      mocks.commentThreadSelectorLog.push(selector);
      if (mocks.commentThreadsFixture.error) {
        return [mocks.commentThreadsFixture.error, vi.fn(), false];
      }
      // A minimal stand-in for the comments PDP's server-side filtering: only `isResolved` is
      // simulated, since that is the only axis the draft-persistence tests below drive.
      const filtered = mocks.commentThreadsFixture.current.filter((thread) => {
        if (selector.isResolved === undefined) return true;
        return (thread.status === 'Resolved') === selector.isResolved;
      });
      return [filtered, vi.fn(), mocks.commentThreadsFixture.isLoading];
    },
    UserCommentFilters: (_selector: undefined, defaultValue: CommentFilterSelection) =>
      useMockedUserCommentFilters(contextProjectId, defaultValue),
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
  }: {
    isLoading: boolean;
    threads: { id: string }[];
    filters: CommentFilters;
    scopeFilter: ScopeFilter;
    onFiltersChange: (filters: CommentFilters) => void;
    onScopeFilterChange: (scopeFilter: ScopeFilter) => void;
    drafts?: Readonly<Record<string, { editorState?: string }>>;
    onDraftChange?: (threadId: string, draft: { editorState?: string } | undefined) => void;
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

/**
 * Delivers `selection` to every mounted `UserCommentFilters` read pending for `projectId` — the
 * counterpart to leaving a project id unseeded in `storedUserCommentFilters` (which makes the mock
 * report `isLoading: true` and never resolve on its own). Also seeds the Map so a later remount of
 * the same project id starts already resolved, matching the real provider's behavior once the
 * setting exists.
 */
function resolveUserCommentFilters(projectId: string, selection: CommentFilterSelection) {
  mocks.storedUserCommentFilters.set(projectId, selection);
  const subscribers = mocks.userCommentFiltersSubscribers.get(projectId);
  subscribers?.forEach((notify) => notify(selection));
}

function dispatchSetFilters(message: {
  filters?: Partial<CommentFilters>;
  scopeFilter?: ScopeFilter;
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

/** Maps a preset's user-facing toolbar label to its underlying value — the two this file drives. */
const PRESET_LABEL_TO_VALUE: Partial<Record<string, CommentPreset>> = {
  'All comments': 'all',
  Resolved: 'resolved',
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

/** This user's stored selection for 'project-1' before any test narrows it. */
const DEFAULT_STORED_USER_COMMENT_FILTERS: CommentFilterSelection = {
  dataVersion: '1.0.0',
  preset: DEFAULT_COMMENT_FILTERS.preset,
  scopeFilter: DEFAULT_SCOPE_FILTER,
};

/**
 * A stored selection that differs from the default view, reused wherever a test needs "the stored
 * selection" to be something visibly distinct from `DEFAULT_STORED_USER_COMMENT_FILTERS` — so
 * restoring it, or overriding it, is a real observation rather than a coincidence.
 */
const UNREAD_CURRENT_BOOK_SELECTION: CommentFilterSelection = {
  dataVersion: '1.0.0',
  preset: 'unread',
  scopeFilter: 'current-book',
};

// Applies to every test in this file: seeds 'project-1' with a resolved stored selection so the
// existing setFilters/scrRef tests below — unconcerned with restoring a stored selection — mount
// past the loading state exactly as before this behavior existed, instead of hanging on an
// unseeded, forever-loading UserCommentFilters mock.
beforeEach(() => {
  mocks.storedUserCommentFilters.clear();
  mocks.storedUserCommentFilters.set('project-1', DEFAULT_STORED_USER_COMMENT_FILTERS);
  mocks.userCommentFiltersWriteLog.clear();
  // Each mounted instance's effect cleanup removes its own subscriber on unmount; clearing here too
  // is just hygiene against a test that renders without unmounting through the usual `cleanup()`.
  mocks.userCommentFiltersSubscribers.clear();
  mocks.commentThreadsFixture.current = [];
  mocks.commentThreadsFixture.isLoading = false;
  mocks.commentThreadsFixture.error = undefined;
  // Drafts persist to real localStorage (comment-draft-store.ts); jsdom's storage is shared across
  // every test in this file, so a draft written by one test must not leak into the next.
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
    mocks.storedUserCommentFilters.set('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));
    expect(latestPanelProps().scopeFilter).toBe('current-book');

    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    // Both axes, not just the changed one: a write that dropped the scope would silently reset it
    // to the default the next time this project's panel loads.
    await waitFor(() => {
      const writes = mocks.userCommentFiltersWriteLog.get('project-1');
      expect(writes?.at(-1)).toEqual({
        dataVersion: '1.0.0',
        preset: 'resolved',
        scopeFilter: 'current-book',
      });
    });
  });

  it('resolves an unrecognized stored preset to the default instead of throwing', async () => {
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      // @ts-expect-error ts(2322) - C# does not validate this field; simulating a blank value the
      // XML round trip can hand back (FromXml's own doc pins this as a real, un-rejected case).
      preset: '',
      scopeFilter: 'all-books',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('resolves a stored preset from a newer build to the default instead of throwing', async () => {
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      // @ts-expect-error ts(2322) - C# does not validate this field; simulating a value written by
      // a build that recognizes a preset this build's CommentPreset union does not.
      preset: 'preset-from-a-newer-build',
      scopeFilter: 'all-books',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS));
  });

  it('resolves an unrecognized stored scope to the default instead of throwing', async () => {
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      preset: 'all',
      // @ts-expect-error ts(2322) - C# does not validate this field; simulating a value written by
      // a build that recognizes a scope this build's ScopeFilter union does not.
      scopeFilter: 'scope-from-a-newer-build',
    });

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER));
  });

  it('resolves a PlatformError from the stored-selection read to the default view', async () => {
    // The web view's isPlatformError branch falls back to the default view rather than
    // propagating the error into filters/scopeFilter -- a user experiences this as "my filters
    // silently reset" rather than a visible failure, so it's pinned rather than left assumed.
    mocks.storedUserCommentFilters.set(
      'project-1',
      newPlatformError('Simulated getUserCommentFilters failure'),
    );

    expect(() => renderCommentListWebView()).not.toThrow();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
    expect(latestPanelProps().scopeFilter).toBe(DEFAULT_SCOPE_FILTER);

    // Distinguishes the isPlatformError branch's own fallback object from a same-looking default
    // that narrowStoredSelection's preset/scope guards would also produce from the raw,
    // unguarded PlatformError (whose .preset/.scopeFilter are simply undefined): a panel change
    // now echoes back the fallback's own dataVersion (''), which a raw PlatformError -- it has no
    // dataVersion field at all -- could not have produced.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });
    await waitFor(() => {
      const writes = mocks.userCommentFiltersWriteLog.get('project-1');
      expect(writes?.[0]).toEqual({
        dataVersion: '',
        preset: 'resolved',
        scopeFilter: 'all-books',
      });
    });
  });

  it('shows a setFilters message override without writing it back to storage', async () => {
    mocks.storedUserCommentFilters.set('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));

    // Positive control: a panel-driven change DOES reach the write log, so the absence asserted
    // below (after the setFilters message) is a real observation, not the log simply never being
    // written to in this test.
    act(() => {
      latestPanelProps().onScopeFilterChange('current-chapter');
    });
    await waitFor(() => expect(mocks.userCommentFiltersWriteLog.get('project-1')).toHaveLength(1));

    act(() => {
      dispatchSetFilters({ filters: { preset: 'conflict' }, scopeFilter: 'current-verse' });
    });

    // The message changes what this open shows...
    await waitFor(() => {
      expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
      expect(latestPanelProps().scopeFilter).toBe('current-verse');
    });
    // ...but never reaches the stored selection: the write log still holds only the panel-driven
    // change from above, not a second entry for the message.
    expect(mocks.userCommentFiltersWriteLog.get('project-1')).toHaveLength(1);
  });

  it('keeps two projects on independent stored selections', async () => {
    mocks.storedUserCommentFilters.set('project-a', UNREAD_CURRENT_BOOK_SELECTION);
    mocks.storedUserCommentFilters.set('project-b', {
      dataVersion: '1.0.0',
      preset: 'resolved',
      scopeFilter: 'current-chapter',
    });

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-a');
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'unread' }));
    expect(latestPanelProps().scopeFilter).toBe('current-book');
    cleanup();

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-b');
    await waitFor(() => expect(latestPanelProps().filters).toEqual({ preset: 'resolved' }));
    expect(latestPanelProps().scopeFilter).toBe('current-chapter');
  });

  it('never shows the default filters before the stored selection resolves', async () => {
    // Left unseeded: this project's UserCommentFilters read stays pending until
    // resolveUserCommentFilters delivers it below, exercising the genuine async-arrival path a
    // pre-populated Map read can't (the read never resolves synchronously against the mount).
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-pending');

    // The component IS rendering (it queries CommentThreads unconditionally) -- confirming that
    // is what makes the next assertion mean something, rather than nothing having rendered yet.
    await waitFor(() => expect(mocks.commentThreadSelectorLog.length).toBeGreaterThan(0));
    // The panel itself must not be mounted yet: mounting it now, even flagged isLoading, would
    // still hand its toolbar dropdowns the pre-hydration default values to display.
    expect(latestPanelProps()).toBeUndefined();

    act(() => {
      resolveUserCommentFilters('project-pending', UNREAD_CURRENT_BOOK_SELECTION);
    });

    // Once resolved, the panel mounts directly with the stored values -- it never showed
    // DEFAULT_COMMENT_FILTERS/DEFAULT_SCOPE_FILTER at any point along the way.
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'unread' });
    expect(latestPanelProps().scopeFilter).toBe('current-book');
  });

  it('keeps a setFilters message applied when the stored selection was still pending on arrival', async () => {
    // Left unseeded: the message below genuinely races an in-flight stored-selection read, rather
    // than one that already resolved before the message arrived (comment-list-web-view-message.util
    // docs this as reachable -- buffered web view messages replay on load, so a reuse hit's message
    // can land before its stored-selection read resolves).
    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-race');

    // Confirms the component is rendering (so the panel not yet appearing, below, means something)
    // before the message arrives.
    await waitFor(() => expect(mocks.commentThreadSelectorLog.length).toBeGreaterThan(0));
    expect(latestPanelProps()).toBeUndefined();

    act(() => {
      dispatchSetFilters({ filters: { preset: 'conflict' }, scopeFilter: 'current-verse' });
    });

    // The message alone is enough to show a fully-determined view -- no need to wait on the
    // still-pending stored read.
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
    expect(latestPanelProps().scopeFilter).toBe('current-verse');

    // The stored selection resolves now, with values that would win if the message hadn't marked
    // the view hydrated -- this is the actual race the fix targets.
    act(() => {
      resolveUserCommentFilters('project-race', UNREAD_CURRENT_BOOK_SELECTION);
    });

    // Still the message's values: the late-arriving stored read did not overwrite them.
    expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
    expect(latestPanelProps().scopeFilter).toBe('current-verse');

    // Positive control: a panel-driven change DOES reach the write log, so the absence asserted
    // below is a real observation, not the log simply never being written to in this test.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });
    await waitFor(() =>
      expect(mocks.userCommentFiltersWriteLog.get('project-race')).toHaveLength(1),
    );

    // The one write is the panel change above, carrying the message's current-verse scope forward
    // (not the stored current-book) -- neither the message nor the stored read resolving added an
    // entry of their own.
    expect(mocks.userCommentFiltersWriteLog.get('project-race')?.[0]).toEqual({
      dataVersion: '1.0.0',
      preset: 'resolved',
      scopeFilter: 'current-verse',
    });
  });

  it('applies a mount-time override over the stored selection, without persisting the override', async () => {
    // Deliberately different from the override below, so a passing test can only be explained by
    // the override actually winning, not by coincidence.
    mocks.storedUserCommentFilters.set('project-1', UNREAD_CURRENT_BOOK_SELECTION);

    renderCommentListWebView(useWebViewScrollGroupScrRefFake, 'project-1', {
      initialFilters: { preset: 'conflict' },
      initialScopeFilter: 'current-verse',
    });

    // Wins immediately -- no waiting on the stored read, and never shows the stored preset first
    // (an S/R conflict link opening a fresh view must show its requested preset right away).
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'conflict' });
    expect(latestPanelProps().scopeFilter).toBe('current-verse');

    // Positive control: a panel-driven change DOES reach the write log, so the length assertion
    // below is a real observation, not the log simply never being written to in this test.
    act(() => {
      latestPanelProps().onFiltersChange({ preset: 'resolved' });
    });

    // Exactly the one write from the panel change above: the override that seeded this mount never
    // added an entry of its own, and the write's scope carries the override's current-verse (the
    // value it was seeded with), not the stored current-book -- another sign the override, not the
    // stored selection, was live when the change was made.
    await waitFor(() => {
      const writes = mocks.userCommentFiltersWriteLog.get('project-1');
      expect(writes).toHaveLength(1);
      expect(writes?.[0]).toEqual({
        dataVersion: '1.0.0',
        preset: 'resolved',
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

  it('does not prune drafts while the comment-thread query is still loading', async () => {
    // The single most destructive thing pruning could do: mistake "the query hasn't returned yet"
    // for "this project has no threads" and wipe out every draft on mount. Seed a draft for a
    // thread that is real but not yet reflected in the (empty, still-loading) query result.
    saveDrafts('project-1', { [threadA.id]: { editorState: 'saved draft' } });
    mocks.commentThreadsFixture.current = [];
    mocks.commentThreadsFixture.isLoading = true;

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    expect(latestPanelProps().drafts).toEqual({ [threadA.id]: { editorState: 'saved draft' } });
  });

  it('keeps a draft when the thread-query subscription delivers an error', async () => {
    // The same destructive shape as the loading case above, arriving a different way: an error
    // travels through the SAME channel as data (CommentThreads' first tuple element), and clears
    // the loading flag exactly like real data would -- so "the query failed" and "this project has
    // no threads" both flatten to an empty, not-loading list unless the guard checks the raw query
    // result (a PlatformError) rather than the already-normalized thread array.
    saveDrafts('project-1', { [threadA.id]: { editorState: 'saved draft' } });
    mocks.commentThreadsFixture.error = newPlatformError('Simulated CommentThreads failure');

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    expect(latestPanelProps().drafts).toEqual({ [threadA.id]: { editorState: 'saved draft' } });
  });

  it('prunes drafts when the project genuinely has no threads', async () => {
    // The companion to the error test above: a healthy query that resolves to an empty list is NOT
    // an error, and must still prune -- otherwise "don't prune on error" could be satisfied by the
    // over-broad "never prune an empty list," which would silently resurrect every deleted thread's
    // draft forever.
    saveDrafts('project-1', { [threadA.id]: { editorState: 'stale draft' } });
    mocks.commentThreadsFixture.current = [];

    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    await waitFor(() => expect(latestPanelProps().drafts).toEqual({}));
  });
});
