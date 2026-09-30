import {
  isErrorMessageAboutParatextBlockingInternetAccess,
  isErrorMessageAboutRegistryAuthFailure,
} from 'platform-bible-utils';
import { CommandHandlers } from 'papi-shared-types';
import { PlatformNotification } from '@shared/models/notification.service-model';

/**
 * One id for every internet-block notification: a single block fails every subscription that
 * reaches the network, and without a shared id each one would raise its own identical
 * notification.
 *
 * `internet-block-notification.utils.ts` in the platform-get-resources extension sends the same
 * message under this same literal, so a block noticed there and here shows once. The two cannot
 * import each other across the extension boundary, so they are kept in step by hand; the tests
 * beside each pin the value.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const INTERNET_BLOCKED_NOTIFICATION_ID = 'platform.internetBlocked';

// TS doesn't realize these are valid command handler keys since they are defined in an extension
/* eslint-disable no-type-assertion/no-type-assertion */
const SHOW_INTERNET_SETTINGS_COMMAND =
  'paratextRegistration.showInternetSettings' as keyof CommandHandlers;
const SHOW_PARATEXT_REGISTRATION_COMMAND =
  'paratextRegistration.showParatextRegistration' as keyof CommandHandlers;
/* eslint-enable no-type-assertion/no-type-assertion */

/**
 * Builds the notification for a ParatextData failure the user can do something about — internet
 * blocked, or a registration that is no longer valid — with an action that opens the setting
 * responsible. Anything else gets no notification: its message describes ParatextData internals,
 * and there is nothing for the user to act on.
 *
 * @param exception The error, or its message, to classify
 * @returns The notification to send, or `undefined` if the error is not one the user can act on
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function constructParatextErrorNotification(
  exception: unknown,
): PlatformNotification | undefined {
  if (isErrorMessageAboutParatextBlockingInternetAccess(exception))
    return {
      severity: 'error',
      message: '%data_loading_error_internetAccess_disabled_2%',
      clickCommandLabel: '%general_open%',
      clickCommand: SHOW_INTERNET_SETTINGS_COMMAND,
      notificationId: INTERNET_BLOCKED_NOTIFICATION_ID,
    };

  if (isErrorMessageAboutRegistryAuthFailure(exception))
    return {
      severity: 'error',
      message: '%data_loading_error_paratextData_auth_failure%',
      clickCommandLabel: '%general_open%',
      clickCommand: SHOW_PARATEXT_REGISTRATION_COMMAND,
    };

  return undefined;
}
