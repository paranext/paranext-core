import { createUseNetworkObjectHook } from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';
import { IDataProvider } from '@shared/models/data-provider.interface';
import {
  dataProviderService,
  getDataProviderObjectId,
} from '@shared/services/data-provider.service';
import { DataProviderNames, DataProviders } from 'papi-shared-types';

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
  undefined,
  // This hook is handed a provider NAME; the provider is registered on the network under the id
  // derived from that name. This is the hook that most needs the re-lookup to work:
  // `networkObjectService.get` does not wait for an object that is not there yet, so the one lookup
  // a disposal drives is the whole safety net, and it lands in the gap whenever the process taking
  // the provider over has not re-registered it yet.
  (networkObjectDetails, providerName) =>
    networkObjectDetails.id === getDataProviderObjectId(providerName),
) as <DataProviderName extends DataProviderNames>(
  dataProviderSource: DataProviderName | DataProviders[DataProviderName] | undefined,
) => DataProviders[DataProviderName] | undefined;

export default useDataProvider;
