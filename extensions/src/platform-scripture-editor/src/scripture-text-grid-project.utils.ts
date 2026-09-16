/** Inputs for {@link resolveTextCollectionProjectId}. */
export type TextCollectionProjectCandidate = {
  /** The web view's own `projectId` when opened with one; always wins when set. */
  explicitProjectId: string | undefined;
  /**
   * `projectId ?? scrollGroupSourceProjectId` — the project the grid would otherwise follow. The
   * fallback half is the scroll group's SOURCE project (whichever project last SET the group's
   * reference), not the active editor's project; see the call site in
   * `scripture-text-grid.web-view.tsx`.
   */
  candidateProjectId: string | undefined;
  /**
   * Whether `candidateProjectId` is one of the resources the grid is currently displaying. Focusing
   * a resource cell (e.g. clicking a verse in Chapter view) navigates from that cell, making the
   * resource the group's source project; the grid must not switch its displayed project to one of
   * its own resources.
   */
  candidateIsOwnResource: boolean;
};

/**
 * Resolves which project's text collection the grid shows, latching the last valid one.
 *
 * Opened from the default layout the grid has no explicit `projectId`, so it falls back to
 * following the scroll group's source project. But each resource cell is itself a Scripture editor,
 * and focusing one (clicking a verse in Chapter view) makes that resource the project that last set
 * the group's reference. Following it would switch the grid to a resource that has no text
 * collection of its own and blank it out. So when the candidate is one of the grid's
 * currently-displayed resources, keep the current project; otherwise adopt the candidate (still
 * following along to a genuinely different text-collection project).
 *
 * A project switch does not travel by this route at all: it supplies `explicitProjectId`, which
 * wins outright (see `updateRelatedTextCollectionPanel`).
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
