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
