import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DblResourceData } from 'platform-bible-utils';
import { isDblResourceReference } from './resource-reference.utils';
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
 * @param onSelect Optional callback invoked with the resource's `dblEntryUid` after a successful
 *   write
 */
export async function selectTextConnection(
  resource: DblResourceData,
  getUserTextConnections: () => Promise<ResourceReferenceList | undefined>,
  setUserTextConnections: (list: ResourceReferenceList) => Promise<unknown>,
  installResource?: (dblEntryUid: string) => Promise<void>,
  onSelect?: (dblEntryUid: string) => void,
): Promise<void> {
  if (!resource.installed && installResource) {
    try {
      await installResource(resource.dblEntryUid);
    } catch {
      return;
    }
  }
  const newRef: DblResourceReference = {
    type: 'dblResource',
    name: resource.displayName,
    id: resource.dblEntryUid,
  };

  const rawUserList = await getUserTextConnections();
  const rawUserItems = rawUserList?.items ?? [];
  await setUserTextConnections({
    dataVersion: rawUserList?.dataVersion ?? DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
    items: [
      newRef,
      ...rawUserItems.filter(
        (item) => !isDblResourceReference(item) || item.id !== resource.dblEntryUid,
      ),
    ],
  });

  onSelect?.(resource.dblEntryUid);
}
