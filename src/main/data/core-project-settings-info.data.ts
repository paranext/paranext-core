import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';

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
const coreProjectSettingsInfo: Partial<AllProjectSettingsInfo> = {
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

export default coreProjectSettingsInfo;
