import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import copyBooksWebView from './copy-books.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const copyBooksWebViewType = 'platformProjects.copyBooks';

export class CopyBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_copyBooks_title%',
    });

    return {
      ...savedWebView,
      title,
      content: copyBooksWebView,
      styles: tailwindStyles,
    };
  }
}

export default CopyBooksWebViewProvider;
