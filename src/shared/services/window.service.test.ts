import { afterEach, describe, expect, test, vi } from 'vitest';
import { windowServiceProviderName } from '@shared/services/window.service-model';

// The proxy's dependency graph is only reached by the async path, which these tests never take —
// they read `dataProviderName`, which the proxy target answers synchronously. Stubbed so the module
// imports cleanly rather than because anything here is exercised.
vi.mock('@shared/services/data-provider.service', () => ({ getByType: vi.fn() }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));

/**
 * `windowService` reads `globalThis.windowId` through a getter at access time, so each case sets it
 * before importing a fresh copy of the module.
 *
 * Wrapped in an object rather than returned directly: the proxy answers every property it does not
 * hold with an async function, `then` included, so it satisfies the thenable check. Returning it
 * from an `async` function would make the runtime call that `then` and drive the real provider
 * lookup, which is neither what these tests are about nor available here.
 */
async function windowServiceWithWindowId(windowId: string | undefined) {
  vi.resetModules();
  if (windowId === undefined) delete globalThis.windowId;
  else globalThis.windowId = windowId;
  return { windowService: (await import('@shared/services/window.service')).windowService };
}

afterEach(() => {
  delete globalThis.windowId;
});

describe('windowService.dataProviderName', () => {
  test('answers the window-scoped name wherever a window id is set', async () => {
    // What the public TSDoc on this property promises a renderer or web view caller. The proxy
    // target spreads `windowServiceObjectToProxy` — whose `dataProviderName` is the bare, unscoped
    // constant — and then defines a getter of the same name over it, and
    // `createSyncProxyForAsyncObject`'s trap returns any property present on its target. So the
    // getter is what answers, and the spread value is never seen.
    const { windowService } = await windowServiceWithWindowId('7');

    expect(windowService.dataProviderName).toBe(`${windowServiceProviderName}-7`);
  });

  test('answers the bare unscoped name where no window id is set, as in the extension host', async () => {
    // The other half of the same promise, and the reason the doc has to name both audiences: the
    // extension host runs in no window, so the same property there is the unscoped name that
    // resolves through whichever window the router is targeting.
    const { windowService } = await windowServiceWithWindowId(undefined);

    expect(windowService.dataProviderName).toBe(windowServiceProviderName);
  });
});
