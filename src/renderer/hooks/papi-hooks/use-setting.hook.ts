import { useCallback, useRef } from 'react';
import settingsService from '@shared/services/settings.service';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import useData from '@renderer/hooks/papi-hooks/use-data.hook';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { SettingDataTypes } from '@shared/services/settings.service-model';

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
 * @param subscriberOptions Various options to adjust how the subscriber emits updates
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
 *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
 *   until `dataProviderSource` or `selector` changes.
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
  subscriberOptions?: DataProviderSubscriberOptions,
): [
  setting: SettingTypes[SettingName],
  setSetting: (
    newData: SettingTypes[SettingName],
  ) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
  resetSetting: () => void,
] => {
  // Use defaultState as a ref so it doesn't update dependency arrays
  const defaultStateRef = useRef(defaultState);
  defaultStateRef.current = defaultState;

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const [setting, setSetting] = useData(settingsService)[''](
    key,
    defaultState,
    subscriberOptions,
  ) as [
    setting: SettingTypes[SettingName],
    setSetting: (
      newData: SettingTypes[SettingName],
    ) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
    boolean,
  ];

  const resetSetting = useCallback(() => {
    settingsService.reset(key);
  }, [key]);

  return [setting, setSetting, resetSetting];
};
export default useSetting;
