/**
 * === NEW IN PT10 === Reason: Web view providers don't exist in PT9's WinForms architecture. Maps
 * to: UI-PKG-004
 */

import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import papi from '@papi/backend';
import chooseEncodingWebView from './choose-encoding.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const chooseEncodingWebViewType = 'platformProjects.chooseEncoding';

/** Represents an encoding converter option */
export interface EncoderOption {
  /** Internal name of the encoder */
  name: string;
  /** Display name shown to user */
  displayName: string;
  /** If true, the encoder can work in both directions */
  isBidirectional: boolean;
}

/** Initial values for encoding form */
export interface ChooseEncodingInitialValues {
  encoderName: string;
  reverseDirection: boolean;
}

/** Options for opening the Choose Encoding web view */
export interface ChooseEncodingWebViewOptions extends OpenWebViewOptions {
  /** Available encoder options */
  encoders?: EncoderOption[];
  /** Initial values for edit mode */
  initialValues?: ChooseEncodingInitialValues;
}

/** Web view provider for the Choose Encoding form */
export class ChooseEncodingWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChooseEncodingWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    // Get encoder options from options or saved state (using simple property access pattern)
    const encoders = getWebViewOptions.encoders || [];

    const initialValues = getWebViewOptions.initialValues || savedWebView.state?.initialValues;

    // Get localized title
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_chooseEncoding_title%',
    });

    return {
      ...savedWebView,
      title: title || 'Select Character Encoding',
      content: chooseEncodingWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        options: {
          encoders,
        },
        initialValues,
      },
    };
  }
}

export default ChooseEncodingWebViewProvider;
