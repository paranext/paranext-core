import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import checksSidePanelWebView from './checks-side-panel.web-view?inline';
import checksSidePanelWebViewStyles from './checks-side-panel.web-view.scss?inline';

export const checksSidePanelWebViewType = 'platformScripture.checksSidePanel';

export interface ChecksSidePanelWebViewOptions extends GetWebViewOptions {
  projectId: string;
}

export default class ChecksSidePanelWebViewProvider implements IWebViewProvider {
  constructor(public webViewType: string = checksSidePanelWebViewType) {}

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChecksSidePanelWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    return {
      ...savedWebView,
      title: 'Checks',
      projectId,
      content: checksSidePanelWebView,
      styles: checksSidePanelWebViewStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}
