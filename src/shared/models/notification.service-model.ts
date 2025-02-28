import { CommandHandlers } from 'papi-shared-types';

export type Severity = 'info' | 'warning' | 'error';

/** Data needed to display a notification to the user */
export interface PlatformNotification {
  /** Text to display to the user */
  message: string;
  /** Severity of the notification */
  severity: Severity;
  /** Optional label for users to click when the notification shows */
  clickCommandLabel?: string;
  /** Optional command to run if users click on the label in the notification */
  clickCommand?: keyof CommandHandlers;
}

// In the future, we might want to return a promise to the toast ID that sonner opens so that
// callers can update or dismiss toasts. This would be useful for things like progress bars.
// If toast IDs are guessable, this would make it easy to manipulate other people's toasts.
// We could also generate a random ID and return it, mapping it to the real ID in the service host.

/** JSDOC DESTINATION notificationService */
export interface INotificationService {
  /**
   * Send a notification to the user
   *
   * @param notification Notification to send
   */
  send(notification: PlatformNotification): Promise<void>;
}

export const NotificationServiceNetworkObjectName = 'NotificationService';
