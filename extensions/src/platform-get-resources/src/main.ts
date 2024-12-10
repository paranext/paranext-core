import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import getResourcesDialogReactStyles from './get-resources.web-view.scss?inline';
import getResourcesDialogReact from './get-resources.web-view?inline';

const GET_RESOURCES_WEB_VIEW_TYPE = 'platformGetResources.getResources';

const GET_RESOURCES_WEB_VIEW_SIZE = { width: 600, height: 475 };

const getResourcesWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== GET_RESOURCES_WEB_VIEW_TYPE)
      throw new Error(
        `${GET_RESOURCES_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: await papi.localization.getLocalizedString({
        localizeKey: '%resources_dialog_title%',
      }),
      ...savedWebView,
      content: getResourcesDialogReact,
      styles: getResourcesDialogReactStyles,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('Platform Get Resources Extension is activating!');

  const getResourcesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    GET_RESOURCES_WEB_VIEW_TYPE,
    getResourcesWebViewProvider,
  );

  const openGetResourcesWebViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openGetResources',
    async () => {
      return papi.webViews.openWebView(GET_RESOURCES_WEB_VIEW_TYPE, {
        type: 'float',
        floatSize: GET_RESOURCES_WEB_VIEW_SIZE,
      });
    },
  );

  context.registrations.add(
    await getResourcesWebViewProviderPromise,
    await openGetResourcesWebViewCommandPromise,
  );

  logger.info('Platform Get Resources Extension finished activating!');
}

export async function deactivate() {
  logger.info('Platform Get Resources Extension is deactivating!');
  return true;
}
