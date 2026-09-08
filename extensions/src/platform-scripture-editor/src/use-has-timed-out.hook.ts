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
 * The timer restarts when `isWaiting` goes false and true again, and also when `waitKey` changes.
 * The key is what makes the allowance per-wait rather than per-flag: a caller whose wait continues
 * across a change of subject — the same `isWaiting` before and after, because the new subject is
 * also unresolved — would otherwise inherit the previous subject's expired verdict and be declared
 * unresolvable before it had any allowance of its own.
 *
 * @param isWaiting Whether the wait is currently in progress.
 * @param timeoutMs How long to allow before the wait is treated as unresolvable.
 * @param waitKey Identifies what is being waited on. A change restarts the allowance even if
 *   `isWaiting` never dips false. Pass `undefined` when there is only ever one subject.
 * @returns Whether the wait has exceeded `timeoutMs` without ending.
 */
export function useHasTimedOut(isWaiting: boolean, timeoutMs: number, waitKey?: string): boolean {
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    // Also clears on a `waitKey` change, so the new subject starts from not-timed-out rather than
    // inheriting the previous one's verdict.
    setHasTimedOut(false);
    if (!isWaiting) return undefined;
    const timer = setTimeout(() => setHasTimedOut(true), timeoutMs);
    return () => clearTimeout(timer);
  }, [isWaiting, timeoutMs, waitKey]);

  return hasTimedOut;
}

export default useHasTimedOut;
