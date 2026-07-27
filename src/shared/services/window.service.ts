import { dataProviderService } from '@shared/services/data-provider.service';
import { sendCommand } from '@shared/services/command.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

let dataProvider: IWindowService | undefined;

// `createCachedInitializer` already drops its cached promise when the initializer rejects, so a
// transient failure (e.g. no window open yet while the extension host is starting) can't
// permanently break `papi.window` for the session. What it can't know about is the provider going
// away later, so `initializeWindowService` swaps in a fresh initializer when its provider is
// disposed. In the renderer `globalThis.windowId` is stable, so the cache is only ever re-armed
// there when the window itself is going away.
let initialize = createCachedInitializer(initializeWindowService);

async function resolveProviderName(): Promise<string> {
  if (globalThis.windowId) {
    return `${windowServiceProviderName}-${globalThis.windowId}`;
  }
  // Extension host: resolve the focused window's scoped provider
  const focusedWindowId = await sendCommand('platform.getFocusedWindowId');
  if (focusedWindowId === undefined) {
    throw new Error('Window service is not available: no focused window found. Is a window open?');
  }
  return `${windowServiceProviderName}-${focusedWindowId}`;
}

async function initializeWindowService(): Promise<void> {
  const scopedName = await resolveProviderName();
  const provider = await dataProviderService.get(
    // dataProviderService.get expects the literal provider name type, but the scoped
    // name is built dynamically at runtime
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    scopedName as typeof windowServiceProviderName,
  );
  if (!provider) throw new Error('Window service undefined');
  dataProvider = provider;
  // Re-arm the initializer when the resolved provider is disposed (e.g. its window closed) so the
  // next call re-resolves to whatever window is focused at that time.
  provider.onDidDispose(() => {
    dataProvider = undefined;
    initialize = createCachedInitializer(initializeWindowService);
  });
}

// Dynamic proxy target so dataProviderName returns the scoped name at access time (not at module
// load time, when windowId may not yet be set)
const windowServiceProxyTarget = {
  ...windowServiceObjectToProxy,
  get dataProviderName(): typeof windowServiceProviderName {
    // Provider name is dynamically scoped per window but the type system expects the literal type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (
      globalThis.windowId
        ? `${windowServiceProviderName}-${globalThis.windowId}`
        : windowServiceProviderName
    ) as typeof windowServiceProviderName;
  },
};

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  if (!dataProvider) throw new Error('Window service undefined');
  return dataProvider;
}, windowServiceProxyTarget);
