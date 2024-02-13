import { testingSettingService } from '@main/services/settings.service-host';

const MOCK_SETTINGS_DATA = {
  'platform.interfaceLanguage': ['fre'],
  'settingsTest.valueIsUndefined': undefined,
};

const VERSE_REF_DEFAULT = { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } };
const NEW_INTERFACE_LANGUAGE = ['spa'];

const settingsProviderEngine =
  testingSettingService.implementSettingDataProviderEngine(MOCK_SETTINGS_DATA);

jest.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(VERSE_REF_DEFAULT);
  },
  writeFile: () => {
    return Promise.resolve();
  },
}));
jest.mock('@main/data/core-settings-info.data', () => ({
  ...jest.requireActual('@main/data/core-settings-info.data'),
  __esModule: true,
  default: {
    'platform.verseRef': { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } },
    'platform.interfaceLanguage': { default: ['eng'] },
    'settingsTest.noDefaultExists': {},
  },
}));

test('Get verseRef returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.verseRef');
  expect(result).toEqual(VERSE_REF_DEFAULT.default);
});

test('Get interfaceLanguage returns stored value', async () => {
  const result = await settingsProviderEngine.get('platform.interfaceLanguage');
  expect(result).toEqual(MOCK_SETTINGS_DATA['platform.interfaceLanguage']);
});

test('No setting exists for key', async () => {
  // settingsTest.noSettingExists does not exist on SettingNames
  // @ts-expect-error ts(2345)
  await expect(settingsProviderEngine.get('settingsTest.noSettingExists')).rejects.toThrow(
    'No setting exists for key settingsTest.noSettingExists',
  );
});

test('Undefined returned as setting value', async () => {
  // settingsTest.valueIsUndefined does not exist on SettingNames
  // @ts-expect-error ts(2345)
  const result = await settingsProviderEngine.get('settingsTest.valueIsUndefined');
  expect(result).toEqual(undefined);
});

test('No default specified for key', async () => {
  // settingsTest.noDefaultExists does not exist on SettingNames
  // @ts-expect-error ts(2345)
  await expect(settingsProviderEngine.get('settingsTest.noDefaultExists')).rejects.toThrow(
    'No default value specified for key settingsTest.noDefaultExists',
  );
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
