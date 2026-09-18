import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus, DblResourceUpdateStatus } from 'platform-get-resources';

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
 * @param installStatus Local project id per DBL entry uid, from the backend. A resource absent from
 *   it is one the backend did not report on, and is left exactly as it was.
 * @param updateStatus Freshly computed update availability from the backend, or `undefined` if it
 *   could not be determined. Resources absent from it keep their cached `updateAvailable`.
 * @returns The reconciled list and whether anything changed.
 */
export function reconcileCachedResources(
  cachedResources: DblResourceData[],
  installStatus: DblResourceInstallStatus,
  updateStatus: DblResourceUpdateStatus | undefined,
): ReconciledCachedResources {
  let isChanged = false;

  const resources = cachedResources.map((resource) => {
    // The backend answers this outright, keyed by uid. Matching a catalog row to a local project
    // from here cannot work: a resource project's id is unrelated to the DBL entry it was installed
    // from — ParatextData records the uid in the project's settings and matches on that — so an
    // exact-or-prefix comparison silently misses every resource whose ids diverge.
    // `Object.hasOwn`, not an `undefined` check on the value: these maps are deserialized JSON, so
    // they carry `Object.prototype`, and a uid spelling an inherited member — `toString`,
    // `constructor`, `valueOf` — would resolve to a function rather than `undefined`. The row would
    // then be read as installed with a function for its project id, and persisted. Uids are hex
    // today, so this keeps the contract true by construction rather than by what uids happen to
    // look like.
    const hasReport = Object.hasOwn(installStatus, resource.dblEntryUid);

    // Absent means the backend said nothing about this row, which is not the same as "not
    // installed". Leave it exactly as it was.
    if (!hasReport) return resource;
    const reportedProjectId = installStatus[resource.dblEntryUid] ?? '';

    const installed = reportedProjectId !== '';
    const installedChanged = installed !== resource.installed;

    // Prefer the backend's answer. Falling back to `false` when the installed state just changed
    // keeps a stale "update available" from riding along with a resource that was installed or
    // removed outside this list.
    const reportedUpdateAvailable =
      updateStatus && Object.hasOwn(updateStatus, resource.dblEntryUid)
        ? updateStatus[resource.dblEntryUid]
        : undefined;
    const installedUpdateAvailable =
      reportedUpdateAvailable ?? (installedChanged ? false : resource.updateAvailable);

    // The flag only means anything for an installed resource — "the copy on disk is out of date" —
    // and that is the only state the list renders it in. The backend reports `true` for every
    // uninstalled resource, because having nothing installed trivially fails its "is the installed
    // copy the newest" test, so taking that answer at face value would persist a flag that
    // describes nothing.
    const updateAvailable = installed && installedUpdateAvailable;

    // Whatever the backend reported — the project id for an installed resource, empty for one
    // that is not. This can differ without `installed` differing, which is the case that made the
    // old prefix inference wrong: a row cached as installed can carry the wrong id entirely.
    const projectId = reportedProjectId;

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
