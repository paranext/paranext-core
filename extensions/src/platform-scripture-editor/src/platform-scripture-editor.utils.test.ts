import { describe, it, expect, vi } from 'vitest';
import { ScriptureRange } from 'platform-scripture-editor';
import type PapiBackend from '@papi/backend';
import { UsjTextContentLocation } from 'platform-bible-utils';
import {
  convertScriptureRangeToEditorRange,
  resolveOpenEditorDispatch,
  type OpenEditorDispatch,
} from './platform-scripture-editor.utils';

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
const SAMPLE_USFM_CHAPTER = String.raw`\id GEN GEN - Genesis
\c 1
\p
\v 1 In the beginning God created the heavens and the earth.
\v 2 Now the earth was formless and empty.
\v 3 And God said, "Let there be light," and there was light.`;

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

  // Mocking just the part of the PAPI that we need for these tests
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    projectDataProviders: {
      get: mockGet,
    },
  } as unknown as typeof PapiBackend;

  return { papi, mockGet, mockGetChapterUSJ };
}

/** Helper to extract offset from UsjDocumentLocation, asserting it has one */
function getOffset(location: unknown): number {
  expect(location).toHaveProperty('offset');
  // We just checked it has an `offset` property
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (location as UsjTextContentLocation).offset;
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
      // Verse 1 marker is at $.content[2].content[0] (UsjMarkerLocation, no offset)
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.start).not.toHaveProperty('offset');
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.end).not.toHaveProperty('offset');
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
      // Verse 1 marker at $.content[2].content[0], verse 3 marker at $.content[2].content[4] (UsjMarkerLocation, no offset)
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.start).not.toHaveProperty('offset');
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[4]');
      expect(result.editorRange.end).not.toHaveProperty('offset');
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
      // Verse 1 marker at $.content[2].content[0]
      // USFM offset 0 points to \v marker (UsjMarkerLocation, no propertyOffset); offset 10 is 10 chars from \v
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.start).not.toHaveProperty('offset');
      expect(result.editorRange.start).not.toHaveProperty('propertyOffset');
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(getOffset(result.editorRange.end)).toBe(5);
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
      expect(getOffset(result.editorRange.start)).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(getOffset(result.editorRange.end)).toBe(15);
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
      expect(getOffset(result.editorRange.start)).toBe(0);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(getOffset(result.editorRange.end)).toBe(10);
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
      expect(getOffset(result.editorRange.start)).toBe(5);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(getOffset(result.editorRange.end)).toBe(15);
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
      expect(getOffset(result.editorRange.start)).toBe(3);
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(getOffset(result.editorRange.end)).toBe(20);
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
      // Marker locations without offset are preserved as UsjMarkerLocation (no offset property)
      // content[0] is verse 1 marker, content[2] is verse 2 marker
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.start).not.toHaveProperty('offset');
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[2]');
      expect(result.editorRange.end).not.toHaveProperty('offset');
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
      // Start: SerializedVerseRef for verse 1 -> marker at content[0] (UsjMarkerLocation, no offset)
      expect(result.editorRange.start.jsonPath).toBe('$.content[2].content[0]');
      expect(result.editorRange.start).not.toHaveProperty('offset');
      // End: explicit documentLocation preserved
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[1]');
      expect(getOffset(result.editorRange.end)).toBe(25);
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
      expect(getOffset(result.editorRange.start)).toBe(5);
      // End: scrRef verse 2 with USFM offset 10 -> verse 2 text at content[3]
      // USFM offset 10 - verse marker '\v 2 ' (5 chars) = USJ offset 5
      expect(result.editorRange.end.jsonPath).toBe('$.content[2].content[3]');
      expect(getOffset(result.editorRange.end)).toBe(5);
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
      expect(result.editorRange.end).toHaveProperty('jsonPath');

      // Verify usjReaderWriter is returned
      expect(result.usjReaderWriter).toBeDefined();
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

// #region resolveOpenEditorDispatch

// Helper: build a minimal "Scripture editor" web view definition record for the dispatch helper.
// `resolveOpenEditorDispatch` only reads `id`, `projectId`, and `isReadOnly`, so a partial object
// is sufficient.
type ScriptureEditorDef = { id: string; projectId?: string; isReadOnly?: boolean };

