import { getErrorMessage } from 'platform-bible-utils';

/**
 * Sentinel that paranext-core's C# write-gate (`SendReceiveWriteLock`) appends to the message of
 * any project write it rejects because an automatic Send/Receive is syncing that project. Backend
 * mutations across ManageBooks (create/delete/copy/import), the Inventory setters
 * (`SetInventoryItemStatus`/`SetInventoryOptionValues`), and the Checks allow/deny path
 * (`CheckRunner.AllowCheckResult`/`DenyCheckResult`) all reject with a message ending in this
 * sentinel.
 *
 * Mirrors the scripture editor's own `SYNC_EDIT_BLOCKED_REGEX`; kept as a separate copy so the
 * editor's self-contained handling stays untouched.
 */
export const SYNC_EDIT_BLOCKED_REGEX = /\(SR_EDIT_BLOCKED\)/;

/**
 * Localization key for the shared "editing is paused during Send/Receive" warning shown when one of
 * this extension's mutations is rejected by the write-gate. Contributed in this extension's
 * `contributions/localizedStrings.json`.
 */
export const SYNC_EDIT_BLOCKED_MESSAGE_KEY = '%webView_platformScripture_error_syncEditBlocked%';

/**
 * Whether `error` was thrown by the write-gate because an automatic Send/Receive is in progress
 * (its message carries {@link SYNC_EDIT_BLOCKED_REGEX}). Lets each mutating webview show the shared
 * "editing paused" notification instead of surfacing a raw technical error or leaking an unhandled
 * promise rejection.
 *
 * @param error Error, thrown value, or message string to inspect.
 * @returns `true` if the error is a Send/Receive write-gate rejection, `false` otherwise.
 */
export function isSyncEditBlockedError(error: unknown): boolean {
  return SYNC_EDIT_BLOCKED_REGEX.test(getErrorMessage(error));
}
