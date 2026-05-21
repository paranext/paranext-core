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
import modelTextPanelWebViewStyles from './model-text-panel.web-view.scss?inline';
import modelTextPanelWebView from './model-text-panel.web-view?inline';
import resourcePanelWebViewStyles from './resource-panel.web-view.scss?inline';
import resourcePanelWebView from './resource-panel.web-view?inline';
import {
  convertScriptureRangeToEditorRange,
  formatEditorTitle,
  openCommentListAndSelectThread,
  resolveOpenEditorDispatch,
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  startDefaultProjectPicker,
} from './platform-scripture-editor.utils';
import { MarkersViewNotifier } from './markers-view-notifier.model';

logger.debug('Scripture Editor is importing!');

const MODEL_TEXT_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.modelText';
const BIBLE_TEXTS_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.bibleTexts';
const COMMENTARIES_PANEL_WEBVIEW_TYPE = 'platformScriptureEditor.commentaries';

// #region Editor Selection Tracking

/**
 * Network event name for editor selection change events. Use
 * `papi.network.getNetworkEvent('platformScriptureEditor.onDidSelectionChange')` to subscribe.
 */
const EDITOR_SELECTION_CHANGED_EVENT = 'platformScriptureEditor.onDidSelectionChange';

/** Event emitter for selection change events. Created in activate() */
let selectionChangedEventEmitter: PlatformEventEmitter<SelectionChangeEvent> | undefined;

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
    // Decide where to route this open. The dispatch helper centralizes the simple-mode invariants
    // (one editor slot, no duplicate-(project, readonly) tabs) and the empty-editor probe; see
    // resolveOpenEditorDispatch JSDoc for the priority order.
    const allOpenDefs = await papi.webViews.getAllOpenWebViewDefinitions();
    const allScriptureEditors = allOpenDefs
      .filter((def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE)
      .map((def) => ({
        id: def.id,
        projectId: def.projectId,
        // WebView state isn't statically typed, but `getWebViewDefinition` always stores
        // `isReadOnly` as boolean here. Treat any other value as `false` for safety.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        isReadOnly: !!(def.state?.isReadOnly as boolean | undefined),
      }));
    const interfaceMode = await papi.settings.get('platform.interfaceMode');
    const requestedIsReadOnly = !projectForWebView.isEditable;

    const dispatch = resolveOpenEditorDispatch(
      allScriptureEditors,
      projectForWebView.projectId,
      requestedIsReadOnly,
      interfaceMode,
      existingTabIdToReplace,
    );

    // Focus path: the requested project is already open. Bring the existing tab to the front
    // without tearing down the editor or re-running its WebView provider.
    if (dispatch.kind === 'focus-existing') {
      return papi.webViews.openWebView(SCRIPTURE_EDITOR_WEBVIEW_TYPE, undefined, {
        existingId: dispatch.existingId,
        createNewIfNotFound: false,
        bringToFront: true,
      });
    }

    const openWebViewOptions: PlatformScriptureEditorOptions = {
      projectId: projectForWebView.projectId,
      isReadOnly: !projectForWebView.isEditable,
      options,
    };
    return papi.webViews.openWebView(
      SCRIPTURE_EDITOR_WEBVIEW_TYPE,
      dispatch.kind === 'replace-tab'
        ? { type: 'replace-tab', targetTabId: dispatch.targetTabId }
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

    // Re-read every call so mode changes are picked up at open/replace/restore time.
    const interfaceMode = await papi.settings.get('platform.interfaceMode');

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
      shouldShowToolbar: false,
      // In simple mode, force the editor's scroll group to 0 so it stays aligned with the top-toolbar
      // BCV control (which is the single navigation point in simple mode). Power mode preserves the
      // saved value.
      scrollGroupScrRef: interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef,
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
    /**
     * Variable used to block `getSelection()` callers until the editor reports its first selection.
     * Constructed lazily on the first `getSelection()` call so its internal 10s timeout timer never
     * starts if nobody is waiting. If a selection arrives before any `getSelection()` call,
     * `currentSelection` populates and this variable is never constructed at all — which is the
     * common case in Platform.Bible when the editor is opened without a `projectId`.
     */
    let firstSelectionAsync:
      | AsyncVariable<ScriptureRangeUsjVerseRefChapterLocation | undefined>
      | undefined;
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
        // If we already have a selection, return it directly.
        if (currentSelection !== undefined) return currentSelection;
        // Otherwise lazy-construct the AsyncVariable so its 10s timer only starts when a caller
        // is actually waiting. Subsequent callers reuse the same promise — including the cached
        // rejection if the timeout already fired, so retries get the same rejection rather than
        // a silent `undefined`.
        if (!firstSelectionAsync) {
          firstSelectionAsync = new AsyncVariable(
            `platformScriptureEditor.selection.${currentWebViewDefinition.id}`,
          );
        }
        return firstSelectionAsync.promise;
      },
      async updateSelectionInternal(selection) {
        const webViewId = currentWebViewDefinition.id;

        // If the selection didn't change, we don't need to do anything
        if (deepEqual(currentSelection, selection)) return;

        currentSelection = selection;
        // Resolve the first selection async variable IF it was lazy-constructed by a caller.
        // If no caller has called getSelection() yet, firstSelectionAsync is still undefined and
        // there is nothing to resolve — `currentSelection` is the source of truth from here.
        if (firstSelectionAsync && !firstSelectionAsync.hasSettled) {
          firstSelectionAsync.resolveToValue(selection);
        }
        selectionChangedEventEmitter?.emit({ webViewId, selection });
      },
      async dispose() {
        currentSelection = undefined;
        // If a caller lazy-constructed the AsyncVariable and it hasn't settled, reject it so
        // any pending `getSelection()` callers fail fast rather than waiting for the 10s timeout.
        if (firstSelectionAsync && !firstSelectionAsync.hasSettled) {
          firstSelectionAsync.rejectWithReason('Disposed before first selection received');
        }
        return unsubFromWebViewUpdates();
      },
    };
  }
}
const scriptureEditorWebViewProvider: IWebViewProvider = new ScriptureEditorWebViewFactory();

