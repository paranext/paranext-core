/**
 * Which analytics audience an event targets. Fixed when the event is fired (or when it leaves the
 * `unresolved` queue), never re-decided when it's actually transmitted — an event queued while
 * offline must not retarget just because the app was upgraded to a new vendor or the user has
 * changed the S/R sever configuration before it finally sends.
 */
export type AnalyticsEnvironment = 'test' | 'production';

/** A single analytics event, tagged with the environment it should be sent to. */
export interface AnalyticsEvent {
  /** Event name, e.g. `'app_launch'` */
  name: string;
  /** Arbitrary event properties, if any */
  properties?: Record<string, unknown>;
  /** Milliseconds since epoch when the event was fired */
  timestamp: number;
  /** Which analytics audience this event targets */
  environment: AnalyticsEnvironment;
}

/** An analytics event before its environment has been resolved. */
export type UnresolvedAnalyticsEvent = Omit<AnalyticsEvent, 'environment'>;

/**
 * Something that can transmit a resolved analytics event. Implementations are provider-specific
 * (console, a vendor SDK, etc). A separate instance is constructed per environment it serves, so an
 * implementation that needs a vendor write-key gets one bound at construction time rather than
 * passed per call.
 */
export interface AnalyticsProvider {
  send(event: AnalyticsEvent): Promise<void>;
}
