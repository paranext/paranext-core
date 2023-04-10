import IDataProvider from '@shared/models/IDataProvider';
import dataProviderService from '@shared/services/DataProviderService';
import { useCallback, useMemo, useState } from 'react';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import { isString } from '@shared/util/Util';

/**
 * Gets a data provider with specified data type
 * @param dataType string data type to get data provider for
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
  dataType: string | [T | undefined, boolean] | undefined,
): [T | undefined, boolean] {
  // Check to see if they passed in the results of a useDataProvider hook or undefined
  const didReceiveDataProvider = !isString(dataType);

  // Get the data provider info for this data type
  // Note: do nothing if we received a data provider, but still run this hook. We must make sure to run the same number of hooks in all code paths)
  const [dataProviderInfo] = usePromise(
    useMemo(() => {
      return didReceiveDataProvider
        ? // If we already have a data provider or undefined, we don't need to run this promise
          undefined
        : async () =>
            // Type assert here - the user of this hook must make sure to provide the correct type
            dataType ? dataProviderService.get(dataType) : undefined;
    }, [didReceiveDataProvider, dataType]),
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
    didReceiveDataProvider && dataType
      ? dataType
      : // Type assert dataType to undefined because we know it is not a string
        [dataType as undefined, isDisposed];

  return didReceiveDataProvider
    ? dataProviderReceived
    : [dataProviderInfo?.dataProvider as T | undefined, isDisposed];
}

export default useDataProvider;
