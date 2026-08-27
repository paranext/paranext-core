import { afterEach, vi } from 'vitest';
import { debounce, DEBOUNCE_CANCELED_ERROR_MESSAGE, retryUntil } from './util';

describe('debounce', () => {
  afterEach(() => vi.useRealTimers());

  it('should return a promise, not the synchronously returned value, when called synchronously', () => {
    const returnValue = 3;
    const debounceFn = debounce(() => {
      return returnValue;
    }, 1);

    debounceFn();
    debounceFn();
    expect(debounceFn()).not.toEqual(returnValue);
  });

  it('should not call the debounced function immediately', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    debounceFn();
    debounceFn();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should call the debounced function asynchronously once per set of synchronous calls', async () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    debounceFn();
    debounceFn();
    expect(mockFunction).not.toHaveBeenCalled();

    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(1);

    await debounceFn();
    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(3);

    debounceFn();
    debounceFn();
    debounceFn();
    debounceFn();
    await debounceFn();

    expect(mockFunction).toHaveBeenCalledTimes(4);
  });

  it('should reject with the cancel error message when canceled before the debounce fires', async () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    const result = debounceFn();
    debounceFn.cancel();

    await expect(result).rejects.toThrow(DEBOUNCE_CANCELED_ERROR_MESSAGE);
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should allow new calls after cancel', async () => {
    const mockFunction = vi.fn().mockReturnValue(42);
    const debounceFn = debounce(mockFunction, 1);

    const canceled = debounceFn();
    debounceFn.cancel();
    await expect(canceled).rejects.toThrow(DEBOUNCE_CANCELED_ERROR_MESSAGE);

    expect(await debounceFn()).toBe(42);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should be a no-op when cancel is called with no pending invocation', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    expect(() => debounceFn.cancel()).not.toThrow();
  });

  it('should run the pending invocation synchronously on flush, with the latest args, and not fire the timer again', async () => {
    vi.useFakeTimers();
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1000);

    const pending = debounceFn('a');
    debounceFn('b');
    expect(mockFunction).not.toHaveBeenCalled();

    const flushed = debounceFn.flush();

    // Synchronous: no timer advance, no microtask turn needed for the invocation itself
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith('b');
    // Every pending call's promise settles with the flushed invocation's outcome
    await expect(pending).resolves.toBeUndefined();
    await expect(flushed).resolves.toBeUndefined();

    // The original timer must not fire the invocation a second time
    await vi.advanceTimersByTimeAsync(2000);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  it('should resolve the flushed promise with the invocation result', async () => {
    const mockFunction = vi.fn().mockReturnValue(42);
    const debounceFn = debounce(mockFunction, 1000);

    debounceFn();
    await expect(debounceFn.flush()).resolves.toBe(42);
  });

  it('should return undefined from flush (and run nothing) when no invocation is pending', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1);

    expect(debounceFn.flush()).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should not flush an invocation that was already canceled', () => {
    const mockFunction = vi.fn();
    const debounceFn = debounce(mockFunction, 1000);

    debounceFn().catch(() => undefined);
    debounceFn.cancel();

    expect(debounceFn.flush()).toBeUndefined();
    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('should mint a fresh promise for a call made right after flush — each caller gets its own outcome', async () => {
    // While the flushed invocation settles (an async window), the stored promise must already be
    // detached: a call in that window that reused it received the flushed call's result and had
    // its own outcome — including this rejection — silently discarded.
    vi.useFakeTimers();
    const debounceFn = debounce(async (shouldReject: boolean) => {
      if (shouldReject) throw new Error('second invocation failed');
      return 'first result';
    }, 1000);

    const first = debounceFn(false);
    const flushed = debounceFn.flush();
    // Scheduled inside the flushed invocation's settling window; the rejection handler is
    // attached before the timer fires so the rejection is never momentarily unhandled
    const secondRejects = expect(debounceFn(true)).rejects.toThrow('second invocation failed');

    await expect(flushed).resolves.toBe('first result');
    await expect(first).resolves.toBe('first result');

    await vi.advanceTimersByTimeAsync(1000);
    await secondRejects;
  });

  it('should preserve a re-schedule made from inside the flushed invocation', async () => {
    vi.useFakeTimers();
    const runs: string[] = [];
    const debounceFn = debounce((value: string) => {
      runs.push(value);
      if (value === 'first') debounceFn('second').catch(() => undefined);
    }, 1000);

    debounceFn('first').catch(() => undefined);
    debounceFn.flush();
    expect(runs).toEqual(['first']);

    await vi.advanceTimersByTimeAsync(1000);
    expect(runs).toEqual(['first', 'second']);
  });
});

describe('retryUntil', () => {
  afterEach(() => vi.useRealTimers());

  it('returns the first accepted result without retrying', async () => {
    const attempt = vi.fn().mockResolvedValue('yes');
    await expect(
      retryUntil(attempt, (r) => r === 'yes', { maxAttempts: 3, delayMs: 0 }),
    ).resolves.toBe('yes');
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('retries until the result is accepted', async () => {
    const attempt = vi.fn().mockResolvedValueOnce('no').mockResolvedValueOnce('yes');
    await expect(
      retryUntil(attempt, (r) => r === 'yes', { maxAttempts: 3, delayMs: 0 }),
    ).resolves.toBe('yes');
    expect(attempt).toHaveBeenCalledTimes(2);
  });

  it('resolves to the last result after exhausting attempts (never throws)', async () => {
    const attempt = vi.fn().mockResolvedValue('nope');
    await expect(
      retryUntil(attempt, (r) => r === 'yes', { maxAttempts: 3, delayMs: 0 }),
    ).resolves.toBe('nope');
    expect(attempt).toHaveBeenCalledTimes(3);
  });

  it('always attempts at least once even when maxAttempts is non-positive', async () => {
    const attempt = vi.fn().mockResolvedValue('nope');
    await expect(
      retryUntil(attempt, (r) => r === 'yes', { maxAttempts: 0, delayMs: 0 }),
    ).resolves.toBe('nope');
    expect(attempt).toHaveBeenCalledTimes(1);
  });

  it('defaults to 3 attempts when maxAttempts is omitted', async () => {
    const attempt = vi.fn().mockResolvedValue('no');
    await retryUntil(attempt, () => false, { delayMs: 0 });
    expect(attempt).toHaveBeenCalledTimes(3);
  });

  it('passes the 1-based attempt number to the attempt fn', async () => {
    const seen: number[] = [];
    const attempt = vi.fn(async (n: number) => {
      seen.push(n);
      return 'no';
    });
    await retryUntil(attempt, () => false, { maxAttempts: 3, delayMs: 0 });
    expect(seen).toEqual([1, 2, 3]);
  });

  it('waits delayMs between attempts and skips it after the last', async () => {
    vi.useFakeTimers();
    const attempt = vi.fn().mockResolvedValue('retry');
    const promise = retryUntil(attempt, (r) => r === 'done', { maxAttempts: 2, delayMs: 2000 });
    await vi.advanceTimersByTimeAsync(0); // settle attempt 1
    expect(attempt).toHaveBeenCalledTimes(1); // attempt 2 is gated behind the 2s backoff
    await vi.advanceTimersByTimeAsync(2000); // elapse the backoff → attempt 2 runs
    expect(attempt).toHaveBeenCalledTimes(2);
    // Resolves right after attempt 2 without advancing further → no trailing wait after the last.
    await expect(promise).resolves.toBe('retry');
  });
});
