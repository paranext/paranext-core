/* Small utility helpers for the platform-scripture-editor extension. */

import { LocalizationSelectors } from '@papi/core';
import type PapiBackend from '@papi/backend';
import type PapiFrontend from '@papi/frontend';
import {
  aggregateUnsubscribers,
  formatReplacementString,
  getErrorMessage,
  isLocalizeKey,
  isPlatformError,
  LanguageStrings,
  LocalizeKey,
  serialize,
  Unsubscriber,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  usfmMarkers,
  UsjDocumentLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureEditorViewType, ScriptureRange } from 'platform-scripture-editor';
import type { SharedProjectsInfo } from 'platform-scripture';
import { MutableRefObject } from 'react';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { MarkerMenuItem } from 'platform-bible-react';

// Note: src/main/shutdown-tasks.ts has a copy of this value — keep them in sync.
export const SCRIPTURE_EDITOR_WEBVIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Determine which Scripture editor view to switch to when the user toggles the view (e.g. via the
 * "Switch Scripture View" menu command).
 *
 * The toggle simply alternates between the two view types. It must not be derived from the resolved
 * `markerMode`: in simple interface mode both the formatted and markers views resolve to
 * `markerMode: 'hidden'`, so a markerMode-based toggle stayed stuck in the (read-only) markers view
 * and could never return to the formatted view.
 *
 * @param currentViewType The view type the editor is currently showing
 * @returns The view type to switch to
 */
export function getNextScriptureViewType(
  currentViewType: ScriptureEditorViewType,
): ScriptureEditorViewType {
  return currentViewType === 'markers' ? 'formatted' : 'markers';
}

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
export const availableScrollGroupIds = [undefined, ...new Array(5).keys()];

export type BlockMarkerBlockNames = typeof blockMarkerToBlockNames;

// This list is incomplete.
export const blockMarkerToBlockNames: Record<string, LocalizeKey> = {
  cl: '%paragraphMenu_cl_markerDescription%',
  h: '%paragraphMenu_h_markerDescription%',
  h1: '%paragraphMenu_h1_markerDescription%',
  h2: '%paragraphMenu_h2_markerDescription%',
  h3: '%paragraphMenu_h3_markerDescription%',
  ide: '%paragraphMenu_ide_markerDescription%',
  m: '%paragraphMenu_m_markerDescription%',
  ms: '%paragraphMenu_ms_markerDescription%',
  ms1: '%paragraphMenu_ms1_markerDescription%',
  ms2: '%paragraphMenu_ms2_markerDescription%',
  ms3: '%paragraphMenu_ms3_markerDescription%',
  mt: '%paragraphMenu_mt_markerDescription%',
  mt1: '%paragraphMenu_mt1_markerDescription%',
  mt2: '%paragraphMenu_mt2_markerDescription%',
  mt3: '%paragraphMenu_mt3_markerDescription%',
  mt4: '%paragraphMenu_mt4_markerDescription%',
  nb: '%paragraphMenu_nb_markerDescription%',
  p: '%paragraphMenu_p_markerDescription%',
  pi: '%paragraphMenu_pi_markerDescription%',
  q1: '%paragraphMenu_q1_markerDescription%',
  q2: '%paragraphMenu_q2_markerDescription%',
  r: '%paragraphMenu_r_markerDescription%',
  s: '%paragraphMenu_s_markerDescription%',
  toc1: '%paragraphMenu_toc1_markerDescription%',
  toc2: '%paragraphMenu_toc2_markerDescription%',
  toc3: '%paragraphMenu_toc3_markerDescription%',
};

/**
 * Generates the marker menu list items specifically inserting appropriate action functions using
 * the provided `editorRef` parameter and localizes the marker titles with the provided
 * `localizedStrings` parameter
 *
 * @param editorRef Provided ref for the editor component
 * @param localizedStrings The localized strings to use to localize the marker titles
 * @returns List of marker menu items to be used for the paragraph menu
 */
