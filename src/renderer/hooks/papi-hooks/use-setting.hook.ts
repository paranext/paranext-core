import { PlatformError } from 'platform-bible-utils';
import { useData } from '@renderer/hooks/papi-hooks/use-data.hook';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { SettingDataTypes } from '@shared/services/settings.service-model';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { useCallback } from 'react';

/**
 * Gets, sets and resets a setting on the PAPI. Also notifies subscribers when the setting changes
 * and gets updated when the setting is changed by others.
 *
 * @param key The string id that is used to identify the setting that will be stored on the PAPI
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param defaultState The initial value to return while first awaiting the setting value
 * @param subscriberOptions Various options to adjust how the subscriber emits updates
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
 *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
 *   until `dataProviderSource` or `selector` changes.
 * @returns `[setting, setSetting, resetSetting]`
 *
 *   - `setting`: The current state of the setting, either `defaultState`, the stored value, or a
 *       `PlatformError` if loading the value fails. Use `isPlatformError()` to check.
 *   - `setSetting`: Function that updates the setting to a new value. Rejects while the underlying
 *       subscription is throttled — see {@link useData} for that state.
 *   - `resetSetting`: Function that removes the setting and resets the value to `defaultState`
 *
 * @throws When subscription callback function is called with an update that has an unexpected
 *   message type
 */
export const useSetting = <SettingName extends SettingNames>(
  key: SettingName,
  defaultState: SettingTypes[SettingName],
  subscriberOptions?: DataProviderSubscriberOptions,
): [
  setting: SettingTypes[SettingName] | PlatformError,
  setSetting: (
    newData: SettingTypes[SettingName],
  ) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>,
  resetSetting: () => void,
  isLoading: boolean,
] => {
  // `SettingDataTypes` has no data types defined on it. We're using custom methods to interact
  // with the data provider. The useData hook is not able to see these, so we are asserting them
  // because we know we've defined them on the data provider.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const [setting, setSetting, isLoading] = (
    useData(settingsService) as {
      ['']: (
        selector: SettingName,
        defaultValue: SettingTypes[SettingName],
        subscriberOptions?: DataProviderSubscriberOptions,
      ) => [
        setting: SettingTypes[SettingName] | PlatformError,
        // `useData` drops its setter while its runaway guard is throttled, so this really can be
        // `undefined` — asserting otherwise would make the guard below look like dead code
        setSetting:
          | ((
              newData: SettingTypes[SettingName],
            ) => Promise<DataProviderUpdateInstructions<SettingDataTypes>>)
          | undefined,
        boolean,
      ];
    }
  )[''](key, defaultState, subscriberOptions);
  /* eslint-enable */

  const resetSetting = useCallback(() => {
    settingsService.reset(key);
  }, [key]);

  // `useData` drops its setter when its runaway guard trips. This hook's returned type promises a
  // callable setter, so call sites do not null-check it — substitute one that rejects rather than
  // letting `setSetting is not a function` throw synchronously out of an event handler.
  const safeSetSetting = useCallback(
    async (newData: SettingTypes[SettingName]) => {
      if (setSetting) return setSetting(newData);
      const message = `Cannot set setting ${key}: its data subscription is temporarily throttled. It will retry on its own shortly.`;
      logger.warn(message);
      throw new Error(message);
    },
    [key, setSetting],
  );

  return [setting, safeSetSetting, resetSetting, isLoading];
};
export default useSetting;
