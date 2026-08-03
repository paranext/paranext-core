import { vi } from 'vitest';
import { createRpcHandler } from '@shared/services/rpc-handler.factory';

vi.mock('@shared/services/rpc-handler.factory', () => ({
  createRpcHandler: vi.fn(),
}));

vi.mock('@shared/services/shared-store.service', () => ({
  sharedStoreService: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
    isInitialized: vi.fn().mockReturnValue(true),
  },
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockCreateRpcHandler = vi.mocked(createRpcHandler);

/** Minimal fake RPC handler so `initialize()` can succeed where a test needs a live connection. */
function fakeRpcHandler() {
  // The service only touches the members below in these tests; the cast keeps the fake minimal
  // instead of implementing the full IRpcMethodRegistrar surface.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    connect: vi.fn().mockResolvedValue(true),
    disconnect: vi.fn().mockResolvedValue(undefined),
    request: vi.fn(),
    registerMethod: vi.fn(),
    unregisterMethod: vi.fn(),
    registerEvent: vi.fn(),
    unregisterEvent: vi.fn(),
  } as unknown as Awaited<ReturnType<typeof createRpcHandler>>;
}

/**
 * `hasShutDown` and `jsonRpc` are module-level state, so re-import a fresh copy of the service for
 * every test rather than letting one test's shutdown latch leak into the next.
 */
async function importNetworkService() {
  return import('@shared/services/network.service');
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  mockCreateRpcHandler.mockResolvedValue(fakeRpcHandler());
});

// The shutdown latch is the backstop that stops a late boot-race request (e.g. the Power-mode
// startup sync retry loop) from resurrecting a torn-down connection mid-quit. These tests pin the
// ordering it depends on: `shutdown()` sets the latch before anything else, and `initialize()`
// checks it before creating a connection.
describe('network service shutdown latch', () => {
  it('refuses to initialize after shutdown() has begun (never initialized before)', async () => {
    const networkService = await importNetworkService();

    await networkService.shutdown();

    await expect(networkService.initialize()).rejects.toThrow(/shut down/);
    expect(mockCreateRpcHandler).not.toHaveBeenCalled();
  });

  it('rejects a request issued after shutdown() instead of resurrecting the connection', async () => {
    const networkService = await importNetworkService();

    await networkService.shutdown();

    await expect(networkService.requestNoRetry('command:test.command')).rejects.toThrow(
      /shut down/,
    );
    expect(mockCreateRpcHandler).not.toHaveBeenCalled();
  });

  it('refuses to re-initialize a connection that was already torn down', async () => {
    const networkService = await importNetworkService();

    await networkService.initialize();
    expect(mockCreateRpcHandler).toHaveBeenCalledTimes(1);

    await networkService.shutdown();

    await expect(networkService.initialize()).rejects.toThrow(/shut down/);
    expect(mockCreateRpcHandler).toHaveBeenCalledTimes(1);
  });
});
