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
 * **Precedence invariant: an explicit pin always wins, and the followed project is consulted only
 * when no pin exists.** Two mechanisms can move this panel — an explicit push, which re-points it
 * on a project switch, and a reactive follow of the active editor. They are not a race to be
 * resolved by ordering: the push is authoritative because it expresses a deliberate user action, so
 * a pin is honored even when the followed candidate disagrees. Removing the `explicitProjectId`
 * branch would silently hand priority to whichever mechanism happened to run last.
 *
 * Whether the follow should keep moving the panel after it has a project, or only seed one that has
 * none, is an open design question owned by PT-4238 — this function deliberately takes no position
 * on it beyond the precedence above.
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
