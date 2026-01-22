/* Small utility helpers for the platform-scripture-editor extension. */

import { LocalizationSelectors } from '@papi/core';
import type PapiBackend from '@papi/backend';
import type PapiFrontend from '@papi/frontend';
import {
  formatReplacementString,
  getErrorMessage,
  isLocalizeKey,
  LanguageStrings,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjNodeAndDocumentLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureRange } from 'platform-scripture-editor';

export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Check deep equality of two values such that two equal objects or arrays created in two different
 * iframes successfully test as equal
 *
 * WARNING: This checks things that should not be considered for deep equality like object property
 * order. Do not use this if you can use another simpler `deepEqual` implementation like the one in
 * `platform-bible-utils`. If this implementation ever becomes an issue, it may need to be
 * reworked.
 *
 * @param a Object to compare
 * @param b Object to compare
 * @returns `true` if `a` and `b` are deeply equal; `false` otherwise
 */
export function valuesAreDeeplyEqual(a: unknown, b: unknown): boolean {
  // Lightweight deep-equal used across this extension. Uses JSON.stringify which is
  // sufficient for plain data (objects/arrays/primitives) and has the nice property of
  // comparing across iframe boundaries. If you need richer semantics (Dates, Maps, Sets,
  // circular refs) switch to a robust library such as lodash.isequal.
  return JSON.stringify(a) === JSON.stringify(b);
}

// Alias that makes the "across iframes" intent explicit for callers that prefer it.
// Exported with this syntax to preserve the TSDocs
export { valuesAreDeeplyEqual as deepEqualAcrossIframes };

// #region Editor Title Formatting

const PROJECT_ID_TITLE_FORMAT_STRING_KEY = '%webView_platformScriptureEditor_title_format%';
const EDITABLE_KEY = '%webView_platformScriptureEditor_title_editable_indicator%';
const RESOURCE_VIEWER_KEY = '%webView_platformScriptureEditor_title_readonly_no_project%';
const SCRIPTURE_EDITOR_KEY = '%webView_platformScriptureEditor_title_editable_no_project%';

export async function formatEditorTitle(
  unformattedTitle: string | undefined,
  projectId: string | undefined,
  isReadOnly: boolean,
  getProjectName: (projectId: string) => Promise<string>,
  getLocalizedStrings: (selectors: LocalizationSelectors) => Promise<LanguageStrings>,
): Promise<string> {
  let title = unformattedTitle;
  if (!title) {
    if (projectId) title = PROJECT_ID_TITLE_FORMAT_STRING_KEY;
    else title = isReadOnly ? RESOURCE_VIEWER_KEY : SCRIPTURE_EDITOR_KEY;
  }
  if (isLocalizeKey(title)) {
    const localizedStrings = await getLocalizedStrings({
      localizeKeys: [EDITABLE_KEY, title],
    });
    const localizedTitleFormatStr = localizedStrings[title];
    const localizedEditable = localizedStrings[EDITABLE_KEY];

    let projectName = projectId;
    if (projectId) projectName = await getProjectName(projectId);

    title = formatReplacementString(localizedTitleFormatStr, {
      projectId: projectName,
      editable: isReadOnly ? '' : localizedEditable,
    });
  }

  return title;
}

// #endregion Editor Title Formatting

/**
 * Opens the comment list for an editor and selects a specific thread.
 *
 * @param editorWebViewId The ID of the editor web view (used to determine which project's comments)
 * @param threadId The ID of the thread to select
 */
export async function openCommentListAndSelectThread(
  papi: typeof PapiBackend | typeof PapiFrontend,
  editorWebViewId: string,
  threadId: string,
): Promise<void> {
  const commentListWebViewId = await papi.commands.sendCommand(
    'legacyCommentManager.openCommentList',
    editorWebViewId,
    { threadIdToSelect: threadId },
  );

  if (!commentListWebViewId) {
    throw new Error(`No WebView ID returned`);
  }
}

/**
 * Opens the comment list for an editor and selects a specific thread.
 *
 * @param editorWebViewId The ID of the editor web view (used to determine which project's comments)
 * @param threadId The ID of the thread to select
 */
export async function openCommentListAndSelectThreadSafe(
  papi: typeof PapiBackend | typeof PapiFrontend,
  editorWebViewId: string,
  threadId: string,
): Promise<void> {
  try {
    await openCommentListAndSelectThread(papi, editorWebViewId, threadId);
  } catch (e) {
    papi.logger.warn(
      `Failed to open comment list from WebView ${editorWebViewId} and select thread ${threadId}: ${getErrorMessage(e)}`,
    );
  }
}

// #region USJ location conversion helper functions

