import {
  localizationServiceNetworkObjectName,
  LocalizationServiceType,
} from '@shared/services/localization.service-model';
import networkObjectService from '@shared/services/network-object.service';

let networkObject: LocalizationServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localLocalizationService = await networkObjectService.get<LocalizationServiceType>(
            localizationServiceNetworkObjectName,
          );
          if (!localLocalizationService)
            throw new Error(
              `${localizationServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localLocalizationService;
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

const localizationService: LocalizationServiceType = {
  getLocalizedValueForKey: async (localizeKey: string, language: string) => {
    await initialize();
    return networkObject.getLocalizedValueForKey(localizeKey, language);
  },
  getLocalizedValuesForKeys: async (localizeKeys: string[], language: string) => {
    await initialize();
    return networkObject.getLocalizedValuesForKeys(localizeKeys, language);
  },
};

export default localizationService;
