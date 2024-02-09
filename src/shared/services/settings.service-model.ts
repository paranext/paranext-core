import { SettingNames, SettingTypes } from 'papi-shared-types';
import {
  OnDidDispose,
  Unsubscriber,
  // UnsubscriberAsync,
} from 'platform-bible-utils';
import {
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
  IDataProvider,
} from './papi-core.service';

/** JSDOC DESTINATION settingsServiceDataProviderName */
export const settingsServiceDataProviderName = 'platform.settingsServiceDataProvider';
export const settingsServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE settingsServiceDataProviderName
   *
   * This name is used to register the settings service data provider on the papi. You can use this
   * name to find the data provider when accessing it using the useData hook
   */
  dataProviderName: settingsServiceDataProviderName,
});
/**
 * SettingDataTypes handles getting and setting Platform.Bible core application and extension
 * settings.
 *
 * Note: the unnamed (`''`) data type is not actually part of `SettingDataTypes` because the methods
 * would not be able to create a generic type extending from `SettingNames` in order to return the
 * specific setting type being requested. As such, `get`, `set`, `reset` and `subscribe` are all
 * specified on {@link ISettingsService} instead. Unfortunately, as a result, using Intellisense with
 * `useData` will not show the unnamed data type (`''`) as an option, but you can use `useSetting`
 * instead. However, do note that the unnamed data type (`''`) is fully functional.
 */
export type SettingDataTypes = {
  // '': DataProviderDataType<SettingName, SettingTypes[SettingName], SettingTypes[SettingName]>;
};

declare module 'papi-shared-types' {
  export interface DataProviders {
    [settingsServiceDataProviderName]: ISettingsService;
  }
}

/** JSDOC SOURCE settingsService */
export type ISettingsService = {
  /**
   * Retrieves the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @returns The value of the specified setting, parsed to an object. Returns default setting if
   *   setting does not exist
   * @throws If no default value is available for the setting.
   */
  get<SettingName extends SettingNames>(key: SettingName): Promise<SettingTypes[SettingName]>;

  /**
   * Sets the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being set
   * @param newSetting The value that is to be set for the specified key
   * @returns Information that papi uses to interpret whether to send out updates. Defaults to
   *   `true` (meaning send updates only for this data type).
   * @see {@link DataProviderUpdateInstructions} for more info on what to return
   */
  set<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes>>;

  /**
   * Removes the setting from memory and resets it to its default value
   *
   * @param key The string id of the setting for which the value is being removed
   * @returns `true` if successfully reset the project setting. `false` otherwise
   */
  reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean>;

  /**
   * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
   * callback function is executed.
   *
   * @param key The string id of the setting for which the value is being subscribed to
   * @param callback The function that will be called whenever the specified setting is updated
   * @param options Various options to adjust how the subscriber emits updates
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribe<SettingName extends SettingNames>(
    key: SettingName,
    callback: (newSetting: SettingTypes[SettingName]) => void,
    options: DataProviderSubscriberOptions,
  ): Promise<Unsubscriber>;
} & OnDidDispose &
  IDataProvider<SettingDataTypes> &
  typeof settingsServiceObjectToProxy;
