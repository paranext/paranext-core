import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  /**
   * Whether a fetch has completed since the last supersession — resolved or rejected.
   *
   * Read this rather than inferring "finished" from `!isLoading`. `isLoading` is `false` both
   * before the first fetch starts and for the render between a `refetch` and the effect that
   * restarts it, so a caller deriving state from `!isLoading` alone paints a settled-looking state
   * during a fetch that has not run yet — most visibly a flash of the error state on the very click
   * meant to clear it.
   */
  hasSettled: boolean;
  /**
   * Clears any error and re-runs the fetch. A no-op when there is no fetch to run, so it never
   * presents itself as a recovery that cannot happen.
   */
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
  const [hasError, setHasError] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);

  // Which fetch currently owns the error flag. Bumped SYNCHRONOUSLY at every point a fetch is
  // superseded — both ways that can happen — so an in-flight invocation can tell whether its result
  // is still wanted. `usePromise` guards only the state it owns; the flags below are ours.
  //
  // Bumping a ref beats deriving the generation from state: state lands a render later, leaving a
  // window in which an already-superseded fetch still compares equal and can resurrect the error
  // `refetch` just cleared.
  const fetchGenerationRef = useRef(0);

  // Re-created on every supersession so `usePromise` sees a new identity and re-drives. Capturing
  // the generation at creation time is what lets a late result recognise that it has been replaced.
  const [trackedFetch, setTrackedFetch] = useState<(() => Promise<T | undefined>) | undefined>(
    undefined,
  );

  const wrapFetch = useCallback((factory: () => Promise<T>) => {
    fetchGenerationRef.current += 1;
    const generation = fetchGenerationRef.current;
    return async () => {
      try {
        const result = await factory();
        if (generation === fetchGenerationRef.current) {
          setHasError(false);
          setHasSettled(true);
        }
        return result;
      } catch (error) {
        // Record the failure, then rethrow so `usePromise` clears its loading flag and logs the
        // rejection. Swallowing it here would hide it from both.
        if (generation === fetchGenerationRef.current) {
          setHasError(true);
          setHasSettled(true);
        }
        throw error;
      }
    };
  }, []);

  // A changed `promiseFactoryCallback` supersedes any in-flight fetch exactly as `refetch` does, so
  // it bumps the same generation rather than relying on `usePromise`'s currency flag, which does not
  // cover the flags owned here.
  useEffect(() => {
    setHasError(false);
    if (!promiseFactoryCallback) {
      setTrackedFetch(undefined);
      // Nothing to wait for, so the caller is not mid-fetch. Reporting "not settled" forever would
      // strand any host that gates its render on this — and `refetch` could not rescue it, because
      // there is no factory to re-run.
      setHasSettled(true);
      return;
    }
    setHasSettled(false);
    // Wrapped before the setter rather than inside it: `wrapFetch` bumps the generation ref, and
    // React may invoke a state updater more than once.
    const wrapped = wrapFetch(promiseFactoryCallback);
    setTrackedFetch(() => wrapped);
  }, [promiseFactoryCallback, wrapFetch]);

  const [data, isLoading] = usePromise<T | undefined>(trackedFetch, undefined);

  const promiseFactoryCallbackRef = useRef(promiseFactoryCallback);
  promiseFactoryCallbackRef.current = promiseFactoryCallback;

  const refetch = useCallback(() => {
    const factory = promiseFactoryCallbackRef.current;
    if (!factory) return;
    setHasError(false);
    setHasSettled(false);
    // See the effect above: wrapped outside the updater because `wrapFetch` mutates the generation.
    const wrapped = wrapFetch(factory);
    setTrackedFetch(() => wrapped);
  }, [wrapFetch]);

  return useMemo(
    () => ({ data, isLoading, hasError, hasSettled, refetch }),
    [data, isLoading, hasError, hasSettled, refetch],
  );
};

export default useRetryablePromise;
