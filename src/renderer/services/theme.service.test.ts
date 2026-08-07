import { beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_STATE_QUERY_PARAMETER } from '@shared/data/platform.data';
import { logger } from '@shared/services/logger.service';
import {
  CURRENT_THEME_STORAGE_KEY,
  SHOULD_MATCH_SYSTEM_STORAGE_KEY,
  USER_THEMES_STORAGE_KEY,
} from '@shared/services/theme.service-model';
import { newPlatformError, ThemeDefinitionExpanded } from 'platform-bible-utils';

// The renderer service is a CACHE over the main-process host: it is seeded from what main put on
// this window's URL, kept current by the host's current-theme subscription, and hands over any
// theme state left in this window's own store from before the host moved to main.
const { dataProviderGet, host, currentThemeSubscribers } = vi.hoisted(() => {
  const subscribers: ((currentTheme: unknown) => void)[] = [];
  return {
    currentThemeSubscribers: subscribers,
    dataProviderGet: vi.fn(),
    host: {
      subscribeCurrentTheme: vi.fn(
        async (_selector: undefined, callback: (currentTheme: unknown) => void) => {
          subscribers.push(callback);
          return async () => true;
        },
      ),
      migrateStoredThemeState: vi.fn(async () => true),
    },
  };
});

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: dataProviderGet },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

function makeTheme(themeFamilyId: string, type: string): ThemeDefinitionExpanded {
  return {
    themeFamilyId,
    type,
    id: `${themeFamilyId}-${type}`,
    label: `%theme_${themeFamilyId}_${type}%`,
    cssVariables: {},
  };
}

const THEME_FROM_MAIN = makeTheme('mainFamily', 'dark');
const THEME_FROM_OWN_STORE = makeTheme('ownFamily', 'dark');

/**
 * Put a theme on this window's URL, the way main does when it creates a window. Must run before the
 * service module is imported — the module reads it while it is being evaluated.
 */
function createWindowWithTheme(theme: ThemeDefinitionExpanded | string) {
  const serialized = typeof theme === 'string' ? theme : JSON.stringify(theme);
  window.history.replaceState(
    {},
    '',
    `/?${THEME_STATE_QUERY_PARAMETER}=${encodeURIComponent(serialized)}`,
  );
}

/** Put theme state in this window's own `localStorage`, as a pre-host profile has */
function storePreviouslyStoredThemeState() {
  localStorage.setItem(CURRENT_THEME_STORAGE_KEY, JSON.stringify(THEME_FROM_OWN_STORE));
  localStorage.setItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY, 'false');
  localStorage.setItem(USER_THEMES_STORAGE_KEY, JSON.stringify({ 'user-0': {} }));
}

/** Stand in for the host announcing a new current theme */
function announceCurrentTheme(theme: unknown) {
  [...currentThemeSubscribers].forEach((subscriber) => subscriber(theme));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
  vi.resetModules();
  localStorage.clear();
  currentThemeSubscribers.length = 0;
  window.history.replaceState({}, '', '/');
  dataProviderGet.mockResolvedValue(host);
  host.migrateStoredThemeState.mockResolvedValue(true);
  Object.values(logger).forEach((logMock) => vi.mocked(logMock).mockClear());
});

