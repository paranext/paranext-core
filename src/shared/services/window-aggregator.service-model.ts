import networkObjectService from '@shared/services/network-object.service';
import networkObjectStatusService from '@shared/services/network-object-status.service';
import IWindowController, {
  WINDOW_CONTROLLER_OBJECT_TYPE,
} from '@shared/models/window-controller.interface';
import { NetworkObject } from '@shared/models/network-object.model';
import { endsWith } from 'platform-bible-utils';

export const NETWORK_OBJECT_NAME_WINDOW_AGGREGATOR_SERVICE = 'WindowAggregatorService';

// #region Window aggregator factory utilities

/** Suffix on network objects that indicates that the network object is a window controller */
const WINDOW_CONTROLLER_LABEL = '-wc';

/**
 * Transform the well-known window id into an id for its network object to use
 *
 * @param windowId Id extensions use to identify the window
 * @returns Id for the network object for this window controller
 */
export function getWindowControllerNetworkObjectNameFromId(windowId: string) {
  return endsWith(windowId, WINDOW_CONTROLLER_LABEL)
    ? windowId
    : `${windowId}${WINDOW_CONTROLLER_LABEL}`;
}

// #endregion

// #region Window aggregator service

/**
 * JSDOC SOURCE windowAggregatorService
 *
 * Coordinates communication between multiple browser windows
 */
export type WindowAggregatorServiceType = {};

export const windowAggregatorServiceBase: WindowAggregatorServiceType = {};

// #endregion

// #region Window Aggregator Service utility functions

export async function getAllWindowControllers(): Promise<NetworkObject<IWindowController>[]> {
  const networkObjects = await networkObjectStatusService.getAllNetworkObjectDetails();
  const entries = Object.entries(networkObjects).filter(
    ([, networkObjectDetails]) =>
      networkObjectDetails.objectType === WINDOW_CONTROLLER_OBJECT_TYPE &&
      networkObjectDetails.attributes,
  );

  const controllers = await Promise.all(
    entries.map(async ([key]) => networkObjectService.get<IWindowController>(key)),
  );

  return controllers.filter((c): c is NetworkObject<IWindowController> => c !== undefined);
}

// #endregion
