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

describe('initializeUsersnapApi load/init timeout/race logic', () => {
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

  it('resolves after the timeout: startup unblocked, late space destroyed', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    // Fire the timeout first; this rejects initVar.promise so startup settles via the outer catch
    // rather than waiting on the load.
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // load + init completes late: the orphan is destroyed in the fire-and-forget IIFE, so wait for
    // that side effect. `vi.waitFor` polls on a timer, hence real timers.
    loadSpaceDeferred.resolve(spaceApi);
    vi.useRealTimers();
    await vi.waitFor(() => expect(spaceApi.destroy).toHaveBeenCalledTimes(1));
  });

  it('rejects before the timeout: initialization resolves without throwing', async () => {
    const { initializeUsersnapApi } = await importService();

    const initPromise = initializeUsersnapApi();

    loadSpaceDeferred.reject(new Error('network down'));

    // The rejection flows into the outer catch, so startup settles gracefully rather than throwing.
    await expect(initPromise).resolves.toBeUndefined();
  });

  it('rejects after the timeout: late rejection is swallowed, startup still resolves', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const { logger } = await import('@shared/services/logger.service');

    const initPromise = initializeUsersnapApi();

    // Timeout fires first, so startup has already settled via the outer catch.
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // loadSpace rejects late: the IIFE catch logs it at debug rather than letting it surface as an
    // unhandled rejection that could crash startup.
    loadSpaceDeferred.reject(new Error('network down'));
    vi.useRealTimers();
    await vi.waitFor(() =>
      expect(logger.debug).toHaveBeenCalledWith(
        'Usersnap load/init failed (or cleanup failed) after timeout:',
        expect.any(Error),
      ),
    );
  });

  it('destroy rejecting after the timeout is swallowed, startup still resolves', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const { logger } = await import('@shared/services/logger.service');
    const spaceApi = createMockSpaceApi();
    // Cleanup of the late orphan itself fails.
    spaceApi.destroy = vi.fn().mockRejectedValue(new Error('destroy failed'));

    const initPromise = initializeUsersnapApi();

    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // load + init completes late; destroying the orphan throws, but the same IIFE catch keeps it
    // from becoming an unhandled rejection.
    loadSpaceDeferred.resolve(spaceApi);
    vi.useRealTimers();
    await vi.waitFor(() =>
      expect(logger.debug).toHaveBeenCalledWith(
        'Usersnap load/init failed (or cleanup failed) after timeout:',
        expect.any(Error),
      ),
    );
    expect(spaceApi.destroy).toHaveBeenCalledTimes(1);
  });
});
