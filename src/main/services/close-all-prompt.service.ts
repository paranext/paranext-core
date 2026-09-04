import { BrowserWindow, dialog } from 'electron';
import { getErrorMessage, LocalizeKey, wait } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import { localizationService } from '@shared/services/localization.service';
import { whenQuitRequested } from '@main/services/shutdown-latch.service';
import type { CloseAllAnswer } from '@main/services/window-close-decision.service';

/**
 * How long to wait for the close prompt's localized strings before showing it in English.
 *
 * Short on purpose: the user has already clicked ✕ and the window is held open with nothing on
 * screen until the question appears, so a wait long enough to notice is worse than untranslated
 * text.
 */
const CLOSE_PROMPT_LOCALIZE_TIME_OUT_MS = 3000;

/**
 * Ask the user whether closing the primary window should close every window. Shown modal to that
 * window so it cannot be lost behind another one.
 *
 * A string lookup that fails must not decide the close: the dialog shows with its English text
 * rather than the window refusing to close, which is the worse outcome.
 *
 * @param primaryWindow The window whose close is being confirmed
 */
export async function confirmCloseAllWindows(
  primaryWindow: BrowserWindow,
): Promise<CloseAllAnswer> {
  // `satisfies` rather than an annotation, so each stays its own literal type. Annotating them
  // `LocalizeKey` widens them to the template `%${string}%`, which turns the record below into a
  // pattern index signature — and then a mistyped key reads back `undefined` with no error, and
  // goes into the dialog as a missing title or a blank button.
  const messageKey = '%closeApp_confirm_message%' satisfies LocalizeKey;
  const detailKey = '%closeApp_confirm_detail%' satisfies LocalizeKey;
  const closeAllKey = '%closeApp_confirm_closeAll%' satisfies LocalizeKey;
  // The shared cancel string rather than one of this dialog's own: the localization guide forbids
  // duplicating a generic string that already exists, and this button says exactly what it says
  const cancelKey = '%general_cancel%' satisfies LocalizeKey;
  const fallbackStrings: Record<
    typeof messageKey | typeof detailKey | typeof closeAllKey | typeof cancelKey,
    string
  > = {
    [messageKey]: 'Close the application?',
    [detailKey]:
      'All windows will close. They will be restored the next time you open the application.',
    [closeAllKey]: 'Close all windows',
    [cancelKey]: 'Cancel',
  };
  let strings = fallbackStrings;
  try {
    // Bounded, because this is a NETWORK call to the extension host and the ✕ is already
    // committed by the time it runs: a rejection reaches the English fallback below, but a hang
    // would leave the window prevented from closing with no question on screen and every further
    // ✕ a silent no-op — the close button would simply look dead. English on time beats
    // localized eventually.
    //
    // Raced against a throwing timer rather than `waitForDuration`, which is otherwise the shape
    // for this: that helper is built on `Promise.any`, so it never rejects — a request that fails
    // FAST would be swallowed and the question held back for the whole bound before falling back
    // to English, which is the delay this bound exists to prevent.
    strings = {
      ...fallbackStrings,
      ...(await Promise.race([
        localizationService.getLocalizedStrings({
          localizeKeys: [messageKey, detailKey, closeAllKey, cancelKey],
        }),
        wait(CLOSE_PROMPT_LOCALIZE_TIME_OUT_MS).then<never>(() => {
          throw new Error(`no answer within ${CLOSE_PROMPT_LOCALIZE_TIME_OUT_MS} ms`);
        }),
      ])),
    };
  } catch (e) {
    logger.warn(`Could not localize the close-all prompt; showing English: ${getErrorMessage(e)}`);
  }
  const closeAllIndex = 0;
  const cancelIndex = 1;
  // A quit arriving while the question is open takes the box down with it. Electron closes a
  // signalled message box and answers as if the user had cancelled — so the ANSWER is not what
  // decides here, the quit latch is; without this the question would sit on screen, inert,
  // through the whole shutdown, and a click on it would be followed by the app quitting anyway.
  // Parented to the primary window, which is what makes `signal` work on macOS too.
  const dismissOnQuit = new AbortController();
  // Nothing awaits this: it exists to fire once, whenever the quit comes, and the box may well
  // have been answered and gone by then — aborting a finished box is a no-op
  const armDismissalOnQuit = async () => {
    await whenQuitRequested();
    dismissOnQuit.abort();
  };
  armDismissalOnQuit().catch((e: unknown) =>
    logger.warn(`Could not arm the close-all dismissal: ${getErrorMessage(e)}`),
  );
  const { response } = await dialog.showMessageBox(primaryWindow, {
    signal: dismissOnQuit.signal,
    type: 'question',
    // No `title`: macOS hides it, and on Windows and Linux it would print the question twice
    message: strings[messageKey],
    detail: strings[detailKey],
    buttons: [strings[closeAllKey], strings[cancelKey]],
    // The safe choice is what Enter takes: this question exists to interrupt a click whose reach
    // is wider than expected, so the wide-reaching button must not also be the one a reflex press
    // lands on. Button order is set by `buttons` above, not by this.
    defaultId: cancelIndex,
    // Esc and the window manager's dismiss both land here, so neither can close every window
    cancelId: cancelIndex,
    noLink: true,
  });
  return response === closeAllIndex ? 'close-all' : 'cancel';
}
