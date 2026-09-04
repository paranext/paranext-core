import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback } from 'react';
import { installDblResource, type DblResourceInstaller } from './install-dbl-resource.util';

/**
 * Builds the `installResource` callback the Model Text and Resource (Bible Texts / Commentaries)
 * panels hand to their auto-install / manual-pick flows. Both panels need the identical glue —
 * install via the DBL resources provider, then ask the panel to re-resolve its cached resource list
 * so the freshly-installed resource flips to installed and renders — differing only in the log
 * label, so it lives here once.
 *
 * The returned callback keeps a stable identity as long as `provider`, `logLabel`, and
 * `onInstalled` do; the panel's auto-install effect depends on that identity, so pass a stable
 * `onInstalled` (e.g. a `useCallback`-wrapped setter).
 *
 * @param provider The DBL resources data provider, or `undefined` until it resolves. While
 *   `undefined` the install is a no-op that resolves without calling `onInstalled`; the provider's
 *   identity change on resolution re-fires the caller's effect to run the real install.
 * @param logLabel Short panel name included in the warning log on failure (e.g. `'model text
 *   panel'`).
 * @param onInstalled Called after a real install runs, so the panel re-resolves its resource list.
 * @returns An `installResource(dblEntryUid)` callback that rejects if the install fails, so callers
 *   can enter their install-failed state.
 */
export function useInstallDblResource(
  provider: DblResourceInstaller | undefined,
  logLabel: string,
  onInstalled: () => void,
): (dblEntryUid: string) => Promise<void> {
  return useCallback(
    async (dblEntryUid: string) => {
      if (!(await installDblResource(provider, dblEntryUid, logLabel))) return;

      // Bring the catalog's installed flags up to date before the panel re-resolves. That
      // re-resolve reads a cache the extension host corrects in the background, so without this it
      // answers from before this install and the panel reports the resource it just installed as
      // missing.
      try {
        await papi.commands.sendCommand('platformGetResources.refreshInstalledFlags');
      } catch (error) {
        // The install succeeded, so this is not a failure to report: the flags catch up on a later
        // read instead of this one.
        logger.debug(
          `Could not refresh installed flags for the ${logLabel}: ${getErrorMessage(error)}`,
        );
      }

      onInstalled();
    },
    [provider, logLabel, onInstalled],
  );
}

export default useInstallDblResource;
