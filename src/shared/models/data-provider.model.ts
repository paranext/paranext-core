import IDataProvider from '@shared/models/data-provider.interface';
import { DisposableNetworkObject, NetworkObject, NetworkableObject } from './network-object.model';
import { CanHaveOnDidDispose } from './disposal.model';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObject
export interface DataProvider<TSelector, TGetData, TSetData>
  extends NetworkObject<NetworkableObject>,
    CanHaveOnDidDispose<IDataProvider<TSelector, TGetData, TSetData>> {}

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObject
export interface DisposableDataProvider<TSelector, TGetData, TSetData>
  extends DisposableNetworkObject<NetworkableObject>,
    // Need to omit dispose here because it is optional on DataProvider but is required on DisposableNetworkObject
    Omit<DataProvider<TSelector, TGetData, TSetData>, 'dispose'> {}
