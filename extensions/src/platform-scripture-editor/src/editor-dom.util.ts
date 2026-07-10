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
 * (starting with the element itself) that is styled scrollable (`overflow-y: auto | scroll`) AND
 * actually overflows (`scrollHeight > clientHeight`).
 *
 * The scroll container is discovered, not assumed: wrapper elements between the web view's sized
 * flex column and `.editor-container` leave `.editor-container` auto-height, so it grows to its
 * content height and scrolling it is a silent no-op — the web view's outer `tw:overflow-auto`
 * wrapper is what actually scrolls (regression diagnosed 2026-07-09). If a future layout change
 * re-constrains `.editor-container`, discovery resolves there instead — correct either way.
 *
 * Note: `ParagraphMarkerTooltipOverlay` keeps its own style-only walk-up (no overflow check) — it
 * attaches its scroll listener once on mount, possibly before content has loaded and made anything
 * overflow, so "actually overflowing right now" would be the wrong criterion there.
 *
 * @param fromElement Element whose scroll container to find
 * @returns The scroll container, or undefined if nothing scrollable exists (nothing to scroll)
 */
export function findScrollContainer(fromElement: HTMLElement): HTMLElement | undefined {
  let candidate: HTMLElement | undefined = fromElement;
  while (candidate) {
    const { overflowY } = window.getComputedStyle(candidate);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      candidate.scrollHeight > candidate.clientHeight
    )
      return candidate;
    candidate = candidate.parentElement ?? undefined;
  }
  return undefined;
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

  // Fall back to the editor container for the chapter-start case where no verse marker exists
  const scrollStartElement =
    verseElement ?? document.querySelector<HTMLElement>('.editor-container') ?? undefined;
  const scrollContainerElement = scrollStartElement
    ? findScrollContainer(scrollStartElement)
    : undefined;

  // Scroll if we find the verse or we're at the start of the chapter
  if (scrollContainerElement && (verseElement || verseRef.verseNum <= 1)) {
    let verseOffsetTop = 0;
    if (verseElement) {
      // Rect math instead of an offsetParent walk: the scroll container is not necessarily
      // positioned, so it may not appear in the offsetParent chain at all
      const verseRect = verseElement.getBoundingClientRect();
      const containerRect = scrollContainerElement.getBoundingClientRect();
      // Scroll a bit above the verse so you can see a bit of context
      verseOffsetTop =
        scrollContainerElement.scrollTop +
        verseRect.top -
        containerRect.top -
        VERSE_NUMBER_SCROLL_OFFSET;
    }

    scrollContainerElement.scrollTo({
      behavior: 'smooth',
      top: verseOffsetTop,
    });
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
  const annotationElement =
    document.querySelector<HTMLElement>(`.editor-container .annotationId-${id}`) ?? undefined;

  const scrollContainerElement = annotationElement
    ? findScrollContainer(annotationElement)
    : undefined;

  // Scroll if we find the annotation
  if (scrollContainerElement && annotationElement) {
    // Rect math instead of an offsetParent walk — see scrollToVerse
    const annotationRect = annotationElement.getBoundingClientRect();
    const containerRect = scrollContainerElement.getBoundingClientRect();

    const containerScrollTop = scrollContainerElement.scrollTop;
    const containerHeight = scrollContainerElement.clientHeight;

    const annotationTop = containerScrollTop + annotationRect.top - containerRect.top;
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
