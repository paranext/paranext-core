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
 * mounting the real editor.
 */
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it } from 'vitest';
import type { DeltaOpInsertNoteEmbed, EditorOptions } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { $getRoot, $isElementNode, LexicalEditor } from 'lexical';
import FootnoteEditor from './footnote-editor.component';
import {
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditorLocalizedStrings,
} from './footnote-editor.types';

function buildLocalizedStrings(): FootnoteEditorLocalizedStrings {
  const entries = FOOTNOTE_EDITOR_STRING_KEYS.map((key) => [key, key] as const);
  // `FootnoteEditorLocalizedStrings` is a mapped type over every key in
  // `FOOTNOTE_EDITOR_STRING_KEYS`; building it from `Object.fromEntries` is simpler than spelling
  // out every key by hand, but `Object.fromEntries`'s return type is necessarily untyped.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.fromEntries(entries) as FootnoteEditorLocalizedStrings;
}

const scrRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
  verse: '1',
};

const sentinelNoteOp: DeltaOpInsertNoteEmbed = {
  insert: {
    note: {
      style: 'f',
      caller: '+',
      contents: {
        ops: [
          { insert: '1:1 ', attributes: { char: { style: 'fr' } } },
          { insert: 'sentinel note text', attributes: { char: { style: 'ft' } } },
        ],
      },
    },
  },
};

/** Mounts the REAL `FootnoteEditor` (no mocked `Editorial`) and waits for its init effect. */
async function renderPopoverAndWaitForInit(view: EditorOptions['view']) {
  const utils = render(
    <FootnoteEditor
      noteOps={[sentinelNoteOp]}
      onClose={() => {}}
      scrRef={scrRef}
      noteKey={undefined}
      isNewNote
      editorOptions={{ view }}
      defaultMarkerMenuTrigger="\\"
      localizedStrings={buildLocalizedStrings()}
    />,
  );
  const editorInput = utils.container.querySelector('.editor-input');
  if (!editorInput) throw new Error('popover editor-input not found');

  // The init effect defers `applyUpdate` via `setTimeout(0)` (footnote-editor.component.tsx);
  // let it run for real rather than mocking timers, matching the effect's own scheduling.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
  });

  // Lexical exposes its mounted editor instance on the root DOM element via this non-public,
  // underscore-prefixed property — there's no public API to reach it from outside a React ref,
  // and this is the same technique the engine's own popover round-trip tests use.
  // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
  const lexical = (editorInput as unknown as { __lexicalEditor?: LexicalEditor }).__lexicalEditor;
  if (!lexical) throw new Error('lexical editor handle not found on popover editor-input');
  return lexical;
}

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
    const lexical = await renderPopoverAndWaitForInit({
      markerMode: 'editable',
      hasSpacing: true,
      isFormattedFont: true,
    });

    // Well-formed shape: the para's own `\p` marker glyph, its NBSP trailing space, then the
    // note — and NOTHING else. A displaced insert leaves a second `marker`/`text` pair trailing
    // after the note (the original prefix, now orphaned) — reproduced RED against pre-fix HEAD.
    expect(wrapperParaChildTypes(lexical)).toEqual(['marker', 'text', 'note']);
  });

  it('non-editable (visible) marker mode: unaffected by the editable-mode retain fix', async () => {
    const lexical = await renderPopoverAndWaitForInit({
      markerMode: 'visible',
      hasSpacing: true,
      isFormattedFont: true,
    });

    // `createPara` only injects the two-node MarkerNode+NBSP prefix for `markerMode: "editable"`;
    // "visible" mode's single `immutable-typed-text` prefix node is a pre-existing, out-of-scope
    // shape this fix must not touch — pin the CURRENT (unfixed-and-unchanged) ordering exactly,
    // so a regression in the editable-mode branch's conditional would be caught here.
    expect(wrapperParaChildTypes(lexical)).toEqual(['note', 'immutable-typed-text']);
  });
});
