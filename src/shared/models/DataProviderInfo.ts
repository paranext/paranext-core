import IDataProvider from '@shared/models/IDataProvider';
import { PEvent } from '@shared/models/PEvent';
import { UnsubscriberAsync } from '@shared/util/PapiUtil';

/**
 * Information about a data provider.
 * Returned from getting a data provider.
 */
// Basically a layer over NetworkObjectInfo
export type DataProviderInfo<TSelector, TGetData, TSetData> = {
  dataProvider: IDataProvider<TSelector, TGetData, TSetData>;
  /** Event that emits when this data provider is being disposed */
  onDidDispose: PEvent<void>;
};

/**
 * Information about a data provider including control over disposing of it.
 * Returned from registering a data provider (only the process that set it up should dispose of it)
 */
// Basically a layer over DisposableNetworkObjectInfo
export type DisposableDataProviderInfo<TSelector, TGetData, TSetData> =
  DataProviderInfo<TSelector, TGetData, TSetData> & {
    /** Unsubscriber to call to remove this data provider from the network */
    dispose: UnsubscriberAsync;
  };
