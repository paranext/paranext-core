import type { SerializedVerseRef } from '@sillsdev/scripture';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CommentListScrollTarget,
  findScrollTarget,
  NavigationRecord,
  ScrollRankableThread,
  shouldArmSyncScroll,
  toNavigationRecord,
} from './comment-list-scroll.utils';

/**
 * Keeps the comment list scrolled in sync with the scroll-group BCV reference (PT-4080).
 *
 * Owns the armed/consumed pending-scroll state machine: a scroll-group reference change arms a sync
 * scroll, which is consumed — by calling `scrollToTarget` — once thread data has settled and the
 * view is visible. Scroll only: selection and expansion are never touched here.
 *
 * @returns Two stable callbacks the web view wires into its interaction handlers:
 *
 *   - `recordSelfInitiatedNavigation`: one-shot record of a reference this view itself navigated to
 *       (clicking a thread's verse reference, the editor's "go to comment" selecting a thread). The
 *       matching incoming scroll-group change is consumed without arming a sync scroll: a click
 *       inside the comment list must never scroll the comment list. Any other change clears the
 *       record.
 *   - `cancelPendingSyncScroll`: drops any due sync scroll (an explicit selectThread navigation is the
 *       more specific intent, so it wins).
 */
export function useBcvSyncScroll({
  scrRef,
  isLoadingCommentThreads,
  hasPendingThreadSelection,
  isViewVisible,
  commentThreads,
  scrollToTarget,
}: {
  /** Current scroll-group scripture reference */
  scrRef: SerializedVerseRef;
  /** Whether comment threads are loading; consumption defers until a requery finishes */
  isLoadingCommentThreads: boolean;
  /** Whether an explicit selectThread navigation is pending; it wins over the sync scroll */
  hasPendingThreadSelection: boolean;
  /**
   * Whether the web view is currently rendered (see useViewVisibility). While hidden there is no
   * layout, so the scroll stays pending and is consumed — instantly — when the tab is shown.
   */
  isViewVisible: boolean;
  /** The currently loaded (already filtered) comment threads, in list render order */
  commentThreads: readonly ScrollRankableThread[];
  /** Performs the actual DOM scroll for a computed target (kept in the web view) */
  scrollToTarget: (target: NonNullable<CommentListScrollTarget>, behavior: ScrollBehavior) => void;
}): {
  recordSelfInitiatedNavigation: (verseRefText: string | undefined) => void;
  cancelPendingSyncScroll: () => void;
} {
  /**
   * Scroll behavior for a due BCV-sync scroll. `'instant'` initially so the list opens already
   * positioned at the current reference; `'smooth'` for subsequent scroll-group navigation.
   * `undefined` means no sync scroll is due.
   */
  const [pendingSyncScrollBehavior, setPendingSyncScrollBehavior] = useState<
    ScrollBehavior | undefined
  >('instant');

  /** One-shot record of the scripture reference this view itself navigated to. */
  const selfInitiatedNavigationRef = useRef<NavigationRecord | undefined>(undefined);

  // Arm a sync scroll whenever the scroll-group reference changes. This also runs on mount, where
  // `?? ` preserves the initial 'instant' behavior instead of downgrading it to 'smooth'. The
  // dependency list is the three primitive values on purpose: re-selecting the same verse (or a
  // scrRef object identity change without a value change) must not arm a scroll. A change this
  // view itself initiated (see selfInitiatedNavigationRef) is swallowed instead of armed.
  useEffect(() => {
    const selfInitiatedNavigation = selfInitiatedNavigationRef.current;
    selfInitiatedNavigationRef.current = undefined;
    if (
      !shouldArmSyncScroll(selfInitiatedNavigation, {
        // TODO (PT-4031): Handle versification
        book: scrRef.book,
        chapterNum: scrRef.chapterNum,
        verseNum: scrRef.verseNum,
      })
    )
      return;

    setPendingSyncScrollBehavior((previous) => previous ?? 'smooth');
  }, [scrRef.book, scrRef.chapterNum, scrRef.verseNum]);

  // Consume the pending BCV-sync scroll once thread data has settled and the view is visible. An
  // explicit selectThread navigation (the editor's "go to comment" flow) is the more specific
  // intent, so it wins and the sync scroll is dropped.
  useEffect(() => {
    if (pendingSyncScrollBehavior === undefined || isLoadingCommentThreads) return;

    if (hasPendingThreadSelection) {
      setPendingSyncScrollBehavior(undefined);
      return;
    }

    if (!isViewVisible) {
      // No layout while the dock tab is hidden — scrollIntoView would no-op. Keep the scroll
      // pending (repeat navigation collapses into this one record) and downgrade it to 'instant'
      // so the catch-up on activation snaps into position instead of animating.
      if (pendingSyncScrollBehavior !== 'instant') setPendingSyncScrollBehavior('instant');
      return;
    }

    const target = findScrollTarget(commentThreads, scrRef);
    if (target) scrollToTarget(target, pendingSyncScrollBehavior);
    setPendingSyncScrollBehavior(undefined);
  }, [
    pendingSyncScrollBehavior,
    isLoadingCommentThreads,
    hasPendingThreadSelection,
    isViewVisible,
    commentThreads,
    scrRef,
    scrollToTarget,
  ]);

  const recordSelfInitiatedNavigation = useCallback((verseRefText: string | undefined) => {
    selfInitiatedNavigationRef.current = toNavigationRecord(verseRefText);
  }, []);

  const cancelPendingSyncScroll = useCallback(() => {
    setPendingSyncScrollBehavior(undefined);
  }, []);

  return { recordSelfInitiatedNavigation, cancelPendingSyncScroll };
}
