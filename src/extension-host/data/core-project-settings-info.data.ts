import {
  AllProjectSettingsValidators,
  ProjectSettingValidator,
} from '@shared/services/project-settings.service-model';
import { ProjectSettingsContribution } from 'platform-bible-utils';

/** Info about all project settings built into core. Does not contain info for extensions' settings */
export const platformProjectSettings: ProjectSettingsContribution = {
  label: '%project_settings_platform_group1_label%',
  description: '%project_settings_platform_group1_description%',
  properties: {
    'platform.fullName': {
      label: '%project_settings_platform_fullName_label%',
      default: '%project_full_name_missing%',
    },
    'platform.language': {
      label: '%project_settings_platform_language_label%',
      default: '%project_language_missing%',
    },
    'platformScripture.booksPresent': {
      label: '%project_settings_platform_booksPresent_label%',
      description: '%project_settings_platform_booksPresent_description%',
      default:
        //                                                                                                  1
        //        1         2         3         4         5         6         7         8         9         0         1         2         3
        // 34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
        '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    },
    'platformScripture.versification': {
      label: '%project_settings_platformScripture_versification_label%',
      description: '%project_settings_platformScripture_versification_description%',
      default: 4,
    },
  },
};

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L401
// Should be 123 characters long
const booksPresentSettingsValidator: ProjectSettingValidator<
  'platformScripture.booksPresent'
> = async (newValue: string): Promise<boolean> => {
  return newValue.length === 123 && newValue.replace(/[01]/g, '').length === 0;
};

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L391
// There are 7 options in the enum
const versificationSettingsValidator: ProjectSettingValidator<
  'platformScripture.versification'
> = async (newValue: number): Promise<boolean> => {
  return typeof newValue === 'number' && newValue >= 0 && newValue <= 6;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreProjectSettingsValidators: Partial<AllProjectSettingsValidators> = {
  'platformScripture.booksPresent': booksPresentSettingsValidator,
  'platformScripture.versification': versificationSettingsValidator,
};
