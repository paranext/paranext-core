// @vitest-environment jsdom

import { act, cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { UseWebViewScrollGroupScrRefHook, UseWebViewStateHook } from '@papi/core';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { LegacyCommentThread } from 'platform-bible-utils';

const mocks = vi.hoisted(() => {
  const commentThreads: LegacyCommentThread[] = [];
  const state: {
    onVerseRefClick?: (thread: LegacyCommentThread) => void;
    selectRange: ReturnType<typeof vi.fn>;
  } = { selectRange: vi.fn() };
  return { commentThreads, state };
});

vi.mock('@papi/frontend', () => ({
  default: {
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
  useWebViewController: vi.fn(() => ({ selectRange: mocks.state.selectRange })),
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
    useViewVisibility: vi.fn(() => true),
  };
});

vi.mock('./comment-list.component', () => ({
  COMMENT_LIST_PANEL_EXTRA_STRING_KEYS: [],
  COMMENT_LIST_STICKY_HEADER_ELEMENT_ID: 'comment-list-sticky-header',
  CommentListPanel: ({
    onVerseRefClick,
  }: {
    onVerseRefClick: (thread: LegacyCommentThread) => void;
  }) => {
    mocks.state.onVerseRefClick = onVerseRefClick;
    return <div id="comment-list" />;
  },
}));

// The web view registers itself on `globalThis.webViewComponent` when imported, so it is imported
// after the mocks above are declared.
// eslint-disable-next-line import/first
import './comment-list.web-view';

function makeThread(id: string, verseRef: string, startPosition: number): LegacyCommentThread {
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
        contents: `<p>${id}</p>`,
        date: '2024-01-01T00:00:00.0000000-00:00',
        deleted: false,
        hideInTextWindow: false,
        id: `${id}/tester/2024-01-01`,
        isRead: false,
        language: 'en',
        startPosition,
        thread: id,
        user: 'Tester',
        verseRef,
      },
    ],
  };
}

function makeUseWebViewState(seed: Record<string, unknown>): UseWebViewStateHook {
  return function useWebViewStateFake<T>(
    stateKey: string,
    defaultStateValue: T,
  ): [T, (stateValue: T) => void, () => void] {
    const [value, setValue] = useState<T>(() =>
      // The seed holds untyped fixtures that the hook's per-key generic cannot see.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      stateKey in seed ? (seed[stateKey] as T) : defaultStateValue,
    );
    return [value, setValue, vi.fn()];
  };
}

function renderList() {
  const setScrRefCalls: SerializedVerseRef[] = [];
  const useScrRef: UseWebViewScrollGroupScrRefHook = () => {
    const [scrRef] = useState<SerializedVerseRef>({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    return [
      scrRef,
      (next: SerializedVerseRef) => {
        setScrRefCalls.push(next);
      },
      0,
      vi.fn(),
      undefined,
    ];
  };
  const CommentListWebView = globalThis.webViewComponent;
  render(
    <CommentListWebView
      webViewType="legacyCommentManager.commentList"
      id="comment-list-1"
      projectId="project-1"
      useWebViewState={makeUseWebViewState({ editorWebViewId: 'editor-1' })}
      useWebViewScrollGroupScrRef={useScrRef}
      updateWebViewDefinition={vi.fn()}
    />,
  );
  return setScrRefCalls;
}

afterEach(() => {
  cleanup();
  mocks.state.selectRange.mockReset();
});

describe('handleVerseRefClick', () => {
  it('sends the comment start position as the offset from the verse backslash', () => {
    mocks.state.selectRange.mockResolvedValue(undefined);
    renderList();
    act(() => mocks.state.onVerseRefClick?.(makeThread('a', 'GEN 1:2', 5)));
    const sent = mocks.state.selectRange.mock.calls[0][0];
    expect(sent.start.offset).toBe(5);
    expect(sent.end.offset).toBe(5);
  });

  it('clamps a missing start position to the verse start', () => {
    mocks.state.selectRange.mockResolvedValue(undefined);
    renderList();
    act(() => mocks.state.onVerseRefClick?.(makeThread('a', 'GEN 1:2', -1)));
    expect(mocks.state.selectRange.mock.calls[0][0].start.offset).toBe(0);
  });

  it('falls back to the verse when the editor rejects the range', async () => {
    mocks.state.selectRange.mockRejectedValue(new Error('could not convert'));
    const setScrRefCalls = renderList();
    await act(async () => {
      mocks.state.onVerseRefClick?.(makeThread('a', 'GEN 1:2', 5));
      await Promise.resolve();
    });
    expect(setScrRefCalls).toEqual([
      expect.objectContaining({ book: 'GEN', chapterNum: 1, verseNum: 2 }),
    ]);
  });

  it('falls back to the verse when the controller proxy throws synchronously', () => {
    mocks.state.selectRange.mockImplementation(() => {
      throw new Error('proxy revoked');
    });
    const setScrRefCalls = renderList();
    act(() => mocks.state.onVerseRefClick?.(makeThread('a', 'GEN 1:2', 5)));
    expect(setScrRefCalls).toEqual([
      expect.objectContaining({ book: 'GEN', chapterNum: 1, verseNum: 2 }),
    ]);
  });

  it('does not move the scroll group for a rejection that arrives after a newer click', async () => {
    let rejectFirst: (e: Error) => void = () => {};
    mocks.state.selectRange
      .mockImplementationOnce(
        () =>
          new Promise<void>((_resolve, reject) => {
            rejectFirst = reject;
          }),
      )
      .mockResolvedValueOnce(undefined);
    const setScrRefCalls = renderList();
    act(() => mocks.state.onVerseRefClick?.(makeThread('a', 'GEN 1:2', 5)));
    act(() => mocks.state.onVerseRefClick?.(makeThread('b', 'GEN 3:4', 5)));
    await act(async () => {
      rejectFirst(new Error('could not convert'));
      await Promise.resolve();
    });
    expect(setScrRefCalls).toEqual([]);
  });
});