// React renders before any service has started, and `getCurrentThemeSync` is what the first frame
// and every web view's baked-in stylesheet are painted with. A cache that could only be filled by a
// round trip would paint the default theme and then flash.
describe('the theme this window paints its first frame with', () => {
  it('uses the theme main handed this window on its URL', async () => {
    createWindowWithTheme(THEME_FROM_MAIN);

    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync()).toEqual(THEME_FROM_MAIN);
  });

  it('falls back to this window own stored theme when main has none to hand over', async () => {
    // The one start after upgrading: the theme is still only in this window's store, so main omits
    // the query parameter
    storePreviouslyStoredThemeState();

    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync()).toEqual(THEME_FROM_OWN_STORE);
  });

  it('prefers the theme stored before the host existed to what main handed over', async () => {
    storePreviouslyStoredThemeState();
    createWindowWithTheme(THEME_FROM_MAIN);

    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    // These keys exist only until the one-time handover runs, and while they do they hold a theme
    // the user chose that main cannot have adopted yet — main is on a theme it derived from the
    // default. Once the handover has run they are gone and the URL is what is left.
    expect(getCurrentThemeSync()).toEqual(THEME_FROM_OWN_STORE);
  });

  it('falls back to the default theme when neither has one', async () => {
    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync().themeFamilyId).toBe('');
  });

  // A reload replays the URL main built when the window was created, and by then this window's own
  // pre-host store has been handed over and deleted, so the URL is the only thing a reloaded
  // document can seed from — which is why the window keeps it as current as its cache.
  it('paints the theme this window last heard when the document is reloaded', async () => {
    createWindowWithTheme(THEME_FROM_MAIN);
    const themeSinceThisWindowOpened = makeTheme('mainFamily', 'light');
    const { startThemeService } = await import('@renderer/services/theme.service');
    await startThemeService();
    announceCurrentTheme(themeSinceThisWindowOpened);

    // The window reloads: same URL, fresh module evaluation
    vi.resetModules();
    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync()).toEqual(themeSinceThisWindowOpened);
  });

  it('falls back rather than throwing when what it was handed cannot be read', async () => {
    createWindowWithTheme('{ this is not a serialized theme');

    // This runs while the module is being evaluated, where a throw takes the window down with it
    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync().themeFamilyId).toBe('');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('falls back when what it was handed reads cleanly but is not a theme', async () => {
    createWindowWithTheme(JSON.stringify({ notATheme: true }));

    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    // Handing the stylesheet something without `cssVariables` would take the render down instead
    expect(getCurrentThemeSync().themeFamilyId).toBe('');
  });

  it('still uses what main handed over when the pre-host store cannot be read', async () => {
    localStorage.setItem(CURRENT_THEME_STORAGE_KEY, '{ this is not a serialized theme');
    createWindowWithTheme(THEME_FROM_MAIN);

    const { getCurrentThemeSync } = await import('@renderer/services/theme.service');

    expect(getCurrentThemeSync()).toEqual(THEME_FROM_MAIN);
  });
});

