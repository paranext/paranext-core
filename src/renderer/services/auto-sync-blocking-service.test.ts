import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent, requestNoRetry } from '@shared/services/network.service';
import { setBlockedProjects } from '@renderer/services/auto-sync-blocking-store';
import { logger } from '@shared/services/logger.service';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
  requestNoRetry: vi.fn(),
}));

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  setBlockedProjects: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), warn: vi.fn() },
}));

const SYNC_WRITE_LOCK_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncWriteLockChanged';
const OLD_BLOCKING_CHANGED_EVENT = 'paratextBibleSendReceive.onAutoSyncBlockingChanged';

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
    vi.mocked(requestNoRetry).mockRejectedValue(new Error('command not registered'));
  });

  describe('event source', () => {
    it('subscribes to the backend write-lock-changed event', () => {
      initAutoSyncBlockingService();
      expect(subscribedEventNames).toContain(SYNC_WRITE_LOCK_CHANGED_EVENT);
    });

    it('does NOT subscribe to the replaced onAutoSyncBlockingChanged event', () => {
      initAutoSyncBlockingService();
      expect(subscribedEventNames).not.toContain(OLD_BLOCKING_CHANGED_EVENT);
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
      // Warn once per service lifetime, not once per malformed event.
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
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
      expect(vi.mocked(requestNoRetry)).toHaveBeenCalledWith(
        'command:paratextBibleSendReceive.getAutoSyncBlocking',
      );
    });

    it('seeds the blocked projects when the query reports an in-flight sync (reload mid-sync)', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue({ isBlocking: true, projectIds: ['p1'] });
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(setBlockedProjects)).toHaveBeenCalledWith(['p1']);
    });

    it('does not seed when the query reports no sync in flight', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue({ isBlocking: false, projectIds: [] });
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
    });

    it('does not seed when the query result is malformed', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue('yes');
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
    });

    it('swallows a failed query and keeps the assume-unblocked default', async () => {
      vi.mocked(requestNoRetry).mockRejectedValue(new Error('extension absent'));
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setBlockedProjects)).not.toHaveBeenCalled();
    });

    it('lets a live event win over the snapshot — no seeding after an event arrived', async () => {
      let resolveQuery: ((snapshot: unknown) => void) | undefined;
      vi.mocked(requestNoRetry).mockImplementation(
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
      vi.mocked(requestNoRetry).mockImplementation(
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
