import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { LUCIDE_ICON_NAMES } from 'platform-bible-react/experimental';
import { ScriptureRange } from 'platform-scripture-editor';
import type PapiBackend from '@papi/backend';
import { newPlatformError, normalizeProjectId, UsjTextContentLocation } from 'platform-bible-utils';
import type { SavedWebViewDefinition } from '@papi/core';
import { MutableRefObject } from 'react';
import type { EditorRef, SelectionRange, ViewOptions } from '@eten-tech-foundation/platform-editor';
import {
  USJ_TYPE,
  USJ_VERSION,
  type MarkerObject,
  type Usj,
} from '@eten-tech-foundation/scripture-utilities';
import {
  convertScriptureRangeToEditorRange,
  decideNoteCallerClickAction,
  decideNoteSessionUpdate,
  resolveNoteVerseRef,
  findEditorUsjNotes,
  finalizeProjectSwitch,
  formatEditorTitle,
  getTabTitleProjectName,
  generateParagraphMenuListItems,
  getNextViewTypeInCycle,
  getSimpleModeRootClassNames,
  createUnsupportedProjectIdsCache,
  getProjectUnsupportedReason,
  buildScriptureEditorWebViewState,
  UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY,
  UNSUPPORTED_PROJECT_IDS_RETRY_DELAY_MS,
  getViewTypeToSave,
  showsReadOnlyPreview,
  openDefaultActiveProjectIfApplicable,
  resolveOpenEditorDispatch,
  resolveViewTypeForInterfaceMode,
  getDisplayedViewType,
  VIEW_TYPE_UNSET,
  VIEW_TYPE_FOR_SET_VIEW_COMMAND,
  syncOnProjectSwitch,
  syncOnSwitchToPower,
  UNSENT_CHANGES_SYNC_WAIT_MS,
  UNSENT_CHANGES_GRACE_MS,
  waitForUnsentChanges,
  openOrUpdateRelatedPanels,
  updateRelatedFindPanel,
  buildScriptureTextGridWebView,
  resolveGridProviderProjectId,
  updateRelatedChecksSidePanel,
  updateRelatedTextCollectionPanel,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
  type OpenEditorDispatch,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  selectProjectIdsForOpenMode,
  startDefaultProjectPicker,
  toScriptureEditorInfos,
  isBlankChapterOnScreen,
  isChapterBlank,
  buildChapterScaffoldOps,
  canAddChapterNumber,
  resolveAddChapterNumberClick,
  isMissingBookError,
  isMissingBookOnScreen,
  hasDisplayableParagraphMarkerTitle,
  getParagraphMarkerTitle,
  parseMissingBookError,
  resolveResourceContentState,
  resolveCallerHighlight,
  resolveFootnotesPaneViewOptions,
  resolveNoteEditingSurface,
  usesPaneNoteModel,
  shouldEndPaneNoteEditOnRowSelect,
  shouldPublishPaneDocument,
  validateCommentSelection,
  readCommentRangeText,
  hasPendingCommentTextChanged,
  withDocumentEndOnText,
  selectableParagraphMarkers,
  PROGRAMMATICALLY_APPLIED_PARAGRAPH_MARKERS,
  showCommentThreadForInterfaceMode,
} from './platform-scripture-editor.utils';
import { restoreSelectionIfLost } from './platform-scripture-editor.web-view.utils';

/**
 * Build a mock editor ref exposing spies for the methods the generators call. It has no text
 * selection; pass `selectedParaMarker` to have a paragraph's gutter marker selected instead.
 */
function makeMockEditorRef(selectedParaMarker?: string) {
  const formatPara = vi.fn();
  const insertMarker = vi.fn();
  const getSelectedParaMarker = vi.fn<() => string | undefined>(() => selectedParaMarker);
  const setSelection = vi.fn();
  // Mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const ref = {
    current: {
      formatPara,
      insertMarker,
      getSelection: () => undefined,
      getSelectedParaMarker,
      setSelection,
    },
  } as unknown as MutableRefObject<EditorRef | null>;
  return { ref, formatPara, insertMarker, getSelectedParaMarker, setSelection };
}

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

// Sample USJ chapter data for Genesis chapter 2. Chapter USJ only carries the book `id` marker
// when the chapter is 1 (the intro content before chapter 1 belongs to chapter 1's USJ); a
// chapter-2 (or later) document has no `id` marker to derive a book ID from.
const SAMPLE_USJ_CHAPTER_2 = Object.freeze({
  type: 'USJ',
  version: '3.0',
  content: [
    { type: 'chapter', marker: 'c', number: '2', sid: 'GEN 2' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '1', sid: 'GEN 2:1' },
        'Thus the heavens and the earth were finished.',
      ],
    },
  ],
});

// Sample USJ chapter data for Genesis chapter 1 with a `nd` char span nested in verse 1's text
const SAMPLE_USJ_CHAPTER_WITH_CHAR_SPAN = Object.freeze({
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
        'In the beginning ',
        { type: 'char', marker: 'nd', content: ['GOD'] },
        ' created the heavens and the earth.',
      ],
    },
  ],
});

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

  describe('Book ID fallback for USJ document locations outside chapter 1', () => {
    it("derives the verse from a chapter-2 USJ using the range's own book id", async () => {
      const { papi } = createMockPapi(SAMPLE_USJ_CHAPTER_2);
      // UsjFlatChapterLocation format (book + chapterNum + documentLocation); chapter 2's USJ has
      // no `id` marker to derive a book ID from
      const range: ScriptureRange = {
        start: {
          book: 'GEN',
          chapterNum: 2,
          documentLocation: { jsonPath: '$.content[1].content[0]' },
        },
        end: {
          book: 'GEN',
          chapterNum: 2,
          documentLocation: { jsonPath: '$.content[1].content[1]', offset: 5 },
        },
      };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.verseRef.book).toBe('GEN');
      expect(result.verseRef.chapterNum).toBe(2);
      expect(result.verseRef.verseNum).toBe(1);
      expect(result.editorRange.start.jsonPath).toBe('$.content[1].content[0]');
      expect(result.editorRange.end.jsonPath).toBe('$.content[1].content[1]');
      expect(getOffset(result.editorRange.end)).toBe(5);
    });
  });

  describe('Collapsed ranges', () => {
    // USFM offset 26 in verse 1 is the settled position right at the start of the `nd` char
    // span's text ("GOD"), after the marker's own backslash+code: content[2] is the `p`
    // paragraph, content[2] within that is the `nd` char node, and content[0] within that is its
    // text
    const expectedCollapsedLocation = { jsonPath: '$.content[2].content[2].content[0]', offset: 0 };

    it('resolves both ends to the same location when `range.end` equals `range.start`, at settled offset 0 of a char span text', async () => {
      const { papi } = createMockPapi(SAMPLE_USJ_CHAPTER_WITH_CHAR_SPAN);
      const point: ScriptureRange['start'] = {
        scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
        offset: 26,
      };
      const range: ScriptureRange = { start: point, end: point };

      const result = await convertScriptureRangeToEditorRange(papi, range, PROJECT_ID);

      expect(result.editorRange.start).toEqual(expectedCollapsedLocation);
      expect(result.editorRange.end).toEqual(result.editorRange.start);
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
  mockInfo: ReturnType<typeof vi.fn>;
  mockDebug: ReturnType<typeof vi.fn>;
  mockProjectDataProvidersGet: ReturnType<typeof vi.fn>;
  mockDataProvidersGet: ReturnType<typeof vi.fn>;
  mockGetMetadataForAllProjects: ReturnType<typeof vi.fn>;
  mockRecordProjectOpened: ReturnType<typeof vi.fn>;
  mockRecentProjectsGet: ReturnType<typeof vi.fn>;
  /**
   * Sets the `canUserEditScripture` mock return value for a specific project id. Values default to
   * `true` for any project id not configured. Call before triggering the picker.
   */
  setCanUserEditScripture: (projectId: string, canEdit: boolean) => void;
  /** Sets the list of recently opened project IDs. */
  setRecentProjects: (ids: string[]) => void;
  /**
   * Marks the given project ids as unsupported (`ProjectMetadata.unsupportedReason` set). The
   * metadata lookup answers with these ids upper-cased, so a test that hands the picker lower-case
   * candidate ids only passes if the picker normalizes them.
   */
  setUnsupportedIds: (ids: string[]) => void;
  /** Synthesize an `object:onDidCreateNetworkObject` event for an object of this type. */
  fireNetworkObjectCreated: (objectType: string) => void;
  /** `true` once the driver has unsubscribed from `object:onDidCreateNetworkObject`. */
  isNetworkObjectCreatedUnsubscribed: () => boolean;
  /**
   * Synthesize a `webViews.onDidOpenWebView` event from within a test. By default the opened web
   * view is an empty Scripture Editor; pass `projectId` for one opened on a project.
   */
  fireWebViewOpen: (projectId?: string) => void;
  /**
   * Synthesize a `webViews.onDidUpdateWebView` event from within a test. The driver filters to
   * Scripture Editor updates, so the default `webViewType` is `SCRIPTURE_EDITOR_WEBVIEW_TYPE`; pass
   * another value to simulate an unrelated webview update, and `projectId` for an editor showing a
   * project.
   */
  fireWebViewUpdate: (webViewType?: string, projectId?: string) => void;
  /** Synthesize a `paratextBibleSendReceive.onSyncStateChanged` event from within a test. */
  fireSync: (event: { isSyncing: boolean }) => void;
  /** Synthesize a `platform.onDidChangeProjects` event from within a test. */
  fireProjectsChanged: () => void;
  /** `true` once the driver has unsubscribed from `onDidOpenWebView`. */
  isWebViewOpenUnsubscribed: () => boolean;
  /** `true` once the driver has unsubscribed from `onDidUpdateWebView`. */
  isWebViewUpdateUnsubscribed: () => boolean;
  /** `true` once the driver has unsubscribed from `onSyncStateChanged`. */
  isSyncUnsubscribed: () => boolean;
  /** `true` once the driver has unsubscribed from `onDidChangeProjects`. */
  isProjectsChangedUnsubscribed: () => boolean;
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

  // Network-event listeners by event name, and the names the driver has unsubscribed from.
  const networkEventListeners = new Map<string, (evt: unknown) => void>();
  const unsubscribedNetworkEvents = new Set<string>();
  const mockGetNetworkEvent = vi.fn((eventName: string) => (listener: (evt: unknown) => void) => {
    networkEventListeners.set(eventName, listener);
    return () => {
      unsubscribedNetworkEvents.add(eventName);
      networkEventListeners.delete(eventName);
    };
  });

  // Per-project Observer/editor role. Defaults to `true` (editable) so existing tests written
  // before role partitioning continue to pass. The picker queries the narrow
  // `platformScripture.scriptureEditPermissions` projectInterface; tests configure that PDP's
  // `canUserEditScripture` method via `setCanUserEditScripture`.
  const canUserEditScriptureByProjectId = new Map<string, boolean>();
  const setCanUserEditScripture = (projectId: string, canEdit: boolean) => {
    canUserEditScriptureByProjectId.set(projectId, canEdit);
  };
  const mockProjectDataProvidersGet = vi.fn(async (_interface: string, projectId: string) => ({
    canUserEditScripture: async () => canUserEditScriptureByProjectId.get(projectId) ?? true,
  }));

  // Backs the picker's unsupported-project lookup. Answers for each id it is asked about, with the
  // id upper-cased.
  const unsupportedProjectIds = new Set<string>();
  const mockGetMetadataForAllProjects = vi.fn(
    async ({ includeProjectIds }: { includeProjectIds: string[] }) =>
      includeProjectIds.map((id) => ({
        id: id.toUpperCase(),
        projectInterfaces: [],
        pdpFactoryInfo: {},
        ...(unsupportedProjectIds.has(id.toUpperCase())
          ? { unsupportedReason: '%project_unsupported_studyBibleAdditions%' }
          : {}),
      })),
  );

  const mockRecentProjects: string[] = [];
  const mockRecentProjectsGet = vi.fn().mockImplementation(async () => [...mockRecentProjects]);
  const mockRecordProjectOpened = vi.fn().mockResolvedValue(undefined);
  const mockDataProvidersGet = vi.fn().mockImplementation(async (name: string) => {
    if (name === 'platformScripture.recentlyOpenedProjects') {
      return {
        getRecentProjects: mockRecentProjectsGet,
        recordProjectOpened: mockRecordProjectOpened,
      };
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
    projectDataProviders: { get: mockProjectDataProvidersGet },
    dataProviders: { get: mockDataProvidersGet },
    projectLookup: { getMetadataForAllProjects: mockGetMetadataForAllProjects },
    logger: { warn: mockWarn, info: mockInfo, debug: mockDebug },
  } as unknown as typeof PapiBackend;

  return {
    papi,
    mockGetSetting,
    mockGetAllOpenWebViewDefinitions,
    mockSendCommand,
    mockWarn,
    mockInfo,
    mockDebug,
    mockProjectDataProvidersGet,
    mockDataProvidersGet,
    mockGetMetadataForAllProjects,
    mockRecordProjectOpened,
    mockRecentProjectsGet,
    setCanUserEditScripture,
    setRecentProjects: (ids: string[]) => {
      mockRecentProjects.length = 0;
      mockRecentProjects.push(...ids);
    },
    setUnsupportedIds: (ids: string[]) => {
      ids.forEach((id) => unsupportedProjectIds.add(id.toUpperCase()));
    },
    fireNetworkObjectCreated: (objectType: string) => {
      const listener = networkEventListeners.get('object:onDidCreateNetworkObject');
      if (!listener) throw new Error('fireNetworkObjectCreated: no listener captured');
      listener({ id: `${objectType}-object`, objectType, functionNames: [] });
    },
    isNetworkObjectCreatedUnsubscribed: () =>
      unsubscribedNetworkEvents.has('object:onDidCreateNetworkObject'),
    fireWebViewOpen: (projectId?: string) => {
      if (!webViewOpenListener) throw new Error('fireWebViewOpen: no listener captured');
      webViewOpenListener({ webView: { webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId } });
    },
    fireWebViewUpdate: (
      webViewType: string = SCRIPTURE_EDITOR_WEBVIEW_TYPE,
      projectId: string | undefined = undefined,
    ) => {
      if (!webViewUpdateListener) throw new Error('fireWebViewUpdate: no listener captured');
      webViewUpdateListener({ webView: { webViewType, projectId } });
    },
    fireSync: (event) => {
      const listener = networkEventListeners.get('paratextBibleSendReceive.onSyncStateChanged');
      if (!listener) throw new Error('fireSync: no listener captured');
      listener(event);
    },
    fireProjectsChanged: () => {
      const listener = networkEventListeners.get('platform.onDidChangeProjects');
      if (!listener) throw new Error('fireProjectsChanged: no listener captured');
      listener(undefined);
    },
    isWebViewOpenUnsubscribed: () => webViewOpenUnsubscribed,
    isWebViewUpdateUnsubscribed: () => webViewUpdateUnsubscribed,
    isSyncUnsubscribed: () =>
      unsubscribedNetworkEvents.has('paratextBibleSendReceive.onSyncStateChanged'),
    isProjectsChangedUnsubscribed: () =>
      unsubscribedNetworkEvents.has('platform.onDidChangeProjects'),
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
    expect(mockSendCommand.mock.calls.map(([cmd]) => cmd)).not.toContain(
      'platformScriptureEditor.openScriptureEditor',
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

  it('picks the editable project even when an Observer-only project has a newer lastSendReceiveDate', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          editableProject: {
            id: 'editableProject',
            name: 'Editable',
            fullName: 'Editable Project',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
          observerProject: {
            id: 'observerProject',
            name: 'Observer',
            fullName: 'Observer Project',
            language: 'en',
            editedStatus: 'edited',
            // Observer is *more recently* S/R'd than the editable one.
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('editableProject', true);
    setCanUserEditScripture('observerProject', false);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'editableProject',
    );
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'observerProject',
    );
  });

  // #region Single-project scenarios

  it('opens the only project when it is editable', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          only: {
            id: 'only',
            name: 'Only',
            fullName: 'Only Project',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('only', true);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'only',
    );
  });

  it("opens the only project when it has never been S/R'd", async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          neverSynced: {
            id: 'neverSynced',
            name: 'Never',
            fullName: 'Never Synced',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('neverSynced', true);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'neverSynced',
    );
  });

  it('opens the only project when it is Observer-only (lone-Observer fallback policy)', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          onlyObserver: {
            id: 'onlyObserver',
            name: 'OnlyObs',
            fullName: 'Only Observer Project',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('onlyObserver', false);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'onlyObserver',
    );
  });

  it.each([
    {
      label: "editedStatus 'new' (not yet downloaded)",
      info: {
        id: 'newProject',
        name: 'New',
        fullName: 'New Project',
        language: 'en',
        editedStatus: 'new',
        lastSendReceiveDate: '2026-05-19T00:00:00Z',
      },
    },
    {
      label: "editedStatus 'unregistered'",
      info: {
        id: 'unregProject',
        name: 'Unreg',
        fullName: 'Unregistered Project',
        language: 'en',
        editedStatus: 'unregistered',
        lastSendReceiveDate: '2026-05-19T00:00:00Z',
      },
    },
  ])("returns 'no-candidate' when the only project is filtered out by $label", async ({ info }) => {
    const { papi, mockGetSetting, mockGetAllOpenWebViewDefinitions, mockSendCommand } =
      createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return { [info.id]: info };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      info.id,
    );
  });

  // #endregion Single-project scenarios

  // #region Multi-project scenarios

  it('picks the newer-S/R editable project when both candidates are editable', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
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
            fullName: 'Older Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-18T00:00:00Z',
          },
          newer: {
            id: 'newer',
            name: 'Newer',
            fullName: 'Newer Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('older', true);
    setCanUserEditScripture('newer', true);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'newer',
    );
  });

  it("picks the S/R'd editable project over a never-synced editable project", async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          neverSynced: {
            id: 'neverSynced',
            name: 'Never',
            fullName: 'Never Synced',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '',
          },
          synced: {
            id: 'synced',
            name: 'Synced',
            fullName: 'Synced Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-18T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('neverSynced', true);
    setCanUserEditScripture('synced', true);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'synced',
    );
  });

  it('picks the older editable project when newer projects are all Observer-only', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          olderEditable: {
            id: 'olderEditable',
            name: 'OldEd',
            fullName: 'Older Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-15T00:00:00Z',
          },
          newerObserverA: {
            id: 'newerObserverA',
            name: 'NewObsA',
            fullName: 'Newer Observer A',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
          newerObserverB: {
            id: 'newerObserverB',
            name: 'NewObsB',
            fullName: 'Newer Observer B',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('olderEditable', true);
    setCanUserEditScripture('newerObserverA', false);
    setCanUserEditScripture('newerObserverB', false);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'olderEditable',
    );
  });

  it('falls back to the newest Observer-only project when all candidates are Observer-only', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          olderObserver: {
            id: 'olderObserver',
            name: 'Older',
            fullName: 'Older Observer',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-15T00:00:00Z',
          },
          newerObserver: {
            id: 'newerObserver',
            name: 'Newer',
            fullName: 'Newer Observer',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('olderObserver', false);
    setCanUserEditScripture('newerObserver', false);

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'newerObserver',
    );
  });

  it('filters editedStatus before role, then sorts editable by recency', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          notDownloaded: {
            id: 'notDownloaded',
            name: 'NotDl',
            fullName: 'Not Downloaded',
            language: 'en',
            editedStatus: 'new',
            lastSendReceiveDate: '2026-05-21T00:00:00Z',
          },
          unregistered: {
            id: 'unregistered',
            name: 'Unreg',
            fullName: 'Unregistered',
            language: 'en',
            editedStatus: 'unregistered',
            lastSendReceiveDate: '2026-05-21T00:00:00Z',
          },
          editableNewer: {
            id: 'editableNewer',
            name: 'EdNew',
            fullName: 'Editable Newer',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
          observerNewest: {
            id: 'observerNewest',
            name: 'ObsNew',
            fullName: 'Observer Newest',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-21T00:00:00Z',
          },
          editableOlder: {
            id: 'editableOlder',
            name: 'EdOld',
            fullName: 'Editable Older',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-15T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('editableNewer', true);
    setCanUserEditScripture('editableOlder', true);
    setCanUserEditScripture('observerNewest', false);
    // 'notDownloaded' and 'unregistered' should be filtered before role lookup; their role
    // mocks don't need to be set.

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'editableNewer',
    );
    expect(mockSendCommand).not.toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'observerNewest',
    );
  });

  // #endregion Multi-project scenarios

  // #region Error and edge cases

  it('treats a project whose canUserEditScripture rejects as Observer-only', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockProjectDataProvidersGet,
      setCanUserEditScripture,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          editable: {
            id: 'editable',
            name: 'Ed',
            fullName: 'Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
          throws: {
            id: 'throws',
            name: 'Throws',
            fullName: 'Throws Project',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    setCanUserEditScripture('editable', true);
    // Override the default `projectDataProviders.get` for the 'throws' id to return a PDP whose
    // canUserEditScripture rejects.
    mockProjectDataProvidersGet.mockImplementation(
      async (_interface: string, projectId: string) => {
        if (projectId === 'throws') {
          return {
            canUserEditScripture: async () => {
              throw new Error('simulated role-lookup failure');
            },
          };
        }
        return {
          canUserEditScripture: async () => projectId === 'editable',
        };
      },
    );

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'editable',
    );
  });

  it('treats a project whose projectDataProviders.get rejects as Observer-only', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockProjectDataProvidersGet,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          editable: {
            id: 'editable',
            name: 'Ed',
            fullName: 'Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
          unreachable: {
            id: 'unreachable',
            name: 'Unr',
            fullName: 'Unreachable Project',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    mockProjectDataProvidersGet.mockImplementation(
      async (_interface: string, projectId: string) => {
        if (projectId === 'unreachable') {
          throw new Error('simulated PDP-get failure');
        }
        return {
          canUserEditScripture: async () => projectId === 'editable',
        };
      },
    );

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'editable',
    );
  });

  it('treats a project whose PDP does not advertise scriptureEditPermissions as Observer-only', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockProjectDataProvidersGet,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          editable: {
            id: 'editable',
            name: 'Ed',
            fullName: 'Editable',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-19T00:00:00Z',
          },
          undefinedPdp: {
            id: 'undefinedPdp',
            name: 'NoIface',
            fullName: 'Project Without scriptureEditPermissions',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-05-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });
    // Simulate a PDP that doesn't advertise `platformScripture.scriptureEditPermissions` by
    // returning `undefined` from `projectDataProviders.get` for that id. The picker must treat
    // this case as Observer-equivalent rather than crashing.
    mockProjectDataProvidersGet.mockImplementation(
      async (_interface: string, projectId: string) => {
        if (projectId === 'undefinedPdp') return undefined;
        return {
          canUserEditScripture: async () => projectId === 'editable',
        };
      },
    );

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'editable',
    );
  });

  // #endregion Error and edge cases

  // #region Recents-first behavior (Tasks 2-4)

  it("returns 'filled' from recents and does not call S/R when a recent project opens", async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
      setRecentProjects,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['proj-recent']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor') return undefined;
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'proj-recent',
    );
    expect(mockSendCommand).not.toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-recent');
  });

  it('tries each recent project in order and opens the first one that succeeds', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
      setRecentProjects,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['proj-gone', 'proj-alive']);
    mockSendCommand.mockImplementation(async (commandName: string, projectId?: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor') {
        if (projectId === 'proj-gone') throw new Error('Project not found');
        return undefined;
      }
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledTimes(2);
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'proj-gone',
    );
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'proj-alive',
    );
    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-alive');
    expect(mockSendCommand).not.toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
  });

  it('falls through to S/R when all recent projects fail to open', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setRecentProjects,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['proj-gone']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor')
        throw new Error('Project not found');
      if (commandName === 'paratextBibleSendReceive.getSharedProjects')
        throw new Error('S/R not registered');
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-send-receive');
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
  });

  it('falls through to S/R when recentlyOpenedProjects service is unavailable', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockDataProvidersGet,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockDataProvidersGet.mockResolvedValue(undefined);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects')
        throw new Error('S/R not registered');
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-send-receive');
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
  });

  it('falls through to S/R when getRecentProjects throws after service is obtained', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecentProjectsGet,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    mockRecentProjectsGet.mockRejectedValueOnce(new Error('Storage read failed'));
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects')
        throw new Error('S/R not registered');
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-send-receive');
    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.getSharedProjects');
  });

  it("returns 'filled' even when recordProjectOpened throws in the recents path", async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockRecordProjectOpened,
      setRecentProjects,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['proj-recent']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor') return undefined;
      throw new Error(`Unexpected command in test: ${commandName}`);
    });
    mockRecordProjectOpened.mockRejectedValue(new Error('Storage write failed'));

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
  });

  // #endregion Recents-first behavior (Tasks 2-4)

  // #region Unsupported projects excluded from auto-open

  it('skips an unsupported recent project and opens the next one', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setRecentProjects,
      setUnsupportedIds,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['sba', 'p1']);
    setUnsupportedIds(['sba']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor') return undefined;
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'p1',
    );
    expect(
      mockSendCommand.mock.calls
        .filter(([cmd]) => cmd === 'platformScriptureEditor.openScriptureEditor')
        .map(([, id]) => id),
    ).toEqual(['p1']);
  });

  it('opens the first recent project when none is unsupported (positive control)', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setRecentProjects,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['sba', 'p1']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'platformScriptureEditor.openScriptureEditor') return undefined;
      throw new Error(`Unexpected command in test: ${commandName}`);
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'sba',
    );
  });

  it('never picks an unsupported shared project as the default, even the most recent', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setUnsupportedIds,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setUnsupportedIds(['sba']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          sba: {
            id: 'sba',
            name: 'SBA',
            fullName: 'SBA',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-09-20T00:00:00Z',
          },
          p1: {
            id: 'p1',
            name: 'P1',
            fullName: 'P1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-01-01T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'p1',
    );
  });

  it('reports no-candidate when the only shared project is unsupported', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      setUnsupportedIds,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setUnsupportedIds(['sba']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          sba: {
            id: 'sba',
            name: 'SBA',
            fullName: 'SBA',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-09-20T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('no-candidate');
  });

  it('never looks a candidate up twice in one run, even when it tries recents and then shared projects', async () => {
    const {
      papi,
      mockGetSetting,
      mockGetAllOpenWebViewDefinitions,
      mockSendCommand,
      mockGetMetadataForAllProjects,
      setRecentProjects,
      setUnsupportedIds,
    } = createPickerMocks();
    mockGetSetting.mockResolvedValue('simple');
    mockGetAllOpenWebViewDefinitions.mockResolvedValue(
      asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
    );
    setRecentProjects(['sba']);
    setUnsupportedIds(['sba']);
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
        return {
          sba: {
            id: 'sba',
            name: 'SBA',
            fullName: 'SBA',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-09-20T00:00:00Z',
          },
          p1: {
            id: 'p1',
            name: 'P1',
            fullName: 'P1',
            language: 'en',
            editedStatus: 'edited',
            lastSendReceiveDate: '2026-01-01T00:00:00Z',
          },
        };
      }
      return undefined;
    });

    const outcome = await openDefaultActiveProjectIfApplicable(papi);

    expect(outcome).toBe('filled');
    expect(mockSendCommand).toHaveBeenCalledWith(
      'platformScriptureEditor.openScriptureEditor',
      'p1',
    );
    expect(mockGetMetadataForAllProjects.mock.calls).toEqual([
      [{ includeProjectIds: ['sba'] }],
      [{ includeProjectIds: ['p1'] }],
    ]);
  });

  // #endregion Unsupported projects excluded from auto-open
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

