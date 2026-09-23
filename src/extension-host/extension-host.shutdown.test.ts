import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  analyticsShutdown: vi.fn(),
  extensionShutdown: vi.fn(),
  exit: vi.fn(),
  info: vi.fn(),
  error: vi.fn(),
}));

vi.mock('@extension-host/services/analytics.service', () => ({
  shutdown: mocks.analyticsShutdown,
  initialize: vi.fn().mockResolvedValue(undefined),
  trackEvent: vi.fn(),
}));
vi.mock('@extension-host/services/extension.service', () => ({
  shutdown: mocks.extensionShutdown,
  initialize: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@shared/services/logger.service', () => ({
  __esModule: true,
  default: {
    info: mocks.info,
    error: mocks.error,
    debug: vi.fn(),
    warn: vi.fn(),
    transports: { console: {} },
  },
  logger: {
    info: mocks.info,
    error: mocks.error,
    debug: vi.fn(),
    warn: vi.fn(),
    transports: { console: {} },
  },
}));
// Everything else extension-host.ts touches at import time is stubbed so the module loads.
vi.mock('@extension-host/global-this.model', () => ({}));
vi.mock('@node/utils/log-archiver.util', () => ({}));
vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@shared/services/shared-store.service', () => ({
  initialize: vi.fn().mockResolvedValue(undefined),
}));
vi.mock('@extension-host/services/papi-backend.service', () => ({ fetch: vi.fn() }));
vi.mock('@shared/services/network-object.service', () => ({ networkObjectService: {} }));
vi.mock('@shared/services/data-provider.service', () => ({ dataProviderService: {} }));
vi.mock('@shared/services/extension-asset.service', () => ({
  extensionAssetService: { initialize: vi.fn() },
}));
vi.mock('@shared/services/command.service', () => ({ registerCommand: vi.fn() }));
vi.mock('@extension-host/services/menu-data.service-host', () => ({ initialize: vi.fn() }));
vi.mock('@extension-host/services/settings.service-host', () => ({ initialize: vi.fn() }));
vi.mock('@extension-host/services/theme-data.service-host', () => ({ initialize: vi.fn() }));
vi.mock('@extension-host/services/project-settings.service-host', () => ({
  startProjectSettingsService: vi.fn(),
}));
vi.mock('@extension-host/services/localization.service-host', () => ({ initialize: vi.fn() }));
vi.mock('@extension-host/services/create-process.service', () => ({
  killChildProcessesFromExtensions: vi.fn(),
}));
vi.mock('@extension-host/services/database.service-host', () => ({ initialize: vi.fn() }));
vi.mock('@extension-host/services/local-oauth.service', () => ({
  startLocalOAuthServer: vi.fn(),
}));
vi.mock('@shared/utils/startup-timing.util', () => ({ markStartup: vi.fn() }));

/**
 * Process events `extension-host.ts` subscribes to at import time. The test runner's worker talks
 * to its parent over the same `process` 'message' channel, so the test must neither remove the
 * runner's listeners nor emit onto that channel; it drives and cleans up only what the module
 * added.
 */
const PROCESS_EVENTS = ['message', 'exit', 'uncaughtException', 'unhandledRejection'] as const;
type ProcessEvent = (typeof PROCESS_EVENTS)[number];
// Node's per-event listener types differ; they are only compared and removed here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyListener = (...args: any[]) => void;
const listenersOf: Record<ProcessEvent, () => AnyListener[]> = {
  message: () => process.listeners('message'),
  exit: () => process.listeners('exit'),
  uncaughtException: () => process.listeners('uncaughtException'),
  unhandledRejection: () => process.listeners('unhandledRejection'),
};
let addedListeners: { event: ProcessEvent; listener: AnyListener }[] = [];

async function loadAndSendGracefulShutdown() {
  const { gracefulShutdownMessage } = await import('@node/models/interprocess-messages.model');
  const before = new Map(PROCESS_EVENTS.map((event) => [event, new Set(listenersOf[event]())]));
  await import('@extension-host/extension-host');
  addedListeners = PROCESS_EVENTS.flatMap((event) =>
    listenersOf[event]()
      .filter((listener) => !before.get(event)?.has(listener))
      .map((listener) => ({ event, listener })),
  );
  const messageListeners = addedListeners.filter(({ event }) => event === 'message');
  expect(messageListeners).toHaveLength(1);
  messageListeners[0].listener(gracefulShutdownMessage, undefined);
  // Let the async handler run to completion.
  await vi.waitFor(() => expect(mocks.exit).toHaveBeenCalled());
}

afterEach(() => {
  addedListeners.forEach(({ event, listener }) => process.removeListener(event, listener));
  addedListeners = [];
  vi.restoreAllMocks();
});

/**
 * Records the exit instead of exiting. It must not throw: the module calls `process.exit()` in the
 * `finally` of a floating async handler, so a throw would surface as an unhandled rejection. A
 * returning stub cannot satisfy `process.exit`'s `never` return type without an assertion.
 */
// eslint-disable-next-line no-type-assertion/no-type-assertion
const fakeExit = ((code?: number | string | null) => mocks.exit(code)) as typeof process.exit;

beforeEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
  vi.spyOn(process, 'exit').mockImplementation(fakeExit);
  mocks.analyticsShutdown.mockResolvedValue(undefined);
  mocks.extensionShutdown.mockResolvedValue(undefined);
});

test('graceful shutdown flushes analytics before deactivating extensions, then exits', async () => {
  const order: string[] = [];
  mocks.analyticsShutdown.mockImplementation(async () => {
    order.push('analytics');
  });
  mocks.extensionShutdown.mockImplementation(async () => {
    order.push('extensions');
  });
  await loadAndSendGracefulShutdown();
  expect(order).toEqual(['analytics', 'extensions']);
  expect(mocks.exit).toHaveBeenCalledTimes(1);
});

test('a rejected analytics shutdown is logged and does not stop extension deactivation or the exit', async () => {
  mocks.analyticsShutdown.mockRejectedValue(new Error('flush failed'));
  await loadAndSendGracefulShutdown();
  expect(mocks.error).toHaveBeenCalledWith(expect.stringContaining('flush failed'));
  expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1);
  expect(mocks.exit).toHaveBeenCalledTimes(1);
});
