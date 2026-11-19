/**
 * Unit tests for `electronTracePlan`: which attempts record an Electron DOM trace and which keep
 * it, for each Playwright `trace` option value. Runs under vitest, not Playwright.
 */
import { describe, expect, it } from 'vitest';
import { electronTracePlan } from './electron-trace';

/** Which of the first three attempts (retry 0, 1, 2) record a trace. */
function recordedAttempts(trace: Parameters<typeof electronTracePlan>[0]): number[] {
  return [0, 1, 2].filter((retry) => electronTracePlan(trace, retry).record);
}

describe('electronTracePlan', () => {
  it.each([
    ['off', []],
    ['on', [0, 1, 2]],
    ['retain-on-failure', [0, 1, 2]],
    ['retain-on-first-failure', [0]],
    ['on-first-retry', [1]],
    ['retry-with-trace', [1]],
    ['on-all-retries', [1, 2]],
    ['retain-on-failure-and-retries', [0, 1, 2]],
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

  it('keeps a retain-on-failure-and-retries trace from a first run only if it failed, and every retry', () => {
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

  it('passes the per-kind snapshots object through to the trace as given', () => {
    expect(
      electronTracePlan({ mode: 'on', snapshots: { dom: true, aria: true, screen: false } }, 0)
        .snapshots,
    ).toEqual({ dom: true, aria: true, screen: false });
  });

  it('reads the mode from the object form', () => {
    expect(electronTracePlan({ mode: 'off' }, 0).record).toBe(false);
    expect(electronTracePlan({ mode: 'on-first-retry' }, 1).record).toBe(true);
    expect(electronTracePlan({ mode: 'on-first-retry' }, 0).record).toBe(false);
  });
});
