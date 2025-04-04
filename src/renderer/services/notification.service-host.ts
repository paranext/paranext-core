import { toast } from 'sonner';
import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
  type PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { isLocalizeKey } from 'platform-bible-utils';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';

const mapOfNotificationIdsToToastIds = new Map<string | number, string | number>();

async function localize(text: string): Promise<string> {
  return isLocalizeKey(text) ? localizationService.getLocalizedString({ localizeKey: text }) : text;
}

async function send(notification: PlatformNotification): Promise<string | number> {
  let notificationString = '';
  try {
    notificationString = JSON.stringify(notification);
  } catch (e) {
    notificationString = '<error stringifying notification>';
  }
  logger.info(`Notification service host received notification: ${notificationString}`);

  const { message, severity, clickCommand, clickCommandLabel, notificationId } = notification;
  const localizedMessage = await localize(message);
  let toastId = notificationId ? mapOfNotificationIdsToToastIds.get(notificationId) : undefined;
  const toastOptions = {
    action:
      clickCommandLabel && clickCommand
        ? {
            label: await localize(clickCommandLabel),
            onClick: () => commandService.sendCommand(clickCommand),
            id: toastId,
          }
        : undefined,
    // Duration calc from https://paratextstudio.atlassian.net/browse/PT-2196?focusedCommentId=13075
    duration: Math.min(Math.max(localizedMessage.length * 265, 10000), 35000),
  };
  switch (severity) {
    case 'info':
      toastId = toast.info(localizedMessage, toastOptions);
      break;
    case 'warning':
      toastId = toast.warning(localizedMessage, toastOptions);
      break;
    case 'error':
      toastId = toast.error(localizedMessage, toastOptions);
      break;
    default:
      toastId = toast(localizedMessage, toastOptions);
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
export async function startNotificationService(): Promise<void> {
  await networkObjectService.set(
    NotificationServiceNetworkObjectName,
    notificationService,
    undefined,
    undefined,
    {
      summary: 'Service that sends notifications to users in the UI',
      methods: [
        {
          name: 'send',
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
      ],
    },
  );
}

export default startNotificationService;
