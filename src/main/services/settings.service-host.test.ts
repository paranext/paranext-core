import { testingSettingService } from '@main/services/settings.service-host';
import { AllSettingsData } from '@shared/services/settings.service-model';
import { SettingTypes } from 'papi-shared-types';

const PARTIAL_SETTINGS_DATA: Partial<AllSettingsData> = {
  'platform.interfaceLanguage': 'eng',
};

const VERSE_REF_DEFAULT = { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } };
// const NEW_VERSE_REF = { bookNum: 2, chapterNum: 2, verseNum: 2 };
const INTERFACE_LANGUAGE_DEFAULT = { default: 'eng' };

const settingsProviderEngine =
  testingSettingService.implementSettingDataProviderEngine(PARTIAL_SETTINGS_DATA);

jest.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(VERSE_REF_DEFAULT);
  },
}));

// TODO: Update tests when edge cases are defined in functions

test('Get verseRef returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.verseRef');
  expect(result).toEqual(VERSE_REF_DEFAULT.default);
});

test('Get verseRef returns stored value', async () => {
  const result = await settingsProviderEngine.get('platform.interfaceLanguage');
  expect(result).toEqual(INTERFACE_LANGUAGE_DEFAULT.default);
});

test('Key does not exist (on both settings file and list of known keys)', async () => {
  const result = await settingsProviderEngine.get('thisKeyDoesNotExist');
  await expect(result).rejects.toThrow('No setting exists for key thisKeyDoesNotExist');
});

// default for key does exist

// undefined is returned as value

// test('Set verseRef returns true', async () => {
//   const result = await settingsProviderEngine.set('platform.verseRef', NEW_VERSE_REF);
//   expect(result).toBe(true);
// });

// test('Reset verseRef returns true', async () => {
//   const result = await settingsProviderEngine.reset('platform.verseRef');
//   expect(result).toBe(true);
// });
