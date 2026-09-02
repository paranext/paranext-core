/**
 * Pins the failure-tolerance `attemptRecovery` exists for: a recovery action running inside a
 * polling loop (e.g. `findHelloRock3Frame`'s re-click) must not let its own rejection escape and
 * end the loop early, on the recovery attempt's own generic error, instead of the loop's next
 * iteration or its own observation-based diagnostic once the deadline is actually reached.
 */
import { describe, expect, it, vi } from 'vitest';
import { attemptRecovery } from './helpers';

describe('attemptRecovery', () => {
  it('does not throw when the action rejects', async () => {
    const onFailure = vi.fn();

    await expect(
      attemptRecovery(() => Promise.reject(new Error('intercepted')), onFailure),
    ).resolves.toBeUndefined();
  });

  it('reports the failure to the caller instead of swallowing it silently', async () => {
    const onFailure = vi.fn();
    const error = new Error('intercepted');

    await attemptRecovery(() => Promise.reject(error), onFailure);

    expect(onFailure).toHaveBeenCalledExactlyOnceWith(error);
  });

  it('does not call onFailure when the action succeeds', async () => {
    const onFailure = vi.fn();

    await attemptRecovery(() => Promise.resolve(), onFailure);

    expect(onFailure).not.toHaveBeenCalled();
  });

  it('awaits the action, so a caller relying on ordering can trust it ran', async () => {
    let ran = false;

    await attemptRecovery(async () => {
      ran = true;
    }, vi.fn());

    expect(ran).toBe(true);
  });
});
