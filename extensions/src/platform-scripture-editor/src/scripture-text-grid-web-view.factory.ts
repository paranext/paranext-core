import papi, { logger, WebViewFactory } from '@papi/backend';
import type { SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import { getErrorMessage } from 'platform-bible-utils';
import type {
  TextCollectionWebViewController,
  TextCollectionWebViewMessage,
} from 'platform-scripture-editor';
import {
  buildScriptureTextGridWebView,
  SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE,
  type TextCollectionPanelOptions,
} from './platform-scripture-editor.utils';
import scriptureTextGridWebView from './scripture-text-grid.web-view?inline';
import scriptureTextGridWebViewStyles from './scripture-text-grid.web-view.scss?inline';

/** Web view provider for the Text Collection; its controller delivers reveal requests. */
export class ScriptureTextGridWebViewFactory extends WebViewFactory<
  typeof SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE
> {
  constructor() {
    super(SCRIPTURE_TEXT_GRID_WEBVIEW_TYPE);
  }

  override async getWebViewDefinition(
    savedWebView: SavedWebViewDefinition,
    openWebViewOptions: TextCollectionPanelOptions,
  ): Promise<WebViewDefinition | undefined> {
    return buildScriptureTextGridWebView(papi, savedWebView, openWebViewOptions, {
      content: scriptureTextGridWebView,
      styles: scriptureTextGridWebViewStyles,
    });
  }

  override async createWebViewController(
    webViewDefinition: WebViewDefinition,
    webViewNonce: string,
  ): Promise<TextCollectionWebViewController> {
    return {
      async revealResource(projectId) {
        try {
          logger.debug(
            `Text Collection WebView Controller ${webViewDefinition.id} received request to revealResource ${projectId}`,
          );
          const message: TextCollectionWebViewMessage = {
            method: 'revealResource',
            projectId,
          };
          await papi.webViewProviders.postMessageToWebView(
            webViewDefinition.id,
            webViewNonce,
            message,
          );
        } catch (e) {
          logger.warn(
            `Text Collection WebView Controller ${webViewDefinition.id} failed to revealResource ${projectId}: ${getErrorMessage(e)}`,
          );
          throw e;
        }
      },
    };
  }
}