// #region toScriptureEditorInfos

describe('toScriptureEditorInfos', () => {
  it('filters out web views that are not Scripture Editors', () => {
    const defs: SavedWebViewDefinition[] = [
      { id: 'editor-1', webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: 'PROJ_A' },
      { id: 'model-text', webViewType: 'platformScriptureEditor.modelText', projectId: 'PROJ_A' },
      { id: 'comments', webViewType: 'legacyCommentManager.commentListPanel' },
    ];
    expect(toScriptureEditorInfos(defs)).toEqual([
      { id: 'editor-1', projectId: 'PROJ_A', isReadOnly: false },
    ]);
  });

  it('maps id and projectId through, including an undefined projectId (empty editor slot)', () => {
    const defs: SavedWebViewDefinition[] = [
      { id: 'editor-empty', webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE },
    ];
    expect(toScriptureEditorInfos(defs)).toEqual([
      { id: 'editor-empty', projectId: undefined, isReadOnly: false },
    ]);
  });

  it('reads isReadOnly from state, defaulting to false when state or the flag is missing', () => {
    const defs: SavedWebViewDefinition[] = [
      {
        id: 'viewer',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'PROJ_A',
        state: { isReadOnly: true },
      },
      {
        id: 'editor',
        webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE,
        projectId: 'PROJ_B',
        state: { isReadOnly: false },
      },
      { id: 'no-state', webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: 'PROJ_C' },
      { id: 'no-flag', webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: 'PROJ_D', state: {} },
    ];
    expect(toScriptureEditorInfos(defs).map((e) => e.isReadOnly)).toEqual([
      true,
      false,
      false,
      false,
    ]);
  });

  it('returns an empty array for empty input', () => {
    expect(toScriptureEditorInfos([])).toEqual([]);
  });
});

// #endregion toScriptureEditorInfos

// #region selectProjectIdsForOpenMode

describe('selectProjectIdsForOpenMode', () => {
  it("returns only published project IDs when opening the Resource Viewer (mode='resourceViewer')", () => {
    const result = selectProjectIdsForOpenMode(
      [
        { projectId: 'ProjA', isPublished: true },
        { projectId: 'ProjB', isPublished: false },
        { projectId: 'ProjC', isPublished: true },
      ],
      'resourceViewer',
    );
    expect(result).toEqual(['ProjA', 'ProjC']);
  });

  it("returns only non-published project IDs when opening the Scripture Editor (mode='scriptureEditor')", () => {
    const result = selectProjectIdsForOpenMode(
      [
        { projectId: 'ProjA', isPublished: true },
        { projectId: 'ProjB', isPublished: false },
        { projectId: 'ProjC', isPublished: true },
        { projectId: 'ProjD', isPublished: false },
      ],
      'scriptureEditor',
    );
    expect(result).toEqual(['ProjB', 'ProjD']);
  });

  it('preserves the input order of matching projects', () => {
    const result = selectProjectIdsForOpenMode(
      [
        { projectId: 'ProjZ', isPublished: true },
        { projectId: 'ProjA', isPublished: true },
        { projectId: 'ProjM', isPublished: true },
      ],
      'resourceViewer',
    );
    expect(result).toEqual(['ProjZ', 'ProjA', 'ProjM']);
  });

  it('returns an empty array when no projects match the requested mode', () => {
    const allPublished = [
      { projectId: 'ProjA', isPublished: true },
      { projectId: 'ProjB', isPublished: true },
    ];
    expect(selectProjectIdsForOpenMode(allPublished, 'scriptureEditor')).toEqual([]);

    const allUnpublished = [
      { projectId: 'ProjA', isPublished: false },
      { projectId: 'ProjB', isPublished: false },
    ];
    expect(selectProjectIdsForOpenMode(allUnpublished, 'resourceViewer')).toEqual([]);
  });

  it('returns an empty array when given no projects', () => {
    expect(selectProjectIdsForOpenMode([], 'resourceViewer')).toEqual([]);
    expect(selectProjectIdsForOpenMode([], 'scriptureEditor')).toEqual([]);
  });
});

// #endregion selectProjectIdsForOpenMode

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

  it('re-runs the picker when the set of projects changes', async () => {
    const mocks = createPickerMocks();
    setUpFastNoOp(mocks);

    startDefaultProjectPicker(mocks.papi);
    await vi.waitFor(() => expect(mocks.mockGetSetting).toHaveBeenCalledTimes(1));

    mocks.fireProjectsChanged();

    await vi.waitFor(() => {
      expect(mocks.mockGetSetting).toHaveBeenCalledTimes(2);
    });
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
    expect(mocks.isProjectsChangedUnsubscribed()).toBe(true);
    expect(mocks.isNetworkObjectCreatedUnsubscribed()).toBe(true);
  });

  describe('when a project data provider factory registers after a lookup', () => {
    /**
     * Simple mode with an empty editor and one recent project, whose factory has not yet said it
     * cannot be opened. The mocked dock stays empty, so every trigger runs the picker in full.
     */
    function setUpBeforeTheFactoryRegisters(mocks: PickerMocks) {
      mocks.mockGetSetting.mockResolvedValue('simple');
      mocks.mockGetAllOpenWebViewDefinitions.mockResolvedValue(
        asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
      );
      mocks.setRecentProjects(['sba']);
      mocks.mockSendCommand.mockImplementation(async (commandName: string) =>
        commandName === 'paratextBibleSendReceive.getSharedProjects' ? {} : undefined,
      );
    }

    const openedProjectIds = (mocks: PickerMocks) =>
      mocks.mockSendCommand.mock.calls
        .filter(([commandName]) => commandName === 'platformScriptureEditor.openScriptureEditor')
        .map(([, projectId]) => projectId);

    it('looks up again, and no longer opens a project the factory reports cannot be opened', async () => {
      const mocks = createPickerMocks();
      setUpBeforeTheFactoryRegisters(mocks);

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(openedProjectIds(mocks)).toEqual(['sba']));
      mocks.setUnsupportedIds(['sba']);
      mocks.fireNetworkObjectCreated('pdpFactory');
      mocks.fireWebViewOpen();

      await vi.waitFor(() =>
        expect(mocks.mockDebug).toHaveBeenCalledWith(
          "Default active project picker: unexpected outcome received: 'no-candidate'",
        ),
      );
      expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2);
      expect(openedProjectIds(mocks)).toEqual(['sba']);
    });

    it('keeps its answers when a network object that is not a factory is created', async () => {
      const mocks = createPickerMocks();
      setUpBeforeTheFactoryRegisters(mocks);

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(openedProjectIds(mocks)).toEqual(['sba']));
      mocks.setUnsupportedIds(['sba']);
      mocks.fireNetworkObjectCreated('networkObject');
      mocks.fireWebViewOpen();

      await vi.waitFor(() => expect(openedProjectIds(mocks)).toEqual(['sba', 'sba']));
      expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1);
    });
  });

  describe('for a user whose only projects cannot be opened', () => {
    /** Simple mode with an empty editor that nothing can fill: every candidate is unsupported. */
    function setUpOnlyUnsupportedProjects(mocks: PickerMocks) {
      mocks.mockGetSetting.mockResolvedValue('simple');
      mocks.mockGetAllOpenWebViewDefinitions.mockResolvedValue(
        asWebViews([{ webViewType: SCRIPTURE_EDITOR_WEBVIEW_TYPE, projectId: undefined }]),
      );
      mocks.setRecentProjects(['sba']);
      mocks.setUnsupportedIds(['sba']);
      mocks.mockSendCommand.mockImplementation(async (commandName: string) => {
        if (commandName === 'paratextBibleSendReceive.getSharedProjects') {
          return {
            sba: {
              id: 'sba',
              name: 'SBA',
              fullName: 'SBA',
              language: 'en',
              editedStatus: 'edited',
              lastSendReceiveDate: '2026-09-20T00:00:00Z',
            },
          };
        }
        return undefined;
      });
    }

    it('looks up which projects cannot be opened once, however many triggers fire', async () => {
      const mocks = createPickerMocks();
      setUpOnlyUnsupportedProjects(mocks);

      // Each run ends by logging its outcome, so this counts completed runs.
      const finishedRuns = () =>
        mocks.mockDebug.mock.calls.filter(([message]) =>
          String(message).includes("unexpected outcome received: 'no-candidate'"),
        ).length;

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(finishedRuns()).toBe(1));
      mocks.fireSync({ isSyncing: false });
      await vi.waitFor(() => expect(finishedRuns()).toBe(2));
      mocks.fireSync({ isSyncing: false });
      await vi.waitFor(() => expect(finishedRuns()).toBe(3));

      expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1);
      expect(mocks.mockSendCommand).not.toHaveBeenCalledWith(
        'platformScriptureEditor.openScriptureEditor',
        expect.anything(),
      );
    });

    const sharedProjectsQueries = (mocks: PickerMocks) =>
      mocks.mockSendCommand.mock.calls.filter(
        ([commandName]) => commandName === 'paratextBibleSendReceive.getSharedProjects',
      ).length;

    /** Lets any run a trigger started finish, so a count that should not move has had the chance. */
    const settle = () =>
      new Promise((resolve) => {
        setTimeout(resolve, 20);
      });

    it('does not ask for shared projects again when an empty editor opens or updates', async () => {
      const mocks = createPickerMocks();
      setUpOnlyUnsupportedProjects(mocks);

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(sharedProjectsQueries(mocks)).toBe(1));
      mocks.fireWebViewOpen();
      mocks.fireWebViewUpdate();
      await settle();

      expect(sharedProjectsQueries(mocks)).toBe(1);
    });

    it.each([
      {
        label: 'a sync ends',
        fire: (mocks: PickerMocks) => mocks.fireSync({ isSyncing: false }),
      },
      {
        label: 'the set of projects changes',
        fire: (mocks: PickerMocks) => mocks.fireProjectsChanged(),
      },
      {
        label: 'a project data provider factory registers',
        fire: (mocks: PickerMocks) => {
          mocks.fireNetworkObjectCreated('pdpFactory');
          mocks.fireWebViewOpen();
        },
      },
      {
        // Opening a project records it as recent, which can give the next empty editor a candidate.
        label: 'a project opens in the editor',
        fire: (mocks: PickerMocks) =>
          mocks.fireWebViewUpdate(SCRIPTURE_EDITOR_WEBVIEW_TYPE, 'other-project'),
      },
    ])('asks for shared projects again once $label', async ({ fire }) => {
      const mocks = createPickerMocks();
      setUpOnlyUnsupportedProjects(mocks);

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(sharedProjectsQueries(mocks)).toBe(1));
      fire(mocks);

      await vi.waitFor(() => expect(sharedProjectsQueries(mocks)).toBe(2));
    });

    it('keeps reacting to a change of projects that lands while a run is finding no candidate', async () => {
      const mocks = createPickerMocks();
      setUpOnlyUnsupportedProjects(mocks);
      let releaseSharedProjects: () => void = () => {};
      const sendCommand = mocks.mockSendCommand.getMockImplementation();
      mocks.mockSendCommand.mockImplementationOnce(
        (commandName: string) =>
          new Promise((resolve) => {
            releaseSharedProjects = () => resolve(sendCommand?.(commandName));
          }),
      );

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(sharedProjectsQueries(mocks)).toBe(1));
      mocks.fireProjectsChanged();
      releaseSharedProjects();
      await vi.waitFor(() =>
        expect(mocks.mockDebug).toHaveBeenCalledWith(
          "Default active project picker: unexpected outcome received: 'no-candidate'",
        ),
      );
      mocks.fireWebViewOpen();

      await vi.waitFor(() => expect(sharedProjectsQueries(mocks)).toBe(2));
    });

    it('looks up again once the set of projects changes', async () => {
      const mocks = createPickerMocks();
      setUpOnlyUnsupportedProjects(mocks);

      startDefaultProjectPicker(mocks.papi);
      await vi.waitFor(() => expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1));
      mocks.fireProjectsChanged();

      await vi.waitFor(() => expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2));
    });

    it('looks up again after a failed lookup once the set of projects changes, without waiting out the retry delay', async () => {
      // Fake timers keep the clock from reaching the retry delay; `vi.waitFor` advances it by
      // only its polling interval.
      vi.useFakeTimers();
      try {
        const mocks = createPickerMocks();
        setUpOnlyUnsupportedProjects(mocks);
        mocks.mockGetMetadataForAllProjects.mockRejectedValueOnce(new Error('boom'));

        startDefaultProjectPicker(mocks.papi);
        await vi.waitFor(() =>
          expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(1),
        );
        mocks.fireProjectsChanged();

        await vi.waitFor(() =>
          expect(mocks.mockGetMetadataForAllProjects).toHaveBeenCalledTimes(2),
        );
      } finally {
        vi.useRealTimers();
      }
    });
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

/**
 * The two project settings a helper could consult to classify a project. `platform.isPublished` is
 * the one that tells a translation project from a published resource; `platform.isEditable` is a
 * project-wide switch on editing the Scripture text.
 */
type ProjectKind = { isEditable: boolean; isPublished: boolean };

const EDITABLE_PROJECT: ProjectKind = { isEditable: true, isPublished: false };
/** A translation project with editing switched off (`Editable=F`). */
const READ_ONLY_PROJECT: ProjectKind = { isEditable: false, isPublished: false };
const PUBLISHED_RESOURCE: ProjectKind = { isEditable: false, isPublished: true };

/**
 * A `papi.projectDataProviders.get` mock whose `platform.base` PDP reports each project's kind:
 * `projectKind` unless `setProjectKind` overrides it for that id. Both settings are always
 * supplied, so a helper that consulted the wrong one gets a real answer rather than an `undefined`
 * that happens to be falsy.
 */
function createProjectKindMocks(projectKind: ProjectKind) {
  // Per-project kinds, so a test can give two projects different answers and pin which one a
  // helper classifies.
  const projectKindsByProjectId = new Map<string, ProjectKind>();
  const setProjectKind = (projectId: string, kind: ProjectKind) => {
    projectKindsByProjectId.set(projectId, kind);
  };
  // `Promise<unknown>`, not the inferred `Promise<boolean>`, so a test can override a reading with
  // a value outside the setting's contract.
  const mockGetSetting = vi.fn(async (projectId: string, key: string): Promise<unknown> => {
    const kind = projectKindsByProjectId.get(projectId) ?? projectKind;
    if (key === 'platform.isEditable') return kind.isEditable;
    if (key === 'platform.isPublished') return kind.isPublished;
    throw new Error(`unexpected setting ${key}`);
  });
  const mockProjectDataProvidersGet = vi.fn(async (_interface: string, projectId: string) => ({
    getSetting: (key: string) => mockGetSetting(projectId, key),
  }));
  /**
   * Replaces only the `platform.isPublished` reading, leaving `platform.isEditable` as the project
   * kind reports it, so a helper that read the wrong setting still gets a real answer.
   */
  const overrideIsPublished = (reading: () => Promise<unknown>) => {
    const kindReading = mockGetSetting.getMockImplementation();
    mockGetSetting.mockImplementation(async (projectId, key) =>
      key === 'platform.isPublished' ? reading() : kindReading?.(projectId, key),
    );
  };
  return { mockGetSetting, mockProjectDataProvidersGet, setProjectKind, overrideIsPublished };
}

// #region syncOnProjectSwitch

/** Stubbed answer meaning "this read or request rejects" rather than resolving. */
const READ_THROWS = Symbol('read throws');

/**
 * What the project-switch reads answer: `finalizeProjectSwitch` reads the mode and passes it on,
 * and `syncOnProjectSwitch` (which takes the mode as an argument) requests consent. The option
 * names match the main-process task suites' `createSettingsStub`
 * (`src/main/settings-stub.test-util.ts`), which this workspace cannot import. Defaults are Simple
 * mode with consent granted, so assertions exercise syncing rather than the gate.
 */
type SyncGateStub = {
  /** `platform.interfaceMode` */
  mode?: 'simple' | 'power' | typeof READ_THROWS;
  /** The `platform.getAutomaticSyncConsent` command */
  consent?: 'granted' | 'unconfirmed' | 'unreadable' | 'deferred' | typeof READ_THROWS;
};

/**
 * The papi pieces the project-switch gate touches. `mockSendCommand` records only the sync
 * commands: the consent request is answered by `mockGetConsent` instead, so a test that replaces
 * `mockSendCommand`'s implementation still gets past the gate. A settings read of anything but the
 * mode throws, so a newly added read cannot pass unnoticed.
 */
function createSyncGateStubs({ mode = 'simple', consent = 'granted' }: SyncGateStub) {
  const mockSendCommand = vi.fn().mockResolvedValue(undefined);
  const mockGetConsent = vi.fn(async () => {
    if (consent === READ_THROWS) throw new Error('consent check unavailable');
    return consent;
  });
  const sendCommand = async (commandName: string, ...args: unknown[]) =>
    commandName === 'platform.getAutomaticSyncConsent'
      ? mockGetConsent()
      : mockSendCommand(commandName, ...args);
  const mockGetSetting = vi.fn(async (key: string) => {
    if (key !== 'platform.interfaceMode')
      throw new Error(`Unexpected settings key in test stub: ${key}`);
    if (mode === READ_THROWS) throw new Error('settings service unavailable');
    return mode;
  });
  return {
    sendCommand,
    mockSendCommand,
    mockGetConsent,
    mockGetSetting,
    mockWarn: vi.fn(),
    mockInfo: vi.fn(),
  };
}

function createSyncMockPapi(gate: SyncGateStub = {}, projectKind: ProjectKind = EDITABLE_PROJECT) {
  const { sendCommand, mockGetSetting, mockWarn, mockInfo, ...mocks } = createSyncGateStubs(gate);
  const { mockProjectDataProvidersGet, setProjectKind } = createProjectKindMocks(projectKind);
  // Must cast since the mock only includes the papi properties used by syncOnProjectSwitch.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    commands: { sendCommand },
    projectDataProviders: { get: mockProjectDataProvidersGet },
    logger: { warn: mockWarn, info: mockInfo },
    settings: { get: mockGetSetting },
  } as unknown as typeof PapiBackend;
  return { papi, mockWarn, mockInfo, mockProjectDataProvidersGet, setProjectKind, ...mocks };
}

/**
 * The sync commands `syncOnProjectSwitch` dispatches, in dispatch order: a shallower send/receive
 * of the outgoing project, then a deep sync of the incoming one.
 */
