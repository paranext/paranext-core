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
  getAllOpenWebViewDefinitionsSync,
  getSavedWebViewDefinitionSync,
  updateWebViewDefinitionSync,
} from '@renderer/services/web-view.service-host';
import { getLastSelectedWebViewId } from '@renderer/services/window.service-host';
import { getBookIdsFromBooksPresent } from 'platform-bible-utils/experimental';
import { SavedWebViewDefinition, WebViewId } from '@shared/models/web-view.model';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { windowService } from '@shared/services/window.service';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { CommandNames } from 'papi-shared-types';
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

/**
 * What a navigation command mutates: the resolved target web view's scroll group ref (or its
 * detached ref) and project
 */
type NavigationTarget = {
  /**
   * The resolved web view (tracked last-selected web view or, failing that, the main project
   * editor) — needed to write a detached ref back
   */
  webViewId?: WebViewId;
  scrollGroupScrRef: ScrollGroupScrRef;
  /** The resolved web view's project — versification frame for reads and writes */
  projectId?: string;
};

// Must match SCRIPTURE_EDITOR_WEBVIEW_TYPE in platform-scripture-editor.utils.ts. Core code
// cannot import from extension source, so this is intentionally duplicated (see the same pattern
// in `use-project-picker-data.hook.ts` and `shutdown-tasks.ts`).
const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/** A web view id paired with its current saved definition */
type ResolvedWebView = { id: WebViewId; definition: SavedWebViewDefinition };

/** Step 1 of target resolution: the tracked last-selected (scripture-navigable) web view, if any */
function resolveTrackedWebView(): ResolvedWebView | undefined {
  const webViewId = getLastSelectedWebViewId();
  if (!webViewId) return undefined;

  try {
    const definition = getSavedWebViewDefinitionSync(webViewId);
    if (!definition) return undefined;
    return { id: webViewId, definition };
  } catch (e) {
    logger.warn(
      `Navigation command could not get web view definition for ${webViewId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/**
 * Step 2 of target resolution: the "main project" editor fallback — the first open Scripture editor
 * web view with a project, same rule `useProjectPickerData` uses to find the current project. Used
 * when nothing is tracked yet (e.g. at fresh app start) but an editor is open, possibly restored on
 * a persisted scroll group other than 0.
 */
function resolveMainEditorWebView(): ResolvedWebView | undefined {
  let definitions: SavedWebViewDefinition[];
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    logger.warn(`Navigation command could not enumerate open web views: ${getErrorMessage(e)}`);
    return undefined;
  }

  const editorDefinition = definitions.find(
    (definition) =>
      definition.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && definition.projectId,
  );
  if (!editorDefinition) return undefined;
  return { id: editorDefinition.id, definition: editorDefinition };
}

/** Resolves the web view navigation commands and the top toolbar should target, in both modes */
function resolveTargetWebView(): ResolvedWebView | undefined {
  return resolveTrackedWebView() ?? resolveMainEditorWebView();
}

function resolveNavigationTarget(): NavigationTarget | undefined {
  const target = resolveTargetWebView();
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
    const target = resolveNavigationTarget();
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

/**
 * Gets the web view id of the currently focused subject, if focus is on a web view or a web view's
 * tab. Used by {@link openBookChapterControl} to prefer the focused tab's own BookChapterControl
 * over the tracked last-selected web view, e.g. when focus has moved to a dialog or another
 * non-web-view tab that itself isn't scripture-navigable.
 */
async function getFocusedWebViewId(): Promise<WebViewId | undefined> {
  try {
    const focusSubject = await windowService.getFocus();
    if (focusSubject?.focusType === 'webView') return focusSubject.id;
    if (focusSubject?.focusType === 'tab' && focusSubject.tabType === TAB_TYPE_WEBVIEW)
      return focusSubject.id;
    return undefined;
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
    const trackedWebViewId = getLastSelectedWebViewId();
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
