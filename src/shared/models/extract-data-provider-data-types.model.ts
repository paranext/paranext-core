import { IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { IDataProvider, IDisposableDataProvider } from '@shared/models/data-provider.interface';
import { DataProviderInternal } from '@shared/models/data-provider.model';

/**
 * Get the `DataProviderDataTypes` associated with the `IDataProvider` - essentially, returns
 * `TDataTypes` from `IDataProvider<TDataTypes>`.
 *
 * Works with generic types `IDataProvider`, `DataProviderInternal`, `IDisposableDataProvider`, and
 * `IDataProviderEngine` along with the `papi-shared-types` extensible interfaces `DataProviders`
 * and `DisposableDataProviders`.
 *
 * A data provider with no data types at all - a `projectInterface` made only of non-data methods,
 * such as `platform.extensionDataEnumeration` - resolves to `{}`. The `infer` branches cannot
 * recover `{}` on their own: the `get*`/`set*`/`subscribe*` mapped types over no keys simplify
 * away, leaving nothing to infer from, so without the explicit branch the result would be `never`,
 * which in a mapped type over its keys means _every_ key rather than none.
 */
export type ExtractDataProviderDataTypes<TDataProvider> =
  TDataProvider extends IDataProvider<infer TDataProviderDataTypes>
    ? TDataProviderDataTypes
    : TDataProvider extends DataProviderInternal<infer TDataProviderDataTypes>
      ? TDataProviderDataTypes
      : TDataProvider extends IDisposableDataProvider<infer TDataProviderDataTypes>
        ? TDataProviderDataTypes
        : TDataProvider extends IDataProviderEngine<infer TDataProviderDataTypes>
          ? TDataProviderDataTypes
          : TDataProvider extends IDataProvider<{}>
            ? {}
            : never;

export default ExtractDataProviderDataTypes;