const PROJECT_SWITCH_SYNC_COMMANDS = [
  'paratextBibleSendReceive.sendReceiveProjects',
  'paratextBibleSendReceive.syncProjects',
];

describe('syncOnProjectSwitch', () => {
  it('calls syncProjects with the incoming project ID', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined, 'simple');

    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      ['proj-incoming'],
      true,
    );
  });

  it('keeps the progress toast for the incoming sync in Power mode', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined, 'power');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.syncProjects', [
      'proj-incoming',
    ]);
  });

  it('keeps the progress toast for the incoming sync when the mode is unknown', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined, undefined);

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.syncProjects', [
      'proj-incoming',
    ]);
  });

  it('calls sendReceiveProjects with only the outgoing project ID when provided, even in Simple mode', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-outgoing',
    ]);
  });

  it('syncs the incoming project last, so its result is the one reported', async () => {
    // These are two separate backend runs and the sync indicator reports the most recent one, so
    // whichever runs last decides the verdict the user sees. That has to be the project they
    // switched to rather than the one they left.
    const { papi, mockSendCommand } = createSyncMockPapi();
    const callOrder: string[] = [];
    mockSendCommand.mockImplementation(async (commandName: string) => {
      callOrder.push(commandName);
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(callOrder).toEqual([
      'paratextBibleSendReceive.sendReceiveProjects',
      'paratextBibleSendReceive.syncProjects',
    ]);
  });

  it('does not call sendReceiveProjects when outgoingProjectId is undefined', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined, 'simple');

    expect(mockSendCommand.mock.calls.map(([cmd]) => cmd)).not.toContain(
      'paratextBibleSendReceive.sendReceiveProjects',
    );
  });

  it('still syncs the incoming project when the outgoing flush throws', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.sendReceiveProjects')
        throw new Error('S/R failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      ['proj-incoming'],
      true,
    );
  });

  it('resolves without throwing when both syncs fail', async () => {
    const { papi, mockSendCommand } = createSyncMockPapi();
    mockSendCommand.mockRejectedValue(new Error('network error'));

    await expect(
      syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple'),
    ).resolves.toBeUndefined();
  });

  it('logs a warning when the incoming sync fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.syncProjects') throw new Error('sync failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', undefined, 'simple');

    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-incoming'));
  });

  it('logs a warning when the outgoing sync fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createSyncMockPapi();
    mockSendCommand.mockImplementation(async (commandName: string) => {
      if (commandName === 'paratextBibleSendReceive.sendReceiveProjects')
        throw new Error('S/R failed');
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-outgoing'));
  });

  it('still syncs an outgoing translation project with editing switched off', async () => {
    // `Editable=F` locks the Scripture text, not comments, so the project can hold new work.
    const { papi, mockSendCommand } = createSyncMockPapi({}, READ_ONLY_PROJECT);

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-outgoing',
    ]);
  });

  it('skips the outgoing sync for a published resource but still syncs the incoming project', async () => {
    const { papi, mockSendCommand, setProjectKind } = createSyncMockPapi();
    // Classifies the outgoing project, not the incoming one.
    setProjectKind('proj-outgoing', PUBLISHED_RESOURCE);

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand.mock.calls).toEqual([
      ['paratextBibleSendReceive.syncProjects', ['proj-incoming'], true],
    ]);
  });

  it('syncs the outgoing project when its kind cannot be read', async () => {
    // A resource is not synced by Send/Receive anyway, so failing open costs nothing, whereas
    // failing closed would leave a translation project's new comments unsent.
    const { papi, mockSendCommand, mockProjectDataProvidersGet } = createSyncMockPapi();
    mockProjectDataProvidersGet.mockRejectedValue(new Error('pdp unavailable'));

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-outgoing',
    ]);
  });

  it('sends both sync commands once first-run sync consent is granted', async () => {
    const { papi, mockSendCommand, mockGetConsent } = createSyncMockPapi();

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockGetConsent).toHaveBeenCalled();
    expect(mockSendCommand.mock.calls.map(([commandName]) => commandName)).toEqual(
      PROJECT_SWITCH_SYNC_COMMANDS,
    );
  });

  it.each([
    ['the first-run wizard has not been answered', 'unconfirmed'],
    ['the first-run flag cannot be read', 'unreadable'],
    ['the user chose "Don\'t sync yet" earlier this session', 'deferred'],
  ] as const)('syncs nothing while %s', async (_, consent) => {
    const { papi, mockSendCommand, mockInfo } = createSyncMockPapi({ consent });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).not.toHaveBeenCalled();
    // A silent skip is indistinguishable from a switch that never reached the sync, so the gate
    // must say it closed — at info, since packaged builds drop debug.
    expect(mockInfo).toHaveBeenCalledWith(
      `Project-switch sync skipped: first-run sync consent is ${consent}`,
    );
  });

  it('syncs nothing when the consent check rejects (fails closed)', async () => {
    const { papi, mockSendCommand, mockWarn } = createSyncMockPapi({ consent: READ_THROWS });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'simple');

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith(
      expect.stringContaining('could not check first-run sync consent'),
    );
  });

  it('does not consult the consent gate in power mode', async () => {
    // The first-run completion flag is never written outside Simple mode, so gating a power-mode
    // caller on it would suppress that caller's sync permanently.
    const { papi, mockSendCommand, mockGetConsent } = createSyncMockPapi({
      consent: 'unconfirmed',
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', 'power');

    expect(mockGetConsent).not.toHaveBeenCalled();
    expect(mockSendCommand.mock.calls.map(([commandName]) => commandName)).toEqual(
      PROJECT_SWITCH_SYNC_COMMANDS,
    );
  });

  it('still applies the consent gate when the caller could not read the interface mode', async () => {
    // An unreadable mode must not become a way past the gate.
    const { papi, mockSendCommand, mockGetConsent } = createSyncMockPapi({
      consent: 'unconfirmed',
    });

    await syncOnProjectSwitch(papi, 'proj-incoming', 'proj-outgoing', undefined);

    expect(mockGetConsent).toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
  });
});

// #endregion syncOnProjectSwitch

// #region syncOnSwitchToPower

/** Stubbed answer meaning "no such data provider is registered". */
const PROVIDER_MISSING = Symbol('provider missing');

/** A settled snapshot listing nothing in either direction. */
const NOTHING_UNSYNCED = { toSend: [], toReceive: [], isRechecking: false };

/**
 * The papi pieces the switch-to-Power sync touches. The unsynced-changes seed and the consent
 * request are answered by their own mocks, so `mockSendCommand` records only the Send/Receive call;
 * `emitUnsyncedChanges` delivers an `onUnsyncedChangesChanged` event to whoever is subscribed.
 */
function createSwitchToPowerMockPapi({
  mode = 'power',
  consent = 'granted',
  seed = NOTHING_UNSYNCED,
  internetUse = 'Enabled',
}: SyncGateStub & {
  seed?: unknown;
  /** The saved internet setting, a missing provider, or a read that rejects */
  internetUse?:
    | 'Enabled'
    | 'VpnRequired'
    | 'Disabled'
    | 'ProxyOnly'
    | typeof PROVIDER_MISSING
    | typeof READ_THROWS;
} = {}) {
  const { sendCommand, mockGetSetting, mockWarn, mockInfo, ...gateMocks } = createSyncGateStubs({
    mode,
    consent,
  });
  const mockGetUnsyncedChanges = vi.fn(async (): Promise<unknown> => seed);
  const listeners = new Set<(snapshot: unknown) => void>();
  const mockGetNetworkEvent = vi.fn(() => (listener: (snapshot: unknown) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  });
  const routedSendCommand = async (commandName: string, ...args: unknown[]) =>
    commandName === 'paratextBibleSendReceive.getUnsyncedChanges'
      ? mockGetUnsyncedChanges()
      : sendCommand(commandName, ...args);
  const mockGetInternetSettings = vi.fn(async () => {
    if (internetUse === READ_THROWS) throw new Error('internet settings unavailable');
    return { selectedServer: 'Production', permittedInternetUse: internetUse, proxyPort: 0 };
  });
  const mockDataProvidersGet = vi.fn(async (name: string) => {
    if (name !== 'paratextRegistration.internetSettingsDataProvider')
      throw new Error(`Unexpected data provider in test stub: ${name}`);
    return internetUse === PROVIDER_MISSING
      ? undefined
      : { getInternetSettings: mockGetInternetSettings };
  });
  // Must cast since the mock only includes the papi properties used by syncOnSwitchToPower.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    commands: { sendCommand: routedSendCommand },
    network: { getNetworkEvent: mockGetNetworkEvent },
    dataProviders: { get: mockDataProvidersGet },
    logger: { warn: mockWarn, info: mockInfo },
    settings: { get: mockGetSetting },
  } as unknown as typeof PapiBackend;
  return {
    papi,
    mockGetSetting,
    mockGetInternetSettings,
    mockWarn,
    mockInfo,
    mockGetUnsyncedChanges,
    mockGetNetworkEvent,
    emitUnsyncedChanges: (snapshot: unknown) => listeners.forEach((listener) => listener(snapshot)),
    subscriberCount: () => listeners.size,
    ...gateMocks,
  };
}

/** Lets the helper's seed request settle without moving fake time on. */
async function flushMicrotasks() {
  await vi.advanceTimersByTimeAsync(0);
}

/** Starts a wait and records its answer, so a test can tell a pending wait from a settled one. */
function startWaiting(papi: typeof PapiBackend, projectId: string) {
  const wait: { isSettled: boolean; answer?: boolean } = { isSettled: false };
  (async () => {
    wait.answer = await waitForUnsentChanges(papi, projectId);
    wait.isSettled = true;
  })();
  return wait;
}

describe('waitForUnsentChanges', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('answers true at once when the seed already lists the project, whatever its case', async () => {
    const { papi } = createSwitchToPowerMockPapi({
      seed: { toSend: ['PROJ-1'], toReceive: [], isRechecking: false },
    });

    // No time is advanced: a project already listed must not wait out the grace window.
    await expect(waitForUnsentChanges(papi, 'proj-1')).resolves.toBe(true);
  });

  it('answers true when the project is listed during the grace window', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi();

    const answer = waitForUnsentChanges(papi, 'proj-1');
    await flushMicrotasks();
    // The edit's save and the backend's debounced check land after the switch began
    emitUnsyncedChanges({ toSend: ['PROJ-1'], toReceive: [], isRechecking: false });

    await expect(answer).resolves.toBe(true);
  });

  it('answers false once the grace window passes with the project never listed', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi();
    const wait = startWaiting(papi, 'proj-1');

    await flushMicrotasks();
    // Another project's changes are no reason to sync this one
    emitUnsyncedChanges({ toSend: ['OTHER'], toReceive: [], isRechecking: false });
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS - 1);
    expect(wait.isSettled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);

    expect(wait).toEqual({ isSettled: true, answer: false });
  });

  it('waits out a running sync before deciding, then answers from what that sync left unsent', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi({
      seed: { toSend: [], toReceive: [], isRechecking: true },
    });
    const wait = startWaiting(papi, 'proj-1');

    await flushMicrotasks();
    // A sync can run far longer than the grace window; the answer is not "nothing unsent" yet
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS * 3);
    expect(wait.isSettled).toBe(false);
    emitUnsyncedChanges({ toSend: ['PROJ-1'], toReceive: [], isRechecking: false });
    await flushMicrotasks();

    expect(wait).toEqual({ isSettled: true, answer: true });
  });

  it('answers false after a running sync sent the project, once the grace window passes', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi({
      seed: { toSend: [], toReceive: [], isRechecking: true },
    });
    const wait = startWaiting(papi, 'proj-1');

    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS * 3);
    emitUnsyncedChanges(NOTHING_UNSYNCED);
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    expect(wait).toEqual({ isSettled: true, answer: false });
  });

  it('does not trust a listing taken while a sync is running', async () => {
    // A running sync parks the backend's checks, so a project it is about to send is still listed
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi({
      seed: { toSend: ['PROJ-1'], toReceive: [], isRechecking: true },
    });
    const wait = startWaiting(papi, 'proj-1');

    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS * 3);
    expect(wait.isSettled).toBe(false);
    emitUnsyncedChanges(NOTHING_UNSYNCED);
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    expect(wait).toEqual({ isSettled: true, answer: false });
  });

  it('restarts the grace window when a sync starts during it', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi();
    const wait = startWaiting(papi, 'proj-1');
    await flushMicrotasks();

    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS / 2);
    emitUnsyncedChanges({ toSend: [], toReceive: [], isRechecking: true });
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);
    expect(wait.isSettled).toBe(false);
    // Once the sync ends, a full window runs again before it answers
    emitUnsyncedChanges(NOTHING_UNSYNCED);
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS - 1);
    expect(wait.isSettled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);

    expect(wait).toEqual({ isSettled: true, answer: false });
  });

  it('ignores a seed that resolves after a newer event arrived', async () => {
    const { papi, emitUnsyncedChanges, mockGetUnsyncedChanges } = createSwitchToPowerMockPapi();
    let resolveSeed: (snapshot: unknown) => void = () => {};
    mockGetUnsyncedChanges.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveSeed = resolve;
        }),
    );
    const wait = startWaiting(papi, 'proj-1');
    await flushMicrotasks();

    // The event says a sync is running; the older seed must not override it
    emitUnsyncedChanges({ toSend: [], toReceive: [], isRechecking: true });
    resolveSeed({ toSend: ['PROJ-1'], toReceive: [], isRechecking: false });
    await flushMicrotasks();

    expect(wait.isSettled).toBe(false);
  });

  it('retries a seed of an unexpected shape like a seed that failed', async () => {
    const { papi, mockGetUnsyncedChanges } = createSwitchToPowerMockPapi();
    mockGetUnsyncedChanges
      .mockResolvedValueOnce({ toSend: undefined })
      .mockResolvedValueOnce({ toSend: ['PROJ-1'], toReceive: [], isRechecking: false });

    const answer = waitForUnsentChanges(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    await expect(answer).resolves.toBe(true);
  });

  it('answers undefined when a running sync never settles', async () => {
    const { papi, mockWarn } = createSwitchToPowerMockPapi({
      seed: { toSend: [], toReceive: [], isRechecking: true },
    });
    const wait = startWaiting(papi, 'proj-1');

    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_SYNC_WAIT_MS - 1);
    expect(wait.isSettled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);

    expect(wait).toEqual({ isSettled: true, answer: undefined });
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('still running'));
  });

  it('retries a seed request that rejects, as on a cold start', async () => {
    const { papi, mockGetUnsyncedChanges } = createSwitchToPowerMockPapi();
    mockGetUnsyncedChanges
      .mockRejectedValueOnce(new Error('not registered yet'))
      .mockResolvedValueOnce({ toSend: ['PROJ-1'], toReceive: [], isRechecking: false });

    const answer = waitForUnsentChanges(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    await expect(answer).resolves.toBe(true);
    expect(mockGetUnsyncedChanges).toHaveBeenCalledTimes(2);
  });

  it('answers from events when every seed request fails', async () => {
    const { papi, mockGetUnsyncedChanges, emitUnsyncedChanges, mockWarn } =
      createSwitchToPowerMockPapi();
    mockGetUnsyncedChanges.mockRejectedValue(new Error('backend down'));
    const wait = startWaiting(papi, 'proj-1');
    await flushMicrotasks();

    emitUnsyncedChanges(NOTHING_UNSYNCED);
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    expect(wait).toEqual({ isSettled: true, answer: false });
    expect(mockWarn).not.toHaveBeenCalledWith(expect.stringContaining('Could not tell'));
  });

  it('answers undefined at once when it cannot subscribe to the signal', async () => {
    const { papi, mockGetNetworkEvent, mockGetUnsyncedChanges, mockWarn } =
      createSwitchToPowerMockPapi();
    mockGetNetworkEvent.mockImplementation(() => {
      throw new Error('network not ready');
    });

    // No time is advanced: nothing must be left waiting on a signal it never subscribed to
    await expect(waitForUnsentChanges(papi, 'proj-1')).resolves.toBeUndefined();
    expect(mockGetUnsyncedChanges).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('could not subscribe'));
  });

  it('answers undefined when no snapshot can be read at all', async () => {
    const { papi, mockGetUnsyncedChanges, mockWarn } = createSwitchToPowerMockPapi();
    mockGetUnsyncedChanges.mockRejectedValue(new Error('backend down'));
    const wait = startWaiting(papi, 'proj-1');

    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    expect(wait).toEqual({ isSettled: true, answer: undefined });
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-1'));
  });

  it('ignores a snapshot of an unexpected shape', async () => {
    const { papi, emitUnsyncedChanges } = createSwitchToPowerMockPapi();
    const wait = startWaiting(papi, 'proj-1');

    await flushMicrotasks();
    emitUnsyncedChanges({ toSend: 'PROJ-1' });
    await flushMicrotasks();
    expect(wait.isSettled).toBe(false);
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);

    expect(wait).toEqual({ isSettled: true, answer: false });
  });

  it('unsubscribes once it has answered', async () => {
    const { papi, subscriberCount } = createSwitchToPowerMockPapi({
      seed: { toSend: ['PROJ-1'], toReceive: [], isRechecking: false },
    });

    await waitForUnsentChanges(papi, 'proj-1');

    expect(subscriberCount()).toBe(0);
  });
});

