import { useSetting } from '@renderer/hooks/papi-hooks';
import { isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

/**
 * Returns whether the app is currently in `'power'` interface mode. Falls back to `false` (simple
 * mode) while the setting is loading or if reading it fails, so power-only UI never accidentally
 * appears before the real value is known.
 */
export function useIsPowerMode(): boolean {
  const [interfaceModePossiblyError] = useSetting('platform.interfaceMode', 'simple');
  return useMemo(() => {
    if (isPlatformError(interfaceModePossiblyError)) return false;
    return interfaceModePossiblyError === 'power';
  }, [interfaceModePossiblyError]);
}

export default useIsPowerMode;
