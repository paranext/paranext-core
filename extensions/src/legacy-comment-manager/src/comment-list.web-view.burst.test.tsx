// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { useCallback, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import { useViewVisibility } from 'platform-bible-react';
import {
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  ScopeFilter,
  UNFILTERED,
} from './comment-list-filters.model';
import type { CommentListScrollTarget } from './comment-list-scroll.utils';

/** One call the web view made to the (mocked) `useBcvSyncScroll` hook. */
type BcvSyncScrollCall = {
  scrollToTarget: (target: NonNullable<CommentListScrollTarget>, behavior: ScrollBehavior) => void;
};

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  /** Every set of props the stubbed CommentListPanel has been rendered with, in order */
  const panelPropsLog: {
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
  // Every call the web view made to useBcvSyncScroll, most recent last — lets a test reach the web
  // view's real `scrollToTarget` callback directly (see the mock below) instead of driving the real
  // hook's sync-scroll conditions just to exercise the DOM work that callback owns.
  const bcvSyncScrollCalls: BcvSyncScrollCall[] = [];
  return { panelPropsLog, bcvSyncScroll, bcvSyncScrollCalls };
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
  useProjectData: vi.fn(() => ({ CommentThreads: vi.fn(() => [[], vi.fn(), false]) })),
  useProjectDataProvider: vi.fn(() => ({})),
  useWebViewController: vi.fn(() => undefined),
}));

// Only what the web view module reads at load or render time; the pieces these tests exercise
// (message handling, filter state) live in the web view itself and its local utils, which are real.
// useRunWhenVisible is the one exception: it's real React-hook logic with no dependency of its own
// on the rest of the platform-bible-react bundle, so it's reproduced here (via a dynamic `react`
// import — a `vi.mock` factory is hoisted above this file's own top-level imports, so a static one
// would hit a temporal-dead-zone reference) rather than pulling in the whole library just for it.
vi.mock('platform-bible-react', async () => {
  const {
    useCallback: useCallbackReact,
    useEffect: useEffectReact,
    useRef: useRefReact,
    useState: useStateReact,
  } = await import('react');

  function useRunWhenVisible(isViewVisible: boolean, run: () => void): () => void {
    const [isRunPending, setIsRunPending] = useStateReact(false);
    const runRef = useRefReact(run);
    runRef.current = run;
    const isViewVisibleRef = useRefReact(isViewVisible);
    isViewVisibleRef.current = isViewVisible;

    const requestRun = useCallbackReact(() => {
      if (isViewVisibleRef.current) runRef.current();
      else setIsRunPending(true);
    }, []);

    useEffectReact(() => {
      if (!isViewVisible || !isRunPending) return;
      setIsRunPending(false);
      runRef.current();
    }, [isViewVisible, isRunPending]);

    return requestRun;
  }

  return {
    COMMENT_LIST_ELEMENT_ID: 'comment-list',
    COMMENT_LIST_STRING_KEYS: [],
    CONFLICT_NOTE_STRING_KEYS: [],
    getCommentThreadElementId: (threadId: string) => `comment-thread-${threadId}`,
    Sonner: () => undefined,
    sonner: { error: vi.fn(), warning: vi.fn(), info: vi.fn() },
    usePromise: vi.fn((_factory: unknown, defaultValue: unknown) => [defaultValue, false]),
    useRunWhenVisible,
    useTabIconSelection: vi.fn(() => undefined),
    useViewVisibility: vi.fn(() => true),
  };
});

vi.mock('./use-bcv-sync-scroll.hook', () => ({
  useBcvSyncScroll: (call: BcvSyncScrollCall) => {
    mocks.bcvSyncScrollCalls.push(call);
    return mocks.bcvSyncScroll;
  },
}));

