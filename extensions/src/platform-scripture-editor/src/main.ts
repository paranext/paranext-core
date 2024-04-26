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
  let projectIdForWebView = projectId;
  if (!projectIdForWebView) {
    projectIdForWebView = await papi.dialogs.selectProject({
      title: 'Select Resource',
      prompt: 'Choose the resource project:',
      includeProjectTypes: '^ParatextStandard$',
    });
  }
  if (projectIdForWebView) {
    const options: PlatformScriptureEditorOptions = { projectId: projectIdForWebView, isReadOnly };
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
    const projectId =
      getWebViewOptions.projectId ||
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.projectId as string) ||
      undefined;
    const isReadOnly = getWebViewOptions.isReadOnly || savedWebView.state?.isReadOnly;
    let title = isReadOnly ? 'Resource Viewer' : 'Scripture Editor';
    if (projectId) {
      title += `: ${(await papi.projectLookup.getMetadataForProject(projectId)).name ?? projectId}`;
    }
    return {
      title,
      ...savedWebView,
      content: platformScriptureEditorWebView,
      styles: platformScriptureEditorWebViewStyles,
      state: {
        ...savedWebView.state,
        projectId,
        isReadOnly,
      },
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