describe('syncOnSwitchToPower', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** A seed listing `proj-1` as holding local changes to send. */
  const PROJ_1_UNSENT = { toSend: ['PROJ-1'], toReceive: [], isRechecking: false };

  it('sends and receives the project when it holds unsent changes, keeping the Power-mode toasts', async () => {
    const { papi, mockSendCommand } = createSwitchToPowerMockPapi({ seed: PROJ_1_UNSENT });

    await syncOnSwitchToPower(papi, 'proj-1');

    // Exactly one argument: no `suppressNotification`, so the progress and failure toasts show
    expect(mockSendCommand.mock.calls).toEqual([
      ['paratextBibleSendReceive.sendReceiveProjects', ['proj-1']],
    ]);
  });

  it('starts no sync when the project holds nothing to send', async () => {
    const { papi, mockSendCommand, mockInfo } = createSwitchToPowerMockPapi();

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);
    await syncing;

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockInfo).toHaveBeenCalledWith(expect.stringContaining('proj-1'));
  });

  it('starts no sync when it cannot tell whether anything is unsent', async () => {
    const { papi, mockSendCommand, mockGetUnsyncedChanges } = createSwitchToPowerMockPapi();
    mockGetUnsyncedChanges.mockRejectedValue(new Error('backend down'));

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);
    await syncing;

    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it.each([
    ['the user chose "Don\'t sync yet" this session', 'deferred'],
    ['the first-run flag cannot be read (fails closed)', 'unreadable'],
  ] as const)('syncs nothing when %s', async (_, consent) => {
    const { papi, mockSendCommand, mockInfo } = createSwitchToPowerMockPapi({
      consent,
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockInfo).toHaveBeenCalledWith(
      `Switch-to-Power sync skipped: first-run sync consent is ${consent}`,
    );
  });

  it('syncs nothing when the user chooses "Don\'t sync yet" while it waits for unsent changes', async () => {
    const { papi, mockSendCommand, mockGetConsent, mockInfo, emitUnsyncedChanges } =
      createSwitchToPowerMockPapi({ consent: 'unconfirmed' });

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await flushMicrotasks();
    expect(mockGetConsent).toHaveBeenCalledTimes(1);
    mockGetConsent.mockResolvedValue('deferred');
    emitUnsyncedChanges(PROJ_1_UNSENT);
    await syncing;

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockInfo).toHaveBeenCalledWith(
      'Switch-to-Power sync skipped: first-run sync consent is deferred',
    );
  });

  it('does not log that consent lets the sync run when there turns out to be nothing to send', async () => {
    const { papi, mockInfo } = createSwitchToPowerMockPapi({ consent: 'unconfirmed' });

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);
    await syncing;

    expect(mockInfo).toHaveBeenCalledWith(expect.stringContaining('no changes to send'));
    expect(mockInfo).not.toHaveBeenCalledWith(expect.stringContaining('does not stop this sync'));
  });

  it('syncs when first-run consent is unconfirmed, as for a user who started in Power mode', async () => {
    // Only the Simple-mode wizard records consent, and it never shows on a live switch to Simple,
    // so a Power-native user who visits Simple reads `unconfirmed` for the whole session.
    const { papi, mockSendCommand, mockInfo } = createSwitchToPowerMockPapi({
      consent: 'unconfirmed',
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-1',
    ]);
    // Every other automatic sync would skip here, so the log has to say why this one ran
    expect(mockInfo).toHaveBeenCalledWith(expect.stringContaining('does not stop this sync'));
  });

  it('syncs nothing when the consent check rejects (fails closed)', async () => {
    const { papi, mockSendCommand, mockWarn } = createSwitchToPowerMockPapi({
      consent: READ_THROWS,
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith(
      expect.stringContaining('could not check first-run sync consent'),
    );
  });

  it('syncs nothing when the user is back in Simple mode by the time it would start', async () => {
    // The switch back to Simple makes its own sync decision; a second, overlapping sync would be
    // refused by the backend.
    const { papi, mockSendCommand } = createSwitchToPowerMockPapi({
      mode: 'simple',
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('syncs nothing when the interface mode cannot be read', async () => {
    const { papi, mockSendCommand } = createSwitchToPowerMockPapi({
      mode: READ_THROWS,
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('starts one sync when a second switch arrives while the first is still deciding', async () => {
    const { papi, mockSendCommand, emitUnsyncedChanges } = createSwitchToPowerMockPapi();

    const first = syncOnSwitchToPower(papi, 'proj-1');
    await flushMicrotasks();
    const second = syncOnSwitchToPower(papi, 'PROJ-1');
    await flushMicrotasks();
    emitUnsyncedChanges(PROJ_1_UNSENT);
    await Promise.all([first, second]);

    expect(mockSendCommand.mock.calls).toEqual([
      ['paratextBibleSendReceive.sendReceiveProjects', ['proj-1']],
    ]);
  });

  it('decides afresh for a switch that comes after the first has finished deciding', async () => {
    const { papi, mockSendCommand } = createSwitchToPowerMockPapi({ seed: PROJ_1_UNSENT });

    await syncOnSwitchToPower(papi, 'proj-1');
    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).toHaveBeenCalledTimes(2);
  });

  it('reads the mode when the sync would start, not when the switch began', async () => {
    const { papi, mockSendCommand, mockGetSetting, emitUnsyncedChanges } =
      createSwitchToPowerMockPapi();

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await flushMicrotasks();
    // The user goes back to Simple while the wait is still open
    mockGetSetting.mockResolvedValue('simple');
    emitUnsyncedChanges(PROJ_1_UNSENT);
    await syncing;

    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('resolves without syncing when the project id is not a string', async () => {
    // Any PAPI client can send the command, so its argument is not guaranteed to match the type
    const { papi, mockSendCommand, mockWarn } = createSwitchToPowerMockPapi({
      seed: PROJ_1_UNSENT,
    });

    // Must cast to send what a malformed request would carry.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    await expect(syncOnSwitchToPower(papi, 42 as unknown as string)).resolves.toBeUndefined();

    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalled();
  });

  it.each(['VpnRequired', 'Disabled'] as const)(
    'syncs nothing while the internet setting is %s, which turns Send/Receive off',
    async (internetUse) => {
      const { papi, mockSendCommand, mockInfo } = createSwitchToPowerMockPapi({
        internetUse,
        seed: PROJ_1_UNSENT,
      });

      await syncOnSwitchToPower(papi, 'proj-1');

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockInfo).toHaveBeenCalledWith(expect.stringContaining(internetUse));
    },
  );

  it('syncs when the internet setting is ProxyOnly, which Send/Receive allows', async () => {
    const { papi, mockSendCommand } = createSwitchToPowerMockPapi({
      internetUse: 'ProxyOnly',
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-1',
    ]);
  });

  it.each([
    ['the internet settings provider is missing', PROVIDER_MISSING],
    ['the internet settings cannot be read', READ_THROWS],
  ] as const)('leaves the decision to Send/Receive when %s', async (_, internetUse) => {
    // Send/Receive enforces the setting itself, so skipping here would only drop the sync for a
    // user whose internet is on
    const { papi, mockSendCommand, mockWarn } = createSwitchToPowerMockPapi({
      internetUse,
      seed: PROJ_1_UNSENT,
    });

    await syncOnSwitchToPower(papi, 'proj-1');

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.sendReceiveProjects', [
      'proj-1',
    ]);
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('internet setting'));
  });

  it('does not read the internet setting when there is nothing to send', async () => {
    const { papi, mockGetInternetSettings } = createSwitchToPowerMockPapi();

    const syncing = syncOnSwitchToPower(papi, 'proj-1');
    await vi.advanceTimersByTimeAsync(UNSENT_CHANGES_GRACE_MS);
    await syncing;

    expect(mockGetInternetSettings).not.toHaveBeenCalled();
  });

  it('resolves and warns when the sync fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createSwitchToPowerMockPapi({
      seed: PROJ_1_UNSENT,
    });
    mockSendCommand.mockRejectedValue(new Error('offline'));

    await expect(syncOnSwitchToPower(papi, 'proj-1')).resolves.toBeUndefined();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-1'));
  });
});

// #endregion syncOnSwitchToPower

// #region finalizeProjectSwitch

const GRID_WEBVIEW_ID = 'text-collection-1';

// `finalizeProjectSwitch` reads the interface mode itself and dispatches `syncOnProjectSwitch`, which
// reads it too and checks consent. The Simple-mode default matches the common case: the switch this
// replays side effects for only ever originates from a Power -> Simple mode change.
function createFinalizeMockPapi(
  gate: SyncGateStub = {},
  projectKind: ProjectKind = EDITABLE_PROJECT,
) {
  const { mockProjectDataProvidersGet } = createProjectKindMocks(projectKind);
  const { sendCommand, mockGetSetting, mockWarn, mockInfo, ...mocks } = createSyncGateStubs(gate);
  const mockRecordProjectOpened = vi.fn().mockResolvedValue(undefined);
  const mockDataProvidersGet = vi.fn().mockImplementation(async (name: string) => {
    if (name === 'platformScripture.recentlyOpenedProjects') {
      return { recordProjectOpened: mockRecordProjectOpened };
    }
    return undefined;
  });
  // The Text Collection re-point runs from here, so the mock needs a webViews surface; without one
  // it would take the swallowed-failure path and the assertions below would pass vacuously.
  const mockGetAllOpenWebViewDefinitions = vi
    .fn()
    .mockResolvedValue([
      { id: GRID_WEBVIEW_ID, webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE, projectId: undefined },
    ]);
  // Resolves an id: `reloadWebView` returning undefined means the re-point did not take, which is
  // reported as an error.
  const mockReloadWebView = vi.fn().mockResolvedValue(GRID_WEBVIEW_ID);
  const mockError = vi.fn();
  // Must cast since the mock only includes the papi properties finalizeProjectSwitch uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    commands: { sendCommand },
    dataProviders: { get: mockDataProvidersGet },
    projectDataProviders: { get: mockProjectDataProvidersGet },
    settings: { get: mockGetSetting },
    webViews: {
      getAllOpenWebViewDefinitions: mockGetAllOpenWebViewDefinitions,
      reloadWebView: mockReloadWebView,
    },
    logger: { warn: mockWarn, info: mockInfo, error: mockError },
  } as unknown as typeof PapiBackend;
  return {
    papi,
    mockWarn,
    mockInfo,
    mockError,
    mockRecordProjectOpened,
    mockDataProvidersGet,
    mockGetAllOpenWebViewDefinitions,
    mockReloadWebView,
    ...mocks,
  };
}

describe('finalizeProjectSwitch', () => {
  it('syncs the incoming project only via syncProjects (finalizeProjectSwitch has no outgoing project by design)', async () => {
    const { papi, mockSendCommand } = createFinalizeMockPapi();

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      ['proj-1'],
      true,
    );
    expect(mockSendCommand.mock.calls.map(([cmd]) => cmd)).not.toContain(
      'paratextBibleSendReceive.sendReceiveProjects',
    );
  });

  it('keeps the progress toast when the user has switched back to Power mode', async () => {
    const { papi, mockSendCommand } = createFinalizeMockPapi({ mode: 'power' });

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.syncProjects', [
      'proj-1',
    ]);
  });

  it('still syncs, with the progress toast, when the mode read rejects', async () => {
    const { papi, mockSendCommand, mockWarn } = createFinalizeMockPapi({ mode: READ_THROWS });

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockSendCommand).toHaveBeenCalledWith('paratextBibleSendReceive.syncProjects', [
      'proj-1',
    ]);
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('platform.interfaceMode'));
  });

  it('skips the Simple-only work but still records the project when the mode read rejects', async () => {
    const { papi, mockReloadWebView, mockRecordProjectOpened } = createFinalizeMockPapi({
      mode: READ_THROWS,
    });
    const applyForProject = vi.fn().mockResolvedValue(undefined);

    await finalizeProjectSwitch(papi, 'proj-1', applyForProject);

    expect(mockReloadWebView).not.toHaveBeenCalled();
    expect(applyForProject).not.toHaveBeenCalled();
    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-1');
  });

  it('does not await the sync before returning - a hung sync must not block applyForProject or recordProjectOpened', async () => {
    const { papi, mockSendCommand, mockRecordProjectOpened } = createFinalizeMockPapi();
    // Never resolves - simulates a slow/hung Send/Receive.
    mockSendCommand.mockImplementation(() => new Promise(() => {}));
    const applyForProject = vi.fn().mockResolvedValue(undefined);

    await finalizeProjectSwitch(papi, 'proj-1', applyForProject);

    expect(applyForProject).toHaveBeenCalledWith('proj-1');
    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-1');
  });

  it('re-points a Text Collection that arrives without a project', async () => {
    // The renderer normally bakes the project into the grid's tab before this runs; this is the
    // safety net for a caller that skips the bake.
    const { papi, mockReloadWebView } = createFinalizeMockPapi();

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockReloadWebView).toHaveBeenCalledWith(
      SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
      GRID_WEBVIEW_ID,
      { projectId: 'proj-1', bringToFront: false },
    );
  });

  it('does not re-point the Text Collection at a published resource', async () => {
    // The same rule as the editor-column switch, applied through the same function.
    const { papi, mockReloadWebView } = createFinalizeMockPapi({}, PUBLISHED_RESOURCE);

    await finalizeProjectSwitch(papi, 'resource-1', undefined);

    expect(mockReloadWebView).not.toHaveBeenCalled();
  });

  it('re-points the Text Collection before the shared layout picks the front tab', async () => {
    const { papi, mockReloadWebView } = createFinalizeMockPapi();
    const order: string[] = [];
    mockReloadWebView.mockImplementation(async () => {
      order.push('reload');
    });
    const applyForProject = vi.fn().mockImplementation(async () => {
      order.push('applyForProject');
    });

    await finalizeProjectSwitch(papi, 'proj-1', applyForProject);

    expect(order).toEqual(['reload', 'applyForProject']);
  });

  it('does not re-point the Text Collection once the user is back in Power mode', async () => {
    const { papi, mockReloadWebView } = createFinalizeMockPapi({ mode: 'power' });

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockReloadWebView).not.toHaveBeenCalled();
  });

  it('calls applyForProject when still in Simple mode', async () => {
    const { papi } = createFinalizeMockPapi();
    const applyForProject = vi.fn().mockResolvedValue(undefined);

    await finalizeProjectSwitch(papi, 'proj-1', applyForProject);

    expect(applyForProject).toHaveBeenCalledWith('proj-1');
  });

  it('does not call applyForProject when the user has since switched back to Power mode', async () => {
    const { papi } = createFinalizeMockPapi({ mode: 'power' });
    const applyForProject = vi.fn().mockResolvedValue(undefined);

    await finalizeProjectSwitch(papi, 'proj-1', applyForProject);

    expect(applyForProject).not.toHaveBeenCalled();
  });

  it('does not throw when applyForProject is undefined', async () => {
    const { papi } = createFinalizeMockPapi();

    await expect(finalizeProjectSwitch(papi, 'proj-1', undefined)).resolves.toBeUndefined();
  });

  it('records the project as recently opened', async () => {
    const { papi, mockRecordProjectOpened } = createFinalizeMockPapi();

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-1');
  });

  it('records the project as recently opened even when no longer in Simple mode', async () => {
    const { papi, mockRecordProjectOpened } = createFinalizeMockPapi({ mode: 'power' });

    await finalizeProjectSwitch(papi, 'proj-1', undefined);

    expect(mockRecordProjectOpened).toHaveBeenCalledWith('proj-1');
  });

  it('logs a warning and does not throw when recordProjectOpened rejects', async () => {
    const { papi, mockWarn, mockRecordProjectOpened } = createFinalizeMockPapi();
    mockRecordProjectOpened.mockRejectedValue(new Error('storage write failed'));

    await expect(finalizeProjectSwitch(papi, 'proj-1', undefined)).resolves.toBeUndefined();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('proj-1'));
  });
});

// #endregion finalizeProjectSwitch

// isBlockMarker moved to platform-bible-utils (src/markers/usfm-markers.ts); its tests live in
// lib/platform-bible-utils/src/markers/usfm-markers.test.ts.

describe('generateParagraphMenuListItems', () => {
  it('when protected: action notifies and does not call formatPara', () => {
    const { ref, formatPara } = makeMockEditorRef();
    const notify = vi.fn();
    const items = generateParagraphMenuListItems(ref, {}, true, notify);

    expect(items.length).toBeGreaterThan(0);
    items[0].action?.();

    expect(notify).toHaveBeenCalledTimes(1);
    expect(formatPara).not.toHaveBeenCalled();
  });

  it('when not protected: action calls formatPara and does not notify', () => {
    const { ref, formatPara } = makeMockEditorRef();
    const notify = vi.fn();
    const items = generateParagraphMenuListItems(ref, {}, false, notify);

    const item = items[0];
    item.action?.();

    expect(formatPara).toHaveBeenCalledTimes(1);
    expect(formatPara).toHaveBeenCalledWith(item.marker);
    expect(notify).not.toHaveBeenCalled();
  });

  it("skips formatPara when the pick is the selected paragraph marker's own marker", () => {
    const { ref, formatPara, getSelectedParaMarker } = makeMockEditorRef();
    getSelectedParaMarker.mockReturnValue('q1');
    const restoreSelection = vi.fn();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn(), restoreSelection);

    items.find((item) => item.marker === 'q1')?.action?.();
    expect(formatPara).not.toHaveBeenCalled();
    expect(restoreSelection).not.toHaveBeenCalled();

    items.find((item) => item.marker === 'p')?.action?.();
    expect(formatPara).toHaveBeenCalledWith('p');
  });

  it('while a chapter is loading: action does not call formatPara or restore the selection', () => {
    const { ref, formatPara } = makeMockEditorRef();
    const restoreSelection = vi.fn();
    const items = generateParagraphMenuListItems(
      ref,
      {},
      false,
      vi.fn(),
      restoreSelection,
      () => true,
    );

    items[0].action?.();

    expect(formatPara).not.toHaveBeenCalled();
    expect(restoreSelection).not.toHaveBeenCalled();
  });

  // Equality, not spot checks: a partial-match assertion would miss both a marker silently dropped
  // from the offered set and an extra one silently added.
  it("offers exactly selectableParagraphMarkers' markers, matching neither more nor fewer", () => {
    const { ref } = makeMockEditorRef();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn());

    expect(items.map((item) => item.marker).sort()).toEqual([...selectableParagraphMarkers].sort());
  });

  it('offers li2, s1, bare q, lh, b, and cp, and excludes id and c', () => {
    const { ref } = makeMockEditorRef();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn());
    const markers = items.map((item) => item.marker);

    expect(markers).toContain('li2');
    expect(markers).toContain('s1');
    expect(markers).toContain('q'); // bare `q`, distinct from `q1`
    expect(markers).toContain('lh');
    expect(markers).toContain('b');
    expect(markers).toContain('cp'); // genuine paragraph-style marker in USFM, unlike `c`
    expect(markers).not.toContain('id'); // programmatically-applied only
    expect(markers).not.toContain('c'); // programmatically-applied only
  });

  it('fills the detail column from the marker description, so the paragraph menu is not the one menu with an empty second column', () => {
    const { ref } = makeMockEditorRef();
    const items = generateParagraphMenuListItems(
      ref,
      {
        '%paragraphMenu_p_markerDescription%': 'Paragraph',
        '%markerMenu_marker_p_description%': 'Normal paragraph',
      },
      false,
      vi.fn(),
    );

    const paragraphItem = items.find((item) => item.marker === 'p');

    expect(paragraphItem?.title).toBe('Paragraph');
    expect(paragraphItem?.subtitle).toBe('Normal paragraph');
  });

  it('leaves the detail column empty while the description strings are still loading, rather than showing a raw localize key', () => {
    // The web view loads every marker description asynchronously, so this is the real state for the
    // first frames after mount — not a hypothetical.
    const { ref } = makeMockEditorRef();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn());

    expect(items.length).toBeGreaterThan(0);
    items.forEach((item) => {
      expect(item.subtitle).toBeUndefined();
    });
  });

  it('falls back to the bare marker code for the title while its description string is still loading, never a raw localize key', () => {
    const { ref } = makeMockEditorRef();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn());

    const paragraphItem = items.find((item) => item.marker === 'p');

    expect(paragraphItem?.title).toBe('p');
    items.forEach((item) => {
      expect(item.title).not.toMatch(/^%.*%$/);
    });
  });

  it('restores the caret before formatting, so a pick made after the menu took focus still lands', () => {
    const { ref, formatPara } = makeMockEditorRef();
    const restoreSelection = vi.fn();
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn(), restoreSelection);

    const item = items[0];
    item.action?.();

    expect(restoreSelection).toHaveBeenCalledTimes(1);
    expect(formatPara).toHaveBeenCalledWith(item.marker);
    // Order is the whole point: opening the menu can leave the editor with no selection, and
    // `formatPara` has nothing to retag then — restoring after the apply would be too late.
    expect(restoreSelection.mock.invocationCallOrder[0]).toBeLessThan(
      formatPara.mock.invocationCallOrder[0],
    );
  });

  it('does not restore an older caret, and still calls formatPara, while a paragraph marker is selected', () => {
    // Wired as the web view wires it: the real restore, over an editor whose gutter marker is
    // selected. A selected marker has no text range, and the caret captured before it was selected
    // is in another paragraph — restoring it would make `formatPara` retag that paragraph instead.
    const olderCaret: SelectionRange = {
      start: { jsonPath: '$.content[2].content[1]', offset: 5 },
    };
    const { ref, formatPara, setSelection } = makeMockEditorRef('q1');
    const items = generateParagraphMenuListItems(ref, {}, false, vi.fn(), () =>
      restoreSelectionIfLost(ref.current, olderCaret),
    );

    const item = items[0];
    item.action?.();

    expect(setSelection).not.toHaveBeenCalled();
    expect(formatPara).toHaveBeenCalledWith(item.marker);
  });

  it('when protected: does not restore the caret either (nothing is applied)', () => {
    const { ref, formatPara } = makeMockEditorRef();
    const restoreSelection = vi.fn();
    const items = generateParagraphMenuListItems(ref, {}, true, vi.fn(), restoreSelection);

    items[0].action?.();

    expect(restoreSelection).not.toHaveBeenCalled();
    expect(formatPara).not.toHaveBeenCalled();
  });

  // One position language (host Standard-View-Invariants §6): a selected paragraph marker is a
  // node selection with no offsets, so a retag from it must reach the editor as `formatPara` alone.
  // The host never turns the selection into a position by restoring a caret over it. Wires the real
  // restore the web view passes in, rather than a spy, so a restore that stops honoring the marker
  // selection fails here.
  describe('with a paragraph marker selected', () => {
    const lastFocusOutSelection: SelectionRange = {
      start: { jsonPath: '$.content[2].content[0]', offset: 7 },
    };

    function makeEditorWithSelectionState(selectedParaMarker: string | undefined) {
      const formatPara = vi.fn();
      const setSelection = vi.fn();
      const editor = {
        formatPara,
        setSelection,
        // A USJ selection is a text range, so it reports nothing while a marker is selected — and
        // nothing after a popover blur nulled the caret.
        getSelection: vi.fn((): SelectionRange | undefined => undefined),
        getSelectedParaMarker: vi.fn((): string | undefined => selectedParaMarker),
      };
      // Mock literal cannot satisfy the full EditorRef interface — cast for test isolation.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const ref = { current: editor } as unknown as MutableRefObject<EditorRef | null>;
      const items = generateParagraphMenuListItems(ref, {}, false, vi.fn(), () =>
        restoreSelectionIfLost(ref.current, lastFocusOutSelection),
      );
      return { items, formatPara, setSelection };
    }

    it('restores the lost caret when no marker is selected (control)', () => {
      const { items, formatPara, setSelection } = makeEditorWithSelectionState(undefined);

      items[0].action?.();

      expect(setSelection).toHaveBeenCalledWith(lastFocusOutSelection);
      expect(formatPara).toHaveBeenCalledWith(items[0].marker);
    });

    it('retags through formatPara without ever setting a selection position', () => {
      const { items, formatPara, setSelection } = makeEditorWithSelectionState('li2');
      const item = items.find((menuItem) => menuItem.marker === 'q1');

      item?.action?.();

      expect(formatPara).toHaveBeenCalledTimes(1);
      expect(formatPara).toHaveBeenCalledWith('q1');
      expect(setSelection).not.toHaveBeenCalled();
    });
  });
});

describe('selectableParagraphMarkers', () => {
  it('includes every USFM paragraph-style marker that a user can validly apply directly', () => {
    expect(selectableParagraphMarkers).toContain('li2');
    expect(selectableParagraphMarkers).toContain('s1');
    expect(selectableParagraphMarkers).toContain('q'); // bare `q`, distinct from `q1`
    expect(selectableParagraphMarkers).toContain('q3');
    expect(selectableParagraphMarkers).toContain('lh');
    expect(selectableParagraphMarkers).toContain('b');
    expect(selectableParagraphMarkers).toContain('h'); // Headers category — deliberately not excluded
    expect(selectableParagraphMarkers).toContain('cl'); // DivisionMarks category — deliberately not excluded
    expect(selectableParagraphMarkers).toContain('cp'); // genuine paragraph-style marker in USFM, unlike `c`
  });

  // The confirmed, deliberate exclusions (see the comment on PROGRAMMATICALLY_APPLIED_PARAGRAPH_MARKERS):
  it('excludes id and c even though isParagraphMarker is true for both', () => {
    expect(selectableParagraphMarkers).not.toContain('id');
    expect(selectableParagraphMarkers).not.toContain('c');
  });

  it('excludes markers that are not paragraph markers', () => {
    expect(selectableParagraphMarkers).not.toContain('v'); // Character, special-cased by isBlockMarker only
    expect(selectableParagraphMarkers).not.toContain('nd'); // Character
    expect(selectableParagraphMarkers).not.toContain('qs'); // Character
    expect(selectableParagraphMarkers).not.toContain('qac'); // Character
  });

  it('PROGRAMMATICALLY_APPLIED_PARAGRAPH_MARKERS contains id and c', () => {
    expect(PROGRAMMATICALLY_APPLIED_PARAGRAPH_MARKERS.has('id')).toBe(true);
    expect(PROGRAMMATICALLY_APPLIED_PARAGRAPH_MARKERS.has('c')).toBe(true);
  });
});

describe('hasDisplayableParagraphMarkerTitle', () => {
  it('is true for every marker offered by the switcher', () => {
    expect(
      selectableParagraphMarkers.every((marker) => hasDisplayableParagraphMarkerTitle(marker)),
    ).toBe(true);
  });

  // `id` and `c` are applied through their own dedicated mechanisms and must never be a switcher
  // choice, but the trigger label and gutter tooltip should still name one when the caret/selection
  // is actually on it, rather than falling back to the generic "Miscellaneous Marker" text or a raw
  // marker echo.
  it('is true for id and c even though both are excluded from selectableParagraphMarkers', () => {
    expect(selectableParagraphMarkers).not.toContain('id');
    expect(selectableParagraphMarkers).not.toContain('c');
    expect(hasDisplayableParagraphMarkerTitle('id')).toBe(true);
    expect(hasDisplayableParagraphMarkerTitle('c')).toBe(true);
  });

  it('is false for a marker with no title at all', () => {
    expect(hasDisplayableParagraphMarkerTitle('notamarker')).toBe(false);
  });
});

describe('getParagraphMarkerTitle', () => {
  it("resolves id's title once loaded, even though id is not offered by the switcher", () => {
    expect(
      getParagraphMarkerTitle('id', { '%paragraphMenu_id_markerDescription%': 'Book identifier' }),
    ).toBe('Book identifier');
  });

  it("leaves id's title undefined while its string is still loading", () => {
    expect(getParagraphMarkerTitle('id', {})).toBeUndefined();
  });

  it('returns undefined for a marker with no title available at all', () => {
    expect(getParagraphMarkerTitle('notamarker', {})).toBeUndefined();
  });
});

describe('isChapterBlank', () => {
  const emptyUsj: Usj = { type: USJ_TYPE, version: USJ_VERSION, content: [] };

  it('returns true when the chapter has no content at all', () => {
    expect(isChapterBlank(emptyUsj)).toBe(true);
  });

  it('returns false when the chapter has a chapter marker but no verses (avoids a duplicate \\c on click)', () => {
    const usj: Usj = {
      ...emptyUsj,
      content: [{ type: 'chapter', marker: 'c', number: '1' }],
    };
    expect(isChapterBlank(usj)).toBe(false);
  });

  it('returns false when a verse node exists at the top level', () => {
    const usj: Usj = {
      ...emptyUsj,
      content: [{ type: 'verse', marker: 'v', number: '1' }],
    };
    expect(isChapterBlank(usj)).toBe(false);
  });

  it('returns false when a verse node is nested inside a paragraph', () => {
    const usj: Usj = {
      ...emptyUsj,
      content: [
        { type: 'chapter', marker: 'c', number: '1' },
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '1' }, 'Some text'],
        },
      ],
    };
    expect(isChapterBlank(usj)).toBe(false);
  });
});

