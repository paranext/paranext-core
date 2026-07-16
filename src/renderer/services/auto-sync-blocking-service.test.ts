import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent, requestNoRetry } from '@shared/services/network.service';
import { setAutoSyncBlocking } from '@renderer/services/auto-sync-blocking-store';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
  requestNoRetry: vi.fn(),
}));

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  setAutoSyncBlocking: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn() },
}));

/** Flushes the service's fire-and-forget seeding chain (await + then-callbacks). */
async function flushSeeding(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

describe('initAutoSyncBlockingService', () => {
  let capturedHandler: ((event: { isBlocking: boolean }) => void) | undefined;
  let unsub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    capturedHandler = undefined;
    unsub = vi.fn();

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onAutoSyncBlockingChanged')
          return (cb: (event: { isBlocking: boolean }) => void) => {
            capturedHandler = cb;
            return unsub;
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    // Default: the extension does not expose the initial-state command (the pre-PT-4214 reality)
    vi.mocked(requestNoRetry).mockRejectedValue(new Error('command not registered'));
  });

  it('calls setAutoSyncBlocking(true) when the event fires with isBlocking true', () => {
    initAutoSyncBlockingService();
    expect(capturedHandler).toBeDefined();
    if (!capturedHandler) throw new Error('capturedHandler not set');
    capturedHandler({ isBlocking: true });
    expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledWith(true);
  });

  it('calls setAutoSyncBlocking(false) when the event fires with isBlocking false', () => {
    initAutoSyncBlockingService();
    expect(capturedHandler).toBeDefined();
    if (!capturedHandler) throw new Error('capturedHandler not set');
    capturedHandler({ isBlocking: false });
    expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledWith(false);
  });

  it('returns a cleanup function that unsubscribes the event', () => {
    const cleanup = initAutoSyncBlockingService();
    cleanup();
    expect(unsub).toHaveBeenCalledTimes(1);
  });

  describe('seeding from the initial-state query', () => {
    it('queries the current blocking state on init', async () => {
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(requestNoRetry)).toHaveBeenCalledWith(
        'command:paratextBibleSendReceive.getAutoSyncBlocking',
      );
    });

    it('seeds a block when the query reports an in-flight sync (renderer reload mid-sync)', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue(true);
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledWith(true);
    });

    it('does not seed when the query reports no sync in flight', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue(false);
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setAutoSyncBlocking)).not.toHaveBeenCalled();
    });

    it('does not seed when the query result is not a boolean true', async () => {
      vi.mocked(requestNoRetry).mockResolvedValue('yes');
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setAutoSyncBlocking)).not.toHaveBeenCalled();
    });

    it('swallows a failed query and keeps the assume-unblocked default', async () => {
      vi.mocked(requestNoRetry).mockRejectedValue(new Error('extension absent'));
      initAutoSyncBlockingService();
      await flushSeeding();
      expect(vi.mocked(setAutoSyncBlocking)).not.toHaveBeenCalled();
    });

    it('lets a live event win over the snapshot — no seeding after an event arrived', async () => {
      let resolveQuery: ((isBlocking: boolean) => void) | undefined;
      vi.mocked(requestNoRetry).mockImplementation(
        async () =>
          new Promise((resolve) => {
            resolveQuery = resolve;
          }),
      );
      initAutoSyncBlockingService();
      expect(capturedHandler).toBeDefined();
      if (!capturedHandler) throw new Error('capturedHandler not set');
      // The sync the snapshot would report ends while the query is in flight
      capturedHandler({ isBlocking: false });
      if (!resolveQuery) throw new Error('resolveQuery not set');
      resolveQuery(true); // stale snapshot arrives late
      await flushSeeding();
      // Only the event's call — the stale snapshot did not add a phantom block
      expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledTimes(1);
      expect(vi.mocked(setAutoSyncBlocking)).toHaveBeenCalledWith(false);
    });

    it('does not seed after cleanup', async () => {
      let resolveQuery: ((isBlocking: boolean) => void) | undefined;
      vi.mocked(requestNoRetry).mockImplementation(
        async () =>
          new Promise((resolve) => {
            resolveQuery = resolve;
          }),
      );
      const cleanup = initAutoSyncBlockingService();
      cleanup();
      if (!resolveQuery) throw new Error('resolveQuery not set');
      resolveQuery(true);
      await flushSeeding();
      expect(vi.mocked(setAutoSyncBlocking)).not.toHaveBeenCalled();
    });
  });
});
