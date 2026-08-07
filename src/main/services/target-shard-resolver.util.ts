/**
 * Resolving the shard a routed call should currently run in.
 *
 * Shared by the service routers that forward to "whichever window the user is working in" rather
 * than to a window they were handed, which is every plain forward a router does. See
 * `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { ServiceShardIndex } from '@main/services/service-shard-index';
import { getTargetWindowId } from '@main/services/window-state.service';
import { logger } from '@shared/services/logger.service';

/** The shard a routed call should run in, and the window serving it */
export type TargetWindowShard<T> = {
  /**
   * The window that answered. Travels with the shard because a caller that acts on what one window
   * said has to come back to that same window: the routing target can move between the two calls,
   * and re-deriving it would send the second one somewhere else.
   */
  windowId: number;
  /** That window's shard of the service */
  shard: T;
};

/**
 * Resolve the shard of the window a routed call should currently run in, along with the window that
 * serves it.
 *
 * Nothing is cached: the answer changes as the user moves between windows and as windows finish
 * starting, and re-resolving per call is what keeps a router following that without a cache to
 * invalidate.
 *
 * Every way of having no shard throws, rather than answering with nothing. A resolved promise
 * carrying "there was no window" is indistinguishable to a caller from the call having run, and the
 * caller is the only one positioned to retry it or tell a user it did not happen.
 *
 * @param serviceName Name the service is known by, for the errors this raises
 * @param shardIndex The router's index of the service's shards
 * @returns A resolver that answers with the target window's shard or explains why there isn't one
 */
export function createTargetWindowShardResolver<T>(
  serviceName: string,
  shardIndex: ServiceShardIndex<T>,
): () => Promise<TargetWindowShard<T>> {
  return async () => {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === undefined)
      throw new Error(`No windows available to route ${serviceName} call`);

    // Read before resolving rather than after: an entry evicted while the resolve was in flight was
    // still a registration that failed to resolve, not a window that never registered one
    const isIndexed = shardIndex.getShardWindowIds().includes(targetWindowId);
    const shard = await shardIndex.getShard(targetWindowId);
    if (shard) return { windowId: targetWindowId, shard };

    if (!isIndexed)
      throw new Error(
        `${serviceName} for window ${targetWindowId} is not available. The renderer may not have started yet.`,
      );

    // The window did register a shard, so "the renderer has not started yet" is the one thing this
    // is not. `networkObjectService.get` reports a genuinely absent object, a request that timed
    // out, and a handler that threw as the same `undefined`, so which of those happened cannot be
    // told from here — but a registered shard failing to resolve means something is wrong beyond
    // startup timing, and nothing else on this path says so.
    logger.warn(
      `The ${serviceName} shard registered by window ${targetWindowId} could not be resolved. The window may have stopped answering, or its shard may have gone away between being found and being called.`,
    );
    throw new Error(
      `${serviceName} for window ${targetWindowId} is registered but could not be resolved.`,
    );
  };
}

/**
 * Resolve the shard of the window a routed call should currently run in.
 *
 * {@link createTargetWindowShardResolver} without the window id, for the routers that forward one
 * call and never have to come back to the window that served it.
 *
 * @param serviceName Name the service is known by, for the errors this raises
 * @param shardIndex The router's index of the service's shards
 * @returns A resolver that answers with the target window's shard or explains why there isn't one
 */
export function createTargetShardResolver<T>(
  serviceName: string,
  shardIndex: ServiceShardIndex<T>,
): () => Promise<T> {
  const resolveTargetWindowShard = createTargetWindowShardResolver(serviceName, shardIndex);
  return async () => (await resolveTargetWindowShard()).shard;
}
