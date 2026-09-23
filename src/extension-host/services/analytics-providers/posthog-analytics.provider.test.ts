import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  captureImmediate: vi.fn(),
  clientShutdown: vi.fn(),
  clientOn: vi.fn(),
  unsubscribeError: vi.fn(),
  PostHog: vi.fn(),
  getDistinctId: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

vi.mock('posthog-node', () => ({ PostHog: mocks.PostHog }));
vi.mock('@extension-host/services/analytics-identity', () => ({
  getDistinctId: mocks.getDistinctId,
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
  logger: { debug: mocks.debug, info: mocks.info, warn: mocks.warn, error: mocks.error },
}));

const KEY = 'phc_test_key';
const HOST = 'https://eu.i.posthog.com';

async function makeProvider(environment: 'test' | 'production' = 'test') {
  const { PostHogAnalyticsProvider } = await import(
    '@extension-host/services/analytics-providers/posthog-analytics.provider'
  );
  return new PostHogAnalyticsProvider(environment, KEY, HOST);
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  mocks.PostHog.mockImplementation(() => ({
    captureImmediate: mocks.captureImmediate,
    shutdown: mocks.clientShutdown,
    on: mocks.clientOn,
  }));
  mocks.clientOn.mockReturnValue(mocks.unsubscribeError);
  mocks.captureImmediate.mockResolvedValue(undefined);
  mocks.clientShutdown.mockResolvedValue(undefined);
  mocks.getDistinctId.mockReturnValue('11111111-2222-4333-8444-555555555555');
});

afterEach(() => {
  vi.useRealTimers();
});

test('the client is not constructed until the first send', async () => {
  const provider = await makeProvider();
  expect(mocks.PostHog).not.toHaveBeenCalled();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  expect(mocks.PostHog).toHaveBeenCalledTimes(1);
  await provider.send({ name: 'app_launch', timestamp: 1700000000001, environment: 'test' });
  expect(mocks.PostHog).toHaveBeenCalledTimes(1);
});

test('the client is constructed with the project key, the EU host, GeoIP disabled, and immediate flushing', async () => {
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  expect(mocks.PostHog).toHaveBeenCalledWith(
    KEY,
    expect.objectContaining({ host: HOST, disableGeoip: true, flushAt: 1 }),
  );
});

test('an event is sent with the per-launch distinct id, the event name, enriched properties plus the anonymous flag, and the original timestamp', async () => {
  const provider = await makeProvider();
  await provider.send({
    name: 'app_launch',
    properties: { app_version: '0.6.0', os_platform: 'linux', analytics_environment: 'test' },
    timestamp: 1700000000000,
    environment: 'test',
  });
  expect(mocks.captureImmediate).toHaveBeenCalledTimes(1);
  expect(mocks.captureImmediate).toHaveBeenCalledWith({
    distinctId: '11111111-2222-4333-8444-555555555555',
    event: 'app_launch',
    properties: {
      app_version: '0.6.0',
      os_platform: 'linux',
      analytics_environment: 'test',
      $process_person_profile: false,
    },
    timestamp: new Date(1700000000000),
  });
});

test('an event without properties still carries the anonymous flag', async () => {
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  const [message] = mocks.captureImmediate.mock.calls[0];
  expect(message.properties).toEqual({ $process_person_profile: false });
});

test('a production provider refuses a test-tagged event and warns', async () => {
  const provider = await makeProvider('production');
  await provider.send({ name: 'debug_probe', timestamp: 1700000000000, environment: 'test' });
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("tagged as 'test'"));
  expect(mocks.captureImmediate).not.toHaveBeenCalled();
});

test('a test provider passes a production-tagged event through with a warning', async () => {
  const provider = await makeProvider('test');
  await provider.send({
    name: 'project_synced',
    timestamp: 1700000000000,
    environment: 'production',
  });
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("tagged as 'production'"));
  expect(mocks.captureImmediate).toHaveBeenCalledTimes(1);
});

test('a failed transmission rejects (so the service can log-and-drop) without throwing synchronously, and the warn line names the event but never its properties', async () => {
  mocks.captureImmediate.mockRejectedValue(new Error('ECONNREFUSED'));
  const provider = await makeProvider();
  const sendPromise = provider.send({
    name: 'app_launch',
    properties: { os_platform: 'linux', secret_looking: 'do-not-log-me' },
    timestamp: 1700000000000,
    environment: 'test',
  });
  await expect(sendPromise).rejects.toThrow('ECONNREFUSED');
  const allLogged = [...mocks.warn.mock.calls, ...mocks.error.mock.calls, ...mocks.info.mock.calls]
    .map(([message]) => String(message))
    .join('\n');
  expect(allLogged).not.toContain('do-not-log-me');
});

