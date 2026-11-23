import { isNavigableProjectIds } from 'platform-bible-utils/experimental';

/**
 * Decides what, if anything, a web view should publish as its `navigableProjectIds` web view state.
 *
 * Compares as sets rather than arrays: a view's display order can change without its membership
 * changing (the Scripture Text Grid's cells are user-reorderable), and every publish is a web view
 * definition update that lands in layout persistence, so a reorder must not cost a write. Only a
 * genuine membership change does.
 *
 * `rawPublished` arrives as `unknown` because web view state is persisted and typed only by
 * assertion on the read path, so it is validated here rather than trusted. A value that is not a
 * list of ids is treated as no declaration at all, which republishes rather than preserving it.
 *
 * @param displayedProjectIds Installed project ids of the projects the view currently displays
 * @param rawPublished The unvalidated value currently stored at the shared key
 * @returns The deduplicated list to publish, or `undefined` when the membership is unchanged
 */
export function resolveNavigableProjectIdsWrite(
  displayedProjectIds: string[],
  rawPublished: unknown,
): string[] | undefined {
  const next = [...new Set(displayedProjectIds)];
  const published = new Set(isNavigableProjectIds(rawPublished) ? rawPublished : []);
  if (next.length === published.size && next.every((projectId) => published.has(projectId)))
    return undefined;
  return next;
}
