/**
 * Proxy service that registers under the generic "NotificationService" network object name and
 * routes calls to the focused window's scoped NotificationService (e.g. "NotificationService-1"),
 * so a notification raised by a background task appears in the window the user is looking at rather
 * than whichever renderer happened to start first.
 */

import { getTargetWindowId } from '@main/services/window-state.service';
import {
  INotificationService,
  NotificationServiceNetworkObjectName,
} from '@shared/models/notification.service-model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';

/** Get the scoped NotificationService for the focused window, throwing if none is available */
async function getTargetNotificationService(): Promise<INotificationService> {
  const targetId = getTargetWindowId();
  if (targetId === undefined)
    throw new Error('No windows available to route NotificationService call');
  const service = await networkObjectService.get<INotificationService>(
    `${NotificationServiceNetworkObjectName}-${targetId}`,
  );
  if (!service)
    throw new Error(
      `NotificationService for window ${targetId} is not available. The renderer may not have started yet.`,
    );
  return service;
}

const notificationServiceProxy: INotificationService = {
  send: async (...args) => (await getTargetNotificationService()).send(...args),
  dismiss: async (...args) => (await getTargetNotificationService()).dismiss(...args),
};

/**
 * Register the NotificationService proxy under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startNotificationRoutingService(): Promise<void> {
  await networkObjectService.set<INotificationService>(
    NotificationServiceNetworkObjectName,
    notificationServiceProxy,
  );
  logger.info('NotificationService routing proxy registered');
}
