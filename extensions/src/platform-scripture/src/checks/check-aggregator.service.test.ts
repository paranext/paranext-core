import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { IDisposableDataProvider } from '@papi/core';
import type { ICheckAggregatorService } from 'platform-scripture';

// The @papi/backend alias resolves to extensions/__test-mocks__/@papi/backend.ts (see
// extensions/vitest.config.ts). vi.resetModules() is used per test because the service caches its
// initialization (createCachedInitializer), so each test re-imports a fresh copy. initialize() is
// what the serviceObject proxy awaits on every use, so testing it directly covers proxy access too.
async function loadService() {
  vi.resetModules();
  const { default: papi } = await import('@papi/backend');
  const service = await import('./check-aggregator.service');
  return {
    service,
    registerEngine: vi.mocked(papi.dataProviders.registerEngine),
  };
}

/** A fake disposable data provider returned by a mocked registerEngine call */
function makeDataProvider() {
  // The tests only need a disposable object back from registerEngine
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    dispose: vi.fn().mockResolvedValue(true),
  } as unknown as IDisposableDataProvider<ICheckAggregatorService>;
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('check aggregator initialization', () => {
  it('registers the data provider engine on initialization', async () => {
    const { service, registerEngine } = await loadService();
    registerEngine.mockResolvedValue(makeDataProvider());

    await expect(service.checkAggregatorService.initialize()).resolves.toBeUndefined();

    expect(registerEngine).toHaveBeenCalledOnce();
    expect(registerEngine).toHaveBeenCalledWith(
      'platformScripture.checkAggregator',
      expect.anything(),
    );
  });

  it('shares a single registration across concurrent and subsequent calls', async () => {
    const { service, registerEngine } = await loadService();
    registerEngine.mockResolvedValue(makeDataProvider());

    await Promise.all([
      service.checkAggregatorService.initialize(),
      service.checkAggregatorService.initialize(),
    ]);
    await service.checkAggregatorService.initialize();

    expect(registerEngine).toHaveBeenCalledOnce();
  });

  it('retries after a failed registerEngine and succeeds', async () => {
    const { service, registerEngine } = await loadService();
    registerEngine
      .mockRejectedValueOnce(new Error('engine registration failed'))
      .mockResolvedValueOnce(makeDataProvider());

    await expect(service.checkAggregatorService.initialize()).rejects.toThrow(
      'engine registration failed',
    );
    // The cached rejection was cleared, so the next call retries instead of failing forever
    await expect(service.checkAggregatorService.initialize()).resolves.toBeUndefined();

    expect(registerEngine).toHaveBeenCalledTimes(2);
  });
});
