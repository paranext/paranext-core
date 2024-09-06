import { Localized, ProjectSettingsContribution, slice } from 'platform-bible-utils';
import { PLATFORM_NAMESPACE } from '@shared/data/platform.data';
import ProjectSettingsDocumentCombiner, {
  LocalizedProjectSettingsContributionInfo,
  ProjectSettingsContributionInfo,
} from '@shared/utils/project-settings-document-combiner';
import { LocalizationSelectors } from '@shared/services/localization.service-model';

jest.mock('@shared/services/localization.service', () => ({
  __esModule: true,
  default: {
    async getLocalizedStrings({ localizeKeys: keys }: LocalizationSelectors): Promise<{
      [localizeKey: string]: string;
    }> {
      return Object.fromEntries(keys.map((key) => [key, slice(key, 1, -1)]));
    },
  },
}));

/** Info about all settings built into core. Does not contain info for extensions' settings */
const platformSettings: ProjectSettingsContribution = {
  label: '%project_settings_platform_settingName_group1%',
  description: '%project_settings_platform_group1_description%',
  properties: {
    'platform.fullName': {
      label: '%project_settings_platform_settingName_fullName%',
      default: '%project_settings_platform_defaultFullName_nameMissing%',
    },
    'platform.language': {
      label: '%project_settings_platform_settingName_language%',
      default: '%project_settings_platform_defaultLanguage_languageMissing%',
    },
  },
};
const platformSettingsLocalized: Localized<ProjectSettingsContribution> = {
  label: 'project_settings_platform_group1_label',
  description: 'project_settings_platform_group1_description',
  properties: {
    'platform.fullName': {
      label: 'project_settings_platform_fullName_label',
      default: 'project_full_name_missing',
    },
    'platform.language': {
      label: 'project_settings_platform_language_label',
      default: 'project_language_missing',
    },
  },
};

const test1ExtensionName = 'test1';
const test1ExtensionContribution: ProjectSettingsContribution = {
  label: '%test1_group1%',
  description: '%test1_group1_description%',
  properties: {
    'test1.setting1': {
      label: '%test1.setting1_label%',
      description: '%test1.setting1_description%',
      default: 'hi',
      includeProjectInterfaces: '^thing$',
    },
    'test1.setting2': {
      label: '%test1.setting2_label%',
      description: '%test1.setting2_description%',
      default: 5,
      excludeProjectInterfaces: ['^stuff', 'b[oO]rk$'],
    },
  },
};
const test1ExtensionContributionLocalized: Localized<ProjectSettingsContribution> = {
  label: 'test1_group1',
  description: 'test1_group1_description',
  properties: {
    'test1.setting1': {
      label: 'test1.setting1_label',
      description: 'test1.setting1_description',
      default: 'hi',
      includeProjectInterfaces: '^thing$',
    },
    'test1.setting2': {
      label: 'test1.setting2_label',
      description: 'test1.setting2_description',
      default: 5,
      excludeProjectInterfaces: ['^stuff', 'b[oO]rk$'],
    },
  },
};

const test2ExtensionName = 'test2';
const test2ExtensionContribution: ProjectSettingsContribution = [
  {
    label: '%test2_group1%',
    description: '%test2_group1_description%',
    properties: {
      'test2.setting1': {
        label: '%test2.setting1_label%',
        default: 'hi',
      },
      'test2.setting2': {
        label: '%test2.setting2_label%',
        description: '%test2.setting2_description%',
        default: 5,
      },
    },
  },
  {
    label: '%test2_group2%',
    properties: {
      'test2.setting3': {
        label: '%test2.setting3_label%',
        description: '%test2.setting3_description%',
        default: 'hi',
      },
    },
  },
];
const test2ExtensionContributionLocalized: Localized<ProjectSettingsContribution> = [
  {
    label: 'test2_group1',
    description: 'test2_group1_description',
    properties: {
      'test2.setting1': {
        label: 'test2.setting1_label',
        default: 'hi',
      },
      'test2.setting2': {
        label: 'test2.setting2_label',
        description: 'test2.setting2_description',
        default: 5,
      },
    },
  },
  {
    label: 'test2_group2',
    properties: {
      'test2.setting3': {
        label: 'test2.setting3_label',
        description: 'test2.setting3_description',
        default: 'hi',
      },
    },
  },
];

