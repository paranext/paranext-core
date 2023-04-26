import IDataProvider from '@shared/models/data-provider.interface';
import { IDispose, IOnDidDispose } from './disposal.model';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObject
export type DataProvider<TSelector, TGetData, TSetData> = IOnDidDispose &
  IDataProvider<TSelector, TGetData, TSetData>;

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObject
export type DisposableDataProvider<TSelector, TGetData, TSetData> = IDispose &
  DataProvider<TSelector, TGetData, TSetData>;
