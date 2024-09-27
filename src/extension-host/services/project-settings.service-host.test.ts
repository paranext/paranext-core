import { testingProjectSettingsService } from '@extension-host/services/project-settings.service-host';
import { LocalizationSelectors } from '@shared/services/localization.service-model';
import { ProjectSettingValidator } from '@shared/services/project-settings.service-model';

jest.mock('@shared/services/network.service', () => ({
  ...jest.requireActual('@shared/services/network.service'),
  registerRequestHandler: () => {
    return {};
  },
}));
jest.mock('@extension-host/data/core-project-settings-info.data', () => ({
  ...jest.requireActual('@extension-host/data/core-project-settings-info.data'),
  __esModule: true,
  platformProjectSettings: {
    label: '%project_settings_platform_group1_label%',
    description: '%project_settings_platform_group1_description%',
    properties: {
      'platform.fullName': {
        label: '%project_settings_platform_fullName_label%',
        default: '%test_project_full_name_missing%',
      },
      'platform.language': {
        label: '%project_settings_platform_language_label%',
        default: '%test_project_language_missing%',
      },
    },
  },
  coreProjectSettingsValidators: {
    'platform.language': async (newValue: string): Promise<boolean> => {
      return newValue === 'eng' || newValue === 'fre';
    },
  },
}));
jest.mock('@shared/services/localization.service', () => {
  // eslint-disable-next-line global-require
  const { slice } = require('platform-bible-utils');
  return {
    __esModule: true,
    default: {
      async getLocalizedStrings({ localizeKeys: keys }: LocalizationSelectors): Promise<{
        [localizeKey: string]: string;
      }> {
        return Object.fromEntries(keys.map((key) => [key, slice(key, 1, -1)]));
      },
    },
  };
});

describe('isValid', () => {
  it('should return true', async () => {
    const projectSettingKey = 'platform.language';
    const isSettingChangeValid = await testingProjectSettingsService.isValid(
      projectSettingKey,
      'eng',
      '%test_project_language_missing%',
    );
    expect(isSettingChangeValid).toBe(true);
  });
  it('should return false', async () => {
    const projectSettingKey = 'platform.language';
    const isSettingChangeValid = await testingProjectSettingsService.isValid(
      projectSettingKey,
      'ger',
      '%test_project_language_missing%',
    );
    expect(isSettingChangeValid).toBe(false);
  });
});

describe('getDefault', () => {
  it('should get default value', async () => {
    const projectSettingKey = 'platform.fullName';
    const defaultValue = await testingProjectSettingsService.getDefault(projectSettingKey);
    expect(defaultValue).toBe('test_project_full_name_missing');
  });

  it('should throw if a default is not present', async () => {
    const projectSettingKey = 'platform.settingDoesNotExist';
    await expect(
      // This key does not exist. We are testing what happens
      // @ts-expect-error
      testingProjectSettingsService.getDefault(projectSettingKey),
    ).rejects.toThrow(new RegExp(`Could not find project setting ${projectSettingKey}`));
  });
});

describe('registerValidator', () => {
  it('should resolve', async () => {
    const projectSettingKey = 'platform.fullName';
    const fullNameSettingsValidator: ProjectSettingValidator<
      'platform.fullName'
    > = async (): Promise<boolean> => {
      return true;
    };
    await expect(
      testingProjectSettingsService.registerValidator(projectSettingKey, fullNameSettingsValidator),
    ).resolves.toStrictEqual({});
  });
});
