import { useEffect } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { isPlatformError } from 'platform-bible-utils';
import type { SettingTypes } from 'papi-shared-types';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import type { SettingDataTypes } from '@shared/services/settings.service-model';

type InterfaceMode = SettingTypes['platform.interfaceMode'];

/**
 * `localStorage` key for the last-known `platform.interfaceMode`. We seed the hook's initial value
 * from this so the first render after startup matches the user's actual mode instead of the
 * hardcoded `'simple'` default. Without the seed, power-mode users briefly see simple-mode UI
 * (project picker shown, scroll-group selector hidden, etc.) until `useSetting` resolves and
 * triggers a re-render, which is visible as a flicker.
 */
export const INTERFACE_MODE_CACHE_KEY = 'platform-bible.interfaceMode';

/**
 * Reads the last-known `platform.interfaceMode` from the `localStorage` cache, or `undefined` on a
 * miss / unavailable storage. Returning `undefined` (rather than defaulting) lets each caller apply
 * its own fallback: this hook seeds `'simple'`, while the first-run store keeps `undefined` to
 * distinguish "no cached mode yet" from "cached as simple". Shared so the cache format/accepted
 * values live in one place and the gate's power-vs-simple routing can't silently diverge.
 */
export function readCachedInterfaceMode(): InterfaceMode | undefined {
  try {
    const raw = localStorage.getItem(INTERFACE_MODE_CACHE_KEY);
    if (raw === 'power' || raw === 'simple') return raw;
  } catch {
    // localStorage may be unavailable (e.g. in some test or sandboxed environments); fall through
  }
  return undefined;
}

function writeCachedInterfaceMode(mode: InterfaceMode): void {
  try {
    localStorage.setItem(INTERFACE_MODE_CACHE_KEY, mode);
  } catch {
    // Best-effort cache; a failed write just means the next startup falls back to 'simple'
  }
}

/**
 * Returns the current `platform.interfaceMode` (always a safe `'simple' | 'power'` value, falling
 * back to `'simple'` while the setting is loading or if reading it fails) along with a setter.
 * Companion to {@link useIsPowerMode}, which only reads the mode.
 *
 * On startup the initial value is seeded from a `localStorage` cache of the last resolved mode so
 * mode-gated UI doesn't flash the wrong layout before `useSetting` resolves the real value.
 */
export function useInterfaceMode(): [
  mode: InterfaceMode,
  setMode: (newMode: InterfaceMode) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
] {
  const [modePossiblyError, setMode] = useSetting(
    'platform.interfaceMode',
    readCachedInterfaceMode() ?? 'simple',
  );
  const mode: InterfaceMode = isPlatformError(modePossiblyError) ? 'simple' : modePossiblyError;

  useEffect(() => {
    writeCachedInterfaceMode(mode);
  }, [mode]);

  return [mode, setMode];
}

export default useInterfaceMode;
