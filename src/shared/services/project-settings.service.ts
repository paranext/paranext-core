import {
  projectSettingsServiceNetworkObjectName,
  IProjectSettingsService,
  projectSettingsServiceObjectToProxy,
} from '@shared/services/project-settings.service-model';
import networkObjectService from '@shared/services/network-object.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';

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

const projectSettingsService = createSyncProxyForAsyncObject<IProjectSettingsService>(async () => {
  await initialize();
  return networkObject;
}, projectSettingsServiceObjectToProxy);

export default projectSettingsService;
