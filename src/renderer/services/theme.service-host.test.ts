import { beforeEach, describe, expect, test, vi } from 'vitest';
import { EVENT_NAME_ON_DID_CLOSE_WINDOW } from '@shared/data/network-event-names';

// The theme service host reads the OS dark-mode preference at module load, which jsdom does not
// implement, so stub it before the module under test is imported.
const mocks = vi.hoisted(() => {
  /** Handlers the module under test registered for the window-close announcement */
  const windowCloseHandlers: ((windowId: number) => void)[] = [];
  return {
    registerEngine: vi.fn(),
    get: vi.fn(),
    subscribeAllThemes: vi.fn(async () => async () => true),
    forgetUnreachableRemoteObjects: vi.fn(async (): Promise<string[]> => []),
    windowCloseHandlers,
  };
});

vi.stubGlobal(
  'matchMedia',
  vi.fn(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
);

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: mocks.registerEngine, get: mocks.get },
}));
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: { subscribeAllThemes: mocks.subscribeAllThemes },
}));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: (eventName: string) => (handler: (windowId: number) => void) => {
    if (eventName === EVENT_NAME_ON_DID_CLOSE_WINDOW) mocks.windowCloseHandlers.push(handler);
    return () => true;
  },
}));
vi.mock('@shared/services/network-object.service', () => ({
  forgetUnreachableRemoteObjects: mocks.forgetUnreachableRemoteObjects,
}));

/** Stand in for the main process announcing that a window closed */
function closeWindow(windowId: number) {
  mocks.windowCloseHandlers.forEach((handler) => handler(windowId));
}

/** Let queued promise callbacks run so a negative assertion is not just early */
async function settlePendingWork() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

/** Minimal stand-in for a registered/consumed theme data provider */
function makeProvider() {
  const disposeCallbacks: (() => void)[] = [];
  return {
    provider: {
      onDidDispose: (callback: () => void) => {
        disposeCallbacks.push(callback);
        return () => true;
      },
    },
    /** Simulate the hosting window closing, which disposes the provider the other windows consumed */
    dispose: () => disposeCallbacks.forEach((callback) => callback()),
  };
}

// The theme is app-global — one current theme for the whole app — so exactly one renderer hosts the
// engine no matter how many windows are open. These tests cover which window ends up hosting it.
describe('theme service host across multiple windows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    mocks.windowCloseHandlers.length = 0;
  });

  test('the first window to start hosts the engine', async () => {
    const { provider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);
    expect(mocks.get).not.toHaveBeenCalled();
  });

  test('a later window attaches to the engine the first window already hosts', async () => {
    mocks.registerEngine.mockRejectedValue(
      new Error('Network object with id platform.themeServiceDataProvider is already registered'),
    );
    const { provider } = makeProvider();
    mocks.get.mockResolvedValue(provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    expect(mocks.get).toHaveBeenCalledTimes(1);
  });

  test('a later window takes the engine over when the hosting window closes', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    // The hosting window closes, taking its engine with it
    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);
    hosted.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));
  });

  // A closing window drops its RPC connection without disposing anything, so the dispose hook above
  // never fires on its own. The main process announcing the close is what the handover actually
  // runs on.
  test('a later window takes the engine over when it hears the hosting window closed', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);
    // The dead provider is still cached locally, and a cached registration makes the engine's name
    // look taken, so re-registering can only succeed once it has been dropped.
    mocks.forgetUnreachableRemoteObjects.mockResolvedValue(['platform.themeServiceDataProvider']);

    // The hosting window closes. Nothing disposes its provider — this announcement is all we get.
    closeWindow(1);

    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));
    expect(mocks.forgetUnreachableRemoteObjects).toHaveBeenCalled();
  });

  test('a window that lost nothing when another window closed stays attached to its engine', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.get).toHaveBeenCalledTimes(1);

    // A window that was not hosting the engine closed, so nothing this window was using went away
    mocks.forgetUnreachableRemoteObjects.mockResolvedValue([]);
    closeWindow(3);
    await settlePendingWork();

    // Resolving the same live provider again would only pile another dispose handler onto it
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);
    expect(mocks.get).toHaveBeenCalledTimes(1);
  });

  test('the window already hosting the engine keeps hosting it when another window closes', async () => {
    const { provider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    closeWindow(2);
    await settlePendingWork();

    // Re-entering the race here would drop the engine this window is serving to everyone else
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);
    expect(mocks.forgetUnreachableRemoteObjects).not.toHaveBeenCalled();
  });

  test('surfaces the failure when there is no engine to host or attach to', async () => {
    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    mocks.get.mockResolvedValue(undefined);

    const { initialize } = await import('@renderer/services/theme.service-host');

    await expect(initialize()).rejects.toThrow('Theme service undefined');
  });
});
