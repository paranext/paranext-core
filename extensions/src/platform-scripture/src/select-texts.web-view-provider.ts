/**
 * === NEW IN PT10 === Reason: WebView provider for the Select Texts dialog (SCR-002). Maps to:
 * UI-PKG-001
 */
import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import selectTextsWebView from './select-texts.web-view?inline';
import selectTextsStyles from './select-texts.web-view.scss?inline';
import tailwindStyles from './tailwind.css?inline';

export const selectTextsWebViewType = 'platformScripture.selectTexts';

export interface SelectTextsWebViewOptions extends OpenWebViewOptions {
  /** Dialog title. Defaults to "Select Texts" */
  caption?: string;
  /** Initial selections for modify mode */
  initialSelections?: string;
  /** Required items that cannot be removed (JSON) */
  requiredSelections?: string;
}

export class SelectTextsWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: SelectTextsWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%selectTexts_title%',
    });

    return {
      ...savedWebView,
      title: getWebViewOptions.caption || title,
      content: selectTextsWebView,
      styles: `${tailwindStyles}\n${selectTextsStyles}`,
      state: {
        ...savedWebView.state,
        initialSelections:
          getWebViewOptions.initialSelections ?? savedWebView.state?.initialSelections,
        requiredSelections:
          getWebViewOptions.requiredSelections ?? savedWebView.state?.requiredSelections,
      },
    };
  }
}

export default SelectTextsWebViewProvider;
