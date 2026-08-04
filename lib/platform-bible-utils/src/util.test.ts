import { afterEach, vi } from 'vitest';
import { debounce, retryUntil } from './util';

describe('debounce', () => {
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
