import papi, { logger } from '@papi/backend';
import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  ScrollGroupScrRef,
  WebViewDefinition,
} from '@papi/core';
import { getErrorMessage } from 'platform-bible-utils';
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

    // Both reads are independent, so run them together. `allSettled`, not `all`: simple mode keeps
    // this tab permanently open, so a failed read here would otherwise reject `getWebView` and turn
    // the tab into an error tab at startup. The interface mode is re-read every call so mode changes
    // are picked up at open/replace/restore time.
    const [titleResult, interfaceModeResult] = await Promise.allSettled([
      papi.localization.getLocalizedString({ localizeKey: '%webView_find_title%' }),
      papi.settings.get('platform.interfaceMode'),
    ]);

    if (titleResult.status === 'rejected')
      logger.warn(
        `Find web view provider could not localize its title; keeping the saved one. ${getErrorMessage(
          titleResult.reason,
        )}`,
      );
    const title = titleResult.status === 'fulfilled' ? titleResult.value : savedWebView.title;

    if (interfaceModeResult.status === 'rejected')
      logger.warn(
        `Find web view provider could not read interfaceMode; failing safe to 'simple'. ${getErrorMessage(
          interfaceModeResult.reason,
        )}`,
      );
    // Fail safe to 'simple' — the platform default, and the branch that keeps this tab pinned rather
    // than leaving a Column 3 tab closable and draggable across columns. Mirrors the Scripture Finder
    // PDP's fail-safe read (platform-scripture-finder-pdpe.model.ts).
    const interfaceMode =
      interfaceModeResult.status === 'fulfilled' ? interfaceModeResult.value : 'simple';

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
