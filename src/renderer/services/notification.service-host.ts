import { toast } from 'sonner';
import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
  type PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import networkObjectService from '@shared/services/network-object.service';
import { isLocalizeKey } from 'platform-bible-utils';
import localizationService from '@shared/services/localization.service';

const mapOfNotificationIdsToToastIds = new Map<string | number, string | number>();

async function localize(text: string): Promise<string> {
  return isLocalizeKey(text) ? localizationService.getLocalizedString({ localizeKey: text }) : text;
}

async function send(notification: PlatformNotification): Promise<string | number> {
  const { message, severity, clickCommand, clickCommandLabel, notificationId } = notification;
  const localizedMessage = await localize(message);
  let toastId = notificationId ? mapOfNotificationIdsToToastIds.get(notificationId) : undefined;
  const clickHandler = {
    action:
      clickCommandLabel && clickCommand
        ? {
            label: await localize(clickCommandLabel),
            onClick: () => commandService.sendCommand(clickCommand),
            id: toastId,
          }
        : undefined,
  };
  switch (severity) {
    case 'info':
      toastId = toast.info(localizedMessage, clickHandler);
      break;
    case 'warning':
      toastId = toast.warning(localizedMessage, clickHandler);
      break;
    case 'error':
      toastId = toast.error(localizedMessage, clickHandler);
      break;
    default:
      toastId = toast(localizedMessage, clickHandler);
      break;
  }
  const effectiveNotificationId = notificationId ?? toastId;
  mapOfNotificationIdsToToastIds.set(effectiveNotificationId, toastId);
  return effectiveNotificationId;
}

const notificationService: INotificationService = {
  send,
};

/** Register the network object that backs the notification service */
export default async function startNotificationService(): Promise<void> {
  await networkObjectService.set(NotificationServiceNetworkObjectName, notificationService);
}
