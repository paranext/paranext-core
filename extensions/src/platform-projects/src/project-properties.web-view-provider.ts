import { IWebViewProvider, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import papi from '@papi/backend';
import projectPropertiesWebView from './project-properties.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const projectPropertiesWebViewType = 'platformProjects.projectProperties';

export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    const title = await papi.localization.getLocalizedString({
      localizeKey: '%platformProjects_projectProperties_title%',
    });

    return {
      ...savedWebView,
      title,
      content: projectPropertiesWebView,
      styles: tailwindStyles,
    };
  }
}

export default ProjectPropertiesWebViewProvider;
