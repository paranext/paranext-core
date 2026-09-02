import type { DblResourceCatalog } from 'platform-get-resources';
import type { DblResourceData } from 'platform-bible-utils';

/**
 * The slice of the DBL resources data provider that resolving the catalog needs.
 *
 * Narrower than the provider itself so the resolution can be exercised without one — `main.ts` is
 * unreachable from a test because it imports web views through webpack's `?inline` loader.
 */
export type DblCatalogSource = {
  isGetDblResourcesAvailable: () => Promise<boolean>;
  getDblResources: (selector: undefined) => Promise<DblResourceData[] | undefined>;
};

/**
 * Resolves the DBL resources provider into the three-state answer every caller branches on.
 *
 * The three states exist because a single absent value cannot carry the difference that decides
 * what the UI may offer: an installation with no DBL credentials must not be given a retry that can
 * never succeed, while a provider that has not registered yet must be, because trying again
 * genuinely works. A fetch that breaks is a third thing again, so it REJECTS rather than
 * resolving.
 *
 * @param provider The DBL resources data provider, or `undefined` if it has not registered yet.
 * @returns The catalog, or the reason there is none to show.
 * @throws When the provider is reachable and configured but produced no catalog — a failure, not an
 *   answer. Reporting that as an empty catalog would tell the user there is nothing to download
 *   when the truth is that we could not find out.
 */
export async function resolveDblCatalog(
  provider: DblCatalogSource | undefined,
): Promise<DblResourceCatalog> {
  if (!provider) return { status: 'unavailable', reason: 'notReady' };

  if (!(await provider.isGetDblResourcesAvailable()))
    return { status: 'unavailable', reason: 'notConfigured' };

  const resources = await provider.getDblResources(undefined);
  if (!resources) throw new Error('The DBL resource catalog fetch produced no catalog');

  return { status: 'available', resources };
}

/**
 * Whether the startup background fetch should stop retrying.
 *
 * Stops on a catalog, and equally on an installation with no DBL credentials — retrying that nine
 * more times cannot change the answer. Only `notReady` is worth another attempt, which is the whole
 * reason the retry loop exists.
 *
 * @param catalog The answer from {@link resolveDblCatalog}.
 * @returns True when no further attempt could improve on this answer.
 */
export function shouldStopBackgroundFetch(catalog: DblResourceCatalog): boolean {
  return catalog.status === 'available' || catalog.reason === 'notConfigured';
}
