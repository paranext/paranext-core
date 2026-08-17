import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, waitForDuration } from 'platform-bible-utils';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
  UnresolvedAnalyticsEvent,
} from '@shared/models/analytics.model';
import { ConsoleAnalyticsProvider } from '@extension-host/services/analytics-providers/console-analytics.provider';
import { createCachedInitializer } from '@shared/utils/cached-initializer';
import { MAX_REQUEST_ATTEMPTS, REQUEST_ATTEMPT_WAIT_TIME_MS } from '@shared/data/rpc.model';

/** Env var that forces analytics to target the test environment regardless of build/S-R target. */
const ANALYTICS_TEST_OVERRIDE_ENV_VAR = 'PARATEXT_ANALYTICS_TEST_OVERRIDE';

/**
 * Max time to wait for the current Send/Receive server target before falling back to test. Must
 * exceed the RPC layer's own retry window for a not-yet-registered handler (MAX_REQUEST_ATTEMPTS *
 * REQUEST_ATTEMPT_WAIT_TIME_MS, ~10s) — initialize() runs at the very start of extension-host
 * startup, before the C# InternetSettingsDataProvider has typically registered, so a shorter
 * timeout would fire before that retry could ever succeed, permanently mistagging every
 * packaged-build session as 'test'. See resolve-registration-validity.ts's
 * REGISTRATION_RESOLVE_TIMEOUT_MS for the same reasoning against the same underlying race.
 */
const ENVIRONMENT_RESOLUTION_TIMEOUT_MS =
  MAX_REQUEST_ATTEMPTS * REQUEST_ATTEMPT_WAIT_TIME_MS + 2000;

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

async function getSelectedServer(): Promise<string | undefined> {
  // waitForDuration races this against a timeout via Promise.any, which only settles once BOTH
  // branches have either fulfilled or (for the timeout) always-fulfills -- a rejection here would
  // not fail fast, it would make the caller wait out the full timeout regardless. Catch and
  // resolve to undefined instead, matching resolve-registration-validity.ts's same pattern for
  // the same reason.
  try {
    const provider = await dataProviderService.get(
      'paratextRegistration.internetSettingsDataProvider',
    );
    if (!provider) return undefined;
    const settings = await provider.getInternetSettings(undefined);
    return settings.selectedServer;
  } catch (error) {
    // Debug, not warn: resolveEnvironment already warns once if the overall probe ultimately
    // times out; this is the expected transient during a busy startup, not a standalone failure.
    logger.debug(
      `Analytics: Send/Receive server-target probe did not complete: ${getErrorMessage(error)}`,
    );
    return undefined;
  }
}

async function resolveEnvironment(): Promise<AnalyticsEnvironment> {
  if (process.env[ANALYTICS_TEST_OVERRIDE_ENV_VAR]) return 'test';
  if (!globalThis.isPackaged || process.env.NODE_ENV !== 'production') return 'test';

  const selectedServer = await waitForDuration(
    getSelectedServer,
    ENVIRONMENT_RESOLUTION_TIMEOUT_MS,
  );
  if (selectedServer === undefined) {
    logger.warn(
      'Analytics: could not resolve the Send/Receive server target in time; defaulting to the test environment',
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
      JSON.stringify(value);
      sanitized[key] = value;
    } catch (error) {
      logger.warn(`Analytics: dropping non-serializable property '${key}': ${String(error)}`);
    }
  });

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

/**
 * Removes and processes every item currently in `queue`, in FIFO order. `onItem` receives a
 * per-iteration copy (not the mutable `let` a hand-rolled shift-loop would need), so a callback
 * that closes over its argument asynchronously — as `flushQueue`'s does — always sees the right
 * item.
 */
function drainQueue<T>(queue: T[], onItem: (item: T) => void): void {
  let next = queue.shift();
  while (next) {
    onItem(next);
    next = queue.shift();
  }
}

function flushQueue(environment: AnalyticsEnvironment): void {
  const provider = providers[environment];
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

export const initialize = createCachedInitializer(async (): Promise<void> => {
  resolvedEnvironment = await resolveEnvironment();
  const environment = resolvedEnvironment;

  drainQueue(queues.unresolved, (unresolvedEvent) => {
    queues[environment].push({ ...unresolvedEvent, environment });
  });

  flushQueue(environment);
});

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
