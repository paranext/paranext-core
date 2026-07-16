import { toast } from 'sonner';
import {
  NotificationServiceNetworkObjectName,
  type INotificationService,
  type NotificationPosition,
  type PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { getErrorMessage, isLocalizeKey } from 'platform-bible-utils';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';

// The six placements accepted by `NotificationPosition`. OpenRPC schemas are plain data with no
// link back to the TS type, so this can't be derived automatically; the `NotificationPosition[]`
// annotation at least guards against typos. Keep in sync with that type by hand.
const notificationPositionValues: NotificationPosition[] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

const mapOfNotificationIdsToToastIds = new Map<string | number, string | number>();

/**
 * How long, in milliseconds, `dismiss()` remembers a notification id after dismissing it. Guards
 * against a stale in-flight `send()` update for that same id arriving shortly after its own
 * dismissal (e.g. a fire-and-forget progress update racing the producer's own `dismiss()` call,
 * observed live with the Send/Receive progress toast when a sync aborted quickly): without this,
 * `send()` would find no toast mapping and resurrect a brand-new toast that nothing then dismisses.
 * Deliberately short - long enough to catch a race, short enough that a caller legitimately reusing
 * the id later still works normally.
 */
const dismissedNotificationIdGracePeriodMs = 5000;

/**
 * NotificationId -> the `Date.now()` timestamp `dismiss()` was called for it. Read and pruned by
 * {@link pruneRecentlyDismissedNotificationIds}; see {@link dismissedNotificationIdGracePeriodMs}.
 */
const recentlyDismissedNotificationIds = new Map<string | number, number>();

/**
 * Drop entries from {@link recentlyDismissedNotificationIds} older than
 * {@link dismissedNotificationIdGracePeriodMs}. Called opportunistically from `send()` and
 * `dismiss()` so the map doesn't grow unboundedly; no timers involved.
 */
function pruneRecentlyDismissedNotificationIds(): void {
  const now = Date.now();
  recentlyDismissedNotificationIds.forEach((dismissedAt, notificationId) => {
    if (now - dismissedAt > dismissedNotificationIdGracePeriodMs)
      recentlyDismissedNotificationIds.delete(notificationId);
  });
}

async function localize(text: string): Promise<string> {
  return isLocalizeKey(text) ? localizationService.getLocalizedString({ localizeKey: text }) : text;
}

async function send(notification: PlatformNotification): Promise<string | number> {
  let notificationString = '';
  try {
    notificationString = JSON.stringify(notification);
  } catch (e) {
    notificationString = `<error stringifying notification: ${e}>`;
  }
  logger.info(`Notification service host received notification: ${notificationString}`);

  const {
    message,
    severity,
    clickCommand,
    clickCommandLabel,
    secondaryClickCommand,
    secondaryClickCommandLabel,
    position,
    dismissible,
    dismissClickCommand,
    notificationId,
  } = notification;

  pruneRecentlyDismissedNotificationIds();
  // Only update-style sends (an explicit, existing notificationId) are ever suppressed here - a
  // brand-new notification (no notificationId passed in) is never affected by this check, and a
  // notificationId reused after the grace period has elapsed is treated as a normal, new send.
  if (notificationId !== undefined && recentlyDismissedNotificationIds.has(notificationId)) {
    logger.debug(
      `Notification service host dropped send() for notification id '${notificationId}': it was dismissed within the last ${dismissedNotificationIdGracePeriodMs}ms, so this is treated as a stale in-flight update racing its own dismiss() rather than a new toast.`,
    );
    return notificationId;
  }

  const localizedMessage = await localize(message);
  let toastId = notificationId ? mapOfNotificationIdsToToastIds.get(notificationId) : undefined;
  // Need to define effectiveNotificationId here to access it in onClick, but we need toastId to
  // be definitely assigned before we can assign effectiveNotificationId, so we use a let and
  // assign it after the switch.
  let effectiveNotificationId: number | string;
  let duration = Math.min(Math.max(localizedMessage.length * 265, 10000), 35000);
  if (notification.duration !== undefined)
    duration = notification.duration <= 0 ? Infinity : notification.duration;
  const toastOptions = {
    // When re-sending with the same notificationId, reuse the existing toast id so Sonner
    // updates the existing toast instead of creating a duplicate. Sonner reads this from the
    // top-level `id` (not from `action.id`, which it ignores).
    id: toastId,
    action:
      clickCommandLabel && clickCommand
        ? {
            label: await localize(clickCommandLabel),
            onClick: () => commandService.sendCommand(clickCommand, effectiveNotificationId),
          }
        : undefined,
    // Second action button, rendered by Sonner as its `cancel` slot alongside `action`. Built the
    // same way as `action`, and like it, sends the notification id as the command's single argument.
    cancel:
      secondaryClickCommandLabel && secondaryClickCommand
        ? {
            label: await localize(secondaryClickCommandLabel),
            onClick: () =>
              commandService
                .sendCommand(secondaryClickCommand, effectiveNotificationId)
                .catch((e) =>
                  logger.warn(
                    `Notification service host secondary click command '${secondaryClickCommand}' failed: ${getErrorMessage(e)}`,
                  ),
                ),
          }
        : undefined,
    // Per-toast placement override; undefined leaves the Toaster's default placement in effect.
    position,
    // Whether the user can swipe/drag the toast away; undefined leaves Sonner's default (true). Set
    // false only for a toast with no secondary action - see the warning on
    // PlatformNotification.dismissible for why: Sonner gates the cancel/secondary button's onClick on
    // this same flag, so `false` silently disables a second action button too.
    dismissible,
    // Fires only when the USER dismisses the toast (swipe/drag past Sonner's threshold, or a close
    // button click if one is ever enabled) - never for our own programmatic `dismiss()`, nor for
    // auto-close when `duration` elapses. See PlatformNotification.dismissClickCommand for the full
    // contract (verified against the Sonner 1.7.4 source).
    onDismiss: dismissClickCommand
      ? () =>
          commandService
            .sendCommand(dismissClickCommand, effectiveNotificationId)
            .catch((e) =>
              logger.warn(
                `Notification service host dismiss command '${dismissClickCommand}' failed: ${getErrorMessage(e)}`,
              ),
            )
      : undefined,
    // Duration calc from https://paratextstudio.atlassian.net/browse/PT-2196?focusedCommentId=13075
    duration,
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
  effectiveNotificationId = notificationId ?? toastId;
  mapOfNotificationIdsToToastIds.set(effectiveNotificationId, toastId);
  return effectiveNotificationId;
}

/**
 * Dismisses a notification from the user's UI.
 *
 * Also remembers `notificationId` for a short grace period
 * ({@link dismissedNotificationIdGracePeriodMs}) after dismissing it. If `send()` is called again
 * with the same id while it's still in that window, the send is dropped rather than resurrecting a
 * new toast - see the comment on {@link dismissedNotificationIdGracePeriodMs} for why. Reusing the
 * id again after the grace period elapses works normally.
 */
async function dismiss(notificationId: string | number): Promise<void> {
  pruneRecentlyDismissedNotificationIds();
  const toastId = mapOfNotificationIdsToToastIds.get(notificationId);
  if (toastId !== undefined) {
    toast.dismiss(toastId);
    mapOfNotificationIdsToToastIds.delete(notificationId);
  }
  recentlyDismissedNotificationIds.set(notificationId, Date.now());
}

const notificationService: INotificationService = {
  send,
  dismiss,
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
                  secondaryClickCommand: { type: 'string' },
                  secondaryClickCommandLabel: { type: 'string' },
                  dismissClickCommand: { type: 'string' },
                  position: { type: 'string', enum: notificationPositionValues },
                  dismissible: { type: 'boolean' },
                  notificationId: { type: ['string', 'number'] },
                  duration: { type: 'number' },
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
        {
          name: 'dismiss',
          summary: "Dismiss a notification from the user's UI",
          params: [
            {
              name: 'notificationId',
              required: true,
              summary: 'The ID of the notification to dismiss',
              schema: { type: ['string', 'number'] },
            },
          ],
          result: {
            name: 'return value',
            schema: { type: 'null' },
          },
        },
      ],
    },
  );
}

export default startNotificationService;
