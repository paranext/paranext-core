import { useEffect, useState } from 'react';

/**
 * Reports whether a wait has gone on too long to still be called loading.
 *
 * A spinner is a promise that an answer is coming. Some waits cannot keep it: a subscribe that
 * rejects is only logged, and a project data provider that never resolves leaves its loading flag
 * pinned true forever, so nothing downstream can distinguish "still arriving" from "never
 * arriving". This puts a bound on the difference — after `timeoutMs` the caller should render a
 * terminal state rather than spin indefinitely.
 *
 * The timer restarts whenever `isWaiting` goes false and true again, so a later, legitimate wait
 * gets its full allowance rather than inheriting an earlier one's.
 *
 * @param isWaiting Whether the wait is currently in progress.
 * @param timeoutMs How long to allow before the wait is treated as unresolvable.
 * @returns Whether the wait has exceeded `timeoutMs` without ending.
 */
export function useHasTimedOut(isWaiting: boolean, timeoutMs: number): boolean {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    if (!isWaiting) {
      setHasTimedOut(false);
      return undefined;
    }
    const timer = setTimeout(() => setHasTimedOut(true), timeoutMs);
    return () => clearTimeout(timer);
  }, [isWaiting, timeoutMs]);

  return hasTimedOut;
}

export default useHasTimedOut;
