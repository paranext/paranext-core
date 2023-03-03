/**
 * Interfaces, classes, and functions related to events and event emitters
 */

import { Unsubscriber } from '@shared/util/PapiUtil';

/** Callback function that accepts an event and should run when an event is emitted */
type EventSubscription<T> = (event: T) => void;

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
  private _subscriptions?: EventSubscription<T>[];

  /** Event for listeners to subscribe to. Lazy loaded */
  private _event?: Event<T>;

  /**
   * Event for listeners to subscribe to. Subscribes a function to run when this event is emitted.
   * Use like `const unsubscriber = event(callback)`
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  public get event(): Event<T> {
    if (!this._event) {
      this._event = (callback) => {
        // Initialize this._subscriptions if it does not exist
        if (!this._subscriptions) this._subscriptions = [];

        this._subscriptions.push(callback);

        return () => {
          if (!this._subscriptions) return false; // Did not find any subscribed callbacks

          const callbackIndex = this._subscriptions.indexOf(callback);

          if (callbackIndex < 0) return false; // Did not find this callback in the subscriptions

          // Remove the callback
          this._subscriptions.splice(callbackIndex, 1);

          // Remove this._subscriptions if it does not need to exist
          if (this._subscriptions.length === 0) this._subscriptions = undefined;

          return true;
        };
      };
    }
    return this._event;
  }

  /**
   * Subscribes a function to run when this event is emitted.
   * @alias event
   * @param callback function to run with the event when it is emitted
   * @returns unsubscriber function to run to stop calling the passed-in function when the event is emitted
   */
  public subscribe = this.event;

  /** Runs the subscriptions for the event */
  public emit = (event: T) => {
    this._subscriptions?.forEach((callback) => callback(event));
  };
}
