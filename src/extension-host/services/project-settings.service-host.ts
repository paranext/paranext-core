import * as networkService from '@shared/services/network.service';
import {
  coreProjectSettingsValidators,
  platformProjectSettings,
} from '@extension-host/data/core-project-settings-info.data';
import networkObjectService from '@shared/services/network-object.service';
import {
  CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR,
  IProjectSettingsService,
  SimultaneousProjectSettingsChanges,
  projectSettingsServiceNetworkObjectName,
  projectSettingsServiceObjectToProxy,
} from '@shared/services/project-settings.service-model';
import { serializeRequestType } from '@shared/utils/util';
import { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import { includes, isLocalizeKey, isString } from 'platform-bible-utils';
import ProjectSettingsDocumentCombiner, {
  LocalizedProjectSettingsContributionInfo,
} from '@shared/utils/project-settings-document-combiner';

/**
 * Object that keeps track of all project settings contributions in the platform. To listen to
 * updates to the project settings contributions, subscribe to its `onDidRebuild` event (consider
 * debouncing as each contribution will trigger a rebuild).
 *
 * Keeping this object separate from the network object prevents random services from changing
 * system project settings contributions unexpectedly.
 */
export const projectSettingsDocumentCombiner = new ProjectSettingsDocumentCombiner(
  platformProjectSettings,
);

let initializationPromise: Promise<void>;
/** Do the setup this service needs to function */
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
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
  allChanges?: SimultaneousProjectSettingsChanges,
): Promise<boolean> {
  if (key in coreProjectSettingsValidators) {
    const projectSettingValidator = coreProjectSettingsValidators[key];
    if (projectSettingValidator)
      return projectSettingValidator(newValue, currentValue, allChanges ?? {});
    // If key exists in coreProjectSettingsValidators but there is no validator, let the change go through
    return true;
  }
  const requestType = serializeRequestType(CATEGORY_EXTENSION_PROJECT_SETTING_VALIDATOR, key);
  try {
    return await networkService.request(requestType, newValue, currentValue, allChanges ?? {});
  } catch (error) {
    // If there is no validator just let the change go through
    const missingValidatorMsg = `'${requestType}' not found`;
    if (includes(`${error}`, missingValidatorMsg)) return true;
    throw error;
  }
}

async function getDefault<ProjectSettingName extends ProjectSettingNames>(
  key: ProjectSettingName,
): Promise<ProjectSettingTypes[ProjectSettingName]> {
  await initialize();
  const projectSettingInfo =
    projectSettingsDocumentCombiner.getProjectSettingsContributionInfo()?.settings[key];

  if (!projectSettingInfo) {
    throw new Error(`Could not find project setting ${key}.`);
  }

  // We shouldn't be able to hit this anymore since the project settings document combiner should
  // throw if this ever happened. But this is still here just in case because this would be a
  // serious error
  if (!('default' in projectSettingInfo)) {
    throw new Error(`Could not find default value for project setting ${key}.`);
  }

  // If this default is not a localized string key, return it. Otherwise we need to get the
  // localized version instead
  if (!isString(projectSettingInfo.default) || !isLocalizeKey(projectSettingInfo.default))
    return projectSettingInfo.default;

  const localizedProjectSettingInfo = (
    await projectSettingsDocumentCombiner.getLocalizedProjectSettingsContributionInfo()
  )?.settings[key];

  if (!localizedProjectSettingInfo) {
    throw new Error(`Could not find localized project setting ${key}.`);
  }

  // We shouldn't be able to hit this anymore since the project settings document combiner should
  // throw if this ever happened. But this is still here just in case because this would be a
  // serious error
  if (!('default' in localizedProjectSettingInfo)) {
    throw new Error(`Could not find localized default value for project setting ${key}.`);
  }

  // This type is correct. Looks like `ReplaceType` breaks mapped types and just unions the types
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return localizedProjectSettingInfo.default as ProjectSettingTypes[ProjectSettingName];
}

async function getLocalizedContributionInfo(): Promise<
  LocalizedProjectSettingsContributionInfo | undefined
> {
  return projectSettingsDocumentCombiner.getLocalizedProjectSettingsContributionInfo();
}

const { registerValidator } = projectSettingsServiceObjectToProxy;
const projectSettingsService: IProjectSettingsService = {
  isValid,
  getDefault,
  registerValidator,
  getLocalizedContributionInfo,
};

/** This is an internal-only export for testing purposes and should not be used in development */
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
