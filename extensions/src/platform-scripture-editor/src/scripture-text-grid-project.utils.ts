/** Inputs for {@link resolveTextCollectionProjectId}. */
export type TextCollectionProjectCandidate = {
  /** The web view's own `projectId` when opened with one; always wins when set. */
  explicitProjectId: string | undefined;
  /**
   * The window's `ActiveEditorProjectId` (see `IWindowService.getActiveEditorProjectId`). Only ever
   * seeds a grid that has no project yet; it never moves one that has.
   */
  activeEditorProjectId: string | undefined;
};

/**
 * Resolves which project's text collection the grid shows: the explicit `projectId` if there is
 * one, otherwise the project it already shows, otherwise the active editor's project.
 *
 * Opened from the default layout the grid has no explicit `projectId`, so it takes the first
 * project the window's active editor reports and keeps it. Only an explicit `projectId` moves it
 * after that — a project switch supplies one by reloading the panel (see
 * `updateRelatedTextCollectionPanel`). The grid must never change project in place: it reads its
 * admin-shared list through `useBufferedLayoutSetting`, which re-arms only on `onSharedLayoutApply`
 * (Simple mode only) and so would leave that list on the previous project while the per-user list
 * and overlay moved on.
 *
 * @param previous The project the grid already shows (undefined before the first one resolves).
 * @param candidate See {@link TextCollectionProjectCandidate}.
 * @returns The project id whose text collection to display.
 */
export function resolveTextCollectionProjectId(
  previous: string | undefined,
  candidate: TextCollectionProjectCandidate,
): string | undefined {
  return candidate.explicitProjectId ?? previous ?? candidate.activeEditorProjectId;
}
