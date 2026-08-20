import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import type {
  SyncActivitySnapshot,
  SyncProgressEvent,
  SyncState,
} from 'paratext-bible-send-receive';
import {
  SYNC_STATE_SEED_RETRY_INTERVAL_MS,
  SYNC_STATE_SEED_RETRY_WINDOW_MS,
  useSyncStatus,
} from './use-sync-status.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));
vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: { getMetadataForAllProjects: vi.fn(async () => []) },
}));

// --- Helpers ---

/**
 * Captures the callbacks the hook subscribes to each network event with, keyed by event name, so
 * tests can fire them individually. Must be installed before `renderHook`.
 */
function captureEventCallbacks() {
  const callbacks = new Map<string, (payload: unknown) => void>();
  vi.mocked(getNetworkEvent).mockImplementation(
    (eventName: string) =>
      // getNetworkEvent returns PlatformEvent, whose generic signature (parameterized per event
      // name) is incompatible with a single vi.fn implementation shared across every event name.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      vi.fn((cb: (payload: unknown) => void) => {
        callbacks.set(eventName, cb);
        return vi.fn();
      }) as never,
  );
  return {
    emitSyncStateChanged: (payload: SyncProgressEvent) => {
      const cb = callbacks.get('paratextBibleSendReceive.onSyncStateChanged');
      if (!cb) throw new Error('onSyncStateChanged callback was not captured');
      act(() => cb(payload));
    },
    emitSyncActivityChanged: (payload: SyncActivitySnapshot) => {
      const cb = callbacks.get('paratextBibleSendReceive.onSyncActivityChanged');
      if (!cb) throw new Error('onSyncActivityChanged callback was not captured');
      act(() => cb(payload));
    },
  };
}

/**
 * Routes `sendCommand` to per-command answer queues so `getSyncState` and `getSyncActivity` can be
 * mocked independently in the same test. Each command repeats its last answer once its queue is
 * exhausted, matching `mockAvailabilityAnswers`'s style in the sibling
 * `use-send-receive-availability.hook.test.ts`.
 */
function mockCommands() {
  const queues = new Map<string, (unknown | Error)[]>();
  const indices = new Map<string, number>();

  const implementation = async (command: string) => {
    const queue = queues.get(command);
    if (!queue || queue.length === 0) throw new Error(`No mocked answer for ${command}`);
    const index = Math.min((indices.get(command) ?? -1) + 1, queue.length - 1);
    indices.set(command, index);
    const answer = queue[index];
    if (answer instanceof Error) throw answer;
    return answer;
  };
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation(implementation as unknown as typeof sendCommand);

  return {
    mockGetSyncState: (...answers: (Partial<SyncState> | Error)[]) =>
      queues.set('paratextBibleSendReceive.getSyncState', answers),
    mockGetSyncActivity: (...answers: (unknown | Error)[]) =>
      queues.set('paratextBibleSendReceive.getSyncActivity', answers),
    countGetSyncActivityCalls: () =>
      vi
        .mocked(sendCommand)
        .mock.calls.filter((call) => call[0] === 'paratextBibleSendReceive.getSyncActivity').length,
  };
}

function mockProjectName(projectId: string, name: string) {
  // mockResolvedValue's parameter type comes from the real service's full metadata shape; the hook
  // reads only `id`/`name`, so asserting through avoids fabricating every other required field.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
    { id: projectId, name },
  ] as never);
}