/**
 * Figure out the location properties on a {@link ScriptureRange} `start` or `end`. Takes the complex
 * disparate USFM and USJ location types and returns the properties in them
 *
 * @param rangeLocation {@link ScriptureRange} `start` or `end`
 * @param baseVerseRef Verse reference to start with. In some cases, only certain properties on this
 *   verse reference will be changed
 * @returns Location properties found in `rangeLocation`
 */
function determineLocationProperties(
  rangeLocation: ScriptureRange['start'],
  baseVerseRef: SerializedVerseRef,
): {
  /** Empty string if not found */
  jsonPath: string;
  /** `undefined` if not found */
  jsonPathOffset: number | undefined;
  verseRef: SerializedVerseRef;
  /** `undefined` if not found */
  verseOffset: number | undefined;
} {
  let jsonPath = '';
  let jsonPathOffset: number | undefined;
  let verseRef = { ...baseVerseRef };
  let verseOffset: number | undefined;

  if ('jsonPath' in rangeLocation || 'documentLocation' in rangeLocation) {
    const chapterLocation =
      UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(rangeLocation);
    verseRef.book = chapterLocation.verseRef.book;
    verseRef.chapterNum = chapterLocation.verseRef.chapterNum;
    jsonPath = chapterLocation.documentLocation.jsonPath;
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(chapterLocation.documentLocation))
      jsonPathOffset = chapterLocation.documentLocation.offset;
  } else {
    const startVerseLocation =
      UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(rangeLocation);
    verseRef = startVerseLocation.verseRef;
    verseOffset = startVerseLocation.offset;
  }

  return {
    jsonPath,
    jsonPathOffset,
    verseRef,
    verseOffset,
  };
}

/**
 * Calculate the USJ JSONPath and offset within it to a text location from USFM verse location
 * information if the USJ location information is not already determined
 *
 * @param usjRW {@link UsjReaderWriter} to use for getting the USJ location info
 * @param verseRef Which verse the location is in
 * @param verseOffset The offset in USFM space from the start of the verse
 * @param currentJsonPath Current value of the JSONPath for this location. Empty string if not
 *   determined yet
 * @param currentJsonPathOffset Current value of the USJ offset in the location. `undefined` if not
 *   determined yet
 * @returns USJ location properties
 */
function calculateUsjLocationProperties(
  usjRW: UsjReaderWriter,
  verseRef: SerializedVerseRef,
  verseOffset: number | undefined,
  currentJsonPath: string,
  currentJsonPathOffset: number | undefined,
): {
  jsonPath: string;
  jsonPathOffset: number;
  usjContentLocation: UsjNodeAndDocumentLocation | undefined;
} {
  let jsonPath = currentJsonPath;
  let jsonPathOffset = currentJsonPathOffset;

  // Convert the UsfmVerseLocation to get jsonPath and offset from them
  let usjContentLocation: UsjNodeAndDocumentLocation | undefined;
  if (!jsonPath) {
    usjContentLocation = usjRW.usfmVerseLocationToUsjNodeAndDocumentLocation({
      verseRef,
      offset: verseOffset,
    });

    jsonPath = usjContentLocation.documentLocation.jsonPath;
    if (UsjReaderWriter.isUsjDocumentLocationForTextContent(usjContentLocation.documentLocation)) {
      jsonPathOffset = usjContentLocation.documentLocation.offset;
    }
  }

  // If we haven't found JSONPath offsets, find the nearest text location. We only need to do
  // this because the editor does not support the full `UsjDocumentLocation`; once it is
  // updated to support them, we can stop tracking jsonPathOffsets
  if (jsonPathOffset === undefined) {
    usjContentLocation = usjContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(jsonPath);
    const nextTextContentLocation = usjRW.findNextLocationOfMatchingText(usjContentLocation, '');
    if (nextTextContentLocation) {
      jsonPath = nextTextContentLocation.documentLocation.jsonPath;
      jsonPathOffset = nextTextContentLocation.documentLocation.offset;
    } else
      // Just put the offset at the start of the marker pointed to by the jsonPath and
      // hope that's good enough for now. This probably won't happen much, and this case
      // will not exist once the editor is updated
      jsonPathOffset = 0;
  }

  return { jsonPath, jsonPathOffset, usjContentLocation };
}

/** Result of converting a ScriptureRange to an editor-usable range */
interface ConvertedEditorRange {
  /** The scripture reference for the start of the range */
  verseRef: SerializedVerseRef;
  /** The editor-usable range with jsonPath and offset */
  editorRange: {
    start: { jsonPath: string; offset: number };
    end: { jsonPath: string; offset: number };
  };
  /** The UsjReaderWriter instance used for conversion, for further text extraction */
  usjReaderWriter: UsjReaderWriter;
  /** The start location in USJ format */
  startLocation: UsjNodeAndDocumentLocation;
  /** The end location in USJ format */
  endLocation: UsjNodeAndDocumentLocation;
}

