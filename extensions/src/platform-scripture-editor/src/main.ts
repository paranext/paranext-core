import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { SerializedVerseRef } from '@sillsdev/scripture';
import {
  getErrorMessage,
  serialize,
  USFM_MARKERS_MAP_PARATEXT_3_0,
  UsjNodeAndDocumentLocation,
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  EditorDecorations,
  EditorWebViewMessage,
  OpenEditorOptions,
  PlatformScriptureEditorWebViewController,
  ScriptureRange,
} from 'platform-scripture-editor';
import { AnnotationStyleDataProviderEngine } from './annotations/annotation-style.data-provider-engine.model';
import { mergeDecorations } from './decorations.util';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';
import {
  formatEditorTitle,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './platform-scripture-editor.utils';
import { MarkersViewNotifier } from './markers-view-notifier.model';

logger.debug('Scripture Editor is importing!');

interface PlatformScriptureEditorOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  isReadOnly: boolean;
  options?: OpenEditorOptions;
}

/** Time in ms to wait for the comment list web view to load before scrolling to a thread */
const COMMENT_LIST_LOAD_DELAY_MS = 500;

/**
 * Opens the comment list for an editor and scrolls to a specific thread.
 *
 * @param editorWebViewId The ID of the editor web view (used to determine which project's comments)
 * @param threadId The ID of the thread to scroll to
 */
async function openCommentListAndScrollToThread(
  editorWebViewId: string,
  threadId: string,
): Promise<void> {
  const commentListWebViewId = await papi.commands.sendCommand(
    'legacyCommentManager.openCommentList',
    editorWebViewId,
  );

  if (!commentListWebViewId) {
    logger.warn('Failed to open comment list: no web view ID returned');
    return;
  }

  // Wait for the comment list to load before scrolling
  await new Promise<void>((resolve) => {
    setTimeout(resolve, COMMENT_LIST_LOAD_DELAY_MS);
  });

  // Get the comment list controller and scroll to the thread
  const commentListController = await papi.webViews.getWebViewController(
    'legacyCommentManager.commentList',
    commentListWebViewId,
  );

  if (!commentListController) {
    logger.warn(`Failed to get comment list controller for web view ${commentListWebViewId}`);
    return;
  }

  await commentListController.scrollToThread(threadId);
}

// #region selectRange helper functions

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
  scrRef: SerializedVerseRef;
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
async function convertScriptureRangeToEditorRange(
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
  let startContentLocation: UsjNodeAndDocumentLocation | undefined;
  ({
    jsonPath: startJsonPath,
    jsonPathOffset: startJsonPathOffset,
    usjContentLocation: startContentLocation,
  } = calculateUsjLocationProperties(
    usjRW,
    startVerseRef,
    startVerseOffset,
    startJsonPath,
    startJsonPathOffset,
  ));

  let endContentLocation: UsjNodeAndDocumentLocation | undefined;
  ({
    jsonPath: endJsonPath,
    jsonPathOffset: endJsonPathOffset,
    usjContentLocation: endContentLocation,
  } = calculateUsjLocationProperties(
    usjRW,
    endVerseRef,
    endVerseOffset,
    endJsonPath,
    endJsonPathOffset,
  ));

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
    scrRef: startVerseRef,
    editorRange: {
      start: { jsonPath: startJsonPath, offset: startJsonPathOffset },
      end: { jsonPath: endJsonPath, offset: endJsonPathOffset },
    },
    usjReaderWriter: usjRW,
    startLocation: finalStartLocation,
    endLocation: finalEndLocation,
  };
}

// #endregion selectRange helper functions

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformScriptureEditor(
  projectId: string | undefined,
  options?: OpenEditorOptions,
  existingTabIdToReplace?: string,
): Promise<string | undefined> {
  // The first argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(false, projectId, existingTabIdToReplace, options);
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformResourceViewer(
  projectId: string | undefined,
  options?: OpenEditorOptions,
  existingTabIdToReplace?: string,
): Promise<string | undefined> {
  // The first argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(true, projectId, existingTabIdToReplace, options);
}

async function insertFootnoteAtSelection(webViewId: string | undefined): Promise<void> {
  logger.debug('Inserting footnote...');

  if (!webViewId) {
    throw new Error('No WebView ID provided!');
  }

  const webViewController = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!webViewController) {
    throw new Error('No web view controller found!');
  }

  await webViewController.insertFootnoteAtSelection();
}

