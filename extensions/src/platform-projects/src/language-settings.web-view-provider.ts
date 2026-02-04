/**
 * === NEW IN PT10 === Reason: React web view provider pattern for Platform.Bible extensions Maps
 * to: UI-PKG-003
 */
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { LanguageSettingsWebViewOptions } from 'platform-projects';
import languageSettingsWebView from './language-settings.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const languageSettingsWebViewType = 'platformProjects.languageSettings';

/** Internal options interface that extends OpenWebViewOptions */
interface LanguageSettingsOpenWebViewOptions
  extends OpenWebViewOptions,
    Partial<LanguageSettingsWebViewOptions> {
  projectGuid?: string;
  projectName?: string;
}

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
    getWebViewOptions: LanguageSettingsOpenWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Validate required options
    if (!getWebViewOptions?.projectGuid) {
      return undefined;
    }

    const projectName = getWebViewOptions.projectName || 'Unknown Project';
    const canUpdateAllSettings = getWebViewOptions.canUpdateAllSettings ?? true;

    return {
      ...savedWebView,
      title: `Language Settings: ${projectName}`,
      content: languageSettingsWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectGuid: getWebViewOptions.projectGuid,
        projectName,
        canUpdateAllSettings,
      },
    };
  }
}

export const languageSettingsWebViewProvider = new LanguageSettingsWebViewProvider();
