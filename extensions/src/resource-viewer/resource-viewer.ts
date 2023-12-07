import papi, { logger } from '@papi/backend';
import type {
  DialogOptions,
  ExecutionActivationContext,
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import resourceViewerWebView from './resource-viewer.web-view?inline';
import resourceViewerWebViewStyles from './resource-viewer.web-view.scss?inline';

logger.info('Resource Viewer is importing!');

const resourceWebViewType = 'resourceViewer.react';

interface ResourceViewerOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

/**
 * Function to prompt for a project and open it in the resource viewer. Registered as a command
 * handler.
 */
async function openResourceViewer(projectId: string | undefined): Promise<string | undefined> {
  let projectIdForWebView = projectId;
  if (!projectIdForWebView) {
    const options: DialogOptions = {
      title: 'Select Resource',
      prompt: 'Choose the resource project to view:',
    };
    projectIdForWebView = await papi.dialogs.selectProject(options);
  }
  if (projectIdForWebView) {
    const options: ResourceViewerOptions = { projectId: projectIdForWebView };
    // REVIEW: If a resource viewer is already open for the selected project, we open another.
    // This matches the current behavior in P9, though it might not be what we want long-term.
    return papi.webViews.getWebView(resourceWebViewType, undefined, options);
  }
  return undefined;
}

/** Simple web view provider that provides Resource web views when papi requests them */
const resourceWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ResourceViewerOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== resourceWebViewType)
      throw new Error(
        `${resourceWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // We know that the projectId (if present in the state) will be a string.
    const projectId =
      getWebViewOptions.projectId ||
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (savedWebView.state?.projectId as string) ||
      undefined;
    return {
      title: projectId
        ? `Resource Viewer : ${
            (await papi.projectLookup.getMetadataForProject(projectId)).name ?? projectId
          }`
        : 'Resource Viewer',
      ...savedWebView,
      content: resourceViewerWebView,
      styles: resourceViewerWebViewStyles,
      state: {
        ...savedWebView.state,
        projectId,
      },
    };
  },
};

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Resource viewer is activating!');

  const openResourceViewerPromise = papi.commands.registerCommand(
    'resourceViewer.open',
    openResourceViewer,
  );

  const resourceWebViewProviderPromise = papi.webViewProviders.register(
    resourceWebViewType,
    resourceWebViewProvider,
  );

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(await resourceWebViewProviderPromise, await openResourceViewerPromise);

  logger.info('The Resource Viewer is finished activating!');
}
