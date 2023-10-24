import { Unsubscriber } from '@shared/utils/papi-util';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import { SettingNames, SettingTypes } from 'papi-shared-types';

type Nullable<T> = T | null;

/** All message subscriptions - emitters that emit an event each time a setting is updated */
const onDidUpdateSettingEmitters = new Map<
  SettingNames,
  PapiEventEmitter<Nullable<SettingTypes>>
>();

/**
 * Retrieves the value of the specified setting
 * @param key The string id of the setting for which the value is being retrieved
 * @returns The value of the specified setting, parsed to an object. Returns `null` if setting is
 * not present or no value is available
 */
const getSetting = <SettingName extends SettingNames>(
  key: SettingName,
): Nullable<SettingTypes[SettingName]> => {
  const settingString = localStorage.getItem(key);
  return settingString !== null ? JSON.parse(settingString) : null;
};

/**
 * Sets the value of the specified setting
 * @param key The string id of the setting for which the value is being retrieved
 * @param newSetting The value that is to be stored. Setting the new value to `null` is the
 * equivalent of deleting the setting
 */
const setSetting = <SettingName extends SettingNames>(
  key: SettingName,
  newSetting: Nullable<SettingTypes[SettingName]>,
) => {
  localStorage.setItem(key, JSON.stringify(newSetting));
  // Assert type of the particular SettingName of the emitter.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const emitter = onDidUpdateSettingEmitters.get(key) as
    | PapiEventEmitter<Nullable<SettingTypes[SettingName]>>
    | undefined;
  emitter?.emit(newSetting);
};

/**
 * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
 * callback function is executed.
 * @param key The string id of the setting for which the value is being subscribed to
 * @param callback The function that will be called whenever the specified setting is updated
 * @returns Unsubscriber that should be called whenever the subscription should be deleted
 */
const subscribeToSetting = <SettingName extends SettingNames>(
  key: SettingName,
  callback: (newSetting: Nullable<SettingTypes[SettingName]>) => void,
): Unsubscriber => {
  // Assert type of the particular SettingName of the emitter.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  let emitter = onDidUpdateSettingEmitters.get(key) as
    | PapiEventEmitter<Nullable<SettingTypes[SettingName]>>
    | undefined;
  if (!emitter) {
    emitter = new PapiEventEmitter<Nullable<SettingTypes[SettingName]>>();
    // Assert type of the general SettingTypes of the emitter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    onDidUpdateSettingEmitters.set(key, emitter as PapiEventEmitter<Nullable<SettingTypes>>);
  }
  return emitter.subscribe(callback);
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface SettingsService {
  get: typeof getSetting;
  set: typeof setSetting;
  subscribe: typeof subscribeToSetting;
}

/** JSDOC SOURCE settingsService
 * Service that allows to get and set settings in local storage
 */
const settingsService: SettingsService = {
  get: getSetting,
  set: setSetting,
  subscribe: subscribeToSetting,
};
export default settingsService;
