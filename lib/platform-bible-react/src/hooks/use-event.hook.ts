import { PlatformEvent, PlatformEventHandler } from 'platform-bible-utils';
import { useEffect } from 'react';

/**
 * Adds an event handler to an event so the event handler runs when the event is emitted. Use
 * `papi.network.getNetworkEvent` to use a networked event with this hook.
 *
 * Delivery is guarded per subscription: once the subscription is superseded (the `event` or
 * `eventHandler` reference changed) or the component unmounts, an emission that still arrives from
 * it — e.g. an emitter walking a snapshot of its handler list — is ignored rather than delivered to
 * `eventHandler`. An unsubscriber that throws during cleanup is logged rather than thrown, since
 * nothing can catch an error thrown from an effect cleanup.
 *
 * @param event The event to subscribe to.
 *
 *   - If event is a `PlatformEvent`, that event will be used
 *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
 *       available for example
 *
 * @param eventHandler The callback to run when the event is emitted
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 */
export const useEvent = <T>(
  event: PlatformEvent<T> | undefined,
  eventHandler: PlatformEventHandler<T>,
) => {
  useEffect(() => {
    // Do nothing if the event is not provided (in case the event is not yet available, for example)
    if (!event) return undefined;

    // Emissions from this subscription stop reaching the handler the moment cleanup runs, even if
    // the underlying event still fires it
    let isCancelled = false;
    const guardedHandler: PlatformEventHandler<T> = (eventData) => {
      if (!isCancelled) eventHandler(eventData);
    };

    // Subscribing synchronously is deliberately NOT wrapped, unlike useEventAsync's subscribe: a
    // throw here happens during the effect itself, where React's error boundaries can see and
    // report it. Only the teardown below is wrapped, since nothing can catch a throw from an
    // effect cleanup.
    const unsubscriber = event(guardedHandler);
    return () => {
      isCancelled = true;
      try {
        unsubscriber();
      } catch (error) {
        console.error('useEvent: error while unsubscribing from event', error);
      }
    };
  }, [event, eventHandler]);
};
export default useEvent;
