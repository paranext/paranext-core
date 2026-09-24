import { NetworkObject, NetworkObjectDetails } from '@shared/models/network-object.model';
import { useMemo, useState, useCallback } from 'react';
import { getErrorMessage, isString } from 'platform-bible-utils';
import { usePromise, useEvent } from 'platform-bible-react';
import { onDidCreateNetworkObject } from '@shared/services/network-object.service';
import { logger } from '@shared/services/logger.service';

/**
 * A finished lookup paired with the source it answers for, carrying either what was found or why
 * the attempt failed. The failure travels IN the value rather than as a rejected promise, so a
 * failure is always attributable to a source — a rejection leaves nothing to attribute, which makes
 * "failed" indistinguishable from "still in flight" and produces an unclearable loading state.
 */
type NetworkObjectLookup = {
  source: string | NetworkObject<object> | undefined;
  networkObject?: NetworkObject<object>;
  error?: unknown;
};

/**
 * What a network-object hook knows about the object it was asked for.
 *
 * A bare `NetworkObject | undefined` cannot separate "not yet", "there is nothing to ask for", and
 * "asking failed" — so a consumer handed `undefined` cannot tell a window it should wait out from a
 * dead end it should report. It also cannot say that the object on hand answers a source the caller
 * has stopped asking about, which is what lets one project's data be read, and written, under
 * another's id.
 *
 * Deliberately a discriminated union rather than an object of flags, because the object exists in
 * exactly one of these states — see `adr-async-hook-state-shape`. Pass the whole state around; do
 * not split it into a status plus a nullable object, which reintroduces the pairing it forbids.
 */
export type NetworkObjectState<T> =
  /** No source was given, so there is nothing to look up. Not a failure — nothing was asked. */
  | { status: 'noSource' }
  /** A lookup for the CURRENT source is in flight. Whatever was shown before is now stale. */
  | { status: 'loading' }
  /** The object answers the source being asked for right now. The only state that may be acted on. */
  | { status: 'ready'; networkObject: T }
  /**
   * The lookup for the current source finished without a usable object. For a project data provider
   * this most often means the project does not implement the requested `projectInterface`, which no
   * amount of waiting or retrying changes — so report it rather than spinning.
   *
   * Only a change of source re-runs the lookup; nothing else does. A transient failure (for
   * instance the bounded wait inside `getMetadataForProject` timing out on a slow start) therefore
   * persists for as long as the caller keeps asking for the same source, and recovers when it asks
   * for a different one. If a consumer ever needs recovery without that, the fix is an opt-in retry
   * on the hook — see PT-4515 — not a retry affordance built on the assumption that this status is
   * usually transient, because it usually is not.
   */
  | { status: 'unavailable'; error?: unknown };

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
 * Whether a network object that has just been created on the network is one that would change what
 * a hook looking for `networkObjectSource` can serve. The default answer only fits a hook whose
 * source IS the network object's id.
 *
 * @param networkObjectDetails Details of the network object that was just created
 * @param networkObjectSource String name the hook was asked for
 * @returns Whether to look the source up again
 */
