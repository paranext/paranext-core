import { describe, it, expect, vi } from 'vitest';
import { ScriptureRange } from 'platform-scripture-editor';
import type PapiBackend from '@papi/backend';
import { UsjTextContentLocation } from 'platform-bible-utils';
import {
  convertScriptureRangeToEditorRange,
  openDefaultActiveProjectIfApplicable,
  resolveOpenEditorDispatch,
  syncOnProjectSwitch,
  type OpenEditorDispatch,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  startDefaultProjectPicker,
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
  mockDataProvidersGet: ReturnType<typeof vi.fn>;
  mockRecordProjectOpened: ReturnType<typeof vi.fn>;
  mockWarn: ReturnType<typeof vi.fn>;
  mockInfo: ReturnType<typeof vi.fn>;
  mockDebug: ReturnType<typeof vi.fn>;
  /** Synthesize a `webViews.onDidOpenWebView` event from within a test. */
  fireWebViewOpen: () => void;
  /**
   * Synthesize a `webViews.onDidUpdateWebView` event from within a test. The driver filters to
   * Scripture Editor updates, so the default `webViewType` is `SCRIPTURE_EDITOR_WEBVIEW_TYPE`; pass
   * another value to simulate an unrelated webview update.
   */
  fireWebViewUpdate: (webViewType?: string) => void;
  /** Synthesize a `paratextBibleSendReceive.onSyncStateChanged` event from within a test. */
  fireSync: (event: { isSyncing: boolean }) => void;
  /** `true` once the driver has unsubscribed from `onDidOpenWebView`. */
  isWebViewOpenUnsubscribed: () => boolean;
  /** `true` once the driver has unsubscribed from `onDidUpdateWebView`. */
  isWebViewUpdateUnsubscribed: () => boolean;
  /** `true` once the driver has unsubscribed from `onSyncStateChanged`. */
  isSyncUnsubscribed: () => boolean;
}

