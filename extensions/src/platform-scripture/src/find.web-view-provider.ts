import papi from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  ScrollGroupScrRef,
  WebViewDefinition,
} from '@papi/core';
import findWebView from './find.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const findWebViewType = 'platformScripture.find';

export interface FindWebViewOptions extends OpenWebViewOptions {
  projectId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
  /**
   * ID of WebView that called to open this Find WebView. Should be of `webViewType`
   * `platformScriptureEditor.react`
   */
  editorWebViewId?: string;
  /**
   * Text to pre-fill in the search field when the Find WebView opens. If provided, the find panel
   * will populate the search input with this text and immediately run a search.
   */
  initialSearchText?: string;
}

export class FindWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: FindWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_find_title%',
    });

    return {
      ...savedWebView,
      title,
      projectId,
      content: findWebView,
      styles: tailwindStyles,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        // Use the caller's value when openFind supplies it (it always sets the key) so a panel
        // trigger can CLEAR a stale editor id; a `??` here would resurrect an editor id from a prior
        // open-from-editor and re-point Find at the wrong (or a closed) editor. Content
        // reload/restore omits the key, so the saved value is preserved there.
        editorWebViewId:
          'editorWebViewId' in getWebViewOptions
            ? getWebViewOptions.editorWebViewId
            : savedWebView.state?.editorWebViewId,
        ...(getWebViewOptions.initialSearchText
          ? { findSearchTerm: getWebViewOptions.initialSearchText }
          : {}),
      },
    };
  }
}

export default FindWebViewProvider;
