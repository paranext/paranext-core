import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import dataProviderService, { DataProviderEngine } from '@shared/services/data-provider.service';
import {
  AllSettingsData,
  ISettingsService,
  SettingDataTypes,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from '@shared/services/settings.service-model';
import coreSettingsInfo from '@main/data/core-settings-info.data';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { createSyncProxyForAsyncObject, deserialize } from 'platform-bible-utils';
import { joinUriPaths } from '@node/utils/util';
import * as nodeFS from '@node/services/node-file-system.service';

const SETTINGS_FILE_URI = joinUriPaths('data://', 'settings.json');

async function getSettingsDataFromFile() {
  const settingsFileExists = await nodeFS.getStats(SETTINGS_FILE_URI);
  if (!settingsFileExists) {
    await nodeFS.writeFile(SETTINGS_FILE_URI, '{}');
  }
  const settingsFileString = await nodeFS.readFileText(SETTINGS_FILE_URI);
  const settingsData: AllSettingsData = deserialize(settingsFileString);
  if (typeof settingsData !== 'object')
    throw new Error(`Settings data located in '${SETTINGS_FILE_URI}' is invalid`);
  return settingsData;
}

async function writeSettingsDataToFile(settingsData: Partial<AllSettingsData>) {
  await nodeFS.writeFile(SETTINGS_FILE_URI, JSON.stringify(settingsData));
}

function getDefaultValueForKey<SettingName extends SettingNames>(
  key: SettingName,
): SettingTypes[SettingName] {
  const settingInfo = coreSettingsInfo[key];
  if (!settingInfo) {
    throw new Error(`No setting exists for key ${key}`);
  }
  if (!('default' in settingInfo)) {
    throw new Error(`No default value specified for key ${key}`);
  }
  return settingInfo.default;
}

class SettingDataProviderEngine
  extends DataProviderEngine<
    SettingDataTypes & {
      // Including `''` here so we can emit `''` events though the event types are not
      // tight enough to use on the actual `''` data type and methods
      '': DataProviderDataType<
        SettingNames,
        SettingTypes[SettingNames],
        SettingTypes[SettingNames]
      >;
    }
  >
  implements IDataProviderEngine<SettingDataTypes>
{
  private settingsData: Partial<AllSettingsData>;

  constructor(settingsData: Partial<AllSettingsData>) {
    super();
    this.settingsData = settingsData;
  }

  async get<SettingName extends SettingNames>(
    key: SettingName,
  ): Promise<SettingTypes[SettingName]> {
    if (!(key in this.settingsData)) {
      return getDefaultValueForKey(key);
    }
    // TypeScript falsely assumes that the returned value might be undefined. We know
    // the value is going to be whatever the setting type is, since we just checked this
    // @ts-expect-error ts(2322)
    return this.settingsData[key];
  }

  async set<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes>> {
    try {
      this.settingsData[key] = newSetting;
      writeSettingsDataToFile(this.settingsData);
    } catch (error) {
      throw new Error(`Error setting value for key '${key}': ${error}`);
    }
    return true;
  }

  async reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean> {
    try {
      if (!this.settingsData[key]) {
        return false;
      }
      delete this.settingsData[key];
      writeSettingsDataToFile(this.settingsData);
      this.notifyUpdate('');
      return true;
    } catch (error) {
      throw new Error(`Error resetting key ${key}: ${error}`);
    }
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
            new SettingDataProviderEngine(await getSettingsDataFromFile()),
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
  implementSettingDataProviderEngine: (settingsData: Partial<AllSettingsData>) => {
    return new SettingDataProviderEngine(settingsData);
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
