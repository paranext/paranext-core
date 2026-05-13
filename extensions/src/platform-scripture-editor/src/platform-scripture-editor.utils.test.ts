import { describe, it, expect, vi } from 'vitest';
import { ScriptureRange } from 'platform-scripture-editor';
import type PapiBackend from '@papi/backend';
import { UsjTextContentLocation } from 'platform-bible-utils';
import {
  convertScriptureRangeToEditorRange,
  openDefaultActiveProjectIfApplicable,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
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

// #region openDefaultActiveProjectIfApplicable

interface PickerMocks {
  papi: typeof PapiBackend;
  mockGetSetting: ReturnType<typeof vi.fn>;
  mockGetAllOpenWebViewDefinitions: ReturnType<typeof vi.fn>;
  mockSendCommand: ReturnType<typeof vi.fn>;
  mockWarn: ReturnType<typeof vi.fn>;
}

function createPickerMocks(): PickerMocks {
  const mockGetSetting = vi.fn();
  const mockGetAllOpenWebViewDefinitions = vi.fn();
  const mockSendCommand = vi.fn();
  const mockWarn = vi.fn();

  // Mocking just the parts of PAPI the picker actually touches at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    settings: { get: mockGetSetting },
    webViews: { getAllOpenWebViewDefinitions: mockGetAllOpenWebViewDefinitions },
    commands: { sendCommand: mockSendCommand },
    logger: { warn: mockWarn },
  } as unknown as typeof PapiBackend;

  return {
    papi,
    mockGetSetting,
    mockGetAllOpenWebViewDefinitions,
    mockSendCommand,
    mockWarn,
  };
}

// Helper: getAllOpenWebViewDefinitions returns WebViewDefinition[], but test fixtures here are
// plain objects that satisfy only a subset of that interface. Casting through never avoids
// constructing full WebViewDefinition objects in tests.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const asWebViews = (arr: object[]) => arr as never;

describe('openDefaultActiveProjectIfApplicable', () => {
  it("returns 'wrong-mode' when interfaceMode is not 'simple'", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('power');

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('wrong-mode');
    expect(mockGetAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it("returns 'no-empty' when no Scripture Editor with undefined projectId is open", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([
        { webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: 'project1' },
        { webViewType: 'someOtherType', projectId: undefined },
      ]),
    );

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-empty');
    expect(mockGetAllOpenWebViewDefinitions).toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it("returns 'no-candidate' when isSendReceiveAvailable returns false", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return false;
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
    expect(mockSendCommand).toHaveBeenCalledWith('platformGetResources.isSendReceiveAvailable');
    expect(mockSendCommand).not.toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("returns 'failed' when the isSendReceiveAvailable check rejects", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') {
        throw new Error('isSendReceiveAvailable command not registered');
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('failed');
    expect(mockWarn).toHaveBeenCalled();
  });

  it("returns 'failed' when getSharedProjects rejects", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        throw new Error('getSharedProjects failed');
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('failed');
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
    expect(mockWarn).toHaveBeenCalled();
  });

  it("returns 'no-candidate' when all entries have editedStatus 'new'", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'new',
            lastSendReceiveDate: '2024-01-01T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
  });

  it("returns 'no-candidate' when all entries have empty lastSendReceiveDate", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
  });

  it('picks the project with the highest lastSendReceiveDate and calls openScriptureEditor', async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          older: {
            id: 'older',
            name: 'Older',
            fullName: 'Older',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2024-01-01T00:00:00Z',
          },
          newer: {
            id: 'newer',
            name: 'Newer',
            fullName: 'Newer',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
          },
          stillOlder: {
            id: 'stillOlder',
            name: 'StillOlder',
            fullName: 'StillOlder',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2023-01-01T00:00:00Z',
          },
        };
      }
      if (commandName === 'platformScriptureEditor.openScriptureEditor') {
        return 'opened-webview-id';
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'newer',
    );
  });

  it("skips entries with editedStatus 'new' and picks the newest of the rest", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          notDownloaded: {
            id: 'notDownloaded',
            name: 'ND',
            fullName: 'ND',
            language: 'en',
            editedStatus: 'new',
            lastSendReceiveDate: '2025-12-01T00:00:00Z',
          },
          downloaded: {
            id: 'downloaded',
            name: 'D',
            fullName: 'D',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'downloaded',
    );
  });

  it("returns 'failed' when the openScriptureEditor command rejects", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformGetResources.isSendReceiveAvailable') return true;
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'P1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
          },
        };
      }
      if (commandName === 'platformScriptureEditor.openScriptureEditor') {
        throw new Error('open failed');
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('failed');
    expect(mockWarn).toHaveBeenCalled();
  });
});

// #endregion openDefaultActiveProjectIfApplicable
