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
