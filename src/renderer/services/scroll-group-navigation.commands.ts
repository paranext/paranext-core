import {
  getBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';
import {
  getScrRefForProject,
  getScrRefSync,
  setScrRefSync,
} from '@renderer/services/scroll-group.service-host';
import {
  getSavedWebViewDefinitionSync,
  updateWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';
import { getLastSelectedWebViewId } from '@renderer/services/window.service-host';
import { getBookIdsFromBooksPresent } from 'platform-bible-utils/experimental';
import { WebViewId } from '@shared/models/web-view.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { settingsService } from '@shared/services/settings.service';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { CommandNames, SettingTypes } from 'papi-shared-types';
import {
  ALL_BOOK_IDS,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  ScriptureBounds,
} from 'platform-bible-react/experimental';
import { getErrorMessage } from 'platform-bible-utils';

/** What a navigation command mutates: the active tab's scroll group ref (power) or group 0 (simple) */
type NavigationTarget = {
  /** Set in power mode: the active web view (needed to write a detached ref back) */
  webViewId?: WebViewId;
  scrollGroupScrRef: ScrollGroupScrRef;
  /** The active web view's project — versification frame for reads and writes */
  projectId?: string;
};

async function getInterfaceMode(): Promise<SettingTypes['platform.interfaceMode']> {
  try {
    return await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(`Navigation command could not read interface mode: ${getErrorMessage(e)}`);
    return 'simple';
  }
}

async function resolveNavigationTarget(): Promise<NavigationTarget | undefined> {
  if ((await getInterfaceMode()) !== 'power') return { scrollGroupScrRef: 0 };

  const webViewId = getLastSelectedWebViewId();
  if (!webViewId) return undefined;

  let definition;
  try {
    definition = getSavedWebViewDefinitionSync(webViewId);
  } catch (e) {
    logger.warn(
      `Navigation command could not get web view definition for ${webViewId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
  if (!definition) return undefined;

  return {
    webViewId,
    scrollGroupScrRef: definition.scrollGroupScrRef ?? 0,
    projectId: definition.projectId,
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
    if (typeof booksPresent === 'string' && booksPresent.includes('1'))
      return getBookIdsFromBooksPresent(booksPresent);
  } catch (e) {
    logger.debug(
      `Navigation command falling back to all books for project ${projectId}: ${getErrorMessage(e)}`,
    );
  }
  return ALL_BOOK_IDS;
}

/**
 * Builds versification-aware chapter/verse bounds for `scrRef`'s neighborhood by prefetching the
 * project's final-verse-per-chapter arrays from the `platformScripture.Versification` provider —
 * the current book always, plus the previous available book when at chapter ≤ 1 (previous
 * verse/chapter may roll into it). Fetched fresh per command so in-session versification changes
 * are honored without subscription bookkeeping.
 *
 * Returns `undefined` (versification-unaware navigation, e.g. verses do not roll across chapters)
 * when there is no project or the provider is unavailable.
 */
async function getScriptureBounds(
  projectId: string | undefined,
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): Promise<ScriptureBounds | undefined> {
  if (!projectId) return undefined;
  try {
    const versificationPdp = await papiFrontendProjectDataProviderService.get(
      'platformScripture.Versification',
      projectId,
    );

    const booksToFetch = [scrRef.book];
    if (scrRef.chapterNum <= 1) {
      const currentBookIndex = availableBooks.indexOf(scrRef.book);
      if (currentBookIndex > 0) booksToFetch.push(availableBooks[currentBookIndex - 1]);
    }

    // Index n of each array is the last verse of chapter n; index 0 is filler, so length - 1 is
    // the book's last chapter
    const endVersesByBook = new Map<string, number[]>();
    await Promise.all(
      booksToFetch.map(async (book) => {
        endVersesByBook.set(
          book,
          await versificationPdp.getFinalVerseNumbersInBook(Canon.bookIdToNumber(book)),
        );
      }),
    );

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
  if (!target.webViewId) return;
  try {
    updateWebViewDefinitionSync(target.webViewId, { scrollGroupScrRef: newRef });
  } catch (e) {
    logger.warn(
      `Navigation command could not update detached ref on ${target.webViewId}: ${getErrorMessage(e)}`,
    );
  }
}

function makeGoToCommandHandler(
  getNewRef: (
    scrRef: SerializedVerseRef,
    availableBooks: string[],
    bounds?: ScriptureBounds,
  ) => SerializedVerseRef | undefined,
): () => Promise<void> {
  return async () => {
    const target = await resolveNavigationTarget();
    if (!target) {
      logger.debug('Navigation command ignored: no active web view to navigate');
      return;
    }
    const [currentRef, availableBooks] = await Promise.all([
      getCurrentRef(target),
      getAvailableBooks(target.projectId),
    ]);
    const bounds = await getScriptureBounds(target.projectId, currentRef, availableBooks);
    const newRef = getNewRef(currentRef, availableBooks, bounds);
    if (!newRef) return;
    writeNewRef(target, newRef);
  };
}

async function openBookChapterControl(): Promise<void> {
  let handle;
  if ((await getInterfaceMode()) === 'power') {
    const webViewId = getLastSelectedWebViewId();
    if (webViewId) handle = getBookChapterControlHandle(webViewId);
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
  'platform.goToPreviousChapter': makeGoToCommandHandler(getPreviousChapterRef),
  'platform.goToNextBook': makeGoToCommandHandler(getNextBookRef),
  'platform.goToPreviousBook': makeGoToCommandHandler(getPreviousBookRef),
  'platform.goToNextVerse': makeGoToCommandHandler(getNextVerseRef),
  'platform.goToPreviousVerse': makeGoToCommandHandler(getPreviousVerseRef),
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
