import { toast } from 'sonner';
import { CommandHandlers } from 'papi-shared-types';
import {
  NOTIFICATION_POSITIONS,
  NotificationServiceNetworkObjectName,
  type INotificationService,
  type PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { getErrorMessage, isLocalizeKey } from 'platform-bible-utils';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';

/** Caller-facing notification id -> the toast id Sonner actually rendered it under. */
const mapOfNotificationIdsToToastIds = new Map<string | number, string | number>();

/**
 * Caller-facing notification id -> the last notification we sent for it. An update-send merges over
 * this so omitting an optional field keeps its previously-set value instead of clobbering it.
 */
const lastNotificationById = new Map<string | number, PlatformNotification>();

/**
 * Counter backing {@link generateAutoNotificationId}. A send without a `notificationId` gets an id
 * from our own namespace rather than Sonner's internal numeric auto-ids, which would otherwise
 * share a namespace with caller-supplied numeric ids and collide.
 */
let autoAssignedNotificationIdCount = 0;

/** Mint a unique caller-facing id, in our own namespace, for a notification sent without one. */
function generateAutoNotificationId(): string {
  autoAssignedNotificationIdCount += 1;
  return `platform-notification-auto-${autoAssignedNotificationIdCount}`;
}

/** Drop all bookkeeping for a notification once its toast is removed (via any removal path). */
function forgetNotification(notificationId: string | number): void {
  mapOfNotificationIdsToToastIds.delete(notificationId);
  lastNotificationById.delete(notificationId);
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

  const { notificationId } = notification;
  // Merge an update-send over the last notification we sent for this id, so a field the caller omits
  // keeps its previous value. Sonner's own update re-derives every field from the incoming object
  // (and even forces `dismissible` back to true when omitted), so we merge here rather than relying
  // on it. A brand-new send (no id, or an id we no longer track) has nothing to merge over.
  const previousNotification =
    notificationId !== undefined ? lastNotificationById.get(notificationId) : undefined;
  const mergedNotification: PlatformNotification = previousNotification
    ? { ...previousNotification, ...notification }
    : notification;

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
    duration: requestedDuration,
  } = mergedNotification;

  // Localize the message and the (optional) button labels in parallel - each is an independent
  // cross-process round trip to the extension host, so doing them sequentially tripled the latency
  // to display and widened a re-entrancy window between the map read and write below.
  const [localizedMessage, localizedActionLabel, localizedSecondaryLabel] = await Promise.all([
    localize(message),
    clickCommandLabel && clickCommand ? localize(clickCommandLabel) : undefined,
    secondaryClickCommandLabel && secondaryClickCommand
      ? localize(secondaryClickCommandLabel)
      : undefined,
  ]);

  // A caller-supplied id keeps the caller's namespace; an id-less send gets one of our own ids
  // (never Sonner's internal numeric auto-id) so the two namespaces can't collide. `??` keeps the
  // legal ids `0` and `''`.
  const effectiveNotificationId: string | number = notificationId ?? generateAutoNotificationId();
  // Reuse the existing toast id (if we're updating a still-showing notification) so Sonner updates
  // in place instead of duplicating. `!== undefined` so the legal ids `0` and `''` update too.
  const existingToastId =
    notificationId !== undefined ? mapOfNotificationIdsToToastIds.get(notificationId) : undefined;

  // Sonner gates BOTH the cancel/secondary button and the swipe/close gesture (which fires
  // `onDismiss`) on `dismissible`, so honoring `dismissible: false` alongside either would silently
  // kill the very control the caller also asked for. Drop the `false` in that case so those controls
  // keep working (see the warning on PlatformNotification.dismissible).
  const effectiveDismissible =
    dismissible === false &&
    (secondaryClickCommand !== undefined || dismissClickCommand !== undefined)
      ? undefined
      : dismissible;

  let duration = Math.min(Math.max(localizedMessage.length * 265, 10000), 35000);
  if (requestedDuration !== undefined)
    duration = requestedDuration <= 0 ? Infinity : requestedDuration;

  // Every button/gesture that removes the toast runs its (optional) command with a guaranteed
  // `.catch`, then forgets this notification's bookkeeping so the id maps don't leak on that removal
  // path. Routing all of them through one helper is what keeps a `.catch`-less handler
  // unconstructible (the primary action button used to lack one).
  const runRemovalCommand =
    (command: keyof CommandHandlers | undefined, description: string) =>
    (): Promise<void> | void => {
      forgetNotification(effectiveNotificationId);
      if (command === undefined) return undefined;
      return commandService
        .sendCommand(command, effectiveNotificationId)
        .catch((e) =>
          logger.warn(
            `Notification service host ${description} command '${command}' failed: ${getErrorMessage(e)}`,
          ),
        );
    };

  const toastOptions = {
    // Reuse the existing toast id so Sonner updates in place. Sonner reads this from the top-level
    // `id` (not from `action.id`, which it ignores).
    id: existingToastId,
    action:
      localizedActionLabel !== undefined
        ? { label: localizedActionLabel, onClick: runRemovalCommand(clickCommand, 'click') }
        : undefined,
    // Second action button, rendered by Sonner as its `cancel` slot alongside `action`. Sends the
    // notification id as the command's single argument, like `action`.
    cancel:
      localizedSecondaryLabel !== undefined
        ? {
            label: localizedSecondaryLabel,
            onClick: runRemovalCommand(secondaryClickCommand, 'secondary click'),
          }
        : undefined,
    // Per-toast placement override; undefined leaves the Toaster's default placement in effect.
    position,
    dismissible: effectiveDismissible,
    // Fires when the USER dismisses the toast (swipe/drag past Sonner's threshold, or a close button
    // if one is ever enabled). Also forgets the notification so its map entries don't leak.
    onDismiss: runRemovalCommand(dismissClickCommand, 'dismiss'),
    // Fires when the toast auto-closes because `duration` elapsed. Runs the same dismiss command as a
    // user dismissal (a timeout counts as an implicit dismissal, so a must-answer toast can't vanish
    // having fired nothing) and likewise forgets the notification - covering the auto-close path that
    // dismiss() alone never cleaned up.
    onAutoClose: runRemovalCommand(dismissClickCommand, 'auto-close'),
    // Duration calc from https://paratextstudio.atlassian.net/browse/PT-2196?focusedCommentId=13075
    duration,
  };
  let toastId: string | number;
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
  mapOfNotificationIdsToToastIds.set(effectiveNotificationId, toastId);
  lastNotificationById.set(effectiveNotificationId, mergedNotification);
  return effectiveNotificationId;
}

/** Dismisses a notification from the user's UI. A no-op if the notification id is not found. */
async function dismiss(notificationId: string | number): Promise<void> {
  const toastId = mapOfNotificationIdsToToastIds.get(notificationId);
  if (toastId !== undefined) {
    toast.dismiss(toastId);
    forgetNotification(notificationId);
  }
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
                  position: { type: 'string', enum: [...NOTIFICATION_POSITIONS] },
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
