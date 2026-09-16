import { SerializedVerseRef } from '@sillsdev/scripture';
import { useRunWhenVisible } from 'platform-bible-react';
import { useEffect, useRef, type RefObject } from 'react';
import {
  isBlockInPortView,
  scrollPortToBlock,
  type VerseTargetFinder,
} from './reference-scroll.utils';

/** Scroll positions within a pixel of each other are the same position. */
const SCROLL_MATCH_TOLERANCE_PX = 1;

/**
 * Keeps a Text Collection scroll port scrolled to the scroll-group reference.
 *
 * The view has to scroll itself: these editors are read-only, and Lexical skips the DOM-selection
 * write — which is where scroll-into-view lives — for a read-only editor, so setting the editor's
 * selection moves nothing.
 *
 * Three rules keep it from fighting the reader:
 *
 * - A verse already on screen is left where it is. Clicking a verse reports it as the new reference,
 *   and scrolling it to the top under the reader's cursor would be the wrong answer to a click.
 *   This is the same rule `useBcvSyncScroll` implements for the comment list. It is also why no
 *   echo latch is needed: a reference this view published is, by construction, already visible.
 * - A reference is re-checked as content arrives, because content that renders late adds height above
 *   the target and pushes it back off screen.
 * - Once the reader scrolls the port themselves, this stops until the reference changes.
 *
 * Serves both layouts. Which element represents a verse is the one thing they disagree on, so the
 * lookup is injected: the aligned grid passes `findVerseBlockForVerse` and scrolls its single grid
 * root; a chapter cell passes `findVerseMarkerForVerse` and scrolls its own content box.
 *
 * @param portRef The scroll port — the grid root in the aligned view, the cell's content box in a
 *   chapter cell.
 * @param scrRef The scroll-group reference to follow.
 * @param isViewVisible Whether the view is visible, from `useViewVisibility`. Taken as a parameter
 *   so a view calls `useViewVisibility` once however many consumers of this hook it renders.
 * @param findTarget How to find the element representing a verse in this view's layout.
 * @param options `isEnabled` (default `true`) turns the hook off — no target lookup, no geometry
 *   reads, no mutation observer — for a view whose layout is scrolled by an ancestor or that has
 *   nothing to scroll to, where a React hook still has to be called unconditionally.
 */
export function useReferenceScroll(
  portRef: RefObject<HTMLElement | null>,
  scrRef: SerializedVerseRef,
  isViewVisible: boolean,
  findTarget: VerseTargetFinder,
  options?: { isEnabled?: boolean },
): void {
  const { isEnabled = true } = options ?? {};
  // Where this hook last left the port. A scrollTop that no longer matches means the reader moved
  // it, so the reference is left alone until it changes. `undefined` re-arms.
  const appliedScrollTopRef = useRef<number | undefined>(undefined);
  // The verse is used as given: this view shows a whole chapter, so it has no reason to resolve a
  // verse-0 reference forward the way a one-verse-tall cell does — and doing so made verse 0 and
  // verse 1 the same key, so stepping between them never re-armed. Both finders already put a
  // reference above the first verse at the top of the passage.
  const targetReference = `${scrRef.book} ${scrRef.chapterNum}:${scrRef.verseNum} ${scrRef.versificationStr}`;

  // Set once the reader has moved the port for the current reference. From then on nothing here
  // will move it again, so the observer below stops doing any work at all rather than re-deciding
  // that on every batch. Only ever set from inside `requestScroll`, which runs only while the view
  // is visible — a hidden pane's scrollTop is not the reader's doing and must not stand this down.
  const hasStoodDownRef = useRef(false);

  // An inactive dock tab has no layout: geometry reads return zero and the scroll would silently do
  // nothing. Deferring collapses every request made while hidden into one catch-up on activation
  // (`.claude/rules/cross-view-sync-hidden-views.md`).
  const requestScroll = useRunWhenVisible(isViewVisible, () => {
    if (!isEnabled) return;
    const port = portRef.current;
    if (!port) return;

    const applied = appliedScrollTopRef.current;
    if (applied !== undefined) {
      // The browser clamps scrollTop to the bottom of the content whenever the content SHRINKS — a
      // resource unchecked in View Options, or a column zoomed out — and that is not the reader
      // moving the port. Comparing against the position we wrote, clamped into the range that is
      // valid now, tells the two apart; `overflow-anchor: none` does not help here, because a clamp
      // is not scroll anchoring.
      // Content that shrinks until nothing overflows clamps scrollTop to 0, so the valid range
      // bottoms out at 0 rather than going negative. Only a port with no height at all is left
      // unclamped: that is an environment that lays nothing out (jsdom), where scrollTop keeps
      // whatever was written and clamping would read this hook's own write as the reader's.
      const hasLayout = port.clientHeight > 0;
      const maxScrollTop = Math.max(0, port.scrollHeight - port.clientHeight);
      const expected = hasLayout ? Math.min(applied, maxScrollTop) : applied;
      if (Math.abs(port.scrollTop - expected) > SCROLL_MATCH_TOLERANCE_PX) {
        hasStoodDownRef.current = true;
        return;
      }
    }

    // No verse has rendered yet; a later mutation will bring one.
    const block = findTarget(port, scrRef.verseNum);
    if (!block) return;

    if (!isBlockInPortView(port, block)) scrollPortToBlock(port, block);
    appliedScrollTopRef.current = port.scrollTop;
  });

  // Re-arm on every new reference: forget where this hook last left the port, and take back a
  // stand-down, because the reader asked to go somewhere new.
  //
  // `isEnabled` gates the request as well as appearing in the deps. Gating keeps a disabled cell
  // from arming `useRunWhenVisible` while hidden, which would spend two state updates on activation
  // to run a body that returns immediately — once per cell, and every cell hosts an editor. Listing
  // it means re-enabling also re-arms, rather than leaving the refs holding positions measured
  // before the hook was switched on.
  useEffect(() => {
    if (!isEnabled) return;
    appliedScrollTopRef.current = undefined;
    hasStoodDownRef.current = false;
    requestScroll();
  }, [isEnabled, targetReference, requestScroll]);

  // The reference usually changes before the chapter it points into has rendered, and in the
  // aligned view each column arrives separately, so re-check as the DOM changes. Several editors
  // mutating at once produce far more batches than there are frames, and every check reads layout —
  // a query across every verse plus three rect reads — so batches are coalesced into at most one
  // check per frame, and stop entirely once this has stood down.
  useEffect(() => {
    if (!isEnabled) return undefined;
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
  }, [isEnabled, portRef, requestScroll]);
}

export default useReferenceScroll;
