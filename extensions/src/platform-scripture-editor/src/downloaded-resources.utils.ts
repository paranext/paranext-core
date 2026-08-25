import papi, { logger } from '@papi/frontend';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import { getErrorMessage } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ProjectReference,
  ResourceReference,
} from 'platform-scripture';
import {
  isDblResourceReference,
  isNonDblResource,
  isProjectReference,
} from './resource-reference.utils';

/** A locally-installed scripture project, with its display metadata resolved. */
export type DownloadedResource = {
  projectId: string;
  name: string;
  fullName: string;
  language: string;
};

/** A single row the picker can render. `reference` is the storage-shaped reference. */
export type PickerResource = {
  reference: ResourceReference;
  /**
   * `'admin'` and `'user'` are copied from `EffectiveResourceReference.source`; `'downloaded'` is
   * synthetic for projects not in any referenced list.
   */
  source: 'admin' | 'user' | 'downloaded';
  isAdminLocked: boolean;
  type: ResourceType;
  installed: boolean;
  projectId: string | undefined;
};

/**
 * Enumerate every locally-installed read-only reference resource and resolve its display metadata.
 * Filters to `isEditable === false` to exclude the user's own editable translation projects while
 * including both DBL-published resources and locally-installed read-only resources (e.g. VULGP83,
 * TNN, TND, HBK) that have `isPublished === false` but `isEditable === false`.
 *
 * Note: the renderer uses a similar enumerate-and-resolve pattern in
 * `src/renderer/hooks/use-project-picker-data.hook.ts`. A shared utility isn't possible here
 * because extensions run in the extension-host process and cannot import from `src/renderer/`.
 */
export async function fetchDownloadedResources(): Promise<DownloadedResource[]> {
  try {
    // Filter to `platform.base` rather than `platformScripture.USJ_Chapter` so that
    // commentary/notes resources that do not implement USJ are included.
    // Then filter to `isEditable === false`: DBL resources always have this flag; locally-installed
    // read-only resources (VULGP83, TNN, TND, HBK) have `Editable=F` in their Settings.xml and
    // therefore also get `isEditable: false`, even though `isPublished` is `false` for them.
    // The user's own editable translation projects have `isEditable: true` and are excluded.
    // Per the project-metadata model: absence means editable, so the test MUST be `=== false`.
    const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platform.base'],
    });
    const metadata = allMetadata.filter((m) => m.isEditable === false);
    return metadata.map((data) => ({
      projectId: data.id,
      name: data.name ?? data.id,
      fullName: data.fullName ?? data.name ?? data.id,
      language: data.language ?? '',
    }));
  } catch (e) {
    logger.warn(`fetchDownloadedResources failed: ${getErrorMessage(e)}`);
    return [];
  }
}

/**
 * Whether a downloaded project is the same resource as an existing reference: exact project-id
 * match for ProjectReferences, or a dblEntryUid prefix match for DblResourceReferences (the local
 * project id of an installed DBL resource begins with its dblEntryUid).
 */
export function matchesDownloaded(
  project: DownloadedResource,
  reference: ResourceReference,
): boolean {
  if (isProjectReference(reference)) return reference.id === project.projectId;
  if (isDblResourceReference(reference))
    return (
      reference.id !== '' && project.projectId.toLowerCase().startsWith(reference.id.toLowerCase())
    );
  return false;
}

/** Resolve the display type + local project id for an already-referenced item. */
function resolveReferenced(
  item: EffectiveResourceReference,
  dblResources: DblResourceData[],
): PickerResource | null {
  const isAdminLocked =
    (isProjectReference(item) || isDblResourceReference(item)) && !!item.isInTextCollection;
  if (isDblResourceReference(item)) {
    const dbl = dblResources.find((r) => r.dblEntryUid === item.id);
    if (!dbl) return null;
    return {
      reference: item,
      source: item.source,
      isAdminLocked,
      type: dbl.type,
      installed: !!dbl.installed,
      projectId: dbl.installed ? dbl.projectId : undefined,
    };
  }
  // ProjectReference — look up type in the DBL catalog in case the project is a DBL-backed resource.
  const isProject = isProjectReference(item);
  const dblByProjectId = isProject ? dblResources.find((r) => r.projectId === item.id) : undefined;
  return {
    reference: item,
    source: item.source,
    isAdminLocked,
    type: dblByProjectId?.type ?? 'ScriptureResource',
    installed: isProject,
    projectId: isProject ? item.id : undefined,
  };
}

/** Map a downloaded project (not already referenced) to a picker row. */
function downloadedToRow(
  project: DownloadedResource,
  dblResources: DblResourceData[],
): PickerResource {
  const dbl = dblResources.find(
    (r) =>
      (r.installed && r.projectId === project.projectId) ||
      // The second branch matches a DBL entry whose cache row is not yet flagged installed (e.g.
      // the flag lags an update), but the local project exists on disk — installed: true is still
      // correct because the local project file is present.
      (r.dblEntryUid !== '' &&
        project.projectId.toLowerCase().startsWith(r.dblEntryUid.toLowerCase())),
  );
  if (dbl && !isNonDblResource(dbl)) {
    const reference: DblResourceReference = {
      type: 'dblResource',
      name: dbl.displayName,
      id: dbl.dblEntryUid,
    };
    return {
      reference,
      source: 'downloaded',
      isAdminLocked: false,
      type: dbl.type,
      installed: true,
      projectId: project.projectId,
    };
  }
  const reference: ProjectReference = {
    type: 'project',
    name: project.name,
    id: project.projectId,
  };
  return {
    reference,
    source: 'downloaded',
    isAdminLocked: false,
    type: dbl?.type ?? 'ScriptureResource',
    installed: true,
    projectId: project.projectId,
  };
}

/** Union referenced items with downloaded-but-unreferenced projects, deduped (referenced wins). */
export function buildPickerResources(
  effectiveItems: EffectiveResourceReference[],
  downloaded: DownloadedResource[],
  dblResources: DblResourceData[],
): PickerResource[] {
  const referenced = effectiveItems
    .map((item) => resolveReferenced(item, dblResources))
    .filter((r): r is PickerResource => r !== null);
  const extras = downloaded
    .filter((project) => !effectiveItems.some((item) => matchesDownloaded(project, item)))
    .map((project) => downloadedToRow(project, dblResources));
  return [...referenced, ...extras];
}
