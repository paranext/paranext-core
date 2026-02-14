/**
 * === NEW IN PT10 === Reason: Web view provider for ImportBooks dialog Maps to: UI-PKG-006
 * (CAP-UI-005)
 *
 * This provider registers the ImportBooks web view with Platform.Bible and handles the data flow
 * for importing scripture files into a project. It fetches project info and encoding settings, then
 * passes the data to the web view component.
 *
 * @see ui-spec-import-books.md for full specification
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import importBooksWebView from './import-books.web-view?inline';
import tailwindStyles from '../tailwind.css?inline';
import type { ImportBooksInput } from './import-books.utils';

// ============================================================================
// Types
// ============================================================================

/** Options for opening the ImportBooks web view */
export interface ImportBooksWebViewOptions extends GetWebViewOptions {
  /** The project ID to import into */
  projectId?: string;
  /** The project name (for dialog title) */
  projectName?: string;
  /** The project encoding */
  projectEncoding?: string;
  /** Last import directory from user settings */
  lastImportDirectory?: string;
}

/** Project info returned from backend */
interface ProjectInfoResult {
  id: string;
  name: string;
  shortName: string;
  projectType: string;
  encoding: string;
  versification: string;
  isShared: boolean;
  existingBooks: number[];
}

/** User settings returned from backend */
interface UserSettings {
  import?: {
    lastDirectory: string;
  };
}

// ============================================================================
// Constants
// ============================================================================

/** Web view type for ImportBooks */
export const IMPORT_BOOKS_WEB_VIEW_TYPE = 'platformScripture.importBooks';

// ============================================================================
// Web View Provider
// ============================================================================

/**
 * Provider for the ImportBooks web view
 *
 * This provider creates web view instances for the import books dialog. It passes input state to
 * the web view component including project info, encoding, and last import directory from user
 * settings.
 */
export class ImportBooksWebViewProvider implements IWebViewProvider {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: ImportBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== IMPORT_BOOKS_WEB_VIEW_TYPE) {
      throw new Error(`ImportBooks provider received request for ${savedWebView.webViewType}`);
    }

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_importBooks_title%',
    });
    const title = formatReplacementString(titleTemplate || 'Import Book(s)', {});

    // Build input state for web view
    const input = await this.buildImportBooksInput(options);

    if (!input) {
      console.error('ImportBooksWebViewProvider: Failed to build input');
      return undefined;
    }

    return {
      ...savedWebView,
      title: `${title}: ${input.projectName}`,
      content: importBooksWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        input,
      },
    };
  }

  /**
   * Build the input data for the ImportBooks dialog.
   *
   * Fetches project info and user settings to provide the web view with project name, encoding, and
   * last import directory.
   *
   * @param options - Options passed when opening the web view
   * @returns The input data, or undefined if fetching failed
   */
  private async buildImportBooksInput(
    options: ImportBooksWebViewOptions,
  ): Promise<ImportBooksInput | undefined> {
    try {
      const projectId = options.projectId || '';
      let projectName = options.projectName || '';
      let projectEncoding = options.projectEncoding || 'UTF-8';
      let lastImportDirectory = options.lastImportDirectory;

      // Get project info if we have an ID but not all info
      if (projectId && (!projectName || !options.projectEncoding)) {
        try {
          const projectInfo = await papi.commands.sendCommand<ProjectInfoResult>(
            'platformScripture.getProjectInfo',
            { projectId },
          );

          if (projectInfo) {
            projectName = projectName || projectInfo.name;
            projectEncoding = options.projectEncoding || projectInfo.encoding;
          }
        } catch (error) {
          console.error('ImportBooksWebViewProvider: Error fetching project info:', error);
        }
      }

      // Get last import directory from user settings
      if (!lastImportDirectory) {
        try {
          const settings = await papi.commands.sendCommand<UserSettings>(
            'platformScripture.getUserSettings',
            { category: 'import' },
          );

          if (settings?.import?.lastDirectory) {
            lastImportDirectory = settings.import.lastDirectory;
          }
        } catch (error) {
          console.error('ImportBooksWebViewProvider: Error fetching user settings:', error);
        }
      }

      return {
        projectId,
        projectName,
        projectEncoding,
        lastImportDirectory,
      };
    } catch (error) {
      console.error('ImportBooksWebViewProvider: Error building input:', error);
      return undefined;
    }
  }
}

// ============================================================================
// Registration
// ============================================================================

/**
 * Register the ImportBooks web view provider
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerImportBooksWebViewProvider(): Promise<void> {
  const provider = new ImportBooksWebViewProvider();

  await papi.webViewProviders.registerWebViewProvider(IMPORT_BOOKS_WEB_VIEW_TYPE, provider);

  console.log('ImportBooksWebViewProvider registered');
}

// ============================================================================
// Command Handler
// ============================================================================

/**
 * Command handler to open the ImportBooks dialog
 *
 * @param projectId - The project ID to import into
 * @param projectName - The project name (for title)
 * @param projectEncoding - The project encoding
 * @returns The dialog output when closed
 */
export async function openImportBooksDialog(
  projectId?: string,
  projectName?: string,
  projectEncoding?: string,
): Promise<{ action: string } | undefined> {
  try {
    const webView = await papi.webViews.openWebView(
      IMPORT_BOOKS_WEB_VIEW_TYPE,
      {
        type: 'float',
        floatSize: { width: 700, height: 550 },
      },
      { projectId, projectName, projectEncoding },
    );

    if (!webView) {
      return undefined;
    }

    // Note: In actual implementation, this would use a promise that resolves
    // when the web view sends a close/submit message via papi.webViewMessages
    return { action: 'cancel' };
  } catch (error) {
    console.error('openImportBooksDialog: Error opening dialog:', error);
    return undefined;
  }
}

/**
 * Register the command to open the ImportBooks dialog
 *
 * This should be called from the platform-scripture main.ts activation function.
 */
export async function registerImportBooksCommand(): Promise<void> {
  await papi.commands.registerCommand('platformScripture.openImportBooks', openImportBooksDialog, {
    method: {
      summary: 'Open the Import Books dialog',
      params: [
        {
          name: 'projectId',
          required: false,
          summary: 'The project ID to import into',
          schema: { type: 'string' },
        },
        {
          name: 'projectName',
          required: false,
          summary: 'The project name (for dialog title)',
          schema: { type: 'string' },
        },
        {
          name: 'projectEncoding',
          required: false,
          summary: 'The project encoding',
          schema: { type: 'string' },
        },
      ],
      result: {
        name: 'return value',
        summary: 'The result of the dialog',
        schema: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['submit', 'cancel'],
            },
            importedBooks: {
              type: 'array',
              items: { type: 'number' },
            },
          },
        },
      },
    },
  });

  console.log('platformScripture.openImportBooks command registered');
}

export default ImportBooksWebViewProvider;
