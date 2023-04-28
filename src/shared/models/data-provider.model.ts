import IDataProvider from '@shared/models/data-provider.interface';
import { Dispose, OnDidDispose } from './disposal.model';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObject
export type DataProvider<TSelector, TGetData, TSetData> = OnDidDispose &
  IDataProvider<TSelector, TGetData, TSetData>;

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObject
export type DisposableDataProvider<TSelector, TGetData, TSetData> = Dispose &
  DataProvider<TSelector, TGetData, TSetData>;