function createPickerMocks(): PickerMocks {
  const mockGetSetting = vi.fn();
  const mockGetAllOpenWebViewDefinitions = vi.fn();
  const mockSendCommand = vi.fn();
  const mockWarn = vi.fn();
  const mockInfo = vi.fn();
  const mockDebug = vi.fn();

  // The driver subscribes to these events; we capture each listener so tests can drive events.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let webViewOpenListener: ((evt: any) => void) | undefined;
  let webViewOpenUnsubscribed = false;
  const mockOnDidOpenWebView = vi.fn((listener) => {
    webViewOpenListener = listener;
    return () => {
      webViewOpenUnsubscribed = true;
      webViewOpenListener = undefined;
    };
  });

  // Mirrors the open-event capture above — the driver subscribes to `onDidUpdateWebView` too, and
  // we capture the listener so tests can drive update events.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let webViewUpdateListener: ((evt: any) => void) | undefined;
  let webViewUpdateUnsubscribed = false;
  const mockOnDidUpdateWebView = vi.fn((listener) => {
    webViewUpdateListener = listener;
    return () => {
      webViewUpdateUnsubscribed = true;
      webViewUpdateListener = undefined;
    };
  });

  let syncListener: ((evt: { isSyncing: boolean }) => void) | undefined;
  let syncUnsubscribed = false;
  const mockGetNetworkEvent = vi.fn((eventName: string) => (listener: typeof syncListener) => {
    if (eventName === 'paratextBibleSendReceive.onSyncStateChanged') {
      syncListener = listener;
    }
    return () => {
      if (eventName === 'paratextBibleSendReceive.onSyncStateChanged') {
        syncUnsubscribed = true;
        syncListener = undefined;
      }
    };
  });

  const mockRecordProjectOpened = vi.fn().mockResolvedValue(undefined);
  const mockDataProvidersGet = vi.fn().mockImplementation(async (name: string) => {
    if (name === 'platformScripture.recentlyOpenedProjects') {
      return { recordProjectOpened: mockRecordProjectOpened };
    }
    return undefined;
  });

  // Mocking just the parts of PAPI the picker and its driver touch at runtime.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    settings: { get: mockGetSetting },
    webViews: {
      getAllOpenWebViewDefinitions: mockGetAllOpenWebViewDefinitions,
      onDidOpenWebView: mockOnDidOpenWebView,
      onDidUpdateWebView: mockOnDidUpdateWebView,
    },
    commands: { sendCommand: mockSendCommand },
    network: { getNetworkEvent: mockGetNetworkEvent },
    dataProviders: { get: mockDataProvidersGet },
    logger: { warn: mockWarn, info: mockInfo, debug: mockDebug },
  } as unknown as typeof PapiBackend;

  return {
    papi,
    mockGetSetting,
    mockGetAllOpenWebViewDefinitions,
    mockSendCommand,
    mockDataProvidersGet,
    mockRecordProjectOpened,
    mockWarn,
    mockInfo,
    mockDebug,
    fireWebViewOpen: () => {
      if (!webViewOpenListener) throw new Error('fireWebViewOpen: no listener captured');
      webViewOpenListener({});
    },
    fireWebViewUpdate: (webViewType: string = SCRIPTURE_EDITOR_WEBVIEW_TYPE) => {
      if (!webViewUpdateListener) throw new Error('fireWebViewUpdate: no listener captured');
      webViewUpdateListener({ webView: { webViewType } });
    },
    fireSync: (event) => {
      if (!syncListener) throw new Error('fireSync: no listener captured');
      syncListener(event);
    },
    isWebViewOpenUnsubscribed: () => webViewOpenUnsubscribed,
    isWebViewUpdateUnsubscribed: () => webViewUpdateUnsubscribed,
    isSyncUnsubscribed: () => syncUnsubscribed,
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

  it("returns 'wrong-mode' and warns when settings.get returns a PlatformError", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue({
      platformErrorVersion: 1,
      message: 'simulated platform error',
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('wrong-mode');
    expect(mockGetAllOpenWebViewDefinitions).not.toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalled();
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

  it("returns 'no-send-receive' when getSharedProjects rejects (S/R not registered yet)", async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockWarn,
      mockDebug,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        throw new Error("Command 'paratextBibleSendReceive.getSharedProjects' is not registered");
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-send-receive');
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      expect.anything(),
    );
    // Expected steady state on Platform.Bible — logged at debug, not warn.
    expect(mockDebug).toHaveBeenCalled();
    expect(mockWarn).not.toHaveBeenCalled();
  });

  it("returns 'no-candidate' when all entries have editedStatus 'new'", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
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
    expect(mockSendCommand).toHaveBeenCalledWith('platformScriptureEditor.openModelText', 'newer');
  });

  it("skips entries with editedStatus 'new' or 'unregistered' and picks the newest of the rest", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
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
          limitedLicense: {
            id: 'limitedLicense',
            name: 'LL',
            fullName: 'LL',
            language: 'en',
            editedStatus: 'unregistered',
            lastSendReceiveDate: '2025-11-01T00:00:00Z',
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

  it("returns 'no-candidate' when all entries have editedStatus 'unregistered'", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'unregistered',
            lastSendReceiveDate: '2024-01-01T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
  });

  it("returns 'failed' when openScriptureEditor succeeds but openModelText rejects", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
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
        return 'opened-webview-id';
      }
      if (commandName === 'platformScriptureEditor.openModelText') {
        throw new Error('model text open failed');
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('failed');
    expect(mockWarn).toHaveBeenCalled();
  });

  it("returns 'failed' when the openScriptureEditor command rejects", async () => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand, mockWarn } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
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

  it('records the opened project as recently-opened on the filled path', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
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
    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj1');
    expect(mockRecordProjectOpened).toHaveBeenCalledTimes(1);
  });

  it('still reports filled even if recordProjectOpened throws', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
      mockWarn,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
          },
        };
      }
      if (commandName === 'platformScriptureEditor.openScriptureEditor') {
        return 'opened-webview-id';
      }
      return undefined;
    });
    mockRecordProjectOpened.mockRejectedValueOnce(new Error('storage write blew up'));

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockWarn).toHaveBeenCalled();
  });

  it('does not record when openScriptureEditor fails', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
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
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
  });

  it('still reports filled when dataProviders.get returns undefined', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockDataProvidersGet,
      mockRecordProjectOpened,
      mockWarn,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          proj1: {
            id: 'proj1',
            name: 'P1',
            fullName: 'Project 1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2025-06-01T00:00:00Z',
          },
        };
      }
      if (commandName === 'platformScriptureEditor.openScriptureEditor') {
        return 'opened-webview-id';
      }
      return undefined;
    });
    // Override the default mock so dataProviders.get returns undefined for the recents service.
    mockDataProvidersGet.mockResolvedValue(undefined);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
    expect(mockWarn).not.toHaveBeenCalled();
  });
});

// #endregion openDefaultActiveProjectIfApplicable

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
    // Simple-mode invariant: every open routes to the editor column. The caller's tab is not the
    // editor, so we ignore it and replace the existing editor instead.
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

// #region startDefaultProjectPicker

