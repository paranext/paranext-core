import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import {
  CURRENT_THEME_STORAGE_KEY,
  PersistedThemeState,
  SHOULD_MATCH_SYSTEM_STORAGE_KEY,
  USER_THEMES_STORAGE_KEY,
} from '@shared/services/theme.service-model';
import {
  newPlatformError,
  ThemeDefinitionExpanded,
  ThemeFamiliesById,
  ThemeFamiliesByIdExpanded,
} from 'platform-bible-utils';

// The host reads the OS dark-mode preference through Electron's `nativeTheme` and publishes the
// theme as a data provider. Both are stubbed so a test can drive the OS preference directly and
// reach the registered engine.
const {
  nativeThemeMock,
  appMock,
  registerEngine,
  subscribeAllThemes,
  allThemesHandlers,
  networkObjectCreatedHandlers,
} = vi.hoisted(() => {
  const handlers: ((allThemes: unknown) => void)[] = [];
  const nativeThemeUpdatedHandlers: (() => void)[] = [];
  const createdHandlers: ((details: { id: string }) => void)[] = [];
  return {
    allThemesHandlers: handlers,
    networkObjectCreatedHandlers: createdHandlers,
    nativeThemeMock: {
      shouldUseDarkColors: false,
      updatedHandlers: nativeThemeUpdatedHandlers,
      on: (_eventName: string, handler: () => void) => {
        nativeThemeUpdatedHandlers.push(handler);
      },
    },
    appMock: { whenReady: vi.fn(async (): Promise<void> => undefined) },
    registerEngine: vi.fn(),
    subscribeAllThemes: vi.fn(async (_selector: unknown, handler: (allThemes: unknown) => void) => {
      handlers.push(handler);
      return async () => true;
    }),
  };
});

