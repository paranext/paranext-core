import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference } from 'platform-scripture';

/**
 * Finds the cached DBL resource entry a reference points to, matched by `dblEntryUid`. Callers
 * guard `isDblResourceReference` and pass the narrowed reference; returns `undefined` when the
 * resource is not in the cached list. Centralizes the match key so the grid-cell and long-name
 * lookups stay in sync.
 */
export function findCachedDblResource(
  reference: DblResourceReference,
  cachedResources: DblResourceData[],
): DblResourceData | undefined {
  return cachedResources.find((resource) => resource.dblEntryUid === reference.id);
}
