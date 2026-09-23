import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  waitForNetworkObject: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  isPostHogEnabled: vi.fn(),
  getCommonProperties: vi.fn(),
  posthogSend: vi.fn(),
  posthogShutdown: vi.fn(),
  PostHogAnalyticsProvider: vi.fn(),
}));

vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: { get: mocks.get },
}));
vi.mock('@shared/services/network-object-status.service', () => ({
  networkObjectStatusService: { waitForNetworkObject: mocks.waitForNetworkObject },
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
  logger: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
}));
vi.mock('@extension-host/services/analytics.config', () => ({
  isPostHogEnabled: mocks.isPostHogEnabled,
  POSTHOG_HOST: 'https://eu.i.posthog.com',
  POSTHOG_PROJECT_KEYS: { test: 'phc_test', production: 'phc_prod_placeholder' },
}));
vi.mock('@extension-host/services/analytics-enrichment', () => ({
  getCommonProperties: mocks.getCommonProperties,
  // Real merge semantics (caller wins) without importing the real module, which would pull the
  // app service network object into this test.
  mergeWithCommonProperties: (
    callerProperties: Record<string, unknown> | undefined,
    commonProperties: Record<string, unknown>,
  ) => ({ ...commonProperties, ...callerProperties }),
}));
vi.mock('@extension-host/services/analytics-providers/posthog-analytics.provider', () => ({
  PostHogAnalyticsProvider: mocks.PostHogAnalyticsProvider,
}));

/**
 * Find the console-provider's safe `info`-level summary line for a given environment label, if one
 * was logged. Deliberately excludes `properties` -- see `findFullEventLog` for that.
 */
function findSentLog(label: 'Test' | 'Production'): string | undefined {
  return mocks.info.mock.calls
    .map(([message]) => message)
    .find((message) => message.startsWith(`${label}: `));
}

/**
 * Find the console-provider's `debug`-level full-event line (properties included) for a given
 * environment label, if one was logged.
 */
function findFullEventLog(label: 'Test' | 'Production'): string | undefined {
  return mocks.debug.mock.calls
    .map(([message]) => message)
    .find((message) => message.startsWith(`${label} (full event): `));
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.unstubAllEnvs();
  globalThis.isPackaged = true;
  vi.stubEnv('NODE_ENV', 'production');
  // Default: the data provider is already available. Tests exercising the wait/timeout/failure
  // mechanics override this explicitly.
  mocks.waitForNetworkObject.mockResolvedValue({
    id: 'paratextRegistration.internetSettingsDataProvider',
  });
  mocks.isPostHogEnabled.mockReturnValue(false);
  mocks.getCommonProperties.mockResolvedValue({
    app_version: '0.6.0',
    os_platform: 'linux',
    os_release: '6.6',
    os_arch: 'x64',
  });
  mocks.posthogSend.mockResolvedValue(undefined);
  mocks.posthogShutdown.mockResolvedValue(undefined);
  mocks.PostHogAnalyticsProvider.mockImplementation((environment: string) => ({
    environment,
    send: mocks.posthogSend,
    shutdown: mocks.posthogShutdown,
  }));
});

afterEach(() => {
  vi.useRealTimers();
  // `vi.doMock` (used by the "failing provider send" test below) isn't undone by
  // `vi.resetModules()` — it stays registered for the module path and would otherwise leak into
  // every later test in this file that re-imports the module.
  vi.doUnmock('@extension-host/services/analytics-providers/console-analytics.provider');
});

test('an event fired before initialize resolves is queued, then flushed as test once the override env var forces test', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');

  trackEvent('app_launch');
  expect(mocks.debug).toHaveBeenCalledWith('Analytics event tracked: app_launch');
  expect(findSentLog('Test')).toBeUndefined();
  expect(mocks.get).not.toHaveBeenCalled();

  await initialize();

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"app_launch"');
});