vi.mock('electron', () => ({ app: appMock, nativeTheme: nativeThemeMock }));
vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine },
}));
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: { subscribeAllThemes },
}));
vi.mock('@shared/services/network-object.service', () => ({
  onDidCreateNetworkObject: (handler: (details: { id: string }) => void) => {
    networkObjectCreatedHandlers.push(handler);
    return () => true;
  },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/** The slice of the registered engine these tests drive */
type RegisteredThemeEngine = {
  getCurrentTheme: () => Promise<ThemeDefinitionExpanded>;
  setCurrentTheme: (specifier: { themeFamilyId?: string; type?: string }) => Promise<unknown>;
  getShouldMatchSystem: () => Promise<boolean>;
  setShouldMatchSystem: (shouldMatchSystem: boolean) => Promise<unknown>;
  getAllThemes: () => Promise<ThemeFamiliesByIdExpanded>;
  setAllThemes: (userThemes: ThemeFamiliesById) => Promise<unknown>;
  migrateStoredThemeState: (state: PersistedThemeState) => Promise<boolean>;
};

function makeTheme(themeFamilyId: string, type: string): ThemeDefinitionExpanded {
  return {
    themeFamilyId,
    type,
    id: `${themeFamilyId}-${type}`,
    label: `%theme_${themeFamilyId}_${type}%`,
    cssVariables: {},
  };
}

const TEST_LIGHT = makeTheme('testFamily', 'light');
const TEST_DARK = makeTheme('testFamily', 'dark');

/** Stand in for the theme data service publishing the extension-contributed theme families */
function publishExtensionThemes(allThemes: ThemeFamiliesByIdExpanded) {
  allThemesHandlers.forEach((handler) => handler(allThemes));
}

/** Stand in for the theme data service answering with an error instead of a theme list */
function publishThemeListError(message: string) {
  const platformError = newPlatformError(message);
  allThemesHandlers.forEach((handler) => handler(platformError));
}

/** Stand in for the user flipping the OS dark-mode preference */
function setSystemDarkMode(isDark: boolean) {
  nativeThemeMock.shouldUseDarkColors = isDark;
  [...nativeThemeMock.updatedHandlers].forEach((handler) => handler());
}

/** Stand in for a network object being registered anywhere on the network */
function announceNetworkObject(id: string) {
  [...networkObjectCreatedHandlers].forEach((handler) => handler({ id }));
}

/** The network object id the theme data provider is registered under */
const THEME_DATA_PROVIDER_OBJECT_ID = 'platform.themeDataServiceDataProvider-data';

/**
 * The host's key for "this process holds theme state a user chose" — its own key rather than the
 * presence of the value keys, because the host also writes those on its own
 */
const HAS_USER_THEME_STATE_KEY = 'theme.service-host.hasUserThemeState';

/** Start the host and hand back the engine it registered */
async function startHost() {
  const host = await import('@main/services/theme.service-host');
  await host.startThemeServiceHost();
  const engine: RegisteredThemeEngine =
    registerEngine.mock.calls[registerEngine.mock.calls.length - 1][1];
  return { host, engine };
}

/**
 * Start the app again on the store the last run left behind: a fresh module graph, the same
 * `localStorage`. What a restart carries forward is exactly what is persisted.
 */
async function restartHost() {
  vi.resetModules();
  allThemesHandlers.length = 0;
  nativeThemeMock.updatedHandlers.length = 0;
  networkObjectCreatedHandlers.length = 0;
  return startHost();
}

/** Let the queued promise callbacks behind a resubscribe run */
async function settlePendingWork() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  // The host writes its store on a debounce timer, so every test in this file runs on a clock it
  // controls: without that, a write scheduled by one test lands in the middle of another.
  vi.useFakeTimers();
  localStorage.clear();
  vi.resetModules();
  registerEngine.mockReset();
  registerEngine.mockResolvedValue({ onDidDispose: vi.fn() });
  allThemesHandlers.length = 0;
  nativeThemeMock.updatedHandlers.length = 0;
  networkObjectCreatedHandlers.length = 0;
  subscribeAllThemes.mockClear();
  nativeThemeMock.shouldUseDarkColors = false;
  Object.values(logger).forEach((logMock) => vi.mocked(logMock).mockClear());
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// Main's event loop is the JSON-RPC server every other process talks through, and each store write
// is a synchronous fsync on it, so the store is written lazily and memory is what everything reads.
describe('persisting the theme state', () => {
  it('writes once for a run of theme edits rather than once per edit', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });
    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'light' });
    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });

    // Each write is a synchronous fsync on the event loop every other process talks through, so
    // dragging a colour picker must not put one between every window and the platform per frame.
    expect(setItem).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(setItem.mock.calls.filter(([key]) => key === CURRENT_THEME_STORAGE_KEY)).toHaveLength(1);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('"type":"dark"');
  });

  it('writes the current state when the app is shutting down', async () => {
    const { host, engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });

    // Quitting right after changing the theme is something users do on purpose, so the lag the
    // debounce introduces has to be closed on the way down rather than lost.
    host.flushPersistedThemeState();

    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('"type":"dark"');
  });

  it('keeps serving the theme when the store cannot be written', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('disk full');
    });

    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });

    // A store that cannot be written costs the next restart its theme, not this session its
    // correctness.
    expect((await engine.getCurrentTheme()).type).toBe('dark');
    expect(() => vi.advanceTimersByTime(1000)).not.toThrow();
    expect(logger.error).toHaveBeenCalled();
  });
});

describe('starting with an unreadable store', () => {
  it('starts on the default theme rather than stopping the app from starting', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, '{ this is not serialized state');

    // This module is evaluated inside main.ts's import graph, before any window or error dialog, so
    // a throw here is an app that does not start with nothing to tell the user why.
    const { engine } = await startHost();

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('');
    expect(logger.error).toHaveBeenCalled();
  });
});

// The OS dark-mode preference is one thing about the machine, not one thing per window, so main
// reads it once through `nativeTheme` instead of every renderer running its own media query.
describe('following the OS dark-mode preference', () => {
  it('flips the current theme to its dark sibling when the OS goes dark', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    expect((await engine.getCurrentTheme()).type).toBe('light');

    setSystemDarkMode(true);

    expect((await engine.getCurrentTheme()).type).toBe('dark');
  });

  it('leaves the theme alone when the user has turned system matching off', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    localStorage.setItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY, 'false');
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });

    setSystemDarkMode(true);

    expect((await engine.getCurrentTheme()).type).toBe('light');
  });
});

