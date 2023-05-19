import {
  DataProviderDataTypes,
  DataProviderGetters,
  DataProviderSetters,
} from '@shared/models/data-provider.model';
import { NetworkableObject } from '@shared/models/network-object.model';

/**
 * The object to register with the DataProviderService to create a data provider.
 * The DataProviderService creates an IDataProvider on the papi that layers over this engine, providing special functionality
 *
 * Note: methods on objects that implement this interface must be unbound functions, not arrow functions.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
 * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
 */
type IDataProviderEngine<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  NetworkableObject &
    /**
     * Set a subset of data according to the selector.
     * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `set` method in the DataProviderEngine.
     *
     * Note: you could consider this data provider to be read-only if this method is not provided.
     *
     * WARNING: Do not run this recursively in its own `set` method! It will create as many updates as you run `set` methods.
     * @param selector tells the provider what subset of data is being set
     * @param data the data that determines what to set at the selector
     * @returns true if successfully set (will send updates), false otherwise (will not send updates)
     */
    DataProviderSetters<TDataTypes> &
    /**
     * Get a subset of data from the provider according to the selector.
     * Run by the data provider on get
     * @param selector tells the provider what subset of data to get
     * @returns the subset of data represented by the selector
     */
    DataProviderGetters<TDataTypes> & {
      /**
       * Method to run to send clients updates outside of the `set` method.
       * papi overwrites this function on the DataProviderEngine itself to emit an update after running the defined `notifyUpdate` method in the DataProviderEngine.
       *
       * WARNING: Never run this in the `get` method! It will create a destructive infinite loop.
       *
       * @returns true if we should send updates, false otherwise (will not send updates). Same return as `set`
       */
      notifyUpdate?(): boolean;
    };

export default IDataProviderEngine;
