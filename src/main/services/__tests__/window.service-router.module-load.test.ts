import { describe, expect, test, vi } from 'vitest';
import { PlatformEventEmitter } from 'platform-bible-utils';

/**
 * Separate from `window.service-router.test.ts` because that suite mocks
 * `@shared/services/data-provider.service` wholesale, and what matters here is the behaviour
 * against the REAL one — both at module-load time and at registration.
 *
 * `setFocus` is decorated with `dataProviderService.decorators.doNotNotify`, which is evaluated
 * when the class is defined rather than when anything is called. A missing export, or an import
 * cycle that left `dataProviderService` uninitialised at that moment, would throw while the main
 * process was still loading modules — bringing the app up with no window at all. What the decorator
 * buys is visible only through the real registration: the registered provider must not emit an
 * update of its own when `setFocus` is called, because the window it forwarded to emits one that
 * the relay already passes on. A suite that substitutes its own stub for that module can see none
 * of it.
 */

const mocks = vi.hoisted(() => ({
  networkObjectSet: vi.fn(),
  networkObjectGet: vi.fn(),
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('electron', () => ({ BrowserWindow: class {}, app: { on: () => {} } }));
// The data provider service is real; everything it registers WITH is stubbed, so registration runs
// end to end in-process without a network
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(async () => {}),
  createNetworkEventEmitterAsync: mocks.createNetworkEventEmitterAsync,
  getNetworkEvent: () => vi.fn(),
  // network-object.service subscribes to this at module load so a process that leaves during
  // startup is still announced, and this test reaches that module on its import path.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
}));
vi.mock('@shared/services/network-object.service', async (importOriginal) => ({
  // `overrideDispose` and friends are plain helpers the data provider service uses on its way to
  // registering; only the network-facing entry points are stubbed
  ...(await importOriginal<object>()),
  networkObjectService: {
    hasKnown: () => false,
    set: mocks.networkObjectSet,
    get: mocks.networkObjectGet,
  },
}));

describe('window service router module load', () => {
  test('registers a provider whose focus writes do not emit an update the relay already sends', async () => {
    const updateEmitter = new PlatformEventEmitter<unknown>();
    mocks.createNetworkEventEmitterAsync.mockResolvedValue(updateEmitter);
    const updatesEmitted: unknown[] = [];
    updateEmitter.subscribe((updateInstructions) => updatesEmitted.push(updateInstructions));
    // The registered provider is the object handed to the network object service; the data provider
    // service then reads it back to resolve its own promise for it
    mocks.networkObjectSet.mockImplementation(async (_id: string, provider: unknown) => provider);
    mocks.networkObjectGet.mockImplementation(
      async () => mocks.networkObjectSet.mock.calls[0]?.[1],
    );
    const scopedWindowService = {
      getFocus: async () => undefined,
      setFocus: async () => true,
      subscribeFocus: async () => async () => true,
    };

    // The real window state service, so the router has a window to route the write to
    const { addWindow, markWindowReady } = await import('@main/services/window-state.service');
    // Constructing a real BrowserWindow needs the Electron runtime; `id` is the only member the
    // window state service touches
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    addWindow({ id: 1 } as never);
    markWindowReady(1);

    const { testingWindowServiceRouter } = await import('@main/services/window.service-router');
    const { dataProviderService } = await import('@shared/services/data-provider.service');
    const { windowServiceProviderName } = await import('@shared/services/window.service-model');
    // What `startWindowServiceRouter` does, with the shard lookup stubbed. It resolves shards
    // through this module's own index, which learns them from network object announcements that
    // this suite's stubbed network layer never delivers — so the engine is built here with a
    // resolver instead, which is the seam `testingWindowServiceRouter` exists for. Everything under
    // test is still the real thing: the module was loaded (decorator evaluated) and the provider is
    // registered through the real data provider service.
    // The engine only ever calls getFocus / setFocus / subscribeFocus on what it resolves, so the
    // stub above implements just those rather than the whole IWindowService
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const resolveStubShard = async () => scopedWindowService as never;
    await dataProviderService.registerEngine(
      windowServiceProviderName,
      new testingWindowServiceRouter.FocusedWindowDataProviderEngine(resolveStubShard),
    );
    const registeredProvider = mocks.networkObjectSet.mock.calls[0][1];
    await registeredProvider.setFocus(undefined, 'detect');

    expect(updatesEmitted).toEqual([]);
  });
});
