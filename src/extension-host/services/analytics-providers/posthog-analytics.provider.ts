import { PostHog } from 'posthog-node';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
} from '@shared/models/analytics.model';
import { getDistinctId } from '@extension-host/services/analytics-identity';

/**
 * How long a shutdown flush may take before it is abandoned. The extension host's whole graceful
 * shutdown budget is about 1.5 s before main hard-kills the process, and extension deactivation
 * still has to run after this.
 */
export const POSTHOG_SHUTDOWN_TIMEOUT_MS = 1000;

/**
 * Sends analytics events to a PostHog project. One instance per analytics environment, bound to
 * that environment's project key. Events are transmitted one at a time with `captureImmediate`
 * instead of sitting in a batch queue that the short shutdown window may never flush. The SDK
 * swallows transport errors and emits them as an `'error'` event, so `send` listens for that event
 * and turns it into a rejection, which the caller sees exactly like any other failure. The SDK
 * retries a failed request itself before giving up, so a failing send settles only after tens of
 * seconds.
 *
 * Privacy posture: GeoIP enrichment is disabled at the client, every event is flagged as anonymous
 * so PostHog builds no person profile, and nothing about the event content is logged above debug.
 */
export class PostHogAnalyticsProvider implements AnalyticsProvider {
  private client: PostHog | undefined;

  /** Set once client construction has thrown; later sends fail fast without re-attempting. */
  private constructionError: unknown;

  constructor(
    private readonly environment: AnalyticsEnvironment,
    private readonly projectKey: string,
    private readonly host: string,
  ) {}

  async send(event: AnalyticsEvent): Promise<void> {
    if (event.environment !== this.environment) {
      logger.warn(
        `Analytics: event '${event.name}' tagged as '${event.environment}' was routed to the '${this.environment}' PostHog provider`,
      );
      // A production-configured provider must never transmit a test-tagged event as production
      // data. The reverse is allowed through, mirroring ConsoleAnalyticsProvider.
      if (this.environment === 'production') return;
    }

    const client = this.getClient();
    // posthog-node resolves captureImmediate even when the request fails (offline, proxy, 4xx,
    // 5xx): it reports the failure only through the client's 'error' event. The listener is
    // attached per send and attributes any error it sees to this event, which is sound while only
    // one event is ever in flight per client.
    let transportError: { error: unknown } | undefined;
    const unsubscribe = client.on('error', (error: unknown) => {
      transportError ??= { error };
    });
    try {
      try {
        await client.captureImmediate({
          distinctId: getDistinctId(),
          event: event.name,
          properties: { ...event.properties, $process_person_profile: false },
          timestamp: new Date(event.timestamp),
        });
      } finally {
        unsubscribe();
      }
      if (transportError) throw transportError.error;
      logger.debug(`Analytics: sent '${event.name}' to PostHog (${this.environment})`);
    } catch (error) {
      // Name only: properties are caller-supplied and must not reach a persistent log. The SDK's
      // fetch errors carry only the HTTP status and request byte length, never the payload.
      logger.warn(
        `Analytics: PostHog failed to send '${event.name}' (${this.environment}): ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    if (!this.client) return;
    const { client } = this;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<'timeout'>((resolve) => {
      timer = setTimeout(() => resolve('timeout'), POSTHOG_SHUTDOWN_TIMEOUT_MS);
    });
    try {
      const outcome = await Promise.race([
        client.shutdown(POSTHOG_SHUTDOWN_TIMEOUT_MS).then(() => 'done' as const),
        timeout,
      ]);
      if (outcome === 'timeout')
        logger.warn(
          `Analytics: PostHog shutdown (${this.environment}) exceeded ${POSTHOG_SHUTDOWN_TIMEOUT_MS} ms; abandoning flush`,
        );
    } catch (error) {
      logger.warn(
        `Analytics: PostHog shutdown (${this.environment}) failed: ${getErrorMessage(error)}`,
      );
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  private getClient(): PostHog {
    if (this.client) return this.client;
    if (this.constructionError !== undefined) {
      logger.debug('Analytics: PostHog client is unusable; dropping event');
      throw this.constructionError;
    }
    try {
      this.client = new PostHog(this.projectKey, {
        host: this.host,
        disableGeoip: true,
        // captureImmediate bypasses the client's batch queue; these keep anything that does land
        // in it (nothing today) from lingering past the short shutdown window.
        flushAt: 1,
        flushInterval: 1000,
      });
      return this.client;
    } catch (error) {
      this.constructionError = error;
      logger.warn(
        `Analytics: failed to construct the PostHog client for '${this.environment}': ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}
