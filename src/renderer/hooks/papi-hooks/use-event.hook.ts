import { getNetworkEvent } from '@shared/services/network.service';
import { PapiEvent, PapiEventHandler } from '@shared/models/papi-event.model';
import { isString } from '@shared/utils/util';
import { useEffect } from 'react';

/**
 * Adds an event handler to an event so the event handler runs when the event is emitted
 * @param event the event to subscribe to. Can be either a string or an Event
 *  - If event is a `string`, the network event associated with this type will automatically be used
 *  - If event is a `PapiEvent`, that event will be used
 *  - If event is undefined, the callback will not be subscribed. Useful if the event is not yet available for example
 * @param eventHandler the callback to run when the event is emitted
 *
 *    WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated every render
 */
const useEvent = <T>(
  event: PapiEvent<T> | string | undefined,
  eventHandler: PapiEventHandler<T>,
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
export default useEvent;
