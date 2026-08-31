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
import { Unsubscriber } from 'platform-bible-utils';

/**
 * How long to keep waiting for the shard of a window that routing has already picked.
 *
 * A window becomes routable the moment it registers its WINDOW service, and a renderer starts every
 * one of its shards together in one batch — so what this covers is the scheduling skew between
 * registrations that were all begun at the same moment, not the seconds a renderer takes to start.
 * The wait ends as soon as the announcement arrives, so the bound only ever elapses for a shard
 * that is not coming at all because its own start failed. Long enough that a busy startup does not
 * trip it, short enough that such a window fails visibly instead of hanging.
 */
const SHARD_ANNOUNCEMENT_GRACE_MS = 5000;

/**
 * Start watching for the given window's announcement of its shard of this service.
 *
 * Driven by the index's own announcement rather than by re-checking on a timer: an announcement is
 * the only moment anything learns a shard exists, so this costs nothing while none has arrived and
 * finishes the instant one does.
 *
 * Started BEFORE the first lookup, deliberately. An announcement that lands while that lookup is in
 * flight would otherwise be missed, and the call would then wait out the whole grace period for
 * news it had already been given.
 */
function watchForShardAnnouncement<T>(shardIndex: ServiceShardIndex<T>, windowId: number) {
  let settle: (() => void) | undefined;
  const announced = new Promise<void>((resolve) => {
    settle = resolve;
  });
  const unsubscribe: Unsubscriber = shardIndex.onDidAddShard((announcedWindowId) => {
    if (announcedWindowId === windowId) settle?.();
  });
  const graceTimeout = setTimeout(() => settle?.(), SHARD_ANNOUNCEMENT_GRACE_MS);
  return {
    /** Resolves when the window announces its shard, or when the grace period runs out */
    announced,
    /** Stop watching. Safe whether or not {@link announced} was ever awaited */
    stopWatching() {
      clearTimeout(graceTimeout);
      unsubscribe();
    },
  };
}

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
    // Routing picked this window because it registered its WINDOW service, and a renderer starts
    // its shards together in one batch — so a window can be routable while the shard this call
    // needs is a moment behind. Failing on first look would turn that ordinary skew into an error
    // for anything fired at a window in its first instants, which is exactly when a keyboard
    // shortcut or an activating extension is most likely to fire one.
    const shardAnnouncement = isIndexed
      ? undefined
      : watchForShardAnnouncement(shardIndex, targetWindowId);

    try {
      let shard = await shardIndex.getShard(targetWindowId);

      if (!shard && shardAnnouncement) {
        logger.debug(
          `${serviceName} for window ${targetWindowId} has not been announced yet; waiting for it before giving up`,
        );
        await shardAnnouncement.announced;
        shard = await shardIndex.getShard(targetWindowId);
      }

      if (shard) return { windowId: targetWindowId, shard };

      if (!isIndexed)
        throw new Error(
          `${serviceName} for window ${targetWindowId} is not available. The renderer may not have started yet.`,
        );

      // The window did register a shard, so "the renderer has not started yet" is the one thing
      // this is not. `networkObjectService.get` reports a genuinely absent object, a request that
      // timed out, and a handler that threw as the same `undefined`, so which of those happened
      // cannot be told from here — but a registered shard failing to resolve means something is
      // wrong beyond startup timing, and nothing else on this path says so.
      logger.warn(
        `The ${serviceName} shard registered by window ${targetWindowId} could not be resolved. The window may have stopped answering, or its shard may have gone away between being found and being called.`,
      );
      throw new Error(
        `${serviceName} for window ${targetWindowId} is registered but could not be resolved.`,
      );
    } finally {
      shardAnnouncement?.stopWatching();
    }
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
