import { beforeEach, describe, expect, test, vi } from 'vitest';
import { ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';

const mocks = vi.hoisted(() => ({
  networkObjectSet: vi.fn(),
  requestTourReplay: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.networkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));
vi.mock('@renderer/components/onboarding-tour/onboarding-tour.store', () => ({
  requestTourReplay: mocks.requestTourReplay,
}));

/** Register the shard and hand back the object the main process's router calls into */
async function registerShard() {
  const { startOnboardingTourServiceShard } = await import(
    '@renderer/services/onboarding-tour.service-shard'
  );
  await startOnboardingTourServiceShard();
  return {
    networkObjectName: mocks.networkObjectSet.mock.calls[0][0],
    shard: mocks.networkObjectSet.mock.calls[0][1],
    objectType: mocks.networkObjectSet.mock.calls[0][2],
    attributes: mocks.networkObjectSet.mock.calls[0][3],
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.networkObjectSet.mockResolvedValue({ dispose: vi.fn() });
  // A renderer receives its window id as a string query parameter
  globalThis.windowId = '1';
});

describe('Onboarding tour service shard registration', () => {
  test('registers under this window’s scoped name so several windows can coexist', async () => {
    const { networkObjectName } = await registerShard();

    expect(networkObjectName).toBe('OnboardingTourService-1');
  });

  test('announces the type and window id the router discovers it by', async () => {
    // The router never rebuilds the scoped name — it indexes on these two, so a shard that
    // registered without them could not be routed to.
    const { objectType, attributes } = await registerShard();

    expect(objectType).toBe(ONBOARDING_TOUR_SERVICE_SHARD_OBJECT_TYPE);
    expect(attributes).toEqual({ windowId: 1 });
  });

  test('refuses to register a shard nothing could be routed to', async () => {
    globalThis.windowId = '';
    const { startOnboardingTourServiceShard } = await import(
      '@renderer/services/onboarding-tour.service-shard'
    );

    await expect(startOnboardingTourServiceShard()).rejects.toThrow('windowId is not set');
  });
});

describe('what the shard does when the router calls it', () => {
  test('asks this window’s tour to run again', async () => {
    const { shard } = await registerShard();

    await shard.show();

    expect(mocks.requestTourReplay).toHaveBeenCalledTimes(1);
  });
});
