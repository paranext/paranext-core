import { dataProviderService } from '@shared/services/data-provider.service';
import {
  IMenuDataService,
  menuDataServiceObjectToProxy,
  menuDataServiceProviderName,
} from '@shared/services/menu-data.service-model';
import { createCachedInitializer, createSyncProxyForAsyncObject } from 'platform-bible-utils';

let dataProvider: IMenuDataService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(menuDataServiceProviderName);
  if (!provider) throw new Error('Menu data service undefined');
  dataProvider = provider;
});

export const menuDataService = createSyncProxyForAsyncObject<IMenuDataService>(async () => {
  await initialize();
  return dataProvider;
}, menuDataServiceObjectToProxy);

export default menuDataService;
