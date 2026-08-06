import { beforeEach, describe, expect, test, vi } from 'vitest';

// The theme service host reads the OS dark-mode preference at module load, which jsdom does not
// implement, so stub it before the module under test is imported.
const mocks = vi.hoisted(() => {
  /** Handlers the module under test subscribed to the theme data service's all-themes updates */
  const allThemesHandlers: ((allThemes: unknown) => void)[] = [];
  return {
    registerEngine: vi.fn(),
    get: vi.fn(),
    subscribeAllThemes: vi.fn(async (_selector: unknown, handler: (allThemes: unknown) => void) => {
      allThemesHandlers.push(handler);
      return async () => true;
    }),
    allThemesHandlers,
  };
});

/** Stub the OS dark-mode preference the host reads through `window.matchMedia` */
function stubSystemTheme(isSystemDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: isSystemDark,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}
stubSystemTheme(false);

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine: mocks.registerEngine, get: mocks.get },
}));
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: { subscribeAllThemes: mocks.subscribeAllThemes },
}));
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

/** Theme shape the engine and the tests pass around, trimmed to what these tests read */
type TestTheme = {
  themeFamilyId: string;
  type: string;
  label: string;
  cssVariables: Record<string, string>;
};

/** Minimal stand-in for a registered/consumed theme data provider */
function makeProvider() {
  const disposeCallbacks: (() => void)[] = [];
  const currentThemeCallbacks: ((currentTheme: TestTheme) => void)[] = [];
  const unsubscribeCurrentTheme = vi.fn(async () => true);
  return {
    provider: {
      onDidDispose: (callback: () => void) => {
        disposeCallbacks.push(callback);
        return () => true;
      },
      subscribeCurrentTheme: vi.fn(
        async (_selector: undefined, callback: (currentTheme: TestTheme) => void) => {
          currentThemeCallbacks.push(callback);
          return async () => {
            const callbackIndex = currentThemeCallbacks.indexOf(callback);
            if (callbackIndex >= 0) currentThemeCallbacks.splice(callbackIndex, 1);
            return unsubscribeCurrentTheme();
          };
        },
      ),
    },
    /**
     * Simulate the window hosting the engine going away. Nothing it hosted is disposed by that
     * window itself; the process owning the connections announces the disposal on its behalf once
     * its registrations are gone, and this provider's `onDidDispose` is what that reaches.
     */
    dispose: () => [...disposeCallbacks].forEach((callback) => callback()),
    /** Simulate this provider's engine publishing a new current theme */
    emitCurrentTheme: (currentTheme: TestTheme) =>
      [...currentThemeCallbacks].forEach((callback) => callback(currentTheme)),
    /** How many live current-theme subscriptions this provider is serving */
    currentThemeSubscriberCount: () => currentThemeCallbacks.length,
    unsubscribeCurrentTheme,
  };
}

