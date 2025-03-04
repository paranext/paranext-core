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

const sendNotification = async (notification: PlatformNotification) => {
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
};

const NOTIFICATION_COMMAND_NAME = 'platform.sendNotificationToUser';

/** Whether this service has finished setting up */
let isInitialized = false;

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

const initialize = () => {
  if (initializePromise) return initializePromise;

  initializePromise = (async (): Promise<void> => {
    if (isInitialized) return;

    commandService.registerCommand(NOTIFICATION_COMMAND_NAME, sendNotification, {
      method: {
        summary: "Send a notification to the user's UI",
        params: [
          {
            name: 'notification',
            required: true,
            summary: 'The notification to send',
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
                severity: { type: 'string' },
                clickCommand: { type: 'string' },
                clickCommandLabel: { type: 'string' },
                notificationId: { type: ['string', 'number'] },
              },
              required: ['message', 'severity'],
            },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: ['string', 'number'] },
        },
      },
    });

    isInitialized = true;
  })();

  return initializePromise;
};

const notificationService: INotificationService = {
  async send(notification: PlatformNotification) {
    return commandService.sendCommand(NOTIFICATION_COMMAND_NAME, notification);
  },
};

/** Register the network object that backs the notification service */
export default async function startNotificationService(): Promise<void> {
  await initialize();
  await networkObjectService.set(NotificationServiceNetworkObjectName, notificationService);
}
