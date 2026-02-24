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
  /** Dialog title - defaults to "Select Texts" */
  caption?: string;
  /** IDs of initially selected texts (for modify mode) */
  initialSelectionIds?: string[];
  /** IDs of required items that cannot be removed */
  requiredSelectionIds?: string[];
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
        initialSelectionIds: getWebViewOptions.initialSelectionIds ?? [],
        requiredSelectionIds: getWebViewOptions.requiredSelectionIds ?? [],
      },
    };
  }
}

export default SelectTextsWebViewProvider;
