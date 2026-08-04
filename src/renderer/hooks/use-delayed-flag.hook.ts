import { useEffect, useState } from 'react';

/**
 * Returns `true` only once `active` has stayed `true` continuously for `delayMs` — e.g. to reveal a
 * "still working…" affordance only after an operation is genuinely slow, without flashing it for
 * the fast common case.
 *
 * Resets to `false` immediately when `active` becomes `false`, and the pending timer is cleared on
 * unmount (React-managed), so callers don't hand-roll setTimeout/clearTimeout bookkeeping.
 *
 * @param active Whether the delayed condition is currently in progress
 * @param delayMs How long `active` must stay `true` before this returns `true`
 */
export function useDelayedFlag(active: boolean, delayMs: number): boolean {
  const [elapsed, setElapsed] = useState(false);

  useEffect(() => {
    if (!active) {
      setElapsed(false);
      return undefined;
    }
    const timer = setTimeout(() => setElapsed(true), delayMs);
    return () => clearTimeout(timer);
  }, [active, delayMs]);

  return active && elapsed;
}
