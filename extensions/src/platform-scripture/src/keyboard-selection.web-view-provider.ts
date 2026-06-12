/**
 * === NEW IN PT10 === keyboard-switching UI-PKG-003 (CAP-UI-002): Web view provider for the
 * per-project keyboard-selection dialog. Object-literal provider per ui-alignment.md §"Provider
 * Pattern" — the dialog is stateless and simple, so no `WebViewFactory` class is needed.
 *
 * The returned definition carries `keyboardPreference: 'vernacular'` (CAP-017 declarative field) so
 * the FocusKeyboardRouter (CAP-014) activates the project's vernacular keyboard when the dialog
 * gains focus.
 */
import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import keyboardSelectionWebView from './keyboard-selection.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

/** Web view type of the keyboard-selection dialog (data-contracts.md §Commands / CAP-UI-002). */
export const KEYBOARD_SELECTION_WEB_VIEW_TYPE = 'platform.keyboardSelection';

/**
 * Options accepted when opening the keyboard-selection web view. The optional `projectId` lets the
 * `platform.openKeyboardSelection` command target the invoking tab's project; when omitted the
 * dialog falls back to whatever project the saved web view was last bound to.
 */
export interface KeyboardSelectionWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
}

export const keyboardSelectionWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: KeyboardSelectionWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== KEYBOARD_SELECTION_WEB_VIEW_TYPE)
      throw new Error(
        `${KEYBOARD_SELECTION_WEB_VIEW_TYPE} provider received request to provide a ` +
          `${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%keyboardSelection_title%',
    });

    return {
      ...savedWebView,
      title,
      projectId,
      content: keyboardSelectionWebView,
      styles: tailwindStyles,
      // Declarative surface mapping consumed by the FocusKeyboardRouter (CAP-014 via CAP-017):
      // focusing this dialog activates the project's vernacular keyboard.
      keyboardPreference: 'vernacular',
    };
  },
};

export default keyboardSelectionWebViewProvider;
