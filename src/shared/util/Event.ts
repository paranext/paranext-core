/**
 * Interfaces, classes, and functions related to events and event emitters
 */

import { Unsubscriber } from '@shared/util/PapiUtil';

/** Callback function that accepts an event and should run when an event is emitted */
export type EventSubscription<T> = (event: T) => void;

/**
 * Function that subscribes the provided callback to run when this event is emitted.
 * @param callback function to run with the event when it is emitted
 * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
 */
export type Event<T> = (callback: EventSubscription<T>) => Unsubscriber;

/**
 * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the event is emitted
 * Use eventEmitter.event(callback) to subscribe to the event.
 * Use eventEmitter.emit(event) to run the subscriptions.
 * Generally, this EventEmitter should be private, and its event should be public. That way, the emitter is not publicized,
 * but anyone can subscribe to the event.
 */
export class EventEmitter<T> {
  /** All callback functions that will run when this event is emitted. Lazy loaded */
  protected subscriptions?: EventSubscription<T>[];
  /** Event for listeners to subscribe to. Lazy loaded */
  private lazyEvent?: Event<T>;
  /** Whether this emitter has been disposed */
  protected isDisposed = false;

  /** Check to make sure this emitter is not disposed. Throw if it is */
  protected assertNotDisposed = () => {
    if (this.isDisposed) throw new Error('Emitter is disposed');
  };

  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  public get event(): Event<T> {
    this.assertNotDisposed();

    if (!this.lazyEvent) {
      this.lazyEvent = (callback) => {
        // Initialize this._subscriptions if it does not exist
        if (!this.subscriptions) this.subscriptions = [];

        this.subscriptions.push(callback);

        return () => {
          if (!this.subscriptions) return false; // Did not find any subscribed callbacks

          const callbackIndex = this.subscriptions.indexOf(callback);

          if (callbackIndex < 0) return false; // Did not find this callback in the subscriptions

          // Remove the callback
          this.subscriptions.splice(callbackIndex, 1);

          // Remove this._subscriptions if it does not need to exist
          if (this.subscriptions.length === 0) this.subscriptions = undefined;

          return true;
        };
      };
    }
    return this.lazyEvent;
  }

  /**
   * Subscribes a function to run when this event is emitted.
   * @alias event
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  public subscribe = this.event;

  /**
   * Runs the subscriptions for the event
   * @param event event data to provide to subscribed callbacks
   */
  public emit = (event: T) => {
    // Do not do anything other than emitFn here. This emit is just binding `this` to emitFn
    this.emitFn(event);
  };

  /**
   * Function that runs the subscriptions for the event.
   * Added here so children can override emit and still call the base functionality.
   * See NetworkEventEmitter.emit for example
   */
  protected emitFn(event: T) {
    this.assertNotDisposed();

    this.subscriptions?.forEach((callback) => callback(event));
  }

  /** Disposes of this event, preparing it to release from memory */
  public dispose = () => {
    this.disposeFn();
  };
  /**
   * Disposes of this event, preparing it to release from memory.
   * Added here so children can override emit and still call the base functionality.
   */
  protected disposeFn() {
    this.isDisposed = true;
    this.subscriptions = undefined;
    this.lazyEvent = undefined;
  }
}
