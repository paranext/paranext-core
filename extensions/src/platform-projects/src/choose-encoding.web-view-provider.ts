import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import chooseEncodingWebView from './choose-encoding.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const chooseEncodingWebViewType = 'platformProjects.chooseEncoding';

export class ChooseEncodingWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_chooseEncoding_title%',
    });

    return {
      ...savedWebView,
      title,
      content: chooseEncodingWebView,
      styles: tailwindStyles,
    };
  }
}

export default ChooseEncodingWebViewProvider;
