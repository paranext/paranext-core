import { PapiEvent } from '@shared/models/papi-event.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';

/** Require a `dispose` function */
export interface Dispose {
  /** Release resources and notify dependent services when tearing down an object */
  dispose: UnsubscriberAsync;
}

/** Require an `onDidDispose` event */
export interface OnDidDispose {
  /** Event that emits when `dispose` is called on an object */
  onDidDispose: PapiEvent<void>;
}

/** Indicates than an object cannot have an `onDidDispose` event.
 *  Also allows an object to include a `dispose` function. */
export type CannotHaveOnDidDispose<T> = T & {
  /** Release resources and notify dependent services when tearing down an object */
  // Include dispose optionally to avoid extra type casting later
  dispose?: UnsubscriberAsync;
  /** Event that emits when `dispose` is called on an object */
  onDidDispose?: undefined;
};
