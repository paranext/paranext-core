/** Interfaces, classes, and functions related to events and event emitters */

import { Dispose } from './disposal.model';
import { PlatformEvent, PlatformEventHandler } from './platform-event';

/**
 * Event manager - accepts subscriptions to an event and runs the subscription callbacks when the
 * event is emitted Use eventEmitter.event(callback) to subscribe to the event. Use
 * eventEmitter.emit(event) to run the subscriptions. Generally, this EventEmitter should be
 * private, and its event should be public. That way, the emitter is not publicized, but anyone can
 * subscribe to the event.
 */
export class PlatformEventEmitter<T> implements Dispose {
  /**
   * Subscribes a function to run when this event is emitted.
   *
   * @param callback Function to run with the event when it is emitted
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  subscribe = this.event;

  /** All callback functions that will run when this event is emitted. Lazy loaded */
  private subscriptions?: PlatformEventHandler<T>[];
  /** Event for listeners to subscribe to. Lazy loaded */
  private lazyEvent?: PlatformEvent<T>;
  /** Whether this emitter has been disposed */
  private isDisposed = false;

  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   *
   * @returns Unsubscriber function to run to stop calling the passed-in function when the event is
   *   emitted
   */
  get event(): PlatformEvent<T> {
    this.assertNotDisposed();

    if (!this.lazyEvent) {
      this.lazyEvent = (callback) => {
        if (!callback || typeof callback !== 'function')
          throw new Error(`Event handler callback must be a function!`);

        // Initialize this.subscriptions if it does not exist
        if (!this.subscriptions) this.subscriptions = [];

        this.subscriptions.push(callback);

        return () => {
          if (!this.subscriptions) return false; // Did not find any subscribed callbacks

          const callbackIndex = this.subscriptions.indexOf(callback);

          if (callbackIndex < 0) return false; // Did not find this callback in the subscriptions

          // Remove the callback
          this.subscriptions.splice(callbackIndex, 1);

          return true;
        };
      };
    }
    return this.lazyEvent;
  }

  /** Disposes of this event, preparing it to release from memory */
  dispose = () => {
    return this.disposeFn();
  };

  /**
   * Runs the subscriptions for the event
   *
   * @param event Event data to provide to subscribed callbacks
   */
  emit = (event: T) => {
    // Do not do anything other than emitFn here. This emit is just binding `this` to emitFn
    this.emitFn(event);
  };

  /**
   * Function that runs the subscriptions for the event. Added here so children can override emit
   * and still call the base functionality. See NetworkEventEmitter.emit for example
   */
  protected emitFn(event: T) {
    this.assertNotDisposed();

    // Clone the subscriptions array before iterating over the callbacks so the callback index
    // doesn't get messed up if someone subscribes or unsubscribes inside one of the callbacks
    const emitCallbacks = [...(this.subscriptions ?? [])];
    emitCallbacks.forEach((callback) => callback(event));
  }

  /** Check to make sure this emitter is not disposed. Throw if it is */
  protected assertNotDisposed() {
    if (this.isDisposed) throw new Error('Emitter is disposed');
  }

  /**
   * Disposes of this event, preparing it to release from memory. Added here so children can
   * override emit and still call the base functionality.
   */
  protected disposeFn() {
    this.assertNotDisposed();

    this.isDisposed = true;
    this.subscriptions = undefined;
    this.lazyEvent = undefined;
    return Promise.resolve(true);
  }
}

export default PlatformEventEmitter;
