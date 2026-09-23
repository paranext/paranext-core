export type RaceWithTimeoutResult<T> = { timedOut: false; value: T } | { timedOut: true };

/**
 * Settles with `promise`'s value, or with `{ timedOut: true }` once `timeoutMs` has elapsed,
 * whichever comes first. A rejection before the timeout propagates, so a caller can tell a real
 * failure from running out of time. The timer is always cleared.
 */
export async function raceWithTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<RaceWithTimeoutResult<T>> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<RaceWithTimeoutResult<T>>((resolve) => {
    timer = setTimeout(() => resolve({ timedOut: true }), timeoutMs);
  });
  try {
    return await Promise.race([
      promise.then((value): RaceWithTimeoutResult<T> => ({ timedOut: false, value })),
      timeout,
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}
