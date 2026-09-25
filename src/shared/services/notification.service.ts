import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
} from '@shared/models/notification.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { createCachedInitializer, createSyncProxyForAsyncObject } from 'platform-bible-utils';

let networkObject: INotificationService;
const initialize = createCachedInitializer(async () => {
  const localNotificationService = await networkObjectService.get<INotificationService>(
    NotificationServiceNetworkObjectName,
  );
  if (!localNotificationService)
    throw new Error(`${NotificationServiceNetworkObjectName} is not available as a network object`);
  networkObject = localNotificationService;
});

/**
 * JSDOC SOURCE notificationService
 *
 * Service that sends notifications to users in the UI
 */
export const notificationService = createSyncProxyForAsyncObject<INotificationService>(async () => {
  await initialize();
  return networkObject;
});

export default notificationService;
