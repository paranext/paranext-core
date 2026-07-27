import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeService,
  themeServiceDataProviderName,
  themeServiceObjectToProxy,
} from '@shared/services/theme.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: IThemeService | undefined;

/**
 * Cached resolution of the theme provider, re-armed when that provider goes away.
 *
 * Exactly one renderer hosts the theme engine (see `theme.service-host.ts`), and when that window
 * closes another window takes the name over. Consumers here — the main process's title bar theming
 * and every extension's `papi.themes` — would otherwise hold the provider from the closed window
 * for the rest of the session, so re-arm on disposal and resolve the new host on the next call.
 */
let initialize = createCachedInitializer(initializeThemeService);

async function initializeThemeService(): Promise<void> {
  const provider = await dataProviderService.get(themeServiceDataProviderName);
  if (!provider) throw new Error('Theme service undefined');
  dataProvider = provider;
  provider.onDidDispose(() => {
    dataProvider = undefined;
    initialize = createCachedInitializer(initializeThemeService);
  });
}

export const themeService = createSyncProxyForAsyncObject<IThemeService>(async () => {
  await initialize();
  if (!dataProvider) throw new Error('Theme service undefined');
  return dataProvider;
}, themeServiceObjectToProxy);
