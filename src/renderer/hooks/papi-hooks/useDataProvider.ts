import IDataProvider from '@shared/models/IDataProvider';
import dataProviderService from '@shared/services/DataProviderService';
import { useCallback, useState } from 'react';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';

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
  dataType: string | undefined,
): [T | undefined, boolean] {
  // Get the data provider info for this data type
  const [dataProviderInfo] = usePromise(
    useCallback(
      async () =>
        // Type assert here - the user of this hook must make sure to provide the correct type
        dataType ? dataProviderService.get(dataType) : undefined,
      [dataType],
    ),
    undefined,
  );

  // Disable this hook when the data provider is disposed
  const [isDisposed, setIsDisposed] = useState<boolean>(false);
  useEvent(
    dataProviderInfo && !isDisposed ? dataProviderInfo.onDidDispose : undefined,
    useCallback(() => setIsDisposed(true), []),
  );

  return [dataProviderInfo?.dataProvider as T | undefined, isDisposed];
}

export default useDataProvider;
