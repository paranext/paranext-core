import type { ResourceReferenceList, TextCollectionOverlay } from 'platform-scripture';
import {
  addToUserResources,
  removeFromUserResources,
  setUserDisplay,
  type TextCollectionSources,
} from './scripture-text-grid-contents.utils';

/**
 * The per-user text-connection PDP setters these helpers write through — a minimal subset so the
 * helpers (and their tests) don't depend on the whole data-provider surface.
 */
export interface UserResourceWriter {
  setUserReferencedProjectsAndResources: (list: ResourceReferenceList) => Promise<unknown>;
  setTextCollectionOverlay: (overlay: TextCollectionOverlay) => Promise<unknown>;
  setCellOrder: (order: string[]) => Promise<unknown>;
}

/**
 * Persists a show/hide toggle, writing only the slice that changed: the overlay for an admin-owned
 * entry, the per-user list for a user entry (see {@link setUserDisplay}). Returns the fired writes
 * so the caller can handle failures; an unknown id fires nothing.
 */
export function persistUserDisplay(
  writer: UserResourceWriter,
  resourceId: string,
  checked: boolean,
  sources: TextCollectionSources,
): Promise<unknown>[] {
  const next = setUserDisplay(resourceId, checked, sources);
  const writes: Promise<unknown>[] = [];
  if (next.userReferenced !== sources.userReferenced)
    writes.push(writer.setUserReferencedProjectsAndResources(next.userReferenced));
  if (next.overlay !== sources.overlay) writes.push(writer.setTextCollectionOverlay(next.overlay));
  return writes;
}

/**
 * Removes a resource from the per-user list, persisting only when the list actually changed (a
 * no-op on admin-owned or absent ids). Returns the fired write, or `undefined` when nothing
 * changed.
 */
export function persistUserRemoval(
  writer: UserResourceWriter,
  resourceId: string,
  userReferenced: ResourceReferenceList,
): Promise<unknown> | undefined {
  const next = removeFromUserResources(resourceId, userReferenced);
  if (next === userReferenced) return undefined;
  return writer.setUserReferencedProjectsAndResources(next);
}

/**
 * Adds a resource to the per-user list, persisting only when it wasn't already present. Returns the
 * fired write, or `undefined` when the id was already in the list.
 */
export function persistUserAddition(
  writer: UserResourceWriter,
  reference: Parameters<typeof addToUserResources>[0],
  userReferenced: ResourceReferenceList,
): Promise<unknown> | undefined {
  const next = addToUserResources(reference, userReferenced);
  if (next === userReferenced) return undefined;
  return writer.setUserReferencedProjectsAndResources(next);
}

/**
 * Persists the user's preferred cell order through the text-connection PDP; always fires a write,
 * so callers must call only when the order has actually changed.
 */
export function persistCellOrder(writer: UserResourceWriter, order: string[]): Promise<unknown> {
  return writer.setCellOrder(order);
}

/**
 * What {@link removeFromUserTextConnections} did: `removed` wrote the list without the resources;
 * `alreadyGone` found none of them on it, which is the outcome the user asked for, typically
 * because another tab removed them while the picker was open; `listUnavailable` could not read the
 * list.
 */
export type UserListRemovalResult = 'removed' | 'alreadyGone' | 'listUnavailable';

/**
 * Removes resources from the current user's personal text connections by the ids the list stores
 * them under, through {@link removeFromUserResources} as the Text Collection's ✕ does. It lives here
 * rather than beside `selectTextConnection` because that module is also loaded by the extension
 * host, which cannot load this one's imports. They stay installed, and the project-level (shared)
 * settings are never written here.
 *
 * @param listIds The ids to remove, as in `PickerDialogSelection.listIdsByRemovableId`
 * @param getUserTextConnections Function to retrieve the local user's text connections
 * @param setUserTextConnections Function to set the local user's text connections
 * @returns See {@link UserListRemovalResult}. A failed write rejects.
 */
export async function removeFromUserTextConnections(
  listIds: string[],
  getUserTextConnections: () => Promise<ResourceReferenceList | undefined>,
  setUserTextConnections: (list: ResourceReferenceList) => Promise<unknown>,
): Promise<UserListRemovalResult> {
  const userList = await getUserTextConnections();
  if (!userList) return 'listUnavailable';
  const nextList = listIds.reduce((list, id) => removeFromUserResources(id, list), userList);
  if (nextList === userList) return 'alreadyGone';
  await setUserTextConnections(nextList);
  return 'removed';
}
