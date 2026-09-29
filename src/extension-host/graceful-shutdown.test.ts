import { beforeEach, expect, test, vi } from 'vitest';
import { runGracefulShutdown } from './graceful-shutdown';

const mocks = vi.hoisted(() => ({
  analyticsShutdown: vi.fn(),
  extensionShutdown: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@extension-host/services/analytics.service', () => ({
  shutdown: mocks.analyticsShutdown,
}));
vi.mock('@extension-host/services/extension.service', () => ({
  shutdown: mocks.extensionShutdown,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: mocks.info, error: mocks.error },
}));

beforeEach(() => {
  vi.clearAllMocks();
  mocks.analyticsShutdown.mockResolvedValue(undefined);
  mocks.extensionShutdown.mockResolvedValue(undefined);
});

test('flushes analytics before deactivating extensions, then exits', async () => {
  const order: string[] = [];
  mocks.analyticsShutdown.mockImplementation(async () => {
    order.push('analytics');
  });
  mocks.extensionShutdown.mockImplementation(async () => {
    order.push('extensions');
  });
  const exitProcess = vi.fn(() => {
    order.push('exit');
  });
  await runGracefulShutdown(exitProcess);
  expect(order).toEqual(['analytics', 'extensions', 'exit']);
  expect(exitProcess).toHaveBeenCalledTimes(1);
});

test('a rejected analytics shutdown is logged and does not stop extension deactivation or the exit', async () => {
  mocks.analyticsShutdown.mockRejectedValue(new Error('flush failed'));
  const exitProcess = vi.fn();
  await runGracefulShutdown(exitProcess);
  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('flush failed'));
  expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1);
  expect(exitProcess).toHaveBeenCalledTimes(1);
});

test('a rejected extension deactivation is logged and the process still exits', async () => {
  mocks.extensionShutdown.mockRejectedValue(new Error('deactivate failed'));
  const exitProcess = vi.fn();
  await runGracefulShutdown(exitProcess);
  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('deactivate failed'));
  expect(exitProcess).toHaveBeenCalledTimes(1);
});
