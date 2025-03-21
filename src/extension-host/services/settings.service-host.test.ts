import { vi } from 'vitest';
import { testingSettingService } from '@extension-host/services/settings.service-host';
import { LocalizationSelectors } from '@shared/services/localization.service-model';
import { SettingNames } from 'papi-shared-types';
import { slice } from 'platform-bible-utils';

const MOCK_SETTINGS_DATA = {
  'platform.interfaceLanguage': ['fre'],
  'settingsTest.valueIsUndefined': undefined,
};

const VERSE_REF_DEFAULT = { default: { bookNum: 1, chapterNum: 1, verseNum: 1 } };
const NEW_INTERFACE_LANGUAGE = ['spa'];

let settingsProviderEngine: ReturnType<
  typeof testingSettingService.implementSettingDataProviderEngine
>;

beforeEach(() => {
  settingsProviderEngine =
    testingSettingService.implementSettingDataProviderEngine(MOCK_SETTINGS_DATA);
});

vi.mock('@node/services/node-file-system.service', () => ({
  readFileText: () => {
    return JSON.stringify(VERSE_REF_DEFAULT);
  },
  writeFile: () => {
    return Promise.resolve();
  },
}));
vi.mock('@extension-host/data/core-settings-info.data', async () => ({
  ...(await vi.importActual('@extension-host/data/core-settings-info.data')),
  __esModule: true,
  platformSettings: {
    label: '%platform_group1%',
    description: '%platform_group1_description%',
    properties: {
      'platform.name': {
        label: '%settings_platform_name_label%',
        default: '%missing%',
      },
      'platform.verseRef': {
        label: '%settings_platform_verseRef_label%',
        default: { bookNum: 1, chapterNum: 1, verseNum: 1 },
      },
      'platform.interfaceLanguage': {
        label: '%settings_platform_interfaceLanguage_label%',
        default: ['eng'],
      },
    },
  },
  coreSettingsValidators: {
    'platform.verseRef': async (): Promise<boolean> => {
      // Reject all attempts to set the verse ref
      return false;
    },
    'platform.interfaceLanguage': async (): Promise<boolean> => {
      // Accept all attempts to set the interface language
      return true;
    },
  },
}));
vi.mock('@shared/services/localization.service', () => ({
  __esModule: true,
  localizationService: {
    async getLocalizedStrings({ localizeKeys: keys }: LocalizationSelectors): Promise<{
      [localizeKey: string]: string;
    }> {
      return Object.fromEntries(keys.map((key) => [key, slice(key, 1, -1)]));
    },
  },
}));
vi.mock('@extension-host/services/contribution.service', async () => ({
  ...(await vi.importActual('@extension-host/services/contribution.service')),
  // Don't actually wait because we're not syncing any contributions in these tests
  waitForResyncContributions: async () => {},
}));

test('Get verseRef returns default value', async () => {
  const result = await settingsProviderEngine.get('platform.verseRef');
  expect(result).toEqual(VERSE_REF_DEFAULT.default);
});

test('Get interfaceLanguage returns stored value', async () => {
  const result = await settingsProviderEngine.get('platform.interfaceLanguage');
  expect(result).toEqual(MOCK_SETTINGS_DATA['platform.interfaceLanguage']);
});

test('Get default localizeKey returns localized string', async () => {
  // This is a fake setting
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const result = await settingsProviderEngine.get('platform.name' as SettingNames);
  expect(result).toEqual('missing');
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

test('Set interfaceLanguage returns true', async () => {
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

test('Set verseRef throws', async () => {
  const result = settingsProviderEngine.set('platform.verseRef', {
    bookNum: 2,
    chapterNum: 1,
    verseNum: 1,
  });
  await expect(result).rejects.toThrow(
    "Error setting value for key 'platform.verseRef': Error: validation failed",
  );
});
