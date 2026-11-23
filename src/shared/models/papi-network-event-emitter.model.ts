import { getErrorMessage, PlatformEventHandler, PlatformEventEmitter } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';

/**
 * Networked version of EventEmitter - accepts subscriptions to an event and runs the subscription
 * callbacks when the event is emitted. Events on NetworkEventEmitters can be emitted across
 * processes. They are coordinated between processes by their type. Use eventEmitter.event(callback)
 * to subscribe to the event. Use eventEmitter.emit(event) to run the subscriptions. Generally, this
 * EventEmitter should be private, and its event should be public. That way, the emitter is not
 * publicized, but anyone can subscribe to the event.
 *
 * WARNING: Do not use this class directly outside of NetworkService, or it will not do what you
 * expect. Use NetworkService.createNetworkEventEmitter.
 *
 * WARNING: You cannot emit events with complex types on the network.
 */
export class PapiNetworkEventEmitter<T> extends PlatformEventEmitter<T> {
  /**
   * Creates a NetworkEventEmitter
   *
   * @param networkSubscriber Callback that accepts the event and emits it to other processes
   * @param networkDisposer Callback that unlinks this emitter from the network
   */
  constructor(
    /** Callback that sends the event to other processes on the network when it is emitted */
    private networkSubscriber: PlatformEventHandler<T>,
    /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
    private networkDisposer: () => void,
  ) {
    super();
  }

  override emit = (event: T) => {
    this.assertNotDisposed();

    if (this.networkSubscriber) this.networkSubscriber(event);
    this.emitLocal(event);
  };

  /**
   * Sends the event to the other processes and runs this process's subscriptions for it, keeping
   * each of those subscribers' failures to itself. See {@link PlatformEventEmitter.emitIsolated}.
   *
   * @param event Event data to provide to subscribed callbacks
   * @param handleSubscriberError Run with the error a subscriber threw and that subscriber's
   *   position in the subscription order. Must not throw. Only local subscribers are reported here;
   *   a failure to reach the network is reported where the network callback was supplied.
   * @experimental
   */
  override emitIsolated = (
    event: T,
    handleSubscriberError: (error: unknown, subscriberIndex: number) => void,
  ) => {
    // Emitting on a disposed emitter is the caller's bug, not a subscriber's, and `dispose` already
    // dropped the subscriptions, so there is nobody left to isolate anything from. Asserted before
    // the network send so a disposed emitter cannot still put an event on the network.
    this.assertNotDisposed();

    // The network hop and the local fan-out are independent: local subscribers are told from this
    // process's own subscription list and do not need the event to have reached anyone else. Left
    // unisolated, a network callback that threw would cost every local subscriber the one and only
    // announcement they get — the very failure mode `emitIsolated` exists to prevent, reintroduced
    // one layer up. The callback is supposed to report its own failures (see
    // `createNetworkEventEmitter`, which logs there and names the event), so a throw out of it is a
    // bug in that callback rather than news about a subscriber; log it here instead of handing it
    // to `handleSubscriberError`, which is documented as being about subscribers.
    try {
      if (this.networkSubscriber) this.networkSubscriber(event);
    } catch (error) {
      logger.error(
        `A network event emitter's network callback threw instead of reporting its own failure, so this event reached no other process; the local subscribers were still told: ${getErrorMessage(error)}`,
      );
    }

    this.emitLocalIsolated(event, handleSubscriberError);
  };

  /**
   * Runs only the subscriptions for the event that are on this process. Does not send over network
   *
   * @param event Event data to provide to subscribed callbacks
   */
  emitLocal(event: T) {
    this.assertNotDisposed();

    super.emitFn(event);
  }

  /**
   * Runs only the subscriptions for the event that are on this process, keeping each subscriber's
   * failure to itself. Does not send over network. See {@link PlatformEventEmitter.emitIsolated}.
   *
   * @param event Event data to provide to subscribed callbacks
   * @param handleSubscriberError Run with the error a subscriber threw and that subscriber's
   *   position in the subscription order. Must not throw.
   * @experimental
   */
  emitLocalIsolated(
    event: T,
    handleSubscriberError: (error: unknown, subscriberIndex: number) => void,
  ) {
    this.assertNotDisposed();

    super.emitIsolatedFn(event, handleSubscriberError);
  }

  override dispose = () => {
    const retVal = super.disposeFn();
    // TODO: Do we need to set networkSubscriber to undefined? Had to remove readonly from it to do this
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    this.networkSubscriber = undefined as unknown as PlatformEventHandler<T>;
    this.networkDisposer();
    return retVal;
  };
}

export default PapiNetworkEventEmitter;
