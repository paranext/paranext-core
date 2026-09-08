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
 *   render re-runs the fetch every render, exactly as it does with `usePromise`.
 * @returns See {@link RetryablePromiseState}.
 */
export const useRetryablePromise = <T>(
  promiseFactoryCallback: (() => Promise<T>) | undefined,
): RetryablePromiseState<T> => {
  const [hasError, setHasError] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const [refetchCount, setRefetchCount] = useState(0);

  // The wrapped fetch the COMMITTED tree is waiting on. A late result compares itself against this
  // to decide whether its outcome is still wanted: anything superseded — by a new factory, by a
  // factory going away, or by a retry — is no longer the value here, so it cannot resurrect an
  // error the supersession just cleared.
  //
  // Identity comparison rather than a counter because the identity is established where the fetch
  // is created and committed where it starts, with no separate bookkeeping to keep in step.
  const committedFetchRef = useRef<(() => Promise<T | undefined>) | undefined>(undefined);

  // Built during render but deliberately SIDE-EFFECT FREE, so a render React starts and then throws
  // away (a transition, a Suspense retry, an offscreen prerender) leaves nothing behind. Only the
  // effect below — which runs on commit, as does `usePromise`'s own fetch — makes one of these the
  // fetch this hook is waiting on.
  const trackedFetch = useMemo(() => {
    if (!promiseFactoryCallback) return undefined;
    const wrapped = async () => {
      try {
        const result = await promiseFactoryCallback();
        if (committedFetchRef.current === wrapped) {
          setHasError(false);
          setHasSettled(true);
        }
        return result;
      } catch (error) {
        // Record the failure, then rethrow so `usePromise` clears its loading flag and logs the
        // rejection. Swallowing it here would hide it from both.
        if (committedFetchRef.current === wrapped) {
          setHasError(true);
          setHasSettled(true);
        }
        throw error;
      }
    };
    return wrapped;
    // `refetchCount` is a re-run trigger: its value is unused, but each bump builds a fresh wrapped
    // fetch, which is what supersedes the in-flight one and re-drives `usePromise`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promiseFactoryCallback, refetchCount]);

  useEffect(() => {
    committedFetchRef.current = trackedFetch;
    setHasError(false);
    // Nothing to wait for means the caller is not mid-fetch. Reporting "not settled" forever would
    // strand any host that gates its render on this — and `refetch` could not rescue it, because
    // there is no factory to re-run.
    setHasSettled(!trackedFetch);
  }, [trackedFetch]);

  const [data, isLoading] = usePromise<T | undefined>(trackedFetch, undefined);

  const refetch = useCallback(() => {
    // Reads the committed fetch, not a render-phase value, so a retry fired from a user event can
    // never run a factory belonging to a render that was thrown away.
    if (!committedFetchRef.current) return;
    setHasError(false);
    setHasSettled(false);
    setRefetchCount((count) => count + 1);
  }, []);

  return useMemo(
    () => ({ data, isLoading, hasError, hasSettled, refetch }),
    [data, isLoading, hasError, hasSettled, refetch],
  );
};

export default useRetryablePromise;
