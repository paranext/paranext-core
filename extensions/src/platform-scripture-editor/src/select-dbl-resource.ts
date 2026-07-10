import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DblResourceData } from 'platform-bible-utils';
import { isDblResourceReference } from './resource-reference.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST } from './resource-reference-list.const';

/**
 * Adds a DBL resource to the project's text connections.
 *
 * Uses the admin setting path if the user has write access, or the raw user list otherwise. Calls
 * `onSelect` after a successful write.
 *
 * The non-admin path reads the raw user list directly rather than filtering the effective list by
 * source. Filtering by source would silently drop user items that also appear in the admin list
 * (tagged 'admin'), causing data loss if the admin later removes their copy.
 *
 * @param resource The DBL resource to select and to update the project's resource list
 * @param getAdminTextConnections The admin's selected text connections
 * @param setAdminTextConnections Function to update the admin's text connections if the current
 *   user can update them
 * @param canUserWriteProjectSettings Whether the user is able to write to the global text
 *   connection project settings
 * @param getUserTextConnections Function to retrieve the local user's text connections
 * @param setUserTextConnections Function to set the local user's text connections
 */
export async function selectTextConnection(
  resource: DblResourceData,
  adminTextConnections: ResourceReferenceList | undefined,
  setAdminTextConnections: (value: ResourceReferenceList) => void,
  canUserWriteProjectSettings: () => Promise<boolean | undefined>,
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

  const canWrite = await canUserWriteProjectSettings();

  if (canWrite) {
    if (adminTextConnections === undefined) return;
    // Use the exact current admin setting as the base so the write is a precise update —
    // deduplicate the incoming resource and prepend it, preserving all other admin items.
    const existingItems = adminTextConnections.items.filter(
      (item) => !isDblResourceReference(item) || item.id !== resource.dblEntryUid,
    );
    setAdminTextConnections({
      dataVersion: adminTextConnections.dataVersion,
      items: [newRef, ...existingItems],
    });
  } else {
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
  }

  onSelect?.(resource.dblEntryUid);
}