async function insertCrossReferenceAtSelection(webViewId: string | undefined): Promise<void> {
  logger.debug('Inserting cross-reference...');

  if (!webViewId) {
    throw new Error('No WebView ID provided!');
  }

  const webViewController = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!webViewController) {
    throw new Error('No web view controller found!');
  }

  await webViewController.insertCrossReferenceAtSelection();
}

async function insertCommentAtSelection(webViewId: string | undefined): Promise<void> {
  logger.debug('Inserting project comment...');

  if (!webViewId) {
    throw new Error('No WebView ID provided!');
  }

  const webViewController = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!webViewController) {
    throw new Error('No web view controller found!');
  }

  await webViewController.insertCommentAtSelection();
}

/** Function to prompt for a project and open it in the editor */
async function open(
  isReadOnly: boolean,
  projectId?: string,
  existingTabIdToReplace?: string,
  options?: OpenEditorOptions,
): Promise<string | undefined> {
  const projectForWebView = { projectId, isEditable: !isReadOnly };
  if (!projectForWebView.projectId) {
    // Get a list of projects that are editable or not editable to show in the select project dialog
    const projectMetadatas = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      excludePdpFactoryIds: await papi.settings.get(
        'platformGetResources.excludePdpFactoryIdsInHome',
      ),
    });
    const projectsWithEditable = await Promise.all(
      projectMetadatas.map(async (projectMetadata) => {
        const pdp = await papi.projectDataProviders.get('platform.base', projectMetadata.id);
        return {
          projectId: projectMetadata.id,
          isEditable: await pdp.getSetting('platform.isEditable'),
        };
      }),
    );

    const projectIdsMatchingReadonly = projectsWithEditable
      .filter(({ isEditable }) => isEditable !== isReadOnly)
      .map(({ projectId: pId }) => pId);

    if (projectIdsMatchingReadonly.length > 0) {
      projectForWebView.projectId = await papi.dialogs.selectProject({
        title: isReadOnly
          ? '%platformScriptureEditor_dialog_openResourceViewer_title%'
          : '%platformScriptureEditor_dialog_openScriptureEditor_title%',
        prompt: isReadOnly
          ? '%platformScriptureEditor_dialog_openResourceViewer_prompt%'
          : '%platformScriptureEditor_dialog_openScriptureEditor_prompt%',
        // Include projects whose editable matches readonly
        includeProjectIds: projectIdsMatchingReadonly,
      });
    } else {
      logger.warn(
        `Open ${isReadOnly ? 'Resource Viewer' : 'Scripture Editor'} did not find any projects with matching isEditable! Would show a prompt or something if there were a dialog available to do so`,
      );
    }
  } else {
    // Get whether the provided project is editable
    const pdp = await papi.projectDataProviders.get('platform.base', projectForWebView.projectId);
    projectForWebView.isEditable = await pdp.getSetting('platform.isEditable');
  }
  if (projectForWebView.projectId) {
    const openWebViewOptions: PlatformScriptureEditorOptions = {
      projectId: projectForWebView.projectId,
      isReadOnly: !projectForWebView.isEditable,
      options,
    };
    // REVIEW: If an editor is already open for the selected project, we open another.
    // This matches the current behavior in P9, though it might not be what we want long-term.
    return papi.webViews.openWebView(
      SCRIPTURE_EDITOR_WEBVIEW_TYPE,
      existingTabIdToReplace
        ? { type: 'replace-tab', targetTabId: existingTabIdToReplace }
        : undefined,
      openWebViewOptions,
    );
  }
  return undefined;
}

async function changeScriptureView(webViewId: string | undefined): Promise<void> {
  if (!webViewId) {
    logger.debug('No editor WebView ID!');
    return;
  }

  const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
  if (!webViewDefinition) {
    logger.debug(`No webViewDefinition found for ${webViewId}!`);
    return;
  }

  if (webViewDefinition.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) {
    logger.debug(`WebView is not a Scripture editor!`);
    return;
  }

  const controller = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!controller) {
    logger.debug(`WebView controller could not be obtained for ${webViewId}!`);
    return;
  }

  await controller.changeScriptureView();
}

