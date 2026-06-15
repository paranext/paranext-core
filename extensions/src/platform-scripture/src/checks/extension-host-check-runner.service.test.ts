import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IDisposableDataProvider } from '@papi/core';
import type { ICheckRunner } from 'platform-scripture';

// The @papi/backend alias resolves to extensions/__test-mocks__/@papi/backend.ts (see
// extensions/vitest.config.ts). vi.resetModules() is used per test because the service caches its
// initialization (createCachedInitializer) and the engine instance at module scope, so each test
// re-imports both the service and the mock to start from a clean slate.
/** Re-imports the check-runner service fresh with its mocked dependencies. */
async function loadService() {
  vi.resetModules();
  const { default: papi, dataProviders } = await import('@papi/backend');
  const service = await import('./extension-host-check-runner.service');
  return {
    service,
    registerEngine: vi.mocked(dataProviders.registerEngine),
    registerCommand: vi.mocked(papi.commands.registerCommand),
  };
}

/** A fake disposable data provider returned by a mocked registerEngine call */
function makeDataProvider() {
  // The tests only need a disposable object back from registerEngine
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    dispose: vi.fn().mockResolvedValue(true),
  } as unknown as IDisposableDataProvider<ICheckRunner>;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('check runner initialization', () => {
  it('registers the engine and the registerCheck command', async () => {
    const { service, registerEngine, registerCommand } = await loadService();
    registerEngine.mockResolvedValue(makeDataProvider());
    registerCommand.mockResolvedValue(vi.fn());

    await expect(service.checkHostingService.initialize()).resolves.toBeUndefined();

    expect(registerEngine).toHaveBeenCalledOnce();
    expect(registerEngine).toHaveBeenCalledWith(
      'platformScripture.extensionHostCheckRunner',
      expect.anything(),
      expect.anything(),
    );
    expect(registerCommand).toHaveBeenCalledOnce();
  });

  it('shares a single initialization across concurrent and subsequent calls', async () => {
    const { service, registerEngine, registerCommand } = await loadService();
    registerEngine.mockResolvedValue(makeDataProvider());
    registerCommand.mockResolvedValue(vi.fn());

    await Promise.all([
      service.checkHostingService.initialize(),
      service.checkHostingService.initialize(),
    ]);
    await service.checkHostingService.initialize();

    // Cached: the engine is registered exactly once no matter how many callers invoke initialize
    expect(registerEngine).toHaveBeenCalledOnce();
  });

  it('disposes the engine and registers a fresh one when a retry follows a partial failure', async () => {
    const { service, registerEngine, registerCommand } = await loadService();
    const dp1 = makeDataProvider();
    const dp2 = makeDataProvider();
    registerEngine.mockResolvedValueOnce(dp1).mockResolvedValueOnce(dp2);
    // First attempt: engine registers, but the command registration fails after it
    registerCommand
      .mockRejectedValueOnce(new Error('command registration failed'))
      .mockResolvedValueOnce(vi.fn());

    await expect(service.checkHostingService.initialize()).rejects.toThrow(
      'command registration failed',
    );
    // The failed attempt's data provider was disposed during cleanup so the engine is not left
    // registered (which would make the retry's registerEngine fail on the taken name)
    expect(dp1.dispose).toHaveBeenCalledOnce();

    // The cached rejection was cleared, so this retries and succeeds
    await expect(service.checkHostingService.initialize()).resolves.toBeUndefined();

    expect(registerEngine).toHaveBeenCalledTimes(2);
    // The retry must register a FRESH engine instance, not the one registerEngine already mutated
    // and whose update emitter was disposed during cleanup (re-registering that instance would
    // double-layer notifyUpdate over a disposed emitter and throw on the next notifyUpdate).
    const firstEngine = registerEngine.mock.calls[0][1];
    const secondEngine = registerEngine.mock.calls[1][1];
    expect(secondEngine).not.toBe(firstEngine);
  });

  it('retries with a fresh engine when the engine registration itself fails', async () => {
    const { service, registerEngine, registerCommand } = await loadService();
    registerEngine
      .mockRejectedValueOnce(new Error('engine registration failed'))
      .mockResolvedValueOnce(makeDataProvider());
    registerCommand.mockResolvedValue(vi.fn());

    await expect(service.checkHostingService.initialize()).rejects.toThrow(
      'engine registration failed',
    );
    await expect(service.checkHostingService.initialize()).resolves.toBeUndefined();

    expect(registerEngine).toHaveBeenCalledTimes(2);
    const firstEngine = registerEngine.mock.calls[0][1];
    const secondEngine = registerEngine.mock.calls[1][1];
    expect(secondEngine).not.toBe(firstEngine);
  });
});
