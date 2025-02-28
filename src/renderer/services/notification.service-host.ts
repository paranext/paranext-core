import { toast } from 'sonner';
import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
  type PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import networkObjectService from '@shared/services/network-object.service';

const NOTIFICATION_COMMAND_NAME = 'platform.sendNotificationToUser';

const sendNotification = async (notification: PlatformNotification) => {
  const { message, severity, clickCommand, clickCommandLabel } = notification;
  const clickHandler = {
    action:
      clickCommandLabel && clickCommand
        ? {
            label: clickCommandLabel,
            onClick: () => commandService.sendCommand(clickCommand),
          }
        : undefined,
  };
  switch (severity) {
    case 'info':
      toast.info(message, clickHandler);
      break;
    case 'warning':
      toast.warning(message, clickHandler);
      break;
    case 'error':
      toast.error(message, clickHandler);
      break;
    default:
      toast(message);
  }
};

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
              },
              required: ['message', 'severity'],
            },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    });

    isInitialized = true;
  })();

  return initializePromise;
};

const notificationService: INotificationService = {
  async send(notification: PlatformNotification) {
    commandService.sendCommand(NOTIFICATION_COMMAND_NAME, notification);
  },
};

/** Register the network object that backs the notification service */
export default async function startNotificationService(): Promise<void> {
  await initialize();
  await networkObjectService.set(NotificationServiceNetworkObjectName, notificationService);
}