// The theme is app-global — one current theme for the whole app — so exactly one renderer hosts the
// engine no matter how many windows are open. These tests cover which window ends up hosting it.
describe('theme service host across multiple windows', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    stubSystemTheme(false);
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

  // `getCurrentThemeSync` answers out of this window's own engine object, which serves nobody while
  // this window is attached and hears nothing the hosting window's engine does. Without mirroring
  // the host's theme onto it, every synchronous read in an attached window answers with whatever
  // this window loaded at startup, for as long as the window stays attached.
  test('an attached window answers synchronous theme reads with the hosting window current theme', async () => {
    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize, localThemeService } = await import('@renderer/services/theme.service-host');
    await initialize();

    const themeFromHost: TestTheme = {
      themeFamilyId: 'extensionFamily',
      type: 'dark',
      label: 'Extension Dark',
      cssVariables: { background: 'black' },
    };
    hosted.emitCurrentTheme(themeFromHost);

    expect(localThemeService.getCurrentThemeSync()).toEqual(themeFromHost);
  });

  // The persisted theme keys are app-global and the hosting window owns writing them. A window that
  // is only mirroring what it was told must not write back, or it would overwrite the state it was
  // told about with a copy of itself and race the host on every change.
  test('mirroring the hosting window current theme persists nothing', async () => {
    const persistedTheme: TestTheme = {
      themeFamilyId: 'extensionFamily',
      type: 'light',
      label: 'Extension Light',
      cssVariables: {},
    };
    localStorage.setItem('theme.service-host.currentTheme', JSON.stringify(persistedTheme));

    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize, localThemeService } = await import('@renderer/services/theme.service-host');
    await initialize();

    const themeFromHost: TestTheme = {
      themeFamilyId: 'extensionFamily',
      type: 'dark',
      label: 'Extension Dark',
      cssVariables: {},
    };
    hosted.emitCurrentTheme(themeFromHost);

    expect(localThemeService.getCurrentThemeSync()).toEqual(themeFromHost);
    expect(localStorage.getItem('theme.service-host.currentTheme')).toBe(
      JSON.stringify(persistedTheme),
    );
  });

  // Once this window hosts the engine itself, its own engine is the source of truth. A mirror still
  // subscribed to the window that closed would be reporting a dead provider's failures on every
  // theme change, and anything it did deliver would be pre-close state.
  test('the mirror of the hosting window current theme is dropped when this window takes over', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize, localThemeService } = await import('@renderer/services/theme.service-host');
    await initialize();

    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);
    hosted.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));
    await settlePendingWork();

    expect(hosted.unsubscribeCurrentTheme).toHaveBeenCalled();

    // Anything still in flight from the window that closed must not land on the engine this window
    // is now serving to everyone else
    const themeFromClosedWindow: TestTheme = {
      themeFamilyId: 'extensionFamily',
      type: 'dark',
      label: 'Extension Dark',
      cssVariables: {},
    };
    hosted.emitCurrentTheme(themeFromClosedWindow);

    expect(localThemeService.getCurrentThemeSync()).not.toEqual(themeFromClosedWindow);
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
    hosted.dispose();
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

  // A window can lose the engine's host again while it is still re-entering the race for the last
  // one. That trigger is about a death the running attempt started too early to have seen, so
  // dropping it leaves the app with no theme engine at all.
  test('a trigger raised during an in-flight retry gets a run of its own', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    // Hold this window's re-registration in flight so the next trigger lands mid-run
    let settleRetryRegistration = () => {};
    mocks.registerEngine.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          settleRetryRegistration = () => reject(new Error('already registered'));
        }),
    );
    // The window that won the race in the meantime is the one closing next, so this run finds no
    // engine to attach to either
    mocks.get.mockResolvedValue(undefined);

    hosted.dispose();
    await settlePendingWork();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(2);

    hosted.dispose();
    await settlePendingWork();
    // Still the one in-flight attempt: concurrent triggers must not race each other for the name
    expect(mocks.registerEngine).toHaveBeenCalledTimes(2);

    const { provider: ownProvider } = makeProvider();
    settleRetryRegistration();
    mocks.registerEngine.mockResolvedValue(ownProvider);

    // The run settles having found nothing, so the trigger it swallowed has to be answered
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(3));
  });

  // Every surviving window reloads the persisted state when a host closes, including the N-1 that
  // go on to lose the race. Those keys are app-global, so a reload that writes anything back
  // overwrites the very state it was called to pick up.
  test('reloading persisted state while taking over does not write it back', async () => {
    const themeLight = {
      themeFamilyId: 'extensionFamily',
      type: 'light',
      label: 'Extension Light',
      cssVariables: {},
    };
    const themeDark = {
      themeFamilyId: 'extensionFamily',
      type: 'dark',
      label: 'Extension Dark',
      cssVariables: {},
    };
    // The system is in dark mode, so a reload that picks up "match the system theme" reconciles the
    // freshly loaded light theme to its dark sibling
    stubSystemTheme(true);
    localStorage.setItem('theme.service-host.currentTheme', JSON.stringify(themeDark));
    localStorage.setItem('theme.service-host.shouldMatchSystem', 'false');

    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    publishExtensionThemes({ extensionFamily: { light: themeLight, dark: themeDark } });
    // Nothing has been written back so far: the loaded theme is the one the payload serves
    expect(localStorage.getItem('theme.service-host.currentTheme')).toBe(JSON.stringify(themeDark));

    // The hosting window persists the user switching to the light theme with system matching on,
    // and then closes
    localStorage.setItem('theme.service-host.currentTheme', JSON.stringify(themeLight));
    localStorage.setItem('theme.service-host.shouldMatchSystem', 'true');
    hosted.dispose();
    await settlePendingWork();

    // This window lost the race to host, so what it read must still be what is persisted
    expect(localStorage.getItem('theme.service-host.currentTheme')).toBe(
      JSON.stringify(themeLight),
    );
    expect(localStorage.getItem('theme.service-host.shouldMatchSystem')).toBe('true');
  });

  // A window that loses the engine's host attaches to whichever window won the race that followed,
  // and has to be able to take over again when that one goes away too. The re-arm must not latch
  // after the first handover.
  test('a window that attached again takes the engine over when that host goes away too', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted1 = makeProvider();
    mocks.get.mockResolvedValue(hosted1.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();
    expect(mocks.registerEngine).toHaveBeenCalledTimes(1);

    // Hold the retry's registration in flight so the run started by the first trigger is still
    // settling while the assertions below run.
    let settleRetryRegistration = () => {};
    mocks.registerEngine.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => {
          settleRetryRegistration = () => reject(new Error('already registered'));
        }),
    );
    const hosted2 = makeProvider();
    mocks.get.mockResolvedValue(hosted2.provider);

    hosted1.dispose();
    await settlePendingWork();

    expect(mocks.registerEngine).toHaveBeenCalledTimes(2);

    // The in-flight run settles by losing the race to another surviving window and attaching
    settleRetryRegistration();
    await vi.waitFor(() => expect(mocks.get).toHaveBeenCalledTimes(2));
    await settlePendingWork();

    // The guard must not latch: when the window that won that race goes away later, this window
    // re-enters the race again.
    const { provider: ownProvider } = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownProvider);

    hosted2.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(3));
  });

  // A data provider subscription re-fetches through the provider object it was created with, and
  // the provider an attached window holds is revoked when the window hosting it closes. Update
  // events keep arriving — they travel on a network event named after the provider, and the window
  // that takes the engine over publishes it under that same name — so a subscription made before
  // the handover would go on reporting a revoked provider's failure on every theme change and never
  // deliver another theme.
  test('a current-theme subscription follows the engine to the window that takes it over', async () => {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize, localThemeService } = await import('@renderer/services/theme.service-host');
    await initialize();

    const themesReceived: TestTheme[] = [];
    await localThemeService.subscribeCurrentTheme(undefined, (currentTheme) => {
      // The subscriber's job here is only to record what it was handed
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      themesReceived.push(currentTheme as TestTheme);
    });

    const ownEngine = makeProvider();
    mocks.registerEngine.mockResolvedValue(ownEngine.provider);
    hosted.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));

    // The subscription is re-established against the engine this window now hosts
    await vi.waitFor(() => expect(ownEngine.provider.subscribeCurrentTheme).toHaveBeenCalled());

    const themeAfterTakeover: TestTheme = {
      themeFamilyId: 'extensionFamily',
      type: 'dark',
      label: 'Extension Dark',
      cssVariables: {},
    };
    ownEngine.emitCurrentTheme(themeAfterTakeover);

    expect(themesReceived).toContainEqual(themeAfterTakeover);
    // The subscription to the window that closed is gone, so its failures stop reaching the
    // subscriber rather than being reported on every change for the rest of the session
    expect(hosted.currentThemeSubscriberCount()).toBe(0);
  });

  test('surfaces the failure when there is no engine to host or attach to', async () => {
    mocks.registerEngine.mockRejectedValue(new Error('already registered'));
    mocks.get.mockResolvedValue(undefined);

    const { initialize } = await import('@renderer/services/theme.service-host');

    // The message says which state this is — lost the race, and could not find the window that won
    // it — rather than only that something was undefined
    await expect(initialize()).rejects.toThrow('no theme service to attach to');
  });

  /**
   * Drive a window from attached, through a takeover attempt that comes up empty-handed — it loses
   * the name to a window that goes away before it can be found — and return the provider the window
   * will be handed when it eventually wins.
   */
  async function attachThenLoseTheEngineToNobody() {
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    const hosted = makeProvider();
    mocks.get.mockResolvedValue(hosted.provider);

    const { initialize } = await import('@renderer/services/theme.service-host');
    await initialize();

    // The hosting window closes. This window's re-race loses the name, and by the time it looks for
    // the window that took it, that window is gone too — so this run ends with no engine at all.
    mocks.registerEngine.mockRejectedValueOnce(new Error('already registered'));
    mocks.get.mockResolvedValue(undefined);
    hosted.dispose();
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(2));

    return makeProvider().provider;
  }

  // Coming out of a takeover with nothing is the one state nothing else re-enters the race from:
  // the trigger is the disposal of the provider this window holds, and it holds none. If every
  // surviving window lands here — which is what an interleaved re-race does — the app has no theme
  // engine at all, while `getCurrentThemeSync` keeps every screen looking right.
  test('races again after a takeover attempt that neither hosted nor attached', async () => {
    const ownProvider = await attachThenLoseTheEngineToNobody();

    mocks.registerEngine.mockResolvedValue(ownProvider);

    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(3), {
      timeout: 4000,
    });
  });

  // The persisted theme keys are app-global, so the engine a window publishes has to be built from
  // what is persisted at the moment it wins — on every route into the race, not only the one route
  // that reloads on its way in. A window that wins on a later attempt would otherwise republish the
  // snapshot it read at window load and persist it over everything saved since.
  test('serves the state persisted by the time a later attempt wins the engine', async () => {
    localStorage.setItem(
      'theme.service-host.currentTheme',
      JSON.stringify({ themeFamilyId: 'user-stale', type: 'light', cssVariables: {} }),
    );
    const ownProvider = await attachThenLoseTheEngineToNobody();

    // Whoever briefly held the name saved newer state before going away too
    localStorage.setItem(
      'theme.service-host.currentTheme',
      JSON.stringify({ themeFamilyId: 'user-fresh', type: 'light', cssVariables: {} }),
    );
    mocks.registerEngine.mockResolvedValue(ownProvider);
    await vi.waitFor(() => expect(mocks.registerEngine).toHaveBeenCalledTimes(3), {
      timeout: 4000,
    });

    const engineTakingOver: { getCurrentTheme: () => Promise<{ themeFamilyId: string }> } =
      mocks.registerEngine.mock.calls[2][1];
    expect((await engineTakingOver.getCurrentTheme()).themeFamilyId).toBe('user-fresh');
  });
});
