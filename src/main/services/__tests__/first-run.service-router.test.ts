import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startFirstRunServiceRouter } from '@main/services/first-run.service-router';
import {
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import { FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';

const mocks = vi.hoisted(() => {
  // See onboarding-tour.service-router.test.ts: the shard index subscribes once at module load.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  // Every side effect of a reset, in the order the router performs them.
  const steps: string[] = [];
  return {
    steps,
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    registerRequestHandler: vi.fn(),
    networkObjectGet: vi.fn(),
    settingsSet: vi.fn(async (key: string, value: unknown) => {
      steps.push(`setting ${key}=${JSON.stringify(value)}`);
    }),
    sendCommand: vi.fn(async (command: string, ...args: unknown[]) => {
      steps.push(args.length ? `command ${command} ${JSON.stringify(args)}` : `command ${command}`);
    }),
    shardAnnouncementListeners,
    onDidCreateNetworkObject: vi.fn((listener: (details: NetworkObjectDetails) => void) => {
      shardAnnouncementListeners.create.push(listener);
      return () => {};
    }),
    onDidDisposeNetworkObject: vi.fn((listener: (networkObjectId: string) => void) => {
      shardAnnouncementListeners.dispose.push(listener);
      return () => {};
    }),
  };
});

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
}));
vi.mock('@shared/services/network.service', () => ({
  registerRequestHandler: mocks.registerRequestHandler,
  getNetworkEvent: () => vi.fn(),
  createNetworkEventEmitter: () => ({ emit: vi.fn(), dispose: vi.fn() }),
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { set: mocks.settingsSet },
}));
vi.mock('@shared/services/command.service', () => ({ sendCommand: mocks.sendCommand }));

/** A window's first-run service shard, recording when the router asked it to clear */
function firstRunShard() {
  return {
    clearLocalState: vi.fn(async () => {
      mocks.steps.push('clear renderer state');
    }),
  };
}

function withWindows(shardsByWindowId: Record<string, unknown>) {
  withWindowsServingShards(mocks, FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE, shardsByWindowId);
}

function resetHandler(): (options?: unknown) => Promise<void> {
  const call = mocks.registerRequestHandler.mock.calls.find(
    ([requestType]) => requestType === 'command:platform.resetFirstRun',
  );
  return call?.[1];
}

const SETTINGS_RESET = [
  'setting platform.firstRunComplete=false',
  'setting platform.interfaceMode="simple"',
  'setting platform.syncOnStartup=true',
  'setting platform.showRegistrationReminderOnStartup=true',
];

describe('First-run service router', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mocks.steps.length = 0;
    mocks.getTargetWindowId.mockReturnValue('2');
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
    mocks.networkObjectGet.mockResolvedValue(undefined);
    mocks.registerRequestHandler.mockResolvedValue(vi.fn());
    await startFirstRunServiceRouter();
  });

  test('claims exactly the reset command, published as experimental', () => {
    expect(mocks.registerRequestHandler.mock.calls.map(([requestType]) => requestType)).toEqual([
      'command:platform.resetFirstRun',
    ]);
    const docs = mocks.registerRequestHandler.mock.calls[0][2];
    expect(Reflect.get(Reflect.get(Object(docs), 'method') ?? {}, 'x-experimental')).toBe(true);
  });

  test('by default resets settings and renderer state, leaves the registration, then restarts', async () => {
    withWindows({ 2: firstRunShard() });

    await resetHandler()();

    expect(mocks.steps).toEqual([
      ...SETTINGS_RESET,
      'clear renderer state',
      'command platform.restart',
    ]);
  });

  test.each(['copyFromParatext9', 'clear'])(
    "asks the data provider to reset the registration ('%s') before restarting",
    async (registration) => {
      withWindows({ 2: firstRunShard() });

      await resetHandler()({ registration });

      expect(mocks.steps).toEqual([
        ...SETTINGS_RESET,
        `command paratextRegistration.resetForFirstRun ["${registration}"]`,
        'clear renderer state',
        'command platform.restart',
      ]);
    },
  );

  test('rejects an unknown registration option without changing anything', async () => {
    withWindows({ 2: firstRunShard() });

    await expect(resetHandler()({ registration: 'wipe' })).rejects.toThrow(
      "Unknown registration option 'wipe'",
    );
    expect(mocks.steps).toEqual([]);
  });

  test('does not restart when the renderer state could not be cleared', async () => {
    // With no window to clear localStorage in, a restart would come back to a stale cache that
    // still says first run is complete.
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(resetHandler()()).rejects.toThrow('No windows available');
    expect(mocks.steps).not.toContain('command platform.restart');
  });
});
