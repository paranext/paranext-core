// @vitest-environment jsdom
/**
 * Switching the note type replaces the note in the editor, which discards the editor's selection.
 * The user reaches that dropdown mid-edit, so the caret has to survive the switch — otherwise the
 * next keystroke lands at the note level, outside the character runs, where it joins no text.
 *
 * Like footnote-editor.popover-init.test.tsx (and unlike footnote-editor.component.test.tsx) this
 * suite mounts the REAL editor via the shared harness: the caret's resting place is a Lexical
 * selection effect that a mocked `Editorial` cannot report.
 */
import { describe, expect, it } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { $getRoot, $isElementNode, $isTextNode, LexicalNode, TextNode } from 'lexical';
import {
  CARET_IN_NOTE_TEXT,
  caretAncestry,
  renderPopoverAndWaitForInit,
} from './footnote-editor.test-harness';

// The note-type dropdown is a Radix menu, which observes its trigger and scrolls the active item
// into view; jsdom ships neither API. These tests assert caret position, not layout.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = NoopResizeObserver;
}
if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = () => {};
}
// A focused editor measures its caret; jsdom has no Range geometry.
if (typeof Range.prototype.getBoundingClientRect !== 'function') {
  Range.prototype.getBoundingClientRect = () => new DOMRect();
}

/** The non-editable marker mode the scripture editor uses outside Standard view. */
const visibleView = { markerMode: 'visible', hasSpacing: true, isFormattedFont: true } as const;

/** Partway through the note text, standing in for where a user was editing. */
const MID_TEXT_OFFSET = 2;

/** The note's body-text node — the `\ft` run of the harness's sentinel note. Call inside an update. */
function findNoteTextNode(): TextNode {
  let found: TextNode | undefined;
  const walk = (node: LexicalNode) => {
    if ($isTextNode(node) && node.getTextContent().includes('sentinel')) found = node;
    if ($isElementNode(node)) node.getChildren().forEach(walk);
  };
  walk($getRoot());
  if (!found) throw new Error('note text node not found');
  return found;
}

/** Switches the note type from footnote to cross-reference through the dropdown. */
async function switchNoteTypeToCrossReference() {
  // Matched on the localized-string KEY: the harness maps every key to itself, and the caller
  // dropdown's own label would match a looser pattern.
  await userEvent.click(
    screen.getByRole('button', { name: /footnoteEditor_noteType_footnote_label/ }),
  );
  await userEvent.click(
    await screen.findByRole('menuitemcheckbox', {
      name: /footnoteEditor_noteType_crossReference_label/,
    }),
  );
  // Let the replacement's change listeners settle before reading the caret.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
}

describe('FootnoteEditor note-type change', () => {
  it('leaves the caret in the note text, with the editor focused', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(visibleView);
    expect(caretAncestry(lexical)).toEqual(CARET_IN_NOTE_TEXT);

    await switchNoteTypeToCrossReference();

    expect(caretAncestry(lexical)).toEqual(CARET_IN_NOTE_TEXT);
    // Choosing from the dropdown leaves focus on its button, so typing would go nowhere even with
    // the caret in the right place.
    expect(document.activeElement).toBe(editorInput);
  }, 20000);

  // The caret is NOT returned to the exact offset the user was at: the popover re-focuses its
  // editor after a note-type change, and with the selection discarded by the replacement that
  // focus resolves to the end of the note. Landing in the text is what makes typing work.
  it('leaves the caret in the note text when the user was editing partway through', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(visibleView);

    // Stand in for the user having been typing partway through the note text: the editor holds
    // focus, so opening the dropdown steals it from there — which is what the popover reads the
    // caret back out of once the menu closes.
    editorInput.focus();
    await act(async () => {
      lexical.update(() => {
        const noteText = findNoteTextNode();
        noteText.select(MID_TEXT_OFFSET, MID_TEXT_OFFSET);
      });
    });

    await switchNoteTypeToCrossReference();

    expect(caretAncestry(lexical)).toEqual(CARET_IN_NOTE_TEXT);
  }, 20000);
});
