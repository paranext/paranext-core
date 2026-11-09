import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import paratextRegistrationListWebView from './internet-settings.web-view?inline';
import paratextRegistrationListStyles from './tailwind.css?inline';
import { buildInternetSettingsWebViewState } from './internet-settings-web-view-state.utils';

export const internetSettingsWebViewType = 'paratextRegistration.internetSettingsView';

const titleKey = '%internetSettings_webView_title_3%';
const tooltipKey = '%internetSettings_webView_tooltip%';

export interface InternetSettingsWebViewOptions extends OpenWebViewOptions {
  /** One-shot: was the dialog opened via `showInternetSettingsWithServerSelection`? */
  requestDeveloperSettings?: boolean;
}

export class InternetSettingsWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: InternetSettingsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
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
      state: buildInternetSettingsWebViewState(savedWebView, getWebViewOptions),
    };
  }
}
