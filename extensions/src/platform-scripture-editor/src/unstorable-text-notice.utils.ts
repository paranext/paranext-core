/*
 * The notice shown when the editor removes `\` or `//` from text the user pasted, dropped or typed.
 *
 * This module value-imports `@papi/frontend`, which the extension host's `require` shim rejects, so
 * it must stay out of `main.ts`'s import graph — reach it from web views and their components only.
 */

import { logger } from '@papi/frontend';
import type { PlatformNotification } from '@papi/core';
import type {
  UnstorableTextRemoved,
  UnstorableTextRemovedHandler,
} from '@eten-tech-foundation/platform-editor';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';

/** The fixed id of the unstorable-text notification, so repeats update one notification. */
export const UNSTORABLE_TEXT_NOTIFICATION_ID = 'platformScriptureEditor.unstorableTextRemoved';

/** Message shown when `\` or `//` was removed from pasted or dropped text. */
export const UNSTORABLE_TEXT_REMOVED_FROM_PASTE_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_info_unstorableTextRemovedFromPaste%';

/** Message shown when typing `\` or `//` was refused. */
export const UNSTORABLE_TEXT_BLOCKED_TYPING_KEY: LocalizeKey =
  '%webView_platformScriptureEditor_info_unstorableTextBlockedTyping%';

/** Every string key this notice can show; the localized-strings test checks each is defined. */
export const UNSTORABLE_TEXT_NOTICE_STRING_KEYS: readonly LocalizeKey[] = [
  UNSTORABLE_TEXT_REMOVED_FROM_PASTE_KEY,
  UNSTORABLE_TEXT_BLOCKED_TYPING_KEY,
];

/**
 * Create the editor's `onUnstorableTextRemoved` handler.
 *
 * The handler sends an `info` notification under {@link UNSTORABLE_TEXT_NOTIFICATION_ID}, with the
 * typing message for typed text and the pasted-text message for paste and drop. A failed send is
 * logged, never thrown: the editor calls the handler from an edit, which a notification failure
 * must not break.
 *
 * @param send Sends a notification, normally `papi.notifications.send`.
 * @param webViewId The web view the notification belongs to.
 */
export function createUnstorableTextNotifier(
  send: (notification: PlatformNotification) => Promise<unknown>,
  webViewId: string,
): UnstorableTextRemovedHandler {
  return (event: UnstorableTextRemoved) => {
    const notification: PlatformNotification = {
      message:
        event.source === 'typing'
          ? UNSTORABLE_TEXT_BLOCKED_TYPING_KEY
          : UNSTORABLE_TEXT_REMOVED_FROM_PASTE_KEY,
      severity: 'info',
      notificationId: UNSTORABLE_TEXT_NOTIFICATION_ID,
      webViewId,
    };
    const logFailure = (e: unknown) =>
      logger.warn(`Failed to send the unstorable-text notification: ${getErrorMessage(e)}`);
    try {
      send(notification).catch(logFailure);
    } catch (e) {
      logFailure(e);
    }
  };
}