describe('useSyncStatus', () => {
  let commands: ReturnType<typeof mockCommands>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    commands = mockCommands();
    // Default both commands to a quiet baseline so a test that only sets up one of them doesn't
    // hang forever waiting on the other's unmocked queue.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: false, projectIds: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports syncing when only the backend activity signal says so', async () => {
    // Regression guard for the Simple-mode startup case this feature exists for:
    // startup-tasks.ts calls the dotnet command directly, so the extension raises no claim and
    // getSyncState answers isSyncing: false. Without the activity union this reports idle.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([]);
  });

  it('names projects once the backend resolves its merge set', async () => {
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: [] });
    mockProjectName('PROJ1', 'HNF');
    const { emitSyncActivityChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    emitSyncActivityChanged({ isSyncing: true, projectIds: ['PROJ1'] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });

  it('stays syncing while either input says syncing, and clearing only one does not drop to idle', async () => {
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['PROJ1'],
      lastRequestedProjectIds: [],
    });
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    const { emitSyncActivityChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    // The backend clears first; the extension claim has not released yet.
    emitSyncActivityChanged({ isSyncing: false, projectIds: [] });

    expect(result.current.status).toBe('syncing');
  });

  it('falls back to the claim alone when the activity command is unavailable', async () => {
    // Public Platform.Bible, or a Studio build predating this signal: getSyncActivity rejects
    // (rather than answering) for the life of the hook, and the toolbar must still be truthful
    // about a claim-visible sync.
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['PROJ1'],
      lastRequestedProjectIds: [],
    });
    commands.mockGetSyncActivity(new Error('method not found'));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
  });

  it('ignores an activity payload in an unexpected shape', async () => {
    // Regression guard: a malformed snapshot from an untrusted cross-process boundary must be
    // dropped by isValidSyncActivity rather than crash the hook or fabricate a status.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: 'yes' });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('idle');
  });

  it('does not wipe activity-derived project ids when a claim event clears the claim set (Ruling 1)', async () => {
    // Regression guard for two writers on one piece of state: handleSyncStateChanged deliberately
    // clears syncingProjectIds before re-reading it. If the activity handler wrote into that same
    // state, this clear would transiently wipe the activity-derived ids too, and effectiveProjectIds
    // would flash empty even though the activity signal still reports PROJ1 syncing.
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['PROJ1'],
      lastRequestedProjectIds: [],
    });
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    mockProjectName('PROJ1', 'HNF');
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);

    // A claim event fires: handleSyncStateChanged clears syncingProjectIds synchronously, then
    // re-reads it. While that read is in flight (still queued as a microtask), effectiveProjectIds
    // must fall back to the activity-derived ids rather than showing an empty list.
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['PROJ1'],
      lastRequestedProjectIds: [],
    });
    emitSyncStateChanged({ isSyncing: true });

    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });

  it('reports syncing when the claim read fails (unknown) but the activity signal says syncing (Ruling 2)', async () => {
    // Regression guard: `unknown` means "the claim could not tell", not "nothing is syncing". The
    // union must win over an `unknown` claim just as it wins over `idle`.
    commands.mockGetSyncState(new Error('extension host not ready'));
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_STATE_SEED_RETRY_WINDOW_MS + 1000);
    });

    expect(result.current.status).toBe('syncing');
  });

  it('retries the activity seed and recovers once a later attempt answers (Ruling 3)', async () => {
    // Regression guard for the case this feature exists for: the renderer can mount while the
    // dotnet backend has not registered getSyncActivity yet (the startup race). A single
    // non-retrying read would reject once and show idle for the rest of the sync, since the next
    // transition event may not arrive until the sync ends.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity(new Error('method not found'), {
      isSyncing: true,
      projectIds: [],
    });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('idle');
    expect(commands.countGetSyncActivityCalls()).toBe(1);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_STATE_SEED_RETRY_INTERVAL_MS);
    });

    expect(commands.countGetSyncActivityCalls()).toBe(2);
    expect(result.current.status).toBe('syncing');
  });

  // --- Pre-existing claim-only behavior (unaffected by the activity union) ---

  it('reports idle when nothing has synced and neither signal says otherwise', async () => {
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: false, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('idle');
    expect(result.current.syncingProjects).toEqual([]);
  });

  it('reports syncing from the claim alone, unaffected by an idle activity signal', async () => {
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['PROJ1'],
      lastRequestedProjectIds: [],
    });
    commands.mockGetSyncActivity({ isSyncing: false, projectIds: [] });
    mockProjectName('PROJ1', 'HNF');

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });
});