async function toggleFootnotesPane(webViewId: string | undefined): Promise<void> {
  if (!webViewId) {
    logger.debug('No editor WebView ID!');
    return;
  }

  const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
  if (!webViewDefinition) {
    logger.debug(`No webViewDefinition found for ${webViewId}!`);
    return;
  }

  if (webViewDefinition.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) {
    logger.debug(`WebView is not a Scripture editor!`);
    return;
  }

  const controller = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!controller) {
    logger.debug(`WebView controller could not be obtained for ${webViewId}!`);
    return;
  }

  await controller.toggleFootnotesPaneVisibility();
}

async function changeFootnotesPaneLocation(webViewId: string | undefined): Promise<void> {
  if (!webViewId) {
    logger.debug('No editor WebView ID!');
    return;
  }

  const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(webViewId);
  if (!webViewDefinition) {
    logger.debug(`No webViewDefinition found for ${webViewId}!`);
    return;
  }

  if (webViewDefinition.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE) {
    logger.debug(`WebView is not a Scripture editor!`);
    return;
  }

  const controller = await papi.webViews.getWebViewController(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    webViewId,
  );

  if (!controller) {
    logger.debug(`WebView controller could not be obtained for ${webViewId}!`);
    return;
  }

  await controller.changeFootnotesPaneLocation();
}

/** Simple WebView provider so PAPI can get a Scripture Editor upon request */
class ScriptureEditorWebViewFactory extends WebViewFactory<typeof SCRIPTURE_EDITOR_WEBVIEW_TYPE> {
  constructor() {
    super(SCRIPTURE_EDITOR_WEBVIEW_TYPE);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: PlatformScriptureEditorOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== SCRIPTURE_EDITOR_WEBVIEW_TYPE)
      throw new Error(
        `${SCRIPTURE_EDITOR_WEBVIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} WebView`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId = getWebViewOptions.projectId ?? savedWebView.projectId ?? undefined;
    const isReadOnly = getWebViewOptions.isReadOnly ?? !!savedWebView.state?.isReadOnly;

    // Get the options out that we need to do more stuff with
    const {
      decorations: optionsDecorations,
      iconUrl: optionsIconUrl,
      title: optionsTitle,
      tooltip: optionsTooltip,
      ...optionsWebViewState
    } = getWebViewOptions.options ?? {};

    const unformattedTitle =
      optionsTitle ??
      // WebView state is not yet typed, but we know this is string | undefined
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.unformattedTitle as string | undefined);

    // Overwrite the saved state with the relevant options passed in and some other updated values
    const savedWebViewStateUpdated = {
      ...savedWebView.state,
      ...optionsWebViewState,
      decorations: mergeDecorations(
        // We know this will be EditorDecorations though webView state doesn't have types
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        savedWebView.state?.decorations as EditorDecorations,
        optionsDecorations,
      ),
      isReadOnly,
      /**
       * The original title string or localized string key passed in for us to use to format the
       * title when it should change
       */
      unformattedTitle,
    };

    const title = await formatEditorTitle(
      unformattedTitle,
      projectId,
      isReadOnly || savedWebViewStateUpdated.viewType === 'markers',
      async (projectIdFormat) => {
        const pdp = await papi.projectDataProviders.get('platform.base', projectIdFormat);
        return (await pdp.getSetting('platform.name')) ?? projectIdFormat;
      },
      papi.localization.getLocalizedStrings,
    );

