import type { DblResourceData } from 'platform-bible-utils';

/**
 * The local project id for each catalogued DBL resource, keyed by DBL entry uid. An empty string
 * means the resource is not installed.
 *
 * Only the backend can produce this: a resource project's id is unrelated to the DBL entry it was
 * installed from — the entry uid is recorded in the project's settings, which is what ParatextData
 * matches on. A resource missing from this map is one the backend did not report on, and keeps
 * whatever the cache already says.
 */
export type DblResourceInstallStatus = { [dblEntryUid: string]: string };

/** Result of reconciling the cached DBL resource list against the backend's install status. */
export type ReconciledInstalledFlags = {
  /** The reconciled resource list. Entries that did not change are the same objects passed in. */
  resources: DblResourceData[];
  /** Whether any entry changed, meaning the cache is worth rewriting. */
  isChanged: boolean;
};

/**
 * Brings the `installed` and `projectId` flags on the cached DBL resource list in line with the
 * install status reported by the backend.
 *
 * @param cachedResources Resource list from the cache.
 * @param installStatus Local project id per DBL entry uid, from
 *   `recomputeDblResourcesInstallStatus`. Resources absent from it are left alone.
 * @returns The reconciled list and whether anything changed.
 */
export function reconcileInstalledFlags(
  cachedResources: DblResourceData[],
  installStatus: DblResourceInstallStatus,
): ReconciledInstalledFlags {
  let isChanged = false;

  const resources = cachedResources.map((resource) => {
    const projectId = installStatus[resource.dblEntryUid];
    // The backend said nothing about this resource, so there is nothing to correct.
    if (projectId === undefined) return resource;

    const installed = projectId !== '';
    if (installed === resource.installed && projectId === resource.projectId) return resource;

    isChanged = true;
    return {
      ...resource,
      installed,
      projectId,
      // An install or removal settles the question of a pending update: what is on disk now either
      // came from the current DBL revision or is gone.
      updateAvailable: installed === resource.installed ? resource.updateAvailable : false,
    };
  });

  return { resources, isChanged };
}

export default reconcileInstalledFlags;
