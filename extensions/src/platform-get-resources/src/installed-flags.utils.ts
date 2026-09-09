import type { DblResourceData } from 'platform-bible-utils';

/** Subset of `ProjectMetadata` fields the installed-flag reconciliation reads. */
export type LocalProjectInfo = { id: string; isEditable?: boolean };

/**
 * Whether `metadata` contains at least one read-only project — a resource.
 *
 * Read-only is the only marker a resource carries in project metadata, so this doubles as "has the
 * C# project factory registered its projects yet?" for the reconciliation below.
 *
 * @param metadata Project metadata from `papi.projectLookup.getMetadataForAllProjects`
 * @returns `true` when at least one project in `metadata` is read-only
 */
export function hasResourceProject(metadata: LocalProjectInfo[]): boolean {
  return metadata.some((m) => m.isEditable === false);
}

/**
 * Reconciles the `installed` flags on cached DBL catalog rows against the local project list.
 *
 * A row matches a local project by `projectId` when it has one, and otherwise by the convention
 * that an installed DBL resource's project id begins with its DBL entry uid. A match marks the row
 * installed and records the project id; no match marks it not-installed.
 *
 * The absence of any read-only project is not evidence that nothing is installed. The C# project
 * factory registers its projects after activation, so a read that resolves first returns only the
 * TypeScript factories' projects — indistinguishable from a machine with no resources. Trusting
 * such a list marks every installed resource not-installed, and the caller persists that: the
 * resulting stale `installed: false` is what later makes a panel try to install a resource it
 * already has on disk. Nothing can be marked installed from that list either, so the whole
 * reconciliation is skipped.
 *
 * That guard covers the list being empty of resources, not the narrower window in which some
 * resource projects have registered and others have not — a partial list is not distinguishable
 * from a settled one here. Consumers must therefore stay able to recover from a stale `installed:
 * false` (an install of an already-installed resource succeeds as a no-op, and a panel re-reads the
 * catalog before retrying) rather than treating these flags as authoritative.
 *
 * @param cachedResources The cached DBL catalog rows to reconcile
 * @param localProjectMetadata Project metadata from `papi.projectLookup.getMetadataForAllProjects`
 * @returns The reconciled rows, or `undefined` when there is nothing to write — either the metadata
 *   cannot be trusted or every flag already agrees with it
 */
export function reconcileInstalledFlags(
  cachedResources: DblResourceData[],
  localProjectMetadata: LocalProjectInfo[],
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
