import { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Whether the app is in 10 Power interface mode.
 *
 * Reads `platform.interfaceMode` and re-renders when it changes, so a live mode toggle takes effect
 * without a restart. A failed read logs a warning and reports Simple — the same fallback
 * `useStructureProtectionState` uses for the same setting, so the two can never disagree about an
 * error.
 *
 * **`undefined` is not "probably Simple" — it means the setting has not resolved yet, and callers
 * must render nothing until it does.** `useSetting`'s `defaultState` is returned while the read is
 * in flight, so treating the un-resolved value as Simple would paint Simple-only UI into a Power
 * session for one frame and then unmount it. This feature is required to leave Power untouched, and
 * a frame of visible UI is a change. The renderer's own `useInterfaceMode` avoids the flash by
 * seeding from `localStorage`, which a sandboxed web-view iframe cannot reach — hence the explicit
 * third state here.
 *
 * @returns `true` in Power mode; `false` in Simple mode and on a read failure; `undefined` until
 *   the setting resolves.
 */
export function useIsPowerMode(): boolean | undefined {
  const [interfaceModePossiblyError, , , isLoading] = useSetting(
    'platform.interfaceMode',
    'simple',
  );

  return useMemo(() => {
    if (isLoading) return undefined;
    if (isPlatformError(interfaceModePossiblyError)) {
      logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
      return false;
    }
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError, isLoading]);
}

export default useIsPowerMode;