export function generateParagraphMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  localizedStrings: LanguageStrings,
): MarkerMenuItem[] {
  return Object.entries(blockMarkerToBlockNames).map(([marker, title]) => {
    const markerMenuItem: MarkerMenuItem = {
      marker,
      title: localizedStrings[title] ?? title,
      action: () => {
        editorRef.current?.formatPara(marker);
      },
    };
    return markerMenuItem;
  });
}

/**
 * Function that generates the inline marker menu items that will update as the cursor location
 * changes. In the future this function will take data from an `.sty` file so that users can define
 * their own markers.
 *
 * @param editorRef The ref for the editor component to be able to insert markers
 * @param parentMarker The current parent marker which is used to determine which markers to include
 * @returns The list of inline marker menu items
 */
export function generateInlineMarkerMenuListItems(
  editorRef: MutableRefObject<EditorRef | null>,
  closeMarkersMenu: () => void,
  localizedStrings: LanguageStrings,
  parentMarker?: string,
): MarkerMenuItem[] {
  if (!parentMarker) return [];

  const markerDetails = usfmMarkers[parentMarker];
  if (!markerDetails?.children) return [];

  const markerMenuItems: MarkerMenuItem[] = [];
  Object.entries(markerDetails.children).forEach(([, markers]) => {
    markerMenuItems.push(
      ...markers.map((marker) => {
        return {
          marker,
          title:
            localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
          action: () => {
            editorRef.current?.insertMarker(marker);
            closeMarkersMenu();
          },
        };
      }),
    );
  });
  return markerMenuItems.sort((a, b) => (a.marker ?? a.title).localeCompare(b.marker ?? b.title));
}

// #region Open Editor Dispatch

/**
 * Tagged-union result describing where a new Scripture Editor open should be routed.
 *
 * - `focus-existing` — a Scripture Editor for the requested project is already open; the caller
 *   should focus that tab (via `openWebView` with `existingId`) rather than creating a new one.
 * - `replace-tab` — the caller should call `openWebView` with `{ type: 'replace-tab', targetTabId }`
 *   so the named tab is swapped out for a fresh editor.
 * - `open-new` — no targeting hint applies; the caller should call `openWebView` without a layout so
 *   the platform places the new tab using its default rules.
 */
export type OpenEditorDispatch =
  | { kind: 'focus-existing'; existingId: string }
  | { kind: 'replace-tab'; targetTabId: string }
  | { kind: 'open-new' };

/**
 * Decide where to route a Scripture Editor open request based on what's currently in the dock and
 * which interface mode the platform is in.
 *
 * Pure function — does not touch PAPI. The caller is responsible for fetching the inputs
 * (`papi.webViews.getAllOpenWebViewDefinitions` filtered to Scripture Editors, the requested
 * `projectId`, `papi.settings.get('platform.interfaceMode')`, and the optional caller override).
 *
 * Behavior splits cleanly on `interfaceMode`:
 *
 * **Simple mode** — the platform's editor column hosts exactly one Scripture Editor at a time.
 * Every open routes there, and the caller-supplied `existingTabIdToReplace` is intentionally
 * ignored (e.g., the column 3 NewTab passes its own id so it can be replaced in place; in simple
 * mode we route to the editor column instead). Editable Scripture Editors and read-only Resource
 * Viewers share the same `webViewType` but are different views — they're keyed on `(projectId,
 * isReadOnly)` here so opening a Resource Viewer for project X while an editable editor for project
 * X is already open replaces (not focuses) it.
 *
 * 1. Same `(projectId, isReadOnly)` already open → `focus-existing` on that tab.
 * 2. Some other Scripture Editor is open (different project, or same project but different readonly
 *    mode) → `replace-tab` on the first existing Scripture Editor.
 * 3. No Scripture Editor exists at all → `open-new` (graceful degradation; the simple layout normally
 *    always has the editor slot).
 *
 * **Power mode** — unchanged from the platform's original P9-style behavior:
 *
 * 1. Caller-supplied `existingTabIdToReplace` → `replace-tab` on that tab.
 * 2. An empty Scripture Editor (no `projectId`) exists → `replace-tab` on the placeholder.
 * 3. Otherwise → `open-new`. (Opening the same project twice in power mode produces two tabs.)
 *
 * @param allScriptureEditors All currently-open Scripture Editor web view definitions (filtered by
 *   the caller from `getAllOpenWebViewDefinitions`). Only `id`, `projectId`, and `isReadOnly` are
 *   read. `isReadOnly` should be derived from each definition's `state?.isReadOnly`.
 * @param projectId The project the caller wants to open. The caller should not invoke this helper
 *   until project selection has resolved.
 * @param isReadOnly Whether the caller is opening a read-only Resource Viewer (`true`) or an
 *   editable Scripture Editor (`false`). Used only in simple mode; ignored in power mode.
 * @param interfaceMode The current `platform.interfaceMode` setting value.
 * @param existingTabIdToReplace Caller-supplied tab to replace; honored in power mode but ignored
 *   in simple mode (where every open goes to the editor column).
 * @returns The dispatch decision — see {@link OpenEditorDispatch}.
 */