    return {
      ...savedWebView,
      title,
      iconUrl: optionsIconUrl ?? savedWebView.iconUrl,
      tooltip: optionsTooltip ?? savedWebView.tooltip,
      content: platformScriptureEditorWebView,
      styles: platformScriptureEditorWebViewStyles,
      state: savedWebViewStateUpdated,
      projectId,
      allowPopups: true,
      shouldShowToolbar: true,
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<PlatformScriptureEditorWebViewController> {
    let currentWebViewDefinition: SavedWebViewDefinition = webViewDefinition;
    const unsubFromWebViewUpdates = papi.webViews.onDidUpdateWebView(({ webView }) => {
      if (webView.id === currentWebViewDefinition.id) currentWebViewDefinition = webView;
    });
    return {
      async selectRange(range) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to selectRange ${serialize(range)}`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const { scrRef, editorRange } = await convertScriptureRangeToEditorRange(
            range,
            currentWebViewDefinition.projectId,
          );

          const message: EditorWebViewMessage = {
            method: 'selectRange',
            scrRef,
            range: editorRange,
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running selectRange! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async updateDecorations(decorationsToAdd, decorationsToRemove) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to updateDecorations(${serialize(decorationsToAdd)},${serialize(decorationsToRemove)})`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const message: EditorWebViewMessage = {
            method: 'updateDecorations',
            decorationsToAdd,
            decorationsToRemove,
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running updateDecorations! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async changeScriptureView() {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to changeScriptureView`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const message: EditorWebViewMessage = {
            method: 'changeScriptureView',
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running changeScriptureView! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async toggleFootnotesPaneVisibility() {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to toggleFootnotesPaneVisibility`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const message: EditorWebViewMessage = {
            method: 'toggleFootnotesPaneVisibility',
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const message = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running toggleFootnotesPaneVisibility! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async changeFootnotesPaneLocation(): Promise<'bottom' | 'trailing'> {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to changeFootnotesPaneLocation`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          // Determine current location from saved state (default to 'bottom') and toggle it
          const currentLocation = currentWebViewDefinition.state?.footnotesPanePosition ?? 'bottom';
          const newLocation: 'bottom' | 'trailing' =
            currentLocation === 'bottom' ? 'trailing' : 'bottom';

          const message: EditorWebViewMessage = {
            method: 'changeFootnotesPaneLocation',
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );

          // Return the new location as required by the interface
          return newLocation;
        } catch (e) {
          const message = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running changeFootnotesPaneLocation! ${getErrorMessage(e)}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async insertFootnoteAtSelection() {
        const message: EditorWebViewMessage = {
          method: 'insertFootnoteAtSelection',
        };
        await papi.webViewProviders.postMessageToWebView(
          currentWebViewDefinition.id,
          webViewNonce,
          message,
        );
      },
      async insertCrossReferenceAtSelection() {
        const message: EditorWebViewMessage = {
          method: 'insertCrossReferenceAtSelection',
        };
        await papi.webViewProviders.postMessageToWebView(
          currentWebViewDefinition.id,
          webViewNonce,
          message,
        );
      },
      async insertCommentAtSelection() {
        const { projectId } = currentWebViewDefinition;
        if (!projectId) {
          logger.warn('Cannot insert comment: No project ID associated with this editor');
          return;
        }

        try {
          const commentManagerPdp = await papi.projectDataProviders.get(
            'legacyCommentManager.comments',
            projectId,
          );

          const canCreate = await commentManagerPdp.canUserCreateComments();
          if (!canCreate) {
            logger.warn(`User does not have permission to create comments in project ${projectId}`);
            return;
          }

          const message: EditorWebViewMessage = {
            method: 'insertCommentAtSelection',
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          logger.warn(`Failed to open comment editor: ${getErrorMessage(e)}`);
        }
      },
      async setAnnotation(range, annotationType, annotationId, interactionCommand) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to setAnnotation ${serialize({ annotationType, annotationId, interactionCommand })}`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const { scrRef, editorRange } = await convertScriptureRangeToEditorRange(
            range,
            currentWebViewDefinition.projectId,
          );

          const message: EditorWebViewMessage = {
            method: 'setAnnotation',
            scrRef,
            annotationRange: editorRange,
            annotationType,
            annotationId,
            interactionCommand,
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const errorMessage = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running setAnnotation! ${getErrorMessage(e)}`;
          logger.warn(errorMessage);
          throw new Error(errorMessage);
        }
      },
      async focusComment(threadId) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to focusComment ${threadId}`,
          );

          await openCommentListAndScrollToThread(currentWebViewDefinition.id, threadId);
        } catch (e) {
          logger.warn(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running focusComment: ${getErrorMessage(e)}`,
          );
        }
      },
      async runAnnotationCommand(annotationId, interactionCommand) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to runAnnotationCommand ${serialize({ annotationId, interactionCommand })}`,
          );

          const message: EditorWebViewMessage = {
            method: 'runAnnotationCommand',
            annotationId,
            interactionCommand,
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const errorMessage = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running runAnnotationCommand! ${getErrorMessage(e)}`;
          logger.warn(errorMessage);
          throw new Error(errorMessage);
        }
      },
      async dispose() {
        return unsubFromWebViewUpdates();
      },
    };
  }
}
const scriptureEditorWebViewProvider: IWebViewProvider = new ScriptureEditorWebViewFactory();

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.debug('Scripture editor is activating!');

  const openPlatformScriptureEditorPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openScriptureEditor',
    openPlatformScriptureEditor,
    {
      method: {
        summary: 'Open the scripture editor for a project',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to open the scripture editor for',
            schema: { type: 'string' },
          },
          {
            name: 'existingTabIdToReplace',
            required: false,
            summary: 'The ID of the tab that should be replaced by the scripture editor',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened WebView',
          schema: { type: 'string' },
        },
      },
    },
  );
  const insertCrossReferencePromise = papi.commands.registerCommand(
    'platformScriptureEditor.insertCrossReferenceAtSelection',
    insertCrossReferenceAtSelection,
    {
      method: {
        summary: 'Insert a cross-reference into the project at the given selection in the editor',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary:
              'The ID of the web view tied to the project that we are inserting the footnote',
            schema: { type: 'null' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );
  const insertCommentPromise = papi.commands.registerCommand(
    'platformScriptureEditor.insertCommentAtSelection',
    insertCommentAtSelection,
    {
      method: {
        summary:
          'Open the comment editor to insert a project comment at the current verse in the editor',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary:
              'The ID of the web view tied to the project where we are inserting the comment',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );
  const insertFootnotePromise = papi.commands.registerCommand(
    'platformScriptureEditor.insertFootnoteAtSelection',
    insertFootnoteAtSelection,
    {
      method: {
        summary: 'Insert a footnote into the project at the given selection in the editor',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary:
              'The ID of the web view tied to the project that we are inserting the footnote',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  const openPlatformResourceViewerPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openResourceViewer',
    openPlatformResourceViewer,
    {
      method: {
        summary: 'Open the scripture editor in read-only mode for a project',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to open the scripture editor for',
            schema: { type: 'string' },
          },
          {
            name: 'existingTabIdToReplace',
            required: false,
            summary: 'The ID of the tab that should be replaced by the resource viewer',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened WebView',
          schema: { type: 'string' },
        },
      },
    },
  );

  const annotationStyleDataProviderPromise = papi.dataProviders.registerEngine(
    'platformScriptureEditor.annotationStyle',
    new AnnotationStyleDataProviderEngine(),
  );

  const scriptureEditorWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    SCRIPTURE_EDITOR_WEBVIEW_TYPE,
    scriptureEditorWebViewProvider,
  );

  const changeScriptureViewPromise = papi.commands.registerCommand(
    'platformScriptureEditor.changeView',
    changeScriptureView,
    {
      method: {
        summary: 'Change the Scripture view type in the editor',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the WebView whose Scripture view is to be changed',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  const toggleFootnotesPanePromise = papi.commands.registerCommand(
    'platformScriptureEditor.toggleFootnotes',
    toggleFootnotesPane,
    {
      method: {
        summary: 'Toggle the visibility of the footnotes pane',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the WebView to toggle the footnotes pane for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          schema: { type: 'null' },
        },
      },
    },
  );

  const changeFootnotesPaneLocationPromise = papi.commands.registerCommand(
    'platformScriptureEditor.changeFootnotesPaneLocation',
    changeFootnotesPaneLocation,
    {
      method: {
        summary: 'Toggle the location of the footnotes pane (bottom vs. side-by-side)',
        params: [
          {
            name: 'webViewId',
            required: false,
            summary: 'The ID of the WebView whose footnotes pane location is to be changed',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The new location of the footnotes pane',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Await the registration promises at the end so we don't hold everything else up
  const markerNotifier = new MarkersViewNotifier(papi, context.executionToken);
  const markerNotifierUnsubscribers = await markerNotifier.start();

  context.registrations.add(
    await scriptureEditorWebViewProviderPromise,
    await openPlatformScriptureEditorPromise,
    await openPlatformResourceViewerPromise,
    await changeScriptureViewPromise,
    await toggleFootnotesPanePromise,
    await changeFootnotesPaneLocationPromise,
    await insertFootnotePromise,
    await insertCrossReferencePromise,
    await insertCommentPromise,
    await annotationStyleDataProviderPromise,
    ...markerNotifierUnsubscribers,
  );

  logger.debug('Scripture editor is finished activating!');
}
