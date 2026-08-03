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
// transient failure (e.g. this window's provider not registered yet) can't permanently break
// `papi.window` for the session. What it can't know about is the provider going away later, so
// `initializeWindowService` swaps in a fresh initializer when its provider is disposed.
//
// Only the renderer takes this path — see `getWindowService` below for why the extension host
// cannot cache.
let initialize = createCachedInitializer(initializeWindowService);

/** Resolve the scoped provider for whichever window currently has focus */
async function getFocusedWindowService(): Promise<IWindowService> {
  // The command's declared TypeScript return type is `number | undefined`, but its return schema
  // over JSON-RPC also permits `null` for "no focused window" — collapse a `null` to `undefined`
  // so it cannot skip the guard below and end up in a nonsense scoped provider name like
  // `...window-null`
  const focusedWindowId = (await sendCommand('platform.getFocusedWindowId')) ?? undefined;
  if (focusedWindowId === undefined) {
    throw new Error('Window service is not available: no focused window found. Is a window open?');
  }
  const provider = await dataProviderService.get(
    // dataProviderService.get expects the literal provider name type, but the scoped name is built
    // dynamically at runtime
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    `${windowServiceProviderName}-${focusedWindowId}` as typeof windowServiceProviderName,
  );
  if (!provider) throw new Error('Window service undefined');
  return provider;
}

async function initializeWindowService(): Promise<void> {
  const provider = await dataProviderService.get(
    // Same runtime-built name assertion as in `getFocusedWindowService`
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    `${windowServiceProviderName}-${globalThis.windowId}` as typeof windowServiceProviderName,
  );
  if (!provider) throw new Error('Window service undefined');
  dataProvider = provider;
  // Re-arm the initializer if this window's provider is disposed, so a later call rebuilds it
  // rather than handing back a dead provider.
  provider.onDidDispose(() => {
    dataProvider = undefined;
    initialize = createCachedInitializer(initializeWindowService);
  });
}

/**
 * Get the window service provider this process should be talking to.
 *
 * In the renderer that is always this window's own provider, so it is resolved once and cached for
 * the window's lifetime.
 *
 * The extension host has no window of its own, so `papi.window` there means "whichever window has
 * focus right now" — and that changes every time the user clicks between windows, with no event to
 * invalidate a cache on. Caching the first resolution would pin the extension host to whatever
 * window happened to be focused on its first call, so it resolves per call instead. `papi.window`
 * is not a hot path from the extension host; correctness beats saving a round trip here.
 */
async function getWindowService(): Promise<IWindowService> {
  if (!globalThis.windowId) return getFocusedWindowService();
  await initialize();
  if (!dataProvider) throw new Error('Window service undefined');
  return dataProvider;
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

export const windowService = createSyncProxyForAsyncObject<IWindowService>(
  getWindowService,
  windowServiceProxyTarget,
);
