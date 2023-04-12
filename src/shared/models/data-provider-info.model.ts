import IDataProvider from '@shared/models/data-provider.interface';
import { PapiEvent } from '@shared/models/papi-event.model';
import { UnsubscriberAsync } from '@shared/utils/papi-util';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObjectInfo
export type DataProviderInfo<TSelector, TGetData, TSetData> = {
  dataProvider: IDataProvider<TSelector, TGetData, TSetData>;
  /** Event that emits when this data provider is being disposed */
  onDidDispose: PapiEvent<void>;
};

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObjectInfo
export type DisposableDataProviderInfo<TSelector, TGetData, TSetData> = DataProviderInfo<
  TSelector,
  TGetData,
  TSetData
> & {
  /** Unsubscriber to call to remove this data provider from the network */
  dispose: UnsubscriberAsync;
};
