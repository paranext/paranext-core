import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import paratextRegistrationListWebView from './internet-settings.web-view?inline';
import paratextRegistrationListStyles from './tailwind.css?inline';

export const internetSettingsWebViewType = 'paratextRegistration.internetSettingsView';

const titleKey = '%internetSettings_webView_title%';
const tooltipKey = '%internetSettings_webView_tooltip%';

export class InternetSettingsWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== internetSettingsWebViewType)
      throw new Error(
        `${internetSettingsWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const { [titleKey]: title, [tooltipKey]: tooltip } =
      await papi.localization.getLocalizedStrings({ localizeKeys: [titleKey, tooltipKey] });

    return {
      ...savedWebView,
      title,
      tooltip,
      content: paratextRegistrationListWebView,
      styles: paratextRegistrationListStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}

export default InternetSettingsWebViewProvider;
