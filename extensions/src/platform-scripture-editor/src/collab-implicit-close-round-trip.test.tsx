// @vitest-environment jsdom
// End-to-end pin across the two halves of the editing stack this extension composes: the editor
// package's collaborative apply path (`EditorRef.applyUpdate`, the real component, not a mock) and
// `platform-bible-utils`' USJ-to-USFM writer. Neither repo can assert this alone — the editor does
// not own the writer, and the writer never sees a delta.
//
// What it pins: a char span that USFM closed IMPLICITLY records `closed="false"`, and a remote
// collaborator's insertion of one must neither fabricate a closing marker nor drop the flag.
// Fabricating a closer rewrites bytes the user never typed; dropping the flag makes the NEXT
// serialization fabricate one for them.
//
// The two shapes are here for different reasons, and the difference is load-bearing:
//   - `\nd` is DECISIVE. Its closing marker is not optional, so the writer emits `\nd*` unless
//     `closed="false"` says otherwise — the control test below pins exactly that. This is the case
//     that can actually go red if the flag stops riding the wire.
//   - `\fr`/`\ft` inside a note are the shape the editor's USX path produces, but their closing
//     markers are OPTIONAL, so the writer omits `\fr*`/`\ft*` whether or not the flag survives.
//     Their assertions therefore pin the flag's survival in the USJ, not its effect on the bytes;
//     that survival is what reaches ParatextData and what a future flip of the markers map's
//     `shouldOptionalClosingMarkersBePresent` would depend on.
import { describe, it, expect } from 'vitest';
import { createRef } from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { Editorial, type DeltaOp, type EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { UsjReaderWriter } from 'platform-bible-utils';
import { correctEditorUsjVersion } from './platform-scripture-editor.utils';

const PARA_TEXT = 'In the beginning';

const initialUsj: Usj = {
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN' },
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, PARA_TEXT],
    },
  ],
};

/**
 * The OT offset of the end of the paragraph's text — past the book's newline, the chapter and verse
 * embeds (one unit each) and the text itself, but before the paragraph's own newline. Inserting
 * here appends to the verse, where a footnote or an emphasized word actually goes.
 */
const END_OF_PARA_TEXT = 1 + 1 + 1 + PARA_TEXT.length;

/**
 * The USFM this extension would hand to the PDP for `usj`, through the same version shim its save
 * path applies (`correctEditorUsjVersion` — the editor stamps 3.1, the writer serves 3.0).
 */
function toUsfm(usj: Usj): string {
  return new UsjReaderWriter(correctEditorUsjVersion(usj)).toUsfm();
}

/** A remote peer's insertion of a `\nd` span, with or without the implicit-close flag. */
function insertNdSpanOps(closed: 'false' | undefined): DeltaOp[] {
  return [
    { retain: END_OF_PARA_TEXT },
    { insert: 'Lord', attributes: { char: { style: 'nd', ...(closed ? { closed } : {}) } } },
  ];
}

/**
 * `\f + \fr 1:1 \ft note text` as a remote collaborator transmits it: each char span carries
 * `closed: "false"`, because in USFM neither `\fr` nor `\ft` is terminated by a closing marker —
 * `\fr` ends where `\ft` begins, and `\ft` ends where the note does.
 */
const insertImplicitlyClosedNoteOps: DeltaOp[] = [
  { retain: END_OF_PARA_TEXT },
  {
    insert: {
      note: {
        style: 'f',
        caller: '+',
        contents: {
          ops: [
            { insert: '1:1 ', attributes: { char: { style: 'fr', closed: 'false' } } },
            { insert: 'note text', attributes: { char: { style: 'ft', closed: 'false' } } },
          ],
        },
      },
    },
  },
];

type UsjMarkerObject = Exclude<Usj['content'][number], string>;

/** Every marker object in `usj` with the given `marker`, at any depth. */
function findMarkerObjects(usj: Usj, marker: string): UsjMarkerObject[] {
  const found: UsjMarkerObject[] = [];
  const visit = (items: UsjMarkerObject['content']) => {
    if (!items) return;
    items.forEach((item) => {
      if (typeof item === 'string') return;
      if (item.marker === marker) found.push(item);
      visit(item.content);
    });
  };
  visit(usj.content);
  return found;
}

/** Renders a real editor over {@link initialUsj} and returns its ref once the content has loaded. */
async function renderEditor() {
  const editorRef = createRef<EditorRef | null>();
  render(<Editorial ref={editorRef} defaultUsj={initialUsj} />);
  await waitFor(() => {
    expect(findMarkerObjects(editorRef.current?.getUsj() ?? initialUsj, 'p')).toHaveLength(1);
  });
  return editorRef;
}

/** Applies `ops` as the given source and returns the editor's USJ afterwards. */
function applyAndReadUsj(
  editorRef: { current: EditorRef | null },
  ops: DeltaOp[],
  source: 'local' | 'remote',
): Usj {
  act(() => {
    editorRef.current?.applyUpdate(ops, source);
  });
  const usj = editorRef.current?.getUsj();
  if (!usj) throw new Error('editor produced no USJ after applyUpdate');
  return usj;
}

describe('implicitly-closed char spans through the collab apply path', () => {
  it('writes no closing marker for a remotely-inserted span flagged closed="false"', async () => {
    const editorRef = await renderEditor();

    const usj = applyAndReadUsj(editorRef, insertNdSpanOps('false'), 'remote');

    expect(findMarkerObjects(usj, 'nd')[0]).toMatchObject({ marker: 'nd', closed: 'false' });
    const usfm = toUsfm(usj);
    expect(usfm).toContain('\\nd Lord');
    expect(usfm).not.toContain('\\nd*');
  });

  it('writes the closing marker for the same span unflagged (control)', async () => {
    const editorRef = await renderEditor();

    const usj = applyAndReadUsj(editorRef, insertNdSpanOps(undefined), 'remote');

    expect(findMarkerObjects(usj, 'nd')[0]).not.toHaveProperty('closed');
    // Without the flag the writer closes the span, which is what makes the assertion above a real
    // one: the two tests differ only by `closed`.
    expect(toUsfm(usj)).toContain('\\nd Lord\\nd*');
  });

  it('keeps closed="false" through a subsequent local edit to an adjacent byte', async () => {
    const editorRef = await renderEditor();

    applyAndReadUsj(editorRef, insertNdSpanOps('false'), 'remote');
    // A local keystroke immediately before the span — the span itself is untouched, so a flag that
    // only survives while nothing near it moves would still be a defect.
    const usj = applyAndReadUsj(
      editorRef,
      [{ retain: END_OF_PARA_TEXT }, { insert: '!' }],
      'local',
    );

    expect(findMarkerObjects(usj, 'nd')[0]).toMatchObject({ closed: 'false' });
    const usfm = toUsfm(usj);
    expect(usfm).toContain(`${PARA_TEXT}!`);
    expect(usfm).not.toContain('\\nd*');
  });

  it('keeps closed="false" on the note-internal spans a remote peer sends', async () => {
    const editorRef = await renderEditor();

    const usj = applyAndReadUsj(editorRef, insertImplicitlyClosedNoteOps, 'remote');

    expect(findMarkerObjects(usj, 'fr')[0]).toMatchObject({ marker: 'fr', closed: 'false' });
    expect(findMarkerObjects(usj, 'ft')[0]).toMatchObject({ marker: 'ft', closed: 'false' });
    const usfm = toUsfm(usj);
    expect(usfm).toContain('\\f + \\fr 1:1 \\ft note text\\f*');
  });
});
