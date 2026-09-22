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

  it('stops listening for project changes once the extension is deactivated', async () => {
    await activateWithFreshModule();
    expect(mocks.projectsChangedHandlers.size).toBe(1);

    await registrations.runAllUnsubscribers();

    expect(mocks.projectsChangedHandlers.size).toBe(0);
  });
});
