/**
 * === NEW IN PT10 === Reason: React web view provider pattern for Platform.Bible extensions Maps
 * to: UI-PKG-003
 */
import { IWebViewProvider, WebViewDefinition, SavedWebViewDefinition } from '@papi/core';
import type { LanguageSettingsWebViewOptions } from 'platform-projects';
import languageSettingsWebView from './language-settings.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const languageSettingsWebViewType = 'platformProjects.languageSettings';

/**
 * Web view provider for the Language Settings dialog. Configures language-specific settings: font,
 * character rules, punctuation.
 *
 * Maps to: UI-PKG-003, SCR-003 PT9 Source: LanguageSettingsForm.cs
 */
export class LanguageSettingsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    _getWebViewOptions: unknown,
    options: LanguageSettingsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Validate required options
    if (!options?.projectGuid) {
      return undefined;
    }

    const projectName = options.projectName || 'Unknown Project';
    const canUpdateAllSettings = options.canUpdateAllSettings ?? true;

    return {
      ...savedWebView,
      title: `Language Settings: ${projectName}`,
      content: languageSettingsWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectGuid: options.projectGuid,
        projectName,
        canUpdateAllSettings,
      },
    };
  }
}

export const languageSettingsWebViewProvider = new LanguageSettingsWebViewProvider();
