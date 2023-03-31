import { Unsubscriber, UnsubscriberAsync } from '@shared/util/PapiUtil';

/** Callback function that accepts an event and should run when an event is emitted */
export type PEventHandler<T> = (event: T) => void;

/**
 * Function that subscribes the provided callback to run when this event is emitted.
 * @param callback function to run with the event when it is emitted
 * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
 */
export type PEvent<T> = (callback: PEventHandler<T>) => Unsubscriber;

/**
 * A PEvent that subscribes asynchronously and resolves an asynchronous unsubscriber.
 *
 * Note: The callback itself is not asynchronous.
 */
export type PEventAsync<T> = (
  callback: PEventHandler<T>,
) => Promise<UnsubscriberAsync>;
