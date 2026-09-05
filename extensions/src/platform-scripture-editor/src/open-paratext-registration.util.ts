import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Opens the Paratext registration UI.
 *
 * The DBL catalog is unreachable without a valid registration, so the panels' registration-required
 * state offers this instead of a retry that cannot succeed. Routes to the same command Home already
 * uses for this failure (`platform-get-resources`' `home.web-view.tsx`).
 *
 * Kept out of `free-resources.utils.ts` deliberately: that module is also imported by
 * `no-project-reference-list.validator.ts`, which runs in the extension host, where
 * `@papi/frontend` does not exist (see `extension-host-import-boundary.test.ts`).
 *
 * Rejections are logged rather than surfaced: this is already the error state, and a second failure
 * message stacked on top of it tells the user nothing they can act on.
 */
export async function openParatextRegistration(): Promise<void> {
  try {
    await papi.commands.sendCommand('paratextRegistration.showParatextRegistration');
  } catch (e) {
    logger.warn(`Could not open Paratext registration: ${getErrorMessage(e)}`);
  }
}

export default openParatextRegistration;
