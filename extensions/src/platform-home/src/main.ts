import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import homeDialogReactStyles from './home.web-view.scss?inline';
import homeDialogReact from './home.web-view?inline';

const HOME_WEB_VIEW_TYPE = 'platformHome.home';

const HOME_WEB_VIEW_SIZE = { width: 600, height: 475 };

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
  logger.info('Platform Home extension is activating!');

  const homeWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    HOME_WEB_VIEW_TYPE,
    homeWebViewProvider,
  );

  const openHomeWebViewCommandPromise = papi.commands.registerCommand(
    'platformHome.openHome',
    async () => {
      return papi.webViews.openWebView(HOME_WEB_VIEW_TYPE, {
        type: 'float',
        floatSize: HOME_WEB_VIEW_SIZE,
      });
    },
  );

  context.registrations.add(await homeWebViewProviderPromise, await openHomeWebViewCommandPromise);
}

export async function deactivate() {
  logger.info('Platform Home extension is deactivating!');
  return true;
}
