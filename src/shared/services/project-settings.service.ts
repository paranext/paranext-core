import {
  projectSettingsServiceNetworkObjectName,
  IProjectSettingsService,
} from '@shared/services/project-settings.service-model';
import networkObjectService from '@shared/services/network-object.service';

let networkObject: IProjectSettingsService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localProjectSettingsService =
            await networkObjectService.get<IProjectSettingsService>(
              projectSettingsServiceNetworkObjectName,
            );
          if (!localProjectSettingsService)
            throw new Error(
              `${projectSettingsServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localProjectSettingsService;
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

const projectSettingsService: IProjectSettingsService = {
  async getDefault(key, projectType) {
    await initialize();
    return networkObject.getDefault(key, projectType);
  },
  async isValid(newValue, currentValue, key, allChanges, projectType) {
    await initialize();
    return networkObject.isValid(newValue, currentValue, key, allChanges, projectType);
  },
  async registerValidator(key, validator) {
    await initialize();
    return networkObject.registerValidator(key, validator);
  },
};

export default projectSettingsService;
