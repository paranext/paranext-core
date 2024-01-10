import { Unsubscriber, UnsubscriberAsync } from 'unsubscriber';

/** Callback function that accepts an event and should run when an event is emitted */
export type PlatformEventHandler<T> = (event: T) => void;

/**
 * Function that subscribes the provided callback to run when this event is emitted.
 *
 * @param callback Function to run with the event when it is emitted
 * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
 *   emitted
 */
export type PlatformEvent<T> = (callback: PlatformEventHandler<T>) => Unsubscriber;

/**
 * A PapiEvent that subscribes asynchronously and resolves an asynchronous unsubscriber.
 *
 * Note: The callback itself is not asynchronous.
 */
export type PlatformEventAsync<T> = (
  callback: PlatformEventHandler<T>,
) => Promise<UnsubscriberAsync>;
