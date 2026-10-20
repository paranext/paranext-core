import { existsSync, mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  applyPendingFirstRunReset,
  startFirstRunServiceRouter,
} from '@main/services/first-run.service-router';
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
    // A real temporary folder standing in for Electron's userData folder.
    userDataPath: '',
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

vi.mock('electron', () => ({ app: { getPath: () => mocks.userDataPath } }));
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
  'setting platform.syncOnStartup=true',
  'setting platform.showRegistrationReminderOnStartup=true',
];

function isSimpleModePending(): boolean {
  return existsSync(path.join(mocks.userDataPath, 'first-run-reset-simple-mode-pending'));
}

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
    mocks.userDataPath = mkdtempSync(path.join(tmpdir(), 'first-run-router-'));
    await startFirstRunServiceRouter();
  });

  afterEach(() => {
    rmSync(mocks.userDataPath, { recursive: true, force: true });
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
      'clear renderer state',
      ...SETTINGS_RESET,
      'command platform.restart',
    ]);
  });

  test('leaves the switch to Simple mode to the next startup', async () => {
    // Switching now would close a Power user's secondary windows and make the quit sync every open
    // editor's project instead of following the Power-mode schedule.
    withWindows({ 2: firstRunShard() });
    let wasPendingAtRestart = false;
    mocks.sendCommand.mockImplementationOnce(async (command: string) => {
      if (command === 'platform.restart') wasPendingAtRestart = isSimpleModePending();
    });

    await resetHandler()();

    expect(mocks.settingsSet).not.toHaveBeenCalledWith('platform.interfaceMode', expect.anything());
    expect(wasPendingAtRestart).toBe(true);

    // The next startup.
    await applyPendingFirstRunReset();

    expect(mocks.settingsSet).toHaveBeenLastCalledWith('platform.interfaceMode', 'simple');
    expect(isSimpleModePending()).toBe(false);
  });

  test('a startup with no reset pending changes no settings', async () => {
    await applyPendingFirstRunReset();

    expect(mocks.settingsSet).not.toHaveBeenCalled();
  });

  test('a reset is finished only once, even when switching to Simple mode fails', async () => {
    withWindows({ 2: firstRunShard() });
    await resetHandler()();
    mocks.settingsSet.mockRejectedValueOnce(new Error('extension host is gone'));

    await expect(applyPendingFirstRunReset()).resolves.toBeUndefined();
    mocks.settingsSet.mockClear();
    await applyPendingFirstRunReset();

    expect(mocks.settingsSet).not.toHaveBeenCalled();
  });

  test.each(['copyFromParatext9', 'clear'])(
    "asks the data provider to reset the registration ('%s') before restarting",
    async (registration) => {
      withWindows({ 2: firstRunShard() });

      await resetHandler()({ registration });

      expect(mocks.steps).toEqual([
        `command paratextRegistration.resetForFirstRun ["${registration}"]`,
        'clear renderer state',
        ...SETTINGS_RESET,
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

  test('changes nothing when there is no window to clear the renderer state in', async () => {
    // Without that, the next launch would read the renderer's cache as "first run complete".
    mocks.getTargetWindowId.mockReturnValue(undefined);

    await expect(resetHandler()({ registration: 'clear' })).rejects.toThrow('No windows available');
    expect(mocks.steps).toEqual([]);
  });

  test('changes no settings when the data provider refuses the registration reset', async () => {
    withWindows({ 2: firstRunShard() });
    mocks.sendCommand.mockImplementationOnce(async () => {
      throw new Error('Refusing to reset registration');
    });

    await expect(resetHandler()({ registration: 'clear' })).rejects.toThrow('Refusing');
    expect(mocks.steps).toEqual([]);
    expect(isSimpleModePending()).toBe(false);
  });
});