// Main cannot read a renderer's `localStorage`, so a profile from before the host moved here has to
// hand its theme over once.
describe('adopting theme state stored before the host moved to main', () => {
  const offeredState: PersistedThemeState = {
    currentTheme: TEST_DARK,
    shouldMatchSystem: false,
    userThemes: { 'user-0': { light: { label: '%mine%', cssVariables: { primary: 'red' } } } },
  };

  it('adopts what a window offers when it has no theme state of its own', async () => {
    const { engine } = await startHost();

    const didAdopt = await engine.migrateStoredThemeState(offeredState);

    expect(didAdopt).toBe(true);
    expect((await engine.getCurrentTheme()).type).toBe('dark');
    expect(await engine.getShouldMatchSystem()).toBe(false);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('"type":"dark"');
    expect(localStorage.getItem(USER_THEMES_STORAGE_KEY)).toContain('red');
  });

  it('refuses a second offer so several windows cannot interleave into a mixture', async () => {
    const { engine } = await startHost();
    await engine.migrateStoredThemeState(offeredState);

    const didAdoptAgain = await engine.migrateStoredThemeState({
      currentTheme: makeTheme('otherFamily', 'light'),
    });

    expect(didAdoptAgain).toBe(false);
    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');
  });

  it('refuses an offer once the user has chosen a theme in this process', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    // The theme the user last chose has to beat the one they left behind before any of this
    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'light' });

    const didAdopt = await engine.migrateStoredThemeState(offeredState);

    expect(didAdopt).toBe(false);
    expect((await engine.getCurrentTheme()).type).toBe('light');
  });

  it('refuses an offer once this process has stored theme state a user chose', async () => {
    // An earlier offer failed to arrive, but the app has been used since: the theme the user last
    // chose has to beat the one they left behind before any of this
    localStorage.setItem(HAS_USER_THEME_STATE_KEY, 'true');
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();

    expect(await engine.migrateStoredThemeState(offeredState)).toBe(false);
  });

  it('writes everything it adopted before recording that the migration ran', async () => {
    const { engine } = await startHost();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await engine.migrateStoredThemeState(offeredState);

    // One file per key with no atomicity across them: recording "already migrated" first can leave
    // a profile permanently flagged as done with nothing migrated.
    const writtenKeys = setItem.mock.calls.map(([key]) => key);
    expect(writtenKeys).toContain(CURRENT_THEME_STORAGE_KEY);
    expect(writtenKeys).toContain(SHOULD_MATCH_SYSTEM_STORAGE_KEY);
    expect(writtenKeys).toContain(USER_THEMES_STORAGE_KEY);
    expect(writtenKeys[writtenKeys.length - 1]).toBe('theme.service-host.didMigrateStoredState');
  });

  it('refuses state that is not shaped like theme state rather than storing it', async () => {
    const { engine } = await startHost();

    // Arrives over the network from another process's store and is about to become this store's
    // contents for the life of the profile
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const didAdopt = await engine.migrateStoredThemeState({
      currentTheme: 'not a theme',
    } as unknown as PersistedThemeState);

    expect(didAdopt).toBe(false);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toBeNull();
  });
});

// A window is handed the current theme on its URL so its first frame is painted with it; main omits
// it when it has nothing to hand over.
describe('the theme for a new window', () => {
  it('has nothing to hand a window while it is on the theme the window falls back to anyway', async () => {
    const { host } = await startHost();

    expect(host.getCurrentThemeForNewWindow()).toBeUndefined();
  });

  // Asks "do I have a theme worth handing over?", NOT "did the user choose one?" — a theme derived
  // from the machine's dark-mode preference is the theme the app is on, and a window that is not
  // told about it paints light and flashes.
  it('hands over a theme it derived from the OS preference, which no user chose', async () => {
    nativeThemeMock.shouldUseDarkColors = true;
    const { host } = await startHost();

    publishExtensionThemes({ '': { light: makeTheme('', 'light'), dark: makeTheme('', 'dark') } });

    expect(host.getCurrentThemeForNewWindow()?.type).toBe('dark');
  });

  it('hands over a theme change that has not reached the store yet', async () => {
    const { host, engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });

    // Deliberately no flush: a window created moments after a theme change must still be told about
    // it, so this reads memory rather than the store.
    expect(host.getCurrentThemeForNewWindow()?.type).toBe('dark');
  });

  it('hands over what it adopted from a window that had stored state', async () => {
    const { host, engine } = await startHost();
    await engine.migrateStoredThemeState({ currentTheme: TEST_DARK });

    expect(host.getCurrentThemeForNewWindow()?.type).toBe('dark');
  });
});

