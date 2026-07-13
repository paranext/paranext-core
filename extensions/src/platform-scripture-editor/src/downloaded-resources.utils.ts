import papi, { logger } from '@papi/frontend';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import { getErrorMessage } from 'platform-bible-utils';
import type {
  DblResourceReference,
  EffectiveResourceReference,
  ProjectReference,
  ResourceReference,
} from 'platform-scripture';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';

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
  source: 'admin' | 'user' | 'downloaded';
  isAdminLocked: boolean;
  type: ResourceType;
  installed: boolean;
  projectId: string | undefined;
};

/** Enumerate every installed scripture project and resolve its display metadata. */
export async function fetchDownloadedResources(): Promise<DownloadedResource[]> {
  try {
    const metadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
    });
    return Promise.all(
      metadata.map(async (data) => {
        const pdp = await papi.projectDataProviders.get('platform.base', data.id);
        return {
          projectId: data.id,
          name: await pdp.getSetting('platform.name'),
          fullName: await pdp.getSetting('platform.fullName'),
          language: await pdp.getSetting('platform.language'),
        };
      }),
    );
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
    return project.projectId.toLowerCase().startsWith(reference.id.toLowerCase());
  return false;
}

/** Resolve the display type + local project id for an already-referenced item. */
function resolveReferenced(
  item: EffectiveResourceReference,
  dblResources: DblResourceData[],
): PickerResource {
  const isAdminLocked = !!item.isResourceShownByDefault;
  if (isDblResourceReference(item)) {
    const dbl = dblResources.find((r) => r.dblEntryUid === item.id);
    return {
      reference: item,
      source: item.source,
      isAdminLocked,
      type: dbl?.type ?? 'ScriptureResource',
      installed: !!dbl?.installed,
      projectId: dbl?.installed ? dbl.projectId : undefined,
    };
  }
  // ProjectReference (and any other known reference) renders as scripture.
  return {
    reference: item,
    source: item.source,
    isAdminLocked,
    type: 'ScriptureResource',
    installed: isProjectReference(item),
    projectId: isProjectReference(item) ? item.id : undefined,
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
      project.projectId.toLowerCase().startsWith(r.dblEntryUid.toLowerCase()),
  );
  if (dbl) {
    const reference: DblResourceReference = {
      type: 'dblResource',
      name: dbl.fullName,
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
    type: 'ScriptureResource',
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
  const referenced = effectiveItems.map((item) => resolveReferenced(item, dblResources));
  const extras = downloaded
    .filter((project) => !effectiveItems.some((item) => matchesDownloaded(project, item)))
    .map((project) => downloadedToRow(project, dblResources));
  return [...referenced, ...extras];
}
