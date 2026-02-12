/**
 * === NEW IN PT10 === Reason: Web view provider for BookChooser dialog Maps to: UI-PKG-001
 * (CAP-UI-006)
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import bookChooserWebView from './book-chooser.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';

/** Options for opening the BookChooser web view */
export interface BookChooserWebViewOptions extends GetWebViewOptions {
  /** Dialog title */
  caption?: string;
  /** Books available for selection */
  availableBooks?: number[];
  /** Books initially selected */
  selectedBooks?: number[];
  /** Project context for SBA handling */
  projectContext?: {
    projectId: string;
    projectType: string;
    baseProjectBooks?: number[];
    showPriorityTab: boolean;
  };
  /** Whether at least one book must be selected */
  requireSelectedBook?: boolean;
  /** Help text to display */
  helpText?: string;
}

/** Web view type for BookChooser */
export const BOOK_CHOOSER_WEB_VIEW_TYPE = 'platformScripture.bookChooser';

/**
 * Provider for the BookChooser web view
 *
 * This provider creates web view instances for the book selection dialog. It passes input state to
 * the web view component and handles localization.
 */
export class BookChooserWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: BookChooserWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== BOOK_CHOOSER_WEB_VIEW_TYPE) {
      throw new Error(`BookChooser provider received request for ${savedWebView.webViewType}`);
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_bookChooser_title%',
    });
    const title = options.caption || formatReplacementString(titleTemplate || 'Select Books', {});

    // Build input state for web view
    const input = {
      caption: options.caption || title,
      availableBooks: options.availableBooks || [],
      selectedBooks: options.selectedBooks || [],
      projectContext: options.projectContext,
      requireSelectedBook: options.requireSelectedBook ?? false,
      helpText: options.helpText,
    };

    return {
      ...savedWebView,
      title,
      content: bookChooserWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }
}

export default BookChooserWebViewProvider;
