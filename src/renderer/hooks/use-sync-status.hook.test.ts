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
  SYNC_SEED_RETRY_INTERVAL_MS,
  SYNC_SEED_RETRY_WINDOW_MS,
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

/** A queued answer that `sendCommand` resolves only after some fake time has passed. */
type DelayedAnswer = { delayMs: number; answer: unknown };

/**
 * Marks a queued answer as slow, so the read stays in flight across a microtask flush. That is the
 * only way to observe what the hook shows WHILE a read is pending, since a flush would otherwise
 * settle the read and the rendering it drives in the same step.
 */
function delayedAnswer(answer: unknown, delayMs: number): DelayedAnswer {
  return { delayMs, answer };
}

function isDelayedAnswer(answer: unknown): answer is DelayedAnswer {
  if (typeof answer !== 'object' || !answer) return false;
  return 'delayMs' in answer && 'answer' in answer;
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
    if (isDelayedAnswer(answer)) {
      await new Promise((resolve) => {
        setTimeout(resolve, answer.delayMs);
      });
      return answer.answer;
    }
    return answer;
  };
  // sendCommand's return type is resolved from the command name, so no single implementation
  // satisfies its generic signature; every mock of it in this repo asserts through.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(sendCommand).mockImplementation(implementation as unknown as typeof sendCommand);

  return {
    mockGetSyncState: (...answers: (Partial<SyncState> | DelayedAnswer | Error)[]) =>
      queues.set('paratextBibleSendReceive.getSyncState', answers),
    mockGetSyncActivity: (...answers: (unknown | Error)[]) =>
      queues.set('paratextBibleSendReceive.getSyncActivity', answers),
    countGetSyncStateCalls: () =>
      vi
        .mocked(sendCommand)
        .mock.calls.filter((call) => call[0] === 'paratextBibleSendReceive.getSyncState').length,
    countGetSyncActivityCalls: () =>
      vi
        .mocked(sendCommand)
        .mock.calls.filter((call) => call[0] === 'paratextBibleSendReceive.getSyncActivity').length,
  };
}

function mockProjectNames(namesById: Record<string, string>) {
  const metadata = Object.entries(namesById).map(([id, name]) => ({ id, name }));
  // mockResolvedValue's parameter type comes from the real service's full metadata shape; the hook
  // reads only `id`/`name`, so asserting through avoids fabricating every other required field.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue(metadata as never);
}

