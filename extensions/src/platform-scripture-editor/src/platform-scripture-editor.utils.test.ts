import { describe, it, expect, vi } from 'vitest';
import { ScriptureRange } from 'platform-scripture-editor';
import type PapiBackend from '@papi/backend';
import { convertScriptureRangeToEditorRange } from './platform-scripture-editor.utils';

// Sample USJ chapter data for Genesis chapter 1 with multiple verses
const SAMPLE_USJ_CHAPTER = Object.freeze({
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: ['GEN - Genesis'] },
    { type: 'chapter', marker: 'c', number: '1', sid: 'GEN 1' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 1:1' },
        'In the beginning God created the heavens and the earth.',
        { type: 'verse', marker: 'v', number: '2', sid: 'GEN 1:2' },
        'Now the earth was formless and empty.',
        { type: 'verse', marker: 'v', number: '3', sid: 'GEN 1:3' },
        'And God said, "Let there be light," and there was light.',
      ],
    },
  ],
});

// @ts-expect-error ts(6133) - this is unused, but we want to keep it for reference
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SAMPLE_USFM_CHAPTER = `\\id GEN GEN - Genesis
\\c 1
\\p
\\v 1 In the beginning God created the heavens and the earth.
\\v 2 Now the earth was formless and empty.
\\v 3 And God said, "Let there be light," and there was light.`;

// Special object to pass into `createMockPapi` to make the USJ chapter return nothing
const USJ_NOTHING = {};

// Create a mock papi object
interface MockPapi {
  papi: typeof PapiBackend;
  mockGet: ReturnType<typeof vi.fn>;
  mockGetChapterUSJ: ReturnType<typeof vi.fn>;
}

function createMockPapi(usjChapter: object | undefined = SAMPLE_USJ_CHAPTER): MockPapi {
  const mockGetChapterUSJ = vi
    .fn()
    .mockResolvedValue(usjChapter === USJ_NOTHING ? undefined : usjChapter);
  const mockPdp = {
    getChapterUSJ: mockGetChapterUSJ,
  };
  const mockGet = vi.fn().mockResolvedValue(mockPdp);

  const papi = {
    projectDataProviders: {
      get: mockGet,
    },
  } as unknown as typeof PapiBackend;

  return { papi, mockGet, mockGetChapterUSJ };
}

