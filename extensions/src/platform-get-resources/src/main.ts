import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  IWebViewProvider,
  ManageExtensions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { isString } from 'platform-bible-utils';
import getResourcesDialogReactStyles from './get-resources.web-view.scss?inline';
import getResourcesDialogReact from './get-resources.web-view?inline';
import homeDialogReactStyles from './home.web-view.scss?inline';
import homeDialogReact from './home.web-view?inline';

const GET_RESOURCES_WEB_VIEW_TYPE = 'platformGetResources.getResources';
const HOME_WEB_VIEW_TYPE = 'platformGetResources.home';

const GET_RESOURCES_WEB_VIEW_SIZE = { width: 900, height: 650 };
const HOME_WEB_VIEW_SIZE = { width: 1000, height: 650 };

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
  logger.info('Platform Get Resources Extension is activating!');

  // #region Validate settings

  const excludePdpFactoryIdsInHomeValidatorPromise = papi.settings.registerValidator(
    'platformGetResources.excludePdpFactoryIdsInHome',
    async (newExcludeIdsList) => {
      if (!Array.isArray(newExcludeIdsList)) throw new Error('Must be an array');
      if (newExcludeIdsList.some((id) => !isString(id)))
        throw new Error('Array must only contain strings');
      return true;
    },
  );

  // #endregion

  const getResourcesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    GET_RESOURCES_WEB_VIEW_TYPE,
    getResourcesWebViewProvider,
  );

  const homeWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    HOME_WEB_VIEW_TYPE,
    homeWebViewProvider,
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

  const openHomeWebViewCommandPromise = papi.commands.registerCommand(
    'platformGetResources.openHome',
    async () => {
      return papi.webViews.openWebView(HOME_WEB_VIEW_TYPE, {
        type: 'float',
        floatSize: HOME_WEB_VIEW_SIZE,
      });
    },
  );

  const isSendReceiveAvailableCommandPromise = papi.commands.registerCommand(
    'platformGetResources.isSendReceiveAvailable',
    async () => {
      let isSendReceiveAvailable: boolean = false;
      if (context.elevatedPrivileges.manageExtensions) {
        manageExtensions = context.elevatedPrivileges.manageExtensions;
        const installedExtensions = await manageExtensions.getInstalledExtensions();
        isSendReceiveAvailable = installedExtensions.packaged
          .concat(installedExtensions.enabled)
          .some((extension) => {
            return extension.extensionName === 'paratextBibleSendReceive';
          });
      }
      return isSendReceiveAvailable;
    },
  );

  context.registrations.add(
    await excludePdpFactoryIdsInHomeValidatorPromise,
    await getResourcesWebViewProviderPromise,
    await homeWebViewProviderPromise,
    await openGetResourcesWebViewCommandPromise,
    await openHomeWebViewCommandPromise,
    await isSendReceiveAvailableCommandPromise,
  );

  logger.info('Platform Get Resources Extension finished activating!');
}

export async function deactivate() {
  logger.info('Platform Get Resources Extension is deactivating!');
  return true;
}
