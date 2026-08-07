/**
 * The scripture navigation commands — the six `platform.goTo*` steps and the two reference-history
 * keyboard commands. Registered here in main under the generic names consumers call, each acting on
 * the navigation target of the window the user is working in.
 *
 * The window supplies what only it knows (which web view navigation drives, and its layout
 * direction) in one round trip; everything after that — the pure next-reference computation and the
 * write — happens here, against the scroll group host that also lives in this process.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import {
  getScrRef,
  getScrRefForProject,
  navigateReferenceHistory,
  setScrRef,
} from '@main/services/scroll-group.service-host';
import { getWebViewShard } from '@main/services/web-view.service-router';
import { getWindowServiceShard } from '@main/services/window.service-router';
import { getTargetWindowId } from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { NavigationContext } from '@shared/models/window.service-shard.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { get as getProjectDataProvider } from '@shared/services/project-data-provider.service';
import { serializeRequestType } from '@shared/utils/util';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { getErrorMessage, Mutex, ScrollGroupId } from 'platform-bible-utils';
import {
  ALL_BOOK_IDS,
  findAdjacentPresentBook,
  getBookIdsFromBooksPresent,
  getNextBookRef,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousBookRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  resolveReferenceHistoryDirection,
  ScriptureBounds,
} from 'platform-bible-utils/experimental';

/** A window's answer about what navigation should act on, and which window gave it */
type ResolvedNavigationContext = {
  /**
   * The window that answered. Held so a write lands in the same window the context came from: focus
   * can move between the two, and re-deriving the window would send the write somewhere else.
   */
  windowId: number;
  context: NavigationContext;
};

/**
 * Ask the window the user is working in what navigation should act on there.
 *
 * Returns `undefined` when there is no window to ask or its shard cannot answer — the commands then
 * do nothing, which is what they did in a renderer that had no navigation target.
 */
async function resolveNavigationContext(): Promise<ResolvedNavigationContext | undefined> {
  const windowId = getTargetWindowId();
  if (windowId === undefined) {
    logger.debug('Navigation command ignored: no window to navigate in');
    return undefined;
  }
  try {
    const windowShard = await getWindowServiceShard(windowId);
    if (!windowShard) {
      logger.debug(
        `Navigation command ignored: window ${windowId} has not registered its window service`,
      );
      return undefined;
    }
    return { windowId, context: await windowShard.getNavigationContext() };
  } catch (e) {
    logger.warn(
      `Navigation command could not read the navigation context of window ${windowId}: ${getErrorMessage(e)}`,
    );
    return undefined;
  }
}

/** The current reference of whatever the target follows — its scroll group, or its own ref */
async function getCurrentRef(
  target: NonNullable<NavigationContext['target']>,
): Promise<SerializedVerseRef> {
  if (typeof target.scrollGroupScrRef !== 'number') return target.scrollGroupScrRef;
  return target.projectId
    ? getScrRefForProject(target.scrollGroupScrRef, target.projectId)
    : getScrRef(target.scrollGroupScrRef);
}

