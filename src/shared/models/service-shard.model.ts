/**
 * How a service shard says what it is and which window it belongs to.
 *
 * A shard is one window's implementation of a service. Every window registers its own, so a router
 * in the main process has to be able to find the shard for a particular window. It does that by
 * network object type and attributes rather than by rebuilding the shard's window-scoped id, which
 * keeps the id an internal detail of the registration instead of a contract every caller has to
 * know how to spell. See `.context/standards/Architecture.md` § "Service router and service
 * shard".
 *
 * The types live here rather than in each service's model because those models are part of the
 * public PAPI surface, and how the platform's own windows find each other is not.
 */

import { NetworkObjectDetails } from '@shared/models/network-object.model';

/** Network object type the WebView service shard registers under, one per window */
export const WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE = 'webViewServiceShard';

/** Network object type the notification service shard registers under, one per window */
export const NOTIFICATION_SERVICE_SHARD_OBJECT_TYPE = 'notificationServiceShard';

/**
 * Network object type the window service shard registers under, one per window. It is a data
 * provider rather than a plain network object, which changes nothing about discovery:
 * `registerEngineByType` passes the type and attributes straight through to the network object
 * registration.
 */
export const WINDOW_SERVICE_SHARD_OBJECT_TYPE = 'windowServiceShard';

/** Attributes every service shard registers, so a router can tell which window it belongs to */
export type ServiceShardAttributes = {
  /** Electron BrowserWindow ID of the window this shard implements the service for */
  windowId: number;
};

/**
 * The attributes a window's shard registers with.
 *
 * @param windowId Electron BrowserWindow ID of the registering window. A renderer receives its own
 *   id as a string query parameter, so a string is accepted and converted — the attribute itself is
 *   always a number, matching the ids the main process routes by.
 * @throws If `windowId` is not a window id, since a shard nothing can be routed to is worse than a
 *   window that fails to finish starting
 */
export function getServiceShardAttributes(windowId: number | string): ServiceShardAttributes {
  const windowIdNumber = typeof windowId === 'number' ? windowId : Number.parseInt(windowId, 10);
  if (!Number.isInteger(windowIdNumber))
    throw new Error(`Cannot register a service shard for window id "${windowId}"`);
  return { windowId: windowIdNumber };
}

/**
 * Which window a network object is a service shard for, or `undefined` if it does not say.
 *
 * A shard that registered without a usable window id cannot be routed to, so it is left out of a
 * router's index entirely rather than guessed at from its id.
 *
 * @param networkObjectDetails Details a network object was announced with
 */
export function getServiceShardWindowId(
  networkObjectDetails: NetworkObjectDetails,
): number | undefined {
  const { windowId } = networkObjectDetails.attributes ?? {};
  return typeof windowId === 'number' ? windowId : undefined;
}
