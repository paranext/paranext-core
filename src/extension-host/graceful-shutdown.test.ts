import { beforeEach, expect, test, vi } from 'vitest';

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

/** A fresh copy of the module per test: it remembers, for the process's lifetime, that it ran. */
async function importRunGracefulShutdown() {
  const { runGracefulShutdown } = await import('./graceful-shutdown');
  return runGracefulShutdown;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.analyticsShutdown.mockResolvedValue(undefined);
  mocks.extensionShutdown.mockResolvedValue(undefined);
});

test('flushes analytics before deactivating extensions, then exits', async () => {
  const runGracefulShutdown = await importRunGracefulShutdown();
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
  const runGracefulShutdown = await importRunGracefulShutdown();
  mocks.analyticsShutdown.mockRejectedValue(new Error('flush failed'));
  const exitProcess = vi.fn();
  await runGracefulShutdown(exitProcess);
  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('flush failed'));
  expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1);
  expect(exitProcess).toHaveBeenCalledTimes(1);
});

test('a rejected extension deactivation is logged and the process still exits', async () => {
  const runGracefulShutdown = await importRunGracefulShutdown();
  mocks.extensionShutdown.mockRejectedValue(new Error('deactivate failed'));
  const exitProcess = vi.fn();
  await runGracefulShutdown(exitProcess);
  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('deactivate failed'));
  expect(exitProcess).toHaveBeenCalledTimes(1);
});

test('a second call while the first is under way joins it instead of running again', async () => {
  const runGracefulShutdown = await importRunGracefulShutdown();
  let finishDeactivating: () => void = () => {};
  mocks.extensionShutdown.mockReturnValue(
    new Promise<void>((resolve) => {
      finishDeactivating = resolve;
    }),
  );
  const firstExit = vi.fn();
  const secondExit = vi.fn();

  const first = runGracefulShutdown(firstExit);
  const second = runGracefulShutdown(secondExit);
  finishDeactivating();
  await Promise.all([first, second]);

  expect(second).toBe(first);
  expect(mocks.analyticsShutdown).toHaveBeenCalledTimes(1);
  expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1);
  expect(firstExit).toHaveBeenCalledTimes(1);
  expect(secondExit).not.toHaveBeenCalled();
});

test('reports whether a shutdown has started', async () => {
  const { runGracefulShutdown, hasGracefulShutdownStarted } = await import('./graceful-shutdown');
  expect(hasGracefulShutdownStarted()).toBe(false);

  const shutdown = runGracefulShutdown(vi.fn());

  expect(hasGracefulShutdownStarted()).toBe(true);
  await shutdown;
  expect(hasGracefulShutdownStarted()).toBe(true);
});
