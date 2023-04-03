import { UnsubscriberAsync } from '@shared/util/PapiUtil';
import { PEventHandler } from '@shared/models/PEvent';

/** Various options to adjust how the data provider subscriber emits updates */
export type DataProviderSubscriberOptions = {
  /**
   * Whether to immediately retrieve the data for this subscriber and run the callback as soon as possible
   * @default true
   */
  getDataImmediately?: boolean;
  /**
   * Whether to receive all updates to the data including ones that result in deeply equal data for this subscriber's selector.
   * If `receiveEqualUpdates` is true and some data irrelevant to this selector updates (meaning the data associated with this
   * selector does not change), the callback will be run anyway.
   *
   * For example, if your selector is targeting John 3:5, and the data provider updates its data for Luke 5:3, your data at
   * John 3:5 will not change. However, if `receiveEqualUpdates` is true, you will still receive an update because the data
   * provider updated its data.
   *
   * @default false
   */
  receiveEqualUpdates?: boolean;
};

/**
 * Subscribe to receive updates from this data provider that are relevant to the provided selector
 * @param selector tells the provider what data this listener is listening for
 * @param callback function to run with the updated data for this selector
 * @param options various options to adjust how the subscriber emits updates
 * @returns unsubscriber to stop listening for updates
 */
export type DataProviderSubscriber<TSelector, TGetData> = (
  selector: TSelector,
  callback: PEventHandler<TGetData>,
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
   * Set a subset of data according to the selector
   * @param selector tells the provider what subset of data is being set
   * @param data the data that determines what to set at the selector
   * @returns true if successfully set (will send updates), false otherwise (will not send updates)
   */
  set: (selector: TSelector, data: TSetData) => Promise<boolean>;
  /**
   * Get a subset of data from the provider according to the selector
   * @param selector tells the provider what subset of data to get
   * @returns the subset of data represented by the selector
   */
  get: (selector: TSelector) => Promise<TGetData>;
  /**
   * Subscribe to receive updates from this data provider that are relevant to the provided selector
   * @param selector tells the provider what data this listener is listening for
   * @param callback function to run with the updated data for this selector
   * @returns unsubscriber to stop listening for updates
   */
  subscribe: DataProviderSubscriber<TSelector, TGetData>;
}

export default IDataProvider;
