import { NetworkObject } from '@shared/models/network-object.model';
import { useMemo, useState, useCallback } from 'react';
import { isString } from '@shared/utils/util';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';

/**
 * This function takes in a getNetworkObject function and creates a hook with that function in it
 * which will return a network object
 * @param getNetworkObject A function that takes in an id string and returns a network object
 * @returns a function that takes in a networkObjectSource and returns a NetworkObject
 */
function createUseNetworkObjectHook(
  getNetworkObject: (id: string) => Promise<NetworkObject<object> | undefined>,
): (
  networkObjectSource: string | NetworkObject<object> | undefined,
) => NetworkObject<object> | undefined {
  return function useNetworkObject(
    networkObjectSource: string | NetworkObject<object> | undefined,
  ): NetworkObject<object> | undefined {
    // Check to see if they passed in the results of a useNetworkObject hook or undefined
    const didReceiveNetworkObject = !isString(networkObjectSource);

    // Get the network object for this network object name
    // Note: do nothing if we already  a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [networkObject] = usePromise(
      useMemo(() => {
        return didReceiveNetworkObject
          ? // We already have a network object or undefined, so we don't need to run this promise
            undefined
          : async () =>
              // We have the network object's type, so we need to get the provider
              networkObjectSource ? getNetworkObject(networkObjectSource) : undefined;
      }, [didReceiveNetworkObject, networkObjectSource]),
      undefined,
    );

    // Disable this hook when the network object is disposed
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [isDisposed, setIsDisposed] = useState<boolean>(false);
    useEvent(
      !didReceiveNetworkObject && networkObject && !isDisposed
        ? networkObject.onDidDispose
        : undefined,
      useCallback(() => setIsDisposed(true), []),
    );

    // If we received a network object or undefined, return it
    if (didReceiveNetworkObject) return networkObjectSource;

    // If we had to get a network object, return it if it is not disposed
    return networkObject && !isDisposed ? networkObject : undefined;
  };
}

export default createUseNetworkObjectHook;
