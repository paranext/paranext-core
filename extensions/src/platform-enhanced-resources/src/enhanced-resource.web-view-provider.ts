import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import enhancedResourceWebView from './web-views/enhanced-resource.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import customStyles from './enhanced-resource.styles.css?inline';

export const ENHANCED_RESOURCE_WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

export interface EnhancedResourceWebViewOptions extends OpenWebViewOptions {
  resourceId?: string;
}

export class EnhancedResourceWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: EnhancedResourceWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const resourceId =
      getWebViewOptions.resourceId ?? (savedWebView.state?.resourceId as string | undefined);

    return {
      ...savedWebView,
      title: '%enhancedResources_title%',
      content: enhancedResourceWebView,
      styles: `${tailwindStyles}\n${customStyles}`,
      state: {
        ...savedWebView.state,
        ...(resourceId ? { resourceId } : {}),
      },
    };
  }
}
