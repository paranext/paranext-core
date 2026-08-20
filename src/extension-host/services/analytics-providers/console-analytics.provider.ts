import { logger } from '@shared/services/logger.service';
import {
  AnalyticsEnvironment,
  AnalyticsEvent,
  AnalyticsProvider,
} from '@shared/models/analytics.model';

/**
 * Analytics provider that logs events instead of transmitting them to a real vendor. This is the
 * implementation to use for unit tests and for most automated E2E runs to avoid swamping a real
 * server-based implementation, so those runs don't inflate real vendor event counts.
 */
export class ConsoleAnalyticsProvider implements AnalyticsProvider {
  constructor(private readonly environment: AnalyticsEnvironment) {}

  async send(event: AnalyticsEvent): Promise<void> {
    if (event.environment !== this.environment) {
      // The analytics service _should_ ensure this can never happen, assuming it is set up with the
      // correct test and production providers.
      logger.warn(
        `Analytics: event '${event.name}' tagged as '${event.environment}' was routed to the '${this.environment}' provider`,
      );
      // A production-configured provider must never transmit a test-tagged event as production
      // data. The reverse (a test-configured provider receiving a production-tagged event) is
      // allowed through: production analytics undercounts that one event, and the test channel
      // picks up a spurious entry that doesn't reflect real test activity — low-stakes since
      // test data isn't relied on for business metrics. This asymmetric guard is the pattern a
      // future real vendor provider should copy.
      if (this.environment === 'production') return;
    }

    const label = this.environment === 'production' ? 'Production' : 'Test';
    // Two log lines, deliberately at different levels. `properties` is arbitrary caller-supplied
    // data that tends to accumulate user/project identifiers over the life of an epic -- writing
    // it to the `info` line would land it verbatim in a packaged build's persistent log file
    // (info is the packaged default; see analytics.service.ts's ENVIRONMENT_RESOLUTION_TIMEOUT_MS
    // neighbor comment for why info-level visibility matters here at all). The info line stays
    // limited to what proves correct targeting -- name, timestamp, environment -- and is safe to
    // land in any user's log. The full payload, properties included, only reaches debug.
    logger.info(
      `${label}: ${JSON.stringify({ name: event.name, timestamp: event.timestamp, environment: event.environment })}`,
    );
    logger.debug(`${label} (full event): ${JSON.stringify(event)}`);
  }
}
