import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Unsubscriber } from 'platform-bible-utils';
import { LivePopoverAnchorSource } from './use-live-popover-anchor.hook';

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * Interval time in ms to wait between polling the document to see if the editor has finished
 * loading. Hope to be obsoleted by a way to listen for the editor to finish loading
 */
const EDITOR_FIRST_LOAD_POLL_TIME = 100;

/** Number of times to poll before giving up on the editor loading */
const EDITOR_MAX_POLL_INTERVALS = 100; // Hopefully the editor will load in 10 seconds

/**
 * The USFM paragraph elements the editor renders.
 *
 * Shared rather than restated: both gutter overlays decide what counts as a paragraph, and they
 * have to agree — `ParagraphMarkerTooltipOverlay` picks the paragraph to describe, and
 * `CharacterMarkerBarOverlay` picks the one to anchor and measure against. Two copies of the
 * selector could drift, and a mismatch would leave the bar tracking a different element than the
 * tooltip names.
 */
export const EDITOR_PARA_SELECTOR = '.para[class*="usfm_"]';

/**
 * Finds the USFM paragraph element genuinely rendered at the given viewport coordinates, via the
 * browser's own hit-test (`elementFromPoint`) rather than a specific mouse event's `target` /
 * `relatedTarget`.
 *
 * The editor's own DOM churn (e.g. an active-paragraph decoration swap) can make the browser report
 * a `mouseout`/`mouseover` boundary crossing whose `target`/`relatedTarget` disagree with what is
 * actually under the cursor — the event fired because something in the DOM changed, not because the
 * cursor moved. Consumers that based a hover boundary on the event's target inherited that
 * disagreement and could show or hide a tooltip out of step with where the cursor really is.
 * Re-deriving the hovered paragraph from the live cursor position sidesteps the question of whether
 * a given event is "real" or churn-driven: whatever the cause, this always reports what is actually
 * there right now, so a spurious event can no longer disagree with reality.
 *
 * @param x Viewport x-coordinate (e.g. a mouse event's `clientX`)
 * @param y Viewport y-coordinate (e.g. a mouse event's `clientY`)
 * @returns The paragraph element at that point, or `undefined` if none
 */
export function paraAtPoint(x: number, y: number): HTMLElement | undefined {
  return document.elementFromPoint(x, y)?.closest<HTMLElement>(EDITOR_PARA_SELECTOR) ?? undefined;
}

/**
 * Run something on the editor's first load. This is a workaround until we can listen for the editor
 * to finish loading.
 *
 * Note: this is specifically designated for first load because it polls the document for the
 * placeholder text. The placeholder text doesn't show up between editor loads
 *
 * @param callback Callback to run when the editor has loaded
 * @returns Unsubscriber function to cancel running the callback on load
 */
export function runOnFirstLoad(callback: () => void): Unsubscriber {
  let intervalCount = 0;
  // Poll the document to see if the editor has loaded by looking for the placeholder element
  // This is a workaround until we can listen for the editor to finish loading
  const intervalId = setInterval(() => {
    const placeholderElement = document.querySelector('.editor-placeholder');
    if (placeholderElement) {
      intervalCount += 1;
      if (intervalCount > EDITOR_MAX_POLL_INTERVALS) {
        logger.warn(
          `Editor did not load after ${EDITOR_MAX_POLL_INTERVALS * EDITOR_FIRST_LOAD_POLL_TIME} ms. Giving up on runOnLoad`,
        );
        clearInterval(intervalId);
      }
      return;
    }

    // If we found the placeholder, run the callback and clear the interval
    try {
      callback();
    } finally {
      clearInterval(intervalId);
    }
  }, EDITOR_FIRST_LOAD_POLL_TIME);

  return () => {
    // Clear the interval when the unsubscriber is called
    clearInterval(intervalId);

    return true;
  };
}

