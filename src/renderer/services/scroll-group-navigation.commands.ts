import {
  getBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';
import {
  getScrRefForProject,
  getScrRefSync,
  setScrRefSync,
} from '@renderer/services/scroll-group.service-host';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-host';
import {
  getLastSelectedScriptureNavigableWebViewId,
  getNavigationTargetWebView,
} from '@renderer/services/window.service-host';
import {
  findAdjacentPresentBook,
  getBookIdsFromBooksPresent,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  ScriptureBounds,
} from 'platform-bible-utils/experimental';
import { WebViewId } from '@shared/models/web-view.model';
import { getWebViewIdFromFocusSubject } from '@shared/services/window.service-model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { windowService } from '@shared/services/window.service';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { CommandNames } from 'papi-shared-types';
import { ALL_BOOK_IDS } from 'platform-bible-react/experimental';
import { getErrorMessage, Mutex } from 'platform-bible-utils';

/**
 * What a navigation command mutates: the resolved target web view's scroll group ref (or its
 * detached ref) and project
 */
type NavigationTarget = {
  /**
   * The resolved web view (tracked last-selected web view or, failing that, the main project
   * editor) — needed to write a detached ref back
   */
  webViewId: WebViewId;
  scrollGroupScrRef: ScrollGroupScrRef;
  /** The resolved web view's project — versification frame for reads and writes */
  projectId?: string;
};

function resolveNavigationTarget(): NavigationTarget | undefined {
  // The window service resolves the target and keeps it current from web view lifecycle events —
  // the same value the top toolbar mirrors, so the two can never disagree
  const target = getNavigationTargetWebView();
  if (!target) return undefined;

  return {
    webViewId: target.id,
    scrollGroupScrRef: target.definition.scrollGroupScrRef ?? 0,
    projectId: target.definition.projectId,
  };
}

async function getCurrentRef(target: NavigationTarget): Promise<SerializedVerseRef> {
  if (typeof target.scrollGroupScrRef !== 'number') return target.scrollGroupScrRef;
  return target.projectId
    ? getScrRefForProject(target.scrollGroupScrRef, target.projectId)
    : getScrRefSync(target.scrollGroupScrRef);
}

async function getAvailableBooks(projectId: string | undefined): Promise<string[]> {
  if (!projectId) return ALL_BOOK_IDS;
  try {
    const projectDataProvider = await papiFrontendProjectDataProviderService.get(
      PROJECT_INTERFACE_PLATFORM_BASE,
      projectId,
    );
    const booksPresent = await projectDataProvider.getSetting('platformScripture.booksPresent');
    // A non-empty flag string is authoritative even when it marks NO books present (all zeros —
    // e.g. a newly created project): the book picker UI shows the same empty list for it, and the
    // commands must not disagree with the picker by substituting the full canon. Fall back to the
    // canon only when there is no usable data at all.
    if (typeof booksPresent === 'string' && booksPresent.length > 0)
      return getBookIdsFromBooksPresent(booksPresent);
  } catch (e) {
    logger.debug(
      `Navigation command falling back to all books for project ${projectId}: ${getErrorMessage(e)}`,
    );
  }
  return ALL_BOOK_IDS;
}

/**
 * Starts acquiring the versification project data provider for a project (per-chapter verse
 * counts). Split out so the acquisition can begin concurrently with other round trips — it depends
 * only on the project id.
 */
function acquireVersificationPdp(projectId: string) {
  return papiFrontendProjectDataProviderService.get('platformScripture.Versification', projectId);
}

/**
 * Builds versification-aware chapter/verse bounds for `scrRef`'s neighborhood by prefetching the
 * project's final-verse-per-chapter arrays from the `platformScripture.Versification` provider —
 * the current book always, plus (for backward navigation only) the closest previous present book
 * when the current position can roll back into it (at chapter ≤ 1, or when the current book is not
 * in `availableBooks`). Forward navigation only ever lands on the START of the next book (chapter 1
 * verse 1), which needs no versification, so it skips the previous-book prefetch. Fetched fresh per
 * command so in-session versification changes are honored without subscription bookkeeping.
 *
 * Returns `undefined` (versification-unaware navigation, e.g. verses do not roll across chapters)
 * when the provider is unavailable. A book whose fetch fails is simply unknown to the returned
 * bounds — the other books' fetches still apply.
 */
async function getScriptureBounds(
  versificationPdpPromise: ReturnType<typeof acquireVersificationPdp>,
  projectId: string,
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  needsPreviousBook: boolean,
): Promise<ScriptureBounds | undefined> {
  try {
    const versificationPdp = await versificationPdpPromise;

    const booksToFetch = [scrRef.book];
    if (needsPreviousBook && (scrRef.chapterNum <= 1 || !availableBooks.includes(scrRef.book))) {
      const previousBook = findAdjacentPresentBook(scrRef.book, availableBooks, 'previous');
      if (previousBook) booksToFetch.push(previousBook);
    }

    // Index n of each array is the last verse of chapter n; index 0 is filler, so length - 1 is
    // the book's last chapter. allSettled so one book's failed fetch does not throw away another
    // book's successful one (e.g. the current book's rollover must survive a failed previous-book
    // prefetch).
    const endVersesByBook = new Map<string, number[]>();
    const settledFetches = await Promise.allSettled(
      booksToFetch.map(async (book) => ({
        book,
        endVerses: await versificationPdp.getFinalVerseNumbersInBook(Canon.bookIdToNumber(book)),
      })),
    );
    settledFetches.forEach((settledFetch) => {
      if (settledFetch.status === 'fulfilled')
        endVersesByBook.set(settledFetch.value.book, settledFetch.value.endVerses);
      else
        logger.debug(
          `Navigation command could not get verse counts for a book in project ${projectId}: ${getErrorMessage(settledFetch.reason)}`,
        );
    });
    if (endVersesByBook.size === 0) return undefined;

    return {
      getEndChapter: (book) => {
        const endVerses = endVersesByBook.get(book);
        return endVerses ? endVerses.length - 1 : undefined;
      },
      getEndVerse: (book, chapterNum) => endVersesByBook.get(book)?.[chapterNum],
    };
  } catch (e) {
    logger.debug(
      `Navigation command falling back to versification-unaware navigation for project ${projectId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

function writeNewRef(target: NavigationTarget, newRef: SerializedVerseRef): void {
  if (typeof target.scrollGroupScrRef === 'number') {
    setScrRefSync(target.scrollGroupScrRef, newRef, target.projectId);
    return;
  }
  try {
    updateWebViewDefinitionSync(target.webViewId, { scrollGroupScrRef: newRef });
  } catch (e) {
    logger.warn(
      `Navigation command could not update detached ref on ${target.webViewId}: ${getErrorMessage(e)}`,
    );
  }
}

/**
 * Serializes go-to command executions. Each run reads the current ref, awaits several network round
 * trips, then writes the stepped ref — so overlapping runs (e.g. holding a shortcut key, whose
 * auto-repeat sends one command per repeat) would read the same starting ref and lose steps, and a
 * slow earlier run could write its stale result after a newer one, stepping backward. Running each
 * behind the previous one (the mutex is FIFO) makes N presses advance exactly N steps, in order.
 */
const navigationCommandMutex = new Mutex();

function makeGoToCommandHandler(
  getNewRef: (
    scrRef: SerializedVerseRef,
    availableBooks: string[],
    bounds?: ScriptureBounds,
  ) => SerializedVerseRef | undefined,
  {
    // Book navigation (getNextBookRef/getPreviousBookRef) never reads chapter/verse bounds, so
    // those commands skip the versification prefetch round trips entirely
    needsBounds = true,
    // Backward navigation (previous chapter/verse) can roll into the closest previous present book,
    // whose verse counts must be prefetched too; forward navigation never reads them (see
    // getScriptureBounds)
    needsPreviousBook = false,
  }: { needsBounds?: boolean; needsPreviousBook?: boolean } = {},
): () => Promise<void> {
  return () =>
    navigationCommandMutex.runExclusive(async () => {
      const target = resolveNavigationTarget();
      if (!target) {
        logger.debug('Navigation command ignored: no active web view to navigate');
        return;
      }

      // Start acquiring the versification provider right away — it depends only on the project
      // id, so it can resolve concurrently with the current-ref and books-present round trips
      // below instead of serializing after them
      const versificationPdpPromise =
        needsBounds && target.projectId ? acquireVersificationPdp(target.projectId) : undefined;
      // Mark an early rejection as handled so it cannot surface as an unhandled rejection while
      // the round trips below are still in flight; the failure is actually handled (with a debug
      // log and versification-unaware fallback) where getScriptureBounds awaits this promise
      versificationPdpPromise?.catch(() => {});

      const [currentRef, availableBooks] = await Promise.all([
        getCurrentRef(target),
        getAvailableBooks(target.projectId),
      ]);
      const bounds =
        versificationPdpPromise && target.projectId
          ? await getScriptureBounds(
              versificationPdpPromise,
              target.projectId,
              currentRef,
              availableBooks,
              needsPreviousBook,
            )
          : undefined;
      const newRef = getNewRef(currentRef, availableBooks, bounds);
      if (!newRef) return;
      writeNewRef(target, newRef);
    });
}

/**
 * Gets the web view id of the currently focused subject, if focus is on a web view or a web view's
 * tab. Used by {@link openBookChapterControl} to prefer the focused tab's own BookChapterControl
 * over the tracked last-selected web view, e.g. when focus has moved to a dialog or another
 * non-web-view tab that itself isn't scripture-navigable.
 */
async function getFocusedWebViewId(): Promise<WebViewId | undefined> {
  try {
    const focusSubject = await windowService.getFocus();
    return focusSubject ? getWebViewIdFromFocusSubject(focusSubject) : undefined;
  } catch (e) {
    logger.warn(
      `platform.openBookChapterControl could not read current focus: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Opens a BookChapterControl to let the user pick a new reference, preferring — in order — (a) the
 * currently focused web view's own control, (b) the tracked last-selected web view's control, (c)
 * the top toolbar's control. No-ops if none of those has a registered control.
 */
async function openBookChapterControl(): Promise<void> {
  const focusedWebViewId = await getFocusedWebViewId();
  let handle = focusedWebViewId ? getBookChapterControlHandle(focusedWebViewId) : undefined;

  if (!handle) {
    const trackedWebViewId = getLastSelectedScriptureNavigableWebViewId();
    if (trackedWebViewId) handle = getBookChapterControlHandle(trackedWebViewId);
  }

  handle = handle ?? getBookChapterControlHandle(TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID);
  if (!handle) {
    logger.debug('platform.openBookChapterControl ignored: no BookChapterControl is available');
    return;
  }
  handle.open();
}

/** Handlers by command name. Exported for testing */
export const navigationCommandHandlers: {
  [commandName in Extract<
    CommandNames,
    | 'platform.goToNextChapter'
    | 'platform.goToPreviousChapter'
    | 'platform.goToNextBook'
    | 'platform.goToPreviousBook'
    | 'platform.goToNextVerse'
    | 'platform.goToPreviousVerse'
    | 'platform.openBookChapterControl'
  >]: () => Promise<void>;
} = {
  'platform.goToNextChapter': makeGoToCommandHandler(getNextChapterRef),
  'platform.goToPreviousChapter': makeGoToCommandHandler(getPreviousChapterRef, {
    needsPreviousBook: true,
  }),
  'platform.goToNextBook': makeGoToCommandHandler(getNextBookRef, { needsBounds: false }),
  'platform.goToPreviousBook': makeGoToCommandHandler(getPreviousBookRef, { needsBounds: false }),
  'platform.goToNextVerse': makeGoToCommandHandler(getNextVerseRef),
  'platform.goToPreviousVerse': makeGoToCommandHandler(getPreviousVerseRef, {
    needsPreviousBook: true,
  }),
  'platform.openBookChapterControl': openBookChapterControl,
};

/** Registers the PT-4032 navigation commands. Call once at renderer startup */
export async function startScrollGroupNavigationCommands(): Promise<void> {
  await Promise.all(
    Object.entries(navigationCommandHandlers).map(([commandName, handler]) =>
      // Object.entries widens the key to string; the map above pins each name to its handler type
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      registerCommand(commandName as CommandNames, handler),
    ),
  );
}
