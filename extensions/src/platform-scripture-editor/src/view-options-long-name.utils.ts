import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';
import { isDblResourceReference } from './resource-reference.utils';

/**
 * Resolves the long/full name shown after a row's short name in the View Options TEXTS list.
 *
 * DBL resources only: looks the reference up in the cached DBL resource list by `dblEntryUid ===
 * reference.id` and returns its `fullName`. Returns `undefined` for project references, when no
 * cached entry matches, when the cached `fullName` is empty, or when it equals the short `name`
 * (which would render a redundant "NIV — NIV"). The short `name` on a DBL reference is the
 * resource's `displayName` (see `selectTextConnection`), so this comparison is effectively
 * `fullName !== displayName`.
 */
export function resolveDblLongName(
  reference: DblResourceReference | ProjectReference,
  cachedResources: DblResourceData[],
): string | undefined {
  if (!isDblResourceReference(reference)) return undefined;
  const match = cachedResources.find((resource) => resource.dblEntryUid === reference.id);
  const fullName = match?.fullName;
  if (!fullName || fullName === reference.name) return undefined;
  return fullName;
}
