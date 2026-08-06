/**
 * Helpers shared by the service router suites (`command.`, `notification.`, `web-view.` and
 * `window.service-router.test.ts`). Each of those mocks `window-state.service` and the network
 * object service the same way, so the window wiring and the router capture live here rather than
 * being copied four times and drifting apart.
 *
 * The mocks themselves stay in each suite: `vi.mock` factories are hoisted above every import, so
 * they cannot reach anything this module exports.
 */

import type { Mock } from 'vitest';

/** The mocked `window-state.service` and network object lookups a service router fans out through */
export interface RoutingWindowMocks {
  /** Mock of `getReadyWindowIds`, which reports only the windows a fan-out can get an answer from */
  getReadyWindowIds: Mock;
  /** Mock of `networkObjectService.get`, which resolves a window's shard by network object id */
  networkObjectGet: Mock;
}

/**
 * Wire the given windows, each serving the shard given for it.
 *
 * Windows listed in `unreadyWindowIds` are tracked but have not registered their shards — the state
 * a window is in from the moment it is shown until its renderer finishes starting. Their shards are
 * still resolvable here on purpose: a fan-out that asks them anyway should be visible as a call
 * that was made, not hidden behind an unresolvable name.
 *
 * @param mocks The suite's mocked window state and network object lookups
 * @param shardsByWindowId Shard each window serves, keyed by window ID
 * @param options.unreadyWindowIds Windows to track without marking them able to answer
 */
export function withWindows(
  mocks: RoutingWindowMocks,
  shardsByWindowId: Record<number, unknown>,
  options?: { unreadyWindowIds?: number[] },
): void {
  const windowIds = Object.keys(shardsByWindowId).map(Number);
  const unreadyWindowIds = options?.unreadyWindowIds ?? [];
  mocks.getReadyWindowIds.mockReturnValue(windowIds.filter((id) => !unreadyWindowIds.includes(id)));
  mocks.networkObjectGet.mockImplementation(async (networkObjectId: string) => {
    const windowId = Number(networkObjectId.split('-').pop());
    return shardsByWindowId[windowId];
  });
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
