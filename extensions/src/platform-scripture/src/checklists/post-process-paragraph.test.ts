import { describe, expect, it } from 'vitest';
import { postProcessParagraph, RTL_MARKER } from './post-process-paragraph';
import type { ChecklistContentItem, WalkerParagraph } from './checklist.types';

/**
 * Tests ported from `c-sharp-tests/Checklists/Markers/MarkersDataSourceTests.cs` —
 * `PostProcessParagraph` section (TS-009, TS-010, TS-067). After UX-2 #13 / WP1, the C#
 * `PostProcessParagraph` no longer prepends a synthetic `\marker` TextItem at items[0]: the UI
 * renders the marker from `paragraph.marker` separately (see `checklist.component.tsx`
 * `renderParagraphLine`). These tests assert the revised post-WP1 contract.
 *
 * RTL behavior: per `c-sharp/Checklists/ChecklistService.cs:1088`, RTL prefix is applied to
 * ORIGINAL text items only by the walker. `postProcessParagraph` does NOT re-prefix them.
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
  describe('items pass-through (post-UX-2 #13 / WP1)', () => {
    it('TS-009: showVerseText=false returns an empty items list', () => {
      // C# TS-009 pre-WP1 expected a single TextItem("\\p") here. Post-WP1: empty list.
      // The UI renders the `\p` label from paragraph.marker; the synthetic TextItem was a
      // duplicate.
      const input = makeParagraph('p', [
        { type: 'text', text: 'verse text here', characterStyle: undefined },
        { type: 'text', text: 'more text', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.marker).toBe('p');
      expect(result.items).toEqual([]);
    });

    it('TS-010: showVerseText=true passes walker items through unchanged', () => {
      // C# TS-010 pre-WP1 expected `[TextItem("\\q2"), ...walkerItems]`. Post-WP1: just the
      // walker items, in order, with no synthetic marker label.
      const input = makeParagraph('q2', [
        { type: 'text', text: 'indented ', characterStyle: undefined },
        { type: 'text', text: 'poetry', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: true });
      expect(result.items).toEqual([
        { type: 'text', text: 'indented ', characterStyle: undefined },
        { type: 'text', text: 'poetry', characterStyle: undefined },
      ]);
    });

    it('TS-067: q1 marker with showVerseText=false returns empty items', () => {
      const input = makeParagraph('q1', [
        { type: 'text', text: 'some content', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.items).toEqual([]);
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
        { type: 'verse', verseNumber: '1' },
        { type: 'text', text: 'In the beginning', characterStyle: undefined },
      ]);
    });

    it('drops all items (including VerseItem) when showVerseText=false', () => {
      const input = makeParagraph('p', [
        { type: 'verse', verseNumber: '1' },
        { type: 'text', text: 'In the beginning', characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: false });
      expect(result.items).toEqual([]);
    });
  });

  describe('RTL handling — walker-supplied RTL text passes through unchanged', () => {
    it('preserves the RTL prefix the walker emitted on the original text item', () => {
      // Per c-sharp/Checklists/ChecklistService.cs:1088, the walker applies the RTL prefix to
      // original text items at extraction time. postProcessParagraph does NOT touch the items.
      const rtlTextFromWalker = `${RTL_MARKER}שלום`;
      const input = makeParagraph('p', [
        { type: 'text', text: rtlTextFromWalker, characterStyle: undefined },
      ]);
      const result = postProcessParagraph(input, { showVerseText: true });

      // No synthetic marker label is inserted; the walker's text item passes through unchanged
      // with the RTL prefix preserved.
      expect(result.items).toEqual([
        { type: 'text', text: rtlTextFromWalker, characterStyle: undefined },
      ]);
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
