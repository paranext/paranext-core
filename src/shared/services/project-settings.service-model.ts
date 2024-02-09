import { ProjectSettingNames, ProjectSettingTypes, ProjectTypes } from 'papi-shared-types';

/**
 * JSDOC SOURCE projectSettingsService
 *
 * Provides utility functions that project storage interpreters should call when handling project
 * settings
 */
export interface IProjectSettingsService {
  /**
   * Calls registered project settings validators to determine whether or not a project setting
   * change is valid.
   *
   * Every Project Storage Interpreter **must** run this function when it receives a request to set
   * a project setting before changing the value of the setting.
   *
   * @param newValue The new value requested to set the project setting value to
   * @param currentValue The current project setting value
   * @param key The project setting key being set
   * @param allChanges All project settings changes being set in one batch
   * @param projectType The `projectType` for the project whose setting is being changed
   * @returns `true` if change is valid, `false` otherwise
   */
  isValid<ProjectSettingName extends ProjectSettingNames>(
    newValue: ProjectSettingTypes[ProjectSettingName],
    currentValue: ProjectSettingTypes[ProjectSettingName],
    key: ProjectSettingName,
    allChanges: SimultaneousProjectSettingsChanges,
    projectType: ProjectTypes,
  ): Promise<boolean>;
  /**
   * Gets default value for a project setting
   *
   * Every Project Storage Interpreter **must** run this function when it receives a request to get
   * a project setting if the project does not have a value for the project setting requested. It
   * should return the response from this function directly, either the returned default value or
   * throw.
   *
   * @param key The project setting key for which to get the default value
   * @param projectType The `projectType` to get default setting value for
   * @returns The default value for the setting if a default value is registered
   * @throws If a default value is not registered for the setting
   */
  getDefault<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
    projectType: ProjectTypes,
  ): Promise<ProjectSettingTypes[ProjectSettingName]>;
}

/**
 * All project settings changes being set in one batch
 *
 * Project settings may be circularly dependent on one another, so multiple project settings may
 * need to be changed at once in some cases
 */
export type SimultaneousProjectSettingsChanges = {
  [ProjectSettingName in ProjectSettingNames]?: {
    /** The new value requested to set the project setting value to */
    newValue: ProjectSettingTypes[ProjectSettingName];
    /** The current project setting value */
    currentValue: ProjectSettingTypes[ProjectSettingName];
  };
};

export const projectSettingsServiceNetworkObjectName = 'ProjectSettingsService';
