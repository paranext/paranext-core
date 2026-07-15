// @vitest-environment jsdom
/**
 * Popover Enter → `\fp` broken: after Radix's open-autofocus the DOM caret can sit at the
 * wrapper-para start instead of inside the note; Lexical's keydown path follows the DOM, so Enter
 * there plain-split the wrapper paragraph instead of inserting `\fp`. The fix claims Enter whenever
 * the DOM caret is outside the note content (`span.note`) and routes the caret into the note —
 * Enter has no legitimate job outside the note in this popover. Enter with the caret inside the
 * note stays on the library's `\fp` path ($handleEnterInNote), pinned here end-to-end through the
 * real editor.
 *
 * Like footnote-editor.popover-init.test.tsx (with which it shares footnote-editor.test-harness),
 * this suite mounts the REAL `Editorial` — the bug is an interaction between DOM focus/selection
 * and Lexical's keydown handling, unobservable with a mocked editor.
 */
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import { editableView, renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

// jsdom doesn't implement `getBoundingClientRect` on `Range`; moving the caret can make
// Lexical's post-commit scroll-into-view read a Range rect. Stub it (a zero rect nothing
// here asserts on) — same as the engine's own markerEdit tests.
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

/**
 * Parks the DOM caret at the wrapper-para start and focuses the editor — the exact state Radix's
 * open-autofocus produces (the bug's precondition).
 */
function parkDomCaretAtWrapperStart(editorInput: HTMLElement): void {
  editorInput.focus();
  const doc = editorInput.ownerDocument;
  const selection = doc.getSelection();
  if (!selection) throw new Error('no DOM selection available');
  const range = doc.createRange();
  range.setStart(editorInput, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function dispatchEnter(editorInput: HTMLElement): void {
  editorInput.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
  );
}

/** Number of top-level element children of the root (the wrapper para; 2+ means it split). */
function rootChildCount(lexical: LexicalEditor): number {
  return lexical.getEditorState().read(() => $getRoot().getChildrenSize());
}

/** All markers of char-like nodes inside the note, document order. */
function noteCharMarkers(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() => {
    const markers: string[] = [];
    const walk = (node: LexicalNode): void => {
      if (node.getType() === 'char') {
        // The linked editor package doesn't export its CharNode class (or $isCharNode) for
        // platform-bible-react to narrow against, so duck-type the marker accessor.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const charLike = node as unknown as { getMarker?: () => string };
        if (typeof charLike.getMarker === 'function') markers.push(charLike.getMarker());
      }
      if ($isElementNode(node)) node.getChildren().forEach(walk);
    };
    const note = $getRoot()
      .getChildren()
      .flatMap((child) => ($isElementNode(child) ? child.getChildren() : []))
      .find((child) => child.getType() === 'note');
    if (note && $isElementNode(note)) note.getChildren().forEach(walk);
    return markers;
  });
}

/** True when the Lexical selection anchor is inside the note node. */
function lexicalCaretInsideNote(lexical: LexicalEditor): boolean {
  return lexical.read(() => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false;
    for (let node: LexicalNode | null = selection.anchor.getNode(); node; node = node.getParent())
      if (node.getType() === 'note') return true;
    return false;
  });
}

describe('FootnoteEditor Enter guard (popover Enter must not split the wrapper)', () => {
  it('claims Enter when the DOM caret is outside the note and routes the caret into it', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);
    const childCountBefore = rootChildCount(lexical);

    await act(async () => {
      parkDomCaretAtWrapperStart(editorInput);
      dispatchEnter(editorInput);
      await Promise.resolve();
      await Promise.resolve();
    });

    // No wrapper split (pre-fix, Lexical processed the Enter against the DOM caret at the
    // wrapper start) and the caret has been routed into the note for the next keystroke.
    expect(rootChildCount(lexical)).toBe(childCountBefore);
    expect(noteCharMarkers(lexical)).not.toContain('fp');
    expect(lexicalCaretInsideNote(lexical)).toBe(true);
  });

  it('leaves Enter alone when the caret is inside the note (the library \\fp path)', async () => {
    const { editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);
    const childCountBefore = rootChildCount(lexical);

    // First Enter routes the caret into the note (guard), second Enter must reach the
    // library's $handleEnterInNote and insert an \fp char span, not split anything.
    await act(async () => {
      parkDomCaretAtWrapperStart(editorInput);
      dispatchEnter(editorInput);
      await Promise.resolve();
      await Promise.resolve();
    });
    await act(async () => {
      dispatchEnter(editorInput);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(rootChildCount(lexical)).toBe(childCountBefore); // still no split
    expect(noteCharMarkers(lexical)).toContain('fp');
  });
});
