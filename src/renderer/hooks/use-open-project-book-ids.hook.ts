import {
  getAllOpenWebViewDefinitionsSync,
  onDidCloseWebView,
  onDidOpenWebView,
  onDidUpdateWebView,
} from '@renderer/services/web-view.service-shard';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { logger } from '@shared/services/logger.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, UnsubscriberAsyncList } from 'platform-bible-utils';
import {
  getBookIdsFromBooksPresent,
  isNavigableProjectIds,
  NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
} from 'platform-bible-utils/experimental';
import { Canon } from '@sillsdev/scripture';
import { useCallback, useEffect, useMemo, useState } from 'react';

/** Canon order for the returned union, so consumers can group by section without re-sorting. */
const CANON_BOOK_IDS = Canon.allBookIds;

const EMPTY_IDS: string[] = [];

/**
 * Project ids reachable from this window's open web views: each view's own `projectId`, plus any it
 * declares under {@link NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY} (how a view that hosts several
 * projects at once, like the Scripture Text Grid, makes its members visible from outside).
 *
 * Every project-scoped web view counts, not only the ones that display scripture — a project
 * settings tab or a checks view widens the list the same way an editor does. A project the user has
 * open anywhere in the window is one they are working with, and the books it reports are the same
 * books either way.
 *
 * `activeProjectId` is excluded — its books are already the control's baseline, so subscribing
 * again would be pure cost.
 */
function getOpenProjectIds(activeProjectId: string | undefined): string[] {
  let definitions;
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    logger.debug(`Open project books could not enumerate open web views: ${getErrorMessage(e)}`);
    return EMPTY_IDS;
  }

  const projectIds = new Set<string>();
  definitions.forEach((definition) => {
    if (definition.projectId) projectIds.add(definition.projectId);
    const declared = definition.state?.[NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY];
    // Web view state is written by whoever owns the view and survives into saved layouts, so it is
    // untrusted input rather than a known shape.
    if (isNavigableProjectIds(declared))
      declared.forEach((projectId) => {
        if (projectId) projectIds.add(projectId);
      });
  });
  if (activeProjectId) projectIds.delete(activeProjectId);
  return [...projectIds];
}

/**
 * The books present in every project open in this window OTHER than the active project — what the
 * global book/chapter/verse control offers beyond the active project's own books. Resources are
 * projects here, so they are included; so is any other project-scoped web view.
 *
 * The result is NOT filtered against the active project's books: this hook knows the other
 * projects' ids, not the active project's book list, and an open resource may well share books with
 * the project. Consumers subtract.
 *
 * A project that cannot report its books contributes nothing. It deliberately does not fall back to
 * the full canon the way navigation-command book lookup does — there, the fallback keeps navigation
 * permissive; here, it would advertise every book in the canon as reachable.
 *
 * @param activeProjectId The project whose books are already offered, excluded from the result
 * @param isEnabled Whether to do the work at all. When false the hook subscribes to nothing and
 *   returns an empty list, so a caller that discards the result pays none of its cost. Defaults to
 *   true.
 * @returns Book ids in canon order, deduplicated across projects
 */
