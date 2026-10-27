import type {
  DblResourceReference,
  ProjectReference,
  ResourceReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { DblResourceData } from 'platform-bible-utils';
import { isNonDblResource, isSameResource } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './resource-reference-list.const';

/**
 * The reference a resource is stored under in a reference list: a `ProjectReference` for a
 * locally-installed non-DBL resource, a `DblResourceReference` otherwise.
 *
 * @param resource The resource's catalog entry
 * @returns The reference to store for `resource`
 */
export function toResourceReference(
  resource: DblResourceData,
): DblResourceReference | ProjectReference {
  return isNonDblResource(resource)
    ? { type: 'project', name: resource.displayName, id: resource.projectId }
    : { type: 'dblResource', name: resource.displayName, id: resource.dblEntryUid };
}

/**
 * Puts a reference first in the current user's personal text connections, replacing any earlier
 * copy of it however its DBL entry UID is cased (see `isSameResource`). The copy's other fields —
 * whether it is in the user's Text collection, data the list round-trips — carry over, so moving a
 * resource to the front changes nothing else about it. The project-level (shared) settings are
 * never written here — only the Team layout dialog writes those.
 *
 * @param reference The reference to add
 * @param getUserTextConnections Function to retrieve the local user's text connections
 * @param setUserTextConnections Function to set the local user's text connections
 * @param isAlsoSameResource Optional further test for an earlier copy, for one that names the same
 *   resource under another kind of reference (by its project rather than its DBL entry, say)
 */
export async function addToUserTextConnections(
  reference: DblResourceReference | ProjectReference,
  getUserTextConnections: () => Promise<ResourceReferenceList | undefined>,
  setUserTextConnections: (list: ResourceReferenceList) => Promise<unknown>,
  isAlsoSameResource: (item: ResourceReference) => boolean = () => false,
): Promise<void> {
  const rawUserList = await getUserTextConnections();
  const rawUserItems = rawUserList?.items ?? [];
  const isEarlierCopy = (item: ResourceReference) =>
    isSameResource(item, reference) || isAlsoSameResource(item);
  const earlierCopy = rawUserItems.find(isEarlierCopy);
  await setUserTextConnections({
    dataVersion: rawUserList?.dataVersion ?? DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
    items: [
      { ...earlierCopy, ...reference },
      ...rawUserItems.filter((item) => !isEarlierCopy(item)),
    ],
  });
}

/**
 * Adds a DBL resource to the current user's personal text connections.
 *
 * Always writes to the user's personal list, regardless of admin status — the project-level
 * (shared) settings are written exclusively by the Team layout dialog now. Calls `onSelect` after a
 * successful write.
 *
 * @param resource The DBL resource to select and to add to the user's personal resource list
 * @param getUserTextConnections Function to retrieve the local user's text connections
 * @param setUserTextConnections Function to set the local user's text connections
 * @param installResource Optional function to install the resource first if it is not installed
 * @param onSelect Optional callback invoked after a successful write with the reference that was
 *   written — a `ProjectReference` for a locally-installed non-DBL resource, a
 *   `DblResourceReference` otherwise. Callers key their UI off the written reference; the
 *   `dblEntryUid` does not identify the stored item in the local-only case
 */
export async function selectTextConnection(
  resource: DblResourceData,
  getUserTextConnections: () => Promise<ResourceReferenceList | undefined>,
  setUserTextConnections: (list: ResourceReferenceList) => Promise<unknown>,
  installResource?: (dblEntryUid: string) => Promise<void>,
  onSelect?: (reference: DblResourceReference | ProjectReference) => void,
): Promise<void> {
  if (!resource.installed && installResource) {
    try {
      await installResource(resource.dblEntryUid);
    } catch {
      return;
    }
  }

  const newRef = toResourceReference(resource);
  await addToUserTextConnections(newRef, getUserTextConnections, setUserTextConnections);

  onSelect?.(newRef);
}
