import { dataProviderService } from '@shared/services/data-provider.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
  UnresolvedAnalyticsEvent,
} from '@shared/models/analytics.model';
import { ConsoleAnalyticsProvider } from '@extension-host/services/analytics-providers/console-analytics.provider';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

/**
 * Env var that forces analytics to target the test environment regardless of build/S/R target, for
 * developers/testers who don't want their activity landing in production analytics. Set to exactly
 * `'true'` (matching `PT_STARTUP_MARKS`'s convention) to activate; any other value, including other
 * truthy-looking strings, is ignored. Documented in README.md.
 */
const ANALYTICS_TEST_OVERRIDE_ENV_VAR = 'PT_ANALYTICS_TEST_OVERRIDE';

/** PAPI network object ID for the C# data provider that exposes the current S/R server target. */
const INTERNET_SETTINGS_DATA_PROVIDER_ID = 'paratextRegistration.internetSettingsDataProvider';

/**
 * Max time to wait for the C# InternetSettingsDataProvider to register before falling back to test.
 * initialize() runs at the very start of extension-host startup, well before this provider has
 * typically registered (its own process has several awaited startup steps first), so this needs
 * real headroom — matches web-view.service.ts's identical 30s wait for the same class of "network
 * object may not exist yet" race.
 */
const ENVIRONMENT_RESOLUTION_TIMEOUT_MS = 30_000;

const queues: {
  test: AnalyticsEvent[];
  production: AnalyticsEvent[];
  unresolved: UnresolvedAnalyticsEvent[];
} = {
  test: [],
  production: [],
  unresolved: [],
};

const providers: Record<AnalyticsEnvironment, AnalyticsProvider> = {
  test: new ConsoleAnalyticsProvider('test'),
  production: new ConsoleAnalyticsProvider('production'),
};

let resolvedEnvironment: AnalyticsEnvironment | undefined;

// No explicit return type annotation: letting it infer preserves the real `ServerType` union
// from `InternetSettings.selectedServer` (paratext-registration.d.ts) instead of widening to
// `string`, which would silently turn a typo in the `=== 'Production'` comparison below into an
// always-false condition instead of a compile error. `ServerType` itself isn't imported directly
// here -- see lib/platform-bible-react's developer-section.component.tsx for why extension `.d.ts`
// types aren't imported into other packages; inference gets the same safety without that import.
// Each of the three distinct failure points is detected and logged with its own specific debug
// message so it is possible to tell from the log whether the data provider never registered,
// vanished after being seen, or registered but failed to answer. Note that `resolveEnvironment`
// already warns once if the overall probe ultimately fails; each of these is the expected transient
// during a busy startup, not independently warning-worthy.
async function getSelectedServer() {
  // Wait for the network object to actually exist (event-driven, via onDidCreateNetworkObject)
  // before calling get() on it -- this resolves as soon as the C# provider registers, rather than
  // polling/racing a fixed timeout regardless of when it actually becomes available.
  try {
    await networkObjectStatusService.waitForNetworkObject(
      { id: INTERNET_SETTINGS_DATA_PROVIDER_ID },
      ENVIRONMENT_RESOLUTION_TIMEOUT_MS,
    );
  } catch (error) {
    logger.debug(
      `Analytics: timed out waiting for the Send/Receive server-target data provider to register: ${getErrorMessage(error)}`,
    );
    return undefined;
  }

  const provider = await dataProviderService.get(INTERNET_SETTINGS_DATA_PROVIDER_ID);
  if (!provider) {
    logger.debug(
      'Analytics: the Send/Receive server-target data provider vanished between registering and being retrieved',
    );
    return undefined;
  }

  try {
    const settings = await provider.getInternetSettings(undefined);
    return settings.selectedServer;
  } catch (error) {
    logger.debug(
      `Analytics: failed to read the Send/Receive server target from the data provider: ${getErrorMessage(error)}`,
    );
    return undefined;
  }
}

async function resolveEnvironment(): Promise<AnalyticsEnvironment> {
  if (process.env[ANALYTICS_TEST_OVERRIDE_ENV_VAR] === 'true') return 'test';
  if (!globalThis.isPackaged || process.env.NODE_ENV !== 'production') return 'test';

  const selectedServer = await getSelectedServer();
  if (selectedServer === undefined) {
    // Deliberately doesn't claim a specific cause (e.g. "in time") -- getSelectedServer's own
    // debug logs already name which of the three failure points this was; this warning is just
    // the one-line "here's the outcome" summary.
    logger.warn(
      'Analytics: could not resolve the Send/Receive server target; defaulting to the test environment',
    );
    return 'test';
  }

  return selectedServer === 'Production' ? 'production' : 'test';
}