describe('startDefaultProjectPicker', () => {
  /**
   * Configure the mocks so `openDefaultActiveProjectIfApplicable` exits at its cheapest path
   * (interfaceMode !== 'simple' returns 'wrong-mode'). We use `mockGetSetting` as the call counter
   * because it's the first PAPI call inside the picker, so its call count equals the run count.
   */
  function setUpFastNoOp(mocks: PickerMocks) {
    mocks.mockGetSetting.mockResolvedValue('power');
  }

  it('runs the picker immediately on subscribe', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);

    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1);
    });
  });

  it('re-runs the picker when a web view opens', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireWebViewOpen();

    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });
  });

  it('re-runs the picker when a web view updates (soft-close-reopen layout restore)', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireWebViewUpdate();

    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });
  });

  it('does NOT re-run the picker when an unrelated web view updates', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireWebViewUpdate('someOtherExtension.someWebViewType');

    // Give the microtask queue a chance to flush in case a stray retry was queued.
    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });
    expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1);
  });

  it('re-runs the picker when a sync completes (isSyncing becomes false)', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireSync({ isSyncing: false });

    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });
  });

  it('does NOT re-run the picker when a sync starts (isSyncing true)', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireSync({ isSyncing: true });

    // Give the microtask queue a chance to flush in case a stray retry was queued.
    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });
    expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1);
  });

  it('coalesces multiple triggers during an in-flight run into a single follow-up', async () => {
    const mocks = createPickerMocks();
    // Block the initial picker call on a controllable promise so we can fire triggers while it's
    // in flight. Subsequent calls resolve immediately to 'power' for a fast no-op.
    let unblock: () => void = () => {};
    const initialPromise = new Promise<'power'>((resolve) => {
      unblock = () => resolve('power');
    });
    mocks.mockGetSetting.mockReturnValueOnce(initialPromise).mockResolvedValue('power');

    startDefaultProjectPicker(mocks.papi);
    // Initial run is now in flight, blocked on `initialPromise`.
    mocks.fireWebViewOpen();
    mocks.fireSync({ isSyncing: false });
    // Two triggers while in flight should coalesce to a single follow-up run.

    unblock();

    await vi.waitFor(() => {
      // 1 initial + 1 coalesced follow-up = 2 total calls.
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });

    // Give any stray retry a chance to fire; assert we're still at 2.
    await new Promise((resolve) => {
      setTimeout(resolve, 20);
    });
    expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
  });

  it('returned unsubscriber removes all subscriptions', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    const unsub = startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    unsub();

    expect(mocks.isWebViewOpenUnsubscribed()).toBe(true);
    expect(mocks.isWebViewUpdateUnsubscribed()).toBe(true);
    expect(mocks.isSyncUnsubscribed()).toBe(true);
  });

  it('warns and keeps running when openDefaultActiveProjectIfApplicable throws unexpectedly', async () => {
    const mocks = createPickerMocks();
    // Force the inner picker to reject by making its first PAPI call throw. This bypasses the
    // inner function's own try/catch (which only wraps the getSharedProjects call) and exercises
    // the tryPicker catch block — the "PAPI plumbing bug" path.
    mocks.mockGetSetting.mockRejectedValueOnce(new Error('simulated PAPI plumbing bug'));
    // Subsequent runs (re-triggered by the next event) take the fast no-op path so the driver
    // continues to work after the unexpected throw.
    mocks.mockGetSetting.mockResolvedValue('power');

    startDefaultProjectPicker(mocks.papi);

    await vi.waitFor(() => {
      expect(mocks.mockWarn).toHaveBeenCalled();
    });
    expect(mocks.mockWarn.mock.calls[0]?.[0]).toMatch(/tryPicker threw unexpectedly/);

    // Driver still works after the throw — a follow-up trigger should re-run the picker.
    mocks.fireWebViewOpen();
    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });
  });
});

// #endregion startDefaultProjectPicker

// #region syncOnProjectSwitch

function createSyncMockPapi() {
  const mockSendCommand = vi.fn().mockResolvedValue(undefined);
  const mockWarn = vi.fn();
  // Must cast since the mock only includes the papi properties used by syncOnProjectSwitch.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    commands: { sendCommand: mockSendCommand },
    logger: { warn: mockWarn },
  } as unknown as typeof PapiBackend;
  return { papi, mockSendCommand, mockWarn };
}

describe('syncOnProjectSwitch', () => {
  it('calls syncProjects with the incoming project ID', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined);

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.syncProjects', [
      'proj-incoming',
    ]);
  });

  it('calls sendReceiveProjects with the outgoing project ID when provided', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-outgoing',
    ]);
  });

  it('calls syncProjects before sendReceiveProjects', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();
    const callOrder: string[] = [];
    mockSendCommand.mockImplementation(async (commandName: string) => {
      callOrder.push(commandName);
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing');

    expect(callOrder).toEqual([
      'paratextBibleSendReceive.syncProjects',
      'paratextBibleSendReceive.sendReceiveProjects',
    ]);
  });

  it('does not call sendReceiveProjects when outgoingProjectId is undefined', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined);

    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'paratextBibleSendReceive.sendReceiveProjects',
      expect.anything(),
    );
  });

  it('still calls sendReceiveProjects when syncProjects throws', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.syncProjects') throw new Error('sync failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-outgoing',
    ]);
  });

  it('resolves without throwing when both syncs fail', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();
    mockSendCommand.mockRejectedValue(new Error('network error'));

    await expect(
      syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing'),
    ).resolves.toBeUndefined();
  });

  it('logs a warning when the incoming sync fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.syncProjects') throw new Error('sync failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined);

    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-incoming'));
  });

  it('logs a warning when the outgoing sync fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.sendReceiveProjects')
        throw new Error('S/R failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing');

    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-outgoing'));
  });
});

// #endregion syncOnProjectSwitch
