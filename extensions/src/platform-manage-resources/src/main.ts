import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  // GetWebViewOptions,
  IWebViewProvider,
  ManageExtensions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import getResourcesDialogReactStyles from './get-resources.web-view.scss?inline';
import getResourcesDialogReact from './get-resources.web-view?inline';
import homeDialogReactStyles from './home.web-view.scss?inline';
import homeDialogReact from './home.web-view?inline';

const GET_RESOURCES_WEB_VIEW_TYPE = 'platformManageResources.getResources';
const HOME_WEB_VIEW_TYPE = 'platformManageResources.home';

const GET_RESOURCES_WEB_VIEW_SIZE = { width: 900, height: 650 };
const HOME_WEB_VIEW_SIZE = { width: 900, height: 650 };

let manageExtensions: ManageExtensions;

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

const homeWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== HOME_WEB_VIEW_TYPE)
      throw new Error(
        `${HOME_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      title: await papi.localization.getLocalizedString({
        localizeKey: '%home_dialog_title%',
      }),
      ...savedWebView,
      content: homeDialogReact,
      styles: homeDialogReactStyles,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('Platform Manage Resources Extension is activating!');

  const getResourcesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    GET_RESOURCES_WEB_VIEW_TYPE,
    getResourcesWebViewProvider,
  );

  const homeWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    HOME_WEB_VIEW_TYPE,
    homeWebViewProvider,
  );

  const openGetResourcesWebViewCommandPromise = papi.commands.registerCommand(
    'platformManageResources.openGetResources',
    async () => {
      return papi.webViews.openWebView(GET_RESOURCES_WEB_VIEW_TYPE, {
        type: 'float',
        floatSize: GET_RESOURCES_WEB_VIEW_SIZE,
      });
    },
  );

  const openHomeWebViewCommandPromise = papi.commands.registerCommand(
    'platformManageResources.openHome',
    async () => {
      return papi.webViews.openWebView(HOME_WEB_VIEW_TYPE, {
        type: 'float',
        floatSize: HOME_WEB_VIEW_SIZE,
      });
    },
  );

  const isSendReceiveAvailableCommandPromise = papi.commands.registerCommand(
    'platformManageResources.isSendReceiveAvailable',
    async () => {
      let isSendReceiveAvailable: boolean = false;
      if (context.elevatedPrivileges.manageExtensions) {
        manageExtensions = context.elevatedPrivileges.manageExtensions;
        const installedExtensions = await manageExtensions.getInstalledExtensions();
        console.log('installed extensions:', installedExtensions);
        isSendReceiveAvailable = installedExtensions.packaged
          .concat(installedExtensions.enabled)
          .some((extension) => {
            return extension.extensionName === 'paratextBibleSendReceive';
          });
        console.log('is send receive available:', isSendReceiveAvailable);
      }
      return isSendReceiveAvailable;
    },
  );

  context.registrations.add(
    await getResourcesWebViewProviderPromise,
    await homeWebViewProviderPromise,
    await openGetResourcesWebViewCommandPromise,
    await openHomeWebViewCommandPromise,
    await isSendReceiveAvailableCommandPromise,
  );

  logger.info('Platform Manage Resources Extension finished activating!');
}

export async function deactivate() {
  logger.info('Platform Manage Resources Extension is deactivating!');
  return true;
}
