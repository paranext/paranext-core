import { beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, info: mocks.info, warn: mocks.warn },
  logger: { debug: mocks.debug, info: mocks.info, warn: mocks.warn },
}));

beforeEach(() => {
  mocks.debug.mockClear();
  mocks.info.mockClear();
  mocks.warn.mockClear();
});

test('a test-environment provider logs a safe Test-prefixed summary at info, and the full event (properties included) at debug', async () => {
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

  expect(mocks.info).toHaveBeenCalledTimes(1);
  const [infoMessage] = mocks.info.mock.calls[0];
  expect(infoMessage).toContain('Test: ');
  expect(infoMessage).toContain('"name":"app_launch"');
  expect(infoMessage).toContain('"timestamp":1700000000000');
  // The info line -- visible in packaged builds -- must never carry arbitrary caller-supplied
  // properties, since those tend to accumulate user/project identifiers over time and would land
  // verbatim in a real user's persistent log file.
  expect(infoMessage).not.toContain('version');
  expect(infoMessage).not.toContain('1.2.3');

  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [debugMessage] = mocks.debug.mock.calls[0];
  expect(debugMessage).toContain('Test');
  expect(debugMessage).toContain('"name":"app_launch"');
  expect(debugMessage).toContain('"version":"1.2.3"');
});

test('a production-environment provider logs a safe Production-prefixed summary at info, and the full event at debug', async () => {
  const { ConsoleAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/console-analytics.provider'
  );
  const provider = new ConsoleAnalyticsProvider('production');

  await provider.send({
    name: 'subscription_renewed',
    timestamp: 1705000000000,
    environment: 'production',
  });

  expect(mocks.info).toHaveBeenCalledTimes(1);
  const [infoMessage] = mocks.info.mock.calls[0];
  expect(infoMessage).toContain('Production: ');
  expect(infoMessage).toContain('"name":"subscription_renewed"');
  expect(infoMessage).toContain('"timestamp":1705000000000');

  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [debugMessage] = mocks.debug.mock.calls[0];
  expect(debugMessage).toContain('Production');
  expect(debugMessage).toContain('"name":"subscription_renewed"');
});

test('a test provider given a production-tagged event still logs it at both levels, but warns about the mismatch', async () => {
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

  expect(mocks.info).toHaveBeenCalledTimes(1);
  const [infoMessage] = mocks.info.mock.calls[0];
  expect(infoMessage).toContain('Test: ');
  expect(infoMessage).toContain('"name":"project_synced"');
  expect(infoMessage).not.toContain('source');
  expect(infoMessage).not.toContain('test-harness');

  expect(mocks.debug).toHaveBeenCalledTimes(1);
  const [debugMessage] = mocks.debug.mock.calls[0];
  expect(debugMessage).toContain('"source":"test-harness"');
});

test('a production provider given a test-tagged event warns and refuses to log/transmit it at either level', async () => {
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
  expect(mocks.info).not.toHaveBeenCalled();
  expect(mocks.debug).not.toHaveBeenCalled();
});