/**
 * Pending projectId to apply during the next model text panel getWebView call. `null` means no
 * pending value; `undefined` is a valid pending value (opens the panel with no project).
 *
 * Used to pass a new projectId through reloadWebView, which has no options for extra data.
 */
let modelTextPendingProjectId: string | undefined;

const modelTextPanelWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    openWebViewOptions: OpenWebViewOptions & { projectId?: string },
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== MODEL_TEXT_PANEL_WEBVIEW_TYPE)
      throw new Error(
        `${MODEL_TEXT_PANEL_WEBVIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    // Priority: pending (reload path) > options (new-panel path) > saved (existing panel reload)
    const projectId =
      modelTextPendingProjectId !== undefined
        ? modelTextPendingProjectId
        : (openWebViewOptions.projectId ?? savedWebView.projectId);
    modelTextPendingProjectId = undefined;
    return {
      ...savedWebView,
      title: '%webView_modelTextPanel_title%',
      projectId,
      content: modelTextPanelWebView,
      styles: modelTextPanelWebViewStyles,
    };
  },
};

/**
 * Pending projectIds to apply during the next resource panel getWebView call, keyed by web view
 * type. A Map entry present (even with value `undefined`) means a reload is in progress and the
 * pending value should be used. Absence means no pending value.
 *
 * Used to pass a new projectId through reloadWebView, which has no options for extra data.
 */
const resourcePanelPendingProjectIds = new Map<string, string | undefined>();

/**
 * Creates a resource panel web view provider that injects the given resourceType into web view
 * state so the shared component can filter resources appropriately.
 */
function createResourcePanelProvider(
  webViewType: string,
  title: string,
  resourceType: 'ScriptureResource' | 'CommentaryResource',
): IWebViewProvider {
  return {
    async getWebView(
      savedWebView: SavedWebViewDefinition,
      openWebViewOptions: OpenWebViewOptions & { projectId?: string },
    ): Promise<WebViewDefinition | undefined> {
      if (savedWebView.webViewType !== webViewType)
        throw new Error(
          `${webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
        );
      // Priority: pending (reload path) > options (new-panel path) > saved (existing panel reload)
      const projectId = resourcePanelPendingProjectIds.has(webViewType)
        ? resourcePanelPendingProjectIds.get(webViewType)
        : (openWebViewOptions.projectId ?? savedWebView.projectId);
      resourcePanelPendingProjectIds.delete(webViewType);
      return {
        ...savedWebView,
        title,
        projectId,
        content: resourcePanelWebView,
        styles: resourcePanelWebViewStyles,
        state: {
          ...savedWebView.state,
          resourceType,
        },
      };
    },
  };
}

