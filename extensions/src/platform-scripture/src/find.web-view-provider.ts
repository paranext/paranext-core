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
  /**
   * Whether the project this Find is being pointed at is read-only — true when the editor it was
   * invoked from holds a published resource rather than a translation project. Search stays fully
   * available; Replace and Replace All are withheld because the project rejects every write.
   */
  isReadOnly?: boolean;
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

    // Both reads are independent, so run them together. `all`, not `allSettled`: neither branch of a
    // guessed interface mode is safe. Guessing 'simple' yields `isClosable: false`, which routes the
    // tab to `TAB_GROUP_RESOURCES` — a group `getGroups` only registers in simple mode — so in power
    // mode it would land in rc-dock's unregistered-name fallback as a tab with no close button and no
    // way back. Guessing 'power' yields a closable tab in simple mode, which the user can close and
    // strand. Letting a failed read reject is the honest outcome: no wrong-mode definition is ever
    // committed, matching every sibling provider's bare `await` (the Text Collection provider reads
    // this same setting that way). The interface mode is re-read every call so mode changes are
    // picked up at open/replace/restore time.
    const [title, interfaceMode] = await Promise.all([
      papi.localization.getLocalizedString({ localizeKey: '%webView_find_title%' }),
      papi.settings.get('platform.interfaceMode'),
    ]);

    return {
      ...savedWebView,
      title,
      // Mirrors the title so the tab's name is discoverable on hover once simple mode shrinks it to
      // icon-only — matching the Comment List convention, and the only identification this tab has
      // until it gets an icon. Gated on simple mode: power mode never had a tooltip here.
      tooltip: interfaceMode === 'simple' ? title : savedWebView.tooltip,
      projectId,
      // This is the fixed Column 3 Find tab and must always remain open in simple mode, so it's
      // non-closable there — closing it would leave Find with no tab to bring to the front. Power
      // mode allows closing/rearranging freely.
      isClosable: interfaceMode === 'power',
      content: findWebView,
      styles: tailwindStyles,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        editorWebViewId: getWebViewOptions.editorWebViewId ?? savedWebView.state?.editorWebViewId,
        // Always recomputed from the incoming options rather than carried over from the saved state,
        // and defaulted to writable when the caller says nothing. Every path that re-points Find at
        // a project goes through here and supplies this, so a stale `true` left over from a session
        // spent on a resource can never outlive the switch back to a translation project and leave
        // Replace mysteriously disabled.
        isReadOnly: getWebViewOptions.isReadOnly ?? false,
        ...(getWebViewOptions.initialSearchText
          ? { findSearchTerm: getWebViewOptions.initialSearchText }
          : {}),
      },
    };
  }
}

export default FindWebViewProvider;
