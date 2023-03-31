import { DataProviderSubscriberOptions } from '@shared/models/IDataProvider';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import useEventAsync from '@renderer/hooks/papi-hooks/useEventAsync';
import useEvent from '@renderer/hooks/papi-hooks/useEvent';
import { useCallback, useMemo, useState } from 'react';
import dataProviderService from '@shared/services/DataProviderService';
import { PEventAsync, PEventHandler } from '@shared/models/PEvent';

/**
 * Subscribes to run a callback on a data provider's data with specified selector
 * @param dataType data type to get data provider for
 * @param selector tells the provider what data this listener is listening for
 * @param defaultValue the initial value to return while first awaiting the data
 *
 *    WARNING: MUST BE WRAPPED IN A useState, useMemo, etc. The reference must not be updated every render
 * @param subscriberOptions various options to adjust how the subscriber emits updates
 *
 *    WARNING: MUST BE WRAPPED IN A useState, useMemo, etc. The reference must not be updated every render
 * @returns [data, setData, isLoading]
 *  - `data`: the current value for the data from the data provider with the specified selector, either the defaultValue or the resolved data
 *  - `setData`: asynchronous function to request that the data provider update the data at this selector. Returns true if successful.
 *    Note that this function does not update the data. The data provider sends out an update to this subscription if it successfully updates data.
 *  - `isLoading`: whether the data with the selector is awaiting retrieval from the data provider
 */
function useData<TSelector, TData>(
  dataType: string,
  selector: TSelector,
  defaultValue: TData,
  subscriberOptions?: DataProviderSubscriberOptions,
): [TData, ((newData: TData) => Promise<boolean>) | undefined, boolean] {
  // The data from the data provider at this selector
  const [data, setDataInternal] = useState<TData>(defaultValue);

  // Get the data provider info for this data type
  const [dataProviderInfo] = usePromise(
    useCallback(
      async () => dataProviderService.get<TSelector, TData>(dataType),
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

  // Indicates if the data with the selector is awaiting retrieval from the data provider
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Wrap subscribe so we can call it as a normal PEvent in useEvent
  const wrappedSubscribeEvent: PEventAsync<TData> | undefined = useMemo(
    () =>
      dataProviderInfo && !isDisposed
        ? async (eventCallback: PEventHandler<TData>) => {
            const unsub = await dataProviderInfo.dataProvider.subscribe(
              selector,
              (subscriptionData) => {
                eventCallback(subscriptionData);
                // When we receive updated data, mark that we are not loading
                setIsLoading(false);
              },
              subscriberOptions,
            );

            return async () => {
              // When we change data type or selector, mark that we are loading
              setIsLoading(true);
              return unsub();
            };
          }
        : undefined,
    [dataProviderInfo, selector, subscriberOptions, isDisposed],
  );

  // Subscribe to the data provider
  useEventAsync(wrappedSubscribeEvent, setDataInternal);

  // TODO: cache latest setStateAction and fire until we have dataProviderInfo instead of having setData be undefined until we have dataProviderInfo?
  /** Send an update to the backend to update the data. Let the update handle actually updating our data here */
  const setData = useMemo(
    () =>
      dataProviderInfo && !isDisposed
        ? async (newData: TData) =>
            dataProviderInfo.dataProvider.set(selector, newData)
        : undefined,
    [dataProviderInfo, selector, isDisposed],
  );

  return [data, setData, isLoading];
}

export default useData;
