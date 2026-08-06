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

/**
 * Resolve the shard of the window a routed call should currently run in.
 *
 * Nothing is cached: the answer changes as the user moves between windows and as windows finish
 * starting, and re-resolving per call is what keeps a router following that without a cache to
 * invalidate.
 *
 * @param serviceName Name the service is known by, for the errors this raises
 * @param shardIndex The router's index of the service's shards
 * @returns A resolver that answers with the target window's shard or explains why there isn't one
 */
export function createTargetShardResolver<T>(
  serviceName: string,
  shardIndex: ServiceShardIndex<T>,
): () => Promise<T> {
  return async () => {
    const targetWindowId = getTargetWindowId();
    if (targetWindowId === undefined)
      throw new Error(`No windows available to route ${serviceName} call`);

    // Read before resolving rather than after: an entry evicted while the resolve was in flight was
    // still a registration that failed to resolve, not a window that never registered one
    const isIndexed = shardIndex.getShardWindowIds().includes(targetWindowId);
    const shard = await shardIndex.getShard(targetWindowId);
    if (shard) return shard;

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
