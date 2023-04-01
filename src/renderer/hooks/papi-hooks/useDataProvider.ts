import IDataProvider from '@shared/models/IDataProvider';
import dataProviderService from '@shared/services/DataProviderService';
import { useCallback, useState } from 'react';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';

function useDataProvider<TSelector, TGetData, TSetData>(
  dataType: string | undefined,
): [IDataProvider<TSelector, TGetData, TSetData> | undefined, boolean] {
  // Get the data provider info for this data type
  const [dataProviderInfo] = usePromise(
    useCallback(
      async () =>
        dataType
          ? dataProviderService.get<TSelector, TGetData, TSetData>(dataType)
          : undefined,
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

  return [dataProviderInfo?.dataProvider, isDisposed];
}

export default useDataProvider;
