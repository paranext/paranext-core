/**
 * Helpers shared by the service router suites (`command.`, `notification.`, `web-view.` and
 * `window.service-router.test.ts`). Each of those mocks `window-state.service` and the network
 * object service the same way, so the window wiring and the router capture live here rather than
 * being copied four times and drifting apart.
 *
 * The mocks themselves stay in each suite: `vi.mock` factories are hoisted above every import, so
 * they cannot reach anything this module exports.
 */

import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import type { Mock } from 'vitest';

/**
 * The network object announcements a router's shard index learns windows from.
 *
 * An index subscribes once, at module load, so the listeners it registered outlive any one test and
 * have to be kept somewhere `vi.clearAllMocks()` does not reach — hence plain arrays rather than
 * the subscribe mocks' recorded calls.
 */
export interface ShardAnnouncementListeners {
  /** Listeners registered against `onDidCreateNetworkObject` */
  create: ((networkObjectDetails: NetworkObjectDetails) => void)[];
  /** Listeners registered against `onDidDisposeNetworkObject` */
  dispose: ((networkObjectId: string) => void)[];
}

/** The mocked `window-state.service` and network object lookups a service router fans out through */
export interface RoutingWindowMocks {
  /** Mock of `getWindows`, which reports every tracked window whether or not it can answer */
  getWindows: Mock;
  /** Mock of `getReadyWindowIds`, which reports only the windows a fan-out can get an answer from */
  getReadyWindowIds: Mock;
  /** Mock of `networkObjectService.get`, which resolves a window's shard by network object id */
  networkObjectGet: Mock;
  /** Where the router's shard index parked its subscriptions, so tests can announce to it */
  shardAnnouncementListeners: ShardAnnouncementListeners;
}

/**
 * Shard ids the last {@link withWindows} announced, so the next call can retract them. A router's
 * shard index is module state that outlives one test.
 */
let announcedShardIds: string[] = [];

/**
 * The network object id a window's shard is announced under.
 *
 * Deliberately unrelated to the generic service name: a router that rebuilt a scoped name from a
 * window id instead of using what the shard announced would find nothing here.
 */
function getShardNetworkObjectId(windowId: number): string {
  return `shard-of-window-${windowId}`;
}

/**
 * Wire the given windows, each serving the shard given for it, and announce each shard the way its
 * window's renderer does when it registers.
 *
 * Windows listed in `unreadyWindowIds` are tracked but have not registered their shards — the state
 * a window is in from the moment it is shown until its renderer finishes starting. Their shards are
 * still resolvable here on purpose: a fan-out that asks them anyway should be visible as a call
 * that was made, not hidden behind an unresolvable name.
 *
 * @param mocks The suite's mocked window state and network object lookups
 * @param shardObjectType Network object type this suite's shards register under
 * @param shardsByWindowId Shard each window serves, keyed by window ID
 * @param options.unreadyWindowIds Windows to track without marking them able to answer
 */
export function withWindows(
  mocks: RoutingWindowMocks,
  shardObjectType: string,
  shardsByWindowId: Record<number, unknown>,
  options?: { unreadyWindowIds?: number[] },
): void {
  const windowIds = Object.keys(shardsByWindowId).map(Number);
  const unreadyWindowIds = options?.unreadyWindowIds ?? [];
  mocks.getWindows.mockReturnValue(windowIds.map((id) => ({ id })));
  mocks.getReadyWindowIds.mockReturnValue(windowIds.filter((id) => !unreadyWindowIds.includes(id)));
  mocks.networkObjectGet.mockImplementation(async (networkObjectId: string) => {
    const windowId = Number(networkObjectId.split('-').pop());
    return shardsByWindowId[windowId];
  });

  const { create, dispose } = mocks.shardAnnouncementListeners;
  announcedShardIds.forEach((shardId) => dispose.forEach((listener) => listener(shardId)));
  announcedShardIds = windowIds.map(getShardNetworkObjectId);
  windowIds.forEach((windowId) => {
    create.forEach((listener) =>
      listener({
        id: getShardNetworkObjectId(windowId),
        objectType: shardObjectType,
        functionNames: [],
        attributes: { windowId },
      }),
    );
  });
}

/**
 * Announce that a window's shard went away, the way the platform does when the window hosting it
 * closes.
 *
 * @param mocks The suite's mocked window state and network object lookups
 * @param windowId Window whose shard is gone
 */
export function withoutWindowShard(mocks: RoutingWindowMocks, windowId: number): void {
  const shardId = getShardNetworkObjectId(windowId);
  announcedShardIds = announcedShardIds.filter((id) => id !== shardId);
  mocks.shardAnnouncementListeners.dispose.forEach((listener) => listener(shardId));
}

/**
 * Start a service router and hand back the router object it registered under the generic network
 * object name — the object every consumer of that name actually calls.
 *
 * @param networkObjectSet The suite's mock of `networkObjectService.set`
 * @param startServiceRouter The router's start function
 */
export async function getRegisteredRouter<T>(
  networkObjectSet: Mock,
  startServiceRouter: () => Promise<void>,
): Promise<T> {
  networkObjectSet.mockResolvedValue(undefined);
  await startServiceRouter();
  return networkObjectSet.mock.calls[0][1];
}

/** Let queued work settle — serialized async work lands a microtask or two later */
export async function settle(): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
