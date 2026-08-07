import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import {
  CURRENT_THEME_STORAGE_KEY,
  PersistedThemeState,
  SHOULD_MATCH_SYSTEM_STORAGE_KEY,
  USER_THEMES_STORAGE_KEY,
} from '@shared/services/theme.service-model';
import { ThemeDefinitionExpanded, ThemeFamiliesByIdExpanded } from 'platform-bible-utils';

// The host reads the OS dark-mode preference through Electron's `nativeTheme` and publishes the
// theme as a data provider. Both are stubbed so a test can drive the OS preference directly and
// reach the registered engine.
const { nativeThemeMock, appMock, registerEngine, subscribeAllThemes, allThemesHandlers } =
  vi.hoisted(() => {
    const handlers: ((allThemes: unknown) => void)[] = [];
    const nativeThemeUpdatedHandlers: (() => void)[] = [];
    return {
      allThemesHandlers: handlers,
      nativeThemeMock: {
        shouldUseDarkColors: false,
        updatedHandlers: nativeThemeUpdatedHandlers,
        on: (_eventName: string, handler: () => void) => {
          nativeThemeUpdatedHandlers.push(handler);
        },
      },
      appMock: { whenReady: vi.fn(async () => undefined) },
      registerEngine: vi.fn(),
      subscribeAllThemes: vi.fn(
        async (_selector: unknown, handler: (allThemes: unknown) => void) => {
          handlers.push(handler);
          return async () => true;
        },
      ),
    };
  });

vi.mock('electron', () => ({ app: appMock, nativeTheme: nativeThemeMock }));
vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { registerEngine },
}));
vi.mock('@shared/services/theme-data.service', () => ({
  themeDataService: { subscribeAllThemes },
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

/** Stand in for the user flipping the OS dark-mode preference */
function setSystemDarkMode(isDark: boolean) {
  nativeThemeMock.shouldUseDarkColors = isDark;
  [...nativeThemeMock.updatedHandlers].forEach((handler) => handler());
}

/** Start the host and hand back the engine it registered */
async function startHost() {
  const host = await import('@main/services/theme.service-host');
  await host.startThemeServiceHost();
  const engine: RegisteredThemeEngine = registerEngine.mock.calls[0][1];
  return { host, engine };
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

  it('refuses an offer once this process already has stored theme state', async () => {
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
  it('has nothing to hand a window while the theme is still only in a renderer store', async () => {
    const { host } = await startHost();

    expect(host.getCurrentThemeForNewWindow()).toBeUndefined();
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
    // before main.ts's own `app.whenReady()` handler runs.
    await startHost();

    expect(appMock.whenReady).toHaveBeenCalled();
  });
});
