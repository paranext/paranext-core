import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import profileListWebView from './profile.web-view?inline';
import profileListStyles from './tailwind.css?inline';

export const profileWebViewType = 'paratextRegistration.profileView';

const titleKey = '%paratextRegistrationProfile_webView_title%';
const tooltipKey = '%paratextRegistrationProfile_webView_tooltip%';

export class ProfileWebViewProvider implements IWebViewProvider {
  // needs to be a class method, not static method
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== profileWebViewType)
      throw new Error(
        `${profileWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const { [titleKey]: title, [tooltipKey]: tooltip } =
      await papi.localization.getLocalizedStrings({ localizeKeys: [titleKey, tooltipKey] });

    return {
      ...savedWebView,
      title,
      tooltip,
      content: profileListWebView,
      styles: profileListStyles,
      state: {
        ...savedWebView.state,
      },
      allowPopups: true,
    };
  }
}
