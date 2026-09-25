import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import {
  resetSyncActivity,
  setSyncActivity,
  setSyncActivityUnknown,
} from '@renderer/services/sync-activity-store';
import type { SyncProgressEvent, SyncState } from 'paratext-bible-send-receive';
import {
  SYNC_SEED_RETRY_INTERVAL_MS,
  SYNC_SEED_RETRY_WINDOW_MS,
  useSyncStatus,
} from './use-sync-status.hook';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(() => vi.fn(() => vi.fn())),
  // `network-object.service` reaches this module through a namespace import and subscribes at
  // module scope, so the factory has to carry this export even though no test here fires it.
  onDidDisconnectClient: vi.fn(() => vi.fn()),
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
    emitExtensionsReloaded: () => {
      const cb = callbacks.get('platform.onDidReloadExtensions');
      if (!cb) throw new Error('onDidReloadExtensions callback was not captured');
      act(() => cb(undefined));
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
    countGetSyncStateCalls: () =>
      vi
        .mocked(sendCommand)
        .mock.calls.filter((call) => call[0] === 'paratextBibleSendReceive.getSyncState').length,
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

/**
 * A snapshot of a session whose last sync has finished, carrying `resultsInfo` verbatim so a test
 * can hand the hook the malformed shapes it has to survive as well as well-formed ones.
 */
function completedStateWithResults(
  resultsInfo: unknown,
  sendReceiveDate = '2026-08-24T00:00:00Z',
): Partial<SyncState> {
  return {
    isSyncing: false,
    lastRequestedProjectIds: [],
    // `resultsInfo` is deliberately typed `unknown` here: these tests cover what the hook does with
    // wire data that does NOT match the declared shape, which is unexpressible through `ResultsData`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    lastResults: {
      sendReceiveDate,
      resultsInfo,
    } as SyncState['lastResults'],
  };
}

/**
 * A completed sync in which each project reported the given `resultStatus`. `sendReceiveDate` dates
 * the verdict, which is what orders it against the backend's own outcome time.
 */
function completedStateFor(
  statusByProjectId: Record<string, string>,
  sendReceiveDate?: string,
): Partial<SyncState> {
  return completedStateWithResults(
    Object.fromEntries(
      Object.entries(statusByProjectId).map(([projectId, resultStatus]) => [
        projectId,
        { id: projectId, resultStatus },
      ]),
    ),
    sendReceiveDate,
  );
}

/**
 * Pre-seeds the shared sync-activity store, standing in for `initSyncActivityService` having
 * already seeded it before this hook renders. Called BEFORE `renderHook`.
 *
 * The activity signal is no longer this hook's to fetch: one startup service owns the subscription,
 * the seed and its retries, and every consumer reads the store. So these tests supply that input
 * directly, and the seeding/retry/validation behaviour is covered in
 * `src/renderer/services/sync-activity-service.test.ts`.
 */
function seedActivity(snapshot: Parameters<typeof setSyncActivity>[0]) {
  setSyncActivity(snapshot);
}

/** Pushes a later activity snapshot while the hook is mounted. */
function pushActivity(snapshot: Parameters<typeof setSyncActivity>[0]) {
  act(() => setSyncActivity(snapshot));
}

/** Puts the activity signal back to "could not tell". */
function pushActivityUnknown() {
  act(() => setSyncActivityUnknown());
}

