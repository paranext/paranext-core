/**
 * Typed discovery of the service shards windows register.
 *
 * A service router forwards a call to one window's shard, so it has to be able to turn a window id
 * into that window's shard. It learns them from the network object announcements: every shard
 * registers with an object type of its own and a `windowId` attribute, so an index filtered on that
 * type knows which window registered what without parsing a single network object id.
 *
 * Keeping an index rather than scanning per call also gets window close right for free — a shard
 * leaves the index the moment its network object is announced as disposed, which is what happens
 * when the window hosting it goes away.
 *
 * See `.context/standards/Architecture.md` § "Service router and service shard".
 */

import { getServiceShardWindowId } from '@shared/models/service-shard.model';
import {
  onDidCreateNetworkObject,
  onDidDisposeNetworkObject,
} from '@shared/services/network-object.service';
import { PlatformEvent, PlatformEventEmitter } from 'platform-bible-utils';

/** The shards of one service, keyed by the window that registered each one */
export interface ServiceShardIndex<T> {
  /**
   * Fires with a window id when that window's shard registers.
   *
   * Startup wiring that waits on a window becoming able to serve calls listens here rather than
   * watching every network object announcement and working out which ones are shards.
   */
  onDidAddShard: PlatformEvent<number>;

  /**
   * The given window's shard, or `undefined` if that window has not registered one — it may not
   * have started yet, or it may be gone.
   *
   * @param windowId Electron BrowserWindow ID of the window to get the shard for
   */
  getShard(windowId: number): Promise<T | undefined>;
}

/**
 * Start indexing one service's shards.
 *
 * Call this while the main process is starting up, before any window exists: the index is built
 * from the announcements it hears, so anything registered before it starts listening is invisible
 * to it. That is the same assumption `network-object-status.service-host.ts` makes.
 *
 * @param options.objectType Network object type this service's shards register under. Distinct per
 *   service, so filtering finds exactly the shards wanted rather than everything window-scoped.
 * @param options.resolveShard How to turn a shard's network object id into something callable —
 *   `networkObjectService.get` for a plain network object shard, the data provider service for a
 *   shard that is a data provider. Passed in rather than chosen here so each service keeps its own
 *   transport, which the router/shard pattern does not depend on.
 */
export function createServiceShardIndex<T>(options: {
  objectType: string;
  resolveShard: (networkObjectId: string) => Promise<T | undefined>;
}): ServiceShardIndex<T> {
  const { objectType, resolveShard } = options;

  /**
   * Network object id of each window's shard.
   *
   * Only the id is kept, never the resolved shard: `networkObjectService.get` already caches what
   * it resolves, serializes concurrent lookups of the same id, and drops what it holds when the
   * object is disposed. A second cache of resolved objects here could only go stale.
   */
  const shardIdsByWindowId = new Map<number, string>();
  /** Reverse of {@link shardIdsByWindowId} — disposal announces an id, not a window */
  const windowIdsByShardId = new Map<string, number>();

  const onDidAddShardEmitter = new PlatformEventEmitter<number>();

  onDidCreateNetworkObject((networkObjectDetails) => {
    if (networkObjectDetails.objectType !== objectType) return;
    const windowId = getServiceShardWindowId(networkObjectDetails);
    if (windowId === undefined) return;

    const previousShardId = shardIdsByWindowId.get(windowId);
    if (previousShardId !== undefined) windowIdsByShardId.delete(previousShardId);
    shardIdsByWindowId.set(windowId, networkObjectDetails.id);
    windowIdsByShardId.set(networkObjectDetails.id, windowId);
    onDidAddShardEmitter.emit(windowId);
  });

  onDidDisposeNetworkObject((networkObjectId) => {
    const windowId = windowIdsByShardId.get(networkObjectId);
    if (windowId === undefined) return;
    windowIdsByShardId.delete(networkObjectId);
    // Drop the window's entry only if this disposal is about the shard it currently points at, so a
    // window that has already registered a replacement keeps the live one. A renderer that reloads
    // cannot re-register until the departing page's registration is gone — that is what produces
    // this announcement — so the two arrive in that order, but the check costs nothing and does not
    // depend on that holding.
    if (shardIdsByWindowId.get(windowId) === networkObjectId) shardIdsByWindowId.delete(windowId);
  });

  return {
    onDidAddShard: onDidAddShardEmitter.event,
    async getShard(windowId: number): Promise<T | undefined> {
      const shardId = shardIdsByWindowId.get(windowId);
      if (shardId === undefined) return undefined;
      return resolveShard(shardId);
    },
  };
}
