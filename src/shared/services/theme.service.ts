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
 * Cached resolution of the theme data provider.
 *
 * Main hosts the provider (`main/services/theme.service-host.ts`) and registers it before any
 * window is created, so it is there for as long as the app is, and there is nothing to re-arm for:
 * no window closing can take it away. `createCachedInitializer` still retries a FAILED resolution,
 * which is the case that remains — a consumer that asks before the provider has been announced.
 */
const initialize = createCachedInitializer(initializeThemeService);

async function initializeThemeService(): Promise<void> {
  const provider = await dataProviderService.get(themeServiceDataProviderName);
  if (!provider) throw new Error('Theme service undefined');
  dataProvider = provider;
}

/** The theme provider this process should be talking to, resolving it if needed */
async function getThemeProvider(): Promise<IThemeService> {
  await initialize();
  if (!dataProvider) throw new Error('Theme service undefined');
  return dataProvider;
}

export const themeService = createSyncProxyForAsyncObject<IThemeService>(
  getThemeProvider,
  themeServiceObjectToProxy,
);
