import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import chooseEncodingWebView from './choose-encoding.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export interface ChooseEncodingWebViewOptions extends OpenWebViewOptions {
  encoderName?: string;
  reverseDirection?: boolean;
}

export const chooseEncodingWebViewType = 'platformProjects.chooseEncoding';

export class ChooseEncodingWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChooseEncodingWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Attempt to fetch encoders from backend, fall back to empty list
    let encodersJson = '[]';
    try {
      const options = await papi.commands.sendCommand('platformProjects.getProjectOptions');
      if (options?.encoders) {
        encodersJson = JSON.stringify(options.encoders);
      }
    } catch {
      // Backend not available; use empty encoder list
    }

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_chooseEncoding_title%',
    });

    return {
      ...savedWebView,
      title: String(title),
      content: chooseEncodingWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        encoders: encodersJson,
        initialEncoderName:
          getWebViewOptions.encoderName ?? String(savedWebView.state?.initialEncoderName ?? ''),
        initialReverseDirection:
          getWebViewOptions.reverseDirection ??
          savedWebView.state?.initialReverseDirection ??
          false,
      },
    };
  }
}

export default ChooseEncodingWebViewProvider;
