import { useCallback, useEffect } from 'react';
import { PlatformEvent, PlatformEventAsync, PlatformEventHandler } from 'platform-bible-utils';
import { usePromise } from './use-promise.hook';

const noopUnsubscriber = () => false;

/**
 * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler
 * runs when the event is emitted. Use `papi.network.getNetworkEvent` to use a networked event with
 * this hook.
 *
 * @param event The asynchronously (un)subscribing event to subscribe to.
 *
 *   - If event is a `PlatformEvent` or `PlatformEventAsync`, that event will be used
 *   - If event is undefined, the callback will not be subscribed. Useful if the event is not yet
 *       available for example
 *
 * @param eventHandler The callback to run when the event is emitted
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useCallback. The reference must not be updated
 *   every render
 */
export const useEventAsync = <T>(
  event: PlatformEvent<T> | PlatformEventAsync<T> | undefined,
  eventHandler: PlatformEventHandler<T>,
) => {
  // Subscribe to the event asynchronously
  const [unsubscribe] = usePromise(
    useCallback(async () => {
      // Do nothing if the event is not provided (in case the event is not yet available, for example)
      if (!event) return noopUnsubscriber;

      // Wrap subscribe and unsubscribe in promises to allow normal events to be used as well
      const unsub = await Promise.resolve(event(eventHandler));
      return async () => unsub();
    }, [eventHandler, event]),
    noopUnsubscriber,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: false },
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

export default useEventAsync;
