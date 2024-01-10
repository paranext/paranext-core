import { UnsubscriberAsync } from 'unsubscriber';
import { PlatformEvent } from 'platform-event';

/** Require a `dispose` function */
export interface Dispose {
  /** Release resources and notify dependent services when tearing down an object */
  dispose: UnsubscriberAsync;
}

/** Require an `onDidDispose` event */
export interface OnDidDispose {
  /** Event that emits when `dispose` is called on an object */
  onDidDispose: PlatformEvent<void>;
}

/**
 * Indicates than an object cannot have an `onDidDispose` event. Also allows an object to include a
 * `dispose` function.
 */
export interface CannotHaveOnDidDispose {
  /** Release resources and notify dependent services when tearing down an object */
  // Include dispose optionally to avoid extra type casting later
  dispose?: UnsubscriberAsync;
  /** Event that emits when `dispose` is called on an object */
  onDidDispose?: undefined;
}

/** Allow onDidDispose to exist on the type if it was previously disallowed by CannotHaveOnDidDispose */
export type CanHaveOnDidDispose<T extends CannotHaveOnDidDispose> = Omit<T, 'onDidDispose'>;
