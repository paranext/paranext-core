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
    callback();
    clearInterval(intervalId);
  }, EDITOR_FIRST_LOAD_POLL_TIME);

  return () => {
    // Clear the interval when the unsubscriber is called
    clearInterval(intervalId);

    return true;
  };
}

export function scrollToVerse(verseLocation: SerializedVerseRef): HTMLElement | undefined {
  const verseElement =
    verseLocation.verseNum < 1
      ? undefined
      : (document.querySelector<HTMLElement>(
          `.editor-container span[data-marker="v"][data-number*="${verseLocation.verseNum}"]`,
        ) ?? undefined);

  const scrollContainerElement =
    document.querySelector<HTMLElement>('.editor-container') ?? undefined;

  // Scroll if we find the verse or we're at the start of the chapter
  if (scrollContainerElement && (verseElement || verseLocation.verseNum <= 1)) {
    // Get the scroll position all the way up to the scroll container
    let offsetElement = verseElement;
    // If we're at the first verse, scroll to the top so we can see intro material
    let verseOffsetTop = 0;
    if (verseLocation.verseNum > 1) {
      // Find the y offset from the scrolling container
      while (offsetElement && offsetElement !== scrollContainerElement) {
        verseOffsetTop += offsetElement.offsetTop;
        offsetElement =
          offsetElement.offsetParent instanceof HTMLElement
            ? offsetElement.offsetParent
            : undefined;
      }
      // Scroll a bit above the verse so you can see a bit of context
      verseOffsetTop -= VERSE_NUMBER_SCROLL_OFFSET;
    }

    scrollContainerElement?.scrollTo({
      behavior: 'smooth',
      top: verseOffsetTop,
    });
  }

  return verseElement;
}
