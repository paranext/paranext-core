import { PostHog } from 'posthog-node';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
} from '@shared/models/analytics.model';
import { getDistinctId } from '@extension-host/services/analytics-identity';
import { raceWithTimeout } from '@extension-host/services/analytics-timeout';

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

  /**
   * Set as soon as `shutdown()` starts. The SDK must not be used after its own `shutdown()`, and a
   * send arriving that late must not build a fresh client either, so later sends reject.
   */
  private isShutDown = false;

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

  async shutdown(timeoutMs: number): Promise<void> {
    this.isShutDown = true;
    if (!this.client) return;
    try {
      const outcome = await raceWithTimeout(this.client.shutdown(timeoutMs), timeoutMs);
      if (outcome.timedOut)
        logger.warn(
          `Analytics: PostHog shutdown (${this.environment}) exceeded ${timeoutMs} ms; abandoning flush`,
        );
    } catch (error) {
      logger.warn(
        `Analytics: PostHog shutdown (${this.environment}) failed: ${getErrorMessage(error)}`,
      );
    }
  }

  private getClient(): PostHog {
    // Rejecting rather than resolving keeps the event marked as undelivered, and the caller logs
    // the rejection at debug: a send racing shutdown is expected, not worth a warning.
    if (this.isShutDown) throw new Error(`PostHog provider (${this.environment}) has shut down`);
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
