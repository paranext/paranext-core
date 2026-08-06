import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startNotificationServiceRouter } from '@main/services/notification.service-router';
import {
  getRegisteredRouter,
  withWindows,
} from '@main/services/__tests__/service-router-test.util';
import type { INotificationService } from '@shared/models/notification.service-model';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getReadyWindowIds: vi.fn(),
  networkObjectGet: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getReadyWindowIds: mocks.getReadyWindowIds,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
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
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getReadyWindowIds.mockReturnValue([]);
  });

  test('sends a new notification to the focused window, where the user is looking', async () => {
    const focused = windowShard([]);
    const other = windowShard([]);
    withWindows(mocks, { 1: focused, 2: other });
    const router = await getRouter();

    await router.send({ message: 'hi', severity: 'info' });

    expect(focused.send).toHaveBeenCalled();
    expect(other.send).not.toHaveBeenCalled();
  });

  test('dismisses in the window showing the notification, not the focused one', async () => {
    const focused = windowShard([]);
    const owner = windowShard(['notification-1']);
    withWindows(mocks, { 1: focused, 2: owner });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
    expect(focused.dismissed).toEqual([]);
  });

  test('still dismisses in the reachable windows when one window fails', async () => {
    const broken = windowShard([]);
    broken.dismiss.mockRejectedValue(new Error('window went away'));
    const owner = windowShard(['notification-1']);
    withWindows(mocks, { 1: broken, 2: owner });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
  });

  test('does not ask a window that has not registered its services yet', async () => {
    // A window that has not started cannot be showing a notification, and asking it stalls a
    // background task's fire-and-forget dismissal for the network service's registration retry
    const showing = windowShard(['notification-1']);
    const starting = windowShard([]);
    withWindows(mocks, { 1: showing, 2: starting }, { unreadyWindowIds: [2] });
    const router = await getRouter();

    await router.dismiss('notification-1');

    expect(starting.dismiss).not.toHaveBeenCalled();
    expect(showing.dismissed).toEqual(['notification-1']);
  });

  test('dismisses quietly when there is no window to dismiss in', async () => {
    // `dismiss` is documented to resolve quietly when the notification is not found, and callers
    // treat it as fire-and-forget cleanup. During shutdown, or on macOS after the last window
    // closes, throwing here turns that cleanup into an unhandled rejection.
    withWindows(mocks, {});
    const router = await getRouter();

    await expect(router.dismiss('notification-1')).resolves.toBeUndefined();
  });

  test('refuses to send rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    withWindows(mocks, {});
    const router = await getRouter();

    await expect(router.send({ message: 'hi', severity: 'info' })).rejects.toThrow(
      'No windows available',
    );
  });
});
