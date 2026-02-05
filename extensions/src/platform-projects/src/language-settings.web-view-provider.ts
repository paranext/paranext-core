/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-003
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import languageSettingsWebView from './language-settings.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const languageSettingsWebViewType = 'platformProjects.languageSettings';

/** Font option for dropdowns */
export interface FontOption {
  name: string;
  isGraphite: boolean;
  supportsRightToLeft: boolean;
}

/** Project reference for copy-from functionality */
export interface ProjectReferenceForCopy {
  guid: string;
  shortName: string;
  fullName: string;
}

/** Configuration for the language settings form */
export interface LanguageSettingsFormConfig {
  /** Whether the user can update all settings (admin) */
  canUpdateAllSettings: boolean;
  /** Whether the reset to default button is enabled */
  defaultFontResetEnabled: boolean;
  /** Whether the font has Graphite features */
  hasGraphiteFeatures: boolean;
}

/** Current language settings values */
export interface LanguageSettingsValues {
  fontName: string;
  fontSize: number;
  rightToLeft: boolean;
  htmlLanguage: string;
  fontFeatures: string;
  separator: string;
  characterRules: string;
  medialPunctuation: string;
  diacritics: string;
  footnoteCallers: string;
  crossRefCallers: string;
  verseSegments: string;
  wordBreakChars: string;
}

/** Options for opening the Language Settings web view */
export interface LanguageSettingsWebViewOptions extends OpenWebViewOptions {
  /** Project name for dialog title */
  projectName?: string;
  /** Project GUID */
  projectGuid?: string;
  /** Initial values for the form */
  currentSettings?: LanguageSettingsValues;
  /** Configuration for field editability */
  config?: LanguageSettingsFormConfig;
  /** Available fonts for dropdown */
  availableFonts?: FontOption[];
  /** Projects available for copy-from */
  copyableProjects?: ProjectReferenceForCopy[];
}

/** Default settings values */
const defaultSettings: LanguageSettingsValues = {
  fontName: '',
  fontSize: 12,
  rightToLeft: false,
  htmlLanguage: '',
  fontFeatures: '',
  separator: '/',
  characterRules: '',
  medialPunctuation: '',
  diacritics: '',
  footnoteCallers: '',
  crossRefCallers: '',
  verseSegments: '',
  wordBreakChars: '',
};

/** Default config */
const defaultConfig: LanguageSettingsFormConfig = {
  canUpdateAllSettings: true,
  defaultFontResetEnabled: true,
  hasGraphiteFeatures: false,
};

/** Common font sizes */
export const COMMON_FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

/** Web view provider for the Language Settings form */
export class LanguageSettingsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: LanguageSettingsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get values from options or saved state
    const projectName =
      getWebViewOptions.projectName || savedWebView.state?.projectName || 'Project';

    const projectGuid = getWebViewOptions.projectGuid || savedWebView.state?.projectGuid || '';

    const currentSettings =
      getWebViewOptions.currentSettings || savedWebView.state?.currentSettings || defaultSettings;

    const config = getWebViewOptions.config || savedWebView.state?.config || defaultConfig;

    const availableFonts = getWebViewOptions.availableFonts ||
      savedWebView.state?.availableFonts || [
        { name: 'Arial', isGraphite: false, supportsRightToLeft: true },
        { name: 'Times New Roman', isGraphite: false, supportsRightToLeft: false },
        { name: 'Charis SIL', isGraphite: true, supportsRightToLeft: false },
        { name: 'Doulos SIL', isGraphite: true, supportsRightToLeft: false },
        { name: 'Scheherazade New', isGraphite: true, supportsRightToLeft: true },
      ];

    const copyableProjects =
      getWebViewOptions.copyableProjects || savedWebView.state?.copyableProjects || [];

    // Get localized title
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_languageSettings_title%',
    });

    const title = titleTemplate
      ? titleTemplate.replace('{projectName}', projectName)
      : `Language Settings: ${projectName}`;

    return {
      ...savedWebView,
      title,
      content: languageSettingsWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectName,
        projectGuid,
        currentSettings,
        config,
        availableFonts,
        copyableProjects,
      },
    };
  }
}

export default LanguageSettingsWebViewProvider;
