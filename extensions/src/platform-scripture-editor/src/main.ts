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
  formatReplacementString,
  getErrorMessage,
  isLocalizeKey,
  LanguageStrings,
  LocalizeKey,
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
import { AnnotationStyleDataProviderEngine } from './annotation-style.data-provider-engine.model';
import { mergeDecorations } from './decorations.util';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';

logger.debug('Scripture Editor is importing!');

const scriptureEditorWebViewType = 'platformScriptureEditor.react';

const PROJECT_ID_TITLE_FORMAT_STRING_KEY = '%webView_platformScriptureEditor_title_format%';
const EDITABLE_KEY = '%webView_platformScriptureEditor_title_editable_indicator%';
const RESOURCE_VIEWER_KEY = '%webView_platformScriptureEditor_title_readonly_no_project%';
const SCRIPTURE_EDITOR_KEY = '%webView_platformScriptureEditor_title_editable_no_project%';

interface PlatformScriptureEditorOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  isReadOnly: boolean;
  options?: OpenEditorOptions;
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

// #endregion selectRange helper functions

/**
 * Get localized strings for creating the editor WebView tab
 *
 * @param tabTitleFormatString Localize key or plain string for title of the tab
 * @returns Localized strings
 */
async function getEditorTabLocalizations(
  tabTitleFormatString: LocalizeKey,
): Promise<LanguageStrings> {
  const localizationData = await papi.localization.getLocalizedStrings({
    localizeKeys: [EDITABLE_KEY, tabTitleFormatString],
    locales: ['en'],
  });
  return localizationData;
}

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
    scriptureEditorWebViewType,
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
    scriptureEditorWebViewType,
    webViewId,
  );

  if (!webViewController) {
    throw new Error('No web view controller found!');
  }

  await webViewController.insertCrossReferenceAtSelection();
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
      scriptureEditorWebViewType,
      existingTabIdToReplace
        ? { type: 'replace-tab', targetTabId: existingTabIdToReplace }
        : undefined,
      openWebViewOptions,
    );
  }
  return undefined;
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

  if (webViewDefinition.webViewType !== scriptureEditorWebViewType) {
    logger.debug(`WebView is not a Scripture editor!`);
    return;
  }

  const controller = await papi.webViews.getWebViewController(
    scriptureEditorWebViewType,
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

  if (webViewDefinition.webViewType !== scriptureEditorWebViewType) {
    logger.debug(`WebView is not a Scripture editor!`);
    return;
  }

  const controller = await papi.webViews.getWebViewController(
    scriptureEditorWebViewType,
    webViewId,
  );

  if (!controller) {
    logger.debug(`WebView controller could not be obtained for ${webViewId}!`);
    return;
  }

  await controller.changeFootnotesPaneLocation();
}

