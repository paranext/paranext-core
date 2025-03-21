import * as networkService from '@shared/services/network.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import {
  DataProviderDataType,
  DataProviderUpdateInstructions,
} from '@shared/models/data-provider.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import {
  AllSettingsData,
  CATEGORY_EXTENSION_SETTING_VALIDATOR,
  ISettingsService,
  SettingDataTypes,
  settingsServiceDataProviderName,
  settingsServiceObjectToProxy,
} from '@shared/services/settings.service-model';
import { coreSettingsValidators } from '@extension-host/data/core-settings-info.data';
import { SettingNames, SettingTypes } from 'papi-shared-types';
import {
  Unsubscriber,
  createSyncProxyForAsyncObject,
  debounce,
  deserialize,
  includes,
  isLocalizeKey,
  isString,
  serialize,
} from 'platform-bible-utils';
import { joinUriPaths } from '@node/utils/util';
import * as nodeFS from '@node/services/node-file-system.service';
import { serializeRequestType } from '@shared/utils/util';
import { LocalizedSettingsContributionInfo } from '@shared/utils/settings-document-combiner-base';
import {
  settingsDocumentCombiner,
  waitForResyncContributions,
} from '@extension-host/services/contribution.service';

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

async function getDefaultValueForKey<SettingName extends SettingNames>(
  key: SettingName,
): Promise<SettingTypes[SettingName]> {
  await waitForResyncContributions();
  const settingInfo = settingsDocumentCombiner.getSettingsContributionInfo()?.settings[key];
  if (!settingInfo) {
    throw new Error(`No setting exists for key ${key}`);
  }

  // We shouldn't be able to hit this anymore since the settings document combiner should throw if
  // this ever happened. But this is still here just in case because this would be a serious error
  if (!('default' in settingInfo)) {
    throw new Error(`No default value specified for key ${key}`);
  }

  // If this key is the interface language, return it since we need to use that in the localization
  // service. Or if default is not a localized string key, return it. Otherwise we need to get the
  // localized version instead
  if (
    key === 'platform.interfaceLanguage' ||
    !isString(settingInfo.default) ||
    !isLocalizeKey(settingInfo.default)
  )
    return settingInfo.default;

  const localizedSettingInfo = (
    await settingsDocumentCombiner.getLocalizedSettingsContributionInfo()
  )?.settings[key];

  if (!localizedSettingInfo) {
    throw new Error(`Could not find localized setting ${key}.`);
  }

  // We shouldn't be able to hit this anymore since the settings document combiner should
  // throw if this ever happened. But this is still here just in case because this would be a
  // serious error
  if (!('default' in localizedSettingInfo)) {
    throw new Error(`Could not find localized default value for setting ${key}.`);
  }

  // This type is correct. Looks like `ReplaceType` breaks mapped types and just unions the types
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return localizedSettingInfo.default as SettingTypes[SettingName];
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
  private unsubscribeOnDidRebuildSettings: Unsubscriber | undefined;

  constructor(settingsData: Partial<AllSettingsData>) {
    super();
    this.settingsData = deserialize(serialize(settingsData));

    this.unsubscribeOnDidRebuildSettings = settingsDocumentCombiner.onDidRebuild(
      debounce(() => {
        // Make sure we haven't been disposed since being called and the debounce ended, then
        // announce that settings have updated so anyone who has the default value gets an updated
        // default
        if (this.unsubscribeOnDidRebuildSettings) this.notifyUpdate('');
      }, 100),
    );
  }

  /* eslint-disable @typescript-eslint/class-methods-use-this */
  @dataProviderService.decorators.ignore
  async getLocalizedSettingsContributionInfo(): Promise<
    /* eslint-enable */
    LocalizedSettingsContributionInfo | undefined
  > {
    await waitForResyncContributions();
    return settingsDocumentCombiner.getLocalizedSettingsContributionInfo();
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
      if (!(await this.validateSetting(key, newSetting, await this.get(key))))
        throw new Error('validation failed');

      this.settingsData[key] = newSetting;
      await writeSettingsDataToFile(this.settingsData);
    } catch (error) {
      throw new Error(`Error setting value for key '${key}': ${error}`);
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async validateSetting<SettingName extends SettingNames>(
    key: SettingName,
    newValue: SettingTypes[SettingName],
    currentValue: SettingTypes[SettingName],
    allChanges?: Partial<SettingTypes>,
  ): Promise<boolean> {
    if (key in coreSettingsValidators) {
      const settingValidator = coreSettingsValidators[key];
      if (settingValidator) return settingValidator(newValue, currentValue, allChanges ?? {});
      // If there is no validator just let the change go through
      return true;
    }
    const requestType = serializeRequestType(CATEGORY_EXTENSION_SETTING_VALIDATOR, key);
    try {
      return await networkService.request(requestType, newValue, currentValue, allChanges ?? {});
    } catch (error) {
      // If there is no validator just let the change go through
      const missingValidatorMsg = `'${requestType}' not found`;
      if (includes(`${error}`, missingValidatorMsg)) return true;
      throw error;
    }
  }

  async reset<SettingName extends SettingNames>(key: SettingName): Promise<boolean> {
    try {
      if (!(key in this.settingsData)) {
        return false;
      }
      delete this.settingsData[key];
      await writeSettingsDataToFile(this.settingsData);
      this.notifyUpdate('');
      return true;
    } catch (error) {
      throw new Error(`Error resetting key ${key}: ${error}`);
    }
  }

  async dispose(): Promise<boolean> {
    if (this.unsubscribeOnDidRebuildSettings) {
      const success = this.unsubscribeOnDidRebuildSettings();
      this.unsubscribeOnDidRebuildSettings = undefined;
      return success;
    }
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

/** This is an internal-only export for testing purposes and should not be used in development */
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