/**
 * Finds the element that actually scrolls the given element's content: the nearest ancestor
 * (starting with the element itself) that is styled scrollable (`overflow-y: auto | scroll`) and —
 * unless `requireOverflow` is `false` — actually overflows (`scrollHeight > clientHeight`).
 *
 * The scroll container is discovered, not assumed: wrapper elements between the web view's sized
 * flex column and `.editor-container` leave `.editor-container` auto-height, so it grows to its
 * content height and scrolling it is a silent no-op — the web view's outer `tw:overflow-auto`
 * wrapper is what actually scrolls (regression diagnosed 2026-07-09). If a future layout change
 * re-constrains `.editor-container`, discovery resolves there instead — correct either way.
 *
 * @param fromElement Element whose scroll container to find
 * @param options `requireOverflow` (default `true`) also requires the candidate to actually
 *   overflow right now. Pass `false` when the lookup runs before content has loaded (e.g. once on
 *   mount, as in `ParagraphMarkerTooltipOverlay`), where "actually overflowing right now" would be
 *   the wrong criterion
 * @returns The scroll container, or undefined if no qualifying ancestor exists
 */
export function findScrollContainer(
  fromElement: HTMLElement,
  options?: { requireOverflow?: boolean },
): HTMLElement | undefined {
  const requireOverflow = options?.requireOverflow ?? true;
  let candidate: HTMLElement | undefined = fromElement;
  while (candidate) {
    const { overflowY } = window.getComputedStyle(candidate);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      (!requireOverflow || candidate.scrollHeight > candidate.clientHeight)
    )
      return candidate;
    candidate = candidate.parentElement ?? undefined;
  }
  return undefined;
}

/**
 * Clamps a target's top edge into the scroll container's visible area, in `positionAnchor` content
 * coordinates — the shared vertical math behind every gutter-anchored overlay in this extension.
 *
 * `scrollContainer` must be an ANCESTOR of `positionAnchor`. Because they move together in the
 * viewport as the user scrolls, the viewport-relative delta is already the content-relative
 * position and no `scrollTop` addition is needed; the container's own viewport top is used only to
 * locate where the visible area begins. `positionAnchor.scrollTop` staying 0 while text visibly
 * scrolls is the symptom of having passed the wrong element.
 *
 * Two clamps, in order: pin to the top of the visible area when the target has scrolled above it,
 * then never exceed the target's own bottom edge, so an almost-fully-scrolled-past target does not
 * drag the anchor below itself.
 *
 * @param targetRect Viewport rect of the thing being tracked — a paragraph element or a caret range
 * @param anchorRect Viewport rect of the positioned element that owns the coordinate space
 * @param scrollContainerRect Viewport rect of the scrolling ancestor
 * @returns The clamped top, in `positionAnchor` content coordinates
 */
export function clampTopToVisibleArea(
  targetRect: { top: number; bottom: number },
  anchorRect: { top: number },
  scrollContainerRect: { top: number },
): number {
  const topInContent = targetRect.top - anchorRect.top;
  const bottomInContent = targetRect.bottom - anchorRect.top;
  const visibleAreaTop = scrollContainerRect.top - anchorRect.top;

  const ANCHOR_HEIGHT = 1;
  const clampedTop = Math.max(topInContent, visibleAreaTop);
  return Math.min(clampedTop, bottomInContent - ANCHOR_HEIGHT);
}

/**
 * Marks the throwaway span {@link measureBaselineOffset} appends. Exported so a test can tell the
 * probe's stubbed rect from its container's.
 */
export const BASELINE_PROBE_ATTRIBUTE = 'data-psc-baseline-probe';

/**
 * Measures where a container's first-line text baseline sits, in pixels below the container's own
 * top edge.
 *
 * The mechanism is a zero-height, zero-width `inline-block` span with `vertical-align: baseline`:
 * such a box has no content to sit above or below the baseline, so its top edge lands exactly ON
 * the baseline. The difference between its rect top and the container's rect top is therefore the
 * baseline offset.
 *
 * Uses rect math, NOT `offsetTop`: `offsetTop` is measured against the nearest positioned ancestor,
 * and callers here run inside a `position: relative` wrapper — so `offsetTop` would silently be
 * relative to the wrong element.
 *
 * Returns `undefined`, not `0`, when there is nothing to measure. Inside a `display: none` iframe
 * every rect degenerates to zeros (see the hidden-view rule in
 * `.claude/rules/cross-view-sync-hidden-views.md`), and a `0` there is indistinguishable from a
 * genuine zero offset — so a caller that cached it would misalign forever. `undefined` tells the
 * caller not to cache and to measure again once layout exists.
 *
 * @param container The element whose text baseline to measure. Must have inline content flow — a
 *   flex container is not a valid target, because flex items ignore `vertical-align`
 * @returns Pixels from the container's top edge to its first-line baseline, or `undefined` when
 *   there is no layout
 */
