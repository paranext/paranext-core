import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ThemeDefinitionExpanded } from 'platform-bible-utils';
import { DataProviderSubscriberOptions } from '@shared/models/data-provider.model';
import type { IThemeService } from '@shared/services/theme.service-model';

const mocks = vi.hoisted(() => ({ get: vi.fn() }));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: mocks.get },
}));

/** Minimal stand-in for the theme data provider a window publishes */
function makeProvider() {
  const disposeCallbacks: (() => void)[] = [];
  const currentThemeCallbacks: ((currentTheme: ThemeDefinitionExpanded) => void)[] = [];
  const optionsPerSubscription: (DataProviderSubscriberOptions | undefined)[] = [];
  return {
    provider: {
      onDidDispose: (callback: () => void) => {
        disposeCallbacks.push(callback);
        return () => {
          const callbackIndex = disposeCallbacks.indexOf(callback);
          if (callbackIndex >= 0) disposeCallbacks.splice(callbackIndex, 1);
          return true;
        };
      },
      subscribeCurrentTheme: vi.fn(
        async (
          _selector: undefined,
          callback: (currentTheme: ThemeDefinitionExpanded) => void,
          options?: DataProviderSubscriberOptions,
        ) => {
          currentThemeCallbacks.push(callback);
          optionsPerSubscription.push(options);
          return async () => {
            const callbackIndex = currentThemeCallbacks.indexOf(callback);
            if (callbackIndex >= 0) currentThemeCallbacks.splice(callbackIndex, 1);
            return true;
          };
        },
      ),
    },
    /** Simulate the window publishing this provider closing, which is what disposes it elsewhere */
    dispose: () => [...disposeCallbacks].forEach((callback) => callback()),
    /** Simulate this provider's engine publishing a new current theme */
    emitCurrentTheme: (currentTheme: ThemeDefinitionExpanded) =>
      [...currentThemeCallbacks].forEach((callback) => callback(currentTheme)),
    /** How many live current-theme subscriptions this provider is serving */
    currentThemeSubscriberCount: () => currentThemeCallbacks.length,
    /** How many dispose hooks are registered on this provider */
    disposeHookCount: () => disposeCallbacks.length,
    /** Subscriber options this provider was handed, in subscription order */
    optionsPerSubscription,
  };
}

function makeTheme(type: string): ThemeDefinitionExpanded {
  return {
    themeFamilyId: 'extensionFamily',
    type,
    label: `%theme_extension_${type}%`,
    id: `extensionFamily-${type}`,
    cssVariables: {},
  };
}

// The theme engine is app-global and lives in exactly one window, so every other process consumes
// it as a remote data provider. When that window closes, another one takes the engine over and
// publishes it under the same name — but the provider object pointing at the closed window is
// revoked, and a data provider subscription re-fetches through the provider it was created with.
describe('theme service across a theme engine handover', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('a current-theme subscription follows the engine to the window that takes it over', async () => {
    const closingHost = makeProvider();
    mocks.get.mockResolvedValue(closingHost.provider);

    const { themeService } = await import('@shared/services/theme.service');

    const themesReceived: (ThemeDefinitionExpanded | unknown)[] = [];
    await themeService.subscribeCurrentTheme(undefined, (currentTheme) => {
      themesReceived.push(currentTheme);
    });
    expect(closingHost.provider.subscribeCurrentTheme).toHaveBeenCalledTimes(1);

    // The hosting window closes: its provider is dropped everywhere, and another window has taken
    // the engine over by the time this process resolves the provider again
    const newHost = makeProvider();
    mocks.get.mockResolvedValue(newHost.provider);
    closingHost.dispose();

    await vi.waitFor(() => expect(newHost.provider.subscribeCurrentTheme).toHaveBeenCalledTimes(1));

    const themeAfterHandover = makeTheme('dark');
    newHost.emitCurrentTheme(themeAfterHandover);

    expect(themesReceived).toContainEqual(themeAfterHandover);
    // The subscription to the closed window is gone, so its failures stop reaching the subscriber
    // rather than being reported on every theme change for the rest of the session
    expect(closingHost.currentThemeSubscriberCount()).toBe(0);
  });

  // The theme can change while the engine is being handed over, and there is no update event this
  // subscriber could still hear for it.
  test('re-subscribing after the handover delivers the current theme once', async () => {
    const closingHost = makeProvider();
    mocks.get.mockResolvedValue(closingHost.provider);

    const { themeService } = await import('@shared/services/theme.service');

    await themeService.subscribeCurrentTheme(undefined, () => {}, {
      retrieveDataImmediately: false,
    });

    const newHost = makeProvider();
    mocks.get.mockResolvedValue(newHost.provider);
    closingHost.dispose();

    await vi.waitFor(() => expect(newHost.provider.subscribeCurrentTheme).toHaveBeenCalledTimes(1));
    expect(newHost.optionsPerSubscription[0]).toEqual({ retrieveDataImmediately: true });
  });

  test('unsubscribing stops the subscription from following the engine', async () => {
    const closingHost = makeProvider();
    mocks.get.mockResolvedValue(closingHost.provider);

    const { themeService } = await import('@shared/services/theme.service');

    const unsubscribe = await themeService.subscribeCurrentTheme(undefined, () => {});
    await unsubscribe();
    expect(closingHost.currentThemeSubscriberCount()).toBe(0);

    const newHost = makeProvider();
    mocks.get.mockResolvedValue(newHost.provider);
    closingHost.dispose();

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(newHost.provider.subscribeCurrentTheme).not.toHaveBeenCalled();
  });
});

