/**
 * === NEW IN PT10 === Reason: React web view provider pattern for Platform.Bible Maps to:
 * UI-PKG-007, SCR-007
 */
import type { DeleteBooksWebViewOptions } from 'platform-projects';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import deleteBooksWebView from './delete-books.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const deleteBooksWebViewType = 'platformProjects.deleteBooks';

/** Internal options interface that extends OpenWebViewOptions */
interface DeleteBooksOpenWebViewOptions
  extends OpenWebViewOptions,
    Partial<DeleteBooksWebViewOptions> {
  projectGuid?: string;
  projectName?: string;
}

/**
 * Web view provider for the Delete Books dialog. Allows users to permanently delete books from a
 * project.
 */
export class DeleteBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: DeleteBooksOpenWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    return {
      ...savedWebView,
      title: 'Delete Books',
      content: deleteBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectGuid: getWebViewOptions.projectGuid ?? savedWebView.state?.projectGuid ?? undefined,
        projectName:
          getWebViewOptions.projectName ?? savedWebView.state?.projectName ?? 'Unknown Project',
      },
    };
  }
}
