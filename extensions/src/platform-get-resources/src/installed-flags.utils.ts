import type { DblResourceData } from 'platform-bible-utils';

/** Subset of `ProjectMetadata` fields the installed-flag reconciliation reads. */
export type LocalProjectInfo = { id: string; isEditable?: boolean };

/**
 * Whether `metadata` holds at least one read-only project — a resource. Evidence that the C#
 * project factory has STARTED registering, never that it has finished: one read-only project from
 * any factory satisfies it.
 *
 * @param metadata Project metadata from `papi.projectLookup.getMetadataForAllProjects`
 * @returns `true` when at least one project in `metadata` is read-only
 */
export function hasResourceProject(metadata: LocalProjectInfo[]): boolean {
  return metadata.some((m) => m.isEditable === false);
}

/**
 * Reconciles the `installed` flags on cached DBL catalog rows against the local project list. A row
 * matches a project by `projectId` when it has one, otherwise by the convention that an installed
 * resource's project id begins with its DBL entry uid.
 *
 * A row's PRESENCE in the list is always trustworthy — the project is there, so the resource is
 * installed. Its ABSENCE is not, until the factories have finished registering: an early read is
 * indistinguishable from a machine with no resources, and reconciling against it marks installed
 * resources not-installed — the stale flag the caller then persists, which is the bug this whole
 * mechanism exists to prevent. So absence only downgrades a row once `canTrustAbsence` says the
 * list is settled; before that the reconciliation upgrades and nothing else. See
 * `adr-dbl-install-is-idempotent`.
 *
 * @param cachedResources The cached DBL catalog rows to reconcile
 * @param localProjectMetadata Project metadata from `papi.projectLookup.getMetadataForAllProjects`
 * @param canTrustAbsence Whether a project missing from `localProjectMetadata` is evidence that it
 *   is not installed, rather than evidence that registration is still in progress
 * @returns The reconciled rows, or `undefined` when there is nothing to write — either the metadata
 *   cannot be trusted or every flag already agrees with it
 */
export function reconcileInstalledFlags(
  cachedResources: DblResourceData[],
  localProjectMetadata: LocalProjectInfo[],
  canTrustAbsence: boolean,
): DblResourceData[] | undefined {
  if (!hasResourceProject(localProjectMetadata)) return undefined;

  let isChanged = false;
  const reconciled = cachedResources.map((resource) => {
    const matchingLocalProject = localProjectMetadata.find((localProject) =>
      // If the `projectId` is defined then tries to use that
      resource.projectId
        ? resource.projectId === localProject.id
        : // Otherwise uses the `dblEntryUid` which contains the first part of the project id.
          // Guard against empty dblEntryUid: ''.startsWith('') is true for every string.
          resource.dblEntryUid !== '' &&
          localProject.id.toLowerCase().startsWith(resource.dblEntryUid.toLowerCase()),
    );

    const isInstalled = matchingLocalProject !== undefined;
    if (isInstalled === resource.installed) return resource;
    // Absence is not yet evidence — leave the row alone rather than calling it uninstalled.
    if (!isInstalled && !canTrustAbsence) return resource;

    isChanged = true;
    return {
      ...resource,
      installed: isInstalled,
      updateAvailable: false,
      projectId: matchingLocalProject?.id ?? '',
    };
  });

  return isChanged ? reconciled : undefined;
}
