import type { PlatformNotification } from '@papi/core';
import {
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutParatextSensitiveLocationBlock,
} from 'platform-bible-utils';

/**
 * Id every internet-block notification is sent under, so repeats — including ones raised by two web
 * views at once for the same machine-wide block — replace each other instead of stacking.
 */
export const INTERNET_BLOCKED_NOTIFICATION_ID = 'platformGetResources.internetBlocked';

/** The message shown for each way ParatextData blocks internet access. */
export type InternetBlockedMessageKey =
  | '%data_loading_error_internetAccess_disabled_2%'
  | '%data_loading_error_internetAccess_sensitiveLocation%';

/** Every message this module can produce, so a test can check each one is translated. */
export const INTERNET_BLOCKED_MESSAGE_KEYS: InternetBlockedMessageKey[] = [
  '%data_loading_error_internetAccess_disabled_2%',
  '%data_loading_error_internetAccess_sensitiveLocation%',
];

/**
 * The message explaining a ParatextData internet block. The single place this extension decides
 * which block an error is, so the dialog's inline alert and its notification cannot disagree.
 *
 * @param error The error, or its message, to classify
 * @returns The key to localize, or `undefined` if the error is not an internet block
 */
export function getInternetBlockedMessage(error: unknown): InternetBlockedMessageKey | undefined {
  if (isErrorMessageAboutParatextBlockingInternetAccess(error))
    return '%data_loading_error_internetAccess_disabled_2%';
  // "could not confirm this location is safe" rather than "this location is flagged": ParatextData
  // raises the same error when it cannot determine the location at all.
  if (isErrorMessageAboutParatextSensitiveLocationBlock(error))
    return '%data_loading_error_internetAccess_sensitiveLocation%';
  return undefined;
}

/**
 * Builds the notification for a ParatextData internet block, with an action that opens the Internet
 * & connectivity setting responsible.
 *
 * @param error The error, or its message, to classify
 * @returns The notification to send, or `undefined` if the error is not an internet block
 */
export function getInternetBlockedNotification(error: unknown): PlatformNotification | undefined {
  const message = getInternetBlockedMessage(error);
  if (!message) return undefined;

  return {
    severity: 'error',
    message,
    clickCommandLabel: '%general_open%',
    clickCommand: 'paratextRegistration.showInternetSettings',
    notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
  };
}
