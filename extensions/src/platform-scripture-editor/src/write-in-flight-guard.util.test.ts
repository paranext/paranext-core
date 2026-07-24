import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { withWriteInFlightGuard } from './write-in-flight-guard.util';

const { mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerWarn: vi.fn(),
}));
vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), warn: mockLoggerWarn, info: vi.fn(), error: vi.fn() },
}));

beforeEach(() => {
  mockLoggerWarn.mockClear();
});

/** Minimal deferred promise so a test can observe the guard state WHILE the write is in flight. */
function deferred<T>() {
  let resolveDeferred!: (value: T) => void;
  let rejectDeferred!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, resolve: resolveDeferred, reject: rejectDeferred };
}

describe('withWriteInFlightGuard', () => {
  // The core Fix 6 invariant: the in-flight flag is held for exactly the duration of the write
  // promise and cleared precisely when it SETTLES — not when some later PDP echo happens to arrive.
  it('holds the guard while the write is in flight and clears it when the write resolves', async () => {
    const isWritingRef = { current: false };
    const d = deferred<boolean>();
    const write = vi.fn(() => d.promise);

    const outcomePromise = withWriteInFlightGuard(isWritingRef, write);
    expect(write).toHaveBeenCalledOnce();
    expect(isWritingRef.current).toBe(true); // held for the duration of the write

    d.resolve(true);
    const outcome = await outcomePromise;

    expect(isWritingRef.current).toBe(false); // cleared on settle, independent of any echo
    expect(outcome).toEqual({ ran: true, result: true });
  });

  it('does not run the write and leaves the guard untouched when a write is already in flight', async () => {
    const isWritingRef = { current: true }; // an earlier write still owns the guard
    const write = vi.fn(() => Promise.resolve(true));

    const outcome = await withWriteInFlightGuard(isWritingRef, write);

    expect(write).not.toHaveBeenCalled();
    expect(outcome).toEqual({ ran: false });
    expect(isWritingRef.current).toBe(true); // the in-flight writer still owns it — not reset here
  });

  it('clears the guard even when the write rejects, and propagates the error', async () => {
    const isWritingRef = { current: false };
    const write = vi.fn(() => Promise.reject(new Error('save failed')));

    await expect(withWriteInFlightGuard(isWritingRef, write)).rejects.toThrow('save failed');
    expect(isWritingRef.current).toBe(false); // finally clears it — never a stuck flag
  });

  // The timeout-release backstop: if a write NEVER settles (a hang the JSON-RPC layer cannot see),
  // the guard must not stay latched forever silently dropping every later save.
  describe('timeout release', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it('releases the guard and warns when the write is still unsettled after releaseAfterMs', async () => {
      const isWritingRef = { current: false };
      // A write that never settles — e.g. a wedged extension host with request timeouts disabled
      const neverSettlingOutcome = withWriteInFlightGuard(
        isWritingRef,
        () => new Promise<boolean>(() => {}),
      );
      expect(isWritingRef.current).toBe(true);

      await vi.advanceTimersByTimeAsync(60_000);

      expect(isWritingRef.current).toBe(false); // released — later saves are not dropped
      expect(mockLoggerWarn).toHaveBeenCalledOnce();
      expect(mockLoggerWarn.mock.calls[0][0]).toMatch(/60000 ms/);

      // A subsequent save can now take the guard and run
      const write = vi.fn(() => Promise.resolve(true));
      const outcome = await withWriteInFlightGuard(isWritingRef, write);
      expect(outcome).toEqual({ ran: true, result: true });
      expect(write).toHaveBeenCalledOnce();

      // Keep the never-settling promise referenced so it cannot be garbage-collected mid-test
      expect(neverSettlingOutcome).toBeInstanceOf(Promise);
    });

    it('never lets a zombie write that settles after release clear a successor write’s guard', async () => {
      const isWritingRef = { current: false };
      const zombie = deferred<boolean>();
      const zombieOutcome = withWriteInFlightGuard(isWritingRef, () => zombie.promise);

      // The zombie write hangs past the release window; the guard is handed back
      await vi.advanceTimersByTimeAsync(60_000);
      expect(isWritingRef.current).toBe(false);

      // A successor write takes ownership of the guard
      const successor = deferred<boolean>();
      const successorOutcome = withWriteInFlightGuard(isWritingRef, () => successor.promise);
      expect(isWritingRef.current).toBe(true);

      // The zombie finally settles — its finally must NOT clear the successor's guard
      zombie.resolve(true);
      await expect(zombieOutcome).resolves.toEqual({ ran: true, result: true });
      expect(isWritingRef.current).toBe(true);

      // A third call while the successor is in flight still sees the guard held
      const third = vi.fn(() => Promise.resolve(true));
      await expect(withWriteInFlightGuard(isWritingRef, third)).resolves.toEqual({ ran: false });
      expect(third).not.toHaveBeenCalled();

      successor.resolve(true);
      await expect(successorOutcome).resolves.toEqual({ ran: true, result: true });
      expect(isWritingRef.current).toBe(false); // the successor still clears its own guard
    });

    it('never fires the release timer or warns for a write that settles normally', async () => {
      const isWritingRef = { current: false };
      const outcome = await withWriteInFlightGuard(isWritingRef, () => Promise.resolve('ok'));
      expect(outcome).toEqual({ ran: true, result: 'ok' });
      expect(isWritingRef.current).toBe(false);

      // Advance well past the release window: the cleared timer must not fire or warn
      await vi.advanceTimersByTimeAsync(120_000);
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(isWritingRef.current).toBe(false);
    });
  });
});
