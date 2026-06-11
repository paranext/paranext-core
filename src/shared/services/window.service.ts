import { dataProviderService } from '@shared/services/data-provider.service';
import { createCachedInitializer, createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService;
const initialize = createCachedInitializer(async () => {
  const provider = await dataProviderService.get(windowServiceProviderName);
  if (!provider) throw new Error('Window service undefined');
  dataProvider = provider;
});

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceObjectToProxy);
