import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isErrorMessageAboutRegistryAuthFailure,
} from 'platform-bible-utils';
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
  /**
   * Whether the DBL catalog is unreachable specifically because the user's Paratext registration is
   * missing or invalid.
   *
   * That failure is not the transient, retry-and-it-works kind — the catalog stays unreachable
   * until the registration changes — so telling it apart lets a caller say what the user must
   * actually do instead of offering a retry that cannot succeed.
   *
   * Independent of {@link DblResourceCatalogState.hasCatalogError}. A rejected fetch recognized by
   * `isErrorMessageAboutRegistryAuthFailure` sets both; a `notConfigured` answer from an
   * unregistered installation sets only this one, because that answer carries no retry either way.
   */
  hasRegistrationError: boolean;
  /** Re-runs the fetch, clearing any previous error. */
  refetchCatalog: () => void;
};

/**
 * Asks whether the machine's Paratext registration is invalid — the one cause of a failed catalog
 * that a retry cannot fix.
 *
 * Probed rather than inferred, and only after the catalog has ALREADY failed. The obvious inference
 * — the resource provider's own `isGetDblResourcesAvailable` — is wrong for this question:
 * `DblResourcePasswordProvider.IsPasswordAvailable` returns false both for an invalid registration
 * AND for a build whose DBL user-secrets are absent, so acting on it tells a developer with a
 * perfectly good registration to go register.
 *
 * `adr-registration-validity-once-per-session` deliberately routes the renderer's own probes
 * through a shared store to avoid a cold-start retry storm. This one is not that: a web view cannot
 * reach that store, and by the time a catalog fetch has come back failed the extension host has
 * long since registered its handlers, so the retry loop that motivated the ADR does not apply
 * here.
 *
 * @returns `true` only for a definitive "not registered". Anything else — a rejected probe, a
 *   non-boolean, a timeout — is treated as "not a registration problem", because wrongly telling a
 *   registered user to register is worse than offering them a retry that may work.
 */
async function isRegistrationInvalid(): Promise<boolean> {
  try {
    const isValid = await papi.commands.sendCommand(
      'paratextRegistration.doesUserHaveValidRegistration',
    );
    return isValid === false;
  } catch (e) {
    logger.debug(`Registration probe did not complete: ${getErrorMessage(e)}`);
    return false;
  }
}

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
  const [hasRegistrationError, setHasRegistrationError] = useState(false);

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
        // The sentinel message is definitive when present, so it saves the probe.
        const isRegistrationFailure =
          isErrorMessageAboutRegistryAuthFailure(dblResult.reason) ||
          (await isRegistrationInvalid());
        if (generation === fetchGenerationRef.current) {
          setHasCatalogError(true);
          setHasRegistrationError(isRegistrationFailure);
        }

        return localNonDblResources;
      }

      // The two `unavailable` reasons are opposite answers and must not collapse into one. An
      // installation with no DBL credentials has ARRIVED at its answer: there is no catalog and
      // there never will be, so it is not an error and must not carry a retry that cannot work.
      // `notReady` is the opposite — the provider registers in the background, so the catalog is
      // still coming and a retry genuinely works. Either way the locally-installed rows loaded fine
      // and are the only resources such a user has, so they are kept.
      if (dblResult.value.status !== 'available') {
        const { reason } = dblResult.value;
        // A missing registration also arrives as `notConfigured`, not through the catch above: the
        // provider reports "no credentials" rather than throwing, so the thrown-sentinel path never
        // runs for it. Only the probe tells the two apart, and only the registration case has
        // something the user can do about it.
        const isRegistrationFailure = reason === 'notConfigured' && (await isRegistrationInvalid());
        if (generation === fetchGenerationRef.current) {
          setHasCatalogError(reason === 'notReady');
          setHasRegistrationError(isRegistrationFailure);
        }
        return localNonDblResources;
      }

      if (generation === fetchGenerationRef.current) {
        setHasCatalogError(false);
        setHasRegistrationError(false);
      }

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
    setHasRegistrationError(false);
    setFetchResources(true);
  }, []);

  return {
    dblResources,
    isLoadingResources,
    isCatalogReady:
      !isLoadingResources && resourcesPossiblyUndefined !== undefined && !hasCatalogError,
    hasCatalogError,
    hasRegistrationError,
    refetchCatalog,
  };
}

export default useDblResourceCatalog;
