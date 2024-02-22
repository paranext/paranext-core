import coreProjectSettingsInfo, {
  AllProjectSettingsInfo,
} from '@main/data/core-project-settings-info.data';
import networkObjectService from '@shared/services/network-object.service';
import {
  IProjectSettingsService,
  projectSettingsServiceNetworkObjectName,
} from '@shared/services/project-settings.service-model';
import { ProjectSettingNames, ProjectSettingTypes, ProjectTypes } from 'papi-shared-types';

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

// TODO: Implement validators in https://github.com/paranext/paranext-core/issues/511
async function isValid(): Promise<boolean> {
  return true;
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

const projectSettingsService: IProjectSettingsService = {
  isValid,
  getDefault,
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
