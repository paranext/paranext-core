import IDataProviderEngine from '@shared/models/data-provider-engine.model';
import IDataProvider, { IDisposableDataProvider } from '@shared/models/data-provider.interface';
import DataProviderInternal from '@shared/models/data-provider.model';

/**
 * Get the `DataProviderDataTypes` associated with the `IDataProvider` - essentially, returns
 * `TDataTypes` from `IDataProvider<TDataTypes>`.
 *
 * Works with generic types `IDataProvider`, `DataProviderInternal`, `IDisposableDataProvider`, and
 * `IDataProviderEngine` along with the `papi-shared-types` extensible interfaces `DataProviders`
 * and `DisposableDataProviders`
 */
type ExtractDataProviderDataTypes<TDataProvider> =
  TDataProvider extends IDataProvider<infer TDataProviderDataTypes>
    ? TDataProviderDataTypes
    : TDataProvider extends DataProviderInternal<infer TDataProviderDataTypes>
      ? TDataProviderDataTypes
      : TDataProvider extends IDisposableDataProvider<infer TDataProviderDataTypes>
        ? TDataProviderDataTypes
        : TDataProvider extends IDataProviderEngine<infer TDataProviderDataTypes>
          ? TDataProviderDataTypes
          : never;

export default ExtractDataProviderDataTypes;
