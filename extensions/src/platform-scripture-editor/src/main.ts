import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import {
  formatReplacementString,
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
import { Canon, VerseRef } from '@sillsdev/scripture';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';
import { mergeDecorations } from './decorations.util';

logger.info('Scripture Editor is importing!');

const scriptureEditorWebViewType = 'platformScriptureEditor.react';

const PROJECT_ID_TITLE_FORMAT_STRING_KEY = '%webView_platformScriptureEditor_title_format%';
const EDITABLE_KEY = '%webView_platformScriptureEditor_title_editable_indicator%';
const RESOURCE_VIEWER_KEY = '%webView_platformScriptureEditor_title_readonly_no_project%';
const SCRIPTURE_EDITOR_KEY = '%webView_platformScriptureEditor_title_editable_no_project%';

interface PlatformScriptureEditorOptions extends GetWebViewOptions {
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
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(projectId, options, false);
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformResourceViewer(
  projectId: string | undefined,
  options?: OpenEditorOptions,
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(projectId, options, true);
}

/** Function to prompt for a project and open it in the editor */
async function open(
  projectId: string | undefined,
  options: OpenEditorOptions | undefined,
  isReadOnly: boolean,
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
    return papi.webViews.openWebView(scriptureEditorWebViewType, undefined, openWebViewOptions);
  }
  return undefined;
}

/** Simple web view provider that provides Resource web views when papi requests them */
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
        `${scriptureEditorWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;
    const isReadOnly = getWebViewOptions.isReadOnly || savedWebView.state?.isReadOnly;
    let title = getWebViewOptions.options?.title || savedWebView.title;
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
            `Platform Scripture Editor Web View Controller ${currentWebViewDefinition.id} received request to selectRange ${serialize(range)}`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          let targetScrRef = { bookNum: 0, chapterNum: 0, verseNum: 0 };

          // Figure out the book and chapter
          if ('jsonPath' in range.start && 'jsonPath' in range.end) {
            // Use the chapter and verse number from the range
            if (
              range.start.bookNum !== range.end.bookNum ||
              range.start.chapterNum !== range.end.chapterNum
            ) {
              throw new Error(
                'Could not get targetScrRef from jsonPaths! Selection range cannot (yet) span chapters or books',
              );
            }

            targetScrRef.bookNum = range.start.bookNum;
            targetScrRef.chapterNum = range.start.chapterNum;
          } else {
            // At least one range location is USFM specification. Will convert to USJ for jsonPath
            if (
              'scrRef' in range.start &&
              'scrRef' in range.end &&
              (range.start.scrRef.bookNum !== range.end.scrRef.bookNum ||
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
          const usjChapter = await pdp.getChapterUSJ(
            new VerseRef(targetScrRef.bookNum, targetScrRef.chapterNum, targetScrRef.verseNum),
          );

          if (!usjChapter)
            throw new Error(
              `USJ Chapter for project id ${currentWebViewDefinition.projectId} target scrRef ${serialize(targetScrRef)} is undefined!`,
            );

          const usjRW = new UsjReaderWriter(usjChapter);

          // Convert the range now - easy conversion if already jsonPath, but need to run conversion
          // if in USFM verse ref
          let startJsonPath: string;
          let endJsonPath: string;
          // Assume offset is 0 if not provided
          let startOffset = 0;
          let endOffset = 0;

          if ('scrRef' in range.start) {
            const startContentLocation = usjRW.verseRefToUsjContentLocation(
              new VerseRef(
                range.start.scrRef.bookNum,
                range.start.scrRef.chapterNum,
                range.start.scrRef.verseNum,
              ),
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
              new VerseRef(
                range.end.scrRef.bookNum,
                range.end.scrRef.chapterNum,
                range.end.scrRef.verseNum,
              ),
              range.end.offset,
            );
            endJsonPath = endContentLocation.jsonPath;
            endOffset = endContentLocation.offset;

            if (endOffset < (range.end.offset ?? 0) - 50) {
              logger.warn(
                `Platform Scripture Editor Web View Controller ${currentWebViewDefinition.id} converted range to jsonPath, and calculated endOffset ${endOffset} was over 50 less than the original ${range.end.offset ?? 0}! Setting end position to start position`,
              );
              endJsonPath = startJsonPath;
              endOffset = startOffset + 1;
            }
          } else {
            endJsonPath = range.end.jsonPath;
            if (range.end.offset !== undefined) endOffset = range.end.offset;
            else if (range.start.offset !== undefined) endOffset = range.start.offset;
          }

          const convertedRange = {
            start: { jsonPath: startJsonPath, offset: startOffset },
            end: { jsonPath: endJsonPath, offset: endOffset },
          };

          // Figure out which verse we're on using the jsonPath
          // Note: we could just use the verse if we receive a scrRef in the range, but our
          // verseRefToUsjContentLocation doesn't always get the conversion right. So might as well
          // use whatever verse it ends up on
          const targetScrRefFromJsonPath = usjRW.jsonPathToVerseRefAndOffset(
            convertedRange.start.jsonPath,
            Canon.bookNumberToId(targetScrRef.bookNum),
          );
          targetScrRef.verseNum = targetScrRefFromJsonPath.verseRef.verseNum;

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
          const message = `Platform Scripture Editor Web View Controller ${currentWebViewDefinition.id} threw while running selectRange! ${e}`;
          logger.warn(message);
          throw new Error(message);
        }
      },
      async updateDecorations(decorationsToAdd, decorationsToRemove) {
        try {
          logger.debug(
            `Platform Scripture Editor Web View Controller ${currentWebViewDefinition.id} received request to updateDecorations(${serialize(decorationsToAdd)},${serialize(decorationsToRemove)})`,
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
          const message = `Platform Scripture Editor Web View Controller ${currentWebViewDefinition.id} threw while running updateDecorations! ${e}`;
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
  logger.info('Scripture editor is activating!');

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
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened web view',
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
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const scriptureEditorWebViewProviderPromise = papi.webViewProviders.register(
    scriptureEditorWebViewType,
    scriptureEditorWebViewProvider,
  );

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(
    await scriptureEditorWebViewProviderPromise,
    await openPlatformScriptureEditorPromise,
    await openPlatformResourceViewerPromise,
  );

  logger.info('Scripture editor is finished activating!');
}
