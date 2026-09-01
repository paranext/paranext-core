import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceUpdateStatus } from 'platform-get-resources';

/** Result of reconciling the cached DBL resource list against current local state. */
export type ReconciledCachedResources = {
  /** The reconciled resource list. Entries that did not change are the same objects passed in. */
  resources: DblResourceData[];
  /** Whether any entry changed, meaning the cache is worth rewriting. */
  isChanged: boolean;
};

/**
 * Bring the cached DBL resource list back in line with current local state.
 *
 * @param cachedResources Resource list from the cache.
 * @param localProjectIds Ids of the Scripture projects currently present locally.
 * @param updateStatus Freshly computed update availability from the backend, or `undefined` if it
 *   could not be determined. Resources absent from it keep their cached `updateAvailable`.
 * @returns The reconciled list and whether anything changed.
 */
export function reconcileCachedResources(
  cachedResources: DblResourceData[],
  localProjectIds: string[],
  updateStatus: DblResourceUpdateStatus | undefined,
): ReconciledCachedResources {
  let isChanged = false;

  const resources = cachedResources.map((resource) => {
    const matchingLocalProjectId = localProjectIds.find((localProjectId) =>
      // If the `projectId` is defined then tries to use that
      resource.projectId
        ? resource.projectId === localProjectId
        : // Otherwise uses the `dblEntryUid` which contains the first part of the project id
          localProjectId.toLowerCase().startsWith(resource.dblEntryUid.toLowerCase()),
    );

    const installed = matchingLocalProjectId !== undefined;
    const installedChanged = installed !== resource.installed;

    // Prefer the backend's answer. Falling back to `false` when the installed state just changed
    // keeps a stale "update available" from riding along with a resource that was installed or
    // removed outside this list.
    const updateAvailable =
      updateStatus?.[resource.dblEntryUid] ?? (installedChanged ? false : resource.updateAvailable);

    // Only an install or removal moves a resource between having and not having a project, so
    // `projectId` can only differ when `installedChanged` is already true.
    const projectId = installedChanged ? (matchingLocalProjectId ?? '') : resource.projectId;

    if (installedChanged || updateAvailable !== resource.updateAvailable) {
      isChanged = true;
      return { ...resource, installed, updateAvailable, projectId };
    }

    return resource;
  });

  return { resources, isChanged };
}