/**
 * Drops any property that can't survive `JSON.stringify` (e.g. a circular reference), warning
 * immediately rather than waiting for the event to reach a provider — which, once the queue is
 * durable, could be long after the event was fired. Only the offending keys are lost; the rest of
 * the event (and the rest of `properties`) still gets sent.
 */
function sanitizeProperties(
  properties: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!properties) return undefined;

  const sanitized: Record<string, unknown> = {};
  Object.entries(properties).forEach(([key, value]) => {
    try {
      // JSON.stringify doesn't throw for a function, a symbol, or `undefined` -- it returns
      // `undefined` instead of a string, and inside an object the key is silently omitted rather
      // than flagged. Treating that result the same as a thrown error is what catches these.
      if (JSON.stringify(value) === undefined) {
        throw new Error(`value of type '${typeof value}' is not JSON-serializable`);
      }
      sanitized[key] = value;
    } catch (error) {
      logger.warn(`Analytics: dropping non-serializable property '${key}': ${String(error)}`);
    }
  });

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

/**
 * Removes and processes every item currently in `queue`, in FIFO order. `onItem` receives a
 * per-iteration binding (not the mutable `let` a hand-rolled shift-loop would need), so a callback
 * that closes over its argument asynchronously — as `flushQueue`'s does — always sees the right
 * item.
 */
function drainQueue<T>(queue: T[], onItem: (item: T) => void): void {
  let next = queue.shift();
  // `!== undefined`, not a truthiness check: this is a generic helper, and a truthiness check
  // would stop early on any falsy-but-real item (0, false, '') in a queue of a type other than
  // today's two object queues, silently dropping everything after it.
  while (next !== undefined) {
    onItem(next);
    next = queue.shift();
  }
}

function flushQueue(environment: AnalyticsEnvironment): void {
  const provider = providers[environment];
  // TODO(PT-4374): drainQueue removes each event before provider.send() settles, so a failed send
  // only logs -- the event is already gone from the in-memory queue and can't be retried. Fine for
  // this ticket's non-durable, fire-and-forget queue, but the durable cross-restart queue that
  // ticket adds should drain (persist-delete) on confirmed success, not unconditionally at dequeue
  // time, so a failure can be retried instead of silently lost.
  drainQueue(queues[environment], (event) => {
    try {
      provider.send(event).catch((error) => {
        logger.error(`Analytics: failed to send event '${event.name}': ${String(error)}`);
      });
    } catch (error) {
      logger.error(`Analytics: failed to send event '${event.name}': ${String(error)}`);
    }
  });
}

/**
 * Resolves whether this extension-host session targets the 'test' or 'production' analytics
 * environment, then flushes every event `trackEvent()` queued before this resolved. Safe to call
 * more than once -- only the first call actually resolves the environment and flushes; later calls
 * return the same cached result without doing anything further. Never rejects: any failure
 * resolving the environment (the Send/Receive server-target lookup timing out or erroring) falls
 * back to `'test'` rather than throwing or leaving the caller waiting on a rejected promise.
 */
export const initialize = createCachedInitializer(async (): Promise<void> => {
  resolvedEnvironment = await resolveEnvironment();
  const environment = resolvedEnvironment;

  drainQueue(queues.unresolved, (unresolvedEvent) => {
    queues[environment].push({ ...unresolvedEvent, environment });
  });

  flushQueue(environment);
});

/**
 * Records an analytics event for delivery. If the 'test'/'production' environment is already
 * resolved (see `initialize()`), the event is stamped and flushed immediately; otherwise it's held
 * until `initialize()` resolves it. Synchronous and fire-and-forget either way: never throws, and
 * does not wait for the event to actually be transmitted -- callers get no signal of eventual
 * delivery success.
 *
 * @param name Event name, e.g. `'app_launch'`.
 * @param properties Arbitrary event properties, if any. A value that can't survive `JSON.stringify`
 *   -- a circular reference, a function, a symbol, or `undefined` -- is dropped from `properties`
 *   and logged as a warning immediately; the rest of the event, and the rest of `properties`, still
 *   sends.
 */
export function trackEvent(name: string, properties?: Record<string, unknown>): void {
  logger.debug(`Analytics event tracked: ${name}`);
  const timestamp = Date.now();
  const sanitizedProperties = sanitizeProperties(properties);

  if (resolvedEnvironment) {
    queues[resolvedEnvironment].push({
      name,
      properties: sanitizedProperties,
      timestamp,
      environment: resolvedEnvironment,
    });
    flushQueue(resolvedEnvironment);
    return;
  }

  queues.unresolved.push({ name, properties: sanitizedProperties, timestamp });
}
