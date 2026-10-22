import { LanguageStrings } from './extension-contributions/localized-strings.model';
import { LocalizeKey } from './extension-contributions/menus.model';
import { isLocalizeKey } from './string-util';
import { getErrorMessage } from './util';

/**
 * Sentinel that paranext-core's C# puts at the end of the message of any request it refuses because
 * the project cannot be opened (`ScrTextExtensions.ThrowIfOpenBlocked`). Unanchored so it still
 * matches behind a JSON-RPC prefix or inside the quotes `getErrorMessage` puts around a bare
 * string.
 */
const PROJECT_OPEN_BLOCKED_REGEX = /\(PROJECT_OPEN_BLOCKED\)/;

/** The reason's localize key, which the C# message places immediately before the sentinel. */
const PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX = /(%[^%\s]+%)\s*\(PROJECT_OPEN_BLOCKED\)/;

/**
 * Shown instead of a project's `unsupportedReason` when that reason could not be read or has no
 * translation, so the user never sees a raw key or message.
 */
export const PROJECT_OPEN_BLOCKED_FALLBACK_KEY =
  '%project_unsupported_generic%' as const satisfies LocalizeKey;

/** Shown when not even {@link PROJECT_OPEN_BLOCKED_FALLBACK_KEY} can be localized. */
export const PROJECT_OPEN_BLOCKED_FALLBACK_MESSAGE = "This project can't be opened.";

/**
 * A project's `unsupportedReason` as a key that can be localized. The field is always a localize
 * key; anything else is replaced by {@link PROJECT_OPEN_BLOCKED_FALLBACK_KEY} rather than shown
 * raw.
 *
 * @param unsupportedReason The project's `unsupportedReason`
 * @returns `unsupportedReason` if it is a localize key, otherwise the generic reason's key
 */
export function toProjectOpenBlockedReasonKey(unsupportedReason: string): LocalizeKey {
  return isLocalizeKey(unsupportedReason) ? unsupportedReason : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}

/**
 * The localize key explaining why the project was refused, when `error` is paranext-core's C#
 * refusing a request on a project that cannot be opened (the message ends with the
 * `(PROJECT_OPEN_BLOCKED)` sentinel).
 *
 * @param error Error, thrown value, or message string to inspect
 * @returns The reason's localize key, {@link PROJECT_OPEN_BLOCKED_FALLBACK_KEY} if the refusal names
 *   no readable reason, or `undefined` if `error` is not such a refusal
 */
export function getProjectOpenBlockedReasonKey(error: unknown): LocalizeKey | undefined {
  if (error === undefined) return undefined;
  const message = getErrorMessage(error);
  if (!PROJECT_OPEN_BLOCKED_REGEX.test(message)) return undefined;
  const reasonKey = PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX.exec(message)?.[1];
  return reasonKey ? toProjectOpenBlockedReasonKey(reasonKey) : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}

/** What {@link notifyProjectOpenBlocked} needs from PAPI, passed in so it runs in any process. */
export type NotifyProjectOpenBlockedDependencies = {
  getLocalizedStrings: (localizeKeys: LocalizeKey[]) => Promise<LanguageStrings>;
  sendNotification: (notification: {
    message: LocalizeKey;
    severity: 'warning';
  }) => Promise<unknown>;
  logWarning: (message: string) => void;
};

/**
 * Tells the user why a project was refused, as a warning notification (the notification service
 * localizes the key). A key with no translation is replaced by the generic reason, so the
 * notification never shows a raw key. Self-catching, so fire-and-forget callers never leak a
 * rejection.
 *
 * @param reasonKey Localize key explaining why the project was refused
 * @param dependencies The PAPI services to localize with, notify through, and log to
 */
export async function notifyProjectOpenBlocked(
  reasonKey: LocalizeKey,
  { getLocalizedStrings, sendNotification, logWarning }: NotifyProjectOpenBlockedDependencies,
): Promise<void> {
  let message: LocalizeKey = PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
  try {
    const localizedReason = (await getLocalizedStrings([reasonKey]))[reasonKey];
    if (localizedReason && localizedReason !== reasonKey) message = reasonKey;
  } catch (e) {
    logWarning(
      `Could not localize ${reasonKey}; sending the generic reason: ${getErrorMessage(e)}`,
    );
  }
  try {
    await sendNotification({ message, severity: 'warning' });
  } catch (e) {
    logWarning(`Failed to send the project-open-blocked notification: ${getErrorMessage(e)}`);
  }
}
