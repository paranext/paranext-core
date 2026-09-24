// @vitest-environment jsdom
/**
 * The popover mounts the library's `ContextMenuPlugin` unconditionally (like the main Standard-view
 * editor), and its own `\` handler must claim and drop the trigger while THAT menu is open — the
 * same swallow-while-menu-open behavior the main editor applies to itself. Without that check,
 * right-clicking the note and then pressing `\` would open the marker palette underneath the
 * still-open menu.
 *
 * Mounts the REAL `Editorial` (like footnote-editor.enter-guard.test.tsx and
 * footnote-editor.palette-commit.test.tsx, with which it shares footnote-editor.test-harness) so
 * the real `ContextMenuPlugin` is exercised — a mocked editor cannot open a real menu to gate on.
 */
import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
  TextNode,
} from 'lexical';
import type { FootnoteEditorMarkerPalette } from './footnote-editor.component';
import { editableView, renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

// jsdom doesn't implement `getBoundingClientRect` on `Range`; moving the caret can make Lexical's
// post-commit scroll-into-view read a Range rect. Stub it (a zero rect nothing here asserts on) —
// same as the engine's own markerEdit tests and footnote-editor.enter-guard.test.tsx.
if (typeof Range.prototype.getBoundingClientRect !== 'function') {
  Range.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON() {
        return this;
      },
    };
  };
}

/** A no-op marker-palette driver whose `show` call the test asserts on. */
function makeMarkerPalette(): {
  markerPalette: FootnoteEditorMarkerPalette;
  show: ReturnType<typeof vi.fn>;
} {
  const show = vi.fn<FootnoteEditorMarkerPalette['show']>(() => new Promise(() => {}));
  return {
    markerPalette: {
      show,
      update: vi.fn().mockResolvedValue(undefined),
      commit: vi.fn().mockResolvedValue(undefined),
      dismiss: vi.fn().mockResolvedValue(undefined),
    },
    show,
  };
}

/** Finds the (single) Lexical TextNode holding the `\ft` sentinel content, or throws. */
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
 * Puts BOTH carets (Lexical editor state and DOM) at the end of the `\ft` sentinel text, inside
 * `span.note` — the same two-caret discipline `footnote-editor.palette-commit.test.tsx` uses, since
 * `isDomCaretInsideNote` reads the DOM selection while `EditorRef.getMarkerMenuContext` reads the
 * committed Lexical selection.
 */
async function placeCaretInNote(lexical: LexicalEditor, editorInput: HTMLElement): Promise<void> {
  await act(async () => {
    editorInput.focus();
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
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
      const atEnd = lexical.getEditorState().read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || !selection.isCollapsed()) return false;
        return selection.anchor.offset === $findFtTextNode().getTextContent().length;
      });
      if (!atEnd) throw new Error('editor-state caret has not reached the note text end');
    },
    { timeout: 2_000, interval: 10 },
  );
  const doc = editorInput.ownerDocument;
  const note = editorInput.querySelector('span.note');
  if (!note) throw new Error('span.note not found');
  const walker = doc.createTreeWalker(note, NodeFilter.SHOW_TEXT);
  let domText: Text | undefined;
  while (walker.nextNode()) {
    const candidate = walker.currentNode;
    if (candidate instanceof Text && candidate.data.includes('sentinel')) domText = candidate;
  }
  if (!domText) throw new Error('ft content DOM text node not found');
  const selection = doc.getSelection();
  if (!selection) throw new Error('no DOM selection available');
  const range = doc.createRange();
  range.setStart(domText, domText.data.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

/** Right-clicks the note, opening the real `ContextMenuPlugin` menu. */
function openContextMenu(editorInput: HTMLElement): void {
  const target = editorInput.querySelector('span.note') ?? editorInput;
  target.dispatchEvent(
    new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 10, clientY: 10 }),
  );
}

function dispatchBackslash(editorInput: HTMLElement): boolean {
  const event = new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true });
  editorInput.dispatchEvent(event);
  return event.defaultPrevented;
}

describe('FootnoteEditor context-menu gate (the popover claims `\\` while its own menu is open)', () => {
  it('claims and drops `\\` while the popover right-click menu is open, without opening the marker palette', async () => {
    const { markerPalette, show } = makeMarkerPalette();
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(editableView, {
      markerPalette,
    });

    await placeCaretInNote(lexical, editorInput);
    await act(async () => {
      openContextMenu(editorInput);
      await Promise.resolve();
    });
    // Precondition: the real menu actually opened (the editor package marks its own root while
    // its menu is up).
    expect(editorInput.getAttribute('aria-controls')).toBe('editor-context-menu');

    let defaultPrevented = false;
    await act(async () => {
      defaultPrevented = dispatchBackslash(editorInput);
      await Promise.resolve();
    });

    expect(defaultPrevented).toBe(true);
    expect(show).not.toHaveBeenCalled();
  });

  it('still opens the marker palette on `\\` when no menu is open', async () => {
    const { markerPalette, show } = makeMarkerPalette();
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(editableView, {
      markerPalette,
    });

    await placeCaretInNote(lexical, editorInput);
    await act(async () => {
      dispatchBackslash(editorInput);
      await Promise.resolve();
    });

    expect(show).toHaveBeenCalledTimes(1);
  });
});
