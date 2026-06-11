import { useSetting } from '@renderer/hooks/papi-hooks';
import { isPlatformError } from 'platform-bible-utils';
import type { SettingTypes } from 'papi-shared-types';
import type { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import type { SettingDataTypes } from '@shared/services/settings.service-model';

type InterfaceMode = SettingTypes['platform.interfaceMode'];

/**
 * Returns the current `platform.interfaceMode` (always a safe `'simple' | 'power'` value, falling
 * back to `'simple'` while the setting is loading or if reading it fails) along with a setter.
 * Companion to {@link useIsPowerMode}, which only reads the mode.
 */
export function useInterfaceMode(): [
  mode: InterfaceMode,
  setMode: (newMode: InterfaceMode) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
] {
  const [modePossiblyError, setMode] = useSetting('platform.interfaceMode', 'simple');
  const mode: InterfaceMode = isPlatformError(modePossiblyError) ? 'simple' : modePossiblyError;
  return [mode, setMode];
}

export default useInterfaceMode;