describe('registration', () => {
  it('registers the data provider with only the migration method marked experimental', async () => {
    const { host } = await startHost();

    expect(registerEngine).toHaveBeenCalledTimes(1);
    const [name, , , , documentation] = registerEngine.mock.calls[0];
    expect(name).toBe('platform.themeServiceDataProvider');
    expect(documentation['x-experimental']).toBeUndefined();
    const experimentalMethodNames = documentation.methods
      .filter((method: { 'x-experimental'?: boolean }) => method['x-experimental'])
      .map((method: { name: string }) => method.name);
    expect(experimentalMethodNames).toEqual(['migrateStoredThemeState']);
    expect(host.getCurrentThemeSync()).toBeDefined();
  });

  it('waits for Electron to be ready before reading the OS dark-mode preference', async () => {
    // `nativeTheme` is unusable before the app's `ready` event, and startup reaches the host well
    // before main.ts's own `app.whenReady()` handler runs. Asserting the ORDER, not just the call:
    // moving the wait below the engine's construction would leave this reading `nativeTheme` too
    // early, which is the thing the wait is for.
    let markElectronReady = () => {};
    appMock.whenReady.mockImplementationOnce(
      async () =>
        new Promise<void>((resolve) => {
          markElectronReady = () => resolve();
        }),
    );
    const readDarkMode = vi.spyOn(nativeThemeMock, 'shouldUseDarkColors', 'get');

    const host = await import('@main/services/theme.service-host');
    const starting = host.startThemeServiceHost();
    await settlePendingWork();

    expect(readDarkMode).not.toHaveBeenCalled();

    markElectronReady();
    await starting;

    expect(readDarkMode).toHaveBeenCalled();
  });
});

// The theme list is published by the EXTENSION HOST, which this process spawns only after its own
// app-global services have started and which `platform.restartExtensionHost` can replace at any
// time. The subscription is therefore taken whenever that provider appears, not once and hoped for.
describe('keeping up with the extension host theme contributions', () => {
  it('subscribes when the theme data provider appears after this process started', async () => {
    subscribeAllThemes.mockRejectedValueOnce(new Error('the extension host has not registered it'));
    const { engine } = await startHost();
    expect(await engine.getAllThemes()).toEqual({});

    announceNetworkObject(THEME_DATA_PROVIDER_OBJECT_ID);
    await settlePendingWork();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });

    // Without this the app has no theme list at all for the session: nothing else would ever ask
    expect(await engine.getAllThemes()).toHaveProperty('testFamily');
  });

  it('takes the subscription again when the extension host is restarted', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });

    // `platform.restartExtensionHost`: the old provider goes away and a new one registers
    announceNetworkObject(THEME_DATA_PROVIDER_OBJECT_ID);
    await settlePendingWork();

    expect(subscribeAllThemes.mock.calls.length).toBeGreaterThan(1);
    publishExtensionThemes({ otherFamily: { light: makeTheme('otherFamily', 'light') } });
    expect(await engine.getAllThemes()).toHaveProperty('otherFamily');
  });

  it('does not hold up startup waiting for a provider that does not exist yet', async () => {
    // Resolving a data provider that is not registered spends the whole RPC retry budget — ten
    // attempts a second apart — before answering, and on a cold start it never is registered: the
    // extension host that registers it has not been spawned. Everything main awaits after this
    // batch, including the .NET and extension-host spawns, would wait behind it.
    subscribeAllThemes.mockImplementation(
      async () =>
        new Promise<() => Promise<boolean>>(() => {
          // Never settles: stands in for the retry budget being spent
        }),
    );

    const host = await import('@main/services/theme.service-host');
    await host.startThemeServiceHost();

    expect(registerEngine).toHaveBeenCalled();
  });

  it('ignores every other network object', async () => {
    await startHost();
    const subscribeCallsAfterStart = subscribeAllThemes.mock.calls.length;

    announceNetworkObject('platform.someOtherService');
    await settlePendingWork();

    expect(subscribeAllThemes.mock.calls.length).toBe(subscribeCallsAfterStart);
  });
});

