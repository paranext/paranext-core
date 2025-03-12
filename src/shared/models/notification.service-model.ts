import { CommandHandlers } from 'papi-shared-types';
import { LocalizeKey } from 'platform-bible-utils';

export type Severity = 'info' | 'warning' | 'error';

/** Data needed to display a notification to the user */
export interface PlatformNotification {
  /**
   * Text to display to the user.
   *
   * Automatically localized if this is a {@link LocalizeKey}.
   */
  message: string | LocalizeKey;
  /** Severity of the notification */
  severity: Severity;
  /**
   * Optional label for users to click when the notification shows.
   *
   * Automatically localized if this is a {@link LocalizeKey}.
   */
  clickCommandLabel?: string | LocalizeKey;
  /** Optional command to run if users click on the label in the notification */
  clickCommand?: keyof CommandHandlers;
  /** Optional ID of a previous notification to update instead of showing a new notification */
  notificationId?: string | number;
}

/** JSDOC DESTINATION notificationService */
export interface INotificationService {
  /**
   * Send a notification to the user. If a notification with the same ID is already showing, it will
   * be updated with the new notification.
   *
   * @param notification Notification to send
   * @returns Promise that resolves with the ID of the notification
   */
  send(notification: PlatformNotification): Promise<string | number>;
}

export const NotificationServiceNetworkObjectName = 'NotificationService';
