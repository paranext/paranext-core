// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import { useCallback, useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import {
  CommentFilters,
  DEFAULT_COMMENT_FILTERS,
  ScopeFilter,
  UNFILTERED,
} from './comment-list-filters.model';

// vi.mock factories are hoisted above imports, so anything they close over must be created via
// vi.hoisted to avoid a temporal-dead-zone reference.
const mocks = vi.hoisted(() => {
  /** Every set of props the stubbed CommentListPanel has been rendered with, in order */
  const panelPropsLog: { filters: CommentFilters; scopeFilter: ScopeFilter }[] = [];
  // Stable across renders: the message-listener effect lists these among its deps, and fresh
  // functions every render would re-subscribe it mid-test for reasons the tests are not about
  const bcvSyncScroll = {
    recordSelfInitiatedNavigation: vi.fn(),
    cancelPendingSyncScroll: vi.fn(),
  };
  return { panelPropsLog, bcvSyncScroll };
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
  CommentListPanel: (props: { filters: CommentFilters; scopeFilter: ScopeFilter }) => {
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
  render(
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

function latestPanelProps() {
  return mocks.panelPropsLog[mocks.panelPropsLog.length - 1];
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
