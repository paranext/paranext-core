import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import restoreProjectWebView from './restore-project.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

// =============================================================================
// TYPES
// =============================================================================

/** Options for opening the Restore Project web view */
export interface RestoreProjectWebViewOptions extends GetWebViewOptions {
  /** Path to the backup file to restore from */
  backupFilePath?: string;
  /** Description from backup metadata */
  backupDescription?: string;
  /** Pre-selected destination project (optional) */
  preSelectedProject?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/** Web view type identifier */
export const RESTORE_PROJECT_WEB_VIEW_TYPE = 'platformScripture.restoreProject';

/** Localization key for the web view title */
export const RESTORE_PROJECT_TITLE_KEY: LocalizeKey = '%restoreProject_title%';

// =============================================================================
// PROVIDER
// =============================================================================

/**
 * Web view provider for the Restore Project dialog
 *
 * This provider creates web views that allow users to restore project data from backup files. The
 * dialog displays:
 *
 * - Source backup information
 * - Destination project selection
 * - File comparison grid with selective restore
 * - Options to create a new project as restore target
 *
 * Entry point: File > Restore (EP-002)
 */
export class RestoreProjectWebViewProvider implements IWebViewProvider {
  /** The web view type this provider handles */
  readonly webViewType = RESTORE_PROJECT_WEB_VIEW_TYPE;

  /** Localization key for the title */
  readonly titleKey = RESTORE_PROJECT_TITLE_KEY;
  /**
   * Get a web view definition for the Restore Project dialog
   *
   * @param savedWebView - Previously saved web view state
   * @param getWebViewOptions - Options passed when opening the web view
   * @returns Web view definition
   */
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: RestoreProjectWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType) {
      throw new Error(
        `RestoreProjectWebViewProvider received request to provide a ${savedWebView.webViewType} web view`,
      );
    }

    // Extract state safely
    const savedState = savedWebView.state ?? {};
    const stateBackupPath =
      typeof savedState === 'object' && 'backupFilePath' in savedState
        ? String(savedState.backupFilePath ?? '')
        : '';
    const stateDescription =
      typeof savedState === 'object' && 'backupDescription' in savedState
        ? String(savedState.backupDescription ?? '')
        : '';

    // Get the backup file path from options or saved state
    const backupFilePath = getWebViewOptions.backupFilePath || stateBackupPath;
    const backupDescription = getWebViewOptions.backupDescription || stateDescription;

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: this.titleKey,
    });

    // Fallback title if localization not found
    const displayTitle = title !== this.titleKey ? title : 'Restore Project';

    return {
      ...savedWebView,
      title: displayTitle,
      content: restoreProjectWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        backupFilePath,
        backupDescription,
        preSelectedProject: getWebViewOptions.preSelectedProject,
      },
      // Float as a dialog in the center
      // The actual position would be set when opening the web view
    };
  }
}

export default RestoreProjectWebViewProvider;
