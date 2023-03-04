import { EventEmitter, EventSubscription } from './Event';

/**
 * Networked version of EventEmitter - accepts subscriptions to an event and runs the subscription callbacks when the event is emitted.
 * Events on NetworkEventEmitters can be emitted across processes. They are coordinated between processes by their type.
 * Use eventEmitter.event(callback) to subscribe to the event.
 * Use eventEmitter.emit(event) to run the subscriptions.
 * Generally, this EventEmitter should be private, and its event should be public. That way, the emitter is not publicized,
 * but anyone can subscribe to the event.
 *
 * WARNING: Do not use this class directly outside of NetworkService, or it will not do what you expect. Use NetworkService.createNetworkEventEmitter.
 *
 * WARNING: You cannot emit events with complex types on the network.
 */
class NetworkEventEmitter<T> extends EventEmitter<T> {
  /** Callback that sends the event to other processes on the network when it is emitted */
  private readonly _networkSubscriber: EventSubscription<T>;

  /**
   * Creates a NetworkEventEmitter
   * @param type unique type that identifies this event. Must be the same across processes
   * @param networkSubscriber callback that accepts the event and emits it to other processes
   */
  constructor(networkSubscriber: EventSubscription<T>) {
    super();

    // TODO: when we implement disposing, dispose of this!
    this._networkSubscriber = networkSubscriber;
  }

  public override emit = (event: T) => {
    this._networkSubscriber(event);
    this.emitLocal(event);
  };

  /**
   * Runs only the subscriptions for the event that are on this process. Does not send over network
   * @param event event data to provide to subscribed callbacks
   */
  public emitLocal(event: T) {
    super.emitFn(event);
  }
}

export default NetworkEventEmitter;
