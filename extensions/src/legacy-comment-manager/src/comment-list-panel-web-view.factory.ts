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
      state: {
        ...savedWebView.state,
        // Always rebuild un-blocked. `isSyncBlocked` is transient runtime state owned by the core
        // auto-sync edit-block driver; forcing it false here means a crash/reload mid-sync can never
        // restore a read-only panel from the saved layout (mirrors the scripture editor's scrub in
        // platform-scripture-editor main.ts). The driver re-flags it if a sync is still in flight.
        isSyncBlocked: false,
      },
      title,
      projectId,
      content: commentListWebView,
      styles: tailwindStyles,
      // In simple mode, force the comments panel to scroll group 0 so it stays verse-synced with
      // the Scripture editor (which is also forced to 0 in simple mode). Power mode preserves the
      // saved value. Without this, a persisted non-zero scroll group (e.g. set while in power
      // mode) would survive into simple mode and detach the panel from the editor's navigation.
      scrollGroupScrRef: interfaceMode === 'simple' ? 0 : savedWebView.scrollGroupScrRef,
    };
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<CommentListWebViewController> {
    return createCommentListWebViewController(webViewDefinition, webViewNonce);
  }
}