describe('isBlankChapterOnScreen', () => {
  const emptyUsj: Usj = { type: USJ_TYPE, version: USJ_VERSION, content: [] };

  it('reports a real chapter with no content as blank', () => {
    expect(isBlankChapterOnScreen(emptyUsj, 1)).toBe(true);
  });

  it("never calls a book's front matter a blank chapter", () => {
    // Chapter 0 addresses the material before `\c 1` — `\id`, `\h`, `\toc`, `\mt`, `\ip` — which
    // carries neither a chapter nor a verse node, so `isChapterBlank` alone reports it blank and the
    // panel would replace real content the reader can see with "this chapter is empty".
    const frontMatter: Usj = {
      ...emptyUsj,
      content: [
        { type: 'book', marker: 'id', code: 'GEN' },
        { type: 'para', marker: 'h', content: ['Genesis'] },
        { type: 'para', marker: 'mt', content: ['The First Book of Moses'] },
        { type: 'para', marker: 'ip', content: ['Genesis tells of beginnings.'] },
      ],
    };
    expect(isChapterBlank(frontMatter)).toBe(true);
    expect(isBlankChapterOnScreen(frontMatter, 0)).toBe(false);
  });

  it('leaves a Psalm superscription alone, which `isChapterBlank` already answers', () => {
    // A chapter carrying a `\d` still carries its `\c`, so this is false before the chapter-number
    // gate is consulted. Pinned so narrowing the gate later cannot quietly take this with it.
    const superscription: Usj = {
      ...emptyUsj,
      content: [
        { type: 'chapter', marker: 'c', number: '3' },
        { type: 'para', marker: 'd', content: ['A Psalm of David.'] },
      ],
    };
    expect(isBlankChapterOnScreen(superscription, 3)).toBe(false);
  });

  it('makes no claim when no USJ has arrived for this reference', () => {
    expect(isBlankChapterOnScreen(undefined, 1)).toBe(false);
  });
});

describe('buildChapterScaffoldOps', () => {
  it('builds one chapter-embed op followed by one verse-embed op per verse, 1-indexed', () => {
    const ops = buildChapterScaffoldOps(3, 4);
    expect(ops).toEqual([
      { insert: { chapter: { number: '3', style: 'c' } } },
      { insert: { verse: { number: '1', style: 'v' } } },
      { insert: { verse: { number: '2', style: 'v' } } },
      { insert: { verse: { number: '3', style: 'v' } } },
      { insert: { verse: { number: '4', style: 'v' } } },
    ]);
  });

  it('builds one chapter-embed op and one verse-embed op when the chapter has exactly one verse', () => {
    const ops = buildChapterScaffoldOps(1, 1);
    expect(ops).toEqual([
      { insert: { chapter: { number: '1', style: 'c' } } },
      { insert: { verse: { number: '1', style: 'v' } } },
    ]);
  });
});

describe('canAddChapterNumber', () => {
  it('returns false when there is no versification entry for the chapter (lastVerse 0)', () => {
    expect(canAddChapterNumber(0)).toBe(false);
  });

  it('returns false for a negative lastVerse', () => {
    expect(canAddChapterNumber(-1)).toBe(false);
  });

  it('returns true when the chapter has at least one verse', () => {
    expect(canAddChapterNumber(1)).toBe(true);
  });
});

describe('resolveAddChapterNumberClick', () => {
  it('returns "already-in-flight" when a previous insert has not yet completed, regardless of lastVerse', () => {
    expect(resolveAddChapterNumberClick(true, 5)).toBe('already-in-flight');
    expect(resolveAddChapterNumberClick(true, 0)).toBe('already-in-flight');
  });

  it('returns "no-versification" when not in flight but lastVerse is 0', () => {
    expect(resolveAddChapterNumberClick(false, 0)).toBe('no-versification');
  });

  it('returns "insert" when not in flight and lastVerse is positive', () => {
    expect(resolveAddChapterNumberClick(false, 3)).toBe('insert');
  });
});

describe('decideNoteCallerClickAction (caller-click must not dead-end)', () => {
  const base = {
    isCollapsed: true,
    editingNoteKey: undefined,
    popoverShown: false,
    paneVisible: false,
    paneRendered: false,
    isPowerMode: true,
    surface: 'popover' as const,
    usesPaneModel: false,
  };

  it('navigates a read-only Preview caller to the pane and shows a hidden pane in Power', () => {
    const d = decideNoteCallerClickAction({
      ...base,
      isCollapsed: true,
      surface: 'none',
      usesPaneModel: true,
      isPowerMode: true,
      paneVisible: false,
      paneRendered: false,
    });
    expect(d.action).toBe('navigate-only');
    expect(d.showPane).toBe(true);
    expect(d.sendPaneFocusRequest).toBe(true);
  });

  it('keeps a read-only caller inert without the pane model', () => {
    const d = decideNoteCallerClickAction({
      ...base,
      isCollapsed: true,
      surface: 'none',
      usesPaneModel: false,
    });
    expect(d.action).toBe('ignore-read-only');
  });

  it('opens the popover for a plain collapsed-caller click (pane hidden, no session)', () => {
    expect(decideNoteCallerClickAction({ ...base, isPowerMode: false })).toEqual({
      clearStaleEditingSession: false,
      action: 'open-popover',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('ignores clicks on expanded notes', () => {
    expect(decideNoteCallerClickAction({ ...base, isCollapsed: false })).toEqual({
      clearStaleEditingSession: false,
      action: 'ignore-expanded',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('ignores clicks while a popover session is really shown (one at a time)', () => {
    expect(
      decideNoteCallerClickAction({ ...base, editingNoteKey: 'note-1', popoverShown: true }),
    ).toEqual({
      clearStaleEditingSession: false,
      action: 'ignore-popover-open',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('self-heals a stale session key (no popover shown) instead of dead-ending the click', () => {
    // A leftover editingNoteKey must not silently swallow every future caller click.
    expect(
      decideNoteCallerClickAction({
        ...base,
        editingNoteKey: 'note-1',
        popoverShown: false,
        isPowerMode: false,
      }),
    ).toEqual({
      clearStaleEditingSession: true,
      action: 'open-popover',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('still opens the popover when the pane is rendered — the pane highlight rides alongside', () => {
    // On the popover surface (every view but a pane-model one), a routed click opens the popover; the
    // rendered pane additionally highlights the clicked note (PT9 navigate-to-note).
    expect(decideNoteCallerClickAction({ ...base, paneVisible: true, paneRendered: true })).toEqual(
      {
        clearStaleEditingSession: false,
        action: 'open-popover',
        sendPaneFocusRequest: true,
        showPane: false,
      },
    );
  });

  it('Power Formatted reveals a hidden pane alongside the popover, and highlights the note once it mounts', () => {
    expect(decideNoteCallerClickAction({ ...base, isPowerMode: true })).toEqual({
      clearStaleEditingSession: false,
      action: 'open-popover',
      sendPaneFocusRequest: true,
      showPane: true,
    });
  });

  it('a pane-model view ignores clicks while a popover opened before switching to it is still shown', () => {
    // The popover applies its text only on Save, so opening the row editor (which closes the
    // popover) would discard what was typed. The popover is finished through its own Save or X.
    expect(
      decideNoteCallerClickAction({
        ...base,
        isPowerMode: false,
        surface: 'pane',
        usesPaneModel: true,
        editingNoteKey: 'note-1',
        popoverShown: true,
        paneVisible: true,
        paneRendered: true,
      }),
    ).toEqual({
      clearStaleEditingSession: false,
      action: 'ignore-popover-open',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('Simple pane-model view: opens the row editor and reveals a hidden pane', () => {
    expect(
      decideNoteCallerClickAction({
        ...base,
        isPowerMode: false,
        surface: 'pane',
        usesPaneModel: true,
      }),
    ).toEqual({
      clearStaleEditingSession: false,
      action: 'open-pane-editor',
      sendPaneFocusRequest: true,
      showPane: true,
    });
  });

  it('Simple read-only pane-model view: navigates only, revealing a hidden pane', () => {
    expect(
      decideNoteCallerClickAction({
        ...base,
        isPowerMode: false,
        surface: 'none',
        usesPaneModel: true,
      }),
    ).toMatchObject({ action: 'navigate-only', showPane: true, sendPaneFocusRequest: true });
  });

  it('does not re-show a pane that is already toggled visible but still mounting its data', () => {
    // paneVisible without paneRendered: the toggle is on but the data has not loaded — nothing to
    // show and nothing to highlight yet.
    expect(decideNoteCallerClickAction({ ...base, paneVisible: true, isPowerMode: true })).toEqual({
      clearStaleEditingSession: false,
      action: 'open-popover',
      sendPaneFocusRequest: false,
      showPane: false,
    });
  });

  it('clears a stale session while still doing the pane work', () => {
    expect(
      decideNoteCallerClickAction({
        ...base,
        editingNoteKey: 'note-1',
        paneVisible: true,
        paneRendered: true,
      }),
    ).toEqual({
      clearStaleEditingSession: true,
      action: 'open-popover',
      sendPaneFocusRequest: true,
      showPane: false,
    });
  });

  it('Standard view: opens the pane editor and reveals a hidden pane', () => {
    const d = decideNoteCallerClickAction({ ...base, surface: 'pane', usesPaneModel: true });
    expect(d).toEqual({
      clearStaleEditingSession: false,
      action: 'open-pane-editor',
      showPane: true,
      sendPaneFocusRequest: true,
    });
  });

  it('Standard view: an open pane session is not stale bookkeeping', () => {
    const d = decideNoteCallerClickAction({
      ...base,
      surface: 'pane',
      usesPaneModel: true,
      editingNoteKey: 'k1',
      paneVisible: true,
      paneRendered: true,
    });
    expect(d.clearStaleEditingSession).toBe(false);
    expect(d.action).toBe('open-pane-editor');
  });

  it('read-only Standard view: navigates only, still revealing the pane in Power mode', () => {
    const d = decideNoteCallerClickAction({ ...base, surface: 'none', usesPaneModel: true });
    expect(d.action).toBe('navigate-only');
    expect(d.showPane).toBe(true);
    expect(d.sendPaneFocusRequest).toBe(true);
  });

  it.each([true, false])(
    'read-only outside a pane-model view leaves the caller inert (isPowerMode=%s)',
    (isPowerMode) => {
      expect(
        decideNoteCallerClickAction({
          ...base,
          surface: 'none',
          usesPaneModel: false,
          isPowerMode,
          paneVisible: true,
          paneRendered: true,
        }),
      ).toEqual({
        clearStaleEditingSession: false,
        action: 'ignore-read-only',
        sendPaneFocusRequest: false,
        showPane: false,
      });
    },
  );

  it('expanded caller is ignored regardless of surface', () => {
    expect(
      decideNoteCallerClickAction({
        ...base,
        surface: 'pane',
        usesPaneModel: true,
        isCollapsed: false,
      }).action,
    ).toBe('ignore-expanded');
  });

  it('popover surface keeps ignoring a click while the popover is open', () => {
    expect(
      decideNoteCallerClickAction({ ...base, popoverShown: true, editingNoteKey: 'k' }).action,
    ).toBe('ignore-popover-open');
  });

  it('popover shown without a tracked key still blocks the click (never open a second popover)', () => {
    // popoverShown alone is enough to block a routed click, even without editingNoteKey: opening a
    // second popover while one is already on screen would be the bug, not the safe outcome.
    const d = decideNoteCallerClickAction({
      ...base,
      surface: 'popover',
      popoverShown: true,
      editingNoteKey: undefined,
    });
    expect(d.action).toBe('ignore-popover-open');
    expect(d.clearStaleEditingSession).toBe(false);
  });
});

describe('decideNoteSessionUpdate (a row edit must not reload the row editor)', () => {
  it('re-keys without reloading when the row editor replaced its own note', () => {
    expect(
      decideNoteSessionUpdate({
        sessionKeyResolves: false,
        insertedKeyIsNote: true,
        noteChanged: false,
      }),
    ).toEqual({ action: 'rekey', reloadRowEditor: false, refreshBaseline: true });
  });

  it('refreshes the comparison baseline on that re-key, so the next external change compares against what the row applied', () => {
    // The defect this pins: leaving the baseline at the ops the row was LOADED with makes every
    // later external change look like a change to this note, reloading the row editor once per
    // edit cycle and dropping whatever is still inside the row editor's apply debounce.
    const decision = decideNoteSessionUpdate({
      sessionKeyResolves: false,
      insertedKeyIsNote: true,
      noteChanged: false,
    });
    expect(decision.refreshBaseline).toBe(true);
    expect(decision.reloadRowEditor).toBe(false);
  });

  it('ends the session when the note is gone and nothing replaced it', () => {
    expect(
      decideNoteSessionUpdate({
        sessionKeyResolves: false,
        insertedKeyIsNote: false,
        noteChanged: false,
      }),
    ).toEqual({ action: 'end-session', reloadRowEditor: false, refreshBaseline: false });
  });

  it('leaves the row editor alone when the change was somewhere else in the chapter', () => {
    expect(
      decideNoteSessionUpdate({
        sessionKeyResolves: true,
        insertedKeyIsNote: false,
        noteChanged: false,
      }),
    ).toEqual({ action: 'follow-note', reloadRowEditor: false, refreshBaseline: false });
  });

  it('reloads the row editor when this note itself changed elsewhere', () => {
    expect(
      decideNoteSessionUpdate({
        sessionKeyResolves: true,
        insertedKeyIsNote: false,
        noteChanged: true,
      }),
    ).toEqual({ action: 'follow-note', reloadRowEditor: true, refreshBaseline: true });
  });

  it('keeps following the still-resolving note even when an insert came with the change', () => {
    // A note inserted elsewhere in the chapter does not re-key the session's own note, so the
    // insert must not divert the session into the re-key branch.
    expect(
      decideNoteSessionUpdate({
        sessionKeyResolves: true,
        insertedKeyIsNote: true,
        noteChanged: false,
      }).action,
    ).toBe('follow-note');
  });

  it('never reloads without refreshing the baseline (a reload is what the baseline tracks)', () => {
    const cases = [true, false].flatMap((sessionKeyResolves) =>
      [true, false].flatMap((insertedKeyIsNote) =>
        [true, false].map((noteChanged) =>
          decideNoteSessionUpdate({ sessionKeyResolves, insertedKeyIsNote, noteChanged }),
        ),
      ),
    );
    expect(
      cases.filter((decision) => decision.reloadRowEditor && !decision.refreshBaseline),
    ).toEqual([]);
  });
});

describe('usesPaneNoteModel', () => {
  it.each([
    ['standard', true, true],
    ['formatted', true, true],
    ['markers', true, false],
    ['standard', false, true],
    ['formatted', false, true],
    ['markers', false, false],
  ] as const)('%s view, isPowerMode=%s → %s', (viewType, isPowerMode, expected) => {
    expect(usesPaneNoteModel({ viewType, isPowerMode, isInterfaceModeLoading: false })).toBe(
      expected,
    );
  });

  it.each([[true], [false]])(
    'counts only Standard view while the interface mode is still loading (isPowerMode=%s)',
    (isPowerMode) => {
      expect(
        usesPaneNoteModel({ viewType: 'formatted', isPowerMode, isInterfaceModeLoading: true }),
      ).toBe(false);
      expect(
        usesPaneNoteModel({ viewType: 'markers', isPowerMode, isInterfaceModeLoading: true }),
      ).toBe(false);
      expect(
        usesPaneNoteModel({ viewType: 'standard', isPowerMode, isInterfaceModeLoading: true }),
      ).toBe(true);
    },
  );

  it.each([[true], [false]])(
    'uses the pane for a saved markers view once the interface mode has loaded (isPowerMode=%s), since the editor never displays markers',
    (isPowerMode) => {
      const displayed = resolveViewTypeForInterfaceMode('markers', isPowerMode);
      expect(displayed).not.toBe('markers');
      expect(
        usesPaneNoteModel({ viewType: displayed, isPowerMode, isInterfaceModeLoading: false }),
      ).toBe(true);
    },
  );
});

describe('resolveNoteEditingSurface', () => {
  it('routes a pane-model view to the pane', () => {
    expect(resolveNoteEditingSurface({ usesPaneModel: true, isReadOnly: false })).toBe('pane');
  });

  it('routes every other view to the popover', () => {
    expect(resolveNoteEditingSurface({ usesPaneModel: false, isReadOnly: false })).toBe('popover');
  });

  it('has no editing surface when read-only, in any view', () => {
    expect(resolveNoteEditingSurface({ usesPaneModel: true, isReadOnly: true })).toBe('none');
    expect(resolveNoteEditingSurface({ usesPaneModel: false, isReadOnly: true })).toBe('none');
  });
});

describe('resolveFootnotesPaneViewOptions', () => {
  const mainViewOptions: ViewOptions = {
    markerMode: 'hidden',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  };
  const standardViewOptions: ViewOptions = {
    markerMode: 'editable',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  };

  it('leaves Power on the main editor’s view options', () => {
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: true,
        isInterfaceModeLoading: false,
        mainViewOptions,
        standardViewOptions,
      }),
    ).toBe(mainViewOptions);
  });

  it('gives Simple Standard’s view options, so the pane shows markers', () => {
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        mainViewOptions,
        standardViewOptions,
      }),
    ).toBe(standardViewOptions);
  });

  it('keeps the main editor’s view options while the interface mode is still loading', () => {
    // `isPowerMode` reads false until the mode loads, so a Power user's pane must not take
    // Simple's answer in the meantime.
    expect(
      resolveFootnotesPaneViewOptions({
        isPowerMode: false,
        isInterfaceModeLoading: true,
        mainViewOptions,
        standardViewOptions,
      }),
    ).toBe(mainViewOptions);
  });
});

describe('shouldEndPaneNoteEditOnRowSelect', () => {
  it('ends the row session when a different row is selected', () => {
    // Tab from the row editor onto another note, then Space: that note is selected and its caller
    // highlighted, so an editor left open on the first note reads as editing the wrong one.
    expect(shouldEndPaneNoteEditOnRowSelect({ paneEditingIndex: 1, selectedIndex: 3 })).toBe(true);
  });

  it('has nothing to end when no row is being edited', () => {
    expect(
      shouldEndPaneNoteEditOnRowSelect({ paneEditingIndex: undefined, selectedIndex: 3 }),
    ).toBe(false);
  });

  it('keeps the session when the row selected is the one being edited', () => {
    expect(shouldEndPaneNoteEditOnRowSelect({ paneEditingIndex: 3, selectedIndex: 3 })).toBe(false);
  });
});

describe('resolveCallerHighlight', () => {
  it('highlights the selected note while a pane-model view has the pane focused', () => {
    expect(
      resolveCallerHighlight({ usesPaneModel: true, paneHasFocus: true, selectedIndex: 0 }),
    ).toBe(0);
  });

  it('clears the highlight while the pane has no selection', () => {
    expect(
      resolveCallerHighlight({
        usesPaneModel: true,
        paneHasFocus: true,
        selectedIndex: undefined,
      }),
    ).toBeUndefined();
  });

  it('clears the highlight while focus is outside the pane', () => {
    expect(
      resolveCallerHighlight({ usesPaneModel: true, paneHasFocus: false, selectedIndex: 2 }),
    ).toBeUndefined();
  });

  it('clears the highlight outside a pane-model view', () => {
    expect(
      resolveCallerHighlight({ usesPaneModel: false, paneHasFocus: true, selectedIndex: 2 }),
    ).toBeUndefined();
  });

  it('highlights the row keyboard focus is on, ahead of the selected row', () => {
    // Tab and the arrow keys move focus through the rows without selecting any of them; the
    // focused row is where the pane's caret is, so its note is the one marked.
    expect(
      resolveCallerHighlight({
        usesPaneModel: true,
        paneHasFocus: true,
        focusedRowIndex: 3,
        selectedIndex: 1,
      }),
    ).toBe(3);
    expect(
      resolveCallerHighlight({
        usesPaneModel: true,
        paneHasFocus: true,
        focusedRowIndex: 3,
        selectedIndex: undefined,
      }),
    ).toBe(3);
  });

  it('falls back to the selected row when no row holds focus', () => {
    expect(
      resolveCallerHighlight({
        usesPaneModel: true,
        paneHasFocus: true,
        focusedRowIndex: undefined,
        selectedIndex: 1,
      }),
    ).toBe(1);
  });

  it('marks no focused row while focus is outside the pane', () => {
    expect(
      resolveCallerHighlight({
        usesPaneModel: true,
        paneHasFocus: false,
        focusedRowIndex: 3,
        selectedIndex: 1,
      }),
    ).toBeUndefined();
  });

  it('restores the highlight when a pane-model view comes back with the pane untouched', () => {
    // A view round trip leaves the pane mounted, its row selected, and DOM focus where it was, so
    // re-deriving on the way back has to give the index again rather than staying cleared.
    const paneState = { paneHasFocus: true, selectedIndex: 2 };
    expect(resolveCallerHighlight({ usesPaneModel: true, ...paneState })).toBe(2);
    expect(resolveCallerHighlight({ usesPaneModel: false, ...paneState })).toBeUndefined();
    expect(resolveCallerHighlight({ usesPaneModel: true, ...paneState })).toBe(2);
  });
});

describe('shouldPublishPaneDocument (the pane repaints only when its notes change)', () => {
  const note = (text: string): MarkerObject => ({
    type: 'note',
    marker: 'f',
    caller: '+',
    content: [{ type: 'char', marker: 'ft', content: [text] }],
  });

  it('publishes the first document the pane ever sees', () => {
    expect(shouldPublishPaneDocument([note('a')], undefined)).toBe(true);
  });

  it('skips a document whose notes are unchanged', () => {
    // The typing hot path: every keystroke in the Scripture body re-settles the document and
    // changes no note. Republishing there re-renders the whole web view per character.
    expect(shouldPublishPaneDocument([note('a')], [note('a')])).toBe(false);
  });

  it("publishes when a note's content changed", () => {
    expect(shouldPublishPaneDocument([note('a')], [note('b')])).toBe(true);
  });

  it('publishes when a note was added or removed', () => {
    expect(shouldPublishPaneDocument([note('a'), note('b')], [note('a')])).toBe(true);
    expect(shouldPublishPaneDocument([], [note('a')])).toBe(true);
  });

  it('publishes a document whose notes could not be read', () => {
    // A document this reader cannot walk must never wedge the pane on a stale note list.
    expect(shouldPublishPaneDocument(undefined, [note('a')])).toBe(true);
  });
});

describe('resolveViewTypeForInterfaceMode (Standard is Power-only; Markers is shown nowhere)', () => {
  it('coerces standard to formatted in simple mode', () => {
    expect(resolveViewTypeForInterfaceMode('standard', false)).toBe('formatted');
  });

  it('leaves formatted unchanged in simple mode', () => {
    expect(resolveViewTypeForInterfaceMode('formatted', false)).toBe('formatted');
  });

  it('coerces a saved markers view to formatted in simple mode', () => {
    expect(resolveViewTypeForInterfaceMode('markers', false)).toBe('formatted');
  });

  it('shows a saved markers view as Standard view in Power', () => {
    expect(resolveViewTypeForInterfaceMode('markers', true)).toBe('standard');
  });

  it('leaves standard and formatted unchanged in Power', () => {
    expect(resolveViewTypeForInterfaceMode('standard', true)).toBe('standard');
    expect(resolveViewTypeForInterfaceMode('formatted', true)).toBe('formatted');
  });
});

describe('getSimpleModeRootClassNames', () => {
  it('turns the character-marker indicator on for text a Simple user can type into', () => {
    expect(
      getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: false,
      }),
    ).toEqual(['editor-container-simple', 'character-marker-indicators']);
  });

  it('leaves the indicator off when the text cannot be typed into', () => {
    // It warns against typing inside a marker, so read-only text has nothing to warn about.
    expect(
      getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: true,
      }),
    ).toEqual(['editor-container-simple']);
  });

  it('leaves the indicator off until the interface mode is known', () => {
    // `isPowerMode` reads `false` while the setting loads, so a Power session would otherwise be
    // tinted for a frame.
    expect(
      getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: true,
        isDurablyReadOnly: false,
      }),
    ).toEqual(['editor-container-simple']);
  });

  it('leaves the indicator off until edit permissions are known', () => {
    // The permission reads default to "editable" while they load, so a read-only project would
    // otherwise be tinted until they resolve.
    expect(
      getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: undefined,
      }),
    ).toEqual(['editor-container-simple']);
  });

  it('adds no Simple-mode classes in Power mode', () => {
    expect(
      getSimpleModeRootClassNames({
        isPowerMode: true,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: false,
      }),
    ).toEqual([]);
  });
});

describe('getDisplayedViewType', () => {
  it('shows formatted while the mode loads and nothing is saved', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: VIEW_TYPE_UNSET,
        isPowerMode: false,
        isInterfaceModeLoading: true,
      }),
    ).toBe('formatted');
  });

  it('shows formatted while the mode loads and nothing is saved, even when Power is reported', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: VIEW_TYPE_UNSET,
        isPowerMode: true,
        isInterfaceModeLoading: true,
      }),
    ).toBe('formatted');
  });

  it('shows the persisted value as is while the mode loads', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: 'standard',
        isPowerMode: false,
        isInterfaceModeLoading: true,
      }),
    ).toBe('standard');
  });

  it('shows Standard view for a never-saved Power tab', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: VIEW_TYPE_UNSET,
        isPowerMode: true,
        isInterfaceModeLoading: false,
      }),
    ).toBe('standard');
  });

  it('shows a saved markers view as Standard view in Power', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: 'markers',
        isPowerMode: true,
        isInterfaceModeLoading: false,
      }),
    ).toBe('standard');
  });

  it('keeps a saved formatted view in Power', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: 'formatted',
        isPowerMode: true,
        isInterfaceModeLoading: false,
      }),
    ).toBe('formatted');
  });

  it('shows formatted in Simple when nothing is saved', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: VIEW_TYPE_UNSET,
        isPowerMode: false,
        isInterfaceModeLoading: false,
      }),
    ).toBe('formatted');
  });

  it('shows formatted in Simple for a saved standard view', () => {
    expect(
      getDisplayedViewType({
        persistedViewType: 'standard',
        isPowerMode: false,
        isInterfaceModeLoading: false,
      }),
    ).toBe('formatted');
  });
});

