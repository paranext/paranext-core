import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { SyncWriteLockSnapshot } from 'paratext-bible-send-receive';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { setBlockedProjects } from '@renderer/services/auto-sync-blocking-store';
import { logger } from '@shared/services/logger.service';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  setBlockedProjects: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), warn: vi.fn() },
}));

const SYNC_WRITE_LOCK_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncWriteLockChanged';
const LEGACY_BLOCKING_CHANGED_EVENT = 'paratextBibleSendReceive.onAutoSyncBlockingChanged';
const GET_AUTO_SYNC_BLOCKING_COMMAND = 'paratextBibleSendReceive.getAutoSyncBlocking';

/** Flushes the service's fire-and-forget seeding chain (await + then-callbacks). */
async function flushSeeding(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('initAutoSyncBlockingService', () => {
  /** Every event name getNetworkEvent was subscribed for. */
  let subscribedEventNames: string[];
  /** The handler the service registered for the write-lock-changed event; receives raw payloads. */
  let capturedHandler: ((event: unknown) => void) | undefined;
  let unsub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    subscribedEventNames = [];
    capturedHandler = undefined;
    unsub = vi.fn();

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        subscribedEventNames.push(eventName);
        if (eventName === SYNC_WRITE_LOCK_CHANGED_EVENT)
          return (cb: (event: unknown) => void) => {
            capturedHandler = cb;
            return unsub;
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    // Default: no core serves the initial-state command (an older core / absent extension).
    vi.mocked(sendCommand).mockRejectedValue(new Error('command not registered'));
  });

  describe('event source', () => {
    it('subscribes to the backend write-lock-changed event', () => {
      initAutoSyncBlockingService();
      expect(subscribedEventNames).toContain(SYNC_WRITE_LOCK_CHANGED_EVENT);
    });

    it('does NOT subscribe to the legacy onAutoSyncBlockingChanged event', () => {
      initAutoSyncBlockingService();
      expect(subscribedEventNames).not.toContain(LEGACY_BLOCKING_CHANGED_EVENT);
    });

    it('returns a cleanup function that unsubscribes the event', () => {
      const cleanup = initAutoSyncBlockingService();
      cleanup();
      expect(unsub).toHaveBeenCalledTimes(1);
    });
  });

  describe('event consumption', () => {
    it('blocks the reported projects when a blocking snapshot arrives', () => {
      initAutoSyncBlockingService();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      capturedHandler({ isBlocking: true, projectIds: ['p1', 'p2'] });
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith(['p1', 'p2']);
    });

    it('blocks nothing when a not-blocking snapshot arrives', () => {
      initAutoSyncBlockingService();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      capturedHandler({ isBlocking: false, projectIds: [] });
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith([]);
    });

    it('fails safe to block-none and warns once on a malformed snapshot', () => {
      initAutoSyncBlockingService();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      capturedHandler({ isBlocking: 'yes', projectIds: 'nope' }); // wrong types
      capturedHandler(undefined); // missing entirely
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledTimes(2);
      expect(vi.mocked(setBlockedProjects)).toHaveBeenNthCalledWith(1, []);
      expect(vi.mocked(setBlockedProjects)).toHaveBeenNthCalledWith(2, []);
      // Warn once per source per service lifetime, not once per malformed event — and the message
      // must name the source that produced the malformed payload.
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining(`the ${SYNC_WRITE_LOCK_CHANGED_EVENT} event`),
      );
    });

    it('latches the malformed warning per source — init query and event each warn once', async () => {
      vi.mocked(sendCommand).mockResolvedValue('malformed');
      initAutoSyncBlockingService();
      await flushSeeding(); // the malformed init-query snapshot warns, latching the query source
      if (!capturedHandler) throw new Error('capturedHandler not set');
      capturedHandler(undefined); // a malformed event still warns on its own latch
      capturedHandler(undefined); // …but only once
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(2);
      expect(vi.mocked(logger.warn)).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining(`the ${GET_AUTO_SYNC_BLOCKING_COMMAND} init query`),
      );
      expect(vi.mocked(logger.warn)).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining(`the ${SYNC_WRITE_LOCK_CHANGED_EVENT} event`),
      );
    });

    it('fails safe to block-none when projectIds contains a non-string', () => {
      initAutoSyncBlockingService();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      // capturedHandler takes an unknown payload, so a mixed array needs no cast.
      capturedHandler({ isBlocking: true, projectIds: ['p1', 2] });
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith([]);
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    });
  });

  describe('seeding from the initial-state query', () => {
    it('queries the current blocking state on init', async () => {
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(sendCommand)).toHaveBeenCalledWith(
        'paratextBibleSendReceive.getAutoSyncBlocking',
      );
    });

    it('seeds the blocked projects when the query reports an in-flight sync (reload mid-sync)', async () => {
      // `satisfies` pins the well-formed mocks to the seam's wire shape, so a contract change
      // breaks these tests at compile time (deliberately-malformed mocks stay untyped).
      vi.mocked(sendCommand).mockResolvedValue({
        isBlocking: true,
        projectIds: ['p1'],
      } satisfies SyncWriteLockSnapshot);
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith(['p1']);
    });

    it('does not seed when the query reports no sync in flight', async () => {
      vi.mocked(sendCommand).mockResolvedValue({
        isBlocking: false,
        projectIds: [],
      } satisfies SyncWriteLockSnapshot);
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
    });

    it('does not seed when the query result is malformed, and warns naming the query', async () => {
      vi.mocked(sendCommand).mockResolvedValue('yes');
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining(`the ${GET_AUTO_SYNC_BLOCKING_COMMAND} init query`),
      );
    });

    it('swallows a failed query, keeps the assume-unblocked default, and warns', async () => {
      vi.mocked(sendCommand).mockRejectedValue(new Error('backend not up yet'));
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
      // Warn (not debug): the command is registered by core's own backend, so a rejection is
      // anomalous — realistically the cold-start race — and there is no re-query until PT-4265.
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(logger.warn)).toHaveBeenCalledWith(
        expect.stringContaining('could not read the initial blocking state'),
      );
    });

    it('lets a live event win over the snapshot — no seeding after an event arrived', async () => {
      let resolveQuery: ((snapshot: unknown) => void) | undefined;
      vi.mocked(sendCommand).mockImplementation(
        async () =>
          new Promise((resolve) => {
            resolveQuery = resolve;
          }),
      );
      initAutoSyncBlockingService();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      // The sync the snapshot would report ends while the query is in flight.
      capturedHandler({ isBlocking: false, projectIds: [] });
      if (!resolveQuery) throw new Error('resolveQuery not set');
      resolveQuery({ isBlocking: true, projectIds: ['p1'] }); // stale snapshot arrives late
      await flushSeeding();
      // Only the event's call — the stale snapshot did not add a phantom block.
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith([]);
    });

    it('does not seed after cleanup', async () => {
      let resolveQuery: ((snapshot: unknown) => void) | undefined;
      vi.mocked(sendCommand).mockImplementation(
        async () =>
          new Promise((resolve) => {
            resolveQuery = resolve;
          }),
      );
      const cleanup = initAutoSyncBlockingService();
      cleanup();
      if (!resolveQuery) throw new Error('resolveQuery not set');
      resolveQuery({ isBlocking: true, projectIds: ['p1'] });
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
    });
  });
});
