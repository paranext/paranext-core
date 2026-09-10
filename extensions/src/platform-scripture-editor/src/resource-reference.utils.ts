import type { DblResourceReference, ProjectReference, ResourceReference } from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';

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
 * Returns the display label for a resource reference in the form `{fullName} ({displayName})` for
 * DBL resources, falling back to `ref.name` if the DblResourceData entry is not yet in the list.
 * Returns `ref.name` for project references.
 *
 * @param ref The resource reference to label
 * @param dblResourcesList The list of known DBL resources to look up `ref` in when it's a
 *   {@link DblResourceReference}
 * @returns The display label for `ref`
 */
export function getRefLabel(ref: ResourceReference, dblResourcesList: DblResourceData[]): string {
  if (isDblResourceReference(ref)) {
    const dblData = dblResourcesList.find((r) => r.dblEntryUid === ref.id);
    if (dblData) return `${dblData.fullName} (${dblData.displayName})`;
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
