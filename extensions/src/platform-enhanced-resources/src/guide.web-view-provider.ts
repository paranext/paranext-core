import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import guideWebView from './web-views/guide.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const GUIDE_WEB_VIEW_TYPE = 'platformEnhancedResources.guide';

export class GuideWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    return {
      ...savedWebView,
      title: '%enhancedResources_guide_title%',
      content: guideWebView,
      styles: tailwindStyles,
    };
  }
}
