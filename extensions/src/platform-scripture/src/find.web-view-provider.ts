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
  /**
   * Project for the Find WebView to search.
   *
   * Optional, like every property here, because `OpenWebViewOptions` forbids an options interface
   * from adding mandatory properties: `reloadWebView` and `openWebView` both hand their options
   * straight to `IWebViewProvider.getWebView`, and the reload path routinely passes none of these
   * (layout hydration reloads with `{ bringToFront: false }` alone). Declaring them required would
   * describe a contract no caller in this extension actually meets. Mirrors the sibling
   * `ResourceViewerOptions`.
   */
  projectId?: string;
  /** Scroll group of the editor Find was invoked from, so the two stay verse-synced. */
  editorScrollGroupId?: ScrollGroupScrRef;
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
  /**
   * Whether the Find web view should put the caret in its search box once it is on screen. Set by
   * `platformScripture.openFind` on the path that reloads the web view; the path that reuses an
   * already-mounted one sends the `FIND_FOCUS_SEARCH_EVENT` network event instead. Absent means "no
   * request" and is scrubbed rather than carried over, so a value persisted into a saved layout
   * cannot steal focus on the next hydration.
   */
  shouldFocusSearch?: boolean;
}

export class FindWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: FindWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== findWebViewType)
      throw new Error(
        `${findWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

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