const bibleTextsPanelWebViewProvider: IWebViewProvider = createResourcePanelProvider(
  BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
  '%webView_resourcePanel_bibleTexts_title%',
  'ScriptureResource',
);

const commentariesPanelWebViewProvider: IWebViewProvider = createResourcePanelProvider(
  COMMENTARIES_PANEL_WEBVIEW_TYPE,
  '%webView_resourcePanel_commentaries_title%',
  'CommentaryResource',
);

async function openResourceText(
  resourceType: 'ScriptureResource' | 'CommentaryResource',
  projectId?: string,
): Promise<string | undefined> {
  const webViewType =
    resourceType === 'ScriptureResource'
      ? BIBLE_TEXTS_PANEL_WEBVIEW_TYPE
      : COMMENTARIES_PANEL_WEBVIEW_TYPE;

  const allOpenDefs = await papi.webViews.getAllOpenWebViewDefinitions();
  const existingPanel = allOpenDefs.find((def) => def.webViewType === webViewType);

  if (existingPanel) {
    resourcePanelPendingProjectIds.set(webViewType, projectId);
    return papi.webViews.reloadWebView(webViewType, existingPanel.id, { bringToFront: true });
  }

  const openOptions: OpenWebViewOptions & { projectId?: string } = { projectId };
  return papi.webViews.openWebView(webViewType, { type: 'tab' }, openOptions);
}

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

  const modelTextPanelWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    MODEL_TEXT_PANEL_WEBVIEW_TYPE,
    modelTextPanelWebViewProvider,
  );

  const bibleTextsPanelWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    BIBLE_TEXTS_PANEL_WEBVIEW_TYPE,
    bibleTextsPanelWebViewProvider,
  );

  const commentariesPanelWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    COMMENTARIES_PANEL_WEBVIEW_TYPE,
    commentariesPanelWebViewProvider,
  );

  const openResourceTextPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openResourceText',
    openResourceText,
    {
      method: {
        summary: 'Open the Bible Texts or Commentaries resource panel for a project',
        params: [
          {
            name: 'resourceType',
            required: true,
            summary:
              'The type of resource panel to open: ScriptureResource for Bible Texts, CommentaryResource for Commentaries',
            schema: { type: 'string' },
          },
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID to display resources for',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'return value',
          summary: 'The ID of the opened WebView, or undefined if it could not be opened',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openModelTextPanelPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openModelText',
    async (projectId?: string) => {
      const allOpenDefs = await papi.webViews.getAllOpenWebViewDefinitions();
      const existingPanel = allOpenDefs.find(
        (def) => def.webViewType === MODEL_TEXT_PANEL_WEBVIEW_TYPE,
      );

      if (existingPanel) {
        modelTextPendingProjectId = projectId;
        return papi.webViews.reloadWebView(MODEL_TEXT_PANEL_WEBVIEW_TYPE, existingPanel.id, {
          bringToFront: true,
        });
      }

      const openOptions: OpenWebViewOptions & { projectId?: string } = { projectId };
      return papi.webViews.openWebView(MODEL_TEXT_PANEL_WEBVIEW_TYPE, { type: 'tab' }, openOptions);
    },
    {
      method: {
        summary: 'Open the model text panel for a translation project',
        params: [
          {
            name: 'projectId',
            required: false,
            summary: 'The project ID of the translation project',
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

  // Create the selection changed event emitter
  selectionChangedEventEmitter = papi.network.createNetworkEventEmitter<SelectionChangeEvent>(
    EDITOR_SELECTION_CHANGED_EVENT,
  );

  // Default active project picker for simple layout. Subscribes to web-view-open and
  // sync-completion events and attempts to fill the empty Scripture Editor with the
  // most-recently-active editable project. Re-runs on each subscribed event; concurrent
  // triggers coalesce into a single follow-up run.
  const unsubFromDefaultProjectPicker = startDefaultProjectPicker(papi);

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
    await modelTextPanelWebViewProviderPromise,
    await openModelTextPanelPromise,
    await bibleTextsPanelWebViewProviderPromise,
    await commentariesPanelWebViewProviderPromise,
    await openResourceTextPromise,
    selectionChangedEventEmitter,
    unsubFromDefaultProjectPicker,
    ...markerNotifierUnsubscribers,
  );

  logger.debug('Scripture editor is finished activating!');
}
