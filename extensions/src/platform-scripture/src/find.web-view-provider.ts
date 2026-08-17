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
import { buildFindWebViewFields, FIND_TITLE_KEY } from './find/find-web-view-definition.util';

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
    // `all`, not `allSettled`: neither branch of a guessed interface mode is safe. Guessing 'simple'
    // yields `isClosable: false`, which routes the tab to `TAB_GROUP_RESOURCES` — a group `getGroups`
    // only registers in simple mode — so in power mode it would land in rc-dock's unregistered-name
    // fallback as a tab with no close button and no way back. Guessing 'power' yields a closable tab
    // in simple mode, which the user can close and strand. Letting a failed read reject is the honest
    // outcome: no wrong-mode definition is ever committed, matching every sibling provider's bare
    // `await` (the Text Collection provider reads this same setting that way). The interface mode is
    // re-read every call so mode changes are picked up at open/replace/restore time.
    const [localizedTitle, interfaceMode] = await Promise.all([
      papi.localization.getLocalizedString({ localizeKey: FIND_TITLE_KEY }),
      papi.settings.get('platform.interfaceMode'),
    ]);

    return {
      ...savedWebView,
      ...buildFindWebViewFields(savedWebView, getWebViewOptions, interfaceMode, localizedTitle),
      content: findWebView,
      styles: tailwindStyles,
    };
  }
}

export default FindWebViewProvider;
