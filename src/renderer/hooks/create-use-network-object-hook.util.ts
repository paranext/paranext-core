import { NetworkObject } from '@shared/models/network-object.model';
import { useMemo, useState, useCallback } from 'react';
import { isString } from '@shared/utils/util';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';

function createUseNetworkObjectHook(
  getNetworkObject: (id: string) => Promise<NetworkObject<object> | undefined>,
): (
  networkObjectSource: string | NetworkObject<object> | undefined,
) => NetworkObject<object> | undefined {
  return function useNetworkObject(
    networkObjectSource: string | NetworkObject<object> | undefined,
  ): NetworkObject<object> | undefined {
    // Check to see if they passed in the results of a useDataProvider hook or undefined
    const didReceiveDataProvider = !isString(networkObjectSource);

    // Get the data provider for this data provider name
    // Note: do nothing if we already  a data provider, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [dataProvider] = usePromise(
      useMemo(() => {
        return didReceiveDataProvider
          ? // We already have a data provider or undefined, so we don't need to run this promise
            undefined
          : async () =>
              // We have the data provider's type, so we need to get the provider
              networkObjectSource ? getNetworkObject(networkObjectSource) : undefined;
      }, [didReceiveDataProvider, networkObjectSource]),
      undefined,
    );

    // Disable this hook when the data provider is disposed
    // Note: do nothing if we already received a data provider, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [isDisposed, setIsDisposed] = useState<boolean>(false);
    useEvent(
      !didReceiveDataProvider && dataProvider && !isDisposed
        ? dataProvider.onDidDispose
        : undefined,
      useCallback(() => setIsDisposed(true), []),
    );

    // If we received a data provider or undefined, return it
    if (didReceiveDataProvider) return networkObjectSource;

    // If we had to get a data provider, return it if it is not disposed
    return dataProvider && !isDisposed ? dataProvider : undefined;
  };
}

export default createUseNetworkObjectHook;
