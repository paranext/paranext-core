import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { UnsubscriberAsyncList } from 'platform-bible-utils';

// `main.ts` pulls in webpack-only `?inline` imports that only resolve under webpack — stub them so
// the module loads for real without dragging its web views into this test.
vi.mock('./get-resources.web-view?inline', () => ({ default: 'mock-get-resources-web-view' }));
vi.mock('./home.web-view?inline', () => ({ default: 'mock-home-web-view' }));
vi.mock('./new-tab.web-view?inline', () => ({ default: 'mock-new-tab-web-view' }));
vi.mock('./tailwind.css?inline', () => ({ default: 'mock-tailwind-css' }));

// vi.mock factories are hoisted above imports, so anything they close over comes from vi.hoisted.
const mocks = vi.hoisted(() => {
  const projectsChangedHandlers = new Set<() => void>();
  return {
    registeredCommands: new Map<string, (...args: unknown[]) => unknown>(),
    webViewProviders: new Map<string, unknown>(),
    openWebView: vi.fn<(...args: unknown[]) => Promise<string | undefined>>(async () => 'wv-1'),
    getOpenWebViewDefinition: vi.fn(async (): Promise<unknown> => undefined),
    reloadWebView: vi.fn(async (): Promise<string | undefined> => 'wv-1'),
    dataProvidersGet: vi.fn(),
    readUserData: vi.fn(),
    writeUserData: vi.fn(),
    projectsChangedHandlers,
  };
});

