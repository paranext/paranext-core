import { getErrorMessage, isLocalizeKey, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

// Imports nothing from `@papi`, so both the web views and the extension host (`main.ts`) can use it.

/**
 * Sentinel that paranext-core's C# puts at the end of the message of any request it refuses because
 * the project cannot be opened (`ScrTextExtensions.ThrowIfOpenBlocked`). Unanchored so it still
 * matches behind a JSON-RPC prefix or inside the quotes `getErrorMessage` puts around a bare
 * string.
 */
const PROJECT_OPEN_BLOCKED_REGEX = /\(PROJECT_OPEN_BLOCKED\)/;

/** The reason's localize key, which the C# message places immediately before the sentinel. */
const PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX = /(%[^%\s]+%)\s*\(PROJECT_OPEN_BLOCKED\)/;

/** Shown instead of a reason that could not be read, so the user never sees a raw message. */
export const PROJECT_OPEN_BLOCKED_FALLBACK_KEY: LocalizeKey = '%project_unsupported_generic%';

/**
 * A project's `unsupportedReason` as a key that can be localized. The field is always a localize
 * key; anything else is replaced by the generic reason rather than shown raw.
 */
export function toProjectOpenBlockedReasonKey(unsupportedReason: string): LocalizeKey {
  return isLocalizeKey(unsupportedReason) ? unsupportedReason : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}

/** The error code a service reporting structured errors (the checklist) gives such a refusal. */
export const PROJECT_OPEN_BLOCKED_ERROR_CODE = 'PROJECT_OPEN_BLOCKED';

/**
 * The localize key explaining why the project was refused, when `error` is the backend refusing a
 * project that cannot be opened; otherwise `undefined`.
 *
 * @param error Error, thrown value, or message string to inspect.
 * @param errorCode The error's code, from a service that reports one. The refusal's code alone is
 *   enough to recognize it.
 */
export function getProjectOpenBlockedReasonKey(
  error: unknown,
  errorCode?: string,
): LocalizeKey | undefined {
  if (error === undefined) return undefined;
  const message = getErrorMessage(error);
  if (!PROJECT_OPEN_BLOCKED_REGEX.test(message))
    return errorCode === PROJECT_OPEN_BLOCKED_ERROR_CODE
      ? PROJECT_OPEN_BLOCKED_FALLBACK_KEY
      : undefined;
  const reasonKey = PROJECT_OPEN_BLOCKED_REASON_KEY_REGEX.exec(message)?.[1];
  return reasonKey ? toProjectOpenBlockedReasonKey(reasonKey) : PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
}

/**
 * The text to show for a refused project, from strings resolved for `reasonKey` and
 * {@link PROJECT_OPEN_BLOCKED_FALLBACK_KEY}. A key that resolved to itself (still loading, or not
 * registered) is never returned; `undefined` means there is nothing fit to show yet.
 */
export function selectProjectOpenBlockedMessage(
  localizedStrings: LanguageStrings,
  reasonKey: LocalizeKey,
): string | undefined {
  const reason = localizedStrings[reasonKey];
  if (reason && reason !== reasonKey) return reason;
  const fallback = localizedStrings[PROJECT_OPEN_BLOCKED_FALLBACK_KEY];
  if (fallback && fallback !== PROJECT_OPEN_BLOCKED_FALLBACK_KEY) return fallback;
  return undefined;
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
 */
export async function notifyProjectOpenBlocked(
  reasonKey: LocalizeKey,
  { getLocalizedStrings, sendNotification, logWarning }: NotifyProjectOpenBlockedDependencies,
): Promise<void> {
  let message = PROJECT_OPEN_BLOCKED_FALLBACK_KEY;
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

/** What {@link refuseIfProjectUnsupported} needs from PAPI, passed in so it runs in any process. */
export type RefuseIfProjectUnsupportedDependencies = NotifyProjectOpenBlockedDependencies & {
  getMetadataForProject: (projectId: string) => Promise<{ unsupportedReason?: string }>;
};

/**
 * Whether a tool must not open on `projectId` because the project cannot be opened. When it cannot,
 * the user is told why (see {@link notifyProjectOpenBlocked}).
 *
 * One metadata lookup, which is a fan-out: call it once per user action, never from a reactive
 * loop. A failed lookup lets the project through, so a transient error never locks a user out of a
 * real project; the backend still refuses an unsupported project's text.
 */
export async function refuseIfProjectUnsupported(
  projectId: string,
  dependencies: RefuseIfProjectUnsupportedDependencies,
): Promise<boolean> {
  let unsupportedReason: string | undefined;
  try {
    ({ unsupportedReason } = await dependencies.getMetadataForProject(projectId));
  } catch (e) {
    dependencies.logWarning(
      `Could not look up whether ${projectId} can be opened (${getErrorMessage(e)}); treating it as openable`,
    );
    return false;
  }
  if (!unsupportedReason) return false;

  await notifyProjectOpenBlocked(toProjectOpenBlockedReasonKey(unsupportedReason), dependencies);
  return true;
}
