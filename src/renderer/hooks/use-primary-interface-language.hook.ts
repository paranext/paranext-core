import { useSetting } from '@renderer/hooks/papi-hooks';
import { isPlatformError } from 'platform-bible-utils';

// Stable reference avoids a new array allocation on every render (useSetting compares by ref).
const DEFAULT_LOCALE: string[] = ['en'];

/**
 * Returns the primary BCP 47 language tag from the user's `platform.interfaceLanguage` setting,
 * falling back to `'en'` on error or when the setting is absent or empty.
 *
 * Uses `||` (not `??`) so an empty-string element also falls back to `'en'` —
 * `Intl.NumberFormat('')` throws a RangeError in V8.
 */
export function usePrimaryInterfaceLanguage(): string {
  const [interfaceLanguage] = useSetting('platform.interfaceLanguage', DEFAULT_LOCALE);
  return isPlatformError(interfaceLanguage) ? 'en' : interfaceLanguage[0] || 'en';
}
