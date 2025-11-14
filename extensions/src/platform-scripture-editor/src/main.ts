import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
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
} from 'platform-scripture-editor';
import { AnnotationStyleDataProviderEngine } from './annotation-style.data-provider-engine.model';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';
import { mergeDecorations } from './decorations.util';

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
          // book, chapter, start jsonPath and offset, and end jsonPath and offset
          let startVerseRef = { book: '', chapterNum: 0, verseNum: 0 };
          let startJsonPath = '';
          let endJsonPath = '';
          // Start and end offsets based on the USJ JSONPath location
          let startJsonPathOffset: number | undefined;
          let endJsonPathOffset: number | undefined;

          //  May need to use verse refs and offsets from the USFM verse location to get USJ offsets
          let endVerseRef = { book: '', chapterNum: 0, verseNum: 0 };
          let startVerseOffset: number | undefined;
          let endVerseOffset: number | undefined;

          // Figure out the book and chapter and the jsonPaths and offsets if they're in the range
          // passed to us
          // Process the starting location
          if ('jsonPath' in range.start || 'documentLocation' in range.start) {
            const startChapterLocation =
              UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(range.start);
            startVerseRef.book = startChapterLocation.verseRef.book;
            startVerseRef.chapterNum = startChapterLocation.verseRef.chapterNum;
            startJsonPath = startChapterLocation.documentLocation.jsonPath;
            if (
              UsjReaderWriter.isUsjDocumentLocationForTextContent(
                startChapterLocation.documentLocation,
              )
            )
              startJsonPathOffset = startChapterLocation.documentLocation.offset;
          } else {
            const startVerseLocation = UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(
              range.start,
            );
            startVerseRef = startVerseLocation.verseRef;
            startVerseOffset = startVerseLocation.offset;
          }
          // Process the ending location
          if ('jsonPath' in range.end || 'documentLocation' in range.end) {
            const endChapterLocation =
              UsjReaderWriter.usjChapterLocationToUsjVerseRefChapterLocation(range.end);
            endVerseRef.book = endChapterLocation.verseRef.book;
            endVerseRef.chapterNum = endChapterLocation.verseRef.chapterNum;
            endJsonPath = endChapterLocation.documentLocation.jsonPath;
            if (
              UsjReaderWriter.isUsjDocumentLocationForTextContent(
                endChapterLocation.documentLocation,
              )
            )
              endJsonPathOffset = endChapterLocation.documentLocation.offset;
          } else {
            const endVerseLocation = UsjReaderWriter.usfmVerseLocationToUsfmVerseRefVerseLocation(
              range.end,
            );
            endVerseRef = endVerseLocation.verseRef;
            endVerseOffset = endVerseLocation.offset;
          }
          if (
            startVerseRef.book !== endVerseRef.book ||
            startVerseRef.chapterNum !== endVerseRef.chapterNum
          )
            throw new Error(
              'Could not get targetScrRef from range! Selection range cannot (yet) span chapters or books',
            );

          // If we don't have at least one of the USJ range properties, need to process the chapter
          // to find them based on what we have
          if (
            !startJsonPath ||
            !endJsonPath ||
            startJsonPathOffset === undefined ||
            endJsonPathOffset === undefined
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
            if (!startJsonPath) {
              startContentLocation = usjRW.usfmVerseLocationToUsjNodeAndDocumentLocation({
                verseRef: startVerseRef,
                offset: startVerseOffset,
              });

              startJsonPath = startContentLocation.documentLocation.jsonPath;
              if (
                UsjReaderWriter.isUsjDocumentLocationForTextContent(
                  startContentLocation.documentLocation,
                )
              ) {
                startJsonPathOffset = startContentLocation.documentLocation.offset;
              }
            }
            let endContentLocation: UsjNodeAndDocumentLocation | undefined;
            if (!endJsonPath) {
              endContentLocation = usjRW.usfmVerseLocationToUsjNodeAndDocumentLocation({
                verseRef: endVerseRef,
                offset: endVerseOffset,
              });

              endJsonPath = endContentLocation.documentLocation.jsonPath;
              if (
                UsjReaderWriter.isUsjDocumentLocationForTextContent(
                  endContentLocation.documentLocation,
                )
              ) {
                endJsonPathOffset = endContentLocation.documentLocation.offset;
              }
            }

            // If we haven't found JSONPath offsets, find the nearest text location. We only need to do
            // this because the editor does not support the full `UsjDocumentLocation`; once it is
            // updated to support them, we can stop tracking jsonPathOffsets
            if (!startJsonPathOffset) {
              const nextTextContentLocation = usjRW.findNextLocationOfMatchingText(
                startContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(startJsonPath),
                '',
              );
              if (nextTextContentLocation) {
                startJsonPath = nextTextContentLocation.documentLocation.jsonPath;
                startJsonPathOffset = nextTextContentLocation.documentLocation.offset;
              } else
                // Just put the offset at the start of the marker pointed to by the jsonPath and
                // hope that's good enough for now. This probably won't happen much, and this case
                // will not exist once the editor is updated
                startJsonPathOffset = 0;
            }
            if (!endJsonPathOffset) {
              const nextTextContentLocation = usjRW.findNextLocationOfMatchingText(
                endContentLocation ?? usjRW.jsonPathToUsjNodeAndDocumentLocation(endJsonPath),
                '',
              );
              if (nextTextContentLocation) {
                endJsonPath = nextTextContentLocation.documentLocation.jsonPath;
                endJsonPathOffset = nextTextContentLocation.documentLocation.offset;
              } else
                // Just put the offset at the start of the marker pointed to by the jsonPath and
                // hope that's good enough for now. This probably won't happen much, and this case
                // will not exist once the editor is updated
                endJsonPathOffset = 0;
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