describe('direct view-setting commands', () => {
  it('maps setViewStandard to standard and setViewPreview to formatted', () => {
    expect(VIEW_TYPE_FOR_SET_VIEW_COMMAND['platformScriptureEditor.setViewStandard']).toBe(
      'standard',
    );
    expect(VIEW_TYPE_FOR_SET_VIEW_COMMAND['platformScriptureEditor.setViewPreview']).toBe(
      'formatted',
    );
  });
});

describe('getNextViewTypeInCycle', () => {
  it('toggles Standard view and Preview in Power', () => {
    expect(getNextViewTypeInCycle('standard', true)).toBe('formatted');
    expect(getNextViewTypeInCycle('formatted', true)).toBe('standard');
  });

  it('goes to Standard view from a markers value in Power', () => {
    expect(getNextViewTypeInCycle('markers', true)).toBe('standard');
  });

  it('has nothing to change in simple mode, so a saved Power view type is never overwritten', () => {
    const allViewTypes = ['formatted', 'markers', 'standard'] as const;
    allViewTypes.forEach((current) => {
      expect(getNextViewTypeInCycle(current, false)).toBeUndefined();
    });
  });
});

describe('getViewTypeToSave', () => {
  const change = { method: 'changeScriptureView' } as const;

  it('toggles Standard view and Preview for changeScriptureView in Power', () => {
    expect(getViewTypeToSave(change, { viewType: 'standard', isPowerMode: true })).toBe(
      'formatted',
    );
    expect(getViewTypeToSave(change, { viewType: 'formatted', isPowerMode: true })).toBe(
      'standard',
    );
    expect(getViewTypeToSave(change, { viewType: 'markers', isPowerMode: true })).toBe('standard');
  });

  it('saves nothing for changeScriptureView in Simple, whatever the current view', () => {
    const allViewTypes = ['formatted', 'markers', 'standard'] as const;
    allViewTypes.forEach((viewType) => {
      expect(getViewTypeToSave(change, { viewType, isPowerMode: false })).toBeUndefined();
    });
  });

  it('saves the requested view type as is for setScriptureView', () => {
    // `isPowerMode: false` is also what a still-loading interface mode reads as, so this row covers
    // both Simple and the loading case.
    expect(
      getViewTypeToSave(
        { method: 'setScriptureView', viewType: 'standard' },
        { viewType: 'formatted', isPowerMode: false },
      ),
    ).toBe('standard');
    expect(
      getViewTypeToSave(
        { method: 'setScriptureView', viewType: 'formatted' },
        { viewType: 'standard', isPowerMode: true },
      ),
    ).toBe('formatted');
  });
});

describe('showsReadOnlyPreview', () => {
  it('is true for a saved formatted view in Power', () => {
    expect(showsReadOnlyPreview('formatted', true)).toBe(true);
  });

  it.each([['standard'], ['markers'], [undefined], [42]])('is false for %s in Power', (v) => {
    expect(showsReadOnlyPreview(v, true)).toBe(false);
  });

  it.each([['formatted'], ['standard'], ['markers']])('is false for %s outside Power', (v) => {
    expect(showsReadOnlyPreview(v, false)).toBe(false);
  });
});

describe('isMissingBookError', () => {
  it('returns true for the message C# MissingBookException actually produces', () => {
    expect(isMissingBookError(new Error('Book number 1 not found in project abc123.'))).toBe(true);
  });

  it('returns true when the PDP has wrapped the message in its own prefix', () => {
    expect(
      isMissingBookError(
        new Error('Error in getChapterUSJ: Book number 40 not found in project abc123.'),
      ),
    ).toBe(true);
  });

  it('returns true for a plain string message rather than an Error', () => {
    expect(isMissingBookError('Book number 66 not found in project abc123.')).toBe(true);
  });

  it('returns false for an unrelated failure', () => {
    expect(isMissingBookError(new Error('Project abc123 is not available'))).toBe(false);
  });

  it('returns false when the book number is absent, so a partial match cannot pass', () => {
    expect(isMissingBookError(new Error('Book number not found in project abc123.'))).toBe(false);
  });

  it('returns false for undefined, so a missing error is never read as a missing book', () => {
    expect(isMissingBookError(undefined)).toBe(false);
  });

  it('detects the failure even when the project id is not followed by a period', () => {
    // Detection must not depend on the identity suffix. The main editor turns a non-detection into
    // `bookExists === true`, which reaches `usjFromPdp === defaultUsj` and spins forever instead of
    // showing the book-not-available view, so a stricter predicate here costs a hang.
    expect(isMissingBookError(new Error('Book number 1 not found in project abc123'))).toBe(true);
  });

  it('never reads a message off a value that is not an error', () => {
    // `getErrorMessage` falls back to `JSON.stringify` for an object with no string `message`, so an
    // unguarded call serializes the whole chapter on every render and then matches the regex against
    // the scripture text. The guard belongs here rather than in each caller.
    expect(
      isMissingBookError({
        type: 'USJ',
        version: '3.1',
        content: ['Book number 1 not found in project abc123.'],
      }),
    ).toBe(false);
  });
});

describe('parseMissingBookError', () => {
  it('reports which book and which project the failure names', () => {
    expect(parseMissingBookError(new Error('Book number 40 not found in project abc123.'))).toEqual(
      {
        bookNum: 40,
        projectId: 'abc123',
      },
    );
  });

  it('reads through the prefix the PDP wraps the message in', () => {
    expect(
      parseMissingBookError(
        new Error('Error in getChapterUSJ: Book number 1 not found in project abc123.'),
      ),
    ).toEqual({ bookNum: 1, projectId: 'abc123' });
  });

  it('returns undefined for an unrelated failure, so callers cannot read identities off one', () => {
    expect(parseMissingBookError(new Error('Project abc123 is not available'))).toBeUndefined();
  });

  it('keeps a project id that contains periods intact', () => {
    // The C# message always ends in a period, so the id runs to the LAST one. Stopping at the first
    // would hand back a truncated id, which compares unequal and silently restores the blank editor.
    expect(
      parseMissingBookError(new Error('Book number 40 not found in project abc.123.def.')),
    ).toEqual({ bookNum: 40, projectId: 'abc.123.def' });
  });

  it('returns undefined for a value that is not an error', () => {
    expect(
      parseMissingBookError({
        type: 'USJ',
        version: '3.1',
        content: ['Book number 1 not found in project abc123.'],
      }),
    ).toBeUndefined();
  });
});

describe('isMissingBookOnScreen', () => {
  const PROJECT_ID = 'abc123';
  const GENESIS = 1;
  const MATTHEW = 40;
  const missingBook = (bookNum: number, projectId = PROJECT_ID) =>
    newPlatformError(new Error(`Book number ${bookNum} not found in project ${projectId}.`));

  it('is true when the failure names the book and project on screen', () => {
    expect(
      isMissingBookOnScreen({
        error: missingBook(GENESIS),
        currentBookNum: GENESIS,
        projectId: PROJECT_ID,
      }),
    ).toBe(true);
  });

  it('is false for a failure about the book the view has already left', () => {
    // This is what makes the answer frame-accurate. A caller that instead latched a boolean when the
    // failure arrived would still be asserting it on the first render after navigation, because the
    // effect that clears such a flag runs after that render has already been committed.
    expect(
      isMissingBookOnScreen({
        error: missingBook(MATTHEW),
        currentBookNum: GENESIS,
        projectId: PROJECT_ID,
      }),
    ).toBe(false);
  });

  it('is false for a failure about a project the view has already switched away from', () => {
    expect(
      isMissingBookOnScreen({
        error: missingBook(GENESIS, 'someOtherProject'),
        currentBookNum: GENESIS,
        projectId: PROJECT_ID,
      }),
    ).toBe(false);
  });

  it('compares project ids case-insensitively', () => {
    expect(
      isMissingBookOnScreen({
        error: missingBook(GENESIS, 'ABC123'),
        currentBookNum: GENESIS,
        projectId: 'abc123',
      }),
    ).toBe(true);
  });

  it('is false when there is no project to compare against', () => {
    expect(
      isMissingBookOnScreen({
        error: missingBook(GENESIS),
        currentBookNum: GENESIS,
        projectId: undefined,
      }),
    ).toBe(false);
  });

  it('is false when the current book number is not a real book', () => {
    expect(
      isMissingBookOnScreen({ error: missingBook(0), currentBookNum: 0, projectId: PROJECT_ID }),
    ).toBe(false);
  });

  it('is false for an unrelated failure and for no failure at all', () => {
    expect(
      isMissingBookOnScreen({
        error: newPlatformError(new Error('Project abc123 is not available')),
        currentBookNum: GENESIS,
        projectId: PROJECT_ID,
      }),
    ).toBe(false);
    expect(
      isMissingBookOnScreen({ error: undefined, currentBookNum: GENESIS, projectId: PROJECT_ID }),
    ).toBe(false);
  });
});

describe('resolveResourceContentState', () => {
  const PROJECT_ID = 'abc123';
  // Genesis. `Canon.bookIdToNumber('GEN')` is 1, which is what the panel passes.
  const GENESIS = 1;
  const MATTHEW = 40;
  const missingBook = (bookNum: number, projectId = PROJECT_ID) =>
    newPlatformError(new Error(`Book number ${bookNum} not found in project ${projectId}.`));

  it('returns "loading" before a resource project has resolved', () => {
    expect(
      resolveResourceContentState({
        resourceProjectId: undefined,
        usjPossiblyError: undefined,
        currentBookNum: GENESIS,
      }),
    ).toBe('loading');
  });

  it('returns "loading" for a caller whose hook is not seeded with a default', () => {
    // The Bible texts panel passes `EMPTY_USJ` as its hook's default, so its value is an object from
    // the first render and this pair does not occur there. Kept because the state is part of this
    // function's contract for any caller reading a hook without a seeded default, and because the
    // alternative — falling to `'ready'` — would mount an editor with nothing to put in it.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: undefined,
        currentBookNum: GENESIS,
      }),
    ).toBe('loading');
  });

  it('returns "ready" once chapter data has arrived', () => {
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: { type: 'USJ', version: '3.1', content: [] },
        currentBookNum: GENESIS,
      }),
    ).toBe('ready');
  });

  it('returns "bookNotAvailable" when the failure names the book and project on screen', () => {
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: missingBook(GENESIS),
        currentBookNum: GENESIS,
      }),
    ).toBe('bookNotAvailable');
  });

  it('reads a failure about a different book as still loading, in either direction of navigation', () => {
    // `useProjectData` keeps serving the PREVIOUS selector's result until the new subscription's
    // first update lands, so the error in hand may describe the book the user just left. Attributing
    // it to the current book would flash "not in this text" on the way INTO a book the text has —
    // and, because the hook raises `isLoading` from an effect that runs after the commit, on the way
    // OUT of one it does not.
    //
    // `'loading'` rather than `'failed'`: the answer for this reference is still in flight, so the
    // honest state is a spinner. This is the same ordering `deriveCellState` uses, so the panel and
    // the Scripture Text Grid cannot give opposite answers about one error.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: missingBook(MATTHEW),
        currentBookNum: GENESIS,
      }),
    ).toBe('loading');
  });

  it('reads a failure about a different project as still loading, so switching resources cannot misreport', () => {
    // Same stale window, reached by picking a different text from the panel's selector rather than
    // by navigating. The book number alone would still match, so the project has to be checked too.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: missingBook(GENESIS, 'someOtherProject'),
        currentBookNum: GENESIS,
      }),
    ).toBe('loading');
  });

  it('never reads a message off a success value', () => {
    // Two failures at once if the success path reached the message check: `getErrorMessage` falls
    // back to `JSON.stringify` for an object with no string `message`, so this would serialize the
    // whole chapter on every render — and then match the regex against the scripture text, which
    // here says exactly what the C# exception says.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: {
          type: 'USJ',
          version: '3.1',
          content: [`Book number ${GENESIS} not found in project ${PROJECT_ID}.`],
        },
        currentBookNum: GENESIS,
      }),
    ).toBe('ready');
  });

  it('matches project ids case-insensitively', () => {
    // C# stores and reports ids uppercased (`ProjectMetadata` calls `ToUpperInvariant`), while the
    // panel's own id arrives verbatim from a resource reference. The PDP lookup folds case, so a
    // mismatch is invisible on the data path and would surface only here — as a blank editor with
    // no message and no log, the exact failure this state exists to remove.
    expect(
      resolveResourceContentState({
        resourceProjectId: 'abc123',
        usjPossiblyError: missingBook(GENESIS, 'ABC123'),
        currentBookNum: GENESIS,
      }),
    ).toBe('bookNotAvailable');
  });

  it('withholds the message when the current book number is not a real book', () => {
    // `Canon.bookIdToNumber` answers 0 for an unrecognized id, and 0 === 0 would match a failure
    // that also carried book 0 — asserting a specific claim about a book the panel cannot name. The
    // failure is still a missing-book one, so it reads as in-flight rather than as a fault.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: missingBook(0),
        currentBookNum: 0,
      }),
    ).toBe('loading');
  });

  it('returns "failed" for an unrelated failure rather than a spinner that never resolves', () => {
    // Only a missing book earns the dedicated missing-book message. Widening that to every error
    // would relabel genuine failures as "this book is not here", which is a different and misleading
    // claim — but they still have to be named. There is no USJ to render and nothing re-emits until
    // the data provider does, so both of the alternatives lie: a spinner claims progress that never
    // arrives, and an editor with nothing set invites the reader to type into a text they cannot
    // edit.
    expect(
      resolveResourceContentState({
        resourceProjectId: PROJECT_ID,
        usjPossiblyError: newPlatformError(new Error('Project abc123 is not available')),
        currentBookNum: GENESIS,
      }),
    ).toBe('failed');
  });
});

describe('formatEditorTitle', () => {
  const TITLE_FORMAT_KEY = '%webView_platformScriptureEditor_title_format%';
  const mockGetProjectName = vi.fn().mockResolvedValue('My Project');
  const mockGetLocalizedStrings = vi.fn().mockResolvedValue({
    '%webView_platformScriptureEditor_title_editable_indicator%': '(Editable)',
    '%webView_platformScriptureEditor_title_readonly_indicator%': '(Read-only)',
    [TITLE_FORMAT_KEY]: '{projectId} {editable}',
  });

  it('renders the editable indicator when isReadOnly is false', async () => {
    const title = await formatEditorTitle(
      TITLE_FORMAT_KEY,
      'project-1',
      false,
      mockGetProjectName,
      mockGetLocalizedStrings,
    );
    expect(title).toBe('My Project (Editable)');
  });

  it('renders the read-only indicator when isReadOnly is true', async () => {
    const title = await formatEditorTitle(
      TITLE_FORMAT_KEY,
      'project-1',
      true,
      mockGetProjectName,
      mockGetLocalizedStrings,
    );
    expect(title).toBe('My Project (Read-only)');
  });

  it.each([
    ['formatted', true, 'Project (Read-only)'],
    ['markers', true, 'Project (Editable)'],
    ['formatted', false, 'Project (Editable)'],
  ])('titles a saved %s view (Power: %s) as "%s"', async (viewType, isPowerMode, expected) => {
    const stub = vi.fn().mockResolvedValue({
      '%webView_platformScriptureEditor_title_format%': '{projectId} {editable}',
      '%webView_platformScriptureEditor_title_readonly_indicator%': '(Read-only)',
      '%webView_platformScriptureEditor_title_editable_indicator%': '(Editable)',
    });
    const title = await formatEditorTitle(
      undefined,
      'p1',
      showsReadOnlyPreview(viewType, isPowerMode),
      async () => 'Project',
      stub,
    );
    expect(title).toBe(expected);
  });
});

// #region updateRelatedTextCollectionPanel

/**
 * Mock papi exposing the webViews reads/writes the Column 3 re-point helpers use, a `sendCommand`
 * spy for the command-driven panels, a `platform.base` PDP reporting `projectKind` (see
 * {@link createProjectKindMocks}), and a settings service reporting Simple mode.
 *
 * @param openDefs Definitions `getAllOpenWebViewDefinitions` should report as open.
 * @param projectKind What a project's `platform.base` PDP reports unless `setProjectKind` overrides
 *   it for that id.
 */
function createRelatedPanelsMockPapi(
  openDefs: Array<Partial<SavedWebViewDefinition>> = [],
  projectKind: ProjectKind = EDITABLE_PROJECT,
) {
  const mockSendCommand = vi.fn().mockResolvedValue(undefined);
  const mockGetAllOpenWebViewDefinitions = vi.fn().mockResolvedValue(openDefs);
  // Resolves an id: `reloadWebView` returning undefined means the re-point did not take, which is
  // reported as an error.
  const mockReloadWebView = vi.fn().mockResolvedValue(GRID_WEBVIEW_ID);
  const mockOpenWebView = vi.fn().mockResolvedValue(undefined);
  const mockSettingsGet = vi.fn().mockResolvedValue('simple');
  const projectKindMocks = createProjectKindMocks(projectKind);
  const mockWarn = vi.fn();
  const mockError = vi.fn();
  // Must cast since the mock only includes the papi properties these helpers use.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    commands: { sendCommand: mockSendCommand },
    webViews: {
      getAllOpenWebViewDefinitions: mockGetAllOpenWebViewDefinitions,
      reloadWebView: mockReloadWebView,
      openWebView: mockOpenWebView,
    },
    projectDataProviders: { get: projectKindMocks.mockProjectDataProvidersGet },
    settings: { get: mockSettingsGet },
    logger: { warn: mockWarn, error: mockError },
  } as unknown as typeof PapiBackend;
  return {
    papi,
    mockSendCommand,
    mockGetAllOpenWebViewDefinitions,
    mockReloadWebView,
    mockOpenWebView,
    mockSettingsGet,
    ...projectKindMocks,
    mockWarn,
    mockError,
  };
}

/** An open Text Collection panel currently pointed at `projectId`. */
function gridDef(projectId: string | undefined): Partial<SavedWebViewDefinition> {
  return { id: GRID_WEBVIEW_ID, webViewType: SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE, projectId };
}

/**
 * The `reloadWebView` arguments a Text Collection re-point to `projectId` must produce. Spread into
 * `toHaveBeenCalledWith` so `expect` stays at the call site, which is what `vitest/expect-expect`
 * recognizes as an assertion.
 */
function gridReloadArgs(projectId: string) {
  return [
    SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
    GRID_WEBVIEW_ID,
    expect.objectContaining({ projectId }),
  ] as const;
}

