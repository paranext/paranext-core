import { useCallback, useEffect, useState } from 'react';
import settingsService from '@shared/services/settings.service';
import { SettingNames, SettingTypes } from 'papi-shared-types';

/**
 * Gets, sets and resets a setting on the papi. Also notifies subscribers when the setting changes
 * and gets updated when the setting is changed by others.
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
 * @returns `[setting, setSetting, resetSetting]`
 *
 *   - `setting`: The current state of the setting, either the defaultState or the stored state on the
 *       papi, if any
 *   - `setSetting`: Function that updates the setting to a new value
 *   - `resetSetting`: Function that removes the setting
 *
 * @throws When subscription callback function is called with an update that has an unexpected
 *   message type
 */
const useSetting = <SettingName extends SettingNames>(
  key: SettingName,
  defaultState: SettingTypes[SettingName],
): [SettingTypes[SettingName], (newSetting: SettingTypes[SettingName]) => void, () => void] => {
  const [setting, setSettingInternal] = useState(settingsService.get(key, defaultState));

  useEffect(() => {
    const updateSettingFromService = (newSettingState: SettingTypes[SettingName]) => {
      setSettingInternal(newSettingState);
    };

    const initialSetting = settingsService.get(key, defaultState);
    updateSettingFromService(initialSetting);

    const unsubscriber = settingsService.subscribe(key, (newSetting) => {
      if (newSetting.type === 'set-setting') {
        // For some reason the function expects a `ScriptureReference | undefined` here, instead of the general `SettingTypes[SettingName]`
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        updateSettingFromService(newSetting.setting as SettingTypes[SettingName]);
      } else if (newSetting.type === 'reset-setting') {
        setSettingInternal(defaultState);
      } else {
        throw new Error('Unexpected message type used for updating setting');
      }
    });

    return () => {
      unsubscriber();
    };
  }, [defaultState, key]);

  const setSetting = useCallback(
    (newSetting: SettingTypes[SettingName]) => {
      settingsService.set(key, newSetting);
      setSettingInternal(newSetting);
    },
    [key],
  );

  const resetSetting = useCallback(() => {
    settingsService.reset(key);
    setSettingInternal(defaultState);
  }, [defaultState, key]);

  return [setting, setSetting, resetSetting];
};
export default useSetting;
