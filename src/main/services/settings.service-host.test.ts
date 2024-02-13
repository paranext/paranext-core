import { testingSettingService } from '@main/services/settings.service-host';
import { AllSettingsData } from '@shared/services/settings.service-model';

// TODO: Talk about this with TJ
// Avoids error `Argument of type '"platform.noSettingExists"' is not assignable to parameter of type 'keyof SettingTypes'.`
// It is added to SettingTypes, therefore picked up into SettingNames, but only actualized in our test code.
// By putting an item in this interface and not in PARTIAL_SETTINGS_DATA, we can declare a SettingName for a setting that doesn't exist.
declare module 'papi-shared-types' {
  interface SettingTypes {
    'testingOnly.noSettingExists': 'testType';
    'testingOnly.valueIsUndefined': undefined;
  }
}

const PARTIAL_SETTINGS_DATA: Partial<AllSettingsData> = {
  'platform.interfaceLanguage': 'fre',
  'testingOnly.valueIsUndefined': undefined,
};

const VERSE_REF_DEFAULT = { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } };
const NEW_INTERFACE_LANGUAGE = 'spa';

const settingsProviderEngine =
  testingSettingService.implementSettingDataProviderEngine(PARTIAL_SETTINGS_DATA);

jest.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(VERSE_REF_DEFAULT);
  },
  writeFile: () => {
    return Promise.resolve();
  },
}));

test('Get verseRef returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.verseRef');
  expect(result).toEqual(VERSE_REF_DEFAULT.default);
});

test('Get interfaceLanguage returns stored value', async () => {
  const result = await settingsProviderEngine.get('platform.interfaceLanguage');
  expect(result).toEqual(PARTIAL_SETTINGS_DATA['platform.interfaceLanguage']);
});

test('No setting exists for key', async () => {
  await expect(settingsProviderEngine.get('testingOnly.noSettingExists')).rejects.toThrow(
    'No setting exists for key platform.noSettingExists',
  );
});

test('Undefined returned as setting value', async () => {
  const result = await settingsProviderEngine.get('testingOnly.valueIsUndefined');
  expect(result).toEqual(undefined);
});

// Test `No default value specified for key ${key}` line 89

test('Key does not exist (on both settings file and list of known keys)', async () => {
  // @ts-expect-error ts(2345)
  const result = settingsProviderEngine.get('thisKeyDoesNotExist');
  await expect(result).rejects.toThrow('No setting exists for key thisKeyDoesNotExist');
});

test('Set verseRef returns true', async () => {
  const result = await settingsProviderEngine.set(
    'platform.interfaceLanguage',
    NEW_INTERFACE_LANGUAGE,
  );
  expect(result).toBe(true);
});

test('Reset interfaceLanguage returns true', async () => {
  const result = await settingsProviderEngine.reset('platform.interfaceLanguage');
  expect(result).toBe(true);
});

test('Reset verseRef returns false', async () => {
  const result = await settingsProviderEngine.reset('platform.verseRef');
  expect(result).toBe(false);
});
