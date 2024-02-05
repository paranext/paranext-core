import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import dataProviderService, { DataProviderEngine } from '@shared/services/data-provider.service';
import { ISettingsService, ResetSettingEvent, SettingDataTypes, SettingEvent, UpdateSettingEvent, onDidUpdateSettingEmitters, settingsServiceDataProviderName, settingsServiceObjectToProxy } from '@shared/services/settings.service-model';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { PlatformEventEmitter, UnsubscriberAsync, serialize } from 'platform-bible-utils';

// TODO: 3 Fix function declarations to match service-model
// TODO: 4 Fix implementation of all functions
// TODO: Where is data stored, how is dp going to access it
class SettingDataProviderEngine
  extends DataProviderEngine<SettingDataTypes<SettingNames>>
  implements IDataProviderEngine<SettingDataTypes<SettingNames>>
{
  // Where do our settings live? Some JSON object/file/whatever?

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  async getSetting<SettingName extends SettingNames>(
    key: SettingName,
    defaultSetting: SettingTypes[SettingName],
  ): Promise<SettingTypes[SettingName]> => {
    const settingString = localStorage.getItem(key);
    // Null is used by the external API
    // eslint-disable-next-line no-null/no-null
    if (settingString !== null) {
      return deserialize(settingString);
    }
    return defaultSetting;
  }

  async setSetting<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ) => {
    localStorage.setItem(key, serialize(newSetting));
    // Assert type of the particular SettingName of the emitter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const emitter = onDidUpdateSettingEmitters.get(key);
    const setMessage: UpdateSettingEvent<SettingName> = {
      setting: newSetting,
      type: 'update-setting',
    };
    emitter?.emit(setMessage);
  }

  async resetSetting<SettingName extends SettingNames>(key: SettingName) => {
    localStorage.removeItem(key);
    // Assert type of the particular SettingName of the emitter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const emitter = onDidUpdateSettingEmitters.get(key);
    const resetMessage: ResetSettingEvent = { type: 'reset-setting' };
    emitter?.emit(resetMessage);
  }

  async subscribeToSetting<SettingName extends SettingNames>(
    key: SettingName,
    callback: (newSetting: SettingEvent<SettingName>) => void,
  ): Promise<UnsubscriberAsync> => {
    // Assert type of the particular SettingName of the emitter.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    let emitter = onDidUpdateSettingEmitters.get(key) as
      | PlatformEventEmitter<SettingEvent<SettingName>>
      | undefined;
    if (!emitter) {
      emitter = new PlatformEventEmitter<SettingEvent<SettingName>>();
      onDidUpdateSettingEmitters.set(
        key,
        // Assert type of the general SettingNames of the emitter.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        emitter as PlatformEventEmitter<SettingEvent<SettingNames>>,
      );
    }
    return emitter.subscribe(callback);
  }
}

let initializationPromise: Promise<void>;
/** Need to run initialize before using this */
let dataProvider: ISettingsService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          dataProvider = await dataProviderService.registerEngine(
            settingsServiceDataProviderName,
            new SettingDataProviderEngine(), // will be fixed when dp types are correct
          );
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingSettingService = {
  implementSettingDataProviderEngine: () => {
    return new SettingDataProviderEngine();
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const settingService = createSyncProxyForAsyncObject<ISettingsService>(async () => {
  await initialize();
  return dataProvider;
}, settingsServiceObjectToProxy);
