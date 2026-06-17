import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeService,
  themeServiceDataProviderName,
  themeServiceObjectToProxy,
} from '@shared/services/theme.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: IThemeService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(themeServiceDataProviderName);
  if (!provider) throw new Error('Theme service undefined');
  dataProvider = provider;
});

export const themeService = createSyncProxyForAsyncObject<IThemeService>(async () => {
  await initialize();
  return dataProvider;
}, themeServiceObjectToProxy);
