/**
 * === NEW IN PT10 === Reason: WebView provider for the Open Texts dialog (SCR-003). Maps to:
 * UI-PKG-002
 */
import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import openTextsWebView from './open-texts.web-view?inline';
import openTextsStyles from './open-texts.web-view.scss?inline';
import tailwindStyles from './tailwind.css?inline';

export const openTextsWebViewType = 'platformScripture.openTexts';

export interface OpenTextsWebViewOptions extends OpenWebViewOptions {
  /** Dialog title. Defaults to "Open" */
  caption?: string;
  /** Whether to show filter buttons and Open As dropdown */
  showOpenModeSelector?: boolean;
}

export class OpenTextsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: OpenTextsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%openDialog_title%',
    });

    return {
      ...savedWebView,
      title: getWebViewOptions.caption || title,
      content: openTextsWebView,
      styles: `${tailwindStyles}\n${openTextsStyles}`,
      state: {
        ...savedWebView.state,
        showOpenModeSelector:
          getWebViewOptions.showOpenModeSelector !== undefined
            ? String(getWebViewOptions.showOpenModeSelector)
            : (savedWebView.state?.showOpenModeSelector ?? 'true'),
      },
    };
  }
}

export default OpenTextsWebViewProvider;
