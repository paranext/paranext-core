import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Subscribe to receive updates from this data provider that are relevant to the provided selector
 * @param selector tells the provider what data this listener is listening for
 * @param callback function to run with the updated data for this selector
 * @returns unsubscriber to stop listening for updates
 */
export type DataProviderSubscriber<TSelector, TData> = (
  selector: TSelector,
  callback: (data: TData) => void,
) => Promise<UnsubscriberAsync>;

/**
 * An object on the papi that manages data and has methods for interacting with that data.
 * Created by the papi and layers over an IDataProviderEngine provided by an extension.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TData` - the type of data provided by this data provider based on a provided selector
 */
interface IDataProvider<TSelector, TData> {
  /**
   * Set a subset of data according to the selector
   * @param selector tells the provider what subset of data is being set
   * @param data the data to set at the selector
   * @returns true if successfully set (will send updates), false otherwise (will not send updates)
   */
  set: (selector: TSelector, data: TData) => Promise<boolean>;
  /**
   * Get a subset of data from the provider according to the selector
   * @param selector tells the provider what subset of data to get
   * @returns the subset of data represented by the selector
   */
  get: (selector: TSelector) => Promise<TData>;
  /**
   * Subscribe to receive updates from this data provider that are relevant to the provided selector
   * @param selector tells the provider what data this listener is listening for
   * @param callback function to run with the updated data for this selector
   * @returns unsubscriber to stop listening for updates
   */
  subscribe: DataProviderSubscriber<TSelector, TData>;
}

export default IDataProvider;