describe('resolveOpenEditorDispatch', () => {
  it('simple mode + caller override + different project: caller override is ignored, replaces first editor', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-other', projectId: 'PROJ_X', isReadOnly: false },
    ];
    const result: OpenEditorDispatch = resolveOpenEditorDispatch(
      editors,
      'WEB',
      false,
      'simple',
      'caller-supplied-tab-id',
    );
    // Simple-mode invariant: opens land in the editor column. Caller's tab is not the editor —
    // we ignore it and replace the existing editor instead.
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'editor-other' });
  });

  it('simple mode + caller override + same project open: focuses the existing tab (caller override is ignored)', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(
      editors,
      'WEB',
      false,
      'simple',
      'caller-supplied-tab-id',
    );
    // Simple-mode invariant: caller override is ignored. We always route to the editor column,
    // and since the requested project is already in the editor column we focus that tab.
    expect(result).toEqual({ kind: 'focus-existing', existingId: 'editor-web' });
  });

  it('power mode + caller override + same project open: caller override still wins (no focus rule)', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(
      editors,
      'WEB',
      false,
      'power',
      'caller-supplied-tab-id',
    );
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'caller-supplied-tab-id' });
  });

  it('power mode + caller override + no editors: replace-tab on the caller-supplied target', () => {
    const editors: ScriptureEditorDef[] = [];
    const result = resolveOpenEditorDispatch(
      editors,
      'WEB',
      false,
      'power',
      'caller-supplied-tab-id',
    );
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'caller-supplied-tab-id' });
  });

  it('simple mode: returns focus-existing when an editor for the same project (both editable) is already open', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'simple', undefined);
    expect(result).toEqual({ kind: 'focus-existing', existingId: 'editor-web' });
  });

  it('simple mode: returns focus-existing when a read-only viewer for the same project is already open and a read-only viewer is requested', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'viewer-web', projectId: 'WEB', isReadOnly: true },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', true, 'simple', undefined);
    expect(result).toEqual({ kind: 'focus-existing', existingId: 'viewer-web' });
  });

  it('simple mode: replaces an editable editor when a read-only viewer is requested for the same project', () => {
    // Read-only Resource Viewers and editable Scripture Editors share the same webViewType but
    // are different views. The single editor slot can only host one at a time, so requesting
    // the opposite mode should replace the existing tab, not focus it.
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', true, 'simple', undefined);
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'editor-web' });
  });

  it('simple mode: replaces a read-only viewer when an editable editor is requested for the same project', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'viewer-web', projectId: 'WEB', isReadOnly: true },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'simple', undefined);
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'viewer-web' });
  });

  it('simple mode: returns replace-tab on the first existing editor when the requested project differs', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-a', projectId: 'PROJ_A', isReadOnly: false },
      { id: 'editor-b', projectId: 'PROJ_B', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'PROJ_C', false, 'simple', undefined);
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'editor-a' });
  });

  it('simple mode: returns replace-tab on the empty placeholder editor when no project editors exist', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'empty-editor', projectId: undefined, isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'simple', undefined);
    // Same-(project, readonly) lookup misses (no projectId on the empty one). Simple-mode then
    // replaces the first existing editor — which happens to be the empty placeholder.
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'empty-editor' });
  });

  it('simple mode: returns open-new when no Scripture Editors are open at all', () => {
    const editors: ScriptureEditorDef[] = [];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'simple', undefined);
    expect(result).toEqual({ kind: 'open-new' });
  });

  it('power mode: only the empty-editor probe applies — same project clicked twice does not focus', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'power', undefined);
    // No empty editor and no caller override → fall through to open-new (P9-style two tabs).
    expect(result).toEqual({ kind: 'open-new' });
  });

  it('power mode: falls back to empty-editor probe when one exists', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'empty-editor', projectId: undefined, isReadOnly: false },
    ];
    const result = resolveOpenEditorDispatch(editors, 'WEB', false, 'power', undefined);
    expect(result).toEqual({ kind: 'replace-tab', targetTabId: 'empty-editor' });
  });

  it('power mode: isReadOnly is ignored — same project, opposite readonly does not focus', () => {
    const editors: ScriptureEditorDef[] = [
      { id: 'editor-web', projectId: 'WEB', isReadOnly: false },
    ];
    // Power mode never focuses, regardless of (project, readonly) alignment.
    const result = resolveOpenEditorDispatch(editors, 'WEB', true, 'power', undefined);
    expect(result).toEqual({ kind: 'open-new' });
  });
});

// #endregion resolveOpenEditorDispatch
