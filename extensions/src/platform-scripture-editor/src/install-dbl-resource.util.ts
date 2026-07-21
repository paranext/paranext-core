import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/** Minimal shape of the DBL resources data provider needed to install a resource. */
type DblResourceInstaller = { installDblResource: (uid: string) => Promise<void> };

/**
 * Installs a DBL resource by uid, surfacing failures to the user. Shared by the model-text and
 * resource-text web-view panels so their install glue stays in sync.
 *
 * @param provider The DBL resources data provider, or `undefined` if it hasn't resolved yet.
 * @param dblEntryUid Uid of the resource to install.
 * @param logLabel Short panel name included in the warning log (e.g. `'model text panel'`).
 * @returns `true` if the install ran, `false` if the provider wasn't resolved yet — a no-op that is
 *   neither success nor failure, so the caller's effect re-fires (via the provider identity change)
 *   once it resolves. On a real failure it sends a notification, logs a warning, and rethrows so
 *   the caller can surface its install-failed state.
 */
export async function installDblResourceWithNotification(
  provider: DblResourceInstaller | undefined,
  dblEntryUid: string,
  logLabel: string,
): Promise<boolean> {
  if (!provider) return false;
  try {
    await provider.installDblResource(dblEntryUid);
    return true;
  } catch (e: unknown) {
    papi.notifications.send({
      message: '%webView_selectDblResource_installFailed%',
      severity: 'error',
    });
    logger.warn(`Error installing dbl resource for ${logLabel}: ${getErrorMessage(e)}`);
    throw e;
  }
}

export default installDblResourceWithNotification;
