import { describe, expect, it, vi } from 'vitest';
import { withWriteInFlightGuard } from './write-in-flight-guard.util';

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
});
