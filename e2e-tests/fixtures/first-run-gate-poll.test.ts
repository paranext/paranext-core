/**
 * Unit tests for the first-run-gate poll (see {@link pollFirstRunGate}'s own docblock for why it
 * takes one DOM snapshot per iteration rather than racing several `waitFor` calls against each
 * other). This pins the polling loop's own control flow (cleared / stuck / inconclusive / error
 * handling) independent of any real Page — plus, since {@link rethrowIfTargetClosed} exists only to
 * serve that loop, the tests for how it tells a closed page/context/browser apart from an ordinary
 * transient read failure.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildFirstRunGateSample, pollFirstRunGate, rethrowIfTargetClosed } from './helpers';

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

  it('gives up carrying the triggering error after 3 consecutive sample failures', async () => {
    // A persisting failure — e.g. a selector that will never match — must not burn the whole poll
    // budget silently: it should give up well short of the timeout, with the error that actually
    // triggered the give-up attached to the result rather than collapsed into a bare 'inconclusive'.
    const persistentError = new Error('selector never matches');
    const sample = vi.fn().mockRejectedValue(persistentError);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await pollFirstRunGate(sample, 90_000, { sleep, now });

    expect(result).toEqual({ sampleReadFailure: persistentError });
    expect(sample).toHaveBeenCalledTimes(3);
    // Two sleeps between the three samples — the loop returns as soon as the 3rd failure lands,
    // never sleeping again after it already has its answer.
    expect(sleep).toHaveBeenCalledTimes(2);
    // Once for the first swallowed failure ("will keep polling"), once more at the give-up point
    // naming the error that actually triggered it — both carry the same stable prefix.
    expect(warnSpy).toHaveBeenCalledTimes(2);
    warnSpy.mock.calls.forEach(([message]) => {
      expect(message).toContain('[e2e-first-run-gate]');
    });
    expect(warnSpy).toHaveBeenLastCalledWith(expect.stringContaining('selector never matches'));
  });

  it('gives up naming the failure streak that triggered it, not an earlier one that already cleared', async () => {
    // hasWarnedOnSampleFailure only ever fires for the very first failure of the whole poll, while
    // the streak that actually triggers give-up can be a later, unrelated run of errors — the
    // give-up log and the returned error must name THAT streak, not the first failure ever seen.
    const transientError = new Error('transient A');
    const persistentError = new Error('persistent B');
    const sample = vi
      .fn()
      .mockRejectedValueOnce(transientError)
      .mockResolvedValueOnce(SHOWING_NOTHING_RECOGNISABLE)
      .mockRejectedValue(persistentError);
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = await pollFirstRunGate(sample, 90_000, { sleep, now });

    expect(result).toEqual({ sampleReadFailure: persistentError });
    expect(warnSpy).toHaveBeenLastCalledWith(expect.stringContaining('persistent B'));
    expect(warnSpy).not.toHaveBeenLastCalledWith(expect.stringContaining('transient A'));
  });
});

describe('buildFirstRunGateSample', () => {
  it('reports cleared even when a discriminator read throws, once the gate itself reads false', async () => {
    // Promise.all would let escapeHatch's rejection discard the gate's own (cleanly read) false —
    // turning an ordinary "the gate closed" moment into a sample failure.
    const locators = {
      gate: { isVisible: vi.fn().mockResolvedValue(false) },
      escapeHatch: { isVisible: vi.fn().mockRejectedValue(new Error('detached from DOM')) },
      heading: { isVisible: vi.fn().mockResolvedValue(false) },
      errorScreen: { count: vi.fn().mockResolvedValue(0) },
    };

    await expect(buildFirstRunGateSample(locators)).resolves.toEqual({
      gateVisible: false,
      escapeHatchVisible: false,
      headingVisible: false,
      onErrorScreen: false,
    });
  });

  it('defaults an individually-rejected discriminator to false rather than losing the whole sample', async () => {
    const locators = {
      gate: { isVisible: vi.fn().mockResolvedValue(true) },
      escapeHatch: { isVisible: vi.fn().mockRejectedValue(new Error('detached from DOM')) },
      heading: { isVisible: vi.fn().mockResolvedValue(true) },
      errorScreen: { count: vi.fn().mockResolvedValue(0) },
    };

    await expect(buildFirstRunGateSample(locators)).resolves.toEqual({
      gateVisible: true,
      escapeHatchVisible: false,
      headingVisible: true,
      onErrorScreen: false,
    });
  });

  it('rethrows when the gateVisible read itself rejects, rather than defaulting it', async () => {
    // gateVisible is the core signal pollFirstRunGate's streak-counting depends on — unlike the
    // three discriminators, its own rejection must still fail the sample, not resolve to a guess.
    const gateError = new Error('gate locator read failed');
    const locators = {
      gate: { isVisible: vi.fn().mockRejectedValue(gateError) },
      escapeHatch: { isVisible: vi.fn().mockResolvedValue(false) },
      heading: { isVisible: vi.fn().mockResolvedValue(false) },
      errorScreen: { count: vi.fn().mockResolvedValue(0) },
    };

    await expect(buildFirstRunGateSample(locators)).rejects.toBe(gateError);
  });

  it('rethrows a TargetClosedError from any of the four reads, not just gateVisible', async () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');
    const locators = {
      gate: { isVisible: vi.fn().mockResolvedValue(true) },
      escapeHatch: { isVisible: vi.fn().mockRejectedValue(closedError) },
      heading: { isVisible: vi.fn().mockResolvedValue(false) },
      errorScreen: { count: vi.fn().mockResolvedValue(0) },
    };

    await expect(buildFirstRunGateSample(locators)).rejects.toThrow(
      /page, its context, or the browser closed/,
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
