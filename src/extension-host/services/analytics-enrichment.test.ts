import os from 'os';
import { beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getAppInfo: vi.fn(),
  debug: vi.fn(),
  warn: vi.fn(),
}));

vi.mock('@shared/services/app.service', () => ({
  appService: { getAppInfo: mocks.getAppInfo },
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, warn: mocks.warn },
  logger: { debug: mocks.debug, warn: mocks.warn },
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.getAppInfo.mockResolvedValue({ version: '0.6.0-alpha.1+42' });
});

test('common properties carry the app version and the OS platform, release and architecture', async () => {
  const { getCommonProperties } = await import('@extension-host/services/analytics-enrichment');
  const properties = await getCommonProperties();
  expect(properties).toEqual({
    app_version: '0.6.0-alpha.1+42',
    os_platform: os.platform(),
    os_release: os.release(),
    os_arch: os.arch(),
  });
});

test('the app version is looked up once and cached for later events', async () => {
  const { getCommonProperties } = await import('@extension-host/services/analytics-enrichment');
  await getCommonProperties();
  await getCommonProperties();
  expect(mocks.getAppInfo).toHaveBeenCalledTimes(1);
});

test('when the app service is unavailable the version is "unknown", the event still enriches, and the failure is logged at debug', async () => {
  mocks.getAppInfo.mockRejectedValue(new Error('AppService is not available as a network object'));
  const { getCommonProperties } = await import('@extension-host/services/analytics-enrichment');
  const properties = await getCommonProperties();
  expect(properties.app_version).toBe('unknown');
  expect(properties.os_platform).toBe(os.platform());
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('app version'));
  expect(mocks.warn).not.toHaveBeenCalled();
});

test('a failed version lookup is retried on the next event rather than caching "unknown"', async () => {
  mocks.getAppInfo.mockRejectedValueOnce(new Error('not yet'));
  const { getCommonProperties } = await import('@extension-host/services/analytics-enrichment');
  expect((await getCommonProperties()).app_version).toBe('unknown');
  expect((await getCommonProperties()).app_version).toBe('0.6.0-alpha.1+42');
  expect(mocks.getAppInfo).toHaveBeenCalledTimes(2);
});

test('caller properties win over common properties on a name collision, and the collision is logged at debug', async () => {
  const { mergeWithCommonProperties } = await import(
    '@extension-host/services/analytics-enrichment'
  );
  const merged = mergeWithCommonProperties(
    { app_version: 'caller-says-so', extra: 1 },
    { app_version: '0.6.0', os_platform: 'linux' },
  );
  expect(merged).toEqual({ app_version: 'caller-says-so', os_platform: 'linux', extra: 1 });
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining("'app_version'"));
});

test('a caller key that only matches an inherited Object.prototype member is not reported as a collision', async () => {
  const { mergeWithCommonProperties } = await import(
    '@extension-host/services/analytics-enrichment'
  );
  const merged = mergeWithCommonProperties(
    { constructor: 'caller-value', app_version: 'caller-says-so' },
    { app_version: '0.6.0' },
  );
  expect(merged.constructor).toBe('caller-value');
  // Positive control: a real collision in the same call is still logged.
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining("'app_version'"));
  expect(mocks.debug).not.toHaveBeenCalledWith(expect.stringContaining("'constructor'"));
});

test('merging with no caller properties returns the common properties unchanged', async () => {
  const { mergeWithCommonProperties } = await import(
    '@extension-host/services/analytics-enrichment'
  );
  expect(mergeWithCommonProperties(undefined, { os_platform: 'win32' })).toEqual({
    os_platform: 'win32',
  });
  expect(mocks.debug).not.toHaveBeenCalled();
});