export function useOpenProjectBookIds(
  activeProjectId: string | undefined,
  isEnabled: boolean = true,
): string[] {
  // The membership fingerprint is held IN STATE rather than derived from a refresh counter. A web
  // view event that leaves the set of open projects unchanged produces the same string, and
  // `useState` bails out on an unchanged value — so the burst of web view events a project switch
  // fires cannot re-render this hook's consumer. A counter would re-render on every event by
  // construction, because its value changes even when nothing it is standing in for did.
  //
  // Sorted because set equality, not order, is what matters. NUL-separated so no pair of distinct
  // id sets can collide into the same key — a space would let {'A B'} and {'A', 'B'} agree,
  // silently suppressing a real change.
  const readOpenProjectIdsKey = useCallback(
    () => (isEnabled ? [...getOpenProjectIds(activeProjectId)].sort().join('\u0000') : ''),
    [isEnabled, activeProjectId],
  );

  const [openProjectIdsKey, setOpenProjectIdsKey] = useState(readOpenProjectIdsKey);
  const refreshOpenWebViews = useCallback(
    () => setOpenProjectIdsKey(readOpenProjectIdsKey()),
    [readOpenProjectIdsKey],
  );

  // Undefined while disabled: `useEvent` subscribes to nothing when its event is undefined, so a
  // disabled hook does not even listen for the web view changes it would have reacted to.
  useEvent(isEnabled ? onDidOpenWebView : undefined, refreshOpenWebViews);
  useEvent(isEnabled ? onDidUpdateWebView : undefined, refreshOpenWebViews);
  useEvent(isEnabled ? onDidCloseWebView : undefined, refreshOpenWebViews);

  // `activeProjectId` and `isEnabled` are not web view events, so nothing above re-reads the key
  // when they change. Without this the hook would keep reporting the previous project's set.
  useEffect(() => {
    setOpenProjectIdsKey(readOpenProjectIdsKey());
  }, [readOpenProjectIdsKey]);

  // Identity tracks membership rather than event count, so the subscription effect, the returned
  // book list, and the consumers that memoize on it all stay stable across an unchanged set. The
  // empty key must short-circuit: `''.split('\u0000')` yields `['']`, not `[]`.
  const openProjectIds = useMemo(
    () => (openProjectIdsKey ? openProjectIdsKey.split('\u0000') : EMPTY_IDS),
    [openProjectIdsKey],
  );

  // Entries persist for projects that have since closed rather than being pruned as each project
  // closes; the final useMemo below filters them out by membership at read time. This is fine
  // because entries are small and the number of distinct projects a session opens is bounded, and
  // the map is cleared in full once the open set becomes empty.
  const [bookIdsByProjectId, setBookIdsByProjectId] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const projectIds = openProjectIds;
    if (projectIds.length === 0) {
      setBookIdsByProjectId({});
      return undefined;
    }

    // Guards only the setBookIdsByProjectId calls below: subscribeSetting invokes its callback with
    // the current value as soon as it subscribes, so a callback can still land around teardown, and
    // this flag skips the resulting pointless state update after unmount. Unsubscription itself is
    // handled by `unsubscribers` sealing once runAllUnsubscribers starts, below.
    let disposed = false;
    const unsubscribers = new UnsubscriberAsyncList('Open project book ids');

    projectIds.forEach((projectId) => {
      papiFrontendProjectDataProviderService
        .get(PROJECT_INTERFACE_PLATFORM_BASE, projectId)
        .then((pdp) =>
          pdp.subscribeSetting('platformScripture.booksPresent', (value) => {
            if (disposed) return;
            if (isPlatformError(value)) {
              logger.debug(
                `Open project books: ${projectId} reported an error for booksPresent: ${getErrorMessage(value)}`,
              );
              setBookIdsByProjectId((previous) => ({ ...previous, [projectId]: EMPTY_IDS }));
              return;
            }
            setBookIdsByProjectId((previous) => ({
              ...previous,
              [projectId]: getBookIdsFromBooksPresent(value),
            }));
          }),
        )
        .then((unsubscribe) => unsubscribers.add(unsubscribe))
        .catch((e) => {
          // A provider that cannot serve booksPresent contributes nothing, which is also what makes
          // this forward-compatible with resource providers that gain the setting later.
          logger.debug(
            `Open project books: no booksPresent for ${projectId}: ${getErrorMessage(e)}`,
          );
        });
    });

    return () => {
      disposed = true;
      unsubscribers.runAllUnsubscribers();
    };
    // `openProjectIds` is membership-stable (see its definition), so an unrelated web view event
    // cannot rebuild every subscription here.
  }, [openProjectIds]);

  return useMemo(() => {
    const openIds = new Set(openProjectIds);
    const books = new Set<string>();
    Object.entries(bookIdsByProjectId).forEach(([projectId, bookIds]) => {
      // A project that has since closed may still have an entry from a settled subscription.
      if (!openIds.has(projectId)) return;
      bookIds.forEach((bookId) => books.add(bookId));
    });
    if (books.size === 0) return EMPTY_IDS;
    return CANON_BOOK_IDS.filter((bookId) => books.has(bookId));
  }, [bookIdsByProjectId, openProjectIds]);
}

export default useOpenProjectBookIds;
