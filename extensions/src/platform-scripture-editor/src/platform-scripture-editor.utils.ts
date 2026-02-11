/* Small utility helpers for the platform-scripture-editor extension. */

import { LocalizationSelectors } from '@papi/core';
import type PapiBackend from '@papi/backend';
import type PapiFrontend from '@papi/frontend';
import {
  formatReplacementString,
  getErrorMessage,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjDocumentLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureRange } from 'platform-scripture-editor';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MarkerMenuItem } from 'platform-bible-react';

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
  /** `undefined` if not found */
  documentLocation: UsjDocumentLocation | undefined;
  verseRef: SerializedVerseRef;
  /** `undefined` if not found */
  verseOffset: number | undefined;
} {
  let documentLocation: UsjDocumentLocation | undefined;
  let verseRef = { ...baseVerseRef };
  let verseOffset: number | undefined;

  if ('jsonPath' in rangeLocation || 'documentLocation' in rangeLocation) {
    const chapterLocation =
      UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(rangeLocation);
    verseRef.book = chapterLocation.verseRef.book;
    verseRef.chapterNum = chapterLocation.verseRef.chapterNum;
    documentLocation = chapterLocation.documentLocation;
  } else {
    const startVerseLocation =
      UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(rangeLocation);
    verseRef = startVerseLocation.verseRef;
    verseOffset = startVerseLocation.offset;
  }

  return {
    documentLocation,
    verseRef,
    verseOffset,
  };
}

/** Result of converting a ScriptureRange to an editor-usable range */
interface ConvertedEditorRange {
  /** The scripture reference for the start of the range */
  verseRef: SerializedVerseRef;
  /** The editor-usable range with start and end locations in USJ format */
  editorRange: {
    start: UsjDocumentLocation;
    end: UsjDocumentLocation;
  };
  /** The UsjReaderWriter instance used for conversion, for further text extraction */
  usjReaderWriter: UsjReaderWriter;
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
  // book, chapter, and start/end document locations.
  // Also need to get the verse to set the scroll group verse to because the editor doesn't
  // do it automatically right now
  let startVerseRef: SerializedVerseRef = { book: '', chapterNum: 0, verseNum: -1 };
  let startDocumentLocation: UsjDocumentLocation | undefined;
  let endDocumentLocation: UsjDocumentLocation | undefined;

  // May need to use verse refs and offsets from the USFM verse location to get USJ offsets
  let endVerseRef: SerializedVerseRef = { book: '', chapterNum: 0, verseNum: 0 };

  // Figure out the book and chapter and the jsonPaths and offsets if they're in the range
  // passed to us
  // Process the starting location
  const { verseOffset: startVerseOffset, ...startLocationProperties } = determineLocationProperties(
    range.start,
    startVerseRef,
  );
  ({ documentLocation: startDocumentLocation, verseRef: startVerseRef } = startLocationProperties);

  // Process the ending location
  const { verseOffset: endVerseOffset, ...endLocationProperties } = determineLocationProperties(
    range.end,
    endVerseRef,
  );
  ({ documentLocation: endDocumentLocation, verseRef: endVerseRef } = endLocationProperties);
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

  const usjRW = new UsjReaderWriter(usjChapter, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 });

  startDocumentLocation ??= usjRW.usfmVerseLocationToUsjDocumentLocation(
    startVerseOffset === undefined
      ? startVerseRef
      : { verseRef: startVerseRef, offset: startVerseOffset },
  );

  endDocumentLocation ??= usjRW.usfmVerseLocationToUsjDocumentLocation(
    endVerseOffset === undefined ? endVerseRef : { verseRef: endVerseRef, offset: endVerseOffset },
  );

  // If we don't have which verse we're setting the scroll group to, get it
  if (startVerseRef.verseNum === -1) {
    const startUsfmLocation =
      usjRW.usjDocumentLocationToUsfmVerseRefVerseLocation(startDocumentLocation);
    startVerseRef.verseNum = startUsfmLocation.verseRef.verseNum;
  }

  if (!startDocumentLocation || !endDocumentLocation)
    throw new Error('Could not determine USJ document locations for selection range');

  return {
    verseRef: startVerseRef,
    editorRange: {
      start: startDocumentLocation,
      end: endDocumentLocation,
    },
    usjReaderWriter: usjRW,
  };
}

// #endregion USJ location conversion helper functions

/**
 * All Scroll Group IDs that are intended to be shown in scroll group selectors. This is a
 * placeholder and will be refactored significantly in
 * https://github.com/paranext/paranext-core/issues/788
 */
export const availableScrollGroupIds = [undefined, ...Array(5).keys()];

export type BlockMarkerBlockNames = typeof blockMarkerToBlockNames;

const commonBlockMarkerToBlockNames: Record<string, LocalizeKey> = {
  m: '%paragraphMenu_m_markerDescription%',
  ms: '%paragraphMenu_ms_markerDescription%',
  nb: '%paragraphMenu_nb_markerDescription%',
  p: '%paragraphMenu_p_markerDescription%',
  pi: '%paragraphMenu_pi_markerDescription%',
  q1: '%paragraphMenu_q1_markerDescription%',
  q2: '%paragraphMenu_q2_markerDescription%',
  r: '%paragraphMenu_r_markerDescription%',
  s: '%paragraphMenu_s_markerDescription%',
  // do not allow `b - Poetry - Stanza Break (Blank Line)` here to avoid a USFM validity issue.
};

// This list is incomplete.
export const blockMarkerToBlockNames: Record<string, LocalizeKey> = {
  ...commonBlockMarkerToBlockNames,
  ide: '%paragraphMenu_ide_markerDescription%',
  h: '%paragraphMenu_h_markerDescription%',
  h1: '%paragraphMenu_h1_markerDescription%',
  h2: '%paragraphMenu_h2_markerDescription%',
  h3: '%paragraphMenu_h3_markerDescription%',
  toc1: '%paragraphMenu_toc1_markerDescription%',
  toc2: '%paragraphMenu_toc2_markerDescription%',
  toc3: '%paragraphMenu_toc3_markerDescription%',
  cl: '%paragraphMenu_cl_markerDescription%',
  mt: '%paragraphMenu_mt_markerDescription%',
  mt1: '%paragraphMenu_mt1_markerDescription%',
  mt2: '%paragraphMenu_mt2_markerDescription%',
  mt3: '%paragraphMenu_mt3_markerDescription%',
  mt4: '%paragraphMenu_mt4_markerDescription%',
  ms1: '%paragraphMenu_ms1_markerDescription%',
  ms2: '%paragraphMenu_ms2_markerDescription%',
  ms3: '%paragraphMenu_ms3_markerDescription%',
  b: '%paragraphMenu_b_markerDescription%',
};

export function generateMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  localizedStrings: LanguageStrings,
): MarkerMenuItem[] {
  return Object.entries(blockMarkerToBlockNames).map(([marker, title]) => {
    const markerMenuItem: MarkerMenuItem = {
      marker,
      title: localizedStrings[title],
      action: () => {
        editorRef.current?.formatPara(marker);
      },
    };
    return markerMenuItem;
  });
}
