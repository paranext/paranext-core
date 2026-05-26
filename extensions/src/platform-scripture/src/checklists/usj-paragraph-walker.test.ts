import { describe, it, expect } from 'vitest';
import { walkParagraphMarkers } from './usj-paragraph-walker';
import {
  SIMPLE_GENESIS_ONE_PARA,
  GENESIS_WITH_HEADING,
  GENESIS_HEADING_BEFORE_CHAPTER,
  EMPTY_BOOK,
  PARA_WITH_NESTED_NOTE,
  PARA_WITH_IOR_CHAR,
} from './test-fixtures/usj-fixtures';

const GEN_BOOK_NUM = 1;

describe('walkParagraphMarkers', () => {
  describe('basic walking', () => {
    it('emits one paragraph for SIMPLE_GENESIS_ONE_PARA with verseRef at GEN 1:1', () => {
      const paragraphs = walkParagraphMarkers(
        SIMPLE_GENESIS_ONE_PARA,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0].marker).toBe('p');
      expect(paragraphs[0].isHeading).toBe(false);
      expect(paragraphs[0].verseRefStart).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    });

    it('emits empty array for empty book', () => {
      const paragraphs = walkParagraphMarkers(EMPTY_BOOK, GEN_BOOK_NUM, new Set(), new Set());
      expect(paragraphs).toEqual([]);
    });
  });

  describe('user markerFilter', () => {
    it('non-empty filter excludes paragraphs whose marker is not in the filter', () => {
      const paragraphs = walkParagraphMarkers(
        GENESIS_WITH_HEADING,
        GEN_BOOK_NUM,
        new Set(['p']), // only paragraphs with marker 'p'
        new Set(['s']), // heading classification
      );
      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0].marker).toBe('p');
    });

    it('empty filter includes all paragraphs', () => {
      const paragraphs = walkParagraphMarkers(
        GENESIS_WITH_HEADING,
        GEN_BOOK_NUM,
        new Set(),
        new Set(['s']),
      );
      expect(paragraphs).toHaveLength(2);
      expect(paragraphs.map((p) => p.marker)).toEqual(['s', 'p']);
    });
  });

  describe('heading classification + INV-009 forward scan', () => {
    it('marks heading paragraphs with isHeading=true', () => {
      const paragraphs = walkParagraphMarkers(
        GENESIS_WITH_HEADING,
        GEN_BOOK_NUM,
        new Set(),
        new Set(['s']),
      );
      const heading = paragraphs.find((p) => p.marker === 's');
      expect(heading?.isHeading).toBe(true);
    });

    it("heading paragraph's verseRefStart is the next non-heading paragraph's first verse", () => {
      const paragraphs = walkParagraphMarkers(
        GENESIS_WITH_HEADING,
        GEN_BOOK_NUM,
        new Set(),
        new Set(['s']),
      );
      const heading = paragraphs.find((p) => p.marker === 's');
      // Forward-scan should land on GEN 1:1 (the first verse of the next body paragraph).
      expect(heading?.verseRefStart).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
    });

    it('FB-35863: heading right before chapter boundary does NOT pull forward into next chapter', () => {
      const paragraphs = walkParagraphMarkers(
        GENESIS_HEADING_BEFORE_CHAPTER,
        GEN_BOOK_NUM,
        new Set(),
        new Set(['s']),
      );
      const heading = paragraphs.find((p) => p.marker === 's');
      // The forward-scan must STOP at the chapter boundary; the heading retains the
      // verseRef of the previous content (GEN 1:1 in this fixture — the current verseRef
      // state when the heading was encountered).
      expect(heading?.verseRefStart.chapterNum).toBe(1);
      expect(heading?.verseRefStart.book).toBe('GEN');
      // Specifically, it must NOT have advanced to chapter 2's verse 1.
      expect(heading?.verseRefStart).not.toEqual({ book: 'GEN', chapterNum: 2, verseNum: 1 });
    });

    it('skips intermediate heading markers during forward-scan (e.g. \\s1 then \\s2 then \\p)', () => {
      const usj = {
        type: 'USJ' as const,
        version: '3.1' as const,
        content: [
          { type: 'book', marker: 'id', code: 'GEN' as const, content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1' },
          { type: 'para', marker: 's1', content: ['Major heading'] },
          { type: 'para', marker: 's2', content: ['Sub heading'] },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '1' }, 'Body'],
          },
        ],
      };
      const paragraphs = walkParagraphMarkers(usj, GEN_BOOK_NUM, new Set(), new Set(['s1', 's2']));
      const s1 = paragraphs.find((p) => p.marker === 's1');
      const s2 = paragraphs.find((p) => p.marker === 's2');
      // Both headings inherit GEN 1:1 from the body paragraph that follows them.
      expect(s1?.verseRefStart.verseNum).toBe(1);
      expect(s2?.verseRefStart.verseNum).toBe(1);
    });
  });

  describe('skip nested notes/figures', () => {
    it('does NOT emit paragraphs nested inside note nodes', () => {
      const paragraphs = walkParagraphMarkers(
        PARA_WITH_NESTED_NOTE,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      // Should emit exactly one paragraph — the outer 'p' — not the 'fp' inside the note.
      expect(paragraphs).toHaveLength(1);
      expect(paragraphs[0].marker).toBe('p');
    });

    it('outer paragraph items skip the inline note entirely', () => {
      const paragraphs = walkParagraphMarkers(
        PARA_WITH_NESTED_NOTE,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      // The text content from inside the note must not appear in the paragraph's items.
      const allText = paragraphs[0].items
        .flatMap((i) => (i.type === 'text' ? [i.text] : []))
        .join('');
      expect(allText).not.toMatch(/Footnote paragraph/);
    });
  });

  describe('item extraction', () => {
    it('extracts text strings as TextItems', () => {
      const paragraphs = walkParagraphMarkers(
        SIMPLE_GENESIS_ONE_PARA,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      const textItems = paragraphs[0].items.filter((i) => i.type === 'text');
      expect(textItems.length).toBeGreaterThan(0);
    });

    it('top-level string text items have characterStyle=undefined', () => {
      const paragraphs = walkParagraphMarkers(
        SIMPLE_GENESIS_ONE_PARA,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      const text = paragraphs[0].items.find((i) => i.type === 'text');
      expect(text).toBeDefined();
      expect(text && 'characterStyle' in text ? text.characterStyle : 'missing').toBeUndefined();
    });

    it('extracts verse markers as VerseItems', () => {
      const paragraphs = walkParagraphMarkers(
        SIMPLE_GENESIS_ONE_PARA,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      const verseItems = paragraphs[0].items.filter((i) => i.type === 'verse');
      expect(verseItems).toEqual([{ type: 'verse', verseNumber: '1' }]);
    });

    it('emits TextItem with characterStyle for char-marker spans (NOT LinkItem) — consumer-inventory § 3', () => {
      const paragraphs = walkParagraphMarkers(
        PARA_WITH_IOR_CHAR,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      expect(paragraphs).toHaveLength(1);
      const { items } = paragraphs[0];
      // No LinkItem should be emitted — that's reserved for the CrossReferences checklist branch.
      expect(items.some((i) => i.type === 'link')).toBe(false);
      // The \ior content must show up as a TextItem with characterStyle: 'ior'.
      const iorItem = items.find((i) => i.type === 'text' && i.characterStyle === 'ior');
      expect(iorItem).toBeDefined();
      expect(iorItem?.type === 'text' ? iorItem.text : '').toBe('1:1');
    });

    it('skips inline note nodes when extracting items (no items from inside the note)', () => {
      const paragraphs = walkParagraphMarkers(
        PARA_WITH_NESTED_NOTE,
        GEN_BOOK_NUM,
        new Set(),
        new Set(),
      );
      // Items should be: verse 1, "Before note. ", " After note." — the note is skipped entirely.
      const { items } = paragraphs[0];
      expect(items.some((i) => i.type === 'verse')).toBe(true);
      const textsConcat = items.flatMap((i) => (i.type === 'text' ? [i.text] : [])).join('');
      expect(textsConcat).toMatch(/Before note\./);
      expect(textsConcat).toMatch(/After note\./);
    });
  });

  describe('verseRef tracking state', () => {
    it('initial verseRef before any verse marker is chapter=1 verse=0', () => {
      // A paragraph before the first verse should carry the introductory verseRef.
      const introUsj = {
        type: 'USJ' as const,
        version: '3.1' as const,
        content: [
          { type: 'book', marker: 'id', code: 'GEN' as const, content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1' },
          { type: 'para', marker: 'ip', content: ['Introduction paragraph.'] },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '1' }, 'Body'],
          },
        ],
      };
      const paragraphs = walkParagraphMarkers(introUsj, GEN_BOOK_NUM, new Set(), new Set());
      const intro = paragraphs.find((p) => p.marker === 'ip');
      expect(intro?.verseRefStart.verseNum).toBe(0);
      expect(intro?.verseRefStart.chapterNum).toBe(1);
    });

    it("a body paragraph after a previous paragraph inherits the previous paragraph's last verse", () => {
      // Two paragraphs in the same chapter — the second has no verse marker but should inherit
      // the last seen verse from the first paragraph.
      const usj = {
        type: 'USJ' as const,
        version: '3.1' as const,
        content: [
          { type: 'book', marker: 'id', code: 'GEN' as const, content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1' },
          {
            type: 'para',
            marker: 'p',
            content: [
              { type: 'verse', marker: 'v', number: '1' },
              'First verse text. ',
              { type: 'verse', marker: 'v', number: '2' },
              'Second verse text.',
            ],
          },
          { type: 'para', marker: 'p', content: ['Continuation text in the same verse.'] },
        ],
      };
      const paragraphs = walkParagraphMarkers(usj, GEN_BOOK_NUM, new Set(), new Set());
      expect(paragraphs).toHaveLength(2);
      // The first paragraph starts at verse 1 (its first verse marker).
      expect(paragraphs[0].verseRefStart).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
      // The second paragraph inherits verse 2 (the last verse seen in the first paragraph).
      expect(paragraphs[1].verseRefStart).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 2 });
    });

    it('chapter boundary resets verseNum to 0', () => {
      const usj = {
        type: 'USJ' as const,
        version: '3.1' as const,
        content: [
          { type: 'book', marker: 'id', code: 'GEN' as const, content: ['Genesis'] },
          { type: 'chapter', marker: 'c', number: '1' },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '5' }, 'Verse 5.'],
          },
          { type: 'chapter', marker: 'c', number: '2' },
          // No verse marker — should be GEN 2:0.
          { type: 'para', marker: 'p', content: ['Chapter 2 lead text.'] },
        ],
      };
      const paragraphs = walkParagraphMarkers(usj, GEN_BOOK_NUM, new Set(), new Set());
      expect(paragraphs).toHaveLength(2);
      expect(paragraphs[1].verseRefStart).toEqual({ book: 'GEN', chapterNum: 2, verseNum: 0 });
    });
  });

  describe('book number mapping', () => {
    it('uses Canon.bookNumberToId to populate the book field (bookNum=40 -> MAT)', () => {
      // Canon's 1-based numbering: 1=GEN, 40=MAT, 41=MRK, ..., 66=REV.
      const matUsj = {
        type: 'USJ' as const,
        version: '3.1' as const,
        content: [
          { type: 'book', marker: 'id', code: 'MAT' as const, content: ['Matthew'] },
          { type: 'chapter', marker: 'c', number: '1' },
          {
            type: 'para',
            marker: 'p',
            content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the beginning'],
          },
        ],
      };
      const paragraphs = walkParagraphMarkers(matUsj, 40, new Set(), new Set());
      expect(paragraphs[0].verseRefStart.book).toBe('MAT');
    });
  });
});
