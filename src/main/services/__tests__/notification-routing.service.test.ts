import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { startNotificationRoutingService } from '@main/services/notification-routing.service';

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  getWindows: vi.fn(),
  networkObjectGet: vi.fn(),
  networkObjectSet: vi.fn(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  getWindows: mocks.getWindows,
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: mocks.networkObjectGet, set: mocks.networkObjectSet },
}));

/** Capture the proxy the service registers under the generic name */
async function getProxy() {
  mocks.networkObjectSet.mockResolvedValue(undefined);
  await startNotificationRoutingService();
  return mocks.networkObjectSet.mock.calls[0][1];
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

/** Wire the given windows, each serving the scoped service given for it */
function withWindows(servicesByWindowId: Record<number, ReturnType<typeof windowService>>) {
  const ids = Object.keys(servicesByWindowId).map(Number);
  mocks.getWindows.mockReturnValue(ids.map((id) => ({ id })));
  mocks.networkObjectGet.mockImplementation(async (name: string) => {
    const windowId = Number(name.split('-').pop());
    return servicesByWindowId[windowId];
  });
}

describe('notification routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('sends a new notification to the focused window, where the user is looking', async () => {
    const focused = windowService([]);
    const other = windowService([]);
    withWindows({ 1: focused, 2: other });
    const proxy = await getProxy();

    await proxy.send({ message: 'hi', severity: 'info' });

    expect(focused.send).toHaveBeenCalled();
    expect(other.send).not.toHaveBeenCalled();
  });

  test('dismisses in the window showing the notification, not the focused one', async () => {
    const focused = windowService([]);
    const owner = windowService(['notification-1']);
    withWindows({ 1: focused, 2: owner });
    const proxy = await getProxy();

    await proxy.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
    expect(focused.dismissed).toEqual([]);
  });

  test('still dismisses in the reachable windows when one window fails', async () => {
    const broken = windowService([]);
    broken.dismiss.mockRejectedValue(new Error('window went away'));
    const owner = windowService(['notification-1']);
    withWindows({ 1: broken, 2: owner });
    const proxy = await getProxy();

    await proxy.dismiss('notification-1');

    expect(owner.dismissed).toEqual(['notification-1']);
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    mocks.getWindows.mockReturnValue([]);
    const proxy = await getProxy();

    await expect(proxy.dismiss('notification-1')).rejects.toThrow('No windows available');
    await expect(proxy.send({ message: 'hi', severity: 'info' })).rejects.toThrow(
      'No windows available',
    );
  });
});
