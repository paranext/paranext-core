import { PlatformEventHandler, PlatformEventEmitter } from 'platform-bible-utils';

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
export default class PapiNetworkEventEmitter<T> extends PlatformEventEmitter<T> {
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
   * Runs only the subscriptions for the event that are on this process. Does not send over network
   *
   * @param event Event data to provide to subscribed callbacks
   */
  emitLocal(event: T) {
    this.assertNotDisposed();

    super.emitFn(event);
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
