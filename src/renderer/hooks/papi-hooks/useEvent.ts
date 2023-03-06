import { getNetworkEvent } from '@shared/services/NetworkService';
import { Event, EventHandler } from '@shared/util/Event';
import { isString } from '@shared/util/Util';
import { useEffect } from 'react';

/**
 * Adds an event handler to an event so the event handler runs when the event is emitted
 * @param event the event to subscribe to. Can be either a string or an Event
 *  - If event is a `string`, the network event associated with this type will automatically be used
 *  - If event is an `Event`, that event will be used
 * @param eventHandler the callback to run when the event is emitted
 *
 *    WARNING: MUST BE WRAPPED IN A useCallback. The reference must not be updated every render
 */
export default <T>(event: Event<T> | string, eventHandler: EventHandler<T>) => {
  useEffect(() => {
    const onEvent = isString(event) ? getNetworkEvent<T>(event) : event;
    const unsubscriber = onEvent(eventHandler);
    return () => {
      unsubscriber();
    };
  }, [event, eventHandler]);
};