function doesCreatedNetworkObjectMatchSourceDefault(
  networkObjectDetails: NetworkObjectDetails,
  networkObjectSource: string,
) {
  return networkObjectDetails.id === networkObjectSource;
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
 * @param doesCreatedNetworkObjectMatchSource Function that decides whether a network object that
 *   was just created on the network means the hook should look its source up again. Defaults to
 *   comparing the new object's id to the `networkObjectSource`.
 *
 *   - MUST be supplied by any caller whose `networkObjectSource` is not literally the id the object is
 *       registered under — a data provider name becomes `{name}-data`, a web view id becomes
 *       `webViewController{id}`, and so on. Left at the default, such a hook's re-lookup listener
 *       compares two strings that can never be equal, so it never fires and the hook is left with
 *       the single re-lookup a disposal drives.
 *
 * @returns A function that takes in a networkObjectSource and returns a NetworkObject
 */
function createUseNetworkObjectCoreHook<THookParams extends unknown[]>(
  getNetworkObject: (...args: THookParams) => Promise<NetworkObject<object> | undefined>,
  mapParametersToNetworkObjectSource?: (
    ...args: THookParams
  ) => string | NetworkObject<object> | undefined,
  doesCreatedNetworkObjectMatchSource: (
    networkObjectDetails: NetworkObjectDetails,
    networkObjectSource: string,
  ) => boolean = doesCreatedNetworkObjectMatchSourceDefault,
): (...args: THookParams) => {
  networkObject: NetworkObject<object> | undefined;
  state: NetworkObjectState<NetworkObject<object>>;
} {
  return function useNetworkObject(...args: THookParams) {
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
    const [lookup] = usePromise<NetworkObjectLookup | undefined>(
      useMemo(() => {
        return didReceiveNetworkObject
          ? // We already have a network object or undefined, so we don't need to run this promise
            undefined
          : async () => {
              try {
                return {
                  // Tag the result with the source it answers for. `usePromise` keeps serving its
                  // last value while the next resolves, so an untagged result cannot be told apart
                  // from one resolved for a source the caller has since moved off of. Comparing the
                  // tag is also what reports "in flight" during the render the source changes on,
                  // without depending on a loading flag from below.
                  source: networkObjectSource,
                  // We have the network object's type, so we need to get the provider
                  networkObject: networkObjectSource ? await getNetworkObject(...args) : undefined,
                };
              } catch (error) {
                // TODO(PT-4515): `usePromise` will report the rejection itself, at which point this
                // catch and the `error` member above can go.
                logger.warn(
                  `Could not look up network object '${networkObjectSource}': ${getErrorMessage(error)}`,
                );
                return { source: networkObjectSource, error };
              }
            };
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

    // The preserved object, whoever it belongs to — what the plain hook serves. `state` below is
    // the one that can tell whether it answers the source being asked for.
    const networkObject = lookup?.networkObject;
    /** Whether the preserved lookup answers the source being asked for right now. */
    const isLookupForCurrentSource = lookup !== undefined && lookup.source === networkObjectSource;

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
    // would trigger a fresh lookup for a name whose first lookup is still in flight.
    //
    // What counts as "something being published under the name it wants" is the caller's to say,
    // because for most of these hooks the name they are asked for is not the id the object is
    // registered under. Answering that here by comparing the two directly would compare strings
    // that can never be equal.
    // Note: do nothing if we already received a network object, but still run this hook.
    // (We must make sure to run the same number of hooks in all code paths.)
    useEvent(
      !didReceiveNetworkObject && !!disposedNetworkObject && isServingNothing
        ? onDidCreateNetworkObject
        : undefined,
      useCallback(
        (networkObjectDetails: NetworkObjectDetails) => {
          if (
            isString(networkObjectSource) &&
            doesCreatedNetworkObjectMatchSource(networkObjectDetails, networkObjectSource)
          )
            setLookupAttempt((previousAttempt) => previousAttempt + 1);
        },
        [networkObjectSource],
      ),
    );

    // What the plain hook serves: the object it was handed, or the preserved lookup if it is alive.
    const aliveLookupNetworkObject =
      networkObject && !isNetworkObjectDisposed ? networkObject : undefined;
    const servedNetworkObject = didReceiveNetworkObject
      ? networkObjectSource
      : aliveLookupNetworkObject;

    const state = ((): NetworkObjectState<NetworkObject<object>> => {
      // Handed an object (or nothing) directly — there is no lookup to be in flight.
      if (didReceiveNetworkObject)
        return networkObjectSource
          ? { status: 'ready', networkObject: networkObjectSource }
          : { status: 'noSource' };
      // An empty source name is nothing to look up.
      if (!networkObjectSource) return { status: 'noSource' };
      // Before the currency check: a disposal leaves the preserved lookup tagged with the CURRENT
      // source, so it still reads as current — but what it holds is dead and a re-lookup is already
      // running. That is a wait, not a dead end.
      if (isNetworkObjectDisposed) return { status: 'loading' };
      // No finished lookup for this source yet — either the first one or the window after a source
      // change. Comparing the tag is what makes this true from the render the source changes on.
      if (!isLookupForCurrentSource) return { status: 'loading' };
      if (lookup.error !== undefined) return { status: 'unavailable', error: lookup.error };
      if (!networkObject) return { status: 'unavailable' };
      return { status: 'ready', networkObject };
    })();

    return { networkObject: servedNetworkObject, state };
  };
}

/**
 * Creates a hook that returns the network object for a source, or `undefined`.
 *
 * `undefined` conflates "not yet", "nothing to ask for", and "asking failed", and across a source
 * change this keeps serving the PREVIOUS source's object — so a consumer whose source can change in
 * place should use {@link createUseNetworkObjectStateHook} instead, whose union can tell those
 * apart. See {@link NetworkObjectState}.
 *
 * @param getNetworkObject See {@link createUseNetworkObjectStateHook}
 * @param mapParametersToNetworkObjectSource See {@link createUseNetworkObjectStateHook}
 * @param doesCreatedNetworkObjectMatchSource See {@link createUseNetworkObjectStateHook}
 * @returns A function that takes in a networkObjectSource and returns the network object, or
 *   `undefined`
 */
export function createUseNetworkObjectHook<THookParams extends unknown[]>(
  ...createArgs: Parameters<typeof createUseNetworkObjectCoreHook<THookParams>>
): (...args: THookParams) => NetworkObject<object> | undefined {
  const useNetworkObjectCore = createUseNetworkObjectCoreHook(...createArgs);
  return function useNetworkObject(...args: THookParams) {
    return useNetworkObjectCore(...args).networkObject;
  };
}

/**
 * Creates a hook that returns a {@link NetworkObjectState} for a source — which of "nothing asked",
 * "in flight", "here it is", and "not available" the lookup is in, so a consumer can wait out a
 * transient window, report a dead end, and act only on an object that answers the source it is
 * asking about right now.
 *
 * Shares its implementation with {@link createUseNetworkObjectHook}, so re-lookup on disposal and on
 * factory publication behave identically.
 *
 * @param getNetworkObject Function that takes the hook's parameters and returns the network object
 *   they name
 * @param mapParametersToNetworkObjectSource Function that takes the parameters passed into the hook
 *   and returns the `networkObjectSource` associated with them. Defaults to using the first
 *   parameter.
 *
 *   Note: `networkObjectSource` is the string name of the network object to get OR the network object
 *   itself (the result of this hook, if you want it handed straight back).
 * @param doesCreatedNetworkObjectMatchSource Decides whether a network object that was just created
 *   means the hook should look its source up again. Defaults to comparing the new object's id to
 *   the `networkObjectSource`.
 *
 *   MUST be supplied by any caller whose `networkObjectSource` is not literally the id the object is
 *   registered under — a data provider name becomes `{name}-data`, a web view id becomes
 *   `webViewController{id}`, and so on. Left at the default, such a hook's re-lookup listener
 *   compares two strings that can never be equal.
 * @returns A function that takes in a networkObjectSource and returns its state
 */
export function createUseNetworkObjectStateHook<THookParams extends unknown[]>(
  ...createArgs: Parameters<typeof createUseNetworkObjectCoreHook<THookParams>>
): (...args: THookParams) => NetworkObjectState<NetworkObject<object>> {
  const useNetworkObjectCore = createUseNetworkObjectCoreHook(...createArgs);
  return function useNetworkObjectState(...args: THookParams) {
    return useNetworkObjectCore(...args).state;
  };
}

export default createUseNetworkObjectHook;