test('the override env var only activates on an exact "true" value, not any truthy-looking string', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'false');
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
  });

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  // A non-'true' string must not short-circuit to test -- it should fall through to the real
  // build-type/S-R-target checks, which in this packaged+Production setup resolve 'production'.
  expect(findSentLog('Production')).toBeDefined();
  expect(findSentLog('Test')).toBeUndefined();
});

test('an unpackaged dev build resolves to test without checking the S/R server target', async () => {
  globalThis.isPackaged = false;
  vi.stubEnv('NODE_ENV', 'development');

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(mocks.get).not.toHaveBeenCalled();
  expect(findSentLog('Test')).toBeDefined();
});

test('a packaged production build targeting a non-Production S/R server resolves to test', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'QualityAssurance' }),
  });

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(mocks.get).toHaveBeenCalledWith('paratextRegistration.internetSettingsDataProvider');
  expect(findSentLog('Test')).toBeDefined();
});

test('a packaged production build targeting the Production S/R server resolves to production', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
  });

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(findSentLog('Production')).toBeDefined();
  expect(findSentLog('Test')).toBeUndefined();
});

test('an S/R server lookup where the data provider never registers falls back to test after the timeout, with a warning logged', async () => {
  vi.useFakeTimers();
  // Simulate waitForNetworkObject's own real timeout behavior (AsyncVariable rejects once
  // timeoutMs elapses) since networkObjectStatusService is mocked at the module boundary.
  mocks.waitForNetworkObject.mockImplementation(
    (_details: unknown, timeoutMs: number) =>
      new Promise((_resolve, reject) => {
        setTimeout(() => reject(new Error('Timeout reached when waiting to settle')), timeoutMs);
      }),
  );

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  const initializePromise = initialize();

  await vi.advanceTimersByTimeAsync(30_000);
  await initializePromise;

  // The debug log names this specifically as a timeout, distinct from the "provider vanished" and
  // "failed to read settings" cases below -- so a real diagnosis doesn't have to guess which of
  // the three happened.
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('timed out waiting'));
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('test environment'));
  expect(findSentLog('Test')).toBeDefined();
});

test('the data provider vanishing after a successful wait logs a distinct debug message and falls back to test', async () => {
  // waitForNetworkObject resolves (the provider was seen registering), but a subsequent get()
  // finds nothing -- a real, distinct race, not a timeout and not a read failure.
  mocks.get.mockResolvedValue(undefined);

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('vanished'));
  expect(findSentLog('Test')).toBeDefined();
});

test('an S/R server lookup where the data provider registers partway through the wait resolves production correctly, without waiting the full budget', async () => {
  vi.useFakeTimers();

  // Simulate the data provider registering partway through the wait window -- the event-driven
  // wait should catch this as soon as it happens, well before the full 30s budget.
  const delayMs = 5000;
  mocks.waitForNetworkObject.mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(
          () => resolve({ id: 'paratextRegistration.internetSettingsDataProvider' }),
          delayMs,
        );
      }),
  );
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
  });

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  const initializePromise = initialize();

  // Only advance to the registration delay, not the full 30s timeout -- proves this resolves as
  // soon as the object appears rather than always paying the full wait budget.
  await vi.advanceTimersByTimeAsync(delayMs);
  await initializePromise;

  expect(findSentLog('Production')).toBeDefined();
  expect(findSentLog('Test')).toBeUndefined();
});

test('an error while waiting for the data provider resolves promptly instead of waiting out the full timeout', async () => {
  vi.useFakeTimers();
  mocks.waitForNetworkObject.mockRejectedValue(
    new Error('network object status service unavailable'),
  );

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  const initializePromise = initialize();

  // Only a small amount of fake time is needed for the rejection to be caught and resolved to
  // 'test' -- an immediate rejection is caught immediately, unlike the old waitForDuration-based
  // design where a rejection would have waited out the whole timeout regardless.
  await vi.advanceTimersByTimeAsync(50);
  await initializePromise;

  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('timed out waiting'));
  expect(findSentLog('Test')).toBeDefined();
});

