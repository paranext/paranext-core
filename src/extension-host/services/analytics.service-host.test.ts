import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { MAX_REQUEST_ATTEMPTS, REQUEST_ATTEMPT_WAIT_TIME_MS } from '@shared/data/rpc.model';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: mocks.get },
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
  logger: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
}));

/** Find the console-provider log line for a given environment label, if one was logged. */
function findSentLog(label: 'Test' | 'Production'): string | undefined {
  return mocks.info.mock.calls
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
  // `vi.doMock` (used by the "failing provider send" test below) isn't undone by
  // `vi.resetModules()` — it stays registered for the module path and would otherwise leak into
  // every later test in this file that re-imports the module.
  vi.doUnmock('@extension-host/services/analytics-providers/console-analytics.provider');
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

  // The timeout must exceed the RPC layer's own missing-handler retry window
  // (MAX_REQUEST_ATTEMPTS * REQUEST_ATTEMPT_WAIT_TIME_MS), so advance well past that.
  await vi.advanceTimersByTimeAsync(MAX_REQUEST_ATTEMPTS * REQUEST_ATTEMPT_WAIT_TIME_MS + 5000);
  await initializePromise;

  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('test environment'));
  expect(findSentLog('Test')).toBeDefined();
});

test("an S/R server lookup that succeeds only after the RPC layer's missing-handler retry window elapses still resolves production correctly", async () => {
  vi.useFakeTimers();

  // Simulate the data provider becoming reachable only once the RPC layer's own retry loop
  // (MAX_REQUEST_ATTEMPTS * REQUEST_ATTEMPT_WAIT_TIME_MS, ~10s) has nearly run its course — this
  // is the normal case at extension-host startup, since the C# InternetSettingsDataProvider is
  // not registered yet when initialize() first runs.
  const delayMs = MAX_REQUEST_ATTEMPTS * REQUEST_ATTEMPT_WAIT_TIME_MS - 500;
  mocks.get.mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
          });
        }, delayMs);
      }),
  );

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  const initializePromise = initialize();

  await vi.advanceTimersByTimeAsync(delayMs);
  await initializePromise;

  // A too-short timeout (shorter than the RPC retry window) would have already given up and
  // resolved 'test' well before this point.
  expect(findSentLog('Production')).toBeDefined();
  expect(findSentLog('Test')).toBeUndefined();
});

test('an error while probing the S/R server target resolves promptly instead of waiting out the full timeout', async () => {
  vi.useFakeTimers();
  mocks.get.mockRejectedValue(new Error('network object service unavailable'));

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  trackEvent('app_launch');
  const initializePromise = initialize();

  // Only a small amount of fake time is needed for the rejection to be caught and resolved to
  // 'test' -- if the probe let the rejection propagate, waitForDuration's Promise.any would
  // instead wait out the full multi-second timeout before falling through.
  await vi.advanceTimersByTimeAsync(50);
  await initializePromise;

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

test('trackEvent drops a non-serializable property and warns immediately, but still sends the rest of the event', async () => {
  vi.stubEnv('PARATEXT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  await initialize();
  mocks.warn.mockClear();

  const circular: Record<string, unknown> = {};
  circular.self = circular;

  trackEvent('bad_properties_event', { valid: 'ok', circularRef: circular });

  // Warned at trackEvent() call time, before the event is ever queued or sent
  expect(mocks.warn).toHaveBeenCalledWith(
    expect.stringContaining("dropping non-serializable property 'circularRef'"),
  );

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"bad_properties_event"');
  expect(sentLog).toContain('"valid":"ok"');
  expect(sentLog).not.toContain('circularRef');
});

test('trackEvent omits properties entirely when none of them survive sanitization', async () => {
  vi.stubEnv('PARATEXT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent } = await import(
    '@extension-host/services/analytics.service-host'
  );
  await initialize();

  const circular: Record<string, unknown> = {};
  circular.self = circular;

  trackEvent('all_properties_bad', { onlyBad: circular });

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"all_properties_bad"');
  expect(sentLog).not.toContain('"properties"');
});
