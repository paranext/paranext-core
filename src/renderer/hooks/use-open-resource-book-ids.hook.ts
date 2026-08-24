import { getAllOpenWebViewDefinitionsSync } from '@renderer/services/web-view.service-host';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import {
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
} from '@shared/services/web-view.service-model';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
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
 * `activeProjectId` is excluded — its books are already the control's baseline, so subscribing
 * again would be pure cost.
 */
function getOpenProjectIds(activeProjectId: string | undefined): string[] {
  let definitions;
  try {
    definitions = getAllOpenWebViewDefinitionsSync();
  } catch (e) {
    logger.debug(`Open resource books could not enumerate open web views: ${getErrorMessage(e)}`);
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
 * The books present in open projects and resources OTHER than the active project — what the global
 * book/chapter/verse control offers beyond the active project's own books.
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
 * @returns Book ids in canon order, deduplicated across projects
 */
export function useOpenResourceBookIds(activeProjectId: string | undefined): string[] {
  const [webViewRefreshCounter, setWebViewRefreshCounter] = useState(0);
  const refreshOpenWebViews = useCallback(() => setWebViewRefreshCounter((n) => n + 1), []);

  const onDidOpenWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_OPEN_WEB_VIEW), []);
  useEvent(onDidOpenWebView, refreshOpenWebViews);
  const onDidUpdateWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW), []);
  useEvent(onDidUpdateWebView, refreshOpenWebViews);
  const onDidCloseWebView = useMemo(() => getNetworkEvent(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW), []);
  useEvent(onDidCloseWebView, refreshOpenWebViews);

  const openProjectIds = useMemo(
    () => getOpenProjectIds(activeProjectId),
    // webViewRefreshCounter is a refresh trigger: its value is unused, but each bump re-enumerates
    // this window's open web views.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeProjectId, webViewRefreshCounter],
  );

  // A membership fingerprint, so an unchanged set of ids is a stable dependency and an unrelated web
  // view event does not tear down and rebuild every subscription. Sorted because set equality, not
  // order, is what matters. NUL-separated so no pair of distinct id sets can collide into the same
  // key — a space would let {'A B'} and {'A', 'B'} agree, silently suppressing a real change.
  const openProjectIdsKey = useMemo(
    () => [...openProjectIds].sort().join('\u0000'),
    [openProjectIds],
  );

  const [bookIdsByProjectId, setBookIdsByProjectId] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const projectIds = openProjectIds;
    if (projectIds.length === 0) {
      setBookIdsByProjectId({});
      return undefined;
    }

    let disposed = false;
    const unsubscribers: Array<() => Promise<boolean>> = [];

    projectIds.forEach((projectId) => {
      papiFrontendProjectDataProviderService
        .get(PROJECT_INTERFACE_PLATFORM_BASE, projectId)
        .then((pdp) =>
          pdp.subscribeSetting('platformScripture.booksPresent', (value) => {
            if (disposed) return;
            if (isPlatformError(value)) {
              logger.debug(
                `Open resource books: ${projectId} reported an error for booksPresent: ${getErrorMessage(value)}`,
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
        .then((unsubscribe) => {
          if (disposed) unsubscribe();
          else unsubscribers.push(unsubscribe);
          return undefined;
        })
        .catch((e) => {
          // A provider that cannot serve booksPresent contributes nothing, which is also what makes
          // this forward-compatible with resource providers that gain the setting later.
          logger.debug(
            `Open resource books: no booksPresent for ${projectId}: ${getErrorMessage(e)}`,
          );
        });
    });

    return () => {
      disposed = true;
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
    // openProjectIdsKey is the real dependency: it is openProjectIds' membership fingerprint, so
    // depending on the array itself would rebuild every subscription whenever an unrelated web view
    // event produced an equal-but-new array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openProjectIdsKey]);

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

export default useOpenResourceBookIds;