test('a failure reading settings from an already-found data provider logs a distinct debug message and falls back to test', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockRejectedValue(new Error('getInternetSettings failed')),
  });

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('failed to read'));
  expect(findSentLog('Test')).toBeDefined();
});

test('an event fired after initialize has already resolved is stamped and flushed immediately', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  await initialize();
  mocks.debug.mockClear();

  trackEvent('second_event', { count: 2 });
  await flushPending();

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"second_event"');

  const fullEventLog = findFullEventLog('Test');
  expect(fullEventLog).toBeDefined();
  expect(fullEventLog).toContain('"name":"second_event"');
  expect(fullEventLog).toContain('"count":2');
});

test('a failing provider send is caught and logged at debug, without initialize or trackEvent throwing', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  vi.doMock('@extension-host/services/analytics-providers/console-analytics.provider', () => ({
    ConsoleAnalyticsProvider: class {
      constructor(private readonly environment: string) {}

      async send(): Promise<void> {
        throw new Error(`boom (${this.environment})`);
      }
    },
  }));

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');

  trackEvent('app_launch');
  await expect(initialize()).resolves.toBeUndefined();

  // Let the fire-and-forget `.catch()` microtask run before asserting on it
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });

  expect(mocks.debug).toHaveBeenCalledWith(
    "Analytics: failed to send event 'app_launch': boom (test)",
  );
  expect(mocks.error).not.toHaveBeenCalled();
});

test('a provider send that throws synchronously is logged at error with the error message, without initialize or trackEvent throwing', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  vi.doMock('@extension-host/services/analytics-providers/console-analytics.provider', () => ({
    ConsoleAnalyticsProvider: class {
      constructor(private readonly environment: string) {}

      send(): Promise<void> {
        throw new Error(`sync boom (${this.environment})`);
      }
    },
  }));

  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');

  trackEvent('app_launch');
  await expect(initialize()).resolves.toBeUndefined();

  expect(mocks.error).toHaveBeenCalledWith(
    "Analytics: failed to send event 'app_launch': sync boom (test)",
  );
});

test('trackEvent drops a non-serializable property and warns immediately, but still sends the rest of the event', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  await initialize();
  mocks.warn.mockClear();

  const circular: Record<string, unknown> = {};
  circular.self = circular;

  trackEvent('bad_properties_event', { valid: 'ok', circularRef: circular });

  // Warned at trackEvent() call time, before the event is ever queued or sent. The reason is the
  // error's message alone, without the `TypeError:` prefix `String(error)` would add.
  expect(mocks.warn).toHaveBeenCalledWith(
    expect.stringMatching(/dropping non-serializable property 'circularRef': Converting circular/),
  );

  await flushPending();
  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"bad_properties_event"');

  const fullEventLog = findFullEventLog('Test');
  expect(fullEventLog).toBeDefined();
  expect(fullEventLog).toContain('"valid":"ok"');
  expect(fullEventLog).not.toContain('circularRef');
});

test('trackEvent drops properties whose values are functions, symbols, or undefined -- JSON.stringify does not throw for these, it just silently omits them', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  await initialize();
  mocks.warn.mockClear();

  trackEvent('bad_properties_event', {
    valid: 'ok',
    someFunction: () => {},
    someSymbol: Symbol('x'),
    explicitlyUndefined: undefined,
  });

  expect(mocks.warn).toHaveBeenCalledWith(
    expect.stringContaining("dropping non-serializable property 'someFunction'"),
  );
  expect(mocks.warn).toHaveBeenCalledWith(
    expect.stringContaining("dropping non-serializable property 'someSymbol'"),
  );
  expect(mocks.warn).toHaveBeenCalledWith(
    expect.stringContaining("dropping non-serializable property 'explicitlyUndefined'"),
  );

  await flushPending();
  const fullEventLog = findFullEventLog('Test');
  expect(fullEventLog).toBeDefined();
  expect(fullEventLog).toContain('"valid":"ok"');
  expect(fullEventLog).not.toContain('someFunction');
  expect(fullEventLog).not.toContain('someSymbol');
  expect(fullEventLog).not.toContain('explicitlyUndefined');
});

