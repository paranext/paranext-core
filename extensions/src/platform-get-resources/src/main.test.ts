import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { UnsubscriberAsyncList } from 'platform-bible-utils';
import type { DblResourceCatalog, GetCachedResourcesOptions } from 'platform-get-resources';

// `main.ts` pulls in webpack-only `?inline` imports that only resolve under webpack — stub them so
// the module loads for real without dragging its web views into this test.
vi.mock('./get-resources.web-view?inline', () => ({ default: 'mock-get-resources-web-view' }));
vi.mock('./home.web-view?inline', () => ({ default: 'mock-home-web-view' }));
vi.mock('./new-tab.web-view?inline', () => ({ default: 'mock-new-tab-web-view' }));
vi.mock('./tailwind.css?inline', () => ({ default: 'mock-tailwind-css' }));

// vi.mock factories are hoisted above imports, so anything they close over comes from vi.hoisted.
const mocks = vi.hoisted(() => ({
  registeredCommands: new Map<string, (...args: unknown[]) => unknown>(),
  dataProvidersGet: vi.fn(),
  readUserData: vi.fn(),
  writeUserData: vi.fn(),
  getMetadataForAllProjects: vi.fn(),
}));

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
    settings: { registerValidator: vi.fn(async () => async () => true) },
    webViewProviders: { registerWebViewProvider: vi.fn(async () => async () => true) },
    webViews: { openWebView: vi.fn(async () => 'wv-1') },
  },
  logger: { debug: vi.fn(), warn: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

/** Past this many milliseconds of process uptime, a missing project really is missing. */
const AFTER_REGISTRATION_GRACE_MS = 31_000;
/** Early enough that the project factories may still be registering. */
const DURING_REGISTRATION_GRACE_MS = 1_000;

function row(dblEntryUid: string, projectId: string): DblResourceData {
  return {
    dblEntryUid,
    displayName: dblEntryUid,
    fullName: dblEntryUid,
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: true,
    updateAvailable: false,
    projectId,
  };
}

/** Two resources C# reports installed — both genuinely on disk. */
const REGISTERED = row('aaaa', 'AAAA1');
const NOT_YET_REGISTERED = row('bbbb', 'BBBB1');

/** The project list mid-registration: one of the two resource projects has shown up so far. */
const PARTIAL_PROJECT_LIST = [{ id: 'AAAA1', isEditable: false }];

const provider = {
  isGetDblResourcesAvailable: vi.fn(async () => true),
  getDblResources: vi.fn(async () => [REGISTERED, NOT_YET_REGISTERED]),
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

async function getCachedResources(options?: GetCachedResourcesOptions) {
  const handler = mocks.registeredCommands.get('platformGetResources.getCachedResources');
  if (!handler) throw new Error('getCachedResources was not registered');
  // The registered handler is `getCachedResources` itself; the map erases its signature.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (await handler(options)) as DblResourceCatalog;
}

/** Every catalog this module persisted, parsed back, oldest first. */
function persistedCatalogs(): DblResourceData[][] {
  return mocks.writeUserData.mock.calls.map(([, , json]) => JSON.parse(String(json)));
}

describe('getCachedResources installed-flag reconciliation', () => {
  beforeEach(() => {
    // Call history too, not just implementations: a downgrade persisted by one test would
    // otherwise read as a violation in the next.
    vi.clearAllMocks();
    mocks.registeredCommands.clear();
    mocks.readUserData.mockResolvedValue(undefined);
    mocks.writeUserData.mockResolvedValue(undefined);
    mocks.getMetadataForAllProjects.mockResolvedValue(PARTIAL_PROJECT_LIST);
    mocks.dataProvidersGet.mockResolvedValue(provider);
  });

  afterEach(async () => {
    // Clears the 12-hour refresh interval activation schedules.
    await registrations.runAllUnsubscribers();
    vi.restoreAllMocks();
  });

  it('returns the catalog a call waited for the fetch to produce without reconciling it', async () => {
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    // Hold the provider back so activation's background fetch cannot fill the cache first — the
    // call below then deterministically waits on that fetch rather than racing it.
    let releaseProvider: () => void = () => {};
    const providerReleased = new Promise<void>((resolve) => {
      releaseProvider = resolve;
    });
    mocks.dataProvidersGet.mockImplementation(async () => {
      await providerReleased;
      return provider;
    });
    await activateWithFreshModule();

    const pending = getCachedResources();
    releaseProvider();
    const fresh = await pending;

    // That catalog is C#'s live answer; checking it against a project list would be correcting
    // the authority with its own approximation.
    expect(fresh).toEqual({ status: 'available', resources: [REGISTERED, NOT_YET_REGISTERED] });
    expect(mocks.getMetadataForAllProjects).not.toHaveBeenCalled();

    // Positive control: the same module does reconcile once it is serving from the cache.
    await getCachedResources({ waitForInstalledFlagsSync: true });
    expect(mocks.getMetadataForAllProjects).toHaveBeenCalled();
  });

  it('never downgrades a row C# reported installed while projects may still be registering', async () => {
    vi.spyOn(performance, 'now').mockReturnValue(DURING_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();

    const reconciled = await getCachedResources({ waitForInstalledFlagsSync: true });

    // Positive control: the reconciliation ran against the partial list rather than being skipped.
    expect(mocks.getMetadataForAllProjects).toHaveBeenCalled();
    expect(reconciled).toEqual({
      status: 'available',
      resources: [REGISTERED, NOT_YET_REGISTERED],
    });
    // Nor was a downgrade written anywhere — a persisted one would outlive this session.
    expect(persistedCatalogs().length).toBeGreaterThan(0);
    expect(
      persistedCatalogs()
        .flat()
        .every((resource) => resource.installed),
    ).toBe(true);
  });

  it('lets a missing project downgrade its row once registration has settled', async () => {
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();

    const reconciled = await getCachedResources({ waitForInstalledFlagsSync: true });

    // This is what lets an uninstall come back through the reconciliation.
    expect(reconciled).toEqual({
      status: 'available',
      resources: [REGISTERED, { ...NOT_YET_REGISTERED, installed: false, projectId: '' }],
    });
    const persisted = persistedCatalogs();
    expect(persisted[persisted.length - 1]).toContainEqual(
      expect.objectContaining({ dblEntryUid: 'bbbb', installed: false }),
    );
  });
});