const expectedOutput: ProjectSettingsContributionInfo = {
  contributions: {
    [PLATFORM_NAMESPACE]: [platformSettings],
    [test1ExtensionName]: [test1ExtensionContribution],
    [test2ExtensionName]: test2ExtensionContribution,
  },
  settings: {
    ...platformSettings.properties,
    ...test1ExtensionContribution.properties,
    ...Object.fromEntries(
      test2ExtensionContribution.flatMap((settingsGroup) =>
        Object.entries(settingsGroup.properties),
      ),
    ),
  },
};
const expectedOutputLocalized: LocalizedProjectSettingsContributionInfo = {
  contributions: {
    [PLATFORM_NAMESPACE]: [platformSettingsLocalized],
    [test1ExtensionName]: [test1ExtensionContributionLocalized],
    [test2ExtensionName]: test2ExtensionContributionLocalized,
  },
  settings: {
    ...platformSettingsLocalized.properties,
    ...test1ExtensionContributionLocalized.properties,
    ...Object.fromEntries(
      test2ExtensionContributionLocalized.flatMap((settingsGroup) =>
        Object.entries(settingsGroup.properties),
      ),
    ),
  },
};

test('Sample documents all validate', async () => {
  const settingsCombiner = new ProjectSettingsDocumentCombiner(platformSettings);
  settingsCombiner.addOrUpdateContribution(test1ExtensionName, test1ExtensionContribution);
  settingsCombiner.addOrUpdateContribution(test2ExtensionName, test2ExtensionContribution);
  expect(settingsCombiner.getProjectSettingsContributionInfo()).toEqual(expectedOutput);
  expect(await settingsCombiner.getLocalizedProjectSettingsContributionInfo()).toEqual(
    expectedOutputLocalized,
  );
});

test('JSON schema validation works', () => {
  const settingsCombiner = new ProjectSettingsDocumentCombiner(platformSettings);
  expect(() =>
    settingsCombiner.addOrUpdateContribution('shouldFail-BadKey', {
      label: '%invalid_key',
      properties: {},
    }),
  ).toThrow(/data\/label must match pattern/);

  expect(() =>
    settingsCombiner.addOrUpdateContribution('shouldFail-BadValue', [
      { label: '%stuff%', properties: {} },
      3,
    ]),
  ).toThrow(/data\/1 must be object/);
});

test('Duplicate settings are not allowed', () => {
  const settingsCombiner = new ProjectSettingsDocumentCombiner(platformSettings);
  expect(() =>
    settingsCombiner.addOrUpdateContribution('shouldFail-DuplicateSettings', [
      {
        label: '%thing%',
        properties: {
          'shouldFail-DuplicateSettings.thing': {
            label: '%thing%',
            default: 1,
          },
        },
      },
      {
        label: '%thing%',
        properties: {
          'shouldFail-DuplicateSettings.thing': {
            label: '%thing%',
            default: 1,
          },
        },
      },
    ]),
  ).toThrow(
    'Project Settings contribution from shouldFail-DuplicateSettings provided Project Setting shouldFail-DuplicateSettings.thing more than once!',
  );
});

test('Setting namespace must match contribution name', () => {
  const settingsCombiner = new ProjectSettingsDocumentCombiner(platformSettings);
  expect(() =>
    settingsCombiner.addOrUpdateContribution('shouldFail-WrongNamespace', {
      label: '%thing%',
      properties: {
        'shouldFail-ThisIsTheWrongNamespace.thing': {
          label: '%thing%',
          default: 1,
        },
      },
    }),
  ).toThrow(
    "Project Settings contribution from shouldFail-WrongNamespace provided Project Setting shouldFail-ThisIsTheWrongNamespace.thing which does not start with 'shouldFail-WrongNamespace.'",
  );
});
