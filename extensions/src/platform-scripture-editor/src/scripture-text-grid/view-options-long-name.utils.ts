import type { DblResourceData } from 'platform-bible-utils';
import type { BibleTextReference } from '../scripture-text-grid-contents.utils';
import { isDblResourceReference } from '../resource-reference.utils';
import { findCachedDblResource } from './dbl-resource-lookup.utils';

/**
 * Resolves the long/full name shown after a row's short name in the View Options TEXTS list.
 *
 * DBL resources only: finds the reference in the cached DBL resource list and returns its
 * `fullName`. Returns `undefined` for project references, when no cached entry matches, when the
 * cached `fullName` is empty, or when it equals the short `name` (which would render a redundant
 * "NIV — NIV"). The short `name` on a DBL reference is the resource's `displayName` (see
 * `selectTextConnection`), so this comparison is effectively `fullName !== displayName`.
 */
export function resolveDblLongName(
  reference: BibleTextReference,
  cachedResources: DblResourceData[],
): string | undefined {
  if (!isDblResourceReference(reference)) return undefined;
  const fullName = findCachedDblResource(reference, cachedResources)?.fullName;
  if (!fullName || fullName === reference.name) return undefined;
  return fullName;
}
