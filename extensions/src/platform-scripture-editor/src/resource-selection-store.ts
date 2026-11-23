import papi from '@papi/backend';
import {
  getResourceSelection,
  RESOURCE_SELECTION_SETTING_KEY,
  updateResourceSelectionsByPanel,
  type ResourcePanelType,
  type StoredResourceSelection,
} from './resource-selection-state.utils';

/**
 * The write in progress, if any. The setting is replaced whole, so two writes that read it at the
 * same time would each start from the same value and the second would undo the first. Every write
 * waits for the one before it.
 */
let lastWrite: Promise<void> = Promise.resolve();

/**
 * Changes the given fields of one project's selection in one panel, keeping every other project's
 * and the other panel's. Writes run one at a time, in the order they were asked for. A write that
 * changes nothing is skipped.
 *
 * @param resourceType The kind of resource the panel lists
 * @param projectId The project, if one is open
 * @param update The fields to change; an `undefined` field keeps its value
 */
export function updateStoredResourceSelection(
  resourceType: ResourcePanelType,
  projectId: string | undefined,
  update: StoredResourceSelection,
): Promise<void> {
  const write = (async () => {
    await lastWrite;
    const saved = await papi.settings.get(RESOURCE_SELECTION_SETTING_KEY);
    const before = getResourceSelection(saved, resourceType, projectId);
    const next = updateResourceSelectionsByPanel(saved, resourceType, projectId, update);
    const after = getResourceSelection(next, resourceType, projectId);
    if (
      before.selectedResourceId === after.selectedResourceId &&
      before.userPickedResourceId === after.userPickedResourceId
    )
      return;
    await papi.settings.set(RESOURCE_SELECTION_SETTING_KEY, next);
  })();
  // A failed write must not stop the ones after it
  lastWrite = write.catch(() => {});
  return write;
}

/**
 * One project's selection in one panel, as stored once every write asked for so far has run.
 *
 * @param resourceType The kind of resource the panel lists
 * @param projectId The project, if one is open
 * @returns The project's selection; empty if it has none
 */
export async function getStoredResourceSelection(
  resourceType: ResourcePanelType,
  projectId: string | undefined,
): Promise<StoredResourceSelection> {
  await lastWrite;
  return getResourceSelection(
    await papi.settings.get(RESOURCE_SELECTION_SETTING_KEY),
    resourceType,
    projectId,
  );
}
