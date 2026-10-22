import papi, { logger } from '@papi/frontend';
import { getErrorMessage, waitForDuration } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

/**
 * Whether the user's Paratext registration is valid. `unknown` means the check could not tell — the
 * command failed, timed out or answered something other than a boolean — and is **not**
 * interchangeable with `invalid`.
 */
export type RegistrationValidity = 'valid' | 'invalid' | 'unknown';

/** How long one check waits for the .NET process to answer before counting as `unknown`. */
export const REGISTRATION_CHECK_TIMEOUT_MS = 15 * 1000;

/** How long to wait before checking again after an `unknown` answer. */
export const REGISTRATION_CHECK_RETRY_DELAY_MS = 2 * 1000;

/** How many times to check again after an `unknown` answer before settling on it. */
export const MAX_REGISTRATION_CHECK_RETRIES = 2;

/** Asks the .NET process for the registration validity. Never rejects. */
async function readRegistrationValidity(): Promise<RegistrationValidity> {
  // The request catches its own error: `waitForDuration` races it with `Promise.any`, so a rejection
  // would wait out the whole timeout instead of failing fast.
  const isValid = await waitForDuration(async () => {
    try {
      return await papi.commands.sendCommand('paratextRegistration.doesUserHaveValidRegistration');
    } catch (e) {
      logger.debug(`Registration check did not complete: ${getErrorMessage(e)}`);
      return undefined;
    }
  }, REGISTRATION_CHECK_TIMEOUT_MS);
  if (isValid === true) return 'valid';
  if (isValid === false) return 'invalid';
  return 'unknown';
}

/**
 * Reports whether the user's Paratext registration is valid, or `undefined` until it has an answer.
 * Follows core's `resolve-registration-validity.ts`: a failed, timed-out or non-boolean check is
 * `unknown`, and is retried a bounded number of times before the hook settles on it.
 *
 * A definitive `valid` or `invalid` is kept for the life of the component: saving a new
 * registration restarts the app. An `unknown` is dropped when the hook is disabled, so the next
 * time it is enabled it reports `undefined` again until it has asked afresh. A disabled hook makes
 * no requests.
 */
export function useRegistrationValidity({
  enabled,
}: {
  enabled: boolean;
}): RegistrationValidity | undefined {
  const [validity, setValidity] = useState<RegistrationValidity | undefined>(undefined);
  const isSettled = validity === 'valid' || validity === 'invalid';

  useEffect(() => {
    if (isSettled) return undefined;
    if (!enabled) {
      setValidity(undefined);
      return undefined;
    }
    let isCurrent = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const check = async (retriesLeft: number) => {
      const answer = await readRegistrationValidity();
      if (!isCurrent) return;
      if (answer === 'unknown' && retriesLeft > 0) {
        retryTimer = setTimeout(() => check(retriesLeft - 1), REGISTRATION_CHECK_RETRY_DELAY_MS);
        return;
      }
      if (answer === 'unknown')
        logger.warn(
          `Could not determine whether the user is registered after ${MAX_REGISTRATION_CHECK_RETRIES + 1} checks`,
        );
      setValidity(answer);
    };
    check(MAX_REGISTRATION_CHECK_RETRIES);
    return () => {
      isCurrent = false;
      clearTimeout(retryTimer);
    };
  }, [enabled, isSettled]);

  return validity;
}

export default useRegistrationValidity;
