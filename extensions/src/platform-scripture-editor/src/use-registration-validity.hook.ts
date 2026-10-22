import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

/** Whether this machine has a valid Paratext registration, or `unknown` until the check answers. */
export type RegistrationValidity = 'valid' | 'invalid' | 'unknown';

/**
 * Checks once, on mount, whether this machine has a valid Paratext registration.
 *
 * Only a definitive `true` counts as registered. A rejected or non-boolean answer reads as
 * `invalid`, because the caller uses this to decide whether to restrict what it offers to free
 * resources, and a failed check must never widen that.
 *
 * A web view cannot reach the renderer's shared registration store, so it asks the registration
 * command directly. Registering while the panel is open is not picked up until the panel reloads.
 *
 * @returns The registration state; see {@link RegistrationValidity}.
 */
export function useRegistrationValidity(): RegistrationValidity {
  const [validity, setValidity] = useState<RegistrationValidity>('unknown');

  useEffect(() => {
    let isCurrent = true;
    const check = async () => {
      let next: RegistrationValidity = 'invalid';
      try {
        const isValid = await papi.commands.sendCommand(
          'paratextRegistration.doesUserHaveValidRegistration',
        );
        if (isValid === true) next = 'valid';
      } catch (e) {
        logger.debug(`Registration check did not complete: ${getErrorMessage(e)}`);
      }
      if (isCurrent) setValidity(next);
    };
    check();
    return () => {
      isCurrent = false;
    };
  }, []);

  return validity;
}

export default useRegistrationValidity;