test('trackEvent leaves only the common properties when none of the caller properties survive sanitization', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');

  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  await initialize();

  const circular: Record<string, unknown> = {};
  circular.self = circular;

  trackEvent('all_properties_bad', { onlyBad: circular });
  await flushPending();

  const sentLog = findSentLog('Test');
  expect(sentLog).toBeDefined();
  expect(sentLog).toContain('"name":"all_properties_bad"');

  const fullEventLog = findFullEventLog('Test');
  expect(fullEventLog).toBeDefined();
  expect(fullEventLog).toContain('"name":"all_properties_bad"');
  expect(fullEventLog).toContain('"app_version":"0.6.0"');
  expect(fullEventLog).not.toContain('onlyBad');
});

test('every event is enriched with the common properties and the analytics environment before reaching the provider', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch', { source: 'test' });
  await initialize();

  const fullEvent = findFullEventLog('Test');
  expect(fullEvent).toBeDefined();
  expect(fullEvent).toContain('"app_version":"0.6.0"');
  expect(fullEvent).toContain('"os_platform":"linux"');
  expect(fullEvent).toContain('"analytics_environment":"test"');
  expect(fullEvent).toContain('"source":"test"');
});

test('an event fired after initialization is also enriched', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  await initialize();
  trackEvent('later_event');
  await flushPending();
  expect(findFullEventLog('Test')).toContain('"app_version":"0.6.0"');
});

test('a caller property with the same name as a common property wins', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch', { app_version: 'caller' });
  await initialize();
  const fullEvent = findFullEventLog('Test');
  // Positive control: enrichment ran, so the collision was real.
  expect(fullEvent).toContain('"os_platform":"linux"');
  expect(fullEvent).toContain('"app_version":"caller"');
  expect(fullEvent).not.toContain('"app_version":"0.6.0"');
});

test('a caller property named analytics_environment cannot overwrite the resolved environment', async () => {
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch', { analytics_environment: 'production' });
  await initialize();
  const fullEvent = findFullEventLog('Test');
  // Positive control: enrichment ran and the event reached the provider.
  expect(fullEvent).toContain('"app_version":"0.6.0"');
  expect(fullEvent).toContain('"analytics_environment":"test"');
  expect(fullEvent).not.toContain('"analytics_environment":"production"');
});

test('when PostHog is disabled both environments use the console provider', async () => {
  mocks.get.mockResolvedValue({
    getInternetSettings: vi.fn().mockResolvedValue({ selectedServer: 'Production' }),
  });
  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();
  // The choice is the config's, not a hard-coded default.
  expect(mocks.isPostHogEnabled).toHaveBeenCalled();
  expect(findSentLog('Production')).toBeDefined();
  expect(mocks.PostHogAnalyticsProvider).not.toHaveBeenCalled();
});

test('when PostHog is enabled, a PostHog provider per environment is constructed with that environment key and the EU host, and events go to it instead of the console', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent } = await import('@extension-host/services/analytics.service');
  trackEvent('app_launch');
  await initialize();

  expect(mocks.PostHogAnalyticsProvider).toHaveBeenCalledWith(
    'test',
    'phc_test',
    'https://eu.i.posthog.com',
  );
  expect(mocks.PostHogAnalyticsProvider).toHaveBeenCalledWith(
    'production',
    'phc_prod_placeholder',
    'https://eu.i.posthog.com',
  );
  expect(mocks.posthogSend).toHaveBeenCalledTimes(1);
  expect(mocks.posthogSend.mock.calls[0][0]).toMatchObject({
    name: 'app_launch',
    environment: 'test',
    properties: { app_version: '0.6.0', analytics_environment: 'test' },
  });
  expect(findSentLog('Test')).toBeUndefined();
});

