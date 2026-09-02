/**
 * Pins the Playwright behaviour the interface-mode precondition depends on.
 *
 * `expect.poll` retries a generator whose VALUE does not match, but it evaluates that generator
 * outside the try/catch that does the retrying — so a generator which throws ends the poll on its
 * first attempt. Anything polling a network read has to catch its own errors, or one transient
 * failure reports as "never reachable".
 *
 * Asserted against the installed Playwright rather than described in a comment, so an upgrade that
 * changes it fails here instead of in a suite that cannot explain itself.
 */
import { expect as playwrightExpect } from '@playwright/test';
import { describe, expect, it } from 'vitest';
import { singleAttemptBudgetMs } from './helpers';

describe('expect.poll and a throwing generator', () => {
  it('stops at the first attempt when the generator throws', async () => {
    let attempts = 0;

    await expect(
      playwrightExpect
        .poll(
          () => {
            attempts += 1;
            throw new Error('transient');
          },
          { timeout: 3000, intervals: [10] },
        )
        .toBe('power'),
    ).rejects.toThrow('transient');

    // The point: it did not retry. A generator that lets its errors escape gets one attempt.
    expect(attempts).toBe(1);
  });

  it('keeps polling when the generator catches its own errors', async () => {
    let attempts = 0;

    await playwrightExpect
      .poll(
        () => {
          attempts += 1;
          try {
            if (attempts < 3) throw new Error('transient');
            return 'power';
          } catch {
            return undefined;
          }
        },
        { timeout: 3000, intervals: [10] },
      )
      .toBe('power');

    expect(attempts).toBe(3);
  });
});

describe('one attempt cannot spend the whole budget', () => {
  it('caps a single request well below a launch-phase budget, so the poll can sample again', () => {
    // The defect this exists to prevent: giving one request the entire remaining budget means a
    // request that hangs ends the poll after a single sample, and the retry loop around it never
    // runs at all.
    expect(singleAttemptBudgetMs(120_000)).toBe(10_000);
    expect(singleAttemptBudgetMs(120_000)).toBeLessThan(120_000);
  });

  it('spends only what is left when the budget is nearly gone', () => {
    expect(singleAttemptBudgetMs(5_000)).toBe(5_000);
  });

  it('keeps a floor a request can actually complete within', () => {
    // A budget that has run out must still produce a request worth making, rather than one that
    // reports a timeout it was never given a chance to beat.
    expect(singleAttemptBudgetMs(0)).toBe(1_000);
    expect(singleAttemptBudgetMs(-5_000)).toBe(1_000);
  });
});