test('a transport error the SDK swallows and emits as an error event rejects the send with one warn naming the event, and no success line', async () => {
  // posthog-node resolves captureImmediate even when the request fails, reporting the failure
  // only through its 'error' event.
  mocks.captureImmediate.mockImplementation(async () => {
    const errorListeners = mocks.clientOn.mock.calls
      .filter(([eventName]) => eventName === 'error')
      .map(([, listener]) => listener);
    errorListeners.forEach((listener) =>
      listener(new Error('PostHogFetchNetworkError: fetch failed')),
    );
  });
  const provider = await makeProvider();
  const sendPromise = provider.send({
    name: 'app_launch',
    properties: { os_platform: 'linux', secret_looking: 'do-not-log-me' },
    timestamp: 1700000000000,
    environment: 'test',
  });
  await expect(sendPromise).rejects.toThrow('fetch failed');
  expect(mocks.warn).toHaveBeenCalledTimes(1);
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining("'app_launch'"));
  const allLogged = [
    ...mocks.warn.mock.calls,
    ...mocks.error.mock.calls,
    ...mocks.info.mock.calls,
    ...mocks.debug.mock.calls,
  ]
    .map(([message]) => String(message))
    .join('\n');
  expect(allLogged).not.toContain('do-not-log-me');
  expect(allLogged).not.toContain('linux');
  expect(mocks.debug).not.toHaveBeenCalledWith(expect.stringContaining('sent'));
  expect(mocks.unsubscribeError).toHaveBeenCalledTimes(1);
});

test('a successful send listens for the SDK error event only for the duration of that send', async () => {
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  expect(mocks.clientOn).toHaveBeenCalledWith('error', expect.any(Function));
  expect(mocks.unsubscribeError).toHaveBeenCalledTimes(1);
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining("sent 'app_launch'"));
  expect(mocks.warn).not.toHaveBeenCalled();
});

test('a client that cannot be constructed rejects the send with a single warn and does not retry construction on every send', async () => {
  mocks.PostHog.mockImplementation(() => {
    throw new Error('bad key');
  });
  const provider = await makeProvider();
  await expect(
    provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' }),
  ).rejects.toThrow('bad key');
  await expect(
    provider.send({ name: 'app_launch', timestamp: 1700000000001, environment: 'test' }),
  ).rejects.toThrow('bad key');
  expect(mocks.PostHog).toHaveBeenCalledTimes(1);
  expect(mocks.warn).toHaveBeenCalledTimes(1);
  expect(mocks.debug).toHaveBeenCalledWith(expect.stringContaining('unusable'));
});

test('shutdown flushes the client with the time it is given and resolves', async () => {
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  await provider.shutdown(400);
  expect(mocks.clientShutdown).toHaveBeenCalledWith(400);
});

test('shutdown before any send is a no-op that resolves', async () => {
  const provider = await makeProvider();
  await expect(provider.shutdown(400)).resolves.toBeUndefined();
  expect(mocks.clientShutdown).not.toHaveBeenCalled();
});

test('a client shutdown that hangs is abandoned when the time it was given runs out, with a warning, and shutdown still resolves', async () => {
  vi.useFakeTimers();
  mocks.clientShutdown.mockImplementation(() => new Promise(() => {}));
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  let settled = false;
  const shutdownPromise = provider.shutdown(400).finally(() => {
    settled = true;
  });
  await vi.advanceTimersByTimeAsync(399);
  expect(settled).toBe(false);
  await vi.advanceTimersByTimeAsync(1);
  await expect(shutdownPromise).resolves.toBeUndefined();
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('exceeded 400 ms'));
});

test('a client shutdown that rejects is logged and swallowed', async () => {
  mocks.clientShutdown.mockRejectedValue(new Error('socket closed'));
  const provider = await makeProvider();
  await provider.send({ name: 'app_launch', timestamp: 1700000000000, environment: 'test' });
  await expect(provider.shutdown(400)).resolves.toBeUndefined();
  expect(mocks.warn).toHaveBeenCalledWith(expect.stringContaining('socket closed'));
});
