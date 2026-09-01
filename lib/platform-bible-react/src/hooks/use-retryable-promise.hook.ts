import { useCallback, useMemo, useRef, useState } from 'react';
import { usePromise } from './use-promise.hook';

/** What {@link useRetryablePromise} reports about the fetch it is driving. */
export type RetryablePromiseState<T> = {
  /**
   * The most recently resolved value, or `undefined` before one arrives.
   *
   * A rejection leaves an already-resolved value alone (`usePromise` does not wipe it), so a caller
   * whose fetch can fail after having succeeded should decide whether a stale value or an error
   * state serves its user better, rather than assuming `hasError` means there is nothing to show.
   */
  data: T | undefined;
  /** Whether a fetch is in flight. */
  isLoading: boolean;
  /**
   * Whether the last fetch rejected. Distinct from an absent `data`: a caller reading only `data`
   * cannot tell "the fetch failed" from "the answer is genuinely nothing", which is the distinction
   * that lets a UI say what happened instead of reporting an empty result.
   *
   * Recoverable — call {@link RetryablePromiseState.refetch}.
   */
  hasError: boolean;
  /** Clears any error and re-runs the fetch. */
  refetch: () => void;
};

/**
 * Awaits a promise like `usePromise`, and additionally reports whether it rejected and offers a way
 * to run it again.
 *
 * `usePromise` alone leaves a rejection indistinguishable from a value that has not arrived, so a
 * UI driven by it can only say "nothing here" for a failure — with no way for the user to try
 * again. This hook adds the two things such a UI needs: a failure flag and a working retry.
 *
 * Deliberately takes the fetch as a callback rather than performing one itself, so this library
 * stays free of any PAPI dependency and both the renderer and extension web views can use it with
 * their own command-sending mechanism.
 *
 * @param promiseFactoryCallback A function that returns the promise to await, or `undefined` for
 *   nothing to run.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. A reference that is updated every
 *   render re-runs the fetch every render.
 * @returns See {@link RetryablePromiseState}.
 */
export const useRetryablePromise = <T>(
  promiseFactoryCallback: (() => Promise<T>) | undefined,
): RetryablePromiseState<T> => {
  // Bumped by `refetch`. It gives the wrapped fetch a new identity (which is what re-drives
  // `usePromise`) and doubles as the generation that decides which fetch owns the error flag.
  const [fetchGeneration, setFetchGeneration] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Written during render so an in-flight fetch can compare the generation it captured against the
  // current one. `usePromise` guards only the state it owns, so a superseded invocation still runs
  // to completion and would otherwise clear an error raised by a newer one.
  const latestFetchGenerationRef = useRef(fetchGeneration);
  latestFetchGenerationRef.current = fetchGeneration;

  const trackedFetch = useMemo(() => {
    if (!promiseFactoryCallback) return undefined;

    const generation = fetchGeneration;
    return async () => {
      try {
        const result = await promiseFactoryCallback();
        if (generation === latestFetchGenerationRef.current) setHasError(false);
        return result;
      } catch (error) {
        // Record the failure, then rethrow so `usePromise` clears its loading flag and logs the
        // rejection. Swallowing it here would hide it from both.
        if (generation === latestFetchGenerationRef.current) setHasError(true);
        throw error;
      }
    };
  }, [promiseFactoryCallback, fetchGeneration]);

  const [data, isLoading] = usePromise<T | undefined>(trackedFetch, undefined);

  const refetch = useCallback(() => {
    setHasError(false);
    setFetchGeneration((generation) => generation + 1);
  }, []);

  return useMemo(
    () => ({ data, isLoading, hasError, refetch }),
    [data, isLoading, hasError, refetch],
  );
};

export default useRetryablePromise;
