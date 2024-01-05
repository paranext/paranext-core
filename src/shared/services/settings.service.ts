import { Unsubscriber, deserialize, serialize } from '@shared/utils/papi-util';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import { SettingNames, SettingTypes } from 'papi-shared-types';

/** All message subscriptions - emitters that emit an event each time a setting is updated */
const onDidUpdateSettingEmitters = new Map<
  SettingNames,
  PapiEventEmitter<SettingTypes[SettingNames]>
>();

/**
 * Retrieves the value of the specified setting
 *
 * @param key The string id of the setting for which the value is being retrieved
 * @param defaultSetting The default value used for the setting if no value is available for the key
 * @returns The value of the specified setting, parsed to an object. Returns `undefined` if setting
 *   is not present or no value is available
 * @throws When defaultSetting is required but not provided
 */
const getSetting = <SettingName extends SettingNames>(
  key: SettingName,
  defaultSetting: SettingTypes[SettingName],
): SettingTypes[SettingName] => {
  const settingString = localStorage.getItem(key);
  // Null is used by the external API
  // eslint-disable-next-line no-null/no-null
  if (settingString !== null) {
    return deserialize(settingString);
  }
  if (defaultSetting) {
    return defaultSetting;
  }
  throw new Error(`No default value provided for setting '${key}'`);
};

/**
 * Sets the value of the specified setting
 *
 * @param key The string id of the setting for which the value is being retrieved
 * @param newSetting The value that is to be stored. Setting the new value to `undefined` is the
 *   equivalent of deleting the setting
 */
const setSetting = <SettingName extends SettingNames>(
  key: SettingName,
  newSetting: SettingTypes[SettingName],
) => {
  localStorage.setItem(key, serialize(newSetting));
  // Assert type of the particular SettingName of the emitter.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const emitter = onDidUpdateSettingEmitters.get(key) as
    | PapiEventEmitter<SettingTypes[SettingName]>
    | undefined;
  emitter?.emit(newSetting);
};

/**
 * Removes the setting from memory
 *
 * @param key The string id of the setting for which the value is being removed
 */
const resetSetting = <SettingName extends SettingNames>(key: SettingName) => {
  localStorage.removeItem(key);
  // Assert type of the particular SettingName of the emitter.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  // const emitter = onDidUpdateSettingEmitters.get(key) as
  // | PapiEventEmitter<SettingTypes[SettingName]>
  // | undefined;
  // emitter?.emit(); // TODO: What do we emit to let subscribers know that setting was removed?
};

/**
 * Subscribes to updates of the specified setting. Whenever the value of the setting changes, the
 * callback function is executed.
 *
 * @param key The string id of the setting for which the value is being subscribed to
 * @param callback The function that will be called whenever the specified setting is updated
 * @returns Unsubscriber that should be called whenever the subscription should be deleted
 */
const subscribeToSetting = <SettingName extends SettingNames>(
  key: SettingName,
  callback: (newSetting: SettingTypes[SettingName]) => void,
): Unsubscriber => {
  // Assert type of the particular SettingName of the emitter.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  let emitter = onDidUpdateSettingEmitters.get(key) as
    | PapiEventEmitter<SettingTypes[SettingName]>
    | undefined;
  if (!emitter) {
    emitter = new PapiEventEmitter<SettingTypes[SettingName]>();
    onDidUpdateSettingEmitters.set(
      key,
      // Assert type of the general SettingTypes of the emitter.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      emitter as unknown as PapiEventEmitter<SettingTypes[SettingNames]>,
    );
  }
  return emitter.subscribe(callback);
};

// Declare an interface for the object we're exporting so that JSDoc comments propagate
export interface SettingsService {
  get: typeof getSetting;
  set: typeof setSetting;
  reset: typeof resetSetting;
  subscribe: typeof subscribeToSetting;
}

/**
 * JSDOC SOURCE settingsService
 *
 * Service that allows to get and set settings in local storage
 */
const settingsService: SettingsService = {
  get: getSetting,
  set: setSetting,
  reset: resetSetting,
  subscribe: subscribeToSetting,
};
export default settingsService;
