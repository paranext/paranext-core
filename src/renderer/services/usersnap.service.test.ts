import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * A deferred promise whose resolution/rejection is controlled externally, so each test can decide
 * exactly when `loadSpace` settles relative to the AsyncVariable timeout.
 */
type Deferred = {
  promise: Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

// `loadSpace` mock; reassigned per test to a fresh deferred.
let loadSpaceDeferred: Deferred;
const mockLoadSpace = vi.fn(() => loadSpaceDeferred.promise);

vi.mock('@shared/services/app.service', () => ({
  appService: { getAppInfo: vi.fn().mockResolvedValue({ name: 'test' }) },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn() },
}));

vi.mock('@usersnap/browser', () => ({
  loadSpace: () => mockLoadSpace(),
}));

/** Builds a mock SpaceApi with spy-able methods. */
function createMockSpaceApi() {
  return {
    destroy: vi.fn().mockResolvedValue(undefined),
    hide: vi.fn(),
    init: vi.fn().mockResolvedValue(undefined),
    logEvent: vi.fn(),
    on: vi.fn(),
    show: vi.fn(),
  };
}

async function importService() {
  vi.resetModules();
  return import('@renderer/services/usersnap.service');
}

function resetLoadSpaceDeferred(): void {
  // Starts empty; the Promise executor below fills in resolve/reject synchronously.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  loadSpaceDeferred = {} as Deferred;
  loadSpaceDeferred.promise = new Promise<unknown>((resolve, reject) => {
    loadSpaceDeferred.resolve = resolve;
    loadSpaceDeferred.reject = reject;
  });
}

describe('initializeUsersnapApi loadSpace timeout/race logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    resetLoadSpaceDeferred();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves before the timeout: api.init called, no destroy', async () => {
    const { initializeUsersnapApi } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    loadSpaceDeferred.resolve(spaceApi);
    await initPromise;

    expect(spaceApi.init).toHaveBeenCalledTimes(1);
    expect(spaceApi.destroy).not.toHaveBeenCalled();
  });

  it('resolves after the timeout: init not called, late space destroyed', async () => {
    const { initializeUsersnapApi, LOAD_SPACE_TIMEOUT_MS } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    // Fire the timeout first; this rejects loadVar.promise so init is never reached.
    await vi.advanceTimersByTimeAsync(LOAD_SPACE_TIMEOUT_MS);
    await initPromise;

    expect(spaceApi.init).not.toHaveBeenCalled();

    // loadSpace resolves late: the orphan is destroyed in the fire-and-forget IIFE, so wait for
    // that side effect. `vi.waitFor` polls on a timer, hence real timers.
    loadSpaceDeferred.resolve(spaceApi);
    vi.useRealTimers();
    await vi.waitFor(() => expect(spaceApi.destroy).toHaveBeenCalledTimes(1));
  });

  it('rejects before the timeout: no init, no destroy', async () => {
    const { initializeUsersnapApi } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    loadSpaceDeferred.reject(new Error('network down'));
    await initPromise;

    expect(spaceApi.init).not.toHaveBeenCalled();
    expect(spaceApi.destroy).not.toHaveBeenCalled();
  });
});
