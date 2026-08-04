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
 * Enumerate every locally-installed published resource and resolve its display metadata. Filters to
 * `isPublished === true` so the user's own editable scripture projects are excluded.
 *
 * Note: the renderer uses a similar enumerate-and-resolve pattern in
 * `src/renderer/hooks/use-project-picker-data.hook.ts`. A shared utility isn't possible here
 * because extensions run in the extension-host process and cannot import from `src/renderer/`.
 */
export async function fetchDownloadedResources(): Promise<DownloadedResource[]> {
  try {
    // Filter to `platform.base` rather than `platformScripture.USJ_Chapter` so that
    // commentary/notes resources that do not implement USJ (e.g. TNN, HBK) are included.
    // Using `platform.base` still guarantees the C# Paratext factory has registered before
    // the call resolves (the retry mechanism waits for non-empty results — a plain unfiltered
    // call could settle on TypeScript-only PDPFs before the C# factory appears). The
    // subsequent `isPublished` check excludes the user's own editable projects.
    const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platform.base'],
    });
    const metadata = allMetadata.filter((m) => m.isPublished === true);
    const results = await Promise.allSettled(
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
    const resolved: DownloadedResource[] = [];
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        resolved.push(result.value);
      } else {
        logger.warn(
          `fetchDownloadedResources: failed to resolve project '${metadata[i].id}': ${getErrorMessage(result.reason)}`,
        );
      }
    });
    return resolved;
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
  const isProject = isProjectReference(item);
  return {
    reference: item,
    source: item.source,
    isAdminLocked,
    type: 'ScriptureResource',
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
