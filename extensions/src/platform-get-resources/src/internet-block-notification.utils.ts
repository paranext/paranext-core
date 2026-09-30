import type { PlatformNotification } from '@papi/core';
import { isErrorMessageAboutParatextBlockingInternetAccess } from 'platform-bible-utils';

/**
 * Id every internet-block notification is sent under, so repeats — including ones raised at the
 * same time by two web views, or by a failing data-provider subscription — replace each other
 * instead of stacking. One block is one machine-wide condition, however many places notice it.
 *
 * `constructParatextErrorNotification` in `src/shared/utils/paratext-error-notification.util.ts`
 * sends the same message under this same literal. The two cannot import each other across the
 * extension boundary, so they are kept in step by hand; the test beside this file pins the value.
 */
export const INTERNET_BLOCKED_NOTIFICATION_ID = 'platform.internetBlocked';

/** Every message this module can produce, so a test can check each one is translated. */
export const INTERNET_BLOCKED_MESSAGE_KEYS = [
  '%data_loading_error_internetAccess_disabled_2%',
] as const;

/** The message shown when internet access is blocked. */
export type InternetBlockedMessageKey = (typeof INTERNET_BLOCKED_MESSAGE_KEYS)[number];

/**
 * The message explaining an internet block. The single place this extension decides whether an
 * error is one, so the dialog's inline alert and its notification cannot disagree.
 *
 * @param error The error, or its message, to classify
 * @returns The key to localize, or `undefined` if the error is not an internet block
 */
export function getInternetBlockedMessageKey(
  error: unknown,
): InternetBlockedMessageKey | undefined {
  if (isErrorMessageAboutParatextBlockingInternetAccess(error))
    return '%data_loading_error_internetAccess_disabled_2%';
  return undefined;
}

/**
 * Builds the notification for an internet block, with an action that opens the Internet &
 * connectivity setting responsible.
 *
 * @param error The error, or its message, to classify
 * @returns The notification to send, or `undefined` if the error is not an internet block
 */
export function getInternetBlockedNotification(error: unknown): PlatformNotification | undefined {
  const message = getInternetBlockedMessageKey(error);
  if (!message) return undefined;

  return {
    severity: 'error',
    message,
    clickCommandLabel: '%general_open%',
    clickCommand: 'paratextRegistration.showInternetSettings',
    notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
  };
}
