import {
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
  OpenWebViewOptions,
  ScrollGroupScrRef,
} from '@papi/core';
import enhancedResourceWebView from './enhanced-resource.web-view?inline';
import tailwindCssStyles from '../tailwind.css?inline';

export const ER_WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

export interface EnhancedResourceWebViewOptions extends OpenWebViewOptions {
  resourceId: string | undefined;
  editorScrollGroupId: ScrollGroupScrRef | undefined;
}

const enhancedResourceWebViewProvider: IWebViewProvider = {
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: EnhancedResourceWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== ER_WEB_VIEW_TYPE)
      throw new Error(
        `${ER_WEB_VIEW_TYPE} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const resourceId = getWebViewOptions.resourceId || savedWebView.projectId || undefined;

    return {
      ...savedWebView,
      title: '%platformEnhancedResources_title%',
      content: enhancedResourceWebView,
      styles: tailwindCssStyles,
      shouldShowToolbar: true,
      projectId: resourceId,
      scrollGroupScrRef: getWebViewOptions.editorScrollGroupId,
    };
  },
};

export default enhancedResourceWebViewProvider;
