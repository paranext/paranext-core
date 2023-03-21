import IDataProvider from '@shared/models/IDataProvider';
import { PEvent } from '@shared/models/PEvent';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */

// Basically a layer over NetworkObjectInfo
export type DataProviderInfo<TData, TSelector> = {
  dataProvider: IDataProvider<TData, TSelector>;
  /** Event that emits when this data provider is being disposed */
  onDidDispose: PEvent<void>;
};

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableDataProviderInfo
export type DisposableDataProviderInfo<TData, TSelector> = DataProviderInfo<
  TData,
  TSelector
> & {
  /** Unsubscriber to call to remove this data provider from the network */
  dispose: UnsubscriberAsync;
};
