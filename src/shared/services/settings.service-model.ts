import { SettingNames, SettingTypes } from 'papi-shared-types';
import { OnDidDispose, PlatformEventEmitter, UnsubscriberAsync } from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
  IDataProvider,
} from './papi-core.service';

/**
 * Name used to register the data provider
 *
 * You can use this name
 */
export const settingsServiceDataProviderName = 'platform.settingsServiceDataProvider';
export const settingsServiceObjectToProxy = Object.freeze({
  dataProviderName: settingsServiceDataProviderName,
});

// TODO: 1 Fix types- should they be like string/T or SettingName extends SettingNames
export type SettingDataTypes<SettingName extends SettingNames> = {
  Setting: DataProviderDataType<SettingName, SettingTypes[SettingName], SettingTypes[SettingName]>;
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

// TODO: 2 Fix function declarations to match data provider data types
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
  getSetting<SettingName extends SettingNames>(
    key: SettingName,
    defaultSetting: SettingTypes[SettingName],
  ): Promise<SettingTypes[SettingName]>;

  /**
   * Sets the value of the specified setting
   *
   * @param key The string id of the setting for which the value is being retrieved
   * @param newSetting The value that is to be stored. Setting the new value to `undefined` is the
   *   equivalent of deleting the setting
   */
  setSetting<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes<SettingNames>>>;

  /**
   * Removes the setting from memory
   *
   * @param key The string id of the setting for which the value is being removed
   */
  resetSetting<SettingName extends SettingNames>(
    key: SettingName,
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes<SettingNames>>>;

  /**
   * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
   * callback function is executed.
   *
   * @param key The string id of the setting for which the value is being subscribed to
   * @param callback The function that will be called whenever the specified setting is updated
   * @returns Unsubscriber that should be called whenever the subscription should be deleted
   */
  subscribeSetting<SettingName extends SettingNames>(
    key: SettingName,
    callback: (newSetting: SettingEvent<SettingName>) => void,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<SettingDataTypes<SettingNames>> &
  typeof settingsServiceObjectToProxy;
