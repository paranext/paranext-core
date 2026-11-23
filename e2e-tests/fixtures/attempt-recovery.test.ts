/**
 * Pins the failure-tolerance `attemptRecovery` exists for: a recovery action running inside a
 * polling loop (e.g. `findHelloRock3Frame`'s re-click) must not let a timeout from the same
 * instability the loop is polling through escape and end the loop early, on the recovery attempt's
 * own generic error, instead of the loop's next iteration or its own observation-based diagnostic
 * once the deadline is actually reached. A failure unrelated to that instability must still
 * propagate — this is tolerance for one known shape of failure, not a blanket swallow.
 */
import { describe, expect, it, vi } from 'vitest';
import { attemptRecovery } from './helpers';

/** Playwright's TimeoutError sets `.name` explicitly, unlike some of its other error classes. */
function timeoutError(message: string): Error {
  const error = new Error(message);
  error.name = 'TimeoutError';
  return error;
}

describe('attemptRecovery', () => {
  it('does not throw when the action times out', async () => {
    const onFailure = vi.fn();

    await expect(
      attemptRecovery(() => Promise.reject(timeoutError('intercepted')), onFailure),
    ).resolves.toBeInstanceOf(Error);
  });

  it('reports a timeout to the caller instead of swallowing it silently', async () => {
    const onFailure = vi.fn();
    const error = timeoutError('intercepted');

    await attemptRecovery(() => Promise.reject(error), onFailure);

    expect(onFailure).toHaveBeenCalledExactlyOnceWith(error);
  });

  it('resolves to the caught timeout, so a caller can attach it as a cause later', async () => {
    const error = timeoutError('intercepted');

    await expect(attemptRecovery(() => Promise.reject(error), vi.fn())).resolves.toBe(error);
  });

  it('does not call onFailure when the action succeeds', async () => {
    const onFailure = vi.fn();

    await attemptRecovery(() => Promise.resolve(), onFailure);

    expect(onFailure).not.toHaveBeenCalled();
  });

  it('resolves to undefined when the action succeeds', async () => {
    await expect(attemptRecovery(() => Promise.resolve(), vi.fn())).resolves.toBeUndefined();
  });

  it('propagates a non-timeout failure instead of tolerating it', async () => {
    const onFailure = vi.fn();
    const error = new Error('not a timeout at all');

    await expect(attemptRecovery(() => Promise.reject(error), onFailure)).rejects.toBe(error);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it('awaits the action to completion before resolving, not just calling it', async () => {
    // A mock whose body has no internal await settles in the same microtask either way, so it
    // cannot tell "attemptRecovery awaited the action" apart from "attemptRecovery started the
    // action and returned before it finished, but the action happened to finish anyway". Gating
    // the action's own completion behind a promise this test controls makes the two shapes
    // observably different: only a genuine await blocks attemptRecovery's returned promise from
    // settling while the gate is still closed.
    let ran = false;
    let releaseAction: () => void = () => {};
    const gate = new Promise<void>((resolve) => {
      releaseAction = resolve;
    });

    let settled = false;
    const attemptPromise = attemptRecovery(async () => {
      await gate;
      ran = true;
    }, vi.fn()).then((result) => {
      settled = true;
      return result;
    });

    // Flush pending microtasks without releasing the gate. If attemptRecovery did not await the
    // action's promise, its own returned promise would already have settled by now regardless.
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(settled).toBe(false);
    expect(ran).toBe(false);

    releaseAction();
    await attemptPromise;

    expect(settled).toBe(true);
    expect(ran).toBe(true);
  });
});
