import { NetworkObjectDetails } from '@shared/models/network-object.model';
import {
  networkObjectStatusServiceNetworkObjectName,
  NetworkObjectStatusRemoteServiceType,
  NetworkObjectStatusServiceType,
} from '@shared/models/network-object-status.service-model';
import {
  networkObjectService,
  onDidCreateNetworkObject,
} from '@shared/services/network-object.service';
import {
  AsyncVariable,
  createCachedInitializer,
  getErrorMessage,
  isSubset,
} from 'platform-bible-utils';
import type { Unsubscriber } from 'platform-bible-utils';

let networkObject: NetworkObjectStatusRemoteServiceType;
const initialize = createCachedInitializer(async () => {
  const localNetworkObjectStatusService =
    await networkObjectService.get<NetworkObjectStatusServiceType>(
      networkObjectStatusServiceNetworkObjectName,
    );
  if (!localNetworkObjectStatusService)
    throw new Error(
      `${networkObjectStatusServiceNetworkObjectName} is not available as a network object`,
    );
  networkObject = localNetworkObjectStatusService;
});

// If we ever want to be more clever, we could just keep a local (to this process) cache of the
// active network objects. If we do that, we'll have to deal with initial race conditions around
// getting a network object disposed message in this process before handling the snapshot from
// the service host that includes the (now disposed) network object. Just asking the remote service
// is less error prone, but slower, whenever we get a request for the latest network objects.
async function getAllNetworkObjectDetails(): Promise<Record<string, NetworkObjectDetails>> {
  await initialize();
  return networkObject.getAllNetworkObjectDetails();
}

// Ideally we would use this inside the network object service to be event-based instead of polling
// while waiting for network objects to be created. That would create a circular dependency between
// this service and the network object service, though, which is most easily resolved by merging
// this code into the network object service. That service is pretty big as it is, so to optimize
// for code understandability we'll just leave it as-is and poll inside the network object service
// `get` for now. Other services will have to call this directly if they want to be event based.
//
// Every rejection from this function carries a reason string, not an Error: both the timeout and a
// failed snapshot settle through `asyncVar`, so the caller sees one shape whichever way the wait
// ends. The public contract in `NetworkObjectStatusServiceType` states the same.
async function waitForNetworkObject(
  objectDetailsToMatch: Partial<NetworkObjectDetails>,
  timeoutInMS?: number,
): Promise<NetworkObjectDetails> {
  const asyncVar = new AsyncVariable<NetworkObjectDetails>(
    `wait-for-net-obj with details ${JSON.stringify(objectDetailsToMatch)}`,
    timeoutInMS ?? -1,
  );
  // Watch the stream of incoming network objects before getting a snapshot to avoid race conditions
  const unsub = onDidCreateNetworkObject((networkObjectDetails) => {
    if (!asyncVar.hasSettled && isSubset(networkObjectDetails, objectDetailsToMatch))
      asyncVar.resolveToValue(networkObjectDetails, false);
  });
  // Neither helper is awaited: both run alongside the wait and settle `asyncVar` themselves, and
  // neither can reject. Awaiting the snapshot here, ahead of handing back `asyncVar.promise`, is
  // exactly what must not happen — see resolveFromSnapshot.
  releaseListenerWhenSettled(asyncVar.promise, unsub);
  resolveFromSnapshot(asyncVar, objectDetailsToMatch);
  return asyncVar.promise;
}

/**
 * Stops listening however the wait ends — a match, the timeout, or a failed snapshot. Waiting on
 * the settled promise rather than on the next event means a timed-out wait does not keep its
 * listener alive until some unrelated object happens to be created.
 *
 * This awaits `asyncVar.promise` itself. The promise handed to callers is the async wrapper's, a
 * different object, so a caller that drops it without a handler still gets an unhandled-rejection
 * report on timeout. What must not happen is watching a DERIVED promise here (`promise.then(...)`
 * with no handler of its own): that rejects unhandled on every timeout even for callers who handle
 * theirs, which is the defect this arrangement exists to avoid.
 */
async function releaseListenerWhenSettled(
  promise: Promise<unknown>,
  unsub: Unsubscriber,
): Promise<void> {
  try {
    await promise;
  } catch {
    // The caller receives this rejection through the same promise; here it only means the wait is
    // over. Swallowing it on this branch is what keeps a caller-handled timeout from also surfacing
    // as an unhandled rejection.
  } finally {
    unsub();
  }
}

/**
 * Checks the network-object snapshot ALONGSIDE the wait, not ahead of it. The snapshot is a round
 * trip to the main process, and when main is slow it can outlive the timeout. Awaiting it before
 * handing back `asyncVar.promise` would let the timeout reject a promise nobody holds yet — an
 * unhandled rejection in this process — while the caller is still waiting on the slow snapshot.
 */
async function resolveFromSnapshot(
  asyncVar: AsyncVariable<NetworkObjectDetails>,
  objectDetailsToMatch: Partial<NetworkObjectDetails>,
): Promise<void> {
  try {
    const existingNetworkObjectDetails = await getAllNetworkObjectDetails();
    if (asyncVar.hasSettled) return;
    const match = Object.values(existingNetworkObjectDetails).find((networkObjectDetails) =>
      isSubset(networkObjectDetails, objectDetailsToMatch),
    );
    if (match) asyncVar.resolveToValue(match, false);
  } catch (e) {
    // The snapshot is the only way to see an object created BEFORE the listener attached, so
    // without it the wait cannot be trusted to finish: fail it now rather than at the timeout.
    if (!asyncVar.hasSettled) asyncVar.rejectWithReason(getErrorMessage(e));
  }
}

/**
 * JSDOC SOURCE networkObjectStatusService
 *
 * Provides functions related to the set of available network objects
 */
export const networkObjectStatusService: NetworkObjectStatusServiceType = {
  getAllNetworkObjectDetails,
  waitForNetworkObject,
};

export default networkObjectStatusService;
