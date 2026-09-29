import { beforeEach, expect, test, vi } from 'vitest';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

beforeEach(() => {
  vi.resetModules();
});

test('the distinct id is a v4 UUID', async () => {
  const { getDistinctId } = await import('@extension-host/services/analytics-identity');
  expect(getDistinctId()).toMatch(UUID_PATTERN);
});

test('the distinct id is stable for the lifetime of the process', async () => {
  const { getDistinctId } = await import('@extension-host/services/analytics-identity');
  expect(getDistinctId()).toBe(getDistinctId());
});

test('a fresh process (fresh module instance) gets a different distinct id', async () => {
  const first = (await import('@extension-host/services/analytics-identity')).getDistinctId();
  vi.resetModules();
  const second = (await import('@extension-host/services/analytics-identity')).getDistinctId();
  expect(second).not.toBe(first);
});