vi.mock('@papi/backend', () => ({
  default: {
    commands: {
      registerCommand: vi.fn(async (name: string, handler: (...args: unknown[]) => unknown) => {
        mocks.registeredCommands.set(name, handler);
        return async () => true;
      }),
    },
    dataProviders: { get: mocks.dataProvidersGet },
    storage: { readUserData: mocks.readUserData, writeUserData: mocks.writeUserData },
    projectLookup: { getMetadataForAllProjects: vi.fn(async () => []) },
    network: {
      getNetworkEvent: vi.fn(() => (handler: () => void) => {
        mocks.projectsChangedHandlers.add(handler);
        return () => mocks.projectsChangedHandlers.delete(handler);
      }),
    },
    settings: { registerValidator: vi.fn(async () => async () => true) },
    webViewProviders: {
      registerWebViewProvider: vi.fn(async (webViewType: string, webViewProvider: unknown) => {
        mocks.webViewProviders.set(webViewType, webViewProvider);
        return async () => true;
      }),
    },
    webViews: {
      openWebView: mocks.openWebView,
      getOpenWebViewDefinition: mocks.getOpenWebViewDefinition,
      reloadWebView: mocks.reloadWebView,
    },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

function row(dblEntryUid: string, projectId: string): DblResourceData {
  return {
    dblEntryUid,
    displayName: dblEntryUid,
    fullName: dblEntryUid,
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: projectId !== '',
    updateAvailable: false,
    projectId,
  };
}

/** A resource the catalog reports as not installed. */
const NOT_INSTALLED = row('aaaa', '');

const provider = {
  isGetDblResourcesAvailable: vi.fn(async () => true),
  getDblResources: vi.fn(async () => [NOT_INSTALLED]),
  recomputeDblResourcesUpdateStatus: vi.fn(async () => ({})),
  recomputeDblResourcesInstallStatus: vi.fn(async () => ({})),
};

let registrations: UnsubscriberAsyncList;

async function activateWithFreshModule() {
  vi.resetModules();
  const { activate } = await import('./main');
  registrations = new UnsubscriberAsyncList('platformGetResources-test');
  // The mocks implement only the slice of ExecutionActivationContext that activation touches.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  await activate({ executionToken: {}, elevatedPrivileges: {}, registrations } as never);
}

async function getCachedResources() {
  const handler = mocks.registeredCommands.get('platformGetResources.getCachedResources');
  if (!handler) throw new Error('getCachedResources was not registered');
  return handler();
}

async function refreshResourceFlags(shouldRecomputeUpdateStatus?: boolean) {
  const handler = mocks.registeredCommands.get('platformGetResources.refreshResourceFlags');
  if (!handler) throw new Error('refreshResourceFlags was not registered');
  return handler(shouldRecomputeUpdateStatus);
}

/** Every catalog this module persisted, parsed back, oldest first. */
function persistedCatalogs(): DblResourceData[][] {
  return mocks.writeUserData.mock.calls.map(([, , json]) => JSON.parse(String(json)));
}

describe('platformGetResources activation', () => {
  beforeEach(() => {
    // Call history too, not just implementations: a write from one test would otherwise be read as
    // this one's evidence.
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.projectsChangedHandlers.clear();
    mocks.readUserData.mockResolvedValue(undefined);
    mocks.writeUserData.mockResolvedValue(undefined);
    mocks.dataProvidersGet.mockResolvedValue(provider);
    provider.recomputeDblResourcesInstallStatus.mockResolvedValue({});
  });

  afterEach(async () => {
    // Clears the 12-hour refresh interval and the project-change subscription.
    await registrations.runAllUnsubscribers();
    vi.restoreAllMocks();
  });

  it('re-reads the derived flags when the set of projects changes', async () => {
    // Nothing else revisits them: an install or a removal from another window, a Send/Receive, or a
    // resource copied in by hand leaves this catalog wrong until someone opens the dialog.
    await activateWithFreshModule();
    await getCachedResources();
    const writeCountBeforeEvent = persistedCatalogs().length;
    // The resource has appeared on disk, and C# announces the project list changed.
    provider.recomputeDblResourcesInstallStatus.mockResolvedValue({ aaaa: 'AAAA1' });
    expect(mocks.projectsChangedHandlers.size).toBe(1);

    mocks.projectsChangedHandlers.forEach((handler) => handler());

    // Watched through what the module persisted rather than by re-reading the catalog, since a read
    // starts a sync of its own and would pass whether or not the event does anything.
    await vi.waitFor(() =>
      expect(persistedCatalogs().length).toBeGreaterThan(writeCountBeforeEvent),
    );
    expect(persistedCatalogs().at(-1)).toContainEqual(
      expect.objectContaining({ dblEntryUid: 'aaaa', installed: true, projectId: 'AAAA1' }),
    );
  });

  it('recomputes updateAvailable for a refresh that queued behind a project change', async () => {
    // Both wait on the same in-flight sync and resume in the order they started waiting, so the
    // project-change listener starts the next sync — one that skips updateAvailable — before the
    // refresh gets to. Joining that one would leave an updated resource showing "Update".
    await activateWithFreshModule();
    await getCachedResources();
    let answerInFlightSync: (status: Record<string, string>) => void = () => {};
    provider.recomputeDblResourcesInstallStatus.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          answerInFlightSync = resolve;
        }),
    );
    provider.recomputeDblResourcesInstallStatus.mockResolvedValue({ aaaa: 'AAAA1' });
    // A read of the catalog starts a background sync that does not recompute updateAvailable.
    await getCachedResources();
    await vi.waitFor(() => expect(provider.recomputeDblResourcesInstallStatus).toHaveBeenCalled());

    mocks.projectsChangedHandlers.forEach((handler) => handler());
    const refresh = refreshResourceFlags(true);
    answerInFlightSync({ aaaa: 'AAAA1' });
    await refresh;

    expect(provider.recomputeDblResourcesUpdateStatus).toHaveBeenCalled();
  });

  it('ends the sync without touching the catalog when the backend reports no install status', async () => {
    // An empty map is also what a busy provider returns, so it is not an answer to act on: no
    // update-status round trip, no write, and the installed flags stay as they were.
    provider.getDblResources.mockResolvedValueOnce([row('bbbb', 'BBBB1')]);
    await activateWithFreshModule();
    await getCachedResources();
    const writeCountBeforeRefresh = persistedCatalogs().length;
    provider.recomputeDblResourcesInstallStatus.mockClear();

    await refreshResourceFlags(true);

    // The sync did ask, so what follows is its response to the empty answer, not a sync that
    // never ran.
    expect(provider.recomputeDblResourcesInstallStatus).toHaveBeenCalled();
    expect(provider.recomputeDblResourcesUpdateStatus).not.toHaveBeenCalled();
    expect(persistedCatalogs().length).toBe(writeCountBeforeRefresh);
    expect(await getCachedResources()).toEqual({
      status: 'available',
      resources: [expect.objectContaining({ dblEntryUid: 'bbbb', installed: true })],
    });
  });

  it('stops listening for project changes once the extension is deactivated', async () => {
    await activateWithFreshModule();
    expect(mocks.projectsChangedHandlers.size).toBe(1);

    await registrations.runAllUnsubscribers();

    expect(mocks.projectsChangedHandlers.size).toBe(0);
  });
});

async function openHome(...args: unknown[]) {
  const handler = mocks.registeredCommands.get('platformGetResources.openHome');
  if (!handler) throw new Error('openHome was not registered');
  return handler(...args);
}

/** The filter preset the last `openHome` asked the Home web view provider for. */
function lastRequestedPreset(): unknown {
  const options = mocks.openWebView.mock.calls.at(-1)?.[2];
  return options && typeof options === 'object' && 'initialProjectResourceFilter' in options
    ? options.initialProjectResourceFilter
    : undefined;
}

/*
 * The one place the command's argument becomes a filter preset, and the one caller-facing contract
 * of the preset: only `true` means "projects only". Everything else — including the menu group key
 * the macOS native menubar passes as a first argument to every menu command — asks for no preset.
 */
describe('platformGetResources.openHome', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.webViewProviders.clear();
    mocks.readUserData.mockResolvedValue(undefined);
    mocks.dataProvidersGet.mockResolvedValue(provider);
    mocks.openWebView.mockResolvedValue('home-1');
    mocks.getOpenWebViewDefinition.mockResolvedValue(undefined);
    await activateWithFreshModule();
  });

  afterEach(async () => {
    await registrations.runAllUnsubscribers();
  });

  it('asks for projects only when passed true', async () => {
    await openHome(true);

    expect(lastRequestedPreset()).toBe('paratextProject');
  });

  it('asks for no preset when passed nothing or false', async () => {
    await openHome();
    expect(lastRequestedPreset()).toBeUndefined();

    await openHome(false);
    expect(lastRequestedPreset()).toBeUndefined();
  });

  it('asks for no preset when the macOS menubar passes its menu group key', async () => {
    // Project › Open… in the native menubar reaches this command with the item's group key as its
    // first argument. A truthiness check would read that string as "projects only".
    await openHome('platform.projectResources');

    expect(lastRequestedPreset()).toBeUndefined();
  });

  it('reloads an open Home showing another filter when asked for projects only', async () => {
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'home-1',
      webViewType: 'platformGetResources.home',
      state: { projectResourceFilter: 'all' },
    });

    await openHome(true);

    // The Home just raised, not the `existingId: '?'` placeholder the open was asked with.
    expect(mocks.getOpenWebViewDefinition).toHaveBeenCalledWith('home-1');
    expect(mocks.reloadWebView).toHaveBeenCalledWith(
      'platformGetResources.home',
      'home-1',
      expect.objectContaining({ initialProjectResourceFilter: 'paratextProject' }),
    );
  });

  it('raises an open Home as the user left it when asked for nothing in particular', async () => {
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'home-1',
      webViewType: 'platformGetResources.home',
      state: { projectResourceFilter: 'resource' },
    });

    await openHome();

    // Positive control: the command did open (raise) Home, so it had every chance to reload it.
    expect(mocks.openWebView).toHaveBeenCalled();
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
    // With no preset there is nothing to compare, so the open Home is not even looked up.
    expect(mocks.getOpenWebViewDefinition).not.toHaveBeenCalled();
  });
});

