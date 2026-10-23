// @vitest-environment jsdom
/**
 * Enter inside the popover's note content over a host whose markers are not editable (Simple mode's
 * formatted and paragraph-structure views). The `\fp` footnote-paragraph break that Enter makes in
 * Standard view belongs to the editor's marker-edit engine, which is off unless markers are
 * editable. Without it Enter is Lexical's own paragraph split: it splits the popover's scaffolding
 * paragraph after the note and parks the caret outside the note, where whatever is typed next is
 * dropped on Save (which writes only the note). Until those views support `\fp`, Enter — with or
 * without Shift — does nothing there: text, caret and note stay as they were.
 *
 * Mounts the REAL `Editorial` (see footnote-editor.test-harness): the split is Lexical's own
 * keydown handling, unobservable with a mocked editor.
 */
import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { EditorOptions } from '@eten-tech-foundation/platform-editor';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isLineBreakNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
  TextNode,
} from 'lexical';
import {
  caretIsInsideNote,
  editableView,
  installPopoverJsdomStubs,
  renderPopoverAndWaitForInit,
  visibleView,
} from './footnote-editor.test-harness';

installPopoverJsdomStubs();

// jsdom has no `execCommand` or `ClipboardEvent`; an Enter on the right-click menu can run its Cut,
// which copies through the first, and Lexical's cut handler names the second as a bare global for a
// class check. Nothing here asserts on the clipboard.
if (typeof document.execCommand !== 'function') {
  document.execCommand = () => true;
}
const globalStubs: { ClipboardEvent?: unknown } = globalThis;
if (typeof globalStubs.ClipboardEvent === 'undefined')
  globalStubs.ClipboardEvent = function ClipboardEvent() {};

const hiddenView: EditorOptions['view'] = {
  markerMode: 'hidden',
  hasSpacing: true,
  isFormattedFont: true,
};

const nonEditableViews: [string, EditorOptions['view']][] = [
  ['hidden markers (formatted view)', hiddenView],
  ['visible markers (paragraph-structure view)', visibleView],
];

/** The `\ft` content text node (the one holding the sentinel text), or throws. */
function $findFtTextNode(): TextNode {
  let found: TextNode | undefined;
  const walk = (node: LexicalNode): void => {
    if ($isTextNode(node) && node.getTextContent().includes('sentinel')) found = node;
    if ($isElementNode(node)) node.getChildren().forEach(walk);
  };
  walk($getRoot());
  if (!found) throw new Error('ft content text node not found');
  return found;
}

/**
 * Focuses the editor and puts both carets (editor state and DOM) at the end of the `\ft` text —
 * where a user finishing a sentence presses Enter.
 */
async function placeCaretAtFtEnd(lexical: LexicalEditor, editorInput: HTMLElement): Promise<void> {
  await act(async () => {
    editorInput.focus();
    await Promise.resolve();
  });
  await act(async () => {
    lexical.update(() => {
      const ft = $findFtTextNode();
      const offset = ft.getTextContent().length;
      ft.select(offset, offset);
    });
    await Promise.resolve();
  });
  await vi.waitFor(
    () => {
      const domSelection = editorInput.ownerDocument.getSelection();
      const anchor = domSelection?.anchorNode;
      if (!anchor || !editorInput.querySelector('span.note')?.contains(anchor))
        throw new Error('DOM caret has not reached the note');
    },
    { timeout: 2_000, interval: 10 },
  );
}

async function pressEnter(editorInput: HTMLElement, shiftKey = false): Promise<KeyboardEvent> {
  const event = new KeyboardEvent('keydown', {
    key: 'Enter',
    shiftKey,
    bubbles: true,
    cancelable: true,
  });
  await act(async () => {
    editorInput.dispatchEvent(event);
    await Promise.resolve();
    await Promise.resolve();
  });
  return event;
}

/** Types `text` at the editor's current caret, as the next keystrokes would. */
async function typeAtCaret(lexical: LexicalEditor, text: string): Promise<void> {
  await act(async () => {
    lexical.update(
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) throw new Error('expected a range selection');
        selection.insertText(text);
      },
      { discrete: true },
    );
  });
}

function rootChildCount(lexical: LexicalEditor): number {
  return lexical.getEditorState().read(() => $getRoot().getChildrenSize());
}

/** The note node's text content, or throws when the popover holds no note. */
function noteText(lexical: LexicalEditor): string {
  return lexical.getEditorState().read(() => {
    const note = $getRoot()
      .getChildren()
      .flatMap((child) => ($isElementNode(child) ? child.getChildren() : []))
      .find((child) => child.getType() === 'note');
    if (!note) throw new Error('note not found');
    return note.getTextContent();
  });
}

