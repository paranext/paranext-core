import { dataProviderService } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { waitForDuration } from 'platform-bible-utils';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
  UnresolvedAnalyticsEvent,
} from '@shared/models/analytics.model';
import { ConsoleAnalyticsProvider } from '@extension-host/services/analytics-providers/console-analytics.provider';
import { createCachedInitializer } from '@shared/utils/cached-initializer';

/** Env var that forces analytics to target the test environment regardless of build/S-R target. */
const ANALYTICS_TEST_OVERRIDE_ENV_VAR = 'PARATEXT_ANALYTICS_TEST_OVERRIDE';

/** Max time to wait for the current Send/Receive server target before falling back to test. */
const ENVIRONMENT_RESOLUTION_TIMEOUT_MS = 5000;

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
  const provider = await dataProviderService.get(
    'paratextRegistration.internetSettingsDataProvider',
  );
  if (!provider) return undefined;
  const settings = await provider.getInternetSettings(undefined);
  return settings.selectedServer;
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

function flushQueue(environment: AnalyticsEnvironment): void {
  const queue = queues[environment];
  const provider = providers[environment];
  let next = queue.shift();
  while (next) {
    // Capture this iteration's event in a per-iteration const: `next` is reassigned before the
    // `.catch()` callback below runs, so closing over `next` directly would log the wrong event.
    const event = next;
    try {
      provider.send(event).catch((error) => {
        logger.error(`Analytics: failed to send event '${event.name}': ${String(error)}`);
      });
    } catch (error) {
      logger.error(`Analytics: failed to send event '${event.name}': ${String(error)}`);
    }
    next = queue.shift();
  }
}

export const initialize = createCachedInitializer(async (): Promise<void> => {
  resolvedEnvironment = await resolveEnvironment();
  const environment = resolvedEnvironment;

  let unresolvedEvent = queues.unresolved.shift();
  while (unresolvedEvent) {
    queues[environment].push({ ...unresolvedEvent, environment });
    unresolvedEvent = queues.unresolved.shift();
  }

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
