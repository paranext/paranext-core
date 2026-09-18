// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { useCallback, useEffect, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { CommentFilterSelection, LegacyCommentThreadSelector } from 'legacy-comment-manager';
import {
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  DEFAULT_SCOPE_FILTER,
  ScopeFilter,
} from './comment-list-filters.model';

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  /** Every set of props the stubbed CommentListPanel has been rendered with, in order */
  const panelPropsLog: {
    isLoading: boolean;
    filters: CommentFilters;
    scopeFilter: ScopeFilter;
    // The panel's own change handlers, so a test can make the filter change the user makes
    onFiltersChange: (filters: CommentFilters) => void;
    onScopeFilterChange: (scopeFilter: ScopeFilter) => void;
  }[] = [];
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
  const storedUserCommentFilters = new Map<string, CommentFilterSelection>();
  /** Every value the web view wrote back to `UserCommentFilters`, per project id, in write order. */
  const userCommentFiltersWriteLog = new Map<string, CommentFilterSelection[]>();
  /**
   * Per-project-id subscribers registered by the mocked `UserCommentFilters` hook below. Lets
   * `resolveUserCommentFilters` deliver a value to an already-mounted component after the fact,
   * exercising the genuinely-pending-then-resolves path a synchronous Map read cannot.
   */
  const userCommentFiltersSubscribers = new Map<
    string,
    Set<(value: CommentFilterSelection) => void>
  >();
  return {
    panelPropsLog,
    bcvSyncScroll,
    commentThreadSelectorLog,
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
): [CommentFilterSelection, (value: CommentFilterSelection) => Promise<boolean>, boolean] {
  const [selection, setSelection] = useState<CommentFilterSelection | undefined>(() =>
    mocks.storedUserCommentFilters.get(projectId),
  );
  useEffect(() => {
    const subscribers =
      mocks.userCommentFiltersSubscribers.get(projectId) ??
      new Set<(value: CommentFilterSelection) => void>();
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
      return [[], vi.fn(), false];
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
  CommentListPanel: (props: {
    isLoading: boolean;
    filters: CommentFilters;
    scopeFilter: ScopeFilter;
    onFiltersChange: (filters: CommentFilters) => void;
    onScopeFilterChange: (scopeFilter: ScopeFilter) => void;
  }) => {
    mocks.panelPropsLog.push(props);
    return undefined;
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

/** This user's stored selection for 'project-1' before any test narrows it. */
const DEFAULT_STORED_USER_COMMENT_FILTERS: CommentFilterSelection = {
  dataVersion: '1.0.0',
  preset: DEFAULT_COMMENT_FILTERS.preset,
  scopeFilter: DEFAULT_SCOPE_FILTER,
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
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      preset: 'unread',
      scopeFilter: 'current-book',
    });

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

  it('shows a setFilters message override without writing it back to storage', async () => {
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      preset: 'unread',
      scopeFilter: 'current-book',
    });

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
    mocks.storedUserCommentFilters.set('project-a', {
      dataVersion: '1.0.0',
      preset: 'unread',
      scopeFilter: 'current-book',
    });
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
      resolveUserCommentFilters('project-pending', {
        dataVersion: '1.0.0',
        preset: 'unread',
        scopeFilter: 'current-book',
      });
    });

    // Once resolved, the panel mounts directly with the stored values -- it never showed
    // DEFAULT_COMMENT_FILTERS/DEFAULT_SCOPE_FILTER at any point along the way.
    await waitFor(() => expect(latestPanelProps()).toBeDefined());
    expect(latestPanelProps().filters).toEqual({ preset: 'unread' });
    expect(latestPanelProps().scopeFilter).toBe('current-book');
  });

  it('applies a mount-time override over the stored selection, without persisting the override', async () => {
    // Deliberately different from the override below, so a passing test can only be explained by
    // the override actually winning, not by coincidence.
    mocks.storedUserCommentFilters.set('project-1', {
      dataVersion: '1.0.0',
      preset: 'unread',
      scopeFilter: 'current-book',
    });

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
