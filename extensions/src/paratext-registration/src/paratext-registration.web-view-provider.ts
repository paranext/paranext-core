import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import paratextRegistrationListWebView from './paratext-registration.web-view?inline';
import paratextRegistrationListStyles from './tailwind.css?inline';

export const paratextRegistrationWebViewType = 'paratextRegistration.registrationView';

const titleKey = '%paratextRegistration_webView_title%';
const tooltipKey = '%paratextRegistration_webView_tooltip%';

export class ParatextRegistrationWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
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

export default ParatextRegistrationWebViewProvider;
