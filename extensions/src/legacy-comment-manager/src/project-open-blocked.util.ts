import papi, { logger } from '@papi/frontend';
import { getErrorMessage, isLocalizeKey, LocalizeKey } from 'platform-bible-utils';

/**
 * Sentinel that paranext-core's C# puts at the end of the message of any request it refuses because
 * the project cannot be opened (`ScrTextExtensions.ThrowIfOpenBlocked`); resolving a conflict is
 * one, since it writes verse text. Unanchored so it still matches behind a JSON-RPC prefix.
 *
 * Duplicated per extension — mirrors `platform-scripture/src/project-open-blocked.util.ts` — so
 * each extension's handling stays self-contained with no cross-extension imports.
 */
const PROJECT_OPEN_BLOCKED_REGEX = /\(PROJECT_OPEN_BLOCKED\)/;

/** The reason's localize key, which the C# message places immediately before the sentinel. */
const PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX = /(%[^%\s]+%)\s*\(PROJECT_OPEN_BLOCKED\)/;

/** Shown instead of a reason that could not be read, so the user never sees a raw message. */
const PROJECT_OPEN_BLOCKED_FALLBACK_KEY: LocalizeKey = '%project_unsupported_generic%';

/**
 * The localize key explaining why the project was refused, when `error` is the backend refusing a
 * project that cannot be opened; otherwise `undefined`.
 *
 * @param error Error, thrown value, or message string to inspect.
 */
export function getProjectOpenBlockedReasonKey(error: unknown): LocalizeKey | undefined {
  const message = getErrorMessage(error);
  if (!PROJECT_OPEN_BLOCKED_REGEX.test(message)) return undefined;
  const reasonKey = PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX.exec(message)?.[1];
  return reasonKey && isLocalizeKey(reasonKey) ? reasonKey : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}

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
