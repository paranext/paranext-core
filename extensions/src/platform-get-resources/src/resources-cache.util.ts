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
        : // Otherwise uses the `dblEntryUid` which contains the first part of the project id.
          // Guard against an empty dblEntryUid: ''.startsWith('') is true for every string.
          resource.dblEntryUid !== '' &&
          localProjectId.toLowerCase().startsWith(resource.dblEntryUid.toLowerCase()),
    );

    const installed = matchingLocalProjectId !== undefined;
    const installedChanged = installed !== resource.installed;

    // Prefer the backend's answer. Falling back to `false` when the installed state just changed
    // keeps a stale "update available" from riding along with a resource that was installed or
    // removed outside this list.
    const installedUpdateAvailable =
      updateStatus?.[resource.dblEntryUid] ?? (installedChanged ? false : resource.updateAvailable);

    // The flag only means anything for an installed resource — "the copy on disk is out of date" —
    // and that is the only state the list renders it in. The backend reports `true` for every
    // uninstalled resource, because having nothing installed trivially fails its "is the installed
    // copy the newest" test, so taking that answer at face value would persist a flag that
    // describes nothing.
    const updateAvailable = installed && installedUpdateAvailable;

    // An installed resource's id is whichever local project it matched; an uninstalled one has
    // none. This can differ without `installed` differing: a row cached as installed but with an
    // empty `projectId` matches on the `dblEntryUid` prefix, so the id is recovered here.
    const projectId = matchingLocalProjectId ?? '';

    if (
      installedChanged ||
      updateAvailable !== resource.updateAvailable ||
      projectId !== resource.projectId
    ) {
      isChanged = true;
      return { ...resource, installed, updateAvailable, projectId };
    }

    return resource;
  });

  return { resources, isChanged };
}
