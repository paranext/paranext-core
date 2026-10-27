import papi, { logger } from '@papi/frontend';
import type { DblResourceData, ResourceType } from 'platform-bible-utils';
import {
  doesCatalogRowCoverProject,
  getErrorMessage,
  normalizeFullName,
} from 'platform-bible-utils';
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
  /**
   * Absent when the resource has no full name distinct from its short one. Deliberately not
   * mirrored from `name`: a mirrored value claims a full name the resource does not have, which
   * every consumer then has to un-claim.
   */
  fullName?: string;
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
    const metadata = allMetadata.filter((m) => m.isEditable === false && !m.unsupportedReason);
    return metadata.map((data) => ({
      projectId: data.id,
      name: data.name ?? data.id,
      fullName: normalizeFullName(data.fullName),
      language: data.language ?? '',
    }));
  } catch (e) {
    logger.warn(`fetchDownloadedResources failed: ${getErrorMessage(e)}`);
    return [];
  }
}

/**
 * Index catalog rows by DBL entry uid for {@link matchesDownloaded}.
 *
 * Keys are lower-cased because uid casing differs by source — the C# catalog whitelist stores them
 * upper-case, the commentary whitelist lower-case — so an exact comparison silently misses. Callers
 * build this once rather than per comparison: the picker tests every downloaded project against
 * every listed reference, and a scan of the ~1800-row catalog inside that pair of loops is a
 * multiplicative cost for a lookup that does not change.
 */
export function indexDblResourcesByUid(
  dblResources: DblResourceData[],
): ReadonlyMap<string, DblResourceData> {
  return new Map(dblResources.map((row) => [row.dblEntryUid.toLowerCase(), row]));
}

/**
 * Whether a downloaded project is the same resource as an existing reference: exact project-id
 * match for a `ProjectReference`, or — for a `DblResourceReference` — whichever catalog row carries
 * that uid, resolved against the project the same way the rest of the picker resolves it.
 *
 * Resolving through the catalog rather than comparing the uid to the project id directly is what
 * makes a divergent-id resource match: a resource project's id is unrelated to the DBL entry it was
 * installed from, so the two share a prefix for some resources and nothing at all for others. A
 * reference whose uid is absent from the catalog matches nothing, which is the same conclusion
 * `downloadedToRow` reaches when it classifies such a project as non-DBL.
 *
 * @param project The locally-installed project to test.
 * @param reference The existing reference to test it against.
 * @param dblResourcesByUid Catalog rows from {@link indexDblResourcesByUid}, used to resolve a
 *   `DblResourceReference` to a local project.
 */
export function matchesDownloaded(
  project: DownloadedResource,
  reference: ResourceReference,
  dblResourcesByUid: ReadonlyMap<string, DblResourceData>,
): boolean {
  if (isProjectReference(reference)) return reference.id === project.projectId;
  if (isDblResourceReference(reference)) {
    if (reference.id === '') return false;
    const row = dblResourcesByUid.get(reference.id.toLowerCase());
    return row !== undefined && doesCatalogRowCoverProject(row, project.projectId);
  }
  return false;
}

