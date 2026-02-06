import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import languageSettingsWebView from './language-settings.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export interface LanguageSettingsWebViewOptions extends OpenWebViewOptions {
  projectName?: string;
  projectGuid?: string;
  canUpdateAllSettings?: boolean;
}

export const languageSettingsWebViewType = 'platformProjects.languageSettings';

export class LanguageSettingsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: LanguageSettingsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectName =
      getWebViewOptions.projectName ?? (savedWebView.state?.projectName as string) ?? '';

    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: '%webView_languageSettings_title%',
    });

    const title = projectName
      ? String(titleTemplate).replace('{projectName}', projectName)
      : String(titleTemplate);

    return {
      ...savedWebView,
      title,
      content: languageSettingsWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        projectName,
        projectGuid: getWebViewOptions.projectGuid ?? savedWebView.state?.projectGuid ?? '',
        canUpdateAllSettings:
          getWebViewOptions.canUpdateAllSettings ??
          savedWebView.state?.canUpdateAllSettings ??
          true,
      },
    };
  }
}

export default LanguageSettingsWebViewProvider;