describe('convertScriptureRangeToEditorRange', () => {
  const PROJECT_ID = 'test-project-id';

  describe('UsfmVerseLocation input type (SerializedVerseRef - book, chapterNum, verseNum)', () => {
    it('should convert a simple verse location range to jsonPath and offset', async () => {
      const { papi } = createMockPapi();
      // SerializedVerseRef format (a form of UsfmVerseLocation)
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.verseRef.verseNum).toBe(1);
      // Verse 1 text is at $.content[2].content[1], offset 0 is start of text
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.end.offset).toBe(0);
    });

    it('should convert verse locations spanning multiple verses in the same chapter', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 3 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      // Verse 1 text at $.content[2].content[1], verse 3 text at $.content[2].content[5]
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[5]');
      expect(result.editorRange.end.offset).toBe(0);
    });
  });

  describe('UsfmScrRefVerseLocation input type (scrRef with offset)', () => {
    it('should convert scrRef location to jsonPath and offset', async () => {
      const { papi } = createMockPapi();
      // UsfmScrRefVerseLocation format (deprecated form of UsfmVerseLocation)
      const range: ScriptureRange = {
        start: { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, offset: 0 },
        end: { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 }, offset: 10 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.verseRef.verseNum).toBe(1);
      // Verse 1 text at $.content[2].content[1]
      // USFM offset 0 points to \v marker; offset 10 is 10 chars from \v, but verse marker '\v 1 ' is 5 chars
      // So USJ text offset = USFM offset - 5 (verse marker length)
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.end.offset).toBe(5);
    });

    it('should convert scrRef location with non-zero offset', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        start: { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 }, offset: 5 },
        end: { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 }, offset: 20 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.verseRef.verseNum).toBe(2);
      // Verse 2 text at $.content[2].content[3]
      // USFM offset includes verse marker '\v 2 ' (5 chars), so USJ offset = USFM offset - 5
      // USFM offset 5 -> USJ offset 0, USFM offset 20 -> USJ offset 15
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[3]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(result.editorRange.end.offset).toBe(15);
    });
  });

  describe('UsjChapterLocation input type (verseRef with documentLocation)', () => {
    it('should convert UsjVerseRefChapterLocation to jsonPath and offset', async () => {
      const { papi } = createMockPapi();
      // UsjVerseRefChapterLocation format (verseRef + documentLocation)
      const range: ScriptureRange = {
        start: {
          verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          documentLocation: { jsonPath: '$.content[2].content[1]', offset: 0 },
        },
        end: {
          verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          documentLocation: { jsonPath: '$.content[2].content[1]', offset: 10 },
        },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.end.offset).toBe(10);
    });

    it('should convert UsjFlatChapterLocation (book + chapterNum + documentLocation)', async () => {
      const { papi } = createMockPapi();
      // UsjFlatChapterLocation format (book + chapterNum + documentLocation)
      const range: ScriptureRange = {
        start: {
          book: 'GEN',
          chapterNum: 1,
          documentLocation: { jsonPath: '$.content[2].content[1]', offset: 5 },
        },
        end: {
          book: 'GEN',
          chapterNum: 1,
          documentLocation: { jsonPath: '$.content[2].content[3]', offset: 15 },
        },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(5);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(result.editorRange.end.offset).toBe(15);
    });
  });

  describe('UsjFlatTextChapterLocation input type (deprecated - book + chapterNum + jsonPath)', () => {
    it('should convert UsjFlatTextChapterLocation with text content location (offset present)', async () => {
      const { papi } = createMockPapi();
      // UsjFlatTextChapterLocation format (deprecated: book + chapterNum + jsonPath + optional offset)
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, jsonPath: '$.content[2].content[1]', offset: 3 },
        end: { book: 'GEN', chapterNum: 1, jsonPath: '$.content[2].content[1]', offset: 20 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(3);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.end.offset).toBe(20);
    });

    it('should convert UsjFlatTextChapterLocation with marker location (no offset)', async () => {
      const { papi } = createMockPapi();
      // UsjMarkerLocation format (deprecated: jsonPath without offset)
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, jsonPath: '$.content[2].content[0]' },
        end: { book: 'GEN', chapterNum: 1, jsonPath: '$.content[2].content[2]' },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      // Marker locations without offset: finds next text location
      // content[0] is verse 1 marker, next text is content[1]; content[2] is verse 2 marker, next text is content[3]
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(result.editorRange.end.offset).toBe(0);
    });
  });

  describe('Mixed input types (different start and end location types)', () => {
    it('should convert range with SerializedVerseRef start and UsjChapterLocation end', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        // Start: SerializedVerseRef (UsfmVerseLocation)
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        // End: UsjVerseRefChapterLocation (UsjChapterLocation)
        end: {
          verseRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
          documentLocation: { jsonPath: '$.content[2].content[1]', offset: 25 },
        },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      // Start: SerializedVerseRef for verse 1 -> text at content[1], offset 0
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(0);
      // End: explicit documentLocation preserved
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.end.offset).toBe(25);
    });

    it('should convert range with UsjFlatTextChapterLocation start and UsfmScrRefVerseLocation end', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        // Start: UsjFlatTextChapterLocation (deprecated)
        start: { book: 'GEN', chapterNum: 1, jsonPath: '$.content[2].content[1]', offset: 5 },
        // End: UsfmScrRefVerseLocation (deprecated)
        end: { scrRef: { book: 'GEN', chapterNum: 1, verseNum: 2 }, offset: 10 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(1);
      // Start: explicit jsonPath and offset preserved
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[1]');
      expect(result.editorRange.start.offset).toBe(5);
      // End: scrRef verse 2 with USFM offset 10 -> verse 2 text at content[3]
      // USFM offset 10 - verse marker '\v 2 ' (5 chars) = USJ offset 5
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(result.editorRange.end.offset).toBe(5);
    });
  });

  describe('Error handling', () => {
    it('should throw error when range spans different chapters', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 2, verseNum: 1 },
      };

      await expect(convertScriptureRangeToEditorRange(papi, range, PROJECT_ID)).rejects.toThrow(
        'Selection range cannot (yet) span chapters or books',
      );
    });

    it('should throw error when range spans different books', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'EXO', chapterNum: 1, verseNum: 1 },
      };

      await expect(convertScriptureRangeToEditorRange(papi, range, PROJECT_ID)).rejects.toThrow(
        'Selection range cannot (yet) span chapters or books',
      );
    });

    it('should throw error when USJ chapter data is undefined', async () => {
      const { papi } = createMockPapi(USJ_NOTHING);
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      };

      await expect(convertScriptureRangeToEditorRange(papi, range, PROJECT_ID)).rejects.toThrow(
        'USJ Chapter for project id',
      );
    });
  });

  describe('Return value structure', () => {
    it('should return all expected properties in the result', async () => {
      const { papi } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      // Verify verseRef structure
      expect(result.verseRef).toHaveProperty('book');
      expect(result.verseRef).toHaveProperty('chapterNum');
      expect(result.verseRef).toHaveProperty('verseNum');

      // Verify editorRange structure
      expect(result.editorRange).toHaveProperty('start');
      expect(result.editorRange).toHaveProperty('end');
      expect(result.editorRange.start).toHaveProperty('jsonPath');
      expect(result.editorRange.start).toHaveProperty('offset');
      expect(result.editorRange.end).toHaveProperty('jsonPath');
      expect(result.editorRange.end).toHaveProperty('offset');

      // Verify usjReaderWriter is returned
      expect(result.usjReaderWriter).toBeDefined();

      // Verify startLocation and endLocation are returned
      expect(result.startLocation).toBeDefined();
      expect(result.startLocation).toHaveProperty('documentLocation');
      expect(result.endLocation).toBeDefined();
      expect(result.endLocation).toHaveProperty('documentLocation');
    });
  });

  describe('Data provider interaction', () => {
    it('should call projectDataProviders.get with correct arguments', async () => {
      const { papi, mockGet } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      };

      await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(mockGet).toHaveBeenCalledWith('platformScripture.USJ_Chapter', PROJECT_ID);
    });

    it('should call getChapterUSJ with the correct verse reference', async () => {
      const { papi, mockGetChapterUSJ } = createMockPapi();
      const range: ScriptureRange = {
        start: { book: 'GEN', chapterNum: 1, verseNum: 2 },
        end: { book: 'GEN', chapterNum: 1, verseNum: 3 },
      };

      await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(mockGetChapterUSJ).toHaveBeenCalledWith(
        expect.objectContaining({
          book: 'GEN',
          chapterNum: 1,
        }),
      );
    });
  });
});
