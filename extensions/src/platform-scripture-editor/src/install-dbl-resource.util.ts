import { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/** Minimal shape of the DBL resources data provider needed to install a resource. */
export type DblResourceInstaller = { installDblResource: (uid: string) => Promise<void> };

/**
 * Installs a DBL resource by uid. Shared by the model-text and resource-text web-view panels so
 * their install glue stays in sync.
 *
 * Failure feedback is the caller's responsibility: both panels render an inline install-failed
 * state with a retry action, which is the single user-facing channel for the failure (an additional
 * error toast would double up on the same failure). This helper just logs a warning and rethrows so
 * the caller can enter that state.
 *
 * @param provider The DBL resources data provider, or `undefined` if it hasn't resolved yet.
 * @param dblEntryUid Uid of the resource to install.
 * @param logLabel Short panel name included in the warning log (e.g. `'model text panel'`).
 * @returns `true` if the install ran, `false` if the provider wasn't resolved yet — a no-op that is
 *   neither success nor failure, so the caller's effect re-fires (via the provider identity change)
 *   once it resolves. On a real failure it logs a warning and rethrows so the caller can surface
 *   its install-failed state.
 */
export async function installDblResource(
  provider: DblResourceInstaller | undefined,
  dblEntryUid: string,
  logLabel: string,
): Promise<boolean> {
  if (!provider) return false;
  try {
    await provider.installDblResource(dblEntryUid);
    return true;
  } catch (e: unknown) {
    logger.warn(`Error installing dbl resource for ${logLabel}: ${getErrorMessage(e)}`);
    throw e;
  }
}

export default installDblResource;
