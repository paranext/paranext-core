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
   * below resolves to `[]` to clear the loading flag, so without folding in `hasCatalogError` a
   * consumer reading this alone would treat a failure as a genuinely empty catalog.
   */
  isCatalogReady: boolean;
  /**
   * Whether the catalog is not coming from the last fetch — it rejected, or the provider had not
   * registered yet. Recoverable either way — call {@link DblResourceCatalogState.refetchCatalog}.
   *
   * Distinct from a delivered empty catalog, which is what an installation with no DBL credentials
   * has: that one is an answer, and no retry can improve on it.
   */
  hasCatalogError: boolean;
  /** Re-runs the fetch, clearing any previous error. */
  refetchCatalog: () => void;
};

/**
 * Fetches the DBL resource catalog for a panel.
 *
 * Both the Model Text and Resource panels need the same catalog and the same "has it arrived?"
 * distinction. That distinction is what the premature-empty-state fix hinges on (see
 * `getResourcePanelReadiness`), so it lives in one place.
 *
 * A rejected fetch is caught deliberately. `usePromise` has no rejection path — an uncaught
 * rejection never reaches its `setIsLoading(false)`, so the panel would spin forever with no
 * message and no way out. Resolving to an empty catalog and reporting `hasCatalogError` lets the
 * panel say what happened and offer a retry that can actually re-drive the fetch. A `notReady`
 * catalog takes the same path for the same reason: it is a catalog still on its way, not an empty
 * one.
 *
 * TODO: Migrate onto `useRetryablePromise` from `platform-bible-react`, which now provides this
 * hook's whole mechanism generically — the supersession guard, the error flag cleared on refetch,
 * and the settled-vs-loading distinction this hook spells `isCatalogReady`. Only the PAPI call and
 * the `unavailable`-reason mapping below would remain here. Deliberately deferred rather than
 * missed; see `adr-picker-recovery-injected-fetch-hook` in
 * `.context/standards/Architecture-Decisions.md` for why, and note that migrating means keeping
 * this hook's own tests green.
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

      try {
        const catalog = await papi.commands.sendCommand('platformGetResources.getCachedResources');
        const isCurrent = generation === fetchGenerationRef.current;

        // The two `unavailable` reasons are opposite answers and must not collapse into one empty
        // catalog. `notConfigured` — a build that cannot download DBL resources — has ARRIVED at its
        // answer: there is no catalog and there never will be, so it reports a delivered empty one.
        // (Returning `undefined` instead would leave `isCatalogReady` false forever, which the panels
        // read as "still loading": a spinner with no message and no retry, in exactly the
        // no-credentials case this hook exists to explain.)
        //
        // `notReady` is the opposite: the provider registers in the background, so the catalog is
        // still coming and a retry genuinely works. Reporting it as a delivered empty catalog would
        // tell a panel that a project's configured resources are gone — and would let
        // `canPublishResourcePanelProjectIds` publish an empty navigable-project-id list over a
        // correct persisted one.
        if (catalog.status !== 'available') {
          if (isCurrent) setHasCatalogError(catalog.reason === 'notReady');
          return [];
        }

        if (isCurrent) setHasCatalogError(false);
        return catalog.resources;
      } catch (error) {
        logger.warn(`Failed to load the DBL resource catalog: ${getErrorMessage(error)}`);
        if (generation === fetchGenerationRef.current) setHasCatalogError(true);

        return [];
      }
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
