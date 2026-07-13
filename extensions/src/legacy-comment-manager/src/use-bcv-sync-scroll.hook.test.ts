// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import { describe, expect, it, vi } from 'vitest';
import { ScrollRankableThread } from './comment-list-scroll.utils';
import { useBcvSyncScroll } from './use-bcv-sync-scroll.hook';

function thread(id: string, verseRef: string): ScrollRankableThread {
  return { id, verseRef };
}

const MRK_11_13: SerializedVerseRef = { book: 'MRK', chapterNum: 11, verseNum: 13 };
const MRK_11_14: SerializedVerseRef = { book: 'MRK', chapterNum: 11, verseNum: 14 };
const MRK_11_20: SerializedVerseRef = { book: 'MRK', chapterNum: 11, verseNum: 20 };
const LUK_2_1: SerializedVerseRef = { book: 'LUK', chapterNum: 2, verseNum: 1 };

const THREADS = [
  thread('a', 'MRK 11:1'),
  thread('b', 'MRK 11:13'),
  thread('c', 'MRK 11:20'),
  thread('d', 'LUK 2:1'),
];

/** Renders the hook with sensible defaults; rerender with partial overrides per step. */
function renderSyncScroll(initialOverrides: Partial<Parameters<typeof useBcvSyncScroll>[0]> = {}) {
  const scrollToTarget = vi.fn();
  const defaultProps = {
    scrRef: MRK_11_13,
    isLoadingCommentThreads: false,
    hasPendingThreadSelection: false,
    isViewVisible: true,
    commentThreads: THREADS,
    scrollToTarget,
  };
  const { result, rerender } = renderHook((props) => useBcvSyncScroll(props), {
    initialProps: { ...defaultProps, ...initialOverrides },
  });
  return {
    result,
    scrollToTarget,
    rerenderWith: (overrides: Partial<typeof defaultProps>) =>
      rerender({ ...defaultProps, ...overrides }),
  };
}

describe('useBcvSyncScroll', () => {
  it('positions the list instantly on initial load', () => {
    const { scrollToTarget } = renderSyncScroll();
    expect(scrollToTarget).toHaveBeenCalledTimes(1);
    expect(scrollToTarget).toHaveBeenCalledWith({ type: 'thread', threadId: 'b' }, 'instant');
  });

  it('scrolls smoothly on subsequent navigation', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll();
    rerenderWith({ scrRef: MRK_11_14 });
    expect(scrollToTarget).toHaveBeenCalledTimes(2);
    expect(scrollToTarget).toHaveBeenLastCalledWith({ type: 'thread', threadId: 'c' }, 'smooth');
  });

  it('does not scroll when the reference object changes identity without changing values', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll();
    rerenderWith({ scrRef: { ...MRK_11_13 } });
    expect(scrollToTarget).toHaveBeenCalledTimes(1);
  });

  it('swallows exactly one matching self-initiated navigation (one-shot record)', () => {
    const { result, scrollToTarget, rerenderWith } = renderSyncScroll();
    act(() => result.current.recordSelfInitiatedNavigation('MRK 11:20'));
    rerenderWith({ scrRef: MRK_11_20 });
    expect(scrollToTarget).toHaveBeenCalledTimes(1); // swallowed
    rerenderWith({ scrRef: LUK_2_1 });
    expect(scrollToTarget).toHaveBeenCalledTimes(2); // record consumed, next navigation scrolls
    expect(scrollToTarget).toHaveBeenLastCalledWith({ type: 'thread', threadId: 'd' }, 'smooth');
  });

  it('clears the record on a non-matching change and still scrolls', () => {
    const { result, scrollToTarget, rerenderWith } = renderSyncScroll();
    act(() => result.current.recordSelfInitiatedNavigation('MRK 11:20'));
    rerenderWith({ scrRef: LUK_2_1 });
    expect(scrollToTarget).toHaveBeenCalledTimes(2); // non-matching: cleared AND scrolled
    rerenderWith({ scrRef: MRK_11_20 });
    expect(scrollToTarget).toHaveBeenCalledTimes(3); // stale record cannot swallow later moves
  });

  it('defers the scroll until thread data finishes loading', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll({ isLoadingCommentThreads: true });
    expect(scrollToTarget).not.toHaveBeenCalled();
    rerenderWith({ isLoadingCommentThreads: false });
    expect(scrollToTarget).toHaveBeenCalledTimes(1);
    expect(scrollToTarget).toHaveBeenCalledWith({ type: 'thread', threadId: 'b' }, 'instant');
  });

  it('drops the sync scroll while an explicit thread selection is pending', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll();
    rerenderWith({ scrRef: MRK_11_14, hasPendingThreadSelection: true });
    expect(scrollToTarget).toHaveBeenCalledTimes(1); // only the initial position
    rerenderWith({ scrRef: MRK_11_14, hasPendingThreadSelection: false });
    expect(scrollToTarget).toHaveBeenCalledTimes(1); // dropped, not deferred
  });

  it('cancelPendingSyncScroll drops a deferred scroll', () => {
    const { result, scrollToTarget, rerenderWith } = renderSyncScroll({
      isLoadingCommentThreads: true,
    });
    rerenderWith({ scrRef: MRK_11_14, isLoadingCommentThreads: true });
    act(() => result.current.cancelPendingSyncScroll());
    rerenderWith({ scrRef: MRK_11_14, isLoadingCommentThreads: false });
    expect(scrollToTarget).not.toHaveBeenCalled();
  });

  it('never scrolls when there is no target (empty list)', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll({ commentThreads: [] });
    rerenderWith({ commentThreads: [], scrRef: MRK_11_14 });
    expect(scrollToTarget).not.toHaveBeenCalled();
  });

  it('holds the initial scroll while hidden and catches up instantly when shown', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll({ isViewVisible: false });
    expect(scrollToTarget).not.toHaveBeenCalled();
    rerenderWith({ isViewVisible: true });
    expect(scrollToTarget).toHaveBeenCalledTimes(1);
    expect(scrollToTarget).toHaveBeenCalledWith({ type: 'thread', threadId: 'b' }, 'instant');
  });

  it('collapses navigation while hidden into one instant catch-up at the latest reference', () => {
    const { scrollToTarget, rerenderWith } = renderSyncScroll();
    rerenderWith({ scrRef: MRK_11_14 });
    expect(scrollToTarget).toHaveBeenCalledTimes(2); // visible smooth navigation works normally
    rerenderWith({ scrRef: MRK_11_14, isViewVisible: false });
    rerenderWith({ scrRef: MRK_11_20, isViewVisible: false });
    rerenderWith({ scrRef: LUK_2_1, isViewVisible: false });
    expect(scrollToTarget).toHaveBeenCalledTimes(2); // nothing while hidden
    rerenderWith({ scrRef: LUK_2_1, isViewVisible: true });
    expect(scrollToTarget).toHaveBeenCalledTimes(3); // exactly one catch-up
    expect(scrollToTarget).toHaveBeenLastCalledWith({ type: 'thread', threadId: 'd' }, 'instant');
  });

  it('cancelPendingSyncScroll while hidden prevents the catch-up scroll', () => {
    const { result, scrollToTarget, rerenderWith } = renderSyncScroll({ isViewVisible: false });
    rerenderWith({ scrRef: MRK_11_14, isViewVisible: false });
    act(() => result.current.cancelPendingSyncScroll());
    rerenderWith({ scrRef: MRK_11_14, isViewVisible: true });
    expect(scrollToTarget).not.toHaveBeenCalled();
  });
});
