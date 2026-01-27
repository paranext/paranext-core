import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import projectPropertiesWebView from './project-properties.web-view?inline';
import projectPropertiesStyles from './tailwind.css?inline';

export const projectPropertiesWebViewType = 'paratextProjectCreation.projectProperties';

export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== projectPropertiesWebViewType)
      throw new Error(
        `${projectPropertiesWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    return {
      ...savedWebView,
      title: savedWebView.state?.mode === 'edit' ? 'Project Properties' : 'New Project',
      content: projectPropertiesWebView,
      styles: projectPropertiesStyles,
      state: {
        ...savedWebView.state,
      },
    };
  }
}
