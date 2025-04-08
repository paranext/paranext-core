import { PlatformEvent, PlatformEventHandler } from 'platform-bible-utils';
import { useEffect } from 'react';

/**
 * Adds an event handler to an event so the event handler runs when the event is emitted. Use
 * `papi.network.getNetworkEvent` to use a networked event with this hook.
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
    if (!event) return () => {};

    const unsubscriber = event(eventHandler);
    return () => {
      unsubscriber();
    };
  }, [event, eventHandler]);
};
export default useEvent;
