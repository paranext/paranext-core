// @vitest-environment jsdom

import { act, cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { useViewVisibility } from 'platform-bible-react';
import type { LegacyCommentThread } from 'platform-bible-utils';

// The hidden-tab race between the two deferred scrolls (the BCV sync scroll and a thread
// selection's scroll) only exists when both catch-ups are real, so unlike
// comment-list.web-view.burst.test.tsx this file runs the real `useBcvSyncScroll` and the real
// `useRunWhenVisible`; only PAPI, the panel's presentation and `useViewVisibility` are replaced.

const mocks = vi.hoisted(() => {
  /** The threads the comments PDP returns — one stable array so the query result never churns */
  const commentThreads: LegacyCommentThread[] = [];
  return { commentThreads };
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
    CommentThreads: () => [mocks.commentThreads, vi.fn(), false],
  })),
  useProjectDataProvider: vi.fn(() => ({})),
  useWebViewController: vi.fn(() => undefined),
}));

vi.mock('platform-bible-react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('platform-bible-react')>();

  return {
    COMMENT_LIST_ELEMENT_ID: 'comment-list',
    COMMENT_LIST_STRING_KEYS: [],
    CONFLICT_NOTE_STRING_KEYS: [],
    getCommentThreadElementId: (threadId: string) => `comment-thread-${threadId}`,
    Sonner: () => undefined,
    sonner: { error: vi.fn(), warning: vi.fn(), info: vi.fn() },
    usePromise: vi.fn((_factory: unknown, defaultValue: unknown) => [defaultValue, false]),
    useRunWhenVisible: actual.useRunWhenVisible,
    useTabIconSelection: vi.fn(() => undefined),
    useViewVisibility: vi.fn(() => true),
  };
});

// The panel is presentation; it renders one element per thread under the ids the web view looks
// up, which is all either scroll needs to find its target.
vi.mock('./comment-list.component', () => ({
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS: [],
  COMMENT_LIST_STICKY_HEADER_ELEMENT_ID: 'comment-list-sticky-header',
  CommentListPanel: ({ threads }: { threads: { id: string }[] }) => (
    <div id="comment-list">
      {threads.map((thread) => (
        <div key={thread.id} id={`comment-thread-${thread.id}`} />
      ))}
    </div>
  ),
}));

// vi.mock declarations above are hoisted, so this import must come after to ensure the mocks are
// applied to the module under test. Importing registers `globalThis.webViewComponent`.
// eslint-disable-next-line import/first
import './comment-list.web-view';

function makeThread(id: string, verseRef: string): LegacyCommentThread {
  return {
    id,
    status: 'Todo',
    type: 'Normal',
    modifiedDate: '2024-01-01T00:00:00.0000000-00:00',
    verseRef,
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
        verseRef,
      },
    ],
  };
}

const THREAD_AT_MRK_1_1 = makeThread('thread-a', 'MRK 1:1');
const THREAD_AT_MRK_2_5 = makeThread('thread-b', 'MRK 2:5');

const MRK_1_1: SerializedVerseRef = { book: 'MRK', chapterNum: 1, verseNum: 1 };
const MRK_2_5: SerializedVerseRef = { book: 'MRK', chapterNum: 2, verseNum: 5 };

function makeUseWebViewState(seed: Record<string, unknown>): UseWebViewStateHook {
  return function useWebViewStateFake<T>(
    stateKey: string,
    defaultStateValue: T,
  ): [T, (stateValue: T) => void, () => void] {
    const [value, setValue] = useState<T>(() =>
      // Only the seed below ever writes this map, with the key's own T
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      stateKey in seed ? (seed[stateKey] as T) : defaultStateValue,
    );
    return [value, setValue, vi.fn()];
  };
}

/** A `useWebViewScrollGroupScrRef` stand-in whose value a test pushes, as the editor moving would. */
function makeControllableScrRef(initialScrRef: SerializedVerseRef) {
  let latestSetScrRef: ((nextScrRef: SerializedVerseRef) => void) | undefined;
  const useControllableScrRef: UseWebViewScrollGroupScrRefHook = () => {
    const [scrRef, setScrRef] = useState(initialScrRef);
    latestSetScrRef = setScrRef;
    return [scrRef, vi.fn(), 0, vi.fn(), undefined];
  };
  return {
    hook: useControllableScrRef,
    setScrRef: (nextScrRef: SerializedVerseRef) => {
      if (!latestSetScrRef) throw new Error('test setup: render before moving the scroll group');
      latestSetScrRef(nextScrRef);
    },
  };
}

