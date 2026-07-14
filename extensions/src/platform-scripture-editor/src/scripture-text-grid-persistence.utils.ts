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
