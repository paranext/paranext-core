import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import checksSidePanelWebView from './checks-side-panel.web-view?inline';
import checksSidePanelWebViewStyles from './checks-side-panel.web-view.scss?inline';
import checkAggregatorService from './checks/check-aggregator.service';

export const checksSidePanelWebViewType = 'platformScripture.checksSidePanel';

export interface ChecksSidePanelWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

export default class ChecksSidePanelWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChecksSidePanelWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_checksSidePanel_title%',
    });

    return {
      ...savedWebView,
      title,
      projectId,
      content: checksSidePanelWebView,
      styles: checksSidePanelWebViewStyles,
      state: {
        ...savedWebView.state,
        subscriptionId: checkAggregatorService.getSubscriptionId(),
      },
    };
  }
}
