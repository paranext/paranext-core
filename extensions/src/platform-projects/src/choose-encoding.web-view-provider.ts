/**
 * === NEW IN PT10 === Reason: Platform.Bible web view provider pattern for React-based dialogs Maps
 * to: UI-PKG-004, SCR-004
 */
import type { ChooseEncodingWebViewOptions, EncoderOption } from 'platform-projects';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import chooseEncodingWebView from './choose-encoding.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

export const chooseEncodingWebViewType = 'platformProjects.chooseEncoding';

/** Internal options interface that extends OpenWebViewOptions */
interface ChooseEncodingOpenWebViewOptions
  extends OpenWebViewOptions,
    Partial<ChooseEncodingWebViewOptions> {
  encoders?: EncoderOption[];
}

/**
 * Web view provider for the Choose Encoding dialog. This dialog allows users to select an encoding
 * converter when creating a TransliterationWithEncoder project type.
 *
 * Maps to: UI-PKG-004, BHV-109, VAL-008
 */
export class ChooseEncodingWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChooseEncodingOpenWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    return {
      ...savedWebView,
      title: 'Select Character Encoding',
      content: chooseEncodingWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        encoders: getWebViewOptions.encoders ?? [],
        initialEncoderName: getWebViewOptions.initialEncoderName,
        initialReverseDirection: getWebViewOptions.initialReverseDirection ?? false,
      },
    };
  }
}
