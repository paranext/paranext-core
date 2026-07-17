import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Sentinel that paranext-core's C# write-gate (`SendReceiveWriteLock`) appends to the message of
 * any project write it rejects because an automatic Send/Receive is syncing that project. Comment
 * mutations (add/reply, edit, delete, resolve-conflict) that reach `ParatextData` while a sync
 * holds the gate reject with a message ending in this sentinel.
 *
 * Duplicated per extension — mirrors `platform-scripture/src/sync-edit-blocked.util.ts` (and the
 * scripture editor's own `SYNC_EDIT_BLOCKED_REGEX`) — so each extension's handling stays
 * self-contained with no cross-extension imports (see AGENTS.md: extensions are not patched
 * together).
 */
export const SYNC_EDIT_BLOCKED_REGEX = /\(SR_EDIT_BLOCKED\)/;

/**
 * Localization key for the shared "editing is paused during Send/Receive" warning shown when one of
 * this extension's comment mutations is rejected by the write-gate. Contributed in this extension's
 * `contributions/localizedStrings.json`.
 */
export const SYNC_EDIT_BLOCKED_MESSAGE_KEY = '%webView_legacyCommentManager_error_syncEditBlocked%';

/**
 * Whether `error` was thrown by the write-gate because an automatic Send/Receive is in progress
 * (its message carries {@link SYNC_EDIT_BLOCKED_REGEX}). Lets each mutating handler show the shared
 * "editing paused" notification instead of surfacing a raw technical error or leaking an unhandled
 * promise rejection.
 *
 * @param error Error, thrown value, or message string to inspect.
 * @returns `true` if the error is a Send/Receive write-gate rejection, `false` otherwise.
 */
export function isSyncEditBlockedError(error: unknown): boolean {
  return SYNC_EDIT_BLOCKED_REGEX.test(getErrorMessage(error));
}

/**
 * Shows the shared "editing is paused during Send/Receive" warning notification (the write-gate
 * rejection detected by {@link isSyncEditBlockedError} surfaced to the user). Extracted so the
 * severity/message cannot drift across the several call sites that report it, and self-catching so
 * fire-and-forget callers never surface an unhandled promise rejection from the notification
 * service. The legacy-comment-manager twin of `platform-scripture`'s `notifySyncEditBlocked`.
 */
export async function notifySyncEditBlocked(): Promise<void> {
  try {
    await papi.notifications.send({
      message: SYNC_EDIT_BLOCKED_MESSAGE_KEY,
      severity: 'warning',
    });
  } catch (e) {
    logger.warn(`Failed to send the sync-edit-blocked notification: ${getErrorMessage(e)}`);
  }
}
