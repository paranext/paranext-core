import { PEventHandler } from '@shared/models/PEvent';
import { PSelectorEvent } from '@shared/models/PSelectorEvent';

/** Update information for a listener indicating whether or not an update should be sent and what the update data is */
export type SelectorListenerEvent<TEvent> =
  | {
      /** An update should be sent to this listener */
      shouldUpdate: true;
      /** The data to send to the listener in this update */
      event: TEvent;
    }
  | {
      /** An update should not be sent to this listener */
      shouldUpdate: false;
    }
  /** An update should not be sent to this listener */
  | undefined
  | null
  | false;

/**
 * Function that generates events for each listener based on what listeners are listening for.
 * @param eventSelector selector for the emit that is causing this event
 * @param listenerSelectors array of the selector for each listener subscribed to this emitter - represents what each listener is listening for
 * @returns array of event information for each listener including whether or not an event should be sent to that listener and what that event is.
 *   Each index in this array should correspond to the same index in the listenerSelectors array
 */
export type SelectorEventGenerator<TSelector, TEvent> = (
  eventSelector: TSelector,
  listenerSelectors: TSelector[],
) => Promise<SelectorListenerEvent<TEvent>[]>;

/** Callback function that will run when an event is emitted along with information about when to run it */
type SelectorSubscription<TSelector, TEvent> = {
  /** Client id of process to whom this subscription belongs */
  clientId: number;
  /** id for this subscription - unique among each process, not globally unique */
  subscriptionId: number;
  selector: TSelector;
} & (
  | {
      /** The local subscription has the callback to run */
      type: 'local';
      callback: PEventHandler<TEvent>;
    }
  | {
      /** Remote subscriptions are only tracked on the original emitter's process, not listeners' processes */
      type: 'remote';
    }
);

/**
 * Networked version of EventEmitter with selector abilities - accepts subscriptions to an event with a specified selector
 * and runs the relevant subscription callbacks when the event is emitted.
 * Events on NetworkSelectorEventEmitters can be emitted across processes. They are coordinated between processes by their type.
 * Use eventEmitter.event(selector, callback) to subscribe to the event.
 * Use eventEmitter.emit(eventSelector) to run the subscriptions.
 * Generally, this EventEmitter should be private, and its event should be public. That way, the emitter is not publicized,
 * but anyone can subscribe to the event.
 *
 * WARNING: Do not use this class directly outside of NetworkService, or it will not do what you expect. Use NetworkService.createNetworkSelectorEventEmitter.
 *
 * WARNING: You cannot emit events with complex types on the network.
 *
 * @type `TSelector` - the type of selector used for listeners to get a subset of events from this emitter.
 *  A selector is an object a caller provides to the emitter to tell the emitter what subset of events it wants.
 * @type `TEvent` - the type of event provided by this event emitter based on a provided selector
 */
class PNetworkSelectorEventEmitter<TSelector, TEvent> {
  /**
   * All callback functions that will run when this event is emitted along with information about when to run them.
   * On the process with the original emitter, this contains all processes' subscriptions.
   * On processes that are listening to the event, this contains just this process's subscriptions.
   * Lazy loaded
   */
  private subscriptions?: SelectorSubscription<TSelector, TEvent>[];

  /** Unique id among this process for subscriptions. Used to identify the subscription across processes */
  private nextSubscriptionId = 0;
  /** Event for listeners to subscribe to. Lazy loaded */
  private lazyEvent?: PSelectorEvent<TSelector, TEvent>;
  /** Whether this emitter has been disposed */
  private isDisposed = false;

  /** Check to make sure this emitter is not disposed. Throw if it is */
  protected assertNotDisposed = () => {
    if (this.isDisposed) throw new Error('Emitter is disposed');
  };

  /**
   * Creates a NetworkSelectorEventEmitter
   * @param generateEvents Function that generates events for each listener based on what was updated and what listeners are listening for
   * @param networkSubscriber callback that accepts the event and emits it to other processes
   * @param networkDisposer callback that unlinks this emitter from the network
   */
  constructor(
    private generateEvents: SelectorEventGenerator<TSelector, TEvent>,
    private clientId: number,
    /** Callback that sends the event to other processes on the network when it is emitted */
    private networkSubscriber: PEventHandler<TEvent>,
    /** Callback that runs when the emitter is disposed - should handle unlinking from the network */
    private networkDisposer: () => void,
  ) {}

  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted if the emitter determines the event is relevant to that selector.
   * Use like `const unsubscriber = event(selector, callback)`
   * @param selector tells the emitter what subset of events should be sent to this callback
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  public get event(): PSelectorEvent<TSelector, TEvent> {
    this.assertNotDisposed();

    if (!this.lazyEvent) {
      this.lazyEvent = async (selector, callback) => {
        if (!callback || typeof callback !== 'function')
          throw new Error(
            `Selector Event handler callback must be a function!`,
          );

        // Initialize this.subscriptions if it does not exist
        if (!this.subscriptions) this.subscriptions = [];

        const selectorSubscription: SelectorSubscription<TSelector, TEvent> = {
          type: 'local',
          clientId: this.clientId,
          subscriptionId: this.nextSubscriptionId,
          selector,
          callback,
        };

        this.nextSubscriptionId += 1;

        // Check with the original emitter if we can add this subscription
        // TODO: do this

        // Add this subscription locally
        this.subscriptions.push(selectorSubscription);

        return async () => {
          if (!this.subscriptions) return false; // Did not find any subscribed callbacks

          const subscriptionIndex =
            this.subscriptions.indexOf(selectorSubscription);

          if (subscriptionIndex < 0) return false; // Did not find this callback in the subscriptions

          // Remove the callback
          this.subscriptions.splice(subscriptionIndex, 1);

          return true;
        };
      };
    }
    return this.lazyEvent;
  }
}

export default PNetworkSelectorEventEmitter;
