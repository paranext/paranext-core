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
import { getBookIdsFromBooksPresent } from '@renderer/utils/books-present.util';
import { WebViewId } from '@shared/models/web-view.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { settingsService } from '@shared/services/settings.service';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { CommandNames } from 'papi-shared-types';
import {
  ALL_BOOK_IDS,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
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

async function getInterfaceMode(): Promise<string> {
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
    const newRef = getNewRef(currentRef, availableBooks);
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
  'platform.goToNextVerse': makeGoToCommandHandler((scrRef) => getNextVerseRef(scrRef)),
  'platform.goToPreviousVerse': makeGoToCommandHandler((scrRef) => getPreviousVerseRef(scrRef)),
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
