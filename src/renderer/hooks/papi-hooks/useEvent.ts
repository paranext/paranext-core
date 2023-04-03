import { getNetworkEvent } from '@shared/services/NetworkService';
import { PEvent, PEventHandler } from '@shared/models/PEvent';
import { isString } from '@shared/util/Util';
import { useEffect } from 'react';

/**
 * Adds an event handler to an event so the event handler runs when the event is emitted
 * @param event the event to subscribe to. Can be either a string or an Event
 *  - If event is a `string`, the network event associated with this type will automatically be used
 *  - If event is a `PEvent`, that event will be used
 *  - If event is undefined, the callback will not be subscribed. Useful if the event is not yet available for example
 * @param eventHandler the callback to run when the event is emitted
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render
 */
export default <T>(
  event: PEvent<T> | string | undefined,
  eventHandler: PEventHandler<T>,
) => {
  useEffect(() => {
    // Do nothing if the event is not provided (in case the event is not yet available, for example)
    if (!event) return () => {};

    const onEvent = isString(event) ? getNetworkEvent<T>(event) : event;
    const unsubscriber = onEvent(eventHandler);
    return () => {
      unsubscriber();
    };
  }, [event, eventHandler]);
};