export function resolveOpenEditorDispatch(
  allScriptureEditors: ReadonlyArray<{ id: string; projectId?: string; isReadOnly?: boolean }>,
  projectId: string,
  isReadOnly: boolean,
  interfaceMode: 'simple' | 'power',
  existingTabIdToReplace: string | undefined,
): OpenEditorDispatch {
  if (interfaceMode === 'simple') {
    // Simple mode invariant: every Scripture Editor open lands in the editor column. The
    // caller-supplied `existingTabIdToReplace` is intentionally ignored — e.g., column 3's
    // NewTab passes its own id so it can be replaced in place, but in simple mode we route to
    // the editor column instead so we never have two editors for the same (or different) project.
    const existingForSameView = allScriptureEditors.find(
      (def) => def.projectId === projectId && !!def.isReadOnly === isReadOnly,
    );
    if (existingForSameView) {
      return { kind: 'focus-existing', existingId: existingForSameView.id };
    }
    if (allScriptureEditors.length > 0) {
      return { kind: 'replace-tab', targetTabId: allScriptureEditors[0].id };
    }
    // Graceful degradation: simple layout should always have a Scripture Editor slot, but if
    // somehow none exists we open a new one rather than throwing.
    return { kind: 'open-new' };
  }

  // Power mode (or unset). Behavior is unchanged from the pre-session original:
  if (existingTabIdToReplace) {
    return { kind: 'replace-tab', targetTabId: existingTabIdToReplace };
  }
  const emptyEditor = allScriptureEditors.find((def) => !def.projectId);
  if (emptyEditor) {
    return { kind: 'replace-tab', targetTabId: emptyEditor.id };
  }
  return { kind: 'open-new' };
}

// #endregion Open Editor Dispatch

// #region Open Project Filter

/** Which project-selection dialog the caller is populating. */
export type OpenProjectDialogMode = 'resourceViewer' | 'scriptureEditor';

/**
 * Filter a list of projects (paired with their `platform.isPublished` value) to those that belong
 * in the project-selection dialog for a given open mode.
 *
 * Used by the `open()` flow in `main.ts` when no `projectId` is supplied and we need to populate
 * the Scripture Editor / Resource Viewer project picker. The rule is:
 *
 * - `'resourceViewer'` → include projects where `isPublished === true`. The Resource Viewer lists
 *   published references / resources.
 * - `'scriptureEditor'` → include projects where `isPublished === false`. The Scripture Editor lists
 *   unpublished projects.
 *
 * Pure function — does not touch PAPI. The caller is responsible for fetching each project's
 * `platform.isPublished` setting beforehand.
 *
 * @param projectsWithIsPublished List of projects, each with their `platform.isPublished` setting
 *   value already fetched.
 * @param mode Which dialog the caller is populating — see {@link OpenProjectDialogMode}.
 * @returns Project IDs that match the requested open mode, in the original input order.
 */
