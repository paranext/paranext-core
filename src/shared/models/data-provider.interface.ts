import {
  DataProviderDataTypes,
  DataProviderGetters,
  DataProviderSetters,
  DataProviderSubscribers,
} from '@shared/models/data-provider.model';
import { Dispose, OnDidDispose } from './disposal.model';

/**
 * An object on the papi that manages data and has methods for interacting with that data. Created
 * by the papi and layers over an IDataProviderEngine provided by an extension. Returned from
 * getting a data provider with dataProviderService.get.
 *
 * Note: each `set<data_type>` method has a corresponding `get<data_type>` and
 * `subscribe<data_type>` method.
 */
// Basically a layer over NetworkObject from DataProviderInternal.
// Used to be `NetworkObject<DataProviderInternal<TDataTypes>>`, but it had problems with `infer`
// See https://github.com/paranext/paranext-core/issues/318#issuecomment-1791317605 for more info
type IDataProvider<TDataTypes extends DataProviderDataTypes = DataProviderDataTypes> =
  DataProviderSetters<TDataTypes> &
    DataProviderGetters<TDataTypes> &
    DataProviderSubscribers<TDataTypes> &
    OnDidDispose;

export default IDataProvider;

/**
 * A data provider that has control over disposing of it with dispose. Returned from registering a
 * data provider (only the service that set it up should dispose of it) with
 * dataProviderService.registerEngine
 *
 * @see IDataProvider
 */
// Basically a layer over DisposableNetworkObject
// Used to be `DisposableNetworkObject<Omit<IDataProvider<TDataTypes>, 'dispose'>>`, , but it had
// problems with `infer`. See https://github.com/paranext/paranext-core/issues/318#issuecomment-1791317605
// for more info
// Seems TypeScript doesn't like using a generic string to index DataProviderDataTypes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IDisposableDataProvider<TDataProvider extends IDataProvider<any>> = TDataProvider &
  Dispose;
