import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { settingsService } from '@shared/services/settings.service';
import { getErrorMessage } from 'platform-bible-utils';

/** Fixed id, so switching language again replaces the prompt instead of stacking a second one. */
export const INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID = 'platform.interfaceLanguageRestartPrompt';

/**
 * The primary interface language when this window started, which is the language the parts that
 * need a restart are still showing. Undefined until {@link rememberLaunchInterfaceLanguage} has read
 * it, or if reading it failed.
 */
let launchPrimaryLanguage: string | undefined;

/**
 * Remembers the primary interface language this window started with, so switching back to it
 * withdraws the restart prompt instead of offering a restart nothing needs. Call once at renderer
 * startup. A window opened after a language switch remembers the newer language, so in that window
 * switching back to the app's original language still offers a restart. Never rejects: if the
 * setting cannot be read, the prompt is offered after every change of primary language.
 */
export async function rememberLaunchInterfaceLanguage(): Promise<void> {
  try {
    const languages = await settingsService.get('platform.interfaceLanguage');
    if (Array.isArray(languages) && typeof languages[0] === 'string')
      [launchPrimaryLanguage] = languages;
  } catch (e) {
    logger.warn(`Could not read the interface language at startup: ${getErrorMessage(e)}`);
  }
}

/**
 * Offers to restart the app after the user switches the primary interface language. Most of the UI
 * re-renders in the new language right away, but some parts keep the language the app started in
 * until a restart: the main menu bar (PT-4503) and the Settings labels. The prompt stays up until
 * the user restarts or closes it; closing it means "restart later". Switching back to the start
 * language withdraws the prompt, since nothing then needs a restart.
 *
 * Call it after a successful write from a place where the user changed the language on purpose, not
 * from the first-run setup, which restarts or re-renders on its own terms. Never rejects: a prompt
 * that cannot be shown or withdrawn is logged, since the language change itself already succeeded.
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
    if (launchPrimaryLanguage !== undefined && next[0] === launchPrimaryLanguage) {
      await notificationService.dismiss(INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID);
      return;
    }
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
      `Could not update the restart prompt after the interface language changed: ${getErrorMessage(e)}`,
    );
  }
}
