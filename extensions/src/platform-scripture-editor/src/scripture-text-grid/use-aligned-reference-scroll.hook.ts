import { SerializedVerseRef } from '@sillsdev/scripture';
import { useRunWhenVisible, useViewVisibility } from 'platform-bible-react';
import { useEffect, useRef, type RefObject } from 'react';
import {
  findVerseBlockForVerse,
  isBlockInPortView,
  scrollPortToBlock,
} from './aligned-scroll.utils';

/** Scroll positions within a pixel of each other are the same position. */
const SCROLL_MATCH_TOLERANCE_PX = 1;

/**
 * Keeps the aligned grid scrolled to the scroll-group reference.
 *
 * The grid has to scroll itself: the block verse layout is read-only, and Lexical skips the
 * DOM-selection write — which is where scroll-into-view lives — for a read-only editor, so setting
 * the editor's selection moves nothing.
 *
 * Three rules keep it from fighting the reader:
 *
 * - A verse already on screen is left where it is. Clicking a verse reports it as the new reference,
 *   and scrolling it to the top under the reader's cursor would be the wrong answer to a click.
 *   This is the same rule `useBcvSyncScroll` implements for the comment list.
 * - A reference is re-checked as the columns arrive, because a column that renders late adds height
 *   above the target and pushes it back off screen.
 * - Once the reader scrolls the grid themselves, this stops until the reference changes.
 *
 * @param portRef The grid root, which is the only scroll port in this view.
 * @param scrRef The scroll-group reference to follow.
 */
export function useAlignedReferenceScroll(
  portRef: RefObject<HTMLElement | null>,
  scrRef: SerializedVerseRef,
): void {
  // Where this hook last left the port. A scrollTop that no longer matches means the reader moved
  // it, so the reference is left alone until it changes. `undefined` re-arms.
  const appliedScrollTopRef = useRef<number | undefined>(undefined);
  // The verse is used as given: this view shows a whole chapter, so it has no reason to resolve a
  // verse-0 reference forward the way a one-verse-tall cell does — and doing so made verse 0 and
  // verse 1 the same key, so stepping between them never re-armed. `findVerseBlockForVerse` already
  // puts a reference above the first block at the top of the passage.
  const targetReference = `${scrRef.book} ${scrRef.chapterNum}:${scrRef.verseNum} ${scrRef.versificationStr}`;

  // Set once the reader has moved the port for the current reference. From then on nothing here
  // will move it again, so the observer below stops doing any work at all rather than re-deciding
  // that on every batch. Only ever set from inside `requestScroll`, which runs only while the view
  // is visible — a hidden pane's scrollTop is not the reader's doing and must not stand this down.
  const hasStoodDownRef = useRef(false);

  const isViewVisible = useViewVisibility();
  // An inactive dock tab has no layout: geometry reads return zero and the scroll would silently do
  // nothing. Deferring collapses every request made while hidden into one catch-up on activation
  // (`.claude/rules/cross-view-sync-hidden-views.md`).
  const requestScroll = useRunWhenVisible(isViewVisible, () => {
    const port = portRef.current;
    if (!port) return;

    const applied = appliedScrollTopRef.current;
    if (applied !== undefined) {
      // The browser clamps scrollTop to the bottom of the content whenever the content SHRINKS — a
      // resource unchecked in View Options, or a column zoomed out — and that is not the reader
      // moving the port. Comparing against the position we wrote, clamped into the range that is
      // valid now, tells the two apart; `overflow-anchor: none` does not help here, because a clamp
      // is not scroll anchoring.
      const maxScrollTop = port.scrollHeight - port.clientHeight;
      // Only clamp where the port reports something to scroll. A port that reports none — nothing
      // overflows, or the environment lays nothing out — would otherwise clamp every position to 0
      // and read the reference scroll's own write as the reader's.
      const expected = maxScrollTop > 0 ? Math.min(applied, maxScrollTop) : applied;
      if (Math.abs(port.scrollTop - expected) > SCROLL_MATCH_TOLERANCE_PX) {
        hasStoodDownRef.current = true;
        return;
      }
    }

    // No verse block has rendered yet; a later mutation will bring one.
    const block = findVerseBlockForVerse(port, scrRef.verseNum);
    if (!block) return;

    if (!isBlockInPortView(port, block)) scrollPortToBlock(port, block);
    appliedScrollTopRef.current = port.scrollTop;
  });

  useEffect(() => {
    appliedScrollTopRef.current = undefined;
    hasStoodDownRef.current = false;
    requestScroll();
  }, [targetReference, requestScroll]);

  // The reference usually changes before the chapter it points into has rendered, and each column
  // arrives separately, so re-check as the DOM changes. Several editors mutating at once produce
  // far more batches than there are frames, and every check reads layout — a query across every
  // block plus three rect reads — so batches are coalesced into at most one check per frame, and
  // stop entirely once this has stood down.
  useEffect(() => {
    const port = portRef.current;
    if (!port) return undefined;
    let pendingFrame: number | undefined;
    const observer = new MutationObserver(() => {
      if (hasStoodDownRef.current || pendingFrame !== undefined) return;
      pendingFrame = requestAnimationFrame(() => {
        pendingFrame = undefined;
        requestScroll();
      });
    });
    observer.observe(port, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (pendingFrame !== undefined) cancelAnimationFrame(pendingFrame);
    };
  }, [portRef, requestScroll]);
}

export default useAlignedReferenceScroll;
