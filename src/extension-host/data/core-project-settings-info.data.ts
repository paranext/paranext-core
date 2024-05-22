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
    'platform.isEditable': {
      label: '%project_settings_platform_isEditable_label%',
      description: '%project_settings_platform_isEditable_description%',
      default: true,
    },
  },
};

const fullNameValidator: ProjectSettingValidator<'platform.fullName'> = async (newValue) => {
  return typeof newValue === 'string' && newValue.length > 0;
};

// TODO: Validate that strings in the array to match BCP 47 values once the i18n code is ready
const languageValidator: ProjectSettingValidator<'platform.language'> = async (
  newValue: string,
): Promise<boolean> => {
  return typeof newValue === 'string';
};

const isEditableValidator: ProjectSettingValidator<'platform.isEditable'> = async (
  newValue: boolean,
) => typeof newValue === 'boolean';

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreProjectSettingsValidators: Partial<AllProjectSettingsValidators> = {
  'platform.fullName': fullNameValidator,
  'platform.language': languageValidator,
  'platform.isEditable': isEditableValidator,
};
