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

/** A single well-formed footnote op (`\fr` reference + `\ft` text) loaded into the popover. */
export const sentinelNoteOp: DeltaOpInsertNoteEmbed = {
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

/** The editable-marker-mode view options (Standard view). */
export const editableView: EditorOptions['view'] = {
  markerMode: 'editable',
  hasSpacing: true,
  isFormattedFont: true,
};