function hasLineBreak(lexical: LexicalEditor): boolean {
  return lexical.getEditorState().read(() => {
    const walk = (node: LexicalNode): boolean =>
      $isLineBreakNode(node) || ($isElementNode(node) && node.getChildren().some(walk));
    return walk($getRoot());
  });
}

describe('FootnoteEditor Enter over a non-editable-marker host does nothing', () => {
  describe.each(nonEditableViews)('%s', (_name, view) => {
    it('Enter leaves the text, the caret and the note unchanged, so what is typed next stays in the note', async () => {
      const { editorInput, lexical } = await renderPopoverAndWaitForInit(view);
      await placeCaretAtFtEnd(lexical, editorInput);
      const textBefore = noteText(lexical);
      const childCountBefore = rootChildCount(lexical);

      const enter = await pressEnter(editorInput);

      expect(enter.defaultPrevented).toBe(true);
      expect(rootChildCount(lexical)).toBe(childCountBefore);
      expect(noteText(lexical)).toBe(textBefore);
      expect(caretIsInsideNote(lexical)).toBe(true);

      await typeAtCaret(lexical, ' typed');
      expect(rootChildCount(lexical)).toBe(childCountBefore);
      expect(noteText(lexical)).toContain('sentinel note text typed');
    });

    it('Shift+Enter inserts no line break', async () => {
      const { editorInput, lexical } = await renderPopoverAndWaitForInit(view);
      await placeCaretAtFtEnd(lexical, editorInput);
      const textBefore = noteText(lexical);
      const childCountBefore = rootChildCount(lexical);

      const enter = await pressEnter(editorInput, true);

      expect(enter.defaultPrevented).toBe(true);
      expect(hasLineBreak(lexical)).toBe(false);
      expect(rootChildCount(lexical)).toBe(childCountBefore);
      expect(noteText(lexical)).toBe(textBefore);
    });

    it.each(['insertParagraph', 'insertLineBreak'])(
      'claims a `%s` beforeinput so the editor never splits or breaks the note',
      async (inputType) => {
        const { editorInput, lexical } = await renderPopoverAndWaitForInit(view);
        await placeCaretAtFtEnd(lexical, editorInput);
        const editorSawInput = vi.fn();
        editorInput.addEventListener('beforeinput', editorSawInput);

        const event = new InputEvent('beforeinput', { inputType, bubbles: true, cancelable: true });
        await act(async () => {
          editorInput.dispatchEvent(event);
          await Promise.resolve();
        });
        editorInput.removeEventListener('beforeinput', editorSawInput);

        expect(event.defaultPrevented).toBe(true);
        expect(editorSawInput).not.toHaveBeenCalled();
      },
    );

    it('a composing Enter is left to the editor (IME candidate confirmation)', async () => {
      const { editorInput, lexical } = await renderPopoverAndWaitForInit(view);
      await placeCaretAtFtEnd(lexical, editorInput);
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        isComposing: true,
        bubbles: true,
        cancelable: true,
      });
      const editorSawEnter = vi.fn();
      editorInput.addEventListener('keydown', editorSawEnter);
      await act(async () => {
        editorInput.dispatchEvent(event);
        await Promise.resolve();
      });
      editorInput.removeEventListener('keydown', editorSawEnter);

      expect(editorSawEnter).toHaveBeenCalled();
    });

    it("leaves Enter to the popover's right-click menu while it is open", async () => {
      const { editorInput, lexical } = await renderPopoverAndWaitForInit(view);
      await placeCaretAtFtEnd(lexical, editorInput);
      await act(async () => {
        lexical.update(() => {
          const ft = $findFtTextNode();
          ft.select(0, ft.getTextContent().length);
        });
        await Promise.resolve();
      });
      await act(async () => {
        (editorInput.querySelector('span.note') ?? editorInput).dispatchEvent(
          new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            clientX: 10,
            clientY: 10,
          }),
        );
        await Promise.resolve();
      });
      expect(editorInput.getAttribute('aria-controls')).toBe('editor-context-menu');

      // The menu's own Enter runs its highlighted item (Cut) and closes it.
      await act(async () => {
        editorInput.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }),
        );
        await Promise.resolve();
      });
      await pressEnter(editorInput);

      expect(editorInput.getAttribute('aria-controls')).toBeNull();
    });
  });

  it('Standard view keeps its `\\fp` break on Enter', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);
    await placeCaretAtFtEnd(lexical, editorInput);
    const childCountBefore = rootChildCount(lexical);

    await pressEnter(editorInput);
    await typeAtCaret(lexical, 'next paragraph');

    expect(rootChildCount(lexical)).toBe(childCountBefore);
    expect(noteText(lexical)).toContain('next paragraph');
    expect(caretIsInsideNote(lexical)).toBe(true);
  });
});
