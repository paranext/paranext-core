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
    getMetadataForAllProjects: vi.fn(async (): Promise<unknown[]> => []),
    getSetting: vi.fn(async (): Promise<unknown> => 'power'),
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
    projectLookup: { getMetadataForAllProjects: mocks.getMetadataForAllProjects },
    network: {
      getNetworkEvent: vi.fn(() => (handler: () => void) => {
        mocks.projectsChangedHandlers.add(handler);
        return () => mocks.projectsChangedHandlers.delete(handler);
      }),
    },
    settings: {
      registerValidator: vi.fn(async () => async () => true),
      get: mocks.getSetting,
    },
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
  listModelTextRestrictions: vi.fn(
    async (): Promise<{ dblIds: string[]; projectIds: string[] }> => ({
      dblIds: [],
      projectIds: [],
    }),
  ),
};

/** A restrictions fetch that never settles, as from a backend that is still starting up. */
function neverAnswerModelTextRestrictions() {
  provider.listModelTextRestrictions.mockImplementation(() => new Promise(() => {}));
}

/** Whether `promise` has settled once pending timers and microtasks up to `ms` from now have run. */
async function hasSettledWithin(promise: Promise<unknown>, ms: number): Promise<boolean> {
  const settled = promise.then(
    () => true,
    () => true,
  );
  await vi.advanceTimersByTimeAsync(ms);
  // An already-settled `settled` wins the race, since it comes first
  return Promise.race([settled, Promise.resolve(false)]);
}

let registrations: UnsubscriberAsyncList;

async function activateWithFreshModule() {
  vi.resetModules();
  const { activate } = await import('./main');
  registrations = new UnsubscriberAsyncList('platformGetResources-test');
  // The mocks implement only the slice of ExecutionActivationContext that activation touches.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  await activate({ executionToken: {}, elevatedPrivileges: {}, registrations } as never);
}

async function getCachedResources(shouldWaitForModelTextRestrictions?: boolean) {
  const handler = mocks.registeredCommands.get('platformGetResources.getCachedResources');
  if (!handler) throw new Error('getCachedResources was not registered');
  return handler(shouldWaitForModelTextRestrictions);
}

