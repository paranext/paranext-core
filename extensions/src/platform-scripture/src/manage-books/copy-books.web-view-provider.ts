/**
 * === NEW IN PT10 === Reason: Web view provider for CopyBooks dialog Maps to: UI-PKG-005
 * (CAP-UI-002)
 *
 * This provider registers the CopyBooks web view with Platform.Bible and handles the data flow for
 * copying books between projects. It fetches available projects and project type information, then
 * passes the data to the web view component.
 *
 * @see ui-spec-copy-books.md for full specification
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import copyBooksWebView from './copy-books.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';
import type { CopyBooksInput, CopyProjectOption, ProjectType } from './copy-books.utils';

// ============================================================================
// Types
// ============================================================================

/** Options for opening the CopyBooks web view */
export interface CopyBooksWebViewOptions extends GetWebViewOptions {
  /** The current project ID (for preselection) */
  projectId?: string;
  /** The current project type */
  projectType?: ProjectType;
  /** Base project ID (for Auxiliary projects) */
  baseProjectId?: string;
}

/** Project info returned from backend */
interface ProjectInfoResult {
  id: string;
  name: string;
  shortName: string;
  projectType: ProjectType;
  encoding: string;
  versification: string;
  isShared: boolean;
  existingBooks: number[];
  baseProjectId?: string;
}

// ============================================================================
// Constants
// ============================================================================

/** Web view type for CopyBooks */
export const COPY_BOOKS_WEB_VIEW_TYPE = 'platformScripture.copyBooks';

// ============================================================================
// Web View Provider
// ============================================================================

/**
 * Provider for the CopyBooks web view
 *
 * This provider creates web view instances for the book copy dialog. It passes input state to the
 * web view component including available projects, project types, and preselection data for
 * Auxiliary/Daughter projects.
 */
export class CopyBooksWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: CopyBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== COPY_BOOKS_WEB_VIEW_TYPE) {
      throw new Error(`CopyBooks provider received request for ${savedWebView.webViewType}`);
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_copyBooks_title%',
    });
    const title = formatReplacementString(titleTemplate || 'Copy Books', {});

    // Build input state for web view
    const input = await this.buildCopyBooksInput(options);

    if (!input) {
      console.error('CopyBooksWebViewProvider: Failed to build input');
      return undefined;
    }

    return {
      ...savedWebView,
      title,
      content: copyBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }

  /**
   * Build the input data for the CopyBooks dialog.
   *
   * Fetches available projects, determines project types, and sets up preselection data for
   * Auxiliary/Daughter project types.
   *
   * @param options - Options passed when opening the web view
   * @returns The input data, or undefined if fetching failed
   */
  private async buildCopyBooksInput(
    options: CopyBooksWebViewOptions,
  ): Promise<CopyBooksInput | undefined> {
    try {
      const currentProjectId = options.projectId || '';
      let currentProjectType: ProjectType = options.projectType || 'Standard';
      let baseProjectId: string | undefined = options.baseProjectId;

      // Get project info for current project if we have an ID
      if (currentProjectId && !options.projectType) {
        try {
          const projectInfo = await papi.commands.sendCommand<ProjectInfoResult>(
            'platformScripture.getProjectInfo',
            { projectId: currentProjectId },
          );

          if (projectInfo) {
            currentProjectType = projectInfo.projectType;
            baseProjectId = baseProjectId || projectInfo.baseProjectId;
          }
        } catch (error) {
          console.error('CopyBooksWebViewProvider: Error fetching project info:', error);
        }
      }

      // Get available source projects (non-protected texts with books)
      let fromProjects: CopyProjectOption[] = [];
      try {
        const projectsResult = await papi.commands.sendCommand<CopyProjectOption[]>(
          'platformScripture.getCopySourceProjects',
          {},
        );

        fromProjects = projectsResult || [];
      } catch (error) {
        console.error('CopyBooksWebViewProvider: Error fetching source projects:', error);
        fromProjects = [];
      }

      return {
        currentProjectId,
        currentProjectType,
        baseProjectId,
        fromProjects,
      };
    } catch (error) {
      console.error('CopyBooksWebViewProvider: Error building input:', error);
      return undefined;
    }
  }
}

// ============================================================================
// Registration
// ============================================================================

/**
 * Register the CopyBooks web view provider
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerCopyBooksWebViewProvider(): Promise<void> {
  const provider = new CopyBooksWebViewProvider();

  await papi.webViewProviders.registerWebViewProvider(COPY_BOOKS_WEB_VIEW_TYPE, provider);

  console.log('CopyBooksWebViewProvider registered');
}

// ============================================================================
// Command Handler
// ============================================================================

/**
 * Command handler to open the CopyBooks dialog
 *
 * @param projectId - The current project ID (optional, for preselection)
 * @param projectType - The current project type (optional)
 * @param baseProjectId - The base project ID (optional, for Auxiliary projects)
 * @returns The dialog output when closed
 */
export async function openCopyBooksDialog(
  projectId?: string,
  projectType?: ProjectType,
  baseProjectId?: string,
): Promise<{ action: string } | undefined> {
  try {
    const webView = await papi.webViews.openWebView(
      COPY_BOOKS_WEB_VIEW_TYPE,
      {
        type: 'float',
        floatSize: { width: 650, height: 550 },
      },
      { projectId, projectType, baseProjectId },
    );

    if (!webView) {
      return undefined;
    }

    // Note: In actual implementation, this would use a promise that resolves
    // when the web view sends a close/submit message via papi.webViewMessages
    return { action: 'cancel' };
  } catch (error) {
    console.error('openCopyBooksDialog: Error opening dialog:', error);
    return undefined;
  }
}

/**
 * Register the command to open the CopyBooks dialog
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerCopyBooksCommand(): Promise<void> {
  await papi.commands.registerCommand('platformScripture.openCopyBooks', openCopyBooksDialog, {
    method: {
      summary: 'Open the Copy Books dialog',
      params: [
        {
          name: 'projectId',
          required: false,
          summary: 'The current project ID (optional, for preselection)',
          schema: { type: 'string' },
        },
        {
          name: 'projectType',
          required: false,
          summary: 'The current project type (optional)',
          schema: { type: 'string' },
        },
        {
          name: 'baseProjectId',
          required: false,
          summary: 'The base project ID (optional, for Auxiliary projects)',
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
            copiedBooks: { type: 'array', items: { type: 'number' } },
            lastCopiedBookNum: { type: 'number' },
          },
        },
      },
    },
  });

  console.log('platformScripture.openCopyBooks command registered');
}

export default CopyBooksWebViewProvider;
