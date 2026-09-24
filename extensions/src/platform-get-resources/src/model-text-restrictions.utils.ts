import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceCatalog, ModelTextRestrictions } from 'platform-get-resources';

/**
 * Sets `isRestrictedAsModelText` on every row from the backend's restrictions: a row is restricted
 * when its DBL id is on the list, or when it is installed as a project whose id is listed. Both
 * comparisons ignore case.
 *
 * Every row gets an explicit value, so a stale flag persisted with an older catalog is overwritten
 * rather than trusted.
 *
 * @param rows Catalog rows or synthetic local non-DBL rows.
 * @param restrictions The backend's answer, or `undefined` if it is not known yet.
 * @returns The stamped rows, or `rows` itself unchanged when `restrictions` is `undefined`.
 */
export function applyModelTextRestrictions(
  rows: DblResourceData[],
  restrictions: ModelTextRestrictions | undefined,
): DblResourceData[] {
  if (!restrictions) return rows;

  const restrictedDblIds = new Set(restrictions.dblIds.map((id) => id.toLowerCase()));
  const restrictedProjectIds = new Set(restrictions.projectIds.map((id) => id.toUpperCase()));

  return rows.map((row) => ({
    ...row,
    isRestrictedAsModelText:
      restrictedDblIds.has(row.dblEntryUid.toLowerCase()) ||
      (row.projectId !== '' && restrictedProjectIds.has(row.projectId.toUpperCase())),
  }));
}

/**
 * {@link applyModelTextRestrictions} over a catalog result: stamps the rows of an available catalog
 * and passes an unavailable one through.
 */
export function applyModelTextRestrictionsToCatalog(
  catalog: DblResourceCatalog,
  restrictions: ModelTextRestrictions | undefined,
): DblResourceCatalog {
  if (catalog.status !== 'available') return catalog;
  return {
    status: 'available',
    resources: applyModelTextRestrictions(catalog.resources, restrictions),
  };
}

/**
 * Holds the backend's model-text restrictions for the session. See
 * {@link createModelTextRestrictionsCache}.
 */
export type ModelTextRestrictionsCache = {
  /**
   * Fetches the restrictions if none are known and no fetch is running, sharing a running one.
   *
   * @returns The known restrictions, or `undefined` if none have been fetched successfully.
   */
  ensureLoaded: () => Promise<ModelTextRestrictions | undefined>;
  /**
   * Fetches the restrictions afresh, after any fetch already running — that one may have read the
   * disk before the local change that prompted the refresh.
   *
   * @returns The new restrictions, or the last known ones if this fetch failed.
   */
  refresh: () => Promise<ModelTextRestrictions | undefined>;
  /**
   * What a resource flag sync calls: {@link ModelTextRestrictionsCache.refresh} when local state may
   * have changed — a newly installed restricted text is only reported once it is on disk — and
   * {@link ModelTextRestrictionsCache.ensureLoaded} otherwise, which retries a failed first fetch.
   *
   * @param isLocalStateChanged Whether a resource may have been installed, updated or removed.
   */
  sync: (isLocalStateChanged: boolean) => Promise<ModelTextRestrictions | undefined>;
  /**
   * Answers from what is known, or waits up to `timeoutMs` for the first fetch to land.
   *
   * @returns The restrictions, or `undefined` if none arrived within the bound.
   */
  getWithin: (timeoutMs: number) => Promise<ModelTextRestrictions | undefined>;
};

/**
 * Creates the session cache of model-text restrictions.
 *
 * It holds the in-flight promise, not just the value, so concurrent callers share one round trip. A
 * failed fetch is not remembered: the next call tries again. A failed refresh keeps the last known
 * answer, since dropping it would make every restricted text selectable again.
 *
 * @param fetchRestrictions Asks the backend; resolves `undefined` on any failure rather than
 *   rejecting.
 */
export function createModelTextRestrictionsCache(
  fetchRestrictions: () => Promise<ModelTextRestrictions | undefined>,
): ModelTextRestrictionsCache {
  let known: ModelTextRestrictions | undefined;
  let inFlight: Promise<ModelTextRestrictions | undefined> | undefined;

  function startFetch(): Promise<ModelTextRestrictions | undefined> {
    const fetch = fetchRestrictions()
      .then((restrictions) => {
        if (restrictions) known = restrictions;
        return known;
      })
      .finally(() => {
        // Cleared only if no later fetch has replaced it, so a refresh is never forgotten mid-flight.
        if (inFlight === fetch) inFlight = undefined;
      });
    inFlight = fetch;
    return fetch;
  }

  function ensureLoaded(): Promise<ModelTextRestrictions | undefined> {
    if (known) return Promise.resolve(known);
    return inFlight ?? startFetch();
  }

  async function refresh(): Promise<ModelTextRestrictions | undefined> {
    if (inFlight) await inFlight;
    return startFetch();
  }

  function sync(isLocalStateChanged: boolean): Promise<ModelTextRestrictions | undefined> {
    return isLocalStateChanged ? refresh() : ensureLoaded();
  }

  async function getWithin(timeoutMs: number): Promise<ModelTextRestrictions | undefined> {
    if (known) return known;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<undefined>((resolve) => {
      timeoutId = setTimeout(() => resolve(undefined), timeoutMs);
    });
    try {
      return await Promise.race([ensureLoaded(), timeout]);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // Plain closures rather than methods, so a caller may pass one around on its own
  return { ensureLoaded, refresh, sync, getWithin };
}

/**
 * Brings the restrictions up to date after a resource flag sync: afresh when the caller asked for a
 * refresh or the sync changed a flag — an install shows up as a changed flag, and a newly installed
 * restricted text is only reported once it is on disk — and otherwise only if none are known yet.
 *
 * @param flagSync `isRefreshRequested`: whether the sync was asked to refresh everything it can;
 *   `isAnyFlagChanged`: whether it changed any resource's flags.
 */
export function syncModelTextRestrictionsAfterFlagSync(
  restrictionsCache: ModelTextRestrictionsCache,
  flagSync: { isRefreshRequested: boolean; isAnyFlagChanged: boolean },
): Promise<ModelTextRestrictions | undefined> {
  return restrictionsCache.sync(flagSync.isRefreshRequested || flagSync.isAnyFlagChanged);
}

/**
 * {@link applyModelTextRestrictions} with the cache's restrictions, waiting up to `timeoutMs` for
 * the first fetch to land so rows served early are not left unrestricted.
 *
 * @returns The stamped rows, or `rows` unchanged if no restrictions arrived within the bound.
 */
export async function applyModelTextRestrictionsWithin(
  rows: DblResourceData[],
  restrictionsCache: ModelTextRestrictionsCache,
  timeoutMs: number,
): Promise<DblResourceData[]> {
  return applyModelTextRestrictions(rows, await restrictionsCache.getWithin(timeoutMs));
}

/**
 * {@link applyModelTextRestrictionsToCatalog} with the cache's restrictions, waiting up to
 * `timeoutMs` for the first fetch to land. The wait runs alongside the catalog read rather than
 * after it.
 *
 * @returns The stamped catalog, or the catalog unchanged if no restrictions arrived within the
 *   bound.
 */
export async function applyModelTextRestrictionsToCatalogWithin(
  catalog: Promise<DblResourceCatalog>,
  restrictionsCache: ModelTextRestrictionsCache,
  timeoutMs: number,
): Promise<DblResourceCatalog> {
  const [readCatalog, restrictions] = await Promise.all([
    catalog,
    restrictionsCache.getWithin(timeoutMs),
  ]);
  return applyModelTextRestrictionsToCatalog(readCatalog, restrictions);
}
