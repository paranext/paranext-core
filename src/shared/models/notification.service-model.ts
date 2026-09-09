import { CommandHandlers } from 'papi-shared-types';
import { LocalizeKey } from 'platform-bible-utils';
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import type { WebViewId } from '@shared/models/web-view.model';

export type Severity = 'info' | 'warning' | 'error';

/**
 * The placements a notification can appear in, as a frozen array so it can be the single source of
 * truth for both the {@link NotificationPosition} type and the notification service's OpenRPC
 * `position` enum ({@link NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS} spreads from this).
 *
 * @experimental
 */
export const NOTIFICATION_POSITIONS = Object.freeze([
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
] as const);

/**
 * Where a notification is shown on screen. Mirrors the placements the host toast library supports.
 * Omit to use the app's default placement.
 *
 * @experimental
 */
export type NotificationPosition = (typeof NOTIFICATION_POSITIONS)[number];

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
   * Optional label for users to click when the notification shows. Always rendered as the
   * notification's PRIMARY action button - the visually emphasized one - while
   * {@link secondaryClickCommandLabel} always gets the muted secondary styling.
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
   * Always rendered as the visually SECONDARY button (muted styling, like the shadcn `secondary`
   * button variant) so the {@link clickCommandLabel} button keeps the emphasis - the platform
   * decides each button's styling from which field it came from, never from ordering.
   *
   * Automatically localized if this is a {@link LocalizeKey}.
   *
   * @experimental
   */
  secondaryClickCommandLabel?: string | LocalizeKey;
  /**
   * Optional command to run if users click on the secondary label in the notification. Like
   * {@link clickCommand}, the command is sent one argument:
   *
   * - NotificationId: The ID of the notification that was clicked
   *
   * The command handler should have the type signature {@link NotificationClickCommandHandler}.
   *
   * @experimental
   */
  secondaryClickCommand?: keyof CommandHandlers;
  /**
   * Optional command to run if the user dismisses the notification themselves - by swiping/dragging
   * it away, or by clicking the close button (if the host ever enables one). Sent no arguments
   * other than the notification id, like {@link clickCommand}:
   *
   * - NotificationId: The ID of the notification that was dismissed
   *
   * The command handler should have the type signature {@link NotificationClickCommandHandler}.
   *
   * IMPORTANT: this fires when the user dismisses the notification themselves (swiping/dragging it
   * away, or clicking a close button if the host ever enables one) AND when the notification
   * auto-closes because its `duration` elapsed - a timeout is treated as an implicit dismissal, so
   * a must-answer toast that times out still runs this command instead of vanishing silently. It
   * does NOT fire when the notification is dismissed programmatically via
   * {@link INotificationService.dismiss}, nor when the user clicks {@link clickCommand} /
   * {@link secondaryClickCommand}. Use this to treat a swipe-away (or timeout) as an explicit
   * decision - e.g. pairing it with a "postpone" command lets a two-button, must-answer-style toast
   * keep {@link dismissible} `true` (see the warning on {@link dismissible}). If you need the toast
   * to persist until the user actually answers, also set `duration` to `0`.
   *
   * @experimental
   */
  dismissClickCommand?: keyof CommandHandlers;
  /**
   * Optional placement of the notification on screen. When omitted, the app's default placement is
   * used.
   *
   * @experimental
   */
  position?: NotificationPosition;
  /**
   * Whether the user can dismiss the notification directly (e.g. by swiping/dragging it away, or
   * via a close button). Defaults to `true`.
   *
   * The host toast library (Sonner) gates both the {@link secondaryClickCommand} button and the
   * user-dismiss gesture that fires {@link dismissClickCommand} on this same flag, so a naive
   * `dismissible: false` would silently turn those controls into dead buttons. To prevent that, the
   * platform IGNORES `dismissible: false` when the notification renders a secondary action button
   * (a {@link secondaryClickCommand} paired with its {@link secondaryClickCommandLabel}) or has a
   * {@link dismissClickCommand} - the notification stays user-dismissible so those controls keep
   * working. `dismissible: false` therefore only takes effect on a notification with no secondary
   * button and no dismiss command. For a notification the user must explicitly answer, prefer
   * leaving `dismissible: true` and using {@link dismissClickCommand} so a swipe-away still counts
   * as a real (e.g. "postpone") decision.
   *
   * NOTE: `dismissible: false` does not keep the notification on screen. Auto-close is governed
   * solely by `duration` (when omitted, 10-35 seconds computed from message length), so a
   * non-dismissible notification still auto-closes on that timer. Also set `duration` to `0` (or
   * less) if the notification must stay up until it is answered or programmatically dismissed via
   * {@link INotificationService.dismiss}.
   *
   * @experimental
   */
  dismissible?: boolean;
  /**
   * Optional ID of a previous notification to update instead of showing a new notification.
   *
   * On an update (a `send` reusing an id that is still showing), any optional field you omit keeps
   * the value it had on the previous `send` for that id - omitting a field never clears it. Pass
   * the field explicitly to change it.
   *
   * The one exception is {@link webViewId}: which window a `send` runs in is decided in the main
   * process before the renderer ever sees the notification to merge it, so omitting `webViewId` on
   * an update does NOT keep routing to the window the original send resolved to - it always routes
   * by the rules {@link webViewId} documents, using only what this call passed. An update that lands
   * in a different window updates nothing: that window has never seen the id, so it opens a second
   * notification with no merge applied, and the original stays up in the window it was routed to.
   * Pass the same `webViewId` on every `send` that shares an id.
   */
  notificationId?: string | number;
  /**
   * Optional duration in milliseconds for how long the notification is displayed. To make the
   * notification show indefinitely, specify a `duration` of `0` or less.
   *
   * When omitted, duration is computed from message length (minimum 10 seconds, maximum 35
   * seconds).
   */
  duration?: number;
  /**
   * Optional id of a web view this notification is about. When provided, the notification is routed
   * to the window that owns that web view instead of the focused window — for a notification or
   * prompt raised about a specific project or editor that may not be the one the user is currently
   * looking at. Falls back to the focused window whenever the web view's window cannot be
   * determined — it is open nowhere, a window that might have it could not be asked, or it is
   * moving between windows.
   *
   * Omit for a generic notice, which should keep routing to the focused window — where the user is
   * looking is the right place for something that is not about anything in particular.
   *
   * The narrowest key available: a notification about a project with no web view currently open has
   * no `webViewId` to name, and routes to the focused window like a generic notice would.
   *
   * @experimental
   */
  webViewId?: WebViewId;
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

/**
 * OpenRPC documentation for the notification service network object.
 *
 * Attached in two places: each window's renderer registers its window-scoped name (e.g.
 * `NotificationService-f81d4fae-7dec-11d0-a765-00a0c91e6bf6`) with these docs, and the main process
 * attaches the same docs when it registers its service router under the generic
 * {@link NotificationServiceNetworkObjectName} — the name consumers actually call — so the public
 * name does not show undocumented in `rpc.discover`.
 *
 * @experimental
 */
export const NOTIFICATION_SERVICE_NETWORK_OBJECT_DOCS: NetworkObjectDocumentation = {
  // Marked at the object level rather than per method, which fans the marker out over every method
  // and the object's own existence method: the whole surface is experimental, including what
  // dismissing means now that a notification is shown by one window out of several. Matches the
  // `@experimental` tag above, which says the same thing to TypeScript consumers.
  'x-experimental': true,
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
              webViewId: { type: 'string' },
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
};