describe('updateRelatedTextCollectionPanel', () => {
  it('reloads the open panel with the incoming project', async () => {
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi([gridDef('proj-a')]);

    await updateRelatedTextCollectionPanel(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });

  it('re-points a panel that has no project yet', async () => {
    // The shipped Simple layout opens the grid with no projectId, so the first switch of a session
    // is this case rather than a project-to-project change.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi([gridDef(undefined)]);

    await updateRelatedTextCollectionPanel(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });

  it('never brings the panel to front', async () => {
    // Re-pointing Column 3 must not yank the user off whichever tab they were on.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi([gridDef('proj-a')]);

    await updateRelatedTextCollectionPanel(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(
      SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
      GRID_WEBVIEW_ID,
      expect.objectContaining({ bringToFront: false }),
    );
  });

  it('skips the reload when the panel already shows the project', async () => {
    // Reloading rebuilds the iframe and drops transient grid state, so an unchanged project must
    // not trigger one.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi([gridDef('proj-a')]);

    await updateRelatedTextCollectionPanel(papi, 'proj-a');

    expect(mockReloadWebView).not.toHaveBeenCalled();
  });

  it('does not open a panel when none is open', async () => {
    // "Not open" means the tab was closed in Power mode or the feature setting is off — neither is
    // a state a project switch should reverse.
    const { papi, mockReloadWebView, mockOpenWebView } = createRelatedPanelsMockPapi([
      { id: 'other-1', webViewType: 'platformScriptureEditor.bibleTexts', projectId: 'proj-a' },
    ]);

    await updateRelatedTextCollectionPanel(papi, 'proj-b');

    expect(mockReloadWebView).not.toHaveBeenCalled();
    expect(mockOpenWebView).not.toHaveBeenCalled();
  });

  it('skips the reload when the open panel already shows the project in different casing', async () => {
    // Ids reach here verbatim from a resource reference while the .NET side canonicalizes to
    // uppercase, so a raw === would reload needlessly and discard the panel's in-memory state.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi([gridDef('PROJ-A')]);

    await updateRelatedTextCollectionPanel(papi, 'proj-a');

    expect(mockReloadWebView).not.toHaveBeenCalled();
  });

  it('resolves without throwing and reports an error when the reload rejects', async () => {
    const { papi, mockReloadWebView, mockError } = createRelatedPanelsMockPapi([gridDef('proj-a')]);
    mockReloadWebView.mockRejectedValue(new Error('reload failed'));

    await expect(updateRelatedTextCollectionPanel(papi, 'proj-b')).resolves.toBeUndefined();
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('reload failed'));
    // Names the project left on screen, so the log says what the user is actually looking at.
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('proj-a'));
  });

  it('reports an error when the reload resolves no id, which it does instead of throwing', async () => {
    // `reloadWebView` resolves undefined when the definition has gone or the provider declines.
    // The re-point is the panel's only project signal, so a silent no-op here is not acceptable.
    const { papi, mockReloadWebView, mockError } = createRelatedPanelsMockPapi([gridDef('proj-a')]);
    mockReloadWebView.mockResolvedValue(undefined);

    await expect(updateRelatedTextCollectionPanel(papi, 'proj-b')).resolves.toBeUndefined();
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('did not take'));
  });

  it('resolves without throwing and reports an error when the open-web-view probe fails', async () => {
    const { papi, mockGetAllOpenWebViewDefinitions, mockError } = createRelatedPanelsMockPapi();
    mockGetAllOpenWebViewDefinitions.mockRejectedValue(new Error('probe failed'));

    await expect(updateRelatedTextCollectionPanel(papi, 'proj-b')).resolves.toBeUndefined();
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('probe failed'));
    // Distinct from "no panel is open": the router rejects when a window is unreachable, so what is
    // open is unknown rather than empty.
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('could not establish'));
  });

  it('does not follow a published resource', async () => {
    // A published resource has no text collection of its own, so re-pointing the grid at it would
    // cost a reload for an empty panel.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      PUBLISHED_RESOURCE,
    );

    await updateRelatedTextCollectionPanel(papi, 'resource-1');

    expect(mockReloadWebView).not.toHaveBeenCalled();
  });

  it('follows a translation project with editing switched off', async () => {
    // `Editable=F` does not make a project a published resource.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      READ_ONLY_PROJECT,
    );

    await updateRelatedTextCollectionPanel(papi, 'read-only-proj');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('read-only-proj'));
  });

  it('classifies the incoming project, not the one the panel already shows', async () => {
    const { papi, mockReloadWebView, setProjectKind } = createRelatedPanelsMockPapi([
      gridDef('proj-a'),
    ]);
    setProjectKind('proj-a', PUBLISHED_RESOURCE);
    setProjectKind('proj-b', EDITABLE_PROJECT);

    await updateRelatedTextCollectionPanel(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });

  it('uses the published reading a caller already started instead of reading again', async () => {
    const { papi, mockReloadWebView, mockProjectDataProvidersGet } = createRelatedPanelsMockPapi([
      gridDef('proj-a'),
    ]);

    await updateRelatedTextCollectionPanel(papi, 'resource-1', Promise.resolve(true));

    expect(mockReloadWebView).not.toHaveBeenCalled();
    expect(mockProjectDataProvidersGet).not.toHaveBeenCalled();
  });

  it.each([
    ['no panel is open', []],
    ['the panel already shows the project', [gridDef('proj-a')]],
  ])(
    'does not read whether the project is published when %s',
    async (_label, openDefs: Array<Partial<SavedWebViewDefinition>>) => {
      // The Power→Simple switch normally lands here: the grid arrives already bound, or is not open
      // at all. A read there is wasted, and a failed one would warn about a re-point that was never
      // going to happen.
      const { papi, mockProjectDataProvidersGet, mockWarn } = createRelatedPanelsMockPapi(openDefs);
      mockProjectDataProvidersGet.mockRejectedValue(new Error('pdp unavailable'));

      await updateRelatedTextCollectionPanel(papi, 'proj-a');

      expect(mockProjectDataProvidersGet).not.toHaveBeenCalled();
      expect(mockWarn).not.toHaveBeenCalled();
    },
  );

  it('treats a project whose provider cannot be reached as a translation project and says so', async () => {
    // `platform.isPublished` defaults to false, and following is recoverable (the next switch
    // re-points again), whereas staying would leave the grid silently on the outgoing project.
    const { papi, mockReloadWebView, mockProjectDataProvidersGet, mockWarn } =
      createRelatedPanelsMockPapi([gridDef('proj-a')], PUBLISHED_RESOURCE);
    mockProjectDataProvidersGet.mockRejectedValue(new Error('pdp unavailable'));

    await expect(updateRelatedTextCollectionPanel(papi, 'proj-b')).resolves.toBeUndefined();

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('pdp unavailable'));
  });

  it.each([
    ['rejects', () => Promise.reject(new Error('setting read failed'))],
    ['resolves undefined', async () => undefined],
    // A truthy non-boolean too: a provider that answers outside the setting's contract must not be
    // read as "published", which a coercion to boolean would do.
    ['resolves a truthy non-boolean', async () => 'no'],
  ])('follows a project whose isPublished read %s', async (_label, reading) => {
    // Only an explicit `true` withholds the panel; anything else is a project to follow. The
    // project is otherwise a published resource, so a gate that read `platform.isEditable`
    // instead would withhold the panel and fail here.
    const { papi, mockReloadWebView, overrideIsPublished } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      PUBLISHED_RESOURCE,
    );
    overrideIsPublished(reading);

    await expect(updateRelatedTextCollectionPanel(papi, 'proj-b')).resolves.toBeUndefined();

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });
});

// #endregion updateRelatedTextCollectionPanel

// #region openOrUpdateRelatedPanels

describe('openOrUpdateRelatedPanels', () => {
  it('re-points the Text Collection panel at an editable project', async () => {
    // Every Column 3 panel must be re-pointed on a project switch. The Text Collection is the one
    // re-pointed by reload rather than by command, so it is easy to leave out of this batch.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      EDITABLE_PROJECT,
    );

    await openOrUpdateRelatedPanels(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });

  it('re-points the Text Collection panel at a translation project with editing switched off', async () => {
    // `Editable=F` does not make a project a published resource, so the panel must still follow it.
    const { papi, mockReloadWebView } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      READ_ONLY_PROJECT,
    );

    await openOrUpdateRelatedPanels(papi, 'read-only-proj');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('read-only-proj'));
  });

  it('leaves the Text Collection alone for a published resource but still re-points the rest', async () => {
    // A published resource has no text collection of its own, so re-pointing the grid at it would
    // cost a reload for an empty panel. The command-driven panels follow the editor either way.
    const { papi, mockReloadWebView, mockSendCommand } = createRelatedPanelsMockPapi(
      [gridDef('proj-a')],
      PUBLISHED_RESOURCE,
    );

    await openOrUpdateRelatedPanels(papi, 'resource-1');

    expect(mockReloadWebView).not.toHaveBeenCalled();
    expect(mockSendCommand.mock.calls).toEqual([
      ['platformScriptureEditor.openModelText', 'resource-1'],
      ['platformScriptureEditor.openResourceText', 'CommentaryResource', 'resource-1'],
      ['platformScriptureEditor.openResourceText', 'ScriptureResource', 'resource-1'],
      ['legacyCommentManager.openCommentListPanel', 'resource-1'],
    ]);
  });

  it('still re-points the Text Collection when an earlier panel fails', async () => {
    const { papi, mockSendCommand, mockReloadWebView } = createRelatedPanelsMockPapi([
      gridDef('proj-a'),
    ]);
    mockSendCommand.mockRejectedValue(new Error('panel failed'));

    await openOrUpdateRelatedPanels(papi, 'proj-b');

    expect(mockReloadWebView).toHaveBeenCalledWith(...gridReloadArgs('proj-b'));
  });

  it('resolves without throwing when every panel command fails', async () => {
    const { papi, mockSendCommand } = createRelatedPanelsMockPapi([gridDef('proj-a')]);
    mockSendCommand.mockRejectedValue(new Error('everything is down'));

    await expect(openOrUpdateRelatedPanels(papi, 'proj-b')).resolves.toBeUndefined();
  });

  it('still opens the four command-driven panels', async () => {
    const { papi, mockSendCommand } = createRelatedPanelsMockPapi([gridDef('proj-a')]);

    await openOrUpdateRelatedPanels(papi, 'proj-b');

    // Full arguments, not just command names: the names alone pass even if the resource types are
    // swapped or every panel is handed the outgoing projectId, which is the routing this covers.
    expect(mockSendCommand.mock.calls).toEqual([
      ['platformScriptureEditor.openModelText', 'proj-b'],
      ['platformScriptureEditor.openResourceText', 'CommentaryResource', 'proj-b'],
      ['platformScriptureEditor.openResourceText', 'ScriptureResource', 'proj-b'],
      ['legacyCommentManager.openCommentListPanel', 'proj-b'],
    ]);
  });
});

// #endregion openOrUpdateRelatedPanels

describe('updateRelatedChecksSidePanel', () => {
  it.each([
    ['an editable project', EDITABLE_PROJECT],
    ['a translation project with editing switched off', READ_ONLY_PROJECT],
  ])(
    're-points the Checks side panel at %s with the new editor id',
    async (_label, projectKind) => {
      const { papi, mockSendCommand } = createRelatedPanelsMockPapi([], projectKind);

      await updateRelatedChecksSidePanel(papi, 'proj-b', 'editor-2');

      expect(mockSendCommand.mock.calls).toEqual([
        ['platformScripture.updateChecksSidePanelProject', 'proj-b', 'editor-2'],
      ]);
    },
  );

  it('does not follow a published resource', async () => {
    const { papi, mockSendCommand } = createRelatedPanelsMockPapi([], PUBLISHED_RESOURCE);

    await updateRelatedChecksSidePanel(papi, 'proj-b', 'editor-2');

    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('does nothing in Power mode, where each Checks panel belongs to the editor it was opened for', async () => {
    const { papi, mockSendCommand, mockSettingsGet } = createRelatedPanelsMockPapi();
    mockSettingsGet.mockResolvedValue('power');

    await updateRelatedChecksSidePanel(papi, 'proj-b', 'editor-2');

    expect(mockSettingsGet).toHaveBeenCalledWith('platform.interfaceMode');
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('logs and swallows a rejection, since the project switch has already succeeded', async () => {
    const { papi, mockSendCommand, mockWarn } = createRelatedPanelsMockPapi();
    mockSendCommand.mockRejectedValue(new Error('platformScripture is down'));

    await expect(updateRelatedChecksSidePanel(papi, 'proj-b', 'editor-2')).resolves.toBeUndefined();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('platformScripture is down'));
  });
});

describe('getTabTitleProjectName', () => {
  /** A PAPI whose `platform.base` PDP returns the settings this test hands it. */
  function papiWithSettings(settings: Record<string, unknown>) {
    const mockGetSetting = vi.fn(async (key: string) => settings[key]);
    const mockGet = vi.fn().mockResolvedValue({ getSetting: mockGetSetting });
    // Mocking just the part of the PAPI that we need for these tests
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const papi = {
      projectDataProviders: { get: mockGet },
    } as unknown as typeof PapiBackend;
    return { papi, mockGet, mockGetSetting };
  }

  it('shows the short name, not the full name', async () => {
    const { papi } = papiWithSettings({
      'platform.name': 'WEB',
      'platform.fullName': 'World English Bible',
    });

    // Both settings are populated, so a tab title reading the wrong one — or joining the two the
    // way every other surface now does — is distinguishable from the correct answer here.
    expect(await getTabTitleProjectName(papi, 'project-1')).toBe('WEB');
  });

  it('falls back to the project id when the project has no short name', async () => {
    const { papi } = papiWithSettings({});

    expect(await getTabTitleProjectName(papi, 'project-1')).toBe('project-1');
  });
});

// #region updateRelatedFindPanel

describe('updateRelatedFindPanel', () => {
  const FIND_COMMAND = 'platformScripture.updateFindProject';

  it.each([
    ['an editable project', EDITABLE_PROJECT],
    ['a translation project with editing switched off', READ_ONLY_PROJECT],
    ['a published resource', PUBLISHED_RESOURCE],
  ])('re-points Find at %s with the new editor id', async (_label, projectKind) => {
    // Find follows the editor onto every project kind, because searching is a read. The cases are
    // identical by design: parameterizing by project kind makes a kind gate added inside
    // `updateRelatedFindPanel` fail here. A gate added at its call site in `main.ts` would not.
    const { papi, mockSendCommand } = createRelatedPanelsMockPapi([], projectKind);

    await updateRelatedFindPanel(papi, 'proj-b', 'editor-2');

    expect(mockSendCommand).toHaveBeenCalledWith(FIND_COMMAND, 'proj-b', 'editor-2');
  });

  it('does nothing in Power mode, where Find is a panel the user points themselves', async () => {
    // Read at call time: a long switch can end after the user has already moved to Power mode.
    const { papi, mockSendCommand, mockSettingsGet } = createRelatedPanelsMockPapi();
    mockSettingsGet.mockResolvedValue('power');

    await updateRelatedFindPanel(papi, 'proj-b', 'editor-2');

    expect(mockSettingsGet).toHaveBeenCalledWith('platform.interfaceMode');
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('resolves without throwing when the Find command fails', async () => {
    const { papi, mockSendCommand, mockWarn } = createRelatedPanelsMockPapi();
    mockSendCommand.mockRejectedValue(new Error('find is down'));

    await expect(updateRelatedFindPanel(papi, 'proj-b', 'editor-2')).resolves.toBeUndefined();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('find is down'));
  });

  it('resolves without re-pointing when the interface mode cannot be read', async () => {
    const { papi, mockSendCommand, mockSettingsGet, mockWarn } = createRelatedPanelsMockPapi();
    mockSettingsGet.mockRejectedValue(new Error('settings are down'));

    await expect(updateRelatedFindPanel(papi, 'proj-b', 'editor-2')).resolves.toBeUndefined();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('settings are down'));
  });
});

// #endregion updateRelatedFindPanel

// #region resolveGridProviderProjectId

describe('resolveGridProviderProjectId', () => {
  it('prefers the project a switch supplied over the one the tab already had', () => {
    // Inverting this strands the panel: the re-point passes the incoming project in options, and falling
    // back to the saved id leaves the panel on the outgoing project.
    expect(resolveGridProviderProjectId({ projectId: 'incoming' }, { projectId: 'outgoing' })).toBe(
      'incoming',
    );
  });

  it('keeps the saved project when the caller supplied none', () => {
    // A restored tab, or one re-provided for a reason unrelated to a project switch.
    expect(resolveGridProviderProjectId({}, { projectId: 'saved' })).toBe('saved');
  });

  it('binds no project when neither half names one', () => {
    // The shipped default-layout open: the grid starts unbound and follows the scroll group.
    expect(resolveGridProviderProjectId({}, {})).toBeUndefined();
  });
});

// #endregion

// #region buildScriptureTextGridWebView

/** Papi mock exposing only what the grid's web view provider reads. */
function createGridProviderMockPapi(interfaceMode: string) {
  // Must cast since the mock only includes the papi properties the provider uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    settings: { get: vi.fn().mockResolvedValue(interfaceMode) },
    localization: {
      getLocalizedStrings: vi
        .fn()
        .mockResolvedValue({ '%webView_scriptureTextGrid_title_multiple%': 'Text Collection' }),
    },
  } as unknown as typeof PapiBackend;
}

const GRID_ASSETS = { content: '<html></html>', styles: '.a{}' };

/**
 * A saved Text Collection definition carrying only the fields the provider reads. `webViewType` is
 * a parameter so the wrong-type case needs no mutation.
 */
function savedGrid(
  projectId: string | undefined,
  webViewType: string = SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
): SavedWebViewDefinition {
  const definition = { id: 'grid-1', webViewType, projectId };
  // A full SavedWebViewDefinition carries fields this function never touches; constructing them
  // would obscure which ones the assertions below actually depend on.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return definition as unknown as SavedWebViewDefinition;
}

describe('buildScriptureTextGridWebView', () => {
  it.each(['simple', 'power'] as const)(
    'opts its icon in to theme colouring in %s mode',
    async (interfaceMode) => {
      const papi = createGridProviderMockPapi(interfaceMode);

      const definition = await buildScriptureTextGridWebView(
        papi,
        savedGrid('p1'),
        {},
        GRID_ASSETS,
      );

      expect(definition.iconName).toBe('library');
      expect(LUCIDE_ICON_NAMES).toContain(definition.iconName);
    },
  );

  it('binds the project a switch supplied rather than the one the tab already had', async () => {
    // The provider half of the re-point. Inverting this precedence leaves the panel on the
    // outgoing project, which is the bug this whole mechanism exists to prevent — and it is only
    // caught here, since the provider itself is unreachable from a test.
    const papi = createGridProviderMockPapi('simple');

    const definition = await buildScriptureTextGridWebView(
      papi,
      savedGrid('outgoing'),
      { projectId: 'incoming' },
      GRID_ASSETS,
    );

    expect(definition.projectId).toBe('incoming');
  });

  it('keeps the saved project when the caller supplied none', async () => {
    const papi = createGridProviderMockPapi('simple');

    const definition = await buildScriptureTextGridWebView(
      papi,
      savedGrid('saved'),
      {},
      GRID_ASSETS,
    );

    expect(definition.projectId).toBe('saved');
  });

  it('pins the panel to scroll group 0 and makes it unclosable in Simple mode', async () => {
    const papi = createGridProviderMockPapi('simple');

    const definition = await buildScriptureTextGridWebView(papi, savedGrid('p1'), {}, GRID_ASSETS);

    expect(definition.isClosable).toBe(false);
    expect(definition.scrollGroupScrRef).toBe(0);
  });

  it('leaves the panel closable and its scroll group alone in Power mode', async () => {
    const papi = createGridProviderMockPapi('power');

    const definition = await buildScriptureTextGridWebView(papi, savedGrid('p1'), {}, GRID_ASSETS);

    expect(definition.isClosable).toBe(true);
  });

  it('refuses to provide a web view of another type', async () => {
    const papi = createGridProviderMockPapi('simple');
    const wrongType = savedGrid('p1', 'someOther.webView');

    await expect(buildScriptureTextGridWebView(papi, wrongType, {}, GRID_ASSETS)).rejects.toThrow(
      'someOther.webView',
    );
  });
});

// #endregion

describe('withDocumentEndOnText', () => {
  /** `\p \v 1 In the b` as the document's last paragraph; its text is `$.content[2].content[1]`. */
  const lastParagraph = {
    type: 'para',
    marker: 'p',
    content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the b'],
  };
  const endsInText: Usj = {
    type: USJ_TYPE,
    version: USJ_VERSION,
    content: [
      { type: 'book', marker: 'id', code: 'GEN' },
      { type: 'chapter', marker: 'c', number: '1' },
      lastParagraph,
    ],
  };

  it('brings the document-end spelling (one past the text) onto the end of the text', () => {
    expect(
      withDocumentEndOnText({ jsonPath: '$.content[2].content[1]', offset: 9 }, 8, endsInText),
    ).toEqual({ jsonPath: '$.content[2].content[1]', offset: 8 });
  });

  it.each<[string, UsjTextContentLocation]>([
    ['an offset inside the text', { jsonPath: '$.content[2].content[1]', offset: 3 }],
    ['the end of the text', { jsonPath: '$.content[2].content[1]', offset: 8 }],
    ['an offset no location rule produces', { jsonPath: '$.content[2].content[1]', offset: 10 }],
  ])('leaves %s alone', (_name, location) => {
    expect(withDocumentEndOnText(location, 8, endsInText)).toBe(location);
  });

  it('leaves one past the end alone on a text that is not the last in the document', () => {
    const location: UsjTextContentLocation = { jsonPath: '$.content[2].content[1]', offset: 9 };
    const followed: Usj = {
      ...endsInText,
      content: [...endsInText.content, { type: 'para', marker: 'p', content: ['God said'] }],
    };

    expect(withDocumentEndOnText(location, 8, followed)).toBe(location);
  });
});
describe('validateCommentSelection', () => {
  const NOT_RESOLVED = '%webView_platformScriptureEditor_error_selectionNotResolved%';
  const CONTAINS_MARKERS = '%webView_platformScriptureEditor_error_selectionContainsMarkers%';
  const NO_TEXT = '%webView_platformScriptureEditor_error_noTextSelected%';

  const refrain = 'for his loving kindness endures forever.';
  const doc: Usj = {
    type: USJ_TYPE,
    version: USJ_VERSION,
    content: [
      { type: 'book', marker: 'id', code: 'PSA' },
      { type: 'chapter', marker: 'c', number: '136' },
      // 2: verse text with a footnote and a \nd span
      {
        type: 'para',
        marker: 'p',
        content: [
          { type: 'verse', marker: 'v', number: '1' },
          'In the beginning',
          {
            type: 'note',
            marker: 'f',
            caller: '+',
            content: [{ type: 'char', marker: 'ft', content: ['a note'] }],
          },
          ' God said ',
          { type: 'char', marker: 'nd', content: ['LORD'] },
          ' hello',
        ],
      },
      { type: 'para', marker: 'q2', content: [refrain] },
      { type: 'para', marker: 'b' },
      { type: 'para', marker: 'q1', content: [{ type: 'verse', marker: 'v', number: '2' }] },
      { type: 'para', marker: 'q2', content: [refrain] },
      {
        type: 'para',
        marker: 'p',
        content: [{ type: 'char', marker: 'w', lemma: 'grace', content: ['grace'] }, ' end'],
      },
    ],
  };
  const text = '$.content[2].content[1]';

  it('anchors a text range as is', () => {
    expect(
      validateCommentSelection(
        { start: { jsonPath: text, offset: 7 }, end: { jsonPath: text, offset: 16 } },
        doc,
      ),
    ).toEqual({
      range: { start: { jsonPath: text, offset: 7 }, end: { jsonPath: text, offset: 16 } },
    });
  });

  it('expands a collapsed caret to the word around it', () => {
    expect(validateCommentSelection({ start: { jsonPath: text, offset: 10 } }, doc)).toEqual({
      range: { start: { jsonPath: text, offset: 7 }, end: { jsonPath: text, offset: 16 } },
    });
  });

  it('refuses a collapsed caret between whitespace', () => {
    expect(
      validateCommentSelection({ start: { jsonPath: '$.content[2].content[3]', offset: 0 } }, doc),
    ).toEqual({ notice: NO_TEXT });
  });

  it('warns for a text path that does not resolve', () => {
    const result = validateCommentSelection(
      { start: { jsonPath: '$.content[40].content[1]', offset: 2 } },
      doc,
    );
    expect(result).toMatchObject({ notice: NOT_RESOLVED });
    expect(result).toHaveProperty('warning');
  });

  it('warns for an end offset past the length of the text', () => {
    const result = validateCommentSelection(
      { start: { jsonPath: text, offset: 2 }, end: { jsonPath: text, offset: 40 } },
      doc,
    );
    expect(result).toMatchObject({ notice: NOT_RESOLVED });
    expect(result).toHaveProperty('warning');
  });

  it('warns for a collapsed caret past the length of the text', () => {
    const result = validateCommentSelection({ start: { jsonPath: text, offset: 17 } }, doc);
    expect(result).toMatchObject({ notice: NOT_RESOLVED });
    expect(result).toHaveProperty('warning');
  });

  it('accepts the document end on the last text', () => {
    const lastText: Usj = {
      ...doc,
      content: [...doc.content.slice(0, 2), { type: 'para', marker: 'p', content: ['The end'] }],
    };
    expect(
      validateCommentSelection(
        {
          start: { jsonPath: '$.content[2].content[0]', offset: 4 },
          end: { jsonPath: '$.content[2].content[0]', offset: 8 },
        },
        lastText,
      ),
    ).toEqual({
      range: {
        start: { jsonPath: '$.content[2].content[0]', offset: 4 },
        end: { jsonPath: '$.content[2].content[0]', offset: 7 },
      },
    });
  });

  it('refuses a range across a character span', () => {
    expect(
      validateCommentSelection(
        {
          start: { jsonPath: '$.content[2].content[3]', offset: 2 },
          end: { jsonPath: '$.content[2].content[5]', offset: 3 },
        },
        doc,
      ),
    ).toEqual({ notice: CONTAINS_MARKERS });
  });

  it('refuses a range across two identical strings in different paragraphs', () => {
    expect(
      validateCommentSelection(
        {
          start: { jsonPath: '$.content[3].content[0]', offset: 4 },
          end: { jsonPath: '$.content[6].content[0]', offset: 10 },
        },
        doc,
      ),
    ).toEqual({ notice: CONTAINS_MARKERS });
  });

  it.each([
    ['an empty paragraph marker', { jsonPath: "$.content[4]['marker']", propertyOffset: 1 }],
    [
      'a line-final verse number',
      { jsonPath: "$.content[5].content[0]['number']", propertyOffset: 1 },
    ],
    [
      'a lemma that equals the word',
      { jsonPath: "$.content[7].content[0]['lemma']", propertyOffset: 2 },
    ],
  ])('refuses a collapsed caret on %s without a warning', (_name, start) => {
    expect(validateCommentSelection({ start }, doc)).toEqual({ notice: NO_TEXT });
  });

  it('refuses a range ending on a property location without a warning', () => {
    expect(
      validateCommentSelection(
        {
          start: { jsonPath: text, offset: 2 },
          end: { jsonPath: "$.content[5].content[0]['number']", propertyOffset: 1 },
        },
        doc,
      ),
    ).toEqual({ notice: CONTAINS_MARKERS });
  });

  it('treats a range end on the next marker as the end of the text before it', () => {
    const viaMarker = validateCommentSelection(
      { start: { jsonPath: text, offset: 7 }, end: { jsonPath: '$.content[2].content[2]' } },
      doc,
    );
    const viaText = validateCommentSelection(
      { start: { jsonPath: text, offset: 7 }, end: { jsonPath: text, offset: 16 } },
      doc,
    );
    expect(viaMarker).toEqual(viaText);
    expect(viaMarker).toHaveProperty('range');
  });
});

// #region resolveNoteVerseRef

describe('resolveNoteVerseRef (picking a note navigates to its verse)', () => {
  const currentScrRef = {
    book: 'GEN',
    chapterNum: 1,
    verseNum: 1,
    versificationStr: 'English',
  };

  function note(text: string): object {
    return {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [{ type: 'char', marker: 'ft', content: [text] }],
    };
  }

  const chapterWithNotesInTwoVerses: Usj = {
    type: USJ_TYPE,
    version: USJ_VERSION,
    content: [
      { type: 'book', marker: 'id', code: 'GEN', content: ['Test'] },
      { type: 'chapter', marker: 'c', number: '1' },
      {
        type: 'para',
        marker: 'p',
        content: [
          { type: 'verse', marker: 'v', number: '1' },
          'a ',
          note('alpha'),
          { type: 'verse', marker: 'v', number: '4' },
          'b ',
          note('beta'),
        ],
      },
    ],
  };

  it('resolves each note to the verse it sits in', () => {
    expect(resolveNoteVerseRef(chapterWithNotesInTwoVerses, 0, currentScrRef)).toEqual({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
      versificationStr: 'English',
    });
    expect(resolveNoteVerseRef(chapterWithNotesInTwoVerses, 1, currentScrRef)).toEqual({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 4,
      versificationStr: 'English',
    });
  });

  // The editor stamps its documents 3.1 and the markers map is declared for 3.0; left uncorrected,
  // the reader warns on every pick.
  it("reads the editor's own document version without logging it", () => {
    expect(chapterWithNotesInTwoVerses.version).toBe('3.1');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      expect(resolveNoteVerseRef(chapterWithNotesInTwoVerses, 1, currentScrRef)?.verseNum).toBe(4);
      expect(findEditorUsjNotes(chapterWithNotesInTwoVerses)).toHaveLength(2);
      expect(warn).not.toHaveBeenCalled();
    } finally {
      warn.mockRestore();
    }
  });

  it('changes nothing but the verse — the editor holds one chapter', () => {
    const resolved = resolveNoteVerseRef(chapterWithNotesInTwoVerses, 1, {
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
      versificationStr: 'Vulgate',
    });
    expect(resolved).toEqual({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 4,
      versificationStr: 'Vulgate',
    });
  });

  it('drops the verse range the caret was in, which names a different verse than the note', () => {
    const resolved = resolveNoteVerseRef(chapterWithNotesInTwoVerses, 1, {
      ...currentScrRef,
      verseNum: 2,
      verse: '2-3',
    });
    expect(resolved?.verseNum).toBe(4);
    expect(resolved).not.toHaveProperty('verse');
  });

  it('resolves a note that sits before the first verse to verse 0, not to nothing', () => {
    const noteInAHeading: Usj = {
      type: USJ_TYPE,
      version: USJ_VERSION,
      content: [
        { type: 'book', marker: 'id', code: 'GEN', content: ['Test'] },
        { type: 'chapter', marker: 'c', number: '1' },
        { type: 'para', marker: 's', content: ['Heading ', note('about the heading')] },
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '1' }, 'a'],
        },
      ],
    };
    expect(resolveNoteVerseRef(noteInAHeading, 0, currentScrRef)?.verseNum).toBe(0);
  });

  it('leaves the reference alone when there is no note at that index', () => {
    expect(resolveNoteVerseRef(chapterWithNotesInTwoVerses, 5, currentScrRef)).toBeUndefined();
    expect(resolveNoteVerseRef(chapterWithNotesInTwoVerses, -1, currentScrRef)).toBeUndefined();
    expect(resolveNoteVerseRef(undefined, 0, currentScrRef)).toBeUndefined();
  });

  it('reports nothing rather than throwing out of a click handler on USJ it cannot read', () => {
    // Content that is not an array at all: the reader throws walking it, and a caller-click
    // handler must see `undefined` rather than an exception.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const unreadable = { type: USJ_TYPE, version: USJ_VERSION, content: 'oops' } as unknown as Usj;
    expect(resolveNoteVerseRef(unreadable, 0, currentScrRef)).toBeUndefined();
  });
});

