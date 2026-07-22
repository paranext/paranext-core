import papi, { WebViewFactory } from '@papi/backend';
import type { OpenWebViewOptions, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import type { CommentListWebViewController } from 'legacy-comment-manager';
import commentListWebView from './comment-list.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import {
  COMMENT_LIST_PANEL_WEB_VIEW_TYPE,
  resolveCommentListPanelProjectId,
} from './comment-list-panel.utils';
import { createCommentListWebViewController } from './comment-list-web-view-controller.util';

/** Options accepted when opening the fixed Column 3 Comment List panel. */
export interface CommentListPanelOptions extends OpenWebViewOptions {
  projectId?: string;
}

/**
 * Pending projectId consumed by {@link CommentListPanelWebViewFactory.getWebViewDefinition} after
 * `reloadWebView`. Set via {@link setPendingCommentListPanelProjectId}, called by
 * `openCommentListPanel` in `main.ts` immediately before it calls `reloadWebView`.
 *
 * Note: `undefined` doubles as the "no pending value" sentinel, so a pending `undefined` cannot
 * clear an already-open panel's project — resolution falls back to the saved projectId. This is an
 * accepted limitation; see `openCommentListPanel` in `main.ts`.
 */
let pendingProjectId: string | undefined;

/**
 * Sets the projectId {@link CommentListPanelWebViewFactory.getWebViewDefinition} will consume (and
 * clear) the next time it runs — used by `openCommentListPanel` to forward a project change through
 * `reloadWebView`, which has no other way to pass extra data into `getWebView`.
 */
export function setPendingCommentListPanelProjectId(projectId: string | undefined): void {
  pendingProjectId = projectId;
}

/**
 * WebView Factory for the fixed Column 3 Comment List panel, with controller support so external
 * callers can bring it to front and select a thread in it without a destructive reload (see
 * `selectCommentThreadInPanel` in `main.ts`).
 */
export class CommentListPanelWebViewFactory extends WebViewFactory<
  typeof COMMENT_LIST_PANEL_WEB_VIEW_TYPE
> {
  constructor() {
    super(COMMENT_LIST_PANEL_WEB_VIEW_TYPE);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    openWebViewOptions: CommentListPanelOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== COMMENT_LIST_PANEL_WEB_VIEW_TYPE)
      throw new Error(
        `${COMMENT_LIST_PANEL_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = resolveCommentListPanelProjectId(
      pendingProjectId,
      openWebViewOptions.projectId,
      savedWebView.projectId,
    );
    pendingProjectId = undefined;

    const title = await papi.localization.getLocalizedString({
      localizeKey: '%webView_legacyCommentManager_commentListPanel_title%',
    });

    // Re-read every call so mode changes are picked up at open/replace/restore time.
    const interfaceMode = await papi.settings.get('platform.interfaceMode');

    return {
      ...savedWebView,
      title,
      // Mirrors the title so the tab's name is discoverable on hover once Task 5 shrinks it to
      // icon-only — matches Text Collection's existing tooltip convention; no PlatformTabTitle
      // change needed. Gated on Simple mode: Power mode never had a tooltip here and must not
      // gain one now (this panel is reachable in Power mode too).
      tooltip: interfaceMode === 'simple' ? title : savedWebView.tooltip,
      projectId,
      content: commentListWebView,
      styles: tailwindStyles,
      // Icon-only tab in Simple mode only — Power mode keeps showing this tab with no icon,
      // exactly as today (see comment-list.web-view.tsx for the live theme/selection-adaptive
      // swap, likewise gated on Power mode).
      iconUrl:
        interfaceMode === 'simple'
          ? 'papi-extension://legacyCommentManager/assets/message-square.svg'
          : savedWebView.iconUrl,
      // In simple mode, force the comments panel to scroll group 0 so it stays verse-synced with
      // the Scripture editor (which is also forced to 0 in simple mode). Power mode preserves the
      // saved value. Without this, a persisted non-zero scroll group (e.g. set while in power
      // mode) would survive into simple mode and detach the panel from the editor's navigation.
      scrollGroupScrRef: interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef,
      // This is the fixed Column 3 Comment List panel and must always remain open in simple mode,
      // so it's non-closable there. Power mode allows closing/rearranging freely.
      isClosable: interfaceMode === 'power',
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<CommentListWebViewController> {
    return createCommentListWebViewController(webViewDefinition, webViewNonce);
  }
}
