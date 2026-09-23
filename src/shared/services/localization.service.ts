import { dataProviderService } from '@shared/services/data-provider.service';
import {
  createSyncProxyForAsyncObject,
  formatProjectTitle,
  getErrorMessage,
  getLocalizedIdFromBookNumber,
} from 'platform-bible-utils';
import {
  ILocalizationService,
  LocalizedProjectTitleOptions,
  localizationServiceProviderName,
  localizationServiceObjectToProxy,
} from '@shared/services/localization.service-model';
import { get as getProjectDataProvider } from '@shared/services/project-data-provider.service';
import { logger } from '@shared/services/logger.service';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: ILocalizationService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(localizationServiceProviderName);
  if (!provider) throw new Error('Localization service undefined');
  dataProvider = provider;
});

export const localizationService = createSyncProxyForAsyncObject<ILocalizationService>(
  async () => {
    await initialize();
    return dataProvider;
  },
  {
    ...localizationServiceObjectToProxy,
    getLocalizedIdFromBookNumber(bookNum: number, localizationLanguage: string): Promise<string> {
      return getLocalizedIdFromBookNumber(
        bookNum,
        localizationLanguage,
        ({ localizeKey, ...options }) =>
          localizationService.getLocalizedString({
            ...options,
            localizeKey: `%${localizeKey}%`,
          }),
      );
    },
    async getLocalizedProjectTitle({
      localizeKey,
      projectId,
      replacements,
      locales,
    }: LocalizedProjectTitleOptions): Promise<string> {
      let projectName: string | undefined;
      try {
        const pdp = await getProjectDataProvider('platform.base', projectId);
        projectName = await pdp.getSetting('platform.name');
      } catch (e) {
        logger.warn(`Could not read the name of project ${projectId}: ${getErrorMessage(e)}`);
      }

      let titleFormat = '{projectName}';
      try {
        titleFormat = await localizationService.getLocalizedString({ localizeKey, locales });
      } catch (e) {
        logger.warn(`Could not localize project title ${localizeKey}: ${getErrorMessage(e)}`);
      }

      return formatProjectTitle(titleFormat, projectId, projectName, replacements);
    },
  },
);

export default localizationService;
