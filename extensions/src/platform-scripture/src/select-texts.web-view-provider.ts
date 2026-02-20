import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import selectTextsWebView from './select-texts.web-view?inline';
import selectTextsStyles from './select-texts.web-view.scss?inline';

export const selectTextsWebViewType = 'platformScripture.selectTexts';

export interface SelectTextsWebViewOptions extends OpenWebViewOptions {
  /** Dialog title override */
  caption?: string;
}

export class SelectTextsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: SelectTextsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = getWebViewOptions.caption
      ? getWebViewOptions.caption
      : await papi.localization.getLocalizedString({
          localizeKey: '%selectTexts_title%',
        });

    return {
      ...savedWebView,
      title,
      content: selectTextsWebView,
      styles: selectTextsStyles,
      state: {
        ...savedWebView.state,
        caption: getWebViewOptions.caption,
      },
    };
  }
}

export default SelectTextsWebViewProvider;
