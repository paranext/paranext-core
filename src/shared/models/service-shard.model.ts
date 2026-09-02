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

/** Network object type the dialog service shard registers under, one per window */
export const DIALOG_SERVICE_SHARD_OBJECT_TYPE = 'dialogServiceShard';

/** Network object type the Usersnap service shard registers under, one per window */
export const USERSNAP_SERVICE_SHARD_OBJECT_TYPE = 'usersnapServiceShard';

/** Network object type the BookChapterControl service shard registers under, one per window */
export const BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE = 'bookChapterControlServiceShard';

/**
 * Network object type the window service shard registers under, one per window. It is a data
 * provider rather than a plain network object, which changes nothing about discovery:
 * `registerEngineByType` passes the type and attributes straight through to the network object
 * registration.
 */
export const WINDOW_SERVICE_SHARD_OBJECT_TYPE = 'windowServiceShard';

/** Attributes every service shard registers, so a router can tell which window it belongs to */
export type ServiceShardAttributes = {
  /** Platform id of the window this shard implements the service for */
  windowId: string;
};

/**
 * The attributes a window's shard registers with.
 *
 * @param windowId Platform id of the registering window
 * @throws If `windowId` is not a non-empty string, since a shard nothing can be routed to is worse
 *   than a window that fails to finish starting
 */
export function getServiceShardAttributes(windowId: string): ServiceShardAttributes {
  // Typed rather than merely truthy: attributes travel over the network, so this is a runtime
  // boundary the compiler does not hold. A number here is truthy and would register happily, after
  // which `getServiceShardWindowId` answers `undefined` for it and the shard is unroutable behind
  // nothing louder than a warning — the failure this throw exists to make obvious.
  if (typeof windowId !== 'string' || !windowId)
    throw new Error(`Cannot register a service shard for window id "${windowId}"`);
  return { windowId };
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
): string | undefined {
  const { windowId } = networkObjectDetails.attributes ?? {};
  return typeof windowId === 'string' ? windowId : undefined;
}
