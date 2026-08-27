// @vitest-environment jsdom
/**
 * Wrapper-para marker prefix: the popover's document is a hardcoded `PARAGRAPH_USJ` scaffold — one
 * marker-less `para` that exists only so the editor has an element to host the note being edited,
 * and that never reaches a save (the save path reads the note ops alone). The editor library used
 * to default that paragraph to `\p` and render its marker prefix (a `MarkerNode` glyph + NBSP
 * trailing space in editable marker mode; an immutable typed-text node in visible/gutter modes), so
 * the popover showed a `\p ` prefix in front of the footnote's own text.
 *
 * The popover now passes `showParaMarkerPrefixes: false`, which suppresses the prefix at the
 * editor's ADAPTOR level — the glyph bytes are never built, so there are no invisible bytes for the
 * caret to traverse and no OT-index prefix offset for the init effect to retain past: the note op
 * applies at index 0 and the note is the wrapper paragraph's ONLY child.
 *
 * Unlike footnote-editor.component.test.tsx (marker-palette wiring), this suite does NOT mock
 * `@eten-tech-foundation/platform-editor`'s `Editorial` — the rendered node shape is a real Lexical
 * reconciliation effect of the wrapper doc, so it can only be observed by mounting the real editor
 * (via the shared footnote-editor.test-harness).
 */
import { describe, expect, it } from 'vitest';
import { act } from '@testing-library/react';
import {
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
} from 'lexical';
import type { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import {
  editableView,
  renderPopoverAndWaitForInit,
  sentinelNoteOp,
} from './footnote-editor.test-harness';

/** The wrapper paragraph's direct child node types, document order. */
function wrapperParaChildTypes(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() => {
    const para = $getRoot().getChildren()[0];
    if (!$isElementNode(para)) throw new Error('wrapper para not found');
    return para.getChildren().map((child) => child.getType());
  });
}

/** The full text content the popover renders (what the user sees, marker glyphs included). */
function renderedText(lexical: LexicalEditor): string {
  return lexical.getEditorState().read(() => $getRoot().getTextContent());
}

describe('FootnoteEditor popover init (wrapper-para marker prefix suppressed)', () => {
  it('editable marker mode: the note is the wrapper para’s only child — no `\\p` prefix, no glyph junk', async () => {
    // This suite only asserts on the post-`applyUpdate` node shape, so wait just for that macrotask
    // (not the later new-note selection re-assert).
    const { lexical } = await renderPopoverAndWaitForInit(
      { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
      { waitMs: 10 },
    );

    expect(wrapperParaChildTypes(lexical)).toEqual(['note']);
    // What the user reads starts with the footnote's OWN first glyph, not the scaffold's `\p`.
    expect(renderedText(lexical).startsWith('\\f')).toBe(true);
    expect(renderedText(lexical)).not.toContain('\\p');
  });

  it('save path: emitted ops are the note’s own bytes plus the edit — the scaffold never leaks', async () => {
    // The suppressed prefix is DISPLAY-only: what the popover saves must be exactly the loaded
    // note op with the user's edit applied — no `\p`, no marker-glyph bytes, nothing from the
    // wrapper paragraph. Driven through the auto-save path (the component saves on every content
    // change after the init snapshot).
    const saved: DeltaOpInsertNoteEmbed[][] = [];
    const { lexical } = await renderPopoverAndWaitForInit(editableView, {
      onChange: (noteOps) => saved.push(noteOps),
    });

    await act(async () => {
      lexical.update(() => {
        let ftText: LexicalNode | undefined;
        const walk = (node: LexicalNode): void => {
          if ($isTextNode(node) && node.getTextContent().includes('sentinel')) ftText = node;
          if ($isElementNode(node)) node.getChildren().forEach(walk);
        };
        walk($getRoot());
        if (!ftText || !$isTextNode(ftText)) throw new Error('ft content text node not found');
        ftText.select(ftText.getTextContentSize(), ftText.getTextContentSize());
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) throw new Error('expected a range selection');
        selection.insertText('X');
      });
      // Let the editor's change listeners (which drive the component's auto-save) run.
      await new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
    });

    expect(saved.length).toBeGreaterThan(0);
    const lastOps = saved[saved.length - 1];
    expect(lastOps).toHaveLength(1);
    // Byte-level expectation: the loaded op with 'X' appended to the \ft text — and nothing else.
    // structuredClone deep-copies while keeping the fixture's declared type (no assertion needed).
    const expected = structuredClone(sentinelNoteOp);
    const ftOp = expected.insert.note?.contents?.ops?.[1];
    if (!ftOp) throw new Error('fixture shape changed: ft op not found');
    ftOp.insert = 'sentinel note textX';
    expect(lastOps[0]).toEqual(expected);
  });

  it('non-editable (visible) marker mode: the scaffold marker is suppressed there too', async () => {
    const { lexical } = await renderPopoverAndWaitForInit(
      { markerMode: 'visible', hasSpacing: true, isFormattedFont: true },
      { waitMs: 10 },
    );

    // Were visible mode to render the scaffold's marker as an immutable typed-text node, the
    // index-0 insert would leave it stranded AFTER the note. With the prefix suppressed neither
    // the glyph nor the stranding can exist.
    expect(wrapperParaChildTypes(lexical)).toEqual(['note']);
  });

  it('renders the note marker and caller as atomic, not as text to type into', async () => {
    // The two dropdowns above the editor govern the note's type and its caller, the same division
    // Paratext 9 draws — so those bytes must not read as editable. Leaving them typeable was not
    // merely cosmetic: the edit did not persist, and because the editor's note-scoped rebuild
    // refuses a caller it cannot recognize, a `\cat` category run typed into that slot (where
    // Paratext 9 puts it) was silently discarded along with it. `token` is Lexical's atomic text
    // mode: no caret inside, no typing into it.
    const { lexical } = await renderPopoverAndWaitForInit(editableView);

    const modes = lexical.getEditorState().read(() => {
      const findNote = (node: LexicalNode): LexicalNode | undefined => {
        if (node.getType() === 'note') return node;
        if (!$isElementNode(node)) return undefined;
        return node.getChildren().reduce<LexicalNode | undefined>(
          (found, child) => found ?? findNote(child),
          undefined,
        );
      };
      const note = findNote($getRoot());
      if (!note || !$isElementNode(note)) return undefined;
      return note
        .getChildren()
        .filter((child) => $isTextNode(child))
        .slice(0, 2)
        .map((child) => ($isTextNode(child) ? child.getMode() : undefined));
    });

    // The note's first two text children are its opening glyph and its caller.
    expect(modes).toEqual(['token', 'token']);
  });
});