// Exercised directly rather than through a facade: a facade registers a dispose hook of its own to
// re-arm its cached provider resolution, and this is about the hooks the subscription itself leaves
// behind.
/**
 * The provider double as the interface the helper under test expects. It implements the two members
 * that helper touches; the rest of `IThemeService` has no bearing on what a subscription leaves
 * behind on the provider.
 */
function asThemeProvider(provider: ReturnType<typeof makeProvider>['provider']): IThemeService {
  // Filling in the rest of `IThemeService` would be a page of stubs that no assertion here reads,
  // and would have to be maintained against every future addition to the interface
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return provider as unknown as IThemeService;
}

describe('what a reattaching current-theme subscription leaves on the provider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('takes its dispose hook off the provider when the caller unsubscribes', async () => {
    // The theme provider is one long-lived object per process, so a hook left behind outlives the
    // caller and retains its whole closure — the callback of a destroyed web view iframe, or of a
    // BrowserWindow that has closed. Every web view subscribes on load and unsubscribes on unload,
    // so what is left behind grows with ordinary tab churn.
    const host = makeProvider();
    const { createReattachingSubscribeCurrentTheme } = await import(
      '@shared/services/theme.service-model'
    );
    const subscribeCurrentTheme = createReattachingSubscribeCurrentTheme(async () =>
      asThemeProvider(host.provider),
    );

    const unsubscribe = await subscribeCurrentTheme(undefined, () => {});
    expect(host.disposeHookCount()).toBe(1);
    await unsubscribe();

    expect(host.disposeHookCount()).toBe(0);
  });

  test('holds one dispose hook however many times the engine changes hands', async () => {
    // Reattaching registers a hook on whatever it reattached through. Registering without dropping
    // the last would add one per handover for the life of the subscription — and a subscription
    // that reattaches repeatedly is exactly the one that lives longest.
    const host = makeProvider();
    const { createReattachingSubscribeCurrentTheme } = await import(
      '@shared/services/theme.service-model'
    );
    const subscribeCurrentTheme = createReattachingSubscribeCurrentTheme(async () =>
      asThemeProvider(host.provider),
    );

    await subscribeCurrentTheme(undefined, () => {});
    // The same window takes the engine back over, so every hook lands on one provider and can be
    // counted
    host.dispose();
    await vi.waitFor(() => expect(host.provider.subscribeCurrentTheme).toHaveBeenCalledTimes(2));
    host.dispose();
    await vi.waitFor(() => expect(host.provider.subscribeCurrentTheme).toHaveBeenCalledTimes(3));

    expect(host.disposeHookCount()).toBe(1);
  });
});
