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
import { buildFindWebViewState } from './find/find-web-view-state.utils';

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

    return {
      ...savedWebView,
      title,
      projectId,
      content: findWebView,
      styles: tailwindStyles,
      // Fall back to the saved group when the caller supplies none, so a trigger with no scroll
      // group of its own (a read-only reference panel, or a content reload/restore, which passes no
      // options at all) leaves an already-grouped Find panel in the group it was following.
      //
      // Deliberate consequence: the reference panels are intentionally in NO scroll group in simple
      // mode (see createResourceTextPanelProvider in platform-scripture-editor/src/main.ts), so a
      // panel-triggered Find keeps whatever group a previous editor-triggered Find left it in —
      // usually 0. Clicking a result then moves the scripture editor to that reference. That is the
      // better of the two available behaviors: the alternative (take the panel's own `undefined`)
      // leaves Find in no group at all, and since a panel trigger also clears the editor-controller
      // coupling, clicking a result would move nothing on screen. Neither option can navigate the
      // panel itself; driving the triggering panel needs a controller the read-only panels do not
      // register (PT-4372).
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId ?? savedWebView.scrollGroupScrRef,
      state: buildFindWebViewState(savedWebView, getWebViewOptions),
    };
  }
}

export default FindWebViewProvider;
