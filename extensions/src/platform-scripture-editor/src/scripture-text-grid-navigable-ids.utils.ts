/**
 * Decides what, if anything, the grid should publish as its `navigableProjectIds` web view state.
 *
 * Compares as sets rather than arrays: the grid's cell order is user-reorderable, and every publish
 * is a web view definition update that lands in layout persistence, so a reorder must not cost a
 * write. Only a genuine membership change does.
 *
 * @param displayedProjectIds Installed project ids of the cells the grid currently renders
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
