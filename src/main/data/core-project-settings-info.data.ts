import {
  AllProjectSettingsValidators,
  ProjectSettingValidator,
} from '@shared/services/project-settings.service-model';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import { stringLength } from 'platform-bible-utils';

/** Information about one project setting */
type ProjectSettingInfo<ProjectSettingName extends ProjectSettingNames> = {
  default: ProjectSettingTypes[ProjectSettingName];
};

/**
 * Information about all project settings. Keys are project setting keys, values are information for
 * that project setting
 */
export type AllProjectSettingsInfo = {
  [ProjectSettingName in ProjectSettingNames]: ProjectSettingInfo<ProjectSettingName>;
};

/** Info about all project settings built into core. Does not contain info for extensions' settings */
export const coreProjectSettingsInfo: Partial<AllProjectSettingsInfo> = {
  'platform.fullName': { default: '%project_full_name_missing%' },
  'platform.language': { default: '%project_language_missing%' },
  'platformScripture.booksPresent': {
    default:
      //                                                                                                  1
      //        1         2         3         4         5         6         7         8         9         0         1         2         3
      // 34567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
      '000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
  'platformScripture.versification': { default: 4 },
};

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L401
// Should be 123 characters long
// todo Check that it only includes 1 or 0
export const booksPresentSettingsValidator: ProjectSettingValidator<
  'platformScripture.booksPresent'
> = async (newValue: string): Promise<boolean> => {
  return stringLength(newValue) === 123;
};

// Based on https://github.com/paranext/paranext-core/blob/5c403e272b002ddd8970f735bc119f335c78c509/extensions/src/usfm-data-provider/index.d.ts#L391
// There are 7 options in the enum
export const versificationSettingsValidator: ProjectSettingValidator<
  'platformScripture.versification'
> = async (newValue: number): Promise<boolean> => {
  return newValue >= 0 && newValue <= 6;
};

/** Info about all settings built into core. Does not contain info for extensions' settings */
export const coreProjectSettingsValidators: Partial<AllProjectSettingsValidators> = {
  'platformScripture.booksPresent': booksPresentSettingsValidator,
  'platformScripture.versification': versificationSettingsValidator,
};

export default coreProjectSettingsInfo;
