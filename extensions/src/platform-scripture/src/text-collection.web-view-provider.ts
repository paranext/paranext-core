import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import textCollectionWebView from './text-collection.web-view?inline';
import textCollectionStyles from './text-collection.web-view.scss?inline';

export const textCollectionWebViewType = 'platformScripture.textCollection';

export interface TextCollectionWebViewOptions extends OpenWebViewOptions {
  /** Mode for opening: 'create' for new collection, 'restore' for memento restore */
  mode?: 'create' | 'restore';
}

export class TextCollectionWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: TextCollectionWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%textCollection_title%',
    });

    return {
      ...savedWebView,
      title,
      content: textCollectionWebView,
      styles: textCollectionStyles,
      state: {
        ...savedWebView.state,
        mode: getWebViewOptions.mode ?? savedWebView.state?.mode ?? 'create',
      },
    };
  }
}

export default TextCollectionWebViewProvider;