// The current theme can only be checked against a theme list, and that list arrives when the
// extension host publishes it — which this process does not control and cannot bound.
describe('resetting a theme that no longer exists', () => {
  it('does not reset an extension theme just because this process started slowly', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();

    // A slow start — a cold disk, an antivirus scan, a dev build. The theme data provider publishes
    // its first payload when the extension host initialises, BEFORE the extensions that contribute
    // themes have loaded, so that payload never contains an extension's theme however complete the
    // list eventually becomes. Measuring this process's age resets the user's theme here, and
    // persists the reset.
    await vi.advanceTimersByTimeAsync(60_000);
    publishExtensionThemes({ '': { light: makeTheme('', 'light') } });
    await vi.advanceTimersByTimeAsync(1000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('testFamily');
  });

  it('does not reset the theme when the theme list never arrived at all', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    // The subscription delivered an error rather than a list — the theme data provider failed, or
    // the extension host went down under it. "The list does not have this theme" and "there is no
    // list" are different answers, and only the first is evidence the theme is gone.
    publishThemeListError('the theme data provider could not build the theme list');
    await vi.advanceTimersByTimeAsync(120_000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');
    // The reset persists, so a theme thrown away on a payload that never came is not recovered when
    // the extension host does
    expect(setItem.mock.calls.filter(([key]) => key === CURRENT_THEME_STORAGE_KEY)).toHaveLength(0);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('testFamily');
  });

  it('resets once the theme list has had its chance and the theme is still missing', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();

    // The extension host is up and publishing; extensions contributing themes load after it
    publishExtensionThemes({ otherFamily: { light: makeTheme('otherFamily', 'light') } });
    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');

    await vi.advanceTimersByTimeAsync(120_000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('');
  });

  it('does not reset the theme when a restarted extension host publishes before its extensions load', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();

    // A whole session's worth of a complete list: long past any window measured from the first
    // payload ever
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await vi.advanceTimersByTimeAsync(120_000);

    // `platform.restartExtensionHost`, or the dev build's extension-host file watcher. The
    // replacement host registers the theme data provider at its own init, before any extension has
    // loaded, and the subscription's immediate payload is that extension-less list.
    announceNetworkObject(THEME_DATA_PROVIDER_OBJECT_ID);
    await settlePendingWork();

    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    publishExtensionThemes({ '': { light: makeTheme('', 'light') } });
    await vi.advanceTimersByTimeAsync(1000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');
    // A reset here is persisted, so the complete list arriving seconds later would not undo it
    expect(setItem.mock.calls.filter(([key]) => key === CURRENT_THEME_STORAGE_KEY)).toHaveLength(0);

    // The extensions finish loading and the list is complete again, well inside the window
    publishExtensionThemes({
      testFamily: { light: TEST_LIGHT, dark: TEST_DARK },
      '': { light: makeTheme('', 'light') },
    });
    await vi.advanceTimersByTimeAsync(120_000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');
    expect(setItem.mock.calls.filter(([key]) => key === CURRENT_THEME_STORAGE_KEY)).toHaveLength(0);
  });

  it('still resets after an extension host restart when the theme really is gone', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(TEST_LIGHT));
    const { engine } = await startHost();

    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await vi.advanceTimersByTimeAsync(120_000);

    announceNetworkObject(THEME_DATA_PROVIDER_OBJECT_ID);
    await settlePendingWork();

    // Same shape as above, but this time the family is gone for good — the user uninstalled the
    // extension that contributed it, and no later payload brings it back
    publishExtensionThemes({ '': { light: makeTheme('', 'light') } });
    await vi.advanceTimersByTimeAsync(1000);

    // The payload that dropped the family starts the window; it does not end it
    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('testFamily');

    await vi.advanceTimersByTimeAsync(120_000);

    expect((await engine.getCurrentTheme()).themeFamilyId).toBe('');
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('"themeFamilyId":""');
  });
});

