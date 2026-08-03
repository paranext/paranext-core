import { logger } from '@papi/frontend';
import { useSetting } from '@papi/frontend/react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Whether the app is in 10 Power interface mode.
 *
 * Reads `platform.interfaceMode` and re-renders when it changes, so a live mode toggle takes effect
 * without a restart. A failed read logs a warning and reports Simple — the same fallback the editor
 * web view's own memo uses, so the two can never disagree about an error.
 *
 * @returns `true` in Power mode; `false` in Simple mode and on a read failure.
 */
export function useIsPowerMode(): boolean {
  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');

  return useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) {
      logger.warn(`Error getting interface mode: ${getErrorMessage(interfaceModePossiblyError)}`);
      return false;
    }
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError]);
}

export default useIsPowerMode;