/** Simple WebView provider so PAPI can get a Scripture Editor upon request */
class ScriptureEditorWebViewFactory extends WebViewFactory<typeof scriptureEditorWebViewType> {
  constructor() {
    super(scriptureEditorWebViewType);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: PlatformScriptureEditorOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== scriptureEditorWebViewType)
      throw new Error(
        `${scriptureEditorWebViewType} provider received request to provide a ${savedWebView.webViewType} WebView`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId = getWebViewOptions.projectId ?? savedWebView.projectId ?? undefined;
    const isReadOnly = getWebViewOptions.isReadOnly || savedWebView.state?.isReadOnly;
    let title = getWebViewOptions.options?.title ?? savedWebView.title;
    if (!title) {
      if (projectId) title = PROJECT_ID_TITLE_FORMAT_STRING_KEY;
      else title = isReadOnly ? RESOURCE_VIEWER_KEY : SCRIPTURE_EDITOR_KEY;
    }
    if (isLocalizeKey(title)) {
      const localizedStrings = await getEditorTabLocalizations(title);
      const localizedTitleFormatStr = localizedStrings[title];
      const localizedEditable = localizedStrings[EDITABLE_KEY];

      let projectName = projectId;
      if (projectId) {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        projectName = (await pdp.getSetting('platform.name')) ?? projectName;
      }

      title = formatReplacementString(localizedTitleFormatStr, {
        projectId: projectName,
        editable: isReadOnly ? '' : localizedEditable,
      });
    }

    return {
      ...savedWebView,
      title,
      iconUrl: getWebViewOptions.options?.iconUrl ?? savedWebView.iconUrl,
      tooltip: getWebViewOptions.options?.tooltip ?? savedWebView.tooltip,
      content: platformScriptureEditorWebView,
      styles: platformScriptureEditorWebViewStyles,
      state: {
        ...savedWebView.state,
        isReadOnly,
        decorations: mergeDecorations(
          // We know this will be EditorDecorations though webView state doesn't have types
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          savedWebView.state?.decorations as EditorDecorations,
          getWebViewOptions.options?.decorations,
        ),
      },
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

          // Figure out the information needed to make the USJ range to give to the editor:
          // book, chapter, start jsonPath and offset, and end jsonPath and offset.
          // Also need to get the verse to set the scroll group verse to because the editor doesn't
          // do it automatically right now
          let startVerseRef = { book: '', chapterNum: 0, verseNum: -1 };
          let startJsonPath = '';
          let endJsonPath = '';
          // Start and end offsets based on the USJ JSONPath location
          let startJsonPathOffset: number | undefined;
          let endJsonPathOffset: number | undefined;

          // May need to use verse refs and offsets from the USFM verse location to get USJ offsets
          let endVerseRef = { book: '', chapterNum: 0, verseNum: 0 };

          // Figure out the book and chapter and the jsonPaths and offsets if they're in the range
          // passed to us
          // Process the starting location
          const { verseOffset: startVerseOffset, ...startLocationProperties } =
            determineLocationProperties(range.start, startVerseRef);
          ({
            jsonPath: startJsonPath,
            jsonPathOffset: startJsonPathOffset,
            verseRef: startVerseRef,
          } = startLocationProperties);

          // Process the ending location
          const { verseOffset: endVerseOffset, ...endLocationProperties } =
            determineLocationProperties(range.end, endVerseRef);
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

          // If we don't have at least one of the USJ range properties or the verse number, need to
          // process the chapter to find them based on what we have
          if (
            !startJsonPath ||
            !endJsonPath ||
            startJsonPathOffset === undefined ||
            endJsonPathOffset === undefined ||
            startVerseRef.verseNum === -1
          ) {
            // Get the USJ chapter we're on so we can determine the missing USJ range properties
            const pdp = await papi.projectDataProviders.get(
              'platformScripture.USJ_Chapter',
              currentWebViewDefinition.projectId,
            );
            const usjChapter = await pdp.getChapterUSJ(startVerseRef);

            if (!usjChapter)
              throw new Error(
                `USJ Chapter for project id ${currentWebViewDefinition.projectId} target scrRef ${serialize(startVerseRef)} is undefined!`,
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

            ({ jsonPath: endJsonPath, jsonPathOffset: endJsonPathOffset } =
              calculateUsjLocationProperties(
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
          }

          const convertedRange = {
            start: { jsonPath: startJsonPath, offset: startJsonPathOffset },
            end: { jsonPath: endJsonPath, offset: endJsonPathOffset },
          };

          const message: EditorWebViewMessage = {
            method: 'selectRange',
            scrRef: startVerseRef,
            range: convertedRange,
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
    scriptureEditorWebViewType,
    scriptureEditorWebViewProvider,
  );

  const toggleFootnotesPanePromise = papi.commands.registerCommand(
    'platformScripture.toggleFootnotes',
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
    'platformScripture.changeFootnotesPaneLocation',
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
  context.registrations.add(
    await scriptureEditorWebViewProviderPromise,
    await openPlatformScriptureEditorPromise,
    await openPlatformResourceViewerPromise,
    await toggleFootnotesPanePromise,
    await changeFootnotesPaneLocationPromise,
    await insertFootnotePromise,
    await insertCrossReferencePromise,
    await annotationStyleDataProviderPromise,
  );

  logger.debug('Scripture editor is finished activating!');
}
