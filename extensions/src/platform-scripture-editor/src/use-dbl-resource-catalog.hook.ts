import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import { DblResourceData, getErrorMessage } from 'platform-bible-utils';
import { useCallback, useMemo, useRef, useState } from 'react';

/** The DBL resource catalog plus everything a panel needs to reason about its arrival. */
export type DblResourceCatalogState = {
  /** The catalog, coerced to `[]` before it arrives. */
  dblResources: DblResourceData[];
  /** Whether the fetch is in flight. */
  isLoadingResources: boolean;
  /**
   * Whether the catalog has finished loading AND delivered a real answer. Distinct from
   * `!isLoadingResources`: `dblResources` coerces a missing catalog to `[]`, which is
   * indistinguishable from a genuinely empty one. A failed fetch is not "ready" either — the catch
   * below resolves to the locally-installed rows to clear the loading flag, so without folding in
   * `hasCatalogError` a consumer reading this alone would treat a failure as a genuinely empty
   * catalog.
   */
  isCatalogReady: boolean;
  /**
   * Whether the DBL catalog is not coming from the last fetch — it rejected, or the provider had
   * not registered yet. Recoverable either way — call
   * {@link DblResourceCatalogState.refetchCatalog}. `dblResources` still carries any
   * locally-installed resources that loaded, so a panel can show those alongside the retry.
   *
   * Distinct from an installation with no DBL credentials, which delivers an empty DBL catalog:
   * that is an answer, and no retry can improve on it.
   */
  hasCatalogError: boolean;
  /** Re-runs the fetch, clearing any previous error. */
  refetchCatalog: () => void;
};

/**
 * Fetches the resource catalog for a panel: the DBL catalog plus the locally-installed non-DBL
 * resources (VULGP83, TNN, HBK, …), which carry `dblEntryUid === projectId` so callers can tell
 * them apart with `isNonDblResource`. Panels resolve references of both kinds against this one
 * list, so they must be fetched together.
 *
 * The Model Text and Resource panels need the same catalog and the same "has it arrived?"
 * distinction. Panel readiness turns on that distinction (see `getResourcePanelReadiness`), so it
 * is decided here once rather than per panel.
 *
 * A rejected fetch is caught deliberately. `usePromise` has no rejection path — an uncaught
 * rejection never reaches its `setIsLoading(false)`, so the panel would spin forever with no
 * message and no way out. Resolving to an empty catalog and reporting `hasCatalogError` lets the
 * panel say what happened and offer a retry that can actually re-drive the fetch. A `notReady`
 * catalog takes the same path for the same reason: it is a catalog still on its way, not an empty
 * one.
 *
 * TODO(PT-4518): Migrate onto `useRetryablePromise` from `platform-bible-react`, which now provides
 * this hook's whole mechanism generically — the supersession guard, the error flag cleared on
 * refetch, and the settled-vs-loading distinction this hook spells `isCatalogReady`. Only the PAPI
 * calls and the `unavailable`-reason mapping below would remain here. Note that `isCatalogReady`
 * maps onto `hasSettled && !hasError`, not onto `hasSettled` alone.
 */
export function useDblResourceCatalog(): DblResourceCatalogState {
  const [fetchResources, setFetchResources] = useState(true);
  const [hasCatalogError, setHasCatalogError] = useState(false);

  // `usePromise`'s own currency flag guards only its `setValue`/`setIsLoading` — a superseded
  // factory invocation still runs to completion and still writes state we own. Overlapping fetches
  // are reachable because `refetchCatalog` is also the install-completion stale marker, so a stale
  // fetch resolving late could clear a real error and leave the panel reading `empty`.
  const fetchGenerationRef = useRef(0);

  const [resourcesPossiblyUndefined, isLoadingResources] = usePromise(
    useCallback(async () => {
      if (fetchResources) {
        // Sets the `fetchResources` flag to false which will trigger the promise again next render
        // to fetch the resources
        setFetchResources(false);
        return Promise.resolve(undefined);
      }

      const generation = fetchGenerationRef.current;

      // The local non-DBL list is supplementary: settled separately so that losing it degrades the
      // panel to DBL-only resources rather than reporting the whole catalog as failed.
      const [dblResult, localResult] = await Promise.allSettled([
        papi.commands.sendCommand('platformGetResources.getCachedResources'),
        papi.commands.sendCommand('platformGetResources.getLocalNonDblResources'),
      ]);

      if (localResult.status === 'rejected')
        logger.warn(
          `Failed to load locally-installed non-DBL resources: ${getErrorMessage(localResult.reason)}`,
        );
      const localNonDblResources =
        localResult.status === 'fulfilled' ? (localResult.value ?? []) : [];

      if (dblResult.status === 'rejected') {
        logger.warn(
          `Failed to load the DBL resource catalog: ${getErrorMessage(dblResult.reason)}`,
        );
        if (generation === fetchGenerationRef.current) setHasCatalogError(true);

        return localNonDblResources;
      }

      // The two `unavailable` reasons are opposite answers and must not collapse into one. An
      // installation with no DBL credentials has ARRIVED at its answer: there is no catalog and
      // there never will be, so it is not an error and must not carry a retry that cannot work.
      // `notReady` is the opposite — the provider registers in the background, so the catalog is
      // still coming and a retry genuinely works. Either way the locally-installed rows loaded fine
      // and are the only resources such a user has, so they are kept.
      if (dblResult.value.status !== 'available') {
        if (generation === fetchGenerationRef.current)
          setHasCatalogError(dblResult.value.reason === 'notReady');
        return localNonDblResources;
      }

      if (generation === fetchGenerationRef.current) setHasCatalogError(false);

      return [...dblResult.value.resources, ...localNonDblResources];
    }, [fetchResources]),
    undefined,
  );

  const dblResources = useMemo(
    () => resourcesPossiblyUndefined ?? [],
    [resourcesPossiblyUndefined],
  );

  const refetchCatalog = useCallback(() => {
    fetchGenerationRef.current += 1;
    setHasCatalogError(false);
    setFetchResources(true);
  }, []);

  return {
    dblResources,
    isLoadingResources,
    isCatalogReady:
      !isLoadingResources && resourcesPossiblyUndefined !== undefined && !hasCatalogError,
    hasCatalogError,
    refetchCatalog,
  };
}

export default useDblResourceCatalog;
