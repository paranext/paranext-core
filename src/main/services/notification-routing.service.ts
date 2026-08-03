/**
 * Proxy service that registers under the generic "NotificationService" network object name and
 * routes calls to a window's scoped NotificationService (e.g. "NotificationService-1"). A new
 * notification goes to the focused window, so one raised by a background task appears where the
 * user is looking rather than in whichever renderer happened to start first; dismissing one goes to
 * the window that is actually showing it.
 */

import { getTargetWindowId, getWindows } from '@main/services/window-state.service';
import {
  INotificationService,
  NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS,
  NotificationServiceNetworkObjectName,
} from '@shared/models/notification.service-model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { getErrorMessage } from 'platform-bible-utils';

/** Get the scoped NotificationService for a specific window. Undefined if not yet registered. */
async function getScopedNotificationService(
  windowId: number,
): Promise<INotificationService | undefined> {
  return networkObjectService.get<INotificationService>(
    `${NotificationServiceNetworkObjectName}-${windowId}`,
  );
}

/** Get the scoped NotificationService for the focused window, throwing if none is available */
async function getTargetNotificationService(): Promise<INotificationService> {
  const targetId = getTargetWindowId();
  if (targetId === undefined)
    throw new Error('No windows available to route NotificationService call');
  const service = await getScopedNotificationService(targetId);
  if (!service)
    throw new Error(
      `NotificationService for window ${targetId} is not available. The renderer may not have started yet.`,
    );
  return service;
}

/**
 * Dismiss a notification in the window(s) that own it — the ones whose renderers are showing it,
 * which is whichever window was focused when it was sent, NOT necessarily the focused window now.
 *
 * This is the ownership fan-out `web-view-routing.service.ts` does with `findOwnerService`,
 * collapsed into a single round trip: `INotificationService` exposes only `send` and `dismiss` —
 * there is no way to ask a window "are you showing this id?" — but a window's `dismiss` is
 * contractually a no-op for an id it does not know (see `notification.service-host.ts`, which only
 * touches ids in its own tracking map). So dismissing in every window IS the owner lookup, without
 * the extra query hop.
 *
 * The alternative — adding an ownership query (e.g. `hasNotification`) to `INotificationService` —
 * was rejected: it would add public PAPI surface (the interface reaches `papi.d.ts`) and a method
 * every implementation must provide, to buy nothing the no-op contract does not already give.
 * Should a future caller need to know WHICH window showed a notification, that query is the minimal
 * addition to make, tagged `@experimental`.
 *
 * A window that cannot be reached is logged and skipped rather than failing the whole dismissal:
 * the other windows' dismissals are still worth doing, and `dismiss` is specified to resolve
 * quietly when the notification is not found.
 */
async function dismissInOwningWindows(notificationId: string | number): Promise<void> {
  const windowIds = getWindows().map((w) => w.id);
  if (windowIds.length === 0)
    throw new Error('No windows available to route NotificationService call');

  await Promise.all(
    windowIds.map(async (windowId) => {
      try {
        const service = await getScopedNotificationService(windowId);
        await service?.dismiss(notificationId);
      } catch (e) {
        logger.warn(
          `Failed to dismiss notification ${notificationId} in window ${windowId}: ${getErrorMessage(e)}`,
        );
      }
    }),
  );
}

const notificationServiceProxy: INotificationService = {
  send: async (...args) => (await getTargetNotificationService()).send(...args),
  dismiss: async (notificationId) => dismissInOwningWindows(notificationId),
};

/**
 * Register the NotificationService proxy under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startNotificationRoutingService(): Promise<void> {
  await networkObjectService.set<INotificationService>(
    NotificationServiceNetworkObjectName,
    notificationServiceProxy,
    undefined,
    undefined,
    // The generic name is the one consumers actually call, so it carries the same OpenRPC docs the
    // renderers attach to their window-scoped registrations
    NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS,
  );
  logger.info('NotificationService routing proxy registered');
}