// The panel is presentation; recording the props it is handed is how these tests observe which
// filters the web view actually has applied
vi.mock('./comment-list.component', () => ({
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS: [],
  // The real value (comment-list.component.tsx): the web view looks this id up by exact string, so
  // the sticky-header test below needs it to match.
  COMMENT_LIST_STICKY_HEADER_ELEMENT_ID: 'comment-list-sticky-header',
  CommentListPanel: (props: {
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
 * map, seeded so the view mounts with an editor wired (which lets the scope axis pass through to
 * the panel un-coerced).
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

function renderCommentListWebView() {
  const CommentListWebView = globalThis.webViewComponent;
  // Returned so a test that needs to force a re-render (e.g. to pick up a changed
  // useViewVisibility mock return value) can call `rerender` with the same element.
  return render(
    <CommentListWebView
      webViewType="legacyCommentManager.commentList"
      id="comment-list-1"
      projectId="project-1"
      useWebViewState={makeUseWebViewState({ editorWebViewId: 'editor-1' })}
      useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
      updateWebViewDefinition={vi.fn()}
    />,
  );
}

function dispatchSetFilters(message: {
  filters?: Partial<CommentFilters>;
  scopeFilter?: ScopeFilter;
}) {
  window.dispatchEvent(new MessageEvent('message', { data: { method: 'setFilters', ...message } }));
}

function dispatchSelectThread(threadId: string) {
  window.dispatchEvent(new MessageEvent('message', { data: { method: 'selectThread', threadId } }));
}

/**
 * Mounts a thread element matching the mocked `getCommentThreadElementId` (`comment-thread-<id>`),
 * with `scrollIntoView` stubbed on the instance (jsdom implements neither layout nor
 * `scrollIntoView`). Returns the stub and a `remove` cleanup a test should call once done.
 */
function mountThreadElement(threadId: string) {
  const threadElement = document.createElement('div');
  threadElement.id = `comment-thread-${threadId}`;
  const scrollIntoView = vi.fn();
  threadElement.scrollIntoView = scrollIntoView;
  document.body.appendChild(threadElement);
  return { scrollIntoView, remove: () => document.body.removeChild(threadElement) };
}

function latestPanelProps() {
  return mocks.panelPropsLog[mocks.panelPropsLog.length - 1];
}

/** The web view's own `scrollToTarget` from its most recent `useBcvSyncScroll` call. */
function latestScrollToTarget() {
  const call = mocks.bcvSyncScrollCalls[mocks.bcvSyncScrollCalls.length - 1];
  if (!call) throw new Error('test setup: useBcvSyncScroll was never called');
  return call.scrollToTarget;
}

/**
 * A `DOMRect`-shaped object reporting only the given `height`, for stubbing
 * `getBoundingClientRect`.
 */
function rectOfHeight(height: number): DOMRect {
  return {
    height,
    width: 0,
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: height,
    toJSON: () => ({}),
  };
}

describe('setFilters messages replayed in a burst', () => {
  beforeEach(() => {
    mocks.panelPropsLog.length = 0;
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
      dispatchSetFilters({ filters: { resolved: 'resolved' }, scopeFilter: 'current-chapter' });
      dispatchSetFilters({});
    });

    await waitFor(() => {
      expect(latestPanelProps().filters).toEqual(DEFAULT_COMMENT_FILTERS);
      expect(latestPanelProps().scopeFilter).toBe(UNFILTERED);
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
      latestPanelProps().onFiltersChange({ ...DEFAULT_COMMENT_FILTERS, resolved: 'resolved' });
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

    await waitFor(() => expect(latestPanelProps().scopeFilter).toBe(UNFILTERED));
  });

  it('still skips a genuinely identical repeat, minting no new filters object', async () => {
    renderCommentListWebView();
    act(() => {
      dispatchSetFilters({ filters: { resolved: 'resolved' } });
    });
    await waitFor(() =>
      expect(latestPanelProps().filters).toEqual({
        ...DEFAULT_COMMENT_FILTERS,
        resolved: 'resolved',
      }),
    );
    const appliedFilters = latestPanelProps().filters;

    act(() => {
      dispatchSetFilters({ filters: { resolved: 'resolved' } });
    });

    // The same object, not merely an equal one: an accepted repeat would mint a new-but-equal
    // filters object, churning the CommentThreads subscription the equal-values skip protects
    expect(latestPanelProps().filters).toBe(appliedFilters);
  });
});

describe('sticky-header scroll padding', () => {
  afterEach(() => {
    cleanup();
    document.documentElement.style.scrollPaddingTop = '';
  });

  it("re-reads the sticky header's height on every scroll and pins it as the document's scroll-padding-top", async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    const header = document.createElement('div');
    header.id = 'comment-list-sticky-header';
    document.body.appendChild(header);
    try {
      const heights = [40, 64];
      const getBoundingClientRect = vi.spyOn(header, 'getBoundingClientRect');
      heights.forEach((height) =>
        getBoundingClientRect.mockImplementationOnce(() => rectOfHeight(height)),
      );

      // A target that resolves to no DOM element (the mocked getCommentThreadElementId never
      // matches anything real here) is enough: the sticky-header read runs unconditionally before
      // scrollToTarget branches on the target type.
      const scrollToTarget = latestScrollToTarget();
      scrollToTarget({ type: 'thread', threadId: 'missing-1' }, 'smooth');
      expect(document.documentElement.style.scrollPaddingTop).toBe(`${heights[0]}px`);

      scrollToTarget({ type: 'thread', threadId: 'missing-2' }, 'smooth');
      expect(document.documentElement.style.scrollPaddingTop).toBe(`${heights[1]}px`);
    } finally {
      document.body.removeChild(header);
    }
  });

  it("also re-reads the sticky header's height when selecting a thread via the selectThread message", async () => {
    renderCommentListWebView();
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    const header = document.createElement('div');
    header.id = 'comment-list-sticky-header';
    document.body.appendChild(header);
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue(rectOfHeight(72));
    const { scrollIntoView, remove } = mountThreadElement('thread-1');

    try {
      act(() => {
        dispatchSelectThread('thread-1');
      });

      expect(document.documentElement.style.scrollPaddingTop).toBe('72px');
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
    } finally {
      document.body.removeChild(header);
      remove();
    }
  });
});

describe('trySelectThread and hidden views', () => {
  afterEach(() => {
    cleanup();
    document.documentElement.style.scrollPaddingTop = '';
    // Every other describe block in this file relies on the default (visible) mock; restore it so
    // a test order change or a re-run can't leak `false` into an unrelated test.
    vi.mocked(useViewVisibility).mockReturnValue(true);
  });

  it('defers the scroll into view while the tab is hidden, then scrolls instantly once it is shown', async () => {
    vi.mocked(useViewVisibility).mockReturnValue(false);
    const CommentListWebView = globalThis.webViewComponent;
    const useWebViewState = makeUseWebViewState({ editorWebViewId: 'editor-1' });
    const { rerender } = render(
      <CommentListWebView
        webViewType="legacyCommentManager.commentList"
        id="comment-list-1"
        projectId="project-1"
        useWebViewState={useWebViewState}
        useWebViewScrollGroupScrRef={useWebViewScrollGroupScrRefFake}
        updateWebViewDefinition={vi.fn()}
      />,
    );
    await waitFor(() => expect(latestPanelProps()).toBeDefined());

    const { scrollIntoView, remove } = mountThreadElement('thread-1');
    try {
      act(() => {
        dispatchSelectThread('thread-1');
      });

      // Hidden: rc-dock keeps the pane mounted but display:none, so there is no layout to scroll
      // within — the scroll must stay pending rather than fire against a pane with no layout.
      expect(scrollIntoView).not.toHaveBeenCalled();

      vi.mocked(useViewVisibility).mockReturnValue(true);
      act(() => {
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
      });

      // The queued request collapses into a single, instant (non-animated) catch-up scroll.
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalledTimes(1));
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'center' });
    } finally {
      remove();
    }
  });
});
