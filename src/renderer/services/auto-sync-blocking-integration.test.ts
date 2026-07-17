import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  getAutoSyncBlocking,
  resetAutoSyncBlocking,
} from '@renderer/services/auto-sync-blocking-store';
import { initAutoSyncBlockingService } from './auto-sync-blocking-service';

vi.mock('@shared/services/network.service', () => ({
  getNetworkEvent: vi.fn(),
  requestNoRetry: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), warn: vi.fn() },
}));

const TEN_MINUTES_MS = 10 * 60 * 1000;

/**
 * Integration tests: real auto-sync-blocking store driven through the service by simulated blocking
 * events, under fake timers. The blocking events are anonymous booleans, so the service pairs
 * clears to raises oldest-first — but a raise whose own leash already fired must absorb its late
 * clear as a no-op instead of releasing a newer, still-live blocker (the #2571 review's finding 1
 * trace, in this store's 10-minute shape).
 */
describe('auto-sync blocking service + store integration', () => {
  let blockingHandler: ((event: { isBlocking: boolean }) => void) | undefined;
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    resetAutoSyncBlocking();
    blockingHandler = undefined;

    vi.mocked(getNetworkEvent).mockImplementation(
      // getNetworkEvent has a complex generic signature; cast is required for the mock
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      ((eventName: string) => {
        if (eventName === 'paratextBibleSendReceive.onAutoSyncBlockingChanged')
          return (cb: (event: { isBlocking: boolean }) => void) => {
            blockingHandler = cb;
            return vi.fn();
          };
        return () => vi.fn();
        // Same cast as above: closing the type assertion needed for the complex generic signature
        // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      }) as any,
    );

    cleanup = initAutoSyncBlockingService();
  });

  afterEach(() => {
    cleanup?.();
    resetAutoSyncBlocking();
    vi.useRealTimers();
  });

  function emitBlocking(isBlocking: boolean): void {
    if (!blockingHandler) throw new Error('blocking handler not subscribed');
    blockingHandler({ isBlocking });
  }

  it('keeps a live blocker blocked when an older raise clears late, after its own leash fired (review finding 1 trace)', () => {
    // A raises at t=0; B raises just before A's 10-minute leash fires.
    emitBlocking(true);
    vi.advanceTimersByTime(TEN_MINUTES_MS - 10_000);
    emitBlocking(true);

    // t=10min: A's leash fires. A is released; B is still blocking.
    vi.advanceTimersByTime(10_000);
    expect(getAutoSyncBlocking()).toBe(true);

    // A's real clear arrives late. It must pair with A (already released by its own leash — a
    // no-op), never with B: B's sync is still running, so blocking must stay on.
    vi.advanceTimersByTime(30_000);
    emitBlocking(false);
    expect(getAutoSyncBlocking()).toBe(true);

    // B's own leash fires (B never cleared) — now everything is released.
    vi.advanceTimersByTime(TEN_MINUTES_MS);
    expect(getAutoSyncBlocking()).toBe(false);
  });
});
