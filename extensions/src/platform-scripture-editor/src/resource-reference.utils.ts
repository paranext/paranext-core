import type { DblResourceReference, ProjectReference, ResourceReference } from 'platform-scripture';
import { formatProjectName } from 'platform-bible-utils';
import type { DblResourceData } from 'platform-bible-utils';
import { findCachedDblResource } from './scripture-text-grid/dbl-resource-lookup.utils';

/**
 * Returns true if the {@link DblResourceData} entry was synthesized from a locally-installed non-DBL
 * project (e.g. VULGP83, TNN, TND, HBK). Locally-installed non-DBL resources use `dblEntryUid ===
 * projectId` as a synthetic marker set by `getLocalNonDblResources` so that callers can create a
 * {@link ProjectReference} instead of a {@link DblResourceReference}.
 *
 * @param resource The DBL resource data entry to check
 * @returns `true` if the entry is a locally-installed non-DBL resource
 */
export function isNonDblResource(resource: DblResourceData): boolean {
  return resource.dblEntryUid !== '' && resource.dblEntryUid === resource.projectId;
}

/**
 * Checks if a {@link ResourceReference} is a {@link DblResourceReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link DblResourceReference}, otherwise `false`
 */
export function isDblResourceReference(item: unknown): item is DblResourceReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'dblResource' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Checks if a {@link ResourceReference} is a {@link ProjectReference}.
 *
 * @param item The resource reference to check
 * @returns `true` if the item is a {@link ProjectReference}, otherwise `false`
 */
export function isProjectReference(item: unknown): item is ProjectReference {
  return (
    !!item &&
    typeof item === 'object' &&
    'type' in item &&
    item.type === 'project' &&
    'id' in item &&
    'name' in item
  );
}

/**
 * Returns the display label for a resource reference. A DBL resource is labelled short-name-first
 * through {@link formatProjectName} — `{displayName} - {fullName}` — falling back to `ref.name` if
 * the DblResourceData entry is not yet in the list. Returns `ref.name` for project references.
 *
 * A resource's `displayName` is its short identifying name, so it takes the `shortName` slot. The
 * helper's de-dup matters here: a locally-installed non-DBL resource is synthesized with `fullName`
 * falling back to the same string as `displayName` (see `getLocalNonDblResources`), and without it
 * such a resource would read `WEB - WEB`.
 *
 * @param ref The resource reference to label
 * @param dblResourcesList The list of known DBL resources to look up `ref` in when it's a
 *   {@link DblResourceReference}
 * @returns The display label for `ref`
 */
export function getRefLabel(ref: ResourceReference, dblResourcesList: DblResourceData[]): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData)
      return formatProjectName({ shortName: dblData.displayName, fullName: dblData.fullName });
    return ref.name;
  }
  if (isProjectReference(ref)) {
    return ref.name;
  }
  return '';
}

/**
 * A stable identity for a resource reference, for use as a React key, a radio-group value, or a
 * persisted selection. Namespaced by reference kind because a DBL entry UID and a project ID are
 * drawn from different spaces and could otherwise collide.
 *
 * @param reference The resource reference to identify
 * @returns The namespaced row id
 */
export function getResourceReferenceRowId(reference: ResourceReference): string {
  if (isDblResourceReference(reference)) return `dbl:${reference.id}`;
  if (isProjectReference(reference)) return `project:${reference.id}`;
  const name = 'name' in reference && reference.name ? reference.name : '';
  return `${reference.type}:${name}`;
}

/**
 * The bare id a reference is identified by within its own kind — the DBL entry UID or the project
 * id. Used to recognize a selection persisted before ids were namespaced by kind; prefer
 * {@link getResourceReferenceRowId} everywhere else.
 *
 * @param reference The resource reference to read
 * @returns The un-namespaced id, or `undefined` for a kind that has none
 */
export function getResourceReferenceBareId(reference: ResourceReference): string | undefined {
  if (isDblResourceReference(reference) || isProjectReference(reference)) return reference.id;
  return undefined;
}

/**
 * The installed project a model text reference shows, or `undefined` while it is not installed. A
 * DBL reference resolves through the catalog; a project reference only when the catalog lists the
 * project as installed on this computer, so an admin-shared reference to a project the user lacks
 * resolves to nothing.
 *
 * @param reference The configured model text
 * @param dblResources The catalog, including locally-installed non-DBL resources
 */
export function resolveModelTextProjectId(
  reference: ResourceReference | undefined,
  dblResources: DblResourceData[],
): string | undefined {
  if (isDblResourceReference(reference)) {
    const match = findCachedDblResource(reference, dblResources);
    return match?.installed ? match.projectId : undefined;
  }
  if (isProjectReference(reference))
    return dblResources.find((r) => isNonDblResource(r) && r.projectId === reference.id)?.projectId;
  return undefined;
}