/** Resolve the display type + local project id for an already-referenced item. */
function resolveReferenced(
  item: EffectiveResourceReference,
  dblResources: DblResourceData[],
  dblResourcesByUid: ReadonlyMap<string, DblResourceData>,
): PickerResource | undefined {
  const isAdminLocked =
    (isProjectReference(item) || isDblResourceReference(item)) && !!item.isInTextCollection;
  if (isDblResourceReference(item)) {
    // No catalog row means nothing can be said about the reference's type or local project, and a
    // guessed type would leak it into a type-filtered view as a blank row.
    // Through the same index `matchesDownloaded` uses. Resolving a uid two different ways in one
    // file is how a resource goes missing entirely: dropped here for want of an exact match, and
    // filtered out of the extras below because the case-insensitive lookup there did match.
    const dbl = dblResourcesByUid.get(item.id.toLowerCase());
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

/**
 * Union referenced items with downloaded-but-unreferenced projects, deduped (referenced wins).
 *
 * The per-reference-kind typing this applies is mirrored by `splitResourcesByTab` in
 * `src/renderer/components/dialogs/team-layout.utils.ts`, which sorts the same setting into the
 * Team layout dialog's tabs. It cannot import from an extension, so the two are kept in step by
 * hand: change a typing rule here and change it there.
 *
 * They currently disagree in two ways, documented in full on that function. One is deliberate — a
 * `dblResource` missing from the catalog is dropped here (see `resolveReferenced`) and preserved
 * there, because that side round-trips the setting instead of rendering it. The other is not: that
 * side routes every `project` reference to its Bible Texts tab, while `resolveReferenced` refines
 * the type from the catalog, so a locally-installed commentary appears under Commentaries here and
 * under Bible Texts there.
 */
export function buildPickerResources(
  effectiveItems: EffectiveResourceReference[],
  downloaded: DownloadedResource[],
  dblResources: DblResourceData[],
): PickerResource[] {
  const dblResourcesByUid = indexDblResourcesByUid(dblResources);
  const referenced = effectiveItems
    .map((item) => resolveReferenced(item, dblResources, dblResourcesByUid))
    .filter((r): r is PickerResource => r !== undefined);
  const extras = downloaded
    .filter(
      (project) =>
        !effectiveItems.some((item) => matchesDownloaded(project, item, dblResourcesByUid)),
    )
    .map((project) => downloadedToRow(project, dblResources));
  return [...referenced, ...extras];
}

/**
 * What a panel opens the resource picker dialog with, and what removing a resource there takes off
 * the user's list.
 */
export type PickerDialogSelection = {
  /** For the dialog's `selectedResourceIds`: the team's ids, then the removable ones */
  selectedResourceIds: string[];
  /** For the dialog's `teamResourceIds` */
  teamResourceIds: string[];
  /**
   * For each removable id, the ids the user's list stores that resource under: usually one, and
   * more when the list names the same resource twice (by its DBL entry and by its project)
   */
  listIdsByRemovableId: ReadonlyMap<string, string[]>;
};

/**
 * The id the resource picker dialog knows a reference by: the `dblEntryUid` of the catalog row it
 * resolves to, or its own id when no row matches. The dialog matches ids exactly, while a DBL entry
 * uid is cased differently by different sources and a list can name a DBL resource by its project,
 * so either would otherwise list a resource the user already has under "Installed". A project
 * reference prefers the row whose `projectId` is that project over one that only covers it by uid
 * prefix. References that name neither a DBL entry nor a project have no row, and no id.
 */
function toPickerDialogId(
  reference: ResourceReference,
  dblResources: DblResourceData[],
  dblResourcesByUid: ReadonlyMap<string, DblResourceData>,
): string | undefined {
  if (isDblResourceReference(reference))
    return dblResourcesByUid.get(reference.id.toLowerCase())?.dblEntryUid ?? reference.id;
  if (isProjectReference(reference)) {
    const row =
      dblResources.find((candidate) => candidate.projectId === reference.id) ??
      dblResources.find((candidate) => doesCatalogRowCoverProject(candidate, reference.id));
    return row?.dblEntryUid ?? reference.id;
  }
  return undefined;
}

/**
 * Builds what the resource picker dialog is opened with from the references a panel lists: the
 * team's, which the dialog locks, and the user's own, which it lets the user remove. A resource in
 * both is the team's.
 *
 * @param teamReferences References the team shared, which the user cannot remove
 * @param removableReferences References from the user's own list
 * @param dblResources The catalog rows, DBL and locally-installed non-DBL alike
 * @returns The dialog's ids, and the list ids behind each removable one
 */
export function getPickerDialogSelection(
  teamReferences: ResourceReference[],
  removableReferences: ResourceReference[],
  dblResources: DblResourceData[],
): PickerDialogSelection {
  const dblResourcesByUid = indexDblResourcesByUid(dblResources);
  const teamIds = new Set<string>();
  teamReferences.forEach((reference) => {
    const id = toPickerDialogId(reference, dblResources, dblResourcesByUid);
    if (id !== undefined) teamIds.add(id);
  });

  const listIdsByRemovableId = new Map<string, string[]>();
  removableReferences.forEach((reference) => {
    const id = toPickerDialogId(reference, dblResources, dblResourcesByUid);
    if (id === undefined || teamIds.has(id)) return;
    if (!isDblResourceReference(reference) && !isProjectReference(reference)) return;
    listIdsByRemovableId.set(id, [...(listIdsByRemovableId.get(id) ?? []), reference.id]);
  });

  return {
    selectedResourceIds: [...teamIds, ...listIdsByRemovableId.keys()],
    teamResourceIds: [...teamIds],
    listIdsByRemovableId,
  };
}
