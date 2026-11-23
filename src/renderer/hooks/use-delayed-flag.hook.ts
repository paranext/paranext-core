import { useEffect, useState } from 'react';

/**
 * Default reveal delay: long enough that the fast common case never flashes the affordance, short
 * enough that a genuinely slow operation surfaces it promptly. Callers wanting a UX-tuned "still
 * working…" delay can omit `delayMs` and get this.
 */
export const DEFAULT_DELAY_MS = 2_000;

/**
 * Returns `true` only once `active` has stayed `true` continuously for `delayMs` — e.g. to reveal a
 * "still working…" affordance only after an operation is genuinely slow, without flashing it for
 * the fast common case.
 *
 * Resets to `false` immediately when `active` becomes `false`, and the pending timer is cleared on
 * unmount (React-managed), so callers don't hand-roll setTimeout/clearTimeout bookkeeping.
 *
 * @param active Whether the delayed condition is currently in progress
 * @param delayMs How long `active` must stay `true` before this returns `true`. Defaults to
 *   {@link DEFAULT_DELAY_MS}.
 */
export function useDelayedFlag(active: boolean, delayMs: number = DEFAULT_DELAY_MS): boolean {
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
