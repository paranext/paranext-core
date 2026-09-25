import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { getErrorMessage } from 'platform-bible-utils';

/** Fixed id, so switching language again replaces the prompt instead of stacking a second one. */
export const INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID = 'platform.interfaceLanguageRestartPrompt';

/**
 * Offers to restart the app after the user switches the primary interface language. Most of the UI
 * re-renders in the new language right away, but some parts keep the old one until a restart: the
 * main menu bar (PT-4503) and the Settings labels. The prompt stays up until the user restarts or
 * closes it; closing it means "restart later".
 *
 * Call it after a successful write from a place where the user changed the language on purpose, not
 * from the first-run setup, which restarts or re-renders on its own terms. Never rejects: a prompt
 * that cannot be shown is logged, since the language change itself already succeeded.
 *
 * @param previous The interface languages before the change (primary first)
 * @param next The interface languages that were written (primary first)
 */
export async function offerRestartAfterInterfaceLanguageChange(
  previous: readonly string[],
  next: readonly string[],
): Promise<void> {
  if (previous[0] === next[0]) return;
  try {
    await notificationService.send({
      message: '%interfaceLanguage_restartPrompt_message%',
      severity: 'info',
      clickCommand: 'platform.restart',
      clickCommandLabel: '%interfaceLanguage_restartPrompt_restartNow%',
      notificationId: INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID,
      duration: 0,
    });
  } catch (e) {
    logger.warn(
      `Could not offer a restart after the interface language changed: ${getErrorMessage(e)}`,
    );
  }
}
