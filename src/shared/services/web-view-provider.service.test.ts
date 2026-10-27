import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DEADLINE_EXCEEDED, newPlatformError, UNKNOWN } from 'platform-bible-utils';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

/** Builds the PlatformError `waitForNetworkObject` rejects with on a genuine per-arm timeout. */
function timeoutError() {
  return newPlatformError(
    'Timeout reached when waiting for wait-for-net-obj to settle',
    DEADLINE_EXCEEDED,
  );
}

// Each test re-imports the service (vi.resetModules) because it caches `isInitialized` /
// `initializePromise` at module scope — see network-object-status.service.test.ts for the same
// pattern. Only the three network-layer services this module calls are mocked; the re-arm loop
// under test is the module's own code.

const { mockInitialize, mockWaitForNetworkObject, mockNetworkObjectGet, mockNetworkObjectSet } =
  vi.hoisted(() => ({
    mockInitialize: vi.fn(async () => {}),
    mockWaitForNetworkObject:
      vi.fn<(details: { id: string }, timeoutInMS?: number) => Promise<NetworkObjectDetails>>(),
    mockNetworkObjectGet: vi.fn(),
    mockNetworkObjectSet: vi.fn(),
  }));

vi.mock('@shared/services/network.service', () => ({
  __esModule: true,
  initialize: mockInitialize,
}));

vi.mock('@shared/services/network-object.service', () => ({
  __esModule: true,
  networkObjectService: {
    get: mockNetworkObjectGet,
    set: mockNetworkObjectSet,
    hasKnown: vi.fn(() => false),
  },
  overrideDispose: vi.fn((obj: unknown) => obj),
}));

vi.mock('@shared/services/network-object-status.service', () => ({
  __esModule: true,
  networkObjectStatusService: { waitForNetworkObject: mockWaitForNetworkObject },
}));

// The module under test only calls `webViewService.onDidCloseWebView`; mocked directly rather than
// letting the real module load, since that module's own module-scope `getNetworkEvent(...)` calls
// would otherwise reach into the real (unmocked) `network.service` surface this file doesn't stub.
vi.mock('@shared/services/web-view.service', () => ({
  __esModule: true,
  webViewService: { onDidCloseWebView: vi.fn() },
}));

/** Re-imports the service fresh (resetting its cached initialization) and returns it. */
async function loadService() {
  vi.resetModules();
  const { webViewProviderService } = await import('@shared/services/web-view-provider.service');
  return webViewProviderService;
}

/** Minimal NetworkObjectDetails; only `id` matters to the code under test. */
function makeDetails(id: string): NetworkObjectDetails {
  return { functionNames: [], id, objectType: 'object' };
}

/** The webview provider `networkObjectService.get` resolves to once the wait settles. */
const PROVIDER = { getWebView: vi.fn() };

beforeEach(() => {
  // Full reset, not just clearAllMocks: a prior test's mockImplementation (e.g. the fake-timer one
  // below) otherwise survives into the next test, since clearing only resets call history.
  vi.resetAllMocks();
  vi.useRealTimers();
  mockInitialize.mockResolvedValue(undefined);
  mockNetworkObjectGet.mockResolvedValue(PROVIDER);
});

describe('getWebViewProvider — the fast, one-shot wait (default, no patient flag)', () => {
  it('waits up to 20 seconds once and returns the provider when it resolves', async () => {
    const service = await loadService();
    mockWaitForNetworkObject.mockResolvedValue(makeDetails('foo.view-webViewProvider'));

    await expect(service.getWebViewProvider('foo.view')).resolves.toBe(PROVIDER);

    expect(mockWaitForNetworkObject).toHaveBeenCalledTimes(1);
    expect(mockWaitForNetworkObject).toHaveBeenCalledWith(
      { id: 'foo.view-webViewProvider' },
      20000,
    );
  });

  it('propagates the timeout rejection without retrying', async () => {
    const service = await loadService();
    mockWaitForNetworkObject.mockRejectedValue(timeoutError());

    await expect(service.getWebViewProvider('foo.view')).rejects.toThrow('Timeout reached');

    expect(mockWaitForNetworkObject).toHaveBeenCalledTimes(1);
  });
});

describe('getWebViewProvider — the patient, re-arming wait (tab-restore path)', () => {
  it('re-arms the wait after a timeout and returns the provider once it registers late', async () => {
    const service = await loadService();
    mockWaitForNetworkObject
      .mockRejectedValueOnce(timeoutError())
      .mockRejectedValueOnce(timeoutError())
      .mockResolvedValueOnce(makeDetails('foo.view-webViewProvider'));

    await expect(service.getWebViewProvider('foo.view', true)).resolves.toBe(PROVIDER);

    // Two timed-out arms, then the arm that caught the late registration.
    expect(mockWaitForNetworkObject).toHaveBeenCalledTimes(3);
    mockWaitForNetworkObject.mock.calls.forEach((call) => {
      expect(call).toEqual([{ id: 'foo.view-webViewProvider' }, 20000]);
    });
  });

  it('gives up and propagates the rejection once the total patient budget elapses', async () => {
    const service = await loadService();
    vi.useFakeTimers();
    // Each rejection also advances the fake clock by one 20s arm, simulating that much time having
    // actually passed while this arm waited — the loop reads performance.now() to decide whether to
    // re-arm again, not a real timer, so nothing here needs to actually wait 2 minutes.
    mockWaitForNetworkObject.mockImplementation(async () => {
      vi.advanceTimersByTime(20000);
      throw timeoutError();
    });

    await expect(service.getWebViewProvider('foo.view', true)).rejects.toThrow('Timeout reached');

    // ~2 minutes total budget / 20s per arm.
    expect(mockWaitForNetworkObject).toHaveBeenCalledTimes(6);
  });

  it('does not re-arm a non-timeout rejection, even well within the patient budget', async () => {
    const service = await loadService();
    // An UNKNOWN-coded PlatformError (e.g. a failed network-object snapshot read) is not something
    // re-arming will fix, so it must propagate from the very first arm, same as the one-shot path.
    mockWaitForNetworkObject.mockRejectedValue(
      newPlatformError('network object service unavailable', UNKNOWN),
    );

    await expect(service.getWebViewProvider('foo.view', true)).rejects.toMatchObject({
      code: UNKNOWN,
    });

    expect(mockWaitForNetworkObject).toHaveBeenCalledTimes(1);
  });
});
