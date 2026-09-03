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
import { logger } from '@shared/services/logger.service';
import {
  onDidCreateNetworkObject,
  onDidDisposeNetworkObject,
} from '@shared/services/network-object.service';
import { getErrorMessage, PlatformEvent, PlatformEventEmitter } from 'platform-bible-utils';

/** A shard that has gone away, and the registration it went away from */
export type ServiceShardDeparture = {
  /** Window whose shard is gone */
  windowId: number;
  /**
   * Network object id the departed shard was announced under.
   *
   * Carried on the event rather than looked up when it arrives: the index has already dropped the
   * registration by then, and anything that named the shard's methods while it was alive needs the
   * same id back to undo that.
   */
  networkObjectId: string;
};

/** The shards of one service, keyed by the window that registered each one */
export interface ServiceShardIndex<T> {
  /**
   * Fires with a window id when that window's shard registers.
   *
   * Startup wiring that waits on a window becoming able to serve calls listens here rather than
   * watching every network object announcement and working out which ones are shards.
   *
   * Fire-and-forget: an announcement is made once and never repeated, so a subscriber that attaches
   * later hears nothing about the windows already indexed. Reconcile against
   * {@link ServiceShardIndex.getShardWindowIds} on subscribing rather than assuming the index was
   * empty.
   */
  onDidAddShard: PlatformEvent<number>;

  /**
   * Fires when a window's shard leaves the index — the window closed, or its renderer navigated
   * away from the page that registered it.
   *
   * The other half of {@link onDidAddShard}, for the routers that do something to the outside world
   * when a shard appears and have to undo it when that shard goes. A window that has already
   * registered a replacement does not fire this: the shard it is routed to did not go anywhere.
   */
  onDidRemoveShard: PlatformEvent<ServiceShardDeparture>;

  /**
   * The network object id the given window's shard is currently announced under, or `undefined` if
   * that window has no shard in the index.
   *
   * The id is an internal detail of the registration, which is exactly why it is answered here
   * rather than rebuilt: a caller that has to name the shard's methods (to set a request timeout on
   * one, say) gets the id the shard actually announced, rather than a second spelling of the
   * window-scoped name that would go silently wrong the moment the two disagreed.
   *
   * @param windowId Electron BrowserWindow ID of the window to get the shard's id for
   */
  getShardNetworkObjectId(windowId: number): string | undefined;

  /**
   * The given window's shard, or `undefined` if that window has not registered one — it may not
   * have started yet, or it may be gone.
   *
   * `undefined` also comes back for a window that IS indexed whose shard could not be resolved.
   * Callers that need to tell those apart — to say which of them happened, or to treat one as an
   * error — should ask {@link ServiceShardIndex.getShardWindowIds} first.
   *
   * @param windowId Electron BrowserWindow ID of the window to get the shard for
   */
  getShard(windowId: number): Promise<T | undefined>;

  /**
   * Windows that currently have a shard in the index, in the order they were first indexed.
   *
   * This is what makes the index recoverable rather than only observable: {@link onDidAddShard} has
   * no replay, so anything that reacts to shards appearing has to reconcile against this once when
   * it starts listening or it silently misses every window indexed before that moment.
   */
  getShardWindowIds(): number[];
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
   * One window's registration of its shard.
   *
   * Only the network object id is kept, never the resolved shard: `networkObjectService.get`
   * already caches what it resolves, serializes concurrent lookups of the same id, and drops what
   * it holds when the object is disposed. A second cache of resolved objects here could only go
   * stale.
   */
  type ShardRegistration = {
    /** Network object id the shard was announced under */
    networkObjectId: string;
    /** Window the shard belongs to */
    windowId: number;
    /**
     * Which announcement this registration came from, counting up across every announcement this
     * index has heard. A window's shard id is the same string every time that window registers, so
     * the id alone cannot tell a live registration from the one it replaced; this can.
     */
    generation: number;
  };

  let nextRegistrationGeneration = 1;

  /** The registration each window is currently routed to */
  const liveRegistrationsByWindowId = new Map<number, ShardRegistration>();
  /**
   * Every registration announced under a network object id and not yet announced as disposed,
   * oldest first. Disposal announces an id and nothing else, so this is what turns that id back
   * into the registration it is about.
   */
  const openRegistrationsByShardId = new Map<string, ShardRegistration[]>();

  const onDidAddShardEmitter = new PlatformEventEmitter<number>();
  const onDidRemoveShardEmitter = new PlatformEventEmitter<ServiceShardDeparture>();

