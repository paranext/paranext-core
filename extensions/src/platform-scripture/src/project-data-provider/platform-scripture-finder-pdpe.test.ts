import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScriptureRangeUsjChapterOrUsfmVerseLocation } from 'platform-scripture';
import {
  ScriptureFinderProjectDataProviderEngine,
  ScriptureFinderOverlayPDPs,
} from './platform-scripture-finder-pdpe.model';

// Simple USFM test data for Matthew chapter 1
const TEST_BOOK_USFM = String.raw`\id MAT
\c 1
\p
\v 1 The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
\v 2 Abraham was the father of Isaac, and Isaac the father of Jacob.
\v 3 And Jacob the father of Judah and his brothers.
\c 2
\p
\v 1 Now after Jesus was born in Bethlehem of Judea in the days of Herod the king.`;

// Chapter 1 only USFM
const TEST_CHAPTER_1_USFM = String.raw`\id MAT
\c 1
\p
\v 1 The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
\v 2 Abraham was the father of Isaac, and Isaac the father of Jacob.
\v 3 And Jacob the father of Judah and his brothers.`;

// Corresponding USX for the test book
const TEST_BOOK_USX = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.0">
  <book code="MAT" style="id">Matthew</book>
  <chapter number="1" style="c" sid="MAT 1"/>
  <para style="p">
    <verse number="1" style="v" sid="MAT 1:1"/>The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.<verse eid="MAT 1:1"/>
    <verse number="2" style="v" sid="MAT 1:2"/>Abraham was the father of Isaac, and Isaac the father of Jacob.<verse eid="MAT 1:2"/>
    <verse number="3" style="v" sid="MAT 1:3"/>And Jacob the father of Judah and his brothers.<verse eid="MAT 1:3"/>
  </para>
  <chapter eid="MAT 1"/>
  <chapter number="2" style="c" sid="MAT 2"/>
  <para style="p">
    <verse number="1" style="v" sid="MAT 2:1"/>Now after Jesus was born in Bethlehem of Judea in the days of Herod the king.<verse eid="MAT 2:1"/>
  </para>
  <chapter eid="MAT 2"/>
</usx>`;

// Chapter 1 only USX
const TEST_CHAPTER_1_USX = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.0">
  <book code="MAT" style="id">Matthew</book>
  <chapter number="1" style="c" sid="MAT 1"/>
  <para style="p">
    <verse number="1" style="v" sid="MAT 1:1"/>The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.<verse eid="MAT 1:1"/>
    <verse number="2" style="v" sid="MAT 1:2"/>Abraham was the father of Isaac, and Isaac the father of Jacob.<verse eid="MAT 1:2"/>
    <verse number="3" style="v" sid="MAT 1:3"/>And Jacob the father of Judah and his brothers.<verse eid="MAT 1:3"/>
  </para>
  <chapter eid="MAT 1"/>
</usx>`;

// Chapter 2 only USX
const TEST_CHAPTER_2_USX = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.0">
  <book code="MAT" style="id">Matthew</book>
  <chapter number="2" style="c" sid="MAT 2"/>
  <para style="p">
    <verse number="1" style="v" sid="MAT 2:1"/>Now after Jesus was born in Bethlehem of Judea in the days of Herod the king.<verse eid="MAT 2:1"/>
  </para>
  <chapter eid="MAT 2"/>
</usx>`;

// Chapter 1 only USX for Mark
const TEST_MRK_CHAPTER_1_USX = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.0">
  <book code="MRK" style="id">Mark</book>
  <chapter number="1" style="c" sid="MRK 1"/>
  <para style="p">
    <verse number="1" style="v" sid="MRK 1:1"/>The beginning of the gospel of Jesus Christ.<verse eid="MRK 1:1"/>
  </para>
  <chapter eid="MRK 1"/>
</usx>`;

/**
 * Updates verse text content in a USX string based on verse texts extracted from USFM. Tracks \id
 * and \c markers to build fully-qualified verse sids (e.g., "MAT 1:1") so the correct verse in the
 * USX is patched even when the same verse number appears in multiple chapters.
 */
