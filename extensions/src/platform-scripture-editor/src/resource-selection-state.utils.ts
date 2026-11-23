/**
 * Where the Bible texts and Commentaries panels keep their selection: one entry per project, in a
 * hidden user setting, so each project shows its own selection after a project switch and after a
 * restart. A Simple-mode project switch reloads a panel in place, and Simple mode builds the panels
 * afresh at every launch, so the panel's web view state could not hold it.
 *
 * Shared by the panel, which reads its own project's entry, and by the extension host, which writes
 * every entry (see `resource-selection-store.ts`).
 */

import type { ResourceType } from 'platform-bible-utils';
import { isString } from 'platform-bible-utils';

/** The hidden user setting the selections are kept in. */
export const RESOURCE_SELECTION_SETTING_KEY =
  'platformScriptureEditor.resourceSelectionByProjectId';

/**
 * The entry for a panel with no project open. No project id is empty, so it cannot collide with
 * one.
 */
export const NO_PROJECT_SELECTION_KEY = '';

/** The kinds of resource a panel lists, one panel each. */
export type ResourcePanelType = Extract<ResourceType, 'ScriptureResource' | 'CommentaryResource'>;

/** One project's selection in one panel. See `ResourceSelectionInputs` for what the two ids mean. */
export type StoredResourceSelection = {
  /** The persisted selection, namespaced or legacy-bare */
  selectedResourceId?: string;
  /** The id of the resource the user last chose themselves */
  userPickedResourceId?: string;
};

/** Each project's selection in one panel, by project id ({@link NO_PROJECT_SELECTION_KEY} for none). */
export type ResourceSelectionByProject = Record<string, StoredResourceSelection>;

/** The value of {@link RESOURCE_SELECTION_SETTING_KEY}: each panel's per-project selections. */
export type ResourceSelectionsByPanel = Partial<
  Record<ResourcePanelType, ResourceSelectionByProject>
>;

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
  return isString(value) ? value : undefined;
}

/**
 * Reads per-project selections out of a saved value. Anything that is not a string id is dropped,
 * since a setting file is read without being validated.
 *
 * @param saved One panel's value in {@link ResourceSelectionsByPanel}
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
 * One project's selection in one panel.
 *
 * @param saved The value of {@link RESOURCE_SELECTION_SETTING_KEY}
 * @param resourceType The kind of resource the panel lists
 * @param projectId The project, if one is open
 * @returns The project's selection; empty if it has none
 */
export function getResourceSelection(
  saved: unknown,
  resourceType: ResourcePanelType,
  projectId: string | undefined,
): StoredResourceSelection {
  const panelSelections = isRecord(saved) ? saved[resourceType] : undefined;
  return toResourceSelections(panelSelections)[getResourceSelectionKey(projectId)] ?? {};
}

/**
 * Per-project selections with the given fields of one project's selection changed. A field that is
 * `undefined` in `update` keeps the value it had, so a caller can pass only what it knows.
 *
 * @param selections Each project's selection
 * @param projectId The project, if one is open
 * @param update The fields to change
 * @returns The selections with that project's changed and every other project's kept
 */
export function updateResourceSelections(
  selections: ResourceSelectionByProject,
  projectId: string | undefined,
  update: StoredResourceSelection,
): ResourceSelectionByProject {
  const key = getResourceSelectionKey(projectId);
  const changed = Object.fromEntries(
    Object.entries(update).filter(([, value]) => value !== undefined),
  );
  return { ...selections, [key]: { ...selections[key], ...changed } };
}

/**
 * The setting's value with the given fields of one project's selection in one panel changed, as
 * {@link updateResourceSelections} changes them. Every other panel and project is kept.
 *
 * @param saved The value of {@link RESOURCE_SELECTION_SETTING_KEY}
 * @param resourceType The kind of resource the panel lists
 * @param projectId The project, if one is open
 * @param update The fields to change
 * @returns The new value of the setting
 */
export function updateResourceSelectionsByPanel(
  saved: unknown,
  resourceType: ResourcePanelType,
  projectId: string | undefined,
  update: StoredResourceSelection,
): ResourceSelectionsByPanel {
  const panels = isRecord(saved) ? saved : {};
  return {
    ScriptureResource: toResourceSelections(panels.ScriptureResource),
    CommentaryResource: toResourceSelections(panels.CommentaryResource),
    [resourceType]: updateResourceSelections(
      toResourceSelections(panels[resourceType]),
      projectId,
      update,
    ),
  };
}
