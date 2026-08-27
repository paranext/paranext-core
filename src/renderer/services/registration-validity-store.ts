/**
 * The session's answer to "is this user's Paratext registration valid?", shared by every UI
 * affordance that reacts to it (currently the user-profile popover's reminder dot).
 *
 * This store owns the session's ONE registration probe; the first-run gate consumes it instead of
 * probing separately. That sharing is load-bearing, not tidiness. The larger reason is correctness:
 * one answer per session is what lets the gate and the UI agree, and it is the only way the gate's
 * just-registered suppression reaches the UI at all. The smaller reason is traffic: a command sent
 * to a handler that has not registered yet is re-dispatched by `requestWithRetry`
 * (`shared/data/rpc.model.ts`) up to `MAX_REQUEST_ATTEMPTS` times a second apart, so a second probe
 * chain would double that during the most contended phase of startup. (Those retries log at
 * `debug`, not `warn`.)
 *
 * The gate keeps sole ownership of the just-registered suppression; it records the suppressed
 * answer here via {@link publishRegistrationValidity} rather than through the probe. See
 * `adr-registration-validity-once-per-session`.
 */

import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { RegistrationValidity } from './first-run.model';
import { resolveRegistrationValidity } from './resolve-registration-validity';

/** `'unknown'` until a probe settles, and never cached — see {@link refreshRegistrationValidity}. */
let validity: RegistrationValidity = 'unknown';

/** The probe currently running, if any. Concurrent callers share it instead of starting another. */
let inFlight: Promise<RegistrationValidity> | undefined;

/**
 * Bumped whenever something invalidates a running probe's answer — a reset, or an explicit publish.
 * A probe already in flight still settles (nothing can cancel the underlying command), so it checks
 * this before publishing. Without it, a probe that predates the invalidation would overwrite it:
 * leaking one test or story's answer into the next, or undoing a just-registered decision the probe
 * started too early to see.
 */
let generation = 0;

/**
 * Identifies the probe that currently owns {@link inFlight}. Separate from {@link generation} on
 * purpose: generation says whose ANSWER is still wanted, this says whose SLOT it is. A probe that
 * has been disowned must still free the slot, or every later refresh would wedge on a promise that
 * already settled.
 */
let inFlightId = 0;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => {
    // A throwing subscriber must not escape into the shared probe promise: the first-run gate awaits
    // it, so an exception from a decorative dot would strand the user on the "couldn't verify
    // registration" screen. Isolate each listener and keep going.
    try {
      listener();
    } catch (e) {
      logger.warn(`A registration-validity listener threw: ${getErrorMessage(e)}`);
    }
  });
}

function setValidity(next: RegistrationValidity): void {
  validity = next;
  notifyListeners();
}

/**
 * The session's registration validity. Returns `'unknown'` until a probe settles, which callers
 * should treat as "don't nag" rather than "invalid" — a probe resolves to `'unknown'` when the C#
 * provider isn't up yet or the command errored, never because the registration is bad.
 */
export function getRegistrationValidity(): RegistrationValidity {
  return validity;
}

/** Subscribe to validity changes. Returns an unsubscribe function. */
export function subscribeToRegistrationValidity(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Resolves the user's registration validity and publishes it to subscribers.
 *
 * A probe already in flight is always shared, forced or not — `force` bypasses the _cache_, never
 * the in-flight share, so no caller can start a probe storm. A settled `'valid'`/`'invalid'` is
 * returned without re-probing unless `force` is true; `'unknown'` is never cached, so a later
 * refresh always retries it.
 *
 * Rejections propagate rather than being swallowed: `resolveRegistrationValidity` is documented as
 * never rejecting, but the first-run gate relies on seeing a failure if that contract is ever
 * broken. Nothing is published when a probe rejects, and the in-flight slot is always freed.
 */
export async function refreshRegistrationValidity({
  force = false,
}: {
  /**
   * Re-probe even if a definitive value is already cached. Use after the user has had a chance to
   * change their registration. Defaults to false.
   */
  force?: boolean;
} = {}): Promise<RegistrationValidity> {
  if (inFlight) return inFlight;
  if (!force && validity !== 'unknown') return validity;

  const probeGeneration = generation;
  inFlightId += 1;
  const probeId = inFlightId;
  const probe = (async () => {
    try {
      const resolved = await resolveRegistrationValidity();
      // Publish anything definitive, but never let `'unknown'` overwrite an answer we already have:
      // it means "couldn't ask", not "the registration is fine", so downgrading would silently drop
      // a legitimate reminder on one flaky probe. The caller still gets the true probe result.
      const isDowngrade = resolved === 'unknown' && validity !== 'unknown';
      if (probeGeneration === generation && !isDowngrade) setValidity(resolved);
      return resolved;
    } finally {
      // Keyed on the slot, not the generation: a publish or reset disowns this probe's ANSWER, but
      // the slot is still ours to free. Guarding this with the generation would leave `inFlight` set
      // forever and wedge every later refresh on a promise that already settled.
      if (inFlightId === probeId) inFlight = undefined;
    }
  })();
  inFlight = probe;
  return probe;
}

/**
 * Publish a validity resolved elsewhere, without probing. This is how the first-run gate records
 * the answer it actually acted on — in particular a just-registered `'invalid'` that it
 * deliberately treats as `'valid'` for one launch, which the raw probe knows nothing about.
 */
export function publishRegistrationValidity(next: RegistrationValidity): void {
  // Disown any probe already running. The publisher knows something the probe was started too early
  // to see — a registration that was just saved, or a suppression the gate decided — so letting an
  // older probe settle over the top would silently undo the decision.
  generation += 1;
  setValidity(next);
}

/**
 * Resets the store to its initial state, keeping its subscribers (see the comment inside).
 * Storybook uses this too, so switching stories re-probes instead of reusing a cached answer.
 *
 * WARNING: Tests and stories only. @internal
 */
export function resetRegistrationValidityStore(): void {
  validity = 'unknown';
  inFlight = undefined;
  generation += 1;
  // Deliberately keeps its subscribers. `subscribeToRegistrationValidity` is a stable module-level
  // function, so React subscribes once per mount and never re-subscribes; clearing here would
  // permanently detach any component still mounted (a Storybook story, a test that resets between
  // assertions) and freeze it on its last-seen value. Subscribers are notified of the reset instead,
  // and React removes its own listener on unmount.
  notifyListeners();
}
