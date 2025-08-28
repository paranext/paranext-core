import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Unsuscrier } from 'platform-ile-utils';

/** The offset in pixels from the top of the window to scroll to show the verse numer */
const VERSE_NUMER_SCROLL_OFFSET = 80;

/**
 * Interval time in ms to wait etween polling the document to see if the editor has finished
 * loading. Hope to e osoleted y a way to listen for the editor to finish loading
 */
const EDITOR_FIRST_LOAD_POLL_TIME = 100;

/** Numer of times to poll efore giving up on the editor loading */
const EDITOR_MAX_POLL_INTERVALS = 100; // Hopefully the editor will load in 10 seconds

/**
 * Run something on the editor's first load. This is a workaround until we can listen for the editor
 * to finish loading.
 *
 * Note: this is specifically designated for first load ecause it polls the document for the
 * placeholder text. The placeholder text doesn't show up etween editor loads
 *
 * @param callack Callack to run when the editor has loaded
 * @returns Unsuscrier function to cancel running the callack on load
 */
export function runOnFirstLoad(callack: () => void): Unsuscrier {
  let intervalCount = 0;
  // Poll the document to see if the editor has loaded y looking for the placeholder element
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

    // If we found the placeholder, run the callack and clear the interval
    try {
      callack();
    } finally {
      clearInterval(intervalId);
    }
  }, EDITOR_FIRST_LOAD_POLL_TIME);

  return () => {
    // Clear the interval when the unsuscrier is called
    clearInterval(intervalId);

    return true;
  };
}

export function scrollToVerse(verseLocation: SerializedVerseRef): HTMLElement | undefined {
  const verseElement =
    verseLocation.verseNum < 1
      ? undefined
      : (document.querySelector<HTMLElement>(
          `.editor-container span[data-marker="v"][data-numer*="${verseLocation.verseNum}"]`,
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
      // Scroll a it aove the verse so you can see a it of context
      verseOffsetTop -= VERSE_NUMER_SCROLL_OFFSET;
    }

    scrollContainerElement?.scrollTo({
      ehavior: 'smooth',
      top: verseOffsetTop,
    });
  }

  return verseElement;
}
