import { useEffect, useState } from 'react';
import IDataProvider from '@shared/models/data-provider.interface';
import { isString } from '@shared/utils/util';
import dataProviderService from '@shared/services/data-provider.service';
import logger from '@shared/services/logger.service';

/**
 * Gets an array of data providers based on an array of input sources
 *
 * @type `T` - The types of data providers to return. Use `IDataProvider<TDataProviderDataTypes>`,
 *   specifying your own types, or provide a custom data provider type for each item in the array.
 *   Note that if you provide more than one data type, each item in the returned array will be
 *   considered to be any of those types. For example, if you call `useDataProviderMulti<Type1,
 *   Type2>`, all items in the returned array will be considered to be of type `Type1 | Type2 |
 *   undefined`. Although you can determine the actual type based on the array index, TypeScript
 *   will not know, so you will need to type assert the array items for later type checking to
 *   work.
 * @param dataProviderSources Array containing string names of the data providers to get OR data
 *   providers themselves (i.e., the results of useDataProvider/useDataProviderMulti) if you want
 *   this hook to return the data providers again. It is fine to have a mix of strings and data
 *   providers in the array.
 *
 *   WARNING: THE ARRAY MUST BE STABLE - const or wrapped in useState, useMemo, etc. It must not be
 *   updated every render.
 * @returns An array of data providers that correspond by index to the values in
 *   `dataProviderSources`. Each item in the array will be (a) undefined if the data provider has
 *   not been retrieved or has been disposed, or (b) a data provider if it has been retrieved and is
 *   not disposed.
 */
// We don't know what types the data providers serve
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProviderMulti<T extends IDataProvider<any>[]>(
  dataProviderSources: (string | T[number] | undefined)[],
): (T[number] | undefined)[] {
  type InputType = string | T[number] | undefined;
  type OutputType = T[number] | undefined;

  const [dataProviders, setDataProviders] = useState(() =>
    Array<OutputType>(dataProviderSources.length),
  );

  useEffect(() => {
    async function lookupDataProviders() {
      const dpPromises = dataProviderSources.map(async (source: InputType) => {
        if (!source) return undefined;
        if (!isString(source)) return source;

        const dataProvider = await dataProviderService.get(source);
        if (dataProvider) {
          // TODO: Unsubscribe from onDidDispose
          dataProvider.onDidDispose(() => {
            setDataProviders((latestDataProviders) => {
              const updatedList = Array<OutputType>(latestDataProviders.length);
              latestDataProviders.forEach((dpInArray: OutputType, index: number) => {
                updatedList[index] = dpInArray === dataProvider ? undefined : dpInArray;
              });
              return updatedList;
            });
          });
        }
        return dataProvider;
      });
      try {
        setDataProviders(await Promise.all(dpPromises));
      } catch (error) {
        logger.warn(`Unable to set data providers: ${error}`);
      }
    }
    lookupDataProviders();

    // TODO: Return an unsubscriber from useEffect to enable not running setDataProviders when unmounted
  }, [dataProviderSources]);

  return dataProviders;
}

export default useDataProviderMulti;