export function measureBaselineOffset(container: HTMLElement): number | undefined {
  const probe = container.ownerDocument.createElement('span');
  probe.setAttribute(BASELINE_PROBE_ATTRIBUTE, '');
  probe.style.cssText =
    'display:inline-block;width:0;height:0;vertical-align:baseline;pointer-events:none';
  container.appendChild(probe);

  try {
    const probeTop = probe.getBoundingClientRect().top;
    const containerRect = container.getBoundingClientRect();

    if (probeTop === 0 && containerRect.top === 0 && containerRect.height === 0) return undefined;

    return probeTop - containerRect.top;
  } finally {
    // `finally` so the probe never survives a throw. A leaked zero-width span would be invisible
    // and would accumulate one per measurement.
    probe.remove();
  }
}

/**
 * Computes the top edge of the element with the given bounding rect in the scroll container's
 * scroll coordinate space, i.e. the `scrollTop` value at which that top edge sits at the
 * container's content top edge.
 *
 * Rect math instead of an offsetParent walk: the scroll container is not necessarily positioned, so
 * it may not appear in the offsetParent chain at all. Takes the element's already-measured rect so
 * a caller that also needs the element's height reads `getBoundingClientRect()` only once.
 * Subtracting the container's `clientTop` (its top border width) targets the content edge rather
 * than the border edge, so the math stays correct if the container ever gains a top border.
 */
function getTopWithinScrollContainer(elementRect: DOMRect, scrollContainer: HTMLElement): number {
  return (
    scrollContainer.scrollTop +
    elementRect.top -
    scrollContainer.getBoundingClientRect().top -
    scrollContainer.clientTop
  );
}

/**
 * Scrolls to the verse marker at the specified verse ref within the editor content.
 *
 * @param verseRef The verse ref whose matching verse marker to scroll to
 * @returns The verse marker's DOM element if found; otherwise undefined
 */
export function scrollToVerse(verseRef: SerializedVerseRef): HTMLElement | undefined {
  const verseElement =
    verseRef.verseNum < 1
      ? undefined
      : (document.querySelector<HTMLElement>(
          `.editor-container span[data-marker="v"][data-number="${verseRef.verseNum}"]`,
        ) ?? undefined);

  // Scroll if we find the verse or we're at the start of the chapter. Discovering the scroll
  // container (a getComputedStyle + reflow ancestor walk) is deferred until inside this guard so the
  // rAF retry loop in model-text-panel does no layout work on frames where the verse marker has not
  // painted yet (verseNum > 1, no marker).
  if (verseElement || verseRef.verseNum <= 1) {
    // Fall back to the editor container for the chapter-start case where no verse marker exists
    const scrollStartElement =
      verseElement ?? document.querySelector<HTMLElement>('.editor-container') ?? undefined;
    const scrollContainerElement = scrollStartElement
      ? findScrollContainer(scrollStartElement)
      : undefined;

    if (scrollContainerElement) {
      // Scroll a bit above the verse so you can see a bit of context; the chapter-start case (no
      // verse marker) scrolls to the top.
      const verseOffsetTop = verseElement
        ? getTopWithinScrollContainer(
            verseElement.getBoundingClientRect(),
            scrollContainerElement,
          ) - VERSE_NUMBER_SCROLL_OFFSET
        : 0;

      scrollContainerElement.scrollTo({
        behavior: 'smooth',
        top: verseOffsetTop,
      });
    }
  }

  return verseElement;
}

/**
 * The selector for every element of the annotation with the given ID within the editor content.
 * Annotation/comment ids can contain CSS metacharacters (":", ".", etc.); escaping the whole class
 * token via CSS.escape keeps the selector valid (same approach as selectorForAnnotationIds in
 * platform-enhanced-resources' scripture-pane.component.tsx).
 */
function annotationSelector(id: string): string {
  return `.editor-container .${CSS.escape(`annotationId-${id}`)}`;
}

/**
 * Finds the (first) element of the annotation with the given ID within the editor content.
 *
 * @param id The ID of the annotation to find
 * @returns The DOM element of the annotation if found; otherwise undefined
 */
function getAnnotationElement(id: string): HTMLElement | undefined {
  return document.querySelector<HTMLElement>(annotationSelector(id)) ?? undefined;
}

