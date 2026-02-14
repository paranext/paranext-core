/**
 * === NEW IN PT10 === Reason: Web view provider for CreateBooks dialog Maps to: UI-PKG-004
 * (CAP-UI-001)
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import createBooksWebView from './create-books.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';
import type { BookCreationMode, CreateBooksInput, ModelProjectOption } from './create-books.utils';

/** Options for opening the CreateBooks web view */
export interface CreateBooksWebViewOptions extends GetWebViewOptions {
  /** The project to create books in */
  projectId?: string;
  /** Current book number (for preselection) */
  currentBookNum?: number;
  /** Project type determines SBA restrictions */
  projectType?: string;
  /** Books already in the project */
  existingBooks?: number[];
  /** Available model projects */
  modelProjects?: ModelProjectOption[];
  /** Last selected creation option */
  lastSelectedOption?: BookCreationMode;
  /** Last selected model project ID */
  lastModelProjectId?: string;
}

/** Web view type for CreateBooks */
export const CREATE_BOOKS_WEB_VIEW_TYPE = 'platformScripture.createBooks';

/**
 * Provider for the CreateBooks web view
 *
 * This provider creates web view instances for the book creation dialog. It passes input state to
 * the web view component and handles localization.
 */
export class CreateBooksWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: CreateBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== CREATE_BOOKS_WEB_VIEW_TYPE) {
      throw new Error(`CreateBooks provider received request for ${savedWebView.webViewType}`);
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_createBooks_title%',
    });
    const title = formatReplacementString(titleTemplate || 'Create Book(s)', {});

    // Build input state for web view
    const input: CreateBooksInput = {
      projectId: options.projectId || '',
      currentBookNum: options.currentBookNum,
      projectType: options.projectType || 'Standard',
      existingBooks: options.existingBooks || [],
      modelProjects: options.modelProjects || [],
      lastSelectedOption: options.lastSelectedOption,
      lastModelProjectId: options.lastModelProjectId,
    };

    return {
      ...savedWebView,
      title,
      content: createBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }
}

export default CreateBooksWebViewProvider;