export function selectProjectIdsForOpenMode(
  projectsWithIsPublished: ReadonlyArray<{ projectId: string; isPublished: boolean }>,
  mode: OpenProjectDialogMode,
): string[] {
  const wantPublished = mode === 'resourceViewer';
  return projectsWithIsPublished
    .filter(({ isPublished }) => isPublished === wantPublished)
    .map(({ projectId }) => projectId);
}

// #endregion Open Project Filter

// #region Default Active Project Picker

/**
 * Outcome of a single picker attempt. Every outcome other than `'filled'` is a "may retry on the
 * next trigger" — the driver in {@link startDefaultProjectPicker} re-invokes on web-view-open and
 * sync-completion events, so transient causes (sync still in flight, layout not loaded yet) clear
 * themselves naturally.
 *
 * - `'wrong-mode'` — `platform.interfaceMode` is not `'simple'`; the picker does nothing until it is.
 * - `'no-empty'` — no empty Scripture Editor (no `projectId`) is currently open. The driver may retry
 *   when a new web view opens.
 * - `'no-send-receive'` — `recentlyOpenedProjects` was empty or all entries failed to open, and S/R
 *   is unavailable or hasn't activated yet. Expected on Platform.Bible on first launch (no recents
 *   yet, no S/R). Logged at debug.
 * - `'failed'` — the open command rejected; logged at warn. The driver may retry on the next trigger.
 * - `'no-candidate'` — S/R was reachable, but no shared project passed the activity / `editedStatus`
 *   filter. Projects with `editedStatus` of `'new'` (not yet downloaded locally) or
 *   `'unregistered'` (limited/provisional license) are excluded, as are projects with no
 *   `lastSendReceiveDate`. The driver may retry after a sync completes.
 * - `'filled'` — the picker successfully called the open command for the top candidate.
 */
export type DefaultProjectPickerOutcome =
  | 'wrong-mode'
  | 'no-empty'
  | 'no-send-receive'
  | 'failed'
  | 'no-candidate'
  | 'filled';

/**
 * Try to open the most-recently-used project from the `platformScripture.recentlyOpenedProjects`
 * data provider. Returns `'filled'` if a recent project was successfully opened, or `undefined` if
 * the service is unavailable, the recents list is empty, or every recent project fails to open (in
 * which case the caller should fall through to the S/R-based picker).
 */
async function tryOpenFromRecentlyOpened(
  papi: typeof PapiBackend,
): Promise<DefaultProjectPickerOutcome | undefined> {
  try {
    const service = await papi.dataProviders.get('platformScripture.recentlyOpenedProjects');
    if (!service) return undefined;
    // Data-provider getter requires an explicit selector argument, even though the value is ignored.
    const recentProjects = (await service.getRecentProjects(undefined)) ?? [];
    // Try each recent project in order until one opens successfully — in almost all cases the first
    // entry opens and the loop exits immediately. `reduce` with a Promise accumulator is used instead
    // of `for...of + await` to satisfy the no-await-in-loop ESLint rule; each callback awaits the
    // previous result before deciding whether to attempt the next project, so entries are tried
    // sequentially (not in parallel) and the chain short-circuits as soon as one succeeds.
    return recentProjects.reduce(
      async (prev: Promise<DefaultProjectPickerOutcome | undefined>, projectId: string) => {
        const outcome = await prev;
        if (outcome !== undefined) return outcome;
        try {
          await papi.commands.sendCommand('platformScriptureEditor.openScriptureEditor', projectId);
          papi.logger.info(
            `Default active project picker: opened recently-used project=${projectId}`,
          );
          try {
            await service.recordProjectOpened(projectId);
          } catch (e) {
            papi.logger.warn(
              `Default active project picker: failed to record recently-opened project ${projectId}: ${getErrorMessage(e)}`,
            );
          }
          return 'filled' as const;
        } catch (e) {
          papi.logger.debug(
            `Default active project picker: recent project ${projectId} failed to open, trying next (${getErrorMessage(e)})`,
          );
          return undefined;
        }
      },
      Promise.resolve<DefaultProjectPickerOutcome | undefined>(undefined),
    );
  } catch (e) {
    papi.logger.debug(
      `Default active project picker: recentlyOpenedProjects unavailable; skipping recents (${getErrorMessage(e)})`,
    );
    return undefined;
  }
}

