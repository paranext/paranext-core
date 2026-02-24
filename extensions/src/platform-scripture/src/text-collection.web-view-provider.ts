import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import textCollectionWebView from './text-collection.web-view?inline';
import textCollectionStyles from './text-collection.web-view.scss?inline';
import tailwindStyles from './tailwind.css?inline';

export const textCollectionWebViewType = 'platformScripture.textCollection';

export class TextCollectionWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    _getWebViewOptions: OpenWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_textCollection_title%',
    });

    return {
      ...savedWebView,
      title: title || 'Text Collection',
      content: textCollectionWebView,
      styles: `${tailwindStyles}\n${textCollectionStyles}`,
      state: {
        ...savedWebView.state,
      },
    };
  }
}

export default TextCollectionWebViewProvider;
