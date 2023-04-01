/** Update information for a listener indicating whether or not an update should be sent and what the update data is */
export type DataProviderListenerUpdate<TData> =
  | {
      /** An update should be sent to this listener */
      shouldUpdate: true;
      /** The data to send to the listener in this update */
      data: TData;
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
 * The object to register with the DataProviderService to create a data provider.
 * The DataProviderService creates a IDataProvider on the papi that layers over this engine, providing special functionality
 *
 * Note: methods on objects that implement this interface must be unbound functions, not arrow functions.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
 * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
 */
interface IDataProviderEngine<TSelector, TGetData, TSetData> {
  /**
   * Method to run to send clients updates outside of the `set` method.
   * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `forceUpdate` method in the DataProviderEngine.
   *
   * WARNING: Never run this in the `get` method! It will create a destructive infinite loop.
   */
  forceUpdate?: () => void;
  /**
   * Set a subset of data according to the selector.
   * Run by the data provider on set
   * @param selector tells the provider what subset of data is being set
   * @param data the data that determines what to set at the selector
   * @returns true if successfully set (will send updates), false otherwise (will not send updates)
   */
  set: (selector: TSelector, data: TSetData) => Promise<boolean>;
  /**
   * Get a subset of data from the provider according to the selector.
   * Run by the data provider on get
   * @param selector tells the provider what subset of data to get
   * @returns the subset of data represented by the selector
   */
  get: (selector: TSelector) => Promise<TGetData>;
  /**
   * Generates data updates for each listener based on what was updated and what listeners are listening for.
   * Run by the data provider on set if the data was updated
   * @param setSelector selector for the set operation that caused an update - represents what changed for this update
   * @param listenerSelectors array of the selector for each listener subscribed to this data provider - represents what each listener is listening for
   * @returns array of update information for each listener including whether or not an update should be sent to that listener and what that update data is.
   *   Each index in this array should correspond to the same index in the listenerSelectors array
   */
  generateUpdates: (
    setSelector: TSelector,
    listenerSelectors: TSelector[],
  ) => Promise<DataProviderListenerUpdate<TGetData>[]>;
}

export default IDataProviderEngine;
