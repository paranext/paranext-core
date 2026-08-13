/*
 * The side effects that wrap an editor edit, in one place.
 *
 * Every destructive or sync-gated edit in this extension needs the same two things around it: a
 * version-history snapshot before it, and the standard "editing paused during Send/Receive" notice
 * when the gate refuses it. Both had been inlined at each call site — the snapshot block three
 * times (insert footnote, insert cross-reference, remove character marker) and the sync notice
 * twice — which meant a change to either contract had to be made in every copy. They live here so
 * there is one copy of each.
 *
 * This module value-imports `@papi/frontend`, which the extension host's `require` shim rejects, so
 * it must stay out of `main.ts`'s import graph — reach it from web views and their components only.
 * `extension-host-import-boundary.test.ts` enforces that.
 */

import papi, { logger } from '@papi/frontend';
import { getErrorMessage, LanguageStrings, LocalizeKey } from 'platform-bible-utils';

/**
 * The one definition of the sync-blocked message key.
 *
 * Owned here rather than at either call site so the key, the `'warning'` severity, and the
 * self-catching behavior cannot drift apart — that single-source guarantee is the whole reason
 * {@link notifySyncEditBlocked} exists.
 */
export const SYNC_EDIT_BLOCKED_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_error_syncEditBlocked%';

/**
 * Send a warning notification, self-catching so a fire-and-forget caller (one that cannot `await`)
 * never surfaces an unhandled rejection from the notification service.
 *
 * @param message The already-localized message to show.
 * @param context Named in the log line when the notification itself fails, so a swallowed failure
 *   is still attributable to the edit that tried to report it.
 */
export async function notifyEditorWarning(message: string, context: string): Promise<void> {
  try {
    await papi.notifications.send({ message, severity: 'warning' });
  } catch (e) {
    logger.warn(`Failed to send the ${context} notification: ${getErrorMessage(e)}`);
  }
}

/**
 * Show the standard "editing paused during Send/Receive" warning notification — the
 * `(SR_EDIT_BLOCKED)` gate rejection surfaced to the user.
 *
 * Takes `localizedStrings` rather than a resolved message so {@link SYNC_EDIT_BLOCKED_KEY} is named
 * exactly once in the codebase: a caller cannot reach this function while spelling the key itself.
 *
 * @param localizedStrings The web view's resolved strings. Must include
 *   {@link SYNC_EDIT_BLOCKED_KEY}; the key itself is shown if it is missing.
 */
export async function notifySyncEditBlocked(localizedStrings: LanguageStrings): Promise<void> {
  await notifyEditorWarning(
    localizedStrings[SYNC_EDIT_BLOCKED_KEY] ?? SYNC_EDIT_BLOCKED_KEY,
    'sync-edit-blocked',
  );
}

/**
 * Commit a version-history snapshot before an edit — the user's undo of last resort.
 *
 * Best-effort by design: a version history that is unavailable (an older host that does not
 * implement the command) or failing must not block the edit the user asked for. That is why this
 * resolves rather than throwing on every failure path.
 *
 * @param projectId The project to snapshot. `undefined` means no snapshot, and is not an error —
 *   the edit still proceeds, matching how the insert paths have always behaved.
 * @param message The already-localized commit message shown in version history.
 * @param editDescription Names the edit in the log line when the commit fails, e.g. `'inserting
 *   footnote'`.
 */
export async function commitVersionHistorySnapshot(
  projectId: string | undefined,
  message: string,
  editDescription: string,
): Promise<void> {
  if (!projectId) return;
  try {
    await papi.commands.sendCommand(
      'paratextBibleSendReceive.commitChanges',
      projectId,
      message,
      true,
    );
  } catch (e) {
    const errMessage = getErrorMessage(e);
    // Requires the `commitChanges` command handler to throw `PlatformUnimplementedException` having
    // the `ERROR_UNIMPLEMENTED` prefix to successfully handle if this command is not implemented in
    // the application version
    if (errMessage.includes('ERROR_UNIMPLEMENTED')) logger.info(errMessage);
    else
      logger.warn(
        `Error committing changes to version history before ${editDescription}: ${errMessage}`,
      );
  }
}
