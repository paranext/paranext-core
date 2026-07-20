import papi, { logger } from '@papi/backend';
import type { WebViewDefinition } from '@papi/core';
import type {
  CommentFilters,
  CommentListWebViewController,
  ScopeFilter,
} from 'legacy-comment-manager';
import { serialize } from 'platform-bible-utils';
import { CommentListWebViewMessage } from './comment-list-messages.model';

/**
 * Builds the WebView Controller shared by both comment-list webview types. The editor-anchored list
 * (`legacyCommentManager.commentList`) and the fixed Column 3 panel
 * (`legacyCommentManager.commentListPanel`) render the exact same web view component and speak the
 * same `selectThread`/`setFilters` message protocol, so one controller implementation serves both.
 */
export function createCommentListWebViewController(
  webViewDefinition: WebViewDefinition,
  webViewNonce: string,
): CommentListWebViewController {
  const postToWebView = (message: CommentListWebViewMessage) =>
    papi.webViewProviders.postMessageToWebView(webViewDefinition.id, webViewNonce, message);

  return {
    async selectThread(threadId: string): Promise<void> {
      logger.debug(
        `Comment List WebView Controller ${webViewDefinition.id} received request to selectThread ${threadId}`,
      );
      await postToWebView({ method: 'selectThread', threadId });
    },
    async setFilters(filters?: Partial<CommentFilters>, scopeFilter?: ScopeFilter): Promise<void> {
      logger.debug(
        `Comment List WebView Controller ${webViewDefinition.id} received setFilters ${serialize({ filters, scopeFilter })}`,
      );
      await postToWebView({ method: 'setFilters', filters, scopeFilter });
    },
    async dispose(): Promise<boolean> {
      return true;
    },
  };
}
