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
  isLocalizedAboutMenuItem,
  isPopoverTriggerExpanded,
  killProcessTree,
  LAUNCH_PHASE_TIMEOUT_MS,
  removeUserDataDirWithRetry,
  rethrowIfTargetClosed,
} from './helpers';

/** A {@link killProcessTree} `deps` bundle whose calls are all spies a test can assert on. */
function killProcessTreeDeps() {
  return {
    isPidAlive: vi.fn().mockReturnValue(true),
    execFileSync: vi.fn(),
    kill: vi.fn().mockReturnValue(true),
  };
}

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

describe('isLocalizedAboutMenuItem', () => {
  it('accepts the About item once its label has been localized to English', () => {
    expect(
      isLocalizedAboutMenuItem({ command: 'platform.about', label: 'About Platform.Bible' }),
    ).toBe(true);
  });

  it('rejects the About item while its label is still the raw menu.data.json placeholder', () => {
    // This is the actual pre-resync shape MenuDataDataProviderEngine's constructor seeds: the
    // command is already correct, but the label has not been through a contribution resync yet.
    expect(isLocalizedAboutMenuItem({ command: 'platform.about', label: '%mainMenu_about%' })).toBe(
      false,
    );
  });

  it('rejects a different item even when its label happens to match', () => {
    // Reject-side coverage for the `command` half of the predicate: a label match alone must not
    // be enough, or the wait could resolve against the wrong menu item.
    expect(
      isLocalizedAboutMenuItem({ command: 'platform.openSettings', label: 'About Platform.Bible' }),
    ).toBe(false);
  });

  it('rejects the About item when it has no label yet', () => {
    expect(isLocalizedAboutMenuItem({ command: 'platform.about' })).toBe(false);
  });
});

describe('rethrowIfTargetClosed', () => {
  // Playwright's real TargetClosedError never sets `this.name`, so a fixture for it has to be a
  // distinctly-named subclass — matching `error.name` here would pass even if
  // rethrowIfTargetClosed regressed to checking the wrong property.
  class TargetClosedError extends Error {}

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

describe('killProcessTree', () => {
  describe('on win32', () => {
    it('walks the whole tree with taskkill when the pid is alive', () => {
      const deps = killProcessTreeDeps();

      killProcessTree(4242, 'SIGKILL', 'win32', deps);

      expect(deps.isPidAlive).toHaveBeenCalledExactlyOnceWith(4242);
      expect(deps.execFileSync).toHaveBeenCalledExactlyOnceWith(
        'taskkill',
        ['/pid', '4242', '/t', '/f'],
        { stdio: 'pipe', timeout: 10_000 },
      );
      expect(deps.kill).not.toHaveBeenCalled();
    });

    it('does not call taskkill when the pid is not alive', () => {
      const deps = killProcessTreeDeps();
      deps.isPidAlive.mockReturnValue(false);

      killProcessTree(4242, 'SIGKILL', 'win32', deps);

      expect(deps.execFileSync).not.toHaveBeenCalled();
    });

    it('warns, but does not throw, when taskkill itself fails', () => {
      const deps = killProcessTreeDeps();
      deps.execFileSync.mockImplementation(() => {
        throw new Error('no such process');
      });
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      expect(() => killProcessTree(4242, 'SIGKILL', 'win32', deps)).not.toThrow();

      expect(warnSpy).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('no such process'));
      warnSpy.mockRestore();
    });
  });

  describe('on POSIX (darwin/linux)', () => {
    it('signals the process group first, and never falls back when that succeeds', () => {
      const deps = killProcessTreeDeps();

      killProcessTree(4242, 'SIGKILL', 'linux', deps);

      expect(deps.kill).toHaveBeenCalledExactlyOnceWith(-4242, 'SIGKILL');
      expect(deps.execFileSync).not.toHaveBeenCalled();
      expect(deps.isPidAlive).not.toHaveBeenCalled();
    });

    it('falls back to the bare pid when the group signal throws', () => {
      const deps = killProcessTreeDeps();
      deps.kill.mockImplementationOnce(() => {
        throw new Error('ESRCH');
      });

      killProcessTree(4242, 'SIGKILL', 'darwin', deps);

      expect(deps.kill).toHaveBeenNthCalledWith(1, -4242, 'SIGKILL');
      expect(deps.kill).toHaveBeenNthCalledWith(2, 4242, 'SIGKILL');
    });

    it('does not throw when both the group and bare-pid signals fail', () => {
      const deps = killProcessTreeDeps();
      deps.kill.mockImplementation(() => {
        throw new Error('ESRCH');
      });

      expect(() => killProcessTree(4242, 'SIGKILL', 'linux', deps)).not.toThrow();
      expect(deps.kill).toHaveBeenCalledTimes(2);
    });
  });
});

describe('removeUserDataDirWithRetry', () => {
  it('succeeds on the first attempt: no sleep, no warning', async () => {
    const rmSync = vi.fn();
    const sleep = vi.fn().mockResolvedValue(undefined);
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await removeUserDataDirWithRetry('/tmp/some-dir', { rmSync, sleep, now });

    expect(rmSync).toHaveBeenCalledExactlyOnceWith('/tmp/some-dir', {
      recursive: true,
      force: true,
    });
    expect(sleep).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('retries silently on a transient lock and succeeds: two 250ms sleeps, no warning', async () => {
    const rmSync = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new Error('EBUSY');
      })
      .mockImplementationOnce(() => {
        throw new Error('EBUSY');
      })
      .mockImplementationOnce(() => {});
    const sleep = vi.fn().mockResolvedValue(undefined);
    // Elapsed time never reaches the budget across these three attempts.
    const now = vi.fn().mockReturnValue(0);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await removeUserDataDirWithRetry('/tmp/some-dir', { rmSync, sleep, now });

    expect(rmSync).toHaveBeenCalledTimes(3);
    expect(sleep).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenNthCalledWith(1, 250);
    expect(sleep).toHaveBeenNthCalledWith(2, 250);
    expect(warnSpy).not.toHaveBeenCalled();

    warnSpy.mockRestore();
  });

  it('gives up once the time budget is exhausted, warning once with the attempt count', async () => {
    const rmSync = vi.fn().mockImplementation(() => {
      throw new Error('EBUSY');
    });
    const sleep = vi.fn().mockResolvedValue(undefined);
    // Called once for the start time, then once per failed attempt to compute elapsed time —
    // reaching the 5000ms budget on the 5th attempt without a single real sleep in the test.
    const now = vi
      .fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1000)
      .mockReturnValueOnce(2000)
      .mockReturnValueOnce(3000)
      .mockReturnValueOnce(4000)
      .mockReturnValueOnce(5000);
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    await removeUserDataDirWithRetry('/tmp/some-dir', { rmSync, sleep, now });

    expect(rmSync).toHaveBeenCalledTimes(5);
    expect(sleep).toHaveBeenCalledTimes(4);
    expect(warnSpy).toHaveBeenCalledExactlyOnceWith(
      expect.stringMatching(/Could not remove .*\/tmp\/some-dir.* after 5 attempts/),
    );

    warnSpy.mockRestore();
  });
});
