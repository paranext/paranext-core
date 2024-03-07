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
  getLocalizedString: async (localizeKey: string, languages?: string[]) => {
    await initialize();
    return networkObject.getLocalizedString(localizeKey, languages);
  },
  getLocalizedStrings: async (localizeKeys: string[], languages?: string[]) => {
    await initialize();
    return networkObject.getLocalizedStrings(localizeKeys, languages);
  },
};

export default localizationService;
