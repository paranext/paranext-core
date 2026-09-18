import type { PlatformNotification } from '@papi/core';
import {
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutParatextSensitiveLocationBlock,
  type LocalizeKey,
} from 'platform-bible-utils';

function getInternetBlockedMessage(error: unknown): LocalizeKey | undefined {
  if (isErrorMessageAboutParatextBlockingInternetAccess(error))
    return '%data_loading_error_internetAccess_disabled_2%';
  // Worded as "could not confirm this location is safe" rather than "this location is flagged":
  // ParatextData raises the same error when it cannot determine the location at all.
  if (isErrorMessageAboutParatextSensitiveLocationBlock(error))
    return '%data_loading_error_internetAccess_sensitiveLocation%';
  return undefined;
}

/**
 * Builds the notification for a failure caused by ParatextData blocking internet access, with an
 * action that opens the Internet & connectivity setting responsible.
 *
 * ParatextData blocks in two ways that need different wording: "Disable all Internet access" blocks
 * every request, while "Block internet when in sensitive locations" blocks only where it cannot
 * confirm the current location is safe.
 *
 * @param error The error, or its message, to classify
 * @param notificationId Id to send the notification under, so a repeated failure replaces the
 *   earlier notification instead of stacking another
 * @returns The notification to send, or `undefined` if the error is not an internet block
 */
export function getInternetBlockedNotification(
  error: unknown,
  notificationId: string,
): PlatformNotification | undefined {
  const message = getInternetBlockedMessage(error);
  if (!message) return undefined;

  return {
    severity: 'error',
    message,
    clickCommandLabel: '%general_open%',
    clickCommand: 'paratextRegistration.showInternetSettings',
    notificationId,
  };
}
