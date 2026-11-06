import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { raceWithTimeout } from '@extension-host/services/analytics-timeout';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('a promise that settles before the timeout yields its value and leaves no timer behind', async () => {
  await expect(raceWithTimeout(Promise.resolve(42), 1000)).resolves.toEqual({
    timedOut: false,
    value: 42,
  });
  expect(vi.getTimerCount()).toBe(0);
});

test('a promise still pending at the timeout yields timedOut exactly when the time runs out', async () => {
  let settled = false;
  const racePromise = raceWithTimeout(new Promise(() => {}), 500).finally(() => {
    settled = true;
  });
  await vi.advanceTimersByTimeAsync(499);
  expect(settled).toBe(false);
  await vi.advanceTimersByTimeAsync(1);
  expect(settled).toBe(true);
  await expect(racePromise).resolves.toEqual({ timedOut: true });
});

test('a rejection before the timeout propagates and leaves no timer behind', async () => {
  await expect(raceWithTimeout(Promise.reject(new Error('boom')), 1000)).rejects.toThrow('boom');
  expect(vi.getTimerCount()).toBe(0);
});

test('a timeout of zero yields timedOut for a promise that has not settled yet', async () => {
  const racePromise = raceWithTimeout(new Promise(() => {}), 0);
  await vi.advanceTimersByTimeAsync(0);
  await expect(racePromise).resolves.toEqual({ timedOut: true });
});
