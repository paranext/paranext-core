import type {
  DblResourceReference,
  ProjectReference,
  ResourceReferenceList,
} from 'platform-scripture';
import { DblResourceData } from 'platform-bible-utils';
import {
  isDblResourceReference,
  isNonDblResource,
  isProjectReference,
} from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './resource-reference-list.const';

/**
 * Adds a DBL resource to the current user's personal text connections.
 *
 * Always writes to the user's personal list, regardless of admin status — the project-level
 * (shared) settings are written exclusively by the Share Layout dialog now. Calls `onSelect` after
 * a successful write.
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

  const isLocalOnly = isNonDblResource(resource);
  const newRef: DblResourceReference | ProjectReference = isLocalOnly
    ? { type: 'project', name: resource.displayName, id: resource.projectId }
    : { type: 'dblResource', name: resource.displayName, id: resource.dblEntryUid };

  const rawUserList = await getUserTextConnections();
  const rawUserItems = rawUserList?.items ?? [];
  await setUserTextConnections({
    dataVersion: rawUserList?.dataVersion ?? DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
    items: [
      newRef,
      ...rawUserItems.filter((item) =>
        isLocalOnly
          ? !isProjectReference(item) || item.id !== resource.projectId
          : !isDblResourceReference(item) || item.id !== resource.dblEntryUid,
      ),
    ],
  });

  onSelect?.(newRef);
}
