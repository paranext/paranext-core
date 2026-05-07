/**
 * === NEW IN PT10 === WP-002 (2026-05-01): Web-view provider for the standalone Greek Esther
 * template picker. Mirrors the manage-books provider shape — content + styles imported via webpack
 * `?inline`.
 *
 * Note: WP-002's hot path is the inline-render in `manage-books.web-view.tsx`. This provider exists
 * so a future caller can open the picker as a free-floating dialog. The provider is registered for
 * completeness but not exercised by WP-002 acceptance tests.
 */
import { logger } from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import greekEstherTemplatePickerWebView from './greek-esther-template-picker.web-view?inline';
// Reuse inventory styles for the base body styles. Tailwind classes resolve at the
// platform-bible-react level so the picker's `tw-*` classes work without bespoke CSS.
import greekEstherTemplatePickerWebViewStyles from './inventory.web-view.scss?inline';

export const GREEK_ESTHER_TEMPLATE_PICKER_WEB_VIEW_TYPE =
  'platformScripture.greekEstherTemplatePicker';

/**
 * Options accepted when opening the standalone picker. No project context is required — the picker
 * is a pure UI dialog whose only output is the user's choice (surfaced via `useWebViewState`).
 */
// Empty per design: the picker has no per-instance options today. Disable the eslint rule for
// this empty interface — keeping it as an interface (not a type alias) leaves a clear extension
// point for future per-instance options without changing the provider signature.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GreekEstherTemplatePickerWebViewOptions extends GetWebViewOptions {}

export class GreekEstherTemplatePickerWebViewProvider implements IWebViewProvider {
  /**
   * Title key used for the localized dialog window title. Held on the instance so the lint rule
   * `class-methods-use-this` is satisfied; the value is fixed at construction time.
   */
  titleKey: LocalizeKey = '%manageBooks_createEsther_dialogTitle%';

  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: GreekEstherTemplatePickerWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== GREEK_ESTHER_TEMPLATE_PICKER_WEB_VIEW_TYPE)
      throw new Error(
        `${GREEK_ESTHER_TEMPLATE_PICKER_WEB_VIEW_TYPE} provider received request to provide a ` +
          `${savedWebView.webViewType} web view`,
      );

    // The picker is a pure UI dialog — no per-instance options today. Log the option keys at
    // debug level so a future caller adding options gets a visible signal that the provider
    // sees their input even though they're currently ignored.
    const optionKeys = Object.keys(getWebViewOptions);
    if (optionKeys.length > 0) {
      logger.debug(
        `${GREEK_ESTHER_TEMPLATE_PICKER_WEB_VIEW_TYPE}: received options keys [${optionKeys.join(', ')}] (currently ignored)`,
      );
    }

    return {
      ...savedWebView,
      title: this.titleKey,
      content: greekEstherTemplatePickerWebView,
      styles: greekEstherTemplatePickerWebViewStyles,
      state: {
        ...savedWebView.state,
        webViewType: GREEK_ESTHER_TEMPLATE_PICKER_WEB_VIEW_TYPE,
      },
      shouldShowToolbar: false,
    };
  }
}

export default GreekEstherTemplatePickerWebViewProvider;
