import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import { DblResourceData, getErrorMessage } from 'platform-bible-utils';
import { useCallback, useMemo, useRef, useState } from 'react';

/** The DBL resource catalog plus everything a panel needs to reason about its arrival. */
export type DblResourceCatalog = {
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
  /** Whether the last fetch failed. Recoverable — call {@link DblResourceCatalog.refetchCatalog}. */
  hasCatalogError: boolean;
  /** Re-runs the fetch, clearing any previous error. */
  refetchCatalog: () => void;
};

/**
 * Fetches the DBL resource catalog for a panel.
 *
 * Both the Model Text and Resource panels need the same catalog and the same "has it arrived?"
 * distinction, and previously derived it with identical copy-pasted blocks. That distinction is
 * what the premature-empty-state fix hinges on (see `getResourcePanelReadiness`), so it lives in
 * one place.
 *
 * A rejected fetch is caught deliberately. `usePromise` has no rejection path — an uncaught
 * rejection never reaches its `setIsLoading(false)`, so the panel would spin forever with no
 * message and no way out. Resolving to an empty catalog and reporting `hasCatalogError` lets the
 * panel say what happened and offer a retry that can actually re-drive the fetch.
 */
export function useDblResourceCatalog(): DblResourceCatalog {
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
        const resources = await papi.commands.sendCommand(
          'platformGetResources.getCachedResources',
        );
        if (generation === fetchGenerationRef.current) setHasCatalogError(false);

        return resources;
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
