import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, waitForDuration } from 'platform-bible-utils';
import { retryUntil } from '@shared/utils/retry.util';
import { RegistrationValidity } from './first-run.model';

/**
 * How long to wait for the C# ParatextData provider to answer the registration query before giving
 * up on a single attempt. The command layer already retries a missing handler (~10 s); this bound
 * ensures one attempt never hangs forever if the provider never comes up.
 */
export const REGISTRATION_RESOLVE_TIMEOUT_MS = 15_000;

/**
 * How many times to probe before surfacing the error screen. See {@link resolveRegistrationValidity}
 * for why a transient `'unknown'` is worth retrying.
 */
const REGISTRATION_RESOLVE_MAX_ATTEMPTS = 3;

/** Delay between probes, giving the provider time to finish starting up. */
const REGISTRATION_RESOLVE_RETRY_DELAY_MS = 2_000;

/**
 * Runs a single registration-validity probe. Never rejects: a rejected/absent command or a timeout
 * both resolve to `'unknown'`.
 */
async function resolveRegistrationValidityOnce(timeoutMs: number): Promise<RegistrationValidity> {
  // waitForDuration resolves to `undefined` on timeout, so the query must never reject (it would make
  // Promise.any wait out the full timeout instead of failing fast) — the try/catch lives INSIDE the
  // query and returns 'unknown' on any error. A timeout likewise maps to 'unknown'.
  const validity = await waitForDuration(async (): Promise<RegistrationValidity> => {
    try {
      const isValid = await commandService.sendCommand(
        'paratextRegistration.doesUserHaveValidRegistration',
      );
      if (isValid === true) return 'valid';
      if (isValid === false) return 'invalid';
      // Non-boolean (null/undefined/0 from a misbehaving provider) is indeterminate, not 'invalid' —
      // treating it as 'invalid' would wrongly re-onboard a registered user.
      return 'unknown';
    } catch (e) {
      // Debug, not warn: a failed probe is the expected transient during a busy startup and is
      // retried by resolveRegistrationValidity, which logs a single warning only if every attempt
      // fails. Warning here would fire on the common retried-then-succeeded startup.
      logger.debug(`Registration probe did not complete: ${getErrorMessage(e)}`);
      return 'unknown';
    }
  }, timeoutMs);
  return validity ?? 'unknown';
}

/**
 * Resolves the user's registration validity as a tri-state, retrying a transient `'unknown'` before
 * giving up. Never rejects.
 *
 * A probe returns `'unknown'` when it can't complete — the C# provider isn't ready yet or the
 * command errored. The check is local (it reads the machine's registration info, never a server),
 * so `'unknown'` is never a connectivity problem. On a busy upgrade/cold start the provider can
 * take a while to come up, so we retry rather than immediately stranding a registered, connected
 * user on the error screen (PT-4302). A definitive `'valid'`/`'invalid'` returns right away.
 *
 * Giving up after all attempts takes tens of seconds: each probe ends either when the command layer
 * abandons a missing handler (~10 s) or at `timeoutMs`, whichever comes first, repeated up to
 * `maxAttempts` times plus the inter-probe backoffs. The gate shows its loading spinner
 * throughout.
 */
export async function resolveRegistrationValidity(
  timeoutMs = REGISTRATION_RESOLVE_TIMEOUT_MS,
  maxAttempts = REGISTRATION_RESOLVE_MAX_ATTEMPTS,
  retryDelayMs = REGISTRATION_RESOLVE_RETRY_DELAY_MS,
): Promise<RegistrationValidity> {
  // Retry a transient 'unknown'; a definitive 'valid'/'invalid' stops immediately. retryUntil
  // clamps maxAttempts to at least 1 and skips the backoff after the final probe.
  const validity = await retryUntil(
    () => resolveRegistrationValidityOnce(timeoutMs),
    (result) => result !== 'unknown',
    { maxAttempts, delayMs: retryDelayMs },
  );
  if (validity === 'unknown') {
    logger.warn(
      `Could not resolve registration validity after ${Math.max(1, maxAttempts)} attempt(s); the provider is likely still starting up.`,
    );
  }
  return validity;
}
