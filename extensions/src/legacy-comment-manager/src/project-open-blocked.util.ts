import papi, { logger } from '@papi/frontend';
import {
  getErrorMessage,
  LocalizeKey,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
} from 'platform-bible-utils';

/**
 * Tells the user why the project was refused, as a warning notification (the notification service
 * localizes the key). A key with no translation is replaced by the generic reason, so the
 * notification never shows a raw key. Self-catching, so fire-and-forget callers never leak a
 * rejection.
 */
export async function notifyProjectOpenBlocked(reasonKey: LocalizeKey): Promise<void> {
  let message = PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
  try {
    const localizedReason = await papi.localization.getLocalizedString({ localizeKey: reasonKey });
    if (localizedReason && localizedReason !== reasonKey) message = reasonKey;
  } catch (e) {
    logger.warn(
      `Could not localize ${reasonKey}; sending the generic reason: ${getErrorMessage(e)}`,
    );
  }
  try {
    await papi.notifications.send({ message, severity: 'warning' });
  } catch (e) {
    logger.warn(`Failed to send the project-open-blocked notification: ${getErrorMessage(e)}`);
  }
}
