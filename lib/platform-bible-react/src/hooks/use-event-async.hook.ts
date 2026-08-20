import { useEffect } from 'react';
import {
  PlatformEvent,
  PlatformEventAsync,
  PlatformEventHandler,
  Unsubscriber,
  UnsubscriberAsync,
} from 'platform-bible-utils';

/**
 * Adds an event handler to an asynchronously subscribing/unsubscribing event so the event handler
 * runs when the event is emitted. Use `papi.network.getNetworkEvent` to use a networked event with
 * this hook.
 *
 * Delivery is guarded per subscription: once a subscription is superseded (the `event` or
 * `eventHandler` reference changed) or the component unmounts, an emission that still arrives from
 * it — e.g. one already in flight over the network — is ignored rather than delivered to
 * `eventHandler`. If the subscribe promise resolves only after the subscription was already
 * superseded, the resolved unsubscriber is invoked immediately so the subscription does not leak.
 * Subscribe and unsubscribe failures are logged rather than thrown — neither has a caller that
 * could catch them. A failed unsubscribe is logged, not retried.
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
  useEffect(() => {
    // Do nothing if the event is not provided (in case the event is not yet available, for example)
    if (!event) return undefined;

    // All subscription state is effect-local so every (re)subscription gets its own guards —
    // including React StrictMode's mount/cleanup/remount, which must not share an unsubscriber.
    let isCancelled = false;
    let unsubscribe: Unsubscriber | UnsubscriberAsync | undefined;
    let hasUnsubscribed = false;

    // Emissions from this subscription stop reaching the handler the moment cleanup runs, even if
    // the underlying event still fires it (e.g. an emission already in flight during teardown)
    const guardedHandler: PlatformEventHandler<T> = (eventData) => {
      if (!isCancelled) eventHandler(eventData);
    };

    // Makes ONE attempt to unsubscribe, from whichever path gets there first (cleanup, or the
    // subscribe promise resolving after cleanup). The flag is set before the await, so a failed
    // unsubscribe is NOT retried - for a network event that leaves the remote registration live for
    // the rest of the session, which is the accepted cost of a fire-and-forget teardown: nothing
    // can await an effect cleanup, so there is no caller to retry or surface the failure to.
    // Delivery is still muted locally by `isCancelled` either way.
    const unsubscribeOnce = () => {
      if (hasUnsubscribed || !unsubscribe) return;

      hasUnsubscribed = true;
      const unsubscribeCaptured = unsubscribe;
      (async () => {
        try {
          await unsubscribeCaptured();
        } catch (error) {
          console.error('useEventAsync: error while unsubscribing from event', error);
        }
      })();
    };

    // Subscribe. Wrapped in Promise.resolve to allow synchronous events to be used as well
    (async () => {
      try {
        unsubscribe = await Promise.resolve(event(guardedHandler));
        // Cleanup already ran while the subscribe was in flight, so tear down right away
        if (isCancelled) unsubscribeOnce();
      } catch (error) {
        console.error('useEventAsync: error while subscribing to event', error);
      }
    })();

    return () => {
      isCancelled = true;
      unsubscribeOnce();
    };
  }, [event, eventHandler]);
};

export default useEventAsync;