/**
 * Attempt to fill the empty Scripture Editor in the simple layout with the most-recently-active
 * project. Candidates come first from `recentlyOpenedProjects` (tried in order, most-recent first);
 * `paratextBibleSendReceive.getSharedProjects` is the fallback when recents is empty or all entries
 * fail to open. The picker partitions remaining candidates by `canUserEditScripture` and prefers
 * editable projects, falling back to the most-recently-S/R'd Observer-only project so an
 * Observer-only user is not stranded with an empty editor (Observer projects are otherwise
 * reachable via the project switcher).
 *
 * Idempotent: each invocation re-reads the dock and the shared-projects list. The driver in
 * {@link startDefaultProjectPicker} is responsible for re-invoking on events that change those
 * inputs (web-view opens, sync completions).
 *
 * @param papi The PAPI backend handle. Injected for testability.
 * @returns The outcome of this attempt — see {@link DefaultProjectPickerOutcome}.
 */
export async function openDefaultActiveProjectIfApplicable(
  papi: typeof PapiBackend,
): Promise<DefaultProjectPickerOutcome> {
  const interfaceMode = await papi.settings.get('platform.interfaceMode');
  if (isPlatformError(interfaceMode)) {
    papi.logger.warn(
      `Default active project picker: failed to read platform.interfaceMode (${getErrorMessage(interfaceMode)}); returning 'wrong-mode'`,
    );
    return 'wrong-mode';
  }
  if (interfaceMode !== 'simple') return 'wrong-mode';

  const openWebViews = await papi.webViews.getAllOpenWebViewDefinitions();
  const emptyEditor = openWebViews.find(
    (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && !def.projectId,
  );
  if (!emptyEditor) return 'no-empty';

  // Before consulting S/R, try the recently-opened-projects list. If a recent project opens
  // successfully, return immediately without touching the S/R service at all.
  const recentsOutcome = await tryOpenFromRecentlyOpened(papi);
  if (recentsOutcome !== undefined) return recentsOutcome;

  // Try `paratextBibleSendReceive.getSharedProjects` directly. If S/R hasn't activated yet (cold
  // start, picker fires inside `platformScriptureEditor.activate()` before `paratextBibleSendReceive`
  // registers commands) or isn't installed at all (Platform.Bible), this rejects and we return
  // `'no-send-receive'`. The driver's existing triggers handle the retry once S/R is ready — we
  // do NOT block here. paratextBibleSendReceive does not register a network object, so PAPI's
  // `waitForNetworkObject` is not a usable readiness signal. See PT-3958.
  let sharedProjects: SharedProjectsInfo;
  try {
    sharedProjects = await papi.commands.sendCommand('paratextBibleSendReceive.getSharedProjects');
  } catch (e) {
    // Expected steady state on Platform.Bible (S/R absent) and transient on paratext-10-studio
    // cold start. Debug-level — info would be noisy because this fires on every picker run on
    // Platform.Bible.
    papi.logger.debug(
      `Default active project picker: getSharedProjects unavailable; returning 'no-send-receive' (${getErrorMessage(e)})`,
    );
    return 'no-send-receive';
  }

  // Exclude `'new'` (not yet downloaded — can't be opened) and `'unregistered'` (limited/provisional
  // license — surprising to auto-open as the default). Projects with no `lastSendReceiveDate` are
  // kept as candidates — a Power-created project that has never been S/R'd, or one copied onto the
  // machine manually, is still a valid project to auto-open. `sortByRecency` treats missing or
  // unparseable dates as epoch (0), so any S/R'd project still wins; never-synced projects only
  // become the top candidate when nothing else qualifies.
  const filtered = Object.values(sharedProjects).filter(
    (info) => info.editedStatus !== 'new' && info.editedStatus !== 'unregistered',
  );

  // Annotate each surviving candidate with the current user's role. Per-candidate PDP lookups or
  // method rejections are treated as Observer-equivalent — they fall to the `observerOnly` group
  // and only matter if no editable candidate exists. A missing PDP (e.g., a project that doesn't
  // advertise `platformScripture.scriptureEditPermissions`) is likewise Observer-equivalent.
  // Mirrors the C# method's "false on exception" semantics.
  const annotated = await Promise.all(
    filtered.map(async (info) => {
      try {
        const pdp = await papi.projectDataProviders.get(
          'platformScripture.scriptureEditPermissions',
          info.id,
        );
        if (!pdp) return { info, canEdit: false };
        return { info, canEdit: await pdp.canUserEditScripture() };
      } catch {
        return { info, canEdit: false };
      }
    }),
  );

  // `lastSendReceiveDate` is produced by .NET upstream and isn't format-guaranteed in the type, so
  // parse to a timestamp rather than relying on lexicographic ISO ordering. Missing or unparseable
  // dates are treated as epoch (0) so they sort to the end — any S/R'd project beats a
  // never-synced one.
  const toTimestamp = (date: string) => {
    if (!date) return 0;
    const t = new Date(date).getTime();
    return Number.isNaN(t) ? 0 : t;
  };
  const sortByRecency = (
    a: { info: { lastSendReceiveDate: string } },
    b: { info: { lastSendReceiveDate: string } },
  ) => toTimestamp(b.info.lastSendReceiveDate) - toTimestamp(a.info.lastSendReceiveDate);

  const editable = annotated.filter((a) => a.canEdit).sort(sortByRecency);
  const observerOnly = annotated.filter((a) => !a.canEdit).sort(sortByRecency);

  // Prefer the most-recently-S/R'd editable project. When the user has only Observer-only projects,
  // still open the most-recently-S/R'd one — Observer projects are otherwise reachable via the
  // project switcher, so we shouldn't strand an Observer-only user with an empty editor.
  const topCandidate = editable[0] ?? observerOnly[0];

  if (!topCandidate) return 'no-candidate';

  const top = topCandidate.info;
  let hasFailed = false;
  let openedScriptureEditor = false;
  papi.logger.info(`Default active project picker: opening project=${top.id}`);
  try {
    await papi.commands.sendCommand('platformScriptureEditor.openScriptureEditor', top.id);
    openedScriptureEditor = true;
  } catch (e) {
    papi.logger.warn(
      `Default active project picker: openScriptureEditor for ${top.id} failed: ${getErrorMessage(e)}`,
    );
    hasFailed = true;
  }

  // Best-effort: record the project in the recent projects list so the future Recent projects picker
  // can surface it. Failure here must NOT change the outcome — opening succeeded.
  if (openedScriptureEditor) {
    try {
      const recentlyOpenedProjects = await papi.dataProviders.get(
        'platformScripture.recentlyOpenedProjects',
      );
      await recentlyOpenedProjects?.recordProjectOpened(top.id);
    } catch (e) {
      papi.logger.warn(
        `Default active project picker: failed to record recently-opened project ${top.id}: ${getErrorMessage(e)}`,
      );
    }
  }

  return hasFailed ? 'failed' : 'filled';
}

/**
 * Subscribe to the events that change the default-project picker's inputs, and run the picker each
 * time one fires. Returns an unsubscriber that closes every subscription.
 *
 * Triggers:
 *
 * - `webViews.onDidOpenWebView` — handles a late-arriving empty Scripture Editor (the layout's
 *   placeholder may not be in the dock yet at activate time).
 * - `webViews.onDidUpdateWebView` — handles soft-close-then-reopen on macOS (red button hides the
 *   window but keeps the extension host alive). The layout-restore path can re-create the Scripture
 *   Editor without a `projectId`, and from the extension host's perspective the webview was "always
 *   there" — so `onDidOpenWebView` doesn't re-fire. `onDidUpdateWebView` fires when any webview's
 *   definition changes, including the projectId being reset.
 * - `paratextBibleSendReceive.onSyncStateChanged` (when `isSyncing` is `false`) — handles a sync
 *   finishing. Newly-added shared projects look ineligible (`editedStatus === 'new'`, no
 *   `lastSendReceiveDate`) until the first sync settles, so the picker has to re-check after that.
 *
 * Cold-start gap: there is no explicit "S/R command registered" signal, so if
 * `paratextBibleSendReceive` activates after `platformScriptureEditor` but before any of the
 * triggers above fires, the picker sits idle until one does. Webview and sync activity at startup
 * cover this in practice.
 *
 * The picker is idempotent: each call re-reads the dock and the shared-projects list and quietly
 * does nothing when there is nothing to do (editor already filled, wrong interface mode, no
 * eligible project yet). At most one run is in flight at a time; concurrent triggers coalesce into
 * a single follow-up run.
 *
 * Mirrors the simple-function pattern used in `home.web-view.tsx` rather than a class wrapper.
 */
export function startDefaultProjectPicker(papi: typeof PapiBackend): Unsubscriber {
  // 'running-with-retry-queued' captures the case where a trigger fires while a tryPicker call is
  // in flight. The in-flight attempt may have observed stale inputs before the trigger materialized;
  // the `finally` block re-fires once to close that race. A single string union (rather than two
  // booleans) makes the impossible 'idle + retry-queued' combination unrepresentable; see
  // Code-Style-Guide.md "Prefer string unions over multiple interdependent booleans".
  let pickerState: 'idle' | 'running' | 'running-with-retry-queued' = 'idle';
  // Read via a helper to defeat TypeScript's flow narrowing — the listeners below can mutate
  // pickerState concurrently across awaits, which TS's flow analysis can't model.
  const getPickerState = () => pickerState;

  const tryPicker = async (): Promise<void> => {
    if (pickerState !== 'idle') {
      pickerState = 'running-with-retry-queued';
      return;
    }
    pickerState = 'running';
    try {
      const outcome = await openDefaultActiveProjectIfApplicable(papi);
      if (outcome !== 'filled') {
        papi.logger.debug(
          `Default active project picker: unexpected outcome received: '${outcome}'`,
        );
      }
    } catch (e) {
      // `openDefaultActiveProjectIfApplicable` catches its own errors and returns 'failed'; this
      // catch only fires on unexpected throws (e.g. PAPI plumbing bugs).
      papi.logger.warn(
        `Default active project picker: tryPicker threw unexpectedly: ${getErrorMessage(e)}`,
      );
    } finally {
      const wasRetryQueued = getPickerState() === 'running-with-retry-queued';
      pickerState = 'idle';
      // Fire-and-forget follow-up to close the race window. `tryPicker` catches its own errors,
      // so the `.catch` here is defensive against a future change that could leak a rejection.
      if (wasRetryQueued)
        tryPicker().catch((e) =>
          papi.logger.warn(
            `Default active project picker: coalesced retry threw unexpectedly: ${getErrorMessage(e)}`,
          ),
        );
    }
  };

  // `tryPicker()` catches its own errors internally; the `.catch` blocks below are defensive
  // against a future change that could leak a rejection — matches the `finally`-block retry above.
  const unsubFromWebViewOpen = papi.webViews.onDidOpenWebView(() => {
    tryPicker().catch((e) =>
      papi.logger.warn(
        `Default active project picker: webView-open handler threw unexpectedly: ${getErrorMessage(e)}`,
      ),
    );
  });

  const unsubFromWebViewUpdate = papi.webViews.onDidUpdateWebView(({ webView }) => {
    // Only Scripture Editor updates can change the picker's outcome — any other webview's update
    // can't reveal or remove an empty editor.
    if (webView.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) return;
    tryPicker().catch((e) =>
      papi.logger.warn(
        `Default active project picker: webView-update handler threw unexpectedly: ${getErrorMessage(e)}`,
      ),
    );
  });

  const unsubFromSync = papi.network.getNetworkEvent<{ isSyncing: boolean }>(
    'paratextBibleSendReceive.onSyncStateChanged',
  )(({ isSyncing }) => {
    if (!isSyncing)
      tryPicker().catch((e) =>
        papi.logger.warn(
          `Default active project picker: sync-state handler threw unexpectedly: ${getErrorMessage(e)}`,
        ),
      );
  });

  // Cover the case where the empty editor and an eligible synced project are already in place
  // (e.g., second startup after a successful first run).
  tryPicker().catch((e) =>
    papi.logger.warn(
      `Default active project picker: initial run threw unexpectedly: ${getErrorMessage(e)}`,
    ),
  );

  return aggregateUnsubscribers([unsubFromWebViewOpen, unsubFromWebViewUpdate, unsubFromSync]);
}

// #endregion Default Active Project Picker

// #region Project-Switch Sync

/**
 * Fire-and-forget helper that syncs the incoming project first, then the outgoing one. Each sync is
 * independently error-isolated so a failure in one doesn't block the other. Only called in simple
 * mode after a replace-tab project switch.
 *
 * Uses `paratextBibleSendReceive.syncProjects` for the incoming project because it also pulls
 * connected resources and translation partners (deep sync). Uses the shallower
 * `paratextBibleSendReceive.sendReceiveProjects` for the outgoing project because we only need to
 * flush any local edits — a full deep sync is unnecessary on the way out.
 */
export async function syncOnProjectSwitch(
  papi: typeof PapiBackend,
  incomingProjectId: string,
  outgoingProjectId: string | undefined,
): Promise<void> {
  try {
    await papi.commands.sendCommand('paratextBibleSendReceive.syncProjects', [incomingProjectId]);
  } catch (e) {
    papi.logger.warn(
      `Project-switch sync: incoming sync for ${incomingProjectId} failed: ${getErrorMessage(e)}`,
    );
  }

  if (outgoingProjectId) {
    try {
      await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects', [
        outgoingProjectId,
      ]);
    } catch (e) {
      papi.logger.warn(
        `Project-switch sync: outgoing sync for ${outgoingProjectId} failed: ${getErrorMessage(e)}`,
      );
    }
  }
}

// #endregion Project-Switch Sync

// #region Text Connection Panels

/**
 * Opens or updates the model text, commentary, and scripture resource panels for a project.
 *
 * @param papi The instance of papi to send the commands
 * @param projectId The id of the project to open the text connections for
 */
export async function openTextConnectionPanels(
  papi: typeof PapiBackend,
  projectId: string,
): Promise<void> {
  try {
    await papi.commands.sendCommand('platformScriptureEditor.openModelText', projectId);
  } catch (e) {
    papi.logger.warn(`Error opening model text panel: ${getErrorMessage(e)}`);
  }
  try {
    await papi.commands.sendCommand(
      'platformScriptureEditor.openResourceText',
      'CommentaryResource',
      projectId,
    );
  } catch (e) {
    papi.logger.warn(`Error opening commentary text panel: ${getErrorMessage(e)}`);
  }
  try {
    await papi.commands.sendCommand(
      'platformScriptureEditor.openResourceText',
      'ScriptureResource',
      projectId,
    );
  } catch (e) {
    papi.logger.warn(`Error opening scripture resource text panel: ${getErrorMessage(e)}`);
  }
}

// #endregion Text Connection Panels