describe('keeping this window cache current', () => {
  it('serves the theme the host announces, whichever window caused the change', async () => {
    createWindowWithTheme(THEME_FROM_MAIN);
    const { getCurrentThemeSync, startThemeService } = await import(
      '@renderer/services/theme.service'
    );
    await startThemeService();

    const themeFromAnotherWindow = makeTheme('mainFamily', 'light');
    announceCurrentTheme(themeFromAnotherWindow);

    expect(getCurrentThemeSync()).toEqual(themeFromAnotherWindow);
  });

  it('announces the change to this window own consumers', async () => {
    const { onDidChangeCurrentTheme, startThemeService } = await import(
      '@renderer/services/theme.service'
    );
    const themesReceived: ThemeDefinitionExpanded[] = [];
    onDidChangeCurrentTheme((theme) => themesReceived.push(theme));
    await startThemeService();

    announceCurrentTheme(THEME_FROM_MAIN);

    expect(themesReceived).toContainEqual(THEME_FROM_MAIN);
  });

  it('keeps the last good theme when the host reports an error', async () => {
    createWindowWithTheme(THEME_FROM_MAIN);
    const { getCurrentThemeSync, startThemeService } = await import(
      '@renderer/services/theme.service'
    );
    await startThemeService();

    announceCurrentTheme(newPlatformError('could not read the theme'));

    expect(getCurrentThemeSync()).toEqual(THEME_FROM_MAIN);
    expect(logger.warn).toHaveBeenCalled();
  });

  // The subscription is the only thing that ever updates this window's copy, so a failure that is
  // not retried leaves the window painting the theme it started with for the rest of the session.
  it('retries a subscription that fails, and says so once it gives up', async () => {
    // The retries back off over several seconds, which this test does not need to spend
    vi.useFakeTimers();
    try {
      host.subscribeCurrentTheme.mockRejectedValue(new Error('host unreachable'));
      const { startThemeService } = await import('@renderer/services/theme.service');

      const starting = startThemeService();
      await vi.advanceTimersByTimeAsync(30_000);
      await starting;

      expect(host.subscribeCurrentTheme.mock.calls.length).toBeGreaterThan(1);
      expect(logger.error).toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  it('stops retrying as soon as the subscription lands', async () => {
    vi.useFakeTimers();
    try {
      host.subscribeCurrentTheme.mockRejectedValueOnce(new Error('host not up yet'));
      const { getCurrentThemeSync, startThemeService } = await import(
        '@renderer/services/theme.service'
      );

      await startThemeService();
      await vi.advanceTimersByTimeAsync(30_000);

      expect(host.subscribeCurrentTheme).toHaveBeenCalledTimes(2);
      expect(logger.error).not.toHaveBeenCalled();
      announceCurrentTheme(THEME_FROM_MAIN);
      expect(getCurrentThemeSync()).toEqual(THEME_FROM_MAIN);
    } finally {
      vi.useRealTimers();
    }
  });

  // The retries back off over several seconds, and this is one of the promises the renderer's
  // startup batch waits on: awaiting them would put that backoff in front of the dock layout in
  // exactly the case where the app is already slow.
  it('does not hold up this window startup while it keeps trying', async () => {
    vi.useFakeTimers();
    try {
      host.subscribeCurrentTheme.mockRejectedValue(new Error('host unreachable'));
      const { startThemeService } = await import('@renderer/services/theme.service');

      // No timers advanced: startup has to be finished before any backoff has been waited out
      await startThemeService();

      expect(host.subscribeCurrentTheme).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(30_000);
      expect(host.subscribeCurrentTheme.mock.calls.length).toBeGreaterThan(1);
    } finally {
      vi.useRealTimers();
    }
  });
});

// Main cannot read this window's `localStorage`, so a profile from before the host moved has to
// hand its theme over once — and stop offering it afterwards.
describe('handing over theme state stored before the host moved to main', () => {
  it('offers what this window stored and clears the keys once the host has answered', async () => {
    storePreviouslyStoredThemeState();
    const { startThemeService } = await import('@renderer/services/theme.service');

    await startThemeService();

    expect(host.migrateStoredThemeState).toHaveBeenCalledWith({
      currentTheme: THEME_FROM_OWN_STORE,
      shouldMatchSystem: false,
      userThemes: { 'user-0': {} },
    });
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(SHOULD_MATCH_SYSTEM_STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(USER_THEMES_STORAGE_KEY)).toBeNull();
  });

  it('clears the keys when the host refuses the offer as well', async () => {
    storePreviouslyStoredThemeState();
    host.migrateStoredThemeState.mockResolvedValue(false);
    const { startThemeService } = await import('@renderer/services/theme.service');

    await startThemeService();

    // Refused means the host has state that beats this copy, so this copy is finished either way;
    // left in place it would be re-offered by every window on every start forever.
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toBeNull();
  });

  it('keeps the keys when the offer could not be delivered', async () => {
    storePreviouslyStoredThemeState();
    host.migrateStoredThemeState.mockRejectedValue(new Error('host unreachable'));
    const { startThemeService } = await import('@renderer/services/theme.service');

    await startThemeService();

    // A rejection is the one case where this copy is still the only durable one
    expect(localStorage.getItem(CURRENT_THEME_STORAGE_KEY)).toContain('ownFamily');
    expect(logger.warn).toHaveBeenCalled();
  });

  it('offers nothing when there is nothing stored', async () => {
    const { startThemeService } = await import('@renderer/services/theme.service');

    await startThemeService();

    expect(host.migrateStoredThemeState).not.toHaveBeenCalled();
  });

  it('still subscribes when the handover fails', async () => {
    storePreviouslyStoredThemeState();
    host.migrateStoredThemeState.mockRejectedValue(new Error('host unreachable'));
    const { startThemeService } = await import('@renderer/services/theme.service');

    await startThemeService();

    // A failed handover costs this window the theme it left off at, which is freshness; losing the
    // subscription would cost it every change for the rest of the session
    expect(host.subscribeCurrentTheme).toHaveBeenCalled();
  });
});
