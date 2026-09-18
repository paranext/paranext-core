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
  projectsChangedHandlers: new Set<() => void>(),
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

// Both must stay either side of `PROJECT_REGISTRATION_GRACE_PERIOD_MS` in `main.ts`, which is not
// exported to import from here; shortening that window without revisiting these leaves every
// grace-period case below testing the settled path twice.
/** Past this many milliseconds of process uptime, a missing project really is missing. */
const AFTER_REGISTRATION_GRACE_MS = 31_000;
/** Early enough that the project factories may still be registering. */
const DURING_REGISTRATION_GRACE_MS = 1_000;
/** Inside the window, but near enough to its end that the catch-up it books lands promptly. */
const JUST_INSIDE_REGISTRATION_GRACE_MS = 29_900;

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
  recomputeDblResourcesUpdateStatus: vi.fn(async () => ({})),
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
    mocks.projectsChangedHandlers.clear();
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

  it('returns a catalog this call fetched itself without reconciling it', async () => {
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    // Send activation's background fetch down its one non-retrying failure, so it stops without
    // filling the cache and the catalog below is genuinely this call's own fetch. Served instead
    // out of a cache someone else filled, this would take the cached path and prove nothing about
    // a fresh fetch — which is what a plain rejection would do, since that fetch retries ten times.
    provider.isGetDblResourcesAvailable.mockResolvedValueOnce(false);
    await activateWithFreshModule();

    const fresh = await getCachedResources();

    // That catalog is C#'s live answer; checking it against a project list would be correcting
    // the authority with its own approximation.
    expect(fresh).toEqual({ status: 'available', resources: [REGISTERED, NOT_YET_REGISTERED] });
    expect(mocks.getMetadataForAllProjects).not.toHaveBeenCalled();

    // Positive control: the same module does reconcile once it is serving from the cache.
    await getCachedResources({ waitForInstalledFlagsSync: true });
    expect(mocks.getMetadataForAllProjects).toHaveBeenCalled();
  });

  it('waits for the flag sync when another fetch fills the cache first', async () => {
    // A caller that opted into reconciled flags queues behind an in-flight fetch. What it gets back
    // is a cached snapshot like any other, so the wait it asked for still has to happen; treating
    // it as freshly fetched skips the wait silently, on the cold-start path this all exists for.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    let releaseProvider: () => void = () => {};
    const providerReleased = new Promise<void>((resolve) => {
      releaseProvider = resolve;
    });
    mocks.dataProvidersGet.mockImplementation(async () => {
      await providerReleased;
      return provider;
    });
    await activateWithFreshModule();

    const pending = getCachedResources({ waitForInstalledFlagsSync: true });
    releaseProvider();
    await pending;

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

  it('registers a removal named by its caller during the registration grace period', async () => {
    // The Get Resources dialog clears a row's "removing" spinner when the row reports itself
    // uninstalled. Left to the grace period, a removal in the first seconds after startup reads as
    // a project that has not registered yet, and the row spins on against a resource already gone.
    vi.spyOn(performance, 'now').mockReturnValue(DURING_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();
    const refreshResourceFlags = mocks.registeredCommands.get(
      'platformGetResources.refreshResourceFlags',
    );

    await refreshResourceFlags?.(NOT_YET_REGISTERED.dblEntryUid);

    expect(await getCachedResources()).toEqual({
      status: 'available',
      resources: [REGISTERED, { ...NOT_YET_REGISTERED, installed: false, projectId: '' }],
    });
    expect(persistedCatalogs().at(-1)).toContainEqual(
      expect.objectContaining({ dblEntryUid: 'bbbb', installed: false }),
    );
  });

  it('registers a removal that took the last resource project with it', async () => {
    // Removing the only installed resource empties the read-only side of the project list, which is
    // the same thing a list that has not registered yet looks like. The sync declines to act on
    // that list at all — except for the row whose removal the caller is reporting.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    // Editable projects only, from the first read on: this machine's one resource has just been
    // removed, so nothing else can be reconciled against this list either way.
    mocks.getMetadataForAllProjects.mockResolvedValue([{ id: 'EDITABLE1', isEditable: true }]);
    await activateWithFreshModule();
    await getCachedResources();
    const refreshResourceFlags = mocks.registeredCommands.get(
      'platformGetResources.refreshResourceFlags',
    );

    await refreshResourceFlags?.(REGISTERED.dblEntryUid);

    // Only the removed row: the other is missing from a list that proves nothing about it.
    expect(await getCachedResources()).toEqual({
      status: 'available',
      resources: [{ ...REGISTERED, installed: false, projectId: '' }, NOT_YET_REGISTERED],
    });
  });

  it('keeps a row reconciled against the backend while its project may be registering', async () => {
    // Holding back the `installed` downgrade must not hold back the rest of the row. The dialog
    // corrects update badges once per mount, and pays a backend round trip to do it; discarding
    // that answer for the unregistered rows leaves exactly the stale badge it went to fix.
    vi.spyOn(performance, 'now').mockReturnValue(DURING_REGISTRATION_GRACE_MS);
    provider.recomputeDblResourcesUpdateStatus.mockResolvedValueOnce({ aaaa: false, bbbb: true });
    await activateWithFreshModule();
    await getCachedResources();
    const refreshResourceFlags = mocks.registeredCommands.get(
      'platformGetResources.refreshResourceFlags',
    );

    await refreshResourceFlags?.();

    expect(await getCachedResources()).toEqual({
      status: 'available',
      // Still installed, because absence proves nothing yet — and still told what the backend said.
      resources: [REGISTERED, { ...NOT_YET_REGISTERED, updateAvailable: true }],
    });
  });

  it('corrects a row when the project it was waiting for registers', async () => {
    // What makes the grace period safe to be wrong about. A row downgraded before its project
    // registered is re-proved installed the moment the project list changes, rather than standing
    // wrong until the next catalog fetch — which, offline, may be the next session.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();
    await getCachedResources({ waitForInstalledFlagsSync: true });
    expect(await getCachedResources()).toEqual({
      status: 'available',
      resources: [REGISTERED, { ...NOT_YET_REGISTERED, installed: false, projectId: '' }],
    });

    // The late project finally registers, and C# announces it.
    mocks.getMetadataForAllProjects.mockResolvedValue([
      ...PARTIAL_PROJECT_LIST,
      { id: 'BBBB1', isEditable: false },
    ]);
    expect(mocks.projectsChangedHandlers.size).toBe(1);
    const writeCountBeforeEvent = persistedCatalogs().length;
    mocks.projectsChangedHandlers.forEach((handler) => handler());

    // Watched through what the module persisted, never by re-reading the catalog: a read starts a
    // background sync of its own, so polling one here would perform the work this is checking for
    // and pass whether or not the event does anything.
    await vi.waitFor(() =>
      expect(persistedCatalogs().length).toBeGreaterThan(writeCountBeforeEvent),
    );
    expect(persistedCatalogs().at(-1)).toContainEqual(
      expect.objectContaining({ dblEntryUid: 'bbbb', installed: true, projectId: 'BBBB1' }),
    );
  });

  it('takes the look it owes a held-back row once the grace period ends', async () => {
    // A sync inside the window declines to judge absence. Nothing else comes back to look, so
    // without the catch-up the window would settle those flags for the rest of the session — and
    // the extension host restarts on its own, which resets the clock this window is measured on.
    // Sitting just inside the window leaves the catch-up a short real wait, rather than mocking the
    // clock the timer is scheduled against and the sync's own awaits along with it.
    vi.spyOn(performance, 'now').mockReturnValue(JUST_INSIDE_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();
    await getCachedResources({ waitForInstalledFlagsSync: true });
    // Held back, not downgraded: the window is still open.
    expect(await getCachedResources()).toEqual({
      status: 'available',
      resources: [REGISTERED, NOT_YET_REGISTERED],
    });

    // The project never shows up, and the window closes.
    const writeCountBeforeWindowClosed = persistedCatalogs().length;
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);

    // Watched through what the module persisted rather than by re-reading the catalog, which would
    // start a sync itself and so pass with no catch-up scheduled at all.
    await vi.waitFor(() =>
      expect(persistedCatalogs().length).toBeGreaterThan(writeCountBeforeWindowClosed),
    );
    expect(persistedCatalogs().at(-1)).toContainEqual(
      expect.objectContaining({ dblEntryUid: 'bbbb', installed: false, projectId: '' }),
    );
  });

  it('changes nothing when no resource project has registered yet, even after startup', async () => {
    // An early read returns only editable projects, indistinguishable from a machine with no
    // resources; reconciling against it would mark every installed resource uninstalled.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    mocks.getMetadataForAllProjects.mockResolvedValue([{ id: 'EDITABLE1', isEditable: true }]);
    await activateWithFreshModule();
    await getCachedResources();

    const reconciled = await getCachedResources({ waitForInstalledFlagsSync: true });

    // Positive control: the metadata was read, and the guard is what declined to act on it.
    expect(mocks.getMetadataForAllProjects).toHaveBeenCalled();
    expect(reconciled).toEqual({
      status: 'available',
      resources: [REGISTERED, NOT_YET_REGISTERED],
    });
  });

  it('does not make the opt-in wait pay for the backend update-status recompute', async () => {
    // Only the Get Resources list renders `updateAvailable`; a panel waiting on it would pay a
    // whole-catalog backend round trip for a flag it discards.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();

    await getCachedResources({ waitForInstalledFlagsSync: true });
    expect(provider.recomputeDblResourcesUpdateStatus).not.toHaveBeenCalled();

    // Positive control: the refresh that exists for that flag does ask the backend.
    const refreshResourceFlags = mocks.registeredCommands.get(
      'platformGetResources.refreshResourceFlags',
    );
    await refreshResourceFlags?.();
    expect(provider.recomputeDblResourcesUpdateStatus).toHaveBeenCalled();
  });

  it('still recomputes update status when a panel wait starts the next sync first', async () => {
    // A panel wait and the update-status refresh both wait out the same in-flight sync. The panel's
    // turn comes first and starts a sync without the recompute; the refresh must not settle for
    // joining it, or "Update" badges go stale.
    vi.spyOn(performance, 'now').mockReturnValue(AFTER_REGISTRATION_GRACE_MS);
    await activateWithFreshModule();
    await getCachedResources();

    let releaseMetadata: () => void = () => {};
    mocks.getMetadataForAllProjects.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          releaseMetadata = () => resolve(PARTIAL_PROJECT_LIST);
        }),
    );
    const flushMicrotasks = () =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, 0);
      });

    // A background sync, held on its metadata read so it stays in flight.
    const background = getCachedResources();
    await vi.waitFor(() => expect(mocks.getMetadataForAllProjects).toHaveBeenCalledTimes(1));
    // Queue the panel's wait first, then the refresh, both behind that sync.
    const panelWait = getCachedResources({ waitForInstalledFlagsSync: true });
    await flushMicrotasks();
    const refreshResourceFlags = mocks.registeredCommands.get(
      'platformGetResources.refreshResourceFlags',
    );
    const refresh = refreshResourceFlags?.();
    await flushMicrotasks();

    releaseMetadata();
    await Promise.all([background, panelWait, refresh]);

    expect(provider.recomputeDblResourcesUpdateStatus).toHaveBeenCalled();
  });
});