// #endregion resolveNoteVerseRef

describe('readCommentRangeText', () => {
  const makeDoc = (content: Usj['content'][number][]): Usj => ({
    type: USJ_TYPE,
    version: USJ_VERSION,
    content: [{ type: 'book', marker: 'id', code: 'PSA' }, ...content],
  });
  const path = '$.content[1].content[0]';
  const range = (startOffset: number, endOffset: number) => ({
    start: { jsonPath: path, offset: startOffset },
    end: { jsonPath: path, offset: endOffset },
  });
  const doc = makeDoc([{ type: 'para', marker: 'p', content: ['In the beginning'] }]);

  it.each([
    ['a slice of the text', doc, range(3, 6), 'the'],
    ['the whole text', doc, range(0, 16), 'In the beginning'],
    [
      'a path that is gone',
      makeDoc([{ type: 'para', marker: 'p', content: [] }]),
      range(3, 6),
      undefined,
    ],
    [
      'a path that is now a marker',
      makeDoc([
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'char', marker: 'nd', content: ['the'] }],
        },
      ]),
      range(3, 6),
      undefined,
    ],
    [
      'text that is now shorter than the range',
      makeDoc([{ type: 'para', marker: 'p', content: ['In'] }]),
      range(3, 6),
      undefined,
    ],
  ])('reads %s', (_name, usj, r, expected) => {
    expect(readCommentRangeText(r, usj)).toBe(expected);
  });
});

describe('hasPendingCommentTextChanged', () => {
  const path = '$.content[1].content[0]';
  const pending = {
    range: { start: { jsonPath: path, offset: 3 }, end: { jsonPath: path, offset: 6 } },
    anchoredText: 'the',
  };
  const docWith = (text: string): Usj => ({
    type: USJ_TYPE,
    version: USJ_VERSION,
    content: [
      { type: 'book', marker: 'id', code: 'PSA' },
      { type: 'para', marker: 'p', content: [text] },
    ],
  });

  it.each([
    ['the anchored text is unchanged', 'In the beginning', false],
    ['text after the range changed', 'In the beginnings', false],
    ['text before the range shifted it', 'Oh, in the beginning', true],
    ['the anchored text itself changed', 'In her beginning', true],
    ['the text became too short', 'In', true],
  ])('when %s', (_name, text, expected) => {
    expect(hasPendingCommentTextChanged(pending, docWith(text))).toBe(expected);
  });
});

// #region showCommentThreadForInterfaceMode

describe('showCommentThreadForInterfaceMode', () => {
  function makeMockPapi() {
    const sendCommand = vi.fn().mockResolvedValue('web-view-id');
    const warn = vi.fn();
    // Mock literal cannot satisfy the full PAPI interface — cast for test isolation.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const papi = { commands: { sendCommand }, logger: { warn } } as unknown as typeof PapiBackend;
    return { papi, sendCommand, warn };
  }

  const options = { editorWebViewId: 'editor-1', threadId: 'thread-1' };

  it("raises the Column 3 Comments tab on the thread in Simple mode, for the editor's project, and opens nothing else", async () => {
    const { papi, sendCommand } = makeMockPapi();

    await showCommentThreadForInterfaceMode(papi, { ...options, isPowerMode: false });

    expect(sendCommand).toHaveBeenCalledTimes(1);
    expect(sendCommand).toHaveBeenCalledWith(
      'legacyCommentManager.selectCommentThreadInPanel',
      'thread-1',
      true,
      'editor-1',
    );
  });

  it("opens the editor's comment list on the thread in Power mode, and opens nothing else", async () => {
    const { papi, sendCommand } = makeMockPapi();

    await showCommentThreadForInterfaceMode(papi, { ...options, isPowerMode: true });

    expect(sendCommand).toHaveBeenCalledTimes(1);
    expect(sendCommand).toHaveBeenCalledWith('legacyCommentManager.openCommentList', 'editor-1', {
      threadIdToSelect: 'thread-1',
    });
  });

  it.each([
    ['Simple', false],
    ['Power', true],
  ])(
    'warns instead of throwing when the %s-mode navigation rejects',
    async (_mode, isPowerMode) => {
      const { papi, sendCommand, warn } = makeMockPapi();
      sendCommand.mockRejectedValue(new Error('navigation failed'));

      await expect(
        showCommentThreadForInterfaceMode(papi, { ...options, isPowerMode }),
      ).resolves.toBeUndefined();
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('navigation failed'));
    },
  );

  it.each([
    ['Simple', false],
    ['Power', true],
  ])(
    'warns instead of throwing when the %s-mode navigation finds no web view',
    async (_mode, isPowerMode) => {
      const { papi, sendCommand, warn } = makeMockPapi();
      sendCommand.mockResolvedValue(undefined);

      await expect(
        showCommentThreadForInterfaceMode(papi, { ...options, isPowerMode }),
      ).resolves.toBeUndefined();
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('thread-1'));
    },
  );
});

// #endregion showCommentThreadForInterfaceMode

// #region unsupported projects

/** A PAPI whose project lookup answers with the functions a test hands it. */
function stubPapi(projectLookup: {
  getMetadataForProject?: (projectId: string) => Promise<unknown>;
  getMetadataForAllProjects?: (options: { includeProjectIds: string[] }) => Promise<unknown>;
}) {
  // Must cast since the mock only includes the papi properties these helpers use.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    projectLookup,
    logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn() },
  } as unknown as typeof PapiBackend;
}

describe('getProjectUnsupportedReason', () => {
  it('returns the reason on the project’s metadata', async () => {
    const papi = stubPapi({
      getMetadataForProject: async () => ({
        id: 'SBA',
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      }),
    });
    await expect(getProjectUnsupportedReason(papi, 'SBA')).resolves.toBe(
      '%project_unsupported_studyBibleAdditions%',
    );
  });

  it('treats a project with no reason as openable', async () => {
    const papi = stubPapi({
      getMetadataForProject: async () => ({ id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} }),
    });
    await expect(getProjectUnsupportedReason(papi, 'P1')).resolves.toBe('');
  });

  it('treats a reason the lookup left present but undefined as openable', async () => {
    const papi = stubPapi({
      getMetadataForProject: async () => ({
        id: 'P1',
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason: undefined,
      }),
    });
    await expect(getProjectUnsupportedReason(papi, 'P1')).resolves.toBe('');
  });

  it('treats a failed lookup as openable, so an error never locks a user out', async () => {
    const papi = stubPapi({
      getMetadataForProject: async () => {
        throw new Error('No project found');
      },
    });
    await expect(getProjectUnsupportedReason(papi, 'P1')).resolves.toBe('');
  });

  // An interface only C#'s Paratext factory serves makes the lookup wait for that factory, whose
  // answer carries the reason, rather than settling on whichever factory registered first.
  it('asks for the project through the interface every Paratext project serves', async () => {
    const getMetadataForProject = vi.fn(async () => ({
      id: 'P1',
      projectInterfaces: [],
      pdpFactoryInfo: {},
    }));
    const papi = stubPapi({ getMetadataForProject });

    await getProjectUnsupportedReason(papi, 'P1');

    expect(getMetadataForProject).toHaveBeenCalledWith(
      'P1',
      'platformScripture.scriptureEditPermissions',
    );
  });
});

describe('buildScriptureEditorWebViewState', () => {
  const SBA_REASON = '%project_unsupported_studyBibleAdditions%';

  /** A lookup that answers every project with `unsupportedReason`. */
  function papiReporting(unsupportedReason: string | undefined) {
    return stubPapi({
      getMetadataForProject: vi.fn(async (id: string) => ({
        id,
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason,
      })),
    });
  }

  it('gives an unsupported project its reason, keeping the rest of the state', async () => {
    const state = await buildScriptureEditorWebViewState(papiReporting(SBA_REASON), 'SBA', {
      isReadOnly: false,
    });

    expect(state).toEqual({
      isReadOnly: false,
      [UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]: SBA_REASON,
    });
  });

  it('clears a reason saved in the layout once the project can be opened', async () => {
    const state = await buildScriptureEditorWebViewState(papiReporting(undefined), 'P1', {
      [UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]: SBA_REASON,
    });

    expect(state[UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]).toBe('');
  });

  it('treats a failed lookup as openable, even over a saved reason', async () => {
    const papi = stubPapi({
      getMetadataForProject: async () => {
        throw new Error('No project found');
      },
    });

    const state = await buildScriptureEditorWebViewState(papi, 'P1', {
      [UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]: SBA_REASON,
    });

    expect(state[UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]).toBe('');
  });

  it('looks nothing up for a view with no project', async () => {
    const papi = papiReporting(SBA_REASON);

    const state = await buildScriptureEditorWebViewState(papi, undefined, {});

    expect(state[UNSUPPORTED_REASON_WEB_VIEW_STATE_KEY]).toBe('');
    expect(papi.projectLookup.getMetadataForProject).not.toHaveBeenCalled();
  });
});

describe('createUnsupportedProjectIdsCache', () => {
  function unsupportedMetadata() {
    return [
      { id: 'SBA', projectInterfaces: [], pdpFactoryInfo: {}, unsupportedReason: '%x%' },
      { id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} },
      { id: 'P2', projectInterfaces: [], pdpFactoryInfo: {}, unsupportedReason: undefined },
    ];
  }

  /** A lookup that answers only for the ids it is asked about, as the lookup service does. */
  function filteringLookup() {
    return vi.fn(async ({ includeProjectIds }: { includeProjectIds: string[] }) =>
      unsupportedMetadata().filter((m) => includeProjectIds.includes(m.id)),
    );
  }

  it('names its candidates in one lookup, and reports which of them cannot be opened', async () => {
    // Naming them is what lets the lookup service wait for a factory that has not registered yet.
    const getMetadataForAllProjects = filteringLookup();
    const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));

    await expect(cache.getUnsupportedProjectIds(['SBA', 'P1'])).resolves.toEqual(new Set(['SBA']));
    expect(getMetadataForAllProjects.mock.calls).toEqual([[{ includeProjectIds: ['SBA', 'P1'] }]]);
  });

  it('reports only the candidates it was asked about', async () => {
    const cache = createUnsupportedProjectIdsCache(
      stubPapi({ getMetadataForAllProjects: async () => unsupportedMetadata() }),
    );

    await expect(cache.getUnsupportedProjectIds(['P1'])).resolves.toEqual(new Set());
  });

  it('returns normalized ids, so a candidate id in another case still finds its match', async () => {
    // The metadata id is lower-cased here, unlike the upper-cased ids the data provider sends, so
    // the result is normalized by the cache itself rather than by whoever built the metadata.
    const cache = createUnsupportedProjectIdsCache(
      stubPapi({
        getMetadataForAllProjects: async () => [
          { id: 'abc123', projectInterfaces: [], pdpFactoryInfo: {}, unsupportedReason: '%x%' },
        ],
      }),
    );

    const unsupported = await cache.getUnsupportedProjectIds(['abc123']);

    expect(unsupported).toEqual(new Set([normalizeProjectId('abc123')]));
  });

  it('looks nothing up when there are no candidates', async () => {
    const getMetadataForAllProjects = vi.fn(async () => unsupportedMetadata());
    const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));

    await expect(cache.getUnsupportedProjectIds([])).resolves.toEqual(new Set());
    expect(getMetadataForAllProjects).not.toHaveBeenCalled();
  });

  it('treats a failed lookup as every project openable', async () => {
    const cache = createUnsupportedProjectIdsCache(
      stubPapi({
        getMetadataForAllProjects: async () => {
          throw new Error('boom');
        },
      }),
    );

    await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set());
  });

  it('shares one lookup between concurrent calls naming the same project', async () => {
    const getMetadataForAllProjects = filteringLookup();
    const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));

    await Promise.all([
      cache.getUnsupportedProjectIds(['SBA']),
      cache.getUnsupportedProjectIds(['sba']),
    ]);

    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1);
  });

  it('looks up only the candidates it holds no answer for, until invalidated', async () => {
    const getMetadataForAllProjects = filteringLookup();
    const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));

    await cache.getUnsupportedProjectIds(['SBA']);
    await expect(cache.getUnsupportedProjectIds(['SBA', 'P1'])).resolves.toEqual(new Set(['SBA']));
    await cache.getUnsupportedProjectIds(['P1', 'SBA']);
    expect(getMetadataForAllProjects.mock.calls).toEqual([
      [{ includeProjectIds: ['SBA'] }],
      [{ includeProjectIds: ['P1'] }],
    ]);

    cache.invalidate();
    await cache.getUnsupportedProjectIds(['SBA']);
    expect(getMetadataForAllProjects).toHaveBeenCalledTimes(3);
  });

  describe('after a failed lookup', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    function failOnceThenSucceed() {
      return vi
        .fn()
        .mockRejectedValueOnce(new Error('boom'))
        .mockResolvedValue(unsupportedMetadata());
    }

    it('answers every project openable, and looks nothing up again before the retry delay has passed', async () => {
      const getMetadataForAllProjects = failOnceThenSucceed();
      const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));

      await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set());
      vi.advanceTimersByTime(UNSUPPORTED_PROJECT_IDS_RETRY_DELAY_MS - 1);

      await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set());
      expect(getMetadataForAllProjects).toHaveBeenCalledTimes(1);
    });

    it('looks up again once the retry delay has passed, and keeps a success from then on', async () => {
      const getMetadataForAllProjects = failOnceThenSucceed();
      const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));
      await cache.getUnsupportedProjectIds(['SBA']);

      vi.advanceTimersByTime(UNSUPPORTED_PROJECT_IDS_RETRY_DELAY_MS);
      await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set(['SBA']));
      expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);

      vi.advanceTimersByTime(UNSUPPORTED_PROJECT_IDS_RETRY_DELAY_MS * 2);
      await cache.getUnsupportedProjectIds(['SBA']);
      expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);
    });

    it('looks up again straight away once invalidated', async () => {
      const getMetadataForAllProjects = failOnceThenSucceed();
      const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));
      await cache.getUnsupportedProjectIds(['SBA']);

      cache.invalidate();

      await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set(['SBA']));
      expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);
    });

    it('does not let a failure from a lookup that invalidate superseded discard the newer answer', async () => {
      let failSupersededLookup: (error: Error) => void = () => {};
      const getMetadataForAllProjects = vi
        .fn()
        .mockImplementationOnce(
          () =>
            new Promise((_resolve, reject) => {
              failSupersededLookup = reject;
            }),
        )
        .mockResolvedValue(unsupportedMetadata());
      const cache = createUnsupportedProjectIdsCache(stubPapi({ getMetadataForAllProjects }));
      const superseded = cache.getUnsupportedProjectIds(['SBA']);
      cache.invalidate();
      await cache.getUnsupportedProjectIds(['SBA']);

      failSupersededLookup(new Error('late failure'));
      await superseded;
      vi.advanceTimersByTime(UNSUPPORTED_PROJECT_IDS_RETRY_DELAY_MS);

      await expect(cache.getUnsupportedProjectIds(['SBA'])).resolves.toEqual(new Set(['SBA']));
      expect(getMetadataForAllProjects).toHaveBeenCalledTimes(2);
    });
  });
});

// #endregion
