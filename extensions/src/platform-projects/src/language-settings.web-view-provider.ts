import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import languageSettingsWebView from './language-settings.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const languageSettingsWebViewType = 'platformProjects.languageSettings';

export class LanguageSettingsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_languageSettings_title%',
    });

    return {
      ...savedWebView,
      title,
      content: languageSettingsWebView,
      styles: tailwindStyles,
    };
  }
}

export default LanguageSettingsWebViewProvider;
