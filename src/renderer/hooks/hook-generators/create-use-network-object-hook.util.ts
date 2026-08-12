import { NetworkObject, NetworkObjectDetails } from '@shared/models/network-object.model';
import { useMemo, useState, useCallback } from 'react';
import { isString } from 'platform-bible-utils';
import { usePromise, useEvent } from 'platform-bible-react';
import { onDidCreateNetworkObject } from '@shared/services/network-object.service';

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
export function createUseNetworkObjectHook<THookParams extends unknown[]>(
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

    // The network object this hook was handed that has since been disposed, if any. Objects are
    // looked up by name, and the process answering a name can be replaced under it —
    // `platform.restartExtensionHost` tears down every data provider the extension host registered
    // and the replacement process registers the same names — so a disposal is a reason to look the
    // name up again rather than to give up on it. Held as the object itself rather than a flag so
    // the answer to "is what we are holding dead?" survives the lookup that follows it: `usePromise`
    // keeps serving the value it has while the next one resolves.
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [disposedNetworkObject, setDisposedNetworkObject] = useState<
      NetworkObject<object> | undefined
    >(undefined);

    // Bumped to ask for another look at the name. The disposal of what this hook was holding is not
    // the last moment the answer can change: a registration outlives the process that made it until
    // the connection teardown is noticed, so the disposal announcement lands after the object is
    // already unreachable, and whatever answers the name next may not have registered yet when the
    // lookup a disposal triggers runs.
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    const [lookupAttempt, setLookupAttempt] = useState(0);

    // Get the network object for this network object name
    // Note: do nothing if we already have a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    // We need to spread `args` in here since we don't know how many members it has, which is
    // something the dependency rule cannot check either way — so it is off for this call and you
    // must be VERY CAREFUL when editing this `usePromise`.
    /* eslint-disable react-hooks/exhaustive-deps */
    const [networkObject] = usePromise(
      useMemo(() => {
        return didReceiveNetworkObject
          ? // We already have a network object or undefined, so we don't need to run this promise
            undefined
          : async () =>
              // We have the network object's type, so we need to get the provider
              networkObjectSource ? getNetworkObject(...args) : undefined;
      }, [
        didReceiveNetworkObject,
        networkObjectSource,
        disposedNetworkObject,
        lookupAttempt,
        ...args,
      ]),
      undefined,
    );
    /* eslint-enable react-hooks/exhaustive-deps */

    // `!!disposedNetworkObject` is what keeps the first render — where both are `undefined` and so
    // trivially equal — from reading as "the object we are holding is dead" before this hook has
    // held anything.
    const isNetworkObjectDisposed =
      !!disposedNetworkObject && networkObject === disposedNetworkObject;

    /** Whether this hook has nothing it can hand back: it found nothing, or what it found is dead */
    const isServingNothing = !networkObject || isNetworkObjectDisposed;

    // Look the network object up again when the one we are serving is disposed
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    useEvent(
      !didReceiveNetworkObject && networkObject && !isNetworkObjectDisposed
        ? networkObject.onDidDispose
        : undefined,
      useCallback(() => setDisposedNetworkObject(networkObject), [networkObject]),
    );

    // A disposal drives exactly one re-lookup. If that lookup lands in the gap before anything has
    // registered under the name again — or fails outright — nothing else would ever change a
    // dependency above, and the component would serve nothing for the rest of its life over a gap
    // that closed a second later. So while this hook is holding nothing after a disposal, listen for
    // something being published under the name it wants and look again when it is.
    //
    // Only armed after a disposal: before that, every network object the app creates at startup
    // would trigger a fresh lookup for a name whose first lookup is still in flight. Objects whose
    // name is not what the hook was asked for (a project data provider is looked up by project id,
    // not by the id its network object is registered under) fall back to the single re-lookup.
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    useEvent(
      !didReceiveNetworkObject && !!disposedNetworkObject && isServingNothing
        ? onDidCreateNetworkObject
        : undefined,
      useCallback(
        (networkObjectDetails: NetworkObjectDetails) => {
          if (networkObjectDetails.id === networkObjectSource)
            setLookupAttempt((previousAttempt) => previousAttempt + 1);
        },
        [networkObjectSource],
      ),
    );

    // If we received a network object or undefined, return it
    if (didReceiveNetworkObject) return networkObjectSource;

    // If we had to get a network object, return it if it is not disposed
    return networkObject && !isNetworkObjectDisposed ? networkObject : undefined;
  };
}

export default createUseNetworkObjectHook;
