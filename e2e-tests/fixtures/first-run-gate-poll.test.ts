/**
 * Unit tests for the first-run-gate poll: one DOM snapshot per iteration, deliberately not a race
 * of several `waitFor` calls against each other. `Promise.race` never cancels its losers, so a
 * dangling `waitFor` would keep polling long after the caller returned and reject with
 * `TargetClosedError` once the page closed with nobody left to catch it — this pins the polling
 * loop's own control flow (cleared / stuck / inconclusive / error handling) independent of any real
 * Page.
 */
import { describe, expect, it, vi } from 'vitest';
import { pollFirstRunGate } from './helpers';

// Playwright's real TargetClosedError never sets `this.name` (see rethrowIfTargetClosed's own
// docblock in helpers.ts), so a fixture for it has to be a distinctly-named subclass rather than a
// plain Error with `.name` set to the string.
class TargetClosedError extends Error {}

/** A sample where the gate is not showing at all. */
const CLEARED = {
  gateVisible: false,
  escapeHatchVisible: false,
  headingVisible: false,
  onErrorScreen: false,
};

/** A sample where the gate is up but shows neither discriminator yet — the ordinary loading flash. */
const SHOWING_NOTHING_RECOGNISABLE = {
  gateVisible: true,
  escapeHatchVisible: false,
  headingVisible: false,
  onErrorScreen: false,
};

describe('pollFirstRunGate', () => {
  it('reports cleared the moment a sample shows the gate gone, without ever sleeping', async () => {
    const sample = vi.fn().mockResolvedValue(CLEARED);
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(pollFirstRunGate(sample, 90_000, sleep)).resolves.toBe('cleared');
    expect(sample).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it('returns the stuck snapshot once one appears, with its fields intact', async () => {
    const stuckSample = {
      gateVisible: true,
      escapeHatchVisible: true,
      headingVisible: false,
      onErrorScreen: true,
    };
    const sample = vi
      .fn()
      .mockResolvedValueOnce(SHOWING_NOTHING_RECOGNISABLE)
      .mockResolvedValueOnce(SHOWING_NOTHING_RECOGNISABLE)
      .mockResolvedValueOnce(stuckSample);
    const sleep = vi.fn().mockResolvedValue(undefined);

    const result = await pollFirstRunGate(sample, 90_000, sleep);

    expect(result).toEqual(stuckSample);
    expect(sample).toHaveBeenCalledTimes(3);
    // One sleep between each of the three samples, never after the last one — a poll that keeps
    // sleeping after it already has its answer would just be burning the caller's remaining budget.
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenNthCalledWith(1, 100);
    expect(sleep).toHaveBeenNthCalledWith(2, 100);
  });

  it('gives up as inconclusive once the timeout elapses, without ever settling', async () => {
    // A controllable clock, not vi.useFakeTimers(): the loop's own Date.now() calls read this, and
    // the injected `sleep` is what advances it — exactly mirroring how the real setTimeout-backed
    // sleep advances real time, but deterministically and without waiting.
    let now = 0;
    vi.spyOn(Date, 'now').mockImplementation(() => now);
    const sample = vi.fn().mockResolvedValue(SHOWING_NOTHING_RECOGNISABLE);
    const sleep = vi.fn().mockImplementation(async (ms: number) => {
      now += ms;
    });

    try {
      const result = await pollFirstRunGate(sample, 500, sleep);

      expect(result).toBe('inconclusive');
      // A budget of 500ms polled every 100ms samples six times (t=0,100,200,300,400,500) and sleeps
      // between each — five sleeps, not four or six, pins the elapsed check at ">=" rather than ">".
      expect(sample).toHaveBeenCalledTimes(6);
      expect(sleep).toHaveBeenCalledTimes(5);
    } finally {
      vi.restoreAllMocks();
    }
  });

  it('rejects immediately when a sample fails because the page, its context, or the browser closed', async () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');
    const sample = vi.fn().mockRejectedValue(closedError);
    const sleep = vi.fn().mockResolvedValue(undefined);

    let caught: unknown;
    try {
      await pollFirstRunGate(sample, 90_000, sleep);
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(Error);
    const message = caught instanceof Error ? caught.message : undefined;
    const cause = caught instanceof Error ? caught.cause : undefined;
    expect(message).toMatch(/page, its context, or the browser closed/);
    expect(cause).toBe(closedError);
    // Rejects on the very first sample — never sleeps waiting for a gate that no longer has a page
    // to be observed on.
    expect(sample).toHaveBeenCalledTimes(1);
    expect(sleep).not.toHaveBeenCalled();
  });

  it('keeps polling past a sample error that is not a closed page, context, or browser', async () => {
    const sample = vi
      .fn()
      .mockRejectedValueOnce(new Error('transient DOM read failure'))
      .mockResolvedValueOnce(CLEARED);
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(pollFirstRunGate(sample, 90_000, sleep)).resolves.toBe('cleared');
    // The next sample's result is what wins — the failed read is not retried in place, and the loop
    // does not fail the whole poll over it either.
    expect(sample).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(100);
  });
});