test('a PostHog provider rejection is logged at debug only (the provider owns the warning) and the service keeps accepting events', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  mocks.posthogSend.mockRejectedValueOnce(new Error('offline'));
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  trackEvent('app_launch');
  await initialize();
  await flushPending();
  expect(mocks.debug).toHaveBeenCalledWith(
    expect.stringContaining("failed to send event 'app_launch'"),
  );
  expect(mocks.error).not.toHaveBeenCalled();
  expect(mocks.warn).not.toHaveBeenCalled();
  trackEvent('second');
  await flushPending();
  expect(mocks.posthogSend).toHaveBeenCalledTimes(2);
});

test('an event whose routing fails does not stop later events from reaching the provider', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  // Choosing the providers happens after enrichment, outside its catch, so a throw here rejects
  // the routing step itself.
  mocks.isPostHogEnabled.mockImplementationOnce(() => {
    throw new Error('config unreadable');
  });
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, flushPending } = await import(
    '@extension-host/services/analytics.service'
  );
  trackEvent('first');
  await expect(initialize()).resolves.toBeUndefined();
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("'first'"));
  trackEvent('second');
  await flushPending();
  expect(mocks.posthogSend).toHaveBeenCalledWith(expect.objectContaining({ name: 'second' }));
});

test('shutdown settles within one shared 500 ms budget when routing and every provider shutdown hang', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, shutdown } = await import(
    '@extension-host/services/analytics.service'
  );
  trackEvent('app_launch');
  await initialize();
  mocks.getCommonProperties.mockImplementation(() => new Promise(() => {}));
  trackEvent('stuck');
  // A provider that honours its time limit: it gives up once the time it was handed runs out.
  mocks.posthogShutdown.mockImplementation(
    (timeoutMs: number) =>
      new Promise<void>((resolve) => {
        setTimeout(resolve, timeoutMs);
      }),
  );

  vi.useFakeTimers();
  let settled = false;
  const shutdownPromise = shutdown().finally(() => {
    settled = true;
  });
  await vi.advanceTimersByTimeAsync(499);
  expect(settled).toBe(false);
  // The routing wait uses the whole budget, so the providers are handed 0 ms. A zero-delay timer
  // fires 1 ms later (as in Node), so everything has settled 1 ms past the budget; two separate
  // 500 ms waits would still be running.
  await vi.advanceTimersByTimeAsync(2);
  expect(settled).toBe(true);
  await shutdownPromise;
  expect(mocks.posthogShutdown).toHaveBeenCalledTimes(2);
  expect(mocks.posthogShutdown).toHaveBeenCalledWith(0);
});

test('providers are given only the time left in the budget after the routing wait', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, shutdown } = await import(
    '@extension-host/services/analytics.service'
  );
  trackEvent('app_launch');
  await initialize();

  vi.useFakeTimers();
  mocks.getCommonProperties.mockImplementation(
    () =>
      new Promise((resolve) => {
        setTimeout(() => resolve({ app_version: '0.6.0' }), 200);
      }),
  );
  trackEvent('slow');
  const shutdownPromise = shutdown();
  await vi.advanceTimersByTimeAsync(200);
  await shutdownPromise;
  expect(mocks.posthogShutdown).toHaveBeenCalledTimes(2);
  expect(mocks.posthogShutdown).toHaveBeenCalledWith(300);
});

test('shutdown asks every constructed provider to shut down and never rejects', async () => {
  mocks.isPostHogEnabled.mockReturnValue(true);
  mocks.posthogShutdown.mockRejectedValueOnce(new Error('boom'));
  vi.stubEnv('PT_ANALYTICS_TEST_OVERRIDE', 'true');
  const { initialize, trackEvent, shutdown } = await import(
    '@extension-host/services/analytics.service'
  );
  trackEvent('app_launch');
  await initialize();
  await expect(shutdown()).resolves.toBeUndefined();
  expect(mocks.posthogShutdown).toHaveBeenCalledTimes(2);
});

test('shutdown before any provider was created is a no-op', async () => {
  const { shutdown } = await import('@extension-host/services/analytics.service');
  await expect(shutdown()).resolves.toBeUndefined();
  expect(mocks.posthogShutdown).not.toHaveBeenCalled();
});
