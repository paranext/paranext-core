import {
  getErrorMessage,
  getProjectOpenBlockedReasonKey,
  LanguageStrings,
  LocalizeKey,
  notifyProjectOpenBlocked,
  NotifyProjectOpenBlockedDependencies,
  PROJECT_OPEN_BLOCKED_FALLBACK_KEY,
  toProjectOpenBlockedReasonKey,
} from 'platform-bible-utils';

// Imports nothing from `@papi`, so both the web views and the extension host (`main.ts`) can use it.

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
export function getProjectOpenBlockedReasonKeyFromResult(
  error: unknown,
  errorCode?: string,
): LocalizeKey | undefined {
  if (error === undefined) return undefined;
  return (
    getProjectOpenBlockedReasonKey(error) ??
    (errorCode === PROJECT_OPEN_BLOCKED_ERROR_CODE ? PROJECT_OPEN_BLOCKED_FALLBACK_KEY : undefined)
  );
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

/** What {@link refuseIfProjectUnsupported} needs from PAPI, passed in so it runs in any process. */
export type RefuseIfProjectUnsupportedDependencies = NotifyProjectOpenBlockedDependencies & {
  getMetadataForProject: (projectId: string) => Promise<{ unsupportedReason?: string }>;
};

/**
 * How long {@link refuseIfProjectUnsupported} waits for the metadata lookup before letting the
 * project through. The lookup runs ahead of `openWebView`, so an unbounded wait would hold the tool
 * (and, for Manage Books, every click queued behind it) until every factory answers.
 */
export const PROJECT_OPEN_LOOKUP_TIMEOUT_MS = 1500;

/**
 * Whether a tool must not open on `projectId` because the project cannot be opened. When it cannot,
 * the user is told why (see {@link notifyProjectOpenBlocked}).
 *
 * One metadata lookup, which is a fan-out: call it once per user action, never from a reactive
 * loop. A lookup that fails, or does not answer within {@link PROJECT_OPEN_LOOKUP_TIMEOUT_MS}, lets
 * the project through, so a transient error or a slow factory never locks a user out of a real
 * project; the backend still refuses an unsupported project's text.
 */
export async function refuseIfProjectUnsupported(
  projectId: string,
  dependencies: RefuseIfProjectUnsupportedDependencies,
): Promise<boolean> {
  let unsupportedReason: string | undefined;
  let cancelTimeout = () => {};
  try {
    const metadata = await Promise.race([
      dependencies.getMetadataForProject(projectId),
      new Promise<undefined>((resolve) => {
        const timeoutId = setTimeout(resolve, PROJECT_OPEN_LOOKUP_TIMEOUT_MS);
        cancelTimeout = () => clearTimeout(timeoutId);
      }),
    ]);
    if (!metadata) {
      dependencies.logWarning(
        `Looking up whether ${projectId} can be opened took over ${PROJECT_OPEN_LOOKUP_TIMEOUT_MS} ms; treating it as openable`,
      );
      return false;
    }
    ({ unsupportedReason } = metadata);
  } catch (e) {
    dependencies.logWarning(
      `Could not look up whether ${projectId} can be opened (${getErrorMessage(e)}); treating it as openable`,
    );
    return false;
  } finally {
    cancelTimeout();
  }
  if (!unsupportedReason) return false;

  await notifyProjectOpenBlocked(toProjectOpenBlockedReasonKey(unsupportedReason), dependencies);
  return true;
}