async function getLocalNonDblResources(
  shouldWaitForModelTextRestrictions?: boolean,
  catalogWaitMs?: number,
) {
  const handler = mocks.registeredCommands.get('platformGetResources.getLocalNonDblResources');
  if (!handler) throw new Error('getLocalNonDblResources was not registered');
  return handler(shouldWaitForModelTextRestrictions, catalogWaitMs);
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
    provider.listModelTextRestrictions.mockResolvedValue({ dblIds: [], projectIds: [] });
    // A resource installed outside the DBL catalog, such as one copied in by hand
    mocks.getMetadataForAllProjects.mockResolvedValue([
      { id: 'COPIED1', name: 'COPIED', isEditable: false },
    ]);
  });

  afterEach(async () => {
    vi.useRealTimers();
    // Clears the 12-hour refresh interval and the project-change subscription.
    await registrations.runAllUnsubscribers();
    vi.restoreAllMocks();
  });

  it('marks a hand-copied restricted text once the set of projects changes', async () => {
    // A resource copied in by hand has no catalog row, so only the backend's project ids can name
    // it, and the project-change event is the only thing that announces it.
    await activateWithFreshModule();
    expect(await getLocalNonDblResources(true)).toEqual([
      expect.objectContaining({ projectId: 'COPIED1', isRestrictedAsModelText: false }),
    ]);
    // Only the backend's next answer names the copied text
    provider.listModelTextRestrictions.mockResolvedValue({ dblIds: [], projectIds: ['COPIED1'] });

    mocks.projectsChangedHandlers.forEach((handler) => handler());

    await vi.waitFor(async () =>
      expect(await getLocalNonDblResources(true)).toEqual([
        expect.objectContaining({ projectId: 'COPIED1', isRestrictedAsModelText: true }),
      ]),
    );
  });

  it('answers a read that does not ask for the model-text restrictions without waiting for them', async () => {
    vi.useFakeTimers();
    neverAnswerModelTextRestrictions();
    await activateWithFreshModule();

    expect(await hasSettledWithin(getCachedResources(), 0)).toBe(true);
    const waitingRead = getCachedResources(true);
    expect(await hasSettledWithin(waitingRead, 1999)).toBe(false);
    expect(await hasSettledWithin(waitingRead, 1)).toBe(true);
  });

  it('waits for the model-text restrictions once, and boundedly, when listing local resources', async () => {
    vi.useFakeTimers();
    neverAnswerModelTextRestrictions();
    await activateWithFreshModule();
    // With the catalog in memory, the read below joins a flag sync, and the restrictions fetch that
    // sync starts hangs
    expect(await hasSettledWithin(getCachedResources(), 0)).toBe(true);

    expect(await hasSettledWithin(getLocalNonDblResources(true), 2000)).toBe(true);
  });

  it('settles a flag refresh without waiting for the model-text restrictions', async () => {
    // Text panels and the Get Resources list await this before reading the catalog, and none of
    // them reads the restrictions
    vi.useFakeTimers();
    neverAnswerModelTextRestrictions();
    await activateWithFreshModule();
    expect(await hasSettledWithin(getCachedResources(), 0)).toBe(true);

    expect(await hasSettledWithin(refreshResourceFlags(false), 0)).toBe(true);
    expect(await hasSettledWithin(refreshResourceFlags(true), 0)).toBe(true);
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
    // Power mode unless a test says otherwise: there, only an opener asks for a preset.
    mocks.getSetting.mockImplementation(async () => 'power');
    await activateWithFreshModule();
  });

  /*
   * Simple mode does not lock the filter, so Home there always starts on Paratext projects instead,
   * wherever it was opened from.
   */
  it('starts Home on projects in Simple mode, even when asked for nothing in particular', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');

    await openHome();

    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(lastRequestedPreset()).toBe('paratextProject');
  });

  it('puts an open Home back on projects in Simple mode when the user had widened it', async () => {
    mocks.getSetting.mockImplementation(async () => 'simple');
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'home-1',
      webViewType: 'platformGetResources.home',
      state: { projectResourceFilter: 'resource' },
    });

    await openHome('platform.projectResources');

    expect(mocks.reloadWebView).toHaveBeenCalledWith(
      'platformGetResources.home',
      'home-1',
      expect.objectContaining({ initialProjectResourceFilter: 'paratextProject' }),
    );
  });

  it('starts Home on projects when the interface mode cannot be read', async () => {
    mocks.getSetting.mockImplementation(async () => {
      throw new Error('settings unavailable');
    });

    await openHome();

    expect(lastRequestedPreset()).toBe('paratextProject');
  });

  afterEach(async () => {
    await registrations.runAllUnsubscribers();
  });

  it('asks for projects only when passed true', async () => {
    await openHome(true);

    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(lastRequestedPreset()).toBe('paratextProject');
  });

  it('asks for no preset when passed nothing or false', async () => {
    // Each open is counted first: `lastRequestedPreset` is undefined when nothing opened too.
    await openHome();
    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
    expect(lastRequestedPreset()).toBeUndefined();

    await openHome(false);
    expect(mocks.openWebView).toHaveBeenCalledTimes(2);
    expect(lastRequestedPreset()).toBeUndefined();
  });

  it('asks for no preset when the macOS menubar passes its menu group key', async () => {
    // Project › Open… in the native menubar reaches this command with the item's group key as its
    // first argument. A truthiness check would read that string as "projects only".
    await openHome('platform.projectResources');

    expect(mocks.openWebView).toHaveBeenCalledTimes(1);
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

  it('leaves an open Home alone when it already shows the asked-for filter', async () => {
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'home-1',
      webViewType: 'platformGetResources.home',
      state: { projectResourceFilter: 'paratextProject' },
    });

    await openHome(true);

    // Positive control: the open Home was looked up, so it had every chance to be reloaded.
    expect(mocks.getOpenWebViewDefinition).toHaveBeenCalledWith('home-1');
    expect(mocks.reloadWebView).not.toHaveBeenCalled();
  });

  it('reports no Home when the reload that would apply the preset finds none', async () => {
    mocks.getOpenWebViewDefinition.mockResolvedValue({
      id: 'home-1',
      webViewType: 'platformGetResources.home',
      state: { projectResourceFilter: 'all' },
    });
    // The tab left this window's dock between the raise and the reload.
    mocks.reloadWebView.mockResolvedValueOnce(undefined);

    expect(await openHome(true)).toBeUndefined();
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

/*
 * The reference panels and the Simple-mode open tell "could not read the installed resources" apart
 * from "there are none" by whether this rejects: guessing a commentary to be a Bible text would show
 * an unrelated text in its place.
 */
describe('platformGetResources.getLocalNonDblResources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.projectsChangedHandlers.clear();
    mocks.readUserData.mockResolvedValue(undefined);
    mocks.writeUserData.mockResolvedValue(undefined);
    mocks.dataProvidersGet.mockResolvedValue(provider);
    provider.recomputeDblResourcesInstallStatus.mockResolvedValue({});
    mocks.getMetadataForAllProjects.mockResolvedValue([]);
  });

  afterEach(async () => {
    await registrations.runAllUnsubscribers();
    vi.restoreAllMocks();
  });

  it('lists a side-loaded resource even when the catalog cannot be fetched', async () => {
    provider.getDblResources.mockRejectedValue(new Error('offline'));
    mocks.getMetadataForAllProjects.mockResolvedValue([
      { id: 'VULGP83', name: 'VULGP83', isEditable: false },
    ]);
    await activateWithFreshModule();
    // The failed fetch retries with delays; let them pass rather than wait them out.
    vi.useFakeTimers();
    try {
      const resources = getLocalNonDblResources();
      await vi.advanceTimersByTimeAsync(60_000);

      await expect(resources).resolves.toEqual([expect.objectContaining({ projectId: 'VULGP83' })]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('waits no longer than asked for a catalog fetch that hangs', async () => {
    // With no catalog cached yet, the read queues behind the startup fetch; a Simple-mode open of a
    // side-loaded resource would otherwise wait it all out and run out of time.
    provider.getDblResources.mockImplementation(() => new Promise(() => {}));
    mocks.getMetadataForAllProjects.mockResolvedValue([
      { id: 'VULGP83', name: 'VULGP83', isEditable: false },
    ]);
    await activateWithFreshModule();
    vi.useFakeTimers();
    try {
      const resources = getLocalNonDblResources(false, 5000);
      await vi.advanceTimersByTimeAsync(5000);

      await expect(resources).resolves.toEqual([expect.objectContaining({ projectId: 'VULGP83' })]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('waits for a slow catalog when no limit is given, so an installed DBL resource is not listed', async () => {
    // The resource picker and panels list this beside the catalog; a list built without the
    // catalog would put every installed DBL resource in front of them twice.
    let deliverCatalog: (resources: DblResourceData[]) => void = () => {};
    provider.getDblResources.mockImplementation(
      () =>
        new Promise((resolve) => {
          deliverCatalog = resolve;
        }),
    );
    mocks.getMetadataForAllProjects.mockResolvedValue([
      { id: 'BYZ1', name: 'BYZ', isEditable: false },
      { id: 'VULGP83', name: 'VULGP83', isEditable: false },
    ]);
    await activateWithFreshModule();
    vi.useFakeTimers();
    try {
      let settled = false;
      const resources = getLocalNonDblResources().finally(() => {
        settled = true;
      });
      await vi.advanceTimersByTimeAsync(60_000);
      expect(settled).toBe(false);

      deliverCatalog([row('byz', 'BYZ1')]);
      await vi.advanceTimersByTimeAsync(0);

      await expect(resources).resolves.toEqual([expect.objectContaining({ projectId: 'VULGP83' })]);
    } finally {
      vi.useRealTimers();
    }
  });

  it('rejects when the local projects cannot be read', async () => {
    mocks.getMetadataForAllProjects.mockRejectedValue(new Error('project lookup failed'));
    await activateWithFreshModule();

    await expect(getLocalNonDblResources()).rejects.toThrow('project lookup failed');
  });
});
