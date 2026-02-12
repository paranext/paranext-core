/**
 * === NEW IN PT10 === Reason: Web view provider for DeleteBooks dialog Maps to: UI-PKG-003
 * (CAP-UI-003)
 *
 * This provider registers the DeleteBooks web view with Platform.Bible and handles the data flow
 * for deleting books from projects. It fetches the list of admin projects and passes the data to
 * the web view component.
 *
 * @see ui-spec-delete-books.md for full specification
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import deleteBooksWebView from './delete-books.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';
import type { DeleteBooksInput, DeleteProjectOption, ProjectType } from './delete-books.utils';

// ============================================================================
// Types
// ============================================================================

/** Options for opening the DeleteBooks web view */
export interface DeleteBooksWebViewOptions extends GetWebViewOptions {
  /** The project ID to preselect */
  projectId?: string;
}

/** Admin projects result from backend */
interface AdminProjectsResult {
  projects: DeleteProjectOption[];
}

/** Project info returned from backend */
interface ProjectInfoResult {
  id: string;
  name: string;
  shortName: string;
  projectType: ProjectType;
  isShared: boolean;
  existingBooks: number[];
}

// ============================================================================
// Constants
// ============================================================================

/** Web view type for DeleteBooks */
export const DELETE_BOOKS_WEB_VIEW_TYPE = 'platformScripture.deleteBooks';

// ============================================================================
// Web View Provider
// ============================================================================

/**
 * Provider for the DeleteBooks web view
 *
 * This provider creates web view instances for the delete books dialog. It passes input state to
 * the web view component including admin projects and project type information.
 */
export class DeleteBooksWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: DeleteBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== DELETE_BOOKS_WEB_VIEW_TYPE) {
      throw new Error(`DeleteBooks provider received request for ${savedWebView.webViewType}`);
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_deleteBooks_title%',
    });
    const title = formatReplacementString(titleTemplate || 'Delete Books', {});

    // Build input state for web view
    const input = await this.buildDeleteBooksInput(options);

    if (!input) {
      console.error('DeleteBooksWebViewProvider: Failed to build input');
      return undefined;
    }

    if (input.adminProjects.length === 0) {
      console.error('DeleteBooksWebViewProvider: No admin projects available');
      return undefined;
    }

    return {
      ...savedWebView,
      title,
      content: deleteBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }

  /**
   * Build the input data for the DeleteBooks dialog.
   *
   * Fetches admin projects and project type information.
   *
   * @param options - Options passed when opening the web view
   * @returns The input data, or undefined if fetching failed
   */
  private async buildDeleteBooksInput(
    options: DeleteBooksWebViewOptions,
  ): Promise<DeleteBooksInput | undefined> {
    try {
      const currentProjectId = options.projectId || '';

      // Get list of projects where user is administrator
      const adminProjectsResult = await papi.commands.sendCommand<AdminProjectsResult>(
        'platformScripture.getAdminProjects',
        {},
      );

      const adminProjects: DeleteProjectOption[] = adminProjectsResult?.projects || [];

      // Determine project type (for SBA handling)
      let projectType: ProjectType = 'Standard';

      if (currentProjectId) {
        try {
          const projectInfo = await papi.commands.sendCommand<ProjectInfoResult>(
            'platformScripture.getProjectInfo',
            { projectId: currentProjectId },
          );

          if (projectInfo) {
            projectType = projectInfo.projectType;
          }
        } catch (error) {
          console.error('DeleteBooksWebViewProvider: Error fetching project info:', error);
        }
      }

      return {
        currentProjectId,
        adminProjects,
        projectType,
      };
    } catch (error) {
      console.error('DeleteBooksWebViewProvider: Error building input:', error);
      return undefined;
    }
  }
}

// ============================================================================
// Registration
// ============================================================================

/**
 * Register the DeleteBooks web view provider
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerDeleteBooksWebViewProvider(): Promise<void> {
  const provider = new DeleteBooksWebViewProvider();

  await papi.webViewProviders.registerWebViewProvider(DELETE_BOOKS_WEB_VIEW_TYPE, provider);

  console.log('DeleteBooksWebViewProvider registered');
}

// ============================================================================
// Command Handler
// ============================================================================

/**
 * Command handler to open the DeleteBooks dialog
 *
 * @param projectId - The project to preselect (optional)
 * @returns The dialog output when closed
 */
export async function openDeleteBooksDialog(
  projectId?: string,
): Promise<{ action: string } | undefined> {
  try {
    const webView = await papi.webViews.openWebView(
      DELETE_BOOKS_WEB_VIEW_TYPE,
      {
        type: 'float',
        floatSize: { width: 450, height: 400 },
      },
      { projectId },
    );

    if (!webView) {
      return undefined;
    }

    // Note: In actual implementation, this would use a promise that resolves
    // when the web view sends a close/submit message via papi.webViewMessages
    return { action: 'cancel' };
  } catch (error) {
    console.error('openDeleteBooksDialog: Error opening dialog:', error);
    return undefined;
  }
}

/**
 * Register the command to open the DeleteBooks dialog
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerDeleteBooksCommand(): Promise<void> {
  await papi.commands.registerCommand('platformScripture.openDeleteBooks', openDeleteBooksDialog, {
    method: {
      summary: 'Open the Delete Books dialog',
      params: [
        {
          name: 'projectId',
          required: false,
          summary: 'The project ID to preselect (optional)',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'The result of the dialog',
        schema: {
          type: 'object',
          properties: {
            action: { type: 'string', enum: ['submit', 'cancel'] },
            deletedCount: { type: 'number' },
          },
        },
      },
    },
  });

  console.log('platformScripture.openDeleteBooks command registered');
}

export default DeleteBooksWebViewProvider;
