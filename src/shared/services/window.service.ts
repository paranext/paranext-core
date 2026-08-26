import { getByType as getDataProviderByType } from '@shared/services/data-provider.service';
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

// This file builds the window-scoped provider name from a window id, which is the one thing the
// service routers deliberately do not do — they find a window's shard by network object type and
// window attribute so the scoped name stays an internal detail of the registration.
//
// The rule does not reach here yet. The index that makes typed discovery possible lives in the main
// process, and this module runs in the renderer and the extension host. Giving those processes the
// same lookup means putting it somewhere shared, which is a module the public `@papi/*` surface can
// see, so it would land in `papi.d.ts` as API for finding another window's services — a bigger
// decision than the mechanical move it looks like. Until that is settled, the two consuming
// processes rebuild the name, and the errors below say which window they were rebuilding it for.

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
  // Resolved by type rather than by name: the window-scoped name is built at runtime, where
  // `dataProviderService.get` wants the literal provider name and would have to be lied to about it
  const provider = await getDataProviderByType<IWindowService>(
    `${windowServiceProviderName}-${focusedWindowId}`,
  );
  if (!provider)
    throw new Error(
      `Window service for the focused window ${focusedWindowId} is not available. That window reported focus but has not registered its window service, so it may still be starting or may have just gone away.`,
    );
  return provider;
}

async function initializeWindowService(): Promise<void> {
  // Resolved by type for the same reason as in `getFocusedWindowService`
  const provider = await getDataProviderByType<IWindowService>(
    `${windowServiceProviderName}-${globalThis.windowId}`,
  );
  if (!provider)
    throw new Error(
      `Window service for this window (${globalThis.windowId}) is not available. This window has not registered its own window service yet.`,
    );
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
  // Having a window id is what separates a renderer from the extension host, which has none.
  // Compared against `undefined` rather than tested for truthiness now that the id is a number: a
  // falsiness test would send window 0 down the extension host's path. Nothing mints 0 today, and
  // a check that is correct only because of that is one counter change away from being wrong.
  if (globalThis.windowId === undefined) return getFocusedWindowService();
  await initialize();
  // Initializing resolved without setting the provider, which means it was disposed between being
  // resolved and being read here — a window on its way out, or a renderer that reloaded
  if (!dataProvider)
    throw new Error(
      `Window service for this window (${globalThis.windowId}) went away while it was being resolved.`,
    );
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
      globalThis.windowId === undefined
        ? windowServiceProviderName
        : `${windowServiceProviderName}-${globalThis.windowId}`
    ) as typeof windowServiceProviderName;
  },
};

export const windowService = createSyncProxyForAsyncObject<IWindowService>(
  getWindowService,
  windowServiceProxyTarget,
);
