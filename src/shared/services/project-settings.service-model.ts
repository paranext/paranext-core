import { serializeRequestType } from '@shared/utils/util';
import * as networkService from '@shared/services/network.service';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import { UnsubscriberAsync } from 'platform-bible-utils';

/** Name prefix for registered commands that call project settings validators */
export const CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR = 'extensionProjectSettingValidator';

export const projectSettingsServiceNetworkObjectName = 'ProjectSettingsService';
export const projectSettingsServiceObjectToProxy = Object.freeze({
  /** JSDOC DESTINATION projectSettingsServiceRegisterValidator */
  registerValidator: async <ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
    validator: ProjectSettingValidator<ProjectSettingName>,
  ): Promise<UnsubscriberAsync> => {
    return networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR, key),
      validator,
    );
  },
});

/**
 * JSDOC SOURCE projectSettingsService
 *
 * Provides utility functions that project data providers should call when handling project settings
 */
export interface IProjectSettingsService {
  /**
   * Calls registered project settings validators to determine whether or not a project setting
   * change is valid.
   *
   * Every Project Data Provider **must** run this function when it receives a request to set a
   * project setting before changing the value of the setting.
   *
   * @param newValue The new value requested to set the project setting value to
   * @param currentValue The current project setting value
   * @param key The project setting key being set
   * @param projectInterfaces The `projectInterface`s supported by the calling PDP for the project
   *   whose setting is being changed
   * @param allChanges All project settings changes being set in one batch
   * @returns `true` if change is valid, `false` otherwise
   */
  isValid<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
    newValue: ProjectSettingTypes[ProjectSettingName],
    currentValue: ProjectSettingTypes[ProjectSettingName],
    allChanges?: SimultaneousProjectSettingsChanges,
  ): Promise<boolean>;
  /**
   * Gets default value for a project setting
   *
   * Every Project Data Providers **must** run this function when it receives a request to get a
   * project setting if the project does not have a value for the project setting requested. It
   * should return the response from this function directly, either the returned default value or
   * throw.
   *
   * @param key The project setting key for which to get the default value
   * @param projectInterfaces The `projectInterface`s supported by the calling PDP for the project
   *   for which to get the default setting value
   * @returns The default value for the setting if a default value is registered
   * @throws If a default value is not registered for the setting
   */
  getDefault<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
  ): Promise<ProjectSettingTypes[ProjectSettingName]>;
  /**
   * JSDOC SOURCE projectSettingsServiceRegisterValidator
   *
   * Registers a function that validates whether a new project setting value is allowed to be set.
   *
   * @param key The string id of the setting to validate
   * @param validator Function to call to validate the new setting value
   * @returns Unsubscriber that should be called whenever the providing extension is deactivated
   */
  registerValidator<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
    validatorCallback: ProjectSettingValidator<ProjectSettingName>,
  ): Promise<UnsubscriberAsync>;
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
/**
 * Function that validates whether a new project setting value should be allowed to be set
 *
 * @param newValue The new value requested to set the project setting value to
 * @param currentValue The current project setting value
 * @param allChanges All project settings changes being set in one batch
 * @param projectInterfaces The `projectInterface`s supported by the calling PDP for the project
 *   whose setting is being changed
 */
export type ProjectSettingValidator<ProjectSettingName extends ProjectSettingNames> = (
  newValue: ProjectSettingTypes[ProjectSettingName],
  currentValue: ProjectSettingTypes[ProjectSettingName],
  allChanges: SimultaneousProjectSettingsChanges,
) => Promise<boolean>;

/**
 * Validators for all project settings. Keys are setting keys, values are functions to validate new
 * settings
 */
export type AllProjectSettingsValidators = {
  [ProjectSettingName in ProjectSettingNames]: ProjectSettingValidator<ProjectSettingName>;
};
