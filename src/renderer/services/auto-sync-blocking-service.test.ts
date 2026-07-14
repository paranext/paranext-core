import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import { setAutoSyncBlocking } from '@renderer/services/auto-sync-blocking-store';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  setAutoSyncBlocking: vi.fn(),
}));

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
});
