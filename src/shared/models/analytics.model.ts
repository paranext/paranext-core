/**
 * Which analytics audience an event targets. Fixed when the event is fired (or when it leaves the
 * `unresolved` queue), never re-decided when it's actually transmitted — an event queued while
 * offline must not retarget just because the app was upgraded to a new vendor or the user has
 * changed the S/R server configuration before it finally sends.
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
  /**
   * Transmits a single resolved analytics event to this provider's destination.
   *
   * @param event The event to send. Its `environment` was fixed when it was fired, not when `send`
   *   is called — implementations must not re-derive or override it.
   * @returns A promise that resolves once the event has been handled (sent, queued, or otherwise
   *   accepted by the provider).
   * @throws Implementations may reject. Callers are expected to catch both a rejection and a
   *   synchronous throw and log-and-drop the event on failure — see `flushQueue` in
   *   `src/extension-host/services/analytics.service.ts` — so an implementation does not need to
   *   guarantee it never throws.
   */
  send(event: AnalyticsEvent): Promise<void>;
}
