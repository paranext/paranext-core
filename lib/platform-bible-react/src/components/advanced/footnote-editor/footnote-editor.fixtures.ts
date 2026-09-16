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

/**
 * The English text for every key the editor's chrome actually renders, so a story reads the way the
 * app does instead of showing raw keys. Kept in step with `assets/localization/en.json` by hand -
 * that file lives outside this package, and a demo fixture is not worth a cross-package import.
 *
 * Keys the chrome never shows (the marker menu, the USFM marker descriptions) stay pass-through:
 * the visible surface is what a reviewer judges, and a short list is easier to keep honest.
 */
const demoStringOverrides = {
  '%footnoteEditor_callerDropdown_item_custom%': 'Custom',
  '%footnoteEditor_callerDropdown_item_generated%': 'Auto-generated',
  '%footnoteEditor_callerDropdown_item_hidden%': 'Hidden',
  '%footnoteEditor_callerDropdown_label%': 'Footnote caller',
  '%footnoteEditor_callerDropdown_tooltip%': 'Footnote caller',
  '%footnoteEditor_copyButton_tooltip%': 'Copy footnote',
  '%footnoteEditor_noteType_crossReference_label%': 'Cross-reference',
  '%footnoteEditor_noteType_endNote_label%': 'Endnote',
  '%footnoteEditor_noteType_footnote_label%': 'Footnote',
  '%footnoteEditor_noteType_tooltip%': 'Change type: Footnote',
  '%footnoteEditor_noteTypeDropdown_label%': 'Type',
  '%footnoteEditor_saveButton_tooltip%': 'Save footnote',
  '%undoButton_tooltip%': 'Undo',
  '%redoButton_tooltip%': 'Redo',
  '%cancelButton_tooltip%': 'Cancel',
  '%acceptButton_tooltip%': 'Save',
  // `satisfies` rather than a `Partial<...>` annotation: the annotation would widen every value to
  // `string | undefined`, and spreading that over the full map reintroduces `undefined` where the
  // map promises a string.
} satisfies Partial<FootnoteEditorLocalizedStrings>;

/** Builds the localized-strings map a story renders with. See {@link demoStringOverrides}. */
export function buildDemoLocalizedStrings(): FootnoteEditorLocalizedStrings {
  return { ...buildLocalizedStrings(), ...demoStringOverrides };
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
 * takes the remainder as the break's content, whereas an explicitly-closed span (which omitting the
 * flag would claim) closes and REOPENS around the break.
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
