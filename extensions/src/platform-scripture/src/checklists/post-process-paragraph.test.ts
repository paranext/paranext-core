import { describe, expect, it } from 'vitest';
import { postProcessParagraph, RTL_MARKER } from './post-process-paragraph';
import type { ChecklistContentItem, WalkerParagraph } from './checklist.types';

/**
 * Tests ported from `c-sharp-tests/Checklists/Markers/MarkersDataSourceTests.cs` —
 * `PostProcessParagraph` section (TS-009, TS-010, TS-067). The C# `PostProcessParagraph`
 * (`c-sharp/Checklists/Markers/MarkersDataSource.cs:67-79`) takes a `ChecklistParagraph` and a
 * `showVerseText` flag; the TS version additionally takes per-cell `language` and `rtl` (the
 * upstream walker applies the RTL prefix to text items it emits, but this module is exercised in
 * the orchestrator boundary where the RTL flag is threaded explicitly).
 *
 * RTL behavior: per `c-sharp/Checklists/ChecklistService.cs:1088`, RTL prefix is applied to
 * ORIGINAL text items only by the walker, NOT to the synthetic `\marker` label added by
 * `PostProcessParagraph`. This module follows the same contract: text items in the input have
 * already been RTL-prefixed by the walker; PostProcessParagraph does NOT re-prefix them and does
 * NOT prefix the synthetic `\marker` label.
 */

function makeParagraph(marker: string, items: ChecklistContentItem[]): WalkerParagraph {
  return {
    marker,
    verseRefStart: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    isHeading: false,
    items,
  };
}

describe('postProcessParagraph', () => {
  describe('INV-004 — prepend \\marker text item at index 0', () => {
    it('TS-009: showVerseText=false clears items and inserts marker-only', () => {
      // C# TS-009: input items = [TextItem("verse text here"), TextItem("more text")]; with
      // showVerseText=false, the result must be a single TextItem("\\p").
      const input = makeParagraph('p', [
        { type: 'text', text: 'verse text here', characterStyle: undefined },
        { type: 'text', text: 'more text', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.marker).toBe('p');
      expect(result.items).toEqual([{ type: 'text', text: '\\p', characterStyle: undefined }]);
    });

    it('TS-010: showVerseText=true prepends marker before original items', () => {
      // C# TS-010: input items = [TextItem("indented "), TextItem("poetry")]; with
      // showVerseText=true, result must be [TextItem("\\q2"), TextItem("indented "), TextItem("poetry")].
      const input = makeParagraph('q2', [
        { type: 'text', text: 'indented ', characterStyle: undefined },
        { type: 'text', text: 'poetry', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: true });
      expect(result.items).toEqual([
        { type: 'text', text: '\\q2', characterStyle: undefined },
        { type: 'text', text: 'indented ', characterStyle: undefined },
        { type: 'text', text: 'poetry', characterStyle: undefined },
      ]);
    });

    it('TS-067: q1 marker with showVerseText=false displays exactly "\\q1"', () => {
      const input = makeParagraph('q1', [
        { type: 'text', text: 'some content', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.items).toEqual([{ type: 'text', text: '\\q1', characterStyle: undefined }]);
    });
  });

  describe('non-text items', () => {
    it('preserves VerseItem in the items list when showVerseText=true', () => {
      const input = makeParagraph('p', [
        { type: 'verse', verseNumber: '1' },
        { type: 'text', text: 'In the beginning', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: true });
      expect(result.items).toEqual([
        { type: 'text', text: '\\p', characterStyle: undefined },
        { type: 'verse', verseNumber: '1' },
        { type: 'text', text: 'In the beginning', characterStyle: undefined },
      ]);
    });

    it('drops VerseItem (and all non-marker items) when showVerseText=false', () => {
      const input = makeParagraph('p', [
        { type: 'verse', verseNumber: '1' },
        { type: 'text', text: 'In the beginning', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.items).toEqual([{ type: 'text', text: '\\p', characterStyle: undefined }]);
    });
  });

  describe('RTL handling — synthetic marker label is NOT RTL-prefixed', () => {
    it('does NOT add the RTL prefix to the synthetic "\\p" label', () => {
      // Per c-sharp/Checklists/ChecklistService.cs:1088, the walker applies RTL prefix to original
      // text items at extraction time. PostProcessParagraph does NOT touch the items' RTL status
      // and does NOT prefix the synthetic \marker label. (C# MarkersDataSource.PostProcessParagraph
      // at MarkersDataSource.cs:67-79 inserts `new TextItem("\\" + paragraph.Marker, null)` with no
      // RTL handling.)
      const rtlTextFromWalker = `${RTL_MARKER}שלום`;
      const input = makeParagraph('p', [
        { type: 'text', text: rtlTextFromWalker, characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: true });

      // Synthetic marker label is not RTL-prefixed.
      expect(result.items[0]).toEqual({ type: 'text', text: '\\p', characterStyle: undefined });

      // Original text item passes through unchanged (RTL prefix is preserved as-emitted by the
      // walker).
      expect(result.items[1]).toEqual({
        type: 'text',
        text: rtlTextFromWalker,
        characterStyle: undefined,
      });
    });
  });

  describe('paragraph metadata preservation', () => {
    it('preserves marker / verseRefStart / isHeading fields on the output paragraph', () => {
      const input: WalkerParagraph = {
        marker: 's',
        verseRefStart: { book: 'GEN', chapterNum: 2, verseNum: 4 },
        isHeading: true,
        items: [{ type: 'text', text: 'Heading text', characterStyle: undefined }],
      };
      const result = postProcessParagraph(input, { showVerseText: true });
      expect(result.marker).toBe('s');
      expect(result.verseRefStart).toEqual({ book: 'GEN', chapterNum: 2, verseNum: 4 });
      expect(result.isHeading).toBe(true);
    });
  });

  describe('immutability', () => {
    it('returns a new paragraph object — does not mutate the input items array', () => {
      const originalItems: ChecklistContentItem[] = [
        { type: 'text', text: 'hello', characterStyle: undefined },
      ];
      const input = makeParagraph('p', originalItems);
      postProcessParagraph(input, { showVerseText: true });
      // Input items list reference and length are unchanged.
      expect(input.items).toBe(originalItems);
      expect(input.items).toHaveLength(1);
      expect(input.items[0]).toEqual({ type: 'text', text: 'hello', characterStyle: undefined });
    });
  });
});
