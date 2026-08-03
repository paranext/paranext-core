import { beforeEach, describe, expect, test, vi } from 'vitest';
import { EVENT_NAME_ON_DID_CLOSE_WINDOW } from '@shared/data/network-event-names';

// The theme service host reads the OS dark-mode preference at module load, which jsdom does not
// implement, so stub it before the module under test is imported.
const mocks = vi.hoisted(() => {
  /** Handlers the module under test registered for the window-close announcement */
  const windowCloseHandlers: ((windowId: number) => void)[] = [];
  /** Handlers the module under test subscribed to the theme data service's all-themes updates */
  const allThemesHandlers: ((allThemes: unknown) => void)[] = [];
  return {
    registerEngine: vi.fn(),
    get: vi.fn(),
    subscribeAllThemes: vi.fn(async (_selector: unknown, handler: (allThemes: unknown) => void) => {
      allThemesHandlers.push(handler);
      return async () => true;
    }),
    forgetUnreachableRemoteObjects: vi.fn(async (): Promise<string[]> => []),
    windowCloseHandlers,
    allThemesHandlers,
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

/** Stand in for the theme data service publishing the extension-contributed theme families */
function publishExtensionThemes(allThemes: unknown) {
  mocks.allThemesHandlers.forEach((handler) => handler(allThemes));
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
    mocks.allThemesHandlers.length = 0;
    // The module under test reads its persisted state from localStorage at load, which jsdom
    // shares across the tests in this file
    localStorage.clear();
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

  // localStorage is shared across every window of the app, so the values persisted right now are
  // whatever the previous host last saved — while the engine object in this window still holds the
  // snapshot it read when this window loaded. Taking over must serve the former: republishing the
  // load-time snapshot would roll the app back to pre-close state and let a later save persist it.
  test('taking the engine over serves the currently persisted state, not the load-time snapshot', async () => {
    /** The slice of the re-registered engine this test reads back */
    type TakenOverThemeEngine = {
      getCurrentTheme: () => Promise<{ themeFamilyId: string }>;
      getShouldMatchSystem: () => Promise<boolean>;
      getAllThemes: () => Promise<Record<string, unknown>>;
    };

    // What was persisted when this window loaded
    localStorage.setItem(
      'theme.service-host.currentTheme',
      JSON.stringify({ themeFamilyId: 'user-stale', type: 'light', cssVariables: {} }),
    );
    localStorage.setItem('theme.service-host.shouldMatchSystem', 'false');
    localStorage.setItem(
      'theme.service-host.userThemes',
      JSON.stringify({ 'user-stale': { light: { label: 'Stale', cssVariables: {} } } }),
    );

    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    // The theme data service delivers the extension-contributed themes (none, for this test)
    publishExtensionThemes({});

    // The hosting window persists new state — a new current theme, a flipped setting, and a user
    // theme family that replaces the old one — and then closes
    localStorage.setItem(
      'theme.service-host.currentTheme',
      JSON.stringify({ themeFamilyId: 'user-fresh', type: 'light', cssVariables: {} }),
    );
    localStorage.setItem('theme.service-host.shouldMatchSystem', 'true');
    localStorage.setItem(
      'theme.service-host.userThemes',
      JSON.stringify({ 'user-fresh': { light: { label: 'Fresh', cssVariables: {} } } }),
    );

    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);
    mocks.forgetUnreachableRemoteObjects.mockResolvedValue(['platform.themeServiceDataProvider']);
    closeWindow(1);
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));

    // The engine this window re-registered must serve what is persisted NOW
    const engineTakingOver: TakenOverThemeEngine = mocks.registerEngine.mock.calls[1][1];
    expect((await engineTakingOver.getCurrentTheme()).themeFamilyId).toBe('user-fresh');
    expect(await engineTakingOver.getShouldMatchSystem()).toBe(true);
    const allThemes = await engineTakingOver.getAllThemes();
    expect(allThemes['user-fresh']).toBeDefined();
    // A family deleted since this window loaded must not be resurrected from the load-time snapshot
    expect(allThemes['user-stale']).toBeUndefined();
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

  // Clearing the unreachable provider fires its dispose hook (wired to the retry), and the sweep
  // retries again on its own completion. Both triggers fire on every real host close, so they must
  // share one host-or-attach run: two concurrent runs would race each other for the engine name and
  // the loser would noisily fail against a registry that rejects even the same handler.
  test('concurrent takeover triggers share one host-or-attach run, and a later close still retries', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted1 = makeProvider();
    mocks.get.mockResolvedValue(hosted1.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    // The sweep both fires the cached provider's dispose (first trigger) and reports that it forgot
    // something (second trigger) — exactly what a real host close produces.
    mocks.forgetUnreachableRemoteObjects.mockImplementation(async () => {
      hosted1.dispose();
      return ['platform.themeServiceDataProvider'];
    });

    // Hold the retry's registration in flight so the second trigger arrives before the run started
    // by the first trigger has settled.
    let settleRetryRegistration = () => {};
    mocks.registerEngine.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          settleRetryRegistration = () => reject(new Error('already registered'));
        }),
    );
    const hosted2 = makeProvider();
    mocks.get.mockResolvedValue(hosted2.provider);

    closeWindow(1);
    await settlePendingWork();

    // One registration attempt shared by both triggers, not one per trigger
    expect(mocks.registerEngine).toHaveBeenCalledTimes(2);

    // The in-flight run settles by losing the race to another surviving window and attaching
    settleRetryRegistration();
    await vi.waitFor(() => expect(mocks.get).toHaveBeenCalledTimes(2));
    await settlePendingWork();

    // The guard must not latch: when the window that won that race closes later, this window
    // re-enters the race again.
    mocks.forgetUnreachableRemoteObjects.mockImplementation(async () => {
      hosted2.dispose();
      return ['platform.themeServiceDataProvider'];
    });
    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);

    closeWindow(2);
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(3));
  });

  test('surfaces the failure when there is no engine to host or attach to', async () => {
    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    mocks.get.mockResolvedValue(undefined);

    const { initialize } = await import('@renderer/services/theme.service-host');

    await expect(initialize()).rejects.toThrow('Theme service undefined');
  });
});
