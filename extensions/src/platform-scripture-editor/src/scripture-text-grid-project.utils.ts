/** Inputs for {@link resolveTextCollectionProjectId}. */
export type TextCollectionProjectCandidate = {
  /** The web view's own `projectId` when opened with one; always wins when set. */
  explicitProjectId: string | undefined;
  /** `projectId ?? activeEditorProjectId` — the project the grid would follow. */
  candidateProjectId: string | undefined;
  /**
   * Whether `candidateProjectId` exposes the `platformScripture.textConnectionSettings` PDP, i.e.
   * is a real text-collection project rather than a plain resource being viewed.
   */
  candidateHasTextConnection: boolean;
};

/**
 * Resolves which project's text collection the grid shows, latching the last valid one.
 *
 * Opened from the default layout the grid has no explicit `projectId`, so it follows the active
 * Scripture editor. But each resource cell is itself a Scripture editor: focusing one makes it the
 * active editor even though a plain resource has no text collection. Following it blindly would
 * switch the grid to that resource and blank it (no sources). This keeps the last project that
 * actually had a text-connection PDP, so clicking into a resource cell no longer empties the grid,
 * while still adopting a newly-focused editor when it IS a text-collection project.
 *
 * @param previous The currently-latched project id (undefined before the first valid one resolves).
 * @param candidate See {@link TextCollectionProjectCandidate}.
 * @returns The project id whose text collection to display.
 */
export function resolveTextCollectionProjectId(
  previous: string | undefined,
  candidate: TextCollectionProjectCandidate,
): string | undefined {
  const { explicitProjectId, candidateProjectId, candidateHasTextConnection } = candidate;
  if (explicitProjectId) return explicitProjectId;
  if (candidateProjectId && candidateHasTextConnection) return candidateProjectId;
  return previous;
}

export default resolveTextCollectionProjectId;