function mockProjectName(projectId: string, name: string) {
  mockProjectNames({ [projectId]: name });
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

  it('keeps activity-derived project ids through a claim event that clears the claim set', async () => {
    // Regression guard for two writers on one piece of state: handleSyncStateChanged deliberately
    // clears syncingProjectIds before re-reading it. If the activity handler wrote into that same
    // state, this clear would wipe the activity-derived ids too, and the activity signal's PROJ1
    // would be gone for good once the claim's re-read came back naming no projects of its own.
    commands.mockGetSyncState(
      { isSyncing: true, syncingProjectIds: ['PROJ1'], lastRequestedProjectIds: [] },
      // The re-read after the event: the claim no longer names any project, so what the hook shows
      // from here on can only come from the activity signal's own state.
      { isSyncing: false, lastRequestedProjectIds: [] },
    );
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    mockProjectName('PROJ1', 'HNF');
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);

    emitSyncStateChanged({ isSyncing: true });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });

  it('names no projects while the claim re-read is in flight, rather than a stale activity set', async () => {
    // handleSyncStateChanged clears the claim set before re-reading it, so an empty claim set means
    // "the claim names nothing" only once that read has answered. Treating the deliberate clear as
    // an answer would hand the gap to the activity signal, whose snapshot can still name the
    // project the claim has just stopped reporting — a name the user would see for the read's
    // length. PROJ2 is that project: the claim drops it, the stale activity snapshot still has it.
    const slowReadMs = 5000;
    commands.mockGetSyncState(
      { isSyncing: true, syncingProjectIds: ['PROJ1', 'PROJ2'], lastRequestedProjectIds: [] },
      delayedAnswer(
        { isSyncing: true, syncingProjectIds: ['PROJ1'], lastRequestedProjectIds: [] },
        slowReadMs,
      ),
    );
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1', 'PROJ2'] });
    mockProjectNames({ PROJ1: 'HNF', PROJ2: 'XYZ' });
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.syncingProjects).toEqual([
      { projectId: 'PROJ1', name: 'HNF' },
      { projectId: 'PROJ2', name: 'XYZ' },
    ]);

    // PROJ2 finished, so the claim releases it and reports the shrunken set as `isSyncing: true`.
    emitSyncStateChanged({ isSyncing: true });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    // Mid-read: nothing is named. The activity signal must not fill the gap with PROJ2.
    expect(result.current.syncingProjects).toEqual([]);
    // The status never goes quiet during the window — only the names are withheld.
    expect(result.current.status).toBe('syncing');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(slowReadMs);
    });

    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });

  it('reports syncing when the claim read fails but the activity signal says syncing', async () => {
    // Regression guard: `unknown` means "the claim could not tell", not "nothing is syncing". The
    // union must win over an `unknown` claim just as it wins over `idle`.
    commands.mockGetSyncState(new Error('extension host not ready'));
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + 1000);
    });

    expect(result.current.status).toBe('syncing');
  });

  it('reports unknown once the claim seed exhausts its retry window with no answer', async () => {
    // The other half of the same case: with no activity signal claiming a sync either, running out
    // of retry budget must be reported as `unknown` rather than left at the initial `idle`, which
    // would claim nothing has synced on the strength of a read that never succeeded.
    commands.mockGetSyncState(new Error('extension host not ready'));
    commands.mockGetSyncActivity({ isSyncing: false, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);
    });
    // Still inside the window, so the seed is retrying rather than giving up.
    expect(result.current.status).toBe('idle');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS);
    });

    expect(result.current.status).toBe('unknown');
  });

  it('retries the activity seed and recovers once a later attempt answers', async () => {
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
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);
    });

    expect(commands.countGetSyncActivityCalls()).toBe(2);
    expect(result.current.status).toBe('syncing');
  });

  it('stops the claim seed on unmount, both its pending retry and its in-flight read', async () => {
    // Both halves of the seed's teardown. A pending retry that outlives the hook keeps reading for
    // the rest of the retry window, and a read still in flight at unmount comes back to schedule
    // the next retry — and to set state on a hook that no longer exists — unless its run is
    // recognised as abandoned.
    commands.mockGetSyncState(new Error('extension host not ready'));
    commands.mockGetSyncActivity(new Error('method not found'));

    const withPendingRetry = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(commands.countGetSyncStateCalls()).toBe(1);

    withPendingRetry.unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });
    expect(commands.countGetSyncStateCalls()).toBe(1);

    // Unmounting before any flush leaves the mount read in flight, which is the other half.
    vi.mocked(sendCommand).mockClear();
    const withReadInFlight = renderHook(() => useSyncStatus());
    withReadInFlight.unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });

    expect(commands.countGetSyncStateCalls()).toBe(1);
  });

  it('stops the activity seed on unmount, both its pending retry and its in-flight read', async () => {
    // Same teardown, on the activity seed's own effect, refs and retry budget — see the claim-seed
    // test above.
    commands.mockGetSyncState(new Error('extension host not ready'));
    commands.mockGetSyncActivity(new Error('method not found'));

    const withPendingRetry = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(commands.countGetSyncActivityCalls()).toBe(1);

    withPendingRetry.unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });
    expect(commands.countGetSyncActivityCalls()).toBe(1);

    vi.mocked(sendCommand).mockClear();
    const withReadInFlight = renderHook(() => useSyncStatus());
    withReadInFlight.unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });

    expect(commands.countGetSyncActivityCalls()).toBe(1);
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

  it('names a project whose metadata casing differs from the id send/receive reported', async () => {
    // getMetadataForAllProjects filters includeProjectIds case-insensitively, and the metadata it
    // returns carries the casing of whichever factory reported the project first. So the filter can
    // return the project while a raw-id map lookup misses it, labelling it with its bare id.
    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: ['proj1'],
      lastRequestedProjectIds: [],
    });
    commands.mockGetSyncActivity({ isSyncing: false, projectIds: [] });
    mockProjectName('PROJ1', 'HNF');

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    // The id keeps the casing send/receive reported — only the NAME comes from the metadata.
    expect(result.current.syncingProjects).toEqual([{ projectId: 'proj1', name: 'HNF' }]);
  });

  it('treats the same project ids in a different casing as an unchanged set', async () => {
    // A casing flip is not a set change: reporting one would re-run the whole metadata lookup and
    // re-render for projects that never changed.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    commands.mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    mockProjectName('PROJ1', 'HNF');
    const { emitSyncActivityChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const projectsBefore = result.current.syncingProjects;
    expect(projectsBefore).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);

    // The same project, reported in the other casing.
    emitSyncActivityChanged({ isSyncing: true, projectIds: ['proj1'] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    // Same array identity: the set was recognised as unchanged, so nothing was re-resolved.
    expect(result.current.syncingProjects).toBe(projectsBefore);
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
