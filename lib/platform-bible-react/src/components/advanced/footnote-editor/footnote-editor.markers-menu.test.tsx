// @vitest-environment jsdom
/**
 * The `\` inline markers menu in the popover's non-editable marker modes (the built-in menu, not
 * the standard-view marker palette). The popover opens with the caret inside one of the note's
 * character runs, and those runs define no child markers of their own — so what the menu offers has
 * to come from the enclosing note, or the documented shortcut opens nothing while still swallowing
 * the key.
 *
 * Mounts the REAL editor via the shared harness: the menu is gated on a live DOM selection inside
 * the note, which only a real Lexical mount produces.
 */
import { describe, expect, it } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CARET_IN_NOTE_TEXT,
  caretAncestry,
  installPopoverJsdomStubs,
  renderPopoverAndWaitForInit,
  visibleView,
} from './footnote-editor.test-harness';

installPopoverJsdomStubs();

const MARKER_MENU_TRIGGER = '\\';

/** Sends a key to the popover's document-level handler and lets the result render. */
async function pressKey(key: string) {
  await act(async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
}

function markerMenuSearchBox() {
  return screen.queryByPlaceholderText('%markerMenu_searchPlaceholder%');
}

describe('FootnoteEditor inline markers menu', () => {
  it('opens from the trigger key with the caret in the note text, and closes on Escape', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(visibleView);
    editorInput.focus();

    await pressKey(MARKER_MENU_TRIGGER);

    // The caret sits in a character run, whose marker defines no children of its own, so a menu
    // only appears here if the markers are taken from the enclosing note.
    expect(markerMenuSearchBox()).not.toBeNull();

    await pressKey('Escape');

    expect(markerMenuSearchBox()).toBeNull();
    // Dismissing focuses the editor again; that bare focus must not push the caret out of the
    // character runs, or the user is back to typing where their text joins nothing.
    expect(caretAncestry(lexical)).toEqual(CARET_IN_NOTE_TEXT);
  }, 20000);

  it('offers the markers of the note actually being edited, not a fixed note type', async () => {
    const { editorInput } = await renderPopoverAndWaitForInit(visibleView);

    // Switch the note to a cross-reference, then ask for the menu from inside its text.
    await userEvent.click(
      screen.getByRole('button', { name: /footnoteEditor_noteType_footnote_label/ }),
    );
    await userEvent.click(
      await screen.findByRole('menuitemcheckbox', {
        name: /footnoteEditor_noteType_crossReference_label/,
      }),
    );
    editorInput.focus();
    await pressKey(MARKER_MENU_TRIGGER);

    // `xo` belongs to `\x` alone — `\f` offers only `\xt` from the cross-reference group — so this
    // can only pass if the note's own marker is what the menu was built from.
    expect(markerMenuSearchBox()).not.toBeNull();
    expect(screen.getByText('xo')).toBeDefined();
  }, 20000);
});
