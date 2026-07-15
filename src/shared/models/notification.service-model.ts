import { CommandHandlers } from 'papi-shared-types';
import { LocalizeKey } from 'platform-bible-utils';

export type Severity = 'info' | 'warning' | 'error';

/**
 * Where a notification is shown on screen. Mirrors the placements the host toast library supports.
 * Omit to use the app's default placement.
 */
export type NotificationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

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
  /**
   * Optional command to run if users click on the label in the notification. The command will be
   * sent one argument:
   *
   * - NotificationId: The ID of the notification that was clicked
   *
   * The command handler should have the type signature {@link NotificationClickCommandHandler}.
   */
  clickCommand?: keyof CommandHandlers;
  /**
   * Optional label for a second action button, shown alongside {@link clickCommandLabel}. Provide
   * this together with {@link secondaryClickCommand} to give the notification two actions.
   *
   * Automatically localized if this is a {@link LocalizeKey}.
   */
  secondaryClickCommandLabel?: string | LocalizeKey;
  /**
   * Optional command to run if users click on the secondary label in the notification. Like
   * {@link clickCommand}, the command is sent one argument:
   *
   * - NotificationId: The ID of the notification that was clicked
   *
   * The command handler should have the type signature {@link NotificationClickCommandHandler}.
   */
  secondaryClickCommand?: keyof CommandHandlers;
  /**
   * Optional placement of the notification on screen. When omitted, the app's default placement is
   * used.
   */
  position?: NotificationPosition;
  /**
   * Whether the user can dismiss the notification directly (e.g. by swiping/dragging it away).
   * Defaults to `true`. Set to `false` for a notification that must be acknowledged through one of
   * its action buttons — combine with a `duration` of `0` or less to keep it up until then.
   */
  dismissible?: boolean;
  /** Optional ID of a previous notification to update instead of showing a new notification */
  notificationId?: string | number;
  /**
   * Optional duration in milliseconds for how long the notification is displayed. To make the
   * notification show indefinitely, specify a `duration` of `0` or less.
   *
   * When omitted, duration is computed from message length (minimum 10 seconds, maximum 35
   * seconds).
   */
  duration?: number;
}

/**
 * Type signature for a command handler that is called when a user clicks on a notification.
 *
 * Register a command handler with this signature and pass its name as the `clickCommand` property
 * of a {@link PlatformNotification} to have it called when the user clicks on the notification.
 *
 * @param notificationId ID of the notification that was clicked
 */
export type NotificationClickCommandHandler = (notificationId: string | number) => Promise<void>;

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
  /**
   * Dismiss a notification by its ID. If the notification is not found, this is a no-op.
   *
   * @param notificationId ID of the notification to dismiss, as returned by {@link send}
   */
  dismiss(notificationId: string | number): Promise<void>;
}

export const NotificationServiceNetworkObjectName = 'NotificationService';
