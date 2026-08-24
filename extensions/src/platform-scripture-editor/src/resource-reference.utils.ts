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
  return resource.dblEntryUid === resource.projectId;
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