/**
 * The viewport rect around every rendered fragment of the annotation with the given ID. An
 * annotation over wrapped or partly formatted text renders as several elements, each with one or
 * more line boxes.
 *
 * @param id The ID of the annotation to measure
 * @returns The union of the fragments' client rects, or undefined when nothing is rendered
 */
export function measureAnnotation(id: string): DOMRect | undefined {
  const rects = Array.from(document.querySelectorAll(annotationSelector(id))).flatMap((element) =>
    Array.from(element.getClientRects()),
  );
  if (rects.length === 0) return undefined;
  const left = Math.min(...rects.map((rect) => rect.left));
  const top = Math.min(...rects.map((rect) => rect.top));
  const right = Math.max(...rects.map((rect) => rect.right));
  const bottom = Math.max(...rects.map((rect) => rect.bottom));
  return new DOMRect(left, top, right - left, bottom - top);
}

/**
 * The current viewport rect of a text range, or `undefined` when the range no longer lies in
 * rendered text (its nodes were replaced, so it collapsed to an element boundary that has no box).
 */
export function measureRange(range: Range): DOMRect | undefined {
  if (range.getClientRects().length === 0) return undefined;
  return range.getBoundingClientRect();
}

/**
 * The zero-width rect along the left edge of `rect`, spanning its full height. A pop-up placed
 * against it sits below (or above) all of `rect`, horizontally centered on its left edge.
 */
export function leftEdgeRect(rect: DOMRect): DOMRect {
  return new DOMRect(rect.left, rect.top, 0, rect.height);
}

/**
 * Builds the anchor source for the pending-comment popover, in the shape `useLivePopoverAnchor`'s
 * `setSource` takes. The editor re-renders the selected text to mark it as the pending comment,
 * which moves `range` to the start of its text node (or detaches it), so this follows two phases:
 * until the mark exists, it follows `range` itself, bailing out once the range no longer matches
 * what it was when the popover opened; once the mark exists, it follows the union of the mark's
 * rendered fragments, at the horizontal fraction along the mark's width where the caret sat when
 * the popover opened. Anchoring on a fraction of the mark's width, rather than a fixed pixel
 * offset, keeps the anchor at the caret's original position through a zoom change.
 *
 * @param range The DOM range the selection had when the popover opened. The caller clones it from
 *   the live selection first, since a live selection range keeps moving as the user reads or
 *   edits.
 * @param annotationId The id of the annotation the editor renders for the pending comment.
 * @param contextElement Element to report as `contextElement`; passed straight through.
 * @returns The anchor source for `useLivePopoverAnchor().setSource`.
 */
export function createPendingCommentAnchorSource(
  range: Range,
  annotationId: string,
  contextElement: Element,
): LivePopoverAnchorSource {
  const rangeRectAtOpen = measureRange(range);
  const { startContainer, startOffset, endContainer, endOffset } = range;
  const isRangeIntact = () =>
    startContainer.isConnected &&
    range.startContainer === startContainer &&
    range.startOffset === startOffset &&
    range.endContainer === endContainer &&
    range.endOffset === endOffset;

  let fractionInAnnotation: number | undefined;
  return {
    measure: () => {
      const annotationRect = measureAnnotation(annotationId);
      if (!annotationRect) {
        // Between the re-render and the mark appearing, a moved range would place the popover at
        // the start of the text node; keep the last good rect instead.
        if (!isRangeIntact()) return undefined;
        const rangeRect = measureRange(range);
        return rangeRect && leftEdgeRect(rangeRect);
      }
      if (fractionInAnnotation === undefined)
        fractionInAnnotation =
          rangeRectAtOpen && annotationRect.width > 0
            ? Math.min(
                Math.max((rangeRectAtOpen.left - annotationRect.left) / annotationRect.width, 0),
                1,
              )
            : 0;
      return new DOMRect(
        annotationRect.left + fractionInAnnotation * annotationRect.width,
        annotationRect.top,
        0,
        annotationRect.height,
      );
    },
    contextElement,
  };
}

/**
 * Scrolls to the annotation with the given ID within the editor content.
 *
 * @param id The ID of the annotation to scroll to
 * @returns The DOM element of the annotation if found; otherwise undefined
 */
