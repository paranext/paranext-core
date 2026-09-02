/**
 * Unit tests for the window-size precondition, targeted at the Full-HD-vs-1280x800 choice a spec
 * makes with `test.use({ requiredWindowSize })`.
 *
 * `assertDeclaredWindowSize` takes only `evaluate`, not the full Playwright `Page`, so these drive
 * it directly with a stub instead of a real browser connection.
 */
import { describe, expect, it, vi } from 'vitest';
import { assertDeclaredWindowSize, DEFAULT_WINDOW_SIZE } from './helpers';

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
    // The fix: a spec that does not write evidence screenshots declares DEFAULT_WINDOW_SIZE instead
    // of inheriting the Full HD floor, and the same real window that failed above satisfies it.
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
