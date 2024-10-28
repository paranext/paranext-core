import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import paratextRegistrationListWebView from './paratext-registration.web-view?inline';
import paratextRegistrationListStyles from './tailwind.css?inline';

export const paratextRegistrationWebViewType = 'platformScripture.paratextRegistration';

const titleKey = '%platformScripture_webView_paratextRegistration_title%';
const tooltipKey = '%platformScripture_webView_paratextRegistration_tooltip%';

export default class ParatextRegistrationWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== paratextRegistrationWebViewType)
      throw new Error(
        `${paratextRegistrationWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
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
