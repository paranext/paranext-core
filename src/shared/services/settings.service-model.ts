import { SettingNames, SettingTypes } from 'papi-shared-types';
import {
  OnDidDispose,
  PlatformEventEmitter,
  Unsubscriber,
  // UnsubscriberAsync,
} from 'platform-bible-utils';
import { DataProviderUpdateInstructions, IDataProvider } from './papi-core.service';

/** JSDOC DESTINATION dataProviderName */
export const settingsServiceDataProviderName = 'platform.settingsServiceDataProvider';
export const settingsServiceObjectToProxy = Object.freeze({
  /**
   * JSDOC SOURCE dataProviderName
   *
   * Name used to register the data provider
   *
   * You can use this name
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

/** Event to set or update a setting */
export type UpdateSettingEvent<SettingName extends SettingNames> = {
  type: 'update-setting';
  setting: SettingTypes[SettingName];
};

/** Event to remove a setting */
export type ResetSettingEvent = {
  type: 'reset-setting';
};

/** All supported setting events */
export type SettingEvent<SettingName extends SettingNames> =
  | UpdateSettingEvent<SettingName>
  | ResetSettingEvent;

/** All message subscriptions - emitters that emit an event each time a setting is updated */
export const onDidUpdateSettingEmitters = new Map<
  SettingNames,
  PlatformEventEmitter<SettingEvent<SettingNames>>
>();

/** JSDOC SOURCE settingsService */
export type ISettingsService = {
  /**
   * Retrieves the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @param defaultSetting The default value used for the setting if no value is available for the
   *   key
   * @returns The value of the specified setting, parsed to an object. Returns default setting if
   *   setting does not exist
   */
  get<SettingName extends SettingNames>(key: SettingName): Promise<SettingTypes[SettingName]>;

  /**
   * Sets the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @param newSetting The value that is to be stored. Setting the new value to `undefined` is the
   *   equivalent of deleting the setting
   */
  set<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes>>;

  /**
   * Removes the setting from memory
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
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribe<SettingName extends SettingNames>(
    key: SettingName,
    callback: (newSetting: SettingEvent<SettingName>) => void,
  ): Promise<Unsubscriber>;
} & OnDidDispose &
  IDataProvider<SettingDataTypes> &
  typeof settingsServiceObjectToProxy;
