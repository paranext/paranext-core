/**
 * === NEW IN PT10 === Reason: Web view provider for ShowBooks dialog Maps to: UI-PKG-002
 * (CAP-UI-006)
 *
 * This provider registers the ShowBooks web view with Platform.Bible and handles the data flow for
 * displaying project books.
 *
 * @see ui-spec-show-books.md for full specification
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import showBooksWebView from './show-books.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';
import type { ShowBooksInput } from './show-books.web-view';

// ============================================================================
// Types
// ============================================================================

/** Options for opening the ShowBooks web view */
export interface ShowBooksWebViewOptions extends GetWebViewOptions {
  /** The project ID to show books for */
  projectId?: string;
}

/** Books present result from backend */
interface BooksPresentResult {
  projectId: string;
  allPossibleBooks: number[];
  existingBooks: number[];
}

// ============================================================================
// Constants
// ============================================================================

/** Web view type for ShowBooks */
export const SHOW_BOOKS_WEB_VIEW_TYPE = 'platformScripture.showBooks';

// ============================================================================
// Web View Provider
// ============================================================================

/**
 * Provider for the ShowBooks web view
 *
 * This provider creates web view instances for the show books dialog. It fetches project book
 * information and passes it to the web view component.
 */
export class ShowBooksWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: ShowBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== SHOW_BOOKS_WEB_VIEW_TYPE) {
      throw new Error(`ShowBooks provider received request for ${savedWebView.webViewType}`);
    }

    const projectId = options?.projectId || savedWebView.state?.projectId;

    if (!projectId) {
      console.error('ShowBooksWebViewProvider: No projectId provided');
      return undefined;
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%showBooks_title%',
    });
    const title = formatReplacementString(titleTemplate || 'Show Book(s)', {});

    // Build input state for web view
    const input = await this.buildShowBooksInput(projectId);

    if (!input) {
      console.error('ShowBooksWebViewProvider: Failed to build input for projectId:', projectId);
      return undefined;
    }

    return {
      ...savedWebView,
      title: `${title} - ${input.projectName}`,
      content: showBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }

  /**
   * Build the input data for the ShowBooks dialog.
   *
   * Fetches project book information and project name.
   *
   * @param projectId - The project to show books for
   * @returns The input data, or undefined if fetching failed
   */
  private async buildShowBooksInput(projectId: string): Promise<ShowBooksInput | undefined> {
    try {
      // Call backend service to get books present
      const booksPresent = await papi.commands.sendCommand<BooksPresentResult>(
        'platformScripture.getBooksPresent',
        { projectId },
      );

      // Get project info for the name
      const projectInfo = await papi.commands.sendCommand<{
        name: string;
      }>('platformScripture.getProjectInfo', { projectId });

      return {
        projectId,
        projectName: projectInfo?.name || projectId,
        allPossibleBooks: booksPresent?.allPossibleBooks || [],
        existingBooks: booksPresent?.existingBooks || [],
      };
    } catch (error) {
      console.error('ShowBooksWebViewProvider: Error fetching data:', error);
      return undefined;
    }
  }
}

// ============================================================================
// Registration
// ============================================================================

/**
 * Register the ShowBooks web view provider
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerShowBooksWebViewProvider(): Promise<void> {
  const provider = new ShowBooksWebViewProvider();

  await papi.webViewProviders.registerWebViewProvider(SHOW_BOOKS_WEB_VIEW_TYPE, provider);

  console.log('ShowBooksWebViewProvider registered');
}

// ============================================================================
// Command Handler
// ============================================================================

/**
 * Command handler to open the ShowBooks dialog
 *
 * @param projectId - The project to show books for
 * @returns The dialog output when closed
 */
export async function openShowBooksDialog(
  projectId: string,
): Promise<{ action: string } | undefined> {
  try {
    const webView = await papi.webViews.openWebView(
      SHOW_BOOKS_WEB_VIEW_TYPE,
      {
        type: 'float',
        floatSize: { width: 600, height: 500 },
      },
      { projectId },
    );

    if (!webView) {
      return undefined;
    }

    return { action: 'close' };
  } catch (error) {
    console.error('openShowBooksDialog: Error opening dialog:', error);
    return undefined;
  }
}

/**
 * Register the command to open the ShowBooks dialog
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerShowBooksCommand(): Promise<void> {
  await papi.commands.registerCommand('platformScripture.openShowBooks', openShowBooksDialog, {
    method: {
      summary: 'Open the Show Books dialog',
      params: [
        {
          name: 'projectId',
          required: true,
          summary: 'The project ID to show books for',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'The result of the dialog (always close)',
        schema: {
          type: 'object',
          properties: {
            action: { type: 'string', enum: ['close'] },
          },
        },
      },
    },
  });

  console.log('platformScripture.openShowBooks command registered');
}

export default ShowBooksWebViewProvider;
