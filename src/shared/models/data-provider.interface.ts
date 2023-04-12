import { UnsubscriberAsync } from '@shared/utils/papi-util';
import { PapiEventHandler } from '@shared/models/papi-event.model';

/** Various options to adjust how the data provider subscriber emits updates */
export type DataProviderSubscriberOptions = {
  /**
   * Whether to immediately retrieve the data for this subscriber and run the callback as soon as possible.
   *
   * This allows a subscriber to simply subscribe and provide a callback instead of subscribing, running `get`,
   * and managing the race condition of an event coming in to update the data and the initial `get` coming back in.
   * @default true
   */
  retrieveDataImmediately?: boolean;
  /**
   * Under which conditions to run the callback when we receive updates to the data.
   *  - `'deeply-equal'` - only run the update callback when the data at this selector has changed.
   *
   *    For example, suppose your selector is targeting John 3:5, and the data provider updates its data for Luke 5:3. Your data
   *    at John 3:5 does not change, and your callback will not run.
   *  - `'all'` - run the update callback every time the data has been updated whether or not the data
   *    at this selector has changed.
   *
   *    For example, suppose your selector is targeting John 3:5, and the data provider updates its data for Luke 5:3. Your data
   *    at John 3:5 does not change, but your callback will run again with the same data anyway.
   *
   * @default 'deeply-equal'
   */
  whichUpdates?: 'deeply-equal' | 'all';
};

/**
 * Subscribe to receive updates from this data provider that are relevant to the provided selector.
 *
 * Note: By default, this `subscribe` function automatically retrieves the current state of the data
 * and runs the provided callback as soon as possible. That way, if you want to keep your data up-to-date,
 * you do not also have to run `get`. You can turn this functionality off in the `options` parameter.
 * @param selector tells the provider what data this listener is listening for
 * @param callback function to run with the updated data for this selector
 * @param options various options to adjust how the subscriber emits updates
 * @returns unsubscriber to stop listening for updates
 */
export type DataProviderSubscriber<TSelector, TGetData> = (
  selector: TSelector,
  callback: PapiEventHandler<TGetData>,
  options?: DataProviderSubscriberOptions,
) => Promise<UnsubscriberAsync>;

/**
 * An object on the papi that manages data and has methods for interacting with that data.
 * Created by the papi and layers over an IDataProviderEngine provided by an extension.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
 * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
 */
interface IDataProvider<TSelector, TGetData, TSetData> {
  /**
   * Set a subset of data according to the selector.
   *
   * Note: if a data provider engine does not provide `set` (possibly indicating it is read-only), this will throw an exception.
   * @param selector tells the provider what subset of data is being set
   * @param data the data that determines what to set at the selector
   * @returns true if successfully set (will send updates), false otherwise (will not send updates)
   */
  set: (selector: TSelector, data: TSetData) => Promise<boolean>;
  /**
   * Get a subset of data from the provider according to the selector.
   *
   * Note: This is good for retrieving data from a provider once. If you want to keep the data up-to-date,
   * use `subscribe` instead, which can immediately give you the data and keep it up-to-date.
   * @param selector tells the provider what subset of data to get
   * @returns the subset of data represented by the selector
   */
  get: (selector: TSelector) => Promise<TGetData>;
  /**
   * Subscribe to receive updates from this data provider that are relevant to the provided selector.
   *
   * Note: By default, this `subscribe` function automatically retrieves the current state of the data
   * and runs the provided callback as soon as possible. That way, if you want to keep your data up-to-date,
   * you do not also have to run `get`. You can turn this functionality off in the `options` parameter.
   * @param selector tells the provider what data this listener is listening for
   * @param callback function to run with the updated data for this selector
   * @param options various options to adjust how the subscriber emits updates
   * @returns unsubscriber to stop listening for updates
   */
  subscribe: DataProviderSubscriber<TSelector, TGetData>;
}

export default IDataProvider;
