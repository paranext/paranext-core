import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference } from 'platform-scripture';

/**
 * Whether two DBL entry uids name the same entry. Case-insensitive because uid casing differs by
 * source (see `indexDblResourcesByUid`).
 */
export function isSameDblEntryUid(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

/**
 * Finds the cached DBL resource entry a reference points to, matched by `dblEntryUid` (see
 * {@link isSameDblEntryUid}). Callers guard `isDblResourceReference` and pass the narrowed
 * reference; returns `undefined` when the resource is not in the cached list. Centralizes the match
 * key so the grid-cell and long-name lookups stay in sync.
 */
export function findCachedDblResource(
  reference: DblResourceReference,
  cachedResources: DblResourceData[],
): DblResourceData | undefined {
  return cachedResources.find((resource) => isSameDblEntryUid(resource.dblEntryUid, reference.id));
}
