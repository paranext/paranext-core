import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeService,
  createReattachingSubscribeCurrentTheme,
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
 *
 * A closing window drops its RPC connection without disposing anything, so the disposal this relies
 * on is the one `networkObjectService.forgetUnreachableRemoteObjects` raises for objects the
 * network can no longer reach. Every process runs that cleanup when the main process announces a
 * window closing, which is what keeps this re-arm alive in the main and extension host processes as
 * well as the renderers.
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

/** The theme provider this process should be talking to right now, resolving it if needed */
async function getThemeProvider(): Promise<IThemeService> {
  await initialize();
  if (!dataProvider) throw new Error('Theme service undefined');
  return dataProvider;
}

export const themeService = createSyncProxyForAsyncObject<IThemeService>(getThemeProvider, {
  ...themeServiceObjectToProxy,
  // Served here rather than passed through to the provider so a subscription made before a window
  // handover keeps delivering afterwards. See `createReattachingSubscribeCurrentTheme`.
  subscribeCurrentTheme: createReattachingSubscribeCurrentTheme(getThemeProvider),
});
