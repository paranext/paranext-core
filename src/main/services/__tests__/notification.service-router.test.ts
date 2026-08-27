import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startNotificationServiceRouter } from '@main/services/notification.service-router';
import {
  getRegisteredRouter,
  withoutWindowShard,
  withWindows as withWindowsServingShards,
  type ShardAnnouncementListeners,
} from '@main/services/__tests__/service-router-test.util';
import type { INotificationService } from '@shared/models/notification.service-model';
import type { NetworkObjectDetails } from '@shared/models/network-object.model';
import { NOTIFICATION_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';

const mocks = vi.hoisted(() => {
  // Where the router's shard index parks its subscriptions. Plain arrays rather than the subscribe
  // mocks' recorded calls, which `vi.clearAllMocks()` wipes between tests while the index — module
  // state that subscribes once at load — keeps listening.
  const shardAnnouncementListeners: ShardAnnouncementListeners = { create: [], dispose: [] };
  return {
    getTargetWindowId: vi.fn(),
    getReadyWindowIds: vi.fn(),
    getUnreachableWindowIds: vi.fn(),
    getAbandonedWindowIds: vi.fn(),
    networkObjectGet: vi.fn(),
    networkObjectSet: vi.fn(),
    loggerWarn: vi.fn(),
    shardAnnouncementListeners,
    onDidCreateNetworkObject: vi.fn((listener: (details: NetworkObjectDetails) => void) => {
      shardAnnouncementListeners.create.push(listener);
      return () => {};
    }),
    onDidDisposeNetworkObject: vi.fn((listener: (networkObjectId: string) => void) => {
      shardAnnouncementListeners.dispose.push(listener);
      return () => {};
    }),
  };
});

/** Wire windows whose notification service shards are the given objects */
function withWindows(
  shardsByWindowId: Record<string, unknown>,
  options?: { startingWindowIds?: string[]; unreachableWindowIds?: string[] },
) {
  withWindowsServingShards(
    mocks,
    NOTIFICATION_SERVICE_SHARD_OBJECT_TYPE,
    shardsByWindowId,
    options,
  );
}

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
  getUnreachableWindowIds: mocks.getUnreachableWindowIds,
  getAbandonedWindowIds: mocks.getAbandonedWindowIds,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
  onDidCreateNetworkObject: mocks.onDidCreateNetworkObject,
  onDidDisposeNetworkObject: mocks.onDidDisposeNetworkObject,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: mocks.loggerWarn, error: vi.fn() },
}));

/** Capture the router object registered under the generic name */
async function getRouter() {
  return getRegisteredRouter<INotificationService>(
    mocks.networkObjectSet,
    startNotificationServiceRouter,
  );
}

/**
 * A per-window notification service shard showing the given notification ids. `dismiss` mirrors the
 * renderer's contract: it is a no-op for an id this window is not showing.
 */
function windowShard(showingNotificationIds: (string | number)[]) {
  const dismissed: (string | number)[] = [];
  return {
    dismissed,
    send: vi.fn(async () => 'sent'),
    dismiss: vi.fn(async (notificationId: string | number) => {
      if (showingNotificationIds.includes(notificationId)) dismissed.push(notificationId);
    }),
  };
}

describe('notification service router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue('1');
    mocks.getReadyWindowIds.mockReturnValue([]);
    mocks.getUnreachableWindowIds.mockReturnValue([]);
    mocks.getAbandonedWindowIds.mockReturnValue([]);
  });

  test('sends to a window that registered its shard after the router started', async () => {
    // Routers start before any window exists, so every window they ever route to announced itself
    // later; a second window has to become routable the moment its shard registers
    withWindows({ 1: windowShard([]) });
    const router = await getRouter();
    const second = windowShard([]);
    withWindows({ 1: windowShard([]), 2: second });
    mocks.getTargetWindowId.mockReturnValue('2');

    await router.send({ message: 'hi', severity: 'info' });

    expect(second.send).toHaveBeenCalled();
  });

  test('stops dismissing in a window whose shard has announced that it is gone', async () => {
    // The disposal announcement is the only thing that says a window's shard died with it
    const closing = windowShard(['notification-1']);
    const survivor = windowShard(['notification-1']);
    withWindows({ 1: survivor, 2: closing });
    const router = await getRouter();

    withoutWindowShard(mocks, '2');
    await router.dismiss('notification-1');

    expect(closing.dismiss).not.toHaveBeenCalled();
    expect(survivor.dismissed).toEqual(['notification-1']);
  });

  test('sends a new notification to the focused window, where the user is looking', async () => {
    const focused = windowShard([]);
    const other = windowShard([]);
    withWindows({ 1: focused, 2: other });
    const router = await getRouter();

    await router.send({ message: 'hi', severity: 'info' });

    expect(focused.send).toHaveBeenCalled();
    expect(other.send).not.toHaveBeenCalled();
  });

  test('dismisses in the window showing the notification, not the focused one', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['notification-1']);
    withWindows({ 1: focused, 2: owner });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
    expect(focused.dismissed).toEqual([]);
  });

  test('still dismisses in the reachable windows when one window fails', async () => {
    const broken = windowShard([]);
    broken.dismiss.mockRejectedValue(new Error('window went away'));
    const owner = windowShard(['notification-1']);
    withWindows({ 1: broken, 2: owner });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
  });

  test('does not ask a window that has not registered its services yet', async () => {
    // A window that has not started cannot be showing a notification, and asking it stalls a
    // background task's fire-and-forget dismissal for the network service's registration retry
    const showing = windowShard(['notification-1']);
    const starting = windowShard([]);
    withWindows({ 1: showing, 2: starting }, { startingWindowIds: ['2'] });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(starting.dismiss).not.toHaveBeenCalled();
    expect(showing.dismissed).toEqual(['notification-1']);
  });

  test('says which window it could not dismiss in rather than skipping it in silence', async () => {
    // Readiness is keyed on the WINDOW service, so a ready window's notification service can still
    // be moments away. Skipping it silently is the one case that matters: the window that could not
    // be asked may be the one showing the toast, and the caller is told the dismissal succeeded
    // while it stays on screen with nothing in the log.
    const showing = windowShard([]);
    withWindows({ 1: showing, 2: undefined });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(mocks.loggerWarn).toHaveBeenCalledWith(expect.stringContaining('window 2'));
    expect(showing.dismiss).toHaveBeenCalledWith('notification-1');
  });

  test('dismisses quietly when there is no window to dismiss in', async () => {
    // `dismiss` is documented to resolve quietly when the notification is not found, and callers
    // treat it as fire-and-forget cleanup. During shutdown, or on macOS after the last window
    // closes, throwing here turns that cleanup into an unhandled rejection.
    withWindows({});
    const router = await getRouter();

    await expect(router.dismiss('notification-1')).resolves.toBeUndefined();
  });

  test('refuses to send rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    withWindows({});
    const router = await getRouter();

    await expect(router.send({ message: 'hi', severity: 'info' })).rejects.toThrow(
      'No windows available',
    );
  });
});
