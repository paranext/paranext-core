import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import enhancedResourceWebView from './web-views/enhanced-resource.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
import customStyles from './enhanced-resource.styles.css?inline';

export const ENHANCED_RESOURCE_WEB_VIEW_TYPE = 'platformEnhancedResources.enhancedResource';

export class EnhancedResourceWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    return {
      ...savedWebView,
      title: '%enhancedResources_title%',
      content: enhancedResourceWebView,
      styles: `${tailwindStyles}\n${customStyles}`,
    };
  }
}
