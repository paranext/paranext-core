import { dataProviderService } from '@shared/services/data-provider.service';
import {
  ILocalizationService,
  LocalizedProjectTitleOptions,
  localizationServiceProviderName,
  localizationServiceObjectToProxy,
} from '@shared/services/localization.service-model';
import {
  createCachedInitializer,
  createSyncProxyForAsyncObject,
  formatProjectTitle,
  getErrorMessage,
  getLocalizedIdFromBookNumber,
} from 'platform-bible-utils';
import { get as getProjectDataProvider } from '@shared/services/project-data-provider.service';
import { logger } from '@shared/services/logger.service';

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
      const [projectName, titleFormat] = await Promise.all([
        (async () => {
          try {
            const pdp = await getProjectDataProvider('platform.base', projectId);
            return await pdp.getSetting('platform.name');
          } catch (e) {
            logger.warn(`Could not read the name of project ${projectId}: ${getErrorMessage(e)}`);
            return undefined;
          }
        })(),
        (async () => {
          try {
            return await localizationService.getLocalizedString({ localizeKey, locales });
          } catch (e) {
            logger.warn(`Could not localize project title ${localizeKey}: ${getErrorMessage(e)}`);
            return '{projectName}';
          }
        })(),
      ]);

      return formatProjectTitle(titleFormat, projectId, projectName, replacements);
    },
  },
);

export default localizationService;
