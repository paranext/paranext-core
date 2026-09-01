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
