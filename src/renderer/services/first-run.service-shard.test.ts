import { beforeEach, describe, expect, test, vi } from 'vitest';
import { FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';

const mocks = vi.hoisted(() => ({ networkObjectSet: vi.fn() }));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { set: mocks.networkObjectSet, get: vi.fn() },
  onDidCreateNetworkObject: vi.fn(() => vi.fn()),
  onDidDisposeNetworkObject: vi.fn(() => vi.fn()),
}));

/** Register the shard and hand back the object the main process's router calls into */
async function registerShard() {
  const { startFirstRunServiceShard } = await import('@renderer/services/first-run.service-shard');
  await startFirstRunServiceShard();
  return {
    networkObjectName: mocks.networkObjectSet.mock.calls[0][0],
    shard: mocks.networkObjectSet.mock.calls[0][1],
    objectType: mocks.networkObjectSet.mock.calls[0][2],
    attributes: mocks.networkObjectSet.mock.calls[0][3],
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  mocks.networkObjectSet.mockResolvedValue({ dispose: vi.fn() });
  globalThis.windowId = '1';
});

describe('First-run service shard registration', () => {
  test('registers under this window’s scoped name with the type and window the router finds it by', async () => {
    const { networkObjectName, objectType, attributes } = await registerShard();

    expect(networkObjectName).toBe('FirstRunService-1');
    expect(objectType).toBe(FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE);
    expect(attributes).toEqual({ windowId: '1' });
  });

  test('refuses to register a shard nothing could be routed to', async () => {
    globalThis.windowId = '';
    const { startFirstRunServiceShard } = await import(
      '@renderer/services/first-run.service-shard'
    );

    await expect(startFirstRunServiceShard()).rejects.toThrow('windowId is not set');
  });
});

describe('clearing local state', () => {
  test('forgets first-run progress, the tour, and the cached interface mode, but not other state', async () => {
    const cleared = [
      'platform-bible.firstRunComplete',
      'platform-bible.firstRunWizardActive',
      'platform-bible.firstRunJustRegistered',
      'platform-bible.firstRunRegisteredInWizard',
      'platform-bible.syncOnStartupDisabled',
      'platform-bible.onboardingTourComplete',
    ];
    cleared.forEach((key) => localStorage.setItem(key, 'true'));
    localStorage.setItem('platform-bible.interfaceMode', 'power');
    localStorage.setItem('platform-bible.firstRunDemoMode', 'true');
    localStorage.setItem('platform-bible.lastOpenedProject', 'abc');
    const { shard } = await registerShard();

    await shard.clearLocalState();

    // Names any key left behind, rather than just failing on a null check.
    expect(
      [...cleared, 'platform-bible.interfaceMode'].filter(
        (key) => typeof localStorage.getItem(key) === 'string',
      ),
    ).toEqual([]);
    expect(localStorage.getItem('platform-bible.firstRunDemoMode')).toBe('true');
    expect(localStorage.getItem('platform-bible.lastOpenedProject')).toBe('abc');
  });
});