/** Renders the web view hidden; `show` flips it visible the way the tab being activated would. */
function renderHiddenCommentList(initialScrRef: SerializedVerseRef) {
  vi.mocked(useViewVisibility).mockReturnValue(false);
  const scrRef = makeControllableScrRef(initialScrRef);
  const CommentListWebView = globalThis.webViewComponent;
  const useWebViewState = makeUseWebViewState({ editorWebViewId: 'editor-1' });
  const updateWebViewDefinition = vi.fn();
  // A fresh element each time: React skips re-rendering for the very same element object, and the
  // mocked visibility is only read on a render.
  const makeElement = () => (
    <CommentListWebView
      webViewType="legacyCommentManager.commentList"
      id="comment-list-1"
      projectId="project-1"
      useWebViewState={useWebViewState}
      useWebViewScrollGroupScrRef={scrRef.hook}
      updateWebViewDefinition={updateWebViewDefinition}
    />
  );
  const { rerender } = render(makeElement());
  return {
    moveScrollGroup: (nextScrRef: SerializedVerseRef) => act(() => scrRef.setScrRef(nextScrRef)),
    show: () => {
      vi.mocked(useViewVisibility).mockReturnValue(true);
      act(() => rerender(makeElement()));
    },
  };
}

function dispatchSelectThread(threadId: string) {
  act(() => {
    window.dispatchEvent(
      new MessageEvent('message', { data: { method: 'selectThread', threadId } }),
    );
  });
}

describe('comment list catch-up when its hidden tab is shown', () => {
  /** The id of every element `scrollIntoView` was called on, in call order */
  let scrolledElementIds: string[];

  beforeEach(() => {
    mocks.commentThreads = [THREAD_AT_MRK_1_1, THREAD_AT_MRK_2_5];
    scrolledElementIds = [];
    // jsdom implements no layout, and so no `scrollIntoView`
    Element.prototype.scrollIntoView = function recordScrollIntoView(this: Element) {
      scrolledElementIds.push(this.id);
    };
  });

  afterEach(() => {
    cleanup();
    // Removes the stub installed above; jsdom has no implementation of its own to restore
    Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
    document.documentElement.style.scrollPaddingTop = '';
    vi.mocked(useViewVisibility).mockReturnValue(true);
  });

  it('ends on the current verse when the editor moved on after a thread was selected', async () => {
    const view = renderHiddenCommentList(MRK_1_1);
    await waitFor(() => expect(document.getElementById('comment-thread-thread-a')).not.toBeNull());

    // The editor's insert-comment path selects the new thread in the hidden panel...
    dispatchSelectThread('thread-a');
    // ...and the user then moves the editor to another verse before showing the tab.
    view.moveScrollGroup(MRK_2_5);
    view.show();

    await waitFor(() => expect(scrolledElementIds).not.toHaveLength(0));
    expect(scrolledElementIds).toEqual(['comment-thread-thread-b']);
  });

  it('ends on the selected thread when the selection came after the verse change', async () => {
    const view = renderHiddenCommentList(MRK_1_1);
    await waitFor(() => expect(document.getElementById('comment-thread-thread-a')).not.toBeNull());

    view.moveScrollGroup(MRK_2_5);
    dispatchSelectThread('thread-a');
    view.show();

    await waitFor(() => expect(scrolledElementIds).not.toHaveLength(0));
    expect(scrolledElementIds).toEqual(['comment-thread-thread-a']);
  });

  it("keeps the selected thread when the scroll group then arrives at that thread's own verse", async () => {
    const view = renderHiddenCommentList(MRK_2_5);
    await waitFor(() => expect(document.getElementById('comment-thread-thread-a')).not.toBeNull());

    // "Go to comment": the editor's caret move to the thread's verse can land after the selection.
    dispatchSelectThread('thread-a');
    view.moveScrollGroup(MRK_1_1);
    view.show();

    await waitFor(() => expect(scrolledElementIds).not.toHaveLength(0));
    expect(scrolledElementIds).toEqual(['comment-thread-thread-a']);
  });
});
