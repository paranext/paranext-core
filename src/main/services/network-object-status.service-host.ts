import { NetworkObjectDetails } from '@shared/models/network-object.model';
import { logger } from '@shared/services/logger.service';
import {
  NetworkObjectStatusRemoteServiceType,
  networkObjectStatusServiceNetworkObjectName,
} from '@shared/models/network-object-status.service-model';
import {
  networkObjectService,
  onDidCreateNetworkObject,
  onDidDisposeNetworkObject,
} from '@shared/services/network-object.service';

// We are assuming these events get hooked up before any network objects get registered. That allows
// us to start from a clean map. If somehow network objects can be registered before we hook up
// the events, then we have to figure out a way to insert pre-existing objects into the map in a way
// that avoids race conditions with the events that fire around the same time.
const networkObjectIDsToDetails = new Map<string, NetworkObjectDetails>();

onDidCreateNetworkObject((networkObjectDetails) => {
  if (networkObjectIDsToDetails.has(networkObjectDetails.id))
    logger.warn(`Re-saving network object details for ${networkObjectDetails.id}`);
  networkObjectIDsToDetails.set(networkObjectDetails.id, networkObjectDetails);
});

onDidDisposeNetworkObject((networkObjectId) => {
  if (!networkObjectIDsToDetails.delete(networkObjectId))
    logger.warn(`Notification of disposed object ${networkObjectId} that was previously unknown`);
});

// Making this async to align with the service model even though it could really be synchronous
async function getAllNetworkObjectDetails(): Promise<Record<string, NetworkObjectDetails>> {
  const allNetworkObjectDetails: Record<string, NetworkObjectDetails> = {};
  networkObjectIDsToDetails.forEach((value: NetworkObjectDetails, key: string) => {
    allNetworkObjectDetails[key] = value;
  });
  return Promise.resolve(allNetworkObjectDetails);
}

const networkObjectStatusService: NetworkObjectStatusRemoteServiceType = {
  getAllNetworkObjectDetails,
};

/** Register the network object that backs the network object status service */
// This doesn't really represent this service module, so we're not making it default. To use this
// service, you should use `network-object-status.service.ts`
// eslint-disable-next-line import/prefer-default-export
export async function startNetworkObjectStatusService(): Promise<void> {
  await networkObjectService.set<NetworkObjectStatusRemoteServiceType>(
    networkObjectStatusServiceNetworkObjectName,
    networkObjectStatusService,
  );
}
