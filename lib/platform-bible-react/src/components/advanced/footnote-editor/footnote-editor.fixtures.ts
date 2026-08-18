/**
 * Dependency-light shared fixtures for the footnote-editor test suites AND the Storybook story.
 * Kept free of `@testing-library/react` (unlike footnote-editor.test-harness) so the story can
 * import these without pulling test-only deps into the Storybook bundle.
 */
import type { DeltaOpInsertNoteEmbed, EditorOptions } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditorLocalizedStrings,
} from './footnote-editor.types';

/** Builds a pass-through localized-strings map (every key maps to itself). */
export function buildLocalizedStrings(): FootnoteEditorLocalizedStrings {
  const entries = FOOTNOTE_EDITOR_STRING_KEYS.map((key) => [key, key] as const);
  // `FootnoteEditorLocalizedStrings` is a mapped type over every key in
  // `FOOTNOTE_EDITOR_STRING_KEYS`; building it from `Object.fromEntries` is simpler than spelling
  // out every key by hand, but `Object.fromEntries`'s return type is necessarily untyped.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.fromEntries(entries) as FootnoteEditorLocalizedStrings;
}

/** A fixed Scripture reference for the popover under test. */
export const scrRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
  verse: '1',
};

/**
 * A single well-formed footnote op (`\fr` reference + `\ft` text) loaded into the popover.
 *
 * The `closed: 'false'` on each note-content char mirrors what ParatextData stamps on every
 * implicitly-closed span (`\fr`/`\ft`/`\fp` take no end marker; the next bare marker terminates
 * them) — the shape the host editor's note ops actually carry. The editor's footnote-paragraph
 * break keys on that state: writing `\fp` inside an implicitly-closed `\ft` ENDS the `\ft` and
 * takes the remainder as the break's content, whereas an explicitly-closed span (which omitting
 * the flag would claim) closes and REOPENS around the break.
 */
export const sentinelNoteOp: DeltaOpInsertNoteEmbed = {
  insert: {
    note: {
      style: 'f',
      caller: '+',
      contents: {
        ops: [
          { insert: '1:1 ', attributes: { char: { style: 'fr', closed: 'false' } } },
          { insert: 'sentinel note text', attributes: { char: { style: 'ft', closed: 'false' } } },
        ],
      },
    },
  },
};

/**
 * A footnote op whose content already holds two `\fp` (footnote-paragraph) spans after the `\ft`
 * text — the shape the Enter/paste machinery produces. Distinct `cid`s keep the consecutive
 * same-style `\fp` runs as separate char spans instead of letting the delta merge them.
 */
export const twoFpNoteOp: DeltaOpInsertNoteEmbed = {
  insert: {
    note: {
      style: 'f',
      caller: '+',
      contents: {
        ops: [
          { insert: '1:1 ', attributes: { char: { style: 'fr', closed: 'false' } } },
          { insert: 'first paragraph ', attributes: { char: { style: 'ft', closed: 'false' } } },
          {
            insert: 'second paragraph ',
            attributes: { char: { style: 'fp', closed: 'false', cid: 'fp-1' } },
          },
          {
            insert: 'third paragraph',
            attributes: { char: { style: 'fp', closed: 'false', cid: 'fp-2' } },
          },
        ],
      },
    },
  },
};

/** The editable-marker-mode view options (Standard view). */
export const editableView: EditorOptions['view'] = {
  markerMode: 'editable',
  hasSpacing: true,
  isFormattedFont: true,
};
