import { isNavigableProjectIds } from 'platform-bible-utils/experimental';

/**
 * Decides what, if anything, a web view should publish as its `navigableProjectIds` web view state.
 *
 * Compares as sets rather than arrays: a view's display order can change without its membership
 * changing (the Scripture Text Grid's cells are user-reorderable), and every publish is a web view
 * definition update that lands in layout persistence, so a reorder must not cost a write. Only a
 * genuine membership change does.
 *
 * @param displayedProjectIds Installed project ids of the projects the view currently displays
 * @param publishedProjectIds What is currently in the web view's state at the shared key
 * @returns The deduplicated list to publish, or `undefined` when the membership is unchanged
 */
export function getNavigableProjectIdsToPublish(
  displayedProjectIds: string[],
  publishedProjectIds: string[],
): string[] | undefined {
  const next = [...new Set(displayedProjectIds)];
  const published = new Set(publishedProjectIds);
  if (next.length === published.size && next.every((projectId) => published.has(projectId)))
    return undefined;
  return next;
}

/**
 * Resolves what a web view should publish, given the raw value currently in its web view state.
 *
 * Web view state is persisted and typed only by assertion on the read path, so `rawPublished`
 * arrives as `unknown` and is validated here rather than trusted.
 *
 * @param displayedProjectIds Installed project ids of the projects the view currently displays
 * @param rawPublished The unvalidated value currently stored at the shared key
 * @returns The deduplicated list to publish, or `undefined` when the membership is unchanged
 */
export function resolveNavigableProjectIdsWrite(
  displayedProjectIds: string[],
  rawPublished: unknown,
): string[] | undefined {
  return getNavigableProjectIdsToPublish(
    displayedProjectIds,
    isNavigableProjectIds(rawPublished) ? rawPublished : [],
  );
}

/** The load state of the data sources a resource panel resolves its displayed project id from. */
export type NavigableProjectSourcesState = {
  /** Whether the panel's resource reference list has resolved */
  hasReferenceList: boolean;
  /** Whether the panel's resource reference list is still loading */
  isReferenceListLoading: boolean;
  /** Whether the cached DBL resource list has resolved (an empty resolved list still counts) */
  hasCachedResources: boolean;
  /** Whether the cached DBL resource list is still loading */
  isLoadingCachedResources: boolean;
};

/**
 * Whether a resource panel's data sources have loaded far enough for its displayed project id to
 * mean "this is what the panel shows" rather than "nothing has arrived yet".
 *
 * Each source needs both a resolved-value check and a loading check, because neither alone closes
 * the window: a reference list resolves independently of its loading flag (its user-scoped half
 * arrives over a separate subscription), and the cached DBL list is fetched in two passes, so it
 * reports "not loading" once while still holding nothing. Publishing in either window would declare
 * an empty list and wipe a correct persisted one on every remount.
 *
 * @param sources Load state of the panel's reference list and of the cached DBL resource list
 * @returns `true` when the displayed project id can be trusted and published
 */
export function areNavigableProjectSourcesReady({
  hasReferenceList,
  isReferenceListLoading,
  hasCachedResources,
  isLoadingCachedResources,
}: NavigableProjectSourcesState): boolean {
  return (
    hasReferenceList && !isReferenceListLoading && hasCachedResources && !isLoadingCachedResources
  );
}
