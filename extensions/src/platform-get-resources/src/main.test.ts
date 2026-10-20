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
    dataProvidersGet: vi.fn(),
    getMetadataForAllProjects: vi.fn(),
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
    settings: { registerValidator: vi.fn(async () => async () => true) },
    webViewProviders: { registerWebViewProvider: vi.fn(async () => async () => true) },
    webViews: { openWebView: vi.fn(async () => 'wv-1') },
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

async function getLocalNonDblResources(shouldWaitForModelTextRestrictions?: boolean) {
  const handler = mocks.registeredCommands.get('platformGetResources.getLocalNonDblResources');
  if (!handler) throw new Error('getLocalNonDblResources was not registered');
  return handler(shouldWaitForModelTextRestrictions);
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
    // With the catalog in memory, the read below joins a flag sync whose restrictions step hangs
    expect(await hasSettledWithin(getCachedResources(), 0)).toBe(true);

    expect(await hasSettledWithin(getLocalNonDblResources(true), 2000)).toBe(true);
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
