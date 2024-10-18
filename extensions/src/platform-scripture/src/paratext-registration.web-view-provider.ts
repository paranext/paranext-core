import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import paratextRegistrationListWebView from './paratext-registration.web-view?inline';
import paratextRegistrationListStyles from './paratext-registration.web-view.scss?inline';

export const paratextRegistrationWebViewType = 'platformScripture.paratextRegistration';

export default class ParatextRegistrationWebViewProvider implements IWebViewProvider {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== paratextRegistrationWebViewType)
      throw new Error(
        `${paratextRegistrationWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      ...savedWebView,
      title: '%platformScripture_webView_paratextRegistration_title%',
      tooltip: '%platformScripture_webView_paratextRegistration_tooltip%',
      content: paratextRegistrationListWebView,
      styles: paratextRegistrationListStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}