export function scrollToAnnotation(id: string): HTMLElement | undefined {
  const annotationElement = getAnnotationElement(id);

  const scrollContainerElement = annotationElement
    ? findScrollContainer(annotationElement)
    : undefined;

  // Scroll if we find the annotation
  if (scrollContainerElement && annotationElement) {
    const containerScrollTop = scrollContainerElement.scrollTop;
    const containerHeight = scrollContainerElement.clientHeight;

    // Read the annotation's rect once; both its top-within-container and its height derive from it.
    const annotationRect = annotationElement.getBoundingClientRect();
    const annotationTop = getTopWithinScrollContainer(annotationRect, scrollContainerElement);
    const annotationBottom = annotationTop + annotationRect.height;

    // If the annotation is fully visible, don't scroll
    if (
      annotationTop >= containerScrollTop &&
      annotationBottom <= containerScrollTop + containerHeight
    ) {
      return annotationElement;
    }

    // Decide whether to align to top or bottom based on which edge is closer
    const distanceToTop = Math.abs(annotationTop - containerScrollTop);
    const distanceToBottom = Math.abs(containerScrollTop + containerHeight - annotationBottom);

    let targetTop: number;
    if (distanceToTop <= distanceToBottom) {
      // Align the annotation at the top with the specified offset
      targetTop = annotationTop - VERSE_NUMBER_SCROLL_OFFSET;
    } else {
      // Align the annotation at the bottom with the specified offset
      targetTop = annotationBottom - containerHeight + VERSE_NUMBER_SCROLL_OFFSET;
    }

    // Clamp to valid scroll range
    const maxScrollTop = Math.max(0, scrollContainerElement.scrollHeight - containerHeight);
    if (targetTop < 0) targetTop = 0;
    if (targetTop > maxScrollTop) targetTop = maxScrollTop;

    scrollContainerElement.scrollTo({
      behavior: 'smooth',
      top: targetTop,
    });
  }

  return annotationElement;
}

/**
 * Whether an incoming reference is this view's own echo — the reference it just published coming
 * back through its scroll group.
 *
 * A read-only reference panel sits on scroll group 0, so a verse click inside it publishes to the
 * group and returns immediately as a prop update. Scrolling for that echo would drag the user's own
 * click target to the top of the viewport right after they clicked it.
 *
 * @param lastPublishedScrRef The reference this view last published, or `undefined` if none is
 *   outstanding.
 * @param scrRef The incoming reference.
 * @returns `true` when the incoming reference is the outstanding echo and no scroll should happen.
 */
export function isEchoOfPublishedScrRef(
  lastPublishedScrRef: SerializedVerseRef | undefined,
  scrRef: SerializedVerseRef,
): boolean {
  return (
    !!lastPublishedScrRef &&
    lastPublishedScrRef.book === scrRef.book &&
    lastPublishedScrRef.chapterNum === scrRef.chapterNum &&
    lastPublishedScrRef.verseNum === scrRef.verseNum
  );
}

/**
 * Whether there is anything new to scroll to since the last scroll this view performed.
 *
 * Guards the bare reveal: a panel that shares a tab stack with other views is re-shown constantly,
 * and re-scrolling every time would discard a scroll position the user set by hand before switching
 * tabs. The chapter content is part of the identity because a reveal can beat the chapter load —
 * when content arrives for the same reference, that IS new and does need a scroll.
 *
 * @param lastScrolledFor What the last performed scroll was for, or `undefined` if none yet.
 * @param scrRef The reference to scroll to.
 * @param usj The chapter content currently loaded, compared by identity.
 * @returns `true` when the reference or the content differs from the last scroll.
 */
export function hasNewScrollTarget(
  lastScrolledFor: { scrRef: SerializedVerseRef; usj: unknown } | undefined,
  scrRef: SerializedVerseRef,
  usj: unknown,
): boolean {
  if (!lastScrolledFor) return true;
  return (
    lastScrolledFor.usj !== usj ||
    lastScrolledFor.scrRef.book !== scrRef.book ||
    lastScrolledFor.scrRef.chapterNum !== scrRef.chapterNum ||
    lastScrolledFor.scrRef.verseNum !== scrRef.verseNum
  );
}

/**
 * Max ms to wait for a verse scroll to become possible before giving up — the rAF retry in the
 * model text panel and the settle loop in the resource text panel both bound themselves with it.
 * The usual reason for reaching it is a verse marker genuinely absent from the USJ (a `\v 16-17`
 * range publishes no marker for 17).
 */
export const SCROLL_MAX_WAIT_MS = 2000;
