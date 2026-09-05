import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import {
  DblResourceData,
  getErrorMessage,
  isErrorMessageAboutRegistryAuthFailure,
} from 'platform-bible-utils';
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
   * below resolves to the locally-installed rows to clear the loading flag, so without folding in
   * `hasCatalogError` a consumer reading this alone would treat a failure as a genuinely empty
   * catalog.
   */
  isCatalogReady: boolean;
  /**
   * Whether the DBL half of the fetch failed or resolved without an answer (offline, provider
   * unavailable). Recoverable — call {@link DblResourceCatalog.refetchCatalog}. `dblResources` still
   * carries any locally-installed resources that loaded, so a panel can show those alongside the
   * retry.
   */
  hasCatalogError: boolean;
  /**
   * Whether the DBL half failed specifically because the user's Paratext registration is missing or
   * invalid. Always implies {@link DblResourceCatalog.hasCatalogError}.
   *
   * That failure is not the transient, retry-and-it-works kind — the catalog stays unreachable
   * until the registration changes — so telling it apart lets a caller say what the user must
   * actually do instead of offering a retry that cannot succeed. Recognized from the thrown message
   * via `isErrorMessageAboutRegistryAuthFailure`, which carries the C# sentinel text verbatim; that
   * avoids a second registration probe, since the session's one probe belongs to
   * `registration-validity-store`, which a web view cannot reach.
   *
   * Deliberately NOT set for a resolved-but-undefined catalog: that is the absent-DBL-credentials
   * answer, and credentials can arrive without the registration itself changing, so a retry there
   * is worth offering.
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
 * panel say what happened and offer a retry that can actually re-drive the fetch.
 */
export function useDblResourceCatalog(): DblResourceCatalog {
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

      // A resolved-but-undefined catalog is the offline / provider-unavailable answer, not an empty
      // one. Report it as an error so the panel offers the retry that can re-drive the fetch instead
      // of spinning on a fetch that has already finished — and keep the locally-installed rows,
      // which loaded fine and are the only resources such a user has.
      if (dblResult.value === undefined) {
        // A missing registration reaches us HERE, not through the catch above: the provider returns
        // early rather than throwing, so the thrown-sentinel path never runs for it. Without the
        // probe this state offers a Try again button that can never succeed.
        const isRegistrationFailure = await isRegistrationInvalid();
        if (generation === fetchGenerationRef.current) {
          setHasCatalogError(true);
          setHasRegistrationError(isRegistrationFailure);
        }
        return localNonDblResources;
      }

      if (generation === fetchGenerationRef.current) {
        setHasCatalogError(false);
        setHasRegistrationError(false);
      }

      return [...dblResult.value, ...localNonDblResources];
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
