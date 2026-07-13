/** Inputs for {@link resolveTextCollectionProjectId}. */
export type TextCollectionProjectCandidate = {
  /** The web view's own `projectId` when opened with one; always wins when set. */
  explicitProjectId: string | undefined;
  /** `projectId ?? activeEditorProjectId` — the project the grid would otherwise follow. */
  candidateProjectId: string | undefined;
  /**
   * Whether `candidateProjectId` is one of the resources the grid is currently displaying. Focusing
   * a resource cell (e.g. clicking a verse in Chapter view) makes that resource the active editor;
   * the grid must not switch its displayed project to one of its own resources.
   */
  candidateIsOwnResource: boolean;
};

/**
 * Resolves which project's text collection the grid shows, latching the last valid one.
 *
 * Opened from the default layout the grid has no explicit `projectId`, so it follows the active
 * Scripture editor. But each resource cell is itself a Scripture editor: focusing one (clicking a
 * verse in Chapter view) makes that resource the active editor. Following it would switch the grid
 * to a resource that has no text collection of its own and blank it out. So when the candidate is
 * one of the grid's currently-displayed resources, keep the current project; otherwise adopt the
 * candidate (still following the active editor to a genuinely different text-collection project).
 *
 * @param previous The currently-latched project id (undefined before the first one resolves).
 * @param candidate See {@link TextCollectionProjectCandidate}.
 * @returns The project id whose text collection to display.
 */
export function resolveTextCollectionProjectId(
  previous: string | undefined,
  candidate: TextCollectionProjectCandidate,
): string | undefined {
  const { explicitProjectId, candidateProjectId, candidateIsOwnResource } = candidate;
  if (explicitProjectId) return explicitProjectId;
  if (!candidateProjectId) return previous;
  if (candidateIsOwnResource) return previous;
  return candidateProjectId;
}
