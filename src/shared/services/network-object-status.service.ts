import { NetworkObjectDetails } from '@shared/models/network-object.model';
import {
  networkObjectStatusServiceNetworkObjectName,
  NetworkObjectStatusRemoteServiceType,
  NetworkObjectStatusServiceType,
} from '@shared/models/network-object-status.service-model';
import networkObjectService, {
  onDidCreateNetworkObject,
} from '@shared/services/network-object.service';
import { AsyncVariable, isSubset } from 'platform-bible-utils';

let networkObject: NetworkObjectStatusRemoteServiceType;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localNetworkObjectStatusService =
            await networkObjectService.get<NetworkObjectStatusServiceType>(
              networkObjectStatusServiceNetworkObjectName,
            );
          if (!localNetworkObjectStatusService)
            throw new Error(
              `${networkObjectStatusServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localNetworkObjectStatusService;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

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
async function waitForNetworkObject(
  objectDetailsToMatch: Partial<NetworkObjectDetails>,
  timeoutInMS?: number,
): Promise<NetworkObjectDetails> {
  const asyncVar = new AsyncVariable<NetworkObjectDetails>(
    `wait-for-net-obj with details ${JSON.stringify(objectDetailsToMatch)}`,
    timeoutInMS ?? -1,
  );
  try {
    // Watch the stream of incoming network objects before getting a snapshot to avoid race conditions
    const unsub = onDidCreateNetworkObject((networkObjectDetails) => {
      if (!asyncVar.hasSettled && isSubset(networkObjectDetails, objectDetailsToMatch)) {
        asyncVar.resolveToValue(networkObjectDetails, false);
      }
      if (asyncVar.hasSettled) {
        unsub();
      }
    });
    // Now check if the needed network object has already been created
    const existingNetworkObjectDetails = await getAllNetworkObjectDetails();
    if (!asyncVar.hasSettled) {
      const match = Object.values(existingNetworkObjectDetails).find((networkObjectDetails) =>
        isSubset(networkObjectDetails, objectDetailsToMatch),
      );
      if (match) {
        asyncVar.resolveToValue(match, false);
      }
    }
  } catch (e) {
    const message = `waitForNetworkObject failed for details ${JSON.stringify(objectDetailsToMatch)}! ${e}`;
    asyncVar.rejectWithReason(message, true);
    throw e;
  }
  return asyncVar.promise;
}

const networkObjectStatusService: NetworkObjectStatusServiceType = {
  getAllNetworkObjectDetails,
  waitForNetworkObject,
};

export default networkObjectStatusService;
