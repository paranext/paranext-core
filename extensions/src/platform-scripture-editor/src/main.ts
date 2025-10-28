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
  UsjReaderWriter,
} from 'platform-bible-utils';
import {
  EditorDecorations,
  EditorWebViewMessage,
  OpenEditorOptions,
  PlatformScriptureEditorWebViewController,
} from 'platform-scripture-editor';
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

          let targetScrRef = { book: '', chapterNum: 0, verseNum: 0 };

          // Temporarily disabled setting specific range for USFM ranges until we fix the offset
          // translation problem USFM->USJ https://paratextstudio.atlassian.net/browse/PT-2358
          let skipRange = false;

          // Figure out the book and chapter
          if ('jsonPath' in range.start && 'jsonPath' in range.end) {
            // Use the chapter and verse number from the range
            if (
              range.start.book !== range.end.book ||
              range.start.chapterNum !== range.end.chapterNum
            ) {
              throw new Error(
                'Could not get targetScrRef from jsonPaths! Selection range cannot (yet) span chapters or books',
              );
            }

            targetScrRef.book = range.start.book;
            targetScrRef.chapterNum = range.start.chapterNum;
          } else {
            // At least one range location is USFM specification. Will convert to USJ for jsonPath
            skipRange = true;

            if (
              'scrRef' in range.start &&
              'scrRef' in range.end &&
              (range.start.scrRef.book !== range.end.scrRef.book ||
                range.start.scrRef.chapterNum !== range.end.scrRef.chapterNum)
            ) {
              throw new Error(
                'Could not get targetScrRef from scrRefs! Selection range cannot (yet) span chapters or books',
              );
            }

            // Establish the book and chapter we're working with by what the range says
            if ('scrRef' in range.start) {
              targetScrRef = range.start.scrRef;
            } else if ('scrRef' in range.end) {
              targetScrRef = range.end.scrRef;
            } else
              throw new Error('Could not determine target scrRef to convert scrRef to jsonPath');
          }

          // Get the USJ chapter we're on so we can determine some things
          const pdp = await papi.projectDataProviders.get(
            'platformScripture.USJ_Chapter',
            currentWebViewDefinition.projectId,
          );
          const usjChapter = await pdp.getChapterUSJ(targetScrRef);

          if (!usjChapter)
            throw new Error(
              `USJ Chapter for project id ${currentWebViewDefinition.projectId} target scrRef ${serialize(targetScrRef)} is undefined!`,
            );

          const usjRW = new UsjReaderWriter(usjChapter);

          // Convert the range now - easy conversion if already jsonPath, but need to run conversion
          // if in USFM verse ref
          let startJsonPath = '';
          let endJsonPath = '';
          // Assume offset is 0 if not provided
          let startOffset = 0;
          let endOffset = 0;

          if (!skipRange) {
            if ('scrRef' in range.start) {
              const startContentLocation = usjRW.verseRefToUsjContentLocation(
                range.start.scrRef,
                range.start.offset,
              );
              startJsonPath = startContentLocation.jsonPath;
              startOffset = startContentLocation.offset;
            } else {
              startJsonPath = range.start.jsonPath;
              if (range.start.offset !== undefined) startOffset = range.start.offset;
            }

            if ('scrRef' in range.end) {
              const endContentLocation = usjRW.verseRefToUsjContentLocation(
                range.end.scrRef,
                range.end.offset,
              );
              endJsonPath = endContentLocation.jsonPath;
              endOffset = endContentLocation.offset;

              if (endOffset < (range.end.offset ?? 0) - 50) {
                logger.warn(
                  `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} converted range to jsonPath, and calculated endOffset ${endOffset} was over 50 less than the original ${range.end.offset ?? 0}! Setting end position to start position`,
                );
                endJsonPath = startJsonPath;
                endOffset = startOffset + 1;
              }
            } else {
              endJsonPath = range.end.jsonPath;
              if (range.end.offset !== undefined) endOffset = range.end.offset;
              else if (range.start.offset !== undefined) endOffset = range.start.offset;
            }
          }

          const convertedRange = skipRange
            ? undefined
            : {
                start: { jsonPath: startJsonPath, offset: startOffset },
                end: { jsonPath: endJsonPath, offset: endOffset },
              };

          if (convertedRange) {
            // Figure out which verse we're on using the jsonPath
            // Note: we could just use the verse if we receive a scrRef in the range, but our
            // verseRefToUsjContentLocation doesn't always get the conversion right. So might as well
            // use whatever verse it ends up on
            const targetScrRefFromJsonPath = usjRW.jsonPathToVerseRefAndOffset(
              convertedRange.start.jsonPath,
              targetScrRef.book,
            );
            targetScrRef.verseNum = targetScrRefFromJsonPath.verseRef.verseNum;
          }

          const message: EditorWebViewMessage = {
            method: 'selectRange',
            scrRef: targetScrRef,
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
          const currentLocation =
            (currentWebViewDefinition.state as any)?.footnotesPaneLocation ?? 'bottom';
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
  );

  logger.debug('Scripture editor is finished activating!');
}
