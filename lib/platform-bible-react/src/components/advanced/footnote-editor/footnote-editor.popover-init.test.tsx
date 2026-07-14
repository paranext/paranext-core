// @vitest-environment jsdom
/**
 * Task 14 (Phase 5) wrapper-para glyph artifact: the popover's init effect applies the note op into
 * a hardcoded `PARAGRAPH_USJ` wrapper doc via `applyUpdate`, inserting at OT index 0. In editable
 * marker mode the wrapper paragraph renders a visible `\p` glyph prefix (`MarkerNode` + NBSP
 * trailing-space `TextNode`, per the library's `usj-editor.adaptor.ts` `createPara`); an insert at
 * index 0 lands the note BEFORE that prefix, and the engine then re-materializes a FRESH prefix
 * ahead of the note, leaving the ORIGINAL prefix as visible trailing glyph junk after the note
 * (confirmed empirically: pre-fix, the wrapper para ends up with node types `['marker', 'text',
 * 'note', 'marker', 'text']` — a second, orphaned `\p`/NBSP pair trails the note). Display-only;
 * never written on Save (the note-ops content contract is unchanged either way — see the
 * `PARAGRAPH_USJ`-sibling `EDITABLE_WRAPPER_PARA_PREFIX_RETAIN` doc comment).
 *
 * Unlike `footnote-editor.component.test.tsx` (marker-palette wiring), this suite does NOT mock
 * `@eten-tech-foundation/platform-editor`'s `Editorial` — the artifact is a real Lexical
 * reconciliation effect of the wrapper doc's actual node shape, so it can only be observed by
 * mounting the real editor (via the shared footnote-editor.test-harness).
 */
import { describe, expect, it } from 'vitest';
import { $getRoot, $isElementNode, LexicalEditor } from 'lexical';
import { renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

/** The wrapper paragraph's direct child node types, document order. */
function wrapperParaChildTypes(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() => {
    const para = $getRoot().getChildren()[0];
    if (!$isElementNode(para)) throw new Error('wrapper para not found');
    return para.getChildren().map((child) => child.getType());
  });
}

describe('FootnoteEditor popover init (Task 14 Phase 5: wrapper-para glyph artifact)', () => {
  it('editable marker mode: lands the note after the wrapper para prefix, no trailing glyph junk', async () => {
    // This suite only asserts on the post-`applyUpdate` node shape, so wait just for that macrotask
    // (not the later new-note selection re-assert).
    const { lexical } = await renderPopoverAndWaitForInit(
      { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
      { waitMs: 10 },
    );

    // Well-formed shape: the para's own `\p` marker glyph, its NBSP trailing space, then the
    // note — and NOTHING else. A displaced insert leaves a second `marker`/`text` pair trailing
    // after the note (the original prefix, now orphaned) — reproduced RED against pre-fix HEAD.
    expect(wrapperParaChildTypes(lexical)).toEqual(['marker', 'text', 'note']);
  });

  it('non-editable (visible) marker mode: unaffected by the editable-mode retain fix', async () => {
    const { lexical } = await renderPopoverAndWaitForInit(
      { markerMode: 'visible', hasSpacing: true, isFormattedFont: true },
      { waitMs: 10 },
    );

    // `createPara` only injects the two-node MarkerNode+NBSP prefix for `markerMode: "editable"`;
    // "visible" mode's single `immutable-typed-text` prefix node is a pre-existing, out-of-scope
    // shape this fix must not touch — pin the CURRENT (unfixed-and-unchanged) ordering exactly,
    // so a regression in the editable-mode branch's conditional would be caught here.
    expect(wrapperParaChildTypes(lexical)).toEqual(['note', 'immutable-typed-text']);
  });
});
