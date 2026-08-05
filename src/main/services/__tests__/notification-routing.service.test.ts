import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startNotificationRoutingService } from '@main/services/notification-routing.service';
import { getRegisteredProxy, withWindows } from '@main/services/__tests__/routing-proxy-test.util';
import type { INotificationService } from '@shared/models/notification.service-model';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getWindows: vi.fn(),
  getReadyWindowIds: vi.fn(),
  networkObjectGet: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getWindows: mocks.getWindows,
  getReadyWindowIds: mocks.getReadyWindowIds,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
}));

/** Capture the proxy the service registers under the generic name */
async function getProxy() {
  return getRegisteredProxy<INotificationService>(
    mocks.networkObjectSet,
    startNotificationRoutingService,
  );
}

/**
 * A scoped per-window NotificationService showing the given notification ids. `dismiss` mirrors the
 * renderer's contract: it is a no-op for an id this window is not showing.
 */
function windowService(showingNotificationIds: (string | number)[]) {
  const dismissed: (string | number)[] = [];
  return {
    dismissed,
    send: vi.fn(async () => 'sent'),
    dismiss: vi.fn(async (notificationId: string | number) => {
      if (showingNotificationIds.includes(notificationId)) dismissed.push(notificationId);
    }),
  };
}

describe('notification routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
    mocks.getWindows.mockReturnValue([]);
    mocks.getReadyWindowIds.mockReturnValue([]);
  });

  test('sends a new notification to the focused window, where the user is looking', async () => {
    const focused = windowService([]);
    const other = windowService([]);
    withWindows(mocks, { 1: focused, 2: other });
    const proxy = await getProxy();

    await proxy.send({ message: 'hi', severity: 'info' });

    expect(focused.send).toHaveBeenCalled();
    expect(other.send).not.toHaveBeenCalled();
  });

  test('dismisses in the window showing the notification, not the focused one', async () => {
    const focused = windowService([]);
    const owner = windowService(['notification-1']);
    withWindows(mocks, { 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
    expect(focused.dismissed).toEqual([]);
  });

  test('still dismisses in the reachable windows when one window fails', async () => {
    const broken = windowService([]);
    broken.dismiss.mockRejectedValue(new Error('window went away'));
    const owner = windowService(['notification-1']);
    withWindows(mocks, { 1: broken, 2: owner });
    const proxy = await getProxy();

    await proxy.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
  });

  test('does not ask a window that has not registered its services yet', async () => {
    // A window that has not started cannot be showing a notification, and asking it stalls a
    // background task's fire-and-forget dismissal for the network service's registration retry
    const showing = windowService(['notification-1']);
    const starting = windowService([]);
    withWindows(mocks, { 1: showing, 2: starting }, { unreadyWindowIds: [2] });
    const proxy = await getProxy();

    await proxy.dismiss('notification-1');

    expect(starting.dismiss).not.toHaveBeenCalled();
    expect(showing.dismissed).toEqual(['notification-1']);
  });

  test('dismisses quietly when there is no window to dismiss in', async () => {
    // `dismiss` is documented to resolve quietly when the notification is not found, and callers
    // treat it as fire-and-forget cleanup. During shutdown, or on macOS after the last window
    // closes, throwing here turns that cleanup into an unhandled rejection.
    withWindows(mocks, {});
    const proxy = await getProxy();

    await expect(proxy.dismiss('notification-1')).resolves.toBeUndefined();
  });

  test('refuses to send rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    withWindows(mocks, {});
    const proxy = await getProxy();

    await expect(proxy.send({ message: 'hi', severity: 'info' })).rejects.toThrow(
      'No windows available',
    );
  });
});
