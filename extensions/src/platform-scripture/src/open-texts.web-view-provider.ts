import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import openTextsWebView from './open-texts.web-view?inline';
import openTextsStyles from './open-texts.web-view.scss?inline';

export const openTextsWebViewType = 'platformScripture.openTexts';

export interface OpenTextsWebViewOptions extends OpenWebViewOptions {
  /** Whether to show filter buttons and Open As dropdown */
  showOpenModeSelector?: boolean;
}

export class OpenTextsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: OpenTextsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%openTexts_title%',
    });

    return {
      ...savedWebView,
      title,
      content: openTextsWebView,
      styles: openTextsStyles,
      state: {
        ...savedWebView.state,
        showOpenModeSelector:
          getWebViewOptions.showOpenModeSelector !== undefined
            ? getWebViewOptions.showOpenModeSelector
            : true,
      },
    };
  }
}

export default OpenTextsWebViewProvider;
