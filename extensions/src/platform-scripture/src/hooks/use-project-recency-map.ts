import { logger } from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import { useMemo } from 'react';
import {
  isPlatformError,
  normalizeProjectId,
  recencyMapFromOrderedIds,
} from 'platform-bible-utils';

// Stable empty-array reference serving two roles: the recently-opened-projects `useData` default,
// and the fallback the recency map is built from when the subscription has no usable list.
// `useData` resubscribes when the default identity changes, so keeping this at module scope avoids
// per-render re-subscriptions. Declared as the mutable `string[]` that `useData`'s `defaultValue`
// parameter requires, then frozen separately so the shared instance cannot be mutated out from
// under either role.
const EMPTY_RECENT_PROJECTS: string[] = [];
Object.freeze(EMPTY_RECENT_PROJECTS);

/**
 * Subscribe to the recently-opened-projects service and yield the recency map a `ProjectSelector`
 * row's `lastUsedAt` is read from.
 *
 * The service exposes an ordered id list (most-recent first) without timestamps, so
 * `recencyMapFromOrderedIds` synthesizes the values the built-in `lastUsed` grouping reads as its
 * "recently used" presence flag.
 *
 * Recency is optional to every consumer: when the provider is unavailable the subscription yields a
 * `PlatformError` instead of an id list, which is logged under `logLabel` and degraded to an empty
 * map — "no recency" rather than a lost web view.
 *
 * **Normalize BOTH sides of the lookup.** The recents service stores whatever id its caller handed
 * it, verbatim, while selector rows carry canonical (upper-cased) project ids. The keys of the map
 * returned here are already normalized; the caller must normalize its own id too —
 * `recencyMap.get(normalizeProjectId(id))`. Normalizing only one side misses on casing alone and
 * routes every project into the grouping's "Other" bucket.
 *
 * @param logLabel Prefix identifying the caller in the warning logged when the recents provider is
 *   unavailable, e.g. `'FindWebView'`.
 * @returns Map from normalized project id to a synthesized recency value.
 */
export function useProjectRecencyMap(logLabel: string): ReadonlyMap<string, number> {
  const [recentProjectIds] = useData('platformScripture.recentlyOpenedProjects').RecentProjects(
    undefined,
    EMPTY_RECENT_PROJECTS,
  );

  return useMemo<ReadonlyMap<string, number>>(() => {
    let orderedRecentProjectIds = recentProjectIds;
    if (isPlatformError(orderedRecentProjectIds)) {
      logger.warn(
        `${logLabel}: failed to load recently opened projects: ${orderedRecentProjectIds.message}`,
      );
      orderedRecentProjectIds = EMPTY_RECENT_PROJECTS;
    }
    return recencyMapFromOrderedIds(orderedRecentProjectIds.map(normalizeProjectId));
  }, [recentProjectIds, logLabel]);
}
