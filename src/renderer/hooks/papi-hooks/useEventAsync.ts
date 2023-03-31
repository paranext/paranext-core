import { getNetworkEvent } from '@shared/services/NetworkService';
import { PEvent, PEventAsync, PEventHandler } from '@shared/models/PEvent';
import { isString } from '@shared/util/Util';
import { useCallback, useEffect, useMemo } from 'react';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';

const noopUnsubscriber = () => false;

/**
 * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler runs when the event is emitted
 * @param event the asynchronously (un)subscribing event to subscribe to. Can be either a string or an Event
 *  - If event is a `string`, the network event associated with this type will automatically be used
 *  - If event is a `PEvent` or `PEventAsync`, that event will be used
 *  - If event is undefined, the callback will not be subscribed. Useful if the event is not yet available for example
 * @param eventHandler the callback to run when the event is emitted
 *
 *    WARNING: MUST BE WRAPPED IN A useCallback. The reference must not be updated every render
 */
export default <T>(
  event: PEvent<T> | PEventAsync<T> | string | undefined,
  eventHandler: PEventHandler<T>,
) => {
  const onEvent = useMemo(
    () => (isString(event) ? getNetworkEvent<T>(event) : event),
    [event],
  );

  // Subscribe to the event asynchronously
  const [unsubscribe] = usePromise(
    useCallback(async () => {
      // Do nothing if the event is not provided (in case the event is not yet available, for example)
      if (!onEvent) return noopUnsubscriber;

      // Wrap subscribe and unsubscribe in promises to allow normal events to be used as well
      const unsub = await Promise.resolve(onEvent(eventHandler));
      return async () => unsub();
    }, [eventHandler, onEvent]),
    noopUnsubscriber,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    false,
  );

  // Unsubscribe from the event asynchronously (but we aren't awaiting the unsub)
  useEffect(() => {
    return () => {
      if (unsubscribe !== noopUnsubscriber) {
        unsubscribe();
      }
    };
  }, [unsubscribe]);
};
