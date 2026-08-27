/**
 * Service router for the notification service. Registers under the generic "NotificationService"
 * network object name and routes calls to a window's notification service shard (e.g.
 * "NotificationService-1"). A new notification goes to the focused window, so one raised by a
 * background task appears where the user is looking rather than in whichever renderer happened to
 * start first; dismissing one goes to the window that is actually showing it.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { getReadyWindowIds } from '@main/services/window-state.service';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import {
  INotificationService,
  NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS,
  NotificationServiceNetworkObjectName,
} from '@shared/models/notification.service-model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { NOTIFICATION_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * The notification service shard each window registers, found by network object type and window
 * attribute rather than by rebuilding the window-scoped name the window registered under.
 */
const notificationShards = createServiceShardIndex<INotificationService>({
  objectType: NOTIFICATION_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) =>
    networkObjectService.get<INotificationService>(networkObjectId),
});

/** Get the notification service shard for a specific window. Undefined if it has not registered. */
async function getNotificationShard(windowId: string): Promise<INotificationService | undefined> {
  return notificationShards.getShard(windowId);
}

/** Get the notification service shard for the focused window, throwing if none is available */
const getTargetNotificationShard = createTargetShardResolver(
  NotificationServiceNetworkObjectName,
  notificationShards,
);

/**
 * Dismiss a notification in the window(s) that own it — the ones whose renderers are showing it,
 * which is whichever window was focused when it was sent, NOT necessarily the focused window now.
 *
 * This is the ownership fan-out `web-view.service-router.ts` does with `findOwner`, collapsed into
 * a single round trip: `INotificationService` exposes only `send` and `dismiss` — there is no way
 * to ask a window "are you showing this id?" — but a window's `dismiss` is contractually a no-op
 * for an id it does not know (see `notification.service-shard.ts`, which only touches ids in its
 * own tracking map). So dismissing in every window IS the owner lookup, without the extra query
 * hop.
 *
 * The alternative — adding an ownership query (e.g. `hasNotification`) to `INotificationService` —
 * was rejected: it would add public PAPI surface (the interface reaches `papi.d.ts`) and a method
 * every implementation must provide, to buy nothing the no-op contract does not already give.
 * Should a future caller need to know WHICH window showed a notification, that query is the minimal
 * addition to make, tagged `@experimental`.
 *
 * Only windows that have registered their services are asked. A window whose renderer has not
 * started cannot be showing a notification, and asking it would stall this call for the network
 * service's whole registration retry — on a path that is often fire-and-forget cleanup, so the cost
 * would be invisible except as seconds of delay.
 *
 * A window that cannot be reached is logged and skipped rather than failing the whole dismissal:
 * the other windows' dismissals are still worth doing, and `dismiss` is specified to resolve
 * quietly when the notification is not found. For the same reason, having no window to dismiss in —
 * during shutdown, or on macOS once the last window closes — resolves rather than throwing: a
 * notification nobody is showing is already in the state the caller asked for.
 */
async function dismissInOwningWindows(notificationId: string | number): Promise<void> {
  await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const shard = await getNotificationShard(windowId);
        // Readiness is keyed on the window service; a renderer registers its notification service
        // moments apart from that one, so a ready window can still be missing it. That window could
        // not be asked, which is not the same as it having nothing to dismiss — and the one window
        // that cannot be asked may be the one showing the notification.
        if (!shard) {
          logger.warn(
            `Notification service for window ${windowId} is not registered, so notification ${notificationId} could not be dismissed there. If that window is showing it, it stays on screen.`,
          );
          return;
        }
        await shard.dismiss(notificationId);
      } catch (e) {
        logger.warn(
          `Failed to dismiss notification ${notificationId} in window ${windowId}: ${getErrorMessage(e)}`,
        );
      }
    }),
  );
}

/**
 * The router object registered under the generic "NotificationService" name. Declared as the
 * service it claims the name of, so a member added to `INotificationService` cannot silently become
 * a name the router does not answer for.
 */
const notificationServiceRouter: INotificationService = {
  send: async (...args) => (await getTargetNotificationShard()).send(...args),
  dismiss: async (notificationId) => dismissInOwningWindows(notificationId),
};

/**
 * Register the notification service router under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startNotificationServiceRouter(): Promise<void> {
  await networkObjectService.set<INotificationService>(
    NotificationServiceNetworkObjectName,
    notificationServiceRouter,
    undefined,
    undefined,
    // The generic name is the one consumers actually call, so it carries the same OpenRPC docs the
    // renderers attach to their window-scoped registrations
    NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS,
  );
  logger.info('Notification service router registered');
}
