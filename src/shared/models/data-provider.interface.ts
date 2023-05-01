import DataProviderInternal from '@shared/models/data-provider.model';
import { DisposableNetworkObject, NetworkObject, NetworkableObject } from './network-object.model';
import { CanHaveOnDidDispose } from './disposal.model';

/**
 * An object on the papi that manages data and has methods for interacting with that data.
 * Created by the papi and layers over an IDataProviderEngine provided by an extension.
 * Returned from getting a data provider with dataProviderService.get.
 * @type `TSelector` - the type of selector used to get some data from this provider.
 *  A selector is an object a caller provides to the data provider to tell the provider what subset of data it wants.
 *  Note: A selector must be stringifiable.
 * @type `TGetData` - the type of data provided by this data provider when you run `get` based on a provided selector
 * @type `TSetData` - the type of data ingested by this data provider when you run `set` based on a provided selector
 */
// Basically a layer over NetworkObject
interface IDataProvider<TSelector, TGetData, TSetData>
  extends NetworkObject<NetworkableObject>,
    CanHaveOnDidDispose<DataProviderInternal<TSelector, TGetData, TSetData>> {}

export default IDataProvider;

/**
 * A data provider that has control over disposing of it with dispose.
 * Returned from registering a data provider (only the service that set it up should dispose of it)
 * with dataProviderService.registerEngine
 *
 * @see IDataProvider
 */
// Basically a layer over DisposableNetworkObject
export interface IDisposableDataProvider<TSelector, TGetData, TSetData>
  extends DisposableNetworkObject<NetworkableObject>,
    // Need to omit dispose here because it is optional on IDataProvider but is required on DisposableNetworkObject
    Omit<IDataProvider<TSelector, TGetData, TSetData>, 'dispose'> {}
