import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
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
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<RegistrationValidity>((resolve) => {
    timer = setTimeout(() => resolve('unknown'), timeoutMs);
  });

  try {
    const query = commandService
      .sendCommand('paratextRegistration.doesUserHaveValidRegistration')
      .then((isValid): RegistrationValidity => (isValid ? 'valid' : 'invalid'));
    return await Promise.race([query, timeout]);
  } catch (e) {
    logger.warn(`Could not resolve registration validity: ${getErrorMessage(e)}`);
    return 'unknown';
  } finally {
    clearTimeout(timer);
  }
}
