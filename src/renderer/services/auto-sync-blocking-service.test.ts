import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import { raiseAutoSyncBlock } from '@renderer/services/auto-sync-blocking-store';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
}));

vi.mock('@renderer/services/auto-sync-blocking-store', () => ({
  raiseAutoSyncBlock: vi.fn(),
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

  function emit(isBlocking: boolean): void {
    if (!capturedHandler) throw new Error('blocking handler not subscribed');
    capturedHandler({ isBlocking });
  }

  it('raises a block when the event fires with isBlocking true', () => {
    vi.mocked(raiseAutoSyncBlock).mockReturnValue(vi.fn());
    initAutoSyncBlockingService();
    emit(true);
    expect(vi.mocked(raiseAutoSyncBlock)).toHaveBeenCalledTimes(1);
  });

  it('pairs each false event with the oldest raise that has not consumed a clear', () => {
    const clearA = vi.fn();
    const clearB = vi.fn();
    vi.mocked(raiseAutoSyncBlock).mockReturnValueOnce(clearA).mockReturnValueOnce(clearB);
    initAutoSyncBlockingService();
    emit(true); // raise A
    emit(true); // raise B
    emit(false); // A's clear
    expect(clearA).toHaveBeenCalledTimes(1);
    expect(clearB).not.toHaveBeenCalled();
    emit(false); // B's clear
    expect(clearB).toHaveBeenCalledTimes(1);
  });

  it('keeps a leash-released raise queued as a tombstone so its late clear cannot consume a newer raise', () => {
    // Raise A's block gets released by the store's safety leash before its clear event arrives.
    // The service must still hand A's late clear to A's (now no-op) token — never to B's.
    const clearA = vi.fn();
    const clearB = vi.fn();
    vi.mocked(raiseAutoSyncBlock).mockReturnValueOnce(clearA).mockReturnValueOnce(clearB);
    initAutoSyncBlockingService();
    emit(true); // raise A (store leash-releases it later; the service cannot know)
    emit(true); // raise B
    emit(false); // A's late clear — consumes A's idempotent token
    emit(false); // B's clear — pairs with B
    expect(clearA).toHaveBeenCalledTimes(1);
    expect(clearB).toHaveBeenCalledTimes(1);
  });

  it('ignores a false event with no outstanding raise', () => {
    const clear = vi.fn();
    vi.mocked(raiseAutoSyncBlock).mockReturnValue(clear);
    initAutoSyncBlockingService();
    emit(false); // emitted before this subscription existed — nothing to release
    expect(clear).not.toHaveBeenCalled();
    emit(true);
    emit(false); // pairs with the raise above, unaffected by the stray clear
    expect(clear).toHaveBeenCalledTimes(1);
  });

  it('returns a cleanup function that unsubscribes the event', () => {
    const cleanup = initAutoSyncBlockingService();
    cleanup();
    expect(unsub).toHaveBeenCalledTimes(1);
  });
});
