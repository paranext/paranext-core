import { dataProviderService } from '@shared/services/data-provider.service';
import { createCachedInitializer, createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeDataService,
  themeDataServiceObjectToProxy,
  themeDataServiceProviderName,
} from '@shared/services/theme-data.service-model';

let dataProvider: IThemeDataService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(themeDataServiceProviderName);
  if (!provider) throw new Error('Theme data service undefined');
  dataProvider = provider;
});

export const themeDataService = createSyncProxyForAsyncObject<IThemeDataService>(async () => {
  await initialize();
  return dataProvider;
}, themeDataServiceObjectToProxy);

export default themeDataService;
