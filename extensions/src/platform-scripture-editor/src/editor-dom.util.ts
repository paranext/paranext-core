import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Unsubscriber } from 'platform-bible-utils';

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
 * Scrolls to the annotation with the given ID within the editor content.
 *
 * @param id The ID of the annotation to scroll to
 * @returns The DOM element of the annotation if found; otherwise undefined
 */
export function scrollToAnnotation(id: string): HTMLElement | undefined {
  // annotation/comment ids can contain CSS metacharacters (":", ".", etc.); escaping the whole
  // class token via CSS.escape keeps the selector valid (same approach as selectorForAnnotationIds
  // in platform-enhanced-resources' scripture-pane.component.tsx).
  const escapedAnnotationClass = CSS.escape(`annotationId-${id}`);
  const annotationElement =
    document.querySelector<HTMLElement>(`.editor-container .${escapedAnnotationClass}`) ??
    undefined;

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
