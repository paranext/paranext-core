import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus } from 'platform-get-resources';
import { isDblResourceReference } from '../resource-reference.utils';
import type { BibleTextReference } from '../scripture-text-grid-contents.utils';
import { findCachedDblResource } from './dbl-resource-lookup.utils';

/**
 * Why a grid resource has no project to render. Absent when it has one.
 *
 * - `notInstalled` — the catalog row or the disk scan said so, or the catalog did not fail and the
 *   disk scan had no answer.
 * - `unverified` — the catalog failed and the disk scan had no answer, so the grid cannot say whether
 *   the resource is installed, and must not claim it is missing.
 * - `checking` — an answer is still on its way.
 */
export type GridResourceUnresolvedReason = 'notInstalled' | 'unverified' | 'checking';

/**
 * A resource to render as a grid cell. `projectId` is `undefined` when the reference could not be
 * resolved to an installed project, and `unresolvedReason` then says why.
 */
export type GridResource = {
  resourceId: string;
  projectId: string | undefined;
  label: string;
  unresolvedReason?: GridResourceUnresolvedReason;
};

/**
 * What the backend's disk scan (`recomputeDblResourcesInstallStatus`) says is installed. It needs
 * no catalog, so it resolves installed resources offline.
 *
 * - `answered` — the scan named installed resources: project id keyed by DBL entry uid. A uid absent
 *   from the map is treated as not installed (the scan can omit a project it could not read;
 *   rare).
 * - `pending` — an answer may still come: the scan or the catalog is in flight.
 * - `unanswered` — not asked (the catalog resolved every reference), or no answer is coming: the scan
 *   failed or returned an empty map, which the backend means as "no answer".
 */
export type InstallLookup =
  | { status: 'pending' }
  | { status: 'answered'; installedProjectIds: DblResourceInstallStatus }
  | { status: 'unanswered' };

const UNANSWERED: InstallLookup = { status: 'unanswered' };

/**
 * Folds the disk scan into an {@link InstallLookup}.
 *
 * @param answer The current ask's result: `undefined` until it answers; `status` is `undefined`
 *   when the ask failed.
 */
export function toInstallLookup(
  answer: { status: DblResourceInstallStatus | undefined } | undefined,
  context: { isNeeded: boolean; isCatalogLoading: boolean },
): InstallLookup {
  if (!context.isNeeded) return UNANSWERED;
  if (answer?.status && Object.keys(answer.status).length > 0)
    return { status: 'answered', installedProjectIds: answer.status };
  if (!answer || context.isCatalogLoading) return { status: 'pending' };
  return UNANSWERED;
}

/**
 * The project id the disk scan reported for a uid, if any. Case-insensitive because uid casing
 * differs by source (see `indexDblResourcesByUid`); own keys only because the map is deserialized
 * JSON, and a uid spelling an `Object.prototype` member must not resolve to a function.
 */
function findInstalledProjectId(
  installedProjectIds: DblResourceInstallStatus,
  uid: string,
): string | undefined {
  const wanted = uid.toLowerCase();
  const key = Object.keys(installedProjectIds).find(
    (candidate) => candidate.toLowerCase() === wanted,
  );
  const projectId = key === undefined ? undefined : installedProjectIds[key];
  return projectId || undefined;
}

/** The installed project a catalog row names, if it names one. */
function getCatalogProjectId(row: DblResourceData | undefined): string | undefined {
  return row?.installed && row.projectId ? row.projectId : undefined;
}

/**
 * Whether any DBL reference cannot be resolved through the catalog alone — the only case in which
 * the grid needs to ask the backend what is installed on disk.
 */
export function needsInstallLookup(
  references: BibleTextReference[],
  dblResources: DblResourceData[],
): boolean {
  return references.some(
    (reference) =>
      isDblResourceReference(reference) &&
      !getCatalogProjectId(findCachedDblResource(reference, dblResources)),
  );
}

/**
 * Maps the Bible-text references chosen for display to renderable grid cells. A cell fetches its
 * chapter text by `projectId`, so each reference must resolve to the _installed project's_ id:
 *
 * - `ProjectReference` — its `id` already IS the project id.
 * - `DblResourceReference` — its `id` is the DBL entry UID, NOT a project id. Resolved through the
 *   cached catalog when a row says it is installed, otherwise through the backend's disk scan
 *   (`installLookup`), which needs no catalog at all — offline, or on a build with no DBL
 *   credentials.
 *
 * A DBL resource that resolves to no project is still included, with `projectId: undefined` and an
 * `unresolvedReason`, so it stays visible in the grid and in View Options. It is `unverified` only
 * when the catalog failed (`hasCatalogError`), so a build with no DBL credentials says "not
 * installed".
 */
export function toGridResources(
  references: BibleTextReference[],
  dblResources: DblResourceData[],
  installLookup: InstallLookup = UNANSWERED,
  hasCatalogError = false,
): GridResource[] {
  return references.map((reference): GridResource => {
    const base = { resourceId: reference.id, label: reference.name };
    if (!isDblResourceReference(reference)) return { ...base, projectId: reference.id };

    const row = findCachedDblResource(reference, dblResources);
    const fromCatalog = getCatalogProjectId(row);
    if (fromCatalog) return { ...base, projectId: fromCatalog };

    const unresolved = (unresolvedReason: GridResourceUnresolvedReason): GridResource => ({
      ...base,
      projectId: undefined,
      unresolvedReason,
    });
    if (installLookup.status === 'answered') {
      const fromDisk = findInstalledProjectId(installLookup.installedProjectIds, reference.id);
      return fromDisk ? { ...base, projectId: fromDisk } : unresolved('notInstalled');
    }
    // With no disk answer, a catalog row is still authoritative.
    if (row) return unresolved('notInstalled');
    if (installLookup.status === 'pending') return unresolved('checking');
    return unresolved(hasCatalogError ? 'unverified' : 'notInstalled');
  });
}

export default toGridResources;
