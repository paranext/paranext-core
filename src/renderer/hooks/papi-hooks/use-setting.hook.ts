import { useCallback, useEffect, useState } from 'react';
import settingsService from '@shared/services/settings.service';
import { SettingNames, SettingTypes } from 'papi-shared-types';

/**
 * Gets and sets a setting on the papi. Also notifies subscribers when the setting changes and gets
 * updated when the setting is changed by others.
 *
 * Setting the value to `null` is the equivalent of deleting the setting.
 *
 * @param key The string id that is used to store the setting in local storage
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param defaultState The default state of the setting. If the setting already has a value set to
 *   it in local storage, this parameter will be ignored.
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @returns `[setting, setSetting]`
 *
 *   - `setting`: The current state of the setting, either the defaultState or the stored state on the
 *       papi, if any
 *   - `setSetting`: Function that updates the setting to a new value
 */
const useSetting = <SettingName extends SettingNames>(
  key: SettingName,
  defaultState: SettingTypes[SettingName],
): [SettingTypes[SettingName], (newSetting: SettingTypes[SettingName]) => void] => {
  const [setting, setSettingInternal] = useState(() => {
    const initialSetting = settingsService.get(key);
    return initialSetting !== null ? initialSetting : defaultState;
  });

  useEffect(() => {
    const updateSettingFromService = (newSetting: SettingTypes[SettingName] | null) => {
      if (newSetting !== null) {
        setSettingInternal(newSetting);
      } else {
        setSettingInternal(defaultState);
      }
    };

    const initialSetting = settingsService.get(key);
    updateSettingFromService(initialSetting);

    const unsubscriber = settingsService.subscribe(key, (newSetting) => {
      updateSettingFromService(newSetting);
    });

    return () => {
      unsubscriber();
    };
  }, [key, defaultState]);

  const setSetting = useCallback(
    (newSetting: SettingTypes[SettingName] | null) => {
      settingsService.set(key, newSetting);
      setSettingInternal(newSetting !== null ? newSetting : defaultState);
    },
    [key, defaultState],
  );

  return [setting, setSetting];
};
export default useSetting;
