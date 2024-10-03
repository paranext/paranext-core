import { NetworkObject } from '@shared/models/network-object.model';
import { useMemo, useState, useCallback } from 'react';
import { isString } from 'platform-bible-utils';
import { usePromise, useEvent } from 'platform-bible-react';

/**
 * Takes the parameters passed into the hook and returns the `networkObjectSource` associated with
 * those parameters. This default implementation simply returns the first argument assuming it is
 * the `networkObjectSource`.
 *
 * @param networkObjectSource String name of the network object to get OR `networkObject` (result of
 *   this hook, if you want this hook to just return the network object again)
 * @returns `networkObjectSource` for getting the network object
 */
function mapParametersToNetworkObjectSourceDefault(
  networkObjectSource: string | NetworkObject<object> | undefined,
) {
  return networkObjectSource;
}

/**
 * This function takes in a getNetworkObject function and creates a hook with that function in it
 * which will return a network object
 *
 * @param getNetworkObject A function that takes in an id string and returns a network object
 * @param mapParametersToNetworkObjectSource Function that takes the parameters passed into the hook
 *   and returns the `networkObjectSource` associated with those parameters. Defaults to taking the
 *   first parameter passed into the hook and using that as the `networkObjectSource`.
 *
 *   - Note: `networkObjectSource` is string name of the network object to get OR `networkObject`
 *       (result of this hook, if you want this hook to just return the network object again)
 *
 * @returns A function that takes in a networkObjectSource and returns a NetworkObject
 */
function createUseNetworkObjectHook<THookParams extends unknown[]>(
  getNetworkObject: (...args: THookParams) => Promise<NetworkObject<object> | undefined>,
  mapParametersToNetworkObjectSource?: (
    ...args: THookParams
  ) => string | NetworkObject<object> | undefined,
): (...args: THookParams) => NetworkObject<object> | undefined {
  return function useNetworkObject(...args: THookParams): NetworkObject<object> | undefined {
    const mapParameters =
      mapParametersToNetworkObjectSource ||
      // We don't use the spread args because we don't need them. And TS is having a fit that this
      // default function doesn't literally use `unknown[]`
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (mapParametersToNetworkObjectSourceDefault as NonNullable<
        typeof mapParametersToNetworkObjectSource
      >);

    const networkObjectSource = mapParameters(...args);

    // Check to see if they passed in the results of a useNetworkObject hook or undefined
    const didReceiveNetworkObject = !isString(networkObjectSource);

    // Get the network object for this network object name
    // Note: do nothing if we already have a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [networkObject] = usePromise(
      useMemo(() => {
        return didReceiveNetworkObject
          ? // We already have a network object or undefined, so we don't need to run this promise
            undefined
          : async () =>
              // We have the network object's type, so we need to get the provider
              networkObjectSource ? getNetworkObject(...args) : undefined;
        // We need to spread `args` in here since we don't know how many members it has. Be VERY
        // CAREFUL when editing this `usePromise` since we don't have dependency checking on
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [didReceiveNetworkObject, networkObjectSource, ...args]),
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
