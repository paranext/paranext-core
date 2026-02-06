/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-007
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import deleteBooksWebView from './delete-books.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const deleteBooksWebViewType = 'platformProjects.deleteBooks';

// ============================================================================
// INTERFACES
// ============================================================================

/** Book information for delete books form */
export interface BookInfo {
  /** Book ID (e.g., "GEN", "MAT") */
  bookId: string;
  /** Book display name (e.g., "Genesis", "Matthew") */
  bookName: string;
  /** Number of chapters in the book */
  chapters: number;
  /** Number of verses in the book */
  verses: number;
}

/** Options for opening the Delete Books web view */
export interface DeleteBooksWebViewOptions extends OpenWebViewOptions {
  /** Project GUID */
  projectGuid?: string;
  /** Project display name */
  projectName?: string;
  /** Books in the project */
  books?: BookInfo[];
}

// ============================================================================
// WEB VIEW PROVIDER
// ============================================================================

/** Web view provider for the Delete Books form */
export class DeleteBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: DeleteBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get values from options or saved state
    const projectGuid = getWebViewOptions.projectGuid || savedWebView.state?.projectGuid || '';

    const projectName = getWebViewOptions.projectName || savedWebView.state?.projectName || '';

    const books: BookInfo[] = getWebViewOptions.books || savedWebView.state?.books || [];

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_deleteBooks_title%',
      locales: ['en'],
    });

    return {
      ...savedWebView,
      title: title || 'Delete Books',
      content: deleteBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectGuid,
        projectName,
        books,
      },
    };
  }
}

export default DeleteBooksWebViewProvider;
