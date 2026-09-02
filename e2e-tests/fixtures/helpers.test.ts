/**
 * Unit tests for the window-size precondition, targeted at the Full-HD-vs-1280x800 choice a spec
 * makes with `test.use({ requiredWindowSize })`.
 *
 * `assertDeclaredWindowSize` takes only `evaluate`, not the full Playwright `Page`, so these drive
 * it directly with a stub instead of a real browser connection.
 */
import { describe, expect, it, vi } from 'vitest';
import {
  assertDeclaredWindowSize,
  ASSERT_INTERFACE_MODE_TIMEOUT_MS,
  DEFAULT_WINDOW_SIZE,
  isPopoverTriggerExpanded,
  LAUNCH_PHASE_TIMEOUT_MS,
  resolveRaceLeg,
} from './helpers';

/** A stub whose `evaluate` resolves to the given window size, whatever function is passed in. */
function pageReporting(size: { width: number; height: number }): {
  evaluate: ReturnType<typeof vi.fn>;
} {
  return { evaluate: vi.fn().mockResolvedValue(size) };
}

describe('assertDeclaredWindowSize', () => {
  it('rejects a maximized-with-taskbar window against the Full HD screenshot floor', async () => {
    // A maximized Windows window under a taskbar reports roughly this — short of the 1080 floor by
    // more than the 8px Xvfb tolerance, so a spec that does not override the CDP fixture's default
    // cannot start on the only OS title-bar-reserved-space.spec.ts runs on.
    const page = pageReporting({ width: 1920, height: 1032 });

    await expect(
      assertDeclaredWindowSize(page, { width: 1920, height: 1080 }, 'resize it'),
    ).rejects.toThrow(/declares a 1920x1080 window but the Electron window is 1920x1032/);
  });

  it('accepts the same window against DEFAULT_WINDOW_SIZE', async () => {
    // A spec that does not write evidence screenshots declares DEFAULT_WINDOW_SIZE instead of
    // inheriting the Full HD floor, and the same real window that failed above satisfies it.
    const page = pageReporting({ width: 1920, height: 1032 });

    await expect(
      assertDeclaredWindowSize(page, DEFAULT_WINDOW_SIZE, 'resize it'),
    ).resolves.toBeUndefined();
  });

  it('accepts a window at exactly DEFAULT_WINDOW_SIZE', async () => {
    const page = pageReporting({ width: 1280, height: 800 });

    await expect(
      assertDeclaredWindowSize(page, DEFAULT_WINDOW_SIZE, 'resize it'),
    ).resolves.toBeUndefined();
  });
});

describe('timeout budgets', () => {
  it('gives assertInterfaceMode room to report its own diagnostic before the whole-test timeout fires', () => {
    // assertInterfaceMode runs last in a launch fixture, after phases that can themselves spend
    // part of LAUNCH_PHASE_TIMEOUT_MS, so its own poll must leave a margin rather than claim the
    // full budget — see the constants' TSDoc in helpers.ts for why.
    expect(ASSERT_INTERFACE_MODE_TIMEOUT_MS).toBeLessThan(LAUNCH_PHASE_TIMEOUT_MS);
  });
});

describe('isPopoverTriggerExpanded', () => {
  it('reports expanded when aria-expanded is the string "true"', () => {
    expect(isPopoverTriggerExpanded('true')).toBe(true);
  });

  it('reports collapsed when aria-expanded is "false"', () => {
    expect(isPopoverTriggerExpanded('false')).toBe(false);
  });

  it('reports collapsed when the attribute is absent (null)', () => {
    // getAttribute's real return type is `string | null` (a DOM/Playwright contract), so this
    // case needs an actual null, not undefined.
    // eslint-disable-next-line no-null/no-null
    expect(isPopoverTriggerExpanded(null)).toBe(false);
  });
});

describe('resolveRaceLeg', () => {
  // Playwright's real TargetClosedError never sets `this.name`, so a fixture for it has to be a
  // distinctly-named subclass — matching `error.name` here would pass even if resolveRaceLeg
  // regressed to checking the wrong property.
  class TargetClosedError extends Error {}

  it('reports a plain timeout as inconclusive', () => {
    const timeoutError = new Error('locator.waitFor: Timeout 5000ms exceeded.');
    timeoutError.name = 'TimeoutError';

    expect(resolveRaceLeg(timeoutError)).toBe('inconclusive');
  });

  it('does not match on error.name alone — TargetClosedError never sets it', () => {
    // Guards the exact regression this function was rewritten to avoid: a real TargetClosedError
    // reports `.name === "Error"` (inherited from Error.prototype), so a fixture that only sets
    // `.name` to the string "TargetClosedError" without being that class must NOT match either —
    // otherwise the test would pass for the wrong reason.
    const lookalike = new Error('Target page, context or browser has been closed');
    lookalike.name = 'TargetClosedError';

    expect(resolveRaceLeg(lookalike)).toBe('inconclusive');
  });

  it('rethrows a TargetClosedError instead of collapsing it to inconclusive', () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');

    expect(() => resolveRaceLeg(closedError)).toThrow(/page, its context, or the browser closed/);
  });

  it('attaches the original error as the cause of the rethrow', () => {
    const closedError = new TargetClosedError('Target page, context or browser has been closed');

    let caught: unknown;
    try {
      resolveRaceLeg(closedError);
    } catch (err) {
      caught = err;
    }

    expect(caught).toBeInstanceOf(Error);
    const cause = caught instanceof Error ? caught.cause : undefined;
    expect(cause).toBe(closedError);
  });
});
