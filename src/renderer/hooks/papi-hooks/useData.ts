import { DataProviderSubscriberOptions } from '@shared/models/IDataProvider';
import usePromise from '@renderer/hooks/papi-hooks/usePromise';
import useEventAsync from '@renderer/hooks/papi-hooks/useEventAsync';
import { useCallback, useMemo } from 'react';
import dataProviderService from '@shared/services/DataProviderService';
import { PEventAsync, PEventHandler } from '@shared/models/PEvent';

/**
 * Subscribes to run a callback on a data provider's data with specified selector
 * @param dataType data type to get data provider for
 * @param selector tells the provider what data this listener is listening for
 * @param callback function to run with the updated data for this selector
 *
 *    WARNING: MUST BE WRAPPED IN A useCallback. The reference must not be updated every render
 * @param subscriberOptions various options to adjust how the subscriber emits updates
 *
 *    WARNING: MUST BE WRAPPED IN A useState, useMemo, etc. The reference must not be updated every render
 * @return TODO:
 */
function useData<TSelector, TData>(
  dataType: string,
  selector: TSelector,
  callback: (data: TData) => void,
  subscriberOptions?: DataProviderSubscriberOptions,
) {
  // TODO: Handle data provider disposal
  // Get the data provider info for this data type
  const [dataProviderInfo] = usePromise(
    useCallback(
      async () => dataProviderService.get<TSelector, TData>(dataType),
      [dataType],
    ),
    undefined,
  );

  // Wrap subscribe so we can call it as a normal PEvent in useEvent
  const wrappedSubscribeEvent: PEventAsync<TData> | undefined = useMemo(
    () =>
      dataProviderInfo
        ? (eventCallback: PEventHandler<TData>) => {
            return dataProviderInfo.dataProvider.subscribe(
              selector,
              eventCallback,
              subscriberOptions,
            );
          }
        : undefined,
    [dataProviderInfo, selector, subscriberOptions],
  );

  // Subscribe to the data provider
  useEventAsync(wrappedSubscribeEvent, callback);
}

export default useData;
