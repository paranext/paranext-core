import dataProviderService from '@shared/services/data-provider.service';
import createUseNetworkObjectHook from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';
import { DataProviderNames, DataProviders } from 'papi-shared-types';
import IDataProvider from '@shared/models/data-provider.interface';

/**
 * Gets a data provider with specified provider name
 *
 * @type `T` - The type of data provider to return. Use `IDataProvider<TDataProviderDataTypes>`,
 *   specifying your own types, or provide a custom data provider type
 * @param dataProviderSource String name of the data provider to get OR dataProvider (result of
 *   useDataProvider, if you want this hook to just return the data provider again)
 * @returns Undefined if the data provider has not been retrieved, data provider if it has been
 *   retrieved and is not disposed, and undefined again if the data provider is disposed
 */

// Assert to the specific data provider types for this hook
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const useDataProvider = createUseNetworkObjectHook(
  // Type assert to more general function signature because the hook wants it to be more general.
  // This is fine in this case since we're also casting the hook itself to the correct specific type
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  dataProviderService.get as (providerName: string) => Promise<IDataProvider | undefined>,
) as <DataProviderName extends DataProviderNames>(
  dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
) => DataProviders[DataProviderName] | undefined;

export default useDataProvider;