  onDidCreateNetworkObject((networkObjectDetails) => {
    if (networkObjectDetails.objectType !== objectType) return;
    const windowId = getServiceShardWindowId(networkObjectDetails);
    if (windowId === undefined) {
      // Something registered as this service's shard and cannot be routed to, which is worth saying
      // out loud: every call the shard's window should have served will fail to find it, and the
      // window never becomes ready, with nothing else anywhere recording that a shard existed.
      logger.warn(
        `Ignoring a ${objectType} network object '${networkObjectDetails.id}' that does not say which window it belongs to, so nothing can be routed to it. Its attributes were: ${JSON.stringify(networkObjectDetails.attributes)}`,
      );
      return;
    }

    const registration: ShardRegistration = {
      networkObjectId: networkObjectDetails.id,
      windowId,
      generation: nextRegistrationGeneration,
    };
    nextRegistrationGeneration += 1;

    const openRegistrations = openRegistrationsByShardId.get(registration.networkObjectId) ?? [];
    openRegistrations.push(registration);
    openRegistrationsByShardId.set(registration.networkObjectId, openRegistrations);

    const replacedRegistration = liveRegistrationsByWindowId.get(windowId);
    liveRegistrationsByWindowId.set(windowId, registration);
    if (replacedRegistration)
      logger.info(
        `Window ${windowId}'s ${objectType} shard is now '${registration.networkObjectId}' (registration ${registration.generation}), replacing '${replacedRegistration.networkObjectId}' (registration ${replacedRegistration.generation})`,
      );

    // The only time anyone is told this window registered, and nothing re-announces a shard that is
    // already registered — so one subscriber throwing must not cost the rest the news. Window
    // readiness is keyed off this event, and a window that never becomes ready is unroutable for
    // the rest of the session.
    onDidAddShardEmitter.emitIsolated(windowId, (error) => {
      logger.error(
        `A subscriber threw while being told window ${windowId} registered its ${objectType} shard; the rest were still told: ${getErrorMessage(error)}`,
      );
    });
  });

  onDidDisposeNetworkObject((networkObjectId) => {
    const openRegistrations = openRegistrationsByShardId.get(networkObjectId);
    if (!openRegistrations || openRegistrations.length === 0) return;
    // Oldest first. Which of several registrations under one id this announcement is about is not
    // knowable — the announcement carries the id alone — but how many are left is, and that is what
    // the eviction below turns on.
    const [disposedRegistration] = openRegistrations.splice(0, 1);
    if (openRegistrations.length === 0) openRegistrationsByShardId.delete(networkObjectId);

    const liveRegistration = liveRegistrationsByWindowId.get(disposedRegistration.windowId);
    // A window that has already registered a replacement keeps the live one. Comparing generations
    // rather than ids is what makes that hold whichever order the two announcements arrive in: a
    // renderer registers its replacement shard under the same id it used before, so an id
    // comparison here is always true and evicts a live shard whenever a replacement's registration
    // is announced before the departing page's disposal. Nothing re-announces a shard that is
    // already registered, so an entry evicted by mistake never comes back.
    //
    // The two arrive in the safe order today for a reason that lives in another module: the RPC
    // layer rejects a duplicate method name outright (see `registerRequestHandler` in
    // `network.service.ts`), so a new page's registration cannot succeed while the departing one's
    // names are still registered. That is defense in depth for this check, not a substitute for it.
    if (liveRegistration?.generation !== disposedRegistration.generation) {
      logger.info(
        `Window ${disposedRegistration.windowId}'s ${objectType} shard '${networkObjectId}' (registration ${disposedRegistration.generation}) is gone, but it had already been replaced, so the window keeps the shard it is routed to now`,
      );
      return;
    }

    liveRegistrationsByWindowId.delete(disposedRegistration.windowId);
    logger.info(
      `Window ${disposedRegistration.windowId}'s ${objectType} shard '${networkObjectId}' is gone; nothing can be routed to that window until it registers again`,
    );

    // Isolated for the same reason the arrival is: this is the only time anyone is told, and a
    // subscriber throwing while cleaning up after one shard must not cost the rest the news.
    onDidRemoveShardEmitter.emitIsolated(
      { windowId: disposedRegistration.windowId, networkObjectId },
      (error) => {
        logger.error(
          `A subscriber threw while being told window ${disposedRegistration.windowId}'s ${objectType} shard went away; the rest were still told: ${getErrorMessage(error)}`,
        );
      },
    );
  });

  return {
    onDidAddShard: onDidAddShardEmitter.event,
    onDidRemoveShard: onDidRemoveShardEmitter.event,
    async getShard(windowId: number): Promise<T | undefined> {
      const registration = liveRegistrationsByWindowId.get(windowId);
      if (!registration) return undefined;
      return resolveShard(registration.networkObjectId);
    },
    getShardNetworkObjectId(windowId: number): string | undefined {
      return liveRegistrationsByWindowId.get(windowId)?.networkObjectId;
    },
    getShardWindowIds(): number[] {
      return [...liveRegistrationsByWindowId.keys()];
    },
  };
}
