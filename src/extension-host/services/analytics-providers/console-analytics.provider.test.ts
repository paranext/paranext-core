import { beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  debug: vi.fn(),
  warn: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, warn: mocks.warn },
  logger: { debug: mocks.debug, warn: mocks.warn },
}));

beforeEach(() => {
  mocks.debug.mockClear();
  mocks.warn.mockClear();
});

test('a test-environment provider logs the event with a Test prefix, including its real properties and timestamp', async () => {
  const { ConsoleAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/console-analytics.provider'
  );
  const provider = new ConsoleAnalyticsProvider('test');

  await provider.send({
    name: 'app_launch',
    properties: { version: '1.2.3' },
    timestamp: 1700000000000,
    environment: 'test',
  });

  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [message] = mocks.debug.mock.calls[0];
  expect(message).toContain('Test: ');
  expect(message).toContain('"name":"app_launch"');
  expect(message).toContain('"version":"1.2.3"');
  expect(message).toContain('"timestamp":1700000000000');
});

test('a production-environment provider logs the event with a Production prefix, including its real name and timestamp', async () => {
  const { ConsoleAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/console-analytics.provider'
  );
  const provider = new ConsoleAnalyticsProvider('production');

  await provider.send({
    name: 'subscription_renewed',
    timestamp: 1705000000000,
    environment: 'production',
  });

  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [message] = mocks.debug.mock.calls[0];
  expect(message).toContain('Production: ');
  expect(message).toContain('"name":"subscription_renewed"');
  expect(message).toContain('"timestamp":1705000000000');
});

test('a test provider given a production-tagged event still logs its real data, but warns about the mismatch', async () => {
  const { ConsoleAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/console-analytics.provider'
  );
  const provider = new ConsoleAnalyticsProvider('test');

  await provider.send({
    name: 'project_synced',
    properties: { source: 'test-harness' },
    timestamp: 1710000000000,
    environment: 'production',
  });

  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("tagged as 'production'"));
  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [message] = mocks.debug.mock.calls[0];
  expect(message).toContain('Test: ');
  expect(message).toContain('"name":"project_synced"');
  expect(message).toContain('"source":"test-harness"');
  expect(message).toContain('"timestamp":1710000000000');
});

test('a production provider given a test-tagged event warns and refuses to log/transmit it', async () => {
  const { ConsoleAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/console-analytics.provider'
  );
  const provider = new ConsoleAnalyticsProvider('production');

  await provider.send({
    name: 'debug_probe',
    timestamp: 1715000000000,
    environment: 'test',
  });

  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("tagged as 'test'"));
  expect(mocks.debug).not.toHaveBeenCalled();
});
