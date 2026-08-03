import { wait } from 'platform-bible-utils';

/**
 * Repeatedly runs an async attempt until its result is accepted or the attempt budget is exhausted,
 * waiting a fixed delay between tries (never after the last). Always resolves to the last result —
 * it never throws on exhaustion, so the caller decides what a give-up result means.
 *
 * This is the fixed-attempts + fixed-delay retry shape shared by flaky-startup probes (e.g.
 * `resolveRegistrationValidity`, and the missing-handler retry in `requestWithRetry`). For
 * deadline- or abort-driven retries with variable backoff (e.g. `requestSessionSyncWithBootRetry`
 * in startup-tasks), use a bespoke loop instead — this helper deliberately does not cover those.
 *
 * @param attempt Runs one try; receives the 1-based attempt number and resolves to a result.
 * @param isDone Returns `true` when `attempt`'s result is acceptable and retrying should stop.
 * @param options.maxAttempts Total tries; clamped to at least 1. Defaults to 3.
 * @param options.delayMs Delay between tries. Defaults to 0.
 * @returns The first accepted result, or the last attempt's result if none qualified.
 */
export async function retryUntil<TResult>(
  attempt: (attemptNumber: number) => Promise<TResult>,
  isDone: (result: TResult) => boolean,
  options?: { maxAttempts?: number; delayMs?: number },
): Promise<TResult> {
  const maxAttempts = Math.max(1, options?.maxAttempts ?? 3);
  const delayMs = options?.delayMs ?? 0;
  let attemptNumber = 1;
  for (;;) {
    // Await inside the loop on purpose: try one at a time so each retry gives whatever we're waiting
    // on more time to become ready.
    // eslint-disable-next-line no-await-in-loop
    const result = await attempt(attemptNumber);
    // Return before the backoff on both success and the final attempt, so we never wait after the
    // last try.
    if (isDone(result) || attemptNumber >= maxAttempts) return result;
    attemptNumber += 1;
    // Await inside the loop on purpose: back off before the next attempt.
    // eslint-disable-next-line no-await-in-loop
    await wait(delayMs);
  }
}