// What makes the host refuse a migration offer has to be evidence of a USER action. The engine also
// writes on its own while the theme list catches up — matching the machine's dark-mode preference,
// picking up a changed definition — and those writes say nothing about what the user picked.
describe('telling this process own theme state from what it derived', () => {
  const offeredState: PersistedThemeState = {
    currentTheme: TEST_DARK,
    shouldMatchSystem: false,
    userThemes: { 'user-0': { light: { label: '%mine%', cssVariables: { primary: 'red' } } } },
  };

  it('still adopts an offer after a run in which it only ever wrote what it derived', async () => {
    // A dark-mode machine: the engine matches the theme type to the system and persists the result
    // on the very first start, before the user has touched anything
    nativeThemeMock.shouldUseDarkColors = true;
    await startHost();
    publishExtensionThemes({ '': { light: makeTheme('', 'light'), dark: makeTheme('', 'dark') } });
    await vi.advanceTimersByTimeAsync(1000);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).not.toBeNull();

    // The window's offer failed to land last time, so it is made again. Refusing it here would
    // delete the user's themes: the offering window discards its copy on a refusal.
    const { engine } = await restartHost();

    expect(await engine.migrateStoredThemeState(offeredState)).toBe(true);
    expect(localStorage.getItem(USER_THEMES_STORAGE_KEY)).toContain('red');
  });

  it('refuses an offer on the next start once the user has chosen a theme', async () => {
    const first = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await first.engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });
    await vi.advanceTimersByTimeAsync(1000);

    const { engine } = await restartHost();

    expect(await engine.migrateStoredThemeState(offeredState)).toBe(false);
  });

  it('writes the user themes before anything it could derive again', async () => {
    const { engine } = await startHost();
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await engine.migrateStoredThemeState(offeredState);

    // A crash part-way through leaves the profile un-migrated and the offer is made again, so the
    // order only decides what is lost if the retry never happens — and the user themes are the one
    // thing this process could never derive for itself.
    const writtenKeys = setItem.mock.calls.map(([key]) => key);
    expect(writtenKeys[0]).toBe(USER_THEMES_STORAGE_KEY);
    expect(writtenKeys[writtenKeys.length - 1]).toBe('theme.service-host.didMigrateStoredState');
  });

  it('rejects rather than refusing when it cannot store what it adopted', async () => {
    const { engine } = await startHost();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('disk full');
    });

    // A caller told "refused" discards its copy; this is the one outcome where its copy is still
    // the only durable one, so it has to be told something else
    await expect(engine.migrateStoredThemeState(offeredState)).rejects.toThrow('disk full');
    expect(logger.error).toHaveBeenCalled();
  });

  it('writes the theme a user chose before the marker that vouches for it', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });
    await vi.advanceTimersByTimeAsync(1000);

    // One file per key with no atomicity across them, so the marker has to be last for the same
    // reason the migration writes it last: a marker that lands first and a value write that then
    // fails leaves the next start reading "this process holds state a user chose" with nothing
    // stored, which refuses a renderer's still-pending handover and deletes it.
    const writtenKeys = setItem.mock.calls.map(([key]) => key);
    expect(writtenKeys).toContain(CURRENT_THEME_STORAGE_KEY);
    expect(writtenKeys[writtenKeys.length - 1]).toBe(HAS_USER_THEME_STATE_KEY);
  });

  it('leaves no marker behind when the theme it vouches for could not be written', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    const realSetItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function failTheThemeWrite(
      this: Storage,
      key: string,
      value: string,
    ) {
      if (key === CURRENT_THEME_STORAGE_KEY) throw new Error('disk full');
      realSetItem.call(this, key, value);
    });

    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });
    await vi.advanceTimersByTimeAsync(1000);

    // A marker with no theme under it is the state that refuses a handover that has not happened
    // yet, so the store must never be left in it.
    expect(localStorage.getItem(HAS_USER_THEME_STATE_KEY)).toBeNull();
    expect(logger.error).toHaveBeenCalled();
  });

  it('rejects the NEXT offer too rather than refusing it after a failed store', async () => {
    const { engine } = await startHost();
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('disk full');
    });

    await expect(engine.migrateStoredThemeState(offeredState)).rejects.toThrow('disk full');

    // A second window offers the same pre-host state. "Refused" is not an answer this process may
    // give while nothing has been stored: every window's renderer shares one `localStorage` for the
    // profile, so the window told "refused" drops the profile's only remaining copy — including the
    // user-defined theme families, which exist nowhere else. A rejection is what keeps it.
    await expect(engine.migrateStoredThemeState(offeredState)).rejects.toThrow('disk full');

    // And the one-time migration was not spent on the failure: once the store works, the offer is
    // still adopted rather than the profile being latched into "already migrated" with nothing
    // migrated.
    setItem.mockRestore();
    expect(await engine.migrateStoredThemeState(offeredState)).toBe(true);
    expect(localStorage.getItem(USER_THEMES_STORAGE_KEY)).toContain('red');
  });
});

