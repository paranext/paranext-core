import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DblResourceData, isPlatformError, PlatformError } from 'platform-bible-utils';
import { isDblResourceReference } from './resource-reference.utils';

export const CURRENT_DATA_VERSION = '1.0.0';
export const DEFAULT_RESOURCE_REFERENCE_LIST: ResourceReferenceList = {
  dataVersion: CURRENT_DATA_VERSION,
  items: [],
};

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
 * @param adminTextConnections The admin's selected text connections
 * @param setAdminTextConnections Function to update the admin's text connections if the current
 *   user can update them
 * @param canUserWriteProjectSettings Whether the user is able to write to the global text
 *   connection project settings
 * @param getUserTextConnections Function to retrieve the local user's text connections
 * @param setUserTextConnections Function to set the local user's text connections
 * @param installResource Function to install a DBL resource by its entry UID. If provided and the
 *   resource is not yet installed, it will be installed before the text connection settings are
 *   updated. If installation fails, the settings update is cancelled.
 * @param onSelect Callback invoked with the selected resource's dblEntryUid after a successful
 *   write
 */
export async function selectTextConnection(
  resource: DblResourceData,
  adminTextConnections: ResourceReferenceList | PlatformError | undefined,
  setAdminTextConnections: ((value: ResourceReferenceList) => void) | undefined,
  canUserWriteProjectSettings: (() => Promise<boolean>) | undefined,
  getUserTextConnections: (() => Promise<ResourceReferenceList | undefined>) | undefined,
  setUserTextConnections: ((list: ResourceReferenceList) => Promise<unknown>) | undefined,
  installResource?: (dblEntryUid: string) => Promise<void>,
  onSelect?: (dblEntryUid: string) => void,
): Promise<void> {
  if (!resource.installed && installResource) {
    await installResource(resource.dblEntryUid);
  }
  const newRef: DblResourceReference = {
    type: 'dblResource',
    name: resource.displayName,
    id: resource.dblEntryUid,
  };

  const canWrite = await canUserWriteProjectSettings?.();

  if (canWrite && setAdminTextConnections) {
    if (isPlatformError(adminTextConnections) || adminTextConnections === undefined) return;
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
    const rawUserList = await getUserTextConnections?.();
    const rawUserItems = rawUserList?.items ?? [];
    await setUserTextConnections?.({
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