function patchUsxWithUsfmVerseTexts(usx: string, usfm: string): string {
  let patched = usx;
  let currentBook = '';
  let currentChapter = 0;

  usfm.split('\n').forEach((line) => {
    const idMatch = line.match(/^\\id\s+(\S+)/);
    if (idMatch) {
      [, currentBook] = idMatch;
      return;
    }

    const cMatch = line.match(/^\\c\s+(\d+)/);
    if (cMatch) {
      currentChapter = parseInt(cMatch[1], 10);
      return;
    }

    const vMatch = line.match(/^\\v\s+(\d+)\s(.*)$/);
    if (vMatch) {
      const [, verseNum, verseText] = vMatch;
      const sid = `${currentBook} ${currentChapter}:${verseNum}`;
      // Escape special regex characters in the sid string
      const sidEsc = sid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(sid="${sidEsc}"/>)[\\s\\S]*?(<verse eid="${sidEsc}"/>)`);
      // Use function replacement to avoid $-backreference issues in verseText
      patched = patched.replace(pattern, (_m, g1, g2) => `${g1}${verseText}${g2}`);
    }
  });
  return patched;
}

/** Creates mock PDPs for testing */
function createMockPdps(): ScriptureFinderOverlayPDPs {
  // Mutable USX stores so that setChapterUSFM / setBookUSFM writes are reflected by subsequent
  // getChapterUSX / getBookUSX reads ("stacking writes").
  const chapterUSXStore = new Map<string, string>([
    ['MAT:1', TEST_CHAPTER_1_USX],
    ['MAT:2', TEST_CHAPTER_2_USX],
    ['MRK:1', TEST_MRK_CHAPTER_1_USX],
  ]);
  const bookUSXStore = new Map<string, string>([['MAT', TEST_BOOK_USX]]);

  // We only need this much of the PDPs for these tests
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    'platformScripture.USX_Book': {
      getBookUSX: vi
        .fn()
        .mockImplementation((verseRef: { book: string }) =>
          Promise.resolve(bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX),
        ),
      setBookUSX: vi.fn().mockResolvedValue(true),
      subscribeBookUSX: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
    'platformScripture.USX_Chapter': {
      getChapterUSX: vi
        .fn()
        .mockImplementation((verseRef: { book: string; chapterNum: number }) => {
          const key = `${verseRef.book}:${verseRef.chapterNum}`;
          const stored = chapterUSXStore.get(key);
          if (stored) return Promise.resolve(stored);
          // Fallback for unknown chapters
          if (verseRef.book === 'MRK') return Promise.resolve(TEST_MRK_CHAPTER_1_USX);
          return verseRef.chapterNum === 2
            ? Promise.resolve(TEST_CHAPTER_2_USX)
            : Promise.resolve(TEST_CHAPTER_1_USX);
        }),
      setChapterUSX: vi.fn().mockResolvedValue(true),
      subscribeChapterUSX: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
    'platformScripture.USFM_Book': {
      getBookUSFM: vi.fn().mockResolvedValue(TEST_BOOK_USFM),
      setBookUSFM: vi
        .fn()
        .mockImplementation((verseRef: { book: string }, usfm: string | DataView) => {
          const currentUSX = bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX;
          bookUSXStore.set(verseRef.book, patchUsxWithUsfmVerseTexts(currentUSX, String(usfm)));
          // Update chapter entries since book content changed
          [...chapterUSXStore.entries()].forEach(([chKey, chUSX]) => {
            if (chKey.startsWith(`${verseRef.book}:`)) {
              chapterUSXStore.set(chKey, patchUsxWithUsfmVerseTexts(chUSX, String(usfm)));
            }
          });
          return Promise.resolve(true);
        }),
      subscribeBookUSFM: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
    'platformScripture.USFM_Chapter': {
      getChapterUSFM: vi.fn().mockResolvedValue(TEST_CHAPTER_1_USFM),
      setChapterUSFM: vi
        .fn()
        .mockImplementation(
          (verseRef: { book: string; chapterNum: number }, usfm: string | DataView) => {
            const key = `${verseRef.book}:${verseRef.chapterNum}`;
            const currentUSX = chapterUSXStore.get(key) ?? TEST_CHAPTER_1_USX;
            chapterUSXStore.set(key, patchUsxWithUsfmVerseTexts(currentUSX, String(usfm)));
            // Update book entry since chapter content changed
            const currentBookUSX = bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX;
            bookUSXStore.set(
              verseRef.book,
              patchUsxWithUsfmVerseTexts(currentBookUSX, String(usfm)),
            );
            return Promise.resolve(true);
          },
        ),
      subscribeChapterUSFM: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
  } as unknown as ScriptureFinderOverlayPDPs;
}

describe('ScriptureFinderProjectDataProviderEngine.replace', () => {
  let engine: ScriptureFinderProjectDataProviderEngine;
  let mockPdps: ScriptureFinderOverlayPDPs;

  beforeEach(() => {
    mockPdps = createMockPdps();
    engine = new ScriptureFinderProjectDataProviderEngine(mockPdps);
  });

  /** Flush all pending microtasks so lock acquisitions and async operations settle */
  const flushPromises = () =>
    new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

  /**
   * Helper to get the USFM that was written to the mock (checks chapter-level first, then
   * book-level)
   */
  function getWrittenUsfm(): string {
    const chapterMock = vi.mocked(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM);
    if (chapterMock.mock.calls.length > 0) return String(chapterMock.mock.calls[0][1]);

    const bookMock = vi.mocked(mockPdps['platformScripture.USFM_Book'].setBookUSFM);
    if (bookMock.mock.calls.length > 0) return String(bookMock.mock.calls[0][1]);

    throw new Error('No USFM was written to either setChapterUSFM or setBookUSFM');
  }

  describe('validation', () => {
    it('should do nothing when rangesToReplace is empty', async () => {
      await engine.replace([], 'replacement text');

      // No PDP methods should be called
      expect(mockPdps['platformScripture.USFM_Book'].getBookUSFM).not.toHaveBeenCalled();
      expect(mockPdps['platformScripture.USFM_Chapter'].getChapterUSFM).not.toHaveBeenCalled();
    });

    it('should throw when usfmToInsert array length does not match rangesToReplace length', async () => {
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 0 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 0 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
        },
      ];

      // Only one replacement string for two ranges
      await expect(engine.replace(ranges, ['only one'])).rejects.toThrow(
        'usfmToInsert array length (1) must match rangesToReplace length (2)',
      );
    });

    it('should throw when range crosses book boundaries', async () => {
      const crossBookRange: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 0 },
          end: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 5 },
        },
      ];

      await expect(engine.replace(crossBookRange, 'replacement')).rejects.toThrow(
        'Range at index 0 spans multiple books (MAT to MRK). Cross-book replacements are not supported.',
      );
    });

    it('should throw when ranges overlap within the same book', async () => {
      // Range A covers offsets 5-10, Range B covers offsets 8-15 (overlap at 8-10)
      const overlappingRanges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 10 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 15 },
        },
      ];

      await expect(engine.replace(overlappingRanges, ['AAA', 'BBB'])).rejects.toThrow(
        /Overlapping ranges detected/,
      );
    });

    it('should throw when ranges are fully nested (one range inside another)', async () => {
      // Outer range covers offsets 5-20, inner range covers offsets 8-12
      const nestedRanges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 20 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 12 },
        },
      ];

      await expect(engine.replace(nestedRanges, ['outer', 'inner'])).rejects.toThrow(
        /Overlapping ranges detected/,
      );
    });

    it('should allow adjacent but non-overlapping ranges', async () => {
      // Range A ends at offset 9, Range B starts at offset 9 (touching but not overlapping)
      const adjacentRanges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 13 },
        },
      ];

      // Should not throw - adjacent ranges are fine
      await expect(engine.replace(adjacentRanges, ['FIRST', 'SECOND'])).resolves.toBeUndefined();
    });
  });

  describe('exact USFM output verification', () => {
    // NOTE: Offsets are relative to the verse marker start (the backslash of \v N).
    // For a single-digit verse like \v 1, the text content starts at offset 5:
    //   offset 0: \
    //   offset 1: v
    //   offset 2: (space)
    //   offset 3: 1
    //   offset 4: (space)
    //   offset 5: T (first char of text)
    //
    // To replace text content without affecting the verse marker, start at offset 5+.
    // The USFM generated by toUsfm() has this format for our test data:
    // \id MAT Matthew\n\c 1\n\p\n\v 1 The book of the genealogy...

    it('should replace "The" with "REPLACED" in verse 1 with exact output', async () => {
      // "The" is at offset 5-8 (first 3 chars of verse 1 text)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'REPLACED');

      const writtenUsfm = getWrittenUsfm();
      // Verify exact replacement: "The" → "REPLACED"
      expect(writtenUsfm).toContain(String.raw`\v 1 REPLACED book`);
      // Verify structure is still valid USFM
      expect(writtenUsfm).toContain(String.raw`\id MAT`);
      expect(writtenUsfm).toContain(String.raw`\v 2`);
      expect(writtenUsfm).toContain(String.raw`\v 3`);
    });

    it('should replace "Abraham" in verse 2 with exact output', async () => {
      // "Abraham" starts at offset 5 and is 7 chars long (offset 5-12)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, 'PATRIARCH');

      const writtenUsfm = getWrittenUsfm();
      // Verify exact replacement: "Abraham" → "PATRIARCH"
      expect(writtenUsfm).toContain(String.raw`\v 2 PATRIARCH was the father`);
      // Verify structure preserved
      expect(writtenUsfm).toContain(String.raw`\v 1`);
      expect(writtenUsfm).toContain(String.raw`\v 3`);
    });

    it('should delete text when replacing with empty string', async () => {
      // Delete "The " (4 chars) from verse 1
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
        },
      ];

      await engine.replace(ranges, '');

      const writtenUsfm = getWrittenUsfm();
      // "The " should be deleted, so "book" comes right after verse marker
      expect(writtenUsfm).toContain(String.raw`\v 1 book of the genealogy`);
      // Structure should still be valid
      expect(writtenUsfm).toContain(String.raw`\v 2`);
      expect(writtenUsfm).toContain(String.raw`\v 3`);
    });

    it('should handle multiple replacements in same verse with exact output', async () => {
      // Replace "The" (offset 5-8) and "book" (offset 9-13) in verse 1
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 13 },
        },
      ];

      await engine.replace(ranges, ['FIRST', 'SECOND']);

      const writtenUsfm = getWrittenUsfm();
      // Verify both replacements: "The" → "FIRST", "book" → "SECOND"
      expect(writtenUsfm).toContain(String.raw`\v 1 FIRST SECOND of the genealogy`);
    });

    it('should handle replacements in different verses with exact output', async () => {
      // Replace "The" in verse 1 and "Abraham" in verse 2
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, ['AAA', 'BBB']);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 AAA book`);
      expect(writtenUsfm).toContain(String.raw`\v 2 BBB was`);
    });

    it('should handle replacements in different chapters with exact output', async () => {
      // Replace "The" in chapter 1 verse 1 and "Now" in chapter 2 verse 1
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, ['CH1', 'CH2']);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 CH1 book`);
      expect(writtenUsfm).toContain(String.raw`\c 2`);
      expect(writtenUsfm).toContain(String.raw`\v 1 CH2 after`);
    });

    it('should use same replacement string for all ranges when given a single string', async () => {
      // Replace "The" in verse 1 and "Abraham" in verse 2 with same string
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, 'XXX');

      const writtenUsfm = getWrittenUsfm();
      // Both replacements should use "XXX"
      expect(writtenUsfm).toContain(String.raw`\v 1 XXX book`);
      expect(writtenUsfm).toContain(String.raw`\v 2 XXX was`);
    });
  });

  describe('USFM marker replacement', () => {
    // Tests that verify USFM markers can be inserted via replacement
    // Offsets start at 5 to skip the \v N  marker (5 chars for single-digit verses)

    it(String.raw`should replace plain text with USFM containing \nd marker`, async () => {
      // Replace "Jesus Christ" with "\nd Jesus Christ\nd*" (without comma)
      // Verse 1: "The book of the genealogy of Jesus Christ, the son..."
      // Counting from offset 5: T(5)h(6)e(7) (8)b(9)o(10)o(11)k(12) (13)o(14)f(15) (16)t(17)h(18)e(19) (20)g(21)e(22)n(23)e(24)a(25)l(26)o(27)g(28)y(29) (30)o(31)f(32) (33)J(34)e(35)s(36)u(37)s(38) (39)C(40)h(41)r(42)i(43)s(44)t(45)
      // So "Jesus Christ" is at offset 34-45 (12 chars, not including comma)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 34 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 46 },
        },
      ];

      await engine.replace(ranges, String.raw`\nd Jesus Christ\nd*`);

      const writtenUsfm = getWrittenUsfm();
      // Verify the USFM marker was inserted with exact output
      expect(writtenUsfm).toContain(String.raw`genealogy of \nd Jesus Christ\nd*, the son`);
      // Verify structure is still valid
      expect(writtenUsfm).toContain(String.raw`\v 1`);
    });

    it(String.raw`should replace text with USFM containing \add marker`, async () => {
      // Replace "the son of David" with "\add the son of David\add*"
      // Starting after "Jesus Christ, " which is at offset 35+14 = 49
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 49 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 65 },
        },
      ];

      await engine.replace(ranges, String.raw`\add the son of David\add*`);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\add the son of David\add*`);
    });

    it(
      String.raw`should replace text with USFM containing \wj marker (words of Jesus)`,
      async () => {
        // Replace "after Jesus" in chapter 2 with "\wj Jesus\wj*"
        // Chapter 2 verse 1: "Now after Jesus was born..."
        // "after" starts at offset 5+4 = 9 ("Now " = 4 chars)
        const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 9 },
            end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 20 },
          },
        ];

        await engine.replace(ranges, String.raw`\wj Jesus\wj*`);

        const writtenUsfm = getWrittenUsfm();
        expect(writtenUsfm).toContain(String.raw`Now \wj Jesus\wj* was`);
        expect(writtenUsfm).toContain(String.raw`\c 2`);
      },
    );

    it('should replace multiple ranges with different USFM markers', async () => {
      // Replace "Jesus Christ" in verse 1 with \nd and "after Jesus" in chapter 2 with \wj
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 35 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 47 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 9 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 20 },
        },
      ];

      await engine.replace(ranges, [String.raw`\nd Jesus Christ\nd*`, String.raw`\wj Jesus\wj*`]);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\nd Jesus Christ\nd*`);
      expect(writtenUsfm).toContain(String.raw`\wj Jesus\wj*`);
    });

    it('should replace text with USFM containing footnote marker', async () => {
      // Replace "David" with "David\f + \fr 1:1 \ft King of Israel\f*"
      // "David" is at offset 49+12 = 61 in verse 1 ("the son of " = 11 chars, plus comma)
      // Actually let's just find "David" which starts at offset 5 + "The book of the genealogy of Jesus Christ, the son of " = 55
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 60 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 65 },
        },
      ];

      await engine.replace(ranges, String.raw`David\f + \fr 1:1 \ft King of Israel\f*`);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`David\f + \fr 1:1 \ft King of Israel\f*`);
    });
  });

  describe('UsjChapterLocation handling', () => {
    it('should convert UsjChapterLocation to UsfmVerseLocation', async () => {
      // Use UsjChapterLocation format with documentLocation
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: {
            verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 },
            granularity: 'chapter' as const,
            documentLocation: { jsonPath: '$.content[2].content[1]', offset: 0 },
          },
          end: {
            verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 },
            granularity: 'chapter' as const,
            documentLocation: { jsonPath: '$.content[2].content[1]', offset: 3 },
          },
        },
      ];

      await engine.replace(ranges, 'CONVERTED');

      // Should have fetched the chapter USX to do the conversion
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalled();

      // Single-chapter ranges use chapter-level write
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalled();
    });

    it('should handle UsjFlatChapterLocation format', async () => {
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: {
            book: 'MAT',
            chapterNum: 1,
            documentLocation: { jsonPath: '$.content[2].content[1]', offset: 0 },
          },
          end: {
            book: 'MAT',
            chapterNum: 1,
            documentLocation: { jsonPath: '$.content[2].content[1]', offset: 5 },
          },
        },
      ];

      await engine.replace(ranges, 'FLAT');

      // Conversion should happen
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalled();
    });
  });

  describe('SerializedVerseRef format support', () => {
    it('should handle SerializedVerseRef location format with exact output', async () => {
      // SerializedVerseRef has no offset, so it replaces entire verse text content
      // When both start and end have no offset, the entire verse is effectively targeted
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { book: 'MAT', chapterNum: 1, verseNum: 3 },
          end: { book: 'MAT', chapterNum: 1, verseNum: 3 },
        },
      ];

      await engine.replace(ranges, 'SERIALIZED');

      // Should work with SerializedVerseRef format (no verseRef wrapper)
      // Single-chapter ranges use chapter-level write
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalled();
    });
  });

  describe('caching behavior', () => {
    it('should cache book data within a single replace() call', async () => {
      // Multiple ranges in the same book should only fetch USX once
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, ['AAA', 'BBB', 'CCC']);

      // Should only fetch book USX once for all three ranges
      expect(mockPdps['platformScripture.USX_Book'].getBookUSX).toHaveBeenCalledTimes(1);
      // Should set book USFM once
      expect(mockPdps['platformScripture.USFM_Book'].setBookUSFM).toHaveBeenCalledTimes(1);
    });

    it('should invalidate cache after replace and re-fetch for subsequent operations', async () => {
      // First call: replace "The" (offset 5..8) in verse 1 with "FIRST"
      const ranges1: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];
      await engine.replace(ranges1, 'FIRST');

      // Second call: replace "Abraham" (offset 5..12) in verse 2 with "SECOND"
      const ranges2: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];
      await engine.replace(ranges2, 'SECOND');

      // Both calls target chapter 1 only, so chapter-level optimization is used.
      // After the first replace writes USFM, its cache is invalidated so the second replace
      // re-fetches the data to ensure it operates on up-to-date content.
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalledTimes(2);

      const chapterMock = vi.mocked(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM);
      expect(chapterMock).toHaveBeenCalledTimes(2);

      // First write: "The" replaced with "FIRST" in verse 1
      const firstWrittenUsfm = String(chapterMock.mock.calls[0][1]);
      expect(firstWrittenUsfm).toContain(String.raw`\v 1 FIRST book`);
      // Verse 2 should be unchanged in the first write
      expect(firstWrittenUsfm).toContain(String.raw`\v 2 Abraham was`);

      // Second write: "Abraham" replaced with "SECOND" in verse 2
      // Because the mock feeds the first write's changes back, the second write stacks on top
      const secondWrittenUsfm = String(chapterMock.mock.calls[1][1]);
      expect(secondWrittenUsfm).toContain(String.raw`\v 2 SECOND was the father`);
      // Verse 1 should retain the first write's change (stacking)
      expect(secondWrittenUsfm).toContain(String.raw`\v 1 FIRST book`);
    });
  });

  describe('chapter optimization', () => {
    it('should use chapter-level operations when all ranges are in one chapter', async () => {
      // All ranges target chapter 1 only
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, ['AAA', 'BBB']);

      // Should use chapter-level fetch and write, NOT book-level
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalled();
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalled();
      expect(mockPdps['platformScripture.USX_Book'].getBookUSX).not.toHaveBeenCalled();
      expect(mockPdps['platformScripture.USFM_Book'].setBookUSFM).not.toHaveBeenCalled();
    });

    it('should use book-level operations when ranges span multiple chapters', async () => {
      // Ranges in chapter 1 and chapter 2
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, ['AAA', 'BBB']);

      // Should use book-level fetch and write, NOT chapter-level (for the book processing step)
      expect(mockPdps['platformScripture.USX_Book'].getBookUSX).toHaveBeenCalled();
      expect(mockPdps['platformScripture.USFM_Book'].setBookUSFM).toHaveBeenCalled();
    });

    it('should use chapter 2 data when all ranges are in chapter 2', async () => {
      // All ranges in chapter 2
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'REPLACED');

      // Should fetch chapter 2 USX and write chapter 2 USFM
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalledWith(
        expect.objectContaining({ chapterNum: 2 }),
      );
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalled();
      expect(mockPdps['platformScripture.USX_Book'].getBookUSX).not.toHaveBeenCalled();

      // Verify the written USFM contains the replacement in chapter 2 context
      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('REPLACED');
      expect(writtenUsfm).toContain(String.raw`\c 2`);
    });

    it('should use single chapter in one book and whole book in another in one replace call', async () => {
      // MAT has ranges in two chapters → book-level
      // MRK has ranges in one chapter → chapter-level
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, ['AAA', 'BBB', 'CCC']);

      // MAT should use book-level operations (multi-chapter)
      expect(mockPdps['platformScripture.USX_Book'].getBookUSX).toHaveBeenCalledTimes(1);
      expect(mockPdps['platformScripture.USFM_Book'].setBookUSFM).toHaveBeenCalledTimes(1);

      // MRK should use chapter-level operations (single chapter)
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalledWith(
        expect.objectContaining({ book: 'MRK', chapterNum: 1 }),
      );
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalledTimes(1);

      // Verify MAT book-level USFM
      const bookMock = vi.mocked(mockPdps['platformScripture.USFM_Book'].setBookUSFM);
      const matUsfm = String(bookMock.mock.calls[0][1]);
      expect(matUsfm).toContain(String.raw`\v 1 AAA book`);
      expect(matUsfm).toContain(String.raw`\v 1 BBB after`);

      // Verify MRK chapter-level USFM
      const chapterMock = vi.mocked(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM);
      const mrkUsfm = String(chapterMock.mock.calls[0][1]);
      expect(mrkUsfm).toContain(String.raw`\v 1 CCC beginning`);
    });
  });

  describe('edge cases', () => {
    it('should handle zero-length range (insertion)', async () => {
      // Start and end at same position should insert text
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
        },
      ];

      await engine.replace(ranges, 'INSERTED ');

      const writtenUsfm = getWrittenUsfm();
      // Should insert text at position
      expect(writtenUsfm).toContain(String.raw`\v 1 INSERTED The book`);
    });

    it('should handle replacement with longer text', async () => {
      // Replace "The" (3 chars) with a much longer string
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'This is a very long replacement text for');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 This is a very long replacement text for book`);
    });

    it('should handle replacement with shorter text', async () => {
      // Replace "Abraham" (7 chars) with "A"
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, 'A');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 2 A was the father`);
    });

    it('should handle special characters in replacement text', async () => {
      // Replace text with special characters
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, '™®©');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 ™®© book`);
    });

    it('should handle Unicode characters in replacement text', async () => {
      // Replace text with Unicode (Hebrew/Greek)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'Τὸ');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 Τὸ book`);
    });

    it('should handle newlines in replacement text', async () => {
      // Replace text containing newline
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'Line1\nLine2');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('Line1\nLine2');
    });

    it('should handle multiple adjacent ranges processed in order', async () => {
      // Adjacent ranges should be processed correctly (backward to avoid offset shift issues)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 13 },
        },
      ];

      await engine.replace(ranges, ['A', 'B']);

      const writtenUsfm = getWrittenUsfm();
      // After replacing "The" → "A" and "book" → "B"
      expect(writtenUsfm).toContain(String.raw`\v 1 A B of`);
    });

    it('should preserve non-replaced text exactly', async () => {
      // Replace a small section and verify surrounding text is unchanged
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];

      await engine.replace(ranges, 'PATRIARCH');

      const writtenUsfm = getWrittenUsfm();
      // Verify verse 1 and verse 3 are completely unchanged
      expect(writtenUsfm).toContain('The book of the genealogy of Jesus Christ');
      expect(writtenUsfm).toContain('And Jacob the father of Judah and his brothers');
      // Verify verse 2 has the replacement
      expect(writtenUsfm).toContain(String.raw`\v 2 PATRIARCH was the father of Isaac`);
    });
  });

  describe('error handling', () => {
    it('should propagate errors from PDP operations', async () => {
      // The implementation fetches USX (not USFM) to build the UsjReaderWriter.
      // Single-chapter ranges use getChapterUSX; multi-chapter use getBookUSX.
      vi.mocked(mockPdps['platformScripture.USX_Book'].getBookUSX).mockRejectedValue(
        new Error('PDP error'),
      );
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockRejectedValue(
        new Error('PDP error'),
      );

      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 10 },
        },
      ];

      await expect(engine.replace(ranges, 'test')).rejects.toThrow('PDP error');
    });
  });

  describe('cache invalidation retry', () => {
    /**
     * Gets the subscribe callback captured by the mock `subscribeChapterUSX`. The constructor
     * passes this callback when subscribing for chapter-level USX change notifications. Calling it
     * simulates an incoming data-changed notification that triggers `#invalidateCaches()`.
     */
    function getCapturedChapterSubscribeCallback(): () => void {
      const subscribeMock = vi.mocked(
        mockPdps['platformScripture.USX_Chapter'].subscribeChapterUSX,
      );
      // The callback is the second argument passed to subscribeChapterUSX
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return subscribeMock.mock.calls[0][1] as () => void;
    }

    it('should retry and succeed when cache is invalidated once during fetch', async () => {
      const invalidateCache = getCapturedChapterSubscribeCallback();
      let callCount = 0;

      // On the first call, simulate a cache invalidation mid-fetch, then return normally after
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        callCount += 1;
        if (callCount === 1) invalidateCache();
        return Promise.resolve(TEST_CHAPTER_1_USX);
      });

      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'RETRIED');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 RETRIED book`);
      // Should have fetched twice: first was invalidated, second succeeded
      expect(callCount).toBe(2);
    });

    it('should retry up to 3 times and succeed on the last clean fetch', async () => {
      const invalidateCache = getCapturedChapterSubscribeCallback();
      let callCount = 0;

      // Invalidate the cache on the first 3 calls, succeed on the 4th (attempt index 3)
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        callCount += 1;
        if (callCount <= 3) invalidateCache();
        return Promise.resolve(TEST_CHAPTER_1_USX);
      });

      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'OK');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 OK book`);
      // 3 invalidated + 1 successful = 4 total fetches
      expect(callCount).toBe(4);
    });

    it('should throw when cache is invalidated on every attempt including the last retry', async () => {
      const invalidateCache = getCapturedChapterSubscribeCallback();

      // Invalidate the cache on every call (4 total: initial + 3 retries)
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        invalidateCache();
        return Promise.resolve(TEST_CHAPTER_1_USX);
      });

      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await expect(engine.replace(ranges, 'FAIL')).rejects.toThrow(/Cache was invalidated 4 times/);
    });

    it('should use fresh data after a successful retry', async () => {
      const invalidateCache = getCapturedChapterSubscribeCallback();
      let callCount = 0;

      // First call: invalidate and return original data. Second call: return "updated" data.
      const UPDATED_CHAPTER_1_USX = TEST_CHAPTER_1_USX.replace(
        'The book of the genealogy',
        'The UPDATED book of the genealogy',
      );

      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        callCount += 1;
        if (callCount === 1) {
          invalidateCache();
          return Promise.resolve(TEST_CHAPTER_1_USX);
        }
        return Promise.resolve(UPDATED_CHAPTER_1_USX);
      });

      // Replace "The" (offset 5-8) with "A" — this works regardless of which data version
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, 'A');

      const writtenUsfm = getWrittenUsfm();
      // Should contain the UPDATED text from the retry, not the original
      expect(writtenUsfm).toContain('UPDATED');
      expect(writtenUsfm).toContain(String.raw`\v 1 A UPDATED book`);
      expect(callCount).toBe(2);
    });

    it('should retry for book-level fetches when cache is invalidated', async () => {
      const invalidateCache = getCapturedChapterSubscribeCallback();
      let callCount = 0;

      // Invalidate once during book-level fetch (multi-chapter ranges use getBookUSX)
      vi.mocked(mockPdps['platformScripture.USX_Book'].getBookUSX).mockImplementation(() => {
        callCount += 1;
        if (callCount === 1) invalidateCache();
        return Promise.resolve(TEST_BOOK_USX);
      });

      // Use ranges spanning multiple chapters to force book-level fetch
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
        },
      ];

      await engine.replace(ranges, ['A', 'B']);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain(String.raw`\v 1 A book`);
      expect(writtenUsfm).toContain(String.raw`\v 1 B after`);
      expect(callCount).toBe(2);
    });
  });

  describe('race condition with external changes', () => {
    /**
     * Gets the subscribe callback captured by the mock `subscribeChapterUSX`. The constructor
     * passes this callback when subscribing for chapter-level USX change notifications. Calling it
     * simulates an incoming data-changed notification that triggers `#invalidateCaches()`.
     */
    function getCapturedChapterSubscribeCallback(): () => void {
      const subscribeMock = vi.mocked(
        mockPdps['platformScripture.USX_Chapter'].subscribeChapterUSX,
      );
      // The callback is the second argument passed to subscribeChapterUSX
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return subscribeMock.mock.calls[0][1] as () => void;
    }

    it('should not overwrite external changes that occur during replace operation', async () => {
      // This test demonstrates the race condition:
      // 1. Replace fetches cached data
      // 2. External change occurs → cache invalidated
      // 3. Replace continues with stale data
      // 4. Replace writes based on stale data → overwrites external change

      const invalidateCache = getCapturedChapterSubscribeCallback();
      let fetchCount = 0;
      const deferredResolves: Array<() => void> = [];

      // Track when the USX data changes externally. Use a same-length replacement to avoid
      // shifting offsets (which would make the replace target the wrong location).
      const ORIGINAL_USX = TEST_CHAPTER_1_USX;
      // Replace "The " (4 chars) with "XXX " (4 chars) - same length, no offset shift
      const EXTERNAL_CHANGE_USX = TEST_CHAPTER_1_USX.replace(
        '<verse number="1" style="v" sid="MAT 1:1"/>The book',
        '<verse number="1" style="v" sid="MAT 1:1"/>XXX book',
      );

      // Mock getChapterUSX with deferred promises so we can control timing
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        fetchCount += 1;
        return new Promise<string>((resolve) => {
          deferredResolves.push(() => {
            if (fetchCount === 1) {
              // First fetch returns original data
              resolve(ORIGINAL_USX);
            } else {
              // Subsequent fetches return the externally modified data
              resolve(EXTERNAL_CHANGE_USX);
            }
          });
        });
      });

      // Start a replace operation that will replace "book" with "REPLACED"
      const replacePromise = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 13 },
          },
        ],
        'REPLACED',
      );

      // Wait for Phase 1 to start and call getChapterUSX
      await flushPromises();
      expect(deferredResolves).toHaveLength(1);

      // Simulate external change BEFORE resolving the first fetch
      // This ensures the cache version changes while Phase 1 is still in progress
      invalidateCache();

      // Now resolve the first fetch - Phase 1 will continue with this data
      deferredResolves[0]();

      // Wait for Phase 1 to complete and detect the cache invalidation
      await flushPromises();
      await flushPromises();

      // Phase 1 should have detected invalidation and started a retry
      expect(deferredResolves).toHaveLength(2);

      // Resolve the second fetch (retry with fresh data)
      deferredResolves[1]();

      // Complete the replace operation
      await replacePromise;

      // Get what was written
      const writtenUsfm = getWrittenUsfm();

      // Verify that the replace operation retried and fetched data twice
      // (once initially, once after detecting cache invalidation)
      expect(fetchCount).toBe(2);

      // The test expects that:
      // 1. The external change ("XXX") should be preserved
      // 2. The replace operation's change ("REPLACED") should also be applied
      // This requires the replace to detect the cache invalidation and re-fetch before writing.

      // With the fix, the replace will:
      // - Detect cache was invalidated during Phase 1
      // - Retry Phase 1 with fresh data (containing "XXX")
      // - Apply the replacement to the fresh data
      // - Result: "XXX REPLACED" (both changes preserved)

      // The written USFM should have both the external change and the replace change:
      // "\v 1 XXX REPLACED of the genealogy..."
      expect(writtenUsfm).toContain(String.raw`\v 1 XXX REPLACED`);
    });

    it('should throw if disposed before writing (Phase 2)', async () => {
      // This test verifies that replace operations fail gracefully if the PDPE is disposed
      // after Phase 1 (computation) but before Phase 2 (writing)

      const deferredResolves: Array<() => void> = [];

      // Mock getChapterUSX with deferred promises so we can control timing
      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(() => {
        return new Promise<string>((resolve) => {
          deferredResolves.push(() => {
            resolve(TEST_CHAPTER_1_USX);
          });
        });
      });

      // Start a replace operation
      const replacePromise = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 9 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 13 },
          },
        ],
        'REPLACED',
      );

      // Wait for Phase 1 to start and call getChapterUSX
      await flushPromises();
      expect(deferredResolves).toHaveLength(1);

      // Dispose the engine BEFORE resolving the fetch
      // This ensures #isDisposed = true is set before Phase 1 completes
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      engine.dispose();

      // Now resolve the fetch - Phase 1 will complete and check isDisposed
      deferredResolves[0]();

      // The replace should fail with a disposal error
      await expect(replacePromise).rejects.toThrow(
        'Cannot complete replace operation: Scripture Finder PDPE has been disposed',
      );

      // Verify that no USFM was written (setChapterUSFM should not have been called)
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).not.toHaveBeenCalled();
      expect(mockPdps['platformScripture.USFM_Book'].setBookUSFM).not.toHaveBeenCalled();
    });
  });

  describe('concurrency', () => {
    /**
     * Sets up deferred-promise mocks with mutable USX stores for concurrency testing. Writes
     * persist through the test: chapter edits update the book store and book edits update chapter
     * stores. Call each entry in `deferredResolves` (no argument) to resolve the corresponding
     * `getChapterUSX` / `getBookUSX` promise with the current store value.
     */
    function setupDeferredMocks() {
      const callOrder: string[] = [];
      const deferredResolves: Array<() => void> = [];
      const chapterUSXStore = new Map<string, string>([
        ['MAT:1', TEST_CHAPTER_1_USX],
        ['MAT:2', TEST_CHAPTER_2_USX],
      ]);
      const bookUSXStore = new Map<string, string>([['MAT', TEST_BOOK_USX]]);
      const writtenChapterUsfms: Array<{ chapterNum: number; usfm: string }> = [];
      const writtenBookUsfms: string[] = [];

      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(
        (verseRef: { book: string; chapterNum: number }) => {
          const key = `${verseRef.book}:${verseRef.chapterNum}`;
          callOrder.push(`getChapterUSX:${verseRef.chapterNum}`);
          return new Promise<string>((resolve) => {
            deferredResolves.push(() => {
              callOrder.push(`resolveChapterUSX:${verseRef.chapterNum}`);
              const fallback = verseRef.chapterNum === 2 ? TEST_CHAPTER_2_USX : TEST_CHAPTER_1_USX;
              resolve(chapterUSXStore.get(key) ?? fallback);
            });
          });
        },
      );

      vi.mocked(mockPdps['platformScripture.USX_Book'].getBookUSX).mockImplementation(
        (verseRef: { book: string }) => {
          callOrder.push('getBookUSX');
          return new Promise<string>((resolve) => {
            deferredResolves.push(() => {
              callOrder.push('resolveBookUSX');
              resolve(bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX);
            });
          });
        },
      );

      vi.mocked(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).mockImplementation(
        async (verseRef: { book: string; chapterNum: number }, usfm: string) => {
          const key = `${verseRef.book}:${verseRef.chapterNum}`;
          callOrder.push(`setChapterUSFM:${verseRef.chapterNum}`);
          writtenChapterUsfms.push({ chapterNum: verseRef.chapterNum, usfm: String(usfm) });
          // Update chapter store
          const fallback = verseRef.chapterNum === 2 ? TEST_CHAPTER_2_USX : TEST_CHAPTER_1_USX;
          const currentChapterUSX = chapterUSXStore.get(key) ?? fallback;
          chapterUSXStore.set(key, patchUsxWithUsfmVerseTexts(currentChapterUSX, String(usfm)));
          // Cross-update book store
          const currentBookUSX = bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX;
          bookUSXStore.set(verseRef.book, patchUsxWithUsfmVerseTexts(currentBookUSX, String(usfm)));
          return true;
        },
      );

      vi.mocked(mockPdps['platformScripture.USFM_Book'].setBookUSFM).mockImplementation(
        async (verseRef: { book: string }, usfm: string) => {
          callOrder.push('setBookUSFM');
          writtenBookUsfms.push(String(usfm));
          // Update book store
          const currentBookUSX = bookUSXStore.get(verseRef.book) ?? TEST_BOOK_USX;
          bookUSXStore.set(verseRef.book, patchUsxWithUsfmVerseTexts(currentBookUSX, String(usfm)));
          // Cross-update chapter stores
          [...chapterUSXStore.entries()].forEach(([chKey, chUSX]) => {
            if (chKey.startsWith(`${verseRef.book}:`)) {
              chapterUSXStore.set(chKey, patchUsxWithUsfmVerseTexts(chUSX, String(usfm)));
            }
          });
          return true;
        },
      );

      return { callOrder, deferredResolves, writtenChapterUsfms, writtenBookUsfms };
    }

    it('should serialize all replaces even on different chapters', async () => {
      const { callOrder, deferredResolves, writtenChapterUsfms } = setupDeferredMocks();

      // Start two concurrent replaces on DIFFERENT chapters (ch1 and ch2)
      // With the simplified mutex, these will be serialized
      const replace1 = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          },
        ],
        'AAA',
      );
      const replace2 = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
          },
        ],
        'BBB',
      );

      // Let the lock acquisitions and getChapterUSX calls settle
      await flushPromises();

      // Only ONE getChapterUSX call should have been made — the second replace is blocked by
      // the replace mutex waiting for the first to finish
      expect(deferredResolves).toHaveLength(1);
      expect(callOrder).toEqual(['getChapterUSX:1']);

      // Resolve the first fetch so the first replace can complete and unblock the second
      deferredResolves[0]();
      await flushPromises();

      // After the first replace completes (writes + invalidates cache), the second should start
      expect(callOrder).toContain('setChapterUSFM:1');
      // First write has AAA but not BBB
      expect(writtenChapterUsfms[0].usfm).toContain('AAA');
      expect(writtenChapterUsfms[0].usfm).not.toContain('BBB');
      // The second replace should now have called getChapterUSX for ch2
      expect(deferredResolves).toHaveLength(2);

      // Resolve the second fetch
      deferredResolves[1]();
      await Promise.all([replace1, replace2]);

      // Both writes should have completed sequentially
      expect(callOrder).toContain('setChapterUSFM:2');
      const ch1Usfm = writtenChapterUsfms.find((w) => w.chapterNum === 1)?.usfm;
      const ch2Usfm = writtenChapterUsfms.find((w) => w.chapterNum === 2)?.usfm;
      expect(ch1Usfm).toContain('AAA');
      expect(ch1Usfm).not.toContain('BBB');
      expect(ch2Usfm).toContain('BBB');
      expect(ch2Usfm).not.toContain('AAA');
    });

    it('should serialize chapter-level replaces on the same chapter', async () => {
      const { callOrder, deferredResolves, writtenChapterUsfms } = setupDeferredMocks();

      // Start two concurrent replaces on the SAME chapter
      const replace1 = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          },
        ],
        'AAA',
      );
      const replace2 = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
          },
        ],
        'BBB',
      );

      await flushPromises();

      // Only ONE getChapterUSX call should have been made — the second replace is blocked by
      // the chapter mutex waiting for the first to finish
      expect(deferredResolves).toHaveLength(1);
      expect(callOrder).toEqual(['getChapterUSX:1']);

      // Resolve the first fetch so the first replace can complete and unblock the second
      deferredResolves[0]();
      await flushPromises();

      // After the first replace completes (writes + invalidates cache), the second should start
      expect(callOrder).toContain('setChapterUSFM:1');
      // First write has AAA but not BBB
      expect(writtenChapterUsfms[0].usfm).toContain('AAA');
      expect(writtenChapterUsfms[0].usfm).not.toContain('BBB');
      // The second replace should now have called getChapterUSX for a re-fetch
      expect(deferredResolves).toHaveLength(2);

      // Resolve the second fetch — reads from the store which has the first write's changes
      deferredResolves[1]();
      await Promise.all([replace1, replace2]);

      // Both writes should have happened sequentially
      const setUSFMCalls = callOrder.filter((c) => c === 'setChapterUSFM:1');
      expect(setUSFMCalls).toHaveLength(2);
      // Second write should have BOTH AAA (stacked from first write) and BBB (this write)
      expect(writtenChapterUsfms[1].usfm).toContain('AAA');
      expect(writtenChapterUsfms[1].usfm).toContain('BBB');
    });

    it('should serialize multi-chapter replaces (book-level) before single-chapter replaces', async () => {
      const { callOrder, deferredResolves, writtenChapterUsfms, writtenBookUsfms } =
        setupDeferredMocks();

      // Start a book-level replace (spans ch1 and ch2 → book-level)
      const bookReplace = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          },
          {
            start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
          },
        ],
        ['AAA', 'BBB'],
      );

      await flushPromises();

      // Book-level replace should have started
      expect(callOrder).toContain('getBookUSX');

      // Start a chapter-level replace on a DIFFERENT verse so the book write's changes are
      // visible alongside the chapter write's changes
      const chapterReplace = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
          },
        ],
        'CCC',
      );

      await flushPromises();

      // The chapter replace should NOT have started — it's blocked by the replace mutex
      expect(callOrder).not.toContain('getChapterUSX:1');

      // Resolve the book replace
      deferredResolves[0]();
      await flushPromises();
      await bookReplace;
      expect(callOrder).toContain('setBookUSFM');
      // Book USFM has AAA and BBB, not yet CCC
      expect(writtenBookUsfms[0]).toContain('AAA');
      expect(writtenBookUsfms[0]).toContain('BBB');
      expect(writtenBookUsfms[0]).not.toContain('CCC');

      // Now the chapter replace should proceed
      await flushPromises();
      expect(callOrder).toContain('getChapterUSX:1');

      // Resolve the chapter USX fetch — reads from store which has the book write's changes
      deferredResolves[1]();
      await chapterReplace;
      expect(callOrder).toContain('setChapterUSFM:1');
      // Chapter USFM has AAA (stacked from book write) and CCC (this write), not BBB (ch2 only)
      expect(writtenChapterUsfms[0].usfm).toContain('AAA');
      expect(writtenChapterUsfms[0].usfm).toContain('CCC');
      expect(writtenChapterUsfms[0].usfm).not.toContain('BBB');
    });

    it('should serialize single-chapter replaces before multi-chapter replaces (book-level)', async () => {
      const { callOrder, deferredResolves, writtenChapterUsfms, writtenBookUsfms } =
        setupDeferredMocks();

      // Start a chapter-level replace first
      const chapterReplace = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          },
        ],
        'CCC',
      );

      await flushPromises();
      expect(callOrder).toContain('getChapterUSX:1');

      // Start a book-level replace while the chapter replace is still pending.
      // Ch1 targets a DIFFERENT verse so the chapter write's changes are visible alongside
      // the book write's changes.
      const bookReplace = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
          },
          {
            start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
          },
        ],
        ['AAA', 'BBB'],
      );

      await flushPromises();

      // Book replace should NOT have started — it's blocked by the replace mutex
      expect(callOrder).not.toContain('getBookUSX');

      // Resolve the chapter USX fetch so the chapter replace can complete
      deferredResolves[0]();
      await chapterReplace;
      expect(callOrder).toContain('setChapterUSFM:1');
      // Chapter USFM has CCC, not yet AAA or BBB
      expect(writtenChapterUsfms[0].usfm).toContain('CCC');
      expect(writtenChapterUsfms[0].usfm).not.toContain('AAA');
      expect(writtenChapterUsfms[0].usfm).not.toContain('BBB');

      // Now the book replace should proceed
      await flushPromises();
      expect(callOrder).toContain('getBookUSX');

      // Resolve the book USX fetch — reads from store which has the chapter write's changes
      deferredResolves[1]();
      await bookReplace;
      expect(callOrder).toContain('setBookUSFM');
      // Book USFM has CCC (stacked from chapter write), AAA, and BBB
      expect(writtenBookUsfms[0]).toContain('CCC');
      expect(writtenBookUsfms[0]).toContain('AAA');
      expect(writtenBookUsfms[0]).toContain('BBB');
    });

    it('should bail out early when one book errors during parallel book processing', async () => {
      // This test verifies the early-exit behavior: when processing multiple books in parallel
      // within a single replace call, if one book's task errors, other book tasks should detect
      // the error and bail out early without doing expensive work (like fetching USX).

      // Set up deferred mocks with both MAT and MRK support
      const deferredResolves: Array<() => void> = [];
      const chapterUSXStore = new Map<string, string>([
        ['MAT:1', TEST_CHAPTER_1_USX],
        ['MRK:1', TEST_MRK_CHAPTER_1_USX],
      ]);

      vi.mocked(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).mockImplementation(
        (verseRef: { book: string; chapterNum: number }) => {
          const key = `${verseRef.book}:${verseRef.chapterNum}`;
          return new Promise<string>((resolve) => {
            deferredResolves.push(() => {
              resolve(chapterUSXStore.get(key) ?? TEST_CHAPTER_1_USX);
            });
          });
        },
      );

      // ── Single replace targeting both MAT (with overlapping ranges → will error) and MRK ──
      // MAT has overlapping ranges that will cause an error after data is fetched.
      // MRK should process in parallel but bail out early once MAT errors.
      let replaceError: unknown;
      const replaceCall = engine
        .replace(
          [
            // Overlapping ranges in MAT (will error)
            {
              start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 10 },
            },
            {
              start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
              end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 15 },
            },
            // Valid range in MRK (should bail out early after MAT errors)
            {
              start: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 8 },
            },
          ],
          ['AAA', 'BBB', 'CCC'],
        )
        .catch((e) => {
          replaceError = e;
        });

      // Let both book tasks start their USX fetches (parallel processing)
      await flushPromises();

      // Both MAT and MRK should have started fetching USX in parallel
      expect(deferredResolves).toHaveLength(2);

      // Resolve MAT's fetch so it can proceed to validation and throw the overlapping error
      deferredResolves[0]();
      await flushPromises();

      // Resolve MRK's fetch as well (it started before MAT errored, so it needs to complete)
      // However, once MRK sees that MAT errored (via the firstError signal), it will bail out
      // early without doing expensive validation and USFM computation work
      deferredResolves[1]();

      // Wait for the replace to complete
      await replaceCall;

      // Verify the error occurred
      expect(replaceError).toBeDefined();
      expect(String(replaceError)).toMatch(/Overlapping ranges detected/);

      // ── Verify: subsequent replaces can still succeed (mutex properly released) ──
      let subsequentReplaceCompleted = false;
      const subsequentReplace = engine
        .replace(
          [
            {
              start: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 8 },
            },
          ],
          'ZZZ',
        )
        .then(() => {
          subsequentReplaceCompleted = true;
          return undefined;
        });

      // Let the subsequent replace start and fetch MRK data
      await flushPromises();

      // Resolve MRK's USX fetch for the subsequent replace
      // (Could be index 1 from before if it wasn't consumed, or a new fetch)
      if (deferredResolves.length > 2) {
        deferredResolves[deferredResolves.length - 1]();
      } else {
        // MRK from the first call wasn't resolved, so resolve it now
        deferredResolves[1]();
      }
      await flushPromises();

      // Race against a timeout to detect a deadlock
      await Promise.race([
        subsequentReplace,
        new Promise((resolve) => {
          setTimeout(resolve, 500);
        }),
      ]);

      // Subsequent replace should have completed successfully (no deadlock, mutex released)
      expect(subsequentReplaceCompleted).toBe(true);
    });

    it('should serialize separate replace calls even when first one fails', async () => {
      // This test verifies that when two separate replace calls are made, the second one waits
      // for the first to complete (even if it fails), then proceeds successfully. It also verifies
      // that when one book fails during parallel processing, NONE of the books get written.

      const { callOrder, deferredResolves, writtenChapterUsfms } = setupDeferredMocks();

      // ── Call 1: A replace targeting multiple books where one has overlapping ranges (will error) ──
      let call1Error: unknown;
      const call1 = engine
        .replace(
          [
            // Valid range in MAT chapter 1
            {
              start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
            },
            // Overlapping ranges in MAT chapter 2 (will error during validation)
            {
              start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 10 },
            },
            {
              start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 8 },
              end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 15 },
            },
            // Valid range in MRK (different book, should process in parallel)
            {
              start: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 5 },
              end: { verseRef: { book: 'MRK', chapterNum: 1, verseNum: 1 }, offset: 8 },
            },
          ],
          ['FIRST_MAT_CH1', 'FIRST_MAT_CH2_A', 'FIRST_MAT_CH2_B', 'FIRST_MRK'],
        )
        .catch((e) => {
          call1Error = e;
        });

      // Let Call 1 start and fetch data for both books in parallel
      await flushPromises();
      // Should fetch book-level USX for MAT (multi-chapter) and chapter-level for MRK
      expect(deferredResolves.length).toBeGreaterThan(0);

      // ── Call 2: A valid replace that should wait for Call 1 to fail, then succeed ──
      const call2 = engine.replace(
        [
          {
            start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
            end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
          },
        ],
        'SECOND_VALID',
      );

      await flushPromises();

      // Call 2 should NOT have started yet - it's blocked by the replace mutex

      // Resolve all of Call 1's fetches so it can proceed
      const call1FetchCount = deferredResolves.length;
      for (let i = 0; i < call1FetchCount; i++) {
        deferredResolves[i]();
      }
      await flushPromises();
      await call1;

      // Verify Call 1 errored
      expect(call1Error).toBeDefined();
      expect(String(call1Error)).toMatch(/Overlapping ranges detected/);

      // ── Verify Call 1 did NOT write any USFM (failed during Phase 1) ──
      expect(callOrder).not.toContain('setChapterUSFM:1');
      expect(callOrder).not.toContain('setChapterUSFM:2');
      expect(callOrder).not.toContain('setBookUSFM');
      expect(writtenChapterUsfms).toHaveLength(0);

      // Now Call 2 should proceed (mutex released after Call 1 failed)
      // Give Call 2 time to start
      await flushPromises();
      await flushPromises();

      // Call 2 might need to fetch data if it wasn't cached by Call 1
      // (Call 1 used book-level for MAT, Call 2 uses chapter-level)
      if (deferredResolves.length > call1FetchCount) {
        // Resolve Call 2's fetch
        deferredResolves[deferredResolves.length - 1]();
      }

      await call2;

      // ── Verify Call 2 succeeded and wrote ONLY its changes ──
      expect(callOrder).toContain('setChapterUSFM:1');
      expect(writtenChapterUsfms).toHaveLength(1);

      // The written USFM should contain ONLY Call 2's change, NOT Call 1's changes
      const writtenUsfm = writtenChapterUsfms[0].usfm;
      expect(writtenUsfm).toContain('SECOND_VALID');
      expect(writtenUsfm).not.toContain('FIRST_MAT_CH1');
      expect(writtenUsfm).not.toContain('FIRST_MAT_CH2_A');
      expect(writtenUsfm).not.toContain('FIRST_MAT_CH2_B');
      expect(writtenUsfm).not.toContain('FIRST_MRK');
    });
  });
});
