import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import { getSyncActivityState, resetSyncActivity } from '@renderer/services/sync-activity-store';
import { SYNC_SEED_RETRY_INTERVAL_MS, SYNC_SEED_RETRY_WINDOW_MS } from './seed-with-retry.util';
import { initSyncActivityService } from './sync-activity-service';

vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/network.service', () => ({ getNetworkEvent: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

const SYNC_ACTIVITY_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncActivityChanged';
const GET_SYNC_ACTIVITY_COMMAND = 'paratextBibleSendReceive.getSyncActivity';
const WATCHDOG_INTERVAL_MS = 30_000;

/** Flushes the service's fire-and-forget seeding chain. */
async function flushSeeding(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('initSyncActivityService', () => {
  /** The handler the service registered for the activity event; receives raw payloads. */
  let emit: ((payload: unknown) => void) | undefined;
  let unsub: ReturnType<typeof vi.fn>;
  let dispose: (() => void) | undefined;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    resetSyncActivity();
    emit = undefined;
    unsub = vi.fn();

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a per-event-name generic signature that no single mock satisfies.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      ((eventName: string) => {
        if (eventName === SYNC_ACTIVITY_CHANGED_EVENT)
          return (cb: (payload: unknown) => void) => {
            emit = cb;
            return unsub;
          };
        return () => vi.fn();
      }) as never,
    );
  });

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    vi.useRealTimers();
  });

  /** Queues answers for `getSyncActivity`; the last answer repeats once the queue is exhausted. */
  function mockGetSyncActivity(...answers: (unknown | Error)[]) {
    let index = -1;
    // sendCommand resolves its return type from the command name, so no single implementation
    // satisfies its generic signature.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    vi.mocked(sendCommand).mockImplementation((async (command: string) => {
      if (command !== GET_SYNC_ACTIVITY_COMMAND) throw new Error(`unexpected command ${command}`);
      index = Math.min(index + 1, answers.length - 1);
      const answer = answers[index];
      if (answer instanceof Error) throw answer;
      return answer;
    }) as unknown as typeof sendCommand);
  }

  function countGetSyncActivityCalls() {
    return vi.mocked(sendCommand).mock.calls.filter((call) => call[0] === GET_SYNC_ACTIVITY_COMMAND)
      .length;
  }

  describe('seeding', () => {
    it('seeds a sync that was already running when the renderer started', async () => {
      // The gap this closes: the event fires on TRANSITIONS only, and the backend's baseline emit
      // happens once per backend start. A subscription-only consumer that comes up mid-sync — a
      // Simple-mode startup sync, or a renderer reload — would see nothing until the sync ENDED.
      mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

      dispose = initSyncActivityService();
      await flushSeeding();

      expect(getSyncActivityState()).toMatchObject({
        isSyncing: true,
        projectIds: ['PROJ1'],
        hasObservedSyncRun: true,
      });
    });

    it('retries while the command is still unregistered, then applies the answer', async () => {
      mockGetSyncActivity(new Error('not registered'), new Error('not registered'), {
        isSyncing: true,
        projectIds: ['PROJ2'],
      });

      dispose = initSyncActivityService();
      await flushSeeding();
      expect(getSyncActivityState().isSyncing).toBeUndefined();

      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 2);

      expect(getSyncActivityState()).toMatchObject({ isSyncing: true, projectIds: ['PROJ2'] });
    });

    it('reports unknown, not idle, when the retry window closes with no answer', async () => {
      // A failed read is not evidence that nothing is syncing.
      mockGetSyncActivity(new Error('never answers'));

      dispose = initSyncActivityService();
      await flushSeeding();
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_WINDOW_MS + SYNC_SEED_RETRY_INTERVAL_MS);

      expect(getSyncActivityState().isSyncing).toBeUndefined();
      expect(getSyncActivityState().hasObservedSyncRun).toBe(false);
    });

    it('lets a live event win over an in-flight seed', async () => {
      mockGetSyncActivity({ isSyncing: true, projectIds: ['STALE'] });

      dispose = initSyncActivityService();
      emit?.({ isSyncing: false, projectIds: [] });
      await flushSeeding();

      // The event describes a later moment than the snapshot, so the snapshot is dropped whole
      // rather than merged.
      expect(getSyncActivityState().isSyncing).toBe(false);
      expect(getSyncActivityState().projectIds).toEqual([]);
    });

    it('stops seeding once disposed', async () => {
      mockGetSyncActivity(new Error('not registered'));

      dispose = initSyncActivityService();
      await flushSeeding();
      const callsBeforeDispose = countGetSyncActivityCalls();
      dispose();
      dispose = undefined;

      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS * 3);

      expect(countGetSyncActivityCalls()).toBe(callsBeforeDispose);
      expect(unsub).toHaveBeenCalled();
    });
  });

  describe('event validation', () => {
    beforeEach(() => {
      mockGetSyncActivity(new Error('not registered'));
    });

    it.each([
      // A real `null`, not `undefined`: a null payload is the case that throws on property access
      // inside the emitter's dispatch loop, which costs every LATER subscriber the delivery, and
      // `undefined` does not reproduce it.
      // eslint-disable-next-line no-null/no-null
      ['a null payload', null],
      ['a missing payload', undefined],
      ['a non-boolean isSyncing', { isSyncing: 'yes', projectIds: [] }],
      ['an absent isSyncing', { projectIds: ['PROJ1'] }],
      ['a non-array projectIds', { isSyncing: true, projectIds: 'PROJ1' }],
      ['a projectIds holding a non-string', { isSyncing: true, projectIds: ['PROJ1', 7] }],
    ])('ignores %s rather than applying it', async (_label, payload) => {
      dispose = initSyncActivityService();
      await flushSeeding();

      expect(() => emit?.(payload)).not.toThrow();

      expect(getSyncActivityState().isSyncing).toBeUndefined();
      expect(getSyncActivityState().hasObservedSyncRun).toBe(false);
    });

    it('does not let a malformed event disarm the seed', async () => {
      // Recording "an event has been applied" before validating would retire the seed — the one path
      // that could still produce a good snapshot — on the strength of a payload that turned out to
      // be unusable, stranding the indicator for the session.
      mockGetSyncActivity(new Error('not registered'), { isSyncing: true, projectIds: ['PROJ3'] });

      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: 'yes' });
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);

      expect(getSyncActivityState()).toMatchObject({ isSyncing: true, projectIds: ['PROJ3'] });
    });

    it('accepts a snapshot whose projectIds are absent', async () => {
      // A Studio build predating that field answers without it; "the projects are unknown" is a
      // usable snapshot, unlike a malformed one.
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: true });

      expect(getSyncActivityState()).toMatchObject({ isSyncing: true, projectIds: [] });
    });

    it('warns when it drops a malformed payload', async () => {
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: 'yes' });

      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining(SYNC_ACTIVITY_CHANGED_EVENT),
      );
    });
  });

  describe('outcome', () => {
    beforeEach(() => {
      mockGetSyncActivity(new Error('not registered'));
    });

    it('carries a recognized outcome through to the store', async () => {
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: false, projectIds: [], outcome: 'succeeded' });

      expect(getSyncActivityState().outcome).toBe('succeeded');
    });

    it('seeds the outcome of a run that completed before the renderer started', async () => {
      mockGetSyncActivity({ isSyncing: false, projectIds: [], outcome: 'failed' });

      dispose = initSyncActivityService();
      await flushSeeding();

      expect(getSyncActivityState().outcome).toBe('failed');
    });

    it('reads a snapshot without an outcome as one that cannot say', async () => {
      // A build predating the field, a backend that has completed no run yet, and a run still in
      // flight all answer without it. None of them is a verdict.
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: false, projectIds: [] });

      expect(getSyncActivityState().isSyncing).toBe(false);
      expect(getSyncActivityState().outcome).toBeUndefined();
    });

    it('reads a null outcome as absent', async () => {
      // Parsed from JSON because that is how a serializer that writes omitted optionals as `null`
      // really delivers it, and `SyncActivitySnapshot` cannot express one.
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.(JSON.parse('{"isSyncing":false,"projectIds":[],"outcome":null}'));

      expect(getSyncActivityState().isSyncing).toBe(false);
      expect(getSyncActivityState().outcome).toBeUndefined();
      // Absent, not unrecognized — which the store cannot tell apart, since both leave `outcome`
      // undefined. The warning is what separates them.
      expect(vi.mocked(logger.warn)).not.toHaveBeenCalledWith(expect.stringContaining('outcome'));
    });

    it.each([
      // The plausible next value upstream, and exactly the one this build must not guess at.
      ['an unrecognized', 'cancelled'],
      ['a non-string', 42],
    ])('drops %s outcome but still applies the rest of the event', async (_label, outcome) => {
      // Rejecting the whole snapshot over its outcome would discard a well-formed `isSyncing` along
      // with it — blinding the indicator to a sync over a field that only answers how the last one
      // went. The event must also still count as applied, or the seed answering later would
      // overwrite it with an older moment.
      mockGetSyncActivity(new Error('not registered'), { isSyncing: true, projectIds: ['STALE'] });

      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: false, projectIds: [], outcome });
      await vi.advanceTimersByTimeAsync(SYNC_SEED_RETRY_INTERVAL_MS);

      expect(getSyncActivityState().isSyncing).toBe(false);
      expect(getSyncActivityState().outcome).toBeUndefined();
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('outcome'));
    });

    it('carries the time the outcome describes through to the store', async () => {
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({
        isSyncing: false,
        projectIds: [],
        outcome: 'failed',
        completedAt: '2026-09-18T10:00:00Z',
      });

      expect(getSyncActivityState().completedAt).toBe('2026-09-18T10:00:00Z');
    });

    it('drops an outcome time that is not a readable date, keeping the outcome', async () => {
      // The time exists to order this verdict against the one send/receive reports itself. An
      // unreadable one would order them by a value that means nothing, which is worse than leaving
      // them unordered.
      dispose = initSyncActivityService();
      await flushSeeding();

      emit?.({ isSyncing: false, projectIds: [], outcome: 'failed', completedAt: 'whenever' });

      expect(getSyncActivityState().outcome).toBe('failed');
      expect(getSyncActivityState().completedAt).toBeUndefined();
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('outcome time'));
    });

    it('drops a malformed outcome from the seed but still applies the rest of it', async () => {
      mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'], outcome: 42 });

      dispose = initSyncActivityService();
      await flushSeeding();

      expect(getSyncActivityState()).toMatchObject({ isSyncing: true, projectIds: ['PROJ1'] });
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(expect.stringContaining('outcome'));
    });
  });

  describe('watchdog re-query', () => {
    it('corrects a stranded syncing state when the closing snapshot was lost', async () => {
      // The dotnet forward is fire-and-forget, so one lost closing snapshot would otherwise strand
      // the indicator at `syncing` — spinner and live Cancel over a sync nothing can still see — for
      // the life of the renderer. The claim cannot correct it: that direction is deliberately
      // unwired.
      mockGetSyncActivity(
        { isSyncing: true, projectIds: ['PROJ1'] },
        { isSyncing: false, projectIds: [] },
      );

      dispose = initSyncActivityService();
      await flushSeeding();
      expect(getSyncActivityState().isSyncing).toBe(true);

      await vi.advanceTimersByTimeAsync(WATCHDOG_INTERVAL_MS + 1);

      expect(getSyncActivityState().isSyncing).toBe(false);
    });

    it('does not re-query while nothing is reported syncing', async () => {
      mockGetSyncActivity({ isSyncing: false, projectIds: [] });

      dispose = initSyncActivityService();
      await flushSeeding();
      const callsAfterSeed = countGetSyncActivityCalls();

      await vi.advanceTimersByTimeAsync(WATCHDOG_INTERVAL_MS * 2 + 1);

      expect(countGetSyncActivityCalls()).toBe(callsAfterSeed);
    });

    it('keeps the existing state when a re-query fails, and asks again later', async () => {
      mockGetSyncActivity(
        { isSyncing: true, projectIds: ['PROJ1'] },
        new Error('backend went away'),
        { isSyncing: false, projectIds: [] },
      );

      dispose = initSyncActivityService();
      await flushSeeding();

      await vi.advanceTimersByTimeAsync(WATCHDOG_INTERVAL_MS + 1);
      // A failed re-query forms no opinion of its own — the backend is the only authority.
      expect(getSyncActivityState().isSyncing).toBe(true);

      await vi.advanceTimersByTimeAsync(WATCHDOG_INTERVAL_MS + 1);
      expect(getSyncActivityState().isSyncing).toBe(false);
    });

    it('stops re-querying once disposed', async () => {
      mockGetSyncActivity({ isSyncing: true, projectIds: ['PROJ1'] });

      dispose = initSyncActivityService();
      await flushSeeding();
      dispose();
      dispose = undefined;
      const callsAtDispose = countGetSyncActivityCalls();

      await vi.advanceTimersByTimeAsync(WATCHDOG_INTERVAL_MS * 3);

      expect(countGetSyncActivityCalls()).toBe(callsAtDispose);
    });
  });
});
