import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import dataProviderService, { DataProviderEngine } from '@shared/services/data-provider.service';
import {
  ISettingsService,
  SettingDataTypes,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from '@shared/services/settings.service-model';
import coreSettingsInfo, { AllSettingsInfo } from '@main/data/core-settings-info.data';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import { createSyncProxyForAsyncObject, deserialize, serialize } from 'platform-bible-utils';

// TODO: 4 Fix implementation of all functions
// TODO: Where do settings live (JSON obj/file)? How is dp going to access it?
class SettingDataProviderEngine
  extends DataProviderEngine<SettingDataTypes>
  implements IDataProviderEngine<SettingDataTypes>
{
  private settingsInfo;
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(settingsInfo: Partial<AllSettingsInfo>) {
    super();
    this.settingsInfo = settingsInfo;
  }

  // eslint-disable-next-line class-methods-use-this
  async get<SettingName extends SettingNames>(
    key: SettingName,
  ): Promise<SettingTypes[SettingName]> {
    const settingString = localStorage.getItem(key);
    // Null is used by the external API
    // eslint-disable-next-line no-null/no-null
    if (settingString !== null) {
      return deserialize(settingString);
    }
    const settingInfo = this.settingsInfo[key];
    if (!settingInfo) throw new Error('no setting');
    return settingInfo.default;
  }

  // eslint-disable-next-line class-methods-use-this
  async set<SettingName extends SettingNames>(
    key: SettingName,
    newSetting: SettingTypes[SettingName],
  ): Promise<DataProviderUpdateInstructions<SettingDataTypes>> {
    localStorage.setItem(key, serialize(newSetting));
    this.notifyUpdate('*');
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  async reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean> {
    localStorage.removeItem(key);
    this.notifyUpdate('*');
    return true;
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
            new SettingDataProviderEngine(coreSettingsInfo), // will be fixed when dp types are correct
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
    return new SettingDataProviderEngine(coreSettingsInfo);
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
