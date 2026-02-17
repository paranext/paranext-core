import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import deleteBooksWebView from './delete-books.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const deleteBooksWebViewType = 'platformProjects.deleteBooks';

export class DeleteBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_deleteBooks_title%',
    });

    return {
      ...savedWebView,
      title,
      content: deleteBooksWebView,
      styles: tailwindStyles,
    };
  }
}

export default DeleteBooksWebViewProvider;
