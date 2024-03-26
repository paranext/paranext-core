import * as networkService from '@shared/services/network.service';
import coreProjectSettingsInfo, {
  AllProjectSettingsInfo,
  coreProjectSettingsValidators,
} from '@main/data/core-project-settings-info.data';
import networkObjectService from '@shared/services/network-object.service';
import {
  CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR,
  IProjectSettingsService,
  ProjectSettingValidator,
  SimultaneousProjectSettingsChanges,
  projectSettingsServiceNetworkObjectName,
} from '@shared/services/project-settings.service-model';
import { serializeRequestType } from '@shared/utils/util';
import { ProjectSettingNames, ProjectSettingTypes, ProjectTypes } from 'papi-shared-types';
import { UnsubscriberAsync } from 'platform-bible-utils';

/**
 * Our internal list of project settings information for each setting. Theoretically this should not
 * be partial, but it quite possibly will not have each setting in it. It just depends on if
 * extensions actually provide the settings definitions
 */
let projectSettingsInfo: Partial<AllProjectSettingsInfo>;

let initializationPromise: Promise<void>;
/** Do the setup this service needs to function */
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          projectSettingsInfo = coreProjectSettingsInfo;
          // TODO: Read projectSettingsInfo in from extensions in https://github.com/paranext/paranext-core/issues/721
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

async function isValid<ProjectSettingName extends ProjectSettingNames>(
  key: ProjectSettingName,
  newValue: ProjectSettingTypes[ProjectSettingName],
  currentValue: ProjectSettingTypes[ProjectSettingName],
  projectType: ProjectTypes,
  allChanges?: SimultaneousProjectSettingsChanges,
): Promise<boolean> {
  try {
    if (key in coreProjectSettingsValidators) {
      const projectSettingValidator = coreProjectSettingsValidators[key];
      if (projectSettingValidator)
        return projectSettingValidator(newValue, currentValue, allChanges ?? {}, projectType);
    }
    // If there is no validator let the change go through
    return true;
  } catch (error) {
    throw new Error(`Error validating setting for key '${key}': ${error}`);
  }
}

async function getDefault<ProjectSettingName extends ProjectSettingNames>(
  key: ProjectSettingName,
  projectType: ProjectTypes,
): Promise<ProjectSettingTypes[ProjectSettingName]> {
  await initialize();
  const projectSettingInfo = projectSettingsInfo[key];

  if (!projectSettingInfo || !('default' in projectSettingInfo))
    throw new Error(
      `Could not find default value for project setting ${key}. projectType: ${projectType}`,
    );

  return projectSettingInfo.default;
}

async function registerValidator<ProjectSettingName extends ProjectSettingNames>(
  key: ProjectSettingName,
  validatorCallback: ProjectSettingValidator<ProjectSettingName>,
): Promise<UnsubscriberAsync> {
  return networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR, key),
    validatorCallback,
  );
}

const projectSettingsService: IProjectSettingsService = {
  isValid,
  getDefault,
  registerValidator,
};

/** This is an internal-only export for testing purposes, and should not be used in development */
export const testingProjectSettingsService = {
  ...projectSettingsService,
};

/** Register the network object that backs the PAPI localization service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `localization.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startProjectSettingsService(): Promise<void> {
  await initialize();
  await networkObjectService.set<IProjectSettingsService>(
    projectSettingsServiceNetworkObjectName,
    projectSettingsService,
  );
}
