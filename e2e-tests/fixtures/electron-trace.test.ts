/**
 * Unit tests for `electronTracePlan`: which attempts record an Electron DOM trace and which keep
 * it, for each Playwright `trace` option value; and for `stopElectronTrace`: when a trace that
 * cannot be stopped is worth a warning. Runs under vitest, not Playwright.
 */
import { describe, expect, it, vi } from 'vitest';
import { electronTracePlan, stopElectronTrace } from './electron-trace';

/** Which of the first three attempts (retry 0, 1, 2) record a trace. */
function recordedAttempts(trace: Parameters<typeof electronTracePlan>[0]): number[] {
  return [0, 1, 2].filter((retry) => electronTracePlan(trace, retry).record);
}

describe('electronTracePlan', () => {
  it.each([
    ['off', []],
    ['on', [0, 1, 2]],
    ['retain-on-failure', [0, 1, 2]],
    ['retain-on-failure-and-retries', [0, 1, 2]],
    ['retain-on-first-failure', [0]],
    ['on-first-retry', [1]],
    ['retry-with-trace', [1]],
    ['on-all-retries', [1, 2]],
  ] as const)('records under %s on attempts %j, as Playwright does', (trace, attempts) => {
    expect(recordedAttempts(trace)).toEqual(attempts);
  });

  it.each(['retain-on-failure', 'retain-on-first-failure'] as const)(
    'keeps a %s trace only for a failed attempt',
    (trace) => {
      expect(electronTracePlan(trace, 0).keepOnlyOnFailure).toBe(true);
    },
  );

  it.each(['on', 'on-first-retry', 'on-all-retries'] as const)(
    'keeps every %s trace it records',
    (trace) => {
      expect(electronTracePlan(trace, 1).keepOnlyOnFailure).toBe(false);
    },
  );

  it('keeps a retain-on-failure-and-retries trace from a first attempt only if it failed, and every retry', () => {
    expect(electronTracePlan('retain-on-failure-and-retries', 0).keepOnlyOnFailure).toBe(true);
    expect(electronTracePlan('retain-on-failure-and-retries', 1).keepOnlyOnFailure).toBe(false);
    expect(electronTracePlan('retain-on-failure-and-retries', 2).keepOnlyOnFailure).toBe(false);
  });

  it('records DOM snapshots and screenshots unless the option turns them off', () => {
    expect(electronTracePlan('retain-on-failure', 0)).toMatchObject({
      snapshots: true,
      screenshots: true,
    });
    expect(
      electronTracePlan({ mode: 'retain-on-failure', snapshots: false, screenshots: false }, 0),
    ).toMatchObject({ record: true, snapshots: false, screenshots: false });
  });

  it('passes an object snapshots option through unchanged', () => {
    const snapshots = { dom: true, aria: true, screen: false };
    expect(electronTracePlan({ mode: 'on', snapshots }, 0).snapshots).toEqual(snapshots);
  });

  it('reads the mode from the object form', () => {
    expect(electronTracePlan({ mode: 'off' }, 0).record).toBe(false);
    expect(electronTracePlan({ mode: 'on-first-retry' }, 1).record).toBe(true);
    expect(electronTracePlan({ mode: 'on-first-retry' }, 0).record).toBe(false);
  });
});

describe('stopElectronTrace', () => {
  const appGone = () =>
    Promise.reject(new Error('Target page, context or browser has been closed'));

  it('saves and attaches a trace it keeps', async () => {
    const stop = vi.fn(() => Promise.resolve());
    const attach = vi.fn(() => Promise.resolve());
    const warn = vi.fn();
    await stopElectronTrace({ keep: true, stop, tracePath: () => '/out/t.zip', attach, warn });
    expect(stop).toHaveBeenCalledWith('/out/t.zip');
    expect(attach).toHaveBeenCalledWith('/out/t.zip');
    expect(warn).not.toHaveBeenCalled();
  });

  it('warns when a trace it was to keep cannot be saved', async () => {
    const warn = vi.fn();
    await stopElectronTrace({
      keep: true,
      stop: appGone,
      tracePath: () => '/out/t.zip',
      attach: () => Promise.resolve(),
      warn,
    });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('Could not save the Electron trace'));
  });

  it('stays quiet when stopping a trace to discard throws before it returns a promise', async () => {
    const warn = vi.fn();
    await expect(
      stopElectronTrace({
        keep: false,
        stop: () => {
          throw new Error('no context');
        },
        tracePath: () => '/out/t.zip',
        attach: () => Promise.resolve(),
        warn,
      }),
    ).resolves.toBeUndefined();
    expect(warn).not.toHaveBeenCalled();
  });

  it('names the saved file when a kept trace is saved but cannot be attached', async () => {
    const warn = vi.fn();
    await stopElectronTrace({
      keep: true,
      stop: () => Promise.resolve(),
      tracePath: () => '/out/t.zip',
      attach: () => Promise.reject(new Error('attach failed')),
      warn,
    });
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('saved to /out/t.zip but could not be attached'),
    );
  });

  it('stays quiet when a trace it was to discard cannot be stopped, as after a test closes the app', async () => {
    const stop = vi.fn(appGone);
    const warn = vi.fn();
    await stopElectronTrace({
      keep: false,
      stop,
      tracePath: () => '/out/t.zip',
      attach: () => Promise.resolve(),
      warn,
    });
    // Control: the stop was attempted, and failed.
    expect(stop).toHaveBeenCalledWith(undefined);
    expect(warn).not.toHaveBeenCalled();
  });
});
