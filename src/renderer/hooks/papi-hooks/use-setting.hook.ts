import { useCallback, useEffect, useRef, useState } from 'react';
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
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. Running `resetSetting()` will always update the setting value
 *   returned to the latest `defaultState`, and changing the `key` will use the latest
 *   `defaultState`. However, if `defaultState` is changed while a setting is `defaultState`
 *   (meaning it is reset and has no value), the returned setting value will not be updated to the
 *   new `defaultState`.
 * @returns `[setting, setSetting, resetSetting]`
 *
 *   - `setting`: The current state of the setting, either `defaultState` or the stored state on the
 *       papi, if any
 *   - `setSetting`: Function that updates the setting to a new value
 *   - `resetSetting`: Function that removes the setting and resets the value to `defaultState`
 *
 * @throws When subscription callback function is called with an update that has an unexpected
 *   message type
 */
const useSetting = <SettingName extends SettingNames>(
  key: SettingName,
  defaultState: SettingTypes[SettingName],
): [
  setting: SettingTypes[SettingName],
  setSetting: (newSetting: SettingTypes[SettingName]) => void,
  resetSetting: () => void,
] => {
  // Use defaultState as a ref so it doesn't update dependency arrays
  const defaultStateRef = useRef(defaultState);
  defaultStateRef.current = defaultState;

  const [setting, setSettingInternal] = useState(settingsService.get(key, defaultStateRef.current));

  useEffect(() => {
    // Get the setting for the new key when the key changes
    setSettingInternal(settingsService.get(key, defaultStateRef.current));

    // Subscribe to changes to the setting
    const unsubscriber = settingsService.subscribe(key, (newSetting) => {
      if (newSetting.type === 'update-setting') {
        setSettingInternal(newSetting.setting);
      } else if (newSetting.type === 'reset-setting') {
        setSettingInternal(defaultStateRef.current);
      } else {
        throw new Error('Unexpected message type used for updating setting');
      }
    });

    return () => {
      unsubscriber();
    };
  }, [key]);

  const setSetting = useCallback(
    (newSetting: SettingTypes[SettingName]) => {
      settingsService.set(key, newSetting);
      setSettingInternal(newSetting);
    },
    [key],
  );

  const resetSetting = useCallback(() => {
    settingsService.reset(key);
    setSettingInternal(defaultStateRef.current);
  }, [key]);

  return [setting, setSetting, resetSetting];
};
export default useSetting;
