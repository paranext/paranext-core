import { dataProviderService } from '@shared/services/data-provider.service';
import { sendCommand } from '@shared/services/command.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService | undefined;
let initializationPromise: Promise<void> | undefined;

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

// Re-resolve the provider on each call from the extension host so that the cache survives window
// close, focus change, and the startup race where the extension host calls papi.window before any
// window exists. In the renderer, globalThis.windowId is stable, so caching is safe.
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      try {
        const scopedName = await resolveProviderName();
        const provider = await dataProviderService.get(
          // dataProviderService.get expects the literal provider name type, but the scoped
          // name is built dynamically at runtime
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          scopedName as typeof windowServiceProviderName,
        );
        if (!provider) throw new Error('Window service undefined');
        dataProvider = provider;
        // Reset the cache when the resolved provider is disposed (e.g., its window closed) so the
        // next call re-resolves to whatever window is focused at that time.
        provider.onDidDispose(() => {
          dataProvider = undefined;
          initializationPromise = undefined;
        });
      } catch (e) {
        // Do not cache a rejected promise. A transient failure (e.g., no window yet during
        // extension host startup) must not permanently break papi.window for the session.
        initializationPromise = undefined;
        throw e;
      }
    })();
  }
  return initializationPromise;
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