describe('useSyncStatus', () => {
  let commands: ReturnType<typeof mockCommands>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    resetSyncActivity();
    commands = mockCommands();
    // Quiet baseline so a test that only sets up the claim doesn't hang on an unmocked queue, and so
    // the activity signal contributes nothing unless a test says otherwise.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: false, projectIds: [] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('reports syncing when only the backend activity signal says so', async () => {
    // Regression guard for the Simple-mode startup case this feature exists for:
    // startup-tasks.ts calls the dotnet command directly, so the extension raises no claim and
    // getSyncState answers isSyncing: false. Without the activity union this reports idle.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: true, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([]);
  });

  it('names projects once the backend resolves its merge set', async () => {
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: true, projectIds: [] });
    mockProjectName('PROJ1', 'HNF');
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    pushActivity({ isSyncing: true, projectIds: ['PROJ1'] });
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
    seedActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    // The backend clears first; the extension claim has not released yet.
    pushActivity({ isSyncing: false, projectIds: [] });

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
    // No activity snapshot at all: the store's initial "could not tell".

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
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
    seedActivity({ isSyncing: true, projectIds: ['PROJ1'] });
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
    seedActivity({ isSyncing: true, projectIds: ['PROJ1', 'PROJ2'] });
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
    seedActivity({ isSyncing: true, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + 1000);
    });

    expect(result.current.status).toBe('syncing');
  });

  it('reports unknown once the claim seed exhausts its retry window with no answer', async () => {
    // The other half of the same case: with no activity signal claiming a sync either, running out
    // of retry budget must be reported as `unknown`, and must never fall back to `idle` — that
    // would claim nothing has synced on the strength of a read that never succeeded.
    commands.mockGetSyncState(new Error('extension host not ready'));
    seedActivity({ isSyncing: false, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    const readsAfterFirstAttempt = commands.countGetSyncStateCalls();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);
    });
    // Inside the window the status is unreadable either way, so what separates "still retrying"
    // from "gave up" is another attempt having been made.
    expect(commands.countGetSyncStateCalls()).toBeGreaterThan(readsAfterFirstAttempt);
    expect(result.current.status).not.toBe('idle');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS);
    });

    expect(result.current.status).toBe('unknown');
  });

  it('stops the claim seed on unmount, both its pending retry and its in-flight read', async () => {
    // Both halves of the seed's teardown. A pending retry that outlives the hook keeps reading for
    // the rest of the retry window, and a read still in flight at unmount comes back to schedule
    // the next retry — and to set state on a hook that no longer exists — unless its run is
    // recognised as abandoned.
    commands.mockGetSyncState(new Error('extension host not ready'));

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

  it('reports idle when nothing has synced and neither signal says otherwise', async () => {
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: false, projectIds: [] });

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
    seedActivity({ isSyncing: false, projectIds: [] });
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
    seedActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    mockProjectName('PROJ1', 'HNF');
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const projectsBefore = result.current.syncingProjects;
    expect(projectsBefore).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);

    // The same project, reported in the other casing.
    pushActivity({ isSyncing: true, projectIds: ['proj1'] });
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
    seedActivity({ isSyncing: false, projectIds: [] });
    mockProjectName('PROJ1', 'HNF');

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([{ projectId: 'PROJ1', name: 'HNF' }]);
  });

  // --- What a completed sync's results are allowed to claim ---

  it('reports synced when every project in the last sync reported a success status', async () => {
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded', PROJ2: 'initialSend' }));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('synced');
  });

  it('reports failed when any project in the last sync did not succeed', async () => {
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded', PROJ2: 'failed' }));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('failed');
  });

  it('reports unknown for a completed sync that carries no per-project outcomes', async () => {
    // An empty results map satisfies `every` vacuously, so reading it as a success would put a green
    // check on a sync that reported nothing whatsoever about what happened to any project.
    commands.mockGetSyncState(completedStateWithResults({}));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('unknown');
  });

  it('reports unknown for a completed sync whose results are not a readable map', async () => {
    commands.mockGetSyncState(completedStateWithResults('garbage'));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('unknown');
  });

  it('reports unknown for a result status this build does not recognize', async () => {
    // Send/receive may add statuses. Treating an unclassifiable one as a success by omission — which
    // is what checking only a known-FAILURE set does — reports a success on no evidence at all.
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'cancelled' }));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('unknown');
  });

  it('reports unknown for a result carrying no resultStatus at all', async () => {
    commands.mockGetSyncState(completedStateWithResults({ PROJ1: { id: 'PROJ1' } }));

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('unknown');
  });

  // --- Which sync a verdict is allowed to describe ---

  it('does not present the claim’s earlier verdict as the outcome of an activity-only sync', async () => {
    // The Simple-mode startup sync is invisible to the claim, so when it ends the claim's `synced`
    // describes an earlier, unrelated sync. Inheriting it would decorate this sync with a green
    // check — and would do so even if this sync had failed. With no outcome from the activity signal
    // either — a build that cannot say — `unknown` is the whole of what is knowable.
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded' }));
    seedActivity({ isSyncing: false, projectIds: [] });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('synced');

    pushActivity({ isSyncing: true, projectIds: [] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    pushActivity({ isSyncing: false, projectIds: [] });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('unknown');
  });

  it.each([
    { outcome: 'succeeded', earlierClaimResult: 'failed', expected: 'synced' },
    { outcome: 'failed', earlierClaimResult: 'succeeded', expected: 'failed' },
  ] as const)(
    'reports an activity-only sync as $expected when the backend says it $outcome',
    async ({ outcome, earlierClaimResult, expected }) => {
      // The activity signal's outcome is the one verdict that describes a sync the claim never saw.
      // The claim's own verdict is deliberately the OPPOSITE here, so a derivation that fell back to
      // that earlier, unrelated sync cannot pass by agreeing with it.
      commands.mockGetSyncState(completedStateFor({ PROJ1: earlierClaimResult }));
      seedActivity({ isSyncing: false, projectIds: [] });
      captureEventCallbacks();

      const { result } = renderHook(() => useSyncStatus());
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });

      pushActivity({ isSyncing: true, projectIds: [] });
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });
      expect(result.current.status).toBe('syncing');

      pushActivity({ isSyncing: false, projectIds: [], outcome });
      await act(async () => {
        await vi.advanceTimersByTimeAsync(0);
      });

      expect(result.current.status).toBe(expected);
      // The verdict came from the backend, so a caller offering the claim's detail has none to show.
      expect(result.current.isVerdictFromBackendOnly).toBe(true);
    },
  );

  it('keeps the claim’s verdict for a sync it saw, even when the outcome disagrees', async () => {
    // When the claim saw the sync too, its verdict describes THAT sync, so the suppression above
    // must not reach it — otherwise every ordinary sync would end in `unknown`. Its per-project
    // results are also the richer account of that same run, so they win over a coarse outcome that
    // contradicts them rather than both being consulted.
    commands.mockGetSyncState(
      { isSyncing: true, syncingProjectIds: ['PROJ1'], lastRequestedProjectIds: [] },
      completedStateFor({ PROJ1: 'succeeded' }),
    );
    seedActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    emitSyncStateChanged({ isSyncing: false });
    pushActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('synced');
  });

  it('keeps the claim’s verdict for a run it saw, even when the outcome is dated later', async () => {
    // Both verdicts describe the SAME run here, and the backend's closing snapshot is dated after
    // the claim's results — which is the ordinary ordering, since the run bracket closes last.
    // Ordering them by time would hand an ordinary sync to the coarse verdict and take the detail
    // view's entry point with it, so the claim having seen the run has to settle it first.
    commands.mockGetSyncState(
      { isSyncing: true, syncingProjectIds: ['PROJ1'], lastRequestedProjectIds: [] },
      completedStateFor({ PROJ1: 'succeeded' }, '2026-09-18T10:00:00Z'),
    );
    seedActivity({ isSyncing: true, projectIds: ['PROJ1'] });
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    emitSyncStateChanged({ isSyncing: false });
    pushActivity({
      isSyncing: false,
      projectIds: [],
      outcome: 'failed',
      completedAt: '2026-09-18T10:05:00Z',
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('synced');
    // And the verdict is the claim's, so the caller can still offer the detail behind it.
    expect(result.current.isVerdictFromBackendOnly).toBe(false);
  });

  it('reports the backend outcome when it describes a later run than the claim’s verdict', async () => {
    // Two verdicts describing different syncs. The backend signal sees every sync path, so when its
    // run finished later it is the one that just happened, and the claim's belongs to an older sync
    // it saw and the backend's outcome has since superseded.
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded' }, '2026-09-18T10:00:00Z'));
    seedActivity({
      isSyncing: false,
      projectIds: [],
      outcome: 'failed',
      completedAt: '2026-09-18T10:05:00Z',
    });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('failed');
  });

  it('keeps the claim’s verdict when it describes a later run than the backend outcome', async () => {
    // The other direction: an outcome left over from an earlier run must not replace the verdict for
    // the sync that finished after it.
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded' }, '2026-09-18T10:05:00Z'));
    seedActivity({
      isSyncing: false,
      projectIds: [],
      outcome: 'failed',
      completedAt: '2026-09-18T10:00:00Z',
    });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('synced');
  });

  it('keeps the claim’s verdict when the backend does not date its outcome', async () => {
    // A build reporting an outcome but no time leaves the two unorderable, and the claim's
    // per-project verdict is the richer of the two.
    commands.mockGetSyncState(completedStateFor({ PROJ1: 'succeeded' }));
    seedActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('synced');
  });

  it('reports the outcome when the claim only answers after the sync has ended', async () => {
    // The Simple-mode startup case: send/receive activates while the sync is already running, so the
    // claim's first answer lands after it finished. That answer carries no verdict of its own — the
    // claim never saw this sync — and must not bury the one verdict that describes it.
    commands.mockGetSyncState(new Error('not registered yet'), new Error('not registered yet'), {
      isSyncing: false,
      lastRequestedProjectIds: [],
    });
    seedActivity({ isSyncing: true, projectIds: [] });
    captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    pushActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('failed');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);
    });

    expect(result.current.status).toBe('failed');
  });

  it('still reports the outcome after a remount, as a Simple/Power toggle causes', async () => {
    // The stale-verdict flag is this hook's own state, so a remount starts it over. The store
    // outlives the hook, so the outcome is still there to be reported.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: true, projectIds: [] });
    captureEventCallbacks();

    const first = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    pushActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(first.result.current.status).toBe('failed');
    first.unmount();

    const second = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(second.result.current.status).toBe('failed');
  });

  // --- Recovering from a read that could not answer ---

  it('recovers a real answer after an event whose own follow-up read failed', async () => {
    // The event applied nothing: its read failed, so the `unknown` it produced came from the failure
    // rather than from a snapshot. The mount seed is retired by then — the handler retires it on
    // entry, which is what stops a snapshot read BEFORE the sync ended from resurrecting it — so the
    // retry has to come from the event path, or that `unknown` is the session's final answer.
    commands.mockGetSyncState(
      new Error('extension host not ready'),
      new Error('extension host not ready'),
      { isSyncing: false, lastRequestedProjectIds: [] },
    );
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    // The first read failed, so nothing has answered yet.
    expect(result.current.status).toBe('unknown');

    emitSyncStateChanged({ isSyncing: false });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);
    });

    expect(result.current.status).toBe('idle');
  });

  it('does not let a slow seed read resurrect a sync that has already ended', async () => {
    // The failure the event-entry retirement exists for. On a cold start the seed's `getSyncState` can
    // still be in flight when the sync ends: the closing event arrives, its own follow-up read fails,
    // and then the seed's original read resolves carrying `isSyncing: true`. Applying it puts the
    // indicator back to "Syncing PROJ1" — with a live Cancel over a finished sync — and nothing
    // arrives later to correct it, so it stands until the renderer reloads.
    commands.mockGetSyncState(
      // The seed's read: slow, and describing the sync as still running.
      delayedAnswer(
        { isSyncing: true, syncingProjectIds: ['PROJ1'], lastRequestedProjectIds: [] },
        5000,
      ),
      // The closing event's follow-up read: unreadable.
      new Error('extension host not ready'),
      new Error('extension host not ready'),
    );
    mockProjectName('PROJ1', 'HNF');
    const { emitSyncStateChanged } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    emitSyncStateChanged({ isSyncing: false });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000);
    });

    expect(result.current.status).not.toBe('syncing');
    expect(result.current.syncingProjects).toEqual([]);
  });

  it('re-seeds when extensions reload, so an exhausted retry window is not permanent', async () => {
    // Nothing fires between syncs, so a status pinned at `unknown` by an exhausted window has no
    // other way back — a send/receive installed or restarted mid-session would go unnoticed until
    // the renderer reloaded.
    commands.mockGetSyncState(new Error('extension host not ready'));
    const { emitExtensionsReloaded } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + SYNC_SEED_RETRY_INTERVAL_MS);
    });
    expect(result.current.status).toBe('unknown');

    commands.mockGetSyncState({
      isSyncing: true,
      syncingProjectIds: [],
      lastRequestedProjectIds: [],
    });
    emitExtensionsReloaded();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
  });

  it('stops claiming a sync is running once the activity seed exhausts after a reload', async () => {
    // On the first mount an exhausted activity seed leaves `activitySyncing` at its initial
    // `undefined`, so there is nothing to unsay. A reload restarts the seed with whatever the last
    // snapshot left behind — so send/receive going away while the activity signal last reported
    // `isSyncing: true` would otherwise pin the union at `syncing`, spinner and live Cancel included,
    // for the life of the renderer.
    commands.mockGetSyncState({ isSyncing: false, lastRequestedProjectIds: [] });
    seedActivity({ isSyncing: true, projectIds: [] });
    const { emitExtensionsReloaded } = captureEventCallbacks();

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(result.current.status).toBe('syncing');

    // Send/receive is gone after the reload: the claim's reads reject, and the activity signal can
    // no longer tell either. Its service reports that as UNKNOWN rather than idle, and the union has
    // to stop claiming a sync on the strength of a snapshot nothing can still confirm.
    commands.mockGetSyncState(new Error('method not found'));
    pushActivityUnknown();
    emitExtensionsReloaded();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + SYNC_SEED_RETRY_INTERVAL_MS);
    });

    expect(result.current.status).not.toBe('syncing');
  });

  it('honors isSyncing when the optional project id field arrives as null', async () => {
    // Several JSON serializers render an omitted optional as `null`. Rejecting the whole payload for
    // it discards a perfectly good `isSyncing` — and since every retry gets the same `null`, pins
    // the status at `unknown` for a build that was reporting the sync correctly all along.
    // Parsed from JSON rather than written as a literal, which is both how the payload really reaches
    // the hook and the only way to express a `null` that `SyncState` does not declare.
    commands.mockGetSyncState(
      JSON.parse('{"isSyncing":true,"syncingProjectIds":null,"lastRequestedProjectIds":[]}'),
    );
    seedActivity({ isSyncing: false, projectIds: [] });

    const { result } = renderHook(() => useSyncStatus());
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current.status).toBe('syncing');
    expect(result.current.syncingProjects).toEqual([]);
  });
});
