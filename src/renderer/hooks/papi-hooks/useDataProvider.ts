import IDataProvider from '@shared/models/IDataProvider';
import dataProviderService from '@shared/services/DataProviderService';
import { useCallback, useMemo, useState } from 'react';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import { isString } from '@shared/util/Util';

/**
 * Gets a data provider with specified data type
 * @param dataProviderSource string data type to get data provider for OR [dataProvider, isDisposed] result of useDataProvider if you
 * want this hook to just return the data provider again
 * @returns [dataProvider, isDisposed]
 *  - `dataProvider`: data provider if it has been retrieved, undefined otherwise
 *  - `isDisposed`: whether the data provider is disposed and is no longer available
 *
 * @type `T` - the type of data provider to return. Use `IDataProvider<TSelector, TGetData, TSetData>`,
 *  specifying your own types, or provide a custom data provider type
 */
// User of this hook must provide types. Cannot use `unknown` here unfortunately because TypeScript thinks we want
// the implementing IDataProvider types to be unknown as well
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProvider<T extends IDataProvider<any, any, any>>(
  dataType: string | undefined,
): [T | undefined, boolean];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProvider<T extends IDataProvider<any, any, any>>(
  dataProvider: [T | undefined, boolean] | undefined,
): [T | undefined, boolean];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProvider<T extends IDataProvider<any, any, any>>(
  dataProviderSource: string | [T | undefined, boolean] | undefined,
): [T | undefined, boolean];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProvider<T extends IDataProvider<any, any, any>>(
  dataProviderSource: string | [T | undefined, boolean] | undefined,
): [T | undefined, boolean] {
  // Check to see if they passed in the results of a useDataProvider hook or undefined
  const didReceiveDataProvider = !isString(dataProviderSource);

  // Get the data provider info for this data type
  // Note: do nothing if we received a data provider, but still run this hook. We must make sure to run the same number of hooks in all code paths)
  const [dataProviderInfo] = usePromise(
    useMemo(() => {
      return didReceiveDataProvider
        ? // We already have a data provider or undefined, so we don't need to run this promise
          undefined
        : async () =>
            // We have the data provider's type, so we need to get the provider
            dataProviderSource
              ? dataProviderService.get(dataProviderSource)
              : undefined;
    }, [didReceiveDataProvider, dataProviderSource]),
    undefined,
  );

  // Disable this hook when the data provider is disposed
  // Note: do nothing if we received a data provider, but still run this hook. We must make sure to run the same number of hooks in all code paths)
  const [isDisposed, setIsDisposed] = useState<boolean>(false);
  useEvent(
    !didReceiveDataProvider && dataProviderInfo && !isDisposed
      ? dataProviderInfo.onDidDispose
      : undefined,
    useCallback(() => setIsDisposed(true), []),
  );

  // Get the data provider that was provided or make an array to return for undefined
  const dataProviderReceived: [T | undefined, boolean] =
    didReceiveDataProvider && dataProviderSource
      ? // We actually received a data provider, so just return it
        dataProviderSource
      : // Type assert dataType to undefined because we know it is not a string because didReceiveDataProvider is true
        [dataProviderSource as undefined, isDisposed];

  return didReceiveDataProvider
    ? dataProviderReceived
    : // Type assert here - the user of this hook must make sure to provide the correct type
      [dataProviderInfo?.dataProvider as T | undefined, isDisposed];
}

export default useDataProvider;
