/**
 * Unit tests for the first-run-gate poll (see {@link pollFirstRunGate}'s own docblock for why it
 * takes one DOM snapshot per iteration rather than racing several `waitFor` calls against each
 * other). This pins the polling loop's own control flow (cleared / stuck / inconclusive / error
 * handling) independent of any real Page — plus, since {@link rethrowIfTargetClosed} exists only to
 * serve that loop, the tests for how it tells a closed page/context/browser apart from an ordinary
 * transient read failure.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { pollFirstRunGate, rethrowIfTargetClosed } from './helpers';

afterEach(() => {
  vi.restoreAllMocks();
});

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
    const now = vi.fn().mockReturnValue(0);

    await expect(pollFirstRunGate(sample, 90_000, { sleep, now })).resolves.toBe('cleared');
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
    const now = vi.fn().mockReturnValue(0);

    const result = await pollFirstRunGate(sample, 90_000, { sleep, now });

    expect(result).toEqual(stuckSample);
    expect(sample).toHaveBeenCalledTimes(3);
    // One sleep between each of the three samples, never after the last one — a poll that keeps
    // sleeping after it already has its answer would just be burning the caller's remaining budget.
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenNthCalledWith(1, 100);
    expect(sleep).toHaveBeenNthCalledWith(2, 100);
  });

  it('gives up as inconclusive once the timeout elapses, without ever settling', async () => {
    // A controllable clock, injected as `now` rather than a global Date.now() spy: the loop reads
    // `now()` directly, and the injected `sleep` is what advances it — exactly mirroring how the
    // real setTimeout-backed sleep advances real time, but deterministically and without waiting.
    let elapsed = 0;
    const now = vi.fn().mockImplementation(() => elapsed);
    const sample = vi.fn().mockResolvedValue(SHOWING_NOTHING_RECOGNISABLE);
    const sleep = vi.fn().mockImplementation(async (ms: number) => {
      elapsed += ms;
    });

    const result = await pollFirstRunGate(sample, 500, { sleep, now });

    expect(result).toBe('inconclusive');
    // A budget of 500ms polled every 100ms samples six times (t=0,100,200,300,400,500) and sleeps
    // between each — five sleeps, not four or six, pins the elapsed check at ">=" rather than ">".
    expect(sample).toHaveBeenCalledTimes(6);
    expect(sleep).toHaveBeenCalledTimes(5);
  });

  it('rejects immediately when a sample fails because the page, its context, or the browser closed', async () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');
    const sample = vi.fn().mockRejectedValue(closedError);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValue(0);

    let caught: unknown;
    try {
      await pollFirstRunGate(sample, 90_000, { sleep, now });
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
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(pollFirstRunGate(sample, 90_000, { sleep, now })).resolves.toBe('cleared');
    // The next sample's result is what wins — the failed read is not retried in place, and the loop
    // does not fail the whole poll over it either.
    expect(sample).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
    expect(sleep).toHaveBeenCalledWith(100);
    // A single swallowed failure still logs once — the streak just resets on the very next sample
    // instead of ever reaching MAX_CONSECUTIVE_SAMPLE_FAILURES.
    expect(warnSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('[e2e-first-run-gate]'),
    );
  });

  it('gives up as inconclusive after 3 consecutive sample failures, warning only once', async () => {
    // A persisting failure — e.g. a selector that will never match — must not burn the whole
    // poll budget silently: it should be logged once and give up well short of the timeout.
    const sample = vi.fn().mockRejectedValue(new Error('selector never matches'));
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await pollFirstRunGate(sample, 90_000, { sleep, now });

    expect(result).toBe('inconclusive');
    expect(sample).toHaveBeenCalledTimes(3);
    // Two sleeps between the three samples — the loop returns as soon as the 3rd failure lands,
    // never sleeping again after it already has its answer.
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('[e2e-first-run-gate]'),
    );
  });
});

describe('rethrowIfTargetClosed', () => {
  it('does nothing for a plain timeout, leaving pollFirstRunGate to sample again', () => {
    const timeoutError = new Error('locator.waitFor: Timeout 5000ms exceeded.');
    timeoutError.name = 'TimeoutError';

    expect(rethrowIfTargetClosed(timeoutError)).toBeUndefined();
  });

  it('does not match on error.name alone — TargetClosedError never sets it', () => {
    // Guards the exact regression this function was rewritten to avoid: a real TargetClosedError
    // reports `.name === "Error"` (inherited from Error.prototype), so a fixture that only sets
    // `.name` to the string "TargetClosedError" without being that class must NOT match either —
    // otherwise the test would pass for the wrong reason.
    const lookalike = new Error('Target page, context or browser has been closed');
    lookalike.name = 'TargetClosedError';

    expect(() => rethrowIfTargetClosed(lookalike)).not.toThrow();
  });

  it('rethrows a TargetClosedError instead of letting the poll continue', () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');

    expect(() => rethrowIfTargetClosed(closedError)).toThrow(
      /page, its context, or the browser closed/,
    );
  });

  it('attaches the original error as the cause of the rethrow', () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');

    let caught: unknown;
    try {
      rethrowIfTargetClosed(closedError);
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(Error);
    const cause = caught instanceof Error ? caught.cause : undefined;
    expect(cause).toBe(closedError);
  });
});
