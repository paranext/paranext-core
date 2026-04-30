import papi, { logger } from '@papi/backend';
import {
  ExecutionActivationContext,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import type { EnhancedResourceWebViewOptions } from 'platform-enhanced-resources';
import enhancedResourceWebViewReact from './web-views/enhanced-resource.web-view?inline';
import tailwindCssStyles from './tailwind.css?inline';

const ENHANCED_RESOURCE_WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

/**
 * Provider for the Enhanced Resource web view (UI-PKG-009 launcher target).
 *
 * Mirrors the `platform-lexical-tools` registration pattern. Forwards the editor's scroll group (so
 * verse navigation stays in sync) and persists `resourceId` in the web view state.
 *
 * `resolveResourceObjectId` validation is intentionally omitted at provider time - the UI shell
 * renders an empty state when `tokens === undefined`, which is what TS-043 expects when no Enhanced
 * Resource is selected or when the factory has no marble data installed.
 */
const enhancedResourceWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: EnhancedResourceWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== ENHANCED_RESOURCE_WEB_VIEW_TYPE)
      throw new Error(
        `${ENHANCED_RESOURCE_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const resourceId =
      getWebViewOptions.resourceId ||
      (typeof savedWebView.state?.resourceId === 'string'
        ? savedWebView.state.resourceId
        : undefined);

    return {
      ...savedWebView,
      title: '%platformEnhancedResources_title_enhancedResource%',
      content: enhancedResourceWebViewReact,
      styles: tailwindCssStyles,
      shouldShowToolbar: true,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
      state: {
        ...savedWebView.state,
        resourceId,
      },
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Platform Enhanced Resources is activating!');

  const enhancedResourceWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    ENHANCED_RESOURCE_WEB_VIEW_TYPE,
    enhancedResourceWebViewProvider,
  );

  const openEnhancedResourceCommandPromise = papi.commands.registerCommand(
    'platformEnhancedResources.openEnhancedResource',
    async (editorWebViewId?: string) => {
      let editorScrollGroupId;
      if (editorWebViewId) {
        const webViewDefinition = await papi.webViews.getOpenWebViewDefinition(editorWebViewId);
        editorScrollGroupId = webViewDefinition?.scrollGroupScrRef;
      }

      // resourceId is left undefined at launch; the user picks one inside the web view (or the
      // shell renders its empty state when the factory has no resources - TS-043).
      const enhancedResourceWebViewOptions: EnhancedResourceWebViewOptions = {
        resourceId: undefined,
        editorScrollGroupId,
      };

      return papi.webViews.openWebView(
        ENHANCED_RESOURCE_WEB_VIEW_TYPE,
        { type: 'tab' },
        enhancedResourceWebViewOptions,
      );
    },
  );

  context.registrations.add(
    await enhancedResourceWebViewProviderPromise,
    await openEnhancedResourceCommandPromise,
  );
}

export async function deactivate() {
  logger.debug('Platform Enhanced Resources is deactivating!');
  return true;
}
