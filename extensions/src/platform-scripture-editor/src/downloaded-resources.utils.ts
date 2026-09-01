import papi, { logger } from '@papi/frontend';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import { doesCatalogRowCoverProject, getErrorMessage } from 'platform-bible-utils';
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
): PickerResource | undefined {
  const isAdminLocked =
    (isProjectReference(item) || isDblResourceReference(item)) && !!item.isInTextCollection;
  if (isDblResourceReference(item)) {
    // No catalog row means nothing can be said about the reference's type or local project, and a
    // guessed type would leak it into a type-filtered view as a blank row.
    const dbl = dblResources.find((r) => r.dblEntryUid === item.id);
    if (!dbl) return undefined;
    return {
      reference: item,
      source: item.source,
      isAdminLocked,
      type: dbl.type,
      installed: !!dbl.installed,
      projectId: dbl.installed ? dbl.projectId : undefined,
    };
  }
  if (isProjectReference(item)) {
    // A project reference carries its own local project id and display name, so it resolves without
    // the catalog. The catalog is consulted only to refine the type; any Paratext project the admin
    // shared — including an ordinary editable one, which is in no resource catalog — is a Bible text
    // by default rather than a row that disappears.
    const dblByProjectId = dblResources.find((r) => r.projectId === item.id);
    return {
      reference: item,
      source: item.source,
      isAdminLocked,
      type: dblByProjectId?.type ?? 'ScriptureResource',
      installed: true,
      projectId: item.id,
    };
  }
  // Every other reference kind (enhancedResource, xmlResource, sourceLanguageResource, and unknown
  // kinds preserved for round-trip) identifies its resource by name only. There is no local project
  // to render and no type to filter on, so it is not a picker row at all.
  return undefined;
}

/** Map a downloaded project (not already referenced) to a picker row. */
function downloadedToRow(
  project: DownloadedResource,
  dblResources: DblResourceData[],
): PickerResource {
  // A catalog row can cover this project while its `installed` flag still lags; the `installed: true`
  // below is decided by the local project file being present, not by the flag.
  const dbl = dblResources.find((r) => doesCatalogRowCoverProject(r, project.projectId));
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
    .filter((r): r is PickerResource => r !== undefined);
  const extras = downloaded
    .filter((project) => !effectiveItems.some((item) => matchesDownloaded(project, item)))
    .map((project) => downloadedToRow(project, dblResources));
  return [...referenced, ...extras];
}
