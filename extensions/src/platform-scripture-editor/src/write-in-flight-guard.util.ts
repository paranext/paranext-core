import { logger } from '@papi/frontend';
import { MutableRefObject } from 'react';

/**
 * Default time to wait for a PDP write to settle before releasing the in-flight guard. The JSON-RPC
 * layer's own `platform.requestTimeout` (default 30s) already rejects lost responses — and that
 * rejection clears the guard through the normal `finally` path — so this release is only the
 * backstop for hangs the network layer cannot see (the request timeout disabled, or a hang in the
 * WebView bridge). It sits at 2× the network default so it stays the secondary resolver.
 */
export const WRITE_GUARD_RELEASE_AFTER_MS = 60_000;

/**
 * Runs a single PDP write under a self-clearing in-flight guard, so the guard means EXACTLY "a
 * write is currently in flight" and nothing more.
 *
 * `isWritingRef` is held for the duration of the `write` promise and cleared when it SETTLES
 * (resolve or reject), in a `finally` — never left stuck, and never dependent on when a PDP echo
 * happens to arrive. If a write is already in flight the call is a no-op (`{ ran: false }`) and the
 * guard is left untouched so the in-flight writer keeps ownership.
 *
 * If `write` still hasn't settled after `releaseAfterMs` (default
 * {@link WRITE_GUARD_RELEASE_AFTER_MS} — see there for why 60s), the guard is released and a warning
 * is logged so future saves aren't silently dropped by a write that will never come back (a wedged
 * extension host, a lost JSON-RPC request the network layer can't time out). Ownership then passes
 * to whichever later write takes the guard: if the timed-out "zombie" write eventually settles, its
 * `finally` deliberately does NOT clear the guard, so it can never unlatch a successor's in-flight
 * write — and its outcome reports `{ ran: false, released: true }` rather than a completed run,
 * because by then a successor may own the guard against newer editor content, and reporting success
 * made the caller run its whole post-save pipeline against a `releaseAfterMs`-stale baseline. A
 * zombie that REJECTS is reported the same way, with the rejection attached as `error` rather than
 * thrown: the caller keeps its chance to tell the user the save failed, but cannot mistake the
 * rejection for this write's live outcome and act on a stale baseline. For writes that settle
 * normally the timer is cleared in the same `finally` and neither path runs.
 */
export async function withWriteInFlightGuard<T>(
  isWritingRef: MutableRefObject<boolean>,
  write: () => Promise<T>,
  releaseAfterMs: number = WRITE_GUARD_RELEASE_AFTER_MS,
): Promise<{ ran: true; result: T } | { ran: false; released?: true; error?: unknown }> {
  if (isWritingRef.current) return { ran: false };
  isWritingRef.current = true;
  // Local ownership token: once the release below fires, THIS write no longer owns the guard, so
  // its finally must leave the flag alone — a successor write may hold it by then.
  let released = false;
  const releaseTimer = setTimeout(() => {
    released = true;
    isWritingRef.current = false;
    logger.warn(
      `PDP write was still unsettled after ${releaseAfterMs} ms; releasing the write-in-flight guard so future saves are not silently dropped`,
    );
  }, releaseAfterMs);
  try {
    const result = await write();
    // Settled only AFTER the release fired: this write no longer owns the guard, so it must not
    // report a completed run (see the doc comment above).
    if (released) return { ran: false, released: true };
    return { ran: true, result };
  } catch (error) {
    // Same ownership rule as the resolve path, and it matters more here: a caller that handles a
    // rejection by restoring its own last-known-good copy would be restoring one captured at least
    // `releaseAfterMs` ago, discarding everything typed since. Hand the rejection back as DATA so
    // the caller can still report it without treating it as this write's live outcome.
    if (released) return { ran: false, released: true, error };
    throw error;
  } finally {
    clearTimeout(releaseTimer);
    if (!released) isWritingRef.current = false;
  }
}
