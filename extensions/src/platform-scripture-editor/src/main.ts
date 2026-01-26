import papi, { logger, WebViewFactory } from '@papi/backend';
import type {
  ExecutionActivationContext,
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import {
  AsyncVariable,
  deepEqual,
  getErrorMessage,
  PlatformEventEmitter,
  serialize,
} from 'platform-bible-utils';
import {
  EditorDecorations,
  SelectionChangeEvent,
  EditorWebViewMessage,
  OpenEditorOptions,
  PlatformScriptureEditorWebViewController,
  ScriptureRangeUsjVerseRefChapterLocation,
} from 'platform-scripture-editor';
import { AnnotationStyleDataProviderEngine } from './annotations/annotation-style.data-provider-engine.model';
import { mergeDecorations } from './decorations.util';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';
import {
  convertScriptureRangeToEditorRange,
  formatEditorTitle,
  openCommentListAndSelectThread,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
} from './platform-scripture-editor.utils';
import { MarkersViewNotifier } from './markers-view-notifier.model';

logger.debug('Scripture Editor is importing!');

// #region Editor Selection Tracking

/**
 * Network event name for editor selection change events. Use
 * `papi.network.getNetworkEvent('platformScriptureEditor.onDidSelectionChange')` to subscribe.
 */
const EDITOR_SELECTION_CHANGED_EVENT = 'platformScriptureEditor.onDidSelectionChange';

/** Event emitter for selection change events. Created in activate() */
let selectionChangedEventEmitter: PlatformEventEmitter<SelectionChangeEvent> | undefined;

/**
 * Gets the current selection for an editor.
 *
 * @param webViewId The WebView ID of the editor
 * @returns The current selection, or undefined if there is no selection or the editor is not found
 */
// Selection is stored per-WebViewController instance in createWebViewController.

// #endregion Editor Selection Tracking

interface PlatformScriptureEditorOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  isReadOnly: boolean;
  options?: OpenEditorOptions;
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
    /**
     * Variable that holds the current selection in the editor. Will be `undefined` if could not
     * determine selection. Will also be `undefined` initially until the editor reports its first
     * selection.
     */
    let currentSelection: ScriptureRangeUsjVerseRefChapterLocation | undefined;
    /** Variable we will use to wait to get the first selection reported from the editor */
    const firstSelectionAsync: AsyncVariable<ScriptureRangeUsjVerseRefChapterLocation | undefined> =
      new AsyncVariable(`platformScriptureEditor.selection.${currentWebViewDefinition.id}`);
    return {
      async selectRange(range) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to selectRange ${serialize(range)}`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const { verseRef, editorRange } = await convertScriptureRangeToEditorRange(
            papi,
            range,
            currentWebViewDefinition.projectId,
          );

          const message: EditorWebViewMessage = {
            method: 'selectRange',
            scrRef: verseRef,
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
            throw new Error(
              `User does not have permission to create comments in project ${projectId}`,
            );
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
          throw e;
        }
      },
      async setAnnotation(range, annotationType, annotationId, interactionCommand) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to setAnnotation ${serialize({ annotationType, annotationId, interactionCommand })}`,
          );
          if (!currentWebViewDefinition.projectId)
            throw new Error(`webViewDefinition.projectId is empty!`);

          const { verseRef, editorRange } = await convertScriptureRangeToEditorRange(
            papi,
            range,
            currentWebViewDefinition.projectId,
          );

          const message: EditorWebViewMessage = {
            method: 'setAnnotation',
            verseRef,
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

          await openCommentListAndSelectThread(papi, currentWebViewDefinition.id, threadId);
        } catch (e) {
          logger.warn(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running focusComment: ${getErrorMessage(e)}`,
          );
          throw e;
        }
      },
      async runAnnotationAction(annotationId, action) {
        try {
          logger.debug(
            `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} received request to runAnnotationAction ${serialize({ annotationId, action })}`,
          );

          const message: EditorWebViewMessage = {
            method: 'runAnnotationAction',
            annotationId,
            action,
          };
          await papi.webViewProviders.postMessageToWebView(
            currentWebViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          const errorMessage = `Platform Scripture Editor WebView Controller ${currentWebViewDefinition.id} threw while running runAnnotationAction! ${getErrorMessage(e)}`;
          logger.warn(errorMessage);
          throw new Error(errorMessage);
        }
      },
      async getSelection() {
        // If we haven't yet received the first selection, wait for it
        if (!firstSelectionAsync.hasSettled) {
          return firstSelectionAsync.promise;
        }
        return currentSelection;
      },
      async updateSelectionInternal(selection) {
        const webViewId = currentWebViewDefinition.id;

        // If the selection changed, we don't need to do anything
        if (deepEqual(currentSelection, selection)) return;

        currentSelection = selection;
        // Resolve the first selection async variable with the first selection we get
        if (!firstSelectionAsync.hasSettled) firstSelectionAsync.resolveToValue(selection);
        selectionChangedEventEmitter?.emit({ webViewId, selection });
      },
      async dispose() {
        currentSelection = undefined;
        // If we never got a selection, reject the first selection promise
        firstSelectionAsync.rejectWithReason('Disposed before first selection received');
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

  // Create the selection changed event emitter
  selectionChangedEventEmitter = papi.network.createNetworkEventEmitter<SelectionChangeEvent>(
    EDITOR_SELECTION_CHANGED_EVENT,
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
    selectionChangedEventEmitter,
    ...markerNotifierUnsubscribers,
  );

  logger.debug('Scripture editor is finished activating!');
}
