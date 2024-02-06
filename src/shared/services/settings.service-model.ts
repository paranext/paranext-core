import { SettingNames, SettingTypes } from 'papi-shared-types';
import { OnDidDispose, PlatformEventEmitter, UnsubscriberAsync } from 'platform-bible-utils';
import {
  DataProviderDataType,
  DataProviderSubscriberOptions,
  DataProviderUpdateInstructions,
  IDataProvider,
} from './papi-core.service';

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

// TODO: 1 Fix types- should they be like string/T or SettingName extends SettingNames
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
  get<SettingName extends SettingNames>(
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
    options?: DataProviderSubscriberOptions,
  ): Promise<UnsubscriberAsync>;
} & OnDidDispose &
  IDataProvider<SettingDataTypes> &
  typeof settingsServiceObjectToProxy;

// eslint-disable-next-line no-type-assertion/no-type-assertion
const blah = {} as ISettingsService;
const thing = await blah.get('platform.verseRef');

// TODO: delete this utility function once menuDataService is pushed- don't have access to it now
export function createSyncProxyForAsyncObject<T extends object>(
  getObject: (args?: unknown[]) => Promise<T>,
  objectToProxy: Partial<T> = {},
): T {
  // objectToProxy will have only the synchronously accessed properties of T on it, and this proxy
  // makes the async methods that do not exist yet available synchronously so we have all of T
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return new Proxy(objectToProxy as T, {
    get(target, prop) {
      // We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
      // @ts-expect-error 7053
      if (prop in target) return target[prop];
      return async (...args: unknown[]) => {
        // 7053: We don't have any type information for T, so we assume methodName exists on it and will let JavaScript throw if it doesn't exist
        // 2556: The args here are the parameters for the method specified
        // @ts-expect-error 7053 2556
        return (await getObject())[prop](...args);
      };
    },
  });
}

export type SettingsValues = { [settingId: string]: unknown };