async function getAvailableBooks(projectId: string | undefined): Promise<string[]> {
  if (!projectId) return ALL_BOOK_IDS;
  try {
    const projectDataProvider = await getProjectDataProvider(
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
  return getProjectDataProvider('platformScripture.Versification', projectId);
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

/**
 * Apply a stepped reference: to the scroll group the target follows, or back onto the target itself
 * when it carries its own detached reference.
 *
 * The scroll group write is a direct call into this process's own host rather than a request
 * through its network object — reaching for a data provider you are the host of is a round trip
 * that answers itself. The detached write has to go to the window that answered the context, since
 * only that window's dock layout holds the definition.
 */
async function writeNewRef(
  { windowId, context }: ResolvedNavigationContext,
  newRef: SerializedVerseRef,
): Promise<void> {
  const { target } = context;
  if (!target) return;
  if (typeof target.scrollGroupScrRef === 'number') {
    await setScrRef(target.scrollGroupScrRef, newRef, target.projectId);
    return;
  }
  const webViewShard = await getWebViewShard(windowId);
  if (!webViewShard) {
    logger.warn(
      `Navigation command could not update detached ref on ${target.webViewId}: window ${windowId} has no WebView service`,
    );
    return;
  }
  await webViewShard.setDetachedScrRef(target.webViewId, newRef);
}

/**
 * Serializes go-to command executions. Each run reads the current ref, awaits several round trips,
 * then writes the stepped ref — so overlapping runs (e.g. holding a shortcut key, whose auto-repeat
 * sends one command per repeat) would read the same starting ref and lose steps, and a slow earlier
 * run could write its stale result after a newer one, stepping backward. Running each behind the
 * previous one (the mutex is FIFO) makes N presses advance exactly N steps, in order.
 *
 * App-global, since the handler runs in the main process: two windows driving the same scroll group
 * are serialized against each other as well, which a per-renderer lock could not do. Cross-window
 * ordering beyond this is TODO(PT-4270).
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
      const resolved = await resolveNavigationContext();
      const target = resolved?.context.target;
      if (!resolved || !target) {
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
      await writeNewRef(resolved, newRef);
    });
}

/**
 * The scroll group the reference-history commands act on: the SAME one the top toolbar's history
 * buttons follow. `undefined` when the window's target carries a detached reference rather than
 * following a numbered scroll group — the toolbar hides its history buttons then, so the command
 * no-ops. With no active target this is scroll group 0, matching the toolbar's `?? 0`.
 */
function getActiveReferenceHistoryScrollGroupId(
  context: NavigationContext,
): ScrollGroupId | undefined {
  const scrollGroupScrRef = context.target?.scrollGroupScrRef ?? 0;
  return typeof scrollGroupScrRef === 'number' ? scrollGroupScrRef : undefined;
}

/**
 * Navigate the active scroll group's reference history in a PHYSICAL direction.
 *
 * The window reports its layout direction and this applies the agreed physical→logical mapping, so
 * the main process's keyboard handler can dispatch the physical key and stay direction-agnostic.
 */
async function navigateReferenceHistoryPhysical(
  physicalDirection: 'left' | 'right',
): Promise<boolean> {
  const resolved = await resolveNavigationContext();
  if (!resolved) return false;
  const scrollGroupId = getActiveReferenceHistoryScrollGroupId(resolved.context);
  if (scrollGroupId === undefined) return false;
  const logicalDirection = resolveReferenceHistoryDirection(
    physicalDirection,
    resolved.context.readDirection,
  );
  return navigateReferenceHistory(scrollGroupId, logicalDirection === 'back' ? -1 : 1);
}

/** Handlers by command name, with the OpenRPC documentation for the name consumers call */
const navigationCommands: Record<
  string,
  { handler: (...args: unknown[]) => Promise<unknown>; docs: SingleMethodDocumentation }
> = {
  'platform.goToNextChapter': {
    handler: makeGoToCommandHandler(getNextChapterRef),
    docs: {
      method: {
        'x-experimental': true,
        summary: 'Navigate the active scroll group to the next chapter (rolls into the next book)',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.goToPreviousChapter': {
    handler: makeGoToCommandHandler(getPreviousChapterRef, { needsPreviousBook: true }),
    docs: {
      method: {
        'x-experimental': true,
        summary:
          'Navigate the active scroll group to the previous chapter (rolls into the previous book)',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.goToNextBook': {
    handler: makeGoToCommandHandler(getNextBookRef, { needsBounds: false }),
    docs: {
      method: {
        'x-experimental': true,
        summary: 'Navigate the active scroll group to the next book (chapter 1, verse 1)',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.goToPreviousBook': {
    handler: makeGoToCommandHandler(getPreviousBookRef, { needsBounds: false }),
    docs: {
      method: {
        'x-experimental': true,
        summary: 'Navigate the active scroll group to the previous book (chapter 1, verse 1)',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.goToNextVerse': {
    handler: makeGoToCommandHandler(getNextVerseRef),
    docs: {
      method: {
        'x-experimental': true,
        summary: 'Navigate the active scroll group to the next verse',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.goToPreviousVerse': {
    handler: makeGoToCommandHandler(getPreviousVerseRef, { needsPreviousBook: true }),
    docs: {
      method: {
        'x-experimental': true,
        summary: 'Navigate the active scroll group to the previous verse',
        params: [],
        result: { name: 'return value', schema: { type: 'null' } },
      },
    },
  },
  'platform.navigateLeftInReferenceHistory': {
    handler: () => navigateReferenceHistoryPhysical('left'),
    docs: {
      method: {
        'x-experimental': true,
        summary:
          'Navigate the reference history of the active scroll group (the one the top toolbar ' +
          'follows) in the physical "left" direction (back in LTR, forward in RTL)',
        params: [],
        result: { name: 'didNavigate', schema: { type: 'boolean' } },
      },
    },
  },
  'platform.navigateRightInReferenceHistory': {
    handler: () => navigateReferenceHistoryPhysical('right'),
    docs: {
      method: {
        'x-experimental': true,
        summary:
          'Navigate the reference history of the active scroll group (the one the top toolbar ' +
          'follows) in the physical "right" direction (forward in LTR, back in RTL)',
        params: [],
        result: { name: 'didNavigate', schema: { type: 'boolean' } },
      },
    },
  },
};

/**
 * Register the scripture navigation commands under the generic names so they are claimed before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startScrollGroupNavigationCommands(): Promise<void> {
  await Promise.all(
    Object.entries(navigationCommands).map(([commandName, { handler, docs }]) =>
      networkService.registerRequestHandler(
        serializeRequestType(CATEGORY_COMMAND, commandName),
        handler,
        docs,
      ),
    ),
  );
  logger.info(
    `Scripture navigation commands registered for ${Object.keys(navigationCommands).length} names`,
  );
}
