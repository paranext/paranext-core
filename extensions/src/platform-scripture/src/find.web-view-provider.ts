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
import {
  buildFindWebViewState,
  resolveFindScrollGroupScrRef,
} from './find/find-web-view-state.utils';

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
   * Drop any editor id the Find WebView already holds instead of keeping it. Set by `openFind` when
   * the trigger is not a Scripture editor, so a stale coupling from a prior open-from-editor cannot
   * survive. A positive flag rather than "`editorWebViewId` present but `undefined`", because these
   * options cross a process boundary and an explicit `true` cannot be lost the way an
   * `undefined`-valued key can.
   */
  clearEditorWebViewId?: boolean;
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

    // Re-read every call so mode changes are picked up at open/replace/restore time.
    const interfaceMode = await papi.settings.get('platform.interfaceMode');

    return {
      ...savedWebView,
      title,
      projectId,
      // Simple mode pins Find into Column 3's fixed layout, where it must always remain open, so
      // it's non-closable there — closing it would leave `openFind` with nothing to bring to the
      // front, and it would reopen as a panel beside the editor instead. Power mode allows closing
      // and rearranging freely. This also determines the tab's rc-dock group (`getTabGroup`):
      // `isClosable === false` routes it to TAB_GROUP_RESOURCES, which `getGroups()` only registers
      // in Simple mode.
      isClosable: interfaceMode === 'power',
      content: findWebView,
      styles: tailwindStyles,
      scrollGroupScrRef: resolveFindScrollGroupScrRef(
        interfaceMode,
        savedWebView,
        getWebViewOptions,
      ),
      state: buildFindWebViewState(savedWebView, getWebViewOptions),
    };
  }
}

export default FindWebViewProvider;