// Everything in this process that paints from the theme — the Windows title-bar overlay colours —
// hears about it through one local event, so every assignment of the current theme has to announce.
describe('announcing the current theme to this process own consumers', () => {
  it('announces a theme adopted from a window that had stored state', async () => {
    const { host, engine } = await startHost();
    const themesAnnounced: ThemeDefinitionExpanded[] = [];
    host.onDidChangeCurrentTheme((theme) => themesAnnounced.push(theme));

    await engine.migrateStoredThemeState({ currentTheme: TEST_DARK });

    // The title bar is painted from `ready-to-show`, which is before the offering window's renderer
    // gets as far as offering, so without this it keeps the pre-adoption colours for the session
    expect(themesAnnounced).toContainEqual(TEST_DARK);
  });

  it('tells the other consumers and still persists when one of them throws', async () => {
    const { host, engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    host.onDidChangeCurrentTheme(() => {
      throw new Error('this consumer window is already gone');
    });
    const themesAnnounced: ThemeDefinitionExpanded[] = [];
    host.onDidChangeCurrentTheme((theme) => themesAnnounced.push(theme));

    await engine.setCurrentTheme({ themeFamilyId: 'testFamily', type: 'dark' });
    await vi.advanceTimersByTimeAsync(1000);

    expect(themesAnnounced).toHaveLength(1);
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('"type":"dark"');
    expect(logger.error).toHaveBeenCalled();
  });
});

// Adopting replaces the engine's live state, and the served theme list has to be rebuilt from it —
// from the last payload rather than from the merged list, or a user-defined family that the adopted
// state no longer has would live on in what is served.
describe('rebuilding the served theme list around adopted state', () => {
  it('drops a user-defined family the adopted state does not have', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await engine.setAllThemes({
      'user-3': { light: { label: '%mine%', cssVariables: { primary: 'red' } } },
    });
    expect(await engine.getAllThemes()).toHaveProperty('user-3');
    localStorage.clear();

    const { engine: restarted } = await restartHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    await restarted.migrateStoredThemeState({
      userThemes: { 'user-0': { light: { label: '%theirs%', cssVariables: {} } } },
    });

    const allThemes = await restarted.getAllThemes();
    expect(allThemes).not.toHaveProperty('user-3');
    expect(allThemes).toHaveProperty('user-0');
  });

  it('does not let the rebuild write over what the adoption is persisting', async () => {
    const { engine } = await startHost();
    publishExtensionThemes({ testFamily: { light: TEST_LIGHT, dark: TEST_DARK } });
    const setItem = vi.spyOn(Storage.prototype, 'setItem');

    await engine.migrateStoredThemeState({
      currentTheme: TEST_DARK,
      userThemes: { 'user-0': { light: { label: '%mine%', cssVariables: {} } } },
    });
    await vi.advanceTimersByTimeAsync(1000);

    // The adoption writes every value itself, in an order chosen so an interrupted migration is
    // retried rather than stranded; a debounced write landing afterwards would undo that ordering
    expect(setItem.mock.calls.filter(([key]) => key === CURRENT_THEME_STORAGE_KEY)).toHaveLength(1);
  });
});
