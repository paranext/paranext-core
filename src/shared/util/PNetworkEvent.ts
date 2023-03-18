import { PEventHandler } from '@shared/util/PapiUtil';
import PEventEmitter from '@shared/util/PEvent';

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
class PNetworkEventEmitter<T> extends PEventEmitter<T> {
  /** Callback that sends the event to other processes on the network when it is emitted */
  private networkSubscriber?: PEventHandler<T>;

  /**
   * Creates a NetworkEventEmitter
   * @param type unique type that identifies this event. Must be the same across processes
   * @param networkSubscriber callback that accepts the event and emits it to other processes
   */
  constructor(networkSubscriber: PEventHandler<T>) {
    super();

    this.networkSubscriber = networkSubscriber;
  }

  public override emit = (event: T) => {
    this.assertNotDisposed();

    if (this.networkSubscriber) this.networkSubscriber(event);
    this.emitLocal(event);
  };

  /**
   * Runs only the subscriptions for the event that are on this process. Does not send over network
   * @param event event data to provide to subscribed callbacks
   */
  public emitLocal(event: T) {
    this.assertNotDisposed();

    super.emitFn(event);
  }

  public override dispose = () => {
    // TODO: Do we need to set networkSubscriber to undefined? Had to remove readonly from it to do this
    this.networkSubscriber = undefined;
    super.disposeFn();
  };
}

export default PNetworkEventEmitter;
