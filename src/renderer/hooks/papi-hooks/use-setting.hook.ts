import { useCallback, useEffect, useState } from 'react';
import settingsService from '@shared/services/settings.service';

/**
 * Gets and sets a setting on the papi. Also notifies subscribers when the setting changes.
 * Setting the value to `null` is the equivalent of deleting the setting.
 * @param key The string id that is used to store the setting in local storage
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 * @param defaultState The default state of the setting. If the setting already has a value set to it in local storage, this parameter will be ignored.
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be updated every render
 *
 * @returns [setting, setSetting]
 *  - `setting`: The current state of the setting, either the defaultState or the stored state on the papi, if any
 *  - `setSetting`: Function that updates the setting to a new value
 */
const useSetting = <T>(
  key: string,
  defaultState: T | null,
): [T | null, (newSetting: T | null) => void] => {
  const [setting, setSettingInternal] = useState(() => {
    const initialSetting: T | null = settingsService.get(key) as T | null;
    return initialSetting !== null ? initialSetting : defaultState;
  });

  useEffect(() => {
    const updateSettingFromService = () => {
      const initialSetting: T | null = settingsService.get(key) as T | null;
      if (initialSetting !== null) {
        setSettingInternal(initialSetting);
      } else {
        setSettingInternal(defaultState);
      }
    };

    updateSettingFromService();

    const unsubscriber = settingsService.subscribe(key, () => {
      updateSettingFromService();
    });

    return () => {
      unsubscriber();
    };
  }, [key, defaultState]);

  const setSetting = useCallback(
    (newSetting: T | null) => {
      settingsService.set(key, newSetting);
      setSettingInternal(newSetting);
    },
    [key],
  );

  return [setting, setSetting];
};
export default useSetting;
