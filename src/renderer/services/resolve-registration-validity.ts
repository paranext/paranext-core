import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, waitForDuration } from 'platform-bible-utils';
import { RegistrationValidity } from './first-run.model';

/**
 * How long to wait for the C# ParatextData provider to answer the registration query before giving
 * up. The command layer already retries a missing handler (~10 s); this outer bound ensures the
 * wizard never hangs forever if the provider never comes up — the caller then shows a Retry
 * affordance rather than guessing.
 */
export const REGISTRATION_RESOLVE_TIMEOUT_MS = 15_000;

/**
 * Resolves the user's registration validity as a tri-state. Never rejects: a rejected/absent
 * command or a timeout both resolve to `'unknown'`.
 */
export async function resolveRegistrationValidity(
  timeoutMs = REGISTRATION_RESOLVE_TIMEOUT_MS,
): Promise<RegistrationValidity> {
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
      logger.warn(`Could not resolve registration validity: ${getErrorMessage(e)}`);
      return 'unknown';
    }
  }, timeoutMs);
  return validity ?? 'unknown';
}
