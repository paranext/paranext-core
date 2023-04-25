import IDataProvider from '@shared/models/data-provider.interface';
import { IDispose, IOnDidDispose } from './disposal-interface';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObject
export type DataProviderInfo<TSelector, TGetData, TSetData> = IOnDidDispose &
  IDataProvider<TSelector, TGetData, TSetData>;

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObject
export type DisposableDataProviderInfo<TSelector, TGetData, TSetData> = IDispose &
  DataProviderInfo<TSelector, TGetData, TSetData>;
