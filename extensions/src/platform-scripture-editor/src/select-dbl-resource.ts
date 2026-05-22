import type { DblResourceReference, ResourceReferenceList } from 'platform-scripture';
import { DblResourceData, isPlatformError, PlatformError } from 'platform-bible-utils';

export const CURRENT_DATA_VERSION = '1.0.0';
export const DEFAULT_RESOURCE_REFERENCE_LIST: ResourceReferenceList = {
  dataVersion: CURRENT_DATA_VERSION,
  items: [],
};

/**
 * Adds a DBL resource to the project's resource list.
 *
 * Uses the admin setting path if the user has write access, or the raw user list otherwise. Calls
 * `onSelect` after a successful write.
 *
 * The non-admin path reads the raw user list directly rather than filtering the effective list by
 * source. Filtering by source would silently drop user items that also appear in the admin list
 * (tagged 'admin'), causing data loss if the admin later removes their copy.
 */
export async function selectDblResource(
  resource: DblResourceData,
  {
    adminSetting,
    setAdminSetting,
    canUserWriteProjectSettings,
    getUserList,
    setUserList,
    onSelect,
  }: {
    adminSetting: ResourceReferenceList | PlatformError | undefined;
    setAdminSetting: ((value: ResourceReferenceList) => void) | undefined;
    canUserWriteProjectSettings: (() => Promise<boolean>) | undefined;
    getUserList: (() => Promise<ResourceReferenceList | undefined>) | undefined;
    setUserList: ((list: ResourceReferenceList) => Promise<unknown>) | undefined;
    onSelect?: (dblEntryUid: string) => void;
  },
): Promise<void> {
  const newRef: DblResourceReference = {
    type: 'dblResource',
    name: resource.displayName,
    id: resource.dblEntryUid,
  };

  const canWrite = await canUserWriteProjectSettings?.();

  if (canWrite && setAdminSetting) {
    if (isPlatformError(adminSetting) || adminSetting === undefined) return;
    // Use the exact current admin setting as the base so the write is a precise update —
    // deduplicate the incoming resource and prepend it, preserving all other admin items.
    const existingItems = adminSetting.items.filter((item) => {
      if (item.type !== 'dblResource') return true;
      // DblResourceReference.id exists after .type check; ResourceReference union requires cast
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return (item as DblResourceReference).id !== resource.dblEntryUid;
    });
    setAdminSetting({
      dataVersion: adminSetting.dataVersion,
      items: [newRef, ...existingItems],
    });
  } else {
    const rawUserList = await getUserList?.();
    const rawUserItems = rawUserList?.items ?? [];
    await setUserList?.({
      dataVersion: rawUserList?.dataVersion ?? DEFAULT_RESOURCE_REFERENCE_LIST.dataVersion,
      items: [
        newRef,
        ...rawUserItems.filter((item) => {
          if (item.type !== 'dblResource') return true;
          // DblResourceReference.id exists after .type check; ResourceReference union requires cast
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          return (item as DblResourceReference).id !== resource.dblEntryUid;
        }),
      ],
    });
  }

  onSelect?.(resource.dblEntryUid);
}
