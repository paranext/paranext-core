import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
} from '@shared/models/notification.service-model';
import { networkObjectService } from '@shared/services/network-object.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';

let networkObject: INotificationService;
let initializationPromise: Promise<void>;
async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const localNotificationService = await networkObjectService.get<INotificationService>(
            NotificationServiceNetworkObjectName,
          );
          if (!localNotificationService)
            throw new Error(
              `${NotificationServiceNetworkObjectName} is not available as a network object`,
            );
          networkObject = localNotificationService;
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

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
