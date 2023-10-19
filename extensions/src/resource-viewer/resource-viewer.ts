import papi from 'papi-backend';
import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
import type {
  GetWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from 'shared/data/web-view.model';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
import resourceViewerWebView from './resource-viewer.web-view?inline';
import resourceViewerWebViewStyles from './resource-viewer.web-view.scss?inline';

const { logger } = papi;

logger.info('Resource Viewer is importing!');

const resourceWebViewType = 'resourceViewer.react';

interface ResourceViewerOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

/**
 * Function to prompt for a project and open it in the resource viewer. Registered as a command handler.
 */
async function openResourceViewer() {
  const project = await papi.dialogs.selectProject();
  if (project) {
    const options: ResourceViewerOptions = { projectId: project };
    // REVIEW: If a resource viewer is already open for the selected project, do we want to open another?
    papi.webViews.getWebView(resourceWebViewType, undefined, options);
  }
}

/**
 * Simple web view provider that provides Resource web views when papi requests them
 */
const resourceWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ResourceViewerOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== resourceWebViewType)
      throw new Error(
        `${resourceWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: getWebViewOptions.projectId
        ? `Resource Viewer : ${
            (await papi.projectLookup.getMetadataForProject(getWebViewOptions.projectId)).name ??
            getWebViewOptions.projectId
          }`
        : 'Resource Viewer',
      content: resourceViewerWebView,
      styles: resourceViewerWebViewStyles,
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

  // Create a webview or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`.
  papi.webViews.getWebView(resourceWebViewType, undefined, { existingId: '?' });

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(await resourceWebViewProviderPromise, await openResourceViewerPromise);

  logger.info('The Resource Viewer is finished activating!');
}
