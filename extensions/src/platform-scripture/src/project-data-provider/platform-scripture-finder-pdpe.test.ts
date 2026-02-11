import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ScriptureRangeUsjChapterOrUsfmVerseLocation } from 'platform-scripture';
import {
  ScriptureFinderProjectDataProviderEngine,
  ScriptureFinderOverlayPDPs,
} from './platform-scripture-finder-pdpe.model';

// Simple USFM test data for Matthew chapter 1
const TEST_BOOK_USFM = `\\id MAT
\\c 1
\\p
\\v 1 The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
\\v 2 Abraham was the father of Isaac, and Isaac the father of Jacob.
\\v 3 And Jacob the father of Judah and his brothers.
\\c 2
\\p
\\v 1 Now after Jesus was born in Bethlehem of Judea in the days of Herod the king.`;

// Chapter 1 only USFM
const TEST_CHAPTER_1_USFM = `\\id MAT
\\c 1
\\p
\\v 1 The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
\\v 2 Abraham was the father of Isaac, and Isaac the father of Jacob.
\\v 3 And Jacob the father of Judah and his brothers.`;

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

/** Creates mock PDPs for testing */
function createMockPdps(): ScriptureFinderOverlayPDPs {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    'platformScripture.USX_Book': {
      getBookUSX: vi.fn().mockResolvedValue(TEST_BOOK_USX),
      setBookUSX: vi.fn().mockResolvedValue(true),
      subscribeBookUSX: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
    'platformScripture.USX_Chapter': {
      getChapterUSX: vi
        .fn()
        .mockImplementation((verseRef: { book: string; chapterNum: number }) => {
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
      setBookUSFM: vi.fn().mockResolvedValue(true),
      subscribeBookUSFM: vi.fn().mockResolvedValue(() => Promise.resolve(true)),
    },
    'platformScripture.USFM_Chapter': {
      getChapterUSFM: vi.fn().mockResolvedValue(TEST_CHAPTER_1_USFM),
      setChapterUSFM: vi.fn().mockResolvedValue(true),
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
      expect(writtenUsfm).toContain('\\v 1 REPLACED book');
      // Verify structure is still valid USFM
      expect(writtenUsfm).toContain('\\id MAT');
      expect(writtenUsfm).toContain('\\v 2');
      expect(writtenUsfm).toContain('\\v 3');
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
      expect(writtenUsfm).toContain('\\v 2 PATRIARCH was the father');
      // Verify structure preserved
      expect(writtenUsfm).toContain('\\v 1');
      expect(writtenUsfm).toContain('\\v 3');
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
      expect(writtenUsfm).toContain('\\v 1 book of the genealogy');
      // Structure should still be valid
      expect(writtenUsfm).toContain('\\v 2');
      expect(writtenUsfm).toContain('\\v 3');
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
      expect(writtenUsfm).toContain('\\v 1 FIRST SECOND of the genealogy');
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
      expect(writtenUsfm).toContain('\\v 1 AAA book');
      expect(writtenUsfm).toContain('\\v 2 BBB was');
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
      expect(writtenUsfm).toContain('\\v 1 CH1 book');
      expect(writtenUsfm).toContain('\\c 2');
      expect(writtenUsfm).toContain('\\v 1 CH2 after');
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
      expect(writtenUsfm).toContain('\\v 1 XXX book');
      expect(writtenUsfm).toContain('\\v 2 XXX was');
    });
  });

  describe('USFM marker replacement', () => {
    // Tests that verify USFM markers can be inserted via replacement
    // Offsets start at 5 to skip the \v N  marker (5 chars for single-digit verses)

    it('should replace plain text with USFM containing \\nd marker', async () => {
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

      await engine.replace(ranges, '\\nd Jesus Christ\\nd*');

      const writtenUsfm = getWrittenUsfm();
      // Verify the USFM marker was inserted with exact output
      expect(writtenUsfm).toContain('genealogy of \\nd Jesus Christ\\nd*, the son');
      // Verify structure is still valid
      expect(writtenUsfm).toContain('\\v 1');
    });

    it('should replace text with USFM containing \\add marker', async () => {
      // Replace "the son of David" with "\add the son of David\add*"
      // Starting after "Jesus Christ, " which is at offset 35+14 = 49
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 49 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 65 },
        },
      ];

      await engine.replace(ranges, '\\add the son of David\\add*');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('\\add the son of David\\add*');
    });

    it('should replace text with USFM containing \\wj marker (words of Jesus)', async () => {
      // Replace "after Jesus" in chapter 2 with "\wj Jesus\wj*"
      // Chapter 2 verse 1: "Now after Jesus was born..."
      // "after" starts at offset 5+4 = 9 ("Now " = 4 chars)
      const ranges: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 9 },
          end: { verseRef: { book: 'MAT', chapterNum: 2, verseNum: 1 }, offset: 20 },
        },
      ];

      await engine.replace(ranges, '\\wj Jesus\\wj*');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('Now \\wj Jesus\\wj* was');
      expect(writtenUsfm).toContain('\\c 2');
    });

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

      await engine.replace(ranges, ['\\nd Jesus Christ\\nd*', '\\wj Jesus\\wj*']);

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('\\nd Jesus Christ\\nd*');
      expect(writtenUsfm).toContain('\\wj Jesus\\wj*');
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

      await engine.replace(ranges, 'David\\f + \\fr 1:1 \\ft King of Israel\\f*');

      const writtenUsfm = getWrittenUsfm();
      expect(writtenUsfm).toContain('David\\f + \\fr 1:1 \\ft King of Israel\\f*');
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

    it('should reuse cached data for subsequent operations in same book', async () => {
      // First call
      const ranges1: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 1 }, offset: 8 },
        },
      ];
      await engine.replace(ranges1, 'FIRST');

      // Second call to same book
      const ranges2: ScriptureRangeUsjChapterOrUsfmVerseLocation[] = [
        {
          start: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 5 },
          end: { verseRef: { book: 'MAT', chapterNum: 1, verseNum: 2 }, offset: 12 },
        },
      ];
      await engine.replace(ranges2, 'SECOND');

      // Both calls target chapter 1 only, so chapter-level optimization is used.
      // The cache persists across calls, so getChapterUSX is called once (second call reuses cache).
      expect(mockPdps['platformScripture.USX_Chapter'].getChapterUSX).toHaveBeenCalledTimes(1);
      expect(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM).toHaveBeenCalledTimes(2);
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
      expect(writtenUsfm).toContain('\\c 2');
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
      expect(matUsfm).toContain('\\v 1 AAA book');
      expect(matUsfm).toContain('\\v 1 BBB after');

      // Verify MRK chapter-level USFM
      const chapterMock = vi.mocked(mockPdps['platformScripture.USFM_Chapter'].setChapterUSFM);
      const mrkUsfm = String(chapterMock.mock.calls[0][1]);
      expect(mrkUsfm).toContain('\\v 1 CCC beginning');
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
      expect(writtenUsfm).toContain('\\v 1 INSERTED The book');
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
      expect(writtenUsfm).toContain('\\v 1 This is a very long replacement text for book');
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
      expect(writtenUsfm).toContain('\\v 2 A was the father');
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
      expect(writtenUsfm).toContain('\\v 1 ™®© book');
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
      expect(writtenUsfm).toContain('\\v 1 Τὸ book');
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
      expect(writtenUsfm).toContain('\\v 1 A B of');
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
      expect(writtenUsfm).toContain('\\v 2 PATRIARCH was the father of Isaac');
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
      expect(writtenUsfm).toContain('\\v 1 RETRIED book');
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
      expect(writtenUsfm).toContain('\\v 1 OK book');
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
      expect(writtenUsfm).toContain('\\v 1 A UPDATED book');
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
      expect(writtenUsfm).toContain('\\v 1 A book');
      expect(writtenUsfm).toContain('\\v 1 B after');
      expect(callCount).toBe(2);
    });
  });
});
