/**
 * === NEW IN PT10 === Reason: React web view provider pattern for Platform.Bible Maps to:
 * UI-PKG-006, SCR-006, BHV-166, BHV-167, BHV-168, EXT-008
 */
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import copyBooksWebView from './copy-books.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const copyBooksWebViewType = 'platformProjects.copyBooks';

/** Options for opening the Copy Books dialog */
export interface CopyBooksOpenWebViewOptions extends OpenWebViewOptions {
  /** Optional pre-selected source project GUID */
  fromProjectGuid?: string;
  /** Optional pre-selected destination project GUID */
  toProjectGuid?: string;
}

/**
 * Web view provider for the Copy Books dialog. Allows users to copy book files from one project to
 * another.
 */
export class CopyBooksWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: CopyBooksOpenWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    return {
      ...savedWebView,
      title: 'Copy Books',
      content: copyBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        fromProjectGuid:
          getWebViewOptions.fromProjectGuid ?? savedWebView.state?.fromProjectGuid ?? undefined,
        toProjectGuid:
          getWebViewOptions.toProjectGuid ?? savedWebView.state?.toProjectGuid ?? undefined,
      },
    };
  }
}
