import type { DblResourceData } from 'platform-bible-utils';

/** Subset of `ProjectMetadata` fields the installed-flag reconciliation reads. */
export type LocalProjectInfo = { id: string; isEditable?: boolean };

/**
 * Whether `metadata` holds at least one read-only project — a resource. Read-only is the only
 * marker a resource carries, so this also answers "has the C# project factory registered yet?".
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
 * A list holding no read-only project is refused rather than trusted: the C# project factory
 * registers after activation, so an early read is indistinguishable from a machine with no
 * resources, and reconciling against it marks every installed resource not-installed — the stale
 * flag the caller then persists. A list that is only PARTIALLY registered cannot be told apart from
 * a settled one, so these flags stay a hint that consumers must be able to recover from. See
 * `adr-dbl-install-is-idempotent`.
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
