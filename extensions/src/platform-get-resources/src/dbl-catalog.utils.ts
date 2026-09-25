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
 * @throws When the provider is reachable and configured but produced no catalog, or delivered an
 *   empty one — a failure, not an answer. Reporting that as an empty catalog would tell the user
 *   there is nothing to download when the truth is that we could not find out.
 */
export async function resolveDblCatalog(
  provider: DblCatalogSource | undefined,
): Promise<DblResourceCatalog> {
  if (!provider) return { status: 'unavailable', reason: 'notReady' };

  if (!(await provider.isGetDblResourcesAvailable()))
    return { status: 'unavailable', reason: 'notConfigured' };

  const resources = await provider.getDblResources(undefined);
  if (!resources) throw new Error('The DBL resource catalog fetch produced no catalog');

  // The backend already throws for an unreachable DBL, so an empty list here means the
  // compatibility whitelist dropped every row. It is still no catalog: resolving it as `available`
  // would overwrite the cached one, in memory and on disk, with nothing.
  if (resources.length === 0)
    throw new Error('The DBL resource catalog fetch returned no resources');

  return { status: 'available', resources };
}

/**
 * Whether the startup background fetch should stop retrying.
 *
 * Only a provider that has not registered yet (`notReady`) is worth another attempt. A catalog and
 * an installation with no DBL credentials are final answers, and so is a thrown attempt: retrying
 * would hold the fetch lock, which uncached reads and the flag sync wait on, for attempts that
 * mostly fail the same way. Readers with no cached catalog fetch on demand.
 *
 * @param catalog The answer from {@link resolveDblCatalog}, or `undefined` if the attempt threw.
 * @returns True when no further attempt is worth making.
 */
export function shouldStopBackgroundFetch(catalog: DblResourceCatalog | undefined): boolean {
  if (!catalog) return true;
  return catalog.status === 'available' || catalog.reason === 'notConfigured';
}

/**
 * Whether a catalog failure should REPLACE what is on screen with an error state.
 *
 * Only when there is nothing to replace it with. `useRetryablePromise` keeps the last resolved
 * catalog through a rejection, and an install completion re-drives the fetch, so a refetch that
 * fails would otherwise swap a populated resource table — the freshly-installed entry included —
 * for an error card, where leaving the stale-but-correct list on screen serves the user better. The
 * error state exists so a failure is not reported as "no resources found", not to discard a catalog
 * still in hand.
 *
 * `notConfigured` is deliberately not a failure here: it is a delivered answer with its own message
 * and no retry.
 *
 * @param catalog The last delivered catalog, or `undefined` if none has arrived.
 * @param hasFetchError Whether the last fetch rejected.
 * @param hasResourcesToShow Whether any resource is currently renderable.
 * @returns True when the error state should be shown instead of the list.
 */
export function shouldReportCatalogFailure(
  catalog: DblResourceCatalog | undefined,
  hasFetchError: boolean,
  hasResourcesToShow: boolean,
): boolean {
  if (hasResourcesToShow) return false;
  return hasFetchError || (catalog?.status === 'unavailable' && catalog.reason === 'notReady');
}
