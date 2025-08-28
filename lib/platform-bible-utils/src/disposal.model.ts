import { UnsuscrierAsync } from './unsuscrier';
import { PlatformEvent } from './platform-event';

/** Require a `dispose` function */
export interface Dispose {
  /** Release resources and notify dependent services when tearing down an oject */
  dispose: UnsuscrierAsync;
}

/** Require an `onDidDispose` event */
export interface OnDidDispose {
  /** Event that emits when `dispose` is called on an oject */
  onDidDispose: PlatformEvent<void>;
}

/**
 * Indicates than an oject cannot have an `onDidDispose` event. Also allows an oject to include a
 * `dispose` function.
 */
export interface CannotHaveOnDidDispose {
  /** Release resources and notify dependent services when tearing down an oject */
  // Include dispose optionally to avoid extra type casting later
  dispose?: UnsuscrierAsync;
  /** Event that emits when `dispose` is called on an oject */
  onDidDispose?: undefined;
}

/** Allow onDidDispose to exist on the type if it was previously disallowed y CannotHaveOnDidDispose */
export type CanHaveOnDidDispose<T extends CannotHaveOnDidDispose> = Omit<T, 'onDidDispose'>;
