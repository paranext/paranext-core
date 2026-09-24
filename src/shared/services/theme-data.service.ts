import { dataProviderService } from '@shared/services/data-provider.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IThemeDataService,
  themeDataServiceObjectToProxy,
  themeDataServiceProviderName,
} from '@shared/services/theme-data.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: IThemeDataService | undefined;

/**
 * Cached resolution of the theme data provider, re-armed when that provider goes away.
 *
 * The extension host registers this provider, and `platform.restartExtensionHost` replaces that
 * process at any time. Without the re-arm every consumer here — main's theme service host most of
 * all — would hold a revoked proxy to the old extension host's provider for the rest of the
 * session, hearing nothing further about the themes extensions contribute and unable to say so.
 *
 * A process that dies drops its RPC connection without disposing anything, so the disposal this
 * relies on is the one main announces for the objects that process was hosting, once its
 * registrations are gone. That reaches every process, which is what keeps this re-arm alive in the
 * renderers and the extension host as well as in main.
 *
 * The `onDidDispose` unsubscriber is deliberately not kept: exactly one handler is registered per
 * resolved provider, and the provider it belongs to is dropped in the same breath, so there is
 * nothing to accumulate.
 */
let initialize = createCachedInitializer(initializeThemeDataService);

async function initializeThemeDataService(): Promise<void> {
  const provider = await dataProviderService.get(themeDataServiceProviderName);
  if (!provider) throw new Error('Theme data service undefined');
  dataProvider = provider;
  provider.onDidDispose(() => {
    dataProvider = undefined;
    initialize = createCachedInitializer(initializeThemeDataService);
  });
}

export const themeDataService = createSyncProxyForAsyncObject<IThemeDataService>(async () => {
  await initialize();
  if (!dataProvider) throw new Error('Theme data service undefined');
  return dataProvider;
}, themeDataServiceObjectToProxy);

export default themeDataService;