/*
 * The provider runs whenever Home is built — a new Home, a reload, moving Home to a new window, an
 * extension reload — and only a new Home or a preset reload carries a preset. The user's filter has
 * to survive the rest, and the key it writes has to be the one the web view reads.
 */
describe('Home web view provider', () => {
  type HomeProvider = {
    getWebView: (saved: unknown, options: unknown) => Promise<{ state?: Record<string, unknown> }>;
  };

  async function getHomeProvider(): Promise<HomeProvider> {
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.webViewProviders.clear();
    mocks.readUserData.mockResolvedValue(undefined);
    mocks.dataProvidersGet.mockResolvedValue(provider);
    await activateWithFreshModule();
    const homeProvider = mocks.webViewProviders.get('platformGetResources.home');
    if (!homeProvider) throw new Error('Home web view provider was not registered');
    // The mock stores providers untyped; this one is the real `homeWebViewProvider` from main.ts.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return homeProvider as HomeProvider;
  }

  afterEach(async () => {
    await registrations.runAllUnsubscribers();
  });

  it("keeps the user's filter when rebuilt without a preset", async () => {
    const homeProvider = await getHomeProvider();

    const webView = await homeProvider.getWebView(
      {
        id: 'home-1',
        webViewType: 'platformGetResources.home',
        state: { projectResourceFilter: 'resource' },
      },
      {},
    );

    expect(webView.state?.projectResourceFilter).toBe('resource');
  });

  it("writes an opener's preset to the key the web view reads", async () => {
    const homeProvider = await getHomeProvider();

    const webView = await homeProvider.getWebView(
      {
        id: 'home-1',
        webViewType: 'platformGetResources.home',
        state: { projectResourceFilter: 'resource' },
      },
      { initialProjectResourceFilter: 'paratextProject' },
    );

    // `home.web-view.tsx` reads `useWebViewState('projectResourceFilter', …)`.
    expect(webView.state?.projectResourceFilter).toBe('paratextProject');
  });
});