/**
 * Convert a ScriptureRange to an editor-usable range format. This function handles the complex
 * conversion between USFM/USJ location types and the editor's internal range format.
 *
 * @param range The ScriptureRange to convert
 * @param projectId The project ID to fetch USJ data from
 * @returns The converted range with editor-usable format and a UsjReaderWriter for text extraction
 * @throws If the range spans chapters or books, or if required data cannot be fetched
 */
export async function convertScriptureRangeToEditorRange(
  papi: typeof PapiBackend,
  range: ScriptureRange,
  projectId: string,
): Promise<ConvertedEditorRange> {
  // Figure out the information needed to make the USJ range to give to the editor:
  // book, chapter, start jsonPath and offset, and end jsonPath and offset.
  // Also need to get the verse to set the scroll group verse to because the editor doesn't
  // do it automatically right now
  let startVerseRef: SerializedVerseRef = { book: '', chapterNum: 0, verseNum: -1 };
  let startJsonPath = '';
  let endJsonPath = '';
  // Start and end offsets based on the USJ JSONPath location
  let startJsonPathOffset: number | undefined;
  let endJsonPathOffset: number | undefined;

  // May need to use verse refs and offsets from the USFM verse location to get USJ offsets
  let endVerseRef: SerializedVerseRef = { book: '', chapterNum: 0, verseNum: 0 };

  // Figure out the book and chapter and the jsonPaths and offsets if they're in the range
  // passed to us
  // Process the starting location
  const { verseOffset: startVerseOffset, ...startLocationProperties } = determineLocationProperties(
    range.start,
    startVerseRef,
  );
  ({
    jsonPath: startJsonPath,
    jsonPathOffset: startJsonPathOffset,
    verseRef: startVerseRef,
  } = startLocationProperties);

  // Process the ending location
  const { verseOffset: endVerseOffset, ...endLocationProperties } = determineLocationProperties(
    range.end,
    endVerseRef,
  );
  ({
    jsonPath: endJsonPath,
    jsonPathOffset: endJsonPathOffset,
    verseRef: endVerseRef,
  } = endLocationProperties);
  if (
    startVerseRef.book !== endVerseRef.book ||
    startVerseRef.chapterNum !== endVerseRef.chapterNum
  )
    throw new Error(
      'Could not get targetScrRef from range! Selection range cannot (yet) span chapters or books',
    );

  // Get the USJ chapter we're on so we can determine the missing USJ range properties
  const pdp = await papi.projectDataProviders.get('platformScripture.USJ_Chapter', projectId);
  const usjChapter = await pdp.getChapterUSJ(startVerseRef);

  if (!usjChapter)
    throw new Error(
      `USJ Chapter for project id ${projectId} target scrRef ${serialize(startVerseRef)} is undefined!`,
    );

  const usjRW = new UsjReaderWriter(usjChapter, {
    markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
  });

  // Convert the UsfmVerseLocations to get jsonPath and offset from them
  const startLocationResult = calculateUsjLocationProperties(
    usjRW,
    startVerseRef,
    startVerseOffset,
    startJsonPath,
    startJsonPathOffset,
  );
  startJsonPath = startLocationResult.jsonPath;
  startJsonPathOffset = startLocationResult.jsonPathOffset;
  const startContentLocation = startLocationResult.usjContentLocation;

  const endLocationResult = calculateUsjLocationProperties(
    usjRW,
    endVerseRef,
    endVerseOffset,
    endJsonPath,
    endJsonPathOffset,
  );
  endJsonPath = endLocationResult.jsonPath;
  endJsonPathOffset = endLocationResult.jsonPathOffset;
  const endContentLocation = endLocationResult.usjContentLocation;

  // If we don't have which verse we're setting the scroll group to, get it
  if (startVerseRef.verseNum === -1) {
    const startUsfmLocation = usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(
      (startContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(startJsonPath))
        .documentLocation,
    );
    startVerseRef.verseNum = startUsfmLocation.verseRef.verseNum;
  }

  // Get or create the content locations for return
  const finalStartLocation =
    startContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(startJsonPath);
  const finalEndLocation =
    endContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(endJsonPath);

  return {
    verseRef: startVerseRef,
    editorRange: {
      start: { jsonPath: startJsonPath, offset: startJsonPathOffset },
      end: { jsonPath: endJsonPath, offset: endJsonPathOffset },
    },
    usjReaderWriter: usjRW,
    startLocation: finalStartLocation,
    endLocation: finalEndLocation,
  };
}

// #endregion USJ location conversion helper functions
