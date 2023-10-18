import dataProviderService from '@shared/services/data-provider.service';
import IDataProvider from '@shared/models/data-provider.interface';
import createUseNetworkObjectHook from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';

/**
 * Gets a data provider with specified provider name
 * @param dataProviderSource string name of the data provider to get OR dataProvider (result of
 *  useDataProvider, if you want this hook to just return the data provider again)
 * @returns undefined if the data provider has not been retrieved,
 *  data provider if it has been retrieved and is not disposed,
 *  and undefined again if the data provider is disposed
 *
 * @type `T` - the type of data provider to return. Use `IDataProvider<TDataProviderDataTypes>`,
 *  specifying your own types, or provide a custom data provider type
 */
const useDataProvider = createUseNetworkObjectHook(dataProviderService.get) as <
  // We don't know what type the data provider serves
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends IDataProvider<any>,
>(
  dataProviderSource: string | T | undefined,
) => T | undefined;

export default useDataProvider;
