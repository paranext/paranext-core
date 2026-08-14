import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  debug: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: mocks.get },
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, warn: mocks.warn, error: mocks.error },
  logger: { debug: mocks.debug, warn: mocks.warn, error: mocks.error },
}));

/** Find the console-provider log line for a given environment label, if one was logged. */
function findSentLog(label: 'Test' | 'Production'): string | undefined {
  return mocks.debug.mock.calls
    .map(([message]) => message)
    .find((message) => message.startsWith(`${label}: `));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.unstubAllEnvs();
  globalThis.isPackaged = true;
  vi.stubEnv('NODE_ENV', 'production');
});

afterEach(() => {
  vi.useRealTimers();
});

test('an event fired before initialize resolves is queued, then flushed as test once the override env var forces test', async () => {
  vi.stubEnv('PARATEXT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );

  trackEvent('app_launch');
  expect(mocks.debug).toHaveBeenCalledWith('Analytics event tracked: app_launch');
  expect(findSentLog('Test')).toBeUndefined();
  expect(mocks.get).not.toHaveBeenCalled();

  await initialize();

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"app_launch"');
});

test('an unpackaged dev build resolves to test without checking the S/R server target', async () => {
  globalThis.isPackaged = false;
  vi.stubEnv('NODE_ENV', 'development');

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  await initialize();

  expect(mocks.get).not.toHaveBeenCalled();
  expect(findSentLog('Test')).toBeDefined();
});

test('a packaged production build targeting a non-Production S/R server resolves to test', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'QualityAssurance' }),
  });

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  await initialize();

  expect(mocks.get).toHaveBeenCalledWith('paratextRegistration.internetSettingsDataProvider');
  expect(findSentLog('Test')).toBeDefined();
});

test('a packaged production build targeting the Production S/R server resolves to production', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
  });

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  await initialize();

  expect(findSentLog('Production')).toBeDefined();
  expect(findSentLog('Test')).toBeUndefined();
});

test('an S/R server lookup that never resolves falls back to test after the timeout, with a warning logged', async () => {
  vi.useFakeTimers();
  mocks.get.mockReturnValue(new Promise(() => {})); // never resolves

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  const initializePromise = initialize();

  await vi.advanceTimersByTimeAsync(5000);
  await initializePromise;

  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('test environment'));
  expect(findSentLog('Test')).toBeDefined();
});

test('an event fired after initialize has already resolved is stamped and flushed immediately', async () => {
  vi.stubEnv('PARATEXT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  await initialize();
  mocks.debug.mockClear();

  trackEvent('second_event', { count: 2 });

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"second_event"');
  expect(sentLog).toContain('"count":2');
});

test('a failing provider send is caught and logged, without initialize or trackEvent throwing', async () => {
  vi.stubEnv('PARATEXT_ANALYTICS_TEST_OVERRIDE', 'true');
  vi.doMock('@extension-host/services/analytics-providers/console-analytics.provider', () => ({
    ConsoleAnalyticsProvider: class {
      constructor(private readonly environment: string) {}

      async send(): Promise<void> {
        throw new Error(`boom (${this.environment})`);
      }
    },
  }));

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );

  trackEvent('app_launch');
  await expect(initialize()).resolves.toBeUndefined();

  // Let the fire-and-forget `.catch()` microtask run before asserting on it
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('boom'));
});
