import papi, { logger } from '@papi/backend';
import type {
  ExecutionActivationContext,
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import platformScriptureEditorWebView from './platform-scripture-editor.web-view?inline';
import platformScriptureEditorWebViewStyles from './platform-scripture-editor.web-view.scss?inline';

logger.info('Scripture Editor is importing!');

const scriptureEditorWebViewType = 'platformScriptureEditor.react';

interface PlatformScriptureEditorOptions extends GetWebViewOptions {
  projectId: string | undefined;
  isReadOnly: boolean;
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformScriptureEditor(
  projectId: string | undefined,
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(projectId, false);
}

/** Temporary function to manually control `isReadOnly`. Registered as a command handler. */
async function openPlatformResourceViewer(
  projectId: string | undefined,
): Promise<string | undefined> {
  // The second argument (isReadOnly) is hardcoded for now, but should be a parameter in the future
  return open(projectId, true);
}

/** Function to prompt for a project and open it in the editor */
async function open(
  projectId: string | undefined,
  isReadOnly: boolean,
): Promise<string | undefined> {
  const projectForWebView = { projectId, isEditable: !isReadOnly };
  if (!projectForWebView.projectId) {
    // Get a list of projects that are editable or not editable to show in the select project dialog
    const projectMetadatas = await papi.projectLookup.getMetadataForAllProjects({
      includeProjectInterfaces: ['platformScripture.USJ_BookChapterVerse'],
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
    const options: PlatformScriptureEditorOptions = {
      projectId: projectForWebView.projectId,
      isReadOnly: !projectForWebView.isEditable,
    };
    // REVIEW: If an editor is already open for the selected project, we open another.
    // This matches the current behavior in P9, though it might not be what we want long-term.
    return papi.webViews.getWebView(scriptureEditorWebViewType, undefined, options);
  }
  return undefined;
}

/** Simple web view provider that provides Resource web views when papi requests them */
const scriptureEditorWebViewProvider: IWebViewProvider = {
  async getWebView(
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
    let title = '';
    if (projectId) {
      title = `${
        (await (
          await papi.projectDataProviders.get('platform.base', projectId)
        ).getSetting('platform.name')) ?? projectId
      }${isReadOnly ? '' : ' (Editable)'}`;
    } else title = isReadOnly ? 'Resource Viewer' : 'Scripture Editor';

    return {
      title,
      ...savedWebView,
      content: platformScriptureEditorWebView,
      styles: platformScriptureEditorWebViewStyles,
      state: {
        ...savedWebView.state,
        isReadOnly,
      },
      projectId,
    };
  },
};

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Scripture editor is activating!');

  const openPlatformScriptureEditorPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openScriptureEditor',
    openPlatformScriptureEditor,
  );

  const openPlatformResourceViewerPromise = papi.commands.registerCommand(
    'platformScriptureEditor.openResourceViewer',
    openPlatformResourceViewer,
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
