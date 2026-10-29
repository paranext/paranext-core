/**
 * Where a Bible texts or Commentaries panel keeps its selection in web view state: one entry per
 * project the panel has shown. A Simple-mode project switch reloads the panel in place with the
 * state it already had, so a selection kept under flat keys would follow the user from project to
 * project.
 *
 * Shared by the panel, which reads and writes its own project's entry, and by the provider, which
 * builds the state a panel is reloaded with.
 */

/** The web view state key the per-project selections are kept under. */
export const RESOURCE_SELECTION_BY_PROJECT_STATE_KEY = 'resourceSelectionByProjectId';

/**
 * The entry for a panel with no project open. No project id is empty, so it cannot collide with
 * one.
 */
export const NO_PROJECT_SELECTION_KEY = '';

/** One project's selection. See `ResourceSelectionInputs` for what the two ids mean. */
export type ResourceSelection = {
  /** The persisted selection, namespaced or legacy-bare */
  selectedResourceId?: string;
  /** The id of the resource the user last chose themselves */
  userPickedResourceId?: string;
};

/** Each project's selection, by project id ({@link NO_PROJECT_SELECTION_KEY} for none). */
export type ResourceSelectionByProject = Record<string, ResourceSelection>;

/**
 * The key a project's selection is kept under.
 *
 * @param projectId The panel's project, if one is open
 * @returns The project's key in {@link ResourceSelectionByProject}
 */
export function getResourceSelectionKey(projectId: string | undefined): string {
  return projectId ?? NO_PROJECT_SELECTION_KEY;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function toOptionalString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined;
}

/**
 * Reads per-project selections out of a saved value. Anything that is not a string id is dropped,
 * since a saved layout is read without being validated.
 *
 * @param saved The value saved under {@link RESOURCE_SELECTION_BY_PROJECT_STATE_KEY}
 * @returns Each project's selection
 */
export function toResourceSelections(saved: unknown): ResourceSelectionByProject {
  if (!isRecord(saved)) return {};
  const selections: ResourceSelectionByProject = {};
  Object.entries(saved).forEach(([key, entry]) => {
    if (!isRecord(entry)) return;
    selections[key] = {
      selectedResourceId: toOptionalString(entry.selectedResourceId),
      userPickedResourceId: toOptionalString(entry.userPickedResourceId),
    };
  });
  return selections;
}

/**
 * Reads the per-project selections out of a panel's web view state.
 *
 * @param state The panel's web view state
 * @returns Each project's selection
 */
export function getResourceSelections(
  state: Record<string, unknown> | undefined,
): ResourceSelectionByProject {
  return toResourceSelections(state?.[RESOURCE_SELECTION_BY_PROJECT_STATE_KEY]);
}

/**
 * Per-project selections with the given fields of one project's selection changed.
 *
 * @param selections Each project's selection
 * @param projectId The project, if one is open
 * @param update The fields to change
 * @returns The selections with that project's changed and every other project's kept
 */
export function updateResourceSelections(
  selections: ResourceSelectionByProject,
  projectId: string | undefined,
  update: ResourceSelection,
): ResourceSelectionByProject {
  const key = getResourceSelectionKey(projectId);
  return { ...selections, [key]: { ...selections[key], ...update } };
}

/**
 * One project's selection in a panel's web view state.
 *
 * @param state The panel's web view state
 * @param projectId The project, if one is open
 * @returns The project's selection; empty if it has none
 */
export function getResourceSelection(
  state: Record<string, unknown> | undefined,
  projectId: string | undefined,
): ResourceSelection {
  return getResourceSelections(state)[getResourceSelectionKey(projectId)] ?? {};
}

/**
 * A panel's web view state with one project's selection replaced.
 *
 * @param state The panel's web view state
 * @param projectId The project, if one is open
 * @param selection The project's new selection
 * @returns The state with that project's selection replaced and every other project's kept
 */
export function withResourceSelection(
  state: Record<string, unknown> | undefined,
  projectId: string | undefined,
  selection: ResourceSelection,
): Record<string, unknown> {
  return {
    ...state,
    [RESOURCE_SELECTION_BY_PROJECT_STATE_KEY]: {
      ...getResourceSelections(state),
      [getResourceSelectionKey(projectId)]: selection,
    },
  };
}

/** The flat keys a panel kept its selection under before it was kept per project. */
const LEGACY_SELECTED_RESOURCE_ID_STATE_KEY = 'selectedResourceId';
const LEGACY_USER_PICKED_RESOURCE_ID_STATE_KEY = 'userPickedResourceId';

/**
 * Moves a selection saved under the old flat keys into the entry of the project the panel was saved
 * with, and removes the flat keys. That is the project the user last saw the selection in, so they
 * see the same resource after upgrading. An entry that project already has is kept.
 *
 * Done when the panel's state is built rather than in the panel itself: the provider knows which
 * project the state was saved with, while a panel reloaded for another project before it first
 * rendered would file the selection under that other project.
 *
 * @param state The panel's saved web view state
 * @param savedProjectId The project the state was saved with, if one was open
 * @returns The state with no flat selection keys
 */
export function adoptLegacyResourceSelection(
  state: Record<string, unknown> | undefined,
  savedProjectId: string | undefined,
): Record<string, unknown> {
  const {
    [LEGACY_SELECTED_RESOURCE_ID_STATE_KEY]: legacySelectedResourceId,
    [LEGACY_USER_PICKED_RESOURCE_ID_STATE_KEY]: legacyUserPickedResourceId,
    ...rest
  } = state ?? {};
  const selectedResourceId = toOptionalString(legacySelectedResourceId);
  const userPickedResourceId = toOptionalString(legacyUserPickedResourceId);
  const hasLegacySelection = selectedResourceId !== undefined || userPickedResourceId !== undefined;
  const hasEntry = getResourceSelectionKey(savedProjectId) in getResourceSelections(state);
  if (!hasLegacySelection || hasEntry) return rest;
  return withResourceSelection(rest, savedProjectId, { selectedResourceId, userPickedResourceId });
}
